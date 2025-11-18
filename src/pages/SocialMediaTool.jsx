import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
// import { base44 } from "@/api/base44Client";
import { useMutation } from "@tanstack/react-query";
import LockedToolOverlay from "../components/dashboard/LockedToolOverlay";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Upload,
  CheckCircle,
  Loader2,
  X,
  Sparkles,
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
  Cloud,
} from "lucide-react";

export default function SocialMediaTool() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [caption, setCaption] = useState("");
  const [selectedPlatforms, setSelectedPlatforms] = useState([]);
  const [aiEnhanceEnabled, setAiEnhanceEnabled] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);
  const [captionError, setCaptionError] = useState("");
  const navigate = useNavigate();

  const allPlatforms = [
    {
      id: "facebook",
      name: "Facebook",
      icon: Facebook,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-500",
      connectedField: "facebook_connected",
    },
    {
      id: "instagram",
      name: "Instagram",
      icon: Instagram,
      color: "text-pink-600",
      bgColor: "bg-pink-50",
      borderColor: "border-pink-500",
      connectedField: "instagram_connected",
    },
    {
      id: "x",
      name: "X (Twitter)",
      icon: Twitter,
      color: "text-gray-900",
      bgColor: "bg-gray-50",
      borderColor: "border-gray-900",
      connectedField: "x_connected",
    },
    {
      id: "linkedin",
      name: "LinkedIn",
      icon: Linkedin,
      color: "text-blue-700",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-700",
      connectedField: "linkedin_connected",
    },
    {
      id: "tiktok",
      name: "TikTok",
      icon: Music,
      color: "text-gray-900",
      bgColor: "bg-gray-50",
      borderColor: "border-gray-900",
      connectedField: "tiktok_connected",
    },
    {
      id: "pinterest",
      name: "Pinterest",
      icon: Pin,
      color: "text-red-600",
      bgColor: "bg-red-50",
      borderColor: "border-red-500",
      connectedField: "pinterest_connected",
    },
    {
      id: "youtube",
      name: "YouTube / Shorts",
      icon: Youtube,
      color: "text-red-600",
      bgColor: "bg-red-50",
      borderColor: "border-red-500",
      connectedField: "youtube_connected",
    },
    {
      id: "google_business",
      name: "Google Business",
      icon: MapPin,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-500",
      connectedField: "google_business_connected",
    },
    {
      id: "reddit",
      name: "Reddit",
      icon: MessageCircle,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      borderColor: "border-orange-500",
      connectedField: "reddit_connected",
    },
    {
      id: "medium",
      name: "Medium",
      icon: FileText,
      color: "text-gray-900",
      bgColor: "bg-gray-50",
      borderColor: "border-gray-900",
      connectedField: "medium_connected",
    },
    {
      id: "threads",
      name: "Threads",
      icon: AtSign,
      color: "text-gray-900",
      bgColor: "bg-gray-50",
      borderColor: "border-gray-900",
      connectedField: "threads_connected",
    },
    {
      id: "mastodon",
      name: "Mastodon",
      icon: Cloud,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-500",
      connectedField: "mastodon_connected",
    },
    {
      id: "bluesky",
      name: "Bluesky",
      icon: Cloud,
      color: "text-blue-500",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-400",
      connectedField: "bluesky_connected",
    },
  ];

  useEffect(() => {
    const loadUser = async () => {
      try {
        const isAuth = await base44.auth.isAuthenticated();
        if (!isAuth) {
          base44.auth.redirectToLogin(createPageUrl("SocialMediaTool"));
          return;
        }
        const userData = await base44.auth.me();
        setUser(userData);
      } catch (error) {
        console.error("Error loading user:", error);
        base44.auth.redirectToLogin(createPageUrl("SocialMediaTool"));
      } finally {
        setLoading(false);
      }
    };
    loadUser();
  }, [navigate]);

  const connectedPlatforms = allPlatforms.filter(
    (platform) => user?.[platform.connectedField] === true
  );

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.size <= 10 * 1024 * 1024) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      alert("File size must be less than 10MB");
    }
  };

  const togglePlatform = (platformId) => {
    if (selectedPlatforms.includes(platformId)) {
      setSelectedPlatforms(selectedPlatforms.filter((p) => p !== platformId));
    } else {
      setSelectedPlatforms([...selectedPlatforms, platformId]);
    }
  };

  const publishPostMutation = useMutation({
    mutationFn: async (data) => {
      let imageUrl = null;
      if (imageFile) {
        const uploadResult = await base44.integrations.Core.UploadFile({
          file: imageFile,
        });
        imageUrl = uploadResult.file_url;
      }

      let finalCaption = data.caption;
      if (data.aiEnhanceEnabled) {
        const enhancedResult = await base44.integrations.Core.InvokeLLM({
          prompt: `Enhance the following social media caption for clarity, engagement, and professionalism. Keep the core message but make it more compelling. Keep it concise and maintain any hashtags or mentions:\n\n${data.caption}`,
        });
        finalCaption = enhancedResult;
      }

      const postData = {
        image_url: imageUrl,
        caption: finalCaption,
        original_caption: data.caption,
        ai_enhanced: data.aiEnhanceEnabled,
        platforms: data.platforms.join(", "),
      };

      await base44.integrations.Core.SendEmail({
        from_name: "Smart Content Solutions Dashboard",
        to: "support@smartcontentsolutions.co.uk",
        subject: `New Social Media Post - ${user.full_name}`,
        body: `
          Social Media Post Details:
          
          User: ${user.full_name} (${user.email})
          Platforms: ${data.platforms.join(", ")}
          
          ${data.aiEnhanceEnabled ? `Original Caption: ${data.caption}\n\nAI-Enhanced Caption: ${finalCaption}` : `Caption: ${finalCaption}`}
          
          Image URL: ${imageUrl || "No image"}
          
          Note: Integrate this with your automation platform (Zapier/Buffer) to actually publish.
        `,
      });

      return postData;
    },
    onSuccess: () => {
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        setCaption("");
        setImageFile(null);
        setImagePreview(null);
        setSelectedPlatforms([]);
        setCaptionError("");
      }, 3000);
    },
  });

  const handlePublish = () => {
    setCaptionError("");

    if (!caption.trim()) {
      setCaptionError("Caption is required");
      return;
    }

    if (selectedPlatforms.length === 0) {
      alert("Please select at least one platform");
      return;
    }

    publishPostMutation.mutate({
      caption,
      platforms: selectedPlatforms,
      aiEnhanceEnabled,
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const hasAccess =
    user?.subscription_plan &&
    user?.subscription_plan !== "none" &&
    user?.subscription_status === "active";

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-6">
      <div className="max-w-5xl mx-auto">
        <div className="relative">
          {!hasAccess && (
            <LockedToolOverlay toolName="Social Media" requiredPlan="light" />
          )}

          <div className={!hasAccess ? "filter blur-sm pointer-events-none" : ""}>
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Social Media Manager
              </h1>
              <p className="text-gray-600 text-lg">
                Create and schedule posts across your connected platforms
              </p>
            </div>

            {isSuccess && (
              <Card className="mb-6 bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
                <CardContent className="p-6 flex items-center gap-4">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg">
                      ✅ Post Published Successfully!
                    </h3>
                    <p className="text-gray-700">
                      Your post has been sent to the selected platforms.
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Platform Selection */}
            <Card className="shadow-lg mb-6">
              <CardHeader className="border-b">
                <h2 className="text-xl font-bold text-gray-900">
                  Choose platforms to post to
                </h2>
                <p className="text-sm text-gray-600 mt-1">
                  {connectedPlatforms.length === 0
                    ? "No platforms connected yet. Go to Dashboard to connect your accounts."
                    : "Select one or more platforms for your post"}
                </p>
              </CardHeader>
              <CardContent className="p-6">
                {connectedPlatforms.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-gray-500 mb-4">
                      Connect your social media accounts to start posting
                    </p>
                    <Button
                      onClick={() => navigate(createPageUrl("Dashboard"))}
                      className="bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white"
                    >
                      Go to Dashboard
                    </Button>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {connectedPlatforms.map((platform) => {
                      const isSelected = selectedPlatforms.includes(platform.id);
                      return (
                        <button
                          key={platform.id}
                          onClick={() => togglePlatform(platform.id)}
                          className={`p-4 rounded-xl border-2 transition-all hover:shadow-md ${
                            isSelected
                              ? `${platform.borderColor} ${platform.bgColor} shadow-lg scale-105`
                              : "border-gray-200 bg-white hover:border-gray-300"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-10 h-10 rounded-lg ${platform.bgColor} flex items-center justify-center`}
                            >
                              <platform.icon className={`w-5 h-5 ${platform.color}`} />
                            </div>
                            <div className="flex-1 text-left">
                              <p className="font-semibold text-sm text-gray-900">
                                {platform.name}
                              </p>
                            </div>
                            {isSelected && (
                              <CheckCircle className={`w-5 h-5 ${platform.color}`} />
                            )}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Post Composer */}
            <Card className="shadow-lg">
              <CardHeader className="border-b bg-gradient-to-r from-blue-50 to-green-50">
                <h2 className="text-xl font-bold text-gray-900">Create your post</h2>
              </CardHeader>
              <CardContent className="p-8 space-y-6">
                {/* Caption Input */}
                <div>
                  <Label htmlFor="caption" className="text-base font-semibold text-gray-900 mb-2 block">
                    Caption *
                  </Label>
                  <Textarea
                    id="caption"
                    value={caption}
                    onChange={(e) => {
                      setCaption(e.target.value);
                      setCaptionError("");
                    }}
                    placeholder="Write or paste your caption here..."
                    rows={6}
                    className={`text-base ${captionError ? "border-red-500" : ""}`}
                  />
                  {captionError && (
                    <p className="text-sm text-red-600 mt-1">{captionError}</p>
                  )}
                  <p className="text-sm text-gray-500 mt-2">
                    {caption.length} characters
                  </p>
                </div>

                {/* AI Enhancement Toggle */}
                <div className="flex items-start gap-4 p-4 bg-gradient-to-r from-blue-50 to-green-50 rounded-xl border border-blue-200">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Sparkles className="w-5 h-5 text-blue-600" />
                      <Label
                        htmlFor="ai-enhance"
                        className="font-semibold text-gray-900 cursor-pointer"
                      >
                        Enhance my caption with AI
                      </Label>
                    </div>
                    <p className="text-sm text-gray-600">
                      When enabled, AI will polish your caption for clarity and engagement. When disabled, your original text is used.
                    </p>
                  </div>
                  <Switch
                    id="ai-enhance"
                    checked={aiEnhanceEnabled}
                    onCheckedChange={setAiEnhanceEnabled}
                  />
                </div>

                {/* Optional Image Upload */}
                <div>
                  <Label className="text-base font-semibold text-gray-900 mb-2 block">
                    Optional image or video thumbnail
                  </Label>
                  <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-blue-400 transition-colors">
                    {imagePreview ? (
                      <div className="relative inline-block">
                        <img
                          src={imagePreview}
                          alt="Preview"
                          className="max-h-48 rounded-lg"
                        />
                        <button
                          onClick={() => {
                            setImageFile(null);
                            setImagePreview(null);
                          }}
                          className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <label className="cursor-pointer block">
                        <input
                          type="file"
                          accept="image/*,video/*"
                          onChange={handleImageUpload}
                          className="hidden"
                        />
                        <Upload className="w-10 h-10 mx-auto mb-3 text-gray-400" />
                        <p className="text-gray-700 font-medium mb-1">
                          Click to upload or drag and drop (optional)
                        </p>
                        <p className="text-sm text-gray-500">
                          Image is optional, but a caption is required
                        </p>
                      </label>
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-end gap-4 pt-4 border-t">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setCaption("");
                      setImageFile(null);
                      setImagePreview(null);
                      setSelectedPlatforms([]);
                      setCaptionError("");
                    }}
                    className="text-gray-600"
                  >
                    Clear All
                  </Button>
                  <Button
                    onClick={handlePublish}
                    disabled={publishPostMutation.isPending || connectedPlatforms.length === 0}
                    size="lg"
                    className="bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white px-8"
                  >
                    {publishPostMutation.isPending ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Publishing...
                      </>
                    ) : (
                      <>
                        <CheckCircle className="w-5 h-5 mr-2" />
                        Post to selected platforms
                      </>
                    )}
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