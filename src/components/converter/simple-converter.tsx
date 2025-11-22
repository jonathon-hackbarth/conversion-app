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
  const [fromUnit, setFromUnit] = useState<UnitKey | null>(null);
  const [toUnit, setToUnit] = useState<UnitKey | null>(null);
  const [inputMode, setInputMode] = useState<"slider" | "text">("slider");
  
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
  
  const handleSliderChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  }, []);
  
  const handleFromUnitSelect = useCallback((unit: UnitKey) => {
    setFromUnit(unit);
    // Reset toUnit if it's from a different category
    if (toUnit && allUnits[toUnit].category !== allUnits[unit].category) {
      setToUnit(null);
    }
  }, [toUnit]);
  
  const handleToUnitSelect = useCallback((unit: UnitKey) => {
    setToUnit(unit);
  }, []);
  
  const handleClearFromUnit = useCallback(() => {
    setFromUnit(null);
    setToUnit(null);
  }, []);
  
  const handleClearToUnit = useCallback(() => {
    setToUnit(null);
  }, []);
  
  const handleReset = useCallback(() => {
    setValue("1");
    setFromUnit(null);
    setToUnit(null);
    setInputMode("slider");
  }, []);
  
  const toggleInputMode = useCallback(() => {
    setInputMode(prev => prev === "slider" ? "text" : "slider");
  }, []);
  
  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      {/* Step 1: Enter value with slider or text input */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label htmlFor="value-input" className="block text-sm font-medium text-muted-foreground">
            Enter amount
          </label>
          <div className="flex items-center gap-2">
            <button
              onClick={toggleInputMode}
              className="px-3 py-1 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors border border-muted rounded-md"
            >
              {inputMode === "slider" ? "Type number" : "Use slider"}
            </button>
            <button
              onClick={handleReset}
              className="px-3 py-1 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors border border-muted rounded-md"
            >
              Reset
            </button>
          </div>
        </div>
        
        {inputMode === "slider" ? (
          <div className="space-y-2">
            <div className="flex items-center gap-4">
              <input
                type="range"
                min="0.1"
                max="1000"
                step="0.1"
                value={value}
                onChange={handleSliderChange}
                className="flex-1 h-2 bg-secondary rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-blue-600 [&::-webkit-slider-thumb]:cursor-pointer [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-blue-600 [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:cursor-pointer"
              />
              <div className="w-24 h-16 px-4 flex items-center justify-center text-2xl font-bold rounded-lg border-2 border-input bg-background">
                {value}
              </div>
            </div>
          </div>
        ) : (
          <input
            id="value-input"
            type="number"
            inputMode="decimal"
            value={value}
            onChange={handleValueChange}
            placeholder="e.g., 12, 100, 2.5"
            className="w-full h-16 px-6 text-2xl font-semibold rounded-lg border-2 border-input bg-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          />
        )}
      </div>
      
      {/* Context bar showing current selections */}
      {(fromUnit || toUnit) && (
        <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg border border-muted">
          <div className="flex items-center gap-2 flex-1">
            <span className="text-xs font-medium text-muted-foreground uppercase">From:</span>
            {fromUnit ? (
              <button
                onClick={handleClearFromUnit}
                className="px-3 py-1.5 rounded-md bg-blue-600 dark:bg-blue-700 text-white text-sm font-semibold hover:bg-blue-700 dark:hover:bg-blue-800 transition-colors"
              >
                {allUnits[fromUnit].label} ✕
              </button>
            ) : (
              <span className="text-sm text-muted-foreground">-</span>
            )}
          </div>
          <ArrowRight className="h-4 w-4 text-muted-foreground" />
          <div className="flex items-center gap-2 flex-1">
            <span className="text-xs font-medium text-muted-foreground uppercase">To:</span>
            {toUnit ? (
              <button
                onClick={handleClearToUnit}
                className="px-3 py-1.5 rounded-md bg-orange-500 dark:bg-orange-600 text-white text-sm font-semibold hover:bg-orange-600 dark:hover:bg-orange-700 transition-colors"
              >
                {allUnits[toUnit].label} ✕
              </button>
            ) : (
              <span className="text-sm text-muted-foreground">-</span>
            )}
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
      
      {/* Step 2: Select from unit - show all units organized by category */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-muted-foreground">
          {fromUnit ? "Change from unit" : "Select from unit"}
        </label>
        <div className="space-y-3">
          {/* Volume units */}
          {(!fromUnit || allUnits[fromUnit].category === "volume") && (
            <div>
              <div className="text-xs font-medium text-muted-foreground mb-1.5 px-1">Volume</div>
              <div className="grid grid-cols-6 gap-1.5">
                {unitsByCategory.volume.map((unit) => (
                  <button
                    key={unit}
                    onClick={() => handleFromUnitSelect(unit)}
                    className={`h-10 rounded-md text-sm font-semibold transition-all ${
                      fromUnit === unit
                        ? "bg-blue-600 dark:bg-blue-700 text-white ring-2 ring-blue-400"
                        : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                    }`}
                  >
                    {allUnits[unit].label}
                  </button>
                ))}
              </div>
            </div>
          )}
          
          {/* Weight units */}
          {(!fromUnit || allUnits[fromUnit].category === "weight") && (
            <div>
              <div className="text-xs font-medium text-muted-foreground mb-1.5 px-1">Weight</div>
              <div className="grid grid-cols-4 gap-1.5">
                {unitsByCategory.weight.map((unit) => (
                  <button
                    key={unit}
                    onClick={() => handleFromUnitSelect(unit)}
                    className={`h-10 rounded-md text-sm font-semibold transition-all ${
                      fromUnit === unit
                        ? "bg-blue-600 dark:bg-blue-700 text-white ring-2 ring-blue-400"
                        : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                    }`}
                  >
                    {allUnits[unit].label}
                  </button>
                ))}
              </div>
            </div>
          )}
          
          {/* Temperature units */}
          {(!fromUnit || allUnits[fromUnit].category === "temperature") && (
            <div>
              <div className="text-xs font-medium text-muted-foreground mb-1.5 px-1">Temperature</div>
              <div className="grid grid-cols-2 gap-1.5">
                {unitsByCategory.temperature.map((unit) => (
                  <button
                    key={unit}
                    onClick={() => handleFromUnitSelect(unit)}
                    className={`h-10 rounded-md text-sm font-semibold transition-all ${
                      fromUnit === unit
                        ? "bg-blue-600 dark:bg-blue-700 text-white ring-2 ring-blue-400"
                        : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                    }`}
                  >
                    {allUnits[unit].label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Step 3: Select to unit (only show if from unit is selected) */}
      {fromUnit && availableToUnits.length > 0 && (
        <div className="space-y-2">
          <label className="block text-sm font-medium text-muted-foreground">
            {toUnit ? "Change to unit" : "Select to unit"}
          </label>
          <div className={`grid gap-1.5 ${
            availableToUnits.length <= 1 ? "grid-cols-1" :
            availableToUnits.length <= 3 ? "grid-cols-3" : 
            availableToUnits.length <= 4 ? "grid-cols-4" : "grid-cols-5"
          }`}>
            {availableToUnits.map((unit) => (
              <button
                key={unit}
                onClick={() => handleToUnitSelect(unit)}
                className={`h-12 rounded-md text-base font-semibold transition-all ${
                  toUnit === unit
                    ? "bg-orange-500 dark:bg-orange-600 text-white ring-2 ring-orange-400"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                }`}
              >
                {allUnits[unit].label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
