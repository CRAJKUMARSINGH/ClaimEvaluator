# 🚀 ClaimEvaluator - Deployment Guide

## Quick Deploy (3 Minutes)

### Option 1: Vercel (Recommended)
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/CRAJKUMARSINGH/ClaimEvaluator)

1. Click button above or visit [vercel.com](https://vercel.com)
2. Import your GitHub repository
3. Configure:
   - Framework: Other
   - Build Command: `npm run build`
   - Output Directory: `dist`
4. Add Environment Variables (see below)
5. Deploy ✨

### Option 2: Railway (Auto Database)
1. Visit [railway.app](https://railway.app)
2. Deploy from GitHub repo
3. Add PostgreSQL service (automatic)
4. Add environment variables
5. Deploy!

### Option 3: Render (Free Tier)
1. Visit [render.com](https://render.com)
2. New Web Service → Connect repo
3. Configure:
   - Build: `npm run build`
   - Start: `npm start`
4. Add PostgreSQL database
5. Deploy!

---

## 🔑 Environment Variables

### Minimum Required
```bash
NODE_ENV=production
DATABASE_URL=postgresql://...
GROK_API_KEY=xai-xxx  # OR OPENAI_API_KEY
SESSION_SECRET=random-32-char-string
```

### Complete Configuration
```bash
# Database
DATABASE_URL=postgresql://user:pass@host:5432/db
# Get from: neon.tech, railway.app, or supabase.com

# AI Providers (at least one required)
GROK_API_KEY=xai-xxx              # Primary (x.ai)
OPENAI_API_KEY=sk-xxx             # Fallback (platform.openai.com)
ANTHROPIC_API_KEY=sk-ant-xxx      # Optional (console.anthropic.com)
GOOGLE_API_KEY=AIza-xxx           # Optional (ai.google.dev)

# Server
PORT=5003
SESSION_SECRET=random-32-character-string-here

# Optional
STORAGE_TYPE=database             # or 'memory' for dev
MAX_FILE_SIZE=10485760           # 10MB
CACHE_MAX_SIZE=104857600         # 100MB
CORS_ORIGIN=*                    # Set to your domain in prod
```

---

## 🗄️ Database Setup

### Neon (Recommended - Free)
1. Visit [neon.tech](https://neon.tech) → Create project
2. Copy connection string
3. Format: `postgresql://user:pass@ep-xxx.region.aws.neon.tech/neondb?sslmode=require`

### Railway PostgreSQL
- Automatically provided when you add PostgreSQL service
- No manual setup needed!

### Supabase
1. Visit [supabase.com](https://supabase.com) → New project
2. Settings → Database → Copy connection string
3. Use "Connection pooling" URL for better performance

---

## 🤖 Get API Keys

### Grok (xAI) - Primary
- Visit [x.ai](https://x.ai) → Get API key
- Pay-as-you-go pricing

### OpenAI - Fallback
- Visit [platform.openai.com](https://platform.openai.com)
- API Keys → Create new key
- Ensure billing is set up

### Anthropic Claude - Optional
- Visit [console.anthropic.com](https://console.anthropic.com)
- Get API key

### Google Gemini - Optional
- Visit [ai.google.dev](https://ai.google.dev)
- Get API key

---

## ✅ Verify Deployment

```bash
# Check readiness
npm run check:deploy

# Test health endpoint
curl https://your-app.vercel.app/api/health
# Should return: {"status":"ok"}

# Access frontend
# Visit: https://your-app.vercel.app
```

---

## 🔧 Troubleshooting

### Build Fails
- ✅ Check all environment variables are set
- ✅ Verify `NODE_ENV=production`
- ✅ Ensure `DATABASE_URL` format is correct

### Database Connection Error
- ✅ Verify PostgreSQL URL includes `?sslmode=require` for Neon
- ✅ Check database is accessible from deployment platform
- ✅ Try using connection pooling URL

### AI API Errors
- ✅ Verify API key is valid
- ✅ Check API key has credits/billing enabled
- ✅ Ensure no extra spaces in environment variable

### 502/504 Errors
- ✅ Increase function timeout (Vercel: 60s max on Pro)
- ✅ Check memory limits
- ✅ Verify database connection pool settings

---

## 🚀 Features Available

Once deployed:
- ✅ Multi-AI support (Grok, GPT-4, Claude, Gemini)
- ✅ PDF, Word, Excel document processing
- ✅ FIDIC & NHAI financial calculations
- ✅ 9 construction sector types
- ✅ Claims enhancement with AI
- ✅ Real-time WebSocket updates
- ✅ Modern responsive UI
- ✅ Dark/Light mode

---

## 📞 Support

**Email**: crajkumarsingh@hotmail.com
**Version**: 2.0.0
**Status**: Production Ready ✅