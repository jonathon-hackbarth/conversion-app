"use client";

import { useMemo } from "react";
import { ArrowLeftRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface UnitSelectorProps {
  options: { value: string; label: string }[];
  fromUnit: string | null;
  toUnit: string | null;
  onUnitSelect: (value: string) => void;
  onClear: () => void;
  onSwap?: () => void;
}

export function UnitSelector({
  options,
  fromUnit,
  toUnit,
  onUnitSelect,
  onClear,
  onSwap,
}: UnitSelectorProps) {
  const unitButtons = useMemo(() => {
    return options.map((option) => {
      const isFrom = option.value === fromUnit;
      const isTo = option.value === toUnit;
      
      return (
        <button
          key={option.value}
          onClick={() => onUnitSelect(option.value)}
          className={cn(
            "relative h-14 flex flex-col items-center justify-center rounded-lg transition-all font-medium",
            isFrom
              ? "bg-blue-600 dark:bg-blue-700 text-white hover:bg-blue-700 dark:hover:bg-blue-800 ring-2 ring-blue-400"
              : isTo
              ? "bg-orange-500 dark:bg-orange-600 text-white hover:bg-orange-600 dark:hover:bg-orange-700 ring-2 ring-orange-400"
              : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
          )}
        >
          {(isFrom || isTo) && (
            <span className="text-[10px] font-semibold mb-0.5">
              {isFrom ? "FROM" : "TO"}
            </span>
          )}
          <span className={cn(isFrom || isTo ? "text-base" : "text-sm")}>
            {option.label}
          </span>
        </button>
      );
    });
  }, [options, fromUnit, toUnit, onUnitSelect]);

  return (
    <div className="space-y-2">
      <div className="grid grid-cols-4 gap-2">{unitButtons}</div>
      <div className="flex justify-between items-center">
        {fromUnit && toUnit && onSwap && (
          <button
            onClick={onSwap}
            className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
            aria-label="Swap units"
          >
            <ArrowLeftRight className="h-4 w-4" />
            Swap
          </button>
        )}
        <button
          onClick={onClear}
          className="ml-auto text-sm text-muted-foreground hover:text-foreground"
        >
          Clear
        </button>
      </div>
    </div>
  );
}
