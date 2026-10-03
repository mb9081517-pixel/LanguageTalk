"use client";

import { useRouter } from "next/navigation";

export default function Partners() {
  const router = useRouter();

  const partners = [
    { name: "Maria", language: "Spanish", flag: "🇪🇸", level: "Native" },
    { name: "Kenji", language: "Japanese", flag: "🇯🇵", level: "Native" },
    { name: "Sophie", language: "French", flag: "🇫🇷", level: "Native" },
    { name: "Alex", language: "English", flag: "🇬🇧", level: "Native" },
  ];

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <button
            onClick={() => router.push("/dashboard")}
            className="flex items-center gap-3"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-sky-100 text-2xl">
              🌐
            </div>
            <span className="text-2xl font-bold">LanguageTalk</span>
          </button>

          <button
            onClick={() => router.push("/dashboard")}
            className="rounded-full border border-slate-300 px-5 py-2.5 font-semibold"
          >
            Dashboard
          </button>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-6 py-12">
        <h1 className="text-4xl font-extrabold">Find Language Partners 🌍</h1>

        <p className="mt-3 text-lg text-slate-600">
          Meet people around the world and practice languages together.
        </p>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {partners.map((partner) => (
            <div
              key={partner.name}
              className="rounded-3xl bg-white p-6 shadow-sm"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-50 text-3xl">
                {partner.flag}
              </div>

              <h2 className="mt-5 text-xl font-bold">{partner.name}</h2>

              <p className="mt-2 text-slate-600">
                Learning: {partner.language}
              </p>

              <p className="mt-1 text-sm text-green-600">
                ● {partner.level} speaker
              </p>

              <button className="mt-6 w-full rounded-full bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700">
                Connect
              </button>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
          }
