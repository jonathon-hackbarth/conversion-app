"use client";

import { ThemeToggle } from "@/components/theme";

export function Header() {
  return (
    <div className="flex justify-between items-center w-full">
      <h1 className="text-xl font-bold">Kitchen Converter</h1>
      <ThemeToggle />
    </div>
  );
}
