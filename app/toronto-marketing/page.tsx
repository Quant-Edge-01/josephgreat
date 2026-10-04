import Image from 'next/image';
import Link from 'next/link';
import { INDUSTRIES } from '@/lib/services';
import { pageMetadata, serviceSchema } from '@/lib/seo';
import JsonLd from '@/components/JsonLd';
import { ServiceDocument, DocumentSection } from '@/components/ServiceDocument';

const title = 'Creative marketing in Toronto.';
const intro = 'Joseph The Great makes Reels, Meta ads and focused websites for small businesses in Toronto and the GTA. You work directly with Joseph.';
export const metadata = pageMetadata('Toronto Small Business Marketing | Joseph The Great', 'Reels, Meta ads and websites for Toronto small businesses. Independent studio, CAD $700–$1,000/month depending on scope. Explore services, prices and real cases.', '/toronto-marketing');

export default function TorontoMarketing() {
  return <ServiceDocument title={title} intro={intro} path="/toronto-marketing">
    <JsonLd data={serviceSchema(title, intro, '/toronto-marketing')} />
    <DocumentSection title="Pick a starting point">
      <div className="grid gap-5 md:grid-cols-3">
        <div><h3 className="t-grotesk text-xl text-cream">Reels</h3><p>Short videos built around an idea people might remember.</p><Link className="text-neon underline" href="/instagram-reels-toronto">Explore Reels ↗</Link></div>
        <div><h3 className="t-grotesk text-xl text-cream">Meta ads</h3><p>Creative and campaigns with a clear offer and a way to enquire.</p><Link className="text-neon underline" href="/meta-ads-toronto">Explore ads ↗</Link></div>
        <div><h3 className="t-grotesk text-xl text-cream">Websites</h3><p>Simple destinations that explain what you sell and what to do next.</p><Link className="text-neon underline" href="/websites-for-small-businesses-toronto">Explore websites ↗</Link></div>
      </div>
      <p>Monthly work is CAD $700–$1,000 for an agreed scope. Ad spend is separate; a full website is quoted separately.</p>
    </DocumentSection>
    <DocumentSection title="Your kind of business?">
      <div className="grid grid-cols-2 gap-x-6 gap-y-3">{INDUSTRIES.map(page => <Link key={page.slug} href={`/services/${page.slug}`} className="border-b border-neon/25 py-3 text-neon hover:text-cream">{page.name} ↗</Link>)}</div>
      <p>Other Toronto and GTA small businesses are welcome too. The first step is choosing one offer to promote.</p>
    </DocumentSection>
    <DocumentSection title="What the work shows">
      <Image src="/works/dream-alteration/04.png" alt="Saved Dream Alterations Meta screenshot: 59 conversations and CAD $214.86 spent" width={800} height={527} className="max-h-80 w-full max-w-lg object-contain object-left" />
      <p><Link className="text-neon underline" href="/works/dream-alteration">Dream Alterations</Link>: CAD $214.86 in Meta spend started 59 conversations. Nine leads were owner-reported; bookings and revenue were not tracked.</p>
      <p><Link className="text-neon underline" href="/works/spartan-gymnastics">Spartan Gymnastics</Link>: 9,224 views in two weeks, 74.9% from non-followers. Enrolments were not measured.</p>
      <p>Joseph’s <Link className="text-neon underline" href="/works/joeroblox85">YouTube</Link> and <Link className="text-neon underline" href="/works/quantlarper">Quantlarper</Link> projects show his own audience-building work, separate from client results.</p>
    </DocumentSection>
  </ServiceDocument>;
}
