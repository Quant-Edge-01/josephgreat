/**
 * Hand-authored maple syrup jug. Deliberately SVG, not WebGL:
 * one composited <svg> scales through 50x on a scroll transform without
 * dropping a frame on iOS Safari, where a Three.js canvas has to re-raster
 * every step. Nothing here is 3D enough to need a renderer.
 */

const JAR_BODY =
  "M156 66 L156 118 C156 152 88 166 66 232 C63 330 60 430 60 520 " +
  "C60 552 78 568 106 568 L294 568 C322 568 340 552 340 520 " +
  "C340 430 337 330 334 232 C312 166 244 152 244 118 L244 66 Z";

const JAR_INNER =
  "M166 68 L166 120 C166 156 96 172 78 236 C75 332 72 428 72 518 " +
  "C72 544 88 556 112 556 L288 556 C312 556 328 544 328 518 " +
  "C328 428 325 332 322 236 C304 172 234 156 234 120 L234 68 Z";

/* 11-point maple leaf, plotted on a 100x100 box, right half mirrored */
const MAPLE =
  "M50 3 L53.5 20 L61 16.5 L58 27.5 L74 22 L71 33 L95 38.5 L86 47 L91 54 " +
  "L78.5 58 L64 71 L54 73 L54 95 L46 95 L46 73 L36 71 L21.5 58 L9 54 " +
  "L14 47 L5 38.5 L29 33 L26 22 L42 27.5 L39 16.5 L46.5 20 Z";

export default function SyrupJar({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 400 620"
      className={className}
      aria-hidden
      shapeRendering="geometricPrecision"
    >
      <defs>
        <linearGradient id="syrup" x1="0" y1="0" x2="1" y2="0.35">
          <stop offset="0%" stopColor="#5c2a04" />
          <stop offset="18%" stopColor="#a4560f" />
          <stop offset="42%" stopColor="#e0972b" />
          <stop offset="56%" stopColor="#c2721a" />
          <stop offset="82%" stopColor="#7b3a07" />
          <stop offset="100%" stopColor="#4a2103" />
        </linearGradient>

        <linearGradient id="glass" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.62" />
          <stop offset="14%" stopColor="#ffffff" stopOpacity="0.1" />
          <stop offset="50%" stopColor="#e8dcc4" stopOpacity="0.06" />
          <stop offset="86%" stopColor="#ffffff" stopOpacity="0.14" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0.5" />
        </linearGradient>

        <linearGradient id="metal" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#6b5a34" />
          <stop offset="12%" stopColor="#c9a96a" />
          <stop offset="30%" stopColor="#f0e0bb" />
          <stop offset="48%" stopColor="#b6934f" />
          <stop offset="68%" stopColor="#e2cd9a" />
          <stop offset="88%" stopColor="#8a7440" />
          <stop offset="100%" stopColor="#5b4c2c" />
        </linearGradient>

        <linearGradient id="parchment" x1="0" y1="0" x2="0.2" y2="1">
          <stop offset="0%" stopColor="#f7f1e0" />
          <stop offset="55%" stopColor="#ece2ca" />
          <stop offset="100%" stopColor="#dccfb0" />
        </linearGradient>

        {/* label curvature: darkens toward the sides so it reads as wrapped */}
        <linearGradient id="curve" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#3a2409" stopOpacity="0.4" />
          <stop offset="16%" stopColor="#3a2409" stopOpacity="0.05" />
          <stop offset="60%" stopColor="#ffffff" stopOpacity="0.14" />
          <stop offset="88%" stopColor="#3a2409" stopOpacity="0.1" />
          <stop offset="100%" stopColor="#3a2409" stopOpacity="0.45" />
        </linearGradient>

        <linearGradient id="streak" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
          <stop offset="45%" stopColor="#ffffff" stopOpacity="0.72" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>

        <clipPath id="innerClip">
          <path d={JAR_INNER} />
        </clipPath>
      </defs>

      {/* ---- syrup, filled to just under the neck ---- */}
      <g clipPath="url(#innerClip)">
        <rect x="40" y="146" width="320" height="440" fill="url(#syrup)" />
        {/* settled sediment / darker base */}
        <rect x="40" y="470" width="320" height="120" fill="#3d1a02" opacity="0.45" />
        {/* light passing through the belly */}
        <ellipse cx="196" cy="352" rx="88" ry="140" fill="#ffc357" opacity="0.28" />
      </g>

      {/* meniscus */}
      <ellipse cx="200" cy="147" rx="33" ry="6" fill="#f3b754" opacity="0.85" />
      <ellipse cx="200" cy="145" rx="33" ry="5" fill="#fff0cd" opacity="0.35" />

      {/* ---- glass shell ---- */}
      <path d={JAR_BODY} fill="url(#glass)" />
      <path
        d={JAR_BODY}
        fill="none"
        stroke="#5e3d17"
        strokeOpacity="0.34"
        strokeWidth="2.5"
      />

      {/* handle loop */}
      <path
        d="M246 92 C302 90 320 116 314 142 C308 170 274 180 250 172"
        fill="none"
        stroke="#c98d3a"
        strokeOpacity="0.5"
        strokeWidth="19"
        strokeLinecap="round"
      />
      <path
        d="M246 92 C302 90 320 116 314 142 C308 170 274 180 250 172"
        fill="none"
        stroke="#ffffff"
        strokeOpacity="0.5"
        strokeWidth="4"
        strokeLinecap="round"
        transform="translate(-4 -4)"
      />

      {/* ---- lid ---- */}
      <rect x="149" y="26" width="102" height="42" fill="url(#metal)" />
      <rect x="142" y="16" width="116" height="14" rx="4" fill="url(#metal)" />
      <rect x="142" y="16" width="116" height="4" fill="#fff3d6" opacity="0.5" />
      <g stroke="#3d3016" strokeOpacity="0.35" strokeWidth="1.6">
        {Array.from({ length: 11 }, (_, i) => (
          <line key={i} x1={155 + i * 9} y1={30} x2={155 + i * 9} y2={66} />
        ))}
      </g>
      <rect x="149" y="63" width="102" height="5" fill="#4a3a1b" opacity="0.4" />

      {/* ---- label ---- */}
      <g>
        <path
          d="M92 306 L308 300 L306 500 L94 494 Z"
          fill="url(#parchment)"
        />
        <path d="M92 306 L308 300 L306 500 L94 494 Z" fill="url(#curve)" />
        <path
          d="M101 315 L299 310 L297 490 L103 485 Z"
          fill="none"
          stroke="#8a6c33"
          strokeOpacity="0.5"
          strokeWidth="1.4"
        />

        <g transform="translate(172 322) scale(0.56)">
          <path d={MAPLE} fill="#a32122" />
        </g>

        <text
          x="200"
          y="418"
          textAnchor="middle"
          fontFamily="var(--ff-display), Georgia, serif"
          fontSize="26"
          fill="#3c2a10"
          letterSpacing="0.5"
        >
          JOSEPH
        </text>
        <text
          x="200"
          y="442"
          textAnchor="middle"
          fontFamily="var(--ff-display), Georgia, serif"
          fontStyle="italic"
          fontSize="23"
          fill="#8a2b18"
        >
          the Great
        </text>

        <line x1="122" y1="454" x2="278" y2="454" stroke="#8a6c33" strokeOpacity="0.55" />

        <text
          x="200"
          y="472"
          textAnchor="middle"
          fontFamily="var(--ff-mono), ui-monospace, monospace"
          fontSize="9.5"
          letterSpacing="2.6"
          fill="#5b431c"
        >
          PURE · TORONTO · N°01
        </text>
      </g>

      {/* ---- specular streaks, drawn last ---- */}
      <g clipPath="url(#innerClip)">
        <rect x="84" y="200" width="20" height="330" fill="url(#streak)" opacity="0.55" />
        <rect x="300" y="230" width="9" height="280" fill="url(#streak)" opacity="0.4" />
        <rect x="176" y="70" width="8" height="60" fill="url(#streak)" opacity="0.5" />
      </g>
    </svg>
  );
}
