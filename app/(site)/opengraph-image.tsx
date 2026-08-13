import { ImageResponse } from "next/og";
import { company, contact, yearsTrading } from "@/lib/lts/content";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${company.name} — heavy haulage and abnormal load specialists`;

/** Social card. Flexbox only — ImageResponse does not support CSS grid. */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#070a0e",
          padding: 72,
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 76,
              height: 76,
              backgroundColor: "#ffb400",
              color: "#070a0e",
              fontSize: 26,
              fontWeight: 700,
            }}
          >
            LTS
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                color: "#ffffff",
                fontSize: 30,
                fontWeight: 600,
                letterSpacing: 3,
              }}
            >
              LEWIS TRANSPORT
            </div>
            <div style={{ color: "#6d7a89", fontSize: 19, letterSpacing: 5 }}>
              {`SERVICES · EST. ${company.founded}`}
            </div>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              color: "#ffffff",
              fontSize: 66,
              fontWeight: 700,
              lineHeight: 1.1,
              maxWidth: 900,
            }}
          >
            {"Heavy haulage & abnormal loads"}
          </div>
          <div style={{ color: "#ffb400", fontSize: 32, marginTop: 20 }}>
            {`UK & Europe · ${yearsTrading} years · 150,000kg+ capability`}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "2px solid #2b3441",
            paddingTop: 28,
            color: "#aab5c2",
            fontSize: 26,
          }}
        >
          <div style={{ display: "flex" }}>Doveridge, Derbyshire</div>
          <div style={{ display: "flex", color: "#ffffff", fontWeight: 600 }}>
            {contact.phone}
          </div>
        </div>
      </div>
    ),
    size,
  );
}
