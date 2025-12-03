import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Sparkles, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { SignedIn, SignedOut } from "@clerk/clerk-react";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    document.documentElement.classList.add("dark"); // ✅ CRITICAL FIX
  }, []);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.pathname]);

  const navLinks = [
    { name: "Dashboard", href: "/dashboard-preview" },
    { name: "Core Tools", href: "/core-tools" },
    { name: "Corporate", href: "/corporate-tools" },
    { name: "Pricing", href: "/pricing" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* ✅ NAVBAR */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all ${
          isScrolled ? "nav-glass py-3" : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <Link to="/home" className="flex items-center gap-3">
            <img
              src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/692b490db467b6aad2cac54d/360f43b39_Edittheuploadedlo.png"
              className="h-10 w-10 rounded-lg"
            />
            <span className="text-lg font-semibold hidden sm:block">
              Smart Content Solutions
            </span>
          </Link>

          {/* DESKTOP NAV */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className="text-sm text-[#A9AAAC] hover:text-[#E1C37A]"
              >
                {link.name}
              </Link>
            ))}

            <SignedOut>
              <Link
                to="/login"
                className="btn-gold px-6 py-2.5 rounded-full text-sm flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                Sign In
              </Link>
            </SignedOut>

            <SignedIn>
              <Link
                to="/account"
                className="btn-gold px-6 py-2.5 rounded-full text-sm flex items-center gap-2"
              >
                <User className="w-4 h-4" />
                Account
              </Link>
            </SignedIn>
          </div>

          {/* MOBILE BUTTON */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2"
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* MOBILE MENU */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden nav-glass"
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

                <SignedOut>
                  <Link
                    to="/login"
                    className="btn-gold block text-center px-6 py-3 rounded-full"
                  >
                    Sign In
                  </Link>
                </SignedOut>

                <SignedIn>
                  <Link
                    to="/account"
                    className="btn-gold block text-center px-6 py-3 rounded-full"
                  >
                    My Account
                  </Link>
                </SignedIn>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* PAGE TRANSITIONS */}
      <AnimatePresence mode="wait">
        <motion.main
          key={location.pathname}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25 }}
          className="pt-24"
        >
          {children}
        </motion.main>
      </AnimatePresence>

      {/* FOOTER */}
      <footer className="border-t border-[#3B3C3E] bg-background mt-20">
        <div className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-4 gap-12">
          <div className="md:col-span-2">
            <p className="text-sm text-[#A9AAAC] max-w-md">
              AI automation that runs while you sleep. Scale your content. Crush
              your competition.
            </p>
          </div>

          <div>
            <h4 className="text-[#E1C37A] font-semibold mb-4">Platform</h4>
            <Link to="/dashboard-preview">Dashboard</Link>
          </div>

          <div>
            <h4 className="text-[#E1C37A] font-semibold mb-4">Company</h4>
            <Link to="/contact">Contact</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
