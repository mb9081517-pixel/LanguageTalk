"use client";

import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function Dashboard() {
  const router = useRouter();
  const supabase = createClient();

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/");
  }

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-sky-100 text-2xl">
              🌐
            </div>
            <span className="text-2xl font-bold">LanguageTalk</span>
          </div>

          <button
            onClick={handleLogout}
            className="rounded-full border border-slate-300 px-5 py-2.5 font-semibold text-slate-700 hover:bg-slate-50"
          >
            Log Out
          </button>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-6 py-12">
        <div className="rounded-3xl bg-blue-600 p-8 text-white shadow-lg">
          <p className="text-blue-100">Welcome to LanguageTalk 👋</p>
          <h1 className="mt-2 text-4xl font-extrabold">
            Start your language journey.
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-blue-100">
            Find language partners, practice speaking, and connect with people
            from around the world.
          </p>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          <div className="rounded-3xl bg-white p-7 shadow-sm">
            <div className="text-3xl">🌍</div>
            <h2 className="mt-4 text-xl font-bold">Find Partners</h2>
            <p className="mt-2 text-slate-600">
              Discover people who are learning and speaking your languages.
            </p>
            <button onClick={() => router.push("/partners")} className="mt-5 rounded-full bg-blue-600 px-5 py-3 font-semibold text-white">
              Find People
            </button>
          </div>

          <div className="rounded-3xl bg-white p-7 shadow-sm">
            <div className="text-3xl">💬</div>
            <h2 className="mt-4 text-xl font-bold">Messages</h2>
            <p className="mt-2 text-slate-600">
              Chat with your language partners and practice every day.
            </p>
            <button className="mt-5 rounded-full bg-blue-600 px-5 py-3 font-semibold text-white">
              Open Chat
            </button>
          </div>

          <div className="rounded-3xl bg-white p-7 shadow-sm">
            <div className="text-3xl">👤</div>
            <h2 className="mt-4 text-xl font-bold">My Profile</h2>
            <p className="mt-2 text-slate-600">
              Add your languages, interests, and learning goals.
            </p>
            <button className="mt-5 rounded-full bg-blue-600 px-5 py-3 font-semibold text-white">
              Edit Profile
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
