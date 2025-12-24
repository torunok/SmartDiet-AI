# SmartDiet.AI - Персональний генератор меню на базі ШІ

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![Node](https://img.shields.io/badge/node-%3E%3D16-brightgreen)

## 🌟 Про проект

SmartDiet.AI - це інтелектуальна система для створення персоналізованих дієтичних планів. За допомогою Gemini AI, вона аналізує ваші фізіологічні параметри, вподобання та бюджет, щоб створити оптимальне меню на неділю.

### ✨ Основні можливості

- 🤖 **AI-Powered Planning** - Генерація меню за допомогою Gemini AI
- 🔐 **Secure Backend** - Усі API ключи зберігаються на сервері
- 📊 **Макронутрієнти** - Розрахунок калорій, білків, жиру, вуглеводів
- 🛒 **Список покупок** - Автоматична генерація списку продуктів
- 💾 **Cloud Sync** - Синхронізація з Firebase Firestore
- 🔄 **Регенерація** - Заміна окремих страв на альтернативи
- 📱 **Responsive Design** - Оптимізація для мобільних пристроїв
- 🎯 **Batch Cooking** - Підтримка готування на 3 дні

## 🏗️ Архітектура

### Frontend (Browser)
- **Framework**: HTML5 + JavaScript (без фреймворків)
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Database**: Firebase Firestore
- **Auth**: Firebase Authentication

### Backend (Server)
- **Runtime**: Node.js
- **Framework**: Express.js
- **Security**: CORS, dotenv
- **API**: RESTful endpoints

```
┌─────────────────────────────────────────────────────────────┐
│                    БРАУЗЕР (Frontend)                        │
│                                                               │
│  index.html (Вхідні дані користувача)                       │
│         ↓                                                     │
│  Запит на http://localhost:3000/api/generate-plan           │
│         ↑                                                     │
│  JSON відповідь (меню, список покупок)                      │
└─────────────────────────────────────────────────────────────┘
                           ↕
┌─────────────────────────────────────────────────────────────┐
│                    СЕРВЕР (Backend)                          │
│  server.js (Express.js)                                      │
│                                                               │
│  /api/generate-plan    ────→ Gemini API (API KEY SAFE!)     │
│  /api/regenerate-meal  ────→ Gemini API                     │
│  /api/recipe           ────→ Gemini API                     │
│  /api/health           → Server status                      │
│                                                               │
│  .env (API KEYS - NEVER EXPOSED)                            │
└─────────────────────────────────────────────────────────────┘
                           ↕
┌─────────────────────────────────────────────────────────────┐
│              ЗОВНІШНІ СЕРВІСИ                                │
│  Google Gemini API    - Генерація меню та рецептів          │
│  Firebase Firestore   - Збереження даних користувача        │
│  Firebase Auth        - Аутентифікація користувачів        │
└─────────────────────────────────────────────────────────────┘
```

## 🔒 Безпека

### API Key Protection
- ✅ Ключи **не видні в браузері**
- ✅ Зберігаються в `.env` на сервері
- ✅ Передаються через приватні HTTP запити
- ✅ `.env` в `.gitignore` (не комітується)

### Порівняння: До vs Після

**❌ До (Небезпечно):**
```javascript
// index.html - API ключ видний в коді
const apiKey = "AIzaSyD8pwLwm8WzTf0RBwItWFWXD0Fngmp11yY";
fetch('https://generativelanguage.googleapis.com/...?key=' + apiKey)
```

**✅ Після (Безпечно):**
```javascript
// index.html - Ключ невідомий браузеру
fetch('http://localhost:3000/api/generate-plan')

// server.js - Ключ захищено в .env
const apiKey = process.env.VITE_GEMINI_API_KEY;
// Викликаємо API на сервері, браузер не знає ключа
```

## 🚀 Швидкий старт

### Передумови
- Node.js 16+
- npm або yarn
- Gemini API ключ ([отримати тут](https://aistudio.google.com/app/apikeys))

### Установка

```bash
# 1. Перейти в директорію проекту
cd /Users/roman/Downloads/SmartDiet.AI

# 2. Встановити залежності
npm install

# 3. Переконатися, що .env налаштована
cat .env
```

### Запуск

**Термінал 1 - Backend Server:**
```bash
npm run server
```

Очікуваний результат:
```
🚀 Server running on http://localhost:3000
✅ API available at http://localhost:3000/api
```

**Термінал 2 - Frontend (Vite):**
```bash
npm run dev
```

Очікуваний результат:
```
VITE v5.x.x  ready in xxx ms

➜  Local:   http://localhost:5173/
```

Відкрийте браузер: http://localhost:5173

## 📖 Використання

### 1. Реєстрація / Вхід
- Натисніть "Зареєструватися" або "Увійти"
- Використовуйте Firebase аутентифікацію

### 2. Заповнення параметрів
- **Вік, стать, вага, зріст**
- **Рівень активності** (сидячий, помірний, активний)
- **Мета** (схуднення, підтримка, набір маси)
- **Бюджет** (економний, середній, преміум)
- **Вподобання/Виключення** (продукти, які любите/не їсте)

### 3. Генерація меню
- Натисніть "Згенерувати раціон"
- ШІ створить план на 7 днів

### 4. Перегляд результатів
- **Тиждень** - План на кожен день
- **Покупки** - Список необхідних продуктів
- **Поради** - Рекомендації нутриціолога

### 5. Редагування
- Натисніть на страву для перегляду рецепту
- Натисніть ⚡ для заміни страви на альтернативу

## 📡 API Endpoints

### POST `/api/generate-plan`
Генерує щотижневий план меню

**Запит:**
```json
{
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
}
```

**Відповідь:**
```json
{
  "weekly_plan": {
    "monday": {
      "breakfast": {"name": "Омлет", "cal": 350, "rec": "З помідорами"},
      "lunch": {"name": "Паста", "cal": 600, "rec": "З курком"},
      "dinner": {"name": "Салат", "cal": 400, "rec": "Із овочами"},
      "snack": {"name": "Яблуко", "cal": 100}
    },
    ...
  },
  "shopping_list": {
    "Овочі 🥬": ["Помідори", "Огірки"],
    "М'ясо 🥩": ["Курка", "Яйця"]
  },
  "notes": "Пийте більше води..."
}
```

### POST `/api/regenerate-meal`
Замінює одну страву альтернативою

**Запит:**
```json
{
  "day": "monday",
  "type": "breakfast",
  "currentName": "Омлет",
  "likes": "Курка",
  "dislikes": "Риба"
}
```

### POST `/api/recipe`
Отримує детальний рецепт страви

**Запит:**
```json
{
  "dishName": "Паста Карбонара",
  "summary": "Класична італійська паста"
}
```

**Відповідь:**
```json
{
  "time": "20 хв",
  "ingredients": ["Спагеті", "Беконінозелень"],
  "steps": ["Варити спагеті", "Підсмажити бекон"]
}
```

### GET `/api/health`
Перевірка стану сервера

## 📁 Структура проекту

```
SmartDiet.AI/
│
├── index.html                   # 🎨 Основна сторінка (frontend)
├── server.js                    # 🚀 Backend Express server (SECURE!)
├── package.json                 # 📦 Залежності проекту
│
├── .env                        # 🔐 СЕКРЕТНІ КЛЮЧІ (не комітити!)
├── .env.example                # 📋 Шаблон .env (безпечно комітити)
├── .gitignore                  # 🚫 Ігнорує .env та node_modules
│
├── SECURITY_SETUP.md           # 🔒 Гайд з безпеки
├── SECURE_API_EXAMPLE.js       # 📚 Приклад реалізації
├── CONFIG_STATUS.md            # ⚙️ Статус конфігурації
├── ENV_SETUP.md                # 🛠️ Налаштування оточення
│
└── dist/                       # 🏗️ Зібрана frontend (після npm run build)
```

## 🔑 Змінні оточення (.env)

```env
# Gemini API Key (отримати на https://aistudio.google.com/app/apikeys)
VITE_GEMINI_API_KEY=AIzaSyD8pwLwm8WzTf0RBwItWFWXD0Fngmp11yY

# Server Configuration
PORT=3000
CLIENT_URL=http://localhost:5173

# Firebase Configuration (уже налаштовано)
FIREBASE_API_KEY=AIzaSyDbSQ-ngUPYRCWfIsjj32PkjH4wLwhxyKo
FIREBASE_AUTH_DOMAIN=smartdiet-ai-8e4be.firebaseapp.com
FIREBASE_PROJECT_ID=smartdiet-ai-8e4be
...
```

## 🧪 Тестування

### Тест здоров'я сервера
```bash
curl http://localhost:3000/api/health
```

### Тест генерації меню
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
    "likes": "Курка",
    "dislikes": "Риба",
    "targetCalories": 2000,
    "macros": {"protein": 150, "fats": 70, "carbs": 200}
  }'
```

### Перевірка DevTools
1. F12 (DevTools)
2. Network tab
3. Натисніть "Згенерувати"
4. ✅ Повинні бути запити на `http://localhost:3000/api/*`
5. ✅ API ключ НЕ повинен з'являтися в Network tab!

## 🚀 Deployment

### Для Production

1. **Збирання frontend:**
   ```bash
   npm run build
   ```
   
2. **Розгортання frontend** (Vercel, Netlify):
   ```bash
   # Deploy dist/ folder
   ```

3. **Розгортання backend** (Heroku, Railway, Replit):
   ```bash
   # Встановити VITE_GEMINI_API_KEY в environment variables
   # Встановити CLIENT_URL до вашого домену
   ```

4. **Оновити API_URL в index.html:**
   ```javascript
   const API_URL = 'https://your-api.example.com/api';
   ```

## 🐛 Вирішення проблем

### "Failed to fetch" error
- Перевірити, чи запущен backend сервер
- Запустити: `npm run server`
- Перевірити, чи доступен http://localhost:3000

### "API Key not configured"
- Перевірити, чи існує .env файл
- Перевірити `VITE_GEMINI_API_KEY` в .env
- Перезапустити backend сервер

### Port 3000 вже використовується
```bash
# Знайти процес на порту 3000
lsof -i :3000

# Закрити процес (замінити PID)
kill -9 <PID>
```

## 📊 Основні функції

| Функція | Статус | Описання |
|---------|--------|----------|
| Генерація меню | ✅ | AI створює план на 7 днів |
| Макронутрієнти | ✅ | Розрахунок калорій та макросів |
| Список покупок | ✅ | Автоматична генерація |
| Рецепти | ✅ | Детальні рецепти для кожної страви |
| Регенерація | ✅ | Заміна страв альтернативами |
| Cloud Sync | ✅ | Синхронізація з Firebase |
| Аутентифікація | ✅ | Firebase Auth (email/password) |
| Responsive | ✅ | Оптимізовано для мобільних |
| Batch Cooking | ✅ | Готування на 3 дні |
| Water Tracker | ✅ | Обчислювач води |

## 📈 Майбутні удосконалення

- [ ] Мобільний додаток (React Native)
- [ ] Інтеграція з вагами (IoT)
- [ ] Голосові команди
- [ ] Інтеграція з доставкою їжі
- [ ] Повністю локальна версія (без API)
- [ ] Багатомовна підтримка
- [ ] Системні сповіщення про приймання їжі

## 🤝 Внесок

Цей проект для особистого використання. Якщо ви хочете покращити код:

1. Fork проект
2. Створіть гілку (`git checkout -b feature/improvement`)
3. Закомітьте зміни (`git commit -m 'Add improvement'`)
4. Push до гілки (`git push origin feature/improvement`)
5. Створіть Pull Request

## 📄 Ліцензія

MIT License - дивіться [LICENSE](LICENSE) для деталей

## 📞 Контакти

- 📧 Email: support@smartdiet.ai
- 🐛 Issues: [GitHub Issues](https://github.com/your-repo/issues)
- 💬 Discussions: [GitHub Discussions](https://github.com/your-repo/discussions)

## ⭐ Подяка

- [Google Gemini AI](https://ai.google.dev/) - за могутній ШІ
- [Firebase](https://firebase.google.com/) - за cloud infrastructure
- [Tailwind CSS](https://tailwindcss.com/) - за красивий дизайн
- [Express.js](https://expressjs.com/) - за надійний backend

---

**SmartDiet.AI** - Ваш персональний нутриціолог в кишені! 🌱

Зроблено з ❤️ для здорового способу життя
