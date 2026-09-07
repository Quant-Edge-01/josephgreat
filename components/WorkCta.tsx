import { OFFER } from "@/lib/site";
export default function WorkCta({ subject }: { subject: string }) {
  return (
    <div className="border-t border-neon/30 pt-7">
      <p className="t-note text-cream/70">An idea for your business next?</p>
      <a
        href="/#start"
        className="t-grotesk mt-4 inline-flex min-h-14 items-center gap-8 bg-neon px-6 text-xl text-void"
        aria-label={`${OFFER.cta} after reading ${subject}`}
      >
        {OFFER.cta} <span aria-hidden>↗</span>
      </a>
    </div>
  );
}
