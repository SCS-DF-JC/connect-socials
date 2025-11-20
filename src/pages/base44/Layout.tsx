import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import {
  Menu,
  X,
  ChevronRight,
  Home as HomeIcon,
  LayoutDashboard,
  Share2,
  Mail,
  BarChart3,
  Phone,
  Settings,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  SignedIn,
  SignedOut,
  UserButton,
  useUser,
} from "@clerk/clerk-react";

export default function Layout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isScrollingDown, setIsScrollingDown] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  const { user } = useUser();
  const location = useLocation();

  const navItems = [
    { name: "Home", path: "/home" },
    { name: "About", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Packages", path: "/packages" },
    { name: "Portfolio", path: "/portfolio" },
    { name: "Resources", path: "/resources" },
    { name: "Contact", path: "/contact" },
  ];

  // ⭐ FIXED ROUTES (MATCH APP.TSX NOW)
  const sidebarItems = [
    { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
    { name: "Social Posts", path: "/social-posts", icon: Share2 },
    { name: "Email Campaigns", path: "/email-campaigns", icon: Mail },
    { name: "Analytics", path: "/analytics", icon: BarChart3 },
    { name: "Leads & Calls", path: "/leads-calls", icon: Phone },
    { name: "Account Settings", path: "/account-settings", icon: Settings },
  ];

  useEffect(() => {
    setMenuOpen(false);
    setSidebarOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.pathname]);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 50);
      setIsScrollingDown(y > lastScrollY && y > 120);
      setLastScrollY(y);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [lastScrollY]);

  const isActive = (path) =>
    location.pathname === path ||
    location.pathname.startsWith(path + "/");

  return (
    <div className="min-h-screen bg-gray-50">
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="fixed top-4 left-4 z-50 w-12 h-12 rounded-xl shadow-lg bg-gradient-to-br from-blue-500 to-green-500 flex items-center justify-center text-white"
      >
        {sidebarOpen ? <X /> : <Menu />}
      </button>

      {/* SIDEBAR */}
      <aside
        className={`fixed top-0 left-0 z-[40] h-screen w-80 bg-[linear-gradient(180deg,#3B82F6_0%,#2563EB_35%,#0EA5E9_65%,#10B981_100%)]
          transition-transform duration-300
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div className="h-full flex flex-col text-white overflow-y-auto">

          {/* HEADER */}
          <div className="p-6 border-b border-white/10">
            <div className="flex items-center gap-3 mb-4">
              <img
                src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/user_68b073eda37c031e7cfdae1c/ffd16f891_logo.jpg"
                className="h-12 w-12 rounded bg-white p-1 object-contain"
              />
              <div>
                <div className="font-bold text-lg">Smart Content</div>
                <div className="text-xs text-white/80">Solutions</div>
              </div>
            </div>

            {/* SIGNED OUT */}
            <SignedOut>
              <div className="bg-white/10 rounded-lg p-3">
                <p className="text-sm mb-2">Access your dashboard</p>
                <Link to="/login">
                  <Button size="sm" className="bg-white w-full text-blue-600">
                    Login / Register
                  </Button>
                </Link>
              </div>
            </SignedOut>

            {/* SIGNED IN */}
            <SignedIn>
              <div className="bg-white/10 rounded-lg p-3">
                <p className="font-semibold">{user?.fullName}</p>
                <p className="text-xs opacity-80 mb-3">
                  {user?.primaryEmailAddress?.emailAddress}
                </p>

                <Link to="/dashboard">
                  <Button className="bg-white w-full text-blue-600">
                    Go to Dashboard
                  </Button>
                </Link>

                <div className="mt-4">
                  <UserButton afterSignOutUrl="/home" />
                </div>
              </div>
            </SignedIn>
          </div>

          {/* PUBLIC NAV */}
          <nav className="flex-1 p-4 space-y-4">
            <div>
              <p className="text-xs text-white/70 uppercase mb-2 px-3">
                Public Pages
              </p>

              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg ${
                    isActive(item.path)
                      ? "bg-white text-blue-600 font-semibold shadow-lg"
                      : "text-white/90 hover:bg-white/10"
                  }`}
                >
                  <HomeIcon className="w-5 h-5" />
                  {item.name}
                </Link>
              ))}
            </div>

            {/* DASHBOARD NAV */}
            <SignedIn>
              <div className="mt-4">
                <p className="text-xs text-white/70 uppercase mb-2 px-3">
                  Client Tools
                </p>

                {sidebarItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setSidebarOpen(false)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-lg ${
                        isActive(item.path)
                          ? "bg-white text-blue-600 font-semibold shadow-lg"
                          : "text-white/90 hover:bg-white/10"
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      {item.name}
                    </Link>
                  );
                })}
              </div>
            </SignedIn>
          </nav>
        </div>
      </aside>

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-[30]"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* TOP NAV */}
      <header
        className={`fixed top-0 left-0 right-0 z-30 transition-transform duration-300
          ${isScrollingDown ? "-translate-y-full" : "translate-y-0"}
          ${scrolled ? "bg-white/95 backdrop-blur shadow-md" : "bg-white"}
        `}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">

            <Link to="/home" className="flex items-center gap-3 ml-16">
              <img
                src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/user_68b073eda37c031e7cfdae1c/ffd16f891_logo.jpg"
                className="h-12 w-12 rounded object-contain shadow"
              />
              <div className="leading-tight">
                <span className="font-bold text-2xl bg-gradient-to-r from-blue-500 to-green-500 bg-clip-text text-transparent">
                  Smart Content
                </span>
                <div className="text-sm text-gray-500 -mt-1">
                  Solutions
                </div>
              </div>
            </Link>

            <nav className="hidden lg:flex items-center gap-10">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`font-medium ${
                    isActive(item.path)
                      ? "text-blue-600 border-b-2 border-green-500 pb-1"
                      : "text-gray-700 hover:text-blue-600"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            <div className="hidden lg:flex items-center gap-4">
              <SignedOut>
                <Link to="/login">
                  <Button className="bg-gradient-to-r from-blue-500 to-green-500 text-white px-6 py-2 rounded-lg flex items-center gap-2">
                    Get Started <ChevronRight className="w-4 h-4" />
                  </Button>
                </Link>
              </SignedOut>

              <SignedIn>
                <Link to="/dashboard">
                  <Button className="bg-blue-600 text-white">Dashboard</Button>
                </Link>
                <UserButton afterSignOutUrl="/home" />
              </SignedIn>
            </div>

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
            >
              {menuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        <div
          className={`lg:hidden transition-max-h overflow-hidden ${
            menuOpen ? "max-h-96 bg-white border-t" : "max-h-0"
          }`}
        >
          <div className="p-4 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMenuOpen(false)}
                className={`block px-3 py-2 rounded-lg ${
                  isActive(item.path)
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                {item.name}
              </Link>
            ))}

            <SignedOut>
              <Link to="/login">
                <Button className="mt-3 w-full bg-blue-600 text-white">
                  Login
                </Button>
              </Link>
            </SignedOut>

            <SignedIn>
              <Link to="/dashboard">
                <Button className="mt-3 w-full bg-blue-600 text-white">
                  Dashboard
                </Button>
              </Link>
              <div className="mt-3">
                <UserButton afterSignOutUrl="/home" />
              </div>
            </SignedIn>
          </div>
        </div>
      </header>

      <main className="pt-24">{children}</main>
    </div>
  );
}
