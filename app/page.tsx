import Approach from "@/components/Approach";
import Flagship from "@/components/Flagship";
import Hero from "@/components/Hero";
import Identity from "@/components/Identity";
import HireCta from "@/components/HireCta";
import Ledger from "@/components/Ledger";
import Objections from "@/components/Objections";
import Portfolio from "@/components/Portfolio";
import Pricing from "@/components/Pricing";
import Process from "@/components/Process";
import Scope from "@/components/Scope";
import StartHere from "@/components/StartHere";

/**
 * The home page still opens with the poster and still walks you into the jar.
 * What changed is that the receipts now sit directly under the fold instead of
 * four screens down it: a visitor who wants to know whether this person can
 * actually do anything gets an Ads Manager screenshot before they get an
 * artwork, and everyone else can keep scrolling into the sequence.
 *
 * Section order is: offer → proof → who → work → how to read the numbers →
 * how far it goes → process → objections → who replies → price → send. Every one of those does a job the brief
 * names; anything that only decorated is gone.
 */
export default function Page() {
  return (
    <main id="main">
      <Hero />
      <Flagship />
      <Approach />
      <Portfolio />
      <Ledger />
      <Scope />
      <Process />
      <Objections />
      <Identity />
      <Pricing />
      <StartHere context="home" />
      <HireCta />
    </main>
  );
}
