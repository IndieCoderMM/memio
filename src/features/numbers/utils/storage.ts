import {
  COLLECTION_STORES,
  deleteItem,
  getAllItems,
  getItem,
  putItem,
} from "@/features/core/utils/indexed-db";
import type { NumberSequenceSource } from "../types";

export type SavedNumber = {
  digits: string;
  source: NumberSequenceSource;
};

type StoredNumber = string | SavedNumber;

const normalizeSavedNumber = (value: StoredNumber): SavedNumber =>
  typeof value === "string" ? { digits: value, source: "random" } : value;

export const saveNum = async (
  num: string,
  source: NumberSequenceSource,
): Promise<string> => {
  const key = Date.now().toString();
  const value: StoredNumber = source === "pi" ? { digits: num, source } : num;
  await putItem(COLLECTION_STORES.numbers, key, value);
  return key;
};

export const getSavedNums = async (): Promise<Record<string, SavedNumber>> => {
  const saved = await getAllItems<StoredNumber>(COLLECTION_STORES.numbers);
  return Object.fromEntries(
    Object.entries(saved).map(([key, value]) => [
      key,
      normalizeSavedNumber(value),
    ]),
  );
};

export const getNum = async (key: string): Promise<SavedNumber | null> => {
  const saved = await getItem<StoredNumber>(COLLECTION_STORES.numbers, key);
  return saved === null ? null : normalizeSavedNumber(saved);
};

export const deleteNum = (key: string): Promise<void> =>
  deleteItem(COLLECTION_STORES.numbers, key);
