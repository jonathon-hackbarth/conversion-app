"use client";

import { useState, useCallback, useMemo } from "react";
import { ArrowRight } from "lucide-react";

// All supported units with their conversion factors to base unit
const allUnits = {
  // Volume (base: ml)
  tsp: { factor: 4.93, category: "volume", label: "tsp", fullName: "teaspoon" },
  tbsp: { factor: 14.79, category: "volume", label: "tbsp", fullName: "tablespoon" },
  cup: { factor: 236.59, category: "volume", label: "cup", fullName: "cups" },
  floz: { factor: 29.57, category: "volume", label: "fl oz", fullName: "fluid ounces" },
  ml: { factor: 1, category: "volume", label: "ml", fullName: "milliliters" },
  l: { factor: 1000, category: "volume", label: "L", fullName: "liters" },
  
  // Weight (base: g)
  oz: { factor: 28.35, category: "weight", label: "oz", fullName: "ounces" },
  lb: { factor: 453.59, category: "weight", label: "lb", fullName: "pounds" },
  g: { factor: 1, category: "weight", label: "g", fullName: "grams" },
  kg: { factor: 1000, category: "weight", label: "kg", fullName: "kilograms" },
  
  // Temperature (special handling)
  f: { factor: 1, category: "temperature", label: "°F", fullName: "Fahrenheit" },
  c: { factor: 1, category: "temperature", label: "°C", fullName: "Celsius" },
};

type UnitKey = keyof typeof allUnits;

// Parse input like "12 oz", "100g", "2 cups", "1.5L"
function parseInput(input: string): { value: number; unit: UnitKey | null } {
  const trimmed = input.trim().toLowerCase();
  
  // Try to match number followed by unit
  const patterns = [
    // Match number with optional space and unit
    /^([0-9]+(?:\.[0-9]+)?)\s*(tsp|tbsp|cup|cups|floz|fl\s*oz|ml|l|liter|liters|oz|lb|lbs|g|gram|grams|kg|f|°f|c|°c)$/i,
  ];
  
  for (const pattern of patterns) {
    const match = trimmed.match(pattern);
    if (match) {
      const value = parseFloat(match[1]);
      const unitStr = match[2].replace(/\s/g, "").toLowerCase();
      
      // Normalize unit names
      const unitMap: Record<string, UnitKey> = {
        tsp: "tsp",
        tbsp: "tbsp",
        cup: "cup",
        cups: "cup",
        floz: "floz",
        ml: "ml",
        l: "l",
        liter: "l",
        liters: "l",
        oz: "oz",
        lb: "lb",
        lbs: "lb",
        g: "g",
        gram: "g",
        grams: "g",
        kg: "kg",
        f: "f",
        "°f": "f",
        c: "c",
        "°c": "c",
      };
      
      const unit = unitMap[unitStr] || null;
      if (unit && !isNaN(value)) {
        return { value, unit };
      }
    }
  }
  
  return { value: 0, unit: null };
}

function convertValue(value: number, fromUnit: UnitKey, toUnit: UnitKey): number {
  const from = allUnits[fromUnit];
  const to = allUnits[toUnit];
  
  // Special handling for temperature
  if (from.category === "temperature" && to.category === "temperature") {
    if (fromUnit === "f" && toUnit === "c") {
      return ((value - 32) * 5) / 9;
    } else if (fromUnit === "c" && toUnit === "f") {
      return (value * 9) / 5 + 32;
    }
    return value;
  }
  
  // Can only convert within same category
  if (from.category !== to.category) {
    return 0;
  }
  
  // Convert to base unit, then to target unit
  const inBaseUnit = value * from.factor;
  return inBaseUnit / to.factor;
}

function formatResult(value: number): string {
  if (value === 0) return "0";
  
  // For very small numbers, use more decimal places
  if (Math.abs(value) < 0.01) {
    return value.toFixed(4);
  }
  // For small numbers, use 2 decimal places
  if (Math.abs(value) < 1) {
    return value.toFixed(3);
  }
  // For normal numbers, use 2 decimal places
  if (Math.abs(value) < 100) {
    return value.toFixed(2);
  }
  // For large numbers, use 1 decimal place
  return value.toFixed(1);
}

export function SimpleConverter() {
  const [input, setInput] = useState("");
  const [selectedTarget, setSelectedTarget] = useState<UnitKey | null>(null);
  
  const parsed = useMemo(() => parseInput(input), [input]);
  
  const result = useMemo(() => {
    if (!parsed.unit || !selectedTarget || parsed.value === 0) {
      return null;
    }
    
    const converted = convertValue(parsed.value, parsed.unit, selectedTarget);
    return formatResult(converted);
  }, [parsed, selectedTarget]);
  
  // Get suggested target units based on source unit category
  const suggestedUnits = useMemo(() => {
    if (!parsed.unit) {
      // Show all common units when no input
      return ["cup", "ml", "oz", "g", "kg", "lb", "f", "c"] as UnitKey[];
    }
    
    const category = allUnits[parsed.unit].category;
    return Object.entries(allUnits)
      .filter(([key, unit]) => unit.category === category && key !== parsed.unit)
      .map(([key]) => key as UnitKey)
      .slice(0, 8); // Limit to 8 suggestions
  }, [parsed.unit]);
  
  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  }, []);
  
  const handleTargetSelect = useCallback((unit: UnitKey) => {
    setSelectedTarget(unit);
  }, []);
  
  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      {/* Main input */}
      <div className="space-y-2">
        <label htmlFor="convert-input" className="block text-sm font-medium text-muted-foreground">
          What do you have?
        </label>
        <input
          id="convert-input"
          type="text"
          value={input}
          onChange={handleInputChange}
          placeholder="e.g., 12 oz, 100g, 2 cups, 350°F"
          className="w-full h-16 px-6 text-2xl font-semibold rounded-lg border-2 border-input bg-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          autoFocus
        />
        {parsed.unit && (
          <p className="text-sm text-muted-foreground">
            Converting {parsed.value} {allUnits[parsed.unit].fullName}
          </p>
        )}
      </div>
      
      {/* Result display */}
      {result && parsed.unit && selectedTarget && (
        <div className="bg-gradient-to-r from-blue-50 to-orange-50 dark:from-blue-950/30 dark:to-orange-950/30 rounded-lg p-6 border-2 border-muted">
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-bold text-blue-600 dark:text-blue-400">
                {parsed.value}
              </span>
              <span className="text-xl font-medium text-blue-600/70 dark:text-blue-400/70">
                {allUnits[parsed.unit].label}
              </span>
            </div>
            <ArrowRight className="h-8 w-8 text-muted-foreground" />
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-bold text-orange-600 dark:text-orange-400">
                {result}
              </span>
              <span className="text-xl font-medium text-orange-600/70 dark:text-orange-400/70">
                {allUnits[selectedTarget].label}
              </span>
            </div>
          </div>
        </div>
      )}
      
      {/* Target unit selector */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-muted-foreground">
          Convert to:
        </label>
        <div className="grid grid-cols-4 gap-2">
          {suggestedUnits.map((unit) => {
            const isSelected = unit === selectedTarget;
            const isDisabled = parsed.unit && allUnits[parsed.unit].category !== allUnits[unit].category;
            
            return (
              <button
                key={unit}
                onClick={() => handleTargetSelect(unit)}
                disabled={isDisabled}
                className={`h-16 rounded-lg text-lg font-semibold transition-all ${
                  isSelected
                    ? "bg-orange-500 dark:bg-orange-600 text-white hover:bg-orange-600 dark:hover:bg-orange-700 ring-2 ring-orange-400"
                    : isDisabled
                    ? "bg-secondary/50 text-secondary-foreground/50 cursor-not-allowed"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                }`}
              >
                {allUnits[unit].label}
              </button>
            );
          })}
        </div>
      </div>
      
      {/* Helper text */}
      <div className="text-center text-sm text-muted-foreground space-y-1">
        <p>Examples: 12 oz, 100g, 2 cups, 1.5L, 350°F</p>
        <p>Just type what you have and select what you want!</p>
      </div>
    </div>
  );
}
