import Image from 'next/image';
import Link from 'next/link';
import { EMAIL, IG_URL, IG_HANDLE, SITE_URL } from '@/lib/site';
import { pageMetadata, webPageSchema, personId, organizationId, toronto } from '@/lib/seo';
import JsonLd from '@/components/JsonLd';
import { ServiceDocument, DocumentSection } from '@/components/ServiceDocument';

const title = 'Joseph, the person behind Joseph The Great';
const intro = 'I’m Yusuf Yakubov, known as Joseph, a Toronto creator and the founder of Joseph The Great. I make reels, Meta ads and websites for small businesses. You speak to me, and I do the work.';
export const metadata = pageMetadata('About Joseph | Toronto Creator & Joseph The Great Founder', 'Meet the Toronto creator behind Joseph The Great. Explore his YouTube channel, Quantlarper Instagram project and local marketing cases, with saved result screenshots.', '/about-joseph');
export default function AboutJoseph() {
  return <ServiceDocument title={title} intro={intro} path="/about-joseph">
    <JsonLd data={[
      { ...webPageSchema(title, intro, '/about-joseph', 'AboutPage'), mainEntity: { '@id': personId } },
      { '@context': 'https://schema.org', '@type': 'Person', '@id': personId, name: 'Yusuf Yakubov', alternateName: 'Joseph', url: `${SITE_URL}/about-joseph`, jobTitle: 'Founder and creative marketer', worksFor: { '@id': organizationId }, homeLocation: toronto, image: `${SITE_URL}/joseph.jpg`, sameAs: [IG_URL, 'https://www.instagram.com/quantlarper/'], knowsAbout: ['Short-form video production', 'Video editing', 'Meta advertising', 'Website creation'] },
    ]} />
    <Image src="/joseph.jpg" alt="Joseph wearing the red oval mask used in Joseph The Great’s visual identity" width={1000} height={1250} className="max-h-[32rem] w-full max-w-sm object-cover" />
    <DocumentSection title="A creator before a studio">
      <p>I started making content as a kid. As of September 2026, I’m 19 and have approximately seven years of content-making experience. That is my own account of my background; the work below is where you can inspect the results.</p>
      <p>The glossy red mask, syrup jar and surreal visuals are part of the studio’s identity. For a client, the creative still needs to explain a real offer and give people a clear next step.</p>
    </DocumentSection>
    <DocumentSection title="YouTube: Joeroblox85">
      <p>I built my own Roblox content channel. The saved YouTube Studio screenshot shows 33,134,030 lifetime views and +324.4K in the subscribers metric. Those are historical analytics, not a live subscriber count.</p>
      <p>The portfolio also records a Short with about 8.49 million views and a YouTube Silver Creator Award. I use that experience with concepts, hooks and pacing in my creative work. Children’s entertainment reach is not proof of local business sales.</p>
      <Link className="inline-block py-2 text-neon underline" href="/works/joeroblox85">See the YouTube analytics and award →</Link>
    </DocumentSection>
    <DocumentSection title="Instagram: Quantlarper">
      <p><a href="https://www.instagram.com/quantlarper/" className="text-neon underline">@quantlarper</a> is my own content project connected to a market tool. The saved profile snapshot reports 1.2 million views in 30 days; the reel insights show 1,150,970 views on one reel.</p>
      <p>The case reports no ad spend and 175 active email subscribers. Subscribers are not paying customers. This is an organic audience example, separate from the studio’s client work.</p>
      <Link className="inline-block py-2 text-neon underline" href="/works/quantlarper">See the Quantlarper case →</Link>
    </DocumentSection>
    <DocumentSection title="Local business work">
      <p><Link className="text-neon underline" href="/works/dream-alteration">Dream Alterations</Link> is the GTA bridal case, with saved Meta evidence of 59 messaging conversations from CAD $214.86 in spend. Nine leads reported; bookings and revenue were not tracked.</p>
      <p><Link className="text-neon underline" href="/works/spartan-gymnastics">Spartan Gymnastics</Link> is the local content example: 9,224 views in two weeks, including 74.9% from non-followers. Enrolments were not measured.</p>
    </DocumentSection>
    <DocumentSection title="Is this a freelancer or an agency?"><p>Joseph The Great is a one-person creative marketing studio. You work directly with Yusuf Yakubov, known as Joseph, on concepts, production and the agreed campaign or website tasks. It is a small studio rather than a large team with separate account managers.</p></DocumentSection>
    <DocumentSection title="Find me and the studio">
      <p>Joseph The Great is based in Toronto, Ontario, and serves businesses in Toronto and the GTA.</p>
      <p>Studio Instagram: <a href={IG_URL} className="text-neon underline">{IG_HANDLE}</a><br />Email: <a href={`mailto:${EMAIL}`} className="text-neon underline break-all">{EMAIL}</a></p>
      <p><Link className="text-neon underline" href="/toronto-marketing">Services for Toronto businesses</Link> · <Link className="text-neon underline" href="/affordable-marketing-toronto">Pricing and scope</Link></p>
    </DocumentSection>
  </ServiceDocument>;
}
