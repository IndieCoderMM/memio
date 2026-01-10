export type DiamondCard =
  | "d1"
  | "d2"
  | "d3"
  | "d4"
  | "d5"
  | "d6"
  | "d7"
  | "d8"
  | "d9"
  | "d10"
  | "dj"
  | "dq"
  | "dk";

export type HeartCard =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "h7"
  | "h8"
  | "h9"
  | "h10"
  | "hj"
  | "hq"
  | "hk";

export type SpadeCard =
  | "s1"
  | "s2"
  | "s3"
  | "s4"
  | "s5"
  | "s6"
  | "s7"
  | "s8"
  | "s9"
  | "s10"
  | "sj"
  | "sq"
  | "sk";

export type ClubCard =
  | "c1"
  | "c2"
  | "c3"
  | "c4"
  | "c5"
  | "c6"
  | "c7"
  | "c8"
  | "c9"
  | "c10"
  | "cj"
  | "cq"
  | "ck";

export type EmptyCard = "00";

export type Card = DiamondCard | HeartCard | SpadeCard | ClubCard;

export type Deck = Card[];
