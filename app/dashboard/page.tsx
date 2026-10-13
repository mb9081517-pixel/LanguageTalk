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
  const supabase = createClient();
  const fileRef = useRef<HTMLInputElement>(null);

  const [userId, setUserId] = useState("");
  const [email, setEmail] = useState("");
  const [myProfile, setMyProfile] = useState<Profile | null>(null);
  const [people, setPeople] = useState<Profile[]>([]);
  const [avatarUrl, setAvatarUrl] = useState("");
  const [bio, setBio] = useState("");
  const [search, setSearch] = useState("");
  const [section, setSection] = useState("Home");
  const [loading, setLoading] = useState(true);
  const [savingBio, setSavingBio] = useState(false);
  const [message, setMessage] = useState("");
  const [sendingTo, setSendingTo] = useState("");

  useEffect(() => {
    let active = true;

    async function loadDashboard() {
      const { data: authData } = await supabase.auth.getUser();
      const user = authData.user;

      if (!user) {
        router.replace("/login");
        return;
      }

      if (!active) return;
      setUserId(user.id);
      setEmail(user.email ?? "");

      const { data: profileData, error: profileError } = await supabase
        .from("profiles")
        .select("id, username, full_name, native_language, learning_language, bio")
        .eq("id", user.id)
        .maybeSingle();

      if (!active) return;

      if (profileError) {
        setMessage("Profile load nahi hua: " + profileError.message);
      }

      if (profileData) {
        const profile = profileData as Profile;
        setMyProfile(profile);
        setBio(profile.bio ?? "");
      }

      const { data: peopleData, error: peopleError } = await supabase
        .from("profiles")
        .select("id, username, full_name, native_language, learning_language, bio")
        .neq("id", user.id)
        .limit(50);

      if (!active) return;

      if (peopleError) {
        setMessage("Members load nahi hue: " + peopleError.message);
      } else {
        setPeople((peopleData ?? []) as Profile[]);
      }

      const { data: avatarData } = supabase.storage
        .from("profile-photos")
        .getPublicUrl(`${user.id}/avatar`);

      if (active) {
        setAvatarUrl(avatarData.publicUrl);
        setLoading(false);
      }
    }

    loadDashboard();

    return () => {
      active = false;
    };
  }, [router, supabase]);

  const filteredPeople = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return people;

    return people.filter((person) =>
      [
        person.full_name,
        person.username,
        person.native_language,
        person.learning_language,
      ]
        .filter(Boolean)
        .some((value) => value!.toLowerCase().includes(term))
    );
  }, [people, search]);

  async function uploadPhoto(file?: File) {
    if (!file || !userId) return;

    if (!file.type.startsWith("image/")) {
      setMessage("Sirf image file upload karein.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setMessage("Photo 5 MB se chhoti honi chahiye.");
      return;
    }

    setMessage("Photo upload ho rahi hai...");

    const { error } = await supabase.storage
      .from("profile-photos")
      .upload(`${userId}/avatar`, file, {
        upsert: true,
        contentType: file.type,
      });

    if (error) {
      setMessage("Photo upload nahi hui: " + error.message);
      return;
    }

    const { data } = supabase.storage
      .from("profile-photos")
      .getPublicUrl(`${userId}/avatar`);

    setAvatarUrl(`${data.publicUrl}?t=${Date.now()}`);
    setMessage("Profile picture update ho gayi!");
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
      setMessage("Bio save nahi hui: " + error.message);
      return;
    }

    setMyProfile((current) =>
      current ? { ...current, bio: bio.trim() } : current
    );
    setMessage("Bio save ho gayi!");
  }

  async function sendFriendRequest(person: Profile) {
    if (!userId || sendingTo) return;

    setSendingTo(person.id);
    setMessage("");

    const { error } = await supabase.from("friend_requests").insert({
      sender_id: userId,
      receiver_id: person.id,
      status: "pending",
    });

    setSendingTo("");

    if (error) {
      setMessage(
        "Friend request send nahi hui. Supabase friend_requests table/policies check karein: " +
          error.message
      );
      return;
    }

    setMessage(
      `Friend request ${person.full_name || person.username || "member"} ko bhej di gayi!`
    );
  }

  async function logout() {
    await supabase.auth.signOut();
    router.replace("/");
  }

  function openSection(name: string) {
    setSection(name);
    setMessage("");
    if (name === "Messages") router.push("/chat");
    if (name === "Find Partners") router.push("/partners");
  }

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50 text-slate-700">
        LanguageTalk khul raha hai...
      </main>
    );
  }

  const navItems = [
    "Home",
    "Find Friends",
    "Find Partners",
    "Messages",
    "Notifications",
    "My Profile",
  ];

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3">
          <button
            onClick={() => openSection("Home")}
            className="flex items-center gap-2 text-left"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-600 text-2xl text-white shadow">
              🌍
            </span>
            <span>
              <span className="block text-xl font-extrabold tracking-tight">
                Language<span className="text-blue-600">Talk</span>
              </span>
              <span className="hidden text-[10px] font-semibold tracking-[0.2em] text-slate-500 sm:block">
                LEARN · CONNECT · GROW
              </span>
            </span>
          </button>

          <button
            onClick={logout}
            className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold hover:bg-slate-100"
          >
            Log Out
          </button>
        </div>

        <nav className="mx-auto flex max-w-7xl gap-2 overflow-x-auto px-4 pb-3">
          {navItems.map((item) => (
            <button
              key={item}
              onClick={() => openSection(item)}
              className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold ${
                section === item
                  ? "bg-blue-600 text-white"
                  : "bg-slate-100 text-slate-700 hover:bg-blue-50 hover:text-blue-700"
              }`}
            >
              {item}
            </button>
          ))}
        </nav>
      </header>

      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-6 lg:grid-cols-[280px_1fr]">
        <aside className="h-fit rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="text-center">
            <div className="mx-auto flex h-24 w-24 items-center justify-center overflow-hidden rounded-full border-4 border-blue-100 bg-blue-50 text-4xl">
              {avatarUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={avatarUrl}
                  alt="Profile picture"
                  className="h-full w-full object-cover"
                />
              ) : (
                "👤"
              )}
            </div>

            <h2 className="mt-3 text-lg font-bold">
              {myProfile?.full_name || "LanguageTalk Member"}
            </h2>
            <p className="break-all text-xs text-slate-500">{email}</p>

            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(event) => uploadPhoto(event.target.files?.[0])}
            />

            <button
              onClick={() => fileRef.current?.click()}
              className="mt-4 w-full rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-bold text-white hover:bg-blue-700"
            >
              📷 Add Profile Picture
            </button>
          </div>

          <div className="my-5 border-t border-slate-100" />

          <label className="text-sm font-bold">About Me / Bio</label>
          <textarea
            value={bio}
            onChange={(event) => setBio(event.target.value)}
            placeholder="Tell people about yourself and the languages you want to learn..."
            maxLength={500}
            rows={4}
            className="mt-2 w-full resize-y rounded-xl border border-slate-200 p-3 text-sm outline-none focus:border-blue-500"
          />
          <p className="mt-1 text-right text-xs text-slate-400">
            {bio.length}/500
          </p>
          <button
            onClick={saveBio}
            disabled={savingBio}
            className="mt-2 w-full rounded-xl border border-blue-200 bg-blue-50 px-4 py-2.5 text-sm font-bold text-blue-700 hover:bg-blue-100 disabled:opacity-50"
          >
            {savingBio ? "Saving..." : "Save Bio"}
          </button>

          <div className="mt-5 space-y-3 rounded-2xl bg-slate-50 p-4 text-sm">
            <p>
              <span className="text-slate-500">Native language</span>
              <strong className="mt-1 block">
                {myProfile?.native_language || "Not added yet"}
              </strong>
            </p>
            <p>
              <span className="text-slate-500">Learning language</span>
              <strong className="mt-1 block">
                {myProfile?.learning_language || "Not added yet"}
              </strong>
            </p>
          </div>
        </aside>

        <section className="min-w-0 space-y-6">
          {message && (
            <div
              role="status"
              className="break-words rounded-2xl border border-blue-100 bg-blue-50 p-4 text-sm text-blue-800"
            >
              {message}
            </div>
          )}

          {section === "Home" && (
            <>
              <div className="overflow-hidden rounded-3xl bg-gradient-to-br from-blue-700 via-blue-600 to-cyan-500 p-6 text-white shadow-sm sm:p-9">
                <p className="text-sm font-semibold text-blue-100">
                  YOUR WORLDWIDE LANGUAGE COMMUNITY
                </p>
                <h1 className="mt-3 max-w-2xl text-3xl font-extrabold leading-tight sm:text-4xl">
                  Meet the world. Make friends. Learn languages.
                </h1>
                <p className="mt-3 max-w-xl text-sm leading-6 text-blue-50 sm:text-base">
                  Connect with people from different countries and practise a
                  new language through real conversations.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <button
                    onClick={() => openSection("Find Friends")}
                    className="rounded-xl bg-white px-5 py-3 font-bold text-blue-700 hover:bg-blue-50"
                  >
                    Find Friends →
                  </button>
                  <button
                    onClick={() => openSection("Find Partners")}
                    className="rounded-xl border border-white/60 px-5 py-3 font-bold text-white hover:bg-white/10"
                  >
                    Find Language Partners
                  </button>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                {[
                  {
                    icon: "🌎",
                    title: "Meet the World",
                    desc: "Discover members from different places.",
                    action: "Find Friends",
                  },
                  {
                    icon: "💬",
                    title: "Start Conversations",
                    desc: "Open chat and practise together.",
                    action: "Messages",
                  },
                  {
                    icon: "📚",
                    title: "Learn Together",
                    desc: "Find people learning your language.",
                    action: "Find Partners",
                  },
                ].map((item) => (
                  <button
                    key={item.title}
                    onClick={() => openSection(item.action)}
                    className="rounded-2xl border border-slate-200 bg-white p-5 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md"
                  >
                    <span className="text-3xl">{item.icon}</span>
                    <h3 className="mt-3 font-bold">{item.title}</h3>
                    <p className="mt-1 text-sm leading-5 text-slate-500">
                      {item.desc}
                    </p>
                  </button>
                ))}
              </div>

              <div className="rounded-3xl border border-slate-200 bg-white p-5 sm:p-6">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <h2 className="text-xl font-extrabold">Meet new members</h2>
                    <p className="mt-1 text-sm text-slate-500">
                      People you can connect with on LanguageTalk.
                    </p>
                  </div>
                  <button
                    onClick={() => openSection("Find Friends")}
                    className="font-bold text-blue-600 hover:text-blue-800"
                  >
                    View all →
                  </button>
                </div>
                <PeopleList
                  people={people.slice(0, 3)}
                  onAddFriend={sendFriendRequest}
                  sendingTo={sendingTo}
                />
              </div>
            </>
          )}

          {section === "Find Friends" && (
            <div className="rounded-3xl border border-slate-200 bg-white p-5 sm:p-7">
              <h1 className="text-2xl font-extrabold">Find Friends</h1>
              <p className="mt-1 text-sm text-slate-500">
                Search members by name, username, or language.
              </p>
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search people or languages..."
                className="mt-5 w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500"
              />
              <PeopleList
                people={filteredPeople}
                onAddFriend={sendFriendRequest}
                sendingTo={sendingTo}
              />
              {filteredPeople.length === 0 && (
                <p className="py-8 text-center text-slate-500">
                  No members found. Try another search.
                </p>
              )}
            </div>
          )}

          {section === "Notifications" && (
            <div className="rounded-3xl border border-slate-200 bg-white p-6">
              <h1 className="text-2xl font-extrabold">Notifications</h1>
              <p className="mt-2 text-slate-600">
                Friend request and activity notifications will appear here
                when the notifications feature is connected to your database.
              </p>
            </div>
          )}

          {section === "My Profile" && (
            <div className="rounded-3xl border border-slate-200 bg-white p-6">
              <h1 className="text-2xl font-extrabold">My Profile</h1>
              <p className="mt-2 text-slate-600">
                Your profile picture and bio can be updated in the left panel.
              </p>
              <div className="mt-5 space-y-3 rounded-2xl bg-slate-50 p-4">
                <p>
                  <strong>Name:</strong>{" "}
                  {myProfile?.full_name || "Not added yet"}
                </p>
                <p>
                  <strong>Username:</strong>{" "}
                  {myProfile?.username || "Not added yet"}
                </p>
                <p>
                  <strong>Email:</strong> {email}
        </
