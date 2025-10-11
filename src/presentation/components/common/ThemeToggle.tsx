"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

interface ThemeToggleProps {
  className?: string;
}

/**
 * Theme Toggle Component
 * Switches between light and dark mode with hydration-safe rendering
 */
export function ThemeToggle({ className = "" }: ThemeToggleProps) {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Render placeholder to avoid hydration mismatch
    return (
      <button
        className={`p-2 text-gray-600 dark:text-gray-300 transition-colors ${className}`}
        aria-label="Toggle theme"
        disabled
      >
        <span className="text-2xl">🌙</span>
      </button>
    );
  }

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className={`p-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors ${className}`}
      aria-label="Toggle theme"
    >
      {theme === "dark" ? (
        <span className="text-2xl">☀️</span>
      ) : (
        <span className="text-2xl">🌙</span>
      )}
    </button>
  );
}
