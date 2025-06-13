import Logger from "@/utils/logger";
import { Storage } from "@/utils/Storage";

const NUM_STORAGE = "savedNumbers";

const numStorage = new Storage<string>(NUM_STORAGE);

export const saveNum = (num: string) => {
  const key = numStorage.saveWithTimestamp(num);

  return key;
};

export const getSavedNums = (): Record<string, string> | null => {
  const nums = numStorage.getAll();

  Logger.debug(JSON.stringify(nums, null, 2), "getSavedNums");
  return nums;
};

export const getNum = (key: string): string | null => {
  const num = numStorage.getItem(key);

  return num;
};

export const replaceNums = (nums: Record<string, string>) => {
  numStorage.replaceAll(nums);
};
