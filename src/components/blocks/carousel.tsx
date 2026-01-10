"use client";
import { animate, createScope, utils } from "animejs";
import { ChevronLeft, ChevronRight } from "lucide-react";
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
    <div className="relative mx-auto flex w-full max-w-lg items-center justify-center">
      {/* Image Stack */}
      <div
        className="relative h-80 w-full overflow-hidden rounded-xl"
        ref={containerRef}
      >
        {images.map((src, i) => {
          return (
            <div
              key={i}
              className={`carousel-item absolute inset-0 flex justify-center transition-all duration-500 ease-in-out`}
            >
              <Image
                src={src}
                alt={`Slide ${i}`}
                className="pixelated h-full w-auto rounded-xl object-contain"
                width={100}
                height={300}
              />
            </div>
          );
        })}
      </div>
      {/* Index Number Indicator */}
      <div className="bg-card absolute top-full left-1/2 z-10 flex -translate-x-1/2 space-x-2 rounded p-2">
        <span className="font-mono text-xl">
          {String(index + 1).padStart(2, "0")} /{" "}
          {String(total).padStart(2, "0")}
        </span>
      </div>

      {/* Nav Buttons */}
      <button
        onClick={prev}
        className="bg-muted hover:bg-accent-green/20 absolute top-1/2 left-0 z-50 -translate-y-1/2 cursor-pointer rounded-full p-2"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={next}
        className="bg-muted hover:bg-accent-green/20 absolute top-1/2 right-0 z-50 -translate-y-1/2 cursor-pointer rounded-full p-2"
      >
        <ChevronRight size={24} />
      </button>
    </div>
  );
}
