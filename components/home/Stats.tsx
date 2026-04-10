"use client";

import { useEffect, useState } from "react";
import { useUIStore } from "@/store/ui";

const statsZh = [
  { value: 50, suffix: "+", label: "服务客户" },
  { value: 10, suffix: "M+", label: "日均数据点" },
  { value: 90, suffix: "%", label: "效率提升" },
  { value: 5, suffix: "min", label: "响应速度" },
];

const statsEn = [
  { value: 50, suffix: "+", label: "Clients Served" },
  { value: 10, suffix: "M+", label: "Daily Data Points" },
  { value: 90, suffix: "%", label: "Efficiency Gain" },
  { value: 5, suffix: "min", label: "Response Time" },
];

function AnimatedNumber({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const increment = value / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [value]);

  return (
    <span className="tabular-nums">
      {count}
      {suffix}
    </span>
  );
}

export function Stats() {
  const locale = useUIStore((state) => state.locale);
  const isZh = locale === "zh";
  const stats = isZh ? statsZh : statsEn;

  return (
    <section className="py-16 border-y border-slate-800 bg-slate-950/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {stats.map((stat, idx) => (
            <div key={idx} className="text-center">
              <div className="text-4xl font-bold text-white md:text-5xl">
                <AnimatedNumber value={stat.value} suffix={stat.suffix} />
              </div>
              <div className="mt-2 text-sm text-slate-400">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
