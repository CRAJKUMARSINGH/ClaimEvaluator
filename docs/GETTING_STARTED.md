# Getting Started with ClaimEvaluator

**Version:** 3.0  
**Last Updated:** March 5, 2026

---

## Prerequisites

### Required Software
- **Node.js:** Version 18 or higher
- **PostgreSQL:** Version 14 or higher
- **npm:** Version 8 or higher (comes with Node.js)

### Optional Tools
- **Git:** For version control
- **VS Code:** Recommended IDE
- **Postman:** For API testing

---

## Installation

### Step 1: Clone Repository

```bash
git clone https://github.com/CRAJKUMARSINGH/ClaimEvaluator.git
cd ClaimEvaluator
```

### Step 2: Install Dependencies

```bash
npm install
```

This will install all required packages including:
- Express, React, TypeScript
- bcrypt, pdf-parse, mammoth, xlsx
- Drizzle ORM, PostgreSQL driver
- And more...

### Step 3: Environment Configuration

```bash
# Copy example environment file
cp .env.example .env

# Edit .env with your settings
```

Required environment variables:

```env
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/claimevaluator

# Server
PORT=5003
NODE_ENV=development

# Session Secret
SESSION_SECRET=your-secret-key-here

# AI API Keys (optional)
OPENAI_API_KEY=your-openai-key
ANTHROPIC_API_KEY=your-anthropic-key
GOOGLE_API_KEY=your-google-key
GROK_API_KEY=your-grok-key

# File Upload
MAX_FILE_SIZE=10485760
UPLOAD_DIR=./uploads
```

### Step 4: Database Setup

```bash
# Create database
createdb claimevaluator

# Run migrations
npm run db:push

# Verify database
npm run db:studio
```

### Step 5: Start Development Server

```bash
# Development mode (with hot reload)
npm run dev

# Production mode
npm run build
npm start
```

The application will be available at:
- **Frontend:** http://localhost:5003
- **API:** http://localhost:5003/api
- **Health Check:** http://localhost:5003/api/health

---

## Verification

### Test the Installation

1. **Check Server Health**
```bash
curl http://localhost:5003/api/health
```

Expected response:
```json
{
  "status": "ok",
  "timestamp": "2026-03-05T...",
  "uptime": 123.45,
  "memory": {...}
}
```

2. **Access Frontend**
Open browser: http://localhost:5003

3. **Run Tests**
```bash
npm test
```

---

## First Steps

### 1. Create an Account

Navigate to http://localhost:5003 and register:
- Email: your@email.com
- Password: (minimum 8 characters)

### 2. Upload a Document

- Click "Upload Document"
- Select PDF, DOCX, or XLSX file
- Wait for parsing to complete

### 3. Create a Claim

- Click "New Claim"
- Select template (FIDIC or NHAI)
- Fill in claim details
- Generate draft

### 4. Export Claim

- Review generated claim
- Click "Export"
- Choose format (PDF, Excel, Word, JSON, CSV)

---

## Development Workflow

### Project Structure

```
ClaimEvaluator/
├── client/src/          # React frontend
│   ├── components/      # UI components
│   ├── pages/          # Page components
│   ├── hooks/          # Custom hooks
│   └── lib/            # Utilities
├── server/             # Express backend
│   ├── routes/         # API routes
│   ├── services/       # Business logic
│   └── storage/        # Data layer
├── shared/             # Shared code
│   ├── claimmaster/    # ClaimMaster.ai
│   ├── constants.ts    # Config
│   ├── helpers.ts      # Utils
│   └── schema.ts       # DB schema
└── tests/              # Test suites
```

### Available Scripts

```bash
# Development
npm run dev              # Start dev server with hot reload
npm run build            # Build for production
npm start                # Start production server

# Database
npm run db:push          # Push schema changes
npm run db:studio        # Open Drizzle Studio
npm run db:generate      # Generate migrations

# Testing
npm test                 # Run all tests
npm run test:unit        # Run unit tests
npm run test:integration # Run integration tests

# Code Quality
npm run lint             # Run ESLint
npm run type-check       # Run TypeScript checks
```

### Making Changes

1. **Create a branch**
```bash
git checkout -b feature/your-feature
```

2. **Make changes**
- Edit files in `client/`, `server/`, or `shared/`
- Follow TypeScript best practices
- Add tests for new features

3. **Test changes**
```bash
npm test
npm run type-check
```

4. **Commit and push**
```bash
git add .
git commit -m "feat: your feature description"
git push origin feature/your-feature
```

---

## Troubleshooting

### Common Issues

#### Port Already in Use
```bash
# Find process using port 5003
lsof -i :5003  # Mac/Linux
netstat -ano | findstr :5003  # Windows

# Kill the process or change PORT in .env
```

#### Database Connection Error
```bash
# Check PostgreSQL is running
pg_isready

# Verify DATABASE_URL in .env
# Ensure database exists
psql -l | grep claimevaluator
```

#### Module Not Found
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

#### TypeScript Errors
```bash
# Rebuild TypeScript
npm run build

# Check for type errors
npm run type-check
```

---

## Next Steps

- Read [Features Guide](./FEATURES.md) to learn about all features
- Check [API Reference](./API_REFERENCE.md) for API documentation
- See [Development Guide](./DEVELOPMENT.md) for advanced topics
- Review [Deployment Guide](./DEPLOYMENT.md) for production setup

---

## Getting Help

- **Documentation:** See [docs/](./README.md)
- **Issues:** https://github.com/CRAJKUMARSINGH/ClaimEvaluator/issues
- **Discussions:** https://github.com/CRAJKUMARSINGH/ClaimEvaluator/discussions
