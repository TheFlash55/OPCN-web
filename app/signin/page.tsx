"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

export default function SignInPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [email, setEmail] = useState("demo@opcn.ai");
  const [password, setPassword] = useState("demo123");
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        toast(data.message || "登录失败");
        return;
      }
      window.localStorage.setItem("opcn-token", data.token);
      toast("登录成功");
      router.push("/leads");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="mx-auto max-w-md">
      <CardHeader><CardTitle>Sign in</CardTitle></CardHeader>
      <CardContent className="space-y-3">
        <Input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <Input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <Button className="w-full" onClick={submit} disabled={loading}>{loading ? "Signing..." : "Sign in"}</Button>
      </CardContent>
    </Card>
  );
}