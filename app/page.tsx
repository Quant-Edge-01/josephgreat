import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import EnquiryForm from "@/components/EnquiryForm";
import MaskObject from "@/components/MaskObject";
import SyrupJourney from "@/components/SyrupJourney";
import { EMAIL, IG_HANDLE, IG_URL, PRICE_RANGE, mailto } from "@/lib/site";
import "./home.css";

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
            <p>Give me two minutes. You&apos;ll know what I make, what it costs, and whether we&apos;re your kind of weird.</p>
            <a href="#what" className="home-round-link" aria-label="Scroll to what Joseph does">↓</a>
          </div>
        </div>
      </section>

      <div className="home-story" id="what">
        <SyrupJourney />
        <section className="home-intro home-pad" aria-labelledby="home-what-title">
          <p className="home-label">01 / THE SHORT VERSION</p>
          <h2 id="home-what-title">Not another<br /><em>“we do everything”</em><br />agency.</h2>
          <p className="home-lead">I&apos;m Joseph. I make your business look impossible to scroll past — then give people somewhere useful to go.</p>
          <p className="home-body">That can mean a strange Reel, an ad people actually want to watch, or a simple page that makes it easy to get in touch. The idea comes first. The useful part comes right after.</p>
        </section>

        <section className="home-services home-pad" id="offer" aria-labelledby="home-services-title">
          <p className="home-label">02 / WHAT I ACTUALLY DO</p>
          <h2 id="home-services-title">Make the thing.<br /><em>Make it work.</em></h2>
          <div className="home-service-list">
            <div><span>01</span><h3>Short-form video</h3><p>Reels with a reason to stop scrolling. Ideas, filming and editing are scoped together.</p></div>
            <div><span>02</span><h3>Meta ads</h3><p>Creative and campaigns built around a real offer, with conversations and enquiries tracked where possible.</p></div>
            <div><span>03</span><h3>Websites</h3><p>Focused landing pages that explain your offer and make the next step obvious. Quoted as a separate project.</p></div>
          </div>
          <p className="home-pricing"><strong>{PRICE_RANGE} CAD</strong> / month for an agreed ongoing scope. Ad spend is separate.</p>
          <Link className="home-text-link" href="/affordable-marketing-toronto">See pricing and scope ↗</Link>
        </section>
      </div>

      <section className="home-proof home-pad" id="work" aria-labelledby="home-proof-title">
        <p className="home-label">03 / REAL WORK. REAL LIMITS.</p>
        <h2 id="home-proof-title">The numbers can talk.<br /><em>They just shouldn&apos;t exaggerate.</em></h2>
        <div className="home-case home-case-dream">
          <div className="home-case-image"><Image src="/works/dream-alteration/04.png" width={1600} height={1053} alt="Meta Ads Manager screenshot showing CAD 214.86 spent and 59 messaging conversations started" sizes="(max-width: 800px) 100vw, 44vw" /></div>
          <div className="home-case-copy">
            <p className="home-label">DREAM ALTERATIONS / GTA BRIDAL CLIENT</p>
            <p className="home-big-number">59<span> conversations</span></p>
            <p className="home-body">CAD $214.86 in Meta ad spend. CAD $3.64 per conversation started. Nine qualified leads were reported by the owner.</p>
            <p className="home-small">Conversations are not bookings or sales; those outcomes were not tracked in this snapshot. Dream Alterations has been an ongoing client since January 2026.</p>
            <Link href="/works/dream-alteration" className="home-text-link">See the case and screenshots ↗</Link>
          </div>
        </div>
        <div className="home-proof-mini">
          <p><strong>501,539</strong><span>organic views on a Dream Alterations Reel. Reach, not revenue.</span></p>
          <p><strong>9,224</strong><span>views in two weeks for Spartan Gymnastics; 74.9% from non-followers, CAD $0 ad spend. Enrolments unmeasured.</span></p>
        </div>
        <Link href="/case-studies" className="home-text-link home-all-cases">All case studies ↗</Link>
      </section>

      <section className="home-founder home-pad" id="joseph" aria-labelledby="home-founder-title">
        <p className="home-label">04 / THE PERSON BEHIND THE MASK</p>
        <MaskObject />
        <h2 id="home-founder-title">Small studio.<br /><em>Actual human.</em></h2>
        <p className="home-lead">I&apos;m Yusuf. Joseph to most people. You talk to me; I make the work.</p>
        <p className="home-body">I&apos;ve made videos since I was eleven and built an audience with my own creator projects. Those are my projects, not agency clients. The local business work above is the proof of what I&apos;m doing for other people.</p>
        <Link href="/about-joseph" className="home-text-link">More about Joseph ↗</Link>
      </section>

      <section className="home-contact home-pad" id="start" aria-labelledby="home-contact-title">
        <p className="home-label">05 / YOUR TURN</p>
        <h2 id="home-contact-title">Let me look at<br /><em>your business.</em></h2>
        <p className="home-lead">Send your Instagram or website. I&apos;ll send back three creative ideas you can actually use. Free, and no call required.</p>
        <div className="home-form"><EnquiryForm context="home" /></div>
        <div className="home-contact-alternatives"><a href={IG_URL}>{IG_HANDLE} ↗</a><a href={mailto("3 creative ideas")}>{EMAIL} ↗</a></div>
      </section>
    </main>
  );
}
