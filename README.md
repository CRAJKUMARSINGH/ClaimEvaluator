# ClaimEvaluator - Construction Claims Analysis System

A comprehensive AI-powered construction claims analysis system designed for FIDIC and NHAI contract claims processing.

## Features

- **AI-Powered Analysis**: Uses Grok (xAI) by default, falls back to OpenAI GPT-4
- **Multi-Document Processing**: Supports Word, PDF, and Excel formats
- **Financial Calculations**: FIDIC Traditional, FIDIC Green Book, and NHAI HAM methodologies
- **Claims Enhancement**: Identifies opportunities and strengthens legal language
- **Real-time Processing**: Full-stack TypeScript application with React frontend

## Quick Start

### Prerequisites
- Node.js 18+
- PostgreSQL database (or use memory storage for development)
- Grok (xAI) API key or OpenAI API key

### Development Setup

1. Clone the repository:
```bash
git clone <your-repo-url>
cd ClaimEvaluator
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
# Edit .env with your actual values
```

4. Start development server:
```bash
npm run dev
```

Visit `http://localhost:5003` to access the application.

## Vercel Deployment

### One-Click Deploy
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/ClaimEvaluator)

### Manual Deployment

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Login to Vercel:
```bash
vercel login
```

3. Set environment variables in Vercel dashboard:
   - `DATABASE_URL`: Your Neon PostgreSQL connection string
   - `GROK_API_KEY`: Your xAI Grok API key (preferred)
   - `OPENAI_API_KEY`: Your OpenAI API key (fallback)
   - `GROK_BASE_URL` (optional): Override base URL (default `https://api.x.ai`)
   - `GROK_MODEL` (optional): e.g., `grok-2-latest`
   - `OPENAI_MODEL` (optional): e.g., `gpt-4o`
   - `NODE_ENV`: production

4. Deploy:
```bash
vercel --prod
```

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `DATABASE_URL` | PostgreSQL connection string (use Neon for production) | Yes |
| `GROK_API_KEY` | xAI Grok API key. If set, used by default | No |
| `OPENAI_API_KEY` | OpenAI API key for fallback | No |
| `GROK_BASE_URL` | Base URL for xAI Grok API (default `https://api.x.ai`) | No |
| `GROK_MODEL` | Grok model name (default `grok-2-latest`) | No |
| `OPENAI_MODEL` | OpenAI model name (default `gpt-4o`) | No |
| `NODE_ENV` | Environment (development/production) | Yes |
| `PORT` | Server port (default: 5003) | No |

## Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS, shadcn/ui
- **Backend**: Node.js, Express, TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **AI**: Grok (xAI) by default; OpenAI GPT-4 Turbo fallback
- **Deployment**: Vercel
- **Document Processing**: mammoth, pdf-parse, xlsx

## Project Structure

```
├── client/          # React frontend application
├── server/          # Express.js API server
├── shared/          # Shared TypeScript types and schemas
├── attached_assets/ # Pre-loaded construction documents
└── uploads/         # Runtime file uploads
```

## API Endpoints

- `POST /api/documents/upload` - Upload construction documents
- `POST /api/documents/load-provided` - Load pre-attached documents
- `POST /api/analysis/create` - Analyze claims from documents
- `GET /api/analysis/latest` - Get latest analysis results
- `POST /api/calculations/create` - Perform financial calculations

## Development Commands

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run check        # TypeScript type checking
npm run db:push      # Push database schema changes
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License - see LICENSE file for details.