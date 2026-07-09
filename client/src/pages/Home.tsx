'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ChevronRight, Star, ShoppingCart, Play, BookOpen } from 'lucide-react';
import { motion } from 'framer-motion';

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
    meta: "40 ساعة",
    rating: 4.8
  },
  {
    id: 2,
    title: "نظام إدارة المتجر الإلكتروني",
    category: "software",
    price: 79,
    description: "برنامج متكامل لإدارة المنتجات والطلبات والعملاء بواجهة سهلة",
    icon: "💻",
    meta: "v2.5",
    rating: 4.8
  },
  {
    id: 3,
    title: "قالب موقع Portfolio احترافي",
    category: "code",
    price: 19,
    description: "قالب HTML/CSS/JS كامل لموقع محفظة أعمال احترافي مع تصميم عصري",
    icon: "📄",
    meta: "HTML/CSS/JS",
    rating: 4.8
  },
  {
    id: 4,
    title: "دورة React.js الشاملة",
    category: "video",
    price: 35,
    oldPrice: 59,
    description: "احترف بناء تطبيقات الويب الحديثة باستخدام React.js وأحدث التقنيات",
    icon: "⚛️",
    meta: "35 ساعة",
    rating: 4.8
  },
  {
    id: 5,
    title: "API للمصادقة وإدارة المستخدمين",
    category: "code",
    price: 25,
    description: "كود Node.js كامل لنظام تسجيل الدخول والتسجيل مع JWT وتشفير كامل",
    icon: "🔐",
    meta: "Node.js",
    rating: 4.8
  },
  {
    id: 6,
    title: "أداة تحليل وتحسين الكود",
    category: "software",
    price: 45,
    description: "أداة ذكية لتحليل جودة الكود واقتراح التحسينات تلقائياً",
    icon: "🔍",
    meta: "v1.8",
    rating: 4.8
  },
  {
    id: 7,
    title: "دورة JavaScript المتقدمة",
    category: "video",
    price: 32,
    oldPrice: 52,
    description: "تعمق في JavaScript المتقدم مع أفضل الممارسات والتقنيات الحديثة",
    icon: "📚",
    meta: "38 ساعة",
    rating: 4.8
  },
  {
    id: 8,
    title: "قالب لوحة تحكم Admin",
    category: "code",
    price: 35,
    description: "قالب لوحة تحكم كامل مع رسوم بيانية وإدارة مستخدمين",
    icon: "📊",
    meta: "React/Tailwind",
    rating: 4.8
  }
];

// ===== VIDEOS DATA =====
const videoCategories = [
  {
    id: 1,
    name: "فيديوهات تطوير الويب",
    icon: "🌐",
    description: "فيديوهات شاملة عن HTML, CSS, JavaScript, React",
    count: 15,
    color: "from-blue-500 to-cyan-500"
  },
  {
    id: 2,
    name: "فيديوهات Python والذكاء الاصطناعي",
    icon: "🐍",
    description: "فيديوهات عملية عن Python وتطبيقات الذكاء الاصطناعي",
    count: 20,
    color: "from-green-500 to-emerald-500"
  },
  {
    id: 3,
    name: "أردوينو والإلكترونيات",
    icon: "⚡",
    description: "فيديوهات تعليمية شاملة عن الأردوينو والحساسات والدوائر الإلكترونية",
    count: 1,
    color: "from-yellow-500 to-orange-500"
  },
  {
    id: 4,
    name: "فيديوهات تطوير التطبيقات",
    icon: "📱",
    description: "فيديوهات عن Flutter, React Native والتطبيقات الجوالة",
    count: 14,
    color: "from-purple-500 to-pink-500"
  },
  {
    id: 5,
    name: "فيديوهات الأمن السيبراني",
    icon: "🔐",
    description: "فيديوهات عن الأمن والـ Ethical Hacking",
    count: 10,
    color: "from-red-500 to-rose-500"
  }
];

// ===== COURSES DATA =====
const courseCategories = [
  {
    id: 1,
    name: "تطوير الويب",
    icon: "🌐",
    description: "HTML, CSS, JavaScript, React, Node.js",
    count: 12,
    color: "from-blue-500 to-cyan-500"
  },
  {
    id: 2,
    name: "Python والذكاء الاصطناعي",
    icon: "🐍",
    description: "Python, ML, Deep Learning, Data Science",
    count: 18,
    color: "from-green-500 to-emerald-500"
  },
  {
    id: 3,
    name: "الأردوينو والإلكترونيات",
    icon: "⚡",
    description: "الأردوينو، الدوائر الإلكترونية، المشاريع العملية",
    count: 8,
    color: "from-yellow-500 to-orange-500"
  },
  {
    id: 4,
    name: "تطوير التطبيقات",
    icon: "📱",
    description: "Flutter, React Native, Swift, Kotlin",
    count: 10,
    color: "from-purple-500 to-pink-500"
  },
  {
    id: 5,
    name: "الأمن السيبراني",
    icon: "🔐",
    description: "Ethical Hacking, Security, Penetration Testing",
    count: 8,
    color: "from-red-500 to-rose-500"
  }
];

// ===== PRODUCT CARD COMPONENT =====
const ProductCard = ({ product, onAddToCart }: any) => (
  <motion.div
    whileHover={{ y: -8 }}
    className="bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden border border-slate-100 group"
  >
    <div className="p-6">
      <div className="flex items-start justify-between mb-4">
        <div className="text-5xl">{product.icon}</div>
        <div className="bg-gradient-to-r from-blue-100 to-cyan-100 px-3 py-1 rounded-full text-xs font-bold text-blue-700">
          {product.meta}
        </div>
      </div>
      
      <h3 className="text-lg font-bold text-slate-900 mb-2 line-clamp-2">{product.title}</h3>
      <p className="text-sm text-slate-600 mb-4 line-clamp-2">{product.description}</p>
      
      <div className="flex items-center gap-2 mb-4">
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          ))}
        </div>
        <span className="text-sm font-semibold text-slate-700">{product.rating}</span>
      </div>

      <div className="flex items-center justify-between mb-4">
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-bold text-slate-900">${product.price}</span>
          {product.oldPrice && (
            <span className="text-sm text-slate-400 line-through">${product.oldPrice}</span>
          )}
        </div>
      </div>

      <Button
        onClick={() => onAddToCart(product)}
        className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-2 rounded-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 shadow-md"
      >
        <ShoppingCart className="w-4 h-4" />
        أضف للسلة
      </Button>
    </div>
  </motion.div>
);

// ===== VIDEO CATEGORY CARD COMPONENT =====
const VideoCategoryCard = ({ category }: any) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    className={`bg-gradient-to-br ${category.color} rounded-xl p-8 text-white shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer group relative overflow-hidden`}
  >
    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-300"></div>
    <div className="relative z-10">
      <div className="text-6xl mb-4">{category.icon}</div>
      <h3 className="text-2xl font-bold mb-2">{category.name}</h3>
      <p className="text-white/90 mb-4 text-sm">{category.description}</p>
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold bg-white/20 px-3 py-1 rounded-full">{category.count} فيديو</span>
        <Play className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
      </div>
    </div>
  </motion.div>
);

// ===== COURSE CATEGORY CARD COMPONENT =====
const CourseCategoryCard = ({ category }: any) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    className={`bg-gradient-to-br ${category.color} rounded-xl p-8 text-white shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer group relative overflow-hidden`}
  >
    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-300"></div>
    <div className="relative z-10">
      <div className="text-6xl mb-4">{category.icon}</div>
      <h3 className="text-2xl font-bold mb-2">{category.name}</h3>
      <p className="text-white/90 mb-4 text-sm">{category.description}</p>
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold bg-white/20 px-3 py-1 rounded-full">{category.count} دورة</span>
        <BookOpen className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
      </div>
    </div>
  </motion.div>
);

export default function Home() {
  const [selectedFilter, setSelectedFilter] = useState('all');
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
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-blue-50 to-slate-100" dir="rtl">
      {/* ===== HERO SECTION ===== */}
      <section className="pt-32 pb-20 px-4 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-200 to-cyan-200 bg-clip-text text-transparent">
              مرحباً بك في CodeBitsLern
            </h1>
            <p className="text-xl md:text-2xl text-slate-300 mb-8 max-w-3xl mx-auto">
              منصتك الأولى لتعلم البرمجة واحتراف التطوير مع أفضل المحتوى التعليمي والدورات العملية
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg text-lg"
              >
                تصفح المتجر
              </Button>
              <Button
                onClick={() => document.getElementById('videos')?.scrollIntoView({ behavior: 'smooth' })}
                variant="outline"
                className="border-2 border-white text-white hover:bg-white/10 font-bold py-3 px-8 rounded-lg transition-all duration-300 text-lg"
              >
                شاهد الفيديوهات
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== PRODUCTS SECTION ===== */}
      <section id="products" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-1 h-8 bg-gradient-to-b from-blue-600 to-cyan-600 rounded-full"></div>
              <h2 className="text-4xl font-bold text-slate-900">🛒 المنتجات المميزة</h2>
            </div>
            <p className="text-slate-600 text-lg">اختر من مجموعة متنوعة من الدورات والأدوات والقوالب</p>
          </motion.div>

          {/* Filter Buttons */}
          <div className="flex flex-wrap gap-3 mb-12">
            {['all', 'video', 'code', 'software'].map(filter => (
              <button
                key={filter}
                onClick={() => setSelectedFilter(filter)}
                className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${
                  selectedFilter === filter
                    ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg'
                    : 'bg-white text-slate-700 border-2 border-slate-200 hover:border-blue-400'
                }`}
              >
                {filter === 'all' ? 'الكل' : filter === 'video' ? 'دورات' : filter === 'code' ? 'أكواد' : 'برامج'}
              </button>
            ))}
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <ProductCard product={product} onAddToCart={handleAddToCart} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== VIDEOS SECTION ===== */}
      <section id="videos" className="py-20 px-4 bg-gradient-to-b from-white to-slate-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-1 h-8 bg-gradient-to-b from-blue-600 to-cyan-600 rounded-full"></div>
              <h2 className="text-4xl font-bold text-slate-900">🎥 الفيديوهات التعليمية</h2>
            </div>
            <p className="text-slate-600 text-lg">مجموعة من الفيديوهات المبسطة والمباشرة للمبتدئين والمتقدمين</p>
          </motion.div>

          {/* Videos Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {videoCategories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <VideoCategoryCard category={category} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== COURSES SECTION ===== */}
      <section id="courses" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-1 h-8 bg-gradient-to-b from-blue-600 to-cyan-600 rounded-full"></div>
              <h2 className="text-4xl font-bold text-slate-900">📚 الدورات التعليمية</h2>
            </div>
            <p className="text-slate-600 text-lg">دورات شاملة ومنظمة لتعلم البرمجة والتطوير بشكل احترافي</p>
          </motion.div>

          {/* Courses Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {courseCategories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <CourseCategoryCard category={category} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== STATS SECTION ===== */}
      <section className="py-20 px-4 bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { number: '50+', label: 'دورة تعليمية' },
              { number: '100+', label: 'فيديو شامل' },
              { number: '10K+', label: 'طالب سعيد' },
              { number: '24/7', label: 'دعم فني' }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-5xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  {stat.number}
                </div>
                <p className="text-slate-300 text-lg">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CART DIALOG ===== */}
      <Dialog open={cartOpen} onOpenChange={setCartOpen}>
        <DialogContent className="max-w-2xl">
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
                <li><a href="#products" className="hover:text-white transition-colors duration-300 flex items-center gap-2"><span>→</span>المتجر</a></li>
                <li><a href="#videos" className="hover:text-white transition-colors duration-300 flex items-center gap-2"><span>→</span>الفيديوهات</a></li>
                <li><a href="#courses" className="hover:text-white transition-colors duration-300 flex items-center gap-2"><span>→</span>الدورات</a></li>
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
                <a href="#" className="w-10 h-10 bg-slate-700 hover:bg-blue-600 rounded-lg flex items-center justify-center transition-colors duration-300 font-bold">f</a>
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
