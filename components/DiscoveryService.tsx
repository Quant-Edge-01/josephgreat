import Image from 'next/image';
import Link from 'next/link';
import { DISCOVERY_SERVICES } from '@/lib/discovery-services';
import { workBySlug } from '@/lib/works';
import { ServiceDocument, DocumentSection } from './ServiceDocument';
import JsonLd from './JsonLd';
import { serviceSchema, webPageSchema } from '@/lib/seo';

export default function DiscoveryService({ service }: { service: typeof DISCOVERY_SERVICES[number] }) {
  const path = `/${service.slug}`;
  const proof = workBySlug(service.proofSlug)!;
  const summary = `Joseph The Great offers ${service.serviceType.toLowerCase()} for small businesses in Toronto and the GTA. Monthly work is CAD $700–$1,000 depending on the agreed deliverables; ad spend is separate. You work directly with Joseph. ${service.intro}`;
  return <ServiceDocument title={service.title} intro={summary} path={path}>
    <JsonLd data={[webPageSchema(service.title, summary, path), serviceSchema(service.title, summary, path, service.serviceType)]} />
    <DocumentSection title="Is this for you?"><p>{service.buyer}</p></DocumentSection>
    <DocumentSection title="What the work could look like"><p>{service.work}</p><p>We agree on deliverables, timing and what to measure before starting.</p></DocumentSection>
    <DocumentSection title="A real example">
      <Link href={`/works/${proof.slug}`}><Image src={proof.images[0].src} alt={proof.images[0].alt} width={800} height={800} className="max-h-80 w-full max-w-lg object-contain object-left" /></Link>
      <p>{service.evidence}</p><Link href={`/works/${proof.slug}`} className="inline-block py-2 text-neon underline">See {proof.title}: work and screenshots ↗</Link>
    </DocumentSection>
    <DocumentSection title="Price and a practical question">
      <p>Monthly work is CAD $700–$1,000 for an agreed scope. Ad spend, third-party costs and major website work are separate. Toronto and GTA projects are welcome; filming travel is confirmed before starting. <Link href="/affordable-marketing-toronto" className="text-neon underline">Full pricing ↗</Link></p>
      <details className="short-detail"><summary>{service.question}</summary><p className="mt-3">{service.answer}</p></details>
    </DocumentSection>
  </ServiceDocument>;
}
