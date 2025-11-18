
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "@/utils";
// import { base44 } from "@/api/base44Client";
import { Menu, X, ChevronRight, Home, LayoutDashboard, Share2, Mail, BarChart3, Phone, Settings, LogOut, User as UserIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Layout({ children, currentPageName }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isScrollingDown, setIsScrollingDown] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      setIsScrolled(currentScrollY > 50);
      setIsScrollingDown(currentScrollY > lastScrollY && currentScrollY > 100);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  useEffect(() => {
    setIsMenuOpen(false);
    setSidebarOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location]);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const isAuth = await base44.auth.isAuthenticated();
        setIsAuthenticated(isAuth);
        if (isAuth) {
          const userData = await base44.auth.me();
          setUser(userData);
        }
      } catch (error) {
        console.error("Error loading user:", error);
        setIsAuthenticated(false);
        setUser(null);
      }
    };
    loadUser();
  }, [location]);

  const handleLogout = () => {
    base44.auth.logout(createPageUrl("Home"));
  };

  const navItems = [
    { name: "Home", path: "Home" },
    { name: "About", path: "About" },
    { name: "Services", path: "Services" },
    { name: "Packages", path: "Packages" },
    { name: "Portfolio", path: "Portfolio" },
    { name: "Resources", path: "Resources" },
    { name: "Contact", path: "Contact" },
  ];

  const sidebarItems = [
    { name: "Dashboard", path: "Dashboard", icon: LayoutDashboard },
    { name: "Social Posts", path: "SocialMediaTool", icon: Share2 },
    { name: "Email Campaigns", path: "EmailCampaignTool", icon: Mail },
    { name: "Analytics", path: "AnalyticsTool", icon: BarChart3 },
    { name: "Leads & Calls", path: "LeadsTool", icon: Phone },
    { name: "Account Settings", path: "AccountSettings", icon: Settings },
  ];

  const isActive = (path) => location.pathname === createPageUrl(path);

  return (
    <div className="min-h-screen bg-gray-50">
      <style>{`
        :root {
          --primary-blue: #3B82F6;
          --primary-green: #10B981;
          --gradient: linear-gradient(135deg, #3B82F6 0%, #10B981 100%);
        }
        
        .gradient-text {
          background: var(--gradient);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        * {
          scroll-behavior: smooth;
        }
        
        a, button {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .sidebar-enter {
          transform: translateX(-100%);
        }
        
        .sidebar-enter-active {
          transform: translateX(0);
          transition: transform 300ms ease-out;
        }
        
        .sidebar-exit {
          transform: translateX(0);
        }
        
        .sidebar-exit-active {
          transform: translateX(-100%);
          transition: transform 300ms ease-in;
        }
      `}</style>

      {/* Global Sidebar Toggle Button */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className={`fixed top-4 left-4 z-[70] w-12 h-12 bg-gradient-to-br from-blue-500 to-green-500 text-white rounded-xl shadow-lg flex items-center justify-center hover:scale-110 transition-all duration-300 ${
          isScrollingDown ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      >
        {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Global Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-[60] h-screen w-80 bg-gradient-to-br from-blue-600 via-blue-500 to-green-500 shadow-2xl transition-transform duration-300 ease-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="h-full flex flex-col text-white overflow-y-auto">
          {/* Sidebar Header */}
          <div className="p-6 border-b border-white/20">
            <div className="flex items-center gap-3 mb-4">
              <img
                src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/user_68b073eda37c031e7cfdae1c/ffd16f891_logo.jpg"
                alt="Smart Content Solutions"
                className="h-12 w-12 object-contain bg-white rounded-lg p-1"
              />
              <div>
                <span className="font-bold text-white block text-lg">Smart Content</span>
                <span className="text-xs text-white/80">Solutions</span>
              </div>
            </div>
            
            {isAuthenticated && user ? (
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20">
                <div className="flex items-center gap-2 mb-2">
                  <UserIcon className="w-4 h-4" />
                  <div className="text-sm font-semibold">{user?.full_name || "User"}</div>
                </div>
                <div className="text-xs text-white/80 mb-2">{user?.email}</div>
                <div>
                  <span
                    className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${
                      user?.subscription_plan === "heavy"
                        ? "bg-white text-blue-600"
                        : user?.subscription_plan === "moderate"
                        ? "bg-white/20 text-white"
                        : user?.subscription_plan === "light"
                        ? "bg-white/20 text-white"
                        : "bg-white/10 text-white/60"
                    }`}
                  >
                    {user?.subscription_plan === "heavy"
                      ? "Heavy Plan"
                      : user?.subscription_plan === "moderate"
                      ? "Moderate Plan"
                      : user?.subscription_plan === "light"
                      ? "Light Plan"
                      : "No Plan"}
                  </span>
                </div>
              </div>
            ) : (
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20">
                <p className="text-sm text-white/90 mb-3">Access your dashboard</p>
                <Button
                  onClick={() => {
                    setSidebarOpen(false);
                    base44.auth.redirectToLogin(createPageUrl("Dashboard"));
                  }}
                  size="sm"
                  className="w-full bg-white text-blue-600 hover:bg-white/90"
                >
                  Login / Register
                </Button>
              </div>
            )}
          </div>

          {/* Sidebar Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            {/* Public Pages */}
            <div className="mb-6">
              <p className="text-xs font-semibold text-white/60 uppercase tracking-wider mb-3 px-3">
                Public Pages
              </p>
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={createPageUrl(item.path)}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                    isActive(item.path)
                      ? "bg-white text-blue-600 shadow-lg font-semibold"
                      : "text-white/90 hover:bg-white/10"
                  }`}
                >
                  <Home className="w-5 h-5" />
                  <span>{item.name}</span>
                </Link>
              ))}
            </div>

            {/* Client Tools - Always Visible */}
            <div>
              <p className="text-xs font-semibold text-white/60 uppercase tracking-wider mb-3 px-3">
                Client Tools
              </p>
              {sidebarItems.map((item) => (
                <Link
                  key={item.path}
                  to={createPageUrl(item.path)}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                    isActive(item.path)
                      ? "bg-white text-blue-600 shadow-lg font-semibold"
                      : "text-white/90 hover:bg-white/10"
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.name}</span>
                </Link>
              ))}
            </div>
          </nav>

          {/* Sidebar Footer */}
          {isAuthenticated && (
            <div className="p-4 border-t border-white/20">
              <Button
                onClick={handleLogout}
                className="w-full bg-white/10 hover:bg-white/20 text-white border border-white/20 justify-start gap-3"
              >
                <LogOut className="w-5 h-5" />
                Logout
              </Button>
            </div>
          )}
        </div>
      </aside>

      {/* Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[55] transition-opacity duration-300"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Top Navigation Bar */}
      <nav
        className={`fixed top-0 left-0 right-0 z-30 transition-all duration-300 ${
          isScrollingDown ? "-translate-y-full" : "translate-y-0"
        } ${
          isScrolled
            ? "bg-white/95 backdrop-blur-lg shadow-lg"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Link to={createPageUrl("Home")} className="flex items-center gap-3 ml-16">
              <img
                src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/user_68b073eda37c031e7cfdae1c/ffd16f891_logo.jpg"
                alt="Smart Content Solutions"
                className="h-12 w-12 object-contain"
              />
              <span className="font-bold text-xl gradient-text hidden sm:block">
                Smart Content Solutions
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={createPageUrl(item.path)}
                  className={`font-medium transition-colors relative group ${
                    isActive(item.path)
                      ? "text-blue-600"
                      : "text-gray-700 hover:text-blue-600"
                  }`}
                >
                  {item.name}
                  <span
                    className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-blue-500 to-green-500 transition-all ${
                      isActive(item.path) ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </Link>
              ))}
              {isAuthenticated ? (
                <Link to={createPageUrl("Dashboard")}>
                  <Button className="bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white transform hover:scale-105 transition-all duration-300">
                    Dashboard
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </Link>
              ) : (
                <Link to={createPageUrl("Contact")}>
                  <Button className="bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white transform hover:scale-105 transition-all duration-300">
                    Get Started
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </Link>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden transition-all duration-300 overflow-hidden ${
            isMenuOpen ? "max-h-96 border-t" : "max-h-0"
          } bg-white`}
        >
          <div className="px-4 py-4 space-y-3">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={createPageUrl(item.path)}
                className={`block py-2 px-4 rounded-lg transition-colors ${
                  isActive(item.path)
                    ? "bg-gradient-to-r from-blue-50 to-green-50 text-blue-600 font-medium"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-20">{children}</main>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <img
                  src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/user_68b073eda37c031e7cfdae1c/ffd16f891_logo.jpg"
                  alt="SCS"
                  className="h-10 w-10 object-contain"
                />
                <span className="font-bold text-xl text-white">
                  Smart Content Solutions
                </span>
              </div>
              <p className="text-gray-400 mb-4 max-w-md">
                Smart automation for smarter business. AI-powered content
                solutions that save time and drive growth.
              </p>
              <p className="text-sm text-gray-500">
                support@smartcontentsolutions.co.uk
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-white mb-4">Quick Links</h3>
              <ul className="space-y-2">
                {navItems.map((item) => (
                  <li key={item.path}>
                    <Link
                      to={createPageUrl(item.path)}
                      className="hover:text-white transition-colors"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-white mb-4">Services</h3>
              <ul className="space-y-2 text-sm">
                <li>AI Blog Automation</li>
                <li>Social Media Scheduling</li>
                <li>Email Content Automation</li>
                <li>Website Development</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-500">
            <p>© 2025 Smart Content Solutions. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
