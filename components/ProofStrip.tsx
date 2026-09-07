export default function ProofStrip() {
  return (
    <section
      id="proof"
      className="border-y border-neon/20 bg-void-2 px-6 py-7 text-cream md:px-10"
    >
      <div className="flex flex-col justify-between gap-3 md:flex-row md:items-center">
        <p className="t-mono text-cream/70">Dream Alterations · GTA bridal</p>
        <p className="s-body">
          <strong className="text-neon">$214.86</strong> in ads.{" "}
          <strong className="text-neon">59</strong> conversations.
        </p>
        <a
          className="t-mono w-fit border-b border-neon/60 py-2 text-neon"
          href="/works/dream-alteration"
        >
          See the receipts ↗
        </a>
      </div>
    </section>
  );
}
