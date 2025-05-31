"use client";

import React from "react";
import { Chessboard } from "react-chessboard";
import { useChessStore } from "../hooks/use-chess-store";
import { ChessSquare } from "../types";

const Board = () => {
  const board = useChessStore((state) => state.board);
  const activePiece = useChessStore((state) => state.activePiece);
  const setBoard = useChessStore((state) => state.setBoard);

  const handleSquareClick = (square: ChessSquare) => {
    console.log("Square clicked:", square);
    if (!activePiece) return;

    setBoard({ ...board, [square]: activePiece });
  };

  return (
    <Chessboard
      onSquareClick={handleSquareClick}
      position={board}
      boardWidth={500}
      allowDragOutsideBoard
      onPieceDropOffBoard={(square, piece) => {
        setBoard({ ...board, [square]: "" });
      }}
      onPieceDrop={(srcSquare, targetSquare, piece) => {
        setBoard({ ...board, [srcSquare]: "", [targetSquare]: piece });

        return true;
      }}
    />
  );
};

export default Board;
