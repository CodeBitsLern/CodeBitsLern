import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getLoginUrl } from "@/const";
import { useLocation } from "wouter";
import { useEffect } from "react";
import { Code2, ArrowRight, Check } from "lucide-react";

export default function Signup() {
  const { isAuthenticated } = useAuth();
  const [, navigate] = useLocation();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-12 h-12 rounded-lg bg-primary text-primary-foreground flex items-center justify-center">
              <Code2 className="w-7 h-7" />
            </div>
            <h1 className="text-2xl font-bold text-foreground">CodeBitsLern</h1>
          </div>
          <p className="text-muted-foreground">انضم إلى آلاف المتعلمين حول العالم</p>
        </div>

        {/* Signup Card */}
        <Card className="border-border/50 shadow-lg">
          <CardHeader className="space-y-2">
            <CardTitle className="text-2xl">إنشاء حساب جديد</CardTitle>
            <CardDescription>
              ابدأ رحلتك في تعلم البرمجة واحترافها الآن
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* OAuth Button */}
            <a href={getLoginUrl()}>
              <Button
                size="lg"
                className="w-full gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold h-12"
              >
                إنشاء حساب عبر Manus
                <ArrowRight className="w-4 h-4" />
              </Button>
            </a>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">الفوائد</span>
              </div>
            </div>

            {/* Benefits List */}
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-3 h-3 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-foreground text-sm">وصول كامل للدورات</p>
                  <p className="text-xs text-muted-foreground">تعلم من أفضل المدربين</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-3 h-3 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-foreground text-sm">شهادات معترف بها</p>
                  <p className="text-xs text-muted-foreground">أثبت مهاراتك للعالم</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-3 h-3 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-foreground text-sm">مجتمع نشط</p>
                  <p className="text-xs text-muted-foreground">تواصل مع متعلمين آخرين</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-3 h-3 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-foreground text-sm">دعم فني 24/7</p>
                  <p className="text-xs text-muted-foreground">نحن هنا لمساعدتك دائماً</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Login Link */}
        <div className="mt-6 text-center">
          <p className="text-sm text-muted-foreground">
            لديك حساب بالفعل؟{" "}
            <button
              onClick={() => navigate("/login")}
              className="font-semibold text-primary hover:text-primary/80 transition-colors"
            >
              تسجيل الدخول
            </button>
          </p>
        </div>

        {/* Stats */}
        <div className="mt-12 grid grid-cols-2 gap-4">
          <div className="p-4 rounded-lg bg-card border border-border/50 text-center">
            <p className="text-2xl font-bold text-primary mb-1">10K+</p>
            <p className="text-xs text-muted-foreground">متعلم نشط</p>
          </div>
          <div className="p-4 rounded-lg bg-card border border-border/50 text-center">
            <p className="text-2xl font-bold text-primary mb-1">500+</p>
            <p className="text-xs text-muted-foreground">ساعة محتوى</p>
          </div>
        </div>
      </div>
    </div>
  );
}
