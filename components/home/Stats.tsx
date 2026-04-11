"use client";

import { useEffect, useState, useRef } from "react";
import { TrendingUp, Users, Zap, Shield } from "lucide-react";
import { useUIStore } from "@/store/ui";

const statsZh = [
  {
    icon: Users,
    value: 50,
    suffix: "+",
    label: "服务企业",
    desc: "覆盖电商、金融、政务",
  },
  {
    icon: Zap,
    value: 100,
    suffix: "ms",
    label: "查询响应",
    desc: "高性能实时处理",
    prefix: "<",
  },
  {
    icon: TrendingUp,
    value: 99.9,
    suffix: "%",
    label: "系统可用性",
    desc: "企业级高可用架构",
  },
  {
    icon: Shield,
    value: 10,
    suffix: "+",
    label: "数据类型",
    desc: "结构化与非结构化",
  },
];

const statsEn = [
  {
    icon: Users,
    value: 50,
    suffix: "+",
    label: "Clients",
    desc: "E-commerce, Finance, Gov",
  },
  {
    icon: Zap,
    value: 100,
    suffix: "ms",
    label: "Response",
    desc: "Real-time processing",
    prefix: "<",
  },
  {
    icon: TrendingUp,
    value: 99.9,
    suffix: "%",
    label: "Uptime",
    desc: "Enterprise-grade HA",
  },
  {
    icon: Shield,
    value: 10,
    suffix: "+",
    label: "Data Types",
    desc: "Structured & Unstructured",
  },
];

function AnimatedNumber({
  value,
  suffix = "",
  prefix = "",
}: {
  value: number;
  suffix?: string;
  prefix?: string;
}) {
  const [displayValue, setDisplayValue] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          const duration = 2000;
          const steps = 60;
          const increment = value / steps;
          let current = 0;
          const timer = setInterval(() => {
            current += increment;
            if (current >= value) {
              setDisplayValue(value);
              clearInterval(timer);
            } else {
              setDisplayValue(Number(current.toFixed(1)));
            }
          }, duration / steps);
        }
      },
      { threshold: 0.5 },
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [value, hasAnimated]);

  return (
    <span ref={ref}>
      {prefix}
      {displayValue}
      {suffix}
    </span>
  );
}

export function Stats() {
  const locale = useUIStore((state) => state.locale);
  const isZh = locale === "zh";
  const stats = isZh ? statsZh : statsEn;

  const content = isZh
    ? {
        title: "数据驱动价值",
        subtitle: "用数字证明我们的实力",
      }
    : {
        title: "Data-Driven Value",
        subtitle: "Proven by numbers",
      };

  return (
    <section className="py-20 bg-[#0a0a0f] border-y border-zinc-800/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-white">
            {content.title}
          </h2>
          <p className="mt-2 text-zinc-500">{content.subtitle}</p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="relative group p-6 rounded-xl bg-zinc-900/30 border border-zinc-800 hover:border-indigo-500/30 transition-all duration-300"
            >
              {/* Icon */}
              <div className="mb-4 inline-flex items-center justify-center w-10 h-10 rounded-lg bg-indigo-500/10 text-indigo-400">
                <stat.icon className="h-5 w-5" />
              </div>

              {/* Value */}
              <div className="text-3xl sm:text-4xl font-bold text-white mb-1">
                <AnimatedNumber
                  value={stat.value}
                  suffix={stat.suffix}
                  prefix={stat.prefix}
                />
              </div>

              {/* Label */}
              <div className="text-sm font-medium text-zinc-300 mb-1">
                {stat.label}
              </div>
              <div className="text-xs text-zinc-500">{stat.desc}</div>

              {/* Hover Glow */}
              <div className="absolute inset-0 rounded-xl bg-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
