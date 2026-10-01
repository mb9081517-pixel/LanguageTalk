"use client"
import { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"

export default function SignupPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [msg, setMsg] = useState("")
  const router = useRouter()
  const supabase = createClient()

  async function handleSignup(e: any) {
    e.preventDefault()
    setMsg("Creating account...")
    const { error } = await supabase.auth.signUp({ email, password })
    if (error) setMsg(error.message)
    else {
      setMsg("Account created! Please login.")
      router.push("/login")
    }
  }

  return (
    <div style={{maxWidth:400, margin:"40px auto", padding:20}}>
      <h1>Sign up</h1>
      <form onSubmit={handleSignup}>
        <input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} style={{width:"100%",padding:10,margin:"10px 0"}} />
        <input type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} style={{width:"100%",padding:10,margin:"10px 0"}} />
        <button type="submit" style={{width:"100%",padding:12}}>Sign up</button>
      </form>
      <p>{msg}</p>
      <a href="/login">Already have account? Login</a>
    </div>
  )
}
