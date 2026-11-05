declare type ConfigType = {
  chessboard: {
    total: number;
  };
  numbers: {
    total: number;
  };
  cards: {
    total: number;
  };
};

declare type SessionGame = "chessboard" | "number" | "binary" | "cards";

declare type SessionRecord = {
  type: SessionGame;
  total: number;
  accuracy: number;
  scan_ms: number;
  recall_ms: number;
  timestamp: number;
};
