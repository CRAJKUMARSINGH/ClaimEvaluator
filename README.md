# ClaimEvaluator v3.0

**AI-Powered Construction Claims Management Platform**

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Node](https://img.shields.io/badge/node-%3E%3D18-green.svg)](https://nodejs.org)
[![TypeScript](https://img.shields.io/badge/typescript-5.0-blue.svg)](https://www.typescriptlang.org)

---

## 🚀 Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Configure environment
cp .env.example .env

# 3. Setup database
npm run db:push

# 4. Start server
npm start
```

Open http://localhost:5003

---

## ✨ Features

### ClaimMaster.ai - AI-Powered Claim Drafting
- 📝 Professional FIDIC & NHAI claim templates
- 🤖 Three specialized AI assistants (Delay Expert, Quantum Expert, AI Negotiator)
- 📊 Automated claim generation with variable replacement
- 📄 Export to PDF, Excel, Word, JSON, CSV

### Global Construction Standards
- 🌍 26 international contract types (FIDIC, JCT, NEC, AIA, World Bank, NHAI)
- 💱 50+ currencies with real-time conversion
- 📈 Predictive analytics and benchmarking
- 👥 Multi-user collaboration with RBAC

### Document Management
- 📎 Real PDF/DOCX/XLSX parsing
- 🔍 AI-powered document analysis
- 💾 Secure file storage
- 🔐 bcrypt authentication (12 rounds)

### Financial Calculations
- 💰 FIDIC Traditional methodology
- 🌱 FIDIC Green methodology
- 🛣️ NHAI HAM methodology
- 💵 Multi-currency support

---

## 📋 Requirements

- **Node.js:** 18+
- **PostgreSQL:** 14+
- **npm:** 8+

---

## 🏗️ Architecture

```
ClaimEvaluator/
├── client/          # React frontend (TypeScript, Tailwind CSS)
├── server/          # Express backend
│   ├── routes/      # API endpoints
│   ├── services/    # Business logic (AI, auth, parsing)
│   └── storage/     # Data persistence layer
├── shared/          # Shared code
│   ├── claimmaster/ # ClaimMaster.ai modules
│   ├── constants.ts # Configuration
│   ├── helpers.ts   # Utilities
│   └── schema.ts    # Database schema
├── tests/           # Test suites (46 tests, 100% pass rate)
└── docs/            # Documentation
```

---

## �️ Technology Stack

**Frontend**
- React 18 + TypeScript
- Tailwind CSS
- Wouter (routing)
- Tanstack Query

**Backend**
- Node.js + Express
- TypeScript
- Drizzle ORM
- PostgreSQL

**AI & Processing**
- OpenAI, Anthropic, Google Gemini, Grok
- pdf-parse, mammoth, xlsx
- bcrypt, express-session

---

## 📚 Documentation

- [Getting Started](docs/GETTING_STARTED.md) - Installation and setup
- [Test Report](CLAIMMASTER_TEST_REPORT.md) - 46 tests, 100% pass rate
- [Deployment Guide](DEPLOYMENT_GUIDE.md) - Production deployment

---

## 🧪 Testing

```bash
# Run all tests
npm test

# Run specific test suites
node tests/claimmaster/test-runner-simple.cjs
node tests/claimmaster/integration-test.mjs

# Test helpers and constants
node test-helpers-constants.cjs
```

**Test Coverage:** 46 tests, 100% pass rate
- 20 logic tests
- 26 integration tests

---

## 📦 Installation

### Development

```bash
# Install dependencies
npm install

# Setup environment
cp .env.example .env
# Edit .env with your settings

# Run database migrations
npm run db:push

# Start development server
npm run dev
```

### Production

```bash
# Build for production
npm run build

# Start production server
npm start
```

---

## 🔧 Configuration

### Environment Variables

```env
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/claimevaluator

# Server
PORT=5003
NODE_ENV=production

# Session
SESSION_SECRET=your-secret-key

# AI API Keys (optional)
OPENAI_API_KEY=your-key
ANTHROPIC_API_KEY=your-key
GOOGLE_API_KEY=your-key
GROK_API_KEY=your-key

# File Upload
MAX_FILE_SIZE=10485760
UPLOAD_DIR=./uploads
```

---

## 📊 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login
- `POST /api/auth/logout` - Logout
- `GET /api/auth/me` - Get current user
- `POST /api/auth/change-password` - Change password

### Documents
- `POST /api/documents/upload` - Upload document
- `POST /api/documents/upload-multiple` - Upload multiple
- `GET /api/documents/:id` - Get document
- `DELETE /api/documents/:id` - Delete document
- `GET /api/documents` - List documents

### Claims (ClaimMaster.ai)
- `POST /api/claims/draft` - Draft claim
- `GET /api/claims/templates` - List templates
- `POST /api/claims/analyze` - AI analysis
- `POST /api/claims/export` - Export claim

### Health
- `GET /api/health` - Health check

---

## 🎯 Key Features Implemented

✅ **ClaimMaster.ai Phase 1** (1500+ lines)
- Professional FIDIC & NHAI templates
- AI-powered drafting engine
- Three specialized AI assistants
- Confidence scoring (70-95%)

✅ **Global Features**
- 26 contract standards
- 50+ currencies
- Predictive analytics
- Collaboration & RBAC

✅ **Document Processing**
- Real PDF/DOCX/XLSX parsing
- AI analysis
- Secure storage

✅ **Security**
- bcrypt authentication
- Session management
- Role-based access control

---

## � Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### Manual Deployment

```bash
# Build
npm run build

# Set environment variables
export DATABASE_URL=...
export SESSION_SECRET=...

# Start
npm start
```

See [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md) for detailed instructions.

---

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'feat: add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

---

## 📝 License

This project is licensed under the MIT License - see [LICENSE](LICENSE) file.

---

## 🙏 Acknowledgments

- FIDIC for contract standards
- NHAI for HAM methodology
- OpenAI, Anthropic, Google for AI capabilities

---

## 📞 Support

- **Issues:** https://github.com/CRAJKUMARSINGH/ClaimEvaluator/issues
- **Discussions:** https://github.com/CRAJKUMARSINGH/ClaimEvaluator/discussions

---

**Built with ❤️ for the construction industry**
