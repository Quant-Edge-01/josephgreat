import Image from 'next/image';
import Link from 'next/link';
import { INDUSTRIES } from '@/lib/services';
import { pageMetadata, serviceSchema } from '@/lib/seo';
import JsonLd from '@/components/JsonLd';
import { ServiceDocument, DocumentSection } from '@/components/ServiceDocument';

const title = 'Creative marketing for Toronto small businesses';
const intro = 'Joseph The Great is a one-person creative marketing studio in Toronto. I make short-form videos, Meta ads and websites for small businesses in Toronto and the GTA. You work directly with Joseph, from the first idea to the finished work.';
export const metadata = pageMetadata('Toronto Small Business Marketing | Joseph The Great', 'Reels, Meta ads and websites for Toronto small businesses. Independent studio, CAD $700–$1,000/month depending on scope. Explore services, prices and real cases.', '/toronto-marketing');
export default function TorontoMarketing() {
  return <ServiceDocument title={title} intro={intro} path="/toronto-marketing">
    <JsonLd data={serviceSchema(title, intro, '/toronto-marketing')} />
    <DocumentSection title="Three connected services">
      <p><strong className="text-cream">Reels and short-form content.</strong> Concepts, hooks, filming and editing shaped around the thing a customer needs to understand about your business.</p>
      <p><strong className="text-cream">Meta ads.</strong> Creative and campaign setup for Facebook and Instagram, with an agreed audience, budget and next action. The money paid to Meta is separate from my fee.</p>
      <p><strong className="text-cream">Websites and landing pages.</strong> A clear place to explain the offer and direct people to an enquiry, appointment or existing booking system. Website deliverables are agreed before starting.</p>
      <p>We choose a manageable scope around your immediate priority. A monthly fee is not a promise to produce unlimited content, run every channel and rebuild an entire website at once.</p>
    </DocumentSection>
    <DocumentSection title="Find your kind of business">
      <div className="divide-y divide-neon/20">{INDUSTRIES.map(page => <Link key={page.slug} href={`/services/${page.slug}`} className="block py-5 hover:text-neon"><span className="t-grotesk text-xl text-neon">{page.name} →</span><span className="mt-2 block">{page.intro}</span></Link>)}</div>
      <p>Run another local service business? Send your link through the same enquiry form. These pages describe possible approaches; the linked case studies show where I have published results.</p>
    </DocumentSection>
    <DocumentSection title="What the work has demonstrated"><Image src="/works/dream-alteration/04.png" alt="Saved Dream Alterations Meta screenshot: 59 conversations and CAD $214.86 spent" width={800} height={527} className="max-h-80 w-full max-w-lg object-contain object-left" />
      <p><Link className="text-neon underline" href="/works/dream-alteration">Dream Alterations</Link>: a GTA bridal campaign snapshot showing CAD $214.86 spent and 59 messaging conversations. Nine leads reported; bookings and revenue were not tracked.</p>
      <p><Link className="text-neon underline" href="/works/spartan-gymnastics">Spartan Gymnastics</Link>: 9,224 views in two weeks, 74.9% from non-followers. Evidence of reach, with no measured enrolment result.</p>
      <p>My own <Link className="text-neon underline" href="/works/joeroblox85">YouTube channel</Link> and <Link className="text-neon underline" href="/works/quantlarper">Quantlarper project</Link> show audience-building experience. Those are separate from client sales results.</p>
    </DocumentSection>
    <DocumentSection title="Who this is for"><p>An owner who wants to deal directly with the person doing the work, has a specific service or product to promote and wants a small agreed scope. If you need a large production crew, daily coverage across every platform or guaranteed sales, this offer will not fit that brief.</p></DocumentSection>
  </ServiceDocument>;
}
