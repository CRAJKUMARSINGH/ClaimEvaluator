/**
 * Document Routes
 * Real document parsing endpoints
 * Part of Phase 2 refactoring
 */

import { Router, Request, Response } from 'express';
import multer from 'multer';
import * as path from 'path';
import * as fs from 'fs';
import { documentParser } from '../services/documentParser';
import { requireAuth } from './auth';
import { UPLOAD_CONFIG, ERROR_MESSAGES, SUCCESS_MESSAGES } from '../../shared/constants';
import { sanitizeFilename } from '../../shared/helpers';

const router = Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = UPLOAD_CONFIG.UPLOAD_DIR;
    
    // Create upload directory if it doesn't exist
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const timestamp = Date.now();
    const sanitized = sanitizeFilename(file.originalname);
    const filename = `${timestamp}-${sanitized}`;
    cb(null, filename);
  }
});

const upload = multer({
  storage,
  limits: {
    fileSize: UPLOAD_CONFIG.MAX_FILE_SIZE
  },
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    
    if (UPLOAD_CONFIG.ALLOWED_EXTENSIONS.includes(ext as any)) {
      cb(null, true);
    } else {
      cb(new Error(ERROR_MESSAGES.FILE.INVALID_TYPE));
    }
  }
});

/**
 * POST /api/documents/upload
 * Upload and parse document
 */
router.post('/upload', requireAuth, upload.single('file'), async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No file uploaded'
      });
    }

    const filePath = req.file.path;

    // Parse document
    const parsed = await documentParser.parseDocument(filePath);

    if (!parsed.success) {
      // Clean up file if parsing failed
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }

      return res.status(400).json({
        success: false,
        message: parsed.error || ERROR_MESSAGES.FILE.PARSE_FAILED,
        parsed
      });
    }

    // Generate summary
    const summary = documentParser.generateSummary(parsed);

    return res.status(200).json({
      success: true,
      message: SUCCESS_MESSAGES.FILE.UPLOADED,
      file: {
        id: path.basename(filePath, path.extname(filePath)),
        originalName: req.file.originalname,
        filename: req.file.filename,
        path: filePath,
        size: req.file.size,
        mimetype: req.file.mimetype
      },
      parsed,
      summary
    });

  } catch (error) {
    console.error('Upload error:', error);
    
    // Clean up file if it exists
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }

    return res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : ERROR_MESSAGES.FILE.UPLOAD_FAILED
    });
  }
});

/**
 * POST /api/documents/upload-multiple
 * Upload and parse multiple documents
 */
router.post('/upload-multiple', requireAuth, upload.array('files', 10), async (req: Request, res: Response) => {
  try {
    if (!req.files || !Array.isArray(req.files) || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No files uploaded'
      });
    }

    const filePaths = req.files.map(file => file.path);

    // Parse all documents
    const results = await documentParser.parseMultipleDocuments(filePaths);

    // Count successes and failures
    const successful = results.filter(r => r.success).length;
    const failed = results.filter(r => !r.success).length;

    // Clean up failed files
    results.forEach((result, index) => {
      if (!result.success && fs.existsSync(filePaths[index])) {
        fs.unlinkSync(filePaths[index]);
      }
    });

    return res.status(200).json({
      success: true,
      message: `Uploaded ${successful} files successfully, ${failed} failed`,
      results,
      summary: {
        total: results.length,
        successful,
        failed
      }
    });

  } catch (error) {
    console.error('Multiple upload error:', error);
    
    // Clean up all files
    if (req.files && Array.isArray(req.files)) {
      req.files.forEach(file => {
        if (fs.existsSync(file.path)) {
          fs.unlinkSync(file.path);
        }
      });
    }

    return res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : ERROR_MESSAGES.FILE.UPLOAD_FAILED
    });
  }
});

/**
 * GET /api/documents/:filename
 * Get document info
 */
router.get('/:filename', requireAuth, async (req: Request, res: Response) => {
  try {
    const { filename } = req.params;
    const filePath = path.join(UPLOAD_CONFIG.UPLOAD_DIR, filename);

    if (!fs.existsSync(filePath)) {
      return res.status(404).json({
        success: false,
        message: ERROR_MESSAGES.FILE.NOT_FOUND
      });
    }

    // Re-parse document
    const parsed = await documentParser.parseDocument(filePath);

    return res.status(200).json({
      success: true,
      parsed
    });

  } catch (error) {
    console.error('Get document error:', error);
    return res.status(500).json({
      success: false,
      message: ERROR_MESSAGES.GENERAL.INTERNAL_ERROR
    });
  }
});

/**
 * DELETE /api/documents/:filename
 * Delete document
 */
router.delete('/:filename', requireAuth, (req: Request, res: Response) => {
  try {
    const { filename } = req.params;
    const filePath = path.join(UPLOAD_CONFIG.UPLOAD_DIR, filename);

    if (!fs.existsSync(filePath)) {
      return res.status(404).json({
        success: false,
        message: ERROR_MESSAGES.FILE.NOT_FOUND
      });
    }

    // Delete file
    fs.unlinkSync(filePath);

    return res.status(200).json({
      success: true,
      message: SUCCESS_MESSAGES.FILE.DELETED
    });

  } catch (error) {
    console.error('Delete document error:', error);
    return res.status(500).json({
      success: false,
      message: ERROR_MESSAGES.GENERAL.INTERNAL_ERROR
    });
  }
});

/**
 * GET /api/documents
 * List all documents
 */
router.get('/', requireAuth, (req: Request, res: Response) => {
  try {
    const uploadDir = UPLOAD_CONFIG.UPLOAD_DIR;

    if (!fs.existsSync(uploadDir)) {
      return res.status(200).json({
        success: true,
        documents: []
      });
    }

    const files = fs.readdirSync(uploadDir);
    
    const documents = files.map(filename => {
      const filePath = path.join(uploadDir, filename);
      const stats = fs.statSync(filePath);
      
      return {
        filename,
        path: filePath,
        size: stats.size,
        created: stats.birthtime,
        modified: stats.mtime,
        extension: path.extname(filename)
      };
    });

    return res.status(200).json({
      success: true,
      documents,
      count: documents.length
    });

  } catch (error) {
    console.error('List documents error:', error);
    return res.status(500).json({
      success: false,
      message: ERROR_MESSAGES.GENERAL.INTERNAL_ERROR
    });
  }
});

export default router;
