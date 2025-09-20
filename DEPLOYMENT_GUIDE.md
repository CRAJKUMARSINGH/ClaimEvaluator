# 🚀 ClaimEvaluator11 Web Deployment Guide

## Quick Deployment Options

### Option 1: Vercel (Recommended)

1. **Visit [vercel.com](https://vercel.com)** and sign in with GitHub
2. **Click "New Project"**
3. **Import your repository**: `CRAJKUMARSINGH/ClaimEvaluator11`
4. **Configure settings**:
   - Framework Preset: Other
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

5. **Add Environment Variables**:
   ```
   NODE_ENV=production
   DATABASE_URL=your_neon_postgresql_url
   OPENAI_API_KEY=your_openai_api_key
   ```

6. **Deploy** - Your app will be live at `https://claim-evaluator11.vercel.app`

### Option 2: Railway

1. **Visit [railway.app](https://railway.app)** and sign in with GitHub
2. **Click "New Project"** → **Deploy from GitHub repo**
3. **Select your repository**: `CRAJKUMARSINGH/ClaimEvaluator11`
4. **Add environment variables** (same as above)
5. **Deploy** - Railway provides PostgreSQL database automatically

### Option 3: Render

1. **Visit [render.com](https://render.com)** and sign in with GitHub
2. **Click "New Web Service"**
3. **Connect your repository**: `CRAJKUMARSINGH/ClaimEvaluator11`
4. **Configure**:
   - Build Command: `npm run build`
   - Start Command: `npm start`
5. **Add environment variables**
6. **Deploy**

## Required Environment Variables

Before deploying, you'll need:

### 1. Database (Neon PostgreSQL)
- Go to [neon.tech](https://neon.tech)
- Create a free account
- Create a new database
- Copy the connection string

### 2. OpenAI API Key
- Go to [platform.openai.com](https://platform.openai.com)
- Sign up/login
- Go to API Keys section
- Create a new secret key

### 3. Optional: Grok API Key (xAI)
- Go to [x.ai](https://x.ai)
- Sign up for API access
- Get your API key

## Post-Deployment Steps

1. **Test your application** at the provided URL
2. **Set up your database tables** using Drizzle
3. **Upload test documents** to verify functionality
4. **Configure custom domain** (optional)

## Troubleshooting

- **Build fails**: Check environment variables are set correctly
- **Database connection**: Verify DATABASE_URL format
- **API errors**: Confirm OpenAI API key is valid and has credits

## Your Application Features

Once deployed, users can:
- 📄 Upload construction documents (PDF, Word, Excel)
- 🤖 Get AI-powered claims analysis
- 💰 Perform financial calculations using multiple methodologies
- 📊 Generate enhanced claims reports
- 🔄 Track workflow progress in real-time

---

**Need help?** Contact RAJKUMAR SINGH CHAUHAN at crajkumarsingh@hotmail.com