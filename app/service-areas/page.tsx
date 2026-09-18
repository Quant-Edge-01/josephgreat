import Link from 'next/link';
import Image from 'next/image';
import { WORKS } from '@/lib/works';
import { CASE_NOTES } from '@/lib/case-notes';
import { ServiceDocument, DocumentSection } from '@/components/ServiceDocument';
import JsonLd from '@/components/JsonLd';
import { pageMetadata, webPageSchema } from '@/lib/seo';
const title = "Toronto and GTA service areas";
const intro = "Joseph The Great is an independent creative marketing studio serving small businesses in Toronto and the Greater Toronto Area. This is a service-area business; no public storefront or client-facing office is represented here.";
export const metadata = pageMetadata(title + ' | Joseph The Great', intro, '/service-areas');
export default function Page() { return <ServiceDocument title={title} intro={intro} path="/service-areas"><JsonLd data={webPageSchema(title, intro, '/service-areas')} /><DocumentSection title="Where we work"><p>Toronto, Etobicoke, North York, Markham, Richmond Hill and Newmarket are service areas. Remote creative, advertising and website work can support GTA businesses; filming location, travel costs and availability are confirmed before a project starts.</p></DocumentSection><DocumentSection title="Local evidence"><p>Dream Alterations is the published GTA bridal case. Spartan Gymnastics is the local content example. Their portfolio pages show the work and saved evidence; neither establishes results for every neighbourhood or industry.</p><Link href="/case-studies" className="text-neon underline">Inspect the cases →</Link></DocumentSection><DocumentSection title="Outside downtown Toronto?"><p>You do not need a downtown address to enquire. Send your business link, location and the service you want to promote. Joseph will confirm whether the requested work and filming arrangements fit.</p></DocumentSection></ServiceDocument>; }
