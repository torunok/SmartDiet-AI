⚡ SmartDiet.AI - Шпаргалка для розробника

## 🚀 Швидкий старт (30 секунд)

```bash
# 1. Встановлення
npm install

# 2. Запуск сервера (Терміналу 1)
npm run server

# 3. Запуск фронтенду (Терміналу 2)
npm run dev

# 4. Відкрити браузер
# http://localhost:5173
```

---

## 🔧 Основні команди

| Команда | Описання |
|---------|----------|
| `npm install` | Встановити залежності |
| `npm run server` | Запустити backend на порту 3000 |
| `npm run server:dev` | Backend з автоперезавантаженням |
| `npm run dev` | Запустити frontend на порту 5173 |
| `npm run build` | Зібрати production версію |
| `npm run preview` | Показати зібране програме |
| `bash setup.sh` | Автоматична встановлення |
| `bash verify-security.sh` | Перевірити безпеку |

---

## 🔐 API ключі

### Де зберігаються?
```
.env (НЕ комітити!)
├─ VITE_GEMINI_API_KEY
├─ FIREBASE_API_KEY
├─ FIREBASE_AUTH_DOMAIN
└─ ... інші credentials
```

### Як використовувати в коді?

**Frontend:**
```javascript
const API_URL = 'http://localhost:3000/api';
fetch(API_URL + '/generate-plan')
```

**Backend:**
```javascript
const apiKey = process.env.VITE_GEMINI_API_KEY;
// Ключ безпечний на сервері!
```

---

## 📡 API Endpoints

### 1️⃣ Генерація меню
```bash
POST /api/generate-plan
Content-Type: application/json

{
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
}

Відповідь:
{
  "weekly_plan": {...},
  "shopping_list": {...},
  "notes": "..."
}
```

### 2️⃣ Заміна страви
```bash
POST /api/regenerate-meal

{
  "day": "monday",
  "type": "breakfast",
  "currentName": "Омлет",
  "likes": "Курка",
  "dislikes": "Риба"
}

Відповідь:
{
  "name": "Паста",
  "cal": 350,
  "rec": "З овочами"
}
```

### 3️⃣ Отримання рецепту
```bash
POST /api/recipe

{
  "dishName": "Паста Карбонара",
  "summary": "Класична італійська паста"
}

Відповідь:
{
  "time": "20 хв",
  "ingredients": ["Спагеті", "Бекон"],
  "steps": ["Варити", "Змішувати"]
}
```

### 4️⃣ Перевірка сервера
```bash
GET /api/health

Відповідь:
{
  "status": "OK",
  "message": "Server is running"
}
```

---

## 🐛 Вирішення проблем

### ❌ "Port 3000 already in use"
```bash
# Знайти процес на порту 3000
lsof -i :3000

# Закрити процес
kill -9 <PID>

# Або запустити на іншому порту
PORT=3001 npm run server
```

### ❌ "Failed to fetch from API"
```bash
# 1. Перевірити, запущений лі сервер
curl http://localhost:3000/api/health

# 2. Перезапустити сервер
npm run server

# 3. Перевірити API_URL в index.html
grep "const API_URL" index.html
```

### ❌ "API Key not configured"
```bash
# 1. Перевірити .env файл
cat .env | grep VITE_GEMINI_API_KEY

# 2. Якщо .env не існує
cp .env.example .env
# Потім відредагувати з правильними ключами

# 3. Перезапустити сервер
npm run server
```

### ❌ "Cannot find module 'express'"
```bash
# Переустановити залежності
rm -rf node_modules package-lock.json
npm install
```

---

## 🔒 Перевірка безпеки

### Що НЕ повинно бути в браузері:

**DevTools (F12) → Console:**
```javascript
// ❌ НЕБЕЗПЕЧНО - якщо видите це:
window.apiKey
// або
"AIzaSyD8pwLwm8WzTf0RBwItWFWXD0Fngmp11yY"

// ✅ ПРАВИЛЬНО - не повинно бути!
```

**DevTools → Network:**
```
Усі запити мають йти на:
✅ http://localhost:3000/api/*

НЕ повинна бути:
❌ https://generativelanguage.googleapis.com/*?key=...
```

**Швидка перевірка:**
```bash
bash verify-security.sh
```

---

## 📝 Основні файли

| Файл | Описання |
|------|----------|
| `index.html` | Фронтенд (React-like vanilla JS) |
| `server.js` | Бекенд (Express API) |
| `.env` | 🔐 Секрети (НЕ комітити!) |
| `.env.example` | Шаблон (комітити OK) |
| `.gitignore` | Git ignore rules |
| `package.json` | Залежності та скрипти |
| `SECURITY_SETUP.md` | Повний гайд |
| `DEPLOYMENT.md` | Розгортання |
| `README.md` | Головна документація |

---

## 🚀 Розгортання (Production)

### Локально (Розробка)
```bash
npm run server        # Терміналу 1
npm run dev          # Терміналу 2
```

### На Vercel + Heroku
```bash
# 1. Зібрати frontend
npm run build

# 2. Розгорнути backend на Heroku
heroku create smartdiet-api
heroku config:set VITE_GEMINI_API_KEY=your_key
git push heroku main

# 3. Розгорнути frontend на Vercel
vercel --prod

# 4. Оновити API_URL в index.html
# const API_URL = 'https://smartdiet-api.herokuapp.com/api';
```

### На Railway (Найпростіше)
```bash
# Просто підключити GitHub репозиторій до Railway
# Railway автоматично розібравщиться з Node.js додатком
```

---

## 📊 Firebase Integration

### Уже налаштовано:
- ✅ Аутентифікація (Email/Password)
- ✅ Firestore Database
- ✅ User data persistence
- ✅ Cloud sync

### Використання в коді:
```javascript
// window.auth - Firebase Auth об'єкт
// window.db - Firestore об'єкт
// window.currentUser - поточний користувач

// Зберегти дані
await window.setDoc(userDocRef, dataObj);

// Завантажити дані
window.onSnapshot(userDocRef, (docSnap) => {
  const data = docSnap.data();
});
```

---

## 🎯 Архітектура коротко

```
┌─────────────────────┐
│   Браузер (5173)    │
│                     │
│  index.html         │
│  ├─ UI компоненти   │
│  ├─ Forms           │
│  └─ API_URL = ...   │
└──────────┬──────────┘
           │ HTTP
           ↓
┌─────────────────────┐
│  Express (3000)     │
│                     │
│  server.js          │
│  ├─ /api/generate   │
│  ├─ /api/recipe     │
│  └─ .env (ключи!)   │
└──────────┬──────────┘
           │ API call
           ↓
┌─────────────────────┐
│  Google Gemini      │
│  Firebase           │
│  External Services  │
└─────────────────────┘
```

---

## 🔑 Змінні оточення

**Обов'язкові:**
- `VITE_GEMINI_API_KEY` - Gemini API key
- `PORT` - Server port (3000)
- `CLIENT_URL` - Frontend URL (http://localhost:5173)

**Firebase (опціональні, вже налаштовані):**
- `FIREBASE_API_KEY`
- `FIREBASE_AUTH_DOMAIN`
- `FIREBASE_PROJECT_ID`
- `FIREBASE_STORAGE_BUCKET`
- `FIREBASE_MESSAGING_SENDER_ID`
- `FIREBASE_APP_ID`

---

## 💡 Поради та трюки

### Швидке перезавантаження сервера
```bash
npm run server:dev    # Автоматичне перезавантаження при змінці коду
```

### Пишіть логи правильно
```javascript
// ❌ Неправильно - буде видно в браузері
console.log("API Key: " + apiKey);

// ✅ Правильно - тільки в серверному логі
console.log("Request received:", req.body);
```

### Тестування API
```bash
# Використовувати curl
curl -X POST http://localhost:3000/api/health

# Або використовувати VS Code REST Client розширення
```

---

## 📚 Повна документація

- `README.md` - Повне описання проекту
- `SECURITY_SETUP.md` - Безпека та встановлення
- `DEPLOYMENT.md` - Production розгортання
- `SECURITY_SUMMARY.md` - Короткий підсумок
- `CHANGES.md` - Усі виконані зміни

---

## ✅ Pre-commit Checklist

Перед комітом переконайтесь:

- [ ] `.env` НЕ додан в git
- [ ] Немає hardcoded API ключів в коді
- [ ] Немає console.log з чутливими даними
- [ ] Усі залежності в package.json
- [ ] Тести проходять (якщо є)
- [ ] Немає warning'ів в console

```bash
# Правильний коміт
git add .   # Додати все (окрім .env завдяки .gitignore)
git commit -m "Add feature"
```

---

## 🆘 Отримати допомогу

1. **Перевірити логи:**
   ```bash
   # Браузер: F12 → Console
   # Сервер: npm run server (показує логи)
   ```

2. **Читати документацію:**
   - README.md
   - SECURITY_SETUP.md
   - DEPLOYMENT.md

3. **Запустити перевірку:**
   ```bash
   bash verify-security.sh
   ```

4. **Перезапустити все:**
   ```bash
   # Закрити обидва процеси (Ctrl+C)
   # Запустити заново
   npm run server    # Терміналу 1
   npm run dev       # Терміналу 2
   ```

---

**Created with ❤️ for secure development**

Last updated: 24 Dec 2025
