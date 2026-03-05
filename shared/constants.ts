/**
 * Application Constants
 * Single source of truth for all configuration values
 * Part of v3 refactoring - eliminates hardcoded values
 */

// ============================================================================
// PROJECT CONFIGURATION
// ============================================================================

export const PROJECT_TYPES = [
  'Highway',
  'Bridge',
  'Building',
  'Power Plant',
  'Water Resources',
  'Railway',
  'Airport',
  'Port',
  'Metro',
  'General Construction'
] as const;

export type ProjectType = typeof PROJECT_TYPES[number];

// ============================================================================
// CONTRACT METHODOLOGIES
// ============================================================================

export const METHODOLOGIES = [
  'FIDIC Traditional',
  'FIDIC Green',
  'NHAI HAM',
  'JCT Standard',
  'NEC4 ECC',
  'AIA A201',
  'World Bank SBD'
] as const;

export type Methodology = typeof METHODOLOGIES[number];

// ============================================================================
// DEFAULT AMOUNTS (in INR)
// ============================================================================

export const DEFAULT_AMOUNTS = {
  // FIDIC Contracts
  FIDIC_TRADITIONAL: 45147000000,  // ₹451.47 Cr
  FIDIC_GREEN: 25000000000,        // ₹250 Cr
  FIDIC_RED: 45000000000,          // ₹450 Cr
  FIDIC_YELLOW: 50000000000,       // ₹500 Cr
  FIDIC_SILVER: 60000000000,       // ₹600 Cr
  
  // NHAI Contracts
  NHAI_HAM: 35000000000,           // ₹350 Cr
  NHAI_BOT: 40000000000,           // ₹400 Cr
  
  // Other Contracts
  JCT_STANDARD: 25000000000,       // ₹250 Cr
  NEC4_ECC: 30000000000,           // ₹300 Cr
  AIA_A201: 35000000000,           // ₹350 Cr
  WORLD_BANK: 50000000000,         // ₹500 Cr
  
  // Default fallback
  DEFAULT: 30000000000             // ₹300 Cr
} as const;

// ============================================================================
// REGEX PATTERNS
// ============================================================================

export const REGEX_PATTERNS = {
  // Amount patterns
  AMOUNT_CRORE: /₹\s*([\d,]+(?:\.\d{2})?)\s*(?:crore|cr)/gi,
  AMOUNT_LAKH: /₹\s*([\d,]+(?:\.\d{2})?)\s*(?:lakh|lac)/gi,
  AMOUNT_INR: /₹\s*([\d,]+(?:\.\d{2})?)/g,
  AMOUNT_INR_PREFIX: /INR\s*([\d,]+(?:\.\d{2})?)/gi,
  
  // Date patterns
  DATE_DMY: /(\d{1,2})[/-](\d{1,2})[/-](\d{2,4})/g,
  DATE_MDY: /(\d{1,2})[/-](\d{1,2})[/-](\d{2,4})/g,
  DATE_YMD: /(\d{4})[/-](\d{1,2})[/-](\d{1,2})/g,
  
  // Email pattern
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  
  // Phone pattern (Indian)
  PHONE_INDIAN: /^[6-9]\d{9}$/,
  
  // Contract reference patterns
  CONTRACT_REF: /(?:contract|agreement)\s*(?:no|number|ref|reference)?[:\s]*([A-Z0-9/-]+)/gi,
  CLAIM_REF: /(?:claim)\s*(?:no|number|ref|reference)?[:\s]*([A-Z0-9/-]+)/gi
} as const;

// ============================================================================
// AI CONFIGURATION
// ============================================================================

export const AI_CONFIG = {
  // Timeout settings
  TIMEOUT: 30000,                  // 30 seconds
  TIMEOUT_EXTENDED: 60000,         // 60 seconds for complex analysis
  
  // Retry settings
  MAX_RETRIES: 3,
  RETRY_DELAY: 1000,               // 1 second
  RETRY_BACKOFF: 2,                // Exponential backoff multiplier
  
  // Provider fallback chain
  FALLBACK_CHAIN: ['grok', 'openai', 'anthropic', 'gemini', 'local'] as const,
  
  // Model settings
  MODELS: {
    GROK: 'grok-beta',
    OPENAI: 'gpt-4-turbo-preview',
    ANTHROPIC: 'claude-3-opus-20240229',
    GEMINI: 'gemini-pro'
  },
  
  // Token limits
  MAX_TOKENS: {
    INPUT: 8000,
    OUTPUT: 2000
  },
  
  // Temperature settings
  TEMPERATURE: {
    PRECISE: 0.1,                  // For calculations
    BALANCED: 0.5,                 // For analysis
    CREATIVE: 0.8                  // For recommendations
  }
} as const;

// ============================================================================
// DATABASE CONFIGURATION
// ============================================================================

export const DB_CONFIG = {
  // Connection pool
  POOL_SIZE: 10,
  POOL_TIMEOUT: 30000,
  
  // Query timeouts
  QUERY_TIMEOUT: 10000,
  
  // Pagination
  DEFAULT_PAGE_SIZE: 20,
  MAX_PAGE_SIZE: 100
} as const;

// ============================================================================
// FILE UPLOAD CONFIGURATION
// ============================================================================

export const UPLOAD_CONFIG = {
  // Allowed file types
  ALLOWED_TYPES: [
    'application/pdf',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document', // .docx
    'application/msword',                                                       // .doc
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',       // .xlsx
    'application/vnd.ms-excel',                                                 // .xls
    'text/plain'                                                                // .txt
  ] as const,
  
  // File extensions
  ALLOWED_EXTENSIONS: ['.pdf', '.docx', '.doc', '.xlsx', '.xls', '.txt'] as const,
  
  // Size limits (in bytes)
  MAX_FILE_SIZE: 10 * 1024 * 1024,    // 10 MB
  MAX_TOTAL_SIZE: 50 * 1024 * 1024,   // 50 MB total
  
  // Upload directory
  UPLOAD_DIR: 'uploads'
} as const;

// ============================================================================
// SESSION CONFIGURATION
// ============================================================================

export const SESSION_CONFIG = {
  SECRET: process.env.SESSION_SECRET || 'claim-evaluator-secret-key-change-in-production',
  NAME: 'claim_evaluator_session',
  
  // Cookie settings
  COOKIE: {
    MAX_AGE: 24 * 60 * 60 * 1000,    // 24 hours
    HTTP_ONLY: true,
    SECURE: process.env.NODE_ENV === 'production',
    SAME_SITE: 'lax' as const
  },
  
  // Session store
  RESAVE: false,
  SAVE_UNINITIALIZED: false
} as const;

// ============================================================================
// SECURITY CONFIGURATION
// ============================================================================

export const SECURITY_CONFIG = {
  // Password hashing
  BCRYPT_ROUNDS: 12,
  
  // Rate limiting
  RATE_LIMIT: {
    WINDOW_MS: 15 * 60 * 1000,       // 15 minutes
    MAX_REQUESTS: 100                 // Max requests per window
  },
  
  // CORS
  CORS_ORIGINS: process.env.CORS_ORIGINS?.split(',') || ['http://localhost:5173', 'http://localhost:5003'],
  
  // Headers
  SECURITY_HEADERS: {
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'X-XSS-Protection': '1; mode=block',
    'Strict-Transport-Security': 'max-age=31536000; includeSubDomains'
  }
} as const;

// ============================================================================
// API ENDPOINTS
// ============================================================================

export const API_ENDPOINTS = {
  // Auth
  AUTH: {
    LOGIN: '/api/auth/login',
    LOGOUT: '/api/auth/logout',
    REGISTER: '/api/auth/register',
    ME: '/api/auth/me'
  },
  
  // Documents
  DOCUMENTS: {
    UPLOAD: '/api/documents/upload',
    LIST: '/api/documents',
    GET: '/api/documents/:id',
    DELETE: '/api/documents/:id'
  },
  
  // Analysis
  ANALYSIS: {
    RUN: '/api/analysis/run',
    GET: '/api/analysis/:id',
    LIST: '/api/analysis'
  },
  
  // Calculations
  CALCULATIONS: {
    FIDIC_TRADITIONAL: '/api/calculations/fidic-traditional',
    FIDIC_GREEN: '/api/calculations/fidic-green',
    NHAI_HAM: '/api/calculations/nhai-ham'
  },
  
  // Health
  HEALTH: '/api/health'
} as const;

// ============================================================================
// ERROR MESSAGES
// ============================================================================

export const ERROR_MESSAGES = {
  // Auth errors
  AUTH: {
    INVALID_CREDENTIALS: 'Invalid email or password',
    UNAUTHORIZED: 'Unauthorized access',
    SESSION_EXPIRED: 'Session expired, please login again',
    USER_EXISTS: 'User already exists',
    WEAK_PASSWORD: 'Password must be at least 8 characters'
  },
  
  // File errors
  FILE: {
    TOO_LARGE: 'File size exceeds maximum limit',
    INVALID_TYPE: 'Invalid file type',
    UPLOAD_FAILED: 'File upload failed',
    NOT_FOUND: 'File not found',
    PARSE_FAILED: 'Failed to parse document'
  },
  
  // Analysis errors
  ANALYSIS: {
    FAILED: 'Analysis failed',
    TIMEOUT: 'Analysis timeout',
    INVALID_INPUT: 'Invalid analysis input',
    NO_PROVIDER: 'No AI provider available'
  },
  
  // Database errors
  DATABASE: {
    CONNECTION_FAILED: 'Database connection failed',
    QUERY_FAILED: 'Database query failed',
    NOT_FOUND: 'Record not found'
  },
  
  // General errors
  GENERAL: {
    INTERNAL_ERROR: 'Internal server error',
    INVALID_REQUEST: 'Invalid request',
    NOT_IMPLEMENTED: 'Feature not implemented'
  }
} as const;

// ============================================================================
// SUCCESS MESSAGES
// ============================================================================

export const SUCCESS_MESSAGES = {
  AUTH: {
    LOGIN: 'Login successful',
    LOGOUT: 'Logout successful',
    REGISTER: 'Registration successful'
  },
  
  FILE: {
    UPLOADED: 'File uploaded successfully',
    DELETED: 'File deleted successfully'
  },
  
  ANALYSIS: {
    COMPLETED: 'Analysis completed successfully',
    STARTED: 'Analysis started'
  }
} as const;

// ============================================================================
// CALCULATION DEFAULTS
// ============================================================================

export const CALCULATION_DEFAULTS = {
  // Interest rates
  INTEREST_RATE: 0.12,               // 12% per annum
  COMPOUND_FREQUENCY: 12,            // Monthly compounding
  
  // Escalation rates
  ESCALATION_RATE: 0.05,             // 5% per annum
  
  // Overhead percentages
  OVERHEAD_PERCENTAGE: 0.15,         // 15%
  PROFIT_PERCENTAGE: 0.10,           // 10%
  
  // Delay thresholds (in days)
  MINOR_DELAY: 30,
  MODERATE_DELAY: 90,
  MAJOR_DELAY: 180,
  CRITICAL_DELAY: 365
} as const;

// ============================================================================
// EXPORT FORMATS
// ============================================================================

export const EXPORT_FORMATS = {
  PDF: 'pdf',
  EXCEL: 'excel',
  WORD: 'word',
  JSON: 'json',
  CSV: 'csv'
} as const;

export type ExportFormat = typeof EXPORT_FORMATS[keyof typeof EXPORT_FORMATS];

// ============================================================================
// APPLICATION METADATA
// ============================================================================

export const APP_METADATA = {
  NAME: 'ClaimEvaluator',
  VERSION: '2.2.0',
  EDITION: 'Ocean Edition - Clean Architecture',
  DESCRIPTION: 'AI-powered construction claims analysis platform',
  AUTHOR: 'CRAJKUMARSINGH',
  LICENSE: 'MIT'
} as const;
