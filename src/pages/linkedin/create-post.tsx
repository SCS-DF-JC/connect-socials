import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// =================================================================
// 🚨 MOCK UTILITY FUNCTIONS (For standalone execution)
// These are simple functions to simulate your actual utility files.
// They use LocalStorage structure based on your provided snippets.
// =================================================================

// Simulate getting the SaaS user's ID from LocalStorage
const getUserId = () => {
  const id = localStorage.getItem("saas_user_id") || "user_460024f6-df22-43db-ab19-5f5f5c52641e"; 
  return { id }; 
};

// Simulate getting LinkedIn connection data from LocalStorage
const getLinkedInAuthData = () => {
  const stored = localStorage.getItem("linkedin_auth_data");
  // Assuming LinkedIn is connected and returns user profile data
  return stored ? JSON.parse(stored) : { 
    firstName: "Jane", 
    lastName: "Doe", 
    profileId: "linked-jane-123" 
  };
};

// Mocks the function to send the post data to the n8n webhook
const postWebhook = async (formData) => {
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  const data = {};
  for (let [key, value] of formData.entries()) {
    if (key === 'image' && value instanceof File) {
      data[key] = `[File: ${value.name}, Type: ${value.type}]`;
    } else {
      data[key] = value;
    }
  }

  const MOCK_WEBHOOK_ENDPOINT = "https://scs-ltd.app.n8n.cloud/webhook/post"; 
  return {
    success: true,
    message: "Post submission received by n8n backend.",
    endpoint: MOCK_WEBHOOK_ENDPOINT,
    data_sent: data,
    platforms_scheduled: data.platforms.split(',')
  };
};

// =================================================================
// PLATFORM CONFIGURATION & ICON COMPONENT
// =================================================================

// Note: You would typically get connection status from a global state/API.
// For this mock, only LinkedIn is marked as "connected".
const PLATFORM_STATUS = {
    linkedin: true, // Connected
    twitter: false,  // Not Connected
    mastodon: false, // Not Connected
    bluesky: false,  // Not Connected
};

const AVAILABLE_PLATFORMS = [
  { id: 'linkedin', name: 'LinkedIn', icon: 'M16 0H4C1.79 0 0 1.79 0 4v12c0 2.21 1.79 4 4 4h12c2.21 0 4-1.79 4-4V4c0-2.21-1.79-4-4-4zM5.925 15.65h-2.5v-7.9h2.5v7.9zM4.675 7.15c-.83 0-1.35-.58-1.35-1.3 0-.74.52-1.3 1.35-1.3.84 0 1.36.56 1.36 1.3 0 .72-.52 1.3-1.36 1.3zM16.925 15.65h-2.3v-3.9c0-.93-.41-1.48-1.07-1.48-.58 0-1.06.39-1.22.77-.04.1-.04.85-.04 1.22v3.39h-2.3v-7.9h2.3v1.1c.36-.6 1.15-1.3 2.5-1.3 1.8 0 3.16 1.15 3.16 3.65v4.45z' },
  { id: 'twitter', name: 'Twitter (X)', icon: 'M18.9 5.09a7.6 7.6 0 01-2.2.6c.86-.5 1.5-1.3 1.8-2.3a.2.2 0 00-.07-.27c-.8.47-1.68.8-2.6.98a4 4 0 00-3.1-.38 4.2 4.2 0 00-2.8 3.8c0 .28 0 .56.08.84A10 10 0 012.3 4.3a.2.2 0 00-.3 0c-.57.87-.87 1.9-.87 3a4.2 4.2 0 001.3 3.1 4 4 0 01-1.8-.5.2.2 0 00-.2 0v.05c0 1.5.85 2.8 2.1 3.4a.2.2 0 00.1 0 4 4 0 01-1.9.07.2.2 0 00-.17.27c.4 1.2 1.5 2.2 2.9 2.5a8.4 8.4 0 01-5.1 1.7c-.3 0-.6 0-.9-.05a.2.2 0 00-.23.16c.07.27.4.5.7.67A11.7 11.7 0 0011 20c6.6 0 10.2-5.5 10.2-10.2v-.5c.7-.5 1.3-1.2 1.8-2a.2.2 0 00-.1-.21z' },
  { id: 'mastodon', name: 'Mastodon', icon: 'M20.2 6.7c-.5-1.3-1.3-2.5-2.5-3.5-.8-.6-1.7-1.1-2.8-1.5a10 10 0 00-9.8 0C3.9 1.9 3 2.5 2.2 3.5 1 4.5.2 5.7-.3 7c-.5 1.3-.8 2.7-.8 4.1v5.1c0 1.4.3 2.8.8 4.1.5 1.3 1.3 2.5 2.5 3.5.8.6 1.7 1.1 2.8 1.5a10 10 0 009.8 0c1.1-.4 2-1 2.8-1.5 1.2-1 2-2.2 2.5-3.5.5-1.3.8-2.7.8-4.1v-5.1c0-1.4-.3-2.8-.8-4.1zm-7.2 1.4c1.1 0 2 .9 2 2v2.7c0 1.1-.9 2-2 2h-1.5v3.5c0 .3-.1.5-.4.5s-.4-.2-.4-.5v-3.5h-1.5c-1.1 0-2-.9-2-2v-2.7c0-1.1.9-2 2-2h3.8z' },
  { id: 'bluesky', name: 'Bluesky', icon: 'M16.925 5.5c-2.8 0-5.1 2.3-5.1 5.1s2.3 5.1 5.1 5.1 5.1-2.3 5.1-5.1-2.3-5.1-5.1-5.1zm0 8.8c-2.1 0-3.7-1.7-3.7-3.7s1.6-3.7 3.7-3.7 3.7 1.7 3.7 3.7-1.6 3.7-3.7 3.7zM7 16.925c-2.8 0-5.1-2.3-5.1-5.1s2.3-5.1 5.1-5.1c.4 0 .7 0 1.1.1 1.7-.8 2.9-2.5 2.9-4.5 0-2.8-2.3-5.1-5.1-5.1S.8 2.3.8 5.1s2.3 5.1 5.1 5.1c.4 0 .7 0 1.1-.1v6.8c0 .2-.1.4-.3.4h-2.3c-.2 0-.3-.2-.3-.4v-2c0-.3-.2-.5-.5-.5s-.5.2-.5.5v2c0 1.1.9 2 2 2h2.3c1.1 0 2-.9 2-2v-6.8c0-.4.3-.8.8-.8s.8.3.8.8v6.8c0 2.8-2.3 5.1-5.1 5.1z' }
];

const Icon = ({ path, className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d={path} />
  </svg>
);

// =================================================================
// MAIN COMPONENT
// =================================================================

export default function CreatePost() {
  const navigate = useNavigate();
  const user = getUserId(); 
  const linkedin = getLinkedInAuthData(); // This is connected

  // State for form inputs
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState(null); 
  const [preview, setPreview] = useState(null); 

  // State for posting options
  const [postMode, setPostMode] = useState("publish");
  const [scheduledTime, setScheduledTime] = useState("");
  const [useAI, setUseAI] = useState("no");
  
  // Initialize platforms: only select LinkedIn by default since it's the only connected one
  const [selectedPlatforms, setSelectedPlatforms] = useState(PLATFORM_STATUS.linkedin ? ['linkedin'] : []); 

  // State for operation feedback
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [userError, setUserError] = useState(null);

  useEffect(() => {
    if (user?.id) {
      setUserError(null);
    }
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
    // Check if the platform is connected before allowing selection
    if (!PLATFORM_STATUS[platformId]) {
        // Optional: Show a toast notification here if using a library like sonner
        setUserError(`Cannot select ${platformId}. Please connect your account first.`);
        return;
    }

    setSelectedPlatforms(prev => 
      prev.includes(platformId)
        ? prev.filter(id => id !== platformId)
        : [...prev, platformId]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUserError(null);
    setResponse(null);

    if (!user?.id) {
      setUserError("Authentication Error: User ID is missing. Cannot submit post.");
      return;
    }
    
    if (selectedPlatforms.length === 0) {
      setUserError("Please select at least one connected platform to post to (e.g., LinkedIn).");
      return;
    }

    setLoading(true);
    const form = new FormData();

    form.append("user_id", user.id); 
    form.append("caption", caption);
    form.append("platforms", selectedPlatforms.join(',')); 

    form.append("post_mode", postMode);
    form.append("use_ai", useAI);
    
    if (postMode === "schedule" && scheduledTime) {
      form.append("scheduled_time", scheduledTime);
    }
    if (image) {
      form.append("image", image);
    }

    try {
      const res = await postWebhook(form);
      setResponse(res);
      // Optional: Clear form on successful submission
      // setCaption(""); 
      // handleFileChange(null);
    } catch (error) {
      console.error("Webhook submission failed:", error);
      setUserError("Post failed to submit to the backend. Check console for details.");
    } finally {
      setLoading(false);
    }
  };

  // Conditional render for the main content (If user ID is MISSING)
  if (!user?.id) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full p-8 bg-white shadow-xl rounded-2xl text-center border border-red-300">
          <h1 className="text-3xl font-bold text-red-600 mb-4">Access Denied: User Not Found</h1>
          <p className="text-gray-700">
            This error means **`getUserId()`** did not return a valid ID. Please log in or connect your account again.
          </p>
          <div className="mt-4 p-3 bg-red-50 rounded-lg text-sm text-red-700">
            <strong>Action Required:</strong> Verify your authentication process saves the user ID to persistent storage (like LocalStorage).
          </div>
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
  
  // RENDER THE POST FORM
  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 font-sans">
      <div className="max-w-3xl mx-auto bg-white shadow-2xl p-8 rounded-xl border border-gray-100">
        
        {/* HEADER */}
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-extrabold text-gray-800 mb-2">Create New Post</h1>
          <p className="text-sm text-gray-500">
            Posting as <span className="font-bold text-blue-600">{linkedin?.firstName || 'User'} {linkedin?.lastName || ''}</span>
            <span className="text-xs text-gray-400 block mt-1">
              User ID: <code className="bg-gray-100 p-1 rounded text-xs text-gray-600">{user.id}</code> (Passed to n8n)
            </span>
          </p>
        </div>

        {/* ERROR MESSAGE DISPLAY */}
        {userError && (
          <div className="p-4 mb-5 text-sm font-medium text-red-700 bg-red-100 rounded-lg border border-red-300" role="alert">
            <p className="font-bold">Error:</p> {userError}
          </div>
        )}

        {/* FORM */}
        <form className="space-y-6" onSubmit={handleSubmit}>

          {/* PLATFORM SELECTION */}
          <div>
            <label className="font-semibold text-sm text-gray-700 mb-2 block">Select Platforms</label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {AVAILABLE_PLATFORMS.map(platform => {
                const isConnected = PLATFORM_STATUS[platform.id];
                const isSelected = selectedPlatforms.includes(platform.id);
                
                return (
                  <button
                    type="button"
                    key={platform.id}
                    onClick={() => handlePlatformToggle(platform.id)}
                    disabled={!isConnected} // Disable if not connected
                    className={`flex flex-col items-center justify-center p-3 rounded-xl border-2 transition duration-200 relative ${
                      isConnected
                        ? isSelected
                          ? 'border-blue-500 bg-blue-50 text-blue-700 shadow-md'
                          : 'border-gray-300 bg-white text-gray-500 hover:border-blue-400'
                        : 'border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed opacity-60' // Disabled styles
                    }`}
                  >
                    <Icon path={platform.icon} className="w-6 h-6 mb-1" />
                    <span className="text-xs font-medium">{platform.name}</span>
                    {!isConnected && (
                        <span className="absolute top-0 right-0 mt-1 mr-1 px-1.5 py-0.5 text-xs font-bold text-red-700 bg-red-100 rounded-full">
                            Connect
                        </span>
                    )}
                  </button>
                );
              })}
            </div>
            {!PLATFORM_STATUS.linkedin && (
                <p className="mt-3 text-sm text-red-600">
                    Warning: LinkedIn is not connected. You must connect at least one platform to post.
                </p>
            )}
            {PLATFORM_STATUS.linkedin && (
                <p className="mt-3 text-sm text-gray-500">
                    **LinkedIn is connected.** Other platforms show "Connect" as they are not authorized.
                </p>
            )}
          </div>

          {/* CAPTION */}
          <div>
            <label className="font-semibold text-sm text-gray-700 mb-2 block">Caption</label>
            <textarea
              className="w-full p-4 border border-gray-300 rounded-lg resize-y focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              placeholder="Write something inspirational, professional, or thought-provoking..."
              rows={6}
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              required
            ></textarea>
          </div>

          {/* IMAGE UPLOAD */}
          <div>
            <label className="font-semibold text-sm text-gray-700 mb-2 block">Image (optional)</label>
            <input
              type="file"
              accept="image/*"
              className="block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-full file:border-0
                file:text-sm file:font-semibold
                file:bg-blue-50 file:text-blue-700
                hover:file:bg-blue-100 transition duration-150"
              onChange={(e) => handleFileChange(e.target.files?.[0] || null)}
            />
            {preview && (
              <div className="mt-4 relative">
                <img
                  src={preview}
                  alt="Preview"
                  className="w-full h-auto max-h-80 object-cover rounded-lg shadow-lg border border-gray-200"
                />
                <button
                  type="button"
                  onClick={() => handleFileChange(null)}
                  className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition"
                  aria-label="Remove image"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* MODE */}
            <div>
              <label className="font-semibold text-sm text-gray-700 mb-2 block">Post Mode</label>
              <select
                value={postMode}
                onChange={(e) => {
                  setPostMode(e.target.value);
                  if (e.target.value === 'publish') setScheduledTime(''); 
                }}
                className="w-full border border-gray-300 p-3 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              >
                <option value="publish">Publish Now</option>
                <option value="schedule">Schedule</option>
              </select>
            </div>

            {/* AI CAPTION CHECKBOX */}
            <div className="flex items-end pb-1">
              <div className="flex items-center space-x-2 p-3 border border-gray-300 rounded-lg w-full h-full bg-gray-50">
                <input
                  id="use-ai-check"
                  type="checkbox"
                  checked={useAI === "yes"}
                  onChange={(e) => setUseAI(e.target.checked ? "yes" : "no")}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label htmlFor="use-ai-check" className="text-sm font-medium text-gray-700 cursor-pointer">
                  Use AI to enhance caption
                </label>
              </div>
            </div>
          </div>

          {/* SCHEDULE TIME */}
          {postMode === "schedule" && (
            <div>
              <label className="font-semibold text-sm text-gray-700 mb-2 block">Pick schedule date & time</label>
              <input
                type="datetime-local"
                className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                value={scheduledTime}
                onChange={(e) => setScheduledTime(e.target.value)}
                required
              />
            </div>
          )}

          {/* SUBMIT BUTTON */}
          <button
            disabled={loading || selectedPlatforms.length === 0}
            className={`w-full py-3 text-white rounded-lg text-lg font-bold transition duration-300 shadow-lg ${
              loading || selectedPlatforms.length === 0
                ? 'bg-blue-300 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700 active:bg-blue-800'
            }`}
          >
            {loading ? "Posting..." : "Create Post"}
          </button>

          {/* BACK BUTTON */}
          <button
            type="button"
            onClick={() => navigate("/linkedin")}
            className="w-full py-2 text-sm text-gray-500 hover:text-blue-600 hover:underline transition mt-2"
          >
            ← Back to Dashboard
          </button>
        </form>

        {/* RESPONSE */}
        {response && (
          <div className="mt-8">
            <h2 className="text-lg font-semibold mb-2 text-gray-700">Backend Response (n8n Webhook Data)</h2>
            <pre className="text-sm p-4 bg-gray-100 rounded-lg border border-gray-200 overflow-auto max-h-64">
              {JSON.stringify(response, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}