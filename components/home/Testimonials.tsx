"use client";

import { Quote } from "lucide-react";
import { useUIStore } from "@/store/ui";

const testimonialsZh = [
  {
    quote:
      "以前每天早上花2小时查竞品价格，现在只需要看一眼手机推送。效率提升了90%，还能第一时间跟进促销。",
    author: "张先生",
    role: "跨境电商OPC创始人",
    avatar: "Z",
  },
  {
    quote:
      "作为一人公司，我没有技术团队。OPCN帮我在一周内搭建了政策监控系统，现在我能比同行早3天知道行业变化。",
    author: "李女士",
    role: "咨询公司创始人",
    avatar: "L",
  },
  {
    quote:
      "数据报告的质量超出预期，不仅有数据，还有洞察和建议。直接用在客户提案里，非常专业。",
    author: "王先生",
    role: "市场研究顾问",
    avatar: "W",
  },
];

const testimonialsEn = [
  {
    quote:
      "Used to spend 2 hours every morning checking competitor prices. Now just glance at phone notifications. 90% efficiency boost.",
    author: "Mr. Zhang",
    role: "Cross-border E-commerce OPC",
    avatar: "Z",
  },
  {
    quote:
      "As a one-person company, I don't have a tech team. OPCN built my policy monitoring system in a week. Now I'm 3 days ahead of competitors.",
    author: "Ms. Li",
    role: "Consulting Firm Founder",
    avatar: "L",
  },
  {
    quote:
      "The data reports exceeded expectations—not just data, but insights and recommendations. Used directly in client proposals.",
    author: "Mr. Wang",
    role: "Market Research Consultant",
    avatar: "W",
  },
];

export function Testimonials() {
  const locale = useUIStore((state) => state.locale);
  const isZh = locale === "zh";
  const testimonials = isZh ? testimonialsZh : testimonialsEn;

  const content = isZh
    ? {
        title: "客户怎么说",
        subtitle: "来自真实OPC的反馈",
      }
    : {
        title: "What Our Clients Say",
        subtitle: "Feedback from real OPCs",
      };

  return (
    <section className="py-24 bg-slate-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            {content.title}
          </h2>
          <p className="mt-4 text-lg text-slate-400">{content.subtitle}</p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((item, idx) => (
            <div
              key={idx}
              className="relative rounded-2xl border border-slate-800 bg-slate-900/50 p-8"
            >
              <Quote className="absolute top-6 right-6 h-8 w-8 text-primary/20" />
              <p className="text-slate-300 mb-6 leading-relaxed">
                &ldquo;{item.quote}&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                  {item.avatar}
                </div>
                <div>
                  <div className="font-medium text-white">{item.author}</div>
                  <div className="text-sm text-slate-500">{item.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
