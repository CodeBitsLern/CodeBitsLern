'use client';

import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Search, Calendar, User, Tag, ArrowLeft, Share2, Heart } from 'lucide-react';

// ===== BLOG ARTICLES DATA =====
const blogArticles = [
  {
    id: 1,
    title: "مقدمة شاملة إلى الأردوينو: من الصفر إلى الاحتراف",
    slug: "arduino-introduction",
    excerpt: "تعلم أساسيات الأردوينو وكيفية بدء مشاريعك الأولى مع شرح مفصل للمكونات والحساسات",
    content: `
# مقدمة شاملة إلى الأردوينو

الأردوينو هو منصة إلكترونية مفتوحة المصدر تستخدم لبناء المشاريع الإلكترونية التفاعلية. 

## ما هو الأردوينو؟

الأردوينو عبارة عن لوحة تحكم صغيرة (Microcontroller Board) تحتوي على معالج صغير وذاكرة وعدة منافذ للتوصيل.

## المكونات الأساسية

1. **المعالج (Microcontroller):** يقوم بتنفيذ البرنامج
2. **المنافذ الرقمية:** للتحكم في الأجهزة (تشغيل/إيقاف)
3. **المنافذ التماثلية:** لقراءة القيم المتغيرة (الحساسات)
4. **منفذ USB:** لتحميل البرنامج والتواصل

## البدء الأول

لبدء العمل مع الأردوينو، تحتاج إلى:
- لوحة أردوينو (مثل UNO أو Mega)
- كابل USB
- برنامج Arduino IDE
- المكونات الإلكترونية (LED، مقاومات، إلخ)

جرب محاكي Wokwi أدناه لفهم كيفية عمل الأردوينو!
    `,
    category: "أردوينو",
    author: "أحمد طالب",
    date: "2025-01-15",
    readTime: 8,
    image: "⚡",
    tags: ["أردوينو", "إلكترونيات", "مبتدئ"],
    featured: true,
    hasSimulator: true,
    simulatorCode: `
void setup() {
  pinMode(LED_BUILTIN, OUTPUT);
  Serial.begin(9600);
}

void loop() {
  digitalWrite(LED_BUILTIN, HIGH);
  Serial.println("LED ON");
  delay(1000);
  
  digitalWrite(LED_BUILTIN, LOW);
  Serial.println("LED OFF");
  delay(1000);
}
    `
  },
  {
    id: 2,
    title: "Python للمبتدئين: البرمجة الكائنية التوجه",
    slug: "python-oop",
    excerpt: "فهم مفاهيم البرمجة الكائنية التوجه (OOP) في Python مع أمثلة عملية",
    content: `
# Python والبرمجة الكائنية التوجه

البرمجة الكائنية التوجه (OOP) هي نموذج برمجي يعتمد على الكائنات والفئات.

## المفاهيم الأساسية

### 1. الفئات (Classes)
الفئة هي قالب لإنشاء كائنات متعددة بنفس الخصائص.

### 2. الكائنات (Objects)
الكائن هو نسخة من الفئة تحتوي على بيانات وسلوك محدد.

### 3. الوراثة (Inheritance)
تسمح بوراثة الخصائص من فئة أخرى.

### 4. التغليف (Encapsulation)
إخفاء البيانات الداخلية والسماح بالوصول المحكوم.

### 5. تعدد الأشكال (Polymorphism)
استخدام نفس الواجهة لأشياء مختلفة.

## مثال عملي

\`\`\`python
class Car:
    def __init__(self, brand, model):
        self.brand = brand
        self.model = model
    
    def display(self):
        return f"{self.brand} {self.model}"

car = Car("Toyota", "Camry")
print(car.display())
\`\`\`

هذا مثال بسيط على استخدام الفئات والكائنات في Python.
    `,
    category: "برمجة",
    author: "أحمد طالب",
    date: "2025-01-14",
    readTime: 10,
    image: "🐍",
    tags: ["Python", "OOP", "برمجة"],
    featured: true,
    hasSimulator: false
  },
  {
    id: 3,
    title: "React.js: بناء تطبيقات ويب حديثة",
    slug: "react-modern-apps",
    excerpt: "تعلم React من الأساسيات وحتى بناء تطبيقات معقدة باستخدام Hooks و Context API",
    content: `
# React.js: بناء تطبيقات ويب حديثة

React هي مكتبة JavaScript لبناء واجهات المستخدم بكفاءة عالية.

## المزايا الرئيسية

1. **Virtual DOM:** تحديث سريع وفعال للصفحة
2. **Component-Based:** بناء التطبيق من مكونات قابلة لإعادة الاستخدام
3. **Unidirectional Data Flow:** تدفق البيانات من الأعلى للأسفل
4. **Rich Ecosystem:** مكتبات وأدوات متعددة

## الخطوات الأولى

\`\`\`jsx
import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <p>العدد: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        زيادة
      </button>
    </div>
  );
}
\`\`\`

## Hooks المهمة

- useState: إدارة الحالة
- useEffect: تنفيذ عمليات جانبية
- useContext: مشاركة البيانات بين المكونات
- useReducer: إدارة حالة معقدة
    `,
    category: "ويب",
    author: "أحمد طالب",
    date: "2025-01-13",
    readTime: 12,
    image: "⚛️",
    tags: ["React", "JavaScript", "ويب"],
    featured: false,
    hasSimulator: false
  },
  {
    id: 4,
    title: "الأمن السيبراني: حماية تطبيقاتك من الهجمات",
    slug: "cybersecurity-basics",
    excerpt: "تعلم أساسيات الأمن السيبراني وكيفية حماية تطبيقاتك من الثغرات الشائعة",
    content: `
# الأمن السيبراني: حماية تطبيقاتك

الأمن السيبراني هو مجموعة من الممارسات والتقنيات لحماية الأنظمة من الهجمات.

## الثغرات الشائعة

### 1. SQL Injection
إدراج أكواد SQL ضارة في مدخلات التطبيق.

### 2. XSS (Cross-Site Scripting)
تنفيذ أكواد JavaScript ضارة في متصفح المستخدم.

### 3. CSRF (Cross-Site Request Forgery)
إجبار المستخدم على تنفيذ عمليات غير مقصودة.

### 4. Weak Passwords
استخدام كلمات مرور ضعيفة وسهلة التخمين.

## طرق الحماية

1. **التحقق من المدخلات:** التحقق من صحة جميع المدخلات
2. **التشفير:** تشفير البيانات الحساسة
3. **HTTPS:** استخدام بروتوكول آمن
4. **Authentication:** نظام تسجيل دخول قوي
5. **Authorization:** التحكم في الصلاحيات

## أفضل الممارسات

- استخدم مكتبات موثوقة
- حدّث البرامج بانتظام
- استخدم كلمات مرور قوية
- فعّل المصادقة الثنائية
    `,
    category: "أمان",
    author: "أحمد طالب",
    date: "2025-01-12",
    readTime: 9,
    image: "🔐",
    tags: ["أمان", "سيبراني", "حماية"],
    featured: false,
    hasSimulator: false
  },
  {
    id: 5,
    title: "Machine Learning: مقدمة للمبتدئين",
    slug: "ml-introduction",
    excerpt: "فهم أساسيات التعلم الآلي والخوارزميات الشهيرة مع أمثلة عملية",
    content: `
# Machine Learning: مقدمة للمبتدئين

التعلم الآلي هو فرع من الذكاء الاصطناعي يركز على تعليم الأنظمة من البيانات.

## أنواع التعلم

### 1. التعلم الموجه (Supervised Learning)
التعلم من بيانات مصنفة مسبقاً.

### 2. التعلم غير الموجه (Unsupervised Learning)
اكتشاف الأنماط في البيانات بدون تصنيفات.

### 3. التعلم المعزز (Reinforcement Learning)
التعلم من خلال المكافآت والعقوبات.

## الخوارزميات الشهيرة

- **Linear Regression:** للتنبؤ بقيم مستمرة
- **Logistic Regression:** للتصنيف الثنائي
- **Decision Trees:** للتصنيف والتنبؤ
- **K-Means:** للتجميع
- **Neural Networks:** للمشاكل المعقدة

## البدء مع Python

\`\`\`python
from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier

# تحميل البيانات
iris = load_iris()
X_train, X_test, y_train, y_test = train_test_split(
    iris.data, iris.target, test_size=0.2
)

# تدريب النموذج
model = RandomForestClassifier()
model.fit(X_train, y_train)

# التنبؤ
predictions = model.predict(X_test)
\`\`\`

هذا مثال بسيط على استخدام التعلم الآلي!
    `,
    category: "ذكاء اصطناعي",
    author: "أحمد طالب",
    date: "2025-01-11",
    readTime: 11,
    image: "🤖",
    tags: ["ML", "AI", "Python"],
    featured: false,
    hasSimulator: false
  }
];

// ===== BLOG CARD COMPONENT =====
const BlogCard = ({ article, onClick }: any) => (
  <motion.div
    whileHover={{ y: -8 }}
    onClick={onClick}
    className="bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden border border-slate-100 cursor-pointer group"
  >
    <div className="bg-gradient-to-br from-slate-100 to-slate-50 p-6 flex items-center justify-center h-40 relative overflow-hidden">
      <div className="text-7xl group-hover:scale-110 transition-transform duration-300">
        {article.image}
      </div>
      {article.featured && (
        <div className="absolute top-3 right-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-3 py-1 rounded-full text-xs font-bold">
          ⭐ مميز
        </div>
      )}
    </div>
    
    <div className="p-6">
      <div className="flex items-center gap-2 mb-3">
        <Tag className="w-4 h-4 text-blue-600" />
        <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
          {article.category}
        </span>
      </div>
      
      <h3 className="text-lg font-bold text-slate-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
        {article.title}
      </h3>
      <p className="text-sm text-slate-600 mb-4 line-clamp-2">{article.excerpt}</p>
      
      <div className="flex items-center justify-between text-xs text-slate-500 mb-4">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            {article.date}
          </span>
          <span>{article.readTime} دقائق</span>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {article.tags.slice(0, 2).map((tag: string) => (
          <span key={tag} className="text-xs bg-slate-100 text-slate-700 px-2 py-1 rounded-full">
            #{tag}
          </span>
        ))}
      </div>

      <Button
        className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-2 rounded-lg transition-all duration-300 flex items-center justify-center gap-2"
      >
        اقرأ المزيد
        <ArrowLeft className="w-4 h-4" />
      </Button>
    </div>
  </motion.div>
);

// ===== BLOG ARTICLE VIEW COMPONENT =====
const BlogArticleView = ({ article, onBack }: any) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-white rounded-xl shadow-lg overflow-hidden"
  >
    {/* Article Header */}
    <div className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white p-8">
      <button
        onClick={onBack}
        className="flex items-center gap-2 mb-6 hover:opacity-80 transition-opacity"
      >
        <ArrowLeft className="w-5 h-5" />
        العودة للمدونة
      </button>
      
      <h1 className="text-4xl font-bold mb-4">{article.title}</h1>
      
      <div className="flex flex-wrap items-center gap-6 text-slate-300">
        <div className="flex items-center gap-2">
          <User className="w-4 h-4" />
          {article.author}
        </div>
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4" />
          {article.date}
        </div>
        <div className="flex items-center gap-2">
          📖 {article.readTime} دقائق قراءة
        </div>
      </div>
    </div>

    {/* Article Content */}
    <div className="p-8">
      <div className="prose prose-lg max-w-none text-slate-700 mb-8">
        <div className="whitespace-pre-wrap leading-relaxed">
          {article.content}
        </div>
      </div>

      {/* Article Tags */}
      <div className="border-t border-slate-200 pt-6 mb-6">
        <p className="text-sm font-semibold text-slate-600 mb-3">الوسوم:</p>
        <div className="flex flex-wrap gap-2">
          {article.tags.map((tag: string) => (
            <span key={tag} className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold">
              #{tag}
            </span>
          ))}
        </div>
      </div>

      {/* Share & Like */}
      <div className="border-t border-slate-200 pt-6 flex items-center gap-4">
        <Button
          variant="outline"
          className="flex items-center gap-2 border-2 border-slate-200 hover:border-blue-600 hover:text-blue-600"
        >
          <Heart className="w-4 h-4" />
          أعجبني
        </Button>
        <Button
          variant="outline"
          className="flex items-center gap-2 border-2 border-slate-200 hover:border-blue-600 hover:text-blue-600"
        >
          <Share2 className="w-4 h-4" />
          شارك
        </Button>
      </div>
    </div>
  </motion.div>
);

export default function Blog() {
  const [selectedArticle, setSelectedArticle] = useState<typeof blogArticles[0] | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Get unique categories
  const categories = ['all', ...new Set(blogArticles.map(a => a.category))];

  // Filter articles
  const filteredArticles = useMemo(() => {
    return blogArticles.filter(article => {
      const matchesSearch = article.title.includes(searchQuery) || 
                           article.excerpt.includes(searchQuery) ||
                           article.tags.some(tag => tag.includes(searchQuery));
      const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  if (selectedArticle) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 via-blue-50 to-slate-100 py-20 px-4" dir="rtl">
        <div className="max-w-4xl mx-auto">
          <BlogArticleView
            article={selectedArticle}
            onBack={() => setSelectedArticle(null)}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-blue-50 to-slate-100" dir="rtl">
      {/* ===== BLOG HEADER ===== */}
      <section className="pt-32 pb-16 px-4 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">📝 مدونة CodeBitsLern</h1>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              اكتشف أحدث المقالات والشروحات عن البرمجة والأردوينو والتكنولوجيا
            </p>
          </motion.div>
        </div>
      </section>

      {/* ===== SEARCH & FILTER ===== */}
      <section className="py-12 px-4 bg-white shadow-md">
        <div className="max-w-7xl mx-auto">
          {/* Search Bar */}
          <div className="mb-8 relative">
            <Search className="absolute right-4 top-3 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="ابحث عن مقالة..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-4 pr-12 py-3 border-2 border-slate-200 rounded-lg focus:border-blue-600 focus:outline-none transition-colors"
            />
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-3">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {category === 'all' ? 'الكل' : category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ===== BLOG ARTICLES ===== */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          {filteredArticles.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-2xl text-slate-600 mb-4">لم نجد مقالات تطابق بحثك</p>
              <Button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                }}
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold"
              >
                إعادة تعيين الفلاتر
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredArticles.map((article, index) => (
                <motion.div
                  key={article.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <BlogCard
                    article={article}
                    onClick={() => setSelectedArticle(article)}
                  />
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ===== FEATURED ARTICLES HIGHLIGHT ===== */}
      <section className="py-20 px-4 bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 text-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">⭐ المقالات المميزة</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {blogArticles.filter(a => a.featured).map((article, index) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, x: index === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="bg-white/10 backdrop-blur-md rounded-xl p-8 border border-white/20 hover:border-blue-400/50 transition-all duration-300 cursor-pointer"
                onClick={() => setSelectedArticle(article)}
              >
                <div className="text-5xl mb-4">{article.image}</div>
                <h3 className="text-2xl font-bold mb-3">{article.title}</h3>
                <p className="text-slate-300 mb-4">{article.excerpt}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-400">{article.date}</span>
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                    اقرأ
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
