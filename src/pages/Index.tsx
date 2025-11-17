import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { LINKEDIN_AUTH_STORAGE_KEY, clearLinkedInAuthData } from "@/utils/linkedinOAuth";
import { LinkedInConnectButton } from "@/components/LinkedInConnectButton";

const Index = () => {
  const navigate = useNavigate();
  const [authData, setAuthData] = useState<any>(null);

  // Load LinkedIn auth data from localStorage
  useEffect(() => {
    const stored = localStorage.getItem(LINKEDIN_AUTH_STORAGE_KEY);
    if (stored) setAuthData(JSON.parse(stored));
  }, []);

  const handleDisconnect = () => {
    clearLinkedInAuthData();
    setAuthData(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            LinkedIn Integration
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Professional social media automation powered by secure OAuth 2.0
          </p>
        </div>

        {/* ============================================================
            CASE 1: USER NOT CONNECTED → Show the connect button
        ============================================================ */}
        {!authData && (
          <>
            <LinkedInConnectButton />

            <div className="mt-12 text-center text-sm text-muted-foreground">
              <p>🔒 Secure OAuth 2.0 authentication</p>
              <p className="mt-1">All tokens are encrypted and securely stored</p>
            </div>
          </>
        )}

        {/* ============================================================
            CASE 2: USER CONNECTED → Show profile + create post
        ============================================================ */}
        {authData && (
          <div className="bg-card shadow-xl rounded-xl p-8 border">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-bold flex items-center gap-2">
                <span className="text-green-500">●</span> LinkedIn Connected
              </h2>

              <button
                onClick={handleDisconnect}
                className="px-4 py-2 bg-destructive text-white rounded-md hover:bg-destructive/90 transition"
              >
                Disconnect
              </button>
            </div>

            {/* Profile */}
            <div className="flex items-center gap-5 mb-10">
              <img
                src={authData.profilePicture || "https://via.placeholder.com/80"}
                className="w-20 h-20 rounded-full object-cover border shadow"
                alt="Profile"
              />

              <div>
                <h3 className="text-2xl font-semibold">
                  {authData.firstName} {authData.lastName}
                </h3>
                <p className="text-muted-foreground text-sm">
                  LinkedIn ID: {authData.linkedin_user_id}
                </p>
              </div>
            </div>

            {/* Permissions */}
            <div className="mb-10">
              <h3 className="text-xl font-semibold mb-3">Permissions</h3>
              <ul className="text-muted-foreground space-y-1">
                <li>✓ Profile access</li>
                <li>✓ Email access</li>
                <li>✓ Posting permission</li>
                <li>✓ Synced with automation (n8n workflow)</li>
              </ul>
            </div>

            {/* Create Post Button */}
            <div className="text-center mt-8">
              <button
                onClick={() => navigate("/create-post")}
                className="px-6 py-3 bg-primary text-white rounded-lg text-lg shadow hover:bg-primary/90 transition"
              >
                ➕ Create New Post
              </button>
            </div>

            {/* Footer note */}
            <div className="mt-12 text-center text-sm text-muted-foreground">
              <p>🔒 Secure OAuth 2.0 authentication</p>
              <p className="mt-1">All tokens are encrypted and securely stored</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
