import { Storage } from "@/utils/Storage";
import { Deck } from "../types";

const DECK_STORAGE = "savedDecks";

const deckStorage = new Storage<Deck>(DECK_STORAGE);

export const saveDeck = (deck: Deck) => {
  const key = deckStorage.saveWithTimestamp(deck);

  return key;
};

export const getSavedDecks = (): Record<string, Deck> | null => {
  const decks = deckStorage.getAll();

  return decks;
};

export const getDeck = (key: string): Deck | null => {
  const deck = deckStorage.getItem(key);

  return deck;
};

export const replaceDecks = (decks: Record<string, Deck>) => {
  deckStorage.replaceAll(decks);
};
