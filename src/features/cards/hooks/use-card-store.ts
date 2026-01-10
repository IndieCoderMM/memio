import { create } from "zustand";
import { Card, EmptyCard } from "../types";

interface CardStore {
  count: number;
  generated: Card[] | null; // Generated number
  tried: Card[] | null; // User's input number
  mode: "view" | "edit" | "check"; // Mode of the number game
  errors: Record<number, Card | EmptyCard> | null;
  scanDuration: number;
  recallDuration: number;
  activeKey: string | null; // Key for saving/loading numbers
  setGeneratedCards: (numbers: Card[] | null) => void;
  setErrors: (squares: Record<number, Card | EmptyCard> | null) => void;
  setCount: (digits: number) => void;
  setScanDuration: (duration: number) => void;
  setRecallDuration: (duration: number) => void;
  setActiveKey: (key: string | null) => void;
  reset: () => void;
  setTriedCards: (numbers: Card[] | null) => void;
  setMode: (mode: "view" | "edit" | "check") => void;
}

export const useCardStore = create<CardStore>((set) => ({
  count: 10,
  generated: null,
  tried: null,
  mode: "view",
  errors: null,
  scanDuration: 0,
  recallDuration: 0,
  activeKey: null,
  setActiveKey: (key: string | null) => set({ activeKey: key }),
  setCount: (digits: number) => set({ count: digits }),
  setGeneratedCards: (cards: Card[] | null) =>
    set({ generated: cards, tried: null, errors: null, mode: "view" }),
  setTriedCards: (cards: Card[] | null) => set({ tried: cards }),
  setScanDuration: (duration: number) => set({ scanDuration: duration }),
  setRecallDuration: (duration: number) => set({ recallDuration: duration }),
  reset: () =>
    set({
      generated: null,
      tried: null,
      mode: "view",
      errors: [],
      scanDuration: 0,
      recallDuration: 0,
    }),
  setMode: (mode: "view" | "edit" | "check") => set({ mode }),
  setErrors: (squares: Record<number, Card | EmptyCard> | null) =>
    set({ errors: squares }),
}));
