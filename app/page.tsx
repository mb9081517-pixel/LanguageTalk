"use client";

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-white text-slate-900">

      {/* HEADER */}
      <header className="sticky top-0 z-50 border-b border-slate-100 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">

          <button
            onClick={() => router.push("/")}
            className="flex items-center gap-3"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-600 text-2xl shadow-md">
              🌍
            </div>

            <div>
              <div className="text-xl font-extrabold sm:text-2xl">
                Language<span className="text-blue-600">Talk</span>
              </div>
              <div className="hidden text-[9px] font-bold tracking-[3px] text-slate-400 sm:block">
                LEARN • CONNECT • GROW
              </div>
            </div>
          </button>

          <nav className="hidden gap-7 lg:flex">
            <a href="#features" className="font-semibold text-slate-600 hover:text-blue-600">
              Features
            </a>
            <a href="#languages" className="font-semibold text-slate-600 hover:text-blue-600">
              Languages
            </a>
            <a href="#how" className="font-semibold text-slate-600 hover:text-blue-600">
              How it works
            </a>
            <a href="#community" className="font-semibold text-slate-600 hover:text-blue-600">
              Community
            </a>
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={() => router.push("/login")}
              className="rounded-full px-4 py-2.5 font-semibold text-slate-700 hover:bg-slate-100"
            >
              Log in
            </button>

            <button
              onClick={() => router.push("/signup")}
              className="rounded-full bg-blue-600 px-5 py-2.5 font-bold text-white shadow-md hover:bg-blue-700"
            >
              Sign up
            </button>
          </div>

        </div>
      </header>


      {/* HERO / HEADING */}
      <section className="overflow-hidden bg-gradient-to-br from-sky-50 via-white to-blue-100">

        <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-12 sm:px-6 lg:grid-cols-2 lg:py-20">

          {/* HEADING */}
          <div className="relative z-10">

            <div className="mb-6 inline-flex rounded-full bg-blue-100 px-4 py-2 text-sm font-bold text-blue-700">
              🌐 Global Language Exchange
            </div>

            <h1 className="text-5xl font-black leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
              Talk to the world.
              <span className="block text-blue-600">
                Learn languages.
              </span>
              <span className="block text-blue-600">
                Make friends.
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600 sm:text-xl">
              Practice languages with real people from around the world.
              Find language partners, chat naturally and discover new cultures.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">

              <button
                onClick={() => router.push("/signup")}
                className="rounded-full bg-blue-600 px-7 py-4 font-bold text-white shadow-lg shadow-blue-200 hover:bg-blue-700"
              >
                👥 Find a Language Partner →
              </button>

              <button
                onClick={() => router.push("/partners")}
                className="rounded-full border-2 border-blue-200 bg-white px-7 py-4 font-bold text-blue-700 hover:bg-blue-50"
              >
                🌎 Explore Languages
              </button>

            </div>

            <p className="mt-5 text-sm font-semibold text-slate-500">
              🌍 Connect with language learners worldwide
            </p>

          </div>


          {/* BIG HERO PHOTO */}
          <div className="relative">

            {/* Glow */}
            <div className="absolute inset-5 rounded-[4rem] bg-blue-300/40 blur-3xl" />

            {/* World circle */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="h-[90%] w-[90%] rounded-full bg-blue-100/70" />
            </div>

            <div className="relative">

              <img
                src="/hero-group.png"
                alt="Friends from different countries"
                className="h-[430px] w-full rounded-[3rem] object-cover shadow-2xl sm:h-[520px]"
              />

              {/* Speech bubbles */}

              <div className="absolute left-[-10px] top-12 rounded-2xl bg-white px-5 py-3 text-lg font-bold text-blue-600 shadow-xl sm:left-[-25px]">
                नमस्ते 👋
              </div>

              <div className="absolute right-[-10px] top-8 rounded-2xl bg-white px-5 py-3 text-lg font-bold text-blue-600 shadow-xl sm:right-[-25px]">
                Hello! 👋
              </div>

              <div className="absolute bottom-10 right-[-5px] rounded-2xl bg-white px-5 py-3 text-lg font-bold text-blue-600 shadow-xl sm:right-[-20px]">
                Bonjour! 🇫🇷
              </div>

              <div className="absolute bottom-[-12px] left-1/2 -translate-x-1/2 rounded-full bg-white px-6 py-3 font-bold shadow-xl">
                🌍 People from around the world
              </div>

            </div>

          </div>

        </div>
      </section>


      {/* FEATURES */}
      <section id="features" className="bg-white">
        <div className="mx-auto grid max-w-6xl gap-5 px-5 py-14 md:grid-cols-3">

          <Feature
            icon="💬"
            title="Practice Naturally"
            text="Have real conversations with people who speak the language."
          />

          <Feature
            icon="🌍"
            title="Meet People Worldwide"
            text="Connect with people from different countries and cultures."
          />

          <Feature
            icon="❤️"
            title="Make Global Friends"
            text="Build meaningful friendships while learning languages."
          />

        </div>
      </section>


      {/* LANGUAGES */}
      <section id="languages" className="px-4">
        <div className="mx-auto max-w-7xl rounded-[2rem] bg-sky-50 px-5 py-12 sm:px-8">

          <div className="text-center">
            <p className="font-bold text-blue-600">
              FIND YOUR PARTNER
            </p>

            <h2 className="mt-2 text-3xl font-black sm:text-4xl">
              Who do you want to talk to?
            </h2>

            <p className="mt-3 text-slate-500">
              Choose a language and meet someone new.
            </p>
          </div>

          <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

            <Country flag="🇮🇳 🇺🇸" title="India → USA" text="Hindi • English" />
            <Country flag="🇮🇳 🇯🇵" title="India → Japan" text="English • Japanese" />
            <Country flag="🇮🇳 🇫🇷" title="India → France" text="English • French" />
            <Country flag="🇮🇳 🇪🇸" title="India → Spain" text="English • Spanish" />

          </div>

          <div className="mt-8 text-center">
            <button
              onClick={() => router.push("/partners")}
              className="rounded-full bg-blue-600 px-8 py-3.5 font-bold text-white shadow-lg hover:bg-blue-700"
            >
              🔎 Find a Partner →
            </button>
          </div>

        </div>
      </section>


      {/* HOW IT WORKS */}
      <section id="how">
        <div className="mx-auto max-w-7xl px-5 py-20">

          <div className="text-center">
            <p className="font-bold text-blue-600">HOW IT WORKS</p>

            <h2 className="mt-2 text-3xl font-black sm:text-4xl">
              Start your language journey
            </h2>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">

            <Step
              number="1"
              icon="👤"
              title="Create your account"
              text="Tell us which languages you speak and want to learn."
            />

            <Step
              number="2"
              icon="🔎"
              title="Find a partner"
              text="Discover people who match your language goals."
            />

            <Step
              number="3"
              icon="💬"
              title="Start chatting"
              text="Talk, practice and make friends around the world."
            />

          </div>

        </div>
      </section>


      {/* COMMUNITY */}
      <section id="community" className="bg-slate-900 px-5 py-16 text-white">

        <div className="mx-auto max-w-6xl">

          <h2 className="text-center text-3xl font-black sm:text-4xl">
            Real people. Real conversations.
          </h2>

          <div className="mt-10 grid gap-6 md:grid-cols-3">

            <Review
              text="I found amazing people to practice English with!"
              country="🇮🇳 India"
            />

            <Review
              text="Talking with people from other countries is amazing."
              country="🇯🇵 Japan"
            />

            <Review
              text="I became much more confident speaking English."
              country="🇫🇷 France"
            />

          </div>

        </div>
      </section>


      {/* CTA */}
      <section className="bg-gradient-to-r from-blue-600 to-sky-500">

        <div className="mx-auto max-w-4xl px-5 py-20 text-center text-white">

          <h2 className="text-4xl font-black sm:text-5xl">
            Your next conversation starts here.
          </h2>

          <p className="mt-5 text-lg text-blue-100">
            Meet people. Practice languages. Discover the world.
          </p>

          <button
            onClick={() => router.push("/signup")}
            className="mt-8 rounded-full bg-white px-9 py-4 font-extrabold text-blue-600 shadow-xl hover:bg-blue-50"
          >
            Create Free Account →
          </button>

        </div>

      </section>


      {/* FOOTER */}
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


/* FEATURE */
function Feature({
  icon,
  title,
  text,
}: {
  icon: string;
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-3xl p-6 text-center transition hover:bg-blue-50">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-3xl">
        {icon}
      </div>

      <h3 className="mt-4 text-xl font-extrabold">
        {title}
      </h3>

      <p className="mt-2 leading-6 text-slate-500">
        {text}
      </p>
    </div>
  );
}


/* COUNTRY */
function Country({
  flag,
  title,
  text,
}: {
  flag: string;
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-3xl bg-white p-6 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-lg">

      <div className="text-4xl">
        {flag}
      </div>

      <h3 className="mt-4 font-extrabold">
        {title}
      </h3>

      <p className="mt-2 text-sm text-slate-500">
        {text}
      </p>

    </div>
  );
}


/* STEP */
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


/* REVIEW */
function Review({
  text,
  country,
}: {
  text: string;
  country: string;
}) {
  return (
    <div className="rounded-3xl bg-white p-7 text-slate-900 shadow-lg">

      <div className="text-3xl">💬</div>

      <p className="mt-4 text-lg font-medium leading-7">
        “{text}”
      </p>

      <p className="mt-5 text-sm font-bold text-slate-500">
        — LanguageTalk member {country}
      </p>

    </div>
  );
}
