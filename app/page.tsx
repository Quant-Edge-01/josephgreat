import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import EnquiryForm from "@/components/EnquiryForm";
import MaskObject from "@/components/MaskObject";
import SyrupJourney from "@/components/SyrupJourney";
import { EMAIL, IG_HANDLE, IG_URL, PRICE_RANGE, mailto } from "@/lib/site";
import "./home.css";

const featured = [
  { name: "Dream Alterations", type: "GTA bridal client", result: "501.5K", detail: "organic views on one Reel", extra: "Separate Meta campaign: 59 conversations on CAD $214.86.", slug: "dream-alteration", image: "02.jpg", width: 1600, height: 1368, alt: "Dream Alterations Reel insights showing 501,539 views" },
  { name: "Quant Larper", type: "Founder project", result: "1.2M", detail: "Instagram views in 30 days · $0 ad spend", extra: "25 paid purchases, reported by Yusuf. Channel attribution unverified.", slug: "quantlarper", image: "02.jpg", width: 736, height: 1600, alt: "Quant Larper Instagram snapshot showing 1.2 million views" },
  { name: "TikTok side project", type: "Two-person collaboration", result: "74.9K", detail: "views by the next day · $0 ad spend", extra: "From zero to 1,438 followers.", slug: "tiktok-collaboration", image: "november-18.webp", width: 900, height: 692, alt: "TikTok Studio screenshot showing 74.9K views" },
];

export const metadata: Metadata = { alternates: { canonical: "/" } };

export default function Page() {
  return (
    <main id="main" className="home-recut" tabIndex={-1}>
      <section className="home-hero" aria-labelledby="home-title">
        <div className="home-hero-inner">
          <p className="home-kicker">Joseph The Great / Toronto, Canada</p>
          <h1 id="home-title">Your business called.<br /><em>It wants to be noticed.</em></h1>
          <p className="home-hero-plain">A one-person creative marketing studio making Reels, Meta ads and websites for Toronto and GTA small businesses.</p>
          <div className="home-portrait-wrap">
            <span className="home-portrait-orbit" aria-hidden="true" />
            <Image src="/joseph.jpg" alt="Joseph, founder of Joseph The Great, wearing his red oval mask" width={1000} height={1250} priority className="home-portrait" />
            <span className="home-portrait-stamp" aria-hidden="true">GOOD IDEAS<br />LOOK STRANGE<br />AT FIRST.</span>
          </div>
          <div className="home-hero-bottom">
            <p>Give me two minutes. See the work and decide if we&apos;re your kind of weird.</p>
            <a href="#work" className="home-round-link" aria-label="Jump to selected work">↓</a>
          </div>
        </div>
      </section>

      <div className="home-story" id="what">
        <SyrupJourney />
        <section className="home-intro home-pad" aria-labelledby="home-what-title">
          <h2 id="home-what-title">Not another<br /><em>“we do everything”</em><br />agency.</h2>
          <p className="home-lead">I&apos;m Joseph. I make your business look impossible to scroll past — then give people somewhere useful to go.</p>
        </section>

        <section className="home-services home-pad" id="offer" aria-labelledby="home-services-title">
          <h2 id="home-services-title">Make the thing.<br /><em>Make it work.</em></h2>
          <div className="home-service-list">
            <div><span>01</span><h3>Short-form video</h3><p>Reels with a reason to stop scrolling. Ideas, filming and editing.</p></div>
            <div><span>02</span><h3>Meta ads</h3><p>Campaigns built around a clear offer.</p></div>
            <div><span aria-hidden="true">03</span><h3>Websites</h3><p>Landing pages with a clear next step. Quoted separately.</p></div>
            <div><span aria-hidden="true">04</span><h3><Link href="/ai-search-toronto">AI search / GEO ↗</Link></h3><p>Help AI search understand what you sell and where you work.</p></div>
          </div>
          <p className="home-pricing"><strong>{PRICE_RANGE} CAD</strong> / month for an agreed ongoing scope. Ad spend is separate.</p>
          <Link className="home-text-link" href="/affordable-marketing-toronto">See pricing and scope ↗</Link>
        </section>
      </div>

      <section className="home-proof home-pad" id="work" aria-labelledby="home-proof-title">
        <h2 id="home-proof-title">Good weird.<br /><em>Real numbers.</em></h2>
        <div className="home-evidence-grid">
          {featured.map(item => <article className="home-evidence" key={item.slug}>
            <Link href={`/works/${item.slug}`} className="home-evidence-link">
              <div className="home-evidence-frame">
                <Image src={`/works/${item.slug}/${item.image}`} width={item.width} height={item.height} sizes="(min-width: 851px) 330px, (min-width: 621px) 45vw, 88vw" alt={item.alt} />
              </div>
              <div className="home-evidence-copy">
                <p className="home-label">{item.type}</p>
                <h3>{item.name} <span aria-hidden="true">↗</span></h3>
                <p className="home-evidence-stat"><strong>{item.result}</strong> {item.detail}</p>
                <p>{item.extra}</p>
              </div>
            </Link>
          </article>)}
        </div>
        <div className="home-more-proof">
          <Link href="/works/joeroblox85">My YouTube · <strong>33.1M lifetime views</strong> ↗</Link>
          <Link href="/works/spartan-gymnastics">Spartan Gymnastics · <strong>9,224 organic views</strong> ↗</Link>
        </div>
        <Link href="/case-studies" className="home-text-link home-all-cases">All case studies ↗</Link>
      </section>

      <section className="home-founder home-pad" id="joseph" aria-labelledby="home-founder-title">
        <MaskObject />
        <h2 id="home-founder-title">Small studio.<br /><em>Actual human.</em></h2>
        <p className="home-lead">I&apos;m Yusuf. Joseph to most people. You talk to me; I make the work.</p>
        <p className="home-body">I&apos;ve made videos since I was eleven. I work directly with small businesses across Toronto and the GTA.</p>
        <Link href="/about-joseph" className="home-text-link">More about Joseph ↗</Link>
      </section>

      <section className="home-contact home-pad" id="start" aria-labelledby="home-contact-title">
        <h2 id="home-contact-title">Let me look at<br /><em>your business.</em></h2>
        <p className="home-lead">Send your Instagram or website. I&apos;ll send back three creative ideas you can actually use. Free, and no call required.</p>
        <div className="home-form"><EnquiryForm context="home" /></div>
        <div className="home-contact-alternatives"><a href={IG_URL}>{IG_HANDLE} ↗</a><a href={mailto("3 creative ideas")}>{EMAIL} ↗</a></div>
      </section>
    </main>
  );
}
