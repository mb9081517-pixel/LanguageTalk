"use client"

import { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"

export default function SignupPage() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [nativeLanguage, setNativeLanguage] = useState("")
  const [learningLanguage, setLearningLanguage] = useState("")
  const [msg, setMsg] = useState("")

  const router = useRouter()
  const supabase = createClient()

  async function handleSignup(e: any) {
    e.preventDefault()
    setMsg("Creating account...")

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    })

    if (error) {
      setMsg(error.message)
      return
    }

    if (data.user && data.session) {
      const { error: profileError } = await supabase
        .from("profiles")
        .insert({
          id: data.user.id,
          full_name: name,
          native_language: nativeLanguage,
          learning_language: learningLanguage,
        })

      if (profileError) {
        setMsg(profileError.message)
        return
      }
    }

    setMsg("Account created successfully!")
    router.push("/login")
  }

  return (
    <main style={{ maxWidth: 400, margin: "40px auto", padding: 20 }}>
      <h1>Sign up</h1>

      <form onSubmit={handleSignup}>
        <input
          placeholder="Full name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <input
          placeholder="Native language (e.g. Hindi)"
          value={nativeLanguage}
          onChange={(e) => setNativeLanguage(e.target.value)}
          required
        />

        <input
          placeholder="Learning language (e.g. English)"
          value={learningLanguage}
          onChange={(e) => setLearningLanguage(e.target.value)}
          required
        />

        <button type="submit">
          Create Account
        </button>
      </form>

      <p>{msg}</p>
    </main>
  )
          }
