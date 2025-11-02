"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Scale, Thermometer, Droplets } from "lucide-react";
import { BaseConverter } from "@/components/converter";
import { ThemeToggle } from "@/components/theme";
import { BuyMeCoffee } from "@/components/common";
import { volumeConfig, weightConfig, temperatureConfig } from "@/constants";

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
    icon: <Droplets className="h-3 w-3 sm:h-4 sm:w-4" />,
    config: volumeConfig,
  },
  {
    value: "weight",
    label: "Weight",
    icon: <Scale className="h-3 w-3 sm:h-4 sm:w-4" />,
    config: weightConfig,
  },
  {
    value: "temperature",
    label: "Temp",
    icon: <Thermometer className="h-3 w-3 sm:h-4 sm:w-4" />,
    config: temperatureConfig,
  },
];

export default function KitchenConverter() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center p-4">
      <div className="w-full max-w-md">
        <div className="flex justify-between items-center mb-1 w-full">
          <h1 className="text-xl font-bold text-center">Kitchen Converter</h1>
          <ThemeToggle />
        </div>

        <Tabs defaultValue="volume" className="w-full">
          <div className="mt-1 flex justify-between items-center">
            <TabsList className="grid grid-cols-3">
              {tabs.map((tab) => (
                <TabsTrigger
                  key={tab.value}
                  value={tab.value}
                  className="flex items-center gap-1 sm:gap-2"
                >
                  {tab.icon}
                  <span className="text-xs sm:text-sm">{tab.label}</span>
                </TabsTrigger>
              ))}
            </TabsList>
            <BuyMeCoffee />
          </div>

          {tabs.map((tab) => (
            <TabsContent key={tab.value} value={tab.value}>
              <BaseConverter config={tab.config} />
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
}
