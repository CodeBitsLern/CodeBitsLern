import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getLoginUrl } from "@/const";
import { useLocation } from "wouter";
import { useEffect } from "react";
import { Code2, ArrowRight } from "lucide-react";

export default function Login() {
  const { isAuthenticated } = useAuth();
  const [, navigate] = useLocation();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-12 h-12 rounded-lg bg-primary text-primary-foreground flex items-center justify-center">
              <Code2 className="w-7 h-7" />
            </div>
            <h1 className="text-2xl font-bold text-foreground">CodeBitsLern</h1>
          </div>
          <p className="text-muted-foreground">مرحباً بك في منصة التعلم البرمجي الأولى</p>
        </div>

        {/* Login Card */}
        <Card className="border-border/50 shadow-lg">
          <CardHeader className="space-y-2">
            <CardTitle className="text-2xl">تسجيل الدخول</CardTitle>
            <CardDescription>
              استخدم حسابك لتسجيل الدخول والوصول إلى جميع الميزات
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* OAuth Button */}
            <a href={getLoginUrl()}>
              <Button
                size="lg"
                className="w-full gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold h-12"
              >
                تسجيل الدخول عبر Manus
                <ArrowRight className="w-4 h-4" />
              </Button>
            </a>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">أو</span>
              </div>
            </div>

            {/* Info Text */}
            <div className="space-y-3 text-sm text-muted-foreground">
              <p>
                🔐 <span className="font-medium text-foreground">آمن وموثوق</span> - نستخدم تقنيات المصادقة الحديثة
              </p>
              <p>
                ⚡ <span className="font-medium text-foreground">سريع</span> - تسجيل دخول فوري بدون كلمات مرور
              </p>
              <p>
                🛡️ <span className="font-medium text-foreground">محمي</span> - بيانات آمنة وخصوصية مضمونة
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Signup Link */}
        <div className="mt-6 text-center">
          <p className="text-sm text-muted-foreground">
            ليس لديك حساب؟{" "}
            <button
              onClick={() => navigate("/signup")}
              className="font-semibold text-primary hover:text-primary/80 transition-colors"
            >
              إنشاء حساب جديد
            </button>
          </p>
        </div>

        {/* Features Preview */}
        <div className="mt-12 grid grid-cols-3 gap-4 text-center">
          <div className="p-3 rounded-lg bg-card border border-border/50">
            <div className="text-2xl mb-2">📚</div>
            <p className="text-xs font-medium text-foreground">دورات</p>
          </div>
          <div className="p-3 rounded-lg bg-card border border-border/50">
            <div className="text-2xl mb-2">🎥</div>
            <p className="text-xs font-medium text-foreground">فيديوهات</p>
          </div>
          <div className="p-3 rounded-lg bg-card border border-border/50">
            <div className="text-2xl mb-2">💻</div>
            <p className="text-xs font-medium text-foreground">مشاريع</p>
          </div>
        </div>
      </div>
    </div>
  );
}
