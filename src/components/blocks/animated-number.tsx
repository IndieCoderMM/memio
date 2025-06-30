"use client";
import { cn } from "@/utils/tailwind";
import { animate } from "animejs";
import { useEffect, useRef } from "react";

const AnimatedNumber = ({
  num,
  isStatic = false,
  className,
  max = 9,
  duration = 1000,
}: {
  num: number;
  isStatic?: boolean;
  className?: string;
  max?: number;
  duration?: number;
}) => {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (isStatic) {
      if (ref.current) {
        ref.current.textContent = num.toString();
      }
      return;
    }

    const animation = animate(
      { num: 0 },
      {
        num: Math.random() * max, // 0 - 9
        round: 1,
        duration,
        onUpdate: (anim) => {
          const currentNum = Math.round((anim.targets[0] as any).num);
          if (ref.current) {
            ref.current.textContent = currentNum.toString();
          }
        },
        onComplete: () => {
          if (ref.current) {
            ref.current.textContent = num.toString();
          }
        },
      },
    );

    return () => {
      animation.revert();
    };
  }, [num, max, duration, isStatic]);

  return (
    <span ref={ref} className={cn(className)}>
      0
    </span>
  );
};

export default AnimatedNumber;
