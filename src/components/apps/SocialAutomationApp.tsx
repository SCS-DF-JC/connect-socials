import React, { useState } from "react";
import { Calendar, Plus, Send, Instagram, Facebook, Linkedin, Twitter } from "lucide-react";

export default function SocialAutomationApp() {
  const [post, setPost] = useState("");
  const [scheduledDate, setScheduledDate] = useState("");
  const [platforms, setPlatforms] = useState<string[]>([]);

  const togglePlatform = (platform: string) => {
    setPlatforms(prev =>
      prev.includes(platform)
        ? prev.filter(p => p !== platform)
        : [...prev, platform]
    );
  };

  const handleSchedule = () => {
    if (!post || !scheduledDate || platforms.length === 0) {
      alert("Fill all fields");
      return;
    }

    console.log({
      post,
      scheduledDate,
      platforms
    });

    alert("Post Scheduled Successfully ✅");

    setPost("");
    setScheduledDate("");
    setPlatforms([]);
  };

  return (
    <div className="min-h-screen pt-24 pb-20 px-6 text-white max-w-5xl mx-auto">

      {/* HEADER */}
      <h1 className="text-3xl font-bold mb-2">Social Media Automation</h1>
      <p className="text-[#A9AAAC] mb-10">
        Create, schedule and auto-publish posts across platforms.
      </p>

      {/* PLATFORM CONNECT */}
      <div className="glass-card p-6 rounded-2xl mb-10">
        <h3 className="text-lg font-semibold mb-4">Select Platforms</h3>

        <div className="flex gap-4 flex-wrap">
          {[
            { name: "Instagram", icon: Instagram },
            { name: "Facebook", icon: Facebook },
            { name: "LinkedIn", icon: Linkedin },
            { name: "Twitter", icon: Twitter }
          ].map(platform => {
            const Icon = platform.icon;
            const active = platforms.includes(platform.name);
            return (
              <button
                key={platform.name}
                onClick={() => togglePlatform(platform.name)}
                className={`flex items-center gap-2 px-5 py-3 rounded-xl border transition-all ${
                  active
                    ? "btn-gold"
                    : "border-[#3B3C3E] text-[#A9AAAC]"
                }`}
              >
                <Icon className="w-5 h-5" />
                {platform.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* POST COMPOSER */}
      <div className="glass-card p-6 rounded-2xl mb-10">
        <h3 className="text-lg font-semibold mb-4">Post Content</h3>

        <textarea
          value={post}
          onChange={e => setPost(e.target.value)}
          rows={5}
          className="w-full rounded-xl bg-[#1A1A1C] border border-[#3B3C3E] text-white p-4 resize-none mb-4"
          placeholder="Write your post here..."
        />

        <div className="flex items-center gap-4">
          <input
            type="datetime-local"
            value={scheduledDate}
            onChange={e => setScheduledDate(e.target.value)}
            className="bg-[#1A1A1C] border border-[#3B3C3E] rounded-xl px-4 py-3 text-white"
          />

          <button onClick={handleSchedule} className="btn-gold px-6 py-3 rounded-xl flex items-center gap-2">
            <Send className="w-4 h-4" />
            Schedule Post
          </button>
        </div>
      </div>

      {/* SCHEDULED POSTS QUEUE */}
      <div className="glass-card p-6 rounded-2xl">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Calendar className="w-5 h-5" />
          Scheduled Queue
        </h3>

        <div className="text-sm text-[#A9AAAC]">
          No scheduled posts yet.
        </div>
      </div>

    </div>
  );
}
