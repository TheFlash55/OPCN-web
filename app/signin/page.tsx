"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

type SignInResponse = {
  message?: string;
  token?: string;
};

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

      const raw = await res.text();
      const data: SignInResponse = raw ? JSON.parse(raw) : {};

      if (!res.ok) {
        toast(data.message || "Sign in failed");
        return;
      }

      if (!data.token) {
        toast("Sign in failed");
        return;
      }

      window.localStorage.setItem("opcn-token", data.token);
      toast("Sign in success");
      router.push("/leads");
    } catch {
      toast("Sign in failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="mx-auto max-w-md">
      <CardHeader>
        <CardTitle>Sign in</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <Input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <Input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <Button className="w-full" onClick={submit} disabled={loading}>
          {loading ? "Signing..." : "Sign in"}
        </Button>
      </CardContent>
    </Card>
  );
}
