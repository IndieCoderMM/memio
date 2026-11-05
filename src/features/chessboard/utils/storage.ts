import {
  COLLECTION_STORES,
  deleteItem,
  getAllItems,
  getItem,
  putItem,
} from "@/features/core/utils/indexed-db";
import { ChessBoard } from "../types";

export const saveBoard = async (board: ChessBoard): Promise<string> => {
  const key = Date.now().toString();
  await putItem(COLLECTION_STORES.chessboards, key, board);
  return key;
};

export const getSavedBoards = (): Promise<Record<string, ChessBoard>> =>
  getAllItems<ChessBoard>(COLLECTION_STORES.chessboards);

export const getBoard = (key: string): Promise<ChessBoard | null> =>
  getItem<ChessBoard>(COLLECTION_STORES.chessboards, key);

export const deleteBoard = (key: string): Promise<void> =>
  deleteItem(COLLECTION_STORES.chessboards, key);
