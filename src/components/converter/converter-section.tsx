"use client";

import { Scale, Thermometer, Droplets, Ruler, Square, Gauge } from "lucide-react";
import { BaseConverter } from "./base-converter";
import { ResponsiveTabs } from "@/components/navigation";
import { 
  volumeConfig, 
  weightConfig, 
  temperatureConfig,
  lengthConfig,
  areaConfig,
  speedConfig 
} from "@/constants";

interface TabConfig {
  value: string;
  label: string;
  icon: React.ReactNode;
  config: typeof volumeConfig;
}

const tabs: TabConfig[] = [
  {
    value: "volume",
    label: "Volume",
    icon: <Droplets className="h-4 w-4" />,
    config: volumeConfig,
  },
  {
    value: "weight",
    label: "Weight",
    icon: <Scale className="h-4 w-4" />,
    config: weightConfig,
  },
  {
    value: "temperature",
    label: "Temperature",
    icon: <Thermometer className="h-4 w-4" />,
    config: temperatureConfig,
  },
  {
    value: "length",
    label: "Length",
    icon: <Ruler className="h-4 w-4" />,
    config: lengthConfig,
  },
  {
    value: "area",
    label: "Area",
    icon: <Square className="h-4 w-4" />,
    config: areaConfig,
  },
  {
    value: "speed",
    label: "Speed",
    icon: <Gauge className="h-4 w-4" />,
    config: speedConfig,
  },
];

export function ConverterSection() {
  return (
    <ResponsiveTabs
      defaultValue="volume"
      tabs={tabs.map((tab) => ({
        ...tab,
        content: <BaseConverter config={tab.config} />,
      }))}
    />
  );
}
