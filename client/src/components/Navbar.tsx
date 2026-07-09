import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { trpc } from "@/lib/trpc";
import { getLoginUrl } from "@/const";
import { LogOut, Menu, X } from "lucide-react";
import { useState } from "react";
import { useNavigate, useLocation } from 'wouter';

export default function Navbar() {
  const { user, isAuthenticated } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const [location] = useLocation();
  const logoutMutation = trpc.auth.logout.useMutation();

  const handleLogout = async () => {
    await logoutMutation.mutateAsync();
    navigate('/');
  };

  const handleNavigation = (path: string) => {
    setIsMenuOpen(false);
    navigate(path);
  };

  const scrollToSection = (sectionId: string) => {
    setIsMenuOpen(false);
    // Only scroll if we're on the home page
    if (location === '/') {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate('/');
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 w-full border-b border-slate-700 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 shadow-lg">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity" onClick={() => navigate('/')}>
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600">
            <span className="text-lg">💻</span>
          </div>
          <span className="hidden sm:inline font-bold text-lg text-white">
            CodeBitsLern
          </span>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <button
            onClick={() => handleNavigation('/')}
            className="text-sm font-medium text-slate-300 hover:text-white transition-colors duration-300 flex items-center gap-2 group"
          >
            <span className="group-hover:scale-110 transition-transform">🏠</span>
            الرئيسية
          </button>
          <button
            onClick={() => location === '/' ? scrollToSection('products') : handleNavigation('/')}
            className="text-sm font-medium text-slate-300 hover:text-white transition-colors duration-300 flex items-center gap-2 group"
          >
            <span className="group-hover:scale-110 transition-transform">🛒</span>
            المنتجات
          </button>
          <button
            onClick={() => location === '/' ? scrollToSection('videos') : handleNavigation('/')}
            className="text-sm font-medium text-slate-300 hover:text-white transition-colors duration-300 flex items-center gap-2 group"
          >
            <span className="group-hover:scale-110 transition-transform">🎥</span>
            الفيديوهات
          </button>
          <button
            onClick={() => location === '/' ? scrollToSection('courses') : handleNavigation('/')}
            className="text-sm font-medium text-slate-300 hover:text-white transition-colors duration-300 flex items-center gap-2 group"
          >
            <span className="group-hover:scale-110 transition-transform">📚</span>
            الدورات
          </button>
          <button
            onClick={() => handleNavigation('/blog')}
            className="text-sm font-medium text-slate-300 hover:text-white transition-colors duration-300 flex items-center gap-2 group"
          >
            <span className="group-hover:scale-110 transition-transform">📝</span>
            المدونة
          </button>
          <button
            onClick={() => handleNavigation('/arduino')}
            className="text-sm font-medium text-slate-300 hover:text-white transition-colors duration-300 flex items-center gap-2 group"
          >
            <span className="group-hover:scale-110 transition-transform">⚡</span>
            المحاكي
          </button>
        </div>

        {/* Auth Buttons */}
        <div className="hidden md:flex items-center gap-3">
          {isAuthenticated && user ? (
            <>
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-blue-500/20 border border-blue-500/30">
                <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
                  <span className="text-xs font-bold text-white">
                    {user.name?.charAt(0).toUpperCase() || "U"}
                  </span>
                </div>
                <span className="text-sm font-medium text-slate-200">
                  {user.name || user.email}
                </span>
              </div>
              <Button
                size="sm"
                onClick={handleLogout}
                disabled={logoutMutation.isPending}
                className="gap-2 bg-red-600 hover:bg-red-700 text-white"
              >
                <LogOut className="w-4 h-4" />
                خروج
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate("/login")}
                className="text-slate-300 hover:text-white"
              >
                دخول
              </Button>
              <Button
                size="sm"
                onClick={() => navigate("/signup")}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                إنشاء حساب
              </Button>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden p-2 hover:bg-slate-700/50 rounded-lg transition-colors text-slate-300 hover:text-white"
        >
          {isMenuOpen ? (
            <X className="w-5 h-5" />
          ) : (
            <Menu className="w-5 h-5" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-slate-700 bg-gradient-to-b from-slate-800 to-slate-900">
          <div className="container py-4 space-y-3">
            <button
              onClick={() => handleNavigation('/')}
              className="block w-full text-right px-3 py-2 rounded-lg hover:bg-slate-700/50 text-sm font-medium text-slate-300 hover:text-white transition-colors"
            >
              🏠 الرئيسية
            </button>
            <button
              onClick={() => location === '/' ? scrollToSection('products') : handleNavigation('/')}
              className="block w-full text-right px-3 py-2 rounded-lg hover:bg-slate-700/50 text-sm font-medium text-slate-300 hover:text-white transition-colors"
            >
              🛒 المنتجات
            </button>
            <button
              onClick={() => location === '/' ? scrollToSection('videos') : handleNavigation('/')}
              className="block w-full text-right px-3 py-2 rounded-lg hover:bg-slate-700/50 text-sm font-medium text-slate-300 hover:text-white transition-colors"
            >
              🎥 الفيديوهات
            </button>
            <button
              onClick={() => location === '/' ? scrollToSection('courses') : handleNavigation('/')}
              className="block w-full text-right px-3 py-2 rounded-lg hover:bg-slate-700/50 text-sm font-medium text-slate-300 hover:text-white transition-colors"
            >
              📚 الدورات
            </button>
            <button
              onClick={() => handleNavigation('/blog')}
              className="block w-full text-right px-3 py-2 rounded-lg hover:bg-slate-700/50 text-sm font-medium text-slate-300 hover:text-white transition-colors"
            >
              📝 المدونة
            </button>
            <button
              onClick={() => handleNavigation('/arduino')}
              className="block w-full text-right px-3 py-2 rounded-lg hover:bg-slate-700/50 text-sm font-medium text-slate-300 hover:text-white transition-colors"
            >
              ⚡ المحاكي
            </button>
            <div className="border-t border-slate-700 pt-3 space-y-2">
              {isAuthenticated && user ? (
                <>
                  <div className="px-3 py-2 text-sm font-medium text-foreground">
                    مرحباً، {user.name || user.email}
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleLogout}
                    disabled={logoutMutation.isPending}
                    className="w-full gap-2 justify-center bg-red-600/20 border-red-500/50 hover:bg-red-600/30 text-red-300 hover:text-red-200"
                  >
                    <LogOut className="w-4 h-4" />
                    تسجيل الخروج
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      navigate("/login");
                      setIsMenuOpen(false);
                    }}
                    className="w-full text-slate-300 hover:text-white hover:bg-slate-700/50"
                  >
                    تسجيل الدخول
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => {
                      navigate("/signup");
                      setIsMenuOpen(false);
                    }}
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white"
                  >
                    إنشاء حساب
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
