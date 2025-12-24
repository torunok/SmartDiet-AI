# Production Deployment Guide

## 🌐 Варианты развертывания

### Option 1: Vercel + Heroku (Recommended)

#### Backend на Heroku
```bash
# 1. Установити Heroku CLI
brew tap heroku/brew && brew install heroku

# 2. Логин в Heroku
heroku login

# 3. Создать приложение
heroku create smartdiet-api

# 4. Установити environment variables
heroku config:set VITE_GEMINI_API_KEY=your_key_here
heroku config:set CLIENT_URL=https://smartdiet-ai.vercel.app
heroku config:set PORT=3000

# 5. Пушить код
git push heroku main
```

#### Frontend на Vercel
```bash
# 1. Установити Vercel CLI
npm i -g vercel

# 2. Деплой
vercel

# 3. Добавить environment variable
vercel env add VITE_API_URL https://smartdiet-api.herokuapp.com/api
```

### Option 2: Railway (Simpler)

```bash
# 1. Реїструватися на railway.app
# 2. Підключити GitHub репозиторій
# 3. Автоматически создает .railwayignore
# 4. Установити змінні оточення у Dashboard
```

### Option 3: Self-Hosted (VPS)

#### На Ubuntu VPS
```bash
# 1. Установити Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# 2. Клонировать репозиторий
git clone <your-repo> /var/www/smartdiet-ai
cd /var/www/smartdiet-ai

# 3. Установити залежності
npm install

# 4. Создать .env файл
sudo nano .env
# Поместити змінні оточення

# 5. Установити PM2 для керування процесом
sudo npm install -g pm2

# 6. Запустить приложение
pm2 start server.js --name "smartdiet-api"
pm2 save
pm2 startup

# 7. Установити Nginx як reverse proxy
sudo apt-get install nginx

# 8. Настроить Nginx
sudo nano /etc/nginx/sites-available/smartdiet
```

## 🔧 Nginx Configuration

```nginx
server {
    listen 80;
    server_name api.smartdiet.ai;

    location /api {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

## 🔐 Security Checklist

- [ ] HTTPS enabled (SSL/TLS)
- [ ] CORS properly configured (only your domain)
- [ ] API rate limiting enabled
- [ ] Environment variables set (no .env in git)
- [ ] Secrets rotated regularly
- [ ] CORS headers configured
- [ ] CSP headers set
- [ ] X-Frame-Options configured
- [ ] API authentication (if needed)
- [ ] Request validation

## 📊 Monitoring

### Sentry (Error Tracking)
```javascript
// server.js
import * as Sentry from "@sentry/node";

Sentry.init({ dsn: process.env.SENTRY_DSN });
app.use(Sentry.Handlers.errorHandler());
```

### Uptime Monitoring
```bash
# Use services like:
# - Better Uptime
# - Pingdom
# - UptimeRobot

# Add monitoring endpoint
GET /api/health
```

## 📈 Performance Optimization

### Caching
```javascript
app.use((req, res, next) => {
    res.set('Cache-Control', 'public, max-age=3600');
    next();
});
```

### Rate Limiting
```javascript
import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: 'Too many requests'
});

app.use('/api/', limiter);
```

### Database Connection Pooling
```javascript
// For Firebase, ensure connection pooling is enabled
const db = getFirestore(app);
```

## 🚀 CI/CD Pipeline

### GitHub Actions Example
```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: npm install
      - run: npm run build
      - name: Deploy to Vercel
        env:
          VERCEL_TOKEN: ${{ secrets.VERCEL_TOKEN }}
        run: vercel --prod
```

## 📝 Pre-Deployment Checklist

### Code
- [ ] No hardcoded API keys
- [ ] No console.log in production code
- [ ] Error handling implemented
- [ ] Input validation added
- [ ] Tests passing

### Environment
- [ ] .env configured
- [ ] .env.example updated (without secrets)
- [ ] NODE_ENV=production
- [ ] API_URL updated

### Security
- [ ] CORS configured
- [ ] Rate limiting enabled
- [ ] Secrets encrypted
- [ ] Dependencies updated
- [ ] No known vulnerabilities

### Performance
- [ ] Database indexes created
- [ ] Caching configured
- [ ] CDN setup (if needed)
- [ ] Load testing done

### Monitoring
- [ ] Error tracking enabled
- [ ] Logging configured
- [ ] Health checks working
- [ ] Alerts set up

## 🆘 Rollback Procedure

```bash
# Heroku
heroku releases
heroku rollback v123

# Railway
# Use dashboard to redeploy previous version

# Self-hosted
git revert <commit-hash>
pm2 restart smartdiet-api
```

## 📞 Support

For deployment issues:
1. Check server logs
2. Review error tracking (Sentry)
3. Verify environment variables
4. Check CORS headers
5. Test API endpoints

---

**Your SmartDiet.AI is now live! 🚀**
