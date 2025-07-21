"use client";
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { ConfigModule } from "@nestjs/config";

import { useState } from "react";

const Register = () => {
  const [fullName, setFullName] = useState("");
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
      const res = await fetch("http://localhost:3000/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullName, email, password }),
      });
      const data = await res.json();
      if (data.error) {
        setError(data.error);
      } else {
        setSuccess("Registration successful! You can now log in.");
        setFullName("");
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
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-400 via-white to-blue-700 py-12">
      <Card className="w-full max-w-lg shadow-2xl rounded-2xl border-0 backdrop-blur-lg px-0 py-12 md:py-16" style={{ background: "rgba(255,255,255,0.99)" }}>
        <CardHeader className="flex flex-col items-center mb-2 gap-2">
          <div className="bg-gradient-to-tr from-blue-600 to-blue-400 rounded-full p-6 mb-3 shadow-2xl">
            <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M19 8v6M22 11h-6"/></svg>
          </div>
          <CardTitle className="text-3xl font-extrabold text-center text-gray-900 drop-shadow-xl">Create your account</CardTitle>
          <p className="text-center text-gray-500 mt-1 text-base">Join our platform and experience a modern, secure dashboard.</p>
        </CardHeader>
        <CardContent className="space-y-5">
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name <span className="text-red-500">*</span></Label>
              <Input id="fullName" name="fullName" type="text" placeholder="Your full name" autoComplete="name" required className="rounded-lg" value={fullName} onChange={e => setFullName(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address <span className="text-red-500">*</span></Label>
              <Input id="email" name="email" type="email" placeholder="you@email.com" autoComplete="email" required className="rounded-lg" value={email} onChange={e => setEmail(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password <span className="text-red-500">*</span></Label>
              <Input id="password" name="password" type="password" placeholder="Create a password" autoComplete="new-password" required className="rounded-lg" value={password} onChange={e => setPassword(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password <span className="text-red-500">*</span></Label>
              <Input id="confirmPassword" name="confirmPassword" type="password" placeholder="Repeat your password" autoComplete="new-password" required className="rounded-lg" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
            </div>
            {error && <div className="text-red-600 text-center font-semibold">{error}</div>}
            {success && <div className="text-green-600 text-center font-semibold">{success}</div>}
            <Button type="submit" className="w-full font-bold text-lg rounded-lg bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 shadow-lg border-0" disabled={loading}>
              {loading ? "Registering..." : "Register"}
            </Button>
          </form>
          <div className="text-center pt-2">
            <span className="text-gray-600 text-base">Already have an account?</span>
            <Link href="/Account/login" className="text-blue-600 hover:underline font-semibold ml-2">Login</Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Register;
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    // ...other modules
  ],
  // ...controllers and providers
})
export class AppModule {}
