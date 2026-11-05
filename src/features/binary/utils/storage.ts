import {
  COLLECTION_STORES,
  deleteItem,
  getAllItems,
  getItem,
  putItem,
} from "@/features/core/utils/indexed-db";

export const saveBinary = async (num: string): Promise<string> => {
  const key = Date.now().toString();
  await putItem(COLLECTION_STORES.binary, key, num);
  return key;
};

export const getSavedBins = (): Promise<Record<string, string>> =>
  getAllItems<string>(COLLECTION_STORES.binary);

export const getBinary = (key: string): Promise<string | null> =>
  getItem<string>(COLLECTION_STORES.binary, key);

export const deleteBinary = (key: string): Promise<void> =>
  deleteItem(COLLECTION_STORES.binary, key);
