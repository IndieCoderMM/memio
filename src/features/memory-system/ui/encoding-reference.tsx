"use client";

import { IconButton } from "@/components/pouf/Button";
import { Stack } from "@/components/pouf/layout";
import * as Dialog from "@radix-ui/react-dialog";
import { BookOpen, X } from "lucide-react";
import { useId, useRef, useState, type KeyboardEvent } from "react";

const systems = [
  {
    name: "Major",
    description:
      "Match each digit to a consonant sound. Vowels and W, H, and Y sounds are fillers.",
    mappings: [
      ["S", "Z", "soft C"],
      ["T", "D"],
      ["N"],
      ["M"],
      ["R"],
      ["L"],
      ["Sh", "Ch", "J", "soft G", "Zh"],
      ["K", "hard C", "hard G", "Q"],
      ["F", "V"],
      ["P", "B"],
    ],
  },
  {
    name: "Dominic",
    description:
      "Use the letters for each pair of digits as a person's initials.",
    mappings: [
      ["O"],
      ["A"],
      ["B"],
      ["C"],
      ["D"],
      ["E"],
      ["S"],
      ["G"],
      ["H"],
      ["N"],
    ],
  },
] as const;

export default function EncodingReference() {
  const [selected, setSelected] = useState(0);
  const id = useId();
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const system = systems[selected];

  function moveTab(event: KeyboardEvent<HTMLButtonElement>) {
    let next: number;
    switch (event.key) {
      case "ArrowRight":
        next = (selected + 1) % systems.length;
        break;
      case "ArrowLeft":
        next = (selected + systems.length - 1) % systems.length;
        break;
      case "Home":
        next = 0;
        break;
      case "End":
        next = systems.length - 1;
        break;
      default:
        return;
    }
    event.preventDefault();
    setSelected(next);
    tabs.current[next]?.focus();
  }

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <IconButton
          icon={<BookOpen size={18} />}
          label="Open encoding reference"
          variant="quiet"
        />
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="pouf-overlay" />
        <Dialog.Content className="pouf-dialog pouf-dialog--lg">
          <Stack gap={3}>
            <div className="pouf-dialog__head">
              <div>
                <Dialog.Title className="text-ink text-xl font-black">
                  Number encoding reference
                </Dialog.Title>
                <Dialog.Description className="text-muted mt-1 text-sm font-bold">
                  Use these mappings to help choose your own PAO entries.
                </Dialog.Description>
              </div>
              <Dialog.Close asChild>
                <IconButton
                  icon={<X size={18} />}
                  label="Close encoding reference"
                  size="sm"
                />
              </Dialog.Close>
            </div>

            <div
              role="tablist"
              aria-label="Encoding system"
              className="bg-bg rounded-control flex gap-1 p-1"
            >
              {systems.map((item, index) => (
                <button
                  key={item.name}
                  ref={(element) => {
                    tabs.current[index] = element;
                  }}
                  type="button"
                  role="tab"
                  id={`${id}-tab-${index}`}
                  aria-controls={`${id}-panel`}
                  aria-selected={selected === index}
                  tabIndex={selected === index ? 0 : -1}
                  onClick={() => setSelected(index)}
                  onKeyDown={moveTab}
                  className={`rounded-control focus-visible:outline-purple flex-1 px-4 py-2 text-sm font-black focus-visible:outline-2 focus-visible:outline-offset-2 ${selected === index ? "bg-purple cushion-control text-[var(--on-accent)]" : "text-muted hover:text-ink"}`}
                >
                  {item.name}
                </button>
              ))}
            </div>

            <div
              className="pouf-dialog__body"
              role="tabpanel"
              id={`${id}-panel`}
              aria-labelledby={`${id}-tab-${selected}`}
              tabIndex={0}
            >
              <p className="text-muted mb-4 text-sm font-bold">
                {system.description}
              </p>
              <dl className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                {system.mappings.map((letters, digit) => (
                  <div
                    key={digit}
                    className="bg-bg rounded-control flex min-w-0 items-center gap-3 p-3"
                  >
                    <dt className="bg-purple rounded-control flex size-11 shrink-0 items-center justify-center text-xl font-black text-[var(--on-accent)] tabular-nums">
                      <span className="sr-only">Digit </span>
                      {digit}
                    </dt>
                    <dd className="flex min-w-0 flex-wrap gap-1.5">
                      {letters.map((letter) => (
                        <span
                          key={letter}
                          className="bg-surface rounded-control text-ink px-2.5 py-1 text-sm font-black"
                        >
                          {letter}
                        </span>
                      ))}
                    </dd>
                  </div>
                ))}
              </dl>
              <p className="text-muted mt-4 text-sm font-bold">
                Some mappings vary by preference.
              </p>
            </div>
          </Stack>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
