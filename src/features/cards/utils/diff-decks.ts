import { Card, Deck } from "../types";

export function diffDecks(target: Deck, tried: Deck) {
  const errors: Record<number, Card> = {};

  for (let i = 0; i < target.length; i++) {
    if (target[i] !== tried[i]) {
      errors[i] = tried[i] || "00"; // Store the user's input or empty card
    }
  }

  return errors;
}
