import Link from 'next/link';
import { notFound } from 'next/navigation';
import { INDUSTRIES, industryBySlug } from '@/lib/services';
import { pageMetadata, serviceSchema } from '@/lib/seo';
import JsonLd from '@/components/JsonLd';
import { ServiceDocument, DocumentSection } from '@/components/ServiceDocument';
import { workBySlug } from '@/lib/works';

type Props = { params: Promise<{ slug: string }> };
export function generateStaticParams() { return INDUSTRIES.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: Props) {
  const page = industryBySlug((await params).slug);
  return page ? pageMetadata(`${page.title} | Joseph The Great`, page.description, `/services/${page.slug}`) : {};
}
export default async function IndustryPage({ params }: Props) {
  const page = industryBySlug((await params).slug);
  if (!page) notFound();
  const path = `/services/${page.slug}`;
  return <ServiceDocument title={page.title} intro={page.intro} path={path}>
    <JsonLd data={serviceSchema(page.title, page.intro, path)} />
    <DocumentSection title="Start with the customer’s decision"><p>{page.problem}</p></DocumentSection>
    <DocumentSection title="What we could make">
      <p className="t-note text-neon">Example directions, adapted to your business after we talk.</p>
      {page.ideas.map(idea => <div key={idea.title} className="pt-4"><h3 className="t-grotesk text-xl text-cream">{idea.title}</h3><p className="mt-2">{idea.text}</p></div>)}
    </DocumentSection>
    <DocumentSection title="The relevant evidence"><p>{page.proof}</p><Link className="inline-block py-2 text-neon underline underline-offset-4" href={`/works/${page.proofSlug}`}>Read the {workBySlug(page.proofSlug)?.title} case and see the screenshots →</Link></DocumentSection>
    <DocumentSection title="What I need from you"><p>{page.need}</p><p>We choose the priority, deliverables and revision scope before work starts. Content, ads and website work are available; the monthly range does not include unlimited work across all three.</p></DocumentSection>
    <DocumentSection title="What we would measure"><p>{page.measure}</p></DocumentSection>
    <DocumentSection title={page.faq.question}><p>{page.faq.answer}</p></DocumentSection>
  </ServiceDocument>;
}
