import { Storage } from "@/utils/Storage";

const RECORD_STORAGE = "savedRecords";

const recordStorage = new Storage<SessionRecord>(RECORD_STORAGE);

export const saveRecord = (record: SessionRecord) => {
  const key = recordStorage.saveWithTimestamp(record);

  return key;
};

export const getSavedRecords = (): Record<string, SessionRecord> | null => {
  const records = recordStorage.getAll();

  return records;
};
