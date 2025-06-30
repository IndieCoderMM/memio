"use client";

import Carousel from "@/components/blocks/carousel";
import { StaticImageData } from "next/image";
import { useEffect, useRef, useState } from "react";
import { useCardStore } from "../hooks/use-card-store";
import { cardBackImage, cardImages } from "../utils/images";

const CardBoard = () => {
  const [cards, setCards] = useState<StaticImageData[]>([]);
  const cells = useRef<Array<HTMLInputElement | null>>([]);
  const generated = useCardStore((s) => s.generated);
  const errors = useCardStore((s) => s.errors);
  const tried = useCardStore((s) => s.tried);
  const mode = useCardStore((s) => s.mode);
  const setTriedNumbers = useCardStore((s) => s.setTriedCards);

  const emptyCells = 52 - (generated?.length ?? 0);

  useEffect(() => {
    if (mode === "view" && generated) {
      const imgs = [];
      console.log("Generated cards:", generated);
      for (let c of generated) {
        imgs.push(cardImages[c]);
      }

      setCards(imgs);
    }
  }, [generated, mode]);

  useEffect(() => {
    if (mode === "edit") {
      if (cells.current.length > 0) {
        cells.current[0]?.focus();
      }
    }
  }, [mode]);

  const handleChange =
    (index: number): React.ChangeEventHandler<HTMLInputElement> =>
    (e) => {
      let value = e.target.value.replace(/\D/g, "");
      if (value.length > 1) {
        value = value[value.length - 1]; // Keep only the last digit
      }

      const newTried = tried ? [...tried] : Array(generated?.length).fill("");
      newTried[index] = value;
      setTriedNumbers(newTried);

      if (value && cells.current[index + 1]) {
        requestAnimationFrame(() => {
          cells.current[index + 1]?.focus();
        });
      } else if (value === "" && cells.current[index - 1]) {
        cells.current[index - 1]?.focus();
      }
    };

  return (
    <div className="w-full">
      <div className="w-full">
        {cards.length > 0 ? (
          <Carousel images={cards} />
        ) : (
          <Carousel images={[cardBackImage]} />
        )}
      </div>
    </div>
  );
};

export default CardBoard;
