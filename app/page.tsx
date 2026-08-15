import Approach from "@/components/Approach";
import Hero from "@/components/Hero";
import HireCta from "@/components/HireCta";
import Portfolio from "@/components/Portfolio";
import Pricing from "@/components/Pricing";

export default function Page() {
  return (
    <main>
      <Hero />
      <Approach />
      <Portfolio />
      <Pricing />
      <HireCta />
    </main>
  );
}
