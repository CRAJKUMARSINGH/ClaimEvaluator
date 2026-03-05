/**
 * Authentication Routes
 * Secure bcrypt-based auth endpoints
 * Part of Phase 2 refactoring
 */

import { Router, Request, Response } from 'express';
import { authService } from '../services/authService';
import { SESSION_CONFIG, ERROR_MESSAGES, SUCCESS_MESSAGES } from '../../shared/constants';

const router = Router();

// Extend Express Session type
declare module 'express-session' {
  interface SessionData {
    userId?: string;
    email?: string;
    role?: string;
  }
}

/**
 * POST /api/auth/register
 * Register a new user
 */
router.post('/register', async (req: Request, res: Response) => {
  try {
    const { email, password, name, role } = req.body;

    // Validate input
    if (!email || !password || !name) {
      return res.status(400).json({
        success: false,
        message: 'Email, password, and name are required'
      });
    }

    // Register user
    const result = await authService.register({
      email,
      password,
      name,
      role
    });

    if (!result.success) {
      return res.status(400).json(result);
    }

    // Create session
    if (result.user) {
      req.session.userId = result.user.id;
      req.session.email = result.user.email;
      req.session.role = result.user.role;
    }

    return res.status(201).json(result);

  } catch (error) {
    console.error('Registration error:', error);
    return res.status(500).json({
      success: false,
      message: ERROR_MESSAGES.GENERAL.INTERNAL_ERROR
    });
  }
});

/**
 * POST /api/auth/login
 * Login user
 */
router.post('/login', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required'
      });
    }

    // Login user
    const result = await authService.login({ email, password });

    if (!result.success) {
      return res.status(401).json(result);
    }

    // Create session
    if (result.user) {
      req.session.userId = result.user.id;
      req.session.email = result.user.email;
      req.session.role = result.user.role;
    }

    return res.status(200).json(result);

  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({
      success: false,
      message: ERROR_MESSAGES.GENERAL.INTERNAL_ERROR
    });
  }
});

/**
 * POST /api/auth/logout
 * Logout user
 */
router.post('/logout', (req: Request, res: Response) => {
  try {
    req.session.destroy((err) => {
      if (err) {
        console.error('Logout error:', err);
        return res.status(500).json({
          success: false,
          message: 'Logout failed'
        });
      }

      res.clearCookie(SESSION_CONFIG.NAME);
      return res.status(200).json({
        success: true,
        message: SUCCESS_MESSAGES.AUTH.LOGOUT
      });
    });

  } catch (error) {
    console.error('Logout error:', error);
    return res.status(500).json({
      success: false,
      message: ERROR_MESSAGES.GENERAL.INTERNAL_ERROR
    });
  }
});

/**
 * GET /api/auth/me
 * Get current user
 */
router.get('/me', (req: Request, res: Response) => {
  try {
    if (!req.session.userId) {
      return res.status(401).json({
        success: false,
        message: ERROR_MESSAGES.AUTH.UNAUTHORIZED
      });
    }

    const user = authService.getUserById(req.session.userId);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    return res.status(200).json({
      success: true,
      user
    });

  } catch (error) {
    console.error('Get user error:', error);
    return res.status(500).json({
      success: false,
      message: ERROR_MESSAGES.GENERAL.INTERNAL_ERROR
    });
  }
});

/**
 * POST /api/auth/change-password
 * Change user password
 */
router.post('/change-password', async (req: Request, res: Response) => {
  try {
    if (!req.session.userId) {
      return res.status(401).json({
        success: false,
        message: ERROR_MESSAGES.AUTH.UNAUTHORIZED
      });
    }

    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: 'Old password and new password are required'
      });
    }

    const result = await authService.changePassword(
      req.session.userId,
      oldPassword,
      newPassword
    );

    return res.status(result.success ? 200 : 400).json(result);

  } catch (error) {
    console.error('Change password error:', error);
    return res.status(500).json({
      success: false,
      message: ERROR_MESSAGES.GENERAL.INTERNAL_ERROR
    });
  }
});

/**
 * Middleware: Require authentication
 */
export function requireAuth(req: Request, res: Response, next: Function) {
  if (!req.session.userId) {
    return res.status(401).json({
      success: false,
      message: ERROR_MESSAGES.AUTH.UNAUTHORIZED
    });
  }
  next();
}

/**
 * Middleware: Require specific role
 */
export function requireRole(...roles: string[]) {
  return (req: Request, res: Response, next: Function) => {
    if (!req.session.userId || !req.session.role) {
      return res.status(401).json({
        success: false,
        message: ERROR_MESSAGES.AUTH.UNAUTHORIZED
      });
    }

    if (!roles.includes(req.session.role)) {
      return res.status(403).json({
        success: false,
        message: 'Insufficient permissions'
      });
    }

    next();
  };
}

export default router;
