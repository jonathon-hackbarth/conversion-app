"use client";

import { useCallback } from "react";
import { RotateCcwIcon } from "lucide-react";

interface QuantityInputProps {
  value: string;
  onChange: (value: string) => void;
}

export function QuantityInput({ value, onChange }: QuantityInputProps) {
  // Convert string value to number for calculations
  const numValue = parseFloat(value) || 0;

  const adjustValue = useCallback(
    (amount: number) => {
      // Calculate new value and format to remove trailing zeros
      const result = numValue + amount;
      // Format as string with no trailing zeros
      const newValue = Number(result.toFixed(4)).toString();
      onChange(newValue);
    },
    [numValue, onChange]
  );

  const resetValue = useCallback(() => {
    onChange("1");
  }, [onChange]);

  return (
    <div className="flex flex-col items-center space-y-2">
      <div className="grid grid-cols-3 gap-2 w-full">
        {/* Left column - Negative values */}
        <div className="grid grid-cols-2 grid-rows-2 gap-2 h-[88px]">
          <button
            onClick={() => adjustValue(-1)}
            className="h-10 rounded-md bg-secondary text-secondary-foreground hover:bg-secondary/80"
            aria-label="Subtract 1"
          >
            -1
          </button>
          <button
            onClick={() => adjustValue(-0.5)}
            className="h-10 rounded-md bg-secondary text-secondary-foreground hover:bg-secondary/80"
            aria-label="Subtract one half"
          >
            -½
          </button>
          <button
            onClick={() => adjustValue(-0.25)}
            className="h-10 rounded-md bg-secondary text-secondary-foreground hover:bg-secondary/80"
            aria-label="Subtract one fourth"
          >
            -¼
          </button>
          <button
            onClick={() => adjustValue(-0.33333)}
            className="h-10 rounded-md bg-secondary text-secondary-foreground hover:bg-secondary/80"
            aria-label="Subtract one third"
          >
            -⅓
          </button>
        </div>

        {/* Middle column - Input and Reset */}
        <div className="flex flex-col items-center space-y-2 h-[88px]">
          <input
            type="number"
            inputMode="decimal"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="flex h-10 w-24 rounded-md border border-input bg-background px-3 py-2 text-sm text-center ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          />
          <button
            onClick={resetValue}
            className="h-10 w-24 flex items-center justify-center rounded-md bg-secondary text-secondary-foreground hover:bg-secondary/80"
            aria-label="Reset to default"
          >
            <RotateCcwIcon className="h-4 w-4 mr-1" />
            Reset
          </button>
        </div>

        {/* Right column - Positive values */}
        <div className="grid grid-cols-2 grid-rows-2 gap-2 h-[88px]">
          <button
            onClick={() => adjustValue(1)}
            className="h-10 rounded-md bg-secondary text-secondary-foreground hover:bg-secondary/80"
            aria-label="Add 1"
          >
            +1
          </button>
          <button
            onClick={() => adjustValue(0.5)}
            className="h-10 rounded-md bg-secondary text-secondary-foreground hover:bg-secondary/80"
            aria-label="Add one half"
          >
            +½
          </button>
          <button
            onClick={() => adjustValue(0.25)}
            className="h-10 rounded-md bg-secondary text-secondary-foreground hover:bg-secondary/80"
            aria-label="Add one fourth"
          >
            +¼
          </button>
          <button
            onClick={() => adjustValue(0.33333)}
            className="h-10 rounded-md bg-secondary text-secondary-foreground hover:bg-secondary/80"
            aria-label="Add one third"
          >
            +⅓
          </button>
        </div>
      </div>
    </div>
  );
}
