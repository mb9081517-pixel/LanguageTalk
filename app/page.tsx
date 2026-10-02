"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function Home() {
  const router = useRouter()
  const [showSignup, setShowSignup] = useState(false)

  return (
    <div className="min-h-screen bg-[#0B0A12] text-white selection:bg-lime-400/30 font-sans overflow-x-hidden">
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap'); *{font-family:'Inter',system-ui}`}</style>
      
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-[#0B0A12]/80 border-b border-white/5">
        <div className="max-w-[1280px] mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-lime-400 to-purple-500 flex items-center justify-center font-black text-black">LT</div>
            <span className="text-[22px] font-bold tracking-tight">LanguageTalk</span>
          </div>
          <div className="flex gap-3">
            <button onClick={()=>router.push('/login')} className="hidden md:block px-5 py-2.5 rounded-full border border-white/10 text-sm font-medium hover:bg-white/5">Log in</button>
            <button onClick={()=>setShowSignup(true)} className="px-6 py-2.5 rounded-full bg-[#C8FF00] text-black text-sm font-bold hover:bg-[#d4ff33] transition">Get Started</button>
          </div>
        </div>
      </header>

      <main className="max-w-[1280px] mx-auto px-6">
        {/* HERO - Screenshot 1 */}
        <section className="pt-16 pb-10 grid lg:grid-cols-2 gap-10">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[11px] font-bold tracking-widest text-white/70 mb-8">
              <span className="w-5 h-5 rounded-full bg-lime-400/20 flex items-center justify-center">✦</span>
              TRUSTED BY 2.4M LEARNERS WORLDWIDE
            </div>
            <h1 className="text-[52px] md:text-[72px] font-black leading-[0.9] tracking-tighter">
              Talk Fluently,<br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C8FF00] via-[#8B5CF6] to-[#C8FF00]">Connect Globally</span>
            </h1>
            <p className="mt-6 text-[18px] leading-7 text-white/60 max-w-[520px]">
              The first language exchange that feels like your favorite social app. Practice with natives, not bots. Real conversations, real fluency.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              {[
                {f:"🇺🇸",l:"English"}, {f:"🇪🇸",l:"Spanish"}, {f:"🇫🇷",l:"French"},
                {f:"🇩🇪",l:"German"}, {f:"🇯🇵",l:"Japanese"}, {f:"🇰🇷",l:"Korean"},
                {f:"🇮🇹",l:"Italian"}
              ].map(x=>(
                <div key={x.l} className="px-4 py-2 rounded-full bg-white/[0.06] border border-white/5 text-sm flex items-center gap-2">{x.f} {x.l}</div>
              ))}
              <div className="px-4 py-2 rounded-full bg-[#C8FF00]/15 text-[#C8FF00] text-sm font-bold">+42 more</div>
            </div>

            <div className="mt-10 flex items-center gap-8">
              <button onClick={()=>setShowSignup(true)} className="group px-8 py-4 rounded-full bg-white text-black font-bold flex items-center gap-3 hover:bg-white/90 transition">
                Start talking — free
                <span className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center group-hover:translate-x-1 transition">→</span>
              </button>
              <div className="flex items-center gap-3">
                <div className="flex -space-x-3">
                  <img src="https://i.pravatar.cc/40?img=32" className="w-10 h-10 rounded-full border-2 border-[#0B0A12]"/>
                  <img src="https://i.pravatar.cc/40?img=15" className="w-10 h-10 rounded-full border-2 border-[#0B0A12]"/>
                  <img src="https://i.pravatar.cc/40?img=5" className="w-10 h-10 rounded-full border-2 border-[#0B0A12]"/>
                </div>
                <div className="text-xs leading-tight">
                  <div className="font-bold">4.9/5 rating</div>
                  <div className="text-white/50">from 12k reviews</div>
                </div>
              </div>
            </div>

            <div className="mt-14 grid grid-cols-3 gap-10 border-t border-white/5 pt-8 max-w-[520px]">
              <div><div className="text-3xl font-black">2.4M+</div><div className="text-[11px] tracking-[0.2em] text-white/40 mt-1 font-bold">ACTIVE</div></div>
              <div><div className="text-3xl font-black">189</div><div className="text-[11px] tracking-[0.2em] text-white/40 mt-1 font-bold">COUNTRIES</div></div>
              <div><div className="text-3xl font-black">94%</div><div className="text-[11px] tracking-[0.2em] text-white/40 mt-1 font-bold">FLUENCY RATE</div></div>
            </div>
          </div>

          {/* Right - Signup Card - Screenshot 2 */}
          <div className="lg:sticky lg:top-24 h-fit">
            <div className="rounded-[32px] bg-gradient-to-b from-[#1A1630] to-[#121018] border border-white/10 p-8 shadow-[0_0_80px_rgba(139,92,246,0.15)]">
              <div className="flex justify-between items-start mb-8">
                <h3 className="text-2xl font-bold leading-tight">Create your<br/>account</h3>
                <div className="flex bg-black/50 rounded-full p-1 border border-white/5">
                  <button className="px-4 py-1.5 rounded-full bg-white text-black text-sm font-bold">Sign up</button>
                  <button onClick={()=>router.push('/login')} className="px-4 py-1.5 rounded-full text-white/60 text-sm">Log in</button>
                </div>
              </div>

              <button className="w-full py-3.5 rounded-full bg-white text-black font-semibold flex items-center justify-center gap-3 hover:bg-white/90">
                <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-5 h-5"/> Continue with Google
              </button>
              <div className="my-6 text-center text-xs tracking-widest text-white/30">OR</div>

              <div className="space-y-4">
                <div>
                  <div className="text-[11px] tracking-widest text-white/50 font-bold mb-2">EMAIL</div>
                  <input placeholder="you@domain.com" className="w-full px-5 py-3.5 rounded-full bg-black/40 border border-white/5 outline-none text-sm placeholder:text-white/30 focus:border-white/20"/>
                </div>
                <div>
                  <div className="text-[11px] tracking-widest text-white/50 font-bold mb-2">PASSWORD</div>
                  <input type="password" placeholder="••••••••" className="w-full px-5 py-3.5 rounded-full bg-black/40 border border-white/5 outline-none text-sm placeholder:text-white/30 focus:border-white/20"/>
                </div>
                <button onClick={()=>router.push('/signup')} className="w-full py-4 rounded-full bg-[#1A4D00] hover:bg-[#1f5d00] text-white font-bold flex items-center justify-center gap-2 transition">
                  Create free account <span>→</span>
                </button>
                <div className="text-[11px] text-center text-white/40 leading-relaxed">By continuing you agree to our Terms & Privacy. 14-day fluent guarantee.</div>

                <div className="mt-4 p-4 rounded-2xl bg-white/[0.04] border border-white/5 flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-yellow-400/20 flex items-center justify-center">⚡</div>
                  <div className="text-sm"><span className="font-bold">Live now:</span> <span className="text-white/60">847 people practicing your target language</span></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Profile Steps - Screenshot 3 & 4 */}
        <section className="mt-20 rounded-[32px] bg-[#121018] border border-white/5 p-8 md:p-12">
          <div className="text-[#C8FF00] text-xs font-bold tracking-[0.2em] mb-4">STEP 01 — PROFILE</div>
          <h2 className="text-[36px] md:text-[48px] font-black leading-[0.95] tracking-tighter max-w-[700px]">What do you speak? What do you want to learn?</h2>
          <p className="mt-4 text-white/50 max-w-[600px]">We match you based on native language, interests, and learning goals. No algorithms that feel like dating apps.</p>

          <div className="mt-10 grid md:grid-cols-2 gap-10">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3"><div className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center">🌍</div><div><div className="text-[11px] text-white/40 tracking-widest font-bold">NATIVE LANGUAGE</div><div className="font-bold">🇺🇸 English — <span className="text-white/40">English</span></div></div></div>
                <button className="px-4 py-2 rounded-full bg-white/10 text-xs font-bold">Change</button>
              </div>
              <div className="flex flex-wrap gap-2">
                {[
                  {f:"🇺🇸",l:"English",active:true}, {f:"🇪🇸",l:"Spanish"}, {f:"🇫🇷",l:"French"}, {f:"🇩🇪",l:"German"}, {f:"🇯🇵",l:"Japanese"}, {f:"🇰🇷",l:"Korean"}, {f:"🇮🇹",l:"Italian"}, {f:"🇧🇷",l:"Portuguese"}, {f:"🇮🇳",l:"Hindi"}, {f:"🇨🇳",l:"Chinese"}
                ].map(i=>(
                  <button key={i.l} className={`px-4 py-2 rounded-full border text-sm ${i.active?"bg-[#C8FF00]/15 border-[#C8FF00]/30 text-[#C8FF00] font-bold":"bg-white/[0.04] border-white/5 text-white/70"}`}>{i.f} {i.l}</button>
                ))}
              </div>
              <div className="mt-6 p-4 rounded-2xl bg-[#C8FF00]/5 border border-[#C8FF00]/10 flex gap-3">
                <div className="w-8 h-8 rounded-full bg-[#C8FF00] text-black flex items-center justify-center font-bold">✓</div>
                <div className="text-sm"><span className="font-bold">You'll help others</span> <span className="text-white/60">learn English. Teaching solidifies your own fluency.</span></div>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3"><div className="w-9 h-9 rounded-full bg-[#8B5CF6]/20 flex items-center justify-center">🎯</div><div><div className="text-[11px] text-white/40 tracking-widest font-bold">LEARNING LANGUAGE</div><div className="font-bold">🇪🇸 Spanish — <span className="text-white/40">Español</span></div></div></div>
                <button className="px-4 py-2 rounded-full bg-[#8B5CF6] text-xs font-bold">Change</button>
              </div>
              <div className="flex flex-wrap gap-2">
                {[
                  {f:"🇺🇸",l:"English"}, {f:"🇪🇸",l:"Spanish",active:true}, {f:"🇫🇷",l:"French"}, {f:"🇩🇪",l:"German"}, {f:"🇯🇵",l:"Japanese"}, {f:"🇰🇷",l:"Korean"}, {f:"🇮🇹",l:"Italian"}, {f:"🇧🇷",l:"Portuguese"}, {f:"🇮🇳",l:"Hindi"}, {f:"🇨🇳",l:"Chinese"}
                ].map(i=>(
                  <button key={i.l} className={`px-4 py-2 rounded-full border text-sm ${i.active?"bg-[#8B5CF6] border-[#8B5CF6] text-white font-bold":"bg-white/[0.04] border-white/5 text-white/70"}`}>{i.f} {i.l}</button>
                ))}
              </div>
              <div className="mt-6">
                <div className="flex justify-between text-[11px] font-bold tracking-widest mb-3"><span className="text-white/40">GOAL</span><span className="px-3 py-1 rounded-full bg-white/5 text-white/60">Active • 847 natives online</span></div>
                <div className="flex items-center gap-4">
                  <div className="flex-1 h-3 rounded-full bg-white/5 overflow-hidden"><div className="h-full w-[70%] bg-gradient-to-r from-[#8B5CF6] to-[#C8FF00]"></div></div>
                  <span className="font-bold">B2 → C1</span>
                </div>
                <div className="mt-3 text-sm text-white/50">Based on your selection, we found <span className="text-white font-bold">1,243 perfect partners</span> who want to learn English.</div>
              </div>
            </div>
          </div>
        </section>

        {/* Matches - Screenshot 5 */}
        <section className="mt-8 grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 rounded-[32px] bg-[#121018] border border-white/5 p-8">
            <div className="flex items-center gap-4 mb-8">
              <h3 className="text-4xl font-black">Your matches</h3>
              <span className="px-4 py-1.5 rounded-full bg-[#C8FF00]/15 text-[#C8FF00] text-xs font-black">6 NEW</span>
              <div className="ml-auto flex gap-2">
                <div className="px-4 py-2 rounded-full bg-white/5 text-xs flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-green-400"></span>Online now: 4</div>
                <div className="px-4 py-2 rounded-full bg-white/5 text-xs font-bold">Filters</div>
              </div>
            </div>

            <div className="space-y-4">
              {[
                {name:"Sofia Martinez", age:24, city:"Madrid", level:"Intermediate", match:98, bio:"Architecture student who loves indie films and coffee chats", tags:["Travel","Photography","Music"], flag:"🇪🇸", img:"https://i.pravatar.cc/100?img=5"},
                {name:"Kenji Tanaka", age:27, city:"Tokyo", level:"Beginner", match:94, bio:"Software dev learning Spanish for my move to Barcelona", tags:["Anime","Cooking","Tech"], flag:"🇯🇵", img:"https://i.pravatar.cc/100?img=15"},
                {name:"Amélie Dubois", age:23, city:"Paris", level:"Advanced", match:92, bio:"Design student obsessed with Japanese street culture", tags:["Art","Fashion","Cinema"], flag:"🇫🇷", img:"https://i.pravatar.cc/100?img=32"},
              ].map(p=>(
                <div key={p.name} className="p-6 rounded-[24px] bg-white/[0.03] border border-white/5 hover:bg-white/[0.05] transition">
                  <div className="flex gap-4">
                    <div className="relative"><img src={p.img} className="w-14 h-14 rounded-full"/><span className="absolute -top-1 -left-1 text-lg">{p.flag}</span><span className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-400 border-2 border-[#121018] rounded-full"></span></div>
                    <div className="flex-1">
                      <div className="flex justify-between"><div><div className="font-bold text-lg">{p.name} <span className="text-white/40 font-normal text-sm ml-2">{p.age}</span></div><div className="text-sm text-white/50">{p.city} • <span className="text-white/70">{p.level}</span></div></div><div className="text-right"><div className="text-2xl font-black">{p.match}%</div><div className="text-[11px] tracking-widest text-[#C8FF00] font-bold">MATCH</div></div></div>
                      <div className="mt-3 text-sm text-white/60">{p.bio}</div>
                      <div className="mt-3 flex gap-2 flex-wrap"><span className="px-3 py-1 rounded-full bg-white/5 text-xs">🇪🇸 → 🇺🇸</span>{p.tags.map(t=><span key={t} className="px-3 py-1 rounded-full bg-white/5 text-xs text-white/50">{t}</span>)}</div>
                      <div className="mt-4 flex gap-3"><button onClick={()=>router.push('/signup')} className="flex-1 py-3 rounded-full bg-white/[0.06] hover:bg-white text-white hover:text-black font-bold transition flex items-center justify-center gap-2">Say Hola 👋</button><button className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center">♡</button></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Messages preview - Screenshot 6 */}
          <div className="rounded-[32px] bg-[#121018] border border-white/5 p-6 h-fit">
            <div className="flex justify-between items-center mb-6"><h4 className="font-bold text-lg">Messages</h4><div className="flex gap-2"><span className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-xs">⌕</span><span className="w-8 h-8 rounded-full bg-[#C8FF00] text-black flex items-center justify-center">+</span></div></div>
            <div className="flex gap-2 mb-6"><span className="px-4 py-2 rounded-full bg-white text-black text-xs font-bold">All</span><span className="px-4 py-2 rounded-full bg-white/5 text-xs text-white/60">Unread • 3</span><span className="px-4 py-2 rounded-full bg-white/5 text-xs text-white/60">Groups</span></div>
            <div className="space-y-4">
              {[
                {n:"Sofia Martinez", m:"Quieres practicar hoy? Tengo 30...", img:"https://i.pravatar.cc/100?img=5"},
                {n:"Kenji Tanaka", m:"Quieres practicar hoy? Tengo 30...", img:"https://i.pravatar.cc/100?img=15"},
                {n:"Amélie Dubois", m:"Salut! J'ai une question sur...", img:"https://i.pravatar.cc/100?img=32"},
                {n:"Marco Rossi", m:"Ciao! How do you say...", img:"https://i.pravatar.cc/100?img=12"},
              ].map(u=>(
                <div key={u.n} className="flex gap-3 p-3 rounded-2xl hover:bg-white/5 cursor-pointer">
                  <div className="relative"><img src={u.img} className="w-11 h-11 rounded-full"/><span className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-[#121018]"></span></div>
                  <div className="flex-1 min-w-0"><div className="font-semibold text-sm flex justify-between">{u.n}<span className="text-[11px] text-white/30">2m</span></div><div className="text-xs text-white/50 truncate">{u.m}</div></div>
                </div>
              ))}
            </div>
            <button onClick={()=>router.push('/signup')} className="mt-6 w-full py-3 rounded-full bg-[#C8FF00] text-black font-bold">Start Talking Free →</button>
          </div>
        </section>

        <footer className="py-16 text-center text-white/20 text-xs">Built by Arun • LanguageTalk © 2026 — No premium, just fluent conversations.</footer>
      </main>
    </div>
  )
                }
                
