"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function Dashboard() {
  const router = useRouter();
  const supabase = useMemo(() => createClient(), []);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [userId, setUserId] = useState<string | null>(null);
  const [avatarUrl, setAvatarUrl] = useState("");
  const [avatarVisible, setAvatarVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    let active = true;

    async function loadUser() {
      const { data, error } = await supabase.auth.getUser();

      if (!active) return;

      if (error || !data.user) {
        router.replace("/login");
        return;
      }

      setUserId(data.user.id);

      const { data: publicData } = supabase.storage
        .from("profile-photos")
        .getPublicUrl(`${data.user.id}/avatar`);

      setAvatarUrl(publicData.publicUrl);
      setLoading(false);
    }

    loadUser();

    return () => {
      active = false;
    };
  }, [router, supabase]);

  async function handleUpload(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = event.target.files?.[0];
    event.target.value = "";

    if (!file || !userId) return;

    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];

    if (!allowedTypes.includes(file.type)) {
      setMessage("Please choose a JPG, PNG, or WebP image.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setMessage("Photo must be 5 MB or smaller.");
      return;
    }

    setUploading(true);
    setMessage("");

    try {
      const { error } = await supabase.storage
        .from("profile-photos")
        .upload(`${userId}/avatar`, file, {
          upsert: true,
          contentType: file.type,
          cacheControl: "3600",
        });

      if (error) {
        setMessage(`Photo upload failed: ${error.message}`);
        return;
      }

      const { data } = supabase.storage
        .from("profile-photos")
        .getPublicUrl(`${userId}/avatar`);

      setAvatarUrl(`${data.publicUrl}?t=${Date.now()}`);
      setAvatarVisible(false);
      setMessage("Profile picture updated successfully!");
    } catch {
      setMessage("Something went wrong. Please try again.");
    } finally {
      setUploading(false);
    }
  }

  async function handleLogout() {
    const { error } = await supabase.auth.signOut();

    if (error) {
      setMessage("Logout failed. Please try again.");
      return;
    }

    router.replace("/login");
  }

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50">
        <p className="text-slate-600">Loading your dashboard...</p>
      </main>
    );
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

        <div className="mt-8 rounded-3xl bg-white p-7 shadow-sm">
          <h2 className="text-xl font-bold">My Profile</h2>

          <div className="mt-5 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
            {avatarUrl && (
              <img
                src={avatarUrl}
                alt="Your profile picture"
                onLoad={() => setAvatarVisible(true)}
                onError={() => setAvatarVisible(false)}
                className={`h-24 w-24 rounded-full border object-cover ${
                  avatarVisible ? "" : "hidden"
                }`}
              />
            )}

            {!avatarVisible && (
              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-sky-100 text-4xl">
                👤
              </div>
            )}

            <div>
              <p className="font-semibold">Your profile picture</p>
              <p className="mt-1 text-sm text-slate-500">
                JPG, PNG or WebP · Maximum 5 MB
              </p>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={handleUpload}
                className="hidden"
              />

              <button
                type="button"
                disabled={uploading}
                onClick={() => fileInputRef.current?.click()}
                className="mt-4 rounded-full bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {uploading
                  ? "Uploading..."
                  : avatarVisible
                    ? "Change Profile Picture"
                    : "Add Profile Picture"}
              </button>
            </div>
          </div>

          {message && (
            <p role="status" className="mt-4 text-sm text-slate-700">
              {message}
            </p>
          )}
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <div className="rounded-3xl bg-white p-7 shadow-sm">
            <div className="text-3xl">🌍</div>
            <h2 className="mt-4 text-xl font-bold">Find Partners</h2>
            <p className="mt-2 text-slate-600">
              Discover people who are learning and speaking your languages.
            </p>
            <button
              onClick={() => router.push("/partners")}
              className="mt-5 rounded-full bg-blue-600 px-5 py-3 font-semibold text-white"
            >
              Find People
            </button>
          </div>

          <div className="rounded-3xl bg-white p-7 shadow-sm">
            <div className="text-3xl">💬</div>
            <h2 className="mt-4 text-xl font-bold">Messages</h2>
            <p className="mt-2 text-slate-600">
              Chat with your language partners and practice every day.
            </p>
            <button
              onClick={() => router.push("/chat")}
              className="mt-5 rounded-full bg-blue-600 px-5 py-3 font-semibold text-white"
            >
              Open Chat
            </button>
          </div>
        </div>
      </section>
    </main>
  );
      }
