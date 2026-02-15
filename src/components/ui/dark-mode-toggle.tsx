"use client";

import { useAppStore } from "@/lib/app-store";

export default function DarkModeToggle() {
  const { isDarkMode, toggleDarkMode } = useAppStore();

  return (
    <div className="bg-muted/50 border-border flex items-center justify-between rounded border p-4">
      <div>
        <p className="text-foreground font-semibold">Dark Mode</p>
        <p className="text-muted-foreground text-sm">Always use dark theme</p>
      </div>
      <label className="relative inline-flex cursor-pointer items-center">
        <input
          type="checkbox"
          checked={isDarkMode}
          onChange={toggleDarkMode}
          className="peer sr-only"
        />
        <div className="bg-border peer-focus:ring-primary peer bg-muted after:border-border peer-checked:bg-primary h-6 w-11 rounded-full peer-focus:ring-2 peer-focus:outline-none after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:border after:bg-white after:transition-all after:content-[''] peer-checked:after:translate-x-full peer-checked:after:border-white"></div>
      </label>
    </div>
  );
}
