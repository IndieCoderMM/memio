"use client";

import Button from "@/components/blocks/button";
import { Card } from "@/components/pouf/surface";
import { Row, Stack } from "@/components/pouf/layout";
import { Text } from "@/components/pouf/text";
import { useAppStore } from "@/lib/app-store";
import { MoonIcon, SunIcon } from "lucide-react";

export default function DarkModeToggle() {
  const isDarkMode = useAppStore((state) => state.isDarkMode);
  const toggleDarkMode = useAppStore((state) => state.toggleDarkMode);

  return (
    <Card variant="tight">
      <Row justify="between" gap={3}>
        <Stack gap={1}>
          <Text>Color theme</Text>
          <Text size="sm" muted>
            {isDarkMode ? "Dark theme is on" : "Light theme is on"}
          </Text>
        </Stack>
        <Button
          type="button"
          size="sm"
          variant={isDarkMode ? "primary" : "secondary"}
          onClick={toggleDarkMode}
          aria-pressed={isDarkMode}
          aria-label={`Switch to ${isDarkMode ? "light" : "dark"} theme`}
        >
          {isDarkMode ? <MoonIcon aria-hidden="true" size={16} /> : <SunIcon aria-hidden="true" size={16} />}
          {isDarkMode ? "Dark" : "Light"}
        </Button>
      </Row>
    </Card>
  );
}
