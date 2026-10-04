import Image from 'next/image';
import Link from 'next/link';
import { EMAIL, GOOGLE_BUSINESS_URL, IG_URL, IG_HANDLE, SITE_URL } from '@/lib/site';
import { pageMetadata, webPageSchema, personId, organizationId, toronto } from '@/lib/seo';
import JsonLd from '@/components/JsonLd';
import { ServiceDocument, DocumentSection } from '@/components/ServiceDocument';

const title = 'The person behind the mask.';
const intro = 'I’m Yusuf — Joseph to most people. I run Joseph The Great, a one-person creative marketing studio for Toronto and GTA small businesses.';
export const metadata = pageMetadata('About Joseph | Toronto Creator & Joseph The Great Founder', 'Meet Yusuf, also known as Joseph: the creator behind Joseph The Great. Explore his own media projects and local business work.', '/about-joseph');

export default function AboutJoseph() {
  return <ServiceDocument title={title} intro={intro} path="/about-joseph">
    <JsonLd data={[
      { ...webPageSchema(title, intro, '/about-joseph', 'AboutPage'), mainEntity: { '@id': personId } },
      { '@context': 'https://schema.org', '@type': 'Person', '@id': personId, name: 'Yusuf', alternateName: 'Joseph', url: `${SITE_URL}/about-joseph`, jobTitle: 'Founder and creative marketer', worksFor: { '@id': organizationId }, homeLocation: toronto, image: `${SITE_URL}/joseph.jpg`, sameAs: [IG_URL, 'https://www.instagram.com/quantlarper/'], knowsAbout: ['Short-form video production', 'Video editing', 'Meta advertising', 'Website creation'] },
    ]} />
    <Image src="/joseph.jpg" alt="Joseph wearing the red oval mask used in the studio’s visual identity" width={1000} height={1250} className="mx-auto max-h-[32rem] w-full max-w-sm object-cover" />
    <DocumentSection title="Why the mask?">
      <p>I like work that feels a little strange and stays in your head. The mask and syrup are part of my own visual identity. For your business, the creative still has to explain a real offer and give people a clear next step.</p>
    </DocumentSection>
    <DocumentSection title="Work I can show you">
      <p>My own <Link className="text-neon underline" href="/works/joeroblox85">YouTube channel</Link> has a saved analytics snapshot showing 33.1 million lifetime views. <Link className="text-neon underline" href="/works/quantlarper">Quantlarper</Link> is another founder-owned content project. These show audience-building experience, not client sales.</p>
      <p>For local businesses, see <Link className="text-neon underline" href="/works/dream-alteration">Dream Alterations</Link> for a Meta campaign that started 59 conversations, and <Link className="text-neon underline" href="/works/spartan-gymnastics">Spartan Gymnastics</Link> for short-form reach. Each case includes the limits of what was measured.</p>
    </DocumentSection>
    <DocumentSection title="Working together">
      <p>You speak to me and I make the agreed work. Joseph The Great is a small studio, not a large team with account managers. Monthly work is CAD $700–$1,000 depending on scope; ad spend is separate.</p>
      <p><a href={IG_URL} className="text-neon underline">{IG_HANDLE}</a> · <a href={`mailto:${EMAIL}`} className="text-neon underline break-all">{EMAIL}</a> · <a href={GOOGLE_BUSINESS_URL} className="text-neon underline">Google profile</a></p>
    </DocumentSection>
  </ServiceDocument>;
}
