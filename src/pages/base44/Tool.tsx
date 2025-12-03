import React from "react";
import { useSearchParams, Navigate } from "react-router-dom";

import { getToolBySlug } from "@/components/tools/toolsConfig";
import ToolPageTemplate from "@/components/tools/ToolPageTemplate";

export default function Tool() {
  const [searchParams] = useSearchParams();
  const slug = searchParams.get("slug");

  const tool = getToolBySlug(slug);

  // Redirect to dashboard if tool not found
  if (!tool) {
    return <Navigate to="/dashboard-preview" replace />;
  }

  return <ToolPageTemplate tool={tool} />;
}
