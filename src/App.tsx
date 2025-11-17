import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Index from "@/pages/Index";
import NotFound from "@/pages/NotFound";

// LinkedIn Pages
import LinkedInCallback from "@/pages/linkedin/callback";

// Create Post Page
import CreatePost from "@/pages/linkedin/create-post";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />

      <BrowserRouter>
        <Routes>
          {/* HOME */}
          <Route path="/" element={<Index />} />

          {/* LinkedIn OAuth callback */}
          <Route path="/linkedin/callback" element={<LinkedInCallback />} />

          {/* Create Post */}
          <Route path="/create-post" element={<CreatePost />} />

          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>

    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
