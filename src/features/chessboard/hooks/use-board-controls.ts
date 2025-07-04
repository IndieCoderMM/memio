import { configStorage } from "@/features/core/utils/config-storage";
import { saveRecord } from "@/features/core/utils/record-storage";
import { toast } from "react-toastify";
import { diffBoards } from "../utils/diff-board";
import { randomizeBoard } from "../utils/randomize-board";
import { getBoard, saveBoard } from "../utils/storage";
import { useChessStore } from "./use-chess-store";

export const useBoardControls = () => {
  const board = useChessStore((state) => state.board);
  const loadedKey = useChessStore((state) => state.boardKey);
  const mode = useChessStore((state) => state.mode);
  const scanDuration = useChessStore((state) => state.scanDuration);
  const setActivePiece = useChessStore((state) => state.setActivePiece);
  const setBoard = useChessStore((state) => state.setBoard);
  const setMode = useChessStore((state) => state.setMode);
  const setBoardKey = useChessStore((state) => state.setBoardKey);
  const setErrorSquares = useChessStore((state) => state.setErrorSquares);

  const handleRandomize = (totalPieces: number) => {
    const randomBoard = randomizeBoard(totalPieces);
    setBoard(randomBoard);

    if (mode !== "view") {
      setActivePiece(null);
      setMode("view");
      setErrorSquares([]);
    }
    setBoardKey(null);
    // Save preferred total pieces
    configStorage.updateSetting("chessboard", { total: totalPieces });
  };

  const handleRecall = () => {
    // If loadedKey exists, the board is already saved
    if (!loadedKey) {
      // Save the current board to local storage and set key
      const key = saveBoard(board);
      setBoardKey(key);
    }

    // Reset the board and mode
    setBoard({});
    setMode("edit");
    setActivePiece(null);
  };

  const handleCheck = (key: string, recallDuration: number) => {
    const recalledBoard = getBoard(key);
    if (!recalledBoard) {
      toast.error("No board found with this key");
      return;
    }

    // Get wrong squares
    const errorSquares = diffBoards(recalledBoard, board);
    const errorCount = Object.keys(errorSquares).length;
    setErrorSquares(errorSquares);
    if (errorCount > 0) {
      toast.error(`You made ${Object.keys(errorSquares).length} mistakes!`);
    } else {
      toast.success(`You got all pieces right!`);
    }

    // Change view
    setBoard(recalledBoard);
    setMode("check");

    const totalPieces = Object.keys(recalledBoard).length;

    // Save records
    const records: SessionRecord = {
      type: "chessboard",
      total: totalPieces,
      accuracy: (totalPieces - errorCount) / totalPieces,
      scan_ms: scanDuration,
      recall_ms: recallDuration,
      timestamp: Date.now(),
    };
    saveRecord(records);
  };

  return {
    handleRandomize,
    handleRecall,
    handleCheck,
  };
};
