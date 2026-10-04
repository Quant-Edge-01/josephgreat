import Image from 'next/image';
import Link from 'next/link';
import { PRICE_RANGE } from '@/lib/site';
import { pageMetadata, serviceSchema } from '@/lib/seo';
import JsonLd from '@/components/JsonLd';
import { ServiceDocument, DocumentSection } from '@/components/ServiceDocument';

const title = 'Toronto marketing, clearly priced.';
const intro = 'Reels, Meta ads and focused website work for Toronto small businesses. One clear monthly scope, agreed before we start.';
export const metadata = pageMetadata('Affordable Toronto Marketing: $700–$1,000 CAD/month | Joseph The Great', intro, '/affordable-marketing-toronto');

export default function PricingPage() {
  return <ServiceDocument title={title} intro={intro} path="/affordable-marketing-toronto">
    <JsonLd data={serviceSchema('Monthly creative marketing for Toronto small businesses', intro, '/affordable-marketing-toronto')} />
    <DocumentSection title="One fee. One clear scope.">
      <p>{PRICE_RANGE} CAD per month is the service fee for agreed content, ad or small website tasks. We decide what gets made, the timeline and revisions before starting. You work directly with Joseph, one month at a time.</p>
      <p>A complete website, unlimited revisions and daily coverage across every channel are not included by default. Larger website projects are quoted separately.</p>
    </DocumentSection>
    <DocumentSection title="What about ad spend?">
      <p>Money paid to Meta is separate. For example, a CAD $700 service fee plus CAD $200 in approved ads is CAD $900 before applicable taxes or other agreed costs. That is an illustration, not a required budget or a forecast.</p>
    </DocumentSection>
    <DocumentSection title="What can I check first?">
      <Image src="/works/dream-alteration/04.png" alt="Saved Dream Alterations Meta screenshot: 59 conversations and CAD $214.86 spent" width={800} height={527} className="max-h-80 w-full max-w-lg object-contain object-left" />
      <p>In the <Link href="/works/dream-alteration" className="text-neon underline">Dream Alterations case</Link>, CAD $214.86 of ad spend started 59 conversations. That is campaign spend, not Joseph’s fee. Bookings and revenue were not tracked.</p>
      <p>Want to start smaller? Send your business link for three free ideas before deciding whether to hire me. <Link href="/toronto-marketing" className="text-neon underline">See the services ↗</Link></p>
    </DocumentSection>
  </ServiceDocument>;
}
