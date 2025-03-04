"use client";

import { useState, useCallback, useMemo } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Scale, Thermometer, Droplets } from "lucide-react"; // Removed Delete import
import { cn } from "@/lib/utils";
import { UnitSelector } from "@/components/unit-selector";
import { ConversionDisplay } from "@/components/conversion-display";
import { ThemeToggle } from "@/components/theme-toggle";
import { Calculator } from "@/components/calculator"; // Import the Calculator component

// Calculator component has been moved to its own file, removed from here

function Slicer({
  options,
  value,
  onChange,
  className,
}: {
  options: { value: string; label: string }[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
}) {
  // Memoize the onClick handler for each option button
  const handleOptionClick = useCallback(
    (optionValue: string) => {
      onChange(optionValue);
    },
    [onChange]
  );

  // Memoize the buttons to prevent unnecessary re-renders
  const optionButtons = useMemo(() => {
    return options.map((option) => (
      <button
        key={option.value}
        onClick={() => handleOptionClick(option.value)}
        className={cn(
          "inline-flex h-12 items-center justify-center rounded-md transition-colors",
          value === option.value
            ? "bg-primary text-primary-foreground"
            : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
        )}
      >
        {option.label}
      </button>
    ));
  }, [options, value, handleOptionClick]);

  return (
    <div
      className={cn("grid grid-cols-2 gap-1.5 content-start h-full", className)}
    >
      {optionButtons}
    </div>
  );
}

interface ConverterProps {
  fromValue: string;
  setFromValue: (value: string) => void;
  fromUnit: string;
  setFromUnit: (unit: string) => void;
  toUnit: string;
  setToUnit: (unit: string) => void;
  calculate: () => string;
  options: { value: string; label: string }[];
}

function ConverterSection({
  fromValue,
  setFromValue,
  fromUnit,
  setFromUnit,
  toUnit,
  setToUnit,
  calculate,
  options,
}: ConverterProps) {
  return (
    <div className="grid grid-cols-2 gap-4">
      {/* Left column */}
      <div className="grid content-start gap-2">
        <Label>From</Label>
        <Calculator value={fromValue} onChange={setFromValue} />
        <Slicer options={options} value={fromUnit} onChange={setFromUnit} />
      </div>

      {/* Right column */}
      <div className="grid content-start gap-2">
        <Label>To</Label>
        <div className="flex h-12 items-center justify-end rounded-md bg-muted px-3 py-2 text-lg">
          {calculate()}
        </div>
        <Slicer options={options} value={toUnit} onChange={setToUnit} />
      </div>
    </div>
  );
}

interface ConverterConfig {
  title: string;
  description: string;
  defaultFromUnit: string;
  defaultToUnit: string;
  options: { value: string; label: string }[];
  calculate: (value: string, fromUnit: string, toUnit: string) => string;
}

function BaseConverter({ config }: { config: ConverterConfig }) {
  const [value, setValue] = useState("1");
  const [fromUnit, setFromUnit] = useState<string | null>(
    config.defaultFromUnit
  );
  const [toUnit, setToUnit] = useState<string | null>(config.defaultToUnit);

  // Memoize setValue to maintain a stable reference
  const handleValueChange = useCallback((newValue: string) => {
    setValue(newValue);
  }, []);

  // Memoize unit selection handler
  const handleUnitSelect = useCallback(
    (unit: string) => {
      // Case 1: Unit is already selected as "from"
      if (unit === fromUnit) {
        setFromUnit(null);
        return;
      }

      // Case 2: Unit is already selected as "to"
      if (unit === toUnit) {
        setToUnit(null);
        return;
      }

      // Case 3: No "from" unit selected yet
      if (fromUnit === null) {
        setFromUnit(unit);
        return;
      }

      // Case 4: No "to" unit selected yet
      if (toUnit === null) {
        setToUnit(unit);
        return;
      }

      // Case 5: Both units selected, replace "to" unit
      setToUnit(unit);
    },
    [fromUnit, toUnit]
  );

  // Memoize clear handler
  const handleClear = useCallback(() => {
    setFromUnit(null);
    setToUnit(null);
    setValue("1");
  }, []);

  // Memoize the disabled state calculation
  const isCalculatorDisabled = useMemo(
    () => !fromUnit || !toUnit,
    [fromUnit, toUnit]
  );

  return (
    <Card className="min-w-[440px]">
      <CardHeader>
        <CardTitle>{config.title}</CardTitle>
        <CardDescription>{config.description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <UnitSelector
          options={config.options}
          fromUnit={fromUnit}
          toUnit={toUnit}
          onUnitSelect={handleUnitSelect}
          onClear={handleClear}
        />
        <ConversionDisplay
          fromUnit={fromUnit}
          toUnit={toUnit}
          value={value}
          calculate={config.calculate}
          onValueChange={handleValueChange}
        />
        <div className="h-px bg-border" />
        <Calculator
          value={value}
          onChange={handleValueChange}
          disabled={isCalculatorDisabled}
        />
      </CardContent>
    </Card>
  );
}

// Configuration objects for each converter type
const volumeConfig: ConverterConfig = {
  title: "Volume Converter",
  description: "Convert between common kitchen volume measurements",
  defaultFromUnit: "tsp",
  defaultToUnit: "tbsp",
  options: [
    { value: "tsp", label: "tsp" },
    { value: "tbsp", label: "tbsp" },
    { value: "cup", label: "cup" },
    { value: "floz", label: "fl oz" },
    { value: "pint", label: "pint" },
    { value: "quart", label: "qt" },
    { value: "ml", label: "ml" },
    { value: "liter", label: "L" },
  ],
  calculate: (value, fromUnit, toUnit) => {
    const toML = {
      tsp: 4.93,
      tbsp: 14.79,
      cup: 236.59,
      floz: 29.57,
      pint: 473.18,
      quart: 946.35,
      ml: 1,
      liter: 1000,
    };

    const numValue = Number.parseFloat(value);
    if (isNaN(numValue)) return "0";

    const inML = numValue * toML[fromUnit as keyof typeof toML];
    const result = inML / toML[toUnit as keyof typeof toML];

    return result.toFixed(2);
  },
};

const weightConfig: ConverterConfig = {
  title: "Weight Converter",
  description: "Convert between common kitchen weight measurements",
  defaultFromUnit: "oz",
  defaultToUnit: "lb",
  options: [
    { value: "oz", label: "oz" },
    { value: "lb", label: "lb" },
    { value: "g", label: "g" },
    { value: "kg", label: "kg" },
  ],
  calculate: (value, fromUnit, toUnit) => {
    const toGram = {
      oz: 28.35,
      lb: 453.59,
      g: 1,
      kg: 1000,
    };

    const numValue = Number.parseFloat(value);
    if (isNaN(numValue)) return "0";

    const inGrams = numValue * toGram[fromUnit as keyof typeof toGram];
    const result = inGrams / toGram[toUnit as keyof typeof toGram];

    return result.toFixed(2);
  },
};

const temperatureConfig: ConverterConfig = {
  title: "Temperature Converter",
  description: "Convert between Fahrenheit and Celsius",
  defaultFromUnit: "f",
  defaultToUnit: "c",
  options: [
    { value: "f", label: "°F" },
    { value: "c", label: "°C" },
  ],
  calculate: (value, fromUnit, toUnit) => {
    const numValue = Number.parseFloat(value);
    if (isNaN(numValue)) return "0";

    if (fromUnit === "f" && toUnit === "c") {
      return (((numValue - 32) * 5) / 9).toFixed(1);
    } else if (fromUnit === "c" && toUnit === "f") {
      return ((numValue * 9) / 5 + 32).toFixed(1);
    } else {
      return numValue.toFixed(1);
    }
  },
};

// Updated converter components
function VolumeConverter() {
  return <BaseConverter config={volumeConfig} />;
}

function WeightConverter() {
  return <BaseConverter config={weightConfig} />;
}

function TemperatureConverter() {
  return <BaseConverter config={temperatureConfig} />;
}

export default function KitchenConverter() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center p-4">
      <div className="">
        <div className="flex justify-between items-center mb-4 w-full">
          <h1 className="text-xl font-bold text-center">Kitchen Converter</h1>
          <ThemeToggle />
        </div>

        <Tabs defaultValue="volume" className="w-full max-w-md">
          <TabsList className="grid grid-cols-3 mb-4 mx-auto">
            <TabsTrigger value="volume" className="flex items-center gap-2">
              <Droplets className="h-4 w-4" />
              <span className="">Volume</span>
            </TabsTrigger>
            <TabsTrigger value="weight" className="flex items-center gap-2">
              <Scale className="h-4 w-4" />
              <span className="">Weight</span>
            </TabsTrigger>
            <TabsTrigger
              value="temperature"
              className="flex items-center gap-2"
            >
              <Thermometer className="h-4 w-4" />
              <span className="">Temperature</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="volume">
            <VolumeConverter />
          </TabsContent>
          <TabsContent value="weight">
            <WeightConverter />
          </TabsContent>
          <TabsContent value="temperature">
            <TemperatureConverter />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
