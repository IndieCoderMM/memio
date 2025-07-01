import { Card } from "../types";

import { StaticImageData } from "next/image";
import cardBack from "../../../../public/assets/cards/card_back.png";
import c2 from "../../../../public/assets/cards/card_clubs_02.png";
import c3 from "../../../../public/assets/cards/card_clubs_03.png";
import c4 from "../../../../public/assets/cards/card_clubs_04.png";
import c5 from "../../../../public/assets/cards/card_clubs_05.png";
import c6 from "../../../../public/assets/cards/card_clubs_06.png";
import c7 from "../../../../public/assets/cards/card_clubs_07.png";
import c8 from "../../../../public/assets/cards/card_clubs_08.png";
import c9 from "../../../../public/assets/cards/card_clubs_09.png";
import c10 from "../../../../public/assets/cards/card_clubs_10.png";
import c1 from "../../../../public/assets/cards/card_clubs_A.png";
import cj from "../../../../public/assets/cards/card_clubs_J.png";
import ck from "../../../../public/assets/cards/card_clubs_K.png";
import cq from "../../../../public/assets/cards/card_clubs_Q.png";
import d2 from "../../../../public/assets/cards/card_diamonds_02.png";
import d3 from "../../../../public/assets/cards/card_diamonds_03.png";
import d4 from "../../../../public/assets/cards/card_diamonds_04.png";
import d5 from "../../../../public/assets/cards/card_diamonds_05.png";
import d6 from "../../../../public/assets/cards/card_diamonds_06.png";
import d7 from "../../../../public/assets/cards/card_diamonds_07.png";
import d8 from "../../../../public/assets/cards/card_diamonds_08.png";
import d9 from "../../../../public/assets/cards/card_diamonds_09.png";
import d10 from "../../../../public/assets/cards/card_diamonds_10.png";
import d1 from "../../../../public/assets/cards/card_diamonds_A.png";
import dj from "../../../../public/assets/cards/card_diamonds_J.png";
import dk from "../../../../public/assets/cards/card_diamonds_K.png";
import dq from "../../../../public/assets/cards/card_diamonds_Q.png";
import h2 from "../../../../public/assets/cards/card_hearts_02.png";
import h3 from "../../../../public/assets/cards/card_hearts_03.png";
import h4 from "../../../../public/assets/cards/card_hearts_04.png";
import h5 from "../../../../public/assets/cards/card_hearts_05.png";
import h6 from "../../../../public/assets/cards/card_hearts_06.png";
import h7 from "../../../../public/assets/cards/card_hearts_07.png";
import h8 from "../../../../public/assets/cards/card_hearts_08.png";
import h9 from "../../../../public/assets/cards/card_hearts_09.png";
import h10 from "../../../../public/assets/cards/card_hearts_10.png";
import h1 from "../../../../public/assets/cards/card_hearts_A.png";
import hj from "../../../../public/assets/cards/card_hearts_J.png";
import hk from "../../../../public/assets/cards/card_hearts_K.png";
import hq from "../../../../public/assets/cards/card_hearts_Q.png";
import s2 from "../../../../public/assets/cards/card_spades_02.png";
import s3 from "../../../../public/assets/cards/card_spades_03.png";
import s4 from "../../../../public/assets/cards/card_spades_04.png";
import s5 from "../../../../public/assets/cards/card_spades_05.png";
import s6 from "../../../../public/assets/cards/card_spades_06.png";
import s7 from "../../../../public/assets/cards/card_spades_07.png";
import s8 from "../../../../public/assets/cards/card_spades_08.png";
import s9 from "../../../../public/assets/cards/card_spades_09.png";
import s10 from "../../../../public/assets/cards/card_spades_10.png";
import s1 from "../../../../public/assets/cards/card_spades_A.png";
import sj from "../../../../public/assets/cards/card_spades_J.png";
import sk from "../../../../public/assets/cards/card_spades_K.png";
import sq from "../../../../public/assets/cards/card_spades_Q.png";

import c2Sm from "../../../../public/assets/cards-sm/card_clubs_02.png";
import c3Sm from "../../../../public/assets/cards-sm/card_clubs_03.png";
import c4Sm from "../../../../public/assets/cards-sm/card_clubs_04.png";
import c5Sm from "../../../../public/assets/cards-sm/card_clubs_05.png";
import c6Sm from "../../../../public/assets/cards-sm/card_clubs_06.png";
import c7Sm from "../../../../public/assets/cards-sm/card_clubs_07.png";
import c8Sm from "../../../../public/assets/cards-sm/card_clubs_08.png";
import c9Sm from "../../../../public/assets/cards-sm/card_clubs_09.png";
import c10Sm from "../../../../public/assets/cards-sm/card_clubs_10.png";
import c1Sm from "../../../../public/assets/cards-sm/card_clubs_A.png";
import cjSm from "../../../../public/assets/cards-sm/card_clubs_J.png";
import ckSm from "../../../../public/assets/cards-sm/card_clubs_K.png";
import cqSm from "../../../../public/assets/cards-sm/card_clubs_Q.png";
import d2Sm from "../../../../public/assets/cards-sm/card_diamonds_02.png";
import d3Sm from "../../../../public/assets/cards-sm/card_diamonds_03.png";
import d4Sm from "../../../../public/assets/cards-sm/card_diamonds_04.png";
import d5Sm from "../../../../public/assets/cards-sm/card_diamonds_05.png";
import d6Sm from "../../../../public/assets/cards-sm/card_diamonds_06.png";
import d7Sm from "../../../../public/assets/cards-sm/card_diamonds_07.png";
import d8Sm from "../../../../public/assets/cards-sm/card_diamonds_08.png";
import d9Sm from "../../../../public/assets/cards-sm/card_diamonds_09.png";
import d10Sm from "../../../../public/assets/cards-sm/card_diamonds_10.png";
import d1Sm from "../../../../public/assets/cards-sm/card_diamonds_A.png";
import djSm from "../../../../public/assets/cards-sm/card_diamonds_J.png";
import dkSm from "../../../../public/assets/cards-sm/card_diamonds_K.png";
import dqSm from "../../../../public/assets/cards-sm/card_diamonds_Q.png";
import h2Sm from "../../../../public/assets/cards-sm/card_hearts_02.png";
import h3Sm from "../../../../public/assets/cards-sm/card_hearts_03.png";
import h4Sm from "../../../../public/assets/cards-sm/card_hearts_04.png";
import h5Sm from "../../../../public/assets/cards-sm/card_hearts_05.png";
import h6Sm from "../../../../public/assets/cards-sm/card_hearts_06.png";
import h7Sm from "../../../../public/assets/cards-sm/card_hearts_07.png";
import h8Sm from "../../../../public/assets/cards-sm/card_hearts_08.png";
import h9Sm from "../../../../public/assets/cards-sm/card_hearts_09.png";
import h10Sm from "../../../../public/assets/cards-sm/card_hearts_10.png";
import h1Sm from "../../../../public/assets/cards-sm/card_hearts_A.png";
import hjSm from "../../../../public/assets/cards-sm/card_hearts_J.png";
import hkSm from "../../../../public/assets/cards-sm/card_hearts_K.png";
import hqSm from "../../../../public/assets/cards-sm/card_hearts_Q.png";
import s2Sm from "../../../../public/assets/cards-sm/card_spades_02.png";
import s3Sm from "../../../../public/assets/cards-sm/card_spades_03.png";
import s4Sm from "../../../../public/assets/cards-sm/card_spades_04.png";
import s5Sm from "../../../../public/assets/cards-sm/card_spades_05.png";
import s6Sm from "../../../../public/assets/cards-sm/card_spades_06.png";
import s7Sm from "../../../../public/assets/cards-sm/card_spades_07.png";
import s8Sm from "../../../../public/assets/cards-sm/card_spades_08.png";
import s9Sm from "../../../../public/assets/cards-sm/card_spades_09.png";
import s10Sm from "../../../../public/assets/cards-sm/card_spades_10.png";
import s1Sm from "../../../../public/assets/cards-sm/card_spades_A.png";
import sjSm from "../../../../public/assets/cards-sm/card_spades_J.png";
import skSm from "../../../../public/assets/cards-sm/card_spades_K.png";
import sqSm from "../../../../public/assets/cards-sm/card_spades_Q.png";

export const cardBackImage: StaticImageData = cardBack;

export const cardImages: Record<Card, StaticImageData> = {
  d1: d1,
  d2: d2,
  d3: d3,
  d4: d4,
  d5: d5,
  d6: d6,
  d7: d7,
  d8: d8,
  d9: d9,
  d10: d10,
  dj: dj,
  dq: dq,
  dk: dk,
  h1: h1,
  h2: h2,
  h3: h3,
  h4: h4,
  h5: h5,
  h6: h6,
  h7: h7,
  h8: h8,
  h9: h9,
  h10: h10,
  hj: hj,
  hq: hq,
  hk: hk,
  s1: s1,
  s2: s2,
  s3: s3,
  s4: s4,
  s5: s5,
  s6: s6,
  s7: s7,
  s8: s8,
  s9: s9,
  s10: s10,
  sj: sj,
  sq: sq,
  sk: sk,
  c1: c1,
  c2: c2,
  c3: c3,
  c4: c4,
  c5: c5,
  c6: c6,
  c7: c7,
  c8: c8,
  c9: c9,
  c10: c10,
  cj: cj,
  cq: cq,
  ck: ck,
};

export const smallCardImages: Record<Card, StaticImageData> = {
  d1: d1Sm,
  d2: d2Sm,
  d3: d3Sm,
  d4: d4Sm,
  d5: d5Sm,
  d6: d6Sm,
  d7: d7Sm,
  d8: d8Sm,
  d9: d9Sm,
  d10: d10Sm,
  dj: djSm,
  dq: dqSm,
  dk: dkSm,
  h1: h1Sm,
  h2: h2Sm,
  h3: h3Sm,
  h4: h4Sm,
  h5: h5Sm,
  h6: h6Sm,
  h7: h7Sm,
  h8: h8Sm,
  h9: h9Sm,
  h10: h10Sm,
  hj: hjSm,
  hq: hqSm,
  hk: hkSm,
  s1: s1Sm,
  s2: s2Sm,
  s3: s3Sm,
  s4: s4Sm,
  s5: s5Sm,
  s6: s6Sm,
  s7: s7Sm,
  s8: s8Sm,
  s9: s9Sm,
  s10: s10Sm,
  sj: sjSm,
  sq: sqSm,
  sk: skSm,
  c1: c1Sm,
  c2: c2Sm,
  c3: c3Sm,
  c4: c4Sm,
  c5: c5Sm,
  c6: c6Sm,
  c7: c7Sm,
  c8: c8Sm,
  c9: c9Sm,
  c10: c10Sm,
  cj: cjSm,
  cq: cqSm,
  ck: ckSm,
};
