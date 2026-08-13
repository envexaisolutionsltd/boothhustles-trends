import type { FleetItem } from "@/lib/lts/content";

/**
 * Line-drawn trailer silhouettes. Inline SVG rather than photography: it
 * costs nothing to load, scales to any width, and stays honest — we are not
 * pretending stock imagery shows the actual fleet.
 */

const shared = {
  viewBox: "0 0 320 84",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinejoin: "round",
  className: "h-auto w-full",
} as const;

function Wheel({ x }: { x: number }) {
  return <circle cx={x} cy={68} r={9} />;
}

/** Dashed ground line every variant sits on. */
function Ground() {
  return <path d="M14 68h292" strokeDasharray="4 6" opacity={0.35} />;
}

/** Cab plus its two axles, shared by the trailer variants. */
function Cab() {
  return (
    <>
      <path d="M14 60V34l16-12h20l8 12h10v26" />
      <path d="M30 24v10h22" />
      <Wheel x={30} />
      <Wheel x={62} />
    </>
  );
}

export function TrailerArt({ variant }: { variant: FleetItem["art"] }) {
  if (variant === "tractor") {
    return (
      <svg {...shared} aria-hidden>
        <Ground />
        {/* Prime mover: cab, ballast body and three axles. */}
        <path d="M14 60V28l20-16h30l12 16h16v32" />
        <path d="M36 14v14h28" />
        <path d="M92 60V34h56v26" />
        <path d="M92 44h56" />
        <Wheel x={36} />
        <Wheel x={80} />
        <Wheel x={112} />
        <Wheel x={140} />
      </svg>
    );
  }

  if (variant === "lowloader") {
    return (
      <svg {...shared} aria-hidden>
        <Ground />
        <Cab />
        {/* Gooseneck dropping to a deep-well deck. */}
        <path d="M78 40h26l10 14h120l10-14h28v20" />
        <path d="M114 54h130" />
        <Wheel x={252} />
        <Wheel x={278} />
      </svg>
    );
  }

  if (variant === "stepframe") {
    return (
      <svg {...shared} aria-hidden>
        <Ground />
        <Cab />
        {/* Bolsters carrying a long beam. */}
        <path d="M78 42h34v12h140v-12h34" />
        <path d="M96 30h150v12H96z" />
        <Wheel x={262} />
        <Wheel x={288} />
      </svg>
    );
  }

  // modular — many axle lines under a flat load platform
  return (
    <svg {...shared} aria-hidden>
      <Ground />
      <Cab />
      <path d="M78 40h24v10h188V40" />
      <path d="M102 50h188v8H102z" />
      {[122, 148, 174, 200, 226, 252, 278].map((x) => (
        <Wheel key={x} x={x} />
      ))}
    </svg>
  );
}
