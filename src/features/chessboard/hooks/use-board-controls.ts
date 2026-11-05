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

  const handleRecall = async () => {
    // If loadedKey exists, the board is already saved
    if (!loadedKey) {
      let key: string;
      try {
        key = await saveBoard(board);
      } catch {
        toast.error("Your board could not be saved. Please try again.");
        return;
      }
      setBoardKey(key);
    }

    // Reset the board and mode
    setBoard({});
    setMode("edit");
    setActivePiece(null);
  };

  const handleCheck = async (key: string, recallDuration: number) => {
    let recalledBoard;
    try {
      recalledBoard = await getBoard(key);
    } catch {
      toast.error("Your saved board could not be loaded.");
      return;
    }
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
    try {
      await saveRecord(records);
    } catch {
      toast.error("Your result could not be saved.");
    }
  };

  return {
    handleRandomize,
    handleRecall,
    handleCheck,
  };
};
