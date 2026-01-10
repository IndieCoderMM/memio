import { ChessBoard, ChessPiece, ChessSquare } from "../types";

/**
 * Randomizes the chess board by placing a specified number of pieces
 * @param N - The number of pieces to place on the board (1-64).
 * @return A chess board object with pieces placed on random squares.
 */
export function randomizeBoard(N: number): ChessBoard {
  if (N <= 0 || N > 32) throw new Error(`Invalid number of pieces: ${N}`);

  const files = ["a", "b", "c", "d", "e", "f", "g", "h"];
  const ranks = ["1", "2", "3", "4", "5", "6", "7", "8"];
  const allSquares: ChessSquare[] = [];

  for (const file of files) {
    for (const rank of ranks) {
      allSquares.push(`${file}${rank}` as ChessSquare);
    }
  }

  const pieces: Record<ChessPiece, number> = {
    wK: 1,
    wQ: 1,
    wR: 2,
    wB: 2,
    wN: 2,
    wP: 8,
    bK: 1,
    bQ: 1,
    bR: 2,
    bB: 2,
    bN: 2,
    bP: 8,
  };

  // Create a flat array with all allowable pieces
  const piecePool: ChessPiece[] = [];
  for (const [piece, count] of Object.entries(pieces)) {
    for (let i = 0; i < count; i++) {
      piecePool.push(piece as ChessPiece);
    }
  }

  // Shuffle pieces and squares
  const shuffledPieces = piecePool.sort(() => Math.random() - 0.5).slice(0, N);
  const shuffledSquares = allSquares
    .sort(() => Math.random() - 0.5)
    .slice(0, N);

  const board: ChessBoard = {};
  for (let i = 0; i < N; i++) {
    board[shuffledSquares[i]] = shuffledPieces[i];
  }

  return board;
}
