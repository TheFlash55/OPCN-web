"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

export default function SignUpPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        toast(data.message || "注册失败");
        return;
      }
      window.localStorage.setItem("opcn-token", data.token);
      toast("注册成功");
      router.push("/onboarding");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="mx-auto max-w-md">
      <CardHeader><CardTitle>Sign up</CardTitle></CardHeader>
      <CardContent className="space-y-3">
        <Input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
        <Input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <Input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <Button className="w-full" onClick={submit} disabled={loading}>{loading ? "Signing up..." : "Sign up"}</Button>
      </CardContent>
    </Card>
  );
}