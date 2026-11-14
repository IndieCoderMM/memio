"use client";

import { Button } from "@/components/pouf/Button";
import { Stack } from "@/components/pouf/layout";
import { Card } from "@/components/pouf/surface";
import { Eyebrow, Heading, Text } from "@/components/pouf/text";
import type { PaoEntry } from "@/features/memory-system/types";
import EncodingReference from "@/features/memory-system/ui/encoding-reference";
import { Storage } from "@/utils/Storage";
import Link from "next/link";
import { useEffect, useState } from "react";

const storage = new Storage<PaoEntry>("memory-system-pao");
const numbers = Array.from({ length: 100 }, (_, i) =>
  String(i).padStart(2, "0"),
);
const fields = ["person", "action", "object"] as const;
const emptyEntry: PaoEntry = { person: "", action: "", object: "" };

function isComplete(entry: PaoEntry) {
  return fields.every((field) => entry[field].trim().length > 0);
}

export default function PaoBuilder() {
  const [entries, setEntries] = useState<Record<string, PaoEntry>>({});
  const [pending, setPending] = useState<Record<string, PaoEntry>>({});
  const [ready, setReady] = useState(false);
  const [loadError, setLoadError] = useState(false);
  const [group, setGroup] = useState(0);
  const [query, setQuery] = useState("");
  const [incompleteOnly, setIncompleteOnly] = useState(false);
  const [focusedNumber, setFocusedNumber] = useState<string | null>(null);

  function loadEntries() {
    try {
      setEntries(storage.getAll() || {});
      setLoadError(false);
      setReady(true);
    } catch {
      setLoadError(true);
    }
  }

  useEffect(() => {
    loadEntries();
  }, []);

  function updateEntry(number: string, field: keyof PaoEntry, value: string) {
    const entry = { ...(entries[number] || emptyEntry), [field]: value };
    setEntries((current) => ({ ...current, [number]: entry }));
    try {
      storage.saveItem(number, entry);
      setPending((current) => {
        const next = { ...current };
        delete next[number];
        return next;
      });
    } catch {
      setPending((current) => ({ ...current, [number]: entry }));
    }
  }

  function retrySaving() {
    const failed: Record<string, PaoEntry> = {};
    for (const [number, entry] of Object.entries(pending)) {
      try {
        storage.saveItem(number, entry);
      } catch {
        failed[number] = entry;
      }
    }
    setPending(failed);
  }

  const complete = numbers.filter((number) =>
    isComplete(entries[number] || emptyEntry),
  ).length;
  const search = query.trim().toLocaleLowerCase();
  const visibleNumbers = numbers.filter((number, index) => {
    const entry = entries[number] || emptyEntry;
    const inRange = search ? true : Math.floor(index / 10) === group;
    const matchesSearch =
      !search ||
      [number, ...fields.map((field) => entry[field])].some((value) =>
        value.toLocaleLowerCase().includes(search),
      );
    return (
      number === focusedNumber ||
      (inRange && matchesSearch && (!incompleteOnly || !isComplete(entry)))
    );
  });

  return (
    <main className="page-container">
      <div className="mx-auto w-full max-w-[1000px]">
        <Stack gap={6}>
          <header>
            <Stack gap={2}>
              <Link
                href="/library/systems"
                className="text-muted hover:text-ink w-fit font-extrabold no-underline"
              >
                ← Personal systems
              </Link>
              <Eyebrow>Your memory system</Eyebrow>
              <div className="flex items-center justify-between gap-4">
                <Heading level={1}>Number PAO builder</Heading>
                <div className="shrink-0">
                  <EncodingReference />
                </div>
              </div>
              <Text muted>
                Give each number from 00 to 99 a person, action, and object of
                your own.
              </Text>
            </Stack>
          </header>

          <Card variant="tight">
            <div className="flex flex-col gap-3">
              <div className="flex items-baseline justify-between gap-3">
                <p className="text-ink font-black">Your progress</p>
                <p className="text-muted text-sm font-bold tabular-nums">
                  <span className="text-ink text-lg font-black">
                    {complete}
                  </span>{" "}
                  / 100 complete
                </p>
              </div>
              <progress
                className="sr-only"
                value={complete}
                max={100}
                aria-label="Completed PAO numbers"
              />
              <div className="pouf-progress" aria-hidden="true">
                <div
                  className="pouf-progress__fill transition-transform duration-300 motion-reduce:transition-none"
                  style={{ transform: `scaleX(${complete / 100})` }}
                />
              </div>
              <Text size="sm" muted>
                Complete all three fields for a number. Your entries are saved
                in this browser.
              </Text>
            </div>
          </Card>

          {loadError ? (
            <Card variant="tight">
              <div
                role="alert"
                className="flex flex-wrap items-center justify-between gap-3"
              >
                <Text>
                  Could not load your entries. Check your browser storage and
                  try again.
                </Text>
                <Button size="sm" onClick={loadEntries}>
                  Try again
                </Button>
              </div>
            </Card>
          ) : !ready ? (
            <Text muted>Loading your entries...</Text>
          ) : (
            <>
              {Object.keys(pending).length > 0 && (
                <Card variant="tight">
                  <div
                    role="alert"
                    className="flex flex-wrap items-center justify-between gap-3"
                  >
                    <Text>
                      Some changes could not be saved. Keep this page open and
                      try again.
                    </Text>
                    <Button size="sm" onClick={retrySaving}>
                      Retry saving
                    </Button>
                  </div>
                </Card>
              )}

              <Card variant="tight">
                <Stack gap={4}>
                  <div className="flex flex-wrap items-end gap-4">
                    <div className="min-w-[200px] flex-1">
                      <label
                        htmlFor="pao-search"
                        className="mb-2 block font-black"
                      >
                        Search all numbers
                      </label>
                      <input
                        id="pao-search"
                        type="search"
                        value={query}
                        onChange={(event) => setQuery(event.target.value)}
                        placeholder="Number, person, action, or object"
                        className="rounded-control bg-bg text-ink cushion-field focus:cushion-field-focus w-full px-4 py-3 outline-none"
                      />
                    </div>
                    <label className="flex min-h-12 cursor-pointer items-center gap-2 font-bold">
                      <input
                        type="checkbox"
                        checked={incompleteOnly}
                        onChange={(event) =>
                          setIncompleteOnly(event.target.checked)
                        }
                        className="size-4 accent-[var(--purple)]"
                      />
                      Incomplete only
                    </label>
                  </div>

                  {!search && (
                    <div
                      className="flex flex-wrap gap-2"
                      aria-label="Number ranges"
                    >
                      {Array.from({ length: 10 }, (_, index) => (
                        <Button
                          key={index}
                          size="sm"
                          variant={group === index ? "solid" : "quiet"}
                          aria-pressed={group === index}
                          onClick={() => setGroup(index)}
                        >
                          {numbers[index * 10]}–{numbers[index * 10 + 9]}
                        </Button>
                      ))}
                    </div>
                  )}

                  <div className="flex items-center justify-between gap-3">
                    <h2 className="text-lg font-black">
                      {search
                        ? "Search results"
                        : `${numbers[group * 10]}–${numbers[group * 10 + 9]}`}
                    </h2>
                    <Text size="sm" muted>
                      {visibleNumbers.length}{" "}
                      {visibleNumbers.length === 1 ? "number" : "numbers"}
                    </Text>
                  </div>

                  {visibleNumbers.length === 0 ? (
                    <Text muted>
                      {search
                        ? "No matching numbers. Try another search or filter."
                        : "No incomplete numbers in this range."}
                    </Text>
                  ) : (
                    <div className="flex flex-col gap-3">
                      <div
                        aria-hidden="true"
                        className="text-muted hidden gap-2 pl-[64px] text-sm font-black sm:grid sm:grid-cols-3"
                      >
                        <span>Person</span>
                        <span>Action</span>
                        <span>Object</span>
                      </div>
                      {visibleNumbers.map((number) => (
                        <div
                          key={number}
                          className="rounded-control bg-bg flex items-start gap-3 p-3"
                          onFocus={() => setFocusedNumber(number)}
                          onBlur={(event) => {
                            if (
                              !event.currentTarget.contains(event.relatedTarget)
                            )
                              setFocusedNumber(null);
                          }}
                        >
                          <span className="w-10 shrink-0 pt-2 text-lg font-black tabular-nums">
                            {number}
                          </span>
                          <div className="grid min-w-0 flex-1 grid-cols-1 gap-2 sm:grid-cols-3">
                            {fields.map((field) => (
                              <label key={field} className="min-w-0">
                                <span className="text-muted mb-1 block text-sm font-black capitalize sm:sr-only">
                                  {field} for {number}
                                </span>
                                <input
                                  type="text"
                                  value={(entries[number] || emptyEntry)[field]}
                                  onChange={(event) =>
                                    updateEntry(
                                      number,
                                      field,
                                      event.target.value,
                                    )
                                  }
                                  placeholder={
                                    field[0].toUpperCase() + field.slice(1)
                                  }
                                  autoComplete="off"
                                  dir="auto"
                                  className="rounded-control bg-surface text-ink cushion-field focus:cushion-field-focus w-full px-3 py-2 outline-none"
                                />
                              </label>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </Stack>
              </Card>
            </>
          )}
        </Stack>
      </div>
    </main>
  );
}
