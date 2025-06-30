import { Storage } from "@/utils/Storage";

const BIN_STORAGE = "savedBinarys";

const binStorage = new Storage<string>(BIN_STORAGE);

export const saveBinary = (num: string) => {
  const key = binStorage.saveWithTimestamp(num);

  return key;
};

export const getSavedBins = (): Record<string, string> | null => {
  const nums = binStorage.getAll();

  return nums;
};

export const getBinary = (key: string): string | null => {
  const num = binStorage.getItem(key);

  return num;
};

export const replaceBins = (nums: Record<string, string>) => {
  binStorage.replaceAll(nums);
};
