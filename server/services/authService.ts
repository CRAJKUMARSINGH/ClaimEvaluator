/**
 * Authentication Service
 * Secure bcrypt-based authentication
 * Part of Phase 2 refactoring - replaces passport
 */

import bcrypt from 'bcrypt';
import { SECURITY_CONFIG, ERROR_MESSAGES, SUCCESS_MESSAGES } from '../../shared/constants';

export interface User {
  id: string;
  email: string;
  passwordHash: string;
  name: string;
  role: 'admin' | 'analyst' | 'viewer' | 'client';
  createdAt: Date;
  lastLogin?: Date;
  active: boolean;
}

export interface UserRegistration {
  email: string;
  password: string;
  name: string;
  role?: 'admin' | 'analyst' | 'viewer' | 'client';
}

export interface UserLogin {
  email: string;
  password: string;
}

export interface AuthResult {
  success: boolean;
  user?: Omit<User, 'passwordHash'>;
  message: string;
  token?: string;
}

export class AuthService {
  // In-memory user store (replace with database in production)
  private users: Map<string, User> = new Map();

  /**
   * Register a new user
   */
  async register(registration: UserRegistration): Promise<AuthResult> {
    try {
      const { email, password, name, role = 'analyst' } = registration;

      // Validate email
      if (!this.isValidEmail(email)) {
        return {
          success: false,
          message: 'Invalid email address'
        };
      }

      // Check if user already exists
      if (this.findUserByEmail(email)) {
        return {
          success: false,
          message: ERROR_MESSAGES.AUTH.USER_EXISTS
        };
      }

      // Validate password strength
      if (!this.isStrongPassword(password)) {
        return {
          success: false,
          message: ERROR_MESSAGES.AUTH.WEAK_PASSWORD
        };
      }

      // Hash password
      const passwordHash = await this.hashPassword(password);

      // Create user
      const user: User = {
        id: this.generateUserId(),
        email: email.toLowerCase(),
        passwordHash,
        name,
        role,
        createdAt: new Date(),
        active: true
      };

      // Store user
      this.users.set(user.id, user);

      return {
        success: true,
        user: this.sanitizeUser(user),
        message: SUCCESS_MESSAGES.AUTH.REGISTER
      };

    } catch (error) {
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Registration failed'
      };
    }
  }

  /**
   * Login user
   */
  async login(credentials: UserLogin): Promise<AuthResult> {
    try {
      const { email, password } = credentials;

      // Find user
      const user = this.findUserByEmail(email);
      if (!user) {
        return {
          success: false,
          message: ERROR_MESSAGES.AUTH.INVALID_CREDENTIALS
        };
      }

      // Check if user is active
      if (!user.active) {
        return {
          success: false,
          message: 'Account is inactive'
        };
      }

      // Verify password
      const isValid = await this.verifyPassword(password, user.passwordHash);
      if (!isValid) {
        return {
          success: false,
          message: ERROR_MESSAGES.AUTH.INVALID_CREDENTIALS
        };
      }

      // Update last login
      user.lastLogin = new Date();

      return {
        success: true,
        user: this.sanitizeUser(user),
        message: SUCCESS_MESSAGES.AUTH.LOGIN
      };

    } catch (error) {
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Login failed'
      };
    }
  }

  /**
   * Change user password
   */
  async changePassword(userId: string, oldPassword: string, newPassword: string): Promise<AuthResult> {
    try {
      const user = this.users.get(userId);
      if (!user) {
        return {
          success: false,
          message: 'User not found'
        };
      }

      // Verify old password
      const isValid = await this.verifyPassword(oldPassword, user.passwordHash);
      if (!isValid) {
        return {
          success: false,
          message: 'Current password is incorrect'
        };
      }

      // Validate new password
      if (!this.isStrongPassword(newPassword)) {
        return {
          success: false,
          message: ERROR_MESSAGES.AUTH.WEAK_PASSWORD
        };
      }

      // Hash new password
      user.passwordHash = await this.hashPassword(newPassword);

      return {
        success: true,
        message: 'Password changed successfully'
      };

    } catch (error) {
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Password change failed'
      };
    }
  }

  /**
   * Get user by ID
   */
  getUserById(userId: string): Omit<User, 'passwordHash'> | null {
    const user = this.users.get(userId);
    return user ? this.sanitizeUser(user) : null;
  }

  /**
   * Deactivate user
   */
  async deactivateUser(userId: string): Promise<boolean> {
    const user = this.users.get(userId);
    if (user) {
      user.active = false;
      return true;
    }
    return false;
  }

  /**
   * Activate user
   */
  async activateUser(userId: string): Promise<boolean> {
    const user = this.users.get(userId);
    if (user) {
      user.active = true;
      return true;
    }
    return false;
  }

  /**
   * Hash password using bcrypt
   */
  private async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, SECURITY_CONFIG.BCRYPT_ROUNDS);
  }

  /**
   * Verify password against hash
   */
  private async verifyPassword(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }

  /**
   * Find user by email
   */
  private findUserByEmail(email: string): User | undefined {
    const normalizedEmail = email.toLowerCase();
    return Array.from(this.users.values()).find(
      user => user.email === normalizedEmail
    );
  }

  /**
   * Generate unique user ID
   */
  private generateUserId(): string {
    return `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Remove password hash from user object
   */
  private sanitizeUser(user: User): Omit<User, 'passwordHash'> {
    const { passwordHash, ...sanitized } = user;
    return sanitized;
  }

  /**
   * Validate email format
   */
  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  /**
   * Check password strength
   */
  private isStrongPassword(password: string): boolean {
    // Minimum 8 characters
    if (password.length < 8) {
      return false;
    }

    // At least one uppercase letter
    if (!/[A-Z]/.test(password)) {
      return false;
    }

    // At least one lowercase letter
    if (!/[a-z]/.test(password)) {
      return false;
    }

    // At least one number
    if (!/[0-9]/.test(password)) {
      return false;
    }

    return true;
  }

  /**
   * Create default admin user (for testing/setup)
   */
  async createDefaultAdmin(): Promise<void> {
    const adminExists = Array.from(this.users.values()).some(
      user => user.role === 'admin'
    );

    if (!adminExists) {
      await this.register({
        email: 'admin@claimevaluator.com',
        password: 'Admin@123',
        name: 'System Administrator',
        role: 'admin'
      });
    }
  }

  /**
   * Get all users (admin only)
   */
  getAllUsers(): Omit<User, 'passwordHash'>[] {
    return Array.from(this.users.values()).map(user => this.sanitizeUser(user));
  }

  /**
   * Get user count
   */
  getUserCount(): number {
    return this.users.size;
  }

  /**
   * Get active user count
   */
  getActiveUserCount(): number {
    return Array.from(this.users.values()).filter(user => user.active).length;
  }
}

// Export singleton instance
export const authService = new AuthService();

// Create default admin on startup
authService.createDefaultAdmin();
