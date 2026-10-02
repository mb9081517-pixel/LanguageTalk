'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase/client'

export default function ChatPage() {
  const [email, setEmail] = useState('')
  useEffect(() => {
    supabase.auth.getUser().then(({data}) => {
      if(data?.user) setEmail(data.user.email || '')
    })
  }, [])
  return (
    <div style={{padding: 20, color: 'white', background: 'black', minHeight: '100vh'}}>
      <h1 style={{fontSize: 24, fontWeight: 'bold'}}>Chat Page Working! 🎉</h1>
      <p style={{marginTop: 10}}>Logged in as: {email}</p>
      <a href="/" style={{color: 'cyan', display: 'block', marginTop: 20}}>Go to Home</a>
    </div>
  )
}
