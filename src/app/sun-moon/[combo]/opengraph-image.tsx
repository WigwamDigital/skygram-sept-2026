import { ImageResponse } from "next/og";
import { getSunMoon, sunMoons } from "@/lib/sunmoon";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Skygram.ai Sun and Moon sign combination";

export function generateStaticParams() {
  return sunMoons.map((c) => ({ combo: c.slug }));
}

export default async function Image({ params }: { params: Promise<{ combo: string }> }) {
  const c = getSunMoon((await params).combo);
  const title = c ? c.title : "Sun & Moon Signs";
  const sub = c ? `${c.sun.element} Sun  ·  ${c.moon.element} Moon  ·  ${c.sun.name} outside, ${c.moon.name} inside` : "";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          color: "#ede7f6",
          background: "linear-gradient(135deg, #0f0f2e 0%, #231a3a 55%, #3b1a33 100%)",
        }}
      >
        <div style={{ display: "flex", fontSize: 30, color: "#b3a6c9", letterSpacing: 6 }}>SUN & MOON SIGN COMBINATION</div>
        <div
          style={{
            display: "flex",
            fontSize: 110,
            fontWeight: 700,
            marginTop: 10,
            backgroundImage: "linear-gradient(135deg, #ffc933, #b54ce0, #e0479b)",
            backgroundClip: "text",
            color: "transparent",
          }}
        >
          {title}
        </div>
        <div style={{ display: "flex", fontSize: 34, marginTop: 20, color: "#d8cfe8" }}>{sub}</div>
        <div style={{ display: "flex", marginTop: "auto", fontSize: 34, fontWeight: 700 }}>
          <span style={{ color: "#ffc933" }}>skygram</span>
          <span style={{ color: "#8f84a3" }}>.ai</span>
        </div>
      </div>
    ),
    size,
  );
}
