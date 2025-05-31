import { ChessBoard, ChessSquare } from "../types";

/**
 * Compares two chess boards and returns the squares that differ.
 * @param boardA - Original board
 * @param boardB - Modified board
 * @returns An array of squares that differ between the two boards.
 */
export function diffBoards(
  boardA: ChessBoard,
  boardB: ChessBoard,
): ChessSquare[] {
  const allSquares = Object.keys({
    ...boardA,
    ...boardB,
  }) as ChessSquare[];

  return allSquares.filter((square) => boardA[square] !== boardB[square]);
}
