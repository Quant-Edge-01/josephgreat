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
 <DocumentSection title="Who this is for"><p>{service.buyer}</p></DocumentSection>
 <DocumentSection title="What we agree before starting"><p>{service.work}</p><p>The written scope sets deliverables, timing, approvals and the metric used to judge the work. There is no unlimited content or guaranteed customer-acquisition promise.</p></DocumentSection>
 <DocumentSection title="Real work, with its limits">
 <Link href={`/works/${proof.slug}`}><Image src={proof.images[0].src} alt={proof.images[0].alt} width={800} height={800} className="max-h-80 w-full max-w-lg object-contain object-left" /></Link>
 <p>{service.evidence}</p><Link href={`/works/${proof.slug}`} className="inline-block py-3 text-neon underline">Inspect {proof.title}: work and screenshots →</Link>
 </DocumentSection>
 <DocumentSection title="Price and exclusions"><p>Monthly creative marketing work is CAD $700–$1,000 depending on scope. Not every service is included in every month. Paid media, third-party subscriptions, hosting and extra production or travel costs are separate unless explicitly included in the written scope.</p><p>Complete website builds, unlimited revisions, daily coverage of every channel and guaranteed results are not included by default.</p><Link href="/affordable-marketing-toronto" className="inline-block py-3 text-neon underline">Read pricing and scope →</Link></DocumentSection>
 <DocumentSection title="Toronto and GTA availability"><p>The studio serves Toronto and the Greater Toronto Area, including Etobicoke, North York, Markham, Richmond Hill and Newmarket. Filming location, availability and travel are agreed before committing.</p><Link href="/service-areas" className="inline-block py-3 text-neon underline">Service areas and working arrangements →</Link></DocumentSection>
 <DocumentSection title={service.question}><p>{service.answer}</p></DocumentSection>
 <DocumentSection title="Do I need a long contract?"><p>Work is agreed one month at a time. A short test needs an explicit scope and budget; the monthly price does not imply a guaranteed result or an undisclosed trial discount.</p></DocumentSection>
 </ServiceDocument>;
}
