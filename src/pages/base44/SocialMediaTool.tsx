// src/pages/base44/SocialMediaTool.tsx
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { CheckCircle, Upload, Loader2, Facebook, Instagram, Twitter, Linkedin, Music, Pin, Youtube, MapPin, MessageCircle, FileText, AtSign, Cloud } from "lucide-react";
import LockedToolOverlay from "@/components/dashboard/LockedToolOverlay";

type Platform = {
  id: string;
  name: string;
  icon: any;
  connected: boolean;
  color?: string;
  bgColor?: string;
};

const ALL_PLATFORMS: Platform[] = [
  { id: "facebook", name: "Facebook", icon: Facebook, connected: false, color: "text-blue-600", bgColor: "bg-blue-50" },
  { id: "instagram", name: "Instagram", icon: Instagram, connected: false, color: "text-pink-600", bgColor: "bg-pink-50" },
  { id: "x", name: "X (Twitter)", icon: Twitter, connected: false, color: "text-gray-900", bgColor: "bg-gray-50" },
  { id: "linkedin", name: "LinkedIn", icon: Linkedin, connected: false, color: "text-blue-700", bgColor: "bg-blue-50" },
  { id: "tiktok", name: "TikTok", icon: Music, connected: false, color: "text-gray-900", bgColor: "bg-gray-50" },
  { id: "pinterest", name: "Pinterest", icon: Pin, connected: false, color: "text-red-600", bgColor: "bg-red-50" },
  { id: "youtube", name: "YouTube", icon: Youtube, connected: false, color: "text-red-600", bgColor: "bg-red-50" },
  { id: "google_business", name: "Google Business", icon: MapPin, connected: false, color: "text-blue-600", bgColor: "bg-blue-50" },
  { id: "reddit", name: "Reddit", icon: MessageCircle, connected: false, color: "text-orange-600", bgColor: "bg-orange-50" },
  { id: "medium", name: "Medium", icon: FileText, connected: false, color: "text-gray-900", bgColor: "bg-gray-50" },
  { id: "threads", name: "Threads", icon: AtSign, connected: false, color: "text-gray-900", bgColor: "bg-gray-50" },
  { id: "mastodon", name: "Mastodon", icon: Cloud, connected: false, color: "text-purple-600", bgColor: "bg-purple-50" },
];

export default function SocialMediaTool(): JSX.Element {
  const [user] = useState({ subscription_plan: "light", subscription_status: "active" }); // demo user
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [caption, setCaption] = useState("");
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [aiEnhance, setAiEnhance] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    // pretend user has one connected platform for demo
    // in real app, read from user object
  }, []);

  const connectedPlatforms = ALL_PLATFORMS.filter(p => p.connected);

  const togglePlatform = (id: string) => {
    setSelectedPlatforms(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) {
      setImageFile(f);
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(String(reader.result));
      reader.readAsDataURL(f);
    }
  };

  const handlePublish = () => {
    if (!caption.trim()) {
      alert("Caption is required");
      return;
    }
    if (selectedPlatforms.length === 0) {
      alert("Please select at least one platform");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setIsSuccess(true);
      setCaption("");
      setImageFile(null);
      setImagePreview(null);
      setSelectedPlatforms([]);
      setTimeout(() => setIsSuccess(false), 2500);
    }, 1200);
  };

  const hasAccess = user.subscription_plan && user.subscription_status === "active";

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-5xl mx-auto">
        <div className="relative">
          {!hasAccess && <LockedToolOverlay toolName="Social Media" requiredPlan="light" />}

          <div className={!hasAccess ? "filter blur-sm pointer-events-none" : ""}>
            <h1 className="text-3xl font-bold mb-2">Social Media Manager</h1>
            <p className="text-gray-600 mb-6">Create and simulate posts for connected platforms</p>

            {isSuccess && (
              <Card className="mb-6">
                <CardContent className="p-4 flex items-center gap-4">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                  <div>
                    <div className="font-semibold">Post Published (simulated)</div>
                    <div className="text-sm text-gray-600">Your post was scheduled to the selected platforms (demo)</div>
                  </div>
                </CardContent>
              </Card>
            )}

            <Card className="mb-6">
              <CardHeader className="border-b p-4">
                <h2 className="text-lg font-bold">Choose Platforms</h2>
              </CardHeader>
              <CardContent className="p-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {ALL_PLATFORMS.map(p => {
                  const isSelected = selectedPlatforms.includes(p.id);
                  return (
                    <button key={p.id} onClick={() => togglePlatform(p.id)} className={`p-3 rounded-xl border ${isSelected ? "scale-105 bg-white shadow-lg border-gray-200" : "bg-white/90 hover:shadow-sm"}`}>
                      <div className="flex items-center gap-3">
                        <div className={`${p.bgColor} w-10 h-10 rounded-lg flex items-center justify-center`}>
                          <p.icon className={`w-5 h-5 ${p.color}`} />
                        </div>
                        <div className="text-left flex-1">
                          <div className="font-semibold text-sm">{p.name}</div>
                        </div>
                        {isSelected && <CheckCircle className="w-4 h-4 text-green-600" />}
                      </div>
                    </button>
                  );
                })}
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="border-b p-4">
                <h2 className="text-lg font-bold">Create your post</h2>
              </CardHeader>

              <CardContent className="p-6 space-y-4">
                <div>
                  <Label htmlFor="caption">Caption *</Label>
                  <Textarea id="caption" value={caption} onChange={(e) => setCaption(e.target.value)} placeholder="Write your caption..." rows={6} />
                  <div className="text-sm text-gray-500 mt-1">{caption.length} characters</div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <div className="text-sm text-gray-600">AI enhancement (simulated)</div>
                  </div>
                  <Switch checked={aiEnhance} onCheckedChange={setAiEnhance} />
                </div>

                <div>
                  <Label>Optional image</Label>
                  <div className="border-2 border-dashed p-4 rounded">
                    {imagePreview ? (
                      <div className="relative inline-block">
                        <img src={imagePreview} alt="preview" className="max-h-48 rounded" />
                        <button onClick={() => { setImageFile(null); setImagePreview(null); }} className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-red-500 text-white">x</button>
                      </div>
                    ) : (
                      <label className="cursor-pointer block text-center">
                        <input type="file" accept="image/*,video/*" onChange={handleImageUpload} className="hidden" />
                        <Upload className="w-8 h-8 mx-auto text-gray-400" />
                        <div className="text-gray-700">Click to upload or drag and drop</div>
                      </label>
                    )}
                  </div>
                </div>

                <div className="flex justify-end gap-4 pt-4 border-t">
                  <Button variant="outline" onClick={() => { setCaption(""); setImageFile(null); setImagePreview(null); setSelectedPlatforms([]); }}>
                    Clear
                  </Button>
                  <Button onClick={handlePublish} className="bg-gradient-to-r from-blue-500 to-green-500 text-white" disabled={loading}>
                    {loading ? (<><Loader2 className="w-4 h-4 animate-spin mr-2" />Publishing...</>) : "Post to selected platforms"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
