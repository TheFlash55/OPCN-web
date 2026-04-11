"use client";

import { useEffect, useRef } from "react";

export function DynamicBackground() {
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    // Modern SaaS style - static dark background with subtle gradient
    root.style.background = "#0a0a0f";

    return () => {
      // Cleanup if needed
    };
  }, []);

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 -z-10"
      style={{
        background: "#0a0a0f",
      }}
    >
      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,.1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.1) 1px,transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Top gradient glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] opacity-30"
        style={{
          background:
            "radial-gradient(ellipse 50% 50% at 50% 0%, rgba(99,102,241,0.15), transparent)",
        }}
      />
    </div>
  );
}
