"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { ArrowRight, CheckCircle2, Sparkles } from "lucide-react";
import { useUIStore } from "@/store/ui";

export function EmailCTA() {
  const locale = useUIStore((state) => state.locale);
  const { toast } = useToast();
  const isZh = locale === "zh";

  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const content = isZh
    ? {
        badge: "立即开始",
        title: "准备好用数据驱动增长了吗？",
        subtitle: "输入邮箱，获取免费数据服务方案",
        placeholder: "your@email.com",
        button: "免费开始",
        success: "提交成功！我们会尽快联系您",
        privacy: "我们尊重您的隐私，不会发送垃圾邮件",
        features: ["免费需求评估", "专属方案定制", "7×24小时支持"],
      }
    : {
        badge: "Get Started",
        title: "Ready to Drive Growth with Data?",
        subtitle: "Enter your email to get a free data service plan",
        placeholder: "your@email.com",
        button: "Start Free",
        success: "Submitted! We'll contact you soon",
        privacy: "We respect your privacy. No spam, ever.",
        features: ["Free Assessment", "Custom Solution", "24/7 Support"],
      };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      toast(isZh ? "请输入有效的邮箱地址" : "Please enter a valid email");
      return;
    }

    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setLoading(false);
    setSubmitted(true);
    toast(content.success);
  };

  return (
    <section className="py-24 bg-slate-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900 to-slate-950 p-8 md:p-12 lg:p-16">
          {/* Background decoration */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
            <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-primary/5 blur-3xl" />
          </div>

          <div className="relative z-10 mx-auto max-w-3xl text-center">
            {/* Badge */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm text-primary">
              <Sparkles className="h-4 w-4" />
              {content.badge}
            </div>

            {/* Title */}
            <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">
              {content.title}
            </h2>

            {/* Subtitle */}
            <p className="mb-8 text-lg text-slate-400">{content.subtitle}</p>

            {/* Email Form */}
            {!submitted ? (
              <form onSubmit={handleSubmit} className="mx-auto max-w-md">
                <div className="flex flex-col gap-3 sm:flex-row">
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={content.placeholder}
                    className="h-14 border-slate-700 bg-slate-800/50 text-white placeholder:text-slate-500 focus-visible:border-primary"
                    required
                  />
                  <Button
                    type="submit"
                    size="lg"
                    disabled={loading}
                    className="h-14 bg-primary hover:bg-primary/90 whitespace-nowrap px-8"
                  >
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <svg
                          className="h-4 w-4 animate-spin"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                            fill="none"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          />
                        </svg>
                        {isZh ? "提交中..." : "Submitting..."}
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        {content.button}
                        <ArrowRight className="h-4 w-4" />
                      </span>
                    )}
                  </Button>
                </div>

                {/* Privacy note */}
                <p className="mt-4 text-xs text-slate-500">{content.privacy}</p>
              </form>
            ) : (
              <div className="mx-auto max-w-md rounded-xl bg-primary/10 border border-primary/20 p-6">
                <div className="flex items-center justify-center gap-2 text-primary">
                  <CheckCircle2 className="h-6 w-6" />
                  <span className="text-lg font-medium">{content.success}</span>
                </div>
              </div>
            )}

            {/* Features */}
            <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-sm text-slate-500">
              {content.features.map((feature, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary/70" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
