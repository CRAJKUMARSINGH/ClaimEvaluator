/**
 * In-Memory Storage Implementation
 * Fast, simple storage for development and testing
 * Part of Phase 3 refactoring
 */

import { 
  IStorage, 
  StorageDocument, 
  StorageAnalysis, 
  StorageUser, 
  StorageSession 
} from './IStorage';
import { generateId } from '../../shared/helpers';

export class MemoryStorage implements IStorage {
  private documents: Map<string, StorageDocument> = new Map();
  private analyses: Map<string, StorageAnalysis> = new Map();
  private users: Map<string, StorageUser> = new Map();
  private sessions: Map<string, StorageSession> = new Map();

  // ============================================================================
  // DOCUMENT OPERATIONS
  // ============================================================================

  async saveDocument(doc: Omit<StorageDocument, 'id'>): Promise<StorageDocument> {
    const document: StorageDocument = {
      id: generateId(),
      ...doc
    };
    
    this.documents.set(document.id, document);
    return document;
  }

  async getDocument(id: string): Promise<StorageDocument | null> {
    return this.documents.get(id) || null;
  }

  async getDocumentsByUser(userId: string): Promise<StorageDocument[]> {
    return Array.from(this.documents.values())
      .filter(doc => doc.uploadedBy === userId)
      .sort((a, b) => b.uploadedAt.getTime() - a.uploadedAt.getTime());
  }

  async getAllDocuments(): Promise<StorageDocument[]> {
    return Array.from(this.documents.values())
      .sort((a, b) => b.uploadedAt.getTime() - a.uploadedAt.getTime());
  }

  async updateDocument(id: string, updates: Partial<StorageDocument>): Promise<boolean> {
    const doc = this.documents.get(id);
    if (!doc) return false;

    this.documents.set(id, { ...doc, ...updates });
    return true;
  }

  async deleteDocument(id: string): Promise<boolean> {
    return this.documents.delete(id);
  }

  // ============================================================================
  // ANALYSIS OPERATIONS
  // ============================================================================

  async saveAnalysis(analysis: Omit<StorageAnalysis, 'id'>): Promise<StorageAnalysis> {
    const newAnalysis: StorageAnalysis = {
      id: generateId(),
      ...analysis
    };
    
    this.analyses.set(newAnalysis.id, newAnalysis);
    return newAnalysis;
  }

  async getAnalysis(id: string): Promise<StorageAnalysis | null> {
    return this.analyses.get(id) || null;
  }

  async getAnalysesByDocument(documentId: string): Promise<StorageAnalysis[]> {
    return Array.from(this.analyses.values())
      .filter(analysis => analysis.documentId === documentId)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  async getAnalysesByUser(userId: string): Promise<StorageAnalysis[]> {
    return Array.from(this.analyses.values())
      .filter(analysis => analysis.userId === userId)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  async updateAnalysis(id: string, updates: Partial<StorageAnalysis>): Promise<boolean> {
    const analysis = this.analyses.get(id);
    if (!analysis) return false;

    this.analyses.set(id, { ...analysis, ...updates });
    return true;
  }

  async deleteAnalysis(id: string): Promise<boolean> {
    return this.analyses.delete(id);
  }

  // ============================================================================
  // USER OPERATIONS
  // ============================================================================

  async saveUser(user: Omit<StorageUser, 'id'>): Promise<StorageUser> {
    const newUser: StorageUser = {
      id: generateId(),
      ...user
    };
    
    this.users.set(newUser.id, newUser);
    return newUser;
  }

  async getUser(id: string): Promise<StorageUser | null> {
    return this.users.get(id) || null;
  }

  async getUserByEmail(email: string): Promise<StorageUser | null> {
    const normalizedEmail = email.toLowerCase();
    return Array.from(this.users.values())
      .find(user => user.email.toLowerCase() === normalizedEmail) || null;
  }

  async getAllUsers(): Promise<StorageUser[]> {
    return Array.from(this.users.values())
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  async updateUser(id: string, updates: Partial<StorageUser>): Promise<boolean> {
    const user = this.users.get(id);
    if (!user) return false;

    this.users.set(id, { ...user, ...updates });
    return true;
  }

  async deleteUser(id: string): Promise<boolean> {
    return this.users.delete(id);
  }

  // ============================================================================
  // SESSION OPERATIONS
  // ============================================================================

  async saveSession(session: StorageSession): Promise<boolean> {
    this.sessions.set(session.id, session);
    return true;
  }

  async getSession(id: string): Promise<StorageSession | null> {
    const session = this.sessions.get(id);
    
    // Check if expired
    if (session && session.expiresAt < new Date()) {
      this.sessions.delete(id);
      return null;
    }
    
    return session || null;
  }

  async deleteSession(id: string): Promise<boolean> {
    return this.sessions.delete(id);
  }

  async cleanExpiredSessions(): Promise<number> {
    const now = new Date();
    let cleaned = 0;

    for (const [id, session] of this.sessions.entries()) {
      if (session.expiresAt < now) {
        this.sessions.delete(id);
        cleaned++;
      }
    }

    return cleaned;
  }

  // ============================================================================
  // UTILITY OPERATIONS
  // ============================================================================

  async clear(): Promise<void> {
    this.documents.clear();
    this.analyses.clear();
    this.users.clear();
    this.sessions.clear();
  }

  async getStats(): Promise<{
    documents: number;
    analyses: number;
    users: number;
    sessions: number;
  }> {
    return {
      documents: this.documents.size,
      analyses: this.analyses.size,
      users: this.users.size,
      sessions: this.sessions.size
    };
  }
}

// Export singleton instance
export const memoryStorage = new MemoryStorage();
