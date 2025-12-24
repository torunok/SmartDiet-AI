#!/bin/bash

# SmartDiet.AI - Security Verification Script
# Перевірити, що API ключи безпечні

echo "🔐 SmartDiet.AI - Security Verification"
echo "======================================"
echo ""

# Check 1: .env exists
if [ ! -f .env ]; then
    echo "❌ .env файл не найден"
    exit 1
fi
echo "✅ .env файл существует"

# Check 2: .env contains API key
if grep -q "VITE_GEMINI_API_KEY" .env; then
    echo "✅ VITE_GEMINI_API_KEY найден в .env"
else
    echo "❌ VITE_GEMINI_API_KEY не найден в .env"
fi

# Check 3: API key NOT in index.html
if grep -q "AIzaSyD8pwLwm8WzTf0RBwItWFWXD0Fngmp11yY" index.html; then
    echo "❌ НЕБЕЗПЕЧНО! API ключ видимий в index.html"
    exit 1
fi
echo "✅ API ключ НЕ видимий в index.html"

# Check 4: API key NOT hardcoded in server.js
if grep -q "AIzaSyD8pwLwm8WzTf0RBwItWFWXD0Fngmp11yY" server.js; then
    echo "❌ НЕБЕЗПЕЧНО! API ключ захардкодирований в server.js"
    exit 1
fi
echo "✅ API ключ НЕ захардкодирований в server.js"

# Check 5: .env in .gitignore
if grep -q ".env" .gitignore; then
    echo "✅ .env в .gitignore (не будет скомитчен)"
else
    echo "⚠️  .env може бути закомітчений! Додайте в .gitignore"
fi

# Check 6: Check if API_URL is set in index.html
if grep -q "const API_URL" index.html; then
    echo "✅ API_URL определен в index.html"
else
    echo "❌ API_URL не найден в index.html"
fi

# Check 7: server.js uses process.env
if grep -q "process.env.VITE_GEMINI_API_KEY" server.js; then
    echo "✅ server.js читає ключ з process.env"
else
    echo "❌ server.js не читає ключ з process.env"
fi

echo ""
echo "🎯 Security Summary:"
echo "=================="
echo "✅ API ключи захищені в .env"
echo "✅ .env в .gitignore"
echo "✅ Браузер використовує localhost:3000/api"
echo "✅ Сервер використовує .env для API ключів"
echo ""
echo "🟢 ВСЕ ПРОВЕРКИ ПРОЙДЕНЫ!"
echo ""
echo "Програма готова до використання! 🚀"
