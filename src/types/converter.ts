// Converter types and interfaces
export interface ConverterConfig {
  title: string;
  description: string;
  defaultFromUnit: string;
  defaultToUnit: string;
  options: { value: string; label: string }[];
  calculate: (value: string, fromUnit: string, toUnit: string) => string;
}
