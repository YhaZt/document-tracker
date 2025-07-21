
"use client";
import React from "react";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useState } from "react";

const ChangePassword = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("http://localhost:3000/auth/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, newPassword: password }),
      });
      const data = await res.json();
      if (data.error) {
        setError(data.error);
      } else {
        setSuccess("Password changed successfully!");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
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
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 17v-1a4 4 0 0 1 4-4h2a4 4 0 0 1 4 4v1"/><circle cx="16" cy="7" r="4"/><path d="M8 7v4M6 9h4"/></svg>
          </div>
          <CardTitle className="text-3xl font-extrabold text-center text-gray-900 drop-shadow-xl">Change Password</CardTitle>
          <p className="text-center text-gray-500 mt-1 text-base">Set a new password for your account.</p>
        </CardHeader>
        <CardContent className="space-y-5">
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address <span className="text-red-500">*</span></Label>
              <Input id="email" name="email" type="email" placeholder="Your email" autoComplete="email" required className="rounded-lg" value={email} onChange={e => setEmail(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">New Password <span className="text-red-500">*</span></Label>
              <Input id="password" name="password" type="password" placeholder="New password" autoComplete="new-password" required className="rounded-lg" value={password} onChange={e => setPassword(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password <span className="text-red-500">*</span></Label>
              <Input id="confirmPassword" name="confirmPassword" type="password" placeholder="Repeat new password" autoComplete="new-password" required className="rounded-lg" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
            </div>
            {error && <div className="text-red-600 text-center font-semibold">{error}</div>}
            {success && <div className="text-green-600 text-center font-semibold">{success}</div>}
            <Button type="submit" className="w-full font-bold text-lg rounded-lg bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 shadow-lg border-0" disabled={loading}>
              {loading ? "Changing..." : "Change Password"}
            </Button>
          </form>
          <div className="text-center pt-2">
            <Link href="/Account/login" className="text-blue-600 hover:underline font-semibold">Back to login</Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ChangePassword;
