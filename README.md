# 🏗️ ClaimEvaluator - AI-Powered Construction Claims Analysis

> **Version 2.0 - Integrated Edition** | Production-Ready | Multi-AI Support | Stream-Deploy Ready

A comprehensive AI-powered construction claims analysis system designed for FIDIC and NHAI contract claims processing with sector-specific intelligence.

## ✨ Key Features

- **🤖 Multi-AI Support**: Grok (xAI), OpenAI GPT-4, Anthropic Claude, Google Gemini with auto-failover
- **📄 Multi-Document Processing**: PDF, Word (.docx), Excel (.xlsx) with intelligent parsing
- **💰 Financial Calculations**: FIDIC Traditional, FIDIC Green Book, NHAI HAM methodologies
- **🎯 Sector-Specific Analysis**: Highway, Bridge, Metro, Power, Airport, Tunnel, Port, Smart City
- **⚡ Claims Enhancement**: AI-powered legal language strengthening and opportunity identification
- **🔄 Real-time Processing**: WebSocket-powered live updates and progress tracking
- **📊 Interactive Visualizations**: Charts, graphs, and financial breakdowns
- **🎨 Modern UI**: React 18 + TypeScript + Tailwind CSS + shadcn/ui components
- **🚀 Production Ready**: Pre-compiled, optimized, and deployment-ready

## 🎯 Key Features

### Multi-AI Support
- **Grok (xAI)** - Primary AI provider
- **OpenAI GPT-4** - Fallback provider
- **Anthropic Claude** - Optional
- **Google Gemini** - Optional
- Auto-failover ensures continuous operation

### Document Processing
- PDF, Word (.docx), Excel (.xlsx) support
- Intelligent text extraction
- LRU caching (200 items, 100MB)
- Parallel processing

### Financial Calculations
- **FIDIC Traditional** (Red Book)
- **FIDIC Green Book** (Short Form)
- **NHAI HAM** (Hybrid Annuity Model)
- Sector-specific adjustments
- Confidence scoring

### Sector Intelligence (9 Types)
Highway • Bridge • Metro • Power • Airport • Tunnel • Water • Port • Smart City

### Claims Analysis
- Current claims extraction
- Enhanced claims generation
- Inconsistency detection
- Legal language strengthening
- Actionable recommendations

### Real-time Processing
- WebSocket live updates
- Progress tracking
- Status notifications
- Streaming responses

---

## 🤝 Contributing

Contributions welcome! Fork the repo, create a feature branch, and submit a PR.

## 📧 Support

**Email**: crajkumarsingh@hotmail.com  
**GitHub**: [@CRAJKUMARSINGH](https://github.com/CRAJKUMARSINGH)

## 📄 License

MIT License - see [LICENSE](./LICENSE) file

---

**Built by RAJKUMAR SINGH CHAUHAN (CRAJKUMARSINGH)**  
**Version**: 2.0.0 | **Status**: Production Ready ✅

## 🌐 Deployment

### Vercel (Recommended - 3 Minutes)
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/CRAJKUMARSINGH/ClaimEvaluator)

1. Click button above
2. Import repository
3. Add environment variables
4. Deploy ✨

### Railway / Render
See **[DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)** for detailed instructions.

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

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `DATABASE_URL` | PostgreSQL connection string (Neon recommended) | Yes* | - |
| `STORAGE_TYPE` | Storage mode: `database` or `memory` | No | database |
| `GROK_API_KEY` | xAI Grok API key (primary AI) | No** | - |
| `OPENAI_API_KEY` | OpenAI API key (fallback AI) | No** | - |
| `ANTHROPIC_API_KEY` | Anthropic Claude API key (optional) | No | - |
| `GOOGLE_API_KEY` | Google Gemini API key (optional) | No | - |
| `GROK_MODEL` | Grok model name | No | grok-2-latest |
| `OPENAI_MODEL` | OpenAI model name | No | gpt-4o |
| `ANTHROPIC_MODEL` | Claude model name | No | claude-3-5-sonnet-20241022 |
| `GEMINI_MODEL` | Gemini model name | No | gemini-2.0-flash-exp |
| `NODE_ENV` | Environment mode | Yes | development |
| `PORT` | Server port | No | 5003 |
| `SESSION_SECRET` | Session encryption key | Yes | - |
| `MAX_FILE_SIZE` | Max upload size (bytes) | No | 10485760 |
| `CACHE_MAX_SIZE` | Cache size limit (bytes) | No | 104857600 |
| `CORS_ORIGIN` | CORS allowed origins | No | * |

\* Not required if `STORAGE_TYPE=memory`  
\*\* At least one AI API key required

## 🛠️ Tech Stack

**Frontend**
- React 18.3.1 + TypeScript 5.8.3
- Tailwind CSS 3.4.17 + shadcn/ui
- Recharts 2.15.4 (visualizations)
- Framer Motion 11.13.1 (animations)
- TanStack Query 5.83.0 (data fetching)

**Backend**
- Node.js 18+ + Express 4.21.2
- TypeScript 5.8.3
- Drizzle ORM 0.39.1
- WebSocket (ws 8.18.0)

**AI Providers**
- Grok (xAI) - Primary
- OpenAI GPT-4 - Fallback
- Anthropic Claude - Optional
- Google Gemini - Optional

**Database**
- PostgreSQL (Neon, Railway, Supabase)
- In-memory mode for development

**Document Processing**
- mammoth 1.10.0 (Word)
- pdf-parse 1.1.1 (PDF)
- xlsx 0.18.5 (Excel)

**Build & Deploy**
- Vite 5.4.19 + esbuild 0.25.0
- Vercel / Railway / Render ready

## 📁 Project Structure

```
ClaimEvaluator/
├── dist/                      # Compiled production build
│   ├── index.js              # Server bundle (1803 lines)
│   ├── index.html            # Frontend entry
│   └── assets/               # Frontend bundles (React, UI, Charts)
├── uploads/                   # Runtime file uploads
├── package.json              # Dependencies & scripts
├── vite.config.ts            # Build configuration
├── tsconfig.json             # TypeScript config
├── drizzle.config.ts         # Database migrations
├── vercel.json               # Vercel deployment config
├── .env.example              # Environment template
├── README.md                 # This file
├── DEPLOYMENT_GUIDE.md       # Platform-specific deployment
├── STREAM_DEPLOY_GUIDE.md    # One-click deployment guide
└── FEATURES_INTEGRATED.md    # Complete feature documentation
```

**Note**: Source files are pre-compiled into `dist/`. The app is production-ready out of the box.

## 🔌 API Endpoints

### Documents
- `POST /api/documents/upload` - Upload documents (PDF/Word/Excel)
- `POST /api/documents/load-provided` - Load pre-attached documents
- `GET /api/documents/:id` - Get document details
- `DELETE /api/documents/:id` - Delete document

### Analysis
- `POST /api/analysis/create` - Create claims analysis
- `GET /api/analysis/latest` - Get latest analysis
- `GET /api/analysis/:id` - Get specific analysis
- `PUT /api/analysis/:id` - Update analysis

### Calculations
- `POST /api/calculations/create` - Perform financial calculations
- `GET /api/calculations/:id` - Get calculation results
- `GET /api/calculations/by-analysis/:analysisId` - Get by analysis

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/me` - Get current user

### Health
- `GET /api/health` - Health check endpoint

## 💻 Development Commands

```bash
# Development
npm run dev              # Start dev server (port 5003)
npm run dev:win          # Windows-specific dev command

# Production
npm run start            # Start production server
npm run start:win        # Windows-specific start
npm run start:one-click  # Install + build + start

# Build & Optimization
npm run build            # Build (pre-compiled, no-op)
npm run build:optimize   # Clean + build + optimize
npm run clean            # Clean dist and cache

# Database
npm run db:push          # Push schema changes to database

# Testing
npm run test             # Run functional tests
npm run test:enhanced    # Run enhanced tests
npm run test:all         # Run all tests
npm run test:performance # Performance tests

# Code Quality
npm run check            # TypeScript type checking
npm run lint             # ESLint check
npm run lint:fix         # ESLint auto-fix

# Deployment
npm run deploy:vercel    # Deploy to Vercel
npm run deploy:one-click # Build + deploy to Vercel
npm run deploy:full      # Full deployment script
```

## 📚 Documentation

- **[README.md](./README.md)** - Complete guide (this file)
- **[DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)** - Deployment instructions
- **[.env.example](./.env.example)** - Environment variable template

## 🚀 Quick Start

### Local Development (3 Minutes)
```bash
# 1. Clone and install
git clone https://github.com/CRAJKUMARSINGH/ClaimEvaluator.git
cd ClaimEvaluator
npm install

# 2. Configure environment
cp .env.example .env
# Edit .env with your API keys

# 3. Start development server
npm run dev

# 4. Visit http://localhost:5003
```

### Quick Test (No Database)
```bash
# Use memory storage for instant testing
echo "NODE_ENV=development" > .env
echo "STORAGE_TYPE=memory" >> .env
echo "GROK_API_KEY=your-key-here" >> .env
echo "SESSION_SECRET=random-32-char-string" >> .env
npm run dev
```

### Deploy to Production
See **[DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)** for:
- Vercel one-click deploy
- Railway auto-database setup
- Render free tier deployment