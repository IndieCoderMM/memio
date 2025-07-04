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

declare type SessionRecord = {
  type: "chessboard" | "number" | "binary" | "cards";
  total: number;
  accuracy: number;
  scan_ms: number;
  recall_ms: number;
  timestamp: number;
};
