type StoredEntry<T> = {
  id: string;
  value: T;
};

export const COLLECTION_STORES = {
  sessions: "sessions",
  numbers: "numbers",
  binary: "binary",
  cards: "cards",
  chessboards: "chessboards",
} as const;

export type CollectionStore =
  (typeof COLLECTION_STORES)[keyof typeof COLLECTION_STORES];

const DATABASE_NAME = "memio-local-data";
const DATABASE_VERSION = 1;
const MIGRATION_STORE = "metadata";
const LEGACY_MIGRATION_ID = "local-storage-collections-v1";

const collectionStoreNames = Object.values(COLLECTION_STORES);
const allStoreNames = [...collectionStoreNames, MIGRATION_STORE];

const legacyCollections: {
  localStorageKey: string;
  storeName: CollectionStore;
}[] = [
  { localStorageKey: "savedRecords", storeName: COLLECTION_STORES.sessions },
  { localStorageKey: "savedNumbers", storeName: COLLECTION_STORES.numbers },
  { localStorageKey: "savedBinarys", storeName: COLLECTION_STORES.binary },
  { localStorageKey: "savedDecks", storeName: COLLECTION_STORES.cards },
  { localStorageKey: "savedBoards", storeName: COLLECTION_STORES.chessboards },
];

type LegacySnapshot = (typeof legacyCollections)[number] & {
  rawValue: string | null;
  entries: [string, unknown][];
};

let databasePromise: Promise<IDBDatabase> | null = null;
let readyDatabasePromise: Promise<IDBDatabase> | null = null;

function requestResult<T>(request: IDBRequest<T>): Promise<T> {
  return new Promise((resolve, reject) => {
    request.onsuccess = () => resolve(request.result);
    request.onerror = () =>
      reject(request.error ?? new Error("IndexedDB request failed"));
  });
}

function transactionResult(transaction: IDBTransaction): Promise<void> {
  return new Promise((resolve, reject) => {
    transaction.oncomplete = () => resolve();
    transaction.onerror = () =>
      reject(transaction.error ?? new Error("IndexedDB transaction failed"));
    transaction.onabort = () =>
      reject(transaction.error ?? new Error("IndexedDB transaction was aborted"));
  });
}

function openRawDatabase(): Promise<IDBDatabase> {
  if (databasePromise) return databasePromise;

  databasePromise = new Promise<IDBDatabase>((resolve, reject) => {
    if (typeof indexedDB === "undefined") {
      reject(new Error("IndexedDB is not available in this browser"));
      return;
    }

    const request = indexedDB.open(DATABASE_NAME, DATABASE_VERSION);

    request.onupgradeneeded = () => {
      const database = request.result;
      for (const storeName of allStoreNames) {
        if (!database.objectStoreNames.contains(storeName)) {
          database.createObjectStore(storeName, { keyPath: "id" });
        }
      }
    };

    request.onsuccess = () => {
      const database = request.result;
      database.onversionchange = () => database.close();
      resolve(database);
    };
    request.onerror = () =>
      reject(request.error ?? new Error("Could not open the local database"));
    request.onblocked = () =>
      reject(new Error("The local database is blocked by another open tab"));
  }).catch((error) => {
    databasePromise = null;
    throw error;
  });

  return databasePromise;
}

function readLegacyRawCollections(): LegacySnapshot[] {
  if (typeof window === "undefined") return [];

  return legacyCollections.map((collection) => ({
    ...collection,
    rawValue: window.localStorage.getItem(collection.localStorageKey),
    entries: [],
  }));
}

function readLegacySnapshot(): LegacySnapshot[] {
  return readLegacyRawCollections().map((collection) => {
    const { rawValue } = collection;
    if (rawValue === null) return { ...collection, rawValue, entries: [] };

    let parsed: unknown;
    try {
      parsed = JSON.parse(rawValue);
    } catch {
      throw new Error(`Could not migrate invalid ${collection.localStorageKey} data`);
    }

    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
      throw new Error(`Could not migrate invalid ${collection.localStorageKey} data`);
    }

    return {
      ...collection,
      rawValue,
      entries: Object.entries(parsed as Record<string, unknown>),
    };
  });
}

function removeLegacyKeys(snapshots: LegacySnapshot[]) {
  if (typeof window === "undefined") return;

  for (const snapshot of snapshots) {
    // Keep a value written by an older open tab after this migration snapshot.
    if (window.localStorage.getItem(snapshot.localStorageKey) === snapshot.rawValue) {
      window.localStorage.removeItem(snapshot.localStorageKey);
    }
  }
}

async function migrateLegacyCollections(database: IDBDatabase) {
  const markerRead = database.transaction(MIGRATION_STORE, "readonly");
  const markerReadCompletion = transactionResult(markerRead);
  const [marker] = await Promise.all([
    requestResult(markerRead.objectStore(MIGRATION_STORE).get(LEGACY_MIGRATION_ID)),
    markerReadCompletion,
  ]);

  if (marker) return;

  const snapshots = readLegacySnapshot();
  const transaction = database.transaction(allStoreNames, "readwrite");
  const completion = transactionResult(transaction);
  const migrationMarker = transaction
    .objectStore(MIGRATION_STORE)
    .get(LEGACY_MIGRATION_ID);
  let importedLegacyData = false;

  migrationMarker.onsuccess = () => {
    if (migrationMarker.result) return;
    importedLegacyData = true;

    for (const snapshot of snapshots) {
      const store = transaction.objectStore(snapshot.storeName);
      for (const [id, value] of snapshot.entries) {
        const existing = store.get(id);
        existing.onsuccess = () => {
          // Preserve data already written to IndexedDB if the import is retried.
          if (existing.result === undefined) store.put({ id, value });
        };
      }
    }

    transaction.objectStore(MIGRATION_STORE).put({
      id: LEGACY_MIGRATION_ID,
      value: true,
    });
  };

  await completion;
  if (importedLegacyData) removeLegacyKeys(snapshots);
}

/** Opens the local database and completes the one-time localStorage migration. */
export function openDatabase(): Promise<IDBDatabase> {
  if (!readyDatabasePromise) {
    readyDatabasePromise = openRawDatabase()
      .then(async (database) => {
        await migrateLegacyCollections(database);
        return database;
      })
      .catch((error) => {
        readyDatabasePromise = null;
        throw error;
      });
  }

  return readyDatabasePromise;
}

export async function getItem<T>(
  storeName: CollectionStore,
  id: string,
): Promise<T | null> {
  const database = await openDatabase();
  const transaction = database.transaction(storeName, "readonly");
  const completion = transactionResult(transaction);
  const [result] = await Promise.all([requestResult(
    transaction.objectStore(storeName).get(id) as IDBRequest<StoredEntry<T> | undefined>,
  ), completion]);
  return result?.value ?? null;
}

export async function getAllItems<T>(
  storeName: CollectionStore,
): Promise<Record<string, T>> {
  const database = await openDatabase();
  const transaction = database.transaction(storeName, "readonly");
  const completion = transactionResult(transaction);
  const [entries] = await Promise.all([requestResult(
    transaction.objectStore(storeName).getAll() as IDBRequest<StoredEntry<T>[]>,
  ), completion]);
  return Object.fromEntries(entries.map(({ id, value }) => [id, value]));
}

export async function putItem<T>(
  storeName: CollectionStore,
  id: string,
  value: T,
): Promise<void> {
  const database = await openDatabase();
  const transaction = database.transaction(storeName, "readwrite");
  const completion = transactionResult(transaction);
  transaction.objectStore(storeName).put({ id, value } satisfies StoredEntry<T>);
  await completion;
}

export async function deleteItem(
  storeName: CollectionStore,
  id: string,
): Promise<void> {
  const database = await openDatabase();
  const transaction = database.transaction(storeName, "readwrite");
  const completion = transactionResult(transaction);
  transaction.objectStore(storeName).delete(id);
  await completion;
}

export async function replaceAllItems<T>(
  storeName: CollectionStore,
  values: Record<string, T>,
): Promise<void> {
  const database = await openDatabase();
  const transaction = database.transaction(storeName, "readwrite");
  const completion = transactionResult(transaction);
  const store = transaction.objectStore(storeName);
  store.clear();
  for (const [id, value] of Object.entries(values)) {
    store.put({ id, value } satisfies StoredEntry<T>);
  }
  await completion;
}
