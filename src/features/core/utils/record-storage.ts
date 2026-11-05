import {
  COLLECTION_STORES,
  getAllItems,
  putItem,
} from "@/features/core/utils/indexed-db";

export const saveRecord = async (record: SessionRecord): Promise<string> => {
  const key = Date.now().toString();
  await putItem(COLLECTION_STORES.sessions, key, record);
  return key;
};

export const getSavedRecords = (): Promise<Record<string, SessionRecord>> =>
  getAllItems<SessionRecord>(COLLECTION_STORES.sessions);
