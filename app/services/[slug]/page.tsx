import Image from 'next/image';
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
  const proof = workBySlug(page.proofSlug)!;
  const path = `/services/${page.slug}`;
  return <ServiceDocument title={page.title} intro={page.intro} path={path}>
    <JsonLd data={serviceSchema(page.title, page.intro, path)} />
    <DocumentSection title="The problem"><p>{page.problem}</p></DocumentSection>
    <DocumentSection title="A few directions">
      <p>Ideas are adapted to the business and agreed scope.</p>
      <div className="grid gap-8 md:grid-cols-2">{page.ideas.map(idea => <div key={idea.title} className="border-t border-neon/20 pt-5"><h3 className="t-grotesk text-xl text-cream">{idea.title}</h3><p className="mt-2">{idea.text}</p></div>)}</div>
    </DocumentSection>
    <DocumentSection title="Proof you can inspect">
      <Image src={proof.images[0].src} alt={proof.images[0].alt} width={800} height={800} className="max-h-80 w-full max-w-lg object-contain object-left" />
      <p>{page.proof}</p><Link className="inline-block py-2 text-neon underline underline-offset-4" href={`/works/${page.proofSlug}`}>See the {proof.title} case and screenshots ↗</Link>
    </DocumentSection>
    <DocumentSection title="If we work together">
      <p>{page.need} We agree on deliverables and revisions before starting. Monthly work is CAD $700–$1,000; ad spend and major website work are separate.</p>
      <p>{page.measure}</p>
      <details className="short-detail"><summary>{page.faq.question}</summary><p className="mt-3">{page.faq.answer}</p></details>
      <Link href="/affordable-marketing-toronto" className="inline-block py-2 text-neon underline">Pricing and scope ↗</Link>
    </DocumentSection>
  </ServiceDocument>;
}
