// --- SocialAutomationApp.tsx ---
// COMPLETE BASE44 DESIGN CLONE
// WITH YOUR ORIGINAL BACKEND & AUTH LOGIC
// NO BASE44 DEPENDENCIES
// FULL SLIDING ANIMATION & UI EFFECTS

import React, { useState, useRef, useEffect } from "react";
import { useUser } from "@clerk/clerk-react";
import {
  CheckCircle,
  Upload,
  Loader2,
  Link as LinkIcon,
  Unlink,
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  Music,
  Pin,
  Youtube,
  MapPin,
  MessageCircle,
  FileText,
  AtSign,
} from "lucide-react";

// ====== YOUR AUTH LOGIC (unchanged) ======
import {
  initiateLinkedInAuth,
  clearLinkedInAuthData,
  isLinkedInConnected,
} from "@/utils/linkedinOAuth";

import {
  initiateFacebookAuth,
  clearFacebookAuthData,
  isFacebookConnected,
} from "@/utils/facebookOAuth";

import {
  initiateInstagramAuth,
  clearInstagramAuthData,
  isInstagramConnected,
} from "@/utils/instagramOAuth";

import {
  initiateTikTokAuth,
  clearTikTokAuthData,
  isTikTokConnected,
} from "@/utils/tiktokOAuth";

// Dashboard Panel
import SocialDashboard from "./SocialDashboard";

// ------------------------------------------------------
// PLATFORM DEFINITIONS
// ------------------------------------------------------
const ALL_PLATFORMS = [
  {
    id: "facebook",
    name: "Facebook",
    icon: Facebook,
    connect: initiateFacebookAuth,
    disconnect: clearFacebookAuthData,
    isConnected: isFacebookConnected,
  },
  {
    id: "instagram",
    name: "Instagram",
    icon: Instagram,
    connect: initiateInstagramAuth,
    disconnect: clearInstagramAuthData,
    isConnected: isInstagramConnected,
  },
  {
    id: "linkedin",
    name: "LinkedIn",
    icon: Linkedin,
    connect: initiateLinkedInAuth,
    disconnect: clearLinkedInAuthData,
    isConnected: isLinkedInConnected,
  },
  {
    id: "tiktok",
    name: "TikTok",
    icon: Music,
    connect: initiateTikTokAuth,
    disconnect: clearTikTokAuthData,
    isConnected: isTikTokConnected,
  },

  // Remaining platforms — visible but no real OAuth
  { id: "x", name: "X (Twitter)", icon: Twitter, isConnected: () => false },
  { id: "bluesky", name: "Bluesky", icon: Cloud, isConnected: () => false },
  { id: "pinterest", name: "Pinterest", icon: Pin, isConnected: () => false },
  { id: "youtube", name: "YouTube", icon: Youtube, isConnected: () => false },
  { id: "google_business", name: "Google Business", icon: MapPin, isConnected: () => false },
  { id: "reddit", name: "Reddit", icon: MessageCircle, isConnected: () => false },
  { id: "medium", name: "Medium", icon: FileText, isConnected: () => false },
  { id: "threads", name: "Threads", icon: AtSign, isConnected: () => false },
];

export default function SocialAutomationApp() {
  const { user, isLoaded, isSignedIn } = useUser();

  // ----- YOUR ORIGINAL LOGIC (unchanged) -----
  const [caption, setCaption] = useState("");
  const [aiEnhance, setAiEnhance] = useState(true);
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [postMode, setPostMode] = useState("publish");
  const [scheduledTime, setScheduledTime] = useState("");
  const [selectedPlatforms, setSelectedPlatforms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  // ----- NEW: TAB + SLIDER -----
  const [activeTab, setActiveTab] = useState("create");
  const slider = useRef(null);

  useEffect(() => {
    const container = slider.current;
    if (!container) return;

    const target = activeTab === "create" ? 0 : container.scrollWidth / 2;
    const start = container.scrollLeft;
    const distance = target - start;
    const duration = 800;
    const startTime = performance.now();

    const ease = (t) =>
      t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

    const animate = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      container.scrollLeft = start + distance * ease(progress);
      if (progress < 1) requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }, [activeTab]);

  // ----- IMAGE UPLOAD -----
  function handleImageUpload(e) {
    const file = e.target.files?.[0];
    if (!file) return;

    setImageFile(file);
    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result);
    reader.readAsDataURL(file);
  }

  // ----- SEND TO BACKEND (unchanged) -----
  async function sendToBackend() {
    const form = new FormData();
    form.append("user_id", user.id);
    form.append("caption", caption);
    form.append("use_ai", aiEnhance ? "yes" : "no");
    form.append("post_mode", postMode);

    if (postMode === "schedule") form.append("scheduled_time", scheduledTime);
    if (imageFile) form.append("image", imageFile);
    selectedPlatforms.forEach((p) => form.append("platforms[]", p));

    const res = await fetch("https://scs-ltd.app.n8n.cloud/webhook/social-media", {
      method: "POST",
      body: form,
    });

    if (!res.ok) throw new Error(await res.text());
  }

  async function publish() {
    setErrorMsg(null);

    if (!caption.trim()) return setErrorMsg("Caption is required.");
    if (selectedPlatforms.length === 0)
      return setErrorMsg("Select at least one platform.");

    setLoading(true);
    try {
      await sendToBackend();
      setIsSuccess(true);
      setCaption("");
      setImagePreview(null);
      setImageFile(null);
      setSelectedPlatforms([]);
      setTimeout(() => setIsSuccess(false), 2000);
    } catch (err) {
      setErrorMsg(err.message);
    }
    setLoading(false);
  }

  if (!isLoaded)
    return <div className="text-white min-h-screen flex items-center justify-center">Loading…</div>;

  if (!isSignedIn)
    return (
      <div className="text-white min-h-screen flex items-center justify-center">
        Login required
      </div>
    );

  // ------------------------------------------------------------
  //                       UI OUTPUT
  // ------------------------------------------------------------
  return (
    <div className="min-h-screen bg-[#0B0B0D] text-white relative overflow-hidden">

      {/* GOLD GLOWS */}
      <div className="fixed -top-40 -left-40 w-[400px] h-[400px] bg-[#E1C37A]/10 rounded-full blur-[120px]" />
      <div className="fixed bottom-0 right-[-120px] w-[400px] h-[400px] bg-[#B6934C]/10 rounded-full blur-[120px]" />

      <div className="relative max-w-6xl mx-auto pt-28 pb-16 px-6">

        {/* TAB SWITCHER */}
        <div className="flex justify-center mb-10">
          <div className="bg-[#1A1A1C]/80 border border-white/5 backdrop-blur-xl rounded-2xl shadow-lg flex">
            <button
              className={`px-6 py-2 rounded-xl transition-all ${
                activeTab === "create"
                  ? "bg-gradient-to-r from-[#E1C37A] to-[#B6934C] text-black shadow-lg"
                  : "text-gray-300 hover:text-white"
              }`}
              onClick={() => setActiveTab("create")}
            >
              Create Post
            </button>

            <button
              className={`px-6 py-2 rounded-xl transition-all ${
                activeTab === "dashboard"
                  ? "bg-gradient-to-r from-[#E1C37A] to-[#B6934C] text-black shadow-lg"
                  : "text-gray-300 hover:text-white"
              }`}
              onClick={() => setActiveTab("dashboard")}
            >
              Dashboard
            </button>
          </div>
        </div>

        {/* MAIN GLASS PANEL */}
        <div className="rounded-3xl bg-[#131316]/70 border border-white/5 backdrop-blur-2xl shadow-2xl overflow-hidden">

          <div
            ref={slider}
            className="flex overflow-x-hidden"
            style={{ scrollSnapType: "x mandatory" }}
          >

            {/* ======================================================
               CREATE POST PANEL (BASE44 DESIGN)
               ====================================================== */}
            <div className="w-full flex-shrink-0 p-8 space-y-8" style={{ scrollSnapAlign: "start" }}>

              {/* HEADER */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-[#E1C37A] to-[#B6934C] rounded-2xl flex items-center justify-center">
                  <Upload className="w-6 h-6 text-black" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold">Create Post</h1>
                  <p className="text-gray-400 text-sm">Publish or schedule content across your platforms</p>
                </div>
              </div>

              {/* SUCCESS / ERROR */}
              {isSuccess && (
                <div className="bg-green-500/20 border border-green-400/40 text-green-200 px-4 py-3 rounded-xl flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  Post published successfully!
                </div>
              )}
              {errorMsg && (
                <div className="bg-red-500/20 border border-red-400/40 text-red-200 px-4 py-3 rounded-xl text-sm">
                  {errorMsg}
                </div>
              )}

              <div className="grid lg:grid-cols-[1.2fr_1fr] gap-8">

                {/* ---------- LEFT COLUMN: PLATFORM SELECTION + SCHEDULE UI ---------- */}
                <div className="space-y-8">

                  {/* PLATFORM SELECTION (NO CONNECT LOGIC HERE) */}
                  <div className="bg-[#1A1A1C]/60 border border-white/5 rounded-2xl p-6 backdrop-blur-lg">
                    <h2 className="text-lg font-semibold mb-4">Select Platforms</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">

                      {ALL_PLATFORMS.map((p) => {
                        const Icon = p.icon;
                        const connected = p.isConnected();
                        const selected = selectedPlatforms.includes(p.id);

                        return (
                          <button
                            key={p.id}
                            onClick={() =>
                              connected &&
                              setSelectedPlatforms((old) =>
                                old.includes(p.id)
                                  ? old.filter((x) => x !== p.id)
                                  : [...old, p.id]
                              )
                            }
                            className={`text-left px-4 py-3 rounded-xl border transition-all flex items-center gap-3 ${
                              connected
                                ? selected
                                  ? "border-[#E1C37A] bg-[#E1C37A]/10 shadow-lg"
                                  : "border-[#2A2A2E] hover:border-[#E1C37A]/60 hover:bg-[#1F1F23]"
                                : "border-[#2A2A2E] opacity-50"
                            }`}
                          >
                            <Icon className="w-5 h-5 text-[#E1C37A]" />
                            <span className="font-medium">{p.name}</span>
                            {selected && (
                              <CheckCircle className="text-green-400 w-4 h-4 ml-auto" />
                            )}
                          </button>
                        );
                      })}

                    </div>
                  </div>

                  {/* SCHEDULE */}
                  <div className="bg-[#1A1A1C]/60 border border-white/5 rounded-2xl p-6">

                    <h2 className="text-lg font-semibold mb-4">Publish Mode</h2>

                    <div className="grid grid-cols-2 gap-4">
                      <button
                        className={`p-4 rounded-2xl border text-left transition-all ${
                          postMode === "publish"
                            ? "border-[#E1C37A] bg-[#E1C37A]/10 shadow-lg"
                            : "border-[#2A2A2E] hover:border-[#E1C37A]/40"
                        }`}
                        onClick={() => setPostMode("publish")}
                      >
                        <p className="font-medium">Publish Now</p>
                        <p className="text-xs text-gray-400">Send immediately</p>
                      </button>

                      <button
                        className={`p-4 rounded-2xl border text-left transition-all ${
                          postMode === "schedule"
                            ? "border-[#E1C37A] bg-[#E1C37A]/10 shadow-lg"
                            : "border-[#2A2A2E] hover:border-[#E1C37A]/40"
                        }`}
                        onClick={() => setPostMode("schedule")}
                      >
                        <p className="font-medium">Schedule</p>
                        <p className="text-xs text-gray-400">Choose date & time</p>
                      </button>
                    </div>

                    {postMode === "schedule" && (
                      <input
                        type="datetime-local"
                        className="mt-4 w-full bg-[#111114] border border-[#3B3C3E] rounded-xl p-3 text-white"
                        value={scheduledTime}
                        onChange={(e) => setScheduledTime(e.target.value)}
                      />
                    )}

                  </div>

                </div>

                {/* ---------- RIGHT COLUMN: CAPTION, AI, MEDIA, BUTTONS ---------- */}
                <div className="space-y-8">

                  {/* CAPTION */}
                  <div className="bg-[#1A1A1C]/60 border border-white/5 rounded-2xl p-6">
                    <div className="flex items-center justify-between mb-3">
                      <h2 className="text-lg font-semibold">Caption</h2>

                      {/* AI ENHANCE SWITCH */}
                      <button
                        onClick={() => setAiEnhance(!aiEnhance)}
                        className={`w-14 h-7 rounded-full relative ${
                          aiEnhance ? "bg-[#E1C37A]" : "bg-gray-600"
                        }`}
                      >
                        <span
                          className={`absolute top-1 left-1 w-5 h-5 rounded-full bg-black transition-transform ${
                            aiEnhance ? "translate-x-7" : ""
                          }`}
                        />
                      </button>
                    </div>

                    <textarea
                      value={caption}
                      onChange={(e) => setCaption(e.target.value)}
                      rows={5}
                      placeholder="Write your caption..."
                      className="w-full bg-[#111114] border border-[#3B3C3E] rounded-xl p-3 text-white"
                    />
                  </div>

                  {/* MEDIA UPLOAD */}
                  <div className="bg-[#1A1A1C]/60 border border-white/5 rounded-2xl p-6 text-center">

                    {imagePreview ? (
                      <div className="relative inline-block">
                        <img
                          src={imagePreview}
                          className="max-h-60 rounded-xl shadow-xl"
                        />
                        <button
                          onClick={() => {
                            setImagePreview(null);
                            setImageFile(null);
                          }}
                          className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full px-2"
                        >
                          ×
                        </button>
                      </div>
                    ) : (
                      <label className="cursor-pointer">
                        <Upload className="mx-auto mb-2 text-gray-400" />
                        <p className="text-gray-400 text-sm">Click to upload</p>
                        <input
                          type="file"
                          hidden
                          accept="image/*"
                          onChange={handleImageUpload}
                        />
                      </label>
                    )}

                  </div>

                  {/* BUTTONS */}
                  <div className="flex justify-end gap-4">
                    <button
                      onClick={() => {
                        setCaption("");
                        setImagePreview(null);
                        setImageFile(null);
                        setSelectedPlatforms([]);
                      }}
                      className="px-6 py-2 rounded-full border border-[#3B3C3E]"
                    >
                      Clear
                    </button>

                    <button
                      onClick={publish}
                      disabled={loading}
                      className="px-6 py-2 rounded-full bg-gradient-to-r from-[#E1C37A] to-[#B6934C] text-black font-semibold shadow-lg flex items-center gap-2"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Publishing…
                        </>
                      ) : (
                        "Publish"
                      )}
                    </button>
                  </div>
                </div>

              </div>
            </div>

            {/* ======================================================
               DASHBOARD PANEL
               ====================================================== */}
            <div className="w-full flex-shrink-0 p-8" style={{ scrollSnapAlign: "start" }}>
              <SocialDashboard />
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
