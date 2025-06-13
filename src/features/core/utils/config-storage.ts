import Logger from "@/utils/logger";
import { Storage } from "@/utils/Storage";

const CONFIG_STORAGE = "configStorage";

class ConfigStorage extends Storage<ConfigType> {
  id: string;

  constructor(key: string) {
    super(key);
    this.id = "configId";
  }

  /**
   * Update an existing configuration item or add a new one.
   * @param key The key of ConfigType to update or add.
   * @param value The value of ConfigType[key] to update or add.
   */
  updateSetting<T extends keyof ConfigType>(
    key: T,
    value: Partial<ConfigType[T]>,
  ): void {
    const currentConfig = this.getAll() || {};
    if (!currentConfig[this.id]) {
      currentConfig[this.id] = {} as ConfigType;
    }
    currentConfig[this.id][key] = {
      ...currentConfig[this.id][key],
      ...value,
    };
    this.replaceAll(currentConfig);
    Logger.debug(
      `Updated ${key} for ID ${this.id}: ${currentConfig[this.id][key]}`,
    );
  }

  /**
   * Retrieves a specific configuration item by its key.
   * @param key The key of the configuration item to retrieve.
   * @returns The configuration item if found, otherwise null.
   */
  getSetting<T extends keyof ConfigType>(key: T): ConfigType[T] | null {
    const config = this.getAll();
    if (!config || !config[this.id]) {
      return null;
    }
    return config[this.id][key] || null;
  }
}

export const configStorage = new ConfigStorage(CONFIG_STORAGE);
