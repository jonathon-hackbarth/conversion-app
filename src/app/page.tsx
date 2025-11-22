import { Header } from "@/components/converter/header";
import { SimpleConverter } from "@/components/converter/simple-converter";
import { Footer } from "@/components/converter/footer";

export default function KitchenConverter() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center p-4 md:p-8">
      <div className="w-full max-w-2xl flex flex-col gap-8">
        <Header />
        <SimpleConverter />
        <Footer />
      </div>
    </div>
  );
}
