"use client";

import { Hero } from "@/components/home/Hero";
import { Features } from "@/components/home/Features";
import { Stats } from "@/components/home/Stats";
import { Workflow } from "@/components/home/Workflow";
import { Testimonials } from "@/components/home/Testimonials";
import { EmailCTA } from "@/components/EmailCTA";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#0a0a0f]">
      {/* Hero Section - 主标题 + 代码示例 */}
      <Hero />

      {/* Stats Section - 数据指标 */}
      <Stats />

      {/* Features Section - 快速开始 + 理念区 */}
      <Features />

      {/* Workflow Section - 服务流程 + 案例展示 */}
      <Workflow />

      {/* Testimonials Section - 客户评价 + 信任背书 */}
      <Testimonials />

      {/* Email CTA Section - 底部行动号召 */}
      <EmailCTA />
    </main>
  );
}
