import {
  COLLECTION_STORES,
  deleteItem,
  getAllItems,
  getItem,
  putItem,
} from "@/features/core/utils/indexed-db";
import { Deck } from "../types";

export const saveDeck = async (deck: Deck): Promise<string> => {
  const key = Date.now().toString();
  await putItem(COLLECTION_STORES.cards, key, deck);
  return key;
};

export const getSavedDecks = (): Promise<Record<string, Deck>> =>
  getAllItems<Deck>(COLLECTION_STORES.cards);

export const getDeck = (key: string): Promise<Deck | null> =>
  getItem<Deck>(COLLECTION_STORES.cards, key);

export const deleteDeck = (key: string): Promise<void> =>
  deleteItem(COLLECTION_STORES.cards, key);
