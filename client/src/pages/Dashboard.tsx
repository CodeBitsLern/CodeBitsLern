import { useAuth } from "@/_core/hooks/useAuth";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { useEffect } from "react";
import { BookOpen, Play, Code, Award, User, Calendar } from "lucide-react";

export default function Dashboard() {
  const { user, isAuthenticated, loading } = useAuth();
  const [, navigate] = useLocation();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 rounded-full border-4 border-primary/20 border-t-primary animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">جاري التحميل...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <div className="container py-12">
        {/* Welcome Section */}
        <div className="mb-12">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold text-foreground mb-2">
                مرحباً، {user.name || "المستخدم"}! 👋
              </h1>
              <p className="text-lg text-muted-foreground">
                أهلاً وسهلاً في لوحة التحكم الخاصة بك
              </p>
            </div>
            <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
              <span className="text-2xl font-bold text-primary">
                {user.name?.charAt(0).toUpperCase() || "U"}
              </span>
            </div>
          </div>

          {/* User Info Card */}
          <Card className="border-border/50 bg-card/50">
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center">
                    <User className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">الاسم</p>
                    <p className="font-semibold text-foreground">{user.name || "غير محدد"}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">تاريخ الانضمام</p>
                    <p className="font-semibold text-foreground">
                      {new Date(user.createdAt).toLocaleDateString("ar-SA")}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center">
                    <Award className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">المستوى</p>
                    <p className="font-semibold text-foreground">
                      {user.role === "admin" ? "مسؤول" : "مستخدم"}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6">إجراءات سريعة</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="border-border/50 hover:shadow-lg transition-shadow cursor-pointer group">
              <CardContent className="pt-6">
                <div className="w-12 h-12 rounded-lg bg-primary/20 group-hover:bg-primary/30 flex items-center justify-center mb-4 transition-colors">
                  <BookOpen className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-1">الدورات</h3>
                <p className="text-sm text-muted-foreground">استكشف الدورات المتاحة</p>
              </CardContent>
            </Card>

            <Card className="border-border/50 hover:shadow-lg transition-shadow cursor-pointer group">
              <CardContent className="pt-6">
                <div className="w-12 h-12 rounded-lg bg-accent/20 group-hover:bg-accent/30 flex items-center justify-center mb-4 transition-colors">
                  <Play className="w-6 h-6 text-accent-foreground" />
                </div>
                <h3 className="font-semibold text-foreground mb-1">الفيديوهات</h3>
                <p className="text-sm text-muted-foreground">شاهد فيديوهات تعليمية</p>
              </CardContent>
            </Card>

            <Card className="border-border/50 hover:shadow-lg transition-shadow cursor-pointer group">
              <CardContent className="pt-6">
                <div className="w-12 h-12 rounded-lg bg-primary/20 group-hover:bg-primary/30 flex items-center justify-center mb-4 transition-colors">
                  <Code className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-1">المشاريع</h3>
                <p className="text-sm text-muted-foreground">ابدأ مشروع جديد</p>
              </CardContent>
            </Card>

            <Card className="border-border/50 hover:shadow-lg transition-shadow cursor-pointer group">
              <CardContent className="pt-6">
                <div className="w-12 h-12 rounded-lg bg-accent/20 group-hover:bg-accent/30 flex items-center justify-center mb-4 transition-colors">
                  <Award className="w-6 h-6 text-accent-foreground" />
                </div>
                <h3 className="font-semibold text-foreground mb-1">الشهادات</h3>
                <p className="text-sm text-muted-foreground">عرض شهاداتك</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Learning Progress */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6">تقدم التعلم</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="text-lg">الدورات المكتملة</CardTitle>
                <CardDescription>عدد الدورات التي أنهيتها</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-bold text-primary">0</p>
              </CardContent>
            </Card>

            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="text-lg">الفيديوهات المشاهدة</CardTitle>
                <CardDescription>عدد الفيديوهات التي شاهدتها</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-bold text-primary">0</p>
              </CardContent>
            </Card>

            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="text-lg">ساعات التعلم</CardTitle>
                <CardDescription>إجمالي ساعات التعلم</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-bold text-primary">0</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Recommended Courses */}
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-6">دورات موصى بها</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Python من الصفر للاحتراف",
                description: "تعلم البرمجة بلغة Python من البداية",
                icon: "🐍",
                level: "مبتدئ",
              },
              {
                title: "React.js الشاملة",
                description: "بناء تطبيقات ويب حديثة باستخدام React",
                icon: "⚛️",
                level: "متوسط",
              },
              {
                title: "الأمن السيبراني",
                description: "تعلم أساسيات الأمن والـ Ethical Hacking",
                icon: "🔐",
                level: "متقدم",
              },
            ].map((course, idx) => (
              <Card key={idx} className="border-border/50 hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="text-4xl mb-4">{course.icon}</div>
                  <h3 className="font-semibold text-foreground mb-2">{course.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{course.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs px-2 py-1 rounded-full bg-primary/20 text-primary font-medium">
                      {course.level}
                    </span>
                    <Button size="sm" variant="outline">
                      استكشف
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
