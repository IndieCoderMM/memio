import {
  BoardPosition,
  Piece,
  Square,
} from "react-chessboard/dist/chessboard/types";

export interface ChessBoard extends BoardPosition {}

export type ChessPiece = Piece;

export type ChessSquare = Square;
