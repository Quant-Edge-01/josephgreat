import Image from 'next/image';
import Link from 'next/link';
import { PRICE_RANGE } from '@/lib/site';
import { pageMetadata, serviceSchema } from '@/lib/seo';
import JsonLd from '@/components/JsonLd';
import { ServiceDocument, DocumentSection } from '@/components/ServiceDocument';

const title = 'Affordable marketing in Toronto: price & scope';
const intro = `Joseph The Great offers creative marketing for Toronto small businesses at ${PRICE_RANGE} CAD per month, depending on scope. Reels, Meta ads and website work are available. Ad spend is separate, and you agree on the actual work before starting.`;
export const metadata = pageMetadata('Affordable Toronto Marketing: $700–$1,000 CAD/month | Joseph The Great', intro, '/affordable-marketing-toronto');
export default function PricingPage() {
  return <ServiceDocument title={title} intro={intro} path="/affordable-marketing-toronto">
    <JsonLd data={serviceSchema('Monthly creative marketing for Toronto small businesses', intro, '/affordable-marketing-toronto')} />
    <DocumentSection title="What the monthly range means">
      <p>You are hiring Joseph directly. We agree on the content, ad setup and website tasks that fit the month. The published range is a service fee, not a bundled media budget or an unlimited agency package.</p>
      <p>For example, a brief could prioritise short-form content around one service, or creative and a simple enquiry path for one campaign. These are planning examples, not fixed packages with an undisclosed number of deliverables.</p>
    </DocumentSection>
    <DocumentSection title="What needs to be agreed first">
      <ul className="list-disc space-y-3 pl-5"><li>The service or product you want to promote and the customer action you want.</li><li>The number and format of deliverables, filming needs and revision scope.</li><li>Which ad or website tasks are included and which are outside that month’s work.</li><li>The timeline, who approves the work and who answers customer enquiries.</li></ul>
      <p>Work is agreed one month at a time. A complete website build, daily posting on every platform or unlimited revisions should not be assumed from the price range.</p>
    </DocumentSection>
    <DocumentSection title="Ad spend is a separate line">
      <p>If you choose a CAD $700 service scope and approve CAD $200 in Meta spend, those two lines total CAD $900 before any applicable taxes or separately agreed costs. That is an illustration, not a required ad budget or a sales forecast.</p>
      <p>We decide whether ads make sense for the offer and budget. Organic content does not require a paid media budget, but its reach and timing are not guaranteed either.</p>
    </DocumentSection>
    <DocumentSection title="What evidence should you use to decide?"><Image src="/works/dream-alteration/04.png" alt="Saved Dream Alterations Meta screenshot: 59 conversations and CAD $214.86 spent" width={800} height={527} className="max-h-80 w-full max-w-lg object-contain object-left" />
      <p>The <Link href="/works/dream-alteration" className="text-neon underline">Dream Alterations case</Link> shows 59 conversations from CAD $214.86 in Meta spend. That spend is not the price of hiring Joseph. Nine leads are reported; no tracked booking or revenue result is claimed.</p>
      <p>The YouTube and Instagram projects demonstrate content experience. They do not establish what it will cost to acquire your customer. Your offer, location, availability and follow-through affect that result.</p>
    </DocumentSection>
    <DocumentSection title="Why work with a small studio?">
      <p>You talk to the person creating the work. The scope can stay focused on one commercial priority, and you can review the published cases before committing. The benefit is a direct working relationship and a visible budget — not a claim to be Toronto’s cheapest or best agency.</p>
      <p><Link href="/toronto-marketing" className="text-neon underline">Explore services and business types</Link> or ask for three free ideas for your business. There is no required sales call to request them.</p>
    </DocumentSection>
  </ServiceDocument>;
}
