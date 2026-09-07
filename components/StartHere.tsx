import EnquiryForm from "./EnquiryForm";
import { EMAIL, IG_HANDLE, IG_URL, mailto } from "@/lib/site";
export default function StartHere({ context = "home" }: { context?: string }) {
  return (
    <section
      id="start"
      className="bg-void px-6 py-14 text-cream md:px-10 md:py-20"
    >
      <div className="grid gap-8 md:grid-cols-2 md:gap-16">
        <div>
          <p className="t-mono text-neon">
            Your business. A fresh pair of eyes.
          </p>
          <h2 className="t-grotesk mt-5 text-[clamp(2.4rem,9vw,5rem)] leading-[.95]">
            3 creative ideas.
            <br />
            <span className="t-serif text-neon">On me.</span>
          </h2>
          <p className="s-body mt-5 max-w-[30ch]">
            Send me your business link. I’ll send back three ideas you can
            actually use.
          </p>
          <p className="t-note mt-4 text-cream/65">Free. No call required.</p>
        </div>
        <div>
          <EnquiryForm context={context} />
          <div className="t-note mt-7 flex flex-wrap gap-x-5 gap-y-3 text-cream/70">
            <a href={IG_URL}>{IG_HANDLE} ↗</a>
            <a href={mailto("3 creative ideas")}>{EMAIL} ↗</a>
          </div>
        </div>
      </div>
    </section>
  );
}
