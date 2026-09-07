import { IG_HANDLE, IG_URL } from "@/lib/site";
export default function Founder() {
  return (
    <section
      id="joseph"
      className="bg-void px-6 py-14 text-cream md:px-10 md:py-20"
    >
      <div className="grid items-center gap-7 md:grid-cols-[12rem_1fr] md:gap-12">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/joseph.jpg"
          alt="Joseph wearing his red oval mask"
          width="648"
          height="810"
          loading="lazy"
          decoding="async"
          className="h-40 w-32 border border-neon/30 object-cover md:h-60 md:w-48"
        />
        <div>
          <p className="t-mono text-neon">One person. Toronto.</p>
          <h2 className="t-grotesk mt-4 text-[clamp(2rem,7vw,3.5rem)]">
            I’m Joseph.
            <span className="t-serif text-neon"> Yes, a real person.</span>
          </h2>
          <p className="s-body mt-5 max-w-[48ch]">
            I’ve been making videos since I was eleven. Now I make content, ads
            and websites for businesses. You talk to me. I do the work.
          </p>
          <a
            className="t-mono mt-6 inline-flex min-h-11 items-center text-neon"
            href={IG_URL}
          >
            {IG_HANDLE} ↗
          </a>
        </div>
      </div>
    </section>
  );
}
