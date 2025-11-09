"use client";
import { useMemo } from "react";
import { ArrowRight } from "lucide-react";

interface ConversionDisplayProps {
  fromUnit: string | null;
  toUnit: string | null;
  value: string;
  calculate: (value: string, from: string, to: string) => string;
  onValueChange: (value: string) => void;
}

export function ConversionDisplay({
  fromUnit,
  toUnit,
  value,
  calculate,
}: ConversionDisplayProps) {
  const result = useMemo(() => {
    if (!fromUnit || !toUnit) return "0";
    return calculate(value, fromUnit, toUnit);
  }, [fromUnit, toUnit, value, calculate]);

  const emptyStateJSX = useMemo(
    () => (
      <div className="h-20 flex items-center justify-center text-muted-foreground text-sm">
        Select FROM and TO units to see conversion
      </div>
    ),
    []
  );

  const resultsDisplayJSX = useMemo(
    () => (
      <div className="bg-gradient-to-r from-blue-50 to-orange-50 dark:from-blue-950/30 dark:to-orange-950/30 rounded-lg p-4 border-2 border-muted">
        <div className="flex items-center justify-center gap-3">
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-blue-600 dark:text-blue-400">{value}</span>
            <span className="text-lg font-medium text-blue-600/70 dark:text-blue-400/70">{fromUnit}</span>
          </div>
          <ArrowRight className="h-6 w-6 text-muted-foreground" />
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-orange-600 dark:text-orange-400">{result}</span>
            <span className="text-lg font-medium text-orange-600/70 dark:text-orange-400/70">{toUnit}</span>
          </div>
        </div>
      </div>
    ),
    [fromUnit, toUnit, value, result]
  );

  return (
    <div className="my-4">
      {fromUnit && toUnit ? resultsDisplayJSX : emptyStateJSX}
    </div>
  );
}
