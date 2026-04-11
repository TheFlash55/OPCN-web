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
              desc: "支持工作日晚上及周末沟通，配合您的时间",
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
              q: "项目周期一般多长？",
              a: "简单项目1-2周交付，复杂系统4-8周。我们会在需求沟通后提供详细排期。",
            },
            {
              q: "数据安全如何保障？",
              a: "签署NDA，数据加密存储，访问权限控制。合规采集，不涉及个人隐私数据。",
            },
          ],
        },
      }
    : {
        title: "Contact Us",
        subtitle: "Looking forward to working with you",
        responseTime: {
          title: "Response Time",
          items: [
            {
              icon: Clock,
              title: "24h Response",
              desc: "We respond within 24 hours on business days",
            },
            {
              icon: MessageSquare,
              title: "Free Consultation",
              desc: "First consultation is free to clarify your needs",
            },
            {
              icon: Calendar,
              title: "Flexible Schedule",
              desc: "Available evenings and weekends",
            },
          ],
        },
        contact: {
          title: "Contact Info",
          email: {
            title: "Email",
            value: "hello@opcn.ai",
            desc: "Preferred contact method",
          },
          wechat: {
            title: "WeChat",
            value: "OPCN_Data",
            desc: "Add with note 'Data Service Inquiry'",
          },
          phone: {
            title: "Phone",
            value: "+86 138-0000-0000",
            desc: "Available 10:00-19:00 weekdays",
          },
        },
        form: {
          title: "Quick Message",
          name: "Your Name",
          email: "Email",
          company: "Company/Business (optional)",
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
              a: "Based on data volume, collection frequency, and processing complexity. Starting from $149/month.",
            },
            {
              q: "How long do projects take?",
              a: "Simple projects: 1-2 weeks. Complex systems: 4-8 weeks. Detailed timeline after requirements discussion.",
            },
            {
              q: "How is data security ensured?",
              a: "NDA signing, encrypted storage, access control. Compliant collection, no personal privacy data.",
            },
          ],
        },
      };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    toast(content.form.success);
  };

  return (
    <div className="space-y-8 min-h-screen">
      <section className="text-center space-y-4 py-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-white">
          {content.title}
        </h1>
        <p className="text-zinc-400 max-w-2xl mx-auto">{content.subtitle}</p>
      </section>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2 bg-zinc-900/50 border-zinc-800/50">
          <CardHeader>
            <CardTitle className="text-white">{content.form.title}</CardTitle>
          </CardHeader>
          <CardContent>
            {submitted ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="rounded-full bg-green-500/10 p-4 mb-4">
                  <CheckCircle2 className="h-8 w-8 text-green-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  {isZh ? "感谢您的留言" : "Thank You"}
                </h3>
                <p className="text-zinc-400">{content.form.success}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-zinc-300">
                      {content.form.name}
                    </label>
                    <Input
                      required
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      placeholder="John Doe"
                      className="bg-zinc-800/50 border-zinc-700 text-white placeholder:text-zinc-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-zinc-300">
                      {content.form.email}
                    </label>
                    <Input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      placeholder="john@example.com"
                      className="bg-zinc-800/50 border-zinc-700 text-white placeholder:text-zinc-500"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-zinc-300">
                    {content.form.company}
                  </label>
                  <Input
                    value={formData.company}
                    onChange={(e) =>
                      setFormData({ ...formData, company: e.target.value })
                    }
                    className="bg-zinc-800/50 border-zinc-700 text-white placeholder:text-zinc-500"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-zinc-300">
                    {content.form.message}
                  </label>
                  <textarea
                    required
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    rows={5}
                    className="w-full rounded-md bg-zinc-800/50 border border-zinc-700 text-white placeholder:text-zinc-500 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-indigo-600 hover:bg-indigo-500 text-white"
                >
                  <Send className="mr-2 h-4 w-4" />
                  {content.form.submit}
                </Button>
              </form>
            )}
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card className="bg-zinc-900/50 border-zinc-800/50">
            <CardHeader>
              <CardTitle className="text-white text-base">
                {content.contact.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="rounded-lg bg-indigo-500/10 p-2">
                  <Mail className="h-4 w-4 text-indigo-400" />
                </div>
                <div>
                  <div className="font-medium text-white text-sm">
                    {content.contact.email.title}
                  </div>
                  <div className="text-indigo-400">
                    {content.contact.email.value}
                  </div>
                  <div className="text-xs text-zinc-400">
                    {content.contact.email.desc}
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="rounded-lg bg-green-500/10 p-2">
                  <MessageSquare className="h-4 w-4 text-green-400" />
                </div>
                <div>
                  <div className="font-medium text-white text-sm">
                    {content.contact.wechat.title}
                  </div>
                  <div className="text-green-400">
                    {content.contact.wechat.value}
                  </div>
                  <div className="text-xs text-zinc-400">
                    {content.contact.wechat.desc}
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="rounded-lg bg-blue-500/10 p-2">
                  <Phone className="h-4 w-4 text-blue-400" />
                </div>
                <div>
                  <div className="font-medium text-white text-sm">
                    {content.contact.phone.title}
                  </div>
                  <div className="text-blue-400">
                    {content.contact.phone.value}
                  </div>
                  <div className="text-xs text-zinc-400">
                    {content.contact.phone.desc}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-zinc-900/50 border-zinc-800/50">
            <CardHeader>
              <CardTitle className="text-white text-base">
                {content.responseTime.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {content.responseTime.items.map((item, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className="rounded-lg bg-indigo-500/10 p-2">
                    <item.icon className="h-4 w-4 text-indigo-400" />
                  </div>
                  <div>
                    <div className="font-medium text-white text-sm">
                      {item.title}
                    </div>
                    <div className="text-xs text-zinc-400">{item.desc}</div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>

      <Card className="bg-zinc-900/50 border-zinc-800/50">
        <CardHeader>
          <CardTitle className="text-white">{content.faq.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            {content.faq.items.map((item, idx) => (
              <div
                key={idx}
                className="rounded-lg bg-zinc-800/50 p-4 border border-zinc-700/50"
              >
                <h4 className="font-medium text-white text-sm mb-2">
                  {item.q}
                </h4>
                <p className="text-sm text-zinc-400">{item.a}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
