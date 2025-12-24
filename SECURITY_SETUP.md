# SmartDiet.AI - Secure Setup Guide

## 🔒 Security Overview

This project now separates **API keys from the browser** by implementing a **secure backend server**. All sensitive data (Gemini API keys, Firebase credentials) are stored in the `.env` file on the server, never exposed to the client.

## 📋 Prerequisites

- Node.js 16+ ([download](https://nodejs.org/))
- npm or yarn package manager
- A Gemini API key from [Google AI Studio](https://aistudio.google.com/app/apikeys)
- Firebase project setup (credentials already in `.env`)

## 🚀 Installation Steps

### 1. Install Dependencies

```bash
cd /Users/roman/Downloads/SmartDiet.AI
npm install
```

This installs both frontend (Vite, Firebase) and backend (Express, CORS, dotenv) dependencies.

### 2. Configure Environment Variables

The `.env` file already contains sensitive data. Keep it secret!

**Never commit `.env` to Git** - it's already in `.gitignore`

To verify your `.env` file:
```bash
cat .env
```

Should contain:
```
VITE_GEMINI_API_KEY=AIzaSyD8pwLwm8WzTf0RBwItWFWXD0Fngmp11yY
FIREBASE_API_KEY=AIzaSyDbSQ-ngUPYRCWfIsjj32PkjH4wLwhxyKo
...
```

## 🎯 Running the Project

The project requires **two terminals**:

### Terminal 1: Start the Backend Server

```bash
npm run server
```

Or for development with auto-reload:
```bash
npm run server:dev
```

Expected output:
```
🚀 Server running on http://localhost:3000
✅ API available at http://localhost:3000/api
```

### Terminal 2: Start the Frontend (Vite)

```bash
npm run dev
```

Expected output:
```
VITE v5.x.x  ready in xxx ms

➜  Local:   http://localhost:5173/
```

Open http://localhost:5173 in your browser.

## 🔐 How Security Works

### Before (❌ Unsafe)
```javascript
// API key exposed in browser
const apiKey = "AIzaSyD8pwLwm8WzTf0RBwItWFWXD0Fngmp11yY";
fetch('https://generativelanguage.googleapis.com/v1beta/models/...?key=' + apiKey)
```

**Problems:**
- Anyone can inspect the code and steal the API key
- Someone can abuse the API key without limits
- Quota attacks possible

### After (✅ Secure)
```javascript
// Browser knows nothing about API keys
const API_URL = 'http://localhost:3000/api';
fetch(API_URL + '/generate-plan', { method: 'POST', body: {...} })
```

**Backend (`server.js`):**
```javascript
const apiKey = process.env.VITE_GEMINI_API_KEY; // Safe!
// API key never sent to client
```

**Benefits:**
- API key never exposed to the browser
- You control rate limiting and authentication
- All API calls are logged on your server
- Can add additional validation/security

## 🛠️ Available API Endpoints

### POST `/api/generate-plan`
Generate a weekly meal plan
```bash
curl -X POST http://localhost:3000/api/generate-plan \
  -H "Content-Type: application/json" \
  -d '{
    "age": 30,
    "weight": 70,
    "height": 175,
    "gender": "male",
    "activity": "moderate",
    "goal": "weight_loss",
    "budget": "medium",
    "cooking_time": "daily",
    "likes": "Курка, авокадо",
    "dislikes": "Риба, горіхи",
    "targetCalories": 2000,
    "macros": {"protein": 150, "fats": 70, "carbs": 200}
  }'
```

### POST `/api/regenerate-meal`
Replace a single meal
```bash
curl -X POST http://localhost:3000/api/regenerate-meal \
  -H "Content-Type: application/json" \
  -d '{
    "day": "monday",
    "type": "breakfast",
    "currentName": "Омлет",
    "likes": "Курка",
    "dislikes": "Риба"
  }'
```

### POST `/api/recipe`
Get detailed recipe
```bash
curl -X POST http://localhost:3000/api/recipe \
  -H "Content-Type: application/json" \
  -d '{
    "dishName": "Паста Карбонара",
    "summary": "Класична італійська паста"
  }'
```

### GET `/api/health`
Server health check
```bash
curl http://localhost:3000/api/health
```

## 📁 Project Structure

```
SmartDiet.AI/
├── index.html           # Frontend (uses API_URL = localhost:3000)
├── server.js            # Backend Express server ✨ SECURE
├── package.json         # Dependencies
├── .env                 # 🔐 Secret credentials (NOT in git)
├── .env.example         # Template for .env (safe to commit)
├── .gitignore           # Ignores .env files
├── CONFIG_STATUS.md     # Configuration notes
├── ENV_SETUP.md         # Environment setup guide
└── SECURE_API_EXAMPLE.js # Reference implementation
```

## 🚨 Important Security Notes

1. **Never commit `.env` to Git**
   - It's already in `.gitignore`
   - Use `.env.example` as a template

2. **Keep API keys secret**
   - Don't share your Gemini API key
   - Don't publish your `.env` file
   - Rotate keys if compromised

3. **For Production Deployment**
   - Use environment variables from your hosting platform (Vercel, Heroku, etc.)
   - Don't hardcode credentials
   - Add authentication to your API endpoints
   - Set CORS to your domain only
   - Use HTTPS only

4. **Example Production Setup**
   ```javascript
   app.use(cors({
       origin: 'https://yourdomain.com',
       credentials: true
   }));
   ```

## 🧪 Testing

### Test Backend Health
```bash
curl http://localhost:3000/api/health
```

Response:
```json
{"status":"OK","message":"Server is running"}
```

### Test from Frontend
1. Open Chrome DevTools (F12)
2. Go to Network tab
3. Click "Згенерувати раціон" button
4. Check that requests go to `http://localhost:3000/api/*`
5. API key should NOT appear anywhere!

## 📦 Deployment

### For Production:
1. Build frontend: `npm run build`
2. Deploy to hosting (Vercel, Netlify, etc.)
3. Deploy backend to cloud (Heroku, Railway, Replit, etc.)
4. Update `API_URL` in index.html to production server
5. Set environment variables on hosting platform

### Example for Vercel + Heroku:
```bash
# Set backend URL in Vercel environment variables
VITE_API_URL=https://smartdiet-api.herokuapp.com/api
```

## 🐛 Troubleshooting

### "Failed to fetch" error
- Check if backend server is running (`npm run server`)
- Verify server is on http://localhost:3000
- Check CORS settings in server.js

### "API Key not configured" error
- Verify `.env` file exists
- Check `VITE_GEMINI_API_KEY` is set correctly
- Restart backend server after changing `.env`

### Cannot connect to backend
```bash
# Test if server is running
curl http://localhost:3000/api/health

# Check port 3000 is not in use
lsof -i :3000
```

## ✅ Verification Checklist

- [ ] `.env` file created with API keys
- [ ] `npm install` completed successfully
- [ ] Backend server started (`npm run server`)
- [ ] Frontend started (`npm run dev`)
- [ ] Browser opens http://localhost:5173
- [ ] Can generate meal plan without seeing API key in console
- [ ] Network tab shows requests to `/api/*` endpoints
- [ ] `.env` is in `.gitignore` (safe to commit code)

## 📚 More Information

- [Express.js Documentation](https://expressjs.com/)
- [Gemini API Docs](https://ai.google.dev/)
- [Firebase Console](https://console.firebase.google.com/)
- [Vite Documentation](https://vitejs.dev/)

## 📞 Support

If you encounter issues:
1. Check the terminal output for error messages
2. Verify all prerequisites are installed
3. Review `.env` configuration
4. Check port 3000 and 5173 are available
5. Clear browser cache and restart servers

---

**Your API keys are now secure! 🔒**
