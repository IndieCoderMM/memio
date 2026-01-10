"use client";

import Carousel from "@/components/blocks/carousel";
import { cn } from "@/utils/tailwind";
import Image, { StaticImageData } from "next/image";
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
  const setTriedCards = useCardStore((s) => s.setTriedCards);

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

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const draggedId = e.dataTransfer.getData("text/plain");
    const target = e.currentTarget;
    const toIndex = parseInt(target.id, 10);
    const newTried = tried ? [...tried] : Array(generated?.length).fill("");

    newTried[toIndex] = draggedId;
    setTriedCards(newTried);
  };

  return (
    <div className="w-full">
      <div className="w-full">
        {mode === "view" && cards.length > 0 ? (
          <Carousel images={cards} />
        ) : mode === "view" ? (
          <Carousel images={[cardBackImage]} />
        ) : (
          <div className="grid grid-cols-10 place-items-center gap-1">
            {generated?.map((card, index) => {
              const cardName = mode === "edit" ? tried?.[index] : card;

              return (
                <div
                  key={`${cardName}-${index}`}
                  className={cn(
                    "bg-card border-border relative h-20 w-full border",
                    mode === "check" && {
                      "border-accent-green": !errors?.[index],
                      "border-accent-red": errors?.[index],
                      "border-orange-700":
                        errors?.[index] && errors[index] === "00",
                    },
                  )}
                >
                  <Image
                    id={`${index}`}
                    src={cardName ? cardImages[cardName] : cardBackImage}
                    alt={`Card ${cardName}`}
                    width={200}
                    height={300}
                    draggable={false}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={handleDrop}
                    className={`h-full w-auto object-contain`}
                  />
                </div>
              );
            })}
            {Array.from({ length: emptyCells }).map((_, index) => (
              <div
                key={`empty-${index}`}
                className="bg-surface border-surface relative h-20 w-full border"
              ></div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CardBoard;
