#!/bin/bash

# SmartDiet.AI - Quick Start Script

echo "🚀 SmartDiet.AI - Quick Start Guide"
echo "===================================="
echo ""

# Check Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js не встановлений"
    echo "📥 Завантажте звідси: https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js: $(node -v)"
echo "✅ npm: $(npm -v)"
echo ""

# Check .env
if [ ! -f .env ]; then
    echo "⚠️  .env файл не знайдений!"
    echo "📋 Копіюю .env.example -> .env"
    cp .env.example .env
    echo "✅ .env створено"
    echo "⚠️  Відредагуйте .env та додайте API ключи!"
    echo ""
else
    echo "✅ .env знайдений"
fi

# Check node_modules
if [ ! -d "node_modules" ]; then
    echo "📥 Встановлення залежностей..."
    npm install
    echo "✅ Залежності встановлені"
else
    echo "✅ node_modules існує"
fi

echo ""
echo "🎉 Встановлення завершено!"
echo ""
echo "Тепер запустіть у двох терміналах:"
echo ""
echo "Термінал 1 (Backend):"
echo "  npm run server"
echo ""
echo "Термінал 2 (Frontend):"
echo "  npm run dev"
echo ""
echo "Потім відкрийте: http://localhost:5173"
echo ""
