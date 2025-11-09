"use client";

import { useState, useCallback } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { UnitSelector } from "./unit-selector";
import { ConversionDisplay } from "./conversion-display";
import { QuantityInput } from "./quantity-input";
import type { ConverterConfig } from "@/types";

interface BaseConverterProps {
  config: ConverterConfig;
}

export function BaseConverter({ config }: BaseConverterProps) {
  const [value, setValue] = useState("1");
  const [fromUnit, setFromUnit] = useState<string | null>(
    config.defaultFromUnit
  );
  const [toUnit, setToUnit] = useState<string | null>(config.defaultToUnit);

  const handleValueChange = useCallback((newValue: string) => {
    setValue(newValue);
  }, []);

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

  const handleClear = useCallback(() => {
    setFromUnit(null);
    setToUnit(null);
    setValue("1");
  }, []);

  const handleSwap = useCallback(() => {
    if (fromUnit && toUnit) {
      setFromUnit(toUnit);
      setToUnit(fromUnit);
    }
  }, [fromUnit, toUnit]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>{config.title}</CardTitle>
        <CardDescription>{config.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <QuantityInput value={value} onChange={handleValueChange} />
        <ConversionDisplay
          value={value}
          fromUnit={fromUnit}
          toUnit={toUnit}
          calculate={config.calculate}
          onValueChange={setValue}
        />
        <UnitSelector
          options={config.options}
          fromUnit={fromUnit}
          toUnit={toUnit}
          onUnitSelect={handleUnitSelect}
          onClear={handleClear}
          onSwap={handleSwap}
        />
      </CardContent>
    </Card>
  );
}
