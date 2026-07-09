'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Play, Copy, Download, RotateCcw, Code2, Zap } from 'lucide-react';

// ===== ARDUINO PROJECTS DATA =====
const arduinoProjects = [
  {
    id: 1,
    title: "LED Blinking - وميض LED",
    description: "مشروع بسيط لتشغيل وإيقاف LED",
    code: `void setup() {
  pinMode(LED_BUILTIN, OUTPUT);
}

void loop() {
  digitalWrite(LED_BUILTIN, HIGH);
  delay(1000);
  
  digitalWrite(LED_BUILTIN, LOW);
  delay(1000);
}`,
    wokwiUrl: "https://wokwi.com/projects/new/arduino-uno",
    difficulty: "سهل",
    category: "أساسيات"
  },
  {
    id: 2,
    title: "Button Control - التحكم بالزر",
    description: "قراءة حالة الزر وتشغيل LED بناءً عليها",
    code: `const int buttonPin = 2;
const int ledPin = 13;

void setup() {
  pinMode(buttonPin, INPUT);
  pinMode(ledPin, OUTPUT);
  Serial.begin(9600);
}

void loop() {
  int buttonState = digitalRead(buttonPin);
  
  if (buttonState == HIGH) {
    digitalWrite(ledPin, HIGH);
    Serial.println("Button Pressed - LED ON");
  } else {
    digitalWrite(ledPin, LOW);
    Serial.println("Button Released - LED OFF");
  }
  
  delay(100);
}`,
    wokwiUrl: "https://wokwi.com/projects/new/arduino-uno",
    difficulty: "متوسط",
    category: "الإدخال/الإخراج"
  },
  {
    id: 3,
    title: "PWM LED Brightness - تحكم بسطوع LED",
    description: "التحكم في سطوع LED باستخدام PWM",
    code: `const int ledPin = 9;
int brightness = 0;
int fadeAmount = 5;

void setup() {
  pinMode(ledPin, OUTPUT);
}

void loop() {
  analogWrite(ledPin, brightness);
  
  brightness = brightness + fadeAmount;
  
  if (brightness <= 0 || brightness >= 255) {
    fadeAmount = -fadeAmount;
  }
  
  delay(30);
}`,
    wokwiUrl: "https://wokwi.com/projects/new/arduino-uno",
    difficulty: "متوسط",
    category: "PWM"
  },
  {
    id: 4,
    title: "Temperature Sensor - حساس الحرارة",
    description: "قراءة درجة الحرارة من حساس LM35",
    code: `const int tempPin = A0;

void setup() {
  Serial.begin(9600);
}

void loop() {
  int sensorValue = analogRead(tempPin);
  
  // تحويل القيمة إلى درجة حرارة
  float voltage = sensorValue * (5.0 / 1023.0);
  float temperature = voltage * 100.0;
  
  Serial.print("Temperature: ");
  Serial.print(temperature);
  Serial.println(" C");
  
  delay(1000);
}`,
    wokwiUrl: "https://wokwi.com/projects/new/arduino-uno",
    difficulty: "متوسط",
    category: "الحساسات"
  },
  {
    id: 5,
    title: "Servo Motor Control - التحكم بالمحرك",
    description: "التحكم في موضع محرك Servo",
    code: `#include <Servo.h>

Servo myservo;
int pos = 0;

void setup() {
  myservo.attach(9);
}

void loop() {
  for (pos = 0; pos <= 180; pos += 1) {
    myservo.write(pos);
    delay(15);
  }
  
  for (pos = 180; pos >= 0; pos -= 1) {
    myservo.write(pos);
    delay(15);
  }
}`,
    wokwiUrl: "https://wokwi.com/projects/new/arduino-uno",
    difficulty: "متقدم",
    category: "المحركات"
  },
  {
    id: 6,
    title: "LCD Display - شاشة LCD",
    description: "عرض النصوص على شاشة LCD",
    code: `#include <LiquidCrystal.h>

const int rs = 12, en = 11, d4 = 5, d5 = 4, d6 = 3, d7 = 2;
LiquidCrystal lcd(rs, en, d4, d5, d6, d7);

void setup() {
  lcd.begin(16, 2);
  lcd.print("CodeBitsLern");
  lcd.setCursor(0, 1);
  lcd.print("Arduino LCD");
}

void loop() {
  delay(1000);
}`,
    wokwiUrl: "https://wokwi.com/projects/new/arduino-uno",
    difficulty: "متوسط",
    category: "العروض"
  }
];

// ===== PROJECT CARD COMPONENT =====
const ProjectCard = ({ project, onSelect }: any) => (
  <motion.div
    whileHover={{ y: -8 }}
    className="bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden border border-slate-100 group cursor-pointer"
    onClick={onSelect}
  >
    <div className="bg-gradient-to-br from-blue-500 to-cyan-500 p-6 text-white h-24 flex items-center justify-center">
      <Code2 className="w-12 h-12 opacity-80" />
    </div>
    
    <div className="p-6">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-bold text-slate-900">{project.title}</h3>
        <span className={`text-xs font-bold px-3 py-1 rounded-full ${
          project.difficulty === 'سهل' ? 'bg-green-100 text-green-700' :
          project.difficulty === 'متوسط' ? 'bg-yellow-100 text-yellow-700' :
          'bg-red-100 text-red-700'
        }`}>
          {project.difficulty}
        </span>
      </div>
      
      <p className="text-sm text-slate-600 mb-4">{project.description}</p>
      
      <div className="flex items-center justify-between">
        <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full font-semibold">
          {project.category}
        </span>
        <Button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-1 px-3 text-sm">
          جرب الآن
        </Button>
      </div>
    </div>
  </motion.div>
);

// ===== CODE EDITOR COMPONENT =====
const CodeEditor = ({ project, onClose }: any) => {
  const [code, setCode] = useState(project.code);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-900 to-blue-900 text-white p-6 flex items-center justify-between sticky top-0">
          <div>
            <h2 className="text-2xl font-bold">{project.title}</h2>
            <p className="text-slate-300 text-sm mt-1">{project.description}</p>
          </div>
          <button
            onClick={onClose}
            className="text-2xl hover:opacity-70 transition-opacity"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Code Editor */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-bold text-slate-900">الكود</h3>
              <Button
                onClick={handleCopy}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white"
              >
                <Copy className="w-4 h-4" />
                {copied ? 'تم النسخ!' : 'نسخ الكود'}
              </Button>
            </div>
            
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full h-64 p-4 bg-slate-900 text-slate-100 font-mono text-sm rounded-lg border-2 border-slate-700 focus:border-blue-600 focus:outline-none resize-none"
            />
          </div>

          {/* Instructions */}
          <div className="bg-blue-50 border-l-4 border-blue-600 p-4 rounded mb-6">
            <h4 className="font-bold text-slate-900 mb-2">📋 خطوات التشغيل:</h4>
            <ol className="text-sm text-slate-700 space-y-2 list-decimal list-inside">
              <li>انسخ الكود أعلاه</li>
              <li>افتح <a href="https://wokwi.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Wokwi</a> في نافذة جديدة</li>
              <li>أنشئ مشروع Arduino جديد</li>
              <li>الصق الكود في محرر الكود</li>
              <li>اضغط على زر التشغيل (Play)</li>
            </ol>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3">
            <a
              href={project.wokwiUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105"
            >
              <Zap className="w-5 h-5" />
              فتح في Wokwi
            </a>
            <Button
              onClick={onClose}
              variant="outline"
              className="flex items-center gap-2 border-2 border-slate-300 hover:border-slate-400"
            >
              <RotateCcw className="w-4 h-4" />
              إغلاق
            </Button>
          </div>

          {/* Tips */}
          <div className="mt-6 bg-yellow-50 border-l-4 border-yellow-600 p-4 rounded">
            <h4 className="font-bold text-slate-900 mb-2">💡 نصائح مفيدة:</h4>
            <ul className="text-sm text-slate-700 space-y-1 list-disc list-inside">
              <li>جرب تعديل قيم التأخير (delay) لرؤية التأثير</li>
              <li>استخدم Serial.println() لطباعة القيم</li>
              <li>تحقق من التوصيلات الكهربائية في المحاكي</li>
              <li>اقرأ التعليقات في الكود لفهم كل سطر</li>
            </ul>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default function ArduinoSimulator() {
  const [selectedProject, setSelectedProject] = useState<typeof arduinoProjects[0] | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = ['all', ...new Set(arduinoProjects.map(p => p.category))];
  
  const filteredProjects = selectedCategory === 'all'
    ? arduinoProjects
    : arduinoProjects.filter(p => p.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-blue-50 to-slate-100" dir="rtl">
      {/* ===== HEADER ===== */}
      <section className="pt-32 pb-16 px-4 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">⚡ محاكي الأردوينو التفاعلي</h1>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              جرب مشاريع الأردوينو مباشرة في المتصفح باستخدام محاكي Wokwi المتقدم
            </p>
          </motion.div>
        </div>
      </section>

      {/* ===== FEATURES ===== */}
      <section className="py-16 px-4 bg-white shadow-md">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: '🎮', title: 'محاكاة واقعية', desc: 'محاكاة دقيقة لسلوك الأردوينو الفعلي' },
              { icon: '📚', title: 'مشاريع متعددة', desc: 'مجموعة من المشاريع من السهل للمتقدم' },
              { icon: '⚙️', title: 'تفاعلي بالكامل', desc: 'عدّل الكود وشاهد النتائج مباشرة' }
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="text-center"
              >
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">{feature.title}</h3>
                <p className="text-slate-600">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CATEGORY FILTER ===== */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg'
                    : 'bg-white text-slate-700 border-2 border-slate-200 hover:border-blue-400'
                }`}
              >
                {category === 'all' ? 'الكل' : category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PROJECTS GRID ===== */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <ProjectCard
                  project={project}
                  onSelect={() => setSelectedProject(project)}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== INFO SECTION ===== */}
      <section className="py-20 px-4 bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
            >
              <h2 className="text-3xl font-bold mb-6">🚀 ابدأ مع الأردوينو الآن</h2>
              <ul className="space-y-4 text-slate-300">
                <li className="flex items-start gap-3">
                  <span className="text-blue-400 text-xl">✓</span>
                  <span>لا تحتاج إلى شراء أي أجهزة - كل شيء في المتصفح</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-400 text-xl">✓</span>
                  <span>مشاريع متدرجة من السهل للمتقدم</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-400 text-xl">✓</span>
                  <span>تعلم البرمجة بطريقة عملية وتفاعلية</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-400 text-xl">✓</span>
                  <span>احصل على شهادة عند إكمال جميع المشاريع</span>
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="bg-white/10 backdrop-blur-md rounded-xl p-8 border border-white/20"
            >
              <h3 className="text-2xl font-bold mb-4">📖 ما هو Wokwi؟</h3>
              <p className="text-slate-300 mb-4">
                Wokwi هو محاكي إلكترونيات قوي يسمح لك بمحاكاة الأردوينو والأجهزة الأخرى مباشرة في المتصفح.
              </p>
              <p className="text-slate-300 mb-4">
                يدعم محاكاة دقيقة للأجهزة والحساسات والمحركات، مما يجعله الخيار الأمثل للتعلم والاختبار.
              </p>
              <a
                href="https://wokwi.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition-colors"
              >
                زيارة موقع Wokwi
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== CODE EDITOR MODAL ===== */}
      {selectedProject && (
        <CodeEditor
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </div>
  );
}
