"use client";

import type { CSSProperties } from "react";
import type { WorkImage } from "@/lib/works";

/**
 * Not a gallery grid. Plates hang at different widths, offsets and angles and
 * never quite settle — the drift is a CSS keyframe on an inner element so it
 * can't collide with the transform Framer Motion writes on the wrapper.
 */
const PLACEMENT = [
  { w: "w-full md:w-[68%]", pull: "md:ml-0", rot: "-1.1deg", amp: "8px", dur: "11s" },
  { w: "w-[88%] md:w-[52%]", pull: "ml-auto md:ml-auto md:mr-[6%]", rot: "1.4deg", amp: "10px", dur: "9s" },
  { w: "w-[94%] md:w-[60%]", pull: "md:ml-[14%]", rot: "0.7deg", amp: "7px", dur: "13s" },
  { w: "w-[82%] md:w-[46%]", pull: "ml-auto md:mr-[10%]", rot: "-1.6deg", amp: "11px", dur: "10s" },
];

export default function WorkGallery({ images }: { images: WorkImage[] }) {
  return (
    <div className="space-y-16 md:space-y-28">
      {images.map((img, i) => {
        const p = PLACEMENT[i % PLACEMENT.length];
        return (
          <figure
            key={img.src}
            className={`${p.w} ${p.pull}`}
          >
            <div
              className="float"
              style={
                {
                  "--rot": p.rot,
                  "--amp": p.amp,
                  "--dur": p.dur,
                  "--delay": `${i * 0.7}s`,
                } as CSSProperties
              }
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={img.src}
                alt={img.alt}
                width={img.w}
                height={img.h}
                loading="lazy"
                decoding="async"
                className="plate h-auto w-full"
              />
            </div>
            <figcaption className="t-note mt-5 max-w-[34rem] text-cream/70">
              {img.caption}
            </figcaption>
          </figure>
        );
      })}
    </div>
  );
}
