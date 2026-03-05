/**
 * Document Parser Service
 * Real implementation for parsing PDF, DOCX, XLSX files
 * Part of Phase 2 refactoring
 */

import * as fs from 'fs';
import * as path from 'path';
import pdfParse from 'pdf-parse';
import mammoth from 'mammoth';
import * as XLSX from 'xlsx';
import { detectProjectType, extractAmounts, extractDates } from '../../shared/helpers';
import { UPLOAD_CONFIG, ERROR_MESSAGES } from '../../shared/constants';

export interface ParsedDocument {
  filename: string;
  fileType: string;
  fileSize: number;
  content: string;
  metadata: {
    pageCount?: number;
    wordCount: number;
    characterCount: number;
    projectType?: string;
    amounts?: number[];
    dates?: Date[];
    sheets?: string[];
  };
  extractedData: {
    projectType: string;
    amounts: number[];
    dates: Date[];
    keywords: string[];
  };
  parseTime: number;
  success: boolean;
  error?: string;
}

export class DocumentParser {
  /**
   * Parse any supported document type
   */
  async parseDocument(filePath: string): Promise<ParsedDocument> {
    const startTime = Date.now();
    const filename = path.basename(filePath);
    const fileExtension = path.extname(filePath).toLowerCase();
    
    try {
      // Check file exists
      if (!fs.existsSync(filePath)) {
        throw new Error(ERROR_MESSAGES.FILE.NOT_FOUND);
      }

      // Get file stats
      const stats = fs.statSync(filePath);
      const fileSize = stats.size;

      // Check file size
      if (fileSize > UPLOAD_CONFIG.MAX_FILE_SIZE) {
        throw new Error(ERROR_MESSAGES.FILE.TOO_LARGE);
      }

      // Parse based on file type
      let content: string;
      let metadata: any = {};

      switch (fileExtension) {
        case '.pdf':
          ({ content, metadata } = await this.parsePDF(filePath));
          break;
        case '.docx':
        case '.doc':
          ({ content, metadata } = await this.parseDOCX(filePath));
          break;
        case '.xlsx':
        case '.xls':
          ({ content, metadata } = await this.parseXLSX(filePath));
          break;
        case '.txt':
          content = await this.parseTXT(filePath);
          break;
        default:
          throw new Error(ERROR_MESSAGES.FILE.INVALID_TYPE);
      }

      // Extract data from content
      const extractedData = this.extractData(content);

      // Calculate word count
      const wordCount = content.split(/\s+/).filter(word => word.length > 0).length;
      const characterCount = content.length;

      const parseTime = Date.now() - startTime;

      return {
        filename,
        fileType: fileExtension,
        fileSize,
        content,
        metadata: {
          ...metadata,
          wordCount,
          characterCount,
          projectType: extractedData.projectType,
          amounts: extractedData.amounts,
          dates: extractedData.dates
        },
        extractedData,
        parseTime,
        success: true
      };

    } catch (error) {
      const parseTime = Date.now() - startTime;
      
      return {
        filename,
        fileType: path.extname(filePath).toLowerCase(),
        fileSize: 0,
        content: '',
        metadata: {
          wordCount: 0,
          characterCount: 0
        },
        extractedData: {
          projectType: 'Unknown',
          amounts: [],
          dates: [],
          keywords: []
        },
        parseTime,
        success: false,
        error: error instanceof Error ? error.message : ERROR_MESSAGES.FILE.PARSE_FAILED
      };
    }
  }

  /**
   * Parse PDF file using pdf-parse
   */
  private async parsePDF(filePath: string): Promise<{ content: string; metadata: any }> {
    try {
      const dataBuffer = fs.readFileSync(filePath);
      const data = await pdfParse(dataBuffer);

      return {
        content: data.text,
        metadata: {
          pageCount: data.numpages,
          pdfInfo: data.info,
          pdfMetadata: data.metadata
        }
      };
    } catch (error) {
      throw new Error(`PDF parsing failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Parse DOCX file using mammoth
   */
  private async parseDOCX(filePath: string): Promise<{ content: string; metadata: any }> {
    try {
      const result = await mammoth.extractRawText({ path: filePath });
      
      return {
        content: result.value,
        metadata: {
          messages: result.messages,
          hasWarnings: result.messages.length > 0
        }
      };
    } catch (error) {
      throw new Error(`DOCX parsing failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Parse XLSX file using xlsx
   */
  private async parseXLSX(filePath: string): Promise<{ content: string; metadata: any }> {
    try {
      const workbook = XLSX.readFile(filePath);
      const sheetNames = workbook.SheetNames;
      
      let content = '';
      const sheets: string[] = [];

      // Extract text from all sheets
      for (const sheetName of sheetNames) {
        sheets.push(sheetName);
        const worksheet = workbook.Sheets[sheetName];
        const sheetData = XLSX.utils.sheet_to_txt(worksheet);
        content += `\n=== Sheet: ${sheetName} ===\n${sheetData}\n`;
      }

      return {
        content: content.trim(),
        metadata: {
          sheets,
          sheetCount: sheetNames.length
        }
      };
    } catch (error) {
      throw new Error(`XLSX parsing failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Parse TXT file
   */
  private async parseTXT(filePath: string): Promise<string> {
    try {
      return fs.readFileSync(filePath, 'utf-8');
    } catch (error) {
      throw new Error(`TXT parsing failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Extract structured data from content
   */
  private extractData(content: string): {
    projectType: string;
    amounts: number[];
    dates: Date[];
    keywords: string[];
  } {
    // Detect project type
    const projectType = detectProjectType(content);

    // Extract amounts
    const amounts = extractAmounts(content);

    // Extract dates
    const dates = extractDates(content);

    // Extract keywords
    const keywords = this.extractKeywords(content);

    return {
      projectType,
      amounts,
      dates,
      keywords
    };
  }

  /**
   * Extract important keywords from content
   */
  private extractKeywords(content: string): string[] {
    const keywords: string[] = [];
    const lowerContent = content.toLowerCase();

    // Contract-related keywords
    const contractKeywords = [
      'fidic', 'nhai', 'jct', 'nec', 'aia', 'contract', 'agreement',
      'claim', 'variation', 'delay', 'extension', 'eot', 'prolongation',
      'disruption', 'acceleration', 'suspension', 'termination',
      'payment', 'invoice', 'certificate', 'valuation', 'measurement'
    ];

    for (const keyword of contractKeywords) {
      if (lowerContent.includes(keyword)) {
        keywords.push(keyword);
      }
    }

    return [...new Set(keywords)]; // Remove duplicates
  }

  /**
   * Parse multiple documents
   */
  async parseMultipleDocuments(filePaths: string[]): Promise<ParsedDocument[]> {
    const results: ParsedDocument[] = [];

    for (const filePath of filePaths) {
      const result = await this.parseDocument(filePath);
      results.push(result);
    }

    return results;
  }

  /**
   * Get document summary
   */
  generateSummary(parsed: ParsedDocument): string {
    const { filename, fileType, fileSize, metadata, extractedData } = parsed;

    const sizeMB = (fileSize / (1024 * 1024)).toFixed(2);
    const amountsSummary = extractedData.amounts.length > 0
      ? `Found ${extractedData.amounts.length} amounts, largest: ₹${(extractedData.amounts[0] / 10000000).toFixed(2)} Cr`
      : 'No amounts found';

    return `
Document: ${filename}
Type: ${fileType}
Size: ${sizeMB} MB
Words: ${metadata.wordCount}
Project Type: ${extractedData.projectType}
${amountsSummary}
Dates: ${extractedData.dates.length} found
Keywords: ${extractedData.keywords.join(', ')}
    `.trim();
  }
}

// Export singleton instance
export const documentParser = new DocumentParser();
