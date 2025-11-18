import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
// import { base44 } from "@/api/base44Client";
import { Facebook, Instagram, Twitter, Linkedin, Music, Pin, Youtube, MapPin, MessageCircle, FileText, AtSign, Cloud, Loader2 } from "lucide-react";

export default function ConnectedAccounts({ user }) {
  const [loadingPlatform, setLoadingPlatform] = useState(null);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('linkedin_connected') === 'true') {
      setTimeout(() => {
        window.history.replaceState({}, '', window.location.pathname);
      }, 100);
    }
  }, []);

  const accounts = [
    {
      id: "facebook",
      name: "Facebook",
      icon: Facebook,
      connected: user?.facebook_connected || false,
      displayName: user?.facebook_display_name || null,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      id: "instagram",
      name: "Instagram",
      icon: Instagram,
      connected: user?.instagram_connected || false,
      displayName: user?.instagram_display_name || null,
      color: "text-pink-600",
      bgColor: "bg-pink-50",
    },
    {
      id: "x",
      name: "X (Twitter)",
      icon: Twitter,
      connected: user?.x_connected || false,
      displayName: user?.x_display_name || null,
      color: "text-gray-900",
      bgColor: "bg-gray-50",
    },
    {
      id: "linkedin",
      name: "LinkedIn",
      icon: Linkedin,
      connected: user?.linkedin_connected || false,
      displayName: user?.linkedin_display_name || null,
      color: "text-blue-700",
      bgColor: "bg-blue-50",
    },
    {
      id: "tiktok",
      name: "TikTok",
      icon: Music,
      connected: user?.tiktok_connected || false,
      displayName: user?.tiktok_display_name || null,
      color: "text-gray-900",
      bgColor: "bg-gray-50",
    },
    {
      id: "pinterest",
      name: "Pinterest",
      icon: Pin,
      connected: user?.pinterest_connected || false,
      displayName: user?.pinterest_display_name || null,
      color: "text-red-600",
      bgColor: "bg-red-50",
    },
    {
      id: "youtube",
      name: "YouTube",
      icon: Youtube,
      connected: user?.youtube_connected || false,
      displayName: user?.youtube_display_name || null,
      color: "text-red-600",
      bgColor: "bg-red-50",
    },
    {
      id: "google_business",
      name: "Google Business Profile",
      icon: MapPin,
      connected: user?.google_business_connected || false,
      displayName: user?.google_business_display_name || null,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      id: "reddit",
      name: "Reddit",
      icon: MessageCircle,
      connected: user?.reddit_connected || false,
      displayName: user?.reddit_display_name || null,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
    {
      id: "medium",
      name: "Medium",
      icon: FileText,
      connected: user?.medium_connected || false,
      displayName: user?.medium_display_name || null,
      color: "text-gray-900",
      bgColor: "bg-gray-50",
    },
    {
      id: "threads",
      name: "Threads",
      icon: AtSign,
      connected: user?.threads_connected || false,
      displayName: user?.threads_display_name || null,
      color: "text-gray-900",
      bgColor: "bg-gray-50",
    },
    {
      id: "mastodon",
      name: "Mastodon",
      icon: Cloud,
      connected: user?.mastodon_connected || false,
      displayName: user?.mastodon_display_name || null,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      id: "bluesky",
      name: "Bluesky",
      icon: Cloud,
      connected: user?.bluesky_connected || false,
      displayName: user?.bluesky_display_name || null,
      color: "text-blue-500",
      bgColor: "bg-blue-50",
    },
  ];

  const handleConnect = async (accountId) => {
    if (accountId === 'linkedin') {
      setLoadingPlatform('linkedin');
      try {
        const APP_ID = '690d06246803ae1a296b3b9e';
        window.location.href = `https://app.base44.com/api/functions/${APP_ID}/linkedinAuthStart`;
      } catch (error) {
        console.error('LinkedIn auth error:', error);
        alert('Failed to start LinkedIn authentication. Please try again.');
        setLoadingPlatform(null);
      }
    } else {
      alert(`OAuth flow for ${accountId} will be implemented similarly. Backend integration required.`);
    }
  };

  const handleDisconnect = async (accountId) => {
    if (accountId === 'linkedin') {
      if (!confirm('Are you sure you want to disconnect your LinkedIn account?')) {
        return;
      }
      
      setLoadingPlatform('linkedin');
      try {
        await base44.functions.invoke('linkedinDisconnect', {});
        window.location.reload();
      } catch (error) {
        console.error('LinkedIn disconnect error:', error);
        alert('Failed to disconnect LinkedIn. Please try again.');
        setLoadingPlatform(null);
      }
    } else {
      alert(`Disconnect for ${accountId} will be implemented similarly.`);
    }
  };

  return (
    <Card className="shadow-lg">
      <CardHeader className="border-b pb-4">
        <h3 className="text-xl font-bold text-gray-900">Connected Accounts</h3>
        <p className="text-sm text-gray-600 mt-1">
          Securely connect your social and content accounts. Tokens are stored server-side only.
        </p>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {accounts.map((account) => (
            <Card
              key={account.id}
              className="hover:shadow-md transition-all duration-200 border"
            >
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className={`w-10 h-10 rounded-lg ${account.bgColor} flex items-center justify-center flex-shrink-0`}>
                    <account.icon className={`w-5 h-5 ${account.color}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-gray-900 text-sm truncate">
                        {account.name}
                      </h4>
                      <Badge
                        variant={account.connected ? "default" : "secondary"}
                        className={`text-xs ${
                          account.connected
                            ? "bg-green-100 text-green-800 hover:bg-green-100"
                            : "bg-gray-100 text-gray-600 hover:bg-gray-100"
                        }`}
                      >
                        {account.connected ? "Connected" : "Not connected"}
                      </Badge>
                    </div>
                    {account.connected && account.displayName && (
                      <p className="text-xs text-gray-500 mb-3 truncate">
                        {account.displayName}
                      </p>
                    )}
                    <Button
                      size="sm"
                      variant={account.connected ? "outline" : "default"}
                      className={`w-full text-xs ${
                        !account.connected &&
                        "bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white"
                      }`}
                      onClick={() => account.connected ? handleDisconnect(account.id) : handleConnect(account.id)}
                      disabled={loadingPlatform === account.id}
                    >
                      {loadingPlatform === account.id ? (
                        <>
                          <Loader2 className="w-3 h-3 mr-1 animate-spin" />
                          {account.connected ? "Disconnecting..." : "Connecting..."}
                        </>
                      ) : (
                        account.connected ? "Disconnect" : "Connect"
                      )}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}