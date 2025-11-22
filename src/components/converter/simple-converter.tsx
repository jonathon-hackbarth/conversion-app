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

// Group units by category for organized display
const unitsByCategory = {
  volume: ["tsp", "tbsp", "cup", "floz", "ml", "l"] as UnitKey[],
  weight: ["oz", "lb", "g", "kg"] as UnitKey[],
  temperature: ["f", "c"] as UnitKey[],
};

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
  // For small numbers, use 3 decimal places
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
  const [value, setValue] = useState("1");
  const [selectedCategory, setSelectedCategory] = useState<keyof typeof unitsByCategory | null>(null);
  const [fromUnit, setFromUnit] = useState<UnitKey | null>(null);
  const [toUnit, setToUnit] = useState<UnitKey | null>(null);
  
  const numValue = parseFloat(value) || 0;
  
  const result = useMemo(() => {
    if (!fromUnit || !toUnit || numValue === 0) {
      return null;
    }
    
    const converted = convertValue(numValue, fromUnit, toUnit);
    return formatResult(converted);
  }, [numValue, fromUnit, toUnit]);
  
  // Get available target units based on source unit category
  const availableToUnits = useMemo(() => {
    if (!fromUnit) return [];
    
    const category = allUnits[fromUnit].category as keyof typeof unitsByCategory;
    return unitsByCategory[category].filter(unit => unit !== fromUnit);
  }, [fromUnit]);
  
  const handleValueChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  }, []);
  
  const handleCategorySelect = useCallback((category: keyof typeof unitsByCategory) => {
    setSelectedCategory(category);
    setFromUnit(null);
    setToUnit(null);
  }, []);
  
  const handleUnitSelect = useCallback((unit: UnitKey) => {
    setFromUnit(unit);
    setToUnit(null);
  }, []);
  
  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      {/* Step 1: Enter value */}
      <div className="space-y-2">
        <label htmlFor="value-input" className="block text-sm font-medium text-muted-foreground">
          1. Enter amount
        </label>
        <input
          id="value-input"
          type="number"
          inputMode="decimal"
          value={value}
          onChange={handleValueChange}
          placeholder="e.g., 12, 100, 2.5"
          className="w-full h-16 px-6 text-2xl font-semibold rounded-lg border-2 border-input bg-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          autoFocus
        />
      </div>
      
      {/* Step 2: Select category */}
      {!selectedCategory && (
        <div className="space-y-2">
          <label className="block text-sm font-medium text-muted-foreground">
            2. What type of unit?
          </label>
          <div className="grid grid-cols-3 gap-3">
            <button
              onClick={() => handleCategorySelect("volume")}
              className="h-16 rounded-lg text-lg font-semibold bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-all"
            >
              Volume
            </button>
            <button
              onClick={() => handleCategorySelect("weight")}
              className="h-16 rounded-lg text-lg font-semibold bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-all"
            >
              Weight
            </button>
            <button
              onClick={() => handleCategorySelect("temperature")}
              className="h-16 rounded-lg text-lg font-semibold bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-all"
            >
              Temperature
            </button>
          </div>
        </div>
      )}
      
      {/* Step 2b: Select specific unit from category */}
      {selectedCategory && !fromUnit && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="block text-sm font-medium text-muted-foreground">
              2. Select {selectedCategory} unit
            </label>
            <button
              onClick={() => setSelectedCategory(null)}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              ← Back
            </button>
          </div>
          <div className={`grid gap-2 ${
            selectedCategory === "temperature" ? "grid-cols-2" : 
            selectedCategory === "weight" ? "grid-cols-4" : "grid-cols-6"
          }`}>
            {unitsByCategory[selectedCategory].map((unit) => (
              <button
                key={unit}
                onClick={() => handleUnitSelect(unit)}
                className="h-14 rounded-lg text-base font-semibold bg-blue-600 dark:bg-blue-700 text-white hover:bg-blue-700 dark:hover:bg-blue-800 transition-all"
              >
                {allUnits[unit].label}
              </button>
            ))}
          </div>
        </div>
      )}
      
      {/* Step 3: Select to unit (only show if from unit is selected) */}
      {fromUnit && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="block text-sm font-medium text-muted-foreground">
              3. Convert to:
            </label>
            <button
              onClick={() => {
                setFromUnit(null);
                setToUnit(null);
              }}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              ← Back
            </button>
          </div>
          <div className={`grid gap-2 ${
            availableToUnits.length <= 2 ? "grid-cols-1" :
            availableToUnits.length <= 3 ? "grid-cols-3" : "grid-cols-4"
          }`}>
            {availableToUnits.map((unit) => (
              <button
                key={unit}
                onClick={() => setToUnit(unit)}
                className={`h-14 rounded-lg text-base font-semibold transition-all ${
                  toUnit === unit
                    ? "bg-orange-500 dark:bg-orange-600 text-white hover:bg-orange-600 dark:hover:bg-orange-700 ring-2 ring-orange-400"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                }`}
              >
                {allUnits[unit].label}
              </button>
            ))}
          </div>
        </div>
      )}
      
      {/* Result display */}
      {result && fromUnit && toUnit && (
        <div className="bg-gradient-to-r from-blue-50 to-orange-50 dark:from-blue-950/30 dark:to-orange-950/30 rounded-lg p-6 border-2 border-muted">
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-bold text-blue-600 dark:text-blue-400">
                {value}
              </span>
              <span className="text-xl font-medium text-blue-600/70 dark:text-blue-400/70">
                {allUnits[fromUnit].label}
              </span>
            </div>
            <ArrowRight className="h-8 w-8 text-muted-foreground" />
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-bold text-orange-600 dark:text-orange-400">
                {result}
              </span>
              <span className="text-xl font-medium text-orange-600/70 dark:text-orange-400/70">
                {allUnits[toUnit].label}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
