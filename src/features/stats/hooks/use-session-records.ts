"use client";

import { getSavedRecords } from "@/features/core/utils/record-storage";
import { useEffect, useState } from "react";

type SessionRecordsState = {
  records: SessionRecord[];
  isLoading: boolean;
  error: string | null;
};

export function useSessionRecords(): SessionRecordsState {
  const [state, setState] = useState<SessionRecordsState>({
    records: [],
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    let cancelled = false;

    getSavedRecords()
      .then((savedRecords) => {
        if (cancelled) return;
        setState({ records: Object.values(savedRecords), isLoading: false, error: null });
      })
      .catch(() => {
        if (cancelled) return;
        setState({
          records: [],
          isLoading: false,
          error: "Saved sessions could not be loaded.",
        });
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return state;
}
