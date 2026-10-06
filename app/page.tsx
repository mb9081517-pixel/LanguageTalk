"use client";

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-white text-slate-900">

      {/* ================= HEADER ================= */}
      <header className="sticky top-0 z-50 border-b border-slate-100 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-6">

          {/* Logo */}
          <button
            onClick={() => router.push("/")}
            className="flex items-center gap-3"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-sky-400 text-2xl shadow-sm">
              🌍
            </div>

            <div className="text-left">
              <div className="text-xl font-extrabold tracking-tight sm:text-2xl">
                Language<span className="text-blue-600">Talk</span>
              </div>

              <div className="hidden text-[10px] font-medium tracking-widest text-slate-400 sm:block">
                LEARN • CONNECT • GROW
              </div>
            </div>
          </button>

          {/* Navigation */}
          <nav className="hidden items-center gap-7 lg:flex">
            <a
              href="#features"
              className="text-sm font-semibold text-slate-600 transition hover:text-blue-600"
            >
              Features
            </a>

            <a
              href="#languages"
              className="text-sm font-semibold text-slate-600 transition hover:text-blue-600"
            >
              Languages
            </a>

            <a
              href="#how"
              className="text-sm font-semibold text-slate-600 transition hover:text-blue-600"
            >
              How it works
            </a>

            <a
              href="#community"
              className="text-sm font-semibold text-slate-600 transition hover:text-blue-600"
            >
              Community
            </a>
          </nav>

          {/* Login / Signup */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => router.push("/login")}
              className="rounded-full px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 sm:px-5"
            >
              Log in
            </button>

            <button
              onClick={() => router.push("/signup")}
              className="rounded-full bg-blue-600 px-4 py-2.5 text-sm font-bold text-white shadow-md transition hover:bg-blue-700 sm:px-6"
            >
              Sign up
            </button>
          </div>
        </div>
      </header>


      {/* ================= HERO ================= */}
      <section className="overflow-hidden bg-gradient-to-br from-white via-sky-50 to-blue-100">

        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-14 sm:px-6 lg:grid-cols-2 lg:py-20">

          {/* Left */}
          <div>

            <div className="mb-6 inline-flex items-center rounded-full bg-blue-100 px-4 py-2 text-sm font-bold text-blue-700">
              🌎 Global Language Exchange
            </div>

            <h1 className="max-w-2xl text-5xl font-black leading-[1.05] tracking-tight text-slate-900 sm:text-6xl lg:text-7xl">

              Talk to the world.

              <span className="block text-blue-600">
                Learn languages.
              </span>

              <span className="block text-blue-600">
                Make friends.
              </span>

            </h1>

            <p className="mt-7 max-w-xl text-lg leading-8 text-slate-600 sm:text-xl">
              Practice languages with real people from around the world.
              Find language partners, chat naturally, and discover new
              cultures through conversation.
            </p>


            {/* Buttons */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">

              <button
                onClick={() => router.push("/signup")}
                className="rounded-full bg-blue-600 px-7 py-4 text-base font-bold text-white shadow-lg shadow-blue-200 transition hover:bg-blue-700"
              >
                👥 Find a Language Partner →
              </button>

              <button
                onClick={() => router.push("/login")}
                className="rounded-full border border-blue-300 bg-white px-7 py-4 text-base font-bold text-blue-700 transition hover:bg-blue-50"
              >
                🌐 Explore Languages
              </button>

            </div>

            <p className="mt-5 text-sm font-medium text-slate-500">
              🌍 Meet language learners from around the world
            </p>

          </div>


          {/* Right - People */}
          <div className="relative mx-auto w-full max-w-xl">

            {/* Background globe */}
            <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-200/40 blur-2xl sm:h-96 sm:w-96" />

            <div className="relative grid grid-cols-2 gap-4">

              {/* Person 1 */}
              <div className="overflow-hidden rounded-3xl border-4 border-white bg-white shadow-xl">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=700&q=80"
                  alt="Language partner"
                  className="h-52 w-full object-cover sm:h-64"
                />

                <div className="p-3 sm:p-4">
                  <div className="font-bold">🇮🇳 India</div>
                  <div className="text-sm text-slate-500">
                    Hindi • English
                  </div>
                </div>
              </div>


              {/* Person 2 */}
              <div className="mt-10 overflow-hidden rounded-3xl border-4 border-white bg-white shadow-xl">
                <img
                  src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=700&q=80"
                  alt="Language learner"
                  className="h-52 w-full object-cover sm:h-64"
                />

                <div className="p-3 sm:p-4">
                  <div className="font-bold">🇺🇸 USA</div>
                  <div className="text-sm text-slate-500">
                    English • Spanish
                  </div>
                </div>
              </div>


              {/* Person 3 */}
              <div className="-mt-4 overflow-hidden rounded-3xl border-4 border-white bg-white shadow-xl">
                <img
                  src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=700&q=80"
                  alt="Language partner"
                  className="h-44 w-full object-cover sm:h-52"
                />

                <div className="p-3 sm:p-4">
                  <div className="font-bold">🇯🇵 Japan</div>
                  <div className="text-sm text-slate-500">
                    Japanese • English
                  </div>
                </div>
              </div>


              {/* Person 4 */}
              <div className="overflow-hidden rounded-3xl border-4 border-white bg-white shadow-xl">
                <img
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=700&q=80"
                  alt="Language learner"
                  className="h-44 w-full object-cover sm:h-52"
                />

                <div className="p-3 sm:p-4">
                  <div className="font-bold">🇫🇷 France</div>
                  <div className="text-sm text-slate-500">
                    French • English
                  </div>
                </div>
              </div>

            </div>

            {/* Floating language bubbles */}
            <div className="absolute -left-2 top-20 rounded-full bg-white px-4 py-2 font-bold text-blue-600 shadow-lg sm:-left-5">
              नमस्ते 👋
            </div>

            <div className="absolute -right-2 top-5 rounded-full bg-white px-4 py-2 font-bold text-blue-600 shadow-lg sm:-right-5">
              Hello!
            </div>

            <div className="absolute -bottom-3 left-1/2 rounded-full bg-white px-4 py-2 font-bold text-blue-600 shadow-lg">
              Bonjour! 🇫🇷
            </div>

          </div>

        </div>
      </section>


      {/* ================= FEATURES ================= */}
      <section id="features" className="bg-white">

        <div className="mx-auto grid max-w-6xl gap-6 px-5 py-14 sm:px-6 md:grid-cols-3">

          <div className="rounded-3xl p-6 text-center transition hover:bg-blue-50">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-3xl">
              💬
            </div>

            <h3 className="mt-4 text-xl font-extrabold">
              Practice Naturally
            </h3>

            <p className="mt-2 leading-6 text-slate-500">
              Have real conversations and improve your speaking naturally.
            </p>
          </div>


          <div className="rounded-3xl p-6 text-center transition hover:bg-blue-50">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-3xl">
              🌍
            </div>

            <h3 className="mt-4 text-xl font-extrabold">
              Meet People Worldwide
            </h3>

            <p className="mt-2 leading-6 text-slate-500">
              Connect with people from different countries and cultures.
            </p>
          </div>


          <div className="rounded-3xl p-6 text-center transition hover:bg-blue-50">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-pink-100 text-3xl">
              ❤️
            </div>

            <h3 className="mt-4 text-xl font-extrabold">
              Make Global Friends
            </h3>

            <p className="mt-2 leading-6 text-slate-500">
              Build meaningful friendships while learning a new language.
            </p>
          </div>

        </div>
      </section>


      {/* ================= LANGUAGES ================= */}
      <section
        id="languages"
        className="mx-4 rounded-[2rem] bg-sky-50 sm:mx-6"
      >

        <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8">

          <div className="text-center">
            <p className="font-bold text-blue-600">
              FIND YOUR PARTNER
            </p>

            <h2 className="mt-2 text-3xl font-black sm:text-4xl">
              Who do you want to talk to?
            </h2>

            <p className="mt-3 text-slate-500">
              Choose a country and start a new conversation.
            </p>
          </div>


          <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

            <CountryCard
              flags="🇮🇳 → 🇺🇸"
              title="India → USA"
              languages="Hindi • English"
            />

            <CountryCard
              flags="🇮🇳 → 🇯🇵"
              title="India → Japan"
              languages="English • Japanese"
            />

            <CountryCard
              flags="🇮🇳 → 🇫🇷"
              title="India → France"
              languages="English • French"
            />

            <CountryCard
              flags="🇮🇳 → 🇪🇸"
              title="India → Spain"
              languages="English • Spanish"
            />

          </div>


          <div className="mt-8 text-center">
            <button
              onClick={() => router.push("/partners")}
              className="rounded-full bg-blue-600 px-8 py-3.5 font-bold text-white shadow-lg transition hover:bg-blue-700"
            >
              🔎 Find a Partner →
            </button>
          </div>

        </div>
      </section>


      {/* ================= HOW IT WORKS ================= */}
      <section id="how">

        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-6">

          <div className="text-center">
            <p className="font-bold text-blue-600">
              HOW IT WORKS
            </p>

            <h2 className="mt-2 text-3xl font-black sm:text-4xl">
              Start your language journey
            </h2>

            <p className="mt-3 text-slate-500">
              Three simple steps.
            </p>
          </div>


          <div className="mt-12 grid gap-6 md:grid-cols-3">

            <Step
              number="1"
              icon="👤"
              title="Create your account"
              text="Sign up and tell us which languages you speak and want to learn."
            />

            <Step
              number="2"
              icon="🔎"
              title="Find a partner"
              text="Discover people who match your language and interests."
            />

            <Step
              number="3"
              icon="💬"
              title="Start chatting"
              text="Talk, practice, learn and make friends around the world."
            />

          </div>

        </div>
      </section>


      {/* ================= COMMUNITY ================= */}
      <section
        id="community"
        className="bg-slate-900 px-5 py-16 text-white"
      >

        <div className="mx-auto max-w-6xl">

          <div className="grid gap-8 md:grid-cols-3">

            <div className="rounded-3xl bg-white p-6 text-slate-900">
              <p className="text-lg leading-7">
                “I found amazing people to practice English with.”
              </p>

              <p className="mt-5 text-sm font-bold text-slate-500">
                — Language learner 🇮🇳
              </p>
            </div>


            <div className="rounded-3xl bg-white p-6 text-slate-900">
              <p className="text-lg leading-7">
                “Talking with people from other countries is so much fun.”
              </p>

              <p className="mt-5 text-sm font-bold text-slate-500">
                — Language learner 🇯🇵
              </p>
            </div>


            <div className="rounded-3xl bg-white p-6 text-slate-900">
              <p className="text-lg leading-7">
                “I am becoming more confident every time I speak.”
              </p>

              <p className="mt-5 text-sm font-bold text-slate-500">
                — Language learner 🇫🇷
              </p>
            </div>

          </div>

        </div>
      </section>


      {/* ================= FINAL CTA ================= */}
      <section className="bg-gradient-to-r from-blue-600 to-sky-500">

        <div className="mx-auto max-w-4xl px-5 py-20 text-center text-white">

          <h2 className="text-4xl font-black sm:text-5xl">
            Your next conversation starts here.
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-lg text-blue-100">
            Meet people, practice languages and discover a bigger world.
          </p>

          <button
            onClick={() => router.push("/signup")}
            className="mt-8 rounded-full bg-white px-9 py-4 font-extrabold text-blue-600 shadow-xl transition hover:bg-blue-50"
          >
            Create Free Account →
          </button>

        </div>

      </section>


      {/* ================= FOOTER ================= */}
      <footer className="bg-white px-5 py-8 text-center">

        <div className="text-xl font-extrabold">
          Language<span className="text-blue-600">Talk</span>
        </div>

        <p className="mt-2 text-sm text-slate-500">
          Learn • Connect • Grow
        </p>

        <p className="mt-4 text-xs text-slate-400">
          © 2026 LanguageTalk.live — Connect Globally. Speak Confidently.
        </p>

      </footer>

    </main>
  );
}


/* ================= COUNTRY CARD ================= */

function CountryCard({
  flags,
  title,
  languages,
}: {
  flags: string;
  title: string;
  languages: string;
}) {
  return (
    <div className="rounded-3xl bg-white p-6 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-lg">

      <div className="text-4xl">
        {flags}
      </div>

      <h3 className="mt-4 font-extrabold">
        {title}
      </h3>

      <p className="mt-2 text-sm text-slate-500">
        {languages}
      </p>

    </div>
  );
}


/* ================= STEP ================= */

function Step({
  number,
  icon,
  title,
  text,
}: {
  number: string;
  icon: string;
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-3xl border border-slate-100 bg-white p-7 shadow-sm">

      <div className="flex items-center gap-4">

        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 font-bold text-white">
          {number}
        </div>

        <div className="text-3xl">
          {icon}
        </div>

      </div>

      <h3 className="mt-6 text-xl font-extrabold">
        {title}
      </h3>

      <p className="mt-2 leading-7 text-slate-600">
        {text}
      </p>

    </div>
  );
      }
