
"use client";
import React from "react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

const Login = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-300 via-white to-blue-600 py-10">
      <Card className="w-full max-w-md shadow-2xl rounded-2xl border-0 backdrop-blur-lg p-8" style={{ background: "rgba(255,255,255,0.98)" }}>
        <div className="flex flex-col items-center mb-8">
          <div className="bg-gradient-to-tr from-blue-600 to-blue-400 rounded-full p-5 mb-4 shadow-xl">
            <svg width="48" height="48" fill="none" viewBox="0 0 24 24"><path fill="#fff" d="M12 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10Zm7 8v-1a5 5 0 0 0-5-5H10a5 5 0 0 0-5 5v1a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1Z"/></svg>
          </div>
          <h1 className="font-extrabold text-3xl text-center text-gray-900 drop-shadow-xl mb-2">Welcome Back</h1>
          <p className="text-center text-gray-500 mt-1 text-lg">Sign in to your account to continue.</p>
        </div>
        <form className="space-y-6">
          <div>
            <Label htmlFor="email" className="font-semibold text-base">Email Address <span className="text-red-500">*</span></Label>
            <Input id="email" type="email" placeholder="you@email.com" autoComplete="email" className="rounded-lg mt-2" required />
          </div>
          <div>
            <Label htmlFor="password" className="font-semibold text-base">Password <span className="text-red-500">*</span></Label>
            <Input id="password" type="password" placeholder="Your password" autoComplete="current-password" className="rounded-lg mt-2" required />
          </div>
          <Button type="submit" className="w-full font-bold text-lg rounded-lg bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 shadow-lg border-0">Login</Button>
        </form>
        <div className="flex justify-between mt-8">
          <Link href="/Account/forgot-password" className="text-blue-600 hover:underline font-semibold">Forgot password?</Link>
          <Link href="/Account/register" className="text-blue-600 hover:underline font-semibold">Create account</Link>
        </div>
      </Card>
    </div>
  );
};

export default Login;
