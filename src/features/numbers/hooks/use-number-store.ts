import { create } from "zustand";

interface NumberStore {
  digits: number;
  generated: string[] | null; // Generated number
  tried: string[] | null; // User's input number
  mode: "view" | "edit" | "check"; // Mode of the number game
  errorSquares?: Record<number, string> | null;
  setGeneratedNumbers: (numbers: string[] | null) => void;
  setErrorSquares: (squares: Record<number, string> | null) => void;
  setDigits: (digits: number) => void;
  reset: () => void;
  setTriedNumbers: (numbers: string[] | null) => void;
  setMode: (mode: "view" | "edit" | "check") => void;
}

export const useNumberStore = create<NumberStore>((set) => ({
  digits: 10,
  generated: null,
  tried: null,
  mode: "view",
  errorSquares: null,
  setDigits: (digits: number) => set({ digits }),
  setGeneratedNumbers: (numbers: string[] | null) =>
    set({ generated: numbers, tried: null, errorSquares: null, mode: "view" }),
  setTriedNumbers: (numbers: string[] | null) => set({ tried: numbers }),
  reset: () =>
    set({ generated: null, tried: null, mode: "view", errorSquares: [] }),
  setMode: (mode: "view" | "edit" | "check") => set({ mode }),
  setErrorSquares: (squares: Record<number, string> | null) =>
    set({ errorSquares: squares }),
}));
