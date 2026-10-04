import Link from 'next/link';
import Image from 'next/image';
import { WORKS } from '@/lib/works';
import { CASE_NOTES } from '@/lib/case-notes';
import { ServiceDocument, DocumentSection } from '@/components/ServiceDocument';
import JsonLd from '@/components/JsonLd';
import { pageMetadata, webPageSchema } from '@/lib/seo';

const title = 'Real work. Clear numbers.';
const intro = 'Two local business projects and two of Joseph’s own creator projects. Open a case to see the screenshots and what the numbers do — and do not — prove.';
export const metadata = pageMetadata('Case Studies & Evidence | Joseph The Great', intro, '/case-studies');

const limits: Record<string, string> = {
  'dream-alteration': 'Conversations, not confirmed bookings or sales.',
  'spartan-gymnastics': 'Reach, not measured enrolments.',
  joeroblox85: 'Joseph’s own channel, not a client.',
  quantlarper: 'Joseph’s own project, not a client.',
};

function Cases({ local }: { local: boolean }) {
  return <div className="grid gap-8 md:grid-cols-2">{WORKS.filter(work => work.local === local).map(work => <article key={work.slug} className="border-t border-neon/25 pt-6">
    <Link href={`/works/${work.slug}`} className="group block">
      <Image src={work.cover} alt={`${work.title} case preview`} width={700} height={700} className="h-72 w-full object-contain object-left transition-transform duration-300 group-hover:scale-[1.02]" />
      <h3 className="t-grotesk mt-5 text-2xl text-neon">{work.title} ↗</h3>
    </Link>
    <p className="s-body mt-3 text-cream">{CASE_NOTES[work.slug].result} · {CASE_NOTES[work.slug].label}</p>
    <p className="mt-2 text-base text-cream/65">{limits[work.slug]}</p>
  </article>)}</div>;
}

export default function Page() {
  return <ServiceDocument title={title} intro={intro} path="/case-studies">
    <JsonLd data={webPageSchema(title, intro, '/case-studies')} />
    <DocumentSection title="For local businesses"><Cases local /></DocumentSection>
    <DocumentSection title="My own projects"><Cases local={false} /></DocumentSection>
    <p className="mx-auto max-w-3xl text-base text-cream/65">Views are not revenue. Dream’s nine qualified leads are owner-reported; bookings and sales were not tracked. The full cases show the evidence and its limits.</p>
  </ServiceDocument>;
}
