"use client";

import { useMemo } from "react";
import { Chessboard } from "react-chessboard";
import { CustomSquareStyles } from "react-chessboard/dist/chessboard/types";
import { useChessStore } from "../hooks/use-chess-store";
import { ChessSquare } from "../types";

const Board = () => {
  const board = useChessStore((state) => state.board);
  const activePiece = useChessStore((state) => state.activePiece);
  const errorSquares = useChessStore((state) => state.errorSquares);
  const setBoard = useChessStore((state) => state.setBoard);

  const handleSquareClick = (square: ChessSquare) => {
    console.log("Square clicked:", square);
    if (!activePiece) return;

    setBoard({ ...board, [square]: activePiece });
  };

  const squareStyles = useMemo(() => {
    const styles: CustomSquareStyles = {};

    errorSquares.forEach((square) => {
      styles[square] = { border: "2px solid red" };
    });

    return styles;
  }, [errorSquares]);

  return (
    <Chessboard
      onSquareClick={handleSquareClick}
      position={board}
      boardWidth={500}
      allowDragOutsideBoard
      customSquareStyles={squareStyles}
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
