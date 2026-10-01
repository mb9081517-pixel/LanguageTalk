"use client"
import { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [msg, setMsg] = useState("")
  const router = useRouter()
  const supabase = createClient()

  async function handleLogin(e: any) {
    e.preventDefault()
    setMsg("Logging in...")
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) setMsg(error.message)
    else {
      setMsg("Login successful!")
      router.push("/")
    }
  }

  return (
    <div style={{maxWidth:400, margin:"40px auto", padding:20}}>
      <h1>Log in</h1>
      <form onSubmit={handleLogin}>
        <input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} style={{width:"100%",padding:10,margin:"10px 0"}} />
        <input type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} style={{width:"100%",padding:10,margin:"10px 0"}} />
        <button type="submit" style={{width:"100%",padding:12}}>Log in</button>
      </form>
      <p>{msg}</p>
      <a href="/signup">No account? Sign up</a>
    </div>
  )
}
