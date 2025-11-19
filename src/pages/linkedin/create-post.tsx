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

  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [userError, setUserError] = useState(null);

  // LinkedIn required
  useEffect(() => {
    if (!linkedin) {
      setUserError("You must connect LinkedIn first.");
    }
  }, [linkedin]);

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    setUserError(null);
    setResponse(null);

    if (!user?.id) {
      setUserError("Missing user ID. Cannot post.");
      return;
    }

    if (!linkedin) {
      setUserError("LinkedIn account not connected.");
      return;
    }

    setLoading(true);

    const form = new FormData();
    form.append("user_id", user.id);

    form.append("caption", caption);
    form.append("platforms[]", "linkedin"); // ONLY LINKEDIN
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
      setUserError(err.message);
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
            onClick={() => navigate("/dashboard")}
            className="mt-6 w-full py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    );
  }

  if (!linkedin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="max-w-md w-full bg-white border shadow p-8 rounded-xl text-center">
          <h2 className="text-xl font-semibold mb-4 text-red-600">
            LinkedIn Not Connected
          </h2>
          <p className="text-gray-600 mb-4">
            You must connect your LinkedIn account before creating posts.
          </p>
          <button
            onClick={() => navigate("/dashboard")}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 font-sans">
      <div className="max-w-3xl mx-auto bg-white shadow-2xl p-8 rounded-xl border border-gray-100">

        <h1 className="text-3xl font-extrabold text-gray-800 text-center mb-6">
          Create LinkedIn Post
        </h1>

        <div className="flex items-center gap-3 mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <svg
            className="w-10 h-10 text-blue-700"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M4.98 3.5C4.98 4.88 3.86 6 2.48 6S0 4.88 0 3.5 1.11 1 2.48 1 4.98 2.11 4.98 3.5zM.2 8.5h4.5V21H.2V8.5zM7.98 8.5h4.31v1.71h.06c.6-1.14 2.07-2.34 4.26-2.34 4.55 0 5.39 2.99 5.39 6.88V21h-4.5v-5.97c0-1.42-.02-3.26-1.99-3.26-1.99 0-2.3 1.55-2.3 3.16V21h-4.5V8.5z" />
          </svg>

          <div>
            <p className="font-semibold text-gray-800 text-sm">
              Connected as:
            </p>
            <p className="text-gray-600 text-sm">
              {linkedin.firstName} {linkedin.lastName}
            </p>
          </div>
        </div>

        {userError && (
          <div className="p-4 mb-4 text-sm font-medium text-red-700 bg-red-100 rounded-lg border border-red-300">
            {userError}
          </div>
        )}

        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Caption */}
          <textarea
            className="w-full p-4 border border-gray-300 rounded-lg"
            placeholder="Write your post..."
            rows={5}
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            required
          />

          {/* Image Upload */}
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

          {/* Post Mode */}
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

          {/* AI Toggle */}
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={useAI === "yes"}
              onChange={(e) => setUseAI(e.target.checked ? "yes" : "no")}
            />
            <span>Use AI to enhance caption</span>
          </label>

          {/* Submit */}
          <button
            disabled={loading}
            className="w-full py-3 text-white bg-blue-600 rounded-lg font-bold hover:bg-blue-700 transition"
          >
            {loading ? "Posting..." : "Create LinkedIn Post"}
          </button>
        </form>
      </div>
    </div>
  );
}
