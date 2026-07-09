import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Folder, ChevronRight, FileText, Download, PlayCircle, Star, TrendingUp, Zap } from 'lucide-react';

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

// ===== VIDEOS DATA WITH FOLDER STRUCTURE =====
const videoCategories = [
  {
    id: 1,
    name: "فيديوهات تطوير الويب",
    icon: "🌐",
    description: "فيديوهات شاملة عن HTML, CSS, JavaScript, React",
    count: 15,
    courses: [
      { id: 1001, title: "مقدمة في HTML", level: "مبتدئ" },
      { id: 1002, title: "CSS المتقدم والتصميم", level: "متوسط" },
      { id: 1003, title: "JavaScript من الصفر", level: "مبتدئ" },
      { id: 1004, title: "React عملي", level: "متوسط" },
      { id: 1005, title: "Node.js والـ Backend", level: "متقدم" }
    ]
  },
  {
    id: 2,
    name: "فيديوهات Python والذكاء الاصطناعي",
    icon: "🐍",
    description: "فيديوهات عملية عن Python وتطبيقات الذكاء الاصطناعي",
    count: 20,
    courses: [
      { id: 2001, title: "Python الأساسيات", level: "مبتدئ" },
      { id: 2002, title: "مكتبة NumPy و Pandas", level: "متوسط" },
      { id: 2003, title: "Machine Learning عملي", level: "متقدم" },
      { id: 2004, title: "Deep Learning والشبكات العصبية", level: "متقدم" }
    ]
  },
  {
    id: 3,
    name: "أردوينو",
    icon: "⚡",
    description: "فيديوهات تعليمية شاملة عن الأردوينو والحساسات والدوائر الإلكترونية",
    count: 1,
    courses: [
      { 
        id: 3001, 
        title: "أجزاء الأردوينو || Arduino Components", 
        level: "مبتدئ",
        isVideo: true,
        videoUrl: "https://www.youtube.com/embed/AhBBJZxLJ10",
        descriptionAr: "فيديو تعليمي يشرح مكونات لوحة الأردوينو UNO، المعالج، والمنافذ الرقمية والتماثلية وكيفية البدء في البرمجة.",
        descriptionEn: "Educational video explaining Arduino UNO components, microcontroller, digital/analog pins, and how to start programming."
      }
    ]
  },
  {
    id: 4,
    name: "فيديوهات تطوير التطبيقات",
    icon: "📱",
    description: "فيديوهات عن Flutter, React Native والتطبيقات الجوالة",
    count: 14,
    courses: [
      { id: 4001, title: "Flutter للمبتدئين", level: "مبتدئ" },
      { id: 4002, title: "Dart البرمجية", level: "متوسط" },
      { id: 4003, title: "React Native", level: "متوسط" },
      { id: 4004, title: "نشر التطبيقات", level: "متقدم" }
    ]
  },
  {
    id: 5,
    name: "فيديوهات الأمن السيبراني",
    icon: "🔐",
    description: "فيديوهات عن الأمن والـ Ethical Hacking",
    count: 10,
    courses: [
      { id: 5001, title: "أساسيات الأمن السيبراني", level: "مبتدئ" },
      { id: 5002, title: "Ethical Hacking", level: "متقدم" },
      { id: 5003, title: "اختبار الاختراق", level: "متقدم" }
    ]
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
      { id: 303, title: "مشاريع عملية مع الأردوينو", level: "متوسط" },
      { 
        id: 304, 
        title: "شرح دارة الأردوينو والحساسات - Arduino Circuits & Sensors", 
        level: "مبتدئ",
        isVideo: true,
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        descriptionAr: "شرح مبسط لأجزاء الأردوينو، الحساسات، وكيفية عمل الدارات الإلكترونية.",
        descriptionEn: "Simple explanation of Arduino parts, sensors, and how electronic circuits work."
      }
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
  const [selectedVideo, setSelectedVideo] = useState<typeof videoCategories[0] | null>(null);
  const [activeVideo, setActiveVideo] = useState<any>(null);
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
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-blue-50 to-slate-100" dir="rtl" style={{ scrollBehavior: 'smooth' }}>
      {/* ===== HEADER ===== */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md shadow-md border-b-2 border-blue-100">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-blue-600 to-blue-700 p-2 rounded-lg">
              <span className="text-2xl">💻</span>
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">CodeBitsLern</h1>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <a href="#/products" className="text-slate-700 hover:text-blue-600 font-medium transition duration-300 relative group">
              المتجر
              <span className="absolute bottom-0 right-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
            </a>
            <a href="#/videos" className="text-slate-700 hover:text-blue-600 font-medium transition duration-300 relative group">
              الفيديوهات
              <span className="absolute bottom-0 right-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
            </a>
            <a href="#/courses" className="text-slate-700 hover:text-blue-600 font-medium transition duration-300 relative group">
              الدورات
              <span className="absolute bottom-0 right-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
            </a>
            <button 
              onClick={() => setCartOpen(true)}
              className="relative p-2 hover:bg-blue-50 rounded-lg transition duration-300 group"
            >
              <span className="text-xl group-hover:scale-110 transition-transform duration-300">🛒</span>
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-lg">
                  {cartCount}
                </span>
              )}
            </button>
          </nav>
        </div>
      </header>

      {/* ===== HERO SECTION ===== */}
      <section className="relative py-20 px-4 bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 text-white overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>
        
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="mb-6 inline-block">
            <span className="text-6xl animate-bounce">🚀</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold mb-4 leading-tight">مرحباً بك في CodeBitsLern</h2>
          <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-2xl mx-auto">منصتك الأول لتعلم البرمجة واحتراف التطوير مع أفضل المحتوى التعليمي</p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Button className="bg-white text-blue-600 hover:bg-blue-50 font-bold text-lg px-8 py-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              تصفح المتجر
            </Button>
            <Button variant="outline" className="border-2 border-white text-white hover:bg-blue-700 font-bold text-lg px-8 py-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              شاهد الفيديوهات
            </Button>
          </div>
        </div>
      </section>

      {/* ===== STATS SECTION ===== */}
      <section className="py-12 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { icon: '📚', label: 'دورة تعليمية', value: '68+' },
              { icon: '🎥', label: 'فيديو تعليمي', value: '70+' },
              { icon: '💻', label: 'مشروع عملي', value: '100+' },
              { icon: '⭐', label: 'تقييم المستخدمين', value: '4.8/5' }
            ].map((stat, idx) => (
              <div key={idx} className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6 text-center hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                <div className="text-4xl mb-3">{stat.icon}</div>
                <div className="text-3xl font-bold text-blue-600 mb-2">{stat.value}</div>
                <div className="text-slate-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PRODUCTS SECTION ===== */}
      <section id="products" className="py-16 px-4 relative bg-gradient-to-b from-white to-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <h2 className="text-4xl font-bold text-slate-900 mb-3 flex items-center gap-3">
              <span className="text-5xl">🛍️</span>
              المنتجات المميزة
            </h2>
            <p className="text-slate-600 text-lg">اختر من مجموعة واسعة من الدورات والأكواد والبرامج</p>
          </div>
          
          {/* Filter Buttons */}
          <div className="flex gap-3 mb-10 flex-wrap">
            {['all', 'code', 'software', 'video'].map(filter => (
              <button
                key={filter}
                onClick={() => setSelectedFilter(filter)}
                className={`px-6 py-3 rounded-lg font-bold transition-all duration-300 transform hover:scale-105 ${
                  selectedFilter === filter
                    ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg'
                    : 'bg-white text-slate-700 border-2 border-slate-300 hover:border-blue-600 hover:shadow-md'
                }`}
              >
                {filter === 'all' ? 'الكل' : filter === 'code' ? 'أكواد' : filter === 'software' ? 'برامج' : 'فيديوهات'}
              </button>
            ))}
            <a
              href="#/videos"
              className="px-6 py-3 rounded-lg font-bold transition-all duration-300 transform hover:scale-105 bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:shadow-lg border-0 inline-flex items-center gap-2"
            >
              🎥 الفيديوهات التعليمية
            </a>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map(product => (
              <div key={product.id} className="bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden transform hover:scale-105 group">
                <div className="p-6 bg-gradient-to-b from-blue-50 to-slate-50 text-5xl text-center group-hover:scale-110 transition-transform duration-300">
                  {product.icon}
                </div>
                <div className="p-5">
                  <div className="text-sm text-blue-600 font-bold mb-2 flex items-center gap-1">
                    <Zap className="w-4 h-4" />
                    {product.meta}
                  </div>
                  <h3 className="font-bold text-slate-900 mb-2 text-lg line-clamp-2">{product.title}</h3>
                  <p className="text-sm text-slate-600 mb-4 line-clamp-2">{product.description}</p>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      {product.oldPrice && <span className="text-sm line-through text-slate-400">${product.oldPrice}</span>}
                      <span className="font-bold text-xl text-blue-600">${product.price}</span>
                    </div>
                    <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-lg">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-bold text-slate-700">4.8</span>
                    </div>
                  </div>
                  <Button 
                    onClick={() => handleAddToCart(product)}
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 font-bold py-2 transition-all duration-300 transform hover:scale-105"
                  >
                    🛒 أضف للسلة
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== VIDEOS SECTION (FOLDER VIEW) ===== */}
      <section id="videos" className="py-16 px-4 bg-gradient-to-b from-blue-50 to-white border-t-4 border-blue-500">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <h2 className="text-4xl font-bold text-blue-900 mb-3 flex items-center gap-3">
              <span className="text-5xl">🎥</span>
              الفيديوهات التعليمية
            </h2>
            <p className="text-slate-600 text-lg">مجموعة من الفيديوهات المبسطة والمباشرة للمبتدئين والمحترفين</p>
            <p className="text-blue-600 font-bold mt-3 flex items-center gap-2">
              <span className="text-2xl">✅</span>
              انقر على أي مجلد لعرض الفيديوهات بداخله
            </p>
          </div>
          
          {/* Videos Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {videoCategories.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedVideo(category)}
                className="group relative bg-white border-2 border-slate-300 rounded-xl p-6 hover:border-blue-500 hover:shadow-2xl transition-all duration-300 text-right transform hover:scale-105 overflow-hidden"
              >
                {/* Background gradient on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-4">
                    <div className="text-5xl group-hover:scale-110 transition-transform duration-300">{category.icon}</div>
                    <ChevronRight className="w-6 h-6 text-slate-400 group-hover:text-blue-600 transition-all duration-300 transform group-hover:translate-x-1" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">{category.name}</h3>
                  <p className="text-sm text-slate-600 mb-4">{category.description}</p>
                  <div className="flex items-center gap-2 text-sm text-slate-500 bg-slate-50 group-hover:bg-blue-50 px-3 py-2 rounded-lg transition-colors duration-300 w-fit">
                    <Folder className="w-4 h-4" />
                    <span className="font-bold">{category.count} فيديو</span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ===== COURSES SECTION (FOLDER VIEW) ===== */}
      <section id="courses" className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <h2 className="text-4xl font-bold text-slate-900 mb-3 flex items-center gap-3">
              <span className="text-5xl">📚</span>
              الدورات التعليمية
            </h2>
            <p className="text-slate-600 text-lg">دورات شاملة ومتقدمة في جميع المجالات</p>
            <p className="text-blue-600 font-bold mt-3">انقر على أي مجلد لعرض الدورات بداخله</p>
          </div>
          
          {/* Courses Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courseCategories.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCourse(category)}
                className="group relative bg-gradient-to-br from-slate-50 to-slate-100 border-2 border-slate-300 rounded-xl p-6 hover:border-blue-500 hover:shadow-2xl transition-all duration-300 text-right transform hover:scale-105 overflow-hidden"
              >
                {/* Background gradient on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-4">
                    <div className="text-5xl group-hover:scale-110 transition-transform duration-300">{category.icon}</div>
                    <ChevronRight className="w-6 h-6 text-slate-400 group-hover:text-blue-600 transition-all duration-300 transform group-hover:translate-x-1" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">{category.name}</h3>
                  <p className="text-sm text-slate-600 mb-4">{category.description}</p>
                  <div className="flex items-center gap-2 text-sm text-slate-500 bg-slate-100 group-hover:bg-blue-50 px-3 py-2 rounded-lg transition-colors duration-300 w-fit">
                    <Folder className="w-4 h-4" />
                    <span className="font-bold">{category.count} دورة</span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ===== MODAL FOR VIDEO DETAILS ===== */}
      <Dialog open={!!selectedVideo} onOpenChange={() => { setSelectedVideo(null); setActiveVideo(null); }}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto" dir="rtl">
          <DialogHeader>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-4xl">{selectedVideo?.icon}</span>
              <DialogTitle className="text-2xl">{selectedVideo?.name}</DialogTitle>
            </div>
          </DialogHeader>
          
          <div className="space-y-6">
            <p className="text-slate-600 text-lg">{selectedVideo?.description}</p>
            
            {/* Video Player Section */}
            {activeVideo && (
              <div className="bg-black rounded-lg overflow-hidden shadow-xl aspect-video relative">
                <iframe
                  width="100%"
                  height="100%"
                  src={`${activeVideo.videoUrl}?controls=1&rel=0&modestbranding=1`}
                  title={activeVideo.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                ></iframe>
                <div className="absolute inset-0 pointer-events-none" onContextMenu={(e) => e.preventDefault()}></div>
              </div>
            )}

            {/* Videos List */}
            <div className="space-y-2">
              <h4 className="font-bold text-slate-900 mb-3 text-lg">الفيديوهات المتاحة:</h4>
              {selectedVideo?.courses.map(video => (
                <div key={video.id} className={`p-4 rounded-lg transition border-2 ${activeVideo?.id === video.id ? 'bg-blue-50 border-blue-400 shadow-md' : 'bg-slate-50 border-transparent hover:bg-slate-100'}`}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <PlayCircle className={`w-6 h-6 ${activeVideo?.id === video.id ? 'text-blue-600' : 'text-slate-400'}`} />
                      <div className="text-right">
                        <p className="font-bold text-slate-900">{video.title}</p>
                        <p className="text-sm text-slate-500">{video.level}</p>
                      </div>
                    </div>
                    <Button 
                      variant={activeVideo?.id === video.id ? "default" : "outline"} 
                      size="sm"
                      onClick={() => setActiveVideo(video)}
                      className="transition-all duration-300"
                    >
                      {activeVideo?.id === video.id ? '▶️ يعرض الآن' : '▶️ تشغيل'}
                    </Button>
                  </div>
                  {video.descriptionAr && (
                    <div className="mt-3 space-y-2 text-sm border-t pt-3 border-slate-200">
                      <p className="text-slate-700 leading-relaxed"><span className="font-bold text-blue-600">🇸🇦 العربية:</span> {video.descriptionAr}</p>
                      <p className="text-slate-600 leading-relaxed italic"><span className="font-bold text-blue-600">🇬🇧 English:</span> {video.descriptionEn}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Arduino Guide PDF */}
            {selectedVideo?.hasGuide && (
              <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-blue-100 border-2 border-blue-200 rounded-lg">
                <h4 className="font-bold text-slate-900 mb-3 flex items-center gap-2 text-lg">
                  <span>📚</span> دليل تعليمي مفصل
                </h4>
                <p className="text-slate-600 mb-4">دليل شامل عن الأردوينو والدوائر الإلكترونية مبسط للطلاب (12-15 سنة)</p>
                <a
                  href={selectedVideo.guidePdf}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 font-bold shadow-md hover:shadow-lg transform hover:scale-105"
                >
                  <Download className="w-4 h-4" />
                  تحميل الدليل (PDF)
                </a>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* ===== MODAL FOR COURSE DETAILS ===== */}
      <Dialog open={!!selectedCourse} onOpenChange={() => setSelectedCourse(null)}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto" dir="rtl">
          <DialogHeader>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-4xl">{selectedCourse?.icon}</span>
              <DialogTitle className="text-2xl">{selectedCourse?.name}</DialogTitle>
            </div>
          </DialogHeader>
          
          <div className="space-y-4">
            <p className="text-slate-600 text-lg">{selectedCourse?.description}</p>
            
            {/* Video Player for Course Videos */}
            {selectedCourse?.courses.some(c => c.isVideo) && (
              <div className="bg-black rounded-lg overflow-hidden shadow-xl aspect-video relative mb-6">
                <iframe
                  width="100%"
                  height="100%"
                  src={`${selectedCourse?.courses.find(c => c.isVideo)?.videoUrl}?controls=1&rel=0&modestbranding=1`}
                  title={selectedCourse?.courses.find(c => c.isVideo)?.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                ></iframe>
                <div className="absolute inset-0 pointer-events-none" onContextMenu={(e) => e.preventDefault()}></div>
              </div>
            )}

            {/* Courses List */}
            <div className="space-y-2">
              <h4 className="font-bold text-slate-900 mb-3 text-lg">الدورات والفيديوهات المتاحة:</h4>
              {selectedCourse?.courses.map(course => (
                <div key={course.id} className="flex items-center justify-between p-4 bg-gradient-to-r from-slate-50 to-blue-50 rounded-lg hover:shadow-md transition-all duration-300 border border-slate-200">
                  <div className="flex items-center gap-3">
                    {course.isVideo ? (
                      <PlayCircle className="w-5 h-5 text-red-600" />
                    ) : (
                      <FileText className="w-5 h-5 text-blue-600" />
                    )}
                    <div className="text-right">
                      <p className="font-bold text-slate-900">{course.title}</p>
                      <p className="text-sm text-slate-500">{course.level}</p>
                      {course.descriptionAr && (
                        <p className="text-xs text-slate-600 mt-1">{course.descriptionAr}</p>
                      )}
                    </div>
                  </div>
                  <Button variant="outline" size="sm" disabled className="font-bold">✓ مضمن</Button>
                </div>
              ))}
            </div>

            {/* Arduino Guide PDF */}
            {selectedCourse?.hasGuide && (
              <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-blue-100 border-2 border-blue-200 rounded-lg">
                <h4 className="font-bold text-slate-900 mb-3 flex items-center gap-2 text-lg">
                  <span>📚</span> دليل تعليمي مفصل
                </h4>
                <p className="text-slate-600 mb-4">دليل شامل عن الأردوينو والدوائر الإلكترونية مبسط للطلاب (12-15 سنة)</p>
                <a
                  href={selectedCourse.guidePdf}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 font-bold shadow-md hover:shadow-lg transform hover:scale-105"
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
            <DialogTitle className="text-2xl">🛒 السلة ({cartCount})</DialogTitle>
          </DialogHeader>
          
          {cart.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🛍️</div>
              <p className="text-slate-600 text-lg font-medium">السلة فارغة</p>
              <p className="text-slate-500 mt-2">ابدأ بإضافة المنتجات الآن!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {cart.map(item => (
                <div key={item.id} className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-slate-50 rounded-lg border border-blue-200 hover:shadow-md transition-all duration-300">
                  <div className="text-right flex-1">
                    <p className="font-bold text-slate-900">{item.title}</p>
                    <p className="text-sm text-slate-600 font-medium">${item.price} × {item.quantity} = <span className="text-blue-600 font-bold">${item.price * item.quantity}</span></p>
                  </div>
                  <button
                    onClick={() => setCart(cart.filter(i => i.id !== item.id))}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50 font-bold p-2 rounded-lg transition-all duration-300 transform hover:scale-110"
                  >
                    ✕
                  </button>
                </div>
              ))}
              
              <div className="border-t-2 border-slate-300 pt-4 mt-4">
                <div className="flex justify-between items-center mb-4 bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-lg">
                  <span className="font-bold text-slate-900 text-lg">المجموع:</span>
                  <span className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">${cartTotal}</span>
                </div>
                <Button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 font-bold text-lg py-6 transition-all duration-300 transform hover:scale-105 shadow-lg">
                  ✓ إتمام الشراء
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* ===== FOOTER ===== */}
      <footer className="bg-gradient-to-r from-slate-900 to-slate-800 text-white py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-3xl">💻</span>
                <h4 className="font-bold text-xl">CodeBitsLern</h4>
              </div>
              <p className="text-slate-400 leading-relaxed">منصتك الأولى لتعلم البرمجة واحتراف التطوير مع أفضل المحتوى التعليمي</p>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-lg">روابط سريعة</h4>
              <ul className="space-y-2 text-slate-400">
                <li><a href="#/products" className="hover:text-white transition-colors duration-300 flex items-center gap-2"><span>→</span>المتجر</a></li>
                <li><a href="#/videos" className="hover:text-white transition-colors duration-300 flex items-center gap-2"><span>→</span>الفيديوهات</a></li>
                <li><a href="#/courses" className="hover:text-white transition-colors duration-300 flex items-center gap-2"><span>→</span>الدورات</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-lg">التواصل</h4>
              <p className="text-slate-400 flex items-center gap-2">
                <span>📧</span>
                support@codebitslern.com
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-lg">تابعنا</h4>
              <div className="flex gap-3">
                <a href="#" className="w-10 h-10 bg-slate-700 hover:bg-blue-600 rounded-lg flex items-center justify-center transition-colors duration-300">f</a>
                <a href="#" className="w-10 h-10 bg-slate-700 hover:bg-blue-600 rounded-lg flex items-center justify-center transition-colors duration-300">𝕏</a>
                <a href="#" className="w-10 h-10 bg-slate-700 hover:bg-blue-600 rounded-lg flex items-center justify-center transition-colors duration-300">📺</a>
              </div>
            </div>
          </div>
          <div className="border-t border-slate-700 pt-8 text-center text-slate-400">
            <p className="font-medium">© 2025 CodeBitsLern. جميع الحقوق محفوظة. | تم التطوير بواسطة <span className="text-blue-400">Ahmad Taleb</span></p>
          </div>
        </div>
      </footer>
    </div>
  );
}
