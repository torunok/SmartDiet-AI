/**
 * EXAMPLE: How to use secure API calls through Backend
 * 
 * Replace the hardcoded API key calls with backend calls
 * This example shows how to refactor fetchFullRecipe()
 */

// ❌ OLD (INSECURE - Do NOT use in production)
// async function fetchFullRecipe(dishName, summary) {
//     const apiKey = "AIzaSyD8pwLwm8WzTf0RBwItWFWXD0Fngmp11yY"; // ⚠️ Exposed!
//     const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`, {
//         // ...
//     });
// }

// ✅ NEW (SECURE - Backend keeps API key safe)
async function fetchFullRecipe(dishName, summary) {
    try {
        // Call your secure backend instead of exposing API key
        const response = await fetch('/api/recipe', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                dishName: dishName,
                summary: summary
            })
        });

        if (!response.ok) {
            const error = await response.json();
            console.error("Backend Error:", error);
            return null;
        }

        const recipe = await response.json();
        console.log("Successfully fetched recipe from secure backend:", recipe);
        return recipe;
    } catch (e) {
        console.error("Recipe Fetch Error:", e.message || e);
        return null;
    }
}

/**
 * For other API calls (like Gemini for meal generation),
 * follow the same pattern:
 */

// ❌ OLD - API key exposed in client
// async function generateMealPlan(userMetrics) {
//     const apiKey = "EXPOSED_KEY";
//     const response = await fetch(`https://api.gemini.google.com/...?key=${apiKey}`, {...});
// }

// ✅ NEW - Backend handles it securely
async function generateMealPlan(userMetrics) {
    try {
        const response = await fetch('/api/generate-meal-plan', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userMetrics)
        });

        if (!response.ok) {
            throw new Error(`Server error: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Error generating meal plan:", error);
        return null;
    }
}

/**
 * DEPLOYMENT CHECKLIST:
 * 
 * 1. ✅ Create backend server (see server.js)
 * 2. ✅ Store API keys in .env (server-side only)
 * 3. ✅ Update frontend to call /api/recipe instead of Gemini directly
 * 4. ✅ Set CORS properly for your domain
 * 5. ✅ Deploy backend to secure server (Heroku, AWS, Vercel, etc.)
 * 6. ✅ Update frontend API endpoint to match backend URL
 * 7. ✅ Test all features in production environment
 * 8. ✅ Monitor API usage and costs
 */

export { fetchFullRecipe, generateMealPlan };
