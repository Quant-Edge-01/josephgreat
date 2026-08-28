# Photography needed

The site currently owns **one** authentic photograph of Joseph:
`public/joseph.jpg` — 1000×1250, red mask, seated on a black leather sofa
against a light grey studio wall. Everything on the hero is built around it.

Nothing here has been faked. No AI face, no stock stranger, no borrowed
portrait. If a shot does not exist, the layout works without it — that is why
the hero is one composed frame rather than the five-frame scroll sequence
originally sketched.

---

## What the hero does today

`components/JarHero.tsx` clips the existing photograph into the jar silhouette,
tints it into the syrup palette, and floods the lower third with amber so the
figure reads as half-submerged. Glass, rim light and specular streaks are
painted over the top.

It works. But it is one frame, and the crop is doing a lot of the acting —
the photo was taken on a sofa, not in a jar, so the pose does not quite sell
"pressed against glass".

---

## The shot list that would unlock the scroll sequence

Five frames, same camera position, same lens, same light. The whole effect
depends on nothing moving except Joseph.

| # | Frame | Direction |
| --- | --- | --- |
| 01 | Seated, facing camera | Knees up, shoulders rounded, as if the space is too small. Looking straight down the lens. Mask on. |
| 02 | One palm forward | Right hand flat toward camera at chest height, fingers splayed, as if against glass. Arm nearly straight. |
| 03 | Both palms forward | Second hand joins at the same depth. Head slightly tilted. This is the frame that sells containment. |
| 04 | Pressed closer | Both palms and forehead at the same plane. Shoulders raised. Maximum compression. |
| 05 | Turning away | Head dropped or turned, hands sliding down. The release. |

### Technical requirements

- **Camera locked on a tripod.** Frames must align to the pixel; any drift and
  the crossfade reads as a jump cut.
- **Fixed exposure, fixed white balance, no auto anything.**
- **Plain seamless background** — mid-grey or warm off-white. It gets replaced
  by syrup, so it only has to be even.
- **Lens 50–85mm equivalent.** Wider distorts the hands unpleasantly at that
  distance.
- **Portrait orientation, 4:5 minimum, shoot 4000px on the long edge.** Delivery
  crop is 4:5 but headroom helps.
- **Even, soft frontal light** with one hard rim from camera-left. The rim is
  what will read as glass later.
- **Mask on in every frame.** It is the recognisable element.
- **No hands cropped at the wrist.** Full palms or don't bother.

### Delivery

Drop them at `public/jar/01.jpg` … `public/jar/05.jpg`, 4:5, ~1400×1750,
under 180 kB each after compression. The sequence component can then be built
against a stable, already-designed layout — the hero geometry does not need to
change to accept them.

---

## Also worth shooting, lower priority

- **A clean portrait, mask off**, 4:5, for the founder block. Business owners
  buy from faces; the red mask is a brand asset but it is not a face. Having
  both lets the page be strange at the top and human further down.
- **One real jar**, photographed empty on the same seamless. Compositing a
  genuine glass object beats any amount of SVG.
- **Behind-the-scenes stills of an actual shoot** — phone on a gimbal, a
  shopfront, a ring light in a bridal studio. Proof that the work is physical.

---

## What not to do

- Do not generate a face. The entire argument of this site is that every claim
  on it can be checked, and a synthetic founder collapses that in one glance.
- Do not substitute a stock model.
- Do not ship a placeholder that looks like a real photo. The monogram plate in
  `Founder.tsx` is deliberately typographic for exactly this reason: it reads as
  a designed mark, not as a broken image.
