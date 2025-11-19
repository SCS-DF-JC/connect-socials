import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./pages/base44/Layout";  // ✅ IMPORTANT

const queryClient = new QueryClient();

// LINKEDIN
import LinkedInCallback from "@/pages/linkedin/callback";
import CreatePost from "@/pages/linkedin/create-post";

// BASE44 PAGES
import Home from "@/pages/base44/Home";
import About from "@/pages/base44/About";
import Services from "@/pages/base44/Services";
import Packages from "@/pages/base44/Packages";
import Portfolio from "@/pages/base44/Portfolio";
import Contact from "@/pages/base44/Contact";

import Dashboard from "@/pages/base44/Dashboard";
import LeadsTool from "@/pages/base44/LeadsTool";
import SocialMediaTool from "@/pages/base44/SocialMediaTool";
import EmailCampaignTool from "@/pages/base44/EmailCampaignTool";
import AnalyticsTool from "@/pages/base44/AnalyticsTool";
import AccountSettings from "@/pages/base44/AccountSettings";

import StarterPlan from "@/pages/base44/StarterPlan";
import ProPlan from "@/pages/base44/ProPlan";
import Resources from "@/pages/base44/Resources";
import StripeCheckout from "@/pages/base44/StripeCheckout";

import NotFound from "@/pages/NotFound";

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />

      <BrowserRouter>
        <Routes>

          {/* ⭐ WEBSITE PAGES WRAPPED IN LAYOUT ⭐ */}
          <Route
            path="/"
            element={
              <Layout>
                <Home />
              </Layout>
            }
          />

          <Route
            path="/home"
            element={
              <Layout>
                <Home />
              </Layout>
            }
          />

          <Route
            path="/about"
            element={
              <Layout>
                <About />
              </Layout>
            }
          />

          <Route
            path="/services"
            element={
              <Layout>
                <Services />
              </Layout>
            }
          />

          <Route
            path="/packages"
            element={
              <Layout>
                <Packages />
              </Layout>
            }
          />

          <Route
            path="/portfolio"
            element={
              <Layout>
                <Portfolio />
              </Layout>
            }
          />

          <Route
            path="/contact"
            element={
              <Layout>
                <Contact />
              </Layout>
            }
          />

          <Route
            path="/resources"
            element={
              <Layout>
                <Resources />
              </Layout>
            }
          />

          {/* ⭐ PLANS WRAPPED TOO ⭐ */}
          <Route
            path="/starter"
            element={
              <Layout>
                <StarterPlan />
              </Layout>
            }
          />

          <Route
            path="/pro"
            element={
              <Layout>
                <ProPlan />
              </Layout>
            }
          />

          <Route
            path="/checkout"
            element={
              <Layout>
                <StripeCheckout />
              </Layout>
            }
          />

          {/* ⭐ DASHBOARD ROUTES — NO LAYOUT ⭐ */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/leads" element={<LeadsTool />} />
          <Route path="/social" element={<SocialMediaTool />} />
          <Route path="/email" element={<EmailCampaignTool />} />
          <Route path="/analytics" element={<AnalyticsTool />} />
          <Route path="/settings" element={<AccountSettings />} />

          {/* LINKEDIN */}
          <Route path="/linkedin/callback" element={<LinkedInCallback />} />
          <Route path="/linkedin/create-post" element={<CreatePost />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
