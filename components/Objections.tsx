const QA = [
  {
    q: "Are the three ideas really free?",
    a: "Yes. Send your business link and I’ll write three creative ideas for it. Use them yourself, or ask me to make them.",
  },
  {
    q: "Do I have to book a call?",
    a: "No. I can send the ideas by email or WhatsApp. We can talk afterwards if you want to.",
  },
  {
    q: "Will this bring me customers?",
    a: "That’s the aim. We choose a service to promote, make the creative and track enquiries. I can show past results, but I can’t promise yours in advance.",
  },
];
export default function Objections() {
  return (
    <section className="bg-cream px-6 py-10 md:px-10 md:py-14">
      <div className="mx-auto max-w-4xl">
        <h2 className="t-grotesk mb-5 text-2xl">A few fair questions.</h2>
        {QA.map((item) => (
          <details
            key={item.q}
            className="short-detail border-t border-ink/20 py-4"
          >
            <summary>{item.q}</summary>
            <p className="s-body mt-3 max-w-[55ch] text-ash">{item.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
