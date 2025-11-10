/**
 * JSON-LD Schema markup for Kitchen Converter app
 * Provides structured data for search engines
 */

export function getSchemaMarkup() {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Kitchen Measurement Converter",
    description:
      "Convert cups to ml, ounces to grams, Fahrenheit to Celsius instantly. Perfect for recipes, cooking, and baking conversions.",
    url: "https://kitchen-converter.app",
    applicationCategory: "UtilityApplication",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    creator: {
      "@type": "Person",
      name: "Jonathan Hackbarth",
    },
    author: {
      "@type": "Person",
      name: "Jonathan Hackbarth",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5",
      ratingCount: "1",
    },
  };
}

export function getConverterSchemaMarkup() {
  return [
    {
      "@context": "https://schema.org",
      "@type": "HowTo",
      name: "How to Convert Kitchen Measurements",
      description:
        "Convert between volume, weight, and temperature measurements for cooking and baking",
      step: [
        {
          "@type": "HowToStep",
          name: "Select measurement type",
          text: "Choose between volume, weight, temperature, length, area, or speed conversions",
        },
        {
          "@type": "HowToStep",
          name: "Enter the value",
          text: "Input the measurement value you want to convert",
        },
        {
          "@type": "HowToStep",
          name: "Select units",
          text: "Choose the 'from' and 'to' units for conversion",
        },
        {
          "@type": "HowToStep",
          name: "View result",
          text: "The converted value appears instantly",
        },
      ],
    },
  ];
}
