"use client";
import { useState } from "react";
import Link from "next/link";
import { WORKS } from "@/lib/works";
import { CASE_NOTES } from "@/lib/case-notes";
export default function CaseCards() {
  const [open, setOpen] = useState<string | null>(null);
  return (
    <section
      id="work"
      className="bg-void px-6 py-14 text-cream md:px-10 md:py-20"
    >
      <div className="mb-8 flex items-end justify-between gap-4">
        <h2 className="t-grotesk text-[clamp(2rem,7vw,4rem)]">
          The case <span className="t-serif text-neon">files.</span>
        </h2>
        <span className="t-mono text-cream/65">04 on record</span>
      </div>
      <div className="case-archive">
        {WORKS.map((w, i) => {
          const expanded = open === w.slug;
          const note = CASE_NOTES[w.slug];
          return (
            <article key={w.slug} className="case-file" data-open={expanded}>
              <h3>
                <button
                  type="button"
                  aria-expanded={expanded}
                  aria-controls={`case-${w.slug}`}
                  onClick={() => setOpen(expanded ? null : w.slug)}
                  className="case-trigger"
                >
                  <span className="t-mono case-index">
                    CASE {String(i + 1).padStart(3, "0")}
                  </span>
                  <span className="t-grotesk case-name">{w.title}</span>
                  <span className="t-mono case-kind">
                    {w.local ? "Toronto / GTA" : "Own project"}
                  </span>
                  <span className="t-mono case-action">
                    {expanded ? "Close −" : "View case +"}
                  </span>
                </button>
              </h3>
              <div
                id={`case-${w.slug}`}
                hidden={!expanded}
                className="case-content"
              >
                {expanded && (
                  <>
                    <div>
                      <p className="t-mono text-neon">{w.client}</p>
                      <dl className="mt-6 space-y-5">
                        <div>
                          <dt className="t-mono text-cream/60">The brief</dt>
                          <dd className="s-body mt-2">{note.problem}</dd>
                        </div>
                        <div>
                          <dt className="t-mono text-cream/60">What I made</dt>
                          <dd className="s-body mt-2">{note.work}</dd>
                        </div>
                      </dl>
                      <p className="t-grotesk mt-7 text-4xl text-neon">
                        {note.result}
                      </p>
                      <p className="t-note mt-2 text-cream/75">{note.label}</p>
                      <p className="t-note mt-4 text-cream/60">{note.limit}</p>
                      <Link
                        href={`/works/${w.slug}`}
                        className="t-mono mt-7 inline-flex min-h-11 items-center border-b border-neon text-neon"
                      >
                        Open full file ↗
                      </Link>
                    </div>
                    <figure>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={w.images[0].src}
                        alt={w.images[0].alt}
                        width={w.images[0].w}
                        height={w.images[0].h}
                        loading="lazy"
                        decoding="async"
                        className="w-full border border-neon/25 object-contain"
                      />
                      <figcaption className="t-note mt-3 text-cream/65">
                        {w.images[0].caption}
                      </figcaption>
                    </figure>
                  </>
                )}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
