import {
  COLLECTION_STORES,
  deleteItem,
  getAllItems,
  getItem,
  putItem,
} from "@/features/core/utils/indexed-db";

export const saveNum = async (num: string): Promise<string> => {
  const key = Date.now().toString();
  await putItem(COLLECTION_STORES.numbers, key, num);
  return key;
};

export const getSavedNums = (): Promise<Record<string, string>> =>
  getAllItems<string>(COLLECTION_STORES.numbers);

export const getNum = (key: string): Promise<string | null> =>
  getItem<string>(COLLECTION_STORES.numbers, key);

export const deleteNum = (key: string): Promise<void> =>
  deleteItem(COLLECTION_STORES.numbers, key);
