import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
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
  LogOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";

type LayoutProps = {
  children: React.ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isScrollingDown, setIsScrollingDown] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { name: "Home", path: "/home" },
    { name: "About", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Packages", path: "/packages" },
    { name: "Portfolio", path: "/portfolio" },
    { name: "Resources", path: "/resources" },
    { name: "Contact", path: "/contact" },
  ];

  const sidebarItems = [
    { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
    { name: "Social Posts", path: "/social", icon: Share2 },
    { name: "Email Campaigns", path: "/email", icon: Mail },
    { name: "Analytics", path: "/analytics", icon: BarChart3 },
    { name: "Leads & Calls", path: "/leads", icon: Phone },
    { name: "Account Settings", path: "/settings", icon: Settings },
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

  const isActive = (path: string) =>
    location.pathname === path || location.pathname.startsWith(path + "/");

  const handleLogin = () => navigate("/dashboard");
  const handleLogout = () => navigate("/home");

  return (
    <div className="min-h-screen bg-gray-50">
      <style>{`
        :root {
          --blue: #2b8cff;
          --green: #10b981;
        }
        .gradient-text {
          background: linear-gradient(135deg, var(--blue) 0%, var(--green) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
      `}</style>

      {/* SIDEBAR TOGGLE BUTTON */}
      <button
        onClick={() => setSidebarOpen((s) => !s)}
        aria-label="Open sidebar"
        className={`fixed top-4 left-4 z-50 w-12 h-12 rounded-xl shadow-lg flex items-center justify-center
        ${isScrollingDown ? "opacity-0 pointer-events-none" : "opacity-100"}
        bg-gradient-to-br from-blue-500 to-green-500 text-white`}
      >
        {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* FIXED — SIDEBAR NOW SLIDES IN/OUT */}
      <aside
        className={`
          fixed top-0 left-0 
          z-[40] 
          h-screen w-80 
          transform transition-transform duration-300 ease-out
          bg-[linear-gradient(180deg,#3B82F6_0%,#2563EB_35%,#0EA5E9_65%,#10B981_100%)]
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div className="h-full flex flex-col text-white overflow-y-auto">
          <div className="p-6 border-b border-white/10">
            <div className="flex items-center gap-3 mb-4">
              <img
                src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/user_68b073eda37c031e7cfdae1c/ffd16f891_logo.jpg"
                alt="logo"
                className="h-12 w-12 object-contain rounded-lg bg-white p-1"
              />
              <div>
                <div className="font-bold text-lg">Smart Content</div>
                <div className="text-xs text-white/80">Solutions</div>
              </div>
            </div>

            <div className="bg-white/10 rounded-lg p-3">
              <p className="text-sm mb-2">Access your dashboard</p>
              <Button onClick={handleLogin} size="sm" className="w-full bg-white text-blue-600">
                Login / Register
              </Button>
            </div>
          </div>

          <nav className="flex-1 p-4 space-y-4">
            <div>
              <p className="text-xs text-white/70 uppercase mb-2 px-3">Public Pages</p>
              <div className="space-y-2">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setSidebarOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                      isActive(item.path)
                        ? "bg-white text-blue-600 shadow-lg font-semibold"
                        : "text-white/90 hover:bg-white/10"
                    }`}
                  >
                    <HomeIcon className="w-5 h-5" />
                    <span>{item.name}</span>
                  </Link>
                ))}
              </div>
            </div>

            <div className="mt-4">
              <p className="text-xs text-white/70 uppercase mb-2 px-3">Client Tools</p>
              <div className="space-y-2">
                {sidebarItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setSidebarOpen(false)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                        isActive(item.path)
                          ? "bg-white text-blue-600 shadow-lg font-semibold"
                          : "text-white/90 hover:bg-white/10"
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span>{item.name}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          </nav>

          <div className="p-4 border-t border-white/10">
            <Button
              onClick={handleLogout}
              className="w-full bg-white/10 hover:bg-white/20 text-white justify-start gap-3"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </Button>
          </div>
        </div>
      </aside>

      {/* OVERLAY */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/55 backdrop-blur-[3px] z-[30]"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* NAVBAR */}
      <header
        className={`fixed top-0 left-0 right-0 z-30 transition-transform duration-300 ${
          isScrollingDown ? "-translate-y-full" : "translate-y-0"
        } ${scrolled ? "bg-white/95 backdrop-blur shadow-md" : "bg-transparent"}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center gap-6">
              <div className="hidden sm:block" style={{ width: 56 }} />
              <Link to="/home" className="flex items-center gap-3">
                <img
                  src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/user_68b073eda37c031e7cfdae1c/ffd16f891_logo.jpg"
                  alt="logo"
                  className="h-10 w-10 object-contain rounded"
                />
                <span className="font-bold text-lg gradient-text hidden sm:inline-block">
                  Smart Content Solutions
                </span>
              </Link>
            </div>

            <nav className="hidden lg:flex items-center gap-8">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`relative font-medium ${
                    isActive(item.path) ? "text-blue-600" : "text-gray-700 hover:text-blue-600"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            <div className="hidden lg:flex items-center gap-4">
              <Link to="/packages">
                <Button className="bg-gradient-to-r from-blue-500 to-green-500 text-white transform hover:scale-105">
                  Get Started <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>

            <div className="lg:hidden">
              <button
                onClick={() => setMenuOpen((s) => !s)}
                className="p-2 rounded-lg hover:bg-gray-100"
              >
                {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        <div className={`lg:hidden overflow-hidden transition-max-h duration-300 ${menuOpen ? "max-h-96 border-t bg-white" : "max-h-0"}`}>
          <div className="px-4 py-4 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMenuOpen(false)}
                className={`block py-2 px-3 rounded-lg ${
                  isActive(item.path)
                    ? "bg-gradient-to-r from-blue-50 to-green-50 text-blue-600"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </header>

      <main className="pt-24">{children}</main>

      <footer className="bg-gray-900 text-gray-300 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <img
                  src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/user_68b073eda37c031e7cfdae1c/ffd16f891_logo.jpg"
                  alt="logo"
                  className="h-10 w-10 object-contain rounded"
                />
                <span className="font-bold text-white">Smart Content Solutions</span>
              </div>
              <p className="text-gray-400 max-w-md">
                Smart automation for smarter business. AI-powered content solutions that save time and drive growth.
              </p>
              <p className="text-sm text-gray-500 mt-4">support@smartcontentsolutions.co.uk</p>
            </div>

            <div>
              <h3 className="font-semibold text-white mb-3">Quick Links</h3>
              <ul className="space-y-2">
                {navItems.map((item) => (
                  <li key={item.path}>
                    <Link to={item.path} className="hover:text-white">
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-white mb-3">Services</h3>
              <ul className="text-sm space-y-2 text-gray-400">
                <li>AI Blog Automation</li>
                <li>Social Media Scheduling</li>
                <li>Email Content Automation</li>
                <li>Website Development</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-500">
            <p>© {new Date().getFullYear()} Smart Content Solutions. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
