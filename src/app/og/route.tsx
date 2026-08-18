import { ImageResponse } from "next/og";
import type { NextRequest } from "next/server";

import { personConfig } from "@/config/person";
import { siteConfig } from "@/config/site";

export const runtime = "edge";

const SIZE = { width: 1200, height: 630 };

/** Keeps long titles from overflowing the card. */
function clamp(value: string, max: number) {
  return value.length > max ? `${value.slice(0, max - 1).trimEnd()}…` : value;
}

/**
 * Dynamic Open Graph image. Generated per request instead of shipping large
 * static assets: /og?heading=...&eyebrow=...&subtitle=...
 */
export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const heading = clamp(
    searchParams.get("heading") || personConfig.name,
    90
  );
  const eyebrow = clamp(
    searchParams.get("eyebrow") || "developer.timstittus.com",
    60
  );
  const subtitle = clamp(
    searchParams.get("subtitle") || personConfig.headline,
    140
  );

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#09090b",
          backgroundImage:
            "radial-gradient(circle at 20% 0%, #1e293b 0%, transparent 55%), radial-gradient(circle at 90% 100%, #172554 0%, transparent 45%)",
          padding: "72px",
          color: "#fafafa",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 26,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "#94a3b8",
          }}
        >
          {eyebrow}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          <div
            style={{
              display: "flex",
              fontSize: heading.length > 46 ? 62 : 78,
              fontWeight: 700,
              lineHeight: 1.08,
              letterSpacing: "-0.02em",
            }}
          >
            {heading}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 30,
              lineHeight: 1.35,
              color: "#cbd5e1",
            }}
          >
            {subtitle}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid #27272a",
            paddingTop: "28px",
            fontSize: 26,
            color: "#e4e4e7",
          }}
        >
          <div style={{ display: "flex" }}>{personConfig.name}</div>
          <div style={{ display: "flex", color: "#94a3b8" }}>
            {siteConfig.url.replace("https://", "")}
          </div>
        </div>
      </div>
    ),
    {
      ...SIZE,
      headers: {
        "cache-control": "public, immutable, no-transform, max-age=31536000",
      },
    }
  );
}
