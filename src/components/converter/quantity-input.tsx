"use client";

import { useCallback } from "react";
import { MinusIcon, PlusIcon } from "lucide-react";

interface QuantityInputProps {
  value: string;
  onChange: (value: string) => void;
}

export function QuantityInput({ value, onChange }: QuantityInputProps) {
  // Convert string value to number for calculations
  const numValue = parseFloat(value) || 0;

  const setValue = useCallback(
    (newValue: number) => {
      // Ensure non-negative values
      const result = Math.max(0, newValue);
      // Format as string with no trailing zeros
      onChange(Number(result.toFixed(4)).toString());
    },
    [onChange]
  );

  const adjustValue = useCallback(
    (amount: number) => {
      setValue(numValue + amount);
    },
    [numValue, setValue]
  );

  const presetValues = [0.25, 0.33, 0.5, 0.75, 1, 2, 3, 4];

  return (
    <div className="space-y-3">
      {/* Large input field with increment/decrement */}
      <div className="flex items-center justify-center gap-2">
        <button
          onClick={() => adjustValue(-0.25)}
          className="h-12 w-12 rounded-lg bg-secondary text-secondary-foreground hover:bg-secondary/80 flex items-center justify-center text-xl font-semibold"
          aria-label="Decrease by 0.25"
        >
          <MinusIcon className="h-5 w-5" />
        </button>
        <input
          type="number"
          inputMode="decimal"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="flex h-16 w-32 rounded-lg border-2 border-input bg-background px-4 py-2 text-2xl font-semibold text-center ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        />
        <button
          onClick={() => adjustValue(0.25)}
          className="h-12 w-12 rounded-lg bg-secondary text-secondary-foreground hover:bg-secondary/80 flex items-center justify-center text-xl font-semibold"
          aria-label="Increase by 0.25"
        >
          <PlusIcon className="h-5 w-5" />
        </button>
      </div>

      {/* Quick preset buttons */}
      <div className="grid grid-cols-8 gap-1.5">
        {presetValues.map((preset) => (
          <button
            key={preset}
            onClick={() => setValue(preset)}
            className={`h-9 rounded-md text-sm font-medium transition-colors ${
              numValue === preset
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
            }`}
            aria-label={`Set value to ${preset}`}
          >
            {preset === 0.33 ? "⅓" : preset === 0.25 ? "¼" : preset === 0.5 ? "½" : preset === 0.75 ? "¾" : preset}
          </button>
        ))}
      </div>
    </div>
  );
}
