"use client";

import { useState } from "react";

export default function MaskObject() {
  const [open, setOpen] = useState(false);
  return (
    <button type="button" className={`home-mask-object ${open ? "is-open" : ""}`} aria-pressed={open} aria-label={open ? "Close the mask" : "Move the mask to reveal Joseph"} onClick={() => setOpen(!open)}>
      <span className="home-mask-under" aria-hidden="true">YUSUF<br />AKA JOSEPH</span>
      <span className="home-mask-face" aria-hidden="true"><span /></span>
      <span className="home-mask-instruction" aria-hidden="true">{open ? "THERE HE IS. TAP AGAIN." : "PUSH THE MASK →"}</span>
    </button>
  );
}
