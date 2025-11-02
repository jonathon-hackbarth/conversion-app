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
  ml: 1,
  liter: 1000,
};

const weightFactors = {
  oz: 28.35,
  lb: 453.59,
  g: 1,
  kg: 1000,
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
    { value: "ml", label: "ml" },
    { value: "liter", label: "L" },
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
  ],
  calculate: createLinearConverter(weightFactors),
};

export const temperatureConfig: ConverterConfig = {
  title: "Temperature Converter",
  description: "Convert between Fahrenheit and Celsius",
  defaultFromUnit: "f",
  defaultToUnit: "c",
  options: [
    { value: "f", label: "°F" },
    { value: "c", label: "°C" },
  ],
  calculate: temperatureConvert,
};
