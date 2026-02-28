"use client";

import { useEffect, useRef } from "react";

export function DynamicBackground() {
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    let raf = 0;
    let currentX = 0;
    let currentY = 0;
    let targetX = 0;
    let targetY = 0;

    const tick = () => {
      currentX += (targetX - currentX) * 0.08;
      currentY += (targetY - currentY) * 0.08;
      root.style.setProperty("--mx", currentX.toFixed(4));
      root.style.setProperty("--my", currentY.toFixed(4));
      raf = window.requestAnimationFrame(tick);
    };

    const onMove = (e: MouseEvent) => {
      const nx = e.clientX / window.innerWidth;
      const ny = e.clientY / window.innerHeight;
      targetX = (nx - 0.5) * 2;
      targetY = (ny - 0.5) * 2;
      root.style.setProperty("--spot-x", `${(nx * 100).toFixed(2)}%`);
      root.style.setProperty("--spot-y", `${(ny * 100).toFixed(2)}%`);
    };

    const onLeave = () => {
      targetX = 0;
      targetY = 0;
      root.style.setProperty("--spot-x", "50%");
      root.style.setProperty("--spot-y", "38%");
    };

    root.style.setProperty("--mx", "0");
    root.style.setProperty("--my", "0");
    root.style.setProperty("--spot-x", "50%");
    root.style.setProperty("--spot-y", "38%");

    raf = window.requestAnimationFrame(tick);
    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseleave", onLeave);

    return () => {
      window.cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <div ref={rootRef} aria-hidden className="dynamic-bg pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div className="bg-glow" />
      <div className="bg-grid" />
      <div className="bg-lines" />
      <div className="bg-noise" />
      <div className="bg-spotlight" />

      <svg className="bg-network" viewBox="0 0 1000 700" preserveAspectRatio="none">
        <path className="net-line line-a" d="M20 130 L180 95 L300 210 L420 160 L590 250 L780 180 L980 260" />
        <path className="net-line line-b" d="M40 520 L210 420 L360 460 L510 340 L700 390 L860 320 L980 360" />
        <path className="net-line line-c" d="M120 650 L280 540 L390 570 L560 470 L720 520 L910 450" />
        <circle className="net-node n1" cx="180" cy="95" r="3" />
        <circle className="net-node n2" cx="420" cy="160" r="3" />
        <circle className="net-node n3" cx="700" cy="390" r="3" />
        <circle className="net-node n4" cx="560" cy="470" r="3" />
        <circle className="net-node n5" cx="860" cy="320" r="3" />
      </svg>

      <div className="bg-sparks">
        <span className="spark s1" />
        <span className="spark s2" />
        <span className="spark s3" />
        <span className="spark s4" />
        <span className="spark s5" />
        <span className="spark s6" />
      </div>
    </div>
  );
}