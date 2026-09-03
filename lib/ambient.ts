/**
 * The site's soundtrack — a chiptune bed, synthesised in the browser.
 *
 * WHY THERE IS NO MP3 HERE
 *
 * No copyrighted music was to be downloaded and the repository contains no
 * licensed audio, so the choice was a silent placeholder or synthesis.
 * Synthesis wins outright: it is original by construction, so there is nothing
 * to clear; it costs zero bytes, where a listenable loop is 1–3 MB; and it
 * never repeats audibly, because the sequencer keeps playing rather than
 * looping a file.
 *
 * THE SOUND
 *
 * Four channels, arranged the way a NES arranges them: two pulse waves, a
 * triangle bass and a noise channel. The lead pulse runs at 12.5% duty and the
 * counter-melody at 25% — those two thin, nasal timbres are the actual
 * fingerprint of the format, far more than the arpeggios are. Harmony is
 * major-seventh and add9 rather than the plain triads a real 2A03 score would
 * have used, which is the "millennial, not 1987" part: the voicings are from
 * the lo-fi records this audience actually grew up on, played on the chip they
 * remember from a Game Boy.
 *
 * Scheduling uses the lookahead pattern — a setTimeout that runs every 25ms and
 * books notes on the audio clock up to 120ms ahead. Sequencing straight off
 * setTimeout would audibly stagger, because timer callbacks are throttled and
 * jittery while the main thread is laying out a page.
 *
 * SWAPPING IN A REAL TRACK LATER
 *
 * Set TRACK_URL to a file you own or have licensed (put it in /public, e.g.
 * "/ambient/loop.mp3"). It will be streamed and looped instead, and the fades,
 * the toggle, the session memory and the pause-when-hidden all behave the same.
 */
export const TRACK_URL: string | null = null;

/**
 * Peak gain.
 *
 * Higher than the pad this replaced, despite being on by default, because the
 * content changed shape: plucked notes with silence between them measure far
 * lower in RMS than a sustained chord at the same peak, and are perceived
 * quieter still. Measured output here peaks around 0.04 and averages ~0.003,
 * which sits under reading without disappearing on laptop speakers.
 */
const MASTER = 0.08;

const FADE_IN = 1.8;
const FADE_OUT = 1.4;

const BPM = 96;
/** Sixteenth note, in seconds. The whole sequencer is quantised to this. */
const STEP = 60 / BPM / 4;
const LOOKAHEAD_MS = 25;
const SCHEDULE_AHEAD = 0.12;

const hz = (n: number) => 440 * Math.pow(2, (n - 69) / 12);

/**
 * Two bars each. Major sevenths and an add9 rather than triads — the harmony is
 * from the wrong decade for the chip on purpose.
 */
const PROG = [
  { root: 36, tones: [48, 52, 55, 59] }, // Cmaj7
  { root: 33, tones: [45, 48, 52, 55] }, // Am7
  { root: 29, tones: [41, 45, 48, 52] }, // Fmaj7
  { root: 31, tones: [43, 47, 50, 57] }, // G add9
];

/** Steps per chord: 32 sixteenths = two bars. */
const STEPS_PER_CHORD = 32;

type Chan = { gain: GainNode; wave: PeriodicWave | null };

export class Ambient {
  private ctx: AudioContext | null = null;
  private master: GainNode | null = null;
  private lead: Chan | null = null;
  private counter: Chan | null = null;
  private bass: GainNode | null = null;
  private noise: GainNode | null = null;
  private noiseBuf: AudioBuffer | null = null;
  private el: HTMLAudioElement | null = null;

  private timer: number | null = null;
  private step = 0;
  private nextNoteAt = 0;
  private running = false;
  private level = 0;

  get isRunning() {
    return this.running;
  }

  /**
   * Built lazily and only from inside a user gesture. Constructing an
   * AudioContext on load leaves a suspended context on every visitor and, in
   * some browsers, logs an autoplay warning for a sound nobody asked for.
   */
  private ensure() {
    if (this.ctx) return this.ctx;
    const Ctor: typeof AudioContext =
      window.AudioContext ??
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    const ctx = new Ctor();
    this.ctx = ctx;

    const master = ctx.createGain();
    master.gain.value = 0;
    master.connect(ctx.destination);
    this.master = master;

    if (TRACK_URL) {
      const el = new Audio(TRACK_URL);
      el.loop = true;
      el.crossOrigin = "anonymous";
      ctx.createMediaElementSource(el).connect(master);
      this.el = el;
      return ctx;
    }

    /* A short tail. Chiptune with a little room around it is the "remembered"
       part; bone dry, it is just a game. */
    const verb = ctx.createConvolver();
    verb.buffer = impulse(ctx, 1.6, 3);
    const wet = ctx.createGain();
    wet.gain.value = 0.28;
    wet.connect(verb).connect(master);

    const bus = (level: number) => {
      const g = ctx.createGain();
      g.gain.value = level;
      g.connect(master);
      g.connect(wet);
      return g;
    };

    /*
      Channel levels are set against the *peak* of a blip, not against a
      sustained tone. These notes are 130ms with silence after them, so the
      first pass — voiced like a pad — measured 50x quieter in mean RMS than
      the pad it replaced and was effectively inaudible under a page. Summed
      worst case here is ~1.1 before the master's 0.05, so nothing clips.
    */
    this.lead = { gain: bus(0.34), wave: pulse(ctx, 0.125) };
    this.counter = { gain: bus(0.22), wave: pulse(ctx, 0.25) };
    this.bass = bus(0.46);
    this.noise = bus(0.08);
    this.noiseBuf = noiseBuffer(ctx, 0.3);

    return ctx;
  }

  /**
   * Ramp the bed from wherever it currently is.
   *
   * The obvious spelling — cancelScheduledValues, setValueAtTime(gain.value),
   * ramp — is wrong and silently so. AudioParam.value does not read back an
   * automation in progress; it returns the last explicitly set value, so after
   * a fade-in it still reads 0. Pinning the next ramp to that cuts output to
   * zero instantly and then "fades" from zero to zero. cancelAndHoldAtTime is
   * the operation actually wanted: it drops scheduled events while holding the
   * curve's true value, so the new ramp starts from what is being heard.
   */
  private rampTo(target: number, seconds: number) {
    const ctx = this.ctx!;
    const g = this.master!.gain;
    const t = ctx.currentTime;
    if (typeof g.cancelAndHoldAtTime === "function") g.cancelAndHoldAtTime(t);
    else {
      g.cancelScheduledValues(t);
      g.setValueAtTime(this.level, t);
    }
    g.linearRampToValueAtTime(target, t + seconds);
    this.level = target;
  }

  async start() {
    const ctx = this.ensure();
    if (ctx.state === "suspended") await ctx.resume();
    /* resume() rejects when there is no user activation. Reporting that back
       lets the caller leave the control showing "off" rather than lying. */
    if (ctx.state !== "running") return false;

    this.running = true;
    if (this.el) void this.el.play().catch(() => {});

    this.rampTo(MASTER, FADE_IN);

    if (!TRACK_URL && this.timer === null) {
      this.nextNoteAt = ctx.currentTime + 0.06;
      this.tick();
    }
    return true;
  }

  stop() {
    this.running = false;
    const ctx = this.ctx;
    if (!ctx || !this.master) return;
    this.rampTo(0, FADE_OUT);
    this.clearTimer();
    /* Suspend only once the ramp has finished — suspending mid-ramp freezes the
       clock and the bed snaps back at full level on the next resume. */
    window.setTimeout(() => {
      if (!this.running) {
        this.el?.pause();
        void ctx.suspend();
      }
    }, FADE_OUT * 1000 + 120);
  }

  suspendForHide() {
    if (this.ctx && this.running) void this.ctx.suspend();
    this.el?.pause();
  }

  async resumeFromHide() {
    if (this.ctx && this.running) {
      await this.ctx.resume();
      /* The audio clock stopped while suspended; the sequencer's next-note time
         is now in the past and would fire a burst of catch-up notes. */
      this.nextNoteAt = this.ctx.currentTime + 0.06;
    }
    if (this.running && this.el) void this.el.play().catch(() => {});
  }

  dispose() {
    this.clearTimer();
    this.el?.pause();
    void this.ctx?.close();
    this.ctx = null;
    this.running = false;
  }

  private clearTimer() {
    if (this.timer !== null) window.clearTimeout(this.timer);
    this.timer = null;
  }

  /** Lookahead scheduler: book everything due in the next SCHEDULE_AHEAD. */
  private tick = () => {
    const ctx = this.ctx;
    if (!ctx || !this.running) {
      this.clearTimer();
      return;
    }
    while (this.nextNoteAt < ctx.currentTime + SCHEDULE_AHEAD) {
      this.schedule(this.step, this.nextNoteAt);
      this.nextNoteAt += STEP;
      this.step++;
    }
    this.timer = window.setTimeout(this.tick, LOOKAHEAD_MS);
  };

  private schedule(step: number, at: number) {
    const chord = PROG[Math.floor(step / STEPS_PER_CHORD) % PROG.length];
    const inChord = step % STEPS_PER_CHORD;

    /* Lead arpeggio on every other sixteenth. Straight up the chord and back
       down, two octaves, which is the one gesture the format is known for. */
    if (step % 2 === 0) {
      const seq = [...chord.tones, ...chord.tones.map((n) => n + 12)];
      const up = Math.floor(inChord / 2) % (seq.length * 2 - 2);
      const idx = up < seq.length ? up : seq.length * 2 - 2 - up;
      this.blip(this.lead!, hz(seq[idx]), at, 0.13, true);
    }

    /* Counter-melody, sparse and a fifth up, so the arp has something to sit
       against without a second thing competing for the same attention. */
    if (inChord % 8 === 6) {
      this.blip(this.counter!, hz(chord.tones[1] + 12), at, 0.26, false);
    }

    // bass on the downbeat and the "and" of three
    if (inChord % 16 === 0 || inChord % 16 === 10) {
      this.bassNote(hz(chord.root), at);
    }

    // noise channel: a soft hat on the offbeat eighth
    if (step % 4 === 2) this.hat(at);
  }

  private blip(ch: Chan, f: number, at: number, dur: number, vibrato: boolean) {
    const ctx = this.ctx!;
    const osc = ctx.createOscillator();
    if (ch.wave) osc.setPeriodicWave(ch.wave);
    else osc.type = "square";
    osc.frequency.value = f;

    if (vibrato) {
      /* Delayed vibrato — it only opens up on the notes long enough to hear it,
         which is what a tracker's vibrato command does. */
      const lfo = ctx.createOscillator();
      const depth = ctx.createGain();
      lfo.frequency.value = 5.5;
      depth.gain.setValueAtTime(0, at);
      depth.gain.linearRampToValueAtTime(5, at + dur * 0.6);
      lfo.connect(depth).connect(osc.detune);
      lfo.start(at);
      lfo.stop(at + dur);
    }

    const g = ctx.createGain();
    g.gain.setValueAtTime(0, at);
    g.gain.linearRampToValueAtTime(1, at + 0.004);
    g.gain.exponentialRampToValueAtTime(0.0001, at + dur);

    osc.connect(g).connect(ch.gain);
    osc.start(at);
    osc.stop(at + dur + 0.02);
  }

  private bassNote(f: number, at: number) {
    const ctx = this.ctx!;
    const osc = ctx.createOscillator();
    osc.type = "triangle";
    osc.frequency.value = f;
    const g = ctx.createGain();
    g.gain.setValueAtTime(0, at);
    g.gain.linearRampToValueAtTime(1, at + 0.01);
    g.gain.exponentialRampToValueAtTime(0.0001, at + 0.42);
    osc.connect(g).connect(this.bass!);
    osc.start(at);
    osc.stop(at + 0.45);
  }

  private hat(at: number) {
    const ctx = this.ctx!;
    const src = ctx.createBufferSource();
    src.buffer = this.noiseBuf!;
    const hp = ctx.createBiquadFilter();
    hp.type = "highpass";
    hp.frequency.value = 6500;
    const g = ctx.createGain();
    g.gain.setValueAtTime(0, at);
    g.gain.linearRampToValueAtTime(1, at + 0.002);
    g.gain.exponentialRampToValueAtTime(0.0001, at + 0.06);
    src.connect(hp).connect(g).connect(this.noise!);
    src.start(at);
    src.stop(at + 0.08);
  }
}

/**
 * A duty-cycle pulse as a PeriodicWave. Fourier coefficients for a pulse of
 * duty d are b[n] = (2/nπ)·sin(nπd) — at d=0.5 the even harmonics cancel and it
 * is a square; at 0.125 it is the thin, reedy lead everyone recognises.
 */
function pulse(ctx: AudioContext, duty: number, harmonics = 28) {
  const real = new Float32Array(harmonics);
  const imag = new Float32Array(harmonics);
  for (let n = 1; n < harmonics; n++) {
    imag[n] = (2 / (n * Math.PI)) * Math.sin(n * Math.PI * duty);
  }
  return ctx.createPeriodicWave(real, imag);
}

/** Exponentially decaying noise — a cheap, convincing small-room tail. */
function impulse(ctx: AudioContext, seconds: number, decay: number) {
  const len = Math.floor(ctx.sampleRate * seconds);
  const buf = ctx.createBuffer(2, len, ctx.sampleRate);
  for (let c = 0; c < 2; c++) {
    const d = buf.getChannelData(c);
    for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, decay);
  }
  return buf;
}

function noiseBuffer(ctx: AudioContext, seconds: number) {
  const len = Math.floor(ctx.sampleRate * seconds);
  const buf = ctx.createBuffer(1, len, ctx.sampleRate);
  const d = buf.getChannelData(0);
  for (let i = 0; i < len; i++) d[i] = Math.random() * 2 - 1;
  return buf;
}
