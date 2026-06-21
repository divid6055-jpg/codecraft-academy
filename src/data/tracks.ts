import type { Track } from "@/types";

// ====================================================================
// CodeCraft Academy — Learning Tracks Catalog
// ====================================================================
// Each track is a top-level learning category. Tracks contain courses,
// courses contain modules, modules contain lessons.
// ====================================================================

export const TRACKS: Track[] = [
  {
    id: "track-frontend",
    slug: "frontend-development",
    title: { ar: "تطوير الواجهات الأمامية", en: "Frontend Development" },
    description: {
      ar: "أتقن بناء واجهات الويب التفاعلية والعصرية باستخدام HTML و CSS و JavaScript و React، من الأساسيات حتى المستوى الاحترافي.",
      en: "Master building interactive modern web interfaces with HTML, CSS, JavaScript, and React — from fundamentals to professional level.",
    },
    icon: "Layout",
    color: "from-emerald-500 via-teal-500 to-cyan-500",
    accentColor: "#10b981",
    difficulty: "beginner",
    estimatedHours: 120,
    coursesCount: 6,
    studentsCount: 45230,
    rating: 4.9,
    tags: ["HTML", "CSS", "JavaScript", "React", "TypeScript", "Tailwind"],
    featured: true,
    order: 1,
  },
  {
    id: "track-backend",
    slug: "backend-development",
    title: { ar: "تطوير الواجهات الخلفية", en: "Backend Development" },
    description: {
      ar: "تعلم بناء خوادم قوية و APIs آمنة وإدارة قواعد البيانات باستخدام Node.js و Express و Prisma و SQL.",
      en: "Learn to build robust servers, secure APIs, and manage databases using Node.js, Express, Prisma, and SQL.",
    },
    icon: "Server",
    color: "from-violet-500 via-purple-500 to-fuchsia-500",
    accentColor: "#8b5cf6",
    difficulty: "intermediate",
    estimatedHours: 100,
    coursesCount: 5,
    studentsCount: 28950,
    rating: 4.8,
    tags: ["Node.js", "Express", "REST", "API", "SQL", "Authentication"],
    featured: true,
    order: 2,
  },
  {
    id: "track-python",
    slug: "python-programming",
    title: { ar: "برمجة بايثون", en: "Python Programming" },
    description: {
      ar: "ابدأ رحلتك في بايثون من الصفر، مروراً بأساسيات اللغة، وصولاً إلى الأتمتة وتحليل البيانات والمشاريع العملية.",
      en: "Start your Python journey from scratch — from language fundamentals to automation, data analysis, and real-world projects.",
    },
    icon: "Code2",
    color: "from-amber-500 via-orange-500 to-red-500",
    accentColor: "#f59e0b",
    difficulty: "beginner",
    estimatedHours: 80,
    coursesCount: 4,
    studentsCount: 62410,
    rating: 4.9,
    tags: ["Python", "Automation", "Data", "Scripting", "OOP"],
    featured: true,
    order: 3,
  },
  {
    id: "track-dsa",
    slug: "data-structures-algorithms",
    title: { ar: "هياكل البيانات والخوارزميات", en: "Data Structures & Algorithms" },
    description: {
      ar: "أتقن هياكل البيانات الأساسية والخوارزميات الكلاسيكية وحضّر لمقابلات الشركات الكبرى بثقة تامة.",
      en: "Master core data structures and classic algorithms, and prepare for FAANG interviews with full confidence.",
    },
    icon: "Binary",
    color: "from-rose-500 via-pink-500 to-red-500",
    accentColor: "#f43f5e",
    difficulty: "advanced",
    estimatedHours: 90,
    coursesCount: 4,
    studentsCount: 18760,
    rating: 4.7,
    tags: ["Algorithms", "DSA", "Big-O", "LeetCode", "Interview"],
    featured: false,
    order: 4,
  },
  {
    id: "track-fullstack",
    slug: "fullstack-development",
    title: { ar: "تطوير الويب المتكامل", en: "Full-Stack Development" },
    description: {
      ar: "كن مطوراً متكاملاً قادراً على بناء تطبيقات ويب كاملة من الواجهة الأمامية حتى الخادم وقاعدة البيانات.",
      en: "Become a full-stack developer capable of building complete web applications from frontend to server and database.",
    },
    icon: "Layers",
    color: "from-sky-500 via-cyan-500 to-blue-500",
    accentColor: "#0ea5e9",
    difficulty: "advanced",
    estimatedHours: 160,
    coursesCount: 7,
    studentsCount: 31280,
    rating: 4.8,
    tags: ["Fullstack", "Next.js", "Prisma", "Database", "Deploy"],
    featured: true,
    order: 5,
  },
  {
    id: "track-mobile",
    slug: "mobile-development",
    title: { ar: "تطوير تطبيقات الموبايل", en: "Mobile Development" },
    description: {
      ar: "بناء تطبيقات موبايل أصلية وهجينة باستخدام React Native و Expo، مع نشرها على متاجر التطبيقات.",
      en: "Build native and hybrid mobile apps with React Native and Expo, and ship them to the app stores.",
    },
    icon: "Smartphone",
    color: "from-fuchsia-500 via-pink-500 to-rose-500",
    accentColor: "#d946ef",
    difficulty: "intermediate",
    estimatedHours: 110,
    coursesCount: 5,
    studentsCount: 15640,
    rating: 4.7,
    tags: ["React Native", "Expo", "iOS", "Android", "Mobile"],
    featured: false,
    order: 6,
  },
  {
    id: "track-devops",
    slug: "devops-and-cloud",
    title: { ar: "DevOps والحوسبة السحابية", en: "DevOps & Cloud" },
    description: {
      ar: "تعلم أدوات DevOps الحديثة مثل Docker و Kubernetes و CI/CD وكيفية نشر التطبيقات على AWS و Vercel.",
      en: "Learn modern DevOps tools like Docker, Kubernetes, and CI/CD, and deploy apps to AWS and Vercel.",
    },
    icon: "Cloud",
    color: "from-slate-500 via-gray-500 to-zinc-500",
    accentColor: "#64748b",
    difficulty: "expert",
    estimatedHours: 70,
    coursesCount: 4,
    studentsCount: 9870,
    rating: 4.6,
    tags: ["Docker", "Kubernetes", "CI/CD", "AWS", "Linux"],
    featured: false,
    order: 7,
  },
  {
    id: "track-ai",
    slug: "ai-and-machine-learning",
    title: { ar: "الذكاء الاصطناعي وتعلم الآلة", en: "AI & Machine Learning" },
    description: {
      ar: "ادخل عالم الذكاء الاصطناعي من تعلم الآلة والشبكات العصبية حتى معالجة اللغة الطبيعية والرؤية الحاسوبية.",
      en: "Enter the world of AI — from machine learning and neural networks to NLP and computer vision.",
    },
    icon: "BrainCircuit",
    color: "from-indigo-500 via-violet-500 to-purple-500",
    accentColor: "#6366f1",
    difficulty: "expert",
    estimatedHours: 140,
    coursesCount: 5,
    studentsCount: 21340,
    rating: 4.8,
    tags: ["AI", "ML", "Deep Learning", "NLP", "TensorFlow"],
    featured: true,
    order: 8,
  },
];

// Helper: get track by id
export function getTrackById(id: string): Track | undefined {
  return TRACKS.find((t) => t.id === id);
}

// Helper: get featured tracks
export function getFeaturedTracks(): Track[] {
  return TRACKS.filter((t) => t.featured).sort((a, b) => a.order - b.order);
}

// Helper: search tracks
export function searchTracks(query: string): Track[] {
  const q = query.toLowerCase().trim();
  if (!q) return TRACKS;
  return TRACKS.filter(
    (t) =>
      t.title.ar.toLowerCase().includes(q) ||
      t.title.en?.toLowerCase().includes(q) ||
      t.description.ar.toLowerCase().includes(q) ||
      t.tags.some((tag) => tag.toLowerCase().includes(q))
  );
}
