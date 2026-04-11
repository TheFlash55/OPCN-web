"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Quote, Star } from "lucide-react";
import { useUIStore } from "@/store/ui";

const testimonialsZh = [
  {
    name: "张明",
    role: "电商创业者",
    content:
      "OPCN 的竞品监控帮我节省了大量时间，现在我能实时掌握市场动态，及时调整定价策略。",
    rating: 5,
  },
  {
    name: "李婷",
    role: "政策研究员",
    content:
      "政策追踪功能非常精准，第一时间获取行业政策变化，让我们的研究工作更加高效。",
    rating: 5,
  },
  {
    name: "王浩",
    role: "数据分析师",
    content:
      "数据处理能力很强，从采集到洞察报告输出，整个流程非常顺畅，准确率也很高。",
    rating: 5,
  },
];

const testimonialsEn = [
  {
    name: "John Chen",
    role: "E-commerce Founder",
    content:
      "OPCN's competitor monitoring saves me tons of time. Now I can track market dynamics in real-time.",
    rating: 5,
  },
  {
    name: "Sarah Li",
    role: "Policy Researcher",
    content:
      "Policy tracking is incredibly accurate. We get industry policy changes instantly, making our research much more efficient.",
    rating: 5,
  },
  {
    name: "Mike Wang",
    role: "Data Analyst",
    content:
      "Strong data processing capabilities. From collection to insights, the entire workflow is smooth and accurate.",
    rating: 5,
  },
];

export function Testimonials() {
  const locale = useUIStore((state) => state.locale);
  const isZh = locale === "zh";
  const testimonials = isZh ? testimonialsZh : testimonialsEn;

  const content = isZh
    ? {
        title: "客户评价",
        subtitle: "来自真实用户的反馈",
      }
    : {
        title: "What Our Users Say",
        subtitle: "Feedback from real users",
      };

  return (
    <section className="py-24 bg-[#0a0a0f] relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_50%_at_50%_50%,rgba(99,102,241,0.08),transparent)]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            {content.title}
          </h2>
          <p className="mt-4 text-lg text-zinc-400">{content.subtitle}</p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((item, idx) => (
            <Card
              key={idx}
              className="bg-zinc-900/50 border-zinc-800 hover:border-indigo-500/30 transition-all duration-300 group"
            >
              <CardContent className="p-6">
                {/* Quote Icon */}
                <div className="mb-4">
                  <Quote className="h-8 w-8 text-indigo-500/30" />
                </div>

                {/* Rating */}
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: item.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-yellow-500 text-yellow-500"
                    />
                  ))}
                </div>

                {/* Content */}
                <p className="text-zinc-300 leading-relaxed mb-6">
                  "{item.content}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-3 pt-4 border-t border-zinc-800">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center text-white font-semibold text-sm">
                    {item.name[0]}
                  </div>
                  <div>
                    <div className="font-medium text-white">{item.name}</div>
                    <div className="text-sm text-zinc-500">{item.role}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Trust Logos */}
        <div className="mt-20 pt-12 border-t border-zinc-800">
          <p className="text-center text-sm text-zinc-500 mb-8">
            {isZh ? "受到以下企业信赖" : "Trusted by leading companies"}
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-50">
            {[
              "Enterprise A",
              "Enterprise B",
              "Enterprise C",
              "Enterprise D",
              "Enterprise E",
            ].map((name, idx) => (
              <div
                key={idx}
                className="text-zinc-600 font-semibold text-lg tracking-wider"
              >
                {name}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
