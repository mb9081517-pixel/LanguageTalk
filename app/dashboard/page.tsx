
"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

type Profile = {
  id: string;
  username: string | null;
  full_name: string | null;
  native_language: string | null;
  learning_language: string | null;
  bio: string | null;
};

export default function Dashboard() {
  const router = useRouter();
  const supabase = useMemo(() => createClient(), []);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [userId, setUserId] = useState<string | null>(null);
  const [avatarUrl, setAvatarUrl] = useState("");
  const [avatarVisible, setAvatarVisible] = useState(false);
  const [zoomOpen, setZoomOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");

  const [bio, setBio] = useState("");
  const [bioOpen, setBioOpen] = useState(false);
  const [savingBio, setSavingBio] = useState(false);

  const [friendsOpen, setFriendsOpen] = useState(false);
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loadingProfiles, setLoadingProfiles] = useState(false);

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

      const { data: profile } = await supabase
        .from("profiles")
        .select("bio")
        .eq("id", data.user.id)
        .maybeSingle();

      if (active && profile) {
        setBio(profile.bio || "");
      }

      const { data: publicData } = supabase.storage
        .from("profile-photos")
        .getPublicUrl(`${data.user.id}/avatar`);

      if (active) {
        setAvatarUrl(`${publicData.publicUrl}?t=${Date.now()}`);
        setLoading(false);
      }
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

    if (
      !["image/jpeg", "image/png", "image/webp"].includes(file.type)
    ) {
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
      setZoomOpen(false);
      setMessage("Profile picture updated successfully!");
    } catch {
      setMessage("Something went wrong. Please try again.");
    } finally {
      setUploading(false);
    }
  }

  async function saveBio() {
    if (!userId) return;

    setSavingBio(true);
    setMessage("");

    const { error } = await supabase
      .from("profiles")
      .update({ bio: bio.trim() })
      .eq("id", userId);

    setSavingBio(false);

    if (error) {
      setMessage(`Bio could not be saved: ${error.message}`);
      return;
    }

    setBioOpen(false);
    setMessage("Bio saved successfully!");
  }

  async function loadProfiles() {
    setFriendsOpen(true);
    setLoadingProfiles(true);
    setMessage("");

    const { data, error } = await supabase
      .from("profiles")
      .select(
        "id, username, full_name, native_language, learning_language, bio"
      )
      .neq("id", userId || "")
      .limit(50);

    setLoadingProfiles(false);

    if (error) {
      setMessage(`Could not load people: ${error.message}`);
      setProfiles([]);
      return;
    }

    setProfiles((data || []) as Profile[]);
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
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-5 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-sky-100 text-2xl">
              🌐
            </div>
            <span className="text-xl font-bold sm:text-2xl">
              LanguageTalk
            </span>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            className="rounded-full border border-slate-300 px-4 py-2.5 font-semibold text-slate-700 hover:bg-slate-50"
          >
            Log Out
          </button>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12">
        <div className="rounded-3xl bg-blue-600 p-6 text-white shadow-lg sm:p-8">
          <p className="text-blue-100">Welcome to LanguageTalk 👋</p>
          <h1 className="mt-2 text-3xl font-extrabold sm:text-4xl">
            Start your language journey.
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-blue-100">
            Find language partners, practice speaking, and connect
            with people from around the world.
          </p>
        </div>

        <div className="mt-8 rounded-3xl bg-white p-6 shadow-sm sm:p-7">
          <h2 className="text-xl font-bold">My Profile</h2>

          <div className="mt-5 flex flex-col items-start gap-5">
            {avatarUrl && (
              <img
                src={avatarUrl}
                alt="Your profile picture"
                onLoad={() => setAvatarVisible(true)}
                onError={() => setAvatarVisible(false)}
                onClick={() => {
                  if (avatarVisible) setZoomOpen(true);
                }}
                className={`h-[220px] w-[180px] rounded-xl border border-slate-200 object-cover shadow-sm ${
                  avatarVisible ? "cursor-zoom-in" : "hidden"
                }`}
              />
            )}

            {!avatarVisible && (
              <div className="flex h-[220px] w-[180px] items-center justify-center rounded-xl border border-slate-200 bg-sky-100 text-5xl">
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
                className="mt-4 rounded-full bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700 disabled:opacity-60"
              >
                {uploading
                  ? "Uploading..."
                  : avatarVisible
                    ? "Change Profile Picture"
                    : "Add Profile Picture"}
              </button>
            </div>
          </div>

          <div className="mt-7 border-t border-slate-100 pt-6">
            <h3 className="text-lg font-bold">My Bio</h3>
            <p className="mt-2 whitespace-pre-wrap text-slate-600">
              {bio || "Tell people about yourself and the languages you want to practice."}
            </p>

            <button
              type="button"
              onClick={() => setBioOpen(!bioOpen)}
              className="mt-4 rounded-full bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
            >
              {bioOpen ? "Cancel" : "Add Bio"}
            </button>

            {bioOpen && (
              <div className="mt-4">
                <label htmlFor="profile-bio" className="mb-2 block font-medium">
                  About me
                </label>
                <textarea
                  id="profile-bio"
                  value={bio}
                  onChange={(event) => setBio(event.target.value)}
                  maxLength={500}
                  rows={4}
                  placeholder="Hi! I want to practice English and meet new friends..."
                  className="w-full rounded-xl border border-slate-300 p-3 outline-none focus:border-blue-500"
                />
                <p className="mt-1 text-sm text-slate-500">
                  {bio.length}/500 characters
                </p>
                <button
                  type="button"
                  disabled={savingBio}
                  onClick={saveBio}
                  className="mt-3 rounded-full bg-green-600 px-5 py-3 font-semibold text-white disabled:opacity-60"
                >
                  {savingBio ? "Saving..." : "Save Bio"}
                </button>
              </div>
            )}
          </div>

          {message && (
            <p role="status" className="mt-4 break-words text-sm text-slate-700">
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
              type="button"
              onClick={() => router.push("/partners")}
              className="mt-5 rounded-full bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
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
              type="button"
              onClick={() => router.push("/chat")}
              className="mt-5 rounded-full bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
            >
              Open Chat
            </button>
          </div>

          <div className="rounded-3xl bg-white p-7 shadow-sm md:col-span-2">
            <div className="text-3xl">👋</div>
            <h2 className="mt-4 text-xl font-bold">Add Friend</h2>
            <p className="mt-2 text-slate-600">
              Discover other LanguageTalk members and view their profiles.
            </p>
            <button
              type="button"
              onClick={loadProfiles}
              className="mt-5 rounded-full bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
            >
              Find Friends
            </button>

            {friendsOpen && (
              <div className="mt-6">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-lg font-bold">People on LanguageTalk</h3>
                  <button
                    type="button"
                    onClick={() => setFriendsOpen(false)}
                    className="rounded-full border px-3 py-1.5"
                  >
                    Close
                  </button>
                </div>

                {loadingProfiles ? (
                  <p className="mt-4 text-slate-600">Loading people...</p>
                ) : profiles.length === 0 ? (
                  <p className="mt-4 text-slate-600">
                    No other profiles found, or profiles could not be loaded.
                    Check the message above if one appears.
                  </p>
                ) : (
                  <div className="mt-4 grid gap-4 sm:grid-cols-2">
                    {profiles.map((profile) => (
                      <div
                        key={profile.id}
                        className="rounded-2xl border border-slate-200 p-4"
                      >
                        <h4 className="font-bold">
                          {profile.full_name || profile.username || "LanguageTalk member"}
                        </h4>
                        {(profile.native_language || profile.learning_language) && (
                          <p className="mt-1 text-sm text-slate-600">
                            {profile.native_language || "Language not set"}
                            {" → "}
                            {profile.learning_language || "Language not set"}
                          </p>
                        )}
                        <p className="mt-2 whitespace-pre-wrap text-sm text-slate-600">
                          {profile.bio || "This member hasn't added a bio yet."}
                        </p>
                        <button
                          type="button"
                          onClick={() =>
                            setMessage(
                              "Friend requests need the friend_requests table and its security policies before they can be sent."
                            )
                          }
                          className="mt-4 rounded-full border border-blue-600 px-4 py-2 font-semibold text-blue-700 hover:bg-blue-50"
                        >
                          Add Friend
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      {zoomOpen && avatarVisible && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4"
          onClick={() => setZoomOpen(false)}
        >
          <button
            type="button"
            onClick={() => setZoomOpen(false)}
            className="absolute right-5 top-5 rounded-full bg-white px-4 py-2 text-xl font-bold text-black"
            aria-label="Close enlarged profile picture"
          >
            ✕
          </button>
          <img
            src={avatarUrl}
            alt="Enlarged profile picture"
            className="max-h-[85vh] max-w-full rounded-xl object-contain"
            onClick={(event) => event.stopPropagation()}
          />
        </div>
      )}
    </main>
  );
        }
  
