import React, { useState } from "react";
import { useUser } from "@clerk/clerk-react";
import {
  CheckCircle,
  Upload,
  Loader2,
  Link as LinkIcon,
  Unlink
} from "lucide-react";

import {
  initiateLinkedInAuth,
  getLinkedInAuthData,
  clearLinkedInAuthData,
  isLinkedInConnected
} from "@/utils/linkedinOAuth";

import {
  initiateFacebookAuth,
  getFacebookAuthData,
  clearFacebookAuthData,
  isFacebookConnected
} from "@/utils/facebookOAuth";

import {
  initiateInstagramAuth,
  getInstagramAuthData,
  clearInstagramAuthData,
  isInstagramConnected
} from "@/utils/instagramOAuth";

import {
  initiateTikTokAuth,
  getTikTokAuthData,
  clearTikTokAuthData,
  isTikTokConnected
} from "@/utils/tiktokOAuth";

import {
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
  Cloud
} from "lucide-react";

type Platform = {
  id: string;
  name: string;
  icon: any;
  connect?: () => void;
  disconnect?: () => void;
  isConnected: () => boolean;
};

const ALL_PLATFORMS: Platform[] = [
  {
    id: "facebook",
    name: "Facebook",
    icon: Facebook,
    connect: initiateFacebookAuth,
    disconnect: clearFacebookAuthData,
    isConnected: isFacebookConnected
  },
  {
    id: "instagram",
    name: "Instagram",
    icon: Instagram,
    connect: initiateInstagramAuth,
    disconnect: clearInstagramAuthData,
    isConnected: isInstagramConnected
  },
  {
    id: "linkedin",
    name: "LinkedIn",
    icon: Linkedin,
    connect: initiateLinkedInAuth,
    disconnect: clearLinkedInAuthData,
    isConnected: isLinkedInConnected
  },
  {
    id: "tiktok",
    name: "TikTok",
    icon: Music,
    connect: initiateTikTokAuth,
    disconnect: clearTikTokAuthData,
    isConnected: isTikTokConnected
  },
  {
    id: "x",
    name: "X (Twitter)",
    icon: Twitter,
    isConnected: () => false
  },
  {
    id: "bluesky",
    name: "Bluesky",
    icon: Cloud,
    isConnected: () => true
  },
  {
    id: "pinterest",
    name: "Pinterest",
    icon: Pin,
    isConnected: () => false
  },
  {
    id: "youtube",
    name: "YouTube",
    icon: Youtube,
    isConnected: () => false
  },
  {
    id: "google_business",
    name: "Google Business",
    icon: MapPin,
    isConnected: () => false
  },
  {
    id: "reddit",
    name: "Reddit",
    icon: MessageCircle,
    isConnected: () => false
  },
  {
    id: "medium",
    name: "Medium",
    icon: FileText,
    isConnected: () => false
  },
  {
    id: "threads",
    name: "Threads",
    icon: AtSign,
    isConnected: () => false
  }
];

export default function SocialMediaTool() {
  const { user, isSignedIn, isLoaded } = useUser();

  const [loading, setLoading] = useState(false);
  const [caption, setCaption] = useState("");
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [aiEnhance, setAiEnhance] = useState(true);
  const [postMode, setPostMode] = useState("publish");
  const [scheduledTime, setScheduledTime] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [loadingPlatform, setLoadingPlatform] = useState<string | null>(null);

  const isSelected = (id: string) => selectedPlatforms.includes(id);

  const togglePlatform = (id: string, connected: boolean) => {
    if (!connected) return;

    setSelectedPlatforms((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;

    setImageFile(f);
    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(String(reader.result));
    reader.readAsDataURL(f);
  };

  const sendToBackend = async () => {
    const form = new FormData();
    form.append("user_id", user!.id);
    form.append("caption", caption);
    selectedPlatforms.forEach((p) => form.append("platforms[]", p));
    form.append("post_mode", postMode);
    form.append("use_ai", aiEnhance ? "yes" : "no");

    if (postMode === "schedule") {
      form.append("scheduled_time", scheduledTime);
    }

    if (imageFile) {
      form.append("image", imageFile);
    }

    const res = await fetch("https://scs-ltd.app.n8n.cloud/webhook/social-media", {
      method: "POST",
      body: form
    });

    if (!res.ok) throw new Error(await res.text());
  };

  const handlePublish = async () => {
    setErrorMsg(null);

    if (!caption.trim())
      return setErrorMsg("Caption is required.");

    if (selectedPlatforms.length === 0)
      return setErrorMsg("Select at least one connected platform.");

    setLoading(true);

    try {
      await sendToBackend();
      setIsSuccess(true);
      setCaption("");
      setImageFile(null);
      setImagePreview(null);
      setSelectedPlatforms([]);
      setTimeout(() => setIsSuccess(false), 1500);
    } catch (err: any) {
      setErrorMsg(err.message);
    }

    setLoading(false);
  };

  if (!isLoaded)
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading…
      </div>
    );

  if (!isSignedIn)
    return (
      <div className="min-h-screen flex items-center justify-center">
        Login required
      </div>
    );

  return (
    <div className="min-h-screen pt-32 pb-20 bg-[#1A1A1C] text-[#D6D7D8]">
      <div className="max-w-6xl mx-auto px-6">

        <h1 className="text-3xl font-bold mb-8">
          Social Media Automation
        </h1>

        {/* ================= PLATFORMS ================= */}
        <div className="glass-card rounded-2xl p-6 mb-10">
          <h2 className="text-lg font-semibold mb-6">
            Select & Connect Platforms
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {ALL_PLATFORMS.map((p) => {
              const connected = p.isConnected();
              const selected = isSelected(p.id);
              const Icon = p.icon;

              return (
                <div
                  key={p.id}
                  className={`rounded-xl border p-4 transition ${
                    connected
                      ? selected
                        ? "border-[#E1C37A] bg-[#E1C37A]/10"
                        : "border-[#3B3C3E] hover:border-[#E1C37A]/50"
                      : "border-[#3B3C3E] opacity-50"
                  }`}
                >
                  <div className="flex items-center justify-between gap-4">
                    <button
                      onClick={() =>
                        togglePlatform(p.id, connected)
                      }
                      disabled={!connected}
                      className="flex items-center gap-3 text-left"
                    >
                      <Icon className="w-5 h-5 text-[#E1C37A]" />
                      <span className="font-medium">
                        {p.name}
                      </span>
                      {selected && (
                        <CheckCircle className="text-green-500 w-4 h-4" />
                      )}
                    </button>

                    {p.connect && (
                      <button
                        onClick={() => {
                          setLoadingPlatform(p.id);
                          connected
                            ? p.disconnect?.()
                            : p.connect();
                          setTimeout(() => setLoadingPlatform(null), 1200);
                        }}
                        className={`flex items-center gap-2 text-xs px-4 py-2 rounded-full ${
                          connected
                            ? "btn-outline"
                            : "btn-gold"
                        }`}
                      >
                        {loadingPlatform === p.id ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : connected ? (
                          <>
                            <Unlink className="w-4 h-4" />
                            Disconnect
                          </>
                        ) : (
                          <>
                            <LinkIcon className="w-4 h-4" />
                            Connect
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ================= POST CREATION ================= */}
        <div className="glass-card rounded-2xl p-6 space-y-6">

          <div>
            <label className="block text-sm mb-2 text-[#A9AAAC]">
              Post Caption
            </label>
            <textarea
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              rows={4}
              className="w-full rounded-lg bg-[#0F0F10] border border-[#3B3C3E] p-3 text-white"
            />
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-[#A9AAAC]">AI Enhancement</span>

            <button
              onClick={() => setAiEnhance(!aiEnhance)}
              className={`relative w-14 h-7 rounded-full transition ${
                aiEnhance ? "bg-[#E1C37A]" : "bg-[#3B3C3E]"
              }`}
            >
              <span
                className={`absolute top-1 left-1 w-5 h-5 rounded-full bg-black transition ${
                  aiEnhance ? "translate-x-7" : "translate-x-0"
                }`}
              />
            </button>
          </div>
          <div>
            <label className="block text-sm mb-2 text-[#A9AAAC]">
              Upload Image
            </label>
            <div className="border-2 border-dashed border-[#3B3C3E] p-4 rounded-lg text-center">
              {imagePreview ? (
                <div className="relative inline-block">
                  <img
                    src={imagePreview}
                    className="max-h-48 rounded-lg"
                  />
                  <button
                    onClick={() => {
                      setImageFile(null);
                      setImagePreview(null);
                    }}
                    className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full px-2"
                  >
                    x
                  </button>
                </div>
              ) : (
                <label className="cursor-pointer">
                  <input
                    type="file"
                    hidden
                    accept="image/*"
                    onChange={handleImageUpload}
                  />
                  <Upload className="mx-auto mb-2 text-[#A9AAAC]" />
                  <p className="text-sm text-[#A9AAAC]">
                    Click to upload
                  </p>
                </label>
              )}
            </div>
          </div>

          <select
            value={postMode}
            onChange={(e) => setPostMode(e.target.value)}
            className="w-full bg-[#0F0F10] border border-[#3B3C3E] p-3 rounded-lg"
          >
            <option value="publish">Publish Now</option>
            <option value="schedule">Schedule</option>
          </select>

          {postMode === "schedule" && (
            <input
              type="datetime-local"
              className="w-full bg-[#0F0F10] border border-[#3B3C3E] p-3 rounded-lg"
              value={scheduledTime}
              onChange={(e) => setScheduledTime(e.target.value)}
            />
          )}

          <div className="flex justify-end gap-4 pt-4">
            <button
              onClick={() => {
                setCaption("");
                setImageFile(null);
                setImagePreview(null);
                setSelectedPlatforms([]);
              }}
              className="btn-outline px-6 py-2 rounded-full"
            >
              Clear
            </button>

            <button
              onClick={handlePublish}
              disabled={loading}
              className="btn-gold px-6 py-2 rounded-full"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Publishing…
                </>
              ) : (
                "Publish Now"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
