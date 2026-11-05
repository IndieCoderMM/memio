"use client";

import Carousel from "@/components/blocks/carousel";
import { cn } from "@/utils/tailwind";
import Image, { StaticImageData } from "next/image";
import { useEffect, useState } from "react";
import { useCardStore } from "../hooks/use-card-store";
import { cardBackImage, cardImages } from "../utils/images";

const CardBoard = () => {
  const [cards, setCards] = useState<StaticImageData[]>([]);
  const generated = useCardStore((s) => s.generated);
  const errors = useCardStore((s) => s.errors);
  const tried = useCardStore((s) => s.tried);
  const mode = useCardStore((s) => s.mode);
  const setTriedCards = useCardStore((s) => s.setTriedCards);

  const emptyCells = 52 - (generated?.length ?? 0);

  useEffect(() => {
    if (mode === "view" && generated) {
      const imgs = [];
      for (let c of generated) {
        imgs.push(cardImages[c]);
      }

      setCards(imgs);
    }
  }, [generated, mode]);

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
          <div className="grid grid-cols-4 place-items-center gap-(--s2) sm:grid-cols-7 xl:grid-cols-10">
            {generated?.map((card, index) => {
              const cardName = mode === "edit" ? tried?.[index] : card;

              return (
                <div
                  key={`${cardName}-${index}`}
                  className={cn(
                    "relative aspect-[5/7] w-full rounded-[10px] bg-surface p-1 cushion-field",
                    mode === "check" && {
                      "ring-2 ring-mint": !errors?.[index],
                      "ring-2 ring-pink": errors?.[index],
                      "ring-2 ring-orange":
                        errors?.[index] && errors[index] === "00",
                    },
                  )}
                >
                  <Image
                    id={`${index}`}
                    src={cardName ? cardImages[cardName] : cardBackImage}
                    alt={cardName ? `Card ${cardName}` : `Empty card slot ${index + 1}`}
                    width={200}
                    height={300}
                    draggable={false}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={handleDrop}
                    className="h-full w-full object-contain"
                  />
                </div>
              );
            })}
            {Array.from({ length: emptyCells }).map((_, index) => (
              <div
                key={`empty-${index}`}
                className="aspect-[5/7] w-full rounded-[10px] bg-bg cushion-field"
              ></div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CardBoard;
