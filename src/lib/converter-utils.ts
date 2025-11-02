// Converter utility functions
export function createLinearConverter(
  conversionFactors: Record<string, number>
) {
  return (value: string, fromUnit: string, toUnit: string) => {
    const numValue = Number.parseFloat(value);
    if (isNaN(numValue)) return "0";

    const inBaseUnit = numValue * conversionFactors[fromUnit];
    const result = inBaseUnit / conversionFactors[toUnit];

    return result.toFixed(2);
  };
}

export function temperatureConvert(
  value: string,
  fromUnit: string,
  toUnit: string
) {
  const numValue = Number.parseFloat(value);
  if (isNaN(numValue)) return "0";

  if (fromUnit === "f" && toUnit === "c") {
    return (((numValue - 32) * 5) / 9).toFixed(1);
  } else if (fromUnit === "c" && toUnit === "f") {
    return ((numValue * 9) / 5 + 32).toFixed(1);
  } else {
    return numValue.toFixed(1);
  }
}
