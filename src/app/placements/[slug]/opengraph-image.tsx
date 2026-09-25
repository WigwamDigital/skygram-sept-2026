import { ImageResponse } from "next/og";
import { getPlacement, getPoint, placements, points } from "@/lib/placements";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Skygram.ai astrology placements";

export function generateStaticParams() {
  return [...points.map((p) => ({ slug: p.slug })), ...placements.map((p) => ({ slug: p.slug }))];
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const pt = getPoint(slug);
  const pl = getPlacement(slug);
  const eyebrow = pt ? "ASTROLOGY GUIDE" : (pl?.point.signLabel ?? "Placement").toUpperCase();
  const title = pt ? (pt.slug === "rising" ? "Rising Signs" : `${pt.name} Signs`) : (pl?.title ?? "Placements");
  const sub = pt ? `What your ${pt.signLabel} says about you` : pl ? pl.text.keywords.join("  ·  ") : "";

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
        <div style={{ display: "flex", fontSize: 30, color: "#b3a6c9", letterSpacing: 6 }}>{eyebrow}</div>
        <div
          style={{
            display: "flex",
            fontSize: title.length > 16 ? 110 : 140,
            fontWeight: 700,
            marginTop: 10,
            backgroundImage: "linear-gradient(135deg, #ffc933, #b54ce0, #e0479b)",
            backgroundClip: "text",
            color: "transparent",
          }}
        >
          {title}
        </div>
        <div style={{ display: "flex", fontSize: 36, marginTop: 20, color: "#d8cfe8" }}>{sub}</div>
        <div style={{ display: "flex", marginTop: "auto", fontSize: 34, fontWeight: 700 }}>
          <span style={{ color: "#ffc933" }}>skygram</span>
          <span style={{ color: "#8f84a3" }}>.ai</span>
        </div>
      </div>
    ),
    size,
  );
}
