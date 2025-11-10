import type React from "react";
import type { Metadata, Viewport } from "next";
import { JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme";
import { getThemeScript } from "@/components/theme/theme-script";
import { SchemaMarkup } from "@/components/seo";
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://kitchen-converter.app"),
  title: "Kitchen & Cooking Converter - Volume, Weight, Temperature & Measurements",
  description:
    "Fast kitchen and cooking converter for recipes, baking, and meal prep. Convert cups to ml, ounces to grams, Fahrenheit to Celsius instantly.",
  keywords: [
    "kitchen converter",
    "cooking converter",
    "recipe converter",
    "baking converter",
    "cooking measurements",
    "ingredient converter",
    "volume converter",
    "weight converter",
    "temperature converter",
    "measurement converter",
  ],
  authors: [{ name: "Jonathan Hackbarth" }],
  creator: "Jonathan Hackbarth",
  publisher: "Jonathan Hackbarth",
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://kitchen-converter.app",
    siteName: "Kitchen & Cooking Converter",
    title: "Kitchen & Cooking Converter - Volume, Weight, Temperature & Measurements",
    description:
      "Fast kitchen and cooking converter for recipes, baking, and meal prep. Convert cups to ml, ounces to grams, Fahrenheit to Celsius instantly.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Kitchen & Cooking Converter",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kitchen & Cooking Converter",
    description:
      "Convert cooking measurements instantly - cups to ml, ounces to grams, Fahrenheit to Celsius.",
    creator: "@jonathonhackbarth",
  },
  alternates: {
    canonical: "https://kitchen-converter.app",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  colorScheme: "light dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{ __html: getThemeScript() }}
          suppressHydrationWarning
        />
        <SchemaMarkup />
      </head>
      <body className={jetbrainsMono.className}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
