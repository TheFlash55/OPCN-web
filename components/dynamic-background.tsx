export function DynamicBackground() {
  return (
    <div aria-hidden className="dynamic-bg pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div className="bg-glow" />
      <div className="bg-grid" />
      <div className="bg-lines" />
      <div className="bg-noise" />

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