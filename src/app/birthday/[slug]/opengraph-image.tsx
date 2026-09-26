import { ImageResponse } from "next/og";
import { MONTHS, birthdayDates, getBirthdayDate, getMonthBySlug, monthNumbers, monthSlug } from "@/lib/birthday";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Skygram.ai birthday zodiac guide";

export function generateStaticParams() {
  return [...monthNumbers.map((m) => ({ slug: monthSlug(m) })), ...birthdayDates.map((d) => ({ slug: d.slug }))];
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const slug = (await params).slug;
  const date = getBirthdayDate(slug);
  const month = getMonthBySlug(slug);
  const title = date ? date.label : month ? MONTHS[month - 1] : "Birthdays";
  const sub = date
    ? `${date.sign.name}  ·  Decan ${date.decan}  ·  Ruled by ${date.decanRuler}`
    : "Birthday zodiac signs, decans & meanings";

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
        <div style={{ display: "flex", fontSize: 30, color: "#b3a6c9", letterSpacing: 6 }}>BIRTHDAY ZODIAC SIGN</div>
        <div
          style={{
            display: "flex",
            fontSize: 150,
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
