# Environment Configuration Guide

## 🔐 Security Best Practices

### ❌ NEVER commit `.env` file to Git!
The `.env` file contains sensitive API keys and credentials. It's already in `.gitignore`.

### ⚠️ Current Setup (Development Only)

Currently, the API key is hardcoded in `index.html`. This is **NOT SECURE** for production.

## 📋 Setup Instructions

### 1. **Copy Environment Template**
```bash
cp .env.example .env
```

### 2. **Update `.env` with Your Keys**
Replace placeholder values with your actual credentials:

```env
# Get from Google Cloud Console
VITE_GEMINI_API_KEY=your_new_gemini_key_here

# Get from Firebase Console
VITE_FIREBASE_API_KEY=your_firebase_key
VITE_FIREBASE_PROJECT_ID=your_project_id
# ... other Firebase settings
```

### 3. **For Production Deployment**

You have two options:

#### Option A: Use a Backend Server (Recommended ✅)
```
Frontend (Browser) → Backend Server → Google Gemini API
                  ↓
              Keeps API key secret
```

Create a simple Node.js/Python backend to handle API calls:
```javascript
// Example: backend/routes/recipe.js
app.post('/api/recipe', async (req, res) => {
    const { dishName, summary } = req.body;
    const apiKey = process.env.VITE_GEMINI_API_KEY; // Safe on server
    
    const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=' + apiKey, {
        // ... request details
    });
    
    res.json(await response.json());
});
```

#### Option B: Use Vite/Webpack (For Static Hosting)
1. Install Vite:
```bash
npm install vite
```

2. Create `vite.config.js`:
```javascript
import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true
      }
    }
  }
})
```

3. Update `index.html` to use environment variables:
```javascript
const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
```

4. Run:
```bash
npm run dev
```

## 📁 File Structure

```
project/
├── .env                 # ⚠️ Private (DO NOT COMMIT)
├── .env.example         # ✅ Public template
├── .gitignore           # ✅ Includes .env
├── index.html
├── vite.config.js       # (if using Vite)
└── package.json         # (if using npm)
```

## 🔑 How to Get New API Keys

### Gemini API Key
1. Go to [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Click "Create API Key"
3. Copy the new key to `.env`

### Firebase Keys
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Go to Project Settings
4. Copy config values to `.env`

## ✅ Checklist Before Deployment

- [ ] `.env` is in `.gitignore`
- [ ] `.env` file is NOT in git history
- [ ] API keys are valid and not expired
- [ ] Rate limiting is configured on API keys
- [ ] Consider using Cloud Functions for API calls
- [ ] Test in production environment

## 🚀 Next Steps

1. **Generate new Gemini API key** and update `.env`
2. **Test locally** with `npm run dev`
3. **Deploy** with proper environment variables set on hosting platform
4. **Monitor** API usage in Google Cloud Console

---

For more info on securing API keys, see: https://cloud.google.com/docs/authentication/api-keys#api_key_restrictions
