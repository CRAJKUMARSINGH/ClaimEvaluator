/**
 * Storage Module
 * Exports storage interface and implementations
 * Part of Phase 3 refactoring
 */

export * from './IStorage';
export * from './MemoryStorage';
export * from './DatabaseStorage';

import { IStorage } from './IStorage';
import { memoryStorage } from './MemoryStorage';
import { databaseStorage } from './DatabaseStorage';

/**
 * Get storage instance based on environment
 */
export function getStorage(): IStorage {
  const env = process.env.NODE_ENV || 'development';
  const storageType = process.env.STORAGE_TYPE || 'memory';

  if (storageType === 'database' && env === 'production') {
    console.log('Using DatabaseStorage');
    return databaseStorage;
  }

  console.log('Using MemoryStorage');
  return memoryStorage;
}

// Export default storage instance
export const storage = getStorage();
