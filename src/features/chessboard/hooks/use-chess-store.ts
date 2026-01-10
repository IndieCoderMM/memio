import { create } from "zustand";
import { ChessBoard, ChessPiece, ChessSquare } from "../types";
import { BOARD } from "../utils/constants";

interface ChessStore {
  board: ChessBoard;
  activePiece: ChessPiece | null | "eraser";
  mode: "view" | "edit" | "check";
  boardKey: string | null; // ? key for saving/loading boards
  errorSquares: ChessSquare[]; // ? to track differences between boards
  totalPieces: number;
  scanDuration: number;
  recallDuration: number;
  setBoard: (newPosition: ChessBoard) => void;
  resetBoard: () => void;
  setActivePiece: (piece: ChessPiece | null | "eraser") => void;
  setBoardKey: (key: string | null) => void;
  setErrorSquares: (squares: ChessSquare[]) => void;
  setTotalPieces: (total: number) => void;
  setScanDuration: (duration: number) => void;
  setRecallDuration: (duration: number) => void;
  setMode: (mode: "view" | "edit" | "check") => void;
  switchMode: (mode: "view" | "edit" | "check") => void;
}

export const useChessStore = create<ChessStore>((set) => ({
  board: BOARD,
  activePiece: null,
  mode: "view",
  boardKey: null,
  errorSquares: [],
  totalPieces: 10,
  scanDuration: 0, // Default scan duration
  recallDuration: 0, // Default recall duration
  resetBoard: () => set({ board: BOARD }),
  setBoard: (newPosition: ChessBoard) => set({ board: newPosition }),
  setActivePiece: (piece: ChessPiece | null | "eraser") =>
    set({ activePiece: piece }),
  setMode: (mode: "view" | "edit" | "check") => set({ mode }),
  setBoardKey: (key: string | null) => set({ boardKey: key }),
  setErrorSquares: (squares: ChessSquare[]) => set({ errorSquares: squares }),
  setTotalPieces: (total: number) => set({ totalPieces: total ? total : 1 }),
  setScanDuration: (duration: number) => set({ scanDuration: duration }),
  setRecallDuration: (duration: number) => set({ recallDuration: duration }),
  switchMode: (mode: "view" | "edit" | "check") =>
    set((state) => {
      if (state.mode === mode) return state; // No change if already in the desired mode

      if (mode === "edit") {
        return {
          mode,
          board: {},
          activePiece: null,
        };
      }

      return { mode };
    }),
}));
