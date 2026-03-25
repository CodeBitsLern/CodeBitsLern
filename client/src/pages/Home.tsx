import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Folder, ChevronRight, FileText, Download } from 'lucide-react';

// ===== PRODUCTS DATA =====
const products = [
  {
    id: 1,
    title: "دورة Python من الصفر للاحتراف",
    category: "video",
    price: 29,
    oldPrice: 49,
    description: "تعلم Python بشكل كامل من المبادئ الأساسية حتى المشاريع الاحترافية",
    icon: "🎥",
    meta: "40 ساعة"
  },
  {
    id: 2,
    title: "نظام إدارة المتجر الإلكتروني",
    category: "software",
    price: 79,
    description: "برنامج متكامل لإدارة المنتجات والطلبات والعملاء بواجهة سهلة",
    icon: "💻",
    meta: "v2.5"
  },
  {
    id: 3,
    title: "قالب موقع Portfolio احترافي",
    category: "code",
    price: 19,
    description: "قالب HTML/CSS/JS كامل لموقع محفظة أعمال احترافي مع تصميم عصري",
    icon: "📄",
    meta: "HTML/CSS/JS"
  },
  {
    id: 4,
    title: "دورة React.js الشاملة",
    category: "video",
    price: 35,
    oldPrice: 59,
    description: "احترف بناء تطبيقات الويب الحديثة باستخدام React.js وأحدث التقنيات",
    icon: "⚛️",
    meta: "35 ساعة"
  },
  {
    id: 5,
    title: "API للمصادقة وإدارة المستخدمين",
    category: "code",
    price: 25,
    description: "كود Node.js كامل لنظام تسجيل الدخول والتسجيل مع JWT وتشفير كامل",
    icon: "🔐",
    meta: "Node.js"
  },
  {
    id: 6,
    title: "أداة تحليل وتحسين الكود",
    category: "software",
    price: 45,
    description: "أداة ذكية لتحليل جودة الكود واقتراح التحسينات تلقائياً",
    icon: "🔍",
    meta: "v1.8"
  },
  {
    id: 7,
    title: "دورة JavaScript المتقدمة",
    category: "video",
    price: 32,
    oldPrice: 52,
    description: "تعمق في JavaScript المتقدم مع أفضل الممارسات والتقنيات الحديثة",
    icon: "📚",
    meta: "38 ساعة"
  },
  {
    id: 8,
    title: "قالب لوحة تحكم Admin",
    category: "code",
    price: 35,
    description: "قالب لوحة تحكم كامل مع رسوم بيانية وإدارة مستخدمين",
    icon: "📊",
    meta: "React/Tailwind"
  }
];

// ===== COURSES DATA WITH FOLDER STRUCTURE =====
const courseCategories = [
  {
    id: 1,
    name: "تطوير الويب",
    icon: "🌐",
    description: "HTML, CSS, JavaScript, React, Node.js",
    count: 12,
    courses: [
      { id: 101, title: "HTML الأساسيات", level: "مبتدئ" },
      { id: 102, title: "CSS المتقدم", level: "متوسط" },
      { id: 103, title: "JavaScript من الصفر", level: "مبتدئ" },
      { id: 104, title: "React للمبتدئين", level: "متوسط" }
    ]
  },
  {
    id: 2,
    name: "Python والذكاء الاصطناعي",
    icon: "🐍",
    description: "Python, ML, Deep Learning, Data Science",
    count: 18,
    courses: [
      { id: 201, title: "Python الأساسيات", level: "مبتدئ" },
      { id: 202, title: "مكتبة Pandas", level: "متوسط" },
      { id: 203, title: "Machine Learning", level: "متقدم" }
    ]
  },
  {
    id: 3,
    name: "الأردوينو والإلكترونيات",
    icon: "⚡",
    description: "الأردوينو، الدوائر الإلكترونية، المشاريع العملية",
    count: 8,
    courses: [
      { id: 301, title: "مقدمة في الأردوينو", level: "مبتدئ" },
      { id: 302, title: "الدوائر الإلكترونية الأساسية", level: "مبتدئ" },
      { id: 303, title: "مشاريع عملية مع الأردوينو", level: "متوسط" }
    ],
    hasGuide: true,
    guidePdf: "https://d2xsxph8kpxj0f.cloudfront.net/310519663468821472/AgZazcxMHr4gj4EXiFKxW4/arduino_guide_f39df1c4.pdf"
  },
  {
    id: 4,
    name: "تطوير التطبيقات",
    icon: "📱",
    description: "Flutter, React Native, Swift, Kotlin",
    count: 10,
    courses: [
      { id: 401, title: "Flutter للمبتدئين", level: "مبتدئ" },
      { id: 402, title: "React Native", level: "متوسط" }
    ]
  },
  {
    id: 5,
    name: "الأمن السيبراني",
    icon: "🔐",
    description: "Ethical Hacking, Security, Penetration Testing",
    count: 8,
    courses: [
      { id: 501, title: "أساسيات الأمن", level: "مبتدئ" },
      { id: 502, title: "Ethical Hacking", level: "متقدم" }
    ]
  }
];

export default function Home() {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedCourse, setSelectedCourse] = useState<typeof courseCategories[0] | null>(null);
  const [cart, setCart] = useState<any[]>([]);
  const [cartOpen, setCartOpen] = useState(false);

  const filteredProducts = selectedFilter === 'all' 
    ? products 
    : products.filter(p => p.category === selectedFilter);

  const handleAddToCart = (product: typeof products[0]) => {
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
      setCart(cart.map(item => 
        item.id === product.id 
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100" dir="rtl">
      {/* ===== HEADER ===== */}
      <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">💻</span>
            <h1 className="text-2xl font-bold text-slate-900">CodeBitsLern</h1>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <a href="#products" className="text-slate-700 hover:text-slate-900 font-medium">المتجر</a>
            <a href="#courses" className="text-slate-700 hover:text-slate-900 font-medium">الدورات</a>
            <button 
              onClick={() => setCartOpen(true)}
              className="relative p-2 hover:bg-slate-100 rounded-lg transition"
            >
              <span className="text-xl">🛒</span>
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
          </nav>
        </div>
      </header>

      {/* ===== HERO SECTION ===== */}
      <section className="py-16 px-4 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">مرحباً بك في CodeBitsLern</h2>
          <p className="text-xl text-blue-100 mb-8">متجرك الأول لتعلم البرمجة واحتراف التطوير</p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Button className="bg-white text-blue-600 hover:bg-blue-50">تصفح المتجر</Button>
            <Button variant="outline" className="border-white text-white hover:bg-blue-700">شاهد الدورات</Button>
          </div>
        </div>
      </section>

      {/* ===== PRODUCTS SECTION ===== */}
      <section id="products" className="py-16 px-4 relative" style={{
        backgroundImage: 'url(https://d2xsxph8kpxj0f.cloudfront.net/310519663468821472/AgZazcxMHr4gj4EXiFKxW4/youth_electronics_workshop-bdtcxFaBMaGJpEUa77GwVY.webp)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}>
        {/* Overlay for better text readability */}
        {/* No overlay for natural colors */}
        <div className="max-w-7xl mx-auto relative z-10">
          <h2 className="text-3xl font-bold text-slate-900 mb-8">المنتجات</h2>
          
          {/* Filter Buttons */}
          <div className="flex gap-3 mb-8 flex-wrap">
            {['all', 'video', 'code', 'software'].map(filter => (
              <button
                key={filter}
                onClick={() => setSelectedFilter(filter)}
                className={`px-6 py-2 rounded-lg font-medium transition ${
                  selectedFilter === filter
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-slate-700 border border-slate-300 hover:border-blue-600'
                }`}
              >
                {filter === 'all' ? 'الكل' : filter === 'video' ? 'فيديوهات' : filter === 'code' ? 'أكواد' : 'برامج'}
              </button>
            ))}
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map(product => (
              <div key={product.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition overflow-hidden">
                <div className="p-4 bg-gradient-to-b from-slate-100 to-slate-50 text-4xl text-center">
                  {product.icon}
                </div>
                <div className="p-4">
                  <div className="text-sm text-slate-500 mb-2">{product.meta}</div>
                  <h3 className="font-bold text-slate-900 mb-2">{product.title}</h3>
                  <p className="text-sm text-slate-600 mb-4">{product.description}</p>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      {product.oldPrice && <span className="text-sm line-through text-slate-400">${product.oldPrice}</span>}
                      <span className="font-bold text-lg text-slate-900">${product.price}</span>
                    </div>
                    <span className="text-sm text-slate-500">⭐ 4.8</span>
                  </div>
                  <Button 
                    onClick={() => handleAddToCart(product)}
                    className="w-full bg-blue-600 hover:bg-blue-700"
                  >
                    🛒 أضف للسلة
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== COURSES SECTION (FOLDER VIEW) ===== */}
      <section id="courses" className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 mb-8">الدورات التعليمية</h2>
          <p className="text-slate-600 mb-8">انقر على أي مجلد لعرض الدورات بداخله</p>
          
          {/* Courses Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courseCategories.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCourse(category)}
                className="group relative bg-gradient-to-br from-slate-50 to-slate-100 border-2 border-slate-300 rounded-lg p-6 hover:border-blue-500 hover:shadow-lg transition text-right"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="text-5xl">{category.icon}</div>
                  <ChevronRight className="w-6 h-6 text-slate-400 group-hover:text-blue-600 transition" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">{category.name}</h3>
                <p className="text-sm text-slate-600 mb-4">{category.description}</p>
                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <Folder className="w-4 h-4" />
                  <span>{category.count} دورة</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ===== MODAL FOR COURSE DETAILS ===== */}
      <Dialog open={!!selectedCourse} onOpenChange={() => setSelectedCourse(null)}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto" dir="rtl">
          <DialogHeader>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-4xl">{selectedCourse?.icon}</span>
              <DialogTitle>{selectedCourse?.name}</DialogTitle>
            </div>
          </DialogHeader>
          
          <div className="space-y-4">
            <p className="text-slate-600">{selectedCourse?.description}</p>
            
            {/* Courses List */}
            <div className="space-y-2">
              <h4 className="font-bold text-slate-900 mb-3">الدورات المتاحة:</h4>
              {selectedCourse?.courses.map(course => (
                <div key={course.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition">
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-blue-600" />
                    <div className="text-right">
                      <p className="font-medium text-slate-900">{course.title}</p>
                      <p className="text-sm text-slate-500">{course.level}</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">عرض</Button>
                </div>
              ))}
            </div>

            {/* Arduino Guide PDF */}
            {selectedCourse?.hasGuide && (
              <div className="mt-6 p-4 bg-blue-50 border-2 border-blue-200 rounded-lg">
                <h4 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <span>📚</span> دليل تعليمي مفصل
                </h4>
                <p className="text-slate-600 mb-4">دليل شامل عن الأردوينو والدوائر الإلكترونية مبسط للطلاب (12-15 سنة)</p>
                <a
                  href={selectedCourse.guidePdf}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
                >
                  <Download className="w-4 h-4" />
                  تحميل الدليل (PDF)
                </a>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* ===== CART SIDEBAR ===== */}
      <Dialog open={cartOpen} onOpenChange={setCartOpen}>
        <DialogContent className="max-w-md max-h-[80vh] overflow-y-auto" dir="rtl">
          <DialogHeader>
            <DialogTitle>🛒 السلة</DialogTitle>
          </DialogHeader>
          
          {cart.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-slate-600">السلة فارغة</p>
            </div>
          ) : (
            <div className="space-y-4">
              {cart.map(item => (
                <div key={item.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                  <div className="text-right flex-1">
                    <p className="font-medium text-slate-900">{item.title}</p>
                    <p className="text-sm text-slate-600">${item.price} × {item.quantity}</p>
                  </div>
                  <button
                    onClick={() => setCart(cart.filter(i => i.id !== item.id))}
                    className="text-red-600 hover:text-red-700 font-bold"
                  >
                    ✕
                  </button>
                </div>
              ))}
              
              <div className="border-t pt-4 mt-4">
                <div className="flex justify-between items-center mb-4">
                  <span className="font-bold text-slate-900">المجموع:</span>
                  <span className="text-2xl font-bold text-blue-600">${cartTotal}</span>
                </div>
                <Button className="w-full bg-blue-600 hover:bg-blue-700">إتمام الشراء</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* ===== FOOTER ===== */}
      <footer className="bg-slate-900 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h4 className="font-bold mb-4">CodeBitsLern</h4>
              <p className="text-slate-400">منصتك الأولى لتعلم البرمجة واحتراف التطوير</p>
            </div>
            <div>
              <h4 className="font-bold mb-4">روابط سريعة</h4>
              <ul className="space-y-2 text-slate-400">
                <li><a href="#products" className="hover:text-white transition">المتجر</a></li>
                <li><a href="#courses" className="hover:text-white transition">الدورات</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">التواصل</h4>
              <p className="text-slate-400">support@codebitslern.com</p>
            </div>
          </div>
           <div className="border-t border-slate-800 pt-8 text-center text-slate-400">
            <p>© 2025 CodeBitsLern. جميع الحقوق محفوظة.</p>
          </div>
        </div>
      </footer>

      {/* ===== OWNERSHIP BAR ===== */}
      <style>{`
        @keyframes scrollLeft {
          0% {
            transform: translateX(100%);
          }
          100% {
            transform: translateX(-100%);
          }
        }
        .scrolling-text {
          animation: scrollLeft 8s linear infinite;
          white-space: nowrap;
          display: inline-block;
        }
      `}</style>
      <div className="bg-slate-950 text-white py-3 px-4 overflow-hidden">
        <p className="text-sm font-medium scrolling-text">Owned by Ahmad Taleb</p>
      </div>
    </div>
  );
}
