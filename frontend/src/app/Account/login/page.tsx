
"use client";
import React from "react";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (success) {
      router.push("/Admin/DocumentInput");
    }
  }, [success, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      const res = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (data.error) {
        setError(data.error);
      } else {
        // Save JWT token to localStorage
        if (data.token) {
          localStorage.setItem("token", data.token);
        }
        setSuccess("Login successful!");
        router.push("/Admin/DocumentInput");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-300 via-white to-blue-600 py-10">
      <Card className="w-full max-w-md shadow-2xl rounded-2xl border-0 backdrop-blur-lg px-0 py-12 md:py-16">
        <CardHeader className="flex flex-col items-center mb-2 gap-2">
          <div className="bg-gradient-to-tr from-blue-600 to-blue-400 rounded-full p-5 mb-2 shadow-xl">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><circle cx="12" cy="7" r="4"/></svg>
          </div>
          <CardTitle className="text-3xl font-extrabold text-center text-gray-900 drop-shadow-xl">Welcome Back</CardTitle>
          <p className="text-center text-gray-500 mt-1 text-base">Sign in to your account to continue.</p>
        </CardHeader>
        <CardContent className="space-y-5">
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address <span className="text-red-500">*</span></Label>
              <Input id="email" name="email" type="email" placeholder="you@email.com" autoComplete="email" required className="rounded-lg" value={email} onChange={e => setEmail(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password <span className="text-red-500">*</span></Label>
              <Input id="password" name="password" type="password" placeholder="Your password" autoComplete="current-password" required className="rounded-lg" value={password} onChange={e => setPassword(e.target.value)} />
            </div>
            {error && <div className="text-red-600 text-center font-semibold">{error}</div>}
            {success && <div className="text-green-600 text-center font-semibold">{success}</div>}
            <Button type="submit" className="w-full font-bold text-lg rounded-lg bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 shadow-lg border-0" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </Button>
          </form>
          <div className="flex justify-between pt-2">
            <Link href="/Account/forgot-password" className="text-blue-600 hover:underline font-semibold">Forgot password?</Link>
            <Link href="/Account/register" className="text-blue-600 hover:underline font-semibold">Create account</Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
