"use client";
import { animate, createScope, utils } from "animejs";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { IconButton } from "@/components/pouf/Button";
import { Badge } from "@/components/pouf/media";
import Image, { StaticImageData } from "next/image";
import { useEffect, useRef, useState } from "react";

type Props = {
  images: StaticImageData[];
};

export default function Carousel({ images }: Props) {
  const [index, setIndex] = useState(0);
  const [ready, setReady] = useState(false);
  const total = images.length;
  const containerRef = useRef<HTMLDivElement>(null);
  const scopeRef = useRef<ReturnType<typeof createScope> | null>(null);

  const prev = () => {
    const newIndex = (index - 1 + total) % total;
    setIndex(newIndex);
    scopeRef.current?.methods.rotate(newIndex);
  };

  const next = () => {
    const newIndex = (index + 1) % total;
    setIndex(newIndex);
    scopeRef.current?.methods.rotate(newIndex);
  };

  useEffect(() => {
    if (!images || images.length === 0 || !ready) {
      return;
    }
    setIndex(0);
    scopeRef.current?.methods?.rotate(0);
  }, [images, ready]);

  useEffect(() => {
    const scope = createScope({ root: containerRef.current! });
    scopeRef.current = scope;

    const animationInit = (index: number) => {
      const items = utils.$(".carousel-item");

      items.forEach(($item, i) => {
        const offset = i - index;

        animate($item, {
          translateX: offset === 0 ? 0 : offset > 0 ? 80 : -80,
          scale: offset === 0 ? 1 : 0.95,
          opacity: Math.abs(offset) <= 1 ? 1 : 0,
          zIndex: offset === 0 ? 2 : 1,
          duration: 100,
          ease: "linear",
        });
      });

      return () => {};
    };

    scope.add("rotate", (i: number) => animationInit(i));
    setReady(true);

    return () => {
      scope.revert();
      scopeRef.current = null;
      setReady(false);
    };
  }, []);

  return (
    <div className="relative mx-auto flex w-full max-w-lg flex-col items-center justify-center pb-(--s6)">
      {/* Image Stack */}
      <div
        className="relative h-80 w-full overflow-hidden rounded-card bg-bg cushion-field"
        ref={containerRef}
      >
        {images.map((src, i) => {
          return (
            <div
              key={i}
              className="carousel-item absolute inset-0 flex justify-center transition-all duration-500 ease-in-out"
            >
              <Image
                src={src}
                alt={`Card ${i + 1} of ${total}`}
                className="pixelated h-full w-auto object-contain"
                width={100}
                height={300}
              />
            </div>
          );
        })}
      </div>
      {/* Index Number Indicator */}
      <div className="absolute bottom-0 left-1/2 z-10 -translate-x-1/2">
        <Badge tone="purple">
          {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </Badge>
      </div>

      {/* Nav Buttons */}
      <div className="absolute top-1/2 left-(--s2) z-50 -translate-y-1/2">
        <IconButton
          onClick={prev}
          icon={<ChevronLeft size={20} />}
          label="Previous card"
          tone="purple"
          size="sm"
        />
      </div>
      <div className="absolute top-1/2 right-(--s2) z-50 -translate-y-1/2">
        <IconButton
          onClick={next}
          icon={<ChevronRight size={20} />}
          label="Next card"
          tone="purple"
          size="sm"
        />
      </div>
    </div>
  );
}
