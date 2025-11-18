import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Sparkles, ArrowRight, CheckCircle, Loader2 } from "lucide-react";

export default function ContentDemo() {
  const [topic, setTopic] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState(null);

  const exampleOutputs = {
    "AI marketing": {
      title: "How AI is Revolutionizing Digital Marketing in 2025",
      excerpt: "Artificial Intelligence is transforming how businesses approach marketing. From personalized customer experiences to predictive analytics, AI tools are helping companies achieve unprecedented ROI...",
      keywords: ["AI marketing", "digital transformation", "marketing automation"],
      readTime: "5 min read",
    },
    "social media": {
      title: "5 Social Media Strategies Every Business Needs",
      excerpt: "In today's digital landscape, social media presence is crucial for business success. Discover proven strategies for engaging your audience, building brand awareness, and driving conversions...",
      keywords: ["social media", "content strategy", "engagement"],
      readTime: "4 min read",
    },
    "content automation": {
      title: "Content Automation: The Future of Digital Marketing",
      excerpt: "Learn how content automation can save your business time while maintaining quality. Discover the tools and techniques that successful companies use to scale their content production...",
      keywords: ["automation", "efficiency", "scalability"],
      readTime: "6 min read",
    },
    "default": {
      title: "Boost Your Business with Smart Content Strategy",
      excerpt: "Creating consistent, high-quality content doesn't have to be time-consuming. Discover how modern automation tools can help you maintain an active online presence while focusing on growing your business...",
      keywords: ["business growth", "content strategy", "efficiency"],
      readTime: "5 min read",
    },
  };

  const handleGenerate = () => {
    if (!topic.trim()) return;

    setIsGenerating(true);
    setGeneratedContent(null);

    // Simulate AI generation
    setTimeout(() => {
      const topicLower = topic.toLowerCase();
      let output = exampleOutputs.default;

      // Match keywords
      if (topicLower.includes("ai") || topicLower.includes("artificial intelligence")) {
        output = exampleOutputs["AI marketing"];
      } else if (topicLower.includes("social")) {
        output = exampleOutputs["social media"];
      } else if (topicLower.includes("automat")) {
        output = exampleOutputs["content automation"];
      }

      setGeneratedContent(output);
      setIsGenerating(false);
    }, 2000);
  };

  return (
    <div className="w-full">
      <Card className="border-2 border-blue-200 shadow-2xl overflow-hidden">
        <div className="bg-gradient-to-r from-blue-500 to-green-500 p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white">
              Try Our AI Content Generator
            </h3>
          </div>
          <p className="text-blue-50">
            See how our system generates blog content automatically
          </p>
        </div>

        <CardContent className="p-8">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Enter a topic you'd like to write about:
              </label>
              <div className="flex gap-3">
                <Input
                  type="text"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleGenerate()}
                  placeholder="e.g., AI marketing, social media strategy..."
                  className="h-12 text-lg"
                  disabled={isGenerating}
                />
                <Button
                  onClick={handleGenerate}
                  disabled={!topic.trim() || isGenerating}
                  className="bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white px-8 h-12"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      Generate
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </>
                  )}
                </Button>
              </div>
            </div>

            {isGenerating && (
              <Card className="bg-gradient-to-br from-blue-50 to-green-50 border-none animate-pulse">
                <CardContent className="p-6">
                  <div className="space-y-3">
                    <div className="h-4 bg-blue-200 rounded w-3/4"></div>
                    <div className="h-4 bg-blue-200 rounded w-full"></div>
                    <div className="h-4 bg-blue-200 rounded w-5/6"></div>
                  </div>
                </CardContent>
              </Card>
            )}

            {generatedContent && !isGenerating && (
              <Card className="bg-gradient-to-br from-blue-50 to-green-50 border-2 border-blue-200 animate-in slide-in-from-bottom-4 duration-500">
                <CardContent className="p-6">
                  <div className="flex items-start gap-3 mb-4">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-green-500 rounded-lg flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-xl font-bold text-gray-900 mb-2">
                        {generatedContent.title}
                      </h4>
                      <p className="text-gray-700 leading-relaxed mb-4">
                        {generatedContent.excerpt}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-3">
                        {generatedContent.keywords.map((keyword, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-white rounded-full text-sm font-medium text-gray-700"
                          >
                            {keyword}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span className="font-medium text-blue-600">
                          ✓ SEO Optimized
                        </span>
                        <span>•</span>
                        <span>{generatedContent.readTime}</span>
                        <span>•</span>
                        <span>Ready to publish</span>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white rounded-lg p-4 border border-blue-100">
                    <p className="text-sm text-gray-600 text-center">
                      <strong className="text-gray-900">This is a preview.</strong> Our actual system generates full articles with proper structure, headings, and formatted content.
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}

            {!generatedContent && !isGenerating && (
              <div className="text-center py-8 text-gray-500">
                <p className="mb-2">Try entering a topic above to see AI generation in action!</p>
                <p className="text-sm">Examples: "social media tips", "content marketing", "AI tools"</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}