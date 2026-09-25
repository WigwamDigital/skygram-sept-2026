import { ImageResponse } from "next/og";
import { getPairing, pairings } from "@/lib/compatibility";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Skygram.ai zodiac compatibility";

export function generateStaticParams() {
  return pairings.map((p) => ({ pair: p.slug }));
}

export default async function Image({ params }: { params: Promise<{ pair: string }> }) {
  const p = getPairing((await params).pair);
  const title = p ? `${p.a.name} & ${p.b.name}` : "Compatibility";
  const score = p?.scores.overall ?? 0;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          padding: "80px",
          color: "#ede7f6",
          background: "linear-gradient(135deg, #0f0f2e 0%, #231a3a 55%, #3b1a33 100%)",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
          <div style={{ display: "flex", fontSize: 30, color: "#b3a6c9", letterSpacing: 6 }}>ZODIAC COMPATIBILITY</div>
          <div
            style={{
              display: "flex",
              fontSize: title.length > 18 ? 88 : 108,
              fontWeight: 700,
              marginTop: 10,
              backgroundImage: "linear-gradient(135deg, #ffc933, #b54ce0, #e0479b)",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            {title}
          </div>
          <div style={{ display: "flex", fontSize: 32, marginTop: 16, color: "#d8cfe8" }}>{p?.verdict ?? ""}</div>
          <div style={{ display: "flex", marginTop: 60, fontSize: 34, fontWeight: 700 }}>
            <span style={{ color: "#ffc933" }}>skygram</span>
            <span style={{ color: "#8f84a3" }}>.ai</span>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: 260,
            height: 260,
            borderRadius: 999,
            border: "14px solid #b54ce0",
            background: "rgba(255,255,255,0.04)",
          }}
        >
          <div style={{ display: "flex", fontSize: 96, fontWeight: 700 }}>{score}</div>
          <div style={{ display: "flex", fontSize: 24, color: "#b3a6c9" }}>OUT OF 100</div>
        </div>
      </div>
    ),
    size,
  );
}
