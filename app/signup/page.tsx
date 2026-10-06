"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { createClient } from "@/lib/supabase/client"

export default function SignupPage() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [nativeLanguage, setNativeLanguage] = useState("")
  const [learningLanguage, setLearningLanguage] = useState("")
  const [msg, setMsg] = useState("")
  const [loading, setLoading] = useState(false)

  const supabase = createClient()
useEffect(() => {
  supabase.auth.getSession().then(({ data }) => {
    if (data.session) {
      window.location.replace("/dashboard")
    }
  })
}, [])
  async function handleSignup(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    if (loading) return

    setMsg("")

    const cleanName = name.trim()
    const cleanEmail = email.trim().toLowerCase()
    const cleanNativeLanguage = nativeLanguage.trim()
    const cleanLearningLanguage = learningLanguage.trim()

    if (password.length < 6) {
      setMsg("Password must be at least 6 characters.")
      return
    }

    if (!cleanName || !cleanEmail || !cleanNativeLanguage || !cleanLearningLanguage) {
      setMsg("Please fill in all fields.")
      return
    }

    setLoading(true)
    setMsg("Creating account...")

    const { data, error } = await supabase.auth.signUp({
      email: cleanEmail,
      password,
    })

    if (error) {
      setLoading(false)
      setMsg(error.message)
      return
    }

    if (!data.user) {
      setLoading(false)
      setMsg("Account could not be created. Please try again.")
      return
    }

    const username = `user_${data.user.id.slice(0, 8)}`

    const { error: profileError } = await supabase
      .from("profiles")
      .upsert(
        {
          id: data.user.id,
          username,
          full_name: cleanName,
          email: cleanEmail,
          native_language: cleanNativeLanguage,
          learning_language: cleanLearningLanguage,
        },
        {
          onConflict: "id",
        }
      )

    if (profileError) {
      setLoading(false)
      setMsg(profileError.message)
      return
    }

    setLoading(false)
    setMsg("Account created successfully!")

    setTimeout(() => {
      window.location.href = "/login"
    }, 1200)
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 text-slate-900">
      <div className="mx-auto max-w-md">

        <div className="mb-6 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-sky-100 text-3xl">
            🌐
          </div>

          <h1 className="mt-4 text-3xl font-extrabold">
            Create your account
          </h1>

          <p className="mt-2 text-slate-600">
            Join LanguageTalk and find language partners around the world.
          </p>
        </div>

        <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 sm:p-8">

          <form onSubmit={handleSignup} className="space-y-5">

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Full name
              </label>

              <input
                type="text"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

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

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 pr-14 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 px-2 py-1 text-xl"
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

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Native language
              </label>

              <input
                type="text"
                placeholder="e.g. Hindi"
                value={nativeLanguage}
                onChange={(e) => setNativeLanguage(e.target.value)}
                required
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Learning language
              </label>

              <input
                type="text"
                placeholder="e.g. English"
                value={learningLanguage}
                onChange={(e) => setLearningLanguage(e.target.value)}
                required
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-blue-600 px-5 py-3.5 font-semibold text-white transition hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>

          </form>

          {msg && (
            <p className="mt-4 text-center text-sm text-slate-600">
              {msg}
            </p>
          )}

          <p className="mt-6 text-center text-sm text-slate-600">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-semibold text-blue-600 hover:underline"
            >
              Log in
            </Link>
          </p>

        </div>
      </div>
    </main>
  )
}
