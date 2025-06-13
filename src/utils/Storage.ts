export class Storage<T> {
  constructor(public storeKey: string) {}

  /**
   * Saves an item with a specific key.
   * @param key The key under which the item will be stored.
   * @param value The value to save.
   */
  saveItem(key: string, value: T): void {
    const existing = this.getAll() || {};
    existing[key] = value;
    localStorage.setItem(this.storeKey, JSON.stringify(existing));
  }

  /**
   * Saves an item with a timestamp as the key.
   * @param value The value to save.
   * @returns The key used to save the item (timestamp).
   */
  saveWithTimestamp(value: T): string {
    const key = Date.now().toString();
    this.saveItem(key, value);
    return key;
  }

  /**
   * Retrieves an item
   * @param key The key of the item to retrieve.
   * @returns The item if found, otherwise null.
   */
  getItem(key: string): T | null {
    const all = this.getAll();
    return all?.[key] ?? null;
  }

  /**
   * Get all items stored
   * @param key The key of the item to delete.
   */
  getAll(): Record<string, T> | null {
    const raw = localStorage.getItem(this.storeKey);
    if (!raw) return null;
    try {
      return JSON.parse(raw);
    } catch {
      return null;
    }
  }

  /**
   * Replaces all items in the storage with a new set of data.
   * @param data The new data to replace the existing items.
   **/
  replaceAll(data: Record<string, T>): void {
    localStorage.setItem(this.storeKey, JSON.stringify(data));
  }

  /**
   * Clears all items in the storage.
   * @description This method removes all items stored under the specified key.
   */
  clear(): void {
    localStorage.removeItem(this.storeKey);
  }
}
