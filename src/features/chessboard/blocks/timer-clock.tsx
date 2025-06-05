import { cn } from "@/utils/tailwind";
import { createScope, createTimer, Scope, Timer } from "animejs";
import { PauseIcon, PlayIcon, PowerIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const formatClock = (millis: number, showMillis = false) => {
  const totalSeconds = Math.floor(millis / 1000);
  const minutes = Math.floor(totalSeconds / 60);

  const seconds = totalSeconds % 60;
  const milliseconds = millis % 1000;

  const pad2 = (num: number) => String(num).padStart(2, "0");

  return showMillis
    ? `${pad2(minutes)}:${pad2(seconds)}:${pad2(Math.floor(milliseconds / 10))}`
    : `${pad2(minutes)}:${pad2(seconds)}`;
};

const TimerClock = () => {
  const root = useRef(null);
  const scope = useRef<Scope | null>(null);
  const timer = useRef<Timer | null>(null);
  const [duration, setDuration] = useState(0);
  const [status, setStatus] = useState<"idle" | "running" | "paused">("idle");

  const handlePlayPause = () => {
    if (!timer.current) return;

    if (!timer.current.paused) {
      timer.current.pause();
      setStatus("paused");
    } else {
      timer.current.play();
      setStatus("running");
    }
  };

  const handleReset = () => {
    timer.current?.reset();
    setDuration(0);
    setStatus("idle");
  };

  useEffect(() => {
    scope.current = createScope({ root }).add((self) => {
      timer.current = createTimer({
        duration: 1000,
        loop: true,
        autoplay: false,
        frameRate: 20,
        onUpdate: (self) => {
          setDuration(self.currentTime);
        },
      });
    });

    return () => scope.current?.revert();
  }, []);

  return (
    <div className="bg-elevated shadow-block flex w-full max-w-sm flex-col items-center justify-center rounded-md px-6 py-4">
      <div
        ref={root}
        className="relative w-fit overflow-hidden rounded-sm border border-[#333] px-3 py-1"
      >
        <div className="bg-accent-yellow/40 shadow-accent-yellow absolute inset-0 shadow-inner brightness-50"></div>
        <span
          className={cn("text-accent-yellow font-mono text-3xl brightness-125")}
        >
          {formatClock(duration, true)}
        </span>
      </div>
      <div className="mt-2 flex items-center justify-center gap-2 p-2">
        <button
          onClick={handlePlayPause}
          className="text-text-muted shadow-block cursor-pointer rounded-md bg-[#26252280] px-4 py-2 transition-colors hover:brightness-125"
          aria-label={status === "paused" ? "Start Clock" : "Pause Clock"}
          title={status === "paused" ? "Start Clock" : "Pause Clock"}
        >
          {status === "paused" ? (
            <PlayIcon className="h-5 w-5" />
          ) : status === "running" ? (
            <PauseIcon className="h-5 w-5" />
          ) : (
            <PlayIcon className="h-5 w-5" />
          )}
        </button>
        <button
          onClick={handleReset}
          aria-label="Reset"
          title="Reset Clock"
          className="text-text-muted shadow-block cursor-pointer rounded-md bg-[#26252280] px-4 py-2 transition-colors hover:brightness-125"
        >
          <PowerIcon className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default TimerClock;
