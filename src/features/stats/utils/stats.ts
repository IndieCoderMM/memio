export type GameSummary = {
  type: SessionRecord["type"];
  label: string;
  totalSessions: number;
  weightedAccuracy: number | null;
};

export type WeeklyActivityDay = {
  date: string;
  label: string;
  sessions: number;
};

export type Achievement = {
  id: "perfect-score" | "speed-demon" | "consistency-pro";
  name: string;
  description: string;
};

export type SessionStats = {
  totalSessions: number;
  weightedAccuracy: number | null;
  fastestRecall: {
    recallMs: number;
    type: SessionRecord["type"];
    label: string;
  } | null;
  currentStreak: number;
  games: GameSummary[];
  weeklyActivity: WeeklyActivityDay[];
  achievements: Achievement[];
};

export const games: Pick<GameSummary, "type" | "label">[] = [
  { type: "number", label: "Numbers" },
  { type: "binary", label: "Binary" },
  { type: "cards", label: "Cards" },
  { type: "chessboard", label: "Chessboard" },
];

function localDateKey(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function getPracticeDates(records: SessionRecord[]) {
  return new Set(
    records.map((record) => localDateKey(new Date(record.timestamp))),
  );
}

function getCurrentStreak(practiceDates: Set<string>, now: Date) {
  const date = new Date(now);
  date.setHours(0, 0, 0, 0);

  if (!practiceDates.has(localDateKey(date))) date.setDate(date.getDate() - 1);

  let streak = 0;
  while (practiceDates.has(localDateKey(date))) {
    streak += 1;
    date.setDate(date.getDate() - 1);
  }
  return streak;
}

function hasSevenDayRun(practiceDates: Set<string>) {
  const dates = [...practiceDates].sort();
  let run = 0;
  let previous: Date | null = null;

  for (const key of dates) {
    const [year, month, day] = key.split("-").map(Number);
    const date = new Date(year, month - 1, day);
    if (previous) {
      const next = new Date(previous);
      next.setDate(next.getDate() + 1);
      run = localDateKey(next) === key ? run + 1 : 1;
    } else {
      run = 1;
    }
    if (run >= 7) return true;
    previous = date;
  }
  return false;
}

function weightedAccuracy(records: SessionRecord[]) {
  const totalItems = records.reduce((sum, record) => sum + record.total, 0);
  if (totalItems <= 0) return null;

  const correctItems = records.reduce(
    (sum, record) => sum + record.total * record.accuracy,
    0,
  );
  return correctItems / totalItems;
}

function getWeeklyActivity(records: SessionRecord[], now: Date) {
  const weekStart = new Date(now);
  weekStart.setHours(0, 0, 0, 0);
  weekStart.setDate(weekStart.getDate() - ((weekStart.getDay() + 6) % 7));

  const sessionsByDate = new Map<string, number>();
  for (const record of records) {
    const date = new Date(record.timestamp);
    const key = localDateKey(date);
    sessionsByDate.set(key, (sessionsByDate.get(key) ?? 0) + 1);
  }

  return Array.from({ length: 7 }, (_, index) => {
    const date = new Date(weekStart);
    date.setDate(weekStart.getDate() + index);
    const key = localDateKey(date);
    return {
      date: key,
      label: date.toLocaleDateString(undefined, { weekday: "short" }),
      sessions: sessionsByDate.get(key) ?? 0,
    };
  });
}

function getAchievements(records: SessionRecord[], practiceDates: Set<string>) {
  const achievements: Achievement[] = [];

  if (records.some((record) => record.accuracy === 1)) {
    achievements.push({
      id: "perfect-score",
      name: "Perfect Score",
      description: "Complete a session with 100% accuracy.",
    });
  }

  const previousBest = new Map<SessionRecord["type"], number>();
  const earnedSpeedDemon = records.some((record) => {
    const best = previousBest.get(record.type);

    if (record.recall_ms > 0 && best !== undefined && record.recall_ms < best) {
      return true;
    }
    if (record.recall_ms > 0 && (best === undefined || record.recall_ms < best)) {
      previousBest.set(record.type, record.recall_ms);
    }
    return false;
  });

  if (earnedSpeedDemon) {
    achievements.push({
      id: "speed-demon",
      name: "Speed Demon",
      description: "Beat a previous positive recall time in the same game.",
    });
  }

  if (hasSevenDayRun(practiceDates)) {
    achievements.push({
      id: "consistency-pro",
      name: "Consistency Pro",
      description: "Practice on seven consecutive days.",
    });
  }

  return achievements;
}

export function calculateSessionStats(
  records: SessionRecord[],
  now = new Date(),
): SessionStats {
  const chronologicalRecords = [...records].sort(
    (left, right) => left.timestamp - right.timestamp,
  );
  const practiceDates = getPracticeDates(chronologicalRecords);
  const fastestRecord = chronologicalRecords.reduce<SessionRecord | null>(
    (fastest, record) =>
      record.recall_ms > 0 &&
      (fastest === null || record.recall_ms < fastest.recall_ms)
        ? record
        : fastest,
    null,
  );

  const gameSummaries = games.map(({ type, label }) => {
    const gameRecords = chronologicalRecords.filter(
      (record) => record.type === type,
    );
    return {
      type,
      label,
      totalSessions: gameRecords.length,
      weightedAccuracy: weightedAccuracy(gameRecords),
    };
  });

  return {
    totalSessions: chronologicalRecords.length,
    weightedAccuracy: weightedAccuracy(chronologicalRecords),
    fastestRecall: fastestRecord
      ? {
          recallMs: fastestRecord.recall_ms,
          type: fastestRecord.type,
          label: games.find((game) => game.type === fastestRecord.type)!.label,
        }
      : null,
    currentStreak: getCurrentStreak(practiceDates, now),
    games: gameSummaries,
    weeklyActivity: getWeeklyActivity(chronologicalRecords, now),
    achievements: getAchievements(chronologicalRecords, practiceDates),
  };
}

export function formatRecallTime(recallMs: number) {
  if (recallMs < 1000) return `${Math.round(recallMs)}ms`;
  const seconds = Math.floor(recallMs / 1000);
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  if (minutes > 0) return `${minutes}:${String(remainingSeconds).padStart(2, "0")}`;
  return `${(recallMs / 1000).toFixed(1)}s`;
}
