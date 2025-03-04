"use client";

import { useMemo } from "react";
import { cn } from "@/lib/utils";

interface UnitSelectorProps {
  options: { value: string; label: string }[];
  fromUnit: string | null;
  toUnit: string | null;
  onUnitSelect: (value: string) => void;
  onClear: () => void;
}

export function UnitSelector({
  options,
  fromUnit,
  toUnit,
  onUnitSelect,
  onClear,
}: UnitSelectorProps) {
  // Memoize the unit buttons to prevent unnecessary re-renders
  const unitButtons = useMemo(() => {
    return options.map((option) => (
      <button
        key={option.value}
        onClick={() => onUnitSelect(option.value)}
        className={cn(
          "inline-flex h-12 items-center justify-center rounded-md transition-colors hover:bg-secondary/80",
          option.value === fromUnit
            ? "bg-blue-600 dark:bg-blue-800 text-white hover:bg-blue-700 dark:hover:bg-blue-900"
            : option.value === toUnit
            ? "bg-orange-500 dark:bg-orange-700 text-white hover:bg-orange-600 dark:hover:bg-orange-800"
            : "bg-secondary text-secondary-foreground"
        )}
      >
        {option.label}
      </button>
    ));
  }, [options, fromUnit, toUnit, onUnitSelect]);

  return (
    <div>
      <div className="grid grid-cols-4 gap-1.5">{unitButtons}</div>
      <div className="mt-2 flex justify-end">
        <button
          onClick={onClear}
          className="text-sm text-muted-foreground hover:text-foreground"
        >
          Clear selection
        </button>
      </div>
    </div>
  );
}
