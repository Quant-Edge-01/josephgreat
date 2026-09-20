import { pageMetadata } from "@/lib/seo";
import type { Metadata } from "next";
import Link from "next/link";
import { EMAIL, IG_HANDLE, IG_URL, mailto } from "@/lib/site";

/**
 * The privacy policy.
 *
 * Written against what this site actually does rather than from a template.
 * The enquiry form posts to Web3Forms, analytics are Vercel's, the Meta Pixel
 * loads only when NEXT_PUBLIC_META_PIXEL_ID is set, and the only browser
 * storage is three session keys for the entry gate and the sound toggle. A
 * policy that listed cookies this site does not set, or omitted the processor
 * that actually receives every enquiry, would be worse than no policy — it is
 * the one page on a site whose whole job is being accurate.
 *
 * Dark, like every other page here. The fixed nav is transparent with cream
 * links until the page scrolls, so a light background would leave the header
 * unreadable for the first 24px of scroll on the one page most likely to be
 * opened cold from an ad review or a lead form.
 *
 * Voice follows the rest of the site: "Joseph The Great" as the business, "I"
 * for the person. The Founder section states outright that there is no team
 * and no "we", and a policy that suddenly spoke as a company would read as
 * boilerplate pasted from somewhere else.
 */

export const metadata: Metadata = pageMetadata(
  "Privacy Policy | Joseph The Great",
  "How Joseph The Great collects, uses and stores information from enquiries, contact forms, Meta lead forms and website analytics.",
  "/privacy-policy",
);

/** Shown in the header and at the foot of the policy. */
const UPDATED = "7 September 2026";

function Section({
  n,
  title,
  children,
}: {
  n: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-t border-neon/15 py-9">
      <p className="t-mono text-neon">{n}</p>
      <h2 className="t-grotesk mt-3 text-[clamp(1.5rem,4.6vw,2.1rem)] leading-[1.05] text-cream">
        {title}
      </h2>
      <div className="mt-5 space-y-4 text-[1.02rem] leading-relaxed text-cream/80">
        {children}
      </div>
    </section>
  );
}

/** Shared list styling — plain discs, comfortable measure. */
function List({ items }: { items: React.ReactNode[] }) {
  return (
    <ul className="space-y-2.5">
      {items.map((item, i) => (
        <li key={i} className="flex gap-3.5">
          <span aria-hidden className="mt-[0.62em] h-1 w-1 shrink-0 bg-neon" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export default function PrivacyPolicyPage() {
  return (
    <main id="main" tabIndex={-1} data-nav-dark className="min-h-screen bg-void px-6 pb-24 pt-24 md:px-10 md:pt-28">
      <div className="mx-auto max-w-[46rem]">
        <p className="t-mono text-neon">Joseph The Great — Toronto, ON</p>

        <h1 className="t-grotesk mt-5 text-[clamp(2.3rem,9vw,4rem)] leading-[0.92] text-cream">
          Privacy <span className="t-serif font-normal text-neon">policy.</span>
        </h1>

        <p className="t-mono mt-5 text-cream/60">Last updated {UPDATED}</p>

        <div className="mt-8 space-y-4 text-[1.02rem] leading-relaxed text-cream/80">
          <p>
            Joseph The Great is a one-person creative marketing studio based in
            Toronto, Ontario, Canada. This policy explains what information I collect
            when you contact the studio or use this website, what I do with it, and
            how you can ask to see or remove it.
          </p>
          <p className="text-cream">
            I do not sell personal information, and I do not share it with anyone for
            their own marketing.
          </p>
        </div>

        <Section n="01" title="Information we collect">
          <p>
            Most of what I hold is information you chose to send me. Depending on how
            you get in touch — the form on this site, email, Instagram, or a lead form
            on Facebook or Instagram — that may include:
          </p>
          <List
            items={[
              "Your name",
              "Your email address",
              "Your phone number, if you provide one",
              "Your business name",
              "Your website, Instagram handle or other social accounts",
              "How you say you found Joseph The Great, if you choose to answer",
              "Anything you choose to tell me about your business — what you sell, what you are promoting, what you have tried before",
            ]}
          />
          <p>
            The enquiry form on this site asks for fewer fields than that list: a
            social account or website, one way to reply to you (an email address or a
            phone number), an optional source question, and a short note about what you are promoting. The wider
            list exists because enquiries also arrive by email, by Instagram message
            and through Meta lead forms, where more may be included.
          </p>
          <p>
            The website also records limited technical information through analytics —
            see <span className="text-cream">Cookies and analytics</span> below. That
            information is about pages and visits, not about you by name.
          </p>
        </Section>

        <Section n="02" title="How we use information">
          <p>Information you send is used to:</p>
          <List
            items={[
              "Reply to your enquiry",
              "Work out whether Joseph The Great can actually help your business, and tell you if the answer is no",
              "Deliver the creative and marketing work you have asked for",
              "Stay in touch about work in progress, or work we have discussed",
              "Understand which pages and campaigns bring people here, so the site and the advertising can be improved",
            ]}
          />
          <p className="text-cream">
            That is the whole list. Personal information is not sold, rented, or
            traded, and it is not passed to third parties for their own marketing
            purposes.
          </p>
        </Section>

        <Section n="03" title="Meta, Facebook and Instagram lead forms">
          <p>
            Joseph The Great advertises on Facebook and Instagram, and some of those
            ads use Meta&apos;s built-in lead forms — the form that opens inside the app
            rather than sending you to this website.
          </p>
          <p>
            When you submit one of those forms, the details you entered are passed to
            Joseph The Great by Meta. Once I receive them, they are handled exactly as
            this policy describes: used to reply to you and to assess and deliver the
            work, and not sold or shared for anyone else&apos;s marketing.
          </p>
          <p>
            What Meta itself does with your information — before it reaches me, and on
            its own platforms — is governed by Meta&apos;s policies, not by this one.
            That includes how the form is presented to you, how Meta stores the
            submission, and how your activity is used on Facebook and Instagram. If you
            want to know or change how Meta handles your data, that has to be done
            through Meta&apos;s own privacy settings and policies.
          </p>
        </Section>

        <Section n="04" title="Cookies and analytics">
          <p>
            This site does not set advertising cookies of its own, and there is no
            cookie banner because there is nothing here to consent to beyond what is
            described below.
          </p>
          <List
            items={[
              <>
                <span className="text-cream">Browser storage for preferences.</span>{" "}
                The site stores a few small values in your browser to remember that you
                have passed the opening screen and whether you turned the soundtrack on
                or off. These last for the current browsing session only, never leave
                your device, and are not used to identify or track you.
              </>,
              <>
                <span className="text-cream">Vercel Analytics.</span> Aggregate page
                analytics — which pages were viewed, roughly where visits came from,
                what kind of device. It does not use cookies and does not build a
                profile of individual visitors.
              </>,
              <>
                <span className="text-cream">Meta Pixel.</span> When advertising is
                running, this site may load Meta&apos;s pixel, which records page views
                and enquiry submissions so ad performance can be measured. The pixel
                can set cookies in your browser and reports to Meta. It records that an
                enquiry was submitted — not the contents of what you typed.
              </>,
            ]}
          />
          <p>
            You can block all of this with browser settings, tracking protection, or an
            ad blocker. Nothing on this site breaks if you do; the form still submits
            and every page still works.
          </p>
        </Section>

        <Section n="05" title="Third-party services">
          <p>
            Running a website means a small number of other companies necessarily touch
            some of this information. The ones that do:
          </p>
          <List
            items={[
              <>
                <span className="text-cream">Vercel</span> — hosts this website and
                provides its analytics.
              </>,
              <>
                <span className="text-cream">Web3Forms</span> — receives submissions
                from the enquiry form on this site and delivers them to my inbox.
              </>,
              <>
                <span className="text-cream">Meta Platforms</span> — Facebook and
                Instagram, for advertising, lead forms, and messages you send me there.
              </>,
              <>
                <span className="text-cream">My email provider</span> — because every
                enquiry ends up as an email I read and reply to.
              </>,
            ]}
          />
          <p>
            These companies process information on the studio&apos;s behalf, or, in
            Meta&apos;s case, under their own policies as well. Some of them operate
            outside Canada, which means information may be stored or processed in other
            countries, including the United States, and may be subject to the laws of
            those countries.
          </p>
        </Section>

        <Section n="06" title="Data retention">
          <p>
            Enquiries are kept for as long as they are useful for the purposes above —
            in practice, that means correspondence stays in my email account, and notes
            and files for a project are kept while the work is live and for a period
            afterwards, so that past work can be referred back to.
          </p>
          <p>
            I do not have a fixed deletion schedule, and I would rather say so than
            publish a number I do not actually enforce. If you want your information
            removed, ask and I will remove what I hold — see{" "}
            <span className="text-cream">Your rights</span> below.
          </p>
        </Section>

        <Section n="07" title="Data security">
          <p>
            Information is kept on established, password-protected services with
            two-factor authentication enabled where it is available, and access is
            limited to me — there is no team, and nobody else logs into these accounts.
          </p>
          <p>
            No method of transmitting or storing information online is completely
            secure. I take reasonable care, but I cannot guarantee absolute security,
            and you should not send anything highly sensitive — financial details,
            identity documents, passwords — through the form, by email or by direct
            message. I will never ask you for them.
          </p>
        </Section>

        <Section n="08" title="Your rights">
          <p>You can, at any time:</p>
          <List
            items={[
              "Ask what information I hold about you",
              "Ask me to correct anything that is wrong",
              "Ask me to delete it",
              "Ask me to stop contacting you, which I will do without asking why",
            ]}
          />
          <p>
            Email{" "}
            <a className="underline-swipe text-cream" href={mailto("Privacy request")}>
              {EMAIL}
            </a>{" "}
            and I will handle it myself, usually within a few days. There is no form to
            fill in and no account to log into.
          </p>
          <p>
            Depending on where you live, you may also have rights under privacy laws
            such as Canada&apos;s Personal Information Protection and Electronic
            Documents Act (PIPEDA). If you are in Canada and you are not satisfied with
            how I have handled a request, you can raise it with the Office of the
            Privacy Commissioner of Canada.
          </p>
        </Section>

        <Section n="09" title="Children">
          <p>
            This studio sells to businesses. The site is not directed at children, and
            I do not knowingly collect information from anyone under 18. If you believe
            a child has sent me their information, email me and I will delete it.
          </p>
        </Section>

        <Section n="10" title="Changes to this privacy policy">
          <p>
            This policy may be updated as the studio&apos;s tools or services change.
            When it is, the date at the top of the page changes with it, and the
            current version is always the one published here.
          </p>
          <p>
            Material changes will not be applied retroactively to information already
            collected without telling you.
          </p>
        </Section>

        <Section n="11" title="Contact">
          <p>
            Joseph The Great — Toronto, Ontario, Canada. Questions about this policy,
            or about anything I hold, go to the same place everything else does:
          </p>
          <div className="t-mono flex flex-col gap-2 pt-1">
            <a className="underline-swipe w-fit text-cream" href={mailto("Privacy")}>
              {EMAIL} ↗
            </a>
            <a
              className="underline-swipe w-fit text-cream"
              href={IG_URL}
              rel="noopener noreferrer"
              target="_blank"
            >
              {IG_HANDLE} ↗
            </a>
          </div>
        </Section>

        <div className="border-t border-neon/15 pt-9">
          <Link
            href="/"
            className="t-mono underline-swipe text-neon"
            aria-label="Back to the Joseph The Great home page"
          >
            ← Back to josephthegreat.art
          </Link>
        </div>
      </div>
    </main>
  );
}
