"use client";

// Last-resort fallback if the root layout itself throws — replaces the
// whole document, so it can't rely on globals.css or shared layout.
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 16,
          padding: 24,
          textAlign: "center",
          fontFamily: "system-ui, -apple-system, sans-serif",
          background: "#f9f9f7",
          color: "#0b0b0b",
        }}
      >
        <h1 style={{ fontSize: 20, fontWeight: 600, margin: 0 }}>Something went wrong</h1>
        <p style={{ maxWidth: 480, fontSize: 14, color: "#52514e", margin: 0 }}>{error.message}</p>
        <button
          onClick={reset}
          style={{
            borderRadius: 8,
            background: "#2a78d6",
            padding: "8px 16px",
            fontSize: 14,
            fontWeight: 600,
            color: "#fff",
            border: "none",
            cursor: "pointer",
          }}
        >
          Try again
        </button>
      </body>
    </html>
  );
}
