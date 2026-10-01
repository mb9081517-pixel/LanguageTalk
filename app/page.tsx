"use client"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"

export default function Home() {
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) router.push("/login")
      else router.push("/chat")
    })
  }, [])

  return (
    <div style={{padding:40, textAlign:"center"}}>
      <h1>LanguageTalk</h1>
      <p>Loading...</p>
      <div style={{marginTop:20}}>
        <a href="/login" style={{marginRight:15}}>Login</a>
        <a href="/signup">Signup</a>
      </div>
    </div>
  )
}
