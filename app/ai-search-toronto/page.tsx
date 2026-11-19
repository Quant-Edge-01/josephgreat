import Image from 'next/image';
import Link from 'next/link';
import JsonLd from '@/components/JsonLd';
import { DocumentSection, ServiceDocument } from '@/components/ServiceDocument';
import { pageMetadata, serviceSchema } from '@/lib/seo';

const path = '/ai-search-toronto';
const title = 'Make your business easy to find.';
const intro = 'Joseph The Great offers AI search optimization (GEO) for Toronto and GTA small businesses. I make your services, location and proof easier for search engines and AI assistants to find and understand.';

export const metadata = pageMetadata('AI Search & GEO for Toronto Small Businesses | Joseph The Great', intro, path);

export default function AiSearchPage() {
  return <ServiceDocument title={title} intro={intro} path={path} kicker="AI SEARCH / GEO · TORONTO & GTA">
    <JsonLd data={serviceSchema('AI search optimization for Toronto small businesses', intro, path, 'AI search optimization (GEO)')} />
    <DocumentSection title="What I work on">
      <ul className="grid gap-5 sm:grid-cols-3">
        <li className="border border-neon/25 p-5"><strong>Access</strong><br />Check what search crawlers can read and what gets in their way.</li>
        <li className="border border-neon/25 p-5"><strong>Clarity</strong><br />Put services, service areas and real work into clear, linked pages.</li>
        <li className="border border-neon/25 p-5"><strong>Measurement</strong><br />Repeat a set of real buyer questions and track mentions, citations and enquiry sources.</li>
      </ul>
      <p>We agree on the pages, technical fixes and reporting before starting. Scope determines the fee.</p>
    </DocumentSection>
    <DocumentSection title="In the lab: Dream Alterations">
      <div className="grid items-center gap-8 sm:grid-cols-2">
        <Image src="/works/dream-alteration/03.jpg" width={1600} height={1539} sizes="(min-width: 640px) 420px, 90vw" alt="Dream Alterations Instagram profile and bridal work; portfolio snapshot" className="h-auto w-full border border-neon/25 p-2" />
        <div className="space-y-4">
          <p>We’re testing GEO with this GTA bridal alterations business. The pilot focuses on clear service pages, real bridal work and an easy way to enquire.</p>
          <p>AI recommendations and leads from this pilot are still unverified.</p>
          <p><Link className="text-neon underline" href="/works/dream-alteration">See the Dream Alterations portfolio ↗</Link><br /><a className="text-neon underline" href="https://dreamalterations.ca/">Visit the Dream Alterations site ↗</a></p>
        </div>
      </div>
    </DocumentSection>
    <DocumentSection title="Can you guarantee a recommendation?">
      <p>Recommendations and citations vary with the question and the search system. I can improve what your site makes available and measure what shows up over time.</p>
    </DocumentSection>
  </ServiceDocument>;
}
