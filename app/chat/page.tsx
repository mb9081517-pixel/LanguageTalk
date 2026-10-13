
'use client'

import { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase/client'

type Profile = {
  id: string
  username: string | null
  full_name: string | null
  native_language: string | null
  learning_language: string | null
}

type ChatMessage = {
  id: number
  sender_id: string
  receiver_id: string | null
  message: string
  created_at: string
}

export default function ChatPage() {
  const router = useRouter()

  const [userId, setUserId] = useState('')
  const [people, setPeople] = useState<Profile[]>([])
  const [selectedId, setSelectedId] = useState('')
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [draft, setDraft] = useState('')
  const [loading, setLoading] = useState(true)
  const [sending, setSending] = useState(false)
  const [notice, setNotice] = useState('')

  useEffect(() => {
    let active = true

    async function startChat() {
      const { data, error } = await supabase.auth.getUser()

      if (error || !data.user) {
        router.replace('/login')
        return
      }

      if (!active) return

      setUserId(data.user.id)

      const { data: profiles, error: profileError } = await supabase
        .from('profiles')
        .select(
          'id, username, full_name, native_language, learning_language'
        )
        .neq('id', data.user.id)
        .limit(100)

      if (!active) return

      if (profileError) {
        setNotice(`Could not load members: ${profileError.message}`)
      } else {
        const list = (profiles || []) as Profile[]
        setPeople(list)

        if (list.length > 0) {
          setSelectedId(list[0].id)
        } else {
          setNotice('No other members found yet.')
        }
      }

      setLoading(false)
    }

    startChat()

    return () => {
      active = false
    }
  }, [router])

  const loadMessages = useCallback(async () => {
    if (!userId || !selectedId) {
      setMessages([])
      return
    }

    const { data, error } = await supabase
      .from('messages')
      .select('id, sender_id, receiver_id, message, created_at')
      .or(
        `and(sender_id.eq.${userId},receiver_id.eq.${selectedId}),and(sender_id.eq.${selectedId},receiver_id.eq.${userId})`
      )
      .order('created_at', { ascending: true })

    if (error) {
      setNotice(`Could not load messages: ${error.message}`)
      return
    }

    setMessages((data || []) as ChatMessage[])
    setNotice('')
  }, [userId, selectedId])

  useEffect(() => {
    loadMessages()
  }, [loadMessages])

  async function sendMessage(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const text = draft.trim()

    if (!text || !userId || !selectedId || sending) return

    setSending(true)
    setNotice('')

    const { error } = await supabase.from('messages').insert({
      sender_id: userId,
      receiver_id: selectedId,
      message: text,
    })

    setSending(false)

    if (error) {
      setNotice(`Message not sent: ${error.message}`)
      return
    }

    setDraft('')
    await loadMessages()
  }

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50">
        Loading messages...
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-slate-50 p-4 text-slate-900 sm:p-8">
      <section className="mx-auto max-w-3xl overflow-hidden rounded-2xl bg-white shadow-sm">
        <header className="flex items-center justify-between border-b p-4">
          <div>
            <h1 className="text-2xl font-bold">LanguageTalk Chat</h1>
            <p className="mt-1 text-sm text-slate-500">
              Message your language partners
            </p>
          </div>

          <button
            type="button"
            onClick={() => router.push('/dashboard')}
            className="rounded-full border px-4 py-2"
          >
            Dashboard
          </button>
        </header>

        <div className="border-b p-4">
          <label htmlFor="chat-member" className="mb-2 block font-semibold">
            Choose a member
          </label>

          <select
            id="chat-member"
            value={selectedId}
            onChange={(event) => setSelectedId(event.target.value)}
            className="w-full rounded-xl border border-slate-300 bg-white p-3"
          >
            <option value="">Select a member</option>
            {people.map((person) => (
              <option key={person.id} value={person.id}>
                {person.full_name || person.username || 'LanguageTalk member'}
                {person.native_language
                  ? ` (${person.native_language})`
                  : ''}
              </option>
            ))}
          </select>
        </div>

        <div className="min-h-80 space-y-3 bg-slate-50 p-4">
          {!selectedId ? (
            <p className="text-slate-500">
              Choose a member to start chatting.
            </p>
          ) : messages.length === 0 ? (
            <p className="text-slate-500">
              No messages yet. Send the first hello!
            </p>
          ) : (
            messages.map((item) => {
              const mine = item.sender_id === userId

              return (
                <div
                  key={item.id}
                  className={`flex ${mine ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-3 ${
                      mine
                        ? 'bg-blue-600 text-white'
                        : 'border bg-white text-slate-900'
                    }`}
                  >
                    <p className="whitespace-pre-wrap break-words">
                      {item.message}
                    </p>
                    <p
                      className={`mt-1 text-xs ${
                        mine ? 'text-blue-100' : 'text-slate-500'
                      }`}
                    >
                      {new Date(item.created_at).toLocaleString()}
                    </p>
                  </div>
                </div>
              )
            })
          )}
        </div>

        <form onSubmit={sendMessage} className="flex gap-2 border-t p-4">
          <input
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            maxLength={2000}
            placeholder="Write a message..."
            disabled={!selectedId || sending}
            className="min-w-0 flex-1 rounded-full border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
          />

          <button
            type="submit"
            disabled={!selectedId || !draft.trim() || sending}
            className="rounded-full bg-blue-600 px-5 py-3 font-semibold text-white disabled:opacity-50"
          >
            {sending ? 'Sending...' : 'Send'}
          </button>
        </form>

        <div className="px-4 pb-4">
          <button
            type="button"
            onClick={loadMessages}
            disabled={!selectedId}
            className="text-sm font-semibold text-blue-700"
          >
            Refresh messages
          </button>

          {notice && (
            <p role="status" className="mt-3 break-words text-sm text-red-600">
              {notice}
            </p>
          )}
        </div>
      </section>
    </main>
  )
      }
