/**
 * Backend API Server - Secure API Key Management
 * 
 * This is a recommended way to handle API keys securely.
 * Instead of exposing API keys in the browser, keep them on the server.
 * 
 * Installation:
 * npm install express cors dotenv
 * 
 * Usage:
 * node server.js
 */

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    credentials: true
}));
app.use(express.json());

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', message: 'Server is running' });
});

/**
 * Helper function to validate API key
 */
function getApiKey() {
    const apiKey = process.env.VITE_GEMINI_API_KEY;
    if (!apiKey) {
        throw new Error('API Key not configured on server');
    }
    return apiKey;
}

/**
 * Helper function to call Gemini API
 */
async function callGeminiAPI(prompt, responseMimeType = 'application/json') {
    const apiKey = getApiKey();
    
    const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`,
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ parts: [{ text: prompt }] }],
                generationConfig: { responseMimeType }
            })
        }
    );

    if (!response.ok) {
        const error = await response.json();
        console.error('Gemini API Error:', error);
        throw new Error(error.error?.message || 'Failed to call Gemini API');
    }

    const data = await response.json();
    
    if (!data.candidates?.[0]?.content?.parts?.[0]?.text) {
        throw new Error('Invalid response from AI');
    }

    let text = data.candidates[0].content.parts[0].text;
    // Clean markdown if present
    text = text.replace(/```json/g, '').replace(/```/g, '').trim();
    
    return text;
}

/**
 * POST /api/generate-plan
 * Generate weekly meal plan based on user parameters
 * 
 * Body: {
 *   "age": 30,
 *   "weight": 70,
 *   "height": 175,
 *   "gender": "male",
 *   "activity": "moderate",
 *   "goal": "weight_loss",
 *   "budget": "medium",
 *   "cooking_time": "daily",
 *   "likes": "Курка, авокадо",
 *   "dislikes": "Риба, горіхи",
 *   "targetCalories": 2000,
 *   "macros": { "protein": 150, "fats": 70, "carbs": 200 }
 * }
 */
app.post('/api/generate-plan', async (req, res) => {
    try {
        const { age, weight, height, gender, activity, goal, budget, cooking_time, likes, dislikes, targetCalories, macros } = req.body;

        if (!targetCalories || !macros) {
            return res.status(400).json({
                error: 'Missing required fields: targetCalories, macros'
            });
        }

        let batchInstruction = "";
        if (cooking_time === 'batch') {
            batchInstruction = `СТРАТЕГІЯ: Batch Cooking (готуємо раз на 3 дні). Обід Пн=Вт=Ср.`;
        }

        const prompt = `
Ти професійний нутриціолог. Склади меню (JSON).
ОБМЕЖЕННЯ:
- Калорії: ${targetCalories} ккал/день
- Б/Ж/В: ${macros.protein}/${macros.fats}/${macros.carbs}г
- Бюджет: ${budget}
- Виключення: ${dislikes}
- Любить: ${likes}
${batchInstruction}
ФОРМАТ JSON:
{
    "weekly_plan": {
        "monday": { "breakfast": {"name":"", "cal":0, "rec":""}, "lunch": {"name":"", "cal":0, "rec":""}, "dinner": {"name":"", "cal":0, "rec":""}, "snack": {"name":"", "cal":0} },
        "tuesday": { ... },
        "wednesday": { ... },
        "thursday": { ... },
        "friday": { ... },
        "saturday": { ... },
        "sunday": { ... }
    },
    "shopping_list": {
        "Овочі 🥬": ["..."],
        "М'ясо/Риба 🥩": ["..."],
        "Бакалія 🍚": ["..."],
        "Молочка 🧀": ["..."]
    },
    "notes": "Порада нутриціолога"
}
"rec" - це дуже короткий опис (1 речення).
`;

        const result = await callGeminiAPI(prompt);
        const jsonPlan = JSON.parse(result);
        
        res.json(jsonPlan);
    } catch (error) {
        console.error('Generate Plan Error:', error.message);
        res.status(500).json({
            error: 'Failed to generate plan',
            message: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
});

/**
 * POST /api/regenerate-meal
 * Regenerate a single meal from the plan
 * 
 * Body: {
 *   "day": "monday",
 *   "type": "breakfast",
 *   "currentName": "Омлет",
 *   "likes": "Курка, авокадо",
 *   "dislikes": "Риба, горіхи"
 * }
 */
app.post('/api/regenerate-meal', async (req, res) => {
    try {
        const { day, type, currentName, likes, dislikes } = req.body;

        if (!day || !type || !currentName) {
            return res.status(400).json({
                error: 'Missing required fields: day, type, currentName'
            });
        }

        const prompt = `
Ти нутриціолог. Користувач не хоче їсти "${currentName}" на ${type} у ${day}.
Запропонуй альтернативу.
Вподобання: ${likes || 'будь-які'}.
Виключення: ${dislikes || 'немає'}.
Поверни ТІЛЬКИ JSON для цієї однієї страви:
{"name": "Нова назва", "cal": 500, "rec": "Короткий опис"}
`;

        const result = await callGeminiAPI(prompt);
        const newMeal = JSON.parse(result);
        
        res.json(newMeal);
    } catch (error) {
        console.error('Regenerate Meal Error:', error.message);
        res.status(500).json({
            error: 'Failed to regenerate meal',
            message: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
});

/**
 * POST /api/recipe
 * Secure endpoint to fetch detailed recipe from Gemini AI
 * 
 * Body:
 * {
 *   "dishName": "Паста Карбонара",
 *   "summary": "Класична італійська паста..."
 * }
 */
app.post('/api/recipe', async (req, res) => {
    try {
        const { dishName, summary } = req.body;

        if (!dishName || !summary) {
            return res.status(400).json({
                error: 'Missing required fields: dishName, summary'
            });
        }

        const prompt = `
Ти шеф-кухар. Напиши ДЕТАЛЬНИЙ рецепт для страви: "${dishName}".
Контекст: ${summary}.
Поверни ТІЛЬКИ JSON:
{
  "time": "20 хв",
  "ingredients": ["інгредієнт 1", "інгредієнт 2"],
  "steps": ["крок 1", "крок 2"]
}
`;

        const result = await callGeminiAPI(prompt);
        const recipe = JSON.parse(result);
        
        res.json(recipe);
    } catch (error) {
        console.error('Recipe Error:', error.message);
        res.status(500).json({
            error: 'Failed to fetch recipe',
            message: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({
        error: 'Server error',
        message: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
});

app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`✅ API available at http://localhost:${PORT}/api`);
    console.log(`⚠️  Make sure .env file is configured with VITE_GEMINI_API_KEY`);
});
