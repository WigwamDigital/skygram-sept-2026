import { ImageResponse } from "next/og";
import { aspects, aspectTypes, getAspect, getAspectType } from "@/lib/aspects";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Skygram.ai astrology aspect guide";

export function generateStaticParams() {
  return [...aspectTypes.map((t) => ({ slug: t.slug })), ...aspects.map((x) => ({ slug: x.slug }))];
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const type = getAspectType(slug);
  const x = type ? null : getAspect(slug);
  const name = type ? type.name : x ? x.title : "Aspects";
  const sub = type
    ? `${type.angle}°  ·  ${type.nature}  ·  ${type.keyword}`
    : x
      ? `${x.type.name}  ·  ${x.type.angle}°  ·  ${x.type.nature}`
      : "";

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
        <div style={{ display: "flex", fontSize: 30, color: "#b3a6c9", letterSpacing: 6 }}>ASTROLOGY ASPECT</div>
        <div
          style={{
            display: "flex",
            fontSize: name.length > 18 ? 96 : 140,
            fontWeight: 700,
            marginTop: 10,
            backgroundImage: "linear-gradient(135deg, #ffc933, #b54ce0, #e0479b)",
            backgroundClip: "text",
            color: "transparent",
          }}
        >
          {name}
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
