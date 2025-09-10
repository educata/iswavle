import {
  TTL_MS,
  DB_NAME,
  INDEX_MAP_STORE_NAME,
} from '@app-shared/consts/index-db';

type IndexMap = Record<string, { title: string; content: string }>;

type GetIndexMapMessage = {
  type: 'getIndexMap';
  version?: string;
  ttlMs?: number;
};

type ClearOldMessage = {
  type: 'clearOld';
  keepKey: string;
};

type InMsg = GetIndexMapMessage | ClearOldMessage;

type OutMsg =
  | { type: 'indexMap'; ok: true; source: 'cache' | 'network'; data: IndexMap }
  | { type: 'indexMap'; ok: false; error: string };

interface CacheEntry<T> {
  ts: number;
  data: T;
}

function openDb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, 2);
    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains(INDEX_MAP_STORE_NAME)) {
        db.createObjectStore(INDEX_MAP_STORE_NAME);
      }
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

function idbGet<T>(db: IDBDatabase, key: string): Promise<T | undefined> {
  return new Promise((resolve, reject) => {
    const tx = db.transaction(INDEX_MAP_STORE_NAME, 'readonly');
    const store = tx.objectStore(INDEX_MAP_STORE_NAME);
    const req = store.get(key);
    req.onsuccess = () => resolve(req.result as T | undefined);
    req.onerror = () => reject(req.error);
  });
}

function idbSet<T>(db: IDBDatabase, key: string, value: T): Promise<void> {
  return new Promise((resolve, reject) => {
    const tx = db.transaction(INDEX_MAP_STORE_NAME, 'readwrite');
    const store = tx.objectStore(INDEX_MAP_STORE_NAME);
    const req = store.put(value as any, key);
    req.onsuccess = () => resolve();
    req.onerror = () => reject(req.error);
  });
}

function idbDelete(db: IDBDatabase, key: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const tx = db.transaction(INDEX_MAP_STORE_NAME, 'readwrite');
    const store = tx.objectStore(INDEX_MAP_STORE_NAME);
    const req = store.delete(key);
    req.onsuccess = () => resolve();
    req.onerror = () => reject(req.error);
  });
}

function idbKeys(db: IDBDatabase): Promise<string[]> {
  return new Promise((resolve, reject) => {
    const keys: string[] = [];
    const tx = db.transaction(INDEX_MAP_STORE_NAME, 'readonly');
    const store = tx.objectStore(INDEX_MAP_STORE_NAME);
    const req = store.openKeyCursor();
    req.onsuccess = () => {
      const cursor = req.result;
      if (cursor) {
        keys.push(String(cursor.key));
        cursor.continue();
      } else {
        resolve(keys);
      }
    };
    req.onerror = () => reject(req.error);
  });
}

async function getIndexMap(version?: string, ttlMs = TTL_MS): Promise<OutMsg> {
  const db = await openDb();
  const key = `index-map:${version ?? 'noversion'}`;

  try {
    const entry = await idbGet<CacheEntry<IndexMap>>(db, key);
    if (entry && Date.now() - entry.ts < ttlMs) {
      return { type: 'indexMap', ok: true, source: 'cache', data: entry.data };
    }
  } catch (_e: unknown) {}

  try {
    const v = version ? `?v=${encodeURIComponent(version)}` : '';
    const res = await fetch(`/assets/index-map.json${v}`, {
      cache: 'no-cache',
      credentials: 'same-origin',
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = (await res.json()) as IndexMap;
    try {
      await idbSet<CacheEntry<IndexMap>>(db, key, { ts: Date.now(), data });
      const keys = await idbKeys(db);
      await Promise.all(
        keys
          .filter((k) => k.startsWith('index-map:') && k !== key)
          .map((k) => idbDelete(db, k)),
      );
    } catch {}
    return { type: 'indexMap', ok: true, source: 'network', data };
  } catch (e: unknown) {
    try {
      const stale = await idbGet<CacheEntry<IndexMap>>(db, key);
      if (stale) {
        return {
          type: 'indexMap',
          ok: true,
          source: 'cache',
          data: stale.data,
        };
      }
    } catch {}
    const message = e instanceof Error ? e.message : String(e);
    return { type: 'indexMap', ok: false, error: message };
  }
}

self.addEventListener('message', async (evt: MessageEvent<InMsg>) => {
  const msg = evt.data;
  if (!msg) return;
  if (msg.type === 'getIndexMap') {
    const result = await getIndexMap(msg.version, msg.ttlMs);
    const out: OutMsg = result;
    self.postMessage(out);
  } else if (msg.type === 'clearOld') {
    try {
      const db = await openDb();
      const keys = await idbKeys(db);
      await Promise.all(
        keys
          .filter((k) => k.startsWith('index-map:') && k !== msg.keepKey)
          .map((k) => idbDelete(db, k)),
      );
    } catch {}
  }
});
