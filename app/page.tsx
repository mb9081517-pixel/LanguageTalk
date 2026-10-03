"use client";

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-white text-slate-900">
      {/* Header */}
      <header className="border-b border-slate-100 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <button
            onClick={() => router.push("/")}
            className="flex items-center gap-3"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-sky-100 text-2xl">
              🌐
            </div>
            <span className="text-2xl font-bold tracking-tight">
              LanguageTalk
            </span>
          </button>

          <nav className="hidden items-center gap-8 md:flex">
            <a href="#features" className="text-sm font-medium text-slate-600">
              Features
            </a>
            <a href="#how" className="text-sm font-medium text-slate-600">
              How it Works
            </a>
            <a href="#pricing" className="text-sm font-medium text-slate-600">
              Pricing
            </a>
            <a href="#about" className="text-sm font-medium text-slate-600">
              About
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={() => router.push("/login")}
              className="hidden rounded-full px-5 py-2.5 text-sm font-semibold text-slate-700 sm:block"
            >
              Log In
            </button>

            <button
              onClick={() => router.push("/signup")}
              className="rounded-full bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
            >
              Sign Up
            </button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="overflow-hidden">
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-6 py-16 lg:grid-cols-2 lg:py-24">
          <div>
            <div className="mb-6 inline-flex rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700">
              🌎 Learn languages with real people
            </div>

            <h1 className="max-w-2xl text-5xl font-extrabold leading-tight tracking-tight sm:text-6xl lg:text-7xl">
              Connect Globally.
              <span className="block text-blue-600">
                Speak Confidently.
              </span>
            </h1>

            <p className="mt-7 max-w-xl text-lg leading-8 text-slate-600 sm:text-xl">
              The professional language exchange for serious learners.
              Practice with native speakers, build confidence, and make
              meaningful connections around the world.
            </p>

            {/* Features */}
            <div
              id="features"
              className="mt-9 grid max-w-xl gap-4 sm:grid-cols-3"
            >
              <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                <div className="mb-2 text-2xl">✓</div>
                <h3 className="font-bold">Verified Natives</h3>
                <p className="mt-1 text-sm text-slate-500">
                  Practice with real people.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                <div className="mb-2 text-2xl">◉</div>
                <h3 className="font-bold">HD Video</h3>
                <p className="mt-1 text-sm text-slate-500">
                  Natural face-to-face practice.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                <div className="mb-2 text-2xl">✦</div>
                <h3 className="font-bold">AI Translation</h3>
                <p className="mt-1 text-sm text-slate-500">
                  Never get stuck again.
                </p>
              </div>
            </div>

            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <button
                onClick={() => router.push("/signup")}
                className="rounded-full bg-blue-600 px-8 py-4 text-base font-bold text-white shadow-lg transition hover:bg-blue-700"
              >
                Get Started — It's Free
              </button>

              <button
                onClick={() => router.push("/login")}
                className="rounded-full border border-slate-300 bg-white px-8 py-4 text-base font-bold text-slate-700 transition hover:bg-slate-50"
              >
                Log In
              </button>
            </div>

            <p className="mt-5 text-sm text-slate-500">
              Join learners from 100+ countries • 4.9★ average rating
            </p>
          </div>

          {/* Right side */}
          <div className="relative">
            <div className="absolute inset-0 -z-10 rounded-[3rem] bg-blue-50 blur-2xl" />

            <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-4 shadow-xl">
              <div className="grid grid-cols-2 gap-4">
                <div className="overflow-hidden rounded-[1.5rem] bg-white">
                  <img
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=700&q=80"
                    alt="Language learner"
                    className="h-72 w-full object-cover"
                  />
                  <div className="p-4">
                    <p className="font-bold">Meet new people</p>
                    <p className="text-sm text-slate-500">
                      From around the world
                    </p>
                  </div>
                </div>

                <div className="mt-10 overflow-hidden rounded-[1.5rem] bg-white">
                  <img
                    src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=700&q=80"
                    alt="Language partner"
                    className="h-72 w-full object-cover"
                  />
                  <div className="p-4">
                    <p className="font-bold">Practice naturally</p>
                    <p className="text-sm text-slate-500">
                      Speak with confidence
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-4 rounded-2xl bg-white p-5 text-center shadow-sm">
                <p className="text-sm text-slate-500">
                  Trusted by learners worldwide
                </p>
                <p className="mt-1 text-2xl font-extrabold">
                  120k+ learners
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="border-t border-slate-100 bg-slate-50">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="text-center">
            <p className="font-semibold text-blue-600">HOW IT WORKS</p>
            <h2 className="mt-3 text-3xl font-extrabold sm:text-4xl">
              Start speaking in minutes
            </h2>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            <div className="rounded-3xl bg-white p-7 shadow-sm">
              <div className="text-3xl">1️⃣</div>
              <h3 className="mt-5 text-xl font-bold">Create your profile</h3>
              <p className="mt-2 text-slate-600">
                Tell us which languages you speak and which ones you want to
                learn.
              </p>
            </div>

            <div className="rounded-3xl bg-white p-7 shadow-sm">
              <div className="text-3xl">2️⃣</div>
              <h3 className="mt-5 text-xl font-bold">Find your partner</h3>
              <p className="mt-2 text-slate-600">
                Discover people who match your language goals and interests.
              </p>
            </div>

            <div className="rounded-3xl bg-white p-7 shadow-sm">
              <div className="text-3xl">3️⃣</div>
              <h3 className="mt-5 text-xl font-bold">Start talking</h3>
              <p className="mt-2 text-slate-600">
                Chat, practice, and improve your speaking skills together.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section id="about" className="bg-blue-600">
        <div className="mx-auto max-w-5xl px-6 py-20 text-center text-white">
          <h2 className="text-4xl font-extrabold sm:text-5xl">
            Your next conversation could change everything.
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-lg text-blue-100">
            Meet language partners, practice every day, and become confident
            speaking a new language.
          </p>

          <button
            onClick={() => router.push("/signup")}
            className="mt-8 rounded-full bg-white px-8 py-4 font-bold text-blue-600 shadow-lg hover:bg-blue-50"
          >
            Create Free Account
          </button>
        </div>
      </section>

      <footer
        id="pricing"
        className="border-t border-slate-200 bg-white px-6 py-8 text-center text-sm text-slate-500"
      >
        © 2026 LanguageTalk.live — Connect Globally. Speak Confidently.
      </footer>
    </main>
  );
                    }
