import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { trpc } from "@/lib/trpc";
import { getLoginUrl } from "@/const";
import { LogOut, Menu, X, Code2 } from "lucide-react";
import { useState } from "react";
import { useLocation } from "wouter";

export default function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [, navigate] = useLocation();
  const logoutMutation = trpc.auth.logout.useMutation();

  const handleLogout = async () => {
    await logoutMutation.mutateAsync();
    setIsMenuOpen(false);
    navigate("/login");
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary text-primary-foreground">
            <Code2 className="w-6 h-6" />
          </div>
          <span className="hidden sm:inline font-bold text-lg text-foreground">
            CodeBitsLern
          </span>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <a href="/" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
            الرئيسية
          </a>
          <a href="#features" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
            الميزات
          </a>
          <a href="#about" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
            عن التطبيق
          </a>
        </div>

        {/* Auth Buttons */}
        <div className="hidden md:flex items-center gap-3">
          {isAuthenticated && user ? (
            <>
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-secondary/50">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                  <span className="text-xs font-bold text-primary">
                    {user.name?.charAt(0).toUpperCase() || "U"}
                  </span>
                </div>
                <span className="text-sm font-medium text-foreground">
                  {user.name || user.email}
                </span>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                disabled={logoutMutation.isPending}
                className="gap-2"
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
                onClick={() => navigate("/login")}
              >
                تسجيل الدخول
              </Button>
              <Button
                size="sm"
                onClick={() => navigate("/signup")}
              >
                إنشاء حساب
              </Button>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden p-2 hover:bg-secondary rounded-lg transition-colors"
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
        <div className="md:hidden border-t border-border bg-background">
          <div className="container py-4 space-y-3">
            <a
              href="/"
              className="block px-3 py-2 rounded-lg hover:bg-secondary text-sm font-medium transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              الرئيسية
            </a>
            <a
              href="#features"
              className="block px-3 py-2 rounded-lg hover:bg-secondary text-sm font-medium transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              الميزات
            </a>
            <a
              href="#about"
              className="block px-3 py-2 rounded-lg hover:bg-secondary text-sm font-medium transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              عن التطبيق
            </a>

            <div className="border-t border-border pt-3 space-y-2">
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
                    className="w-full gap-2 justify-center"
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
                    className="w-full"
                  >
                    تسجيل الدخول
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => {
                      navigate("/signup");
                      setIsMenuOpen(false);
                    }}
                    className="w-full"
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
