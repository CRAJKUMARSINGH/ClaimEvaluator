/**
 * Storage Interface
 * Abstraction layer for swappable storage backends
 * Part of Phase 3 refactoring
 */

export interface StorageDocument {
  id: string;
  filename: string;
  originalName: string;
  filePath: string;
  fileSize: number;
  fileType: string;
  uploadedBy: string;
  uploadedAt: Date;
  parsedContent?: string;
  metadata?: Record<string, any>;
}

export interface StorageAnalysis {
  id: string;
  documentId: string;
  userId: string;
  analysisType: string;
  result: any;
  createdAt: Date;
  completedAt?: Date;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  error?: string;
}

export interface StorageUser {
  id: string;
  email: string;
  name: string;
  role: string;
  createdAt: Date;
  lastLogin?: Date;
  active: boolean;
}

export interface StorageSession {
  id: string;
  userId: string;
  data: Record<string, any>;
  expiresAt: Date;
  createdAt: Date;
}

/**
 * Storage Interface
 * Implement this interface for different storage backends
 */
export interface IStorage {
  // Document operations
  saveDocument(doc: Omit<StorageDocument, 'id'>): Promise<StorageDocument>;
  getDocument(id: string): Promise<StorageDocument | null>;
  getDocumentsByUser(userId: string): Promise<StorageDocument[]>;
  getAllDocuments(): Promise<StorageDocument[]>;
  updateDocument(id: string, updates: Partial<StorageDocument>): Promise<boolean>;
  deleteDocument(id: string): Promise<boolean>;

  // Analysis operations
  saveAnalysis(analysis: Omit<StorageAnalysis, 'id'>): Promise<StorageAnalysis>;
  getAnalysis(id: string): Promise<StorageAnalysis | null>;
  getAnalysesByDocument(documentId: string): Promise<StorageAnalysis[]>;
  getAnalysesByUser(userId: string): Promise<StorageAnalysis[]>;
  updateAnalysis(id: string, updates: Partial<StorageAnalysis>): Promise<boolean>;
  deleteAnalysis(id: string): Promise<boolean>;

  // User operations (optional - can use authService instead)
  saveUser?(user: Omit<StorageUser, 'id'>): Promise<StorageUser>;
  getUser?(id: string): Promise<StorageUser | null>;
  getUserByEmail?(email: string): Promise<StorageUser | null>;
  getAllUsers?(): Promise<StorageUser[]>;
  updateUser?(id: string, updates: Partial<StorageUser>): Promise<boolean>;
  deleteUser?(id: string): Promise<boolean>;

  // Session operations (optional - can use express-session store)
  saveSession?(session: StorageSession): Promise<boolean>;
  getSession?(id: string): Promise<StorageSession | null>;
  deleteSession?(id: string): Promise<boolean>;
  cleanExpiredSessions?(): Promise<number>;

  // Utility operations
  clear?(): Promise<void>;
  getStats?(): Promise<{
    documents: number;
    analyses: number;
    users?: number;
    sessions?: number;
  }>;
}
