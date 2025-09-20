# Overview

This project is a comprehensive Construction Claims Analysis System designed to help contractors and construction professionals analyze, enhance, and optimize their FIDIC and NHAI contract claims. The application combines AI-powered document analysis with sophisticated financial calculation engines to provide intelligent recommendations for claim submissions.

The system processes construction documents (Word, PDF, Excel), extracts existing claims, identifies inconsistencies, and generates enhanced claims with supporting calculations. It features a React-based frontend with a Node.js/Express backend, integrated with OpenAI for intelligent analysis and Drizzle ORM with PostgreSQL for data persistence.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
The client is built with React 18 using TypeScript and follows a component-based architecture. The UI framework is shadcn/ui with Radix UI primitives, styled using Tailwind CSS with custom design tokens. State management is handled through TanStack Query for server state and local React state for UI interactions. The application uses Wouter for lightweight client-side routing and includes comprehensive form handling with React Hook Form.

## Backend Architecture
The server runs on Express.js with TypeScript, implementing a RESTful API design. The architecture follows a service-oriented pattern with separate modules for document parsing, AI analysis, and financial calculations. File upload handling is managed through Multer with configurable storage options. The server includes middleware for request logging, error handling, and CORS management.

## Data Storage Solutions
The system uses PostgreSQL as the primary database with Drizzle ORM for type-safe database operations. The schema includes tables for users, documents, claims analysis, and calculations with proper relationships. Document content is stored as text with parsing status tracking. JSON fields store complex data structures like claim items, inconsistencies, and calculation results. The database supports both in-memory storage for development and persistent PostgreSQL for production.

## AI Integration
OpenAI GPT-4 Turbo is integrated for intelligent document analysis and claim enhancement. The AI service extracts current claims from uploaded documents, identifies inconsistencies across multiple documents, and generates recommendations for claim improvements. The system includes structured prompts for FIDIC and NHAI compliance analysis with support for multiple calculation methodologies.

## Financial Calculation Engine
A specialized calculation service implements multiple methodologies including FIDIC Traditional, FIDIC Green Book, and NHAI HAM contracts. The engine calculates prolongation costs covering plant & equipment, labor, overheads, and interest calculations. Results include detailed breakdowns with supporting documentation requirements and quantum assessments.

# External Dependencies

## Database & ORM
- **Neon Database**: Serverless PostgreSQL hosting with WebSocket support for real-time connections
- **Drizzle ORM**: Type-safe database toolkit with migration support and schema validation
- **connect-pg-simple**: PostgreSQL session store for Express sessions

## AI & Document Processing  
- **OpenAI API**: GPT-4 Turbo integration for intelligent claims analysis and document processing
- **PDF-Parse**: PDF document content extraction with metadata parsing
- **Mammoth**: Microsoft Word document (.docx/.doc) conversion to HTML/text
- **ExcelJS**: Excel spreadsheet parsing and data extraction

## Frontend UI Framework
- **shadcn/ui**: Modern React component library built on Radix UI primitives
- **Radix UI**: Headless, accessible UI component primitives
- **Tailwind CSS**: Utility-first CSS framework with custom design system
- **Lucide React**: Comprehensive icon library

## Development & Build Tools
- **Vite**: Fast development server and build tool with HMR support
- **TypeScript**: Static type checking across frontend and backend
- **ESBuild**: Fast JavaScript bundler for production builds
- **Replit Integration**: Development environment plugins and runtime error handling

## State Management & HTTP
- **TanStack Query**: Server state management with caching and background updates  
- **React Hook Form**: Form state management with validation support
- **Zod**: Runtime type validation and schema parsing
- **Wouter**: Minimalist client-side routing solution