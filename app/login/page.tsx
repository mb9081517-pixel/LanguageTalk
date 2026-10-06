"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
const [showPassword, setShowPassword] = useState(false);
const [msg, setMsg] = useState("");

  const router = useRouter();
  const supabase = createClient();

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMsg("Logging in...");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setMsg(error.message);
      return;
    }

    router.push("/dashboard");
  }

  async function handleForgotPassword() {
    if (!email) {
      setMsg("Please enter your email first.");
      return;
    }

    setMsg("Sending password reset email...");

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });

    if (error) {
      setMsg(error.message);
      return;
    }

    setMsg("Password reset email sent. Check your inbox.");
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 text-slate-900">
      <div className="mx-auto max-w-md">
        <div className="mb-6 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-sky-100 text-3xl">
            🌐
          </div>

          <h1 className="mt-4 text-3xl font-extrabold">
            Welcome back
          </h1>

          <p className="mt-2 text-slate-600">
            Log in to continue your language journey.
          </p>
        </div>

        <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 sm:p-8">
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Email
              </label>

              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Password
              </label>

              <<div className="relative">
  <input
    type={showPassword ? "text" : "password"}
    placeholder="Your password"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    required
    className="w-full rounded-xl border border-slate-300 px-4 py-3 pr-14 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
  />

  <button
    type="button"
    onClick={() => setShowPassword(!showPassword)}
    className="absolute right-3 top-1/2 -translate-y-1/2"
    aria-label={showPassword ? "Hide password" : "Show password"}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="black"
      strokeWidth="2"
      className="h-6 w-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2.25 12s3.75-6 9.75-6 9.75 6 9.75 6-3.75 6-9.75 6-9.75-6-9.75-6Z"
      />
      <circle cx="12" cy="12" r="2.5" fill="black" />
    </svg>
  </button>
</div>
            </div>

            <div className="text-right">
              <button
                type="button"
                onClick={handleForgotPassword}
                className="text-sm font-semibold text-blue-600 hover:underline"
              >
                Forgot password?
              </button>
            </div>

            <button
              type="submit"
              className="w-full rounded-xl bg-blue-600 px-5 py-3.5 font-semibold text-white hover:bg-blue-700"
            >
              Log in
            </button>
          </form>

          {msg && (
            <p className="mt-4 text-center text-sm text-slate-600">
              {msg}
            </p>
          )}

          <p className="mt-6 text-center text-sm text-slate-600">
            Don't have an account?{" "}
            <button
              type="button"
              onClick={() => router.push("/signup")}
              className="font-semibold text-blue-600 hover:underline"
            >
              Sign up
            </button>
          </p>
        </div>
      </div>
    </main>
  );
        }
