import React, { useState, useEffect, ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Sparkles, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  SoundProvider,
  SoundToggle,
  useSounds
} from "../../components/shared/SoundEffects";
import {
  SubscriptionProvider,
  useSubscription
} from "../../components/subscription/useSubscription";

function LayoutContent({ children }: { children: ReactNode }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  // ✅ Detect WordPress Tool Page
  const isWordpressToolPage = location.pathname.includes("/apps/wordpress-seo");

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu + scroll top
  useEffect(() => {
    setMobileMenuOpen(false);
    const timer = setTimeout(() => {
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    }, 50);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  const { isAuthenticated, login } = useSubscription();

  const navLinks = [
    { name: "Dashboard", href: "/dashboard-preview" },
    { name: "Core Tools", href: "/core-tools" },
    { name: "Corporate", href: "/corporate-tools" },
    { name: "Pricing", href: "/pricing" },
    { name: "Contact", href: "/contact" }
  ];

  return (
    <div className="min-h-screen bg-[#1A1A1C] text-[#D6D7D8] overflow-x-hidden">
      {/* NAV */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled ? "nav-glass py-3" : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <img
              src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/692b490db467b6aad2cac54d/360f43b39_Edittheuploadedlo.png"
              alt="SCS Logo"
              className="h-10 w-10 object-contain rounded-lg"
            />
            <span className="text-lg font-semibold tracking-tight hidden sm:block">
              Smart Content Solutions
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className="text-sm text-[#A9AAAC] hover:text-[#E1C37A] transition-colors"
              >
                {link.name}
              </Link>
            ))}

            {isAuthenticated ? (
              <SoundLink
                to="/account"
                className="btn-gold px-6 py-2.5 rounded-full flex items-center gap-2"
              >
                <User className="w-4 h-4" /> Account
              </SoundLink>
            ) : (
              <button
                onClick={login}
                className="btn-gold px-6 py-2.5 rounded-full flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4" /> Sign In
              </button>
            )}
          </div>

          {/* Mobile */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden nav-glass border-t border-[#3B3C3E]"
            >
              <div className="px-6 py-6 space-y-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.href}
                    className="block text-[#A9AAAC] hover:text-[#E1C37A]"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* PAGE CONTENT */}
      <AnimatePresence mode="wait">
        <motion.main
          key={location.pathname}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.3 }}
          className={
            isWordpressToolPage
              ? "w-full flex justify-center bg-[#1A1A1C] pt-32"
              : "pt-32"
          }
        >
          {children}
        </motion.main>
      </AnimatePresence>

      {/* FOOTER */}
      <footer className="border-t border-[#3B3C3E] bg-[#1A1A1C] mt-20 pb-20">
        <div className="max-w-7xl mx-auto px-6 py-12 text-[#A9AAAC]">
          <p>© {new Date().getFullYear()} Smart Content Solutions.</p>
        </div>
      </footer>
    </div>
  );
}

function SoundLink({ to, children, className }: any) {
  const { playHover, playClick } = useSounds();
  return (
    <Link to={to} className={className} onMouseEnter={playHover} onClick={playClick}>
      {children}
    </Link>
  );
}

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <SoundProvider>
      <SubscriptionProvider>
        <LayoutContent>{children}</LayoutContent>
      </SubscriptionProvider>
    </SoundProvider>
  );
}
