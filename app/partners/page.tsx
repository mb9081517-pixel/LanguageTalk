"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

type Profile = {
  id: string;
  full_name: string | null;
  native_language: string | null;
  learning_language: string | null;
};

export default function Partners() {
  const router = useRouter();
  const supabase = createClient();

  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function loadProfiles() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.push("/login");
        return;
      }

      const { data, error } = await supabase
        .from("profiles")
        .select("id, full_name, native_language, learning_language")
        .neq("id", user.id)
        .order("created_at", { ascending: false });

      if (error) {
        setMessage(error.message);
      } else {
        setProfiles(data || []);
      }

      setLoading(false);
    }

    loadProfiles();
  }, [router, supabase]);

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
        <h1 className="text-4xl font-extrabold">
          Find Language Partners 🌍
        </h1>

        <p className="mt-3 text-lg text-slate-600">
          Meet real people around the world and practice languages together.
        </p>

        {loading && (
          <p className="mt-10 text-slate-600">
            Finding language partners...
          </p>
        )}

        {message && (
          <div className="mt-8 rounded-2xl bg-red-50 p-5 text-red-700">
            {message}
          </div>
        )}

        {!loading && !message && profiles.length === 0 && (
          <div className="mt-10 rounded-3xl bg-white p-8 text-center shadow-sm">
            <div className="text-5xl">🌍</div>
            <h2 className="mt-4 text-2xl font-bold">
              No partners yet
            </h2>
            <p className="mt-2 text-slate-600">
              When other people create accounts, they will appear here.
            </p>
          </div>
        )}

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {profiles.map((profile) => (
            <div
              key={profile.id}
              className="rounded-3xl bg-white p-6 shadow-sm"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-50 text-3xl">
                🌎
              </div>

              <h2 className="mt-5 text-xl font-bold">
                {profile.full_name || "Language Learner"}
              </h2>

              <p className="mt-2 text-slate-600">
                Native: {profile.native_language || "Not added"}
              </p>

              <p className="mt-1 text-slate-600">
                Learning: {profile.learning_language || "Not added"}
              </p>

              <button
                onClick={() =>
                  setMessage(
                    `Connection request to ${
                      profile.full_name || "this user"
                    } will be added next.`
                  )
                }
                className="mt-6 w-full rounded-full bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
              >
                Connect
              </button>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
                }
