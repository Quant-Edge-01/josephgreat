import Link from 'next/link';
import Image from 'next/image';
import { WORKS } from '@/lib/works';
import { CASE_NOTES } from '@/lib/case-notes';
import { ServiceDocument, DocumentSection } from '@/components/ServiceDocument';
import JsonLd from '@/components/JsonLd';
import { pageMetadata, webPageSchema } from '@/lib/seo';
const title = "Real work. Specific evidence. Clear limits.";
const intro = "Explore Joseph The Great\u2019s local business work and Joseph\u2019s own creator projects. Each case separates the creative, saved metrics and outcomes that were not measured.";
export const metadata = pageMetadata(title + ' | Joseph The Great', intro, '/case-studies');
export default function Page() { return <ServiceDocument title={title} intro={intro} path="/case-studies"><JsonLd data={webPageSchema(title, intro, '/case-studies')} /><div className="grid gap-10 md:grid-cols-2">{WORKS.map(work => <article key={work.slug} className="border-t border-neon/25 pt-6"><Link href={`/works/${work.slug}`}><Image src={work.cover} alt={`${work.title} portfolio evidence`} width={700} height={700} className="h-64 w-full object-contain object-left" /><h2 className="t-grotesk mt-5 text-2xl text-neon">{work.title} →</h2></Link><p className="t-mono mt-3 text-neon">{work.local ? 'Local business work' : 'Joseph’s own creator project'}</p><p className="s-body mt-4">{CASE_NOTES[work.slug].result} · {CASE_NOTES[work.slug].label}</p><p className="s-body mt-3 text-cream/70">{CASE_NOTES[work.slug].limit}</p></article>)}</div><DocumentSection title="How to read the numbers"><p>Conversations are not bookings. Views are not revenue. Nine Dream Alterations leads are owner-reported, with qualification criteria unavailable. Screenshots are historical snapshots; full campaign date ranges and sales attribution are not available.</p><p>The YouTube and Quantlarper work belongs to Joseph. Those projects demonstrate audience-building experience and are not presented as paying studio clients.</p></DocumentSection></ServiceDocument>; }
