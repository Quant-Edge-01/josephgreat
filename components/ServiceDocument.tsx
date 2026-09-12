import Link from 'next/link';
import { OFFER, PRICE_RANGE } from '@/lib/site';
import JsonLd from './JsonLd';
import { breadcrumbs } from '@/lib/seo';

export function ServiceDocument({ title, intro, path, children }: { title: string; intro: string; path: string; children: React.ReactNode }) {
  return <main id="main" tabIndex={-1} data-nav-dark className="min-h-screen bg-void px-6 pb-20 pt-28 text-cream md:px-10 md:pt-36">
    <JsonLd data={breadcrumbs([{ name: 'Home', path: '/' }, ...(path === '/toronto-marketing' ? [] : [{ name: 'Toronto marketing', path: '/toronto-marketing' }]), { name: title, path }])} />
    <div className="mx-auto max-w-5xl">
      <nav aria-label="Breadcrumb" className="t-mono flex flex-wrap gap-x-4 gap-y-3 text-neon">
        <Link href="/" className="underline underline-offset-4">Home</Link>
        {path !== '/toronto-marketing' && <Link href="/toronto-marketing" className="underline underline-offset-4">Toronto marketing</Link>}
        <span className="text-cream/70">{title}</span>
      </nav>
      <header className="pb-12 pt-10 md:pb-16">
        <p className="t-mono text-neon">Joseph The Great · Toronto / GTA</p>
        <h1 className="t-grotesk mt-5 max-w-4xl text-[clamp(2.3rem,7vw,5.2rem)] leading-[1.02]">{title}</h1>
        <p className="s-body mt-7 max-w-3xl text-cream/85">{intro}</p>
        <p className="t-mono mt-6 text-neon">{PRICE_RANGE} CAD / month · scope agreed · ad spend separate</p>
      </header>
      <div className="space-y-12">{children}</div>
      <section className="mt-14 border-t border-neon/25 pt-9" aria-labelledby="next-step">
        <h2 id="next-step" className="t-serif text-4xl text-neon">An idea for your business?</h2>
        <p className="s-body mt-4 max-w-2xl text-cream/80">Send me your business link. I’ll send back three creative ideas. Free, with no call required.</p>
        <Link href="/#start" className="t-grotesk mt-6 inline-flex min-h-[52px] items-center bg-neon px-6 text-void">{OFFER.cta} →</Link>
        <p className="t-note mt-4 text-cream/70"><Link href="/affordable-marketing-toronto" className="underline underline-offset-4">How the price and scope work</Link> · <Link href="/about-joseph" className="underline underline-offset-4">Meet Joseph</Link></p>
      </section>
    </div>
  </main>;
}

export function DocumentSection({ title, children }: { title: string; children: React.ReactNode }) {
  return <section className="border-t border-neon/25 pt-7"><h2 className="t-grotesk text-2xl md:text-3xl">{title}</h2><div className="s-body mt-5 max-w-3xl space-y-4 text-cream/80">{children}</div></section>;
}
