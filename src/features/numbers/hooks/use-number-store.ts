import { create } from "zustand";
import type { NumberSequenceSource } from "../types";

interface NumberStore {
  digits: number;
  source: NumberSequenceSource;
  generated: string[] | null; // Generated number
  tried: string[] | null; // User's input number
  mode: "view" | "edit" | "check"; // Mode of the number game
  errorSquares: Record<number, string> | null;
  scanDuration: number;
  recallDuration: number;
  activeKey: string | null; // Key for saving/loading numbers
  setGeneratedNumbers: (
    numbers: string[] | null,
    source: NumberSequenceSource,
  ) => void;
  setErrorSquares: (squares: Record<number, string> | null) => void;
  setDigits: (digits: number) => void;
  setSource: (source: NumberSequenceSource) => void;
  setScanDuration: (duration: number) => void;
  setRecallDuration: (duration: number) => void;
  setActiveKey: (key: string | null) => void;
  reset: () => void;
  setTriedNumbers: (numbers: string[] | null) => void;
  setMode: (mode: "view" | "edit" | "check") => void;
}

export const useNumberStore = create<NumberStore>((set) => ({
  digits: 10,
  source: "random",
  generated: null,
  tried: null,
  mode: "view",
  errorSquares: null,
  scanDuration: 0,
  recallDuration: 0,
  activeKey: null,
  setActiveKey: (key: string | null) => set({ activeKey: key }),
  setDigits: (digits: number) => set({ digits }),
  setSource: (source: NumberSequenceSource) => set({ source }),
  setGeneratedNumbers: (
    numbers: string[] | null,
    source: NumberSequenceSource,
  ) =>
    set({
      generated: numbers,
      source,
      tried: null,
      errorSquares: null,
      mode: "view",
    }),
  setTriedNumbers: (numbers: string[] | null) => set({ tried: numbers }),
  setScanDuration: (duration: number) => set({ scanDuration: duration }),
  setRecallDuration: (duration: number) => set({ recallDuration: duration }),
  reset: () =>
    set({
      generated: null,
      tried: null,
      mode: "view",
      errorSquares: [],
      scanDuration: 0,
      recallDuration: 0,
    }),
  setMode: (mode: "view" | "edit" | "check") => set({ mode }),
  setErrorSquares: (squares: Record<number, string> | null) =>
    set({ errorSquares: squares }),
}));
