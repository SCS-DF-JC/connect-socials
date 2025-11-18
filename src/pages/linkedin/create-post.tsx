import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const getUserId = () => {
  const id = localStorage.getItem("saas_user_id");
  return { id };
};

const getLinkedInAuthData = () => {
  const stored = localStorage.getItem("linkedin_auth_data");
  return stored ? JSON.parse(stored) : null;
};

const PLATFORM_STATUS = {
  linkedin: true,
  twitter: false,
  mastodon: false,
  bluesky: false,
};

const AVAILABLE_PLATFORMS = [
  {
    id: "linkedin",
    name: "LinkedIn",
    icon: "M4.98 3.5C4.98 4.88 3.86 6 2.48 6S0 4.88 0 3.5 1.11 1 2.48 1 4.98 2.11 4.98 3.5zM.2 8.5h4.5V21H.2V8.5zM7.98 8.5h4.31v1.71h.06c.6-1.14 2.07-2.34 4.26-2.34 4.55 0 5.39 2.99 5.39 6.88V21h-4.5v-5.97c0-1.42-.02-3.26-1.99-3.26-1.99 0-2.3 1.55-2.3 3.16V21h-4.5V8.5z"
  },
  {
    id: "twitter",
    name: "Twitter (X)",
    icon: "M23.44 4.83c-.8.35-1.67.58-2.56.69a4.48 4.48 0 001.98-2.47 8.93 8.93 0 01-2.83 1.1 4.51 4.51 0 00-7.85 3.08c0 .35.04.7.12 1.04A12.94 12.94 0 013.15 3.55a4.49 4.49 0 001.4 6.03 4.39 4.39 0 01-2.04-.57v.06c0 2.18 1.55 4.03 3.67 4.45a4.52 4.52 0 01-2.03.08 4.52 4.52 0 004.22 3.15A9.05 9.05 0 010 19.54a12.77 12.77 0 006.92 2.03c8.3 0 12.84-6.86 12.84-12.81 0-.2 0-.39-.01-.58a9.25 9.25 0 002.28-2.35z"
  },
  {
    id: "mastodon",
    name: "Mastodon",
    icon: "M18.67 3.17a10.6 10.6 0 00-6.34-2.03 10.6 10.6 0 00-6.33 2.03A8.03 8.03 0 002 9.62v4.76a8.13 8.13 0 002.2 5.8 10.48 10.48 0 006.14 2.03c2.1 0 4.17-.6 6.14-2.03a8.3 8.3 0 002.2-5.8V9.62a8.03 8.03 0 00-2.01-6.45zM12 19.23c-2 0-3.7-.7-5-2.1a7 7 0 01-1.86-5V9.78c0-2.13.77-3.83 2.1-5a6.63 6.63 0 014.76-1.7c1.87 0 3.5.57 4.76 1.7 1.33 1.17 2.1 2.87 2.1 5v2.37a7 7 0 01-1.87 5c-1.3 1.4-3 2.1-5 2.1z"
  },
  {
    id: "bluesky",
    name: "Bluesky",
    icon: "M12 0c-2.6 3.5-4.1 5.2-7.2 6.9-1.7.9-3.3 1.6-3.3 3.4 0 1.6 1.2 2.9 2.7 2.9 1.4 0 2.6-1 4-2.2-1.2 3.5-3 7.4-3 9.9 0 2.5 2 3.1 3.7 1.5 1.6-1.6 2.9-4.4 3.2-5.1.3.7 1.6 3.5 3.3 5.1 1.6 1.6 3.6 1 3.6-1.5 0-2.5-1.8-6.4-3-9.9 1.4 1.2 2.6 2.2 4 2.2 1.6 0 2.7-1.3 2.7-2.9 0-1.8-1.5-2.5-3.2-3.4C16.1 5.2 14.6 3.5 12 0z"
  }
];


const Icon = ({ path, className = "w-5 h-5" }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d={path} />
  </svg>
);

export default function CreatePost() {
  const navigate = useNavigate();
  const user = getUserId();
  const linkedin = getLinkedInAuthData();

  const [caption, setCaption] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [postMode, setPostMode] = useState("publish");
  const [scheduledTime, setScheduledTime] = useState("");
  const [useAI, setUseAI] = useState("no");
  const [selectedPlatforms, setSelectedPlatforms] = useState(
    PLATFORM_STATUS.linkedin ? ["linkedin"] : []
  );

  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [userError, setUserError] = useState(null);

  useEffect(() => {
    if (user?.id) setUserError(null);
  }, [user]);

  const handleFileChange = (file) => {
    setImage(file);
    if (file) {
      if (preview) URL.revokeObjectURL(preview);
      setPreview(URL.createObjectURL(file));
    } else {
      if (preview) URL.revokeObjectURL(preview);
      setPreview(null);
    }
  };

  const handlePlatformToggle = (platformId) => {
    if (!PLATFORM_STATUS[platformId]) {
      setUserError(`Cannot select ${platformId}. Please connect your account first.`);
      return;
    }

    setSelectedPlatforms((prev) =>
      prev.includes(platformId)
        ? prev.filter((id) => id !== platformId)
        : [...prev, platformId]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUserError(null);
    setResponse(null);

    if (!user?.id) {
      setUserError("User ID missing. Cannot submit post.");
      return;
    }

    if (selectedPlatforms.length === 0) {
      setUserError("Select at least one connected platform.");
      return;
    }

    setLoading(true);

    const form = new FormData();
    form.append("user_id", user.id);
    form.append("caption", caption);
    selectedPlatforms.forEach((p) => form.append("platforms[]", p));
    form.append("post_mode", postMode);
    form.append("use_ai", useAI);

    if (postMode === "schedule") {
      form.append("scheduled_time", scheduledTime);
    }

    if (image) {
      form.append("image", image);
    }

    try {
      const res = await fetch(
        "https://scs-ltd.app.n8n.cloud/webhook/social-media",   
        {
          method: "POST",
          body: form,
        }
      );

      if (!res.ok) {
        const text = await res.text();
        throw new Error("Backend error: " + text);
      }

      const json = await res.json();
      setResponse(json);
    } catch (err) {
      console.error("POST ERROR:", err);
      setUserError(err.message || "Failed to send request to backend.");
    } finally {
      setLoading(false);
    }
  };

  if (!user?.id) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full p-8 bg-white shadow-xl rounded-2xl text-center border border-red-300">
          <h1 className="text-3xl font-bold text-red-600 mb-4">
            Access Denied: User Not Found
          </h1>
          <button
            onClick={() => navigate("/linkedin")}
            className="mt-6 w-full py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
          >
            Go to Connection Page
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 font-sans">
      <div className="max-w-3xl mx-auto bg-white shadow-2xl p-8 rounded-xl border border-gray-100">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-extrabold text-gray-800 mb-2">
            Create New Post
          </h1>
        </div>

        {userError && (
          <div className="p-4 mb-5 text-sm font-medium text-red-700 bg-red-100 rounded-lg border border-red-300">
            {userError}
          </div>
        )}

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="font-semibold text-sm text-gray-700 mb-2 block">
              Select Platforms
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {AVAILABLE_PLATFORMS.map((p) => {
                const isConnected = PLATFORM_STATUS[p.id];
                const selected = selectedPlatforms.includes(p.id);

                return (
                  <button
                    type="button"
                    key={p.id}
                    onClick={() => handlePlatformToggle(p.id)}
                    disabled={!isConnected}
                    className={`flex flex-col items-center justify-center p-3 rounded-xl border-2 transition ${
                      isConnected
                        ? selected
                          ? "border-blue-500 bg-blue-50 text-blue-700"
                          : "border-gray-300 bg-white text-gray-500"
                        : "border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed"
                    }`}
                  >
                    <Icon path={p.icon} />
                    <span className="text-xs mt-1">{p.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <textarea
            className="w-full p-4 border border-gray-300 rounded-lg"
            placeholder="Write your caption..."
            rows={5}
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            required
          />

          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleFileChange(e.target.files?.[0] || null)}
          />

          {preview && (
            <img
              src={preview}
              className="mt-4 rounded-lg shadow border max-h-72"
              alt="Preview"
            />
          )}

          <select
            value={postMode}
            onChange={(e) => setPostMode(e.target.value)}
            className="w-full border p-3 rounded-lg"
          >
            <option value="publish">Publish Now</option>
            <option value="schedule">Schedule</option>
          </select>

          {postMode === "schedule" && (
            <input
              type="datetime-local"
              className="w-full border p-3 rounded-lg"
              value={scheduledTime}
              onChange={(e) => setScheduledTime(e.target.value)}
            />
          )}

          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={useAI === "yes"}
              onChange={(e) => setUseAI(e.target.checked ? "yes" : "no")}
            />
            <span>Use AI to enhance caption</span>
          </label>

          <button
            disabled={loading}
            className="w-full py-3 text-white bg-blue-600 rounded-lg font-bold"
          >
            {loading ? "Posting..." : "Create Post"}
          </button>
        </form>

        {response && (
          <pre className="mt-6 bg-gray-100 p-4 rounded border overflow-auto">
            {JSON.stringify(response, null, 2)}
          </pre>
        )}
      </div>
    </div>
  );
}
