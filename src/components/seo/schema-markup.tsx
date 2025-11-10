import { getSchemaMarkup, getConverterSchemaMarkup } from "@/lib/schema-markup";

/**
 * Schema markup component for SEO
 * Provides structured data in JSON-LD format
 */
export function SchemaMarkup() {
  const schemas = [getSchemaMarkup(), ...getConverterSchemaMarkup()];

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": schemas,
        }),
      }}
      suppressHydrationWarning
    />
  );
}
