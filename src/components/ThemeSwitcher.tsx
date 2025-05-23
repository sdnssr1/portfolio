"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Switch } from "@/components/ui/switch";

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  // Ensure the component is mounted before rendering to avoid hydration mismatch
  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="flex items-center space-x-2">
        <Sun className="h-4 w-4 text-foreground/50" />
        <Switch disabled className="opacity-50" />
        <Moon className="h-4 w-4 text-foreground/50" />
      </div>
    );
  }

  const isDark = theme === "dark";

  return (
    <div className="flex items-center space-x-2">
      <Sun className={`h-4 w-4 ${!isDark ? 'text-foreground' : 'text-foreground/50'}`} />
      <Switch
        checked={isDark}
        onCheckedChange={() => setTheme(isDark ? "light" : "dark")}
        aria-label="Toggle dark mode"
        className="data-[state=checked]:bg-primary data-[state=unchecked]:bg-foreground/20"
      />
      <Moon className={`h-4 w-4 ${isDark ? 'text-foreground' : 'text-foreground/50'}`} />
    </div>
  );
}
