import JsonLd from "@/components/JsonLd";
import { pageMetadata, webPageSchema } from "@/lib/seo";
import { INDUSTRIES } from "@/lib/services";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import BackToSyrup from "@/components/BackToSyrup";
import TrackView from "@/components/TrackView";
import WorkCta from "@/components/WorkCta";
import WorkGallery from "@/components/WorkGallery";
import { RETAINER } from "@/lib/site";
import { WORKS, workBySlug } from "@/lib/works";
import { CASE_NOTES } from "@/lib/case-notes";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return WORKS.map((w) => ({ slug: w.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const w = workBySlug(slug);
  if (!w) return {};
  return pageMetadata(`${w.title} — Joseph The Great`, `${CASE_NOTES[w.slug].problem} ${CASE_NOTES[w.slug].result}. ${CASE_NOTES[w.slug].limit}`, `/works/${w.slug}`, w.cover);
}

export default async function WorkPage({ params }: Params) {
  const { slug } = await params;
  const w = workBySlug(slug);
  if (!w) notFound();

  const next =
    WORKS[(WORKS.findIndex((x) => x.slug === w.slug) + 1) % WORKS.length];

  return (
    <main
      id="main"
      data-nav-dark
      className="relative min-h-screen bg-void pb-24"
    >
      {/* still inside the jar: amber bleeding in from the top edge */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[70vh] bg-[radial-gradient(70%_100%_at_50%_0%,rgba(224,151,43,0.16),rgba(8,7,10,0)_72%)]"
      />

      <JsonLd data={webPageSchema(`${w.title} — case study`, `${CASE_NOTES[w.slug].problem} ${CASE_NOTES[w.slug].result}. ${CASE_NOTES[w.slug].limit}`, `/works/${w.slug}`)} />
      <TrackView id={w.slug} />
      <BackToSyrup />

      <div className="relative px-6 md:px-10">
        <header className="pb-16 pt-14 md:pb-24 md:pt-24">
          <div className="t-mono flex flex-wrap items-baseline gap-x-5 gap-y-2 text-neon">
            <span>file {w.n}</span>
            <span className="text-cream/70">{w.kind}</span>
          </div>

          <h1 className="t-grotesk mt-6 text-[clamp(2.6rem,11vw,7rem)] leading-[0.85] text-cream">
            {w.title}
          </h1>

          <p className="t-serif s-mid mt-6 max-w-[38rem] text-neon/90">
            {CASE_NOTES[w.slug].result} — {CASE_NOTES[w.slug].label}
          </p>
          <p className="t-mono mt-5 text-cream/70">{w.client}</p>
          {w.current && (
            <p className="t-mono mt-4 inline-block border border-acid/50 px-3.5 py-2.5 text-acid">
              <span
                aria-hidden
                className="mr-2.5 inline-block h-2 w-2 translate-y-[-1px] rounded-full bg-acid align-middle"
              />
              current client · since {w.since} · ${RETAINER.monthly}/month
            </p>
          )}
        </header>

        {/* the receipts, before the prose */}
        <dl className="grid grid-cols-2 border-t border-neon/25 md:grid-cols-4">
          {w.stats.map((s) => (
            <div
              key={s.label}
              className="border-b border-r border-neon/25 py-6 pr-4 last:border-r-0 md:py-8"
            >
              <dt className="t-grotesk text-[clamp(1.5rem,5.2vw,2.6rem)] leading-none text-cream">
                {s.value}
              </dt>
              <dd className="t-mono mt-2.5 text-cream/70">{s.label}</dd>
            </div>
          ))}
        </dl>

        <dl className="mt-10 grid max-w-4xl gap-7 md:grid-cols-2">
          <div>
            <dt className="t-mono text-neon">The brief</dt>
            <dd className="s-body mt-3 text-cream/80">
              {CASE_NOTES[w.slug].problem}
            </dd>
          </div>
          <div>
            <dt className="t-mono text-neon">What I made</dt>
            <dd className="s-body mt-3 text-cream/80">
              {CASE_NOTES[w.slug].work}
            </dd>
          </div>
        </dl>
        <p className="t-note my-10 max-w-3xl text-cream/65">
          {CASE_NOTES[w.slug].limit} Figures are from the saved campaign
          screenshots.
        </p>
        <WorkGallery images={w.images} />

        {w.link && (
          <a
            href={w.link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="t-mono mt-16 inline-flex items-center gap-3 border border-neon/40 px-5 py-4 text-neon transition-colors duration-300 hover:bg-neon hover:text-void md:mt-24"
          >
            {w.link.label}
            <span aria-hidden>↗</span>
          </a>
        )}

        <nav aria-label="Related services" className="t-mono mt-12 flex flex-wrap gap-x-6 gap-y-4 text-neon">
          <Link href="/toronto-marketing" className="underline underline-offset-4">Toronto marketing services</Link>
          {INDUSTRIES.filter(page => page.proofSlug === w.slug).map(page => <Link key={page.slug} href={`/services/${page.slug}`} className="underline underline-offset-4">{page.name}</Link>)}
        </nav>
        <div className="mt-24 md:mt-36">
          <WorkCta subject={w.title} />
        </div>

        <nav className="mt-20 border-t border-neon/20 pt-6 md:mt-28">
          <Link href={`/works/${next.slug}`} className="group block">
            <span className="t-mono text-cream/70">next file — {next.n}</span>
            <span className="s-loud t-grotesk mt-2 block text-cream/80 transition-transform duration-500 group-hover:translate-x-3">
              {next.title} →
            </span>
          </Link>
        </nav>
      </div>
    </main>
  );
}
