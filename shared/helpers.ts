/**
 * Shared Helper Functions
 * Consolidated utilities used across the application
 * Part of v3 refactoring - eliminates code duplication
 */

/**
 * Delay execution for specified milliseconds
 * Used for rate limiting, retries, and testing
 */
export function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Detect project type from text content
 * Used by document parser and AI analysis
 */
export function detectProjectType(text: string): string {
  const lower = text.toLowerCase();
  
  // Highway and Road projects
  if (lower.includes('highway') || lower.includes('road') || lower.includes('expressway')) {
    return 'Highway';
  }
  
  // Bridge projects
  if (lower.includes('bridge') || lower.includes('flyover') || lower.includes('overpass')) {
    return 'Bridge';
  }
  
  // Building projects
  if (lower.includes('building') || lower.includes('commercial') || lower.includes('residential')) {
    return 'Building';
  }
  
  // Power and Energy projects
  if (lower.includes('power') || lower.includes('energy') || lower.includes('solar') || 
      lower.includes('wind') || lower.includes('thermal') || lower.includes('hydro')) {
    return 'Power Plant';
  }
  
  // Water projects
  if (lower.includes('water') || lower.includes('dam') || lower.includes('reservoir') || 
      lower.includes('irrigation') || lower.includes('canal')) {
    return 'Water Resources';
  }
  
  // Railway projects
  if (lower.includes('railway') || lower.includes('rail') || lower.includes('metro') || 
      lower.includes('subway')) {
    return 'Railway';
  }
  
  // Airport projects
  if (lower.includes('airport') || lower.includes('aerodrome') || lower.includes('runway')) {
    return 'Airport';
  }
  
  // Port and Harbor projects
  if (lower.includes('port') || lower.includes('harbor') || lower.includes('harbour') || 
      lower.includes('jetty')) {
    return 'Port';
  }
  
  // Default
  return 'General Construction';
}

/**
 * Extract monetary amounts from text
 * Supports multiple formats: Crores, Lakhs, INR, ₹
 */
export function extractAmounts(text: string): number[] {
  const amounts: number[] = [];
  
  // Pattern 1: Crores (₹ 451.47 Cr, ₹451.47 crore)
  const crorePattern = /₹\s*([\d,]+(?:\.\d{2})?)\s*(?:crore|cr)/gi;
  const croreMatches = text.matchAll(crorePattern);
  for (const match of croreMatches) {
    const value = parseFloat(match[1].replace(/,/g, ''));
    if (!isNaN(value)) {
      amounts.push(value * 10000000); // Convert crores to rupees
    }
  }
  
  // Pattern 2: Lakhs (₹ 50 Lakh, ₹50 lac)
  const lakhPattern = /₹\s*([\d,]+(?:\.\d{2})?)\s*(?:lakh|lac)/gi;
  const lakhMatches = text.matchAll(lakhPattern);
  for (const match of lakhMatches) {
    const value = parseFloat(match[1].replace(/,/g, ''));
    if (!isNaN(value)) {
      amounts.push(value * 100000); // Convert lakhs to rupees
    }
  }
  
  // Pattern 3: Direct INR (₹ 50,00,000 or ₹5000000)
  const inrPattern = /₹\s*([\d,]+(?:\.\d{2})?)/g;
  const inrMatches = text.matchAll(inrPattern);
  for (const match of inrMatches) {
    const value = parseFloat(match[1].replace(/,/g, ''));
    if (!isNaN(value) && value > 1000) { // Ignore small amounts
      amounts.push(value);
    }
  }
  
  // Pattern 4: INR prefix (INR 50000000)
  const inrPrefixPattern = /INR\s*([\d,]+(?:\.\d{2})?)/gi;
  const inrPrefixMatches = text.matchAll(inrPrefixPattern);
  for (const match of inrPrefixMatches) {
    const value = parseFloat(match[1].replace(/,/g, ''));
    if (!isNaN(value)) {
      amounts.push(value);
    }
  }
  
  // Remove duplicates and sort descending
  return [...new Set(amounts)].sort((a, b) => b - a);
}

/**
 * Extract dates from text
 * Supports DD/MM/YYYY, DD-MM-YYYY formats
 */
export function extractDates(text: string): Date[] {
  const dates: Date[] = [];
  
  // Pattern: DD/MM/YYYY or DD-MM-YYYY
  const datePattern = /(\d{1,2})[/-](\d{1,2})[/-](\d{2,4})/g;
  const matches = text.matchAll(datePattern);
  
  for (const match of matches) {
    const day = parseInt(match[1]);
    const month = parseInt(match[2]) - 1; // JS months are 0-indexed
    let year = parseInt(match[3]);
    
    // Handle 2-digit years
    if (year < 100) {
      year += year < 50 ? 2000 : 1900;
    }
    
    const date = new Date(year, month, day);
    if (!isNaN(date.getTime())) {
      dates.push(date);
    }
  }
  
  return dates;
}

/**
 * Format amount in Indian numbering system
 * Example: 50000000 -> "5.00 Cr" or "500.00 L"
 */
export function formatIndianAmount(amount: number): { crores: string; lakhs: string } {
  const crores = (amount / 10000000).toFixed(2);
  const lakhs = (amount / 100000).toFixed(2);
  
  return {
    crores: `${crores} Cr`,
    lakhs: `${lakhs} L`
  };
}

/**
 * Sanitize filename for safe file system operations
 */
export function sanitizeFilename(filename: string): string {
  return filename
    .replace(/[^a-z0-9.-]/gi, '_')
    .replace(/_{2,}/g, '_')
    .toLowerCase();
}

/**
 * Generate unique ID
 * Format: timestamp-random
 */
export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Truncate text to specified length with ellipsis
 */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength - 3) + '...';
}

/**
 * Check if string is valid email
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Calculate percentage
 */
export function calculatePercentage(value: number, total: number): number {
  if (total === 0) return 0;
  return (value / total) * 100;
}

/**
 * Round to specified decimal places
 */
export function roundTo(value: number, decimals: number = 2): number {
  return Math.round(value * Math.pow(10, decimals)) / Math.pow(10, decimals);
}
