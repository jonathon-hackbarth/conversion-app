"use client";
import { useMemo } from "react";

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

  const inverseResult = useMemo(() => {
    if (!fromUnit || !toUnit) return "0";
    return calculate(value, toUnit, fromUnit);
  }, [fromUnit, toUnit, value, calculate]);

  const emptyStateJSX = useMemo(
    () => (
      <div className="h-24 flex items-center justify-center text-muted-foreground">
        Select two units to see conversion
      </div>
    ),
    []
  );

  const resultsDisplayJSX = useMemo(
    () => (
      <>
        <div className="flex items-center rounded-md overflow-hidden">
          <div className="flex-1 flex items-center justify-center bg-blue-600 dark:bg-blue-800 text-white p-1">
            <span className="text-lg font-medium">{value}</span>
            <span className="ml-2 text-lg">{fromUnit}</span>
          </div>
          <div className="flex items-center justify-center px-4 bg-muted">
            <span className="text-lg font-medium">=</span>
          </div>
          <div className="flex-1 flex items-center justify-center bg-orange-500 dark:bg-orange-700 text-white p-1">
            <span className="text-lg font-medium">{result}</span>
            <span className="ml-2 text-lg">{toUnit}</span>
          </div>
        </div>

        <div className="flex items-center rounded-md overflow-hidden">
          <div className="flex-1 flex items-center justify-center bg-orange-500 dark:bg-orange-700 text-white p-1">
            <span className="text-lg font-medium">{value}</span>
            <span className="ml-2 text-lg">{toUnit}</span>
          </div>
          <div className="flex items-center justify-center px-4 bg-muted">
            <span className="text-lg font-medium">=</span>
          </div>
          <div className="flex-1 flex items-center justify-center bg-blue-600 dark:bg-blue-800 text-white p-1">
            <span className="text-lg font-medium">{inverseResult}</span>
            <span className="ml-2 text-lg">{fromUnit}</span>
          </div>
        </div>
      </>
    ),
    [fromUnit, toUnit, value, result, inverseResult]
  );

  return (
    <div className="space-y-4">
      {fromUnit && toUnit ? resultsDisplayJSX : emptyStateJSX}
    </div>
  );
}
