🚀 START HERE!

╔═══════════════════════════════════════════════════════════════╗
║     SmartDiet.AI - ONE MINUTE SETUP GUIDE                    ║
║                                                               ║
║  If you just want to run it → Copy the commands below        ║
╚═══════════════════════════════════════════════════════════════╝

⏱️ 5 MINUTES TO GET RUNNING

┌───────────────────────────────────────────────────────────────┐
│ STEP 1: Setup (Do this once)                                 │
└───────────────────────────────────────────────────────────────┘

Open Terminal and run:
```
bash setup.sh
```

Wait for it to finish... ☕

┌───────────────────────────────────────────────────────────────┐
│ STEP 2: Run Backend (Terminal 1)                             │
└───────────────────────────────────────────────────────────────┘

Keep Terminal 1 open and run:
```
npm run server
```

You should see:
🚀 Server running on http://localhost:3000
✅ API available at http://localhost:3000/api

┌───────────────────────────────────────────────────────────────┐
│ STEP 3: Run Frontend (Terminal 2 - Open a NEW terminal)      │
└───────────────────────────────────────────────────────────────┘

Open NEW Terminal and run:
```
npm run dev
```

You should see:
➜  Local: http://localhost:5173/

┌───────────────────────────────────────────────────────────────┐
│ STEP 4: Open in Browser                                      │
└───────────────────────────────────────────────────────────────┘

Click or open:
http://localhost:5173

✅ DONE! You're running SmartDiet.AI!

═══════════════════════════════════════════════════════════════

📝 HOW TO USE

1. Register or Login
2. Fill in your data:
   - Age, weight, height
   - Activity level
   - Goal (lose weight, maintain, gain muscle)
   - Budget & cooking time
   - Likes & dislikes
3. Click "Генерировать раціон" (Generate Menu)
4. Wait for AI to generate your week plan
5. View results in 3 tabs:
   - Тиждень (Weekly plan)
   - Покупки (Shopping list)
   - Поради (Nutritionist advice)

═══════════════════════════════════════════════════════════════

⚠️ IMPORTANT!

Your API keys are now SAFE! 🔐
- They're hidden from the browser
- They're protected in .env file
- Don't share your .env file!
- Never commit .env to git!

═══════════════════════════════════════════════════════════════

❓ COMMON QUESTIONS

Q: "Port 3000 already in use"
A: Close other app using port 3000 or:
   PORT=3001 npm run server

Q: "Module not found"
A: Run `npm install` again

Q: "Can't connect to backend"
A: Make sure npm run server is running in another terminal

Q: "API Key error"
A: Check .env file has VITE_GEMINI_API_KEY

═══════════════════════════════════════════════════════════════

📚 WANT MORE INFO?

Read these files:
- README.md - Full documentation
- QUICK_REFERENCE.md - Commands and API
- SECURITY_SETUP.md - How it's secure

═══════════════════════════════════════════════════════════════

✅ VERIFICATION

To check everything is working:
```
bash check-setup.sh
bash verify-security.sh
```

═══════════════════════════════════════════════════════════════

🚀 THAT'S IT!

Enjoy your AI meal planner! 🥗🤖

Questions? Read DOCUMENTATION.md for index of all files.

═══════════════════════════════════════════════════════════════

⚡ QUICK COMMANDS REFERENCE

Setup:              bash setup.sh
Check setup:        bash check-setup.sh
Verify security:    bash verify-security.sh
Start backend:      npm run server
Start frontend:     npm run dev
Install deps:       npm install

═══════════════════════════════════════════════════════════════

🎉 You're all set! Let's go! 🚀
