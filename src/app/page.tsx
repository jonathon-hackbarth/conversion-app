import { Header } from "@/components/converter/header";
import { ConverterSection } from "@/components/converter/converter-section";
import { Footer } from "@/components/converter/footer";

export default function KitchenConverter() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center p-4">
      <div className="w-full max-w-md md:max-w-2xl lg:max-w-4xl flex flex-col gap-4">
        <Header />
        <ConverterSection />
        <Footer />
      </div>
    </div>
  );
}
