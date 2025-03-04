"use client";

import { useCallback, useMemo } from "react";
import { Delete } from "lucide-react";
import { cn } from "@/lib/utils";

interface CalculatorProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  className?: string;
}

export function Calculator({
  value,
  onChange,
  disabled = false,
  className,
}: CalculatorProps) {
  const appendDigit = useCallback(
    (digit: string) => {
      if (value === "0") {
        onChange(digit);
      } else {
        onChange(value + digit);
      }
    },
    [value, onChange]
  );

  const handleDecimal = useCallback(() => {
    if (!value.includes(".")) {
      onChange(value + ".");
    }
  }, [value, onChange]);

  const handleDelete = useCallback(() => {
    if (value.length > 1) {
      onChange(value.slice(0, -1));
    } else {
      onChange("");
    }
  }, [value, onChange]);

  const handleClear = useCallback(() => {
    onChange("");
  }, [onChange]);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;

      // Allow empty values
      if (newValue === "") {
        onChange("");
        return;
      }

      // Handle decimal point alone
      if (newValue === ".") {
        onChange("0.");
        return;
      }

      // Validate: allow only numbers and one decimal point
      if (/^-?\d*\.?\d*$/.test(newValue)) {
        // Handle leading zeros
        if (newValue.includes(".")) {
          // Has decimal - keep one leading zero before decimal if needed
          const [intPart, decPart] = newValue.split(".");
          const formattedInt =
            intPart === ""
              ? "0"
              : intPart === "0"
              ? "0"
              : intPart.replace(/^0+/, "");
          onChange(`${formattedInt}.${decPart}`);
        } else {
          // No decimal - remove all leading zeros except if the number is just "0"
          onChange(newValue === "0" ? "0" : newValue.replace(/^0+/, ""));
        }
      }
    },
    [onChange]
  );

  // Memoize number buttons to avoid recreating the array on each render
  const numberButtons = useMemo(() => {
    return [7, 8, 9, 4, 5, 6, 1, 2, 3].map((num) => (
      <button
        key={num}
        onClick={() => appendDigit(num.toString())}
        className="inline-flex h-12 items-center justify-center rounded-md bg-secondary text-secondary-foreground hover:bg-secondary/80 disabled:opacity-50 disabled:pointer-events-none"
        disabled={disabled}
      >
        {num}
      </button>
    ));
  }, [appendDigit, disabled]);

  return (
    <div className={cn("grid gap-2", className)}>
      <input
        type="text"
        value={value}
        onChange={handleInputChange}
        className="flex h-12 items-center justify-center rounded-md border border-input bg-background px-3 py-2 text-lg text-center"
        disabled={disabled}
      />
      <div className="grid grid-cols-3 gap-1.5">
        {numberButtons}
        <button
          onClick={handleDelete}
          className="inline-flex h-12 items-center justify-center rounded-md bg-secondary text-secondary-foreground hover:bg-secondary/80 disabled:opacity-50 disabled:pointer-events-none"
          disabled={disabled}
        >
          <Delete className="h-4 w-4" />
        </button>
        <button
          onClick={() => appendDigit("0")}
          className="inline-flex h-12 items-center justify-center rounded-md bg-secondary text-secondary-foreground hover:bg-secondary/80 disabled:opacity-50 disabled:pointer-events-none"
          disabled={disabled}
        >
          0
        </button>
        <button
          onClick={handleDecimal}
          className="inline-flex h-12 items-center justify-center rounded-md bg-secondary text-secondary-foreground hover:bg-secondary/80 disabled:opacity-50 disabled:pointer-events-none"
          disabled={disabled}
        >
          .
        </button>
      </div>
      <button
        onClick={handleClear}
        className="inline-flex h-12 items-center justify-center rounded-md bg-destructive text-destructive-foreground hover:bg-destructive/90 disabled:opacity-50 disabled:pointer-events-none"
        disabled={disabled}
      >
        Clear
      </button>
    </div>
  );
}
