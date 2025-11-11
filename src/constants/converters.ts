import type { ConverterConfig } from "@/types";
import {
  createLinearConverter,
  temperatureConvert,
} from "@/lib/converter-utils";

const volumeFactors = {
  tsp: 4.93,
  tbsp: 14.79,
  cup: 236.59,
  floz: 29.57,
  pint: 473.18,
  quart: 946.35,
  gallon: 3785.41,
  ml: 1,
  liter: 1000,
  g: 1, // Using water density: 1 ml = 1 gram
  kg: 1000, // Using water density: 1 ml = 1 gram
};

const weightFactors = {
  oz: 28.35,
  lb: 453.59,
  g: 1,
  kg: 1000,
  ton: 1000000,
};

const lengthFactors = {
  inch: 2.54,
  ft: 30.48,
  yard: 91.44,
  mile: 160934,
  mm: 0.1,
  cm: 1,
  m: 100,
  km: 100000,
};

const areaFactors = {
  sqin: 6.4516,
  sqft: 929.03,
  sqyd: 8361.27,
  acre: 4046860,
  sqmile: 25899881103.36,
  sqcm: 1,
  sqm: 10000,
  hectare: 100000000,
};

const speedFactors = {
  mph: 1.60934,
  fps: 1.09728,
  kmh: 1,
  ms: 3.6,
  knot: 1.852,
};

export const volumeConfig: ConverterConfig = {
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
    { value: "gallon", label: "gal" },
    { value: "ml", label: "ml" },
    { value: "liter", label: "L" },
    { value: "g", label: "g" },
    { value: "kg", label: "kg" },
  ],
  calculate: createLinearConverter(volumeFactors),
};

export const weightConfig: ConverterConfig = {
  title: "Weight Converter",
  description: "Convert between common kitchen weight measurements",
  defaultFromUnit: "oz",
  defaultToUnit: "lb",
  options: [
    { value: "oz", label: "oz" },
    { value: "lb", label: "lb" },
    { value: "g", label: "g" },
    { value: "kg", label: "kg" },
    { value: "ton", label: "ton" },
  ],
  calculate: createLinearConverter(weightFactors),
};

export const temperatureConfig: ConverterConfig = {
  title: "Temperature Converter",
  description: "Convert between Fahrenheit and Celsius",
  defaultFromUnit: "f",
  defaultToUnit: "c",
  defaultValue: "70",
  options: [
    { value: "f", label: "°F" },
    { value: "c", label: "°C" },
  ],
  calculate: temperatureConvert,
};

export const lengthConfig: ConverterConfig = {
  title: "Length Converter",
  description: "Convert between common length measurements",
  defaultFromUnit: "inch",
  defaultToUnit: "cm",
  options: [
    { value: "inch", label: "in" },
    { value: "ft", label: "ft" },
    { value: "yard", label: "yd" },
    { value: "mile", label: "mi" },
    { value: "mm", label: "mm" },
    { value: "cm", label: "cm" },
    { value: "m", label: "m" },
    { value: "km", label: "km" },
  ],
  calculate: createLinearConverter(lengthFactors),
};

export const areaConfig: ConverterConfig = {
  title: "Area Converter",
  description: "Convert between common area measurements",
  defaultFromUnit: "sqft",
  defaultToUnit: "sqm",
  options: [
    { value: "sqin", label: "in²" },
    { value: "sqft", label: "ft²" },
    { value: "sqyd", label: "yd²" },
    { value: "acre", label: "acre" },
    { value: "sqmile", label: "mi²" },
    { value: "sqcm", label: "cm²" },
    { value: "sqm", label: "m²" },
    { value: "hectare", label: "ha" },
  ],
  calculate: createLinearConverter(areaFactors),
};

export const speedConfig: ConverterConfig = {
  title: "Speed Converter",
  description: "Convert between common speed measurements",
  defaultFromUnit: "mph",
  defaultToUnit: "kmh",
  options: [
    { value: "mph", label: "mph" },
    { value: "fps", label: "ft/s" },
    { value: "kmh", label: "km/h" },
    { value: "ms", label: "m/s" },
    { value: "knot", label: "knot" },
  ],
  calculate: createLinearConverter(speedFactors),
};
