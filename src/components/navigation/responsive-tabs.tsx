"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface Tab {
  value: string;
  label: string;
  icon: React.ReactNode;
  content: React.ReactNode;
}

interface ResponsiveTabsProps {
  tabs: Tab[];
  defaultValue: string;
}

export function ResponsiveTabs({ tabs, defaultValue }: ResponsiveTabsProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(defaultValue);

  const activeTabData = tabs.find((tab) => tab.value === activeTab);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    setIsMenuOpen(false);
  };

  return (
    <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
      {/* Mobile Navigation */}
      <div className="md:hidden">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="w-full flex items-center justify-between px-4 py-3 bg-muted rounded-lg text-sm font-medium"
        >
          <span className="flex items-center gap-2">
            {activeTabData?.icon}
            {activeTabData?.label}
          </span>
          {isMenuOpen ? (
            <X className="h-4 w-4" />
          ) : (
            <Menu className="h-4 w-4" />
          )}
        </button>

        {isMenuOpen && (
          <div className="mt-2 bg-muted rounded-lg overflow-hidden">
            {tabs.map((tab) => (
              <button
                key={tab.value}
                onClick={() => handleTabChange(tab.value)}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-3 text-sm font-medium transition-colors",
                  activeTab === tab.value
                    ? "bg-background text-foreground"
                    : "hover:bg-background/50"
                )}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Desktop Navigation */}
      <div className="hidden md:block">
        <TabsList className="grid grid-cols-6">
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
      </div>

      {/* Tab Content */}
      {tabs.map((tab) => (
        <TabsContent key={tab.value} value={tab.value}>
          {tab.content}
        </TabsContent>
      ))}
    </Tabs>
  );
}
