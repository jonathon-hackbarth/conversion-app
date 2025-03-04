"use client";

import { Moon, Sun, SunMoon } from "lucide-react";
import { useTheme } from "./theme-provider";
import { useEffect, useState, useCallback, useMemo } from "react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [systemTheme, setSystemTheme] = useState<"dark" | "light">("light");

  // Detect system theme on mount
  useEffect(() => {
    const isDarkMode = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    setSystemTheme(isDarkMode ? "dark" : "light");

    // Add listener for system theme changes
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e: MediaQueryListEvent) => {
      setSystemTheme(e.matches ? "dark" : "light");
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  const handleThemeToggle = () => {
    // If system, switch to specific theme; otherwise toggle
    const nextTheme =
      theme === "system"
        ? systemTheme === "dark"
          ? "light"
          : "dark"
        : theme === "dark"
        ? "light"
        : "dark";

    setTheme(nextTheme);
  };

  // Memoize the icon to prevent unnecessary re-renders
  const themeIcon = useMemo(() => {
    if (theme === "dark") {
      return <Moon className="h-5 w-5" />;
    } else if (theme === "light") {
      return <Sun className="h-5 w-5" />;
    } else {
      return <SunMoon className="h-5 w-5" />;
    }
  }, [theme]);

  return (
    <button
      onClick={handleThemeToggle}
      className="rounded-md bg-secondary p-2 text-secondary-foreground hover:bg-secondary/80"
      title={`Current theme: ${theme}`}
    >
      {themeIcon}
      <span className="sr-only">Toggle theme (current: {theme})</span>
    </button>
  );
}
