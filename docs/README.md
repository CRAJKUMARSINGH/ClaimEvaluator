# ClaimEvaluator Documentation

**Version:** 3.0  
**Last Updated:** March 5, 2026

---

## Quick Links

- [Getting Started](./GETTING_STARTED.md) - Installation and setup
- [Features Guide](./FEATURES.md) - Complete feature documentation
- [API Reference](./API_REFERENCE.md) - API endpoints and usage
- [Development Guide](./DEVELOPMENT.md) - Development workflow
- [Deployment Guide](./DEPLOYMENT.md) - Production deployment

---

## What is ClaimEvaluator?

ClaimEvaluator is a comprehensive construction claims management platform that helps contractors, consultants, and project managers:

- Draft professional claims using AI-powered templates
- Analyze delays, quantum, and negotiation strategies
- Manage documents (PDF, DOCX, XLSX parsing)
- Calculate financial impacts using multiple methodologies
- Export claims in multiple formats (PDF, Excel, Word, JSON, CSV)

---

## Key Features

### 1. ClaimMaster.ai - AI-Powered Claim Drafting
- Professional FIDIC and NHAI claim templates
- AI-powered drafting engine with variable replacement
- Three specialized AI assistants (Delay Expert, Quantum Expert, AI Negotiator)
- Export to multiple formats

### 2. Global Features
- 26 international contract standards (FIDIC, JCT, NEC, AIA, World Bank, NHAI)
- 50+ currencies with real-time conversion
- Predictive analytics and benchmarking
- Multi-user collaboration with RBAC
- Advanced export system

### 3. Document Management
- Real PDF/DOCX/XLSX parsing
- Secure file storage
- Document analysis and extraction

### 4. Financial Calculations
- FIDIC Traditional methodology
- FIDIC Green methodology
- NHAI HAM methodology
- Multi-currency support

### 5. Security & Authentication
- bcrypt password hashing (12 rounds)
- Session management
- Role-based access control
- Audit logging

---

## Architecture

```
ClaimEvaluator/
├── client/          # React frontend
├── server/          # Express backend
│   ├── routes/      # API endpoints
│   ├── services/    # Business logic
│   └── storage/     # Data persistence
├── shared/          # Shared code
│   ├── claimmaster/ # ClaimMaster.ai modules
│   ├── constants.ts # Configuration
│   ├── helpers.ts   # Utilities
│   └── schema.ts    # Database schema
├── tests/           # Test suites
└── docs/            # Documentation
```

---

## Technology Stack

- **Frontend:** React, TypeScript, Tailwind CSS, Wouter
- **Backend:** Node.js, Express, TypeScript
- **Database:** PostgreSQL with Drizzle ORM
- **AI:** OpenAI, Anthropic, Google Gemini, Grok
- **Document Processing:** pdf-parse, mammoth, xlsx
- **Authentication:** bcrypt, express-session

---

## Getting Started

### Prerequisites
- Node.js 18+
- PostgreSQL 14+
- npm or yarn

### Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Configure environment
cp .env.example .env
# Edit .env with your settings

# 3. Run database migrations
npm run db:push

# 4. Start development server
npm run dev

# 5. Open browser
http://localhost:5003
```

For detailed instructions, see [Getting Started Guide](./GETTING_STARTED.md).

---

## Documentation Index

### User Guides
- [Getting Started](./GETTING_STARTED.md)
- [Features Guide](./FEATURES.md)
- [User Manual](./USER_MANUAL.md)

### Developer Guides
- [Development Guide](./DEVELOPMENT.md)
- [API Reference](./API_REFERENCE.md)
- [Testing Guide](./TESTING.md)

### Deployment
- [Deployment Guide](./DEPLOYMENT.md)
- [Environment Configuration](./ENVIRONMENT.md)

### Reference
- [Changelog](./CHANGELOG.md)
- [Migration Guide](./MIGRATION.md)
- [Troubleshooting](./TROUBLESHOOTING.md)

---

## Support

For issues, questions, or contributions:
- GitHub: https://github.com/CRAJKUMARSINGH/ClaimEvaluator
- Issues: https://github.com/CRAJKUMARSINGH/ClaimEvaluator/issues

---

## License

See [LICENSE](../LICENSE) file for details.
