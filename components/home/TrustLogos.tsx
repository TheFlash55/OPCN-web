"use client";

import { useUIStore } from "@/store/ui";

const contentZh = {
  title: "受到 50+ OPC 的信赖",
};

const contentEn = {
  title: "Trusted by 50+ OPCs",
};

// Placeholder logos using text - in production, replace with actual SVG logos
const logos = [
  { name: "TechStart", icon: "T" },
  { name: "DataPro", icon: "D" },
  { name: "CloudOps", icon: "C" },
  { name: "DevStudio", icon: "S" },
  { name: "NextGen", icon: "N" },
  { name: "InnoLab", icon: "I" },
];

export function TrustLogos() {
  const locale = useUIStore((state) => state.locale);
  const isZh = locale === "zh";
  const content = isZh ? contentZh : contentEn;

  return (
    <section className="py-12 border-y border-slate-800 bg-slate-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="text-center text-sm text-slate-500 mb-8">
          {content.title}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16 opacity-50">
          {logos.map((logo, idx) => (
            <div
              key={idx}
              className="flex items-center gap-2 text-slate-400 hover:text-slate-300 transition-colors"
            >
              <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-sm font-bold">
                {logo.icon}
              </div>
              <span className="text-sm font-medium hidden sm:inline">
                {logo.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
