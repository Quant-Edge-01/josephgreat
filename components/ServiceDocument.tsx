import Link from 'next/link';
import { OFFER, PRICE_RANGE, EMAIL, IG_URL } from '@/lib/site';
import { DISCOVERY_SERVICES } from '@/lib/discovery-services';
import EnquiryForm from './EnquiryForm';
import JsonLd from './JsonLd';
import { breadcrumbs } from '@/lib/seo';

export function ServiceDocument({ title, intro, path, children }: { title: string; intro: string; path: string; children: React.ReactNode }) {
  return <main id="main" tabIndex={-1} data-nav-dark className="min-h-screen bg-void px-6 pb-24 pt-28 text-cream md:px-10 md:pt-36">
    <JsonLd data={breadcrumbs([{ name: 'Home', path: '/' }, ...(path === '/toronto-marketing' ? [] : [{ name: 'Toronto marketing', path: '/toronto-marketing' }]), { name: title, path }])} />
    <div className="mx-auto max-w-6xl">
      <nav aria-label="Breadcrumb" className="t-mono mx-auto flex max-w-4xl flex-wrap justify-center gap-x-4 gap-y-3 text-neon">
        <Link href="/" className="underline underline-offset-4">Home</Link>
        {path !== '/toronto-marketing' && <Link href="/toronto-marketing" className="underline underline-offset-4">Toronto marketing</Link>}
      </nav>
      <header className="mx-auto max-w-4xl pb-24 pt-16 text-center md:pb-32 md:pt-24">
        <p className="t-mono text-neon">Joseph The Great · Toronto / GTA</p>
        <h1 className="t-grotesk mt-6 text-[clamp(2.7rem,7vw,6.5rem)] leading-[.98]">{title}</h1>
        <p className="mx-auto mt-9 max-w-2xl text-[clamp(1.15rem,2vw,1.5rem)] leading-relaxed text-cream/85">{intro}</p>
        <p className="mt-7 text-base text-neon">{PRICE_RANGE} CAD / month · scope agreed · ad spend separate</p>
      </header>
      <div className="space-y-16 md:space-y-24">{children}</div>
      <section className="mx-auto mt-28 max-w-3xl border-t border-neon/25 pt-16 text-center md:mt-36" aria-labelledby="next-step">
        <h2 id="next-step" className="t-serif text-[clamp(2.6rem,6vw,4.5rem)] leading-none text-neon">An idea for your business?</h2>
        <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-cream/80">Send me your business link. I’ll send back three creative ideas. Free, with no call required.</p>
        <Link href="#request-ideas" className="t-grotesk mt-8 inline-flex min-h-[56px] items-center bg-neon px-7 text-void">{OFFER.cta} →</Link>
        <div id="request-ideas" className="mx-auto mt-14 max-w-[34rem] scroll-mt-28 text-left"><EnquiryForm /></div>
        <p className="mt-7 flex flex-wrap justify-center gap-5 text-base"><a className="py-2 text-neon underline break-all" href={`mailto:${EMAIL}`}>Email Joseph</a><a className="py-2 text-neon underline" href={IG_URL}>DM on Instagram</a></p>
      </section>
      <details className="mx-auto mt-20 max-w-3xl border-t border-neon/25 pt-5 text-center">
        <summary className="cursor-pointer py-3 text-base text-neon">More services and evidence</summary>
        <nav aria-label="Explore services and evidence" className="mt-4 flex flex-wrap justify-center gap-x-6 gap-y-4 text-sm text-cream/80">{DISCOVERY_SERVICES.map(service => <Link key={service.slug} href={`/${service.slug}`} className="py-2 hover:text-neon">{service.title}</Link>)}<Link href="/case-studies" className="py-2 hover:text-neon">Case studies</Link><Link href="/service-areas" className="py-2 hover:text-neon">Service areas</Link></nav>
      </details>
    </div>
  </main>;
}

export function DocumentSection({ title, children }: { title: string; children: React.ReactNode }) {
  return <section className="mx-auto max-w-4xl border-t border-neon/25 pt-10 md:pt-12"><h2 className="t-grotesk text-[clamp(1.8rem,3vw,2.8rem)] leading-tight">{title}</h2><div className="mt-7 space-y-5 text-[clamp(1.05rem,1.5vw,1.22rem)] leading-[1.65] text-cream/80">{children}</div></section>;
}
