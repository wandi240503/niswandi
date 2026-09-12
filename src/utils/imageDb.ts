/**
 * High-Capacity IndexedDB Image Store
 * Provides virtually unlimited storage for Full HD project screenshots
 * bypassing the restrictive 5MB localStorage limit.
 */

const DB_NAME = 'niswandi_portfolio_assets';
const DB_VERSION = 1;
const STORE_NAME = 'hd_images';

const memoryCache = new Map<string, string>();

function getIndexedDB(): IDBFactory | null {
  if (typeof window !== 'undefined' && window.indexedDB) {
    return window.indexedDB;
  }
  return null;
}

function openDatabase(): Promise<IDBDatabase | null> {
  const idb = getIndexedDB();
  if (!idb) return Promise.resolve(null);

  return new Promise((resolve) => {
    try {
      const request = idb.open(DB_NAME, DB_VERSION);
      request.onupgradeneeded = () => {
        const db = request.result;
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          db.createObjectStore(STORE_NAME);
        }
      };
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => {
        console.warn('Could not open IndexedDB, using fallback.', request.error);
        resolve(null);
      };
    } catch (e) {
      resolve(null);
    }
  });
}

export async function saveHdImage(id: string, base64: string): Promise<boolean> {
  // Always update in-memory cache first for zero-latency lookups
  memoryCache.set(id, base64);

  const db = await openDatabase();
  if (!db) return false;

  return new Promise((resolve) => {
    try {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      store.put(base64, id);
      tx.oncomplete = () => resolve(true);
      tx.onerror = () => resolve(false);
    } catch (e) {
      resolve(false);
    }
  });
}

export async function getHdImage(id: string): Promise<string | null> {
  // Check fast memory cache
  if (memoryCache.has(id)) {
    return memoryCache.get(id)!;
  }

  const db = await openDatabase();
  if (!db) return null;

  return new Promise((resolve) => {
    try {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const request = store.get(id);
      request.onsuccess = () => {
        const result = request.result as string | undefined;
        if (result) {
          memoryCache.set(id, result);
          resolve(result);
        } else {
          resolve(null);
        }
      };
      request.onerror = () => resolve(null);
    } catch (e) {
      resolve(null);
    }
  });
}

export function getCachedHdImageSync(id: string): string | null {
  return memoryCache.get(id) || null;
}

export async function deleteHdImage(id: string): Promise<void> {
  memoryCache.delete(id);
  const db = await openDatabase();
  if (!db) return;

  try {
    const tx = db.transaction(STORE_NAME, 'readwrite');
    tx.objectStore(STORE_NAME).delete(id);
  } catch (_) {}
}

export async function clearAllHdImages(): Promise<void> {
  memoryCache.clear();
  const db = await openDatabase();
  if (!db) return;

  try {
    const tx = db.transaction(STORE_NAME, 'readwrite');
    tx.objectStore(STORE_NAME).clear();
  } catch (_) {}
}

