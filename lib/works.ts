/**
 * Every number here is read off a screenshot sitting in public/works/<slug>/.
 * If a claim isn't in an image, it isn't on the page. Project-note fields are summaries; lead and subscriber figures must retain
 * their provenance and must never imply verified sales.
 */

export type WorkImage = {
  src: string;
  w: number;
  h: number;
  alt: string;
  caption: string;
};

type WorkSeed = {
  slug: string;
  title: string;
  client: string;
  kind: string;
  lede: string;
  body: string[];
  quote: string;
  stats: { value: string; label: string }[];
  link?: { label: string; href: string };
  cover: string;
  images: WorkImage[];
  /**
   * What this job is actually evidence of. A Toronto shop owner deciding
   * whether to spend $700 needs to know which of these numbers is a person who
   * messaged a business and which is a person who watched a video — so the
   * distinction is data, not something left to the reader to infer.
   */
  proves: "enquiries" | "reach";
  /** A local service business in Toronto/the GTA, i.e. one they can map onto. */
  local: boolean;
  /**
   * The single number to lead with in lists and cards. Not stats[0]: on the
   * bridal job that is "$214.86 total ad spend", which as a headline reads like
   * a fee rather than the thing it bought.
   */
  headline: { value: string; label: string };
  /**
   * Set only on work that is still running. Three of the four entries are
   * finished projects or own channels; exactly one is a paying client, and the
   * page needs to be able to say so without the reader inferring it.
   */
  current?: boolean;
  /** Human-readable start, e.g. "January 2026". Only meaningful with `current`. */
  since?: string;
};

export type Work = WorkSeed & {
  /** Derived from position — see below. */
  n: string;
  /** card geometry — deliberately uneven, see Portfolio.tsx */
  card: { tab: string; col: string; off: string; lean: string; mob: string; preview: string };
};

/**
 * Ordered for a cold local owner, not chronologically and not by headline size.
 *
 * The bridal shop goes first because it is the only job on here that proves the
 * thing being sold — money in, conversations out — and it is the business a
 * Toronto owner can map onto their own. The 33.1M-view Roblox channel used to
 * lead; it is a bigger number and a worse argument, because "makes viral kids'
 * content" is not what someone with a gym is trying to buy.
 */
const SEEDS: WorkSeed[] = [
  {
    slug: "dream-alteration",
    title: "Dream Alterations",
    client: "Dream Alterations — bridal, GTA",
    kind: "local service · paid + organic",
    proves: "enquiries",
    local: true,
    current: true,
    since: "January 2026",
    headline: { value: "$3.64", label: "per conversation started" },
    lede: "$3.64 to put a bride in the inbox — and they kept me on. Still running the account, every month since January.",
    body: [
      "Custom bridal and wedding gown alterations across the GTA. Appointments only — which means every enquiry has to be a real one. There's no walk-in traffic to hide a weak campaign behind.",
      "The paid side: $214.86 spent, 59 messaging conversations started, $3.64 each on average. Nine leads are owner-reported; the qualification criteria and full campaign timeframe are unavailable. Bookings and revenue were not tracked. On the best day of the run the cost per conversation dropped to $1.46.",
      "The organic side does the rest — half a million views on one reel, 17,200 likes, 2,700 saves, from an account with twelve posts and 689 followers. These are organic reach and engagement metrics, separate from the paid messaging campaign; customer recognition and sales were not measured.",
      "This one is not a finished case study. I still run the account on a monthly retainer, and have since January — which is the part I would look at hardest if I were you, because a single good month is luck and a client who keeps paying is not.",
    ],
    quote:
      "Custom bridal alteration in toronto — 3$ per message, 55 messages in 2 weeks, 9 leads with only 220$ spent on targeting.",
    stats: [
      { value: "$214.86", label: "total ad spend" },
      { value: "59", label: "conversations started" },
      { value: "$3.64", label: "per conversation" },
      { value: "9", label: "owner-reported leads" },
    ],
    cover: "/works/dream-alteration/03.jpg",
    images: [
      {
        src: "/works/dream-alteration/04.png",
        w: 1600,
        h: 1053,
        alt: "Ads Manager showing 59 messaging conversations started at $3.64 each, $214.86 spent",
        caption: "Ads Manager, plainly — 59 conversations, $3.64 each, $214.86 spent.",
      },
      {
        src: "/works/dream-alteration/01.jpg",
        w: 1600,
        h: 1200,
        alt: "Ads Manager tooltip showing $1.46 per messaging conversation on August 2",
        caption: "Best day of the run: $1.46 per conversation.",
      },
      {
        src: "/works/dream-alteration/02.jpg",
        w: 1600,
        h: 1368,
        alt: "Instagram reel insights showing 501,539 views and 17.2K likes",
        caption: "The organic half — 501,539 views, 17,200 likes, 2,700 saves.",
      },
      {
        src: "/works/dream-alteration/03.jpg",
        w: 1600,
        h: 1539,
        alt: "Instagram profile for dream.alterations showing 12 posts, 689 followers, 30.7K views in 30 days",
        caption: "Twelve posts. 689 followers. 30,700 views a month.",
      },
    ],
  },

  {
    slug: "spartan-gymnastics",
    title: "Spartan Gymnastics",
    client: "Spartan Gymnastics + District — Toronto",
    kind: "local business · surreal short-form",
    proves: "reach",
    local: true,
    headline: { value: "74.9%", label: "of reach from non-followers" },
    lede: "9,224 views in two weeks for a neighbourhood gym — three quarters of them from people who had never heard of it.",
    body: [
      "Spartan Gymnastics + District sells spring sessions, March break camps and summer camps. The kind of local business that normally posts a flyer and waits.",
      "I posted surrealism instead. “Wait — how is there text written in the sky right now?” “Manager said this video wouldn't go viral.” Hooks with nothing to do with gymnastics, bolted onto a gymnastics club. One of them took 6,377 views by itself.",
      "Two weeks, zero budget, 9,224 views — and 74.9% of them from accounts that don't follow the gym. For a local business that split is the whole game. The people already following you were never the customers you were missing.",
    ],
    quote: "10k views for the past 2 weeks with zero budget — only funny surrealistic content.",
    stats: [
      { value: "$0", label: "budget" },
      { value: "9,224", label: "views in 2 weeks" },
      { value: "74.9%", label: "non-followers" },
      { value: "6,377", label: "top reel" },
    ],
    link: {
      label: "the reel that took 6K",
      href: "https://www.instagram.com/reel/DbYEJCNBUAi/",
    },
    cover: "/works/spartan-gymnastics/02.jpg",
    images: [
      {
        src: "/works/spartan-gymnastics/02.jpg",
        w: 924,
        h: 1600,
        alt: "Instagram content grid for spartan_gymnastics showing surreal hook captions and view counts",
        caption: "The grid — surreal hooks bolted onto a gymnastics club.",
      },
      {
        src: "/works/spartan-gymnastics/03.jpg",
        w: 1600,
        h: 1433,
        alt: "Instagram insights showing 9,224 views with 74.9% from non-followers",
        caption: "9,224 views. 74.9% of them non-followers.",
      },
      {
        src: "/works/spartan-gymnastics/01.jpg",
        w: 1600,
        h: 1065,
        alt: "Instagram profile for spartan_gymnastics showing 1,820 followers",
        caption: "1,820 followers. The reach came from everyone else.",
      },
    ],
  },

  {
    slug: "joeroblox85",
    title: "Joeroblox85",
    client: "Own channel — Roblox",
    kind: "kids' content · youtube shorts",
    proves: "reach",
    local: false,
    headline: { value: "33.1M", label: "lifetime views" },
    lede: "The hardest audience on the internet is eight years old. I held it thirty-three million times.",
    body: [
      "A Roblox channel I built and ran myself, start to finish. 33.1 million lifetime views and +324.4K net subscribers gained in the saved analytics, not a live subscriber count. A silver play button on the desk, which tends to make the conversation shorter.",
      "One Short did 8,490,448 views on its own and brought 116,400 subscribers with it. That's the one that gets the reaction. The number that actually means something is sitting right next to it — six Shorts past a million views, spread across two years. Once is luck. Six times is a format.",
      "Kids are the most honest audience alive. They don't watch to be polite and they don't finish something out of respect for the effort. They leave in the first second and they never come back. Learning to hold them taught me hooks, pacing and payoff harder than any client brief has since.",
    ],
    quote: "I know even how to make content for kids — over 30 million views.",
    stats: [
      { value: "33.1M", label: "lifetime views" },
      { value: "+324.4K", label: "net subscribers gained" },
      { value: "8.5M", label: "best single short" },
      { value: "6", label: "shorts past 1M" },
    ],
    cover: "/works/joeroblox85/02.jpg",
    images: [
      {
        src: "/works/joeroblox85/02.jpg",
        w: 1600,
        h: 1200,
        alt: "YouTube silver play button next to channel analytics showing 33,134,030 lifetime views",
        caption: "The silver play button, and the channel it came out of — 33,134,030 views.",
      },
      {
        src: "/works/joeroblox85/01.jpg",
        w: 1600,
        h: 1200,
        alt: "YouTube Studio analytics showing 19,314,092 views in the last 365 days",
        caption: "19.3M of those landed inside a single 365-day window.",
      },
      {
        src: "/works/joeroblox85/03.jpg",
        w: 1600,
        h: 1200,
        alt: "Video analytics for one Short showing 8,490,448 views and 116,400 subscribers gained",
        caption: "One Short: 8,490,448 views, +116,400 subscribers.",
      },
      {
        src: "/works/joeroblox85/04.jpg",
        w: 1600,
        h: 1200,
        alt: "Channel content filtered to Shorts with over one million views, showing six entries",
        caption: "Filtered to Shorts above a million views. Six of them.",
      },
    ],
  },

  {
    slug: "quantlarper",
    title: "quantlarper",
    client: "QuantEdge — market tool for retail investors",
    kind: "fintech · organic only",
    proves: "reach",
    local: false,
    headline: { value: "1.2M", label: "views in 30 days, $0 spent" },
    lede: "Two posts. Zero dollars. 175 active email subscribers in the saved snapshot.",
    body: [
      "A financial tool for people trading the stock market — the least forgiving niche on the platform, because every second account in it belongs to a man renting a Lamborghini by the hour.",
      "So I went the other way. The bio reads “i'm not a guru, dude pls do not hate me.” That isn't self-deprecation, it's positioning. In a feed built entirely on borrowed authority, refusing to claim any is the thing that stops the thumb.",
      "One month, no ad spend, an account with two posts on it: 1.2 million views in 30 days. The top reel alone took 1,150,970 views from 643,263 unique viewers, with 65,300 likes and 9,900 saves. 2,159 followers at the end of it — and 175 active subscribers on the list.",
    ],
    quote: "175 email subscribers reported, with no ad spend in the saved project snapshot.",
    stats: [
      { value: "$0", label: "ad spend" },
      { value: "1.2M", label: "views in 30 days" },
      { value: "1,150,970", label: "top reel" },
      { value: "175", label: "active subscribers" },
    ],
    cover: "/works/quantlarper/02.jpg",
    images: [
      {
        src: "/works/quantlarper/01.jpg",
        w: 1069,
        h: 1600,
        alt: "Instagram reel insights showing 1,150,970 views and 643,263 viewers",
        caption: "The reel that carried it — 1,150,970 views, 11 seconds of average watch time.",
      },
      {
        src: "/works/quantlarper/02.jpg",
        w: 736,
        h: 1600,
        alt: "Instagram profile for quantlarper showing 2 posts, 2,159 followers and 1.2M views in 30 days",
        caption: "Two posts. 2,159 followers. 1.2M views in the last 30 days.",
      },
      {
        src: "/works/quantlarper/04.png",
        w: 1340,
        h: 515,
        alt: "Email platform showing 175 active subscribers",
        caption: "175 active subscribers. Their addresses are cropped out of this shot on purpose.",
      },
    ],
  },
];

/**
 * Card geometry belongs to the *slot*, not the project — four folders pulled
 * out of a drawer, no two sharing a band. Keeping it positional means the
 * collage survives any reordering of SEEDS above, which the old per-project
 * config did not: moving the bridal job to the front used to drag a
 * half-width right-column card with it and leave a hole on the left.
 */
const CARD_SLOTS: Work["card"][] = [
  {
    tab: "38%",
    col: "md:col-start-1 md:col-span-6",
    off: "md:mt-0",
    lean: "-0.7deg",
    mob: "mr-auto w-[95%]",
    preview: "h-56 md:h-80",
  },
  {
    tab: "62%",
    col: "md:col-start-8 md:col-span-4",
    off: "md:mt-32",
    lean: "0.7deg",
    mob: "ml-auto w-[86%]",
    preview: "h-44 md:h-52",
  },
  {
    tab: "30%",
    col: "md:col-start-2 md:col-span-7",
    off: "md:mt-10",
    lean: "0.9deg",
    mob: "mr-auto w-full",
    preview: "h-64 md:h-72",
  },
  {
    tab: "68%",
    col: "md:col-start-9 md:col-span-4",
    off: "md:mt-28",
    lean: "-1deg",
    mob: "ml-auto w-[88%]",
    preview: "h-48 md:h-60",
  },
];

/** `n` is derived so the file numbers can never disagree with the running order. */
export const WORKS: Work[] = SEEDS.map((w, i) => ({
  ...w,
  n: String(i + 1).padStart(2, "0"),
  card: CARD_SLOTS[i % CARD_SLOTS.length],
}));

export const workBySlug = (slug: string) => WORKS.find((w) => w.slug === slug);

/** The jobs a local owner can map onto their own shop. */
export const LOCAL_WORKS = WORKS.filter((w) => w.local);
/** The jobs that prove reach rather than enquiries. Labelled as such on the page. */
export const REACH_WORKS = WORKS.filter((w) => w.proves === "reach");
