import Approach from "@/components/Approach";
import ContactProvider from "@/components/ContactProvider";
import DotsMenu from "@/components/DotsMenu";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Portfolio from "@/components/Portfolio";
import Pricing from "@/components/Pricing";

export default function Page() {
  return (
    <ContactProvider>
      <DotsMenu />
      <main>
        <Hero />
        <Approach />
        <Portfolio />
        <Pricing />
      </main>
      <Footer />
    </ContactProvider>
  );
}
