import type { Course, Module, Lesson, LessonContent, CodeSample, Callout } from "@/types";

// ====================================================================
// HTML & CSS Foundations Course — Frontend Track
// ====================================================================

const htmlIntroCallout: Callout = {
  type: "tip",
  title: { ar: "نصيحة", en: "Tip" },
  body: {
    ar: "لا تقلق إذا بدا الكود غريباً في البداية. مع التكرار والممارسة ستصبح كتابة HTML طبيعية مثل الكتابة بلغتك الأم. ابدأ بكتابة الكود يدوياً بدلاً من نسخه.",
    en: "Don't worry if the code looks strange at first. With practice, writing HTML will become as natural as writing in your native language. Type the code manually instead of copying it.",
  },
};

const htmlSample1: CodeSample = {
  id: "html-basics-1",
  language: "html",
  filename: "index.html",
  code: `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>صفحتي الأولى</title>
</head>
<body>
  <h1>مرحبا بالعالم!</h1>
  <p>هذه أول فقرة في صفحتي.</p>
</body>
</html>`,
  explanation: {
    ar: "هذا أبسط هيكل لصفحة HTML. الـ DOCTYPE يخبر المتصفح أن الصفحة تستخدم HTML5. وسم <html> هو الجذر، و <head> يحتوي على معلومات الصفحة، بينما <body> يحتوي على المحتوى المرئي.",
    en: "This is the simplest HTML page structure. The DOCTYPE tells the browser the page uses HTML5. The <html> tag is the root, <head> contains page metadata, and <body> holds visible content.",
  },
  runnable: true,
};

const cssSample1: CodeSample = {
  id: "css-basics-1",
  language: "css",
  filename: "styles.css",
  code: `/* المحددات الأساسية */
body {
  font-family: 'Cairo', sans-serif;
  background-color: #f8fafc;
  color: #1e293b;
  margin: 0;
  padding: 2rem;
  line-height: 1.6;
}

h1 {
  color: #0ea5e9;
  font-size: 2.5rem;
  border-bottom: 3px solid #0ea5e9;
  padding-bottom: 0.5rem;
}

p {
  font-size: 1.1rem;
  color: #475569;
}`,
  explanation: {
    ar: "نستخدم محددات CSS لاستهداف عناصر HTML وتنسيقها. هنا نستخدم محدد العنصر (body, h1, p) الذي يستهدف جميع العناصر من ذلك النوع.",
    en: "We use CSS selectors to target and style HTML elements. Here we use element selectors (body, h1, p) that target all elements of that type.",
  },
  runnable: true,
};

const flexboxSample: CodeSample = {
  id: "css-flexbox-1",
  language: "css",
  filename: "flexbox.css",
  code: `.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
  padding: 1.5rem;
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  border-radius: 1rem;
}

.item {
  background: white;
  padding: 1rem 1.5rem;
  border-radius: 0.5rem;
  font-weight: 600;
  flex: 1 1 150px;
  text-align: center;
}`,
  explanation: {
    ar: "Flexbox هو أداة قوية لترتيب العناصر في صف أو عمود. justify-content يتحكم في التوزيع الأفقي، align-items في المحاذاة الرأسية، و flex-wrap يسمح للعناصر بالانتقال لسطر جديد.",
    en: "Flexbox is a powerful tool for arranging elements in a row or column. justify-content controls horizontal distribution, align-items controls vertical alignment, and flex-wrap allows items to wrap to new lines.",
  },
  runnable: true,
};

const gridSample: CodeSample = {
  id: "css-grid-1",
  language: "css",
  filename: "grid.css",
  code: `.grid-layout {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  padding: 2rem;
}

.card {
  background: white;
  border-radius: 0.75rem;
  padding: 1.5rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s, box-shadow 0.2s;
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
}`,
  explanation: {
    ar: "CSS Grid مثالي لتخطيطات ثنائية الأبعاد. الدالة repeat(auto-fit, minmax(...)) تنشئ شبكة متجاوبة تتكيف مع حجم الشاشة تلقائياً.",
    en: "CSS Grid is ideal for two-dimensional layouts. The repeat(auto-fit, minmax(...)) function creates a responsive grid that automatically adapts to screen size.",
  },
  runnable: true,
};

const responsiveSample: CodeSample = {
  id: "css-responsive-1",
  language: "css",
  filename: "responsive.css",
  code: `/* Mobile First Approach */
.nav {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

/* Tablet */
@media (min-width: 768px) {
  .nav {
    flex-direction: row;
    justify-content: space-between;
  }
}

/* Desktop */
@media (min-width: 1024px) {
  .nav {
    padding: 0 2rem;
  }
  
  .nav-item {
    font-size: 1rem;
  }
}`,
  explanation: {
    ar: "أسلوب Mobile First يعني أننا نبدأ بتصميم الموبايل ثم نضيف أنماطاً للشاشات الأكبر عبر media queries. هذا الأسلوب أفضل للأداء لأن الأجهزة الصغيرة لا تحمل CSS غير ضروري.",
    en: "Mobile First approach means we start designing for mobile then add styles for larger screens via media queries. This is better for performance because small devices don't load unnecessary CSS.",
  },
  runnable: true,
};

// --------------------------------------------------------------------
// Module 1: HTML Basics
// --------------------------------------------------------------------
const module1Lessons: Lesson[] = [
  {
    id: "lesson-html-intro",
    moduleId: "module-html-basics",
    courseId: "course-html-css",
    slug: "html-introduction",
    title: { ar: "مقدمة في HTML", en: "Introduction to HTML" },
    summary: {
      ar: "تعرف على لغة HTML ودورها في بناء صفحات الويب وهيكل الصفحة الأساسي.",
      en: "Learn about HTML and its role in building web pages and the basic page structure.",
    },
    type: "reading",
    order: 1,
    estimatedMinutes: 15,
    isFree: true,
    isLocked: false,
    content: {
      body: {
        ar: `## ما هي HTML؟

**HTML** (HyperText Markup Language) هي اللغة الأساسية لبناء صفحات الويب. ليست لغة برمجة بالمعنى الحرفي، بل هي **لغة ترميز** تصف هيكل المحتوى باستخدام وسوم (tags).

تخيل HTML كالهيكل العظمي لصفحتك: تحدد أين يذهب العنوان، أين الفقرات، أين الصور، وأين الروابط. كل ما تراه في أي موقع ويب يبدأ بـ HTML.

### تاريخ موجز

- **1991**: تيم بيرنرز-لي نشر أول وصف لـ HTML
- **1995**: HTML 2.0 (أول معيار رسمي)
- **1999**: HTML 4.01
- **2014**: HTML5 (الإصدار الحديث المعتمد عالمياً)

### كيف تعمل HTML؟

عندما تزور موقعاً، متصفحك (Chrome, Firefox, Safari) يقوم بـ:
1. تحميل ملف HTML من الخادم
2. قراءة الوسوم وفهم هيكل الصفحة
3. تطبيق CSS من ملفات منفصلة
4. تنفيذ JavaScript إن وُجدت
5. عرض الصفحة النهائية على الشاشة

### بنية الوسم (Tag)

كل وسم في HTML يكتب بين أقواس زاوية \`< >\`:

\`\`\`
<opening-tag>المحتوى</closing-tag>
\`\`\`

بعض الوسوم تسمى "self-closing" ولا تحتاج وسم إغلاق:
\`\`\`
<img src="image.jpg" />
<br />
<input type="text" />
\`\`\`

### الصفات (Attributes)

الوسوم يمكن أن تحتوي على صفات تعطي معلومات إضافية:

\`\`\`html
<a href="https://example.com" target="_blank">رابط</a>
<img src="photo.jpg" alt="وصف الصورة" width="300">
\`\`\`

- \`href\`: عنوان الرابط
- \`src\`: مصدر الصورة
- \`alt\`: نص بديل (مهم للوصول)
- \`target="_blank"\`: فتح في تبويب جديد

### تجربة عملية

في المحرر التفاعلي بالأسفل، جرّب تعديل النص داخل \`<h1>\` و \`<p>\` وشاهد التغييرات فوراً.`,
        en: `## What is HTML?

**HTML** (HyperText Markup Language) is the foundational language for building web pages. It's not a programming language per se, but a **markup language** that describes content structure using tags.

Think of HTML as the skeleton of your page: it defines where the title goes, where paragraphs are, where images live, and where links point. Everything you see on any website starts with HTML.`,
      },
      codeSamples: [htmlSample1],
      callouts: [htmlIntroCallout],
      keyTakeaways: [
        {
          ar: "HTML لغة ترميز تصف هيكل صفحات الويب، وليست لغة برمجة.",
          en: "HTML is a markup language that describes web page structure, not a programming language.",
        },
        {
          ar: "الوسوم تكتب بين < > والوسوم المغلقة تحتوي على / قبل الاسم.",
          en: "Tags are written between < > and closing tags include / before the name.",
        },
        {
          ar: "الصفات (attributes) تعطي معلومات إضافية للوسوم مثل href و src و alt.",
          en: "Attributes provide additional information to tags like href, src, and alt.",
        },
        {
          ar: "المتصفح يقرأ HTML ويبني شجرة DOM ثم يعرض الصفحة.",
          en: "The browser reads HTML, builds the DOM tree, then renders the page.",
        },
      ],
      references: [
        {
          title: { ar: "MDN Web Docs — HTML", en: "MDN Web Docs — HTML" },
          url: "https://developer.mozilla.org/ar/docs/Web/HTML",
          type: "doc",
        },
        {
          title: { ar: "W3Schools HTML Tutorial", en: "W3Schools HTML Tutorial" },
          url: "https://www.w3schools.com/html/",
          type: "doc",
        },
      ],
    },
  },
  {
    id: "lesson-html-structure",
    moduleId: "module-html-basics",
    courseId: "course-html-css",
    slug: "html-page-structure",
    title: { ar: "هيكل صفحة HTML الكامل", en: "Complete HTML Page Structure" },
    summary: {
      ar: "تعمق في بنية صفحة HTML الكاملة: DOCTYPE, html, head, body وما يحتويه كل منها.",
      en: "Dive into the complete HTML page structure: DOCTYPE, html, head, body and what each contains.",
    },
    type: "reading",
    order: 2,
    estimatedMinutes: 20,
    isFree: true,
    isLocked: false,
    content: {
      body: {
        ar: `## الهيكل الكامل لصفحة HTML

كل صفحة HTML احترافية تبدأ بنفس الهيكل الأساسي. فهم كل جزء منه أساسي لكتابة كود نظيف ومتوافق مع المعايير.

\`\`\`html
<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="وصف الصفحة لمحركات البحث">
  <title>عنوان الصفحة</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <!-- المحتوى المرئي يكتب هنا -->
  <header>...</header>
  <main>...</main>
  <footer>...</footer>
  <script src="script.js"></script>
</body>
</html>
\`\`\`

### شرح كل جزء

#### 1. \`<!DOCTYPE html>\`
يخبر المتصفح أن المستند يستخدم HTML5. بدون هذا السطر، قد يدخل المتصفح في "وضع التشويش" (quirks mode) ويعرض الصفحة بشكل غير متوقع.

#### 2. \`<html lang="ar" dir="rtl">\`
- \`lang="ar"\`: يحدد لغة المحتوى (مهم للوصول و SEO)
- \`dir="rtl"\`: اتجاه الكتابة من اليمين لليسار (للعربية والعبرية)

#### 3. \`<head>\`
يحتوي على **metadata** (بيانات وصفية) غير مرئية للمستخدم:
- \`<meta charset>\`: ترميز الأحرف (UTF-8 يدعم العربية)
- \`<meta name="viewport">\`: ضروري للموبايل
- \`<meta name="description">\`: وصف يظهر في نتائج البحث
- \`<title>\`: ما يظهر في تبويب المتصفح
- \`<link>\`: ربط ملفات CSS و الأيقونات

#### 4. \`<body>\`
يحتوي على **كل المحتوى المرئي** للصفحة: النصوص، الصور، الأزرار، الروابط...

### الوسوم الدلالية (Semantic HTML5)

بدلاً من استخدام \`<div>\` لكل شيء، HTML5 يقدم وسوماً دلالية تخبر المتصفح ومحركات البحث عن **معنى** كل قسم:

\`\`\`html
<header>   <!-- ترويسة الموقع -->
<nav>      <!-- قائمة التنقل -->
<main>     <!-- المحتوى الرئيسي -->
<article>  <!-- مقال أو منشور مستقل -->
<section>  <!-- قسم ذو صلة -->
<aside>    <!-- محتوى جانبي -->
<footer>   <!-- تذييل الموقع -->
<figure>   <!-- صورة مع تعليق -->
\`\`\`

### لماذا الدلالة مهمة؟

1. **SEO**: محركات البحث تفهم المحتوى بشكل أفضل
2. **الوصول**: قارئات الشاشة تستخدم الدلالة للتنقل
3. **الصيانة**: كودك يصبح أوضح وأسهل في الفهم
4. **التنسيق**: يمكنك تنسيق وسوم محددة بسهولة

### تجربة

في المحرر بالأسفل، جرّب إضافة:
- وسم \`<nav>\` يحتوي على روابط
- وسم \`<article>\` بداخله \`<h2>\` و \`<p>\`
- وسم \`<footer>\` بمعلومات حقوق النشر`,
      },
      codeSamples: [
        {
          id: "html-structure-2",
          language: "html",
          filename: "index.html",
          code: `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>مدونتي التقنية</title>
</head>
<body>
  <header>
    <h1>مدونتي التقنية</h1>
    <nav>
      <a href="#">الرئيسية</a> |
      <a href="#">المقالات</a> |
      <a href="#">عني</a>
    </nav>
  </header>
  
  <main>
    <article>
      <h2>تعلم HTML في 7 أيام</h2>
      <p>HTML هي أساس كل موقع ويب...</p>
      <p>في هذا المقال سنتعرف على...</p>
    </article>
  </main>
  
  <footer>
    <p>© 2025 مدونتي التقنية. جميع الحقوق محفوظة.</p>
  </footer>
</body>
</html>`,
          explanation: {
            ar: "هيكل صفحة كامل باستخدام الوسوم الدلالية. لاحظ كيف كل وسم يصف محتواه بوضوح.",
            en: "A complete page structure using semantic tags. Notice how each tag clearly describes its content.",
          },
          runnable: true,
        },
      ],
      callouts: [
        {
          type: "warning",
          title: { ar: "تنبيه", en: "Warning" },
          body: {
            ar: "لا تنسَ إضافة <meta name=\"viewport\"> لكل صفحة! بدونها، صفحتك لن تعمل بشكل صحيح على الموبايل وستظهر مصغرة جداً.",
            en: "Don't forget to add <meta name=\"viewport\"> to every page! Without it, your page won't work properly on mobile and will appear zoomed out.",
          },
        },
        {
          type: "info",
          title: { ar: "معلومة", en: "Info" },
          body: {
            ar: "التعليقات في HTML تكتب بين <!-- و -->. استخدمها لتوثيق كودك ولكن لا تترك معلومات حساسة فيها لأنها مرئية في المصدر.",
            en: "Comments in HTML are written between <!-- and -->. Use them to document your code but don't leave sensitive info as they're visible in source.",
          },
        },
      ],
      keyTakeaways: [
        {
          ar: "كل صفحة HTML تبدأ بـ <!DOCTYPE html> ثم <html> الذي يحتوي على <head> و <body>.",
          en: "Every HTML page starts with <!DOCTYPE html> then <html> containing <head> and <body>.",
        },
        {
          ar: "<head> يحتوي على metadata غير مرئية، و <body> يحتوي على المحتوى المرئي.",
          en: "<head> contains invisible metadata, <body> contains visible content.",
        },
        {
          ar: "استخدم الوسوم الدلالية (header, nav, main, article, section, aside, footer) بدلاً من <div> عند الإمكان.",
          en: "Use semantic tags (header, nav, main, article, section, aside, footer) instead of <div> when possible.",
        },
        {
          ar: "السمة lang مهمة للوصول و SEO، و dir=\"rtl\" ضرورية للعربية.",
          en: "The lang attribute is important for accessibility and SEO, and dir=\"rtl\" is essential for Arabic.",
        },
      ],
    },
  },
  {
    id: "lesson-html-text",
    moduleId: "module-html-basics",
    courseId: "course-html-css",
    slug: "html-text-elements",
    title: { ar: "تنسيق النصوص في HTML", en: "Text Formatting in HTML" },
    summary: {
      ar: "كل وسوم النصوص: العناوين، الفقرات، النصوص البارزة، القوائم، والاقتباسات.",
      en: "All text tags: headings, paragraphs, emphasized text, lists, and quotes.",
    },
    type: "reading",
    order: 3,
    estimatedMinutes: 25,
    isFree: true,
    isLocked: false,
    content: {
      body: {
        ar: `## العناوين (Headings)

HTML يوفر 6 مستويات من العناوين من \`<h1>\` (الأهم) إلى \`<h6>\` (الأقل أهمية):

\`\`\`html
<h1>العنوان الرئيسي — مرة واحدة في الصفحة</h1>
<h2>عنوان فرعي رئيسي</h2>
<h3>عنوان فرعي</h3>
<h4>عنوان فرعي أصغر</h4>
<h5>عنوان فرعي صغير</h5>
<h6>أصغر عنوان</h6>
\`\`\`

**أفضل الممارسات:**
- استخدم \`<h1>\` مرة واحدة فقط لكل صفحة (مهم لـ SEO)
- الحفاظ على التسلسل الهرمي (لا تقفز من h1 إلى h4)
- العناوين للهيكل وليس للتنسيق (للتنسيق استخدم CSS)

## الفقرات والنصوص

\`\`\`html
<p>هذه فقرة عادية. المتصفح يضيف هامشاً تلقائياً قبلها وبعدها.</p>

<p>
  يمكنك إضافة <strong>نص مهم (عريض)</strong> أو <em>نص مشدد (مائل)</em>.
  الفرق بين <strong> و <b>: الأول يدل على أهمية دلالية، الثاني مجرد تنسيق.
</p>

<p>
  يمكنك استخدام <mark>نص مميز بخلفية صفراء</mark> أو 
  <small>نص صغير</small> أو <del>نص محذوف</del> أو 
  <ins>نص مضاف</ins>.
</p>

<p>
  الصيغة العلمية: H<sub>2</sub>O و E = mc<sup>2</sup>
  و <code>const x = 5;</code> للكود.
</p>
\`\`\`

## القوائم (Lists)

### قائمة غير مرتبة (Unordered)
\`\`\`html
<ul>
  <li>تعلم HTML</li>
  <li>تعلم CSS</li>
  <li>تعلم JavaScript</li>
</ul>
\`\`\`

### قائمة مرتبة (Ordered)
\`\`\`html
<ol>
  <li>افتح المحرر</li>
  <li>اكتب الكود</li>
  <li>احفظ الملف</li>
  <li>افتحه في المتصفح</li>
</ul>
\`\`\`

### قائمة وصفية (Description)
\`\`\`html
<dl>
  <dt>HTML</dt>
  <dd>لغة ترميز لبناء صفحات الويب</dd>
  
  <dt>CSS</dt>
  <dd>لغة لتنسيق صفحات الويب</dd>
</dl>
\`\`\`

### قوائم متداخلة
\`\`\`html
<ul>
  <li>الواجهة الأمامية
    <ul>
      <li>HTML</li>
      <li>CSS</li>
      <li>JavaScript</li>
    </ul>
  </li>
  <li>الواجهة الخلفية
    <ul>
      <li>Node.js</li>
      <li>Python</li>
    </ul>
  </li>
</ul>
\`\`\`

## الاقتباسات

\`\`\`html
<p>قال تيم بيرنرز-لي:</p>

<blockquote cite="https://example.com/quote">
  "الويب هو أكثر من مجرد تكنولوجيا؛ إنه أداة للتواصل الإنساني."
</blockquote>

<p>كما ذكر <q>المصدر</q> في سياق الكلام.</p>

<cite>— تيم بيرنرز-لي</cite>
\`\`\`

## الروابط (Links)

الروابط هي ما يجعل الويب "ويب":

\`\`\`html
<!-- رابط خارجي -->
<a href="https://google.com" target="_blank" rel="noopener noreferrer">
  افتح Google في تبويب جديد
</a>

<!-- رابط داخلي -->
<a href="/about">صفحة من نحن</a>

<!-- رابط لقسم في نفس الصفحة -->
<a href="#section-1">اذهب للقسم الأول</a>

<!-- رابط بريد إلكتروني -->
<a href="mailto:info@example.com">راسلنا</a>

<!-- رابط هاتف -->
<a href="tel:+966500000000">اتصل بنا</a>
\`\`\`

**ملاحظات أمنية:**
- استخدم \`rel="noopener noreferrer"\` مع \`target="_blank"\` لمنع الصفحة الجديدة من الوصول لصفحتك
- \`mailto:\` يفتح تطبيق البريد
- \`tel:\` يفتح تطبيق الهاتف على الموبايل`,
      },
      codeSamples: [
        {
          id: "html-text-1",
          language: "html",
          filename: "index.html",
          code: `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8">
  <title>تنسيق النصوص</title>
</head>
<body>
  <h1>دليل تعلم البرمجة</h1>
  
  <h2>المقدمة</h2>
  <p>
    تعلم البرمجة رحلة <strong>ممتعة ومستمرة</strong>. 
    ستحتاج إلى <em>الصبر</em> و <mark>الممارسة اليومية</mark>.
  </p>
  
  <h2>الخطوات</h2>
  <ol>
    <li>اختر لغة برمجة مناسبة للمبتدئين:
      <ul>
        <li>Python — سهلة وقوية</li>
        <li>JavaScript — للويب</li>
        <li>Scratch — للأطفال</li>
      </ul>
    </li>
    <li>تعلم الأساسيات</li>
    <li>ابنِ مشاريع صغيرة</li>
  </ol>
  
  <blockquote>
    "أفضل وقت لزرع شجرة كان قبل 20 سنة. ثاني أفضل وقت هو الآن."
  </blockquote>
  <cite>— مثل صيني</cite>
  
  <p>
    للمزيد، زر <a href="https://developer.mozilla.org" target="_blank" rel="noopener">MDN</a>
  </p>
</body>
</html>`,
          runnable: true,
        },
      ],
      callouts: [
        {
          type: "tip",
          title: { ar: "نصيحة للمبتدئين", en: "Tip for Beginners" },
          body: {
            ar: "لا تحفظ الوسوم! بدلاً من ذلك، افهم الغرض من كل وسم ومتى يستخدم. مع الممارسة ستصبح كتابتها تلقائية. استخدم وثائق MDN كمرجع عند الحاجة.",
            en: "Don't memorize tags! Instead, understand the purpose of each tag and when to use it. With practice, writing them becomes automatic. Use MDN docs as a reference when needed.",
          },
        },
      ],
      keyTakeaways: [
        {
          ar: "استخدم العناوين (h1-h6) هرمياً و h1 مرة واحدة فقط لكل صفحة.",
          en: "Use headings (h1-h6) hierarchically and h1 only once per page.",
        },
        {
          ar: "strong للنص المهم دلالياً، em للنص المشدد، mark للتمييز، code للكود.",
          en: "strong for semantically important text, em for emphasis, mark for highlighting, code for code.",
        },
        {
          ar: "القوائم ثلاثة أنواع: ul (غير مرتبة)، ol (مرتبة)، dl (وصفية).",
          en: "Lists come in three types: ul (unordered), ol (ordered), dl (description).",
        },
        {
          ar: "استخدم rel=\"noopener noreferrer\" مع target=\"_blank\" للأمان.",
          en: "Use rel=\"noopener noreferrer\" with target=\"_blank\" for security.",
        },
      ],
    },
  },
  {
    id: "lesson-html-media",
    moduleId: "module-html-basics",
    courseId: "course-html-css",
    slug: "html-images-media",
    title: { ar: "الصور والوسائط في HTML", en: "Images and Media in HTML" },
    summary: {
      ar: "كيفية إضافة الصور، الفيديوهات، الملفات الصوتية، والـ iframes لصفحتك.",
      en: "How to add images, videos, audio files, and iframes to your page.",
    },
    type: "reading",
    order: 4,
    estimatedMinutes: 20,
    isFree: true,
    isLocked: false,
    content: {
      body: {
        ar: `## الصور في HTML

الصور تجعل صفحاتك جذابة وتساعد في توصيل المعلومات. وسم \`<img>\` يستخدم لإضافة صور:

\`\`\`html
<img 
  src="photo.jpg" 
  alt="وصف الصورة" 
  width="400" 
  height="300"
  loading="lazy"
/>
\`\`\`

### الصفات المهمة

| الصفة | الوصف |
|-------|-------|
| \`src\` | مسار الصورة (مطلوب) |
| \`alt\` | وصف نصي (مطلوب للوصول و SEO) |
| \`width\` / \`height\` | الأبعاد (يمنع إعادة التخطيط) |
| \`loading="lazy"\` | تحميل كسول (يحسن الأداء) |
| \`title\` | نص يظهر عند المرور بالماوس |

### تنسيقات الصور

- **JPG/JPEG**: للصور الفوتوغرافية (ضغط lossy)
- **PNG**: للصور مع الشفافية
- **WebP**: حديث، أفضل ضغط (مدعوم في كل المتصفحات الحديثة)
- **SVG**: للرسومات المتجهة (لوجوه، أيقونات)
- **AVIF**: الأحدث، أفضل ضغط

### الصور المتجاوبة

\`\`\`html
<picture>
  <source srcset="image-large.webp" media="(min-width: 1024px)" type="image/webp">
  <source srcset="image-medium.webp" media="(min-width: 768px)" type="image/webp">
  <img src="image-small.webp" alt="وصف" loading="lazy">
</picture>
\`\`\`

## الفيديو

\`\`\`html
<video 
  width="640" 
  height="360" 
  controls 
  poster="thumbnail.jpg"
  preload="metadata"
>
  <source src="video.mp4" type="video/mp4">
  <source src="video.webm" type="video/webm">
  متصفحك لا يدعم تشغيل الفيديو.
  <track src="subtitles-ar.vtt" kind="subtitles" srclang="ar" label="العربية" default>
</video>
\`\`\`

### صفات الفيديو
- \`controls\`: إظهار أزرار التحكم
- \`autoplay\`: تشغيل تلقائي (قد لا يعمل مع الصوت)
- \`muted\`: كتم الصوت
- \`loop\`: تكرار
- \`poster\`: صورة قبل التشغيل
- \`preload="none|metadata|auto"\`: تحكم في التحميل المسبق

## الصوت

\`\`\`html
<audio controls>
  <source src="audio.mp3" type="audio/mpeg">
  <source src="audio.ogg" type="audio/ogg">
  متصفحك لا يدعم تشغيل الصوت.
</audio>
\`\`\`

## YouTube والـ iframe

\`\`\`html
<iframe 
  width="560" 
  height="315" 
  src="https://www.youtube.com/embed/VIDEO_ID" 
  title="عنوان الفيديو"
  frameborder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
  allowfullscreen
></iframe>
\`\`\`

**تنبيه**: استخدم \`title\` دائماً مع iframe لقارئات الشاشة.

## الصور كروابط

\`\`\`html
<a href="/home">
  <img src="logo.png" alt="العودة للرئيسية">
</a>
\`\`\`

## الأيقونات (SVG inline)

\`\`\`html
<button>
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
    <path d="M5 12h14M12 5l7 7-7 7"/>
  </svg>
  التالي
</button>
\`\`\`

SVG inline أفضل من الصور النقطية للأيقونات لأنها:
- تتحجم بلا فقدان جودة
- تتلون مع CSS
- صغيرة الحجم
- قابلة للأنيميشن`,
      },
      codeSamples: [
        {
          id: "html-media-1",
          language: "html",
          filename: "index.html",
          code: `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8">
  <title>الوسائط</title>
</head>
<body>
  <h1>معرض الصور</h1>
  
  <!-- صورة عادية -->
  <figure>
    <img 
      src="https://picsum.photos/400/300" 
      alt="صورة عشوائية من Lorem Picsum"
      width="400" 
      height="300"
      loading="lazy"
      style="border-radius: 8px;"
    >
    <figcaption>صورة توضيحية</figcaption>
  </figure>
  
  <h2>فيديو تعليمي</h2>
  <video 
    width="400" 
    controls 
    poster="https://picsum.photos/400/225"
    style="border-radius: 8px;"
  >
    <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4">
    متصفحك لا يدعم الفيديو.
  </video>
  
  <h2>فيديو YouTube</h2>
  <iframe 
    width="400" 
    height="225" 
    src="https://www.youtube.com/embed/dQw4w9WgXcQ" 
    title="فيديو يوتيوب"
    frameborder="0" 
    allowfullscreen
    style="border-radius: 8px;"
  ></iframe>
</body>
</html>`,
          runnable: true,
        },
      ],
      callouts: [
        {
          type: "warning",
          title: { ar: "أداء الصور", en: "Image Performance" },
          body: {
            ar: "الصور هي أكبرسبب لبطء المواقع! استخدم WebP بدلاً من PNG/JPG عندما أمكن، حدد الأبعاد دائماً، واستخدم loading=\"lazy\" للصور خارج الشاشة.",
            en: "Images are the biggest cause of slow websites! Use WebP instead of PNG/JPG when possible, always specify dimensions, and use loading=\"lazy\" for off-screen images.",
          },
        },
        {
          type: "danger",
          title: { ar: "إمكانية الوصول", en: "Accessibility" },
          body: {
            ar: "alt ليست اختيارية! قارئات الشاشة تعتمد عليها لوصف الصور للمكفوفين. إذا كانت الصورة زخرفية بحتة، استخدم alt=\"\" فارغاً.",
            en: "alt is NOT optional! Screen readers depend on it to describe images to blind users. If the image is purely decorative, use empty alt=\"\".",
          },
        },
      ],
      keyTakeaways: [
        {
          ar: "<img> يحتاج src و alt دائماً، و width/height لمنع إعادة التخطيط.",
          en: "<img> always needs src and alt, and width/height to prevent layout shift.",
        },
        {
          ar: "WebP و AVIF أفضل من PNG/JPG للأداء.",
          en: "WebP and AVIF are better than PNG/JPG for performance.",
        },
        {
          ar: "<picture> يسمح بصور متجاوبة بمصادر متعددة.",
          en: "<picture> allows responsive images with multiple sources.",
        },
        {
          ar: "حدد title دائماً مع iframe للوصول، واستخدم loading=\"lazy\" للصور.",
          en: "Always specify title with iframes for accessibility, and use loading=\"lazy\" for images.",
        },
      ],
    },
  },
  {
    id: "lesson-html-forms",
    moduleId: "module-html-basics",
    courseId: "course-html-css",
    slug: "html-forms-inputs",
    title: { ar: "النماذج والمدخلات", en: "Forms and Inputs" },
    summary: {
      ar: "بناء نماذج تفاعلية: input, textarea, select, checkbox, radio والتحقق من الصحة.",
      en: "Building interactive forms: input, textarea, select, checkbox, radio and validation.",
    },
    type: "reading",
    order: 5,
    estimatedMinutes: 30,
    isFree: false,
    isLocked: false,
    content: {
      body: {
        ar: `## أساسيات النماذج

النماذج هي كيفية تفاعل المستخدمين مع موقعك: تسجيل الدخول، البحث، إرسال رسالة، إتمام شراء. كلها نماذج.

\`\`\`html
<form action="/submit" method="POST">
  <!-- الحقول هنا -->
  <button type="submit">إرسال</button>
</form>
\`\`\`

### الصفة \`action\` و \`method\`
- \`action\`: URL الخادم الذي سيرسل له النموذج
- \`method\`: GET (افتراضي، يظهر في URL) أو POST (مخفي)

## أنواع المدخلات

### نص عادي
\`\`\`html
<label for="name">الاسم:</label>
<input type="text" id="name" name="name" placeholder="اكتب اسمك" required>
\`\`\`

### أنواع \`type\` المختلفة
\`\`\`html
<input type="email" name="email" placeholder="email@example.com">
<input type="password" name="password" minlength="8">
<input type="number" name="age" min="1" max="120">
<input type="tel" name="phone">
<input type="url" name="website">
<input type="date" name="birthdate">
<input type="time" name="appointment">
<input type="datetime-local" name="datetime">
<input type="month" name="month">
<input type="week" name="week">
<input type="color" name="favcolor">
<input type="range" name="volume" min="0" max="100">
<input type="file" name="document" accept=".pdf,.doc">
<input type="checkbox" name="agree">
<input type="radio" name="gender" value="male">
<input type="hidden" name="csrf_token" value="abc123">
<input type="submit" value="إرسال">
\`\`\`

## الحقول الخاصة

### Textarea (نص متعدد الأسطر)
\`\`\`html
<label for="bio">نبذة عنك:</label>
<textarea id="bio" name="bio" rows="5" cols="40" maxlength="500" 
  placeholder="اكتب نبذة مختصرة..."></textarea>
\`\`\`

### Select (قائمة منسدلة)
\`\`\`html
<label for="country">الدولة:</label>
<select id="country" name="country">
  <option value="">اختر دولتك</option>
  <option value="sa">السعودية</option>
  <option value="ae">الإمارات</option>
  <option value="kw">الكويت</option>
  <optgroup label="دول أخرى">
    <option value="eg">مصر</option>
    <option value="jo">الأردن</option>
  </optgroup>
</select>
\`\`\`

### Checkbox و Radio
\`\`\`html
<fieldset>
  <legend>اختر اهتماماتك:</legend>
  <label>
    <input type="checkbox" name="interests" value="web"> تطوير الويب
  </label>
  <label>
    <input type="checkbox" name="interests" value="mobile"> تطبيقات الموبايل
  </label>
</fieldset>

<fieldset>
  <legend>المستوى:</legend>
  <label>
    <input type="radio" name="level" value="beginner" checked> مبتدئ
  </label>
  <label>
    <input type="radio" name="level" value="advanced"> متقدم
  </label>
</fieldset>
\`\`\`

## التحقق من الصحة (HTML5 Validation)

\`\`\`html
<form>
  <!-- required: حقل إلزامي -->
  <input type="text" required>
  
  <!-- pattern: تعبير منتظم -->
  <input type="text" pattern="[A-Za-z]{3,}" title="3 أحرف على الأقل">
  
  <!-- minlength / maxlength -->
  <input type="password" minlength="8" maxlength="32">
  
  <!-- min / max للأرقام والتواريخ -->
  <input type="number" min="0" max="100" step="5">
  
  <!-- التحقق المخصص بـ JavaScript -->
  <input type="email" 
    oninvalid="this.setCustomValidity('بريد غير صالح')" 
    oninput="this.setCustomValidity('')">
</form>
\`\`\`

## أفضل الممارسات

1. **استخدم \`<label>\` دائماً**: انقر على الـ label يركز على الحقل
2. **استخدم \`fieldset\` و \`legend\`** لتجميع الحقول ذات الصلة
3. **حدد \`autocomplete\`**: يحسن تجربة المستخدم
4. **استخدم \`inputmode\`** للموبايل: يظهر لوحة مفاتيح مناسبة
5. **التحقق من جانب العميل والخادم**: لا تعتمد على HTML فقط

\`\`\`html
<label for="email">البريد الإلكتروني</label>
<input 
  type="email" 
  id="email" 
  name="email" 
  required 
  autocomplete="email"
  inputmode="email"
  placeholder="you@example.com"
>
\`\`\``,
      },
      codeSamples: [
        {
          id: "html-forms-1",
          language: "html",
          filename: "index.html",
          code: `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8">
  <title>نموذج التسجيل</title>
  <style>
    body { font-family: sans-serif; max-width: 500px; margin: 2rem auto; padding: 0 1rem; }
    form { display: flex; flex-direction: column; gap: 1rem; }
    label { font-weight: 600; display: block; margin-bottom: 0.25rem; }
    input, select, textarea { 
      width: 100%; padding: 0.5rem; border: 1px solid #ccc; 
      border-radius: 0.375rem; font-size: 1rem; 
    }
    button { 
      background: #0ea5e9; color: white; padding: 0.75rem; 
      border: none; border-radius: 0.375rem; font-size: 1rem; 
      cursor: pointer; 
    }
    button:hover { background: #0284c7; }
    .field { display: flex; flex-direction: column; }
  </style>
</head>
<body>
  <h1>تسجيل حساب جديد</h1>
  
  <form action="#" method="POST">
    <div class="field">
      <label for="name">الاسم الكامل *</label>
      <input type="text" id="name" name="name" required minlength="3"
             placeholder="اكتب اسمك الكامل">
    </div>
    
    <div class="field">
      <label for="email">البريد الإلكتروني *</label>
      <input type="email" id="email" name="email" required 
             autocomplete="email" placeholder="you@example.com">
    </div>
    
    <div class="field">
      <label for="password">كلمة المرور *</label>
      <input type="password" id="password" name="password" required
             minlength="8" placeholder="8 أحرف على الأقل">
    </div>
    
    <div class="field">
      <label for="age">العمر</label>
      <input type="number" id="age" name="age" min="13" max="120" value="25">
    </div>
    
    <div class="field">
      <label for="country">الدولة</label>
      <select id="country" name="country">
        <option value="">اختر دولتك</option>
        <option value="sa">السعودية</option>
        <option value="ae">الإمارات</option>
        <option value="eg">مصر</option>
      </select>
    </div>
    
    <fieldset>
      <legend>المستوى</legend>
      <label><input type="radio" name="level" value="beginner" checked> مبتدئ</label>
      <label><input type="radio" name="level" value="intermediate"> متوسط</label>
      <label><input type="radio" name="level" value="advanced"> متقدم</label>
    </fieldset>
    
    <div class="field">
      <label for="bio">نبذة عنك</label>
      <textarea id="bio" name="bio" rows="4" maxlength="500"
                placeholder="اختياري — أخبرنا عن نفسك"></textarea>
    </div>
    
    <label>
      <input type="checkbox" name="terms" required>
      أوافق على الشروط والأحكام
    </label>
    
    <button type="submit">إنشاء الحساب</button>
  </form>
</body>
</html>`,
          runnable: true,
        },
      ],
      callouts: [
        {
          type: "tip",
          title: { ar: "تحسين تجربة الموبايل", en: "Mobile UX" },
          body: {
            ar: "استخدم inputmode=\"numeric\" للأرقام، inputmode=\"tel\" للهاتف، inputmode=\"email\" للبريد. هذا يعرض لوحة المفاتيح المناسبة على الموبايل ويحسن التجربة بشكل كبير.",
            en: "Use inputmode=\"numeric\" for numbers, inputmode=\"tel\" for phone, inputmode=\"email\" for email. This shows the appropriate keyboard on mobile and greatly improves UX.",
          },
        },
      ],
      keyTakeaways: [
        {
          ar: "<form> يحتاج action و method، وحقل submit لإرساله.",
          en: "<form> needs action and method, and a submit field to send it.",
        },
        {
          ar: "HTML5 يدعم 20+ نوع input: email, password, number, date, color, file, range, etc.",
          en: "HTML5 supports 20+ input types: email, password, number, date, color, file, range, etc.",
        },
        {
          ar: "اربط <label> بالحقل عبر for=\"id\" لتحسين الوصول وقابلية الاستخدام.",
          en: "Link <label> to field via for=\"id\" to improve accessibility and usability.",
        },
        {
          ar: "التحقق من HTML5 (required, pattern, min/max) مفيد لكن لا يكفي — تحقق من الخادم أيضاً.",
          en: "HTML5 validation (required, pattern, min/max) is helpful but not enough — also validate server-side.",
        },
      ],
    },
  },
  {
    id: "lesson-html-quiz-1",
    moduleId: "module-html-basics",
    courseId: "course-html-css",
    slug: "html-basics-quiz",
    title: { ar: "اختبار: أساسيات HTML", en: "Quiz: HTML Basics" },
    summary: {
      ar: "اختبر فهمك لأساسيات HTML من خلال 5 أسئلة شاملة.",
      en: "Test your understanding of HTML basics with 5 comprehensive questions.",
    },
    type: "quiz",
    order: 6,
    estimatedMinutes: 10,
    isFree: true,
    isLocked: false,
    content: {
      body: {
        ar: `## اختبار أساسيات HTML

أجب عن الأسئلة التالية للتحقق من فهمك للدروس السابقة. ستحصل على نقاط خبرة فور اجتيازك للاختبار بنسبة 70% أو أعلى.`,
        en: `## HTML Basics Quiz

Answer the following questions to verify your understanding of previous lessons. You'll earn XP instantly upon passing with 70% or higher.`,
      },
      quiz: {
        id: "quiz-html-basics",
        passingScore: 70,
        questions: [
          {
            id: "q1",
            type: "single-choice",
            prompt: { ar: "ماذا تعني HTML؟", en: "What does HTML stand for?" },
            options: [
              { ar: "HyperText Markup Language", en: "HyperText Markup Language" },
              { ar: "High Tech Modern Language", en: "High Tech Modern Language" },
              { ar: "Home Tool Markup Language", en: "Home Tool Markup Language" },
              { ar: "Hyperlink Text Management Language", en: "Hyperlink Text Management Language" },
            ],
            correctAnswers: [0],
            explanation: {
              ar: "HTML تعني HyperText Markup Language، وهي لغة ترميز تصف هيكل صفحات الويب.",
              en: "HTML stands for HyperText Markup Language, a markup language that describes web page structure.",
            },
            points: 20,
          },
          {
            id: "q2",
            type: "single-choice",
            prompt: { ar: "أي وسم يستخدم مرة واحدة فقط في كل صفحة بشكل مثالي؟", en: "Which tag should ideally appear only once per page?" },
            options: [
              { ar: "<div>", en: "<div>" },
              { ar: "<h1>", en: "<h1>" },
              { ar: "<p>", en: "<p>" },
              { ar: "<span>", en: "<span>" },
            ],
            correctAnswers: [1],
            explanation: {
              ar: "<h1> يستخدم مرة واحدة لكل صفحة لأنه العنوان الرئيسي و مهم لـ SEO.",
              en: "<h1> should appear once per page as it's the main heading and important for SEO.",
            },
            points: 20,
          },
          {
            id: "q3",
            type: "multiple-choice",
            prompt: { ar: "أي من الصفات إلزامية في وسم <img>؟", en: "Which attributes are mandatory on <img>?" },
            options: [
              { ar: "src", en: "src" },
              { ar: "alt", en: "alt" },
              { ar: "title", en: "title" },
              { ar: "width", en: "width" },
            ],
            correctAnswers: [0, 1],
            explanation: {
              ar: "src (مصدر الصورة) و alt (الوصف النصي) إلزاميان. alt ضروري للوصول و SEO.",
              en: "src (image source) and alt (text description) are mandatory. alt is essential for accessibility and SEO.",
            },
            points: 20,
          },
          {
            id: "q4",
            type: "true-false",
            prompt: { ar: "HTML هي لغة برمجة بمعناها الحرفي.", en: "HTML is a programming language in the literal sense." },
            options: [
              { ar: "صحيح", en: "True" },
              { ar: "خطأ", en: "False" },
            ],
            correctAnswers: [1],
            explanation: {
              ar: "خطأ! HTML لغة ترميز (markup) وليست لغة برمجة. لا تحتوي على منطق أو شروط أو حلقات.",
              en: "False! HTML is a markup language, not a programming language. It has no logic, conditions, or loops.",
            },
            points: 20,
          },
          {
            id: "q5",
            type: "single-choice",
            prompt: { ar: "ماذا يفعل rel=\"noopener noreferrer\" مع target=\"_blank\"؟", en: "What does rel=\"noopener noreferrer\" do with target=\"_blank\"?" },
            options: [
              { ar: "يفتح الرابط بشكل أسرع", en: "Opens the link faster" },
              { ar: "يمنع الصفحة الجديدة من الوصول لصفحتك", en: "Prevents the new page from accessing your page" },
              { ar: "يجعل الرابط غير قابل للنقر", en: "Makes the link non-clickable" },
              { ar: "يحسن SEO", en: "Improves SEO" },
            ],
            correctAnswers: [1],
            explanation: {
              ar: "يمنع الصفحة الجديدة من الوصول لكائن window الأصلي، مما يحمي من هجمات reverse tabnabbing.",
              en: "It prevents the new page from accessing the original window object, protecting against reverse tabnabbing attacks.",
            },
            points: 20,
          },
        ],
      },
    },
  },
];

const module2Lessons: Lesson[] = [
  {
    id: "lesson-css-intro",
    moduleId: "module-css-basics",
    courseId: "course-html-css",
    slug: "css-introduction",
    title: { ar: "مقدمة في CSS", en: "Introduction to CSS" },
    summary: {
      ar: "ما هو CSS، كيف يرتبط بـ HTML، والمحددات والخصائص الأساسية.",
      en: "What is CSS, how it relates to HTML, and basic selectors and properties.",
    },
    type: "reading",
    order: 1,
    estimatedMinutes: 20,
    isFree: true,
    isLocked: false,
    content: {
      body: {
        ar: `## ما هو CSS؟

**CSS** (Cascading Style Sheets) هي لغة تنسيق تصف كيف يبدو محتوى HTML. إذا كانت HTML الهيكل العظمي، فإن CSS هي الجلد والملابس والزينة.

بدون CSS، كل المواقع ستبدو كمستندات نصية مملة. CSS تعطيك تحكماً كاملاً في:
- الألوان والخلفيات
- الخطوط وأحجامها
- التباعد والهوامش
- التخطيط (Layout)
- الحركات والانتقالات
- التجاوب مع الشاشات المختلفة

## طرق إضافة CSS

### 1. Inline Style (مباشر في الوسم)
\`\`\`html
<p style="color: red; font-size: 18px;">نص أحمر كبير</p>
\`\`\`

**عيوب**: لا يُنصح به، يخلط التنسيق بالمحتوى، لا يمكن إعادة استخدامه.

### 2. Internal Style (في head الصفحة)
\`\`\`html
<head>
  <style>
    p { color: red; font-size: 18px; }
  </style>
</head>
\`\`\`

**عيوب**: محدود لصفحة واحدة.

### 3. External Style Sheet (ملف خارجي) — الأفضل
\`\`\`html
<head>
  <link rel="stylesheet" href="styles.css">
</head>
\`\`\`

**مميزات**:
- فصل تام بين المحتوى والتنسيق
- قابل لإعادة الاستخدام في عدة صفحات
- المتصفح يخزنه مؤقتاً (أداء أفضل)
- سهولة الصيانة

## بنية قاعدة CSS

\`\`\`
selector {
  property: value;
  property: value;
}
\`\`\`

مثال:
\`\`\`css
h1 {
  color: #0ea5e9;
  font-size: 2rem;
  font-weight: bold;
}
\`\`\`

## المحددات (Selectors)

### 1. محدد العنصر
\`\`\`css
p { color: #333; }       /* جميع الفقرات */
h1 { color: blue; }      /* جميع العناوين */
a { text-decoration: none; }
\`\`\`

### 2. محدد الصف (Class) — يبدأ بنقطة
\`\`\`css
.button {
  background: blue;
  color: white;
  padding: 0.5rem 1rem;
}
\`\`\`html
<button class="button">اضغط</button>
<a class="button" href="#">رابط كزر</a>
\`\`\`

### 3. محدد المُعرّف (ID) — يبدأ بـ #
\`\`\`css
#main-header {
  background: navy;
  color: white;
}
\`\`\`html
<header id="main-header">...</header>
\`\`\`

**ملاحظة**: ID يجب أن يكون فريداً في الصفحة. استخدم class للأغراض العامة.

### 4. محددات متعددة
\`\`\`css
/* نفس التنسيق لعدة عناصر */
h1, h2, h3 {
  color: #333;
  font-family: 'Cairo', sans-serif;
}

/* عناصر متداخلة */
nav a {
  text-decoration: none;
  color: inherit;
}

/* ابن مباشر فقط */
nav > a {
  margin: 0 0.5rem;
}
\`\`\`

### 5. محددات الصفات (Attribute selectors)
\`\`\`css
input[type="text"] { border: 1px solid #ccc; }
input[type="checkbox"] { width: 20px; height: 20px; }
a[href^="https"] { color: green; }  /* يبدأ بـ */
a[href$=".pdf"] { color: red; }     /* ينتهي بـ */
\`\`\`

### 6. Pseudo-classes (حالات خاصة)
\`\`\`css
a:link { color: blue; }       /* رابط لم يزر */
a:visited { color: purple; }  /* رابط مزار */
a:hover { color: red; }       /* عند المرور بالماوس */
a:active { color: orange; }   /* عند الضغط */
a:focus { outline: 2px solid blue; } /* عند التركيز */

li:first-child { color: green; }
li:last-child { color: red; }
li:nth-child(odd) { background: #f0f0f0; }
li:nth-child(3n+1) { color: blue; }
\`\`\`

## الخصائص الشائعة

### الألوان
\`\`\`css
color: red;
color: #ff0000;
color: rgb(255, 0, 0);
color: rgba(255, 0, 0, 0.5);
color: hsl(0, 100%, 50%);
color: var(--my-color);
\`\`\`

### الخطوط
\`\`\`css
font-family: 'Cairo', sans-serif;
font-size: 16px;        /* أو 1rem, 100%, 1em */
font-weight: normal;    /* أو 400, bold, 700 */
font-style: italic;
line-height: 1.6;
text-align: center;     /* أو right, left, justify */
text-decoration: underline;
text-transform: uppercase;
\`\`\`

### الصندوق (Box Model)
\`\`\`css
.box {
  width: 200px;
  height: 100px;
  padding: 20px;        /* مساحة داخلية */
  border: 2px solid #333;
  margin: 10px;         /* مساحة خارجية */
  box-sizing: border-box; /* مهم! */
}
\`\`\`

**مهم دائماً**: أضف \`box-sizing: border-box\` لكل العناصر:
\`\`\`css
* { box-sizing: border-box; }
\`\`\`

هذا يجعل width/height تشمل padding و border، مما يبسط الحسابات.`,
      },
      codeSamples: [cssSample1],
      callouts: [
        {
          type: "info",
          title: { ar: "أولوية CSS", en: "CSS Specificity" },
          body: {
            ar: "ترتيب الأولوية (من الأعلى للأقل): !important > inline style > #id > .class > tag. تجنب !important قدر الإمكان لأنه يجعل الصيانة صعبة.",
            en: "Priority order (high to low): !important > inline style > #id > .class > tag. Avoid !important when possible as it makes maintenance difficult.",
          },
        },
      ],
      keyTakeaways: [
        {
          ar: "CSS تفصل التنسيق عن المحتوى، وملف خارجي هو أفضل طريقة.",
          en: "CSS separates presentation from content; an external file is best practice.",
        },
        {
          ar: "المحددات: tag، .class (متكرر)، #id (فريد)، [attr]، :pseudo-class.",
          en: "Selectors: tag, .class (reusable), #id (unique), [attr], :pseudo-class.",
        },
        {
          ar: "أضف * { box-sizing: border-box; } دائماً في بداية ملف CSS.",
          en: "Always add * { box-sizing: border-box; } at the start of CSS files.",
        },
        {
          ar: "تجنب !important، اعتمد على الأولوية الطبيعية للمحددات.",
          en: "Avoid !important, rely on natural selector specificity.",
        },
      ],
    },
  },
  {
    id: "lesson-css-box-model",
    moduleId: "module-css-basics",
    courseId: "course-html-css",
    slug: "css-box-model",
    title: { ar: "نموذج الصندوق (Box Model)", en: "The Box Model" },
    summary: {
      ar: "افهم margin, padding, border, content وكيف يحسب المتصفح الأبعاد.",
      en: "Understand margin, padding, border, content and how the browser calculates dimensions.",
    },
    type: "reading",
    order: 2,
    estimatedMinutes: 25,
    isFree: false,
    isLocked: false,
    content: {
      body: {
        ar: `## ما هو الـ Box Model؟

كل عنصر في HTML يعتبر "صندوقاً" مستطيلاً يتكون من 4 طبقات:

\`\`\`
┌─────────────────────────────────┐
│           margin                │
│  ┌───────────────────────────┐  │
│  │         border            │  │
│  │  ┌─────────────────────┐  │  │
│  │  │      padding        │  │  │
│  │  │  ┌───────────────┐  │  │  │
│  │  │  │   content     │  │  │  │
│  │  │  │               │  │  │  │
│  │  │  └───────────────┘  │  │  │
│  │  └─────────────────────┘  │  │
│  └───────────────────────────┘  │
└─────────────────────────────────┘
\`\`\`

### الطبقات من الداخل للخارج
1. **Content**: المحتوى الفعلي (نص، صورة...)
2. **Padding**: مساحة داخلية بين المحتوى والحدود
3. **Border**: الحدود حول العنصر
4. **Margin**: مساحة خارجية بين العنصر والعناصر المجاورة

## تحديد الأبعاد

\`\`\`css
.box {
  width: 300px;
  height: 200px;
  padding: 20px;
  border: 5px solid #333;
  margin: 15px;
}
\`\`\`

### بدون \`box-sizing: border-box\`
العرض الإجمالي = 300 + 20*2 + 5*2 = 350px
الارتفاع الإجمالي = 200 + 20*2 + 5*2 = 250px

### مع \`box-sizing: border-box\` (الموصى به)
العرض الإجمالي = 300px (يحتوي كل شيء)
المحتوى الفعلي = 300 - 20*2 - 5*2 = 250px

## Margin

\`\`\`css
/* قيم مختلفة لكل جهة */
margin-top: 10px;
margin-right: 20px;
margin-bottom: 15px;
margin-left: 25px;

/* اختصار: top right bottom left */
margin: 10px 20px 15px 25px;

/* اختصار: top/bottom left/right */
margin: 10px 20px;

/* اختصار: كل الجهات */
margin: 10px;

/* توسيط أفقي */
margin: 0 auto;

/* قيم سالبة (يتداخل مع غيره) */
margin-top: -20px;
\`\`\`

### Margin Collapse
عندما يلتقي عنصران عمودياً، الـ margin بينهما لا يجمع، بل يأخذ الأكبر:
\`\`\`
.element-1 { margin-bottom: 30px; }
.element-2 { margin-top: 20px; }
/* المسافة بينهما = 30px وليس 50px */
\`\`\`

## Padding

نفس القواعد لكن للمساحة الداخلية:

\`\`\`css
padding: 20px;              /* كل الجهات */
padding: 10px 20px;         /* top/bottom left/right */
padding: 10px 20px 30px 40px; /* top right bottom left */
\`\`\`

**ملاحظة**: padding لا يقبل قيماً سالبة.

## Border

\`\`\`css
border: 2px solid #333;     /* اختصار */
border-width: 2px;
border-style: solid;        /* solid, dashed, dotted, double, none */
border-color: #333;
border-radius: 8px;         /* زوايا دائرية */
border-top: 1px dashed red;
\`\`\`

### حدود متقدمة
\`\`\`css
/* زوايا مختلفة */
border-radius: 10px 20px 30px 40px;

/* دائرة كاملة */
border-radius: 50%;

/* حد سفلي فقط */
border-bottom: 3px solid #0ea5e9;

/* بدون حد */
border: none;
\`\`\`

## Display Types

\`\`\`css
display: block;        /* يأخذ عرض كامل، سطر جديد */
display: inline;       /* بحجم المحتوى، لا يقبل width/height */
display: inline-block; /* بحجم المحتوى، يقبل width/height */
display: none;         /* مخفي تماماً */
display: flex;         /* تخطيط مرن */
display: grid;         /* تخطيط شبكي */
\`\`\`

| العنصر | Display الافتراضي |
|--------|------------------|
| \`<div>\`, \`<p>\`, \`<h1>\` | block |
| \`<span>\`, \`<a>\`, \`<strong>\` | inline |
| \`<img>\`, \`<input>\` | inline-block |

## Width و Height

\`\`\`css
.box {
  width: 300px;          /* عرض ثابت */
  width: 50%;            /* نسبة من الأب */
  width: auto;           /* افتراضي */
  max-width: 600px;      /* أقصى عرض */
  min-width: 200px;      /* أدنى عرض */
  
  height: 100vh;         /* ارتفاع الشاشة كاملة */
  height: auto;          /* حسب المحتوى */
}
\`\`\`

## تجربة عملية

في المحرر، جرّب:
1. غيّر قيم padding وشاهد كيف يتغير حجم العنصر
2. أضف border بأنماط مختلفة (dashed, dotted, double)
3. جرّب margin سالبة و شاهد التداخل`,
      },
      codeSamples: [
        {
          id: "css-box-model-1",
          language: "html",
          filename: "index.html",
          code: `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8">
  <title>Box Model</title>
  <style>
    * { box-sizing: border-box; }
    body { 
      font-family: sans-serif; padding: 2rem; 
      background: #f1f5f9;
    }
    
    .box {
      width: 300px;
      height: 150px;
      padding: 20px;
      border: 5px solid #0ea5e9;
      margin: 20px auto;
      background: white;
      border-radius: 8px;
      
      /* إظهار الطبقات */
      box-shadow: 
        0 0 0 10px rgba(14, 165, 233, 0.2),  /* padding visualized */
        0 0 0 15px rgba(14, 165, 233, 0.4);  /* margin visualized */
    }
    
    .nested {
      background: #fef3c7;
      padding: 15px;
      border: 2px dashed #f59e0b;
      margin-top: 10px;
    }
  </style>
</head>
<body>
  <div class="box">
    <strong>Content area</strong>
    <p>هذا المحتوى داخل الصندوق.</p>
  </div>
  
  <div class="nested">
    صندوق متداخل
  </div>
</body>
</html>`,
          runnable: true,
        },
      ],
      callouts: [
        {
          type: "tip",
          title: { ar: "اختصار مفيد", en: "Helpful Shorthand" },
          body: {
            ar: "تذكر ترتيب قيم الاختصار (TRouBLe): Top, Right, Bottom, Left. مثل عقارب الساعة بدءاً من الأعلى.",
            en: "Remember shorthand order (TRouBLe): Top, Right, Bottom, Left. Like clockwise starting from top.",
          },
        },
      ],
      keyTakeaways: [
        {
          ar: "كل عنصر HTML هو صندوق من 4 طبقات: content, padding, border, margin.",
          en: "Every HTML element is a box with 4 layers: content, padding, border, margin.",
        },
        {
          ar: "box-sizing: border-box يجعل width تشمل padding و border — استخدمه دائماً.",
          en: "box-sizing: border-box makes width include padding and border — always use it.",
        },
        {
          ar: "margin يمكن أن يكون سالباً (تداخل)، padding لا يقبل سالب.",
          en: "margin can be negative (overlap), padding cannot be negative.",
        },
        {
          ar: "margin collapse يحدث عمودياً بين العناصر المتجاورة.",
          en: "margin collapse happens vertically between adjacent elements.",
        },
      ],
    },
  },
  {
    id: "lesson-css-flexbox",
    moduleId: "module-css-basics",
    courseId: "course-html-css",
    slug: "css-flexbox",
    title: { ar: "تخطيط Flexbox", en: "Flexbox Layout" },
    summary: {
      ar: "أتقن Flexbox لترتيب العناصر في صف أو عمود بسهولة ومرونة.",
      en: "Master Flexbox to arrange elements in rows or columns easily and flexibly.",
    },
    type: "reading",
    order: 3,
    estimatedMinutes: 35,
    isFree: false,
    isLocked: false,
    content: {
      body: {
        ar: `## ما هو Flexbox؟

Flexbox (Flexible Box Layout) هو نظام تخطيط أحادي الاتجاه (صف أو عمود) مصمم لترتيب العناصر وتوزيع المساحات بينها بكفاءة، حتى عندما يكون حجمها غير معروف مسبقاً.

## الأساسيات

\`\`\`css
.container {
  display: flex;
  /* الآن أبناء .container يصبحون flex items */
}
\`\`\`

بشكل افتراضي:
- العناصر تصطف أفقياً (row)
- تأخذ ارتفاع الحاوية
- تبدأ من اليمين (RTL) أو اليسار (LTR)

## خصائص الحاوية (Container)

### flex-direction
\`\`\`css
flex-direction: row;             /* أفقي (افتراضي) */
flex-direction: row-reverse;     /* أفقي معكوس */
flex-direction: column;          /* عمودي */
flex-direction: column-reverse;  /* عمودي معكوس */
\`\`\`

### justify-content (توزيع على المحور الرئيسي)
\`\`\`css
justify-content: flex-start;     /* البداية */
justify-content: flex-end;       /* النهاية */
justify-content: center;         /* المنتصف */
justify-content: space-between;  /* مسافات متساوية، أول وآخر بالأطراف */
justify-content: space-around;   /* مسافات متساوية حول كل عنصر */
justify-content: space-evenly;   /* مسافات متساوية تماماً */
\`\`\`

### align-items (محاذاة على المحور العمودي)
\`\`\`css
align-items: stretch;       /* يتمدد (افتراضي) */
align-items: flex-start;    /* الأعلى */
align-items: flex-end;      /* الأسفل */
align-items: center;        /* المنتصف */
align-items: baseline;      /* على خط الأساس */
\`\`\`

### flex-wrap
\`\`\`css
flex-wrap: nowrap;     /* على سطر واحد، قد تتداخل */
flex-wrap: wrap;       /* تنتقل لسطر جديد عند الحاجة */
flex-wrap: wrap-reverse;
\`\`\`

### align-content (توزيع الأسطر المتعددة)
\`\`\`css
align-content: flex-start;
align-content: flex-end;
align-content: center;
align-content: space-between;
align-content: stretch;  /* افتراضي */
\`\`\`

### gap (مسافات بين العناصر)
\`\`\`css
gap: 1rem;              /* كل الاتجاهات */
gap: 1rem 2rem;         /* صف عمود */
row-gap: 1rem;
column-gap: 2rem;
\`\`\`

## خصائص العنصر (Item)

### flex (اختصار)
\`\`\`css
.item {
  flex: 1;          /* flex-grow:1, flex-shrink:1, flex-basis:0% */
  flex: 1 0 200px;  /* grow shrink basis */
  flex: auto;       /* 1 1 auto */
  flex: none;       /* 0 0 auto */
}
\`\`\`

### flex-grow (النمو)
\`\`\`css
.item-a { flex-grow: 1; }  /* يأخذ حصة من المساحة الزائدة */
.item-b { flex-grow: 2; }  /* يأخذ ضعف ما يأخذه a */
.item-c { flex-grow: 0; }  /* لا ينمو */
\`\`\`

### flex-shrink (التقلص)
\`\`\`css
.item { flex-shrink: 0; }  /* لا يتقلص، قد يفيض */
.item { flex-shrink: 1; }  /* يتقلص عند الحاجة */
\`\`\`

### flex-basis (الحجم الأولي)
\`\`\`css
.item { flex-basis: 200px; }  /* يبدأ بـ 200px */
.item { flex-basis: auto; }   /* حسب المحتوى */
\`\`\`

### order (ترتيب)
\`\`\`css
.item-first { order: -1; }  /* قبل الآخرين */
.item-last { order: 99; }   /* بعد الآخرين */
\`\`\`

### align-self (محاذاة فردية)
\`\`\`css
.item {
  align-self: center;     /* يتجاوز align-items */
  align-self: flex-start;
}
\`\`\`

## أمثلة عملية

### 1. توسيط كامل (الأكثر استخداماً)
\`\`\`css
.center {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}
\`\`\`

### 2. شريط تنقل
\`\`\`css
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
}

.nav-links {
  display: flex;
  gap: 1.5rem;
}
\`\`\`

### 3. بطاقات متساوية
\`\`\`css
.cards {
  display: flex;
  gap: 1rem;
}

.card {
  flex: 1;  /* كل بطاقة تأخذ حصة متساوية */
}
\`\`\`

### 4. Sidebar + محتوى
\`\`\`css
.layout {
  display: flex;
  gap: 2rem;
}

.sidebar {
  flex: 0 0 250px;  /* عرض ثابت */
}

.main {
  flex: 1;  /* يأخذ الباقي */
}
\`\`\`

### 5. صف متجدد
\`\`\`css
.grid-auto {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.grid-auto > * {
  flex: 1 1 250px;  /* ينمو ويتقلص، أساس 250px */
}
\`\`\``,
      },
      codeSamples: [flexboxSample],
      callouts: [
        {
          type: "tip",
          title: { ar: "قاعدة ذهبية", en: "Golden Rule" },
          body: {
            ar: "Flexbox للترتيب أحادي الاتجاه (صف أو عمود). CSS Grid للترتيب ثنائي الاتجاه (صفوف وأعمدة معاً). تعلم الاثنين واستخدم الأنسب لكل حالة.",
            en: "Flexbox for one-direction layouts (row or column). CSS Grid for two-direction (rows AND columns). Learn both and use the right one for each case.",
          },
        },
      ],
      keyTakeaways: [
        {
          ar: "Flexbox نظام تخطيط مرن لصف أو عمود، مثالي للقوائم وأشرطة التنقل.",
          en: "Flexbox is a flexible one-direction layout system, ideal for lists and navbars.",
        },
        {
          ar: "justify-content للترتيب على المحور الرئيسي، align-items للعمودي.",
          en: "justify-content for main axis alignment, align-items for cross axis.",
        },
        {
          ar: "flex: 1 يجعل العنصر يأخذ كل المساحة المتاحة بالتساوي مع غيره.",
          en: "flex: 1 makes the element share available space equally with others.",
        },
        {
          ar: "gap يضيف مسافات بين عناصر flex دون الحاجة لـ margins.",
          en: "gap adds space between flex items without needing margins.",
        },
      ],
    },
  },
  {
    id: "lesson-css-grid",
    moduleId: "module-css-basics",
    courseId: "course-html-css",
    slug: "css-grid",
    title: { ar: "تخطيط CSS Grid", en: "CSS Grid Layout" },
    summary: {
      ar: "بناء تخطيطات ثنائية الأبعاد معقدة باستخدام CSS Grid.",
      en: "Build complex two-dimensional layouts with CSS Grid.",
    },
    type: "reading",
    order: 4,
    estimatedMinutes: 35,
    isFree: false,
    isLocked: false,
    content: {
      body: {
        ar: `## ما هو CSS Grid؟

CSS Grid هو نظام تخطيط ثنائي الأبعاد يسمح لك بترتيب العناصر في **صفوف وأعمدة معاً**. أكثر قوة من Flexbox للتخطيطات المعقدة.

\`\`\`css
.container {
  display: grid;
  grid-template-columns: 200px 1fr 200px;
  grid-template-rows: auto 1fr auto;
  gap: 1rem;
}
\`\`\`

## تعريف الأعمدة والصفوف

### وحدات الأعمدة
\`\`\`css
grid-template-columns: 
  200px        /* عرض ثابت */
  50%          /* نسبة من الحاوية */
  1fr          /* حصة من المساحة المتاحة */
  2fr          /* ضعف 1fr */
  minmax(200px, 1fr)  /* بين 200px و 1fr */
  auto;        /* حسب المحتوى */
\`\`\`

### repeat()
\`\`\`css
grid-template-columns: repeat(3, 1fr);          /* 3 أعمدة متساوية */
grid-template-columns: repeat(3, 200px);        /* 3 أعمدة 200px */
grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));  /* متجاوب! */
grid-template-columns: repeat(auto-fill, 200px);
\`\`\`

**الفرق بين auto-fit و auto-fill**:
- \`auto-fit\`: يمدد العناصر لتملأ المساحة المتاحة
- \`auto-fill\`: يترك مساحات فارغة إذا كان عدد العناصر قليلاً

### تسمية الخطوط
\`\`\`css
grid-template-columns: [start] 200px [sidebar] 1fr [content] 200px [end];
\`\`\`

### المساحات المحددة (template-areas)
\`\`\`css
.container {
  grid-template-columns: 200px 1fr;
  grid-template-rows: auto 1fr auto;
  grid-template-areas:
    "header header"
    "sidebar main"
    "footer footer";
}

.header { grid-area: header; }
.sidebar { grid-area: sidebar; }
.main { grid-area: main; }
.footer { grid-area: footer; }
\`\`\`

## موضع العناصر

### حسب الخطوط
\`\`\`css
.item {
  grid-column: 1 / 3;    /* من خط 1 إلى خط 3 */
  grid-row: 2 / 4;       /* من خط 2 إلى خط 4 */
  
  /* أو */
  grid-column-start: 1;
  grid-column-end: 3;
  
  /* استخدام span */
  grid-column: span 2;   /* يأخذ عمودين */
}
\`\`\`

### حسب المساحات المحددة
\`\`\`css
.item { grid-area: header; }
\`\`\`

## محاذاة العناصر

\`\`\`css
/* على الحاوية */
justify-items: start | end | center | stretch;
align-items: start | end | center | stretch;
place-items: center;  /* اختصار للاثنين */

/* على عنصر فردي */
justify-self: center;
align-self: center;
\`\`\`

## توزيع المساحات

\`\`\`css
justify-content: start | end | center | space-between | space-around | space-evenly;
align-content: start | end | center | space-between | space-around;
\`\`\`

## شبكات متجاوبة

\`\`\`css
.responsive-grid {
  display: grid;
  gap: 1rem;
  grid-template-columns: 1fr;  /* موبايل */
}

@media (min-width: 768px) {
  .responsive-grid {
    grid-template-columns: repeat(2, 1fr);  /* تابلت */
  }
}

@media (min-width: 1024px) {
  .responsive-grid {
    grid-template-columns: repeat(3, 1fr);  /* ديسكتوب */
  }
}

/* أو الأبسط: استخدم auto-fit */
.auto-responsive {
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
}
\`\`\`

## مثال كامل: تخطيط مدونة

\`\`\`css
.blog-layout {
  display: grid;
  grid-template-columns: 1fr 3fr 1fr;
  grid-template-rows: auto 1fr auto;
  grid-template-areas:
    "header header header"
    "nav    main   aside"
    "footer footer footer";
  min-height: 100vh;
  gap: 1rem;
  padding: 1rem;
}

.blog-header { grid-area: header; }
.blog-nav    { grid-area: nav; }
.blog-main   { grid-area: main; }
.blog-aside  { grid-area: aside; }
.blog-footer { grid-area: footer; }
\`\`\`

## Flexbox vs Grid

| الحالة | الأنسب |
|-------|-------|
| شريط تنقل | Flexbox |
| صف بطاقات | Flexbox (مع wrap) أو Grid |
| صفحات كاملة | Grid |
| قائمة عناصر عمودية | Flexbox (column) |
| تخطيط معقد بأعمدة وصفوف | Grid |
| توسيط عنصر | Flexbox |

**القاعدة**: استخدم Flexbox افتراضياً، وانتقل لـ Grid عند الحاجة لتحكم في الصفوف والأعمدة معاً.`,
      },
      codeSamples: [gridSample],
      callouts: [
        {
          type: "success",
          title: { ar: "نمط متجاوب بسيط", en: "Simple Responsive Pattern" },
          body: {
            ar: "grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)) هو سحر CSS Grid! ينشئ شبكة تتكيف تلقائياً مع حجم الشاشة دون media queries.",
            en: "grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)) is CSS Grid magic! It creates a grid that auto-adapts to screen size without media queries.",
          },
        },
      ],
      keyTakeaways: [
        {
          ar: "CSS Grid لتخطيطات ثنائية الأبعاد (صفوف وأعمدة معاً).",
          en: "CSS Grid for two-dimensional layouts (rows AND columns).",
        },
        {
          ar: "grid-template-areas يجعل التخطيط قابلاً للقراءة كرسم بياني.",
          en: "grid-template-areas makes layouts readable like a diagram.",
        },
        {
          ar: "repeat(auto-fit, minmax(min, 1fr)) لتخطيط متجاوب تلقائي.",
          en: "repeat(auto-fit, minmax(min, 1fr)) for automatic responsive layout.",
        },
        {
          ar: "gap يضيف مسافات بين الخلايا، يشبه flex gap.",
          en: "gap adds spacing between cells, similar to flex gap.",
        },
      ],
    },
  },
  {
    id: "lesson-css-responsive",
    moduleId: "module-css-basics",
    courseId: "course-html-css",
    slug: "css-responsive-design",
    title: { ar: "التصميم المتجاوب", en: "Responsive Design" },
    summary: {
      ar: "Mobile-first design, media queries, الوحدات النسبية، والصور المتجاوبة.",
      en: "Mobile-first design, media queries, relative units, and responsive images.",
    },
    type: "reading",
    order: 5,
    estimatedMinutes: 30,
    isFree: false,
    isLocked: false,
    content: {
      body: {
        ar: `## ما هو التصميم المتجاوب؟

التصميم المتجاوب (Responsive Design) يجعل صفحتك تعمل بشكل ممتاز على كل الأحجام: من الموبايل (320px) إلى التابلت (768px) إلى الديسكتوب (1920px+).

## المكونات الأساسية

### 1. Viewport Meta Tag
\`\`\`html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
\`\`\`
بدون هذا السطر، الموبايل سيصغر صفحتك كاملة!

### 2. الوحدات النسبية

| الوحدة | المعنى |
|-------|-------|
| \`%\` | نسبة من الأب |
| \`em\` | نسبة من حجم خط الأب |
| \`rem\` | نسبة من حجم خط الجذر (html) |
| \`vw\` | 1% من عرض النافذة |
| \`vh\` | 1% من ارتفاع النافذة |
| \`vmin\` | أصغر vw/vh |
| \`vmax\` | أكبر vw/vh |
| \`ch\` | عرض حرف "0" في الخط الحالي |
| \`fr\` | وحدة Grid |

\`\`\`css
html { font-size: 16px; }   /* الأساس */

h1 { font-size: 2rem; }     /* 32px */
p { font-size: 1rem; }      /* 16px */
.small { font-size: 0.875rem; }  /* 14px */

.full-width { width: 100vw; }
.hero { height: 100vh; }
\`\`\`

### 3. Media Queries

\`\`\`css
/* الأساس: تنسيق للموبايل */
.container {
  padding: 1rem;
  font-size: 14px;
}

/* تابلت وأكبر */
@media (min-width: 768px) {
  .container {
    padding: 2rem;
    font-size: 16px;
  }
}

/* ديسكتوب */
@media (min-width: 1024px) {
  .container {
    padding: 3rem;
    max-width: 1200px;
    margin: 0 auto;
  }
}
\`\`\`

### أنواع Media Queries

\`\`\`css
/* عرض */
@media (min-width: 768px) { }
@media (max-width: 767px) { }

/* اتجاه */
@media (orientation: portrait) { }
@media (orientation: landscape) { }

/* طباعة */
@media print { }

/* تفضيلات المستخدم */
@media (prefers-color-scheme: dark) { }
@media (prefers-reduced-motion: reduce) { }

/* دقة */
@media (min-resolution: 2dppx) { }
\`\`\`

## استراتيجية Mobile First

ابدأ بكتابة تنسيق الموبايل (الأبسط)، ثم أضف للشاشات الأكبر:

\`\`\`css
/* 1. أساس: موبايل */
.grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
}

/* 2. تابلت */
@media (min-width: 640px) {
  .grid { grid-template-columns: repeat(2, 1fr); }
}

/* 3. ديسكتوب صغير */
@media (min-width: 1024px) {
  .grid { grid-template-columns: repeat(3, 1fr); }
}

/* 4. شاشات كبيرة */
@media (min-width: 1280px) {
  .grid { grid-template-columns: repeat(4, 1fr); }
}
\`\`\`

**مميزات Mobile First**:
- كود أقل (الأجهزة الصغيرة لا تحمل CSS غير ضروري)
- أفضل أداء على الموبايل
- يفرض عليك التركيز على المحتوى الأساسي

## Breakpoints الشائعة (Tailwind)

\`\`\`
sm:  640px    /* تابلت صغير */
md:  768px    /* تابلت */
lg:  1024px   /* ديسكتوب */
xl:  1280px   /* ديسكتوب كبير */
2xl: 1536px   /* شاشة كبيرة */
\`\`\`

## تقنيات متقدمة

### Container Queries (حديث)
\`\`\`css
.sidebar {
  container-type: inline-size;
}

@container (min-width: 400px) {
  .card { 
    display: grid;
    grid-template-columns: 100px 1fr;
  }
}
\`\`\`

###clamp() و min()/max()
\`\`\`css
/* خط يتكيف مع الشاشة */
h1 {
  font-size: clamp(1.5rem, 4vw, 3rem);
}

/* padding ديناميكي */
.section {
  padding: max(1rem, 5vw);
}
\`\`\`

### الصور المتجاوبة
\`\`\`css
img {
  max-width: 100%;
  height: auto;
}
\`\`\`

\`\`\`html
<picture>
  <source srcset="hero-mobile.webp" media="(max-width: 640px)">
  <source srcset="hero-tablet.webp" media="(max-width: 1024px)">
  <img src="hero-desktop.webp" alt="Hero">
</picture>
\`\`\`

## اختبار الاستجابة

1. **DevTools**: استخدم Device Toolbar (F12 ثم Ctrl+Shift+M)
2. **اختبار على أجهزة حقيقية**: أفضل طريقة
3. **BrowserStack / LambdaTest**: لاختبار متصفحات متعددة

## أفضل الممارسات

1. **Mobile First**: ابدأ من الأصغر
2. **استخدم rem/em** بدلاً من px للنصوص
3. **استخدم vw/vh** للأبعاد الكبيرة
4. **استخدم max-width** لمنع التمدد الزائد على الشاشات الكبيرة
5. **اختبر على أجهزة حقيقية** بشكل دوري
6. **استخدم prefers-reduced-motion** لاحترام تفضيلات المستخدم

\`\`\`css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
\`\`\``,
      },
      codeSamples: [responsiveSample],
      callouts: [
        {
          type: "warning",
          title: { ar: "تجنب الـ zoom", en: "Avoid zoom" },
          body: {
            ar: "تجنب استخدام user-scalable=no في meta viewport. يمنع المستخدمين من التكبير وقد يضر بإمكانية الوصول، خاصة لمن يحتاجون تكبير الشاشة.",
            en: "Avoid using user-scalable=no in meta viewport. It prevents users from zooming and harms accessibility, especially for those who need screen magnification.",
          },
        },
      ],
      keyTakeaways: [
        {
          ar: "viewport meta tag ضروري لكل صفحة، بدونها الموبايل يصغر الصفحة.",
          en: "viewport meta tag is essential for every page; without it mobile shrinks the page.",
        },
        {
          ar: "استخدم rem/em للنصوص، vw/vh للأبعاد، % للنسب.",
          en: "Use rem/em for fonts, vw/vh for dimensions, % for ratios.",
        },
        {
          ar: "Mobile First: ابدأ بتنسيق الموبايل ثم أضف للشاشات الأكبر.",
          en: "Mobile First: start with mobile styles then add for larger screens.",
        },
        {
          ar: "اختبر على أجهزة وأحجام متعددة، وافرض prefers-reduced-motion.",
          en: "Test on multiple devices and sizes, and respect prefers-reduced-motion.",
        },
      ],
    },
  },
  {
    id: "lesson-css-exercise",
    moduleId: "module-css-basics",
    courseId: "course-html-css",
    slug: "css-practical-exercise",
    title: { ar: "تمرين: بناء بطاقة منتج", en: "Exercise: Build a Product Card" },
    summary: {
      ar: "طبق ما تعلمته ببناء بطاقة منتج احترافية بـ HTML و CSS.",
      en: "Apply what you learned by building a professional product card with HTML and CSS.",
    },
    type: "exercise",
    order: 6,
    estimatedMinutes: 30,
    isFree: false,
    isLocked: false,
    content: {
      body: {
        ar: `## تمرين: بطاقة منتج

سنبني معاً بطاقة منتج احترافية مثل ما تراه في المتاجر الإلكترونية. هذا تمرين شامل يجمع كل ما تعلمته.

### المتطلبات

1. **الصورة**: في الأعلى، تأخذ عرض كامل، مع badge "تخفيض" فوقها
2. **العنوان**: اسم المنتج بحجم كبير ووزن عريض
3. **الوصف**: نص رمادي قصير (سطرين كحد أقصى)
4. **التقييم**: 5 نجوم + رقم التقييمات
5. **السعر**: السعر الجديد (أحمر) + السعر القديم (مشطوب)
6. **الزر**: "أضف للسلة" بأزرق ممتد

### التصميم
- زوايا دائرية 12px
- ظل خفيف
- padding مناسب
- التحييز: المعلومات في الأعلى والأسفل

### الكود الابتدائي

ابدأ من هذا الكود وعدّله حتى يطابق التصميم المطلوب.`,
        en: `## Exercise: Product Card

We'll build together a professional product card like those in e-commerce. This is a comprehensive exercise combining everything you learned.`,
      },
      exercise: {
        id: "ex-css-card",
        prompt: {
          ar: "بناء بطاقة منتج متجاوبة باستخدام HTML و CSS فقط.",
          en: "Build a responsive product card using only HTML and CSS.",
        },
        instructions: [
          "الصورة في الأعلى بعرض كامل وارتفاع 200px",
          "أضف badge أحمر صغير فوق الصورة يقول 'خصم 20%'",
          "العنوان بحجم 1.25rem ووزن 700",
          "الوصف رمادي و محدود بسطرين",
          "5 نجوم ذهبية + رقم التقييمات بالرمادي",
          "السعر الجديد أحمر عريض، القديم رمادي مشطوب",
          "الزر أزرق ممتد بعرض كامل وحواف دائرية",
        ],
        starterCode: `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>بطاقة منتج</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { 
      font-family: 'Cairo', sans-serif;
      background: #f1f5f9;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 2rem;
    }
    
    /* TODO: أكمل تنسيق بطاقة المنتج */
    .product-card {
      /* border-radius, background, shadow, overflow */
    }
    
    .product-image {
      /* width 100%, height 200px, object-fit cover */
    }
    
    .badge {
      /* position absolute, top-right, background red, color white */
    }
    
    .product-info {
      /* padding 1rem */
    }
    
    .product-title {
      /* font-size 1.25rem, font-weight 700 */
    }
    
    .product-description {
      /* color gray, font-size 0.875rem, line-clamp 2 */
    }
    
    .rating {
      /* flex, gap, stars gold */
    }
    
    .price {
      /* flex, gap, align-items baseline */
    }
    
    .price-new {
      /* color red, font-weight bold, font-size 1.25rem */
    }
    
    .price-old {
      /* color gray, text-decoration line-through */
    }
    
    .add-to-cart {
      /* width 100%, padding, background blue, color white */
      /* border none, border-radius, cursor pointer */
    }
  </style>
</head>
<body>
  <div class="product-card">
    <img src="https://picsum.photos/400/200" 
         alt="منتج" 
         class="product-image">
    <span class="badge">خصم 20%</span>
    
    <div class="product-info">
      <h3 class="product-title">سماعات لاسلكية احترافية</h3>
      <p class="product-description">
        سماعات بلوتوث بجودة صوت عالية وعزل ضوضاء نشط، 
        مثالية للموسيقى والمكالمات.
      </p>
      
      <div class="rating">
        <span>★★★★★</span>
        <span>(128 تقييم)</span>
      </div>
      
      <div class="price">
        <span class="price-new">320 ر.س</span>
        <span class="price-old">400 ر.س</span>
      </div>
      
      <button class="add-to-cart">أضف للسلة</button>
    </div>
  </div>
</body>
</html>`,
        solutionCode: `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>بطاقة منتج</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { 
      font-family: 'Cairo', sans-serif;
      background: #f1f5f9;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 2rem;
    }
    
    .product-card {
      background: white;
      border-radius: 12px;
      box-shadow: 0 4px 20px rgba(0,0,0,0.08);
      overflow: hidden;
      max-width: 300px;
      width: 100%;
      position: relative;
      transition: transform 0.3s, box-shadow 0.3s;
    }
    
    .product-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 8px 30px rgba(0,0,0,0.15);
    }
    
    .product-image {
      width: 100%;
      height: 200px;
      object-fit: cover;
      display: block;
    }
    
    .badge {
      position: absolute;
      top: 12px;
      right: 12px;
      background: #ef4444;
      color: white;
      padding: 4px 10px;
      border-radius: 6px;
      font-size: 0.75rem;
      font-weight: 600;
    }
    
    .product-info {
      padding: 1rem;
    }
    
    .product-title {
      font-size: 1.25rem;
      font-weight: 700;
      margin-bottom: 0.5rem;
      color: #1e293b;
    }
    
    .product-description {
      color: #64748b;
      font-size: 0.875rem;
      line-height: 1.5;
      margin-bottom: 0.75rem;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
    
    .rating {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      margin-bottom: 0.75rem;
    }
    
    .rating .stars {
      color: #f59e0b;
      letter-spacing: 2px;
    }
    
    .rating .count {
      color: #94a3b8;
      font-size: 0.875rem;
    }
    
    .price {
      display: flex;
      align-items: baseline;
      gap: 0.5rem;
      margin-bottom: 1rem;
    }
    
    .price-new {
      color: #ef4444;
      font-weight: 700;
      font-size: 1.25rem;
    }
    
    .price-old {
      color: #94a3b8;
      text-decoration: line-through;
      font-size: 0.875rem;
    }
    
    .add-to-cart {
      width: 100%;
      padding: 0.75rem;
      background: #0ea5e9;
      color: white;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      font-size: 1rem;
      font-weight: 600;
      transition: background 0.2s;
    }
    
    .add-to-cart:hover {
      background: #0284c7;
    }
  </style>
</head>
<body>
  <div class="product-card">
    <img src="https://picsum.photos/400/200" 
         alt="سماعات لاسلكية احترافية" 
         class="product-image">
    <span class="badge">خصم 20%</span>
    
    <div class="product-info">
      <h3 class="product-title">سماعات لاسلكية احترافية</h3>
      <p class="product-description">
        سماعات بلوتوث بجودة صوت عالية وعزل ضوضاء نشط، 
        مثالية للموسيقى والمكالمات.
      </p>
      
      <div class="rating">
        <span class="stars">★★★★★</span>
        <span class="count">(128 تقييم)</span>
      </div>
      
      <div class="price">
        <span class="price-new">320 ر.س</span>
        <span class="price-old">400 ر.س</span>
      </div>
      
      <button class="add-to-cart">أضف للسلة</button>
    </div>
  </div>
</body>
</html>`,
        testCases: [
          {
            id: "test-1",
            input: "",
            expectedOutput: "",
            description: {
              ar: "التحقق من أن البطاقة تحتوي على كل العناصر المطلوبة",
              en: "Verify card contains all required elements",
            },
          },
        ],
        hints: [
          { ar: "استخدم position: relative على .product-card و position: absolute على .badge", en: "Use position: relative on .product-card and position: absolute on .badge" },
          { ar: "للحد بسطرين استخدم -webkit-line-clamp مع display: -webkit-box", en: "For 2-line limit use -webkit-line-clamp with display: -webkit-box" },
          { ar: "أضف transition على .product-card لجعل الـ hover سلساً", en: "Add transition to .product-card for smooth hover" },
        ],
        language: "html",
        points: 100,
      },
    },
  },
];

// --------------------------------------------------------------------
// Module 3: Advanced CSS
// --------------------------------------------------------------------
const module3Lessons: Lesson[] = [
  {
    id: "lesson-css-variables",
    moduleId: "module-css-advanced",
    courseId: "course-html-css",
    slug: "css-custom-properties",
    title: { ar: "متغيرات CSS (Custom Properties)", en: "CSS Custom Properties" },
    summary: {
      ar: "استخدم CSS Variables لإدارة الألوان والثيمات وتنظيم الكود.",
      en: "Use CSS Variables to manage colors, themes, and organize code.",
    },
    type: "reading",
    order: 1,
    estimatedMinutes: 25,
    isFree: false,
    isLocked: false,
    content: {
      body: {
        ar: `## ما هي CSS Variables؟

CSS Custom Properties (أو CSS Variables) تسمح لك بتخزين قيم وإعادة استخدامها في كل ملف CSS. حلّت مشكلة التكرار وجعلت الثيمات أسهل.

\`\`\`css
:root {
  --primary: #0ea5e9;
  --text-color: #1e293b;
  --spacing: 1rem;
}

.button {
  background: var(--primary);
  color: white;
  padding: var(--spacing);
}
\`\`\`

## المميزات

1. **قابلة للتعديل ديناميكياً** (بـ JavaScript)
2. **تتوارث** (inheritance)
3. **تدعم القيم الافتراضية**
4. **تعمل عبر media queries**
5. **لا تحتاج معالج** مثل SASS

## التعريف والاستخدام

### التعريف في :root (عالمي)
\`\`\`css
:root {
  --brand-color: #0ea5e9;
  --font-size: 16px;
  --border-radius: 8px;
}
\`\`\`

### الاستخدام مع var()
\`\`\`css
.button {
  background: var(--brand-color);
  font-size: var(--font-size);
  border-radius: var(--border-radius);
}
\`\`\`

### القيمة الافتراضية
\`\`\`css
.button {
  /* يستخدم --primary إن وُجد، وإلا #3b82f6 */
  background: var(--primary, #3b82f6);
}
\`\`\`

## النطاق (Scope)

\`\`\`css
:root {
  --color: blue;  /* عالمي */
}

.card {
  --color: red;  /* محلي لـ .card وأبنائها فقط */
  background: var(--color);  /* red */
}

.button {
  background: var(--color);  /* blue (من :root) */
}
\`\`\`

## الثيمات (Dark/Light Mode)

\`\`\`css
:root {
  --bg: #ffffff;
  --text: #1e293b;
  --card-bg: #f8fafc;
  --border: #e2e8f0;
}

[data-theme="dark"] {
  --bg: #0f172a;
  --text: #f1f5f9;
  --card-bg: #1e293b;
  --border: #334155;
}

body {
  background: var(--bg);
  color: var(--text);
}

.card {
  background: var(--card-bg);
  border: 1px solid var(--border);
}
\`\`\`

### التبديل بين الثيمات بـ JavaScript
\`\`\`js
// وضع داكن
document.documentElement.setAttribute('data-theme', 'dark');

// وضع فاتح
document.documentElement.setAttribute('data-theme', 'light');

// تفضيل النظام
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
document.documentElement.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
\`\`\`

## المتغيرات والـ Media Queries

\`\`\`css
:root {
  --container-width: 100%;
  --font-size: 14px;
}

@media (min-width: 768px) {
  :root {
    --container-width: 720px;
    --font-size: 16px;
  }
}

@media (min-width: 1024px) {
  :root {
    --container-width: 960px;
    --font-size: 18px;
  }
}

body { font-size: var(--font-size); }
.container { max-width: var(--container-width); }
\`\`\`

## تغيير المتغيرات بـ JavaScript

\`\`\`js
// قراءة
const color = getComputedStyle(document.documentElement)
  .getPropertyValue('--primary');

// كتابة
document.documentElement.style.setProperty('--primary', '#ef4444');

// تغيير ديناميكي بناءً على إدخال المستخدم
colorPicker.addEventListener('input', (e) => {
  document.documentElement.style.setProperty('--primary', e.target.value);
});
\`\`\`

## أفضل الممارسات

### 1. استخدم أسماء وصفية
\`\`\`css
/* ❌ سيئ */
:root { --c1: #0ea5e9; --c2: #ef4444; }

/* ✅ جيد */
:root {
  --color-primary: #0ea5e9;
  --color-danger: #ef4444;
  --spacing-sm: 0.5rem;
  --spacing-md: 1rem;
  --spacing-lg: 1.5rem;
}
\`\`\`

### 2. اعتبر استخدام Design Tokens
\`\`\`css
:root {
  /* Colors */
  --color-primary-50: #f0f9ff;
  --color-primary-500: #0ea5e9;
  --color-primary-900: #0c4a6e;
  
  /* Typography */
  --font-sans: 'Cairo', system-ui, sans-serif;
  --font-mono: 'Fira Code', monospace;
  
  /* Spacing scale */
  --space-1: 0.25rem;
  --space-2: 0.5rem;
  --space-3: 1rem;
  --space-4: 1.5rem;
  --space-5: 2rem;
  --space-6: 3rem;
  
  /* Shadows */
  --shadow-sm: 0 1px 2px rgba(0,0,0,0.05);
  --shadow-md: 0 4px 6px rgba(0,0,0,0.1);
  --shadow-lg: 0 10px 15px rgba(0,0,0,0.1);
  
  /* Border radius */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 16px;
  --radius-full: 9999px;
}
\`\`\`

### 3. لا تبالغ
\`\`\`css
/* ❌ مبالغة */
:root {
  --color-button-bg: #0ea5e9;
  --color-button-text: white;
  --color-button-border: #0284c7;
  --color-button-hover: #0284c7;
}

/* ✅ معقول */
:root {
  --primary: #0ea5e9;
  --primary-dark: #0284c7;
}
.button { background: var(--primary); color: white; }
.button:hover { background: var(--primary-dark); }
\`\`\``,
      },
      codeSamples: [
        {
          id: "css-variables-1",
          language: "html",
          filename: "index.html",
          code: `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8">
  <title>CSS Variables</title>
  <style>
    :root {
      --primary: #0ea5e9;
      --primary-dark: #0284c7;
      --bg: #f8fafc;
      --text: #1e293b;
      --card-bg: white;
      --border: #e2e8f0;
      --radius: 12px;
      --shadow: 0 4px 12px rgba(0,0,0,0.08);
    }
    
    [data-theme="dark"] {
      --primary: #38bdf8;
      --primary-dark: #0ea5e9;
      --bg: #0f172a;
      --text: #f1f5f9;
      --card-bg: #1e293b;
      --border: #334155;
      --shadow: 0 4px 12px rgba(0,0,0,0.3);
    }
    
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { 
      font-family: sans-serif;
      background: var(--bg);
      color: var(--text);
      padding: 2rem;
      transition: background 0.3s, color 0.3s;
    }
    
    .theme-toggle {
      position: fixed;
      top: 1rem;
      left: 1rem;
      padding: 0.5rem 1rem;
      background: var(--primary);
      color: white;
      border: none;
      border-radius: var(--radius);
      cursor: pointer;
    }
    
    .card {
      background: var(--card-bg);
      border: 1px solid var(--border);
      border-radius: var(--radius);
      padding: 2rem;
      box-shadow: var(--shadow);
      max-width: 400px;
      margin: 2rem auto;
    }
    
    .btn {
      background: var(--primary);
      color: white;
      padding: 0.75rem 1.5rem;
      border: none;
      border-radius: var(--radius);
      cursor: pointer;
      font-size: 1rem;
      transition: background 0.2s;
    }
    
    .btn:hover { background: var(--primary-dark); }
  </style>
</head>
<body>
  <button class="theme-toggle" onclick="
    const t = document.documentElement.getAttribute('data-theme');
    document.documentElement.setAttribute('data-theme', t === 'dark' ? 'light' : 'dark');
  ">تبديل الثيم</button>
  
  <div class="card">
    <h2>بطاقة بـ CSS Variables</h2>
    <p>هذه البطاقة تستخدم متغيرات CSS، جرّب تبديل الثيم!</p>
    <button class="btn">اضغط هنا</button>
  </div>
</body>
</html>`,
          runnable: true,
        },
      ],
      keyTakeaways: [
        {
          ar: "CSS Variables تُعرف في :root وتُستخدم مع var().",
          en: "CSS Variables are defined in :root and used with var().",
        },
        {
          ar: "متغيرات CSS تتوارث وتدعم القيم الافتراضية وتُحدث ديناميكياً.",
          en: "CSS variables inherit, support default values, and update dynamically.",
        },
        {
          ar: "الثيمات (داكن/فاتح) تصبح سهلة عبر تغيير متغيرات على :root.",
          en: "Themes (dark/light) become easy by changing variables on :root.",
        },
        {
          ar: "اتبع نظام تسمية واضح مثل --color-primary-500 أو --spacing-md.",
          en: "Follow clear naming like --color-primary-500 or --spacing-md.",
        },
      ],
    },
  },
  {
    id: "lesson-css-animations",
    moduleId: "module-css-advanced",
    courseId: "course-html-css",
    slug: "css-animations-transitions",
    title: { ar: "الانتقالات والحركات", en: "Transitions and Animations" },
    summary: {
      ar: "أضف حركات سلسة لعناصرك مع transitions و @keyframes.",
      en: "Add smooth motion to your elements with transitions and @keyframes.",
    },
    type: "reading",
    order: 2,
    estimatedMinutes: 30,
    isFree: false,
    isLocked: false,
    content: {
      body: {
        ar: `## Transitions (الانتقالات)

الانتقالات تجعل تغيير خصائص CSS يحدث بسلاسة بدلاً من فجأة.

\`\`\`css
.button {
  background: blue;
  transition: background 0.3s ease;
}

.button:hover {
  background: darkblue;
}
\`\`\`

### بنية transition
\`\`\`css
transition: [property] [duration] [timing-function] [delay];
\`\`\`

- **property**: الخاصية المراد تحريكها (أو \`all\`)
- **duration**: المدة (0.3s, 500ms)
- **timing-function**: ease, linear, ease-in, ease-out, ease-in-out, cubic-bezier(...)
- **delay**: تأخير قبل البدء

\`\`\`css
.card {
  /* خاصية واحدة */
  transition: transform 0.3s ease;
  
  /* عدة خصائص */
  transition: 
    transform 0.3s ease,
    background 0.5s ease,
    box-shadow 0.3s ease 0.1s;
  
  /* كل الخصائص (غير موصى به) */
  transition: all 0.3s;
}

.card:hover {
  transform: translateY(-4px);
  background: lightblue;
  box-shadow: 0 10px 20px rgba(0,0,0,0.1);
}
\`\`\`

### Timing Functions
\`\`\`css
transition-timing-function: linear;        /* سرعة ثابتة */
transition-timing-function: ease;          /* بطيء-سريع-بطيء */
transition-timing-function: ease-in;       /* بطيء في البداية */
transition-timing-function: ease-out;      /* بطيء في النهاية */
transition-timing-function: ease-in-out;   /* بطيء في الطرفين */
transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);  /* مخصص */
\`\`\`

### الخصائص القابلة للتحريك
- \`color\`, \`background\`, \`border-color\`
- \`opacity\`
- \`transform\` (translate, rotate, scale, skew)
- \`box-shadow\`
- \`filter\`
- \`width\`, \`height\`, \`margin\`, \`padding\` (أقل أداءً)
- \`top\`, \`left\`, \`right\`, \`bottom\` (أقل أداءً)

**مهم**: \`transform\` و \`opacity\` هما الأفضل للأداء لأنهما يعملان على GPU.

## Transform

\`\`\`css
/* نقل */
transform: translateX(50px);
transform: translateY(-20px);
transform: translate(50px, -20px);

/* تكبير/تصغير */
transform: scale(1.5);
transform: scaleX(2);
transform: scaleY(0.5);

/* دوران */
transform: rotate(45deg);
transform: rotateX(45deg);  /* 3D */
transform: rotateY(45deg);

/* انحناء */
transform: skew(20deg, 10deg);

/* مركب */
transform: translate(50px, 0) rotate(45deg) scale(1.2);
\`\`\`

## @keyframes (الحركات المعقدة)

\`\`\`css
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.element {
  animation: fadeIn 0.5s ease-out;
}
\`\`\`

### عدة نقاط
\`\`\`css
@keyframes bounce {
  0%   { transform: translateY(0); }
  25%  { transform: translateY(-30px); }
  50%  { transform: translateY(0); }
  75%  { transform: translateY(-15px); }
  100% { transform: translateY(0); }
}

.ball {
  animation: bounce 1s ease infinite;
}
\`\`\`

### خصائص animation
\`\`\`css
.element {
  animation-name: fadeIn;
  animation-duration: 0.5s;
  animation-timing-function: ease-out;
  animation-delay: 0.2s;
  animation-iteration-count: 3;       /* أو infinite */
  animation-direction: alternate;     /* normal, reverse, alternate */
  animation-fill-mode: forwards;      /* none, forwards, backwards, both */
  animation-play-state: running;      /* running, paused */
  
  /* اختصار */
  animation: fadeIn 0.5s ease-out 0.2s 3 alternate forwards;
}
\`\`\`

## أمثلة شائعة

### 1. زر بنبض
\`\`\`css
@keyframes pulse {
  0%, 100% { box-shadow: 0 0 0 0 rgba(14, 165, 233, 0.7); }
  50% { box-shadow: 0 0 0 12px rgba(14, 165, 233, 0); }
}

.cta-button {
  animation: pulse 2s infinite;
}
\`\`\`

### 2. تحميل (loader)
\`\`\`css
@keyframes spin {
  to { transform: rotate(360deg); }
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #e2e8f0;
  border-top-color: #0ea5e9;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}
\`\`\`

### 3. ظهور تدريجي
\`\`\`css
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.section {
  animation: fadeInUp 0.6s ease-out;
}
\`\`\`

### 4. اهتزاز عند الخطأ
\`\`\`css
@keyframes shake {
  0%, 100% { transform: translateX(0); }
  10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
  20%, 40%, 60%, 80% { transform: translateX(5px); }
}

.input.error {
  animation: shake 0.5s;
}
\`\`\`

### 5. تحريك لانهائي للخلفية
\`\`\`css
@keyframes scroll {
  from { background-position: 0 0; }
  to { background-position: -1000px 0; }
}

.marquee {
  background: url('pattern.png') repeat-x;
  animation: scroll 20s linear infinite;
}
\`\`\`

## احترام تفضيلات المستخدم

\`\`\`css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
\`\`\`

هذا يحمي المستخدمين الذين يعانون من دوار الحركة.`,
      },
      codeSamples: [
        {
          id: "css-animations-1",
          language: "html",
          filename: "index.html",
          code: `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8">
  <title>CSS Animations</title>
  <style>
    body { 
      font-family: sans-serif; padding: 2rem; 
      background: #f8fafc; max-width: 800px; margin: 0 auto;
    }
    
    h2 { margin: 2rem 0 1rem; }
    
    /* زر مع transition */
    .btn {
      background: linear-gradient(135deg, #0ea5e9, #6366f1);
      color: white;
      padding: 0.75rem 1.5rem;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      font-size: 1rem;
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }
    .btn:hover {
      transform: translateY(-2px) scale(1.05);
      box-shadow: 0 10px 20px rgba(14, 165, 233, 0.3);
    }
    .btn:active { transform: translateY(0) scale(0.98); }
    
    /* Spinner */
    @keyframes spin {
      to { transform: rotate(360deg); }
    }
    .spinner {
      width: 40px; height: 40px;
      border: 4px solid #e2e8f0;
      border-top-color: #0ea5e9;
      border-radius: 50%;
      animation: spin 1s linear infinite;
    }
    
    /* Pulse */
    @keyframes pulse {
      0%, 100% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.7); }
      50% { box-shadow: 0 0 0 15px rgba(239, 68, 68, 0); }
    }
    .pulse {
      background: #ef4444;
      color: white;
      padding: 1rem 2rem;
      border: none;
      border-radius: 8px;
      animation: pulse 2s infinite;
      cursor: pointer;
    }
    
    /* Fade in */
    @keyframes fadeInUp {
      from { opacity: 0; transform: translateY(30px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .fade-in {
      animation: fadeInUp 0.6s ease-out;
      background: white;
      padding: 1.5rem;
      border-radius: 12px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    }
    
    /* Bounce */
    @keyframes bounce {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-20px); }
    }
    .ball {
      width: 50px; height: 50px;
      background: #f59e0b;
      border-radius: 50%;
      animation: bounce 1s ease-in-out infinite;
    }
  </style>
</head>
<body>
  <h2>زر مع Hover Transition</h2>
  <button class="btn">مرر الماوس فوقي</button>
  
  <h2>Spinner (تحميل)</h2>
  <div class="spinner"></div>
  
  <h2>زر نابض</h2>
  <button class="pulse">إشعار مهم!</button>
  
  <h2>ظهور تدريجي</h2>
  <div class="fade-in">هذا العنصر ظهر بتأثير fadeInUp</div>
  
  <h2>كرة نطاطة</h2>
  <div class="ball"></div>
</body>
</html>`,
          runnable: true,
        },
      ],
      callouts: [
        {
          type: "warning",
          title: { ar: "أداء الحركات", en: "Animation Performance" },
          body: {
            ar: "تجنب تحريك width, height, top, left — فهي تجبر المتصفح على إعادة حساب التخطيط. استخدم transform و opacity فقط لأنهما يعملان على GPU بكفاءة.",
            en: "Avoid animating width, height, top, left — they force browser to recalculate layout. Use only transform and opacity as they run efficiently on GPU.",
          },
        },
      ],
      keyTakeaways: [
        {
          ar: "transition للانتقالات البسيطة بين حالتين (مثل hover).",
          en: "transition for simple state changes (like hover).",
        },
        {
          ar: "@keyframes للحركات المعقدة متعددة الخطوات.",
          en: "@keyframes for complex multi-step animations.",
        },
        {
          ar: "transform و opacity فقط للحصول على أفضل أداء (GPU accelerated).",
          en: "Use only transform and opacity for best performance (GPU accelerated).",
        },
        {
          ar: "احترم prefers-reduced-motion لإيقاف الحركات لمن يحتاج ذلك.",
          en: "Respect prefers-reduced-motion to disable animations for those who need it.",
        },
      ],
    },
  },
];

// --------------------------------------------------------------------
// Modules and Course definition
// --------------------------------------------------------------------
const modules: Module[] = [
  {
    id: "module-html-basics",
    courseId: "course-html-css",
    title: { ar: "أساسيات HTML", en: "HTML Basics" },
    description: {
      ar: "تعلم هيكل صفحات الويب، الوسوم، النصوص، الصور، والنماذج.",
      en: "Learn web page structure, tags, text, images, and forms.",
    },
    order: 1,
    isLocked: false,
    estimatedMinutes: 120,
    lessons: module1Lessons,
  },
  {
    id: "module-css-basics",
    courseId: "course-html-css",
    title: { ar: "أساسيات CSS", en: "CSS Basics" },
    description: {
      ar: "تنسيق الصفحات: المحددات، الـ Box Model، Flexbox، Grid، والتصميم المتجاوب.",
      en: "Page styling: selectors, Box Model, Flexbox, Grid, and responsive design.",
    },
    order: 2,
    isLocked: false,
    estimatedMinutes: 155,
    lessons: module2Lessons,
  },
  {
    id: "module-css-advanced",
    courseId: "course-html-css",
    title: { ar: "CSS متقدم", en: "Advanced CSS" },
    description: {
      ar: "متغيرات CSS، الحركات، الانتقالات، والثيمات.",
      en: "CSS variables, animations, transitions, and themes.",
    },
    order: 3,
    isLocked: false,
    estimatedMinutes: 80,
    lessons: module3Lessons,
  },
];

export const HTML_CSS_COURSE: Course = {
  id: "course-html-css",
  slug: "html-css-foundations",
  trackId: "track-frontend",
  title: { ar: "أساسيات HTML و CSS", en: "HTML & CSS Foundations" },
  subtitle: {
    ar: "ابدأ رحلتك في تطوير الويب بأساس متين من HTML و CSS",
    en: "Start your web development journey with solid HTML & CSS foundations",
  },
  description: {
    ar: "دورة شاملة تأخذك من الصفر إلى بناء صفحات ويب احترافية. تتعلم فيها بنية HTML الكاملة، تنسيق CSS من المحددات إلى Flexbox و Grid، التصميم المتجاوب، والحركات. مع أكثر من 13 درساً تفاعلياً وتمارين عملية.",
    en: "A comprehensive course taking you from zero to building professional web pages. Learn complete HTML structure, CSS from selectors to Flexbox and Grid, responsive design, and animations. With 13+ interactive lessons and practical exercises.",
  },
  prerequisites: [],
  icon: "Code2",
  color: "from-emerald-500 to-teal-500",
  difficulty: "beginner",
  estimatedHours: 6,
  language: "html",
  instructor: {
    id: "inst-ahmad",
    name: "أحمد العتيبي",
    title: { ar: "مهندس واجهات أمامية أول", en: "Senior Frontend Engineer" },
    avatar: "",
    bio: {
      ar: "مهندس برمجيات بخبرة 10 سنوات في تطوير الويب.",
      en: "Software engineer with 10 years of web development experience.",
    },
    rating: 4.9,
    studentsCount: 28400,
    coursesCount: 6,
  },
  modules,
  tags: ["HTML", "CSS", "Responsive", "Flexbox", "Grid"],
  rating: 4.9,
  reviewsCount: 1240,
  studentsCount: 28400,
  price: 0,
  isPublished: true,
  createdAt: "2025-01-15T00:00:00.000Z",
  updatedAt: "2025-06-01T00:00:00.000Z",
};
