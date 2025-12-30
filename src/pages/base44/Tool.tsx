import React from "react";
import { useSearchParams, Navigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";

import { getToolBySlug } from "@/components/tools/toolsConfig";
import ToolPageTemplate from "@/components/tools/ToolPageTemplate";

export default function Tool() {
  const { isSignedIn, isLoaded } = useUser();
  const [searchParams] = useSearchParams();
  const slug = searchParams.get("slug");

  // ✅ Loading state
  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading…
      </div>
    );
  }

  // ✅ Must be logged in to even preview tools
  if (!isSignedIn) {
    return <Navigate to="/login" replace />;
  }

  const tool = getToolBySlug(slug);

  // Debug logging
  console.log("🛠️ Tool.tsx Debug:");
  console.log("  - slug:", slug);
  console.log("  - tool found:", !!tool);
  console.log("  - current path:", window.location.pathname);

  // ✅ Invalid slug → dashboard (only redirect if there IS a slug but tool not found)
  // Don't redirect if there's no slug at all (user might be navigating away)
  if (slug && !tool) {
    console.log("  ⚠️ REDIRECTING to dashboard-preview (invalid slug)");
    return <Navigate to="/dashboard-preview" replace />;
  }

  // ✅ DO NOT redirect normal users anymore
  // ToolPageTemplate already handles:
  // - locked preview
  // - pricing CTA
  // - admin access

  return <ToolPageTemplate tool={tool} />;
}