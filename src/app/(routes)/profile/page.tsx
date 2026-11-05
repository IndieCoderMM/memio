"use client";

import { useAppStore } from "@/lib/app-store";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import DarkModeToggle from "@/components/ui/dark-mode-toggle";

export default function Profile() {
  const displayName = useAppStore((state) => state.displayName);
  const setDisplayName = useAppStore((state) => state.setDisplayName);

  return (
    <div className="bg-background relative min-h-screen">
      <main className="mx-auto max-w-3xl px-6 py-12">
        <header className="mb-8">
          <h1 className="text-foreground mb-2 text-4xl font-bold">Profile</h1>
          <p className="text-muted-foreground">
            Your preferences are saved in this browser.
          </p>
        </header>

        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle>Preferences</CardTitle>
            <CardDescription>
              Personalize your Memio experience.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label
                htmlFor="display-name"
                className="text-foreground text-sm font-semibold"
              >
                Display name
              </label>
              <input
                id="display-name"
                type="text"
                value={displayName}
                onChange={(event) => setDisplayName(event.target.value)}
                placeholder="Your name"
                className="bg-input border-border text-foreground placeholder-muted-foreground focus:ring-primary w-full rounded border px-3 py-2 focus:ring-2 focus:outline-none"
              />
            </div>

            <DarkModeToggle />
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
