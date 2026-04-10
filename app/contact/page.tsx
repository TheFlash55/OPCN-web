"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import {
  Mail,
  Clock,
  MessageSquare,
  Send,
  CheckCircle2,
  Phone,
  MapPin,
  Calendar,
} from "lucide-react";
import { t } from "@/lib/i18n";
import { useUIStore } from "@/store/ui";

export default function ContactPage() {
  const locale = useUIStore((state) => state.locale);
  const text = t(locale);
  const { toast } = useToast();
  const isZh = locale === "zh";

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const content = isZh
    ? {
        title: "联系我们",
        subtitle: "期待与您的合作，让我们一起用数据驱动业务增长",
        responseTime: {
          title: "响应时间承诺",
          items: [
            {
              icon: Clock,
              title: "24小时内回复",
              desc: "工作日提交的需求，24小时内必有回应",
            },
            {
              icon: MessageSquare,
              title: "免费需求评估",
              desc: "首次咨询免费，帮助您明确数据需求",
            },
            {
              icon: Calendar,
              title: "灵活预约",
              desc: "支持工作日晚上及周末沟通，配合OPC时间",
            },
          ],
        },
        contact: {
          title: "联系方式",
          email: {
            title: "电子邮箱",
            value: "hello@opcn.ai",
            desc: "首选联系方式，随时欢迎咨询",
          },
          wechat: {
            title: "微信",
            value: "OPCN_Data",
            desc: "添加请备注「数据服务咨询」",
          },
          phone: {
            title: "电话",
            value: "+86 138-0000-0000",
            desc: "工作日 10:00-19:00 可接听",
          },
        },
        form: {
          title: "快速留言",
          name: "您的姓名",
          email: "电子邮箱",
          company: "公司/业务名称（选填）",
          message: "请描述您的数据需求...",
          submit: "发送消息",
          submitting: "发送中...",
          success: "消息已发送，我们会尽快回复您！",
        },
        faq: {
          title: "常见问题",
          items: [
            {
              q: "服务价格如何计算？",
              a: "根据数据量、采集频率、处理复杂度定价。基础套餐 ¥999/月起，支持按需定制。",
            },
            {
              q: "数据安全如何保障？",
              a: "我们仅采集公开数据，所有数据加密存储，签署保密协议，支持私有化部署。",
            },
            {
              q: "多久能看到效果？",
              a: "简单监控任务3-5天上线，完整报告系统1-2周交付，首月即可看到数据价值。",
            },
            {
              q: "是否支持技术交接？",
              a: "支持！我们交付的不仅是数据，还包括代码、文档和培训，让您掌握方法论。",
            },
          ],
        },
      }
    : {
        title: "Contact Us",
        subtitle:
          "Looking forward to working with you. Let's drive business growth with data.",
        responseTime: {
          title: "Response Time Promise",
          items: [
            {
              icon: Clock,
              title: "Reply within 24h",
              desc: "Weekday inquiries receive response within 24 hours",
            },
            {
              icon: MessageSquare,
              title: "Free Needs Assessment",
              desc: "First consultation free, help clarify your data requirements",
            },
            {
              icon: Calendar,
              title: "Flexible Scheduling",
              desc: "Available evenings and weekends to fit OPC schedules",
            },
          ],
        },
        contact: {
          title: "Contact Information",
          email: {
            title: "Email",
            value: "hello@opcn.ai",
            desc: "Preferred contact method, inquiries always welcome",
          },
          wechat: {
            title: "WeChat",
            value: "OPCN_Data",
            desc: "Please mention 'Data Service Inquiry' when adding",
          },
          phone: {
            title: "Phone",
            value: "+86 138-0000-0000",
            desc: "Available weekdays 10:00-19:00",
          },
        },
        form: {
          title: "Quick Message",
          name: "Your Name",
          email: "Email Address",
          company: "Company/Business Name (Optional)",
          message: "Describe your data needs...",
          submit: "Send Message",
          submitting: "Sending...",
          success: "Message sent! We'll get back to you soon.",
        },
        faq: {
          title: "FAQ",
          items: [
            {
              q: "How is pricing calculated?",
              a: "Based on data volume, collection frequency, and processing complexity. Basic plans from $149/month, custom solutions available.",
            },
            {
              q: "How is data security ensured?",
              a: "We only collect public data, encrypt all storage, sign NDAs, and support private deployment.",
            },
            {
              q: "How soon can I see results?",
              a: "Simple monitoring tasks go live in 3-5 days, full reporting systems in 1-2 weeks. Value is visible in the first month.",
            },
            {
              q: "Do you provide tech handover?",
              a: "Yes! We deliver not just data but also code, documentation, and training so you own the methodology.",
            },
          ],
        },
      };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setSubmitted(true);
    toast(content.form.success);
  };

  return (
    <div className="space-y-8">
      {/* Hero */}
      <section className="text-center space-y-4 py-8">
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
          {content.title}
        </h1>
        <p className="max-w-2xl mx-auto text-muted-foreground text-lg">
          {content.subtitle}
        </p>
      </section>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Left Column - Contact Info & Form */}
        <div className="space-y-6">
          {/* Response Time Promise */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary" />
                {content.responseTime.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {content.responseTime.items.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="p-1.5 rounded-md bg-primary/10">
                      <item.icon className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium text-sm">{item.title}</h4>
                      <p className="text-sm text-muted-foreground">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Contact Methods */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-primary" />
                {content.contact.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/30">
                <Mail className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <h4 className="font-medium text-sm">
                    {content.contact.email.title}
                  </h4>
                  <p className="text-primary font-mono">
                    {content.contact.email.value}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {content.contact.email.desc}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/30">
                <MessageSquare className="h-5 w-5 text-green-500 mt-0.5" />
                <div>
                  <h4 className="font-medium text-sm">
                    {content.contact.wechat.title}
                  </h4>
                  <p className="font-mono">{content.contact.wechat.value}</p>
                  <p className="text-xs text-muted-foreground">
                    {content.contact.wechat.desc}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/30">
                <Phone className="h-5 w-5 text-blue-500 mt-0.5" />
                <div>
                  <h4 className="font-medium text-sm">
                    {content.contact.phone.title}
                  </h4>
                  <p className="font-mono">{content.contact.phone.value}</p>
                  <p className="text-xs text-muted-foreground">
                    {content.contact.phone.desc}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Contact Form */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Send className="h-5 w-5 text-primary" />
              {content.form.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {submitted ? (
              <div className="text-center py-12">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500/10 mb-4">
                  <CheckCircle2 className="h-8 w-8 text-green-500" />
                </div>
                <h3 className="text-lg font-semibold mb-2">
                  {content.form.success}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {isZh ? "我们会尽快与您联系" : "We'll contact you soon"}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-1.5 block">
                    {content.form.name}
                  </label>
                  <Input
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder={isZh ? "您的称呼" : "Your name"}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1.5 block">
                    {content.form.email}
                  </label>
                  <Input
                    required
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    placeholder="email@example.com"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1.5 block">
                    {content.form.company}
                  </label>
                  <Input
                    value={formData.company}
                    onChange={(e) =>
                      setFormData({ ...formData, company: e.target.value })
                    }
                    placeholder={
                      isZh ? "您的公司或业务" : "Your company or business"
                    }
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1.5 block">
                    {content.form.message}
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    placeholder={content.form.message}
                    className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                  />
                </div>
                <Button type="submit" className="w-full">
                  <Send className="mr-2 h-4 w-4" />
                  {content.form.submit}
                </Button>
              </form>
            )}
          </CardContent>
        </Card>
      </div>

      {/* FAQ */}
      <Card>
        <CardHeader>
          <CardTitle>{content.faq.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            {content.faq.items.map((item, idx) => (
              <div key={idx} className="p-4 rounded-lg border border-border/50">
                <h4 className="font-medium text-sm mb-2">{item.q}</h4>
                <p className="text-sm text-muted-foreground">{item.a}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
