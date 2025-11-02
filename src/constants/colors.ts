// Color constants for consistent theming
export const COLORS = {
  from: {
    light: "bg-blue-600 text-white hover:bg-blue-700",
    dark: "dark:bg-blue-800 dark:hover:bg-blue-900",
  },
  to: {
    light: "bg-orange-500 text-white hover:bg-orange-600",
    dark: "dark:bg-orange-700 dark:hover:bg-orange-800",
  },
};

// Tab configuration for converters
export interface TabConfig {
  value: string;
  label: string;
  icon: React.ReactNode;
}
