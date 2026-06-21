import type { Instructor } from "@/types";

// ====================================================================
// CodeCraft Academy — Instructors Catalog
// ====================================================================

export const INSTRUCTORS: Instructor[] = [
  {
    id: "inst-ahmad",
    name: "أحمد العتيبي",
    title: { ar: "مهندس واجهات أمامية أول", en: "Senior Frontend Engineer" },
    avatar: "",
    bio: {
      ar: "مهندس برمجيات بخبرة 10 سنوات في تطوير الويب، عمل في عدة شركات تقنية رائدة وشارك في بناء منصات تخدم ملايين المستخدمين. متخصص في React و TypeScript وأدوات البناء الحديثة.",
      en: "Software engineer with 10 years of experience in web development, worked at several leading tech companies building platforms serving millions of users. Specialized in React, TypeScript, and modern build tools.",
    },
    rating: 4.9,
    studentsCount: 28400,
    coursesCount: 6,
  },
  {
    id: "inst-sara",
    name: "سارة المطيري",
    title: { ar: "خبيرة بايثون وعلوم البيانات", en: "Python & Data Science Expert" },
    avatar: "",
    bio: {
      ar: "حاصلة على دكتوراه في علوم الحاسب من جامعة الملك سعود، تعمل كباحثة في مجال تعلم الآلة ولديها أكثر من 15 ورقة بحثية منشورة. شغوفة بتبسيط المفاهيم المعقدة للمتعلمين.",
      en: "PhD in Computer Science from King Saud University, works as a machine learning researcher with 15+ published papers. Passionate about simplifying complex concepts for learners.",
    },
    rating: 4.95,
    studentsCount: 35600,
    coursesCount: 5,
  },
  {
    id: "inst-khalid",
    name: "خالد الشمري",
    title: { ar: "مهندس DevOps ومعماري سحابي", en: "DevOps Engineer & Cloud Architect" },
    avatar: "",
    bio: {
      ar: "خبرة 12 عاماً في البنية التحتية للبرمجيات والسحابة، ساعد عدة شركات ناشئة على الانتقال من خوادم تقليدية إلى بنى microservices قابلة للتوسع. معتمد في AWS و Kubernetes.",
      en: "12 years of experience in software infrastructure and cloud, helped several startups transition from traditional servers to scalable microservices. AWS and Kubernetes certified.",
    },
    rating: 4.8,
    studentsCount: 12300,
    coursesCount: 4,
  },
  {
    id: "inst-mona",
    name: "منى القحطاني",
    title: { ar: "مطورة تطبيقات موبايل", en: "Mobile App Developer" },
    avatar: "",
    bio: {
      ar: "متخصصة في بناء تطبيقات الموبايل باستخدام React Native و Flutter، نشرت أكثر من 30 تطبيقاً على متجري iOS و Android. مدربة معتمدة من Meta.",
      en: "Specialized in building mobile apps with React Native and Flutter, published 30+ apps on iOS and Android stores. Meta-certified trainer.",
    },
    rating: 4.85,
    studentsCount: 18900,
    coursesCount: 3,
  },
  {
    id: "inst-omar",
    name: "عمر الدوسري",
    title: { ar: "خبير خوارزميات ومقابلات تقنية", en: "Algorithms & Tech Interview Expert" },
    avatar: "",
    bio: {
      ar: "عمل كمهندس برمجيات في Google و Microsoft، أجرى أكثر من 200 مقابلة تقنية. يساعد الطلاب على الاستعداد لمقابلات الشركات الكبرى من خلال منهج عملي مكثف.",
      en: "Worked as a software engineer at Google and Microsoft, conducted 200+ technical interviews. Helps students prepare for FAANG interviews through an intensive practical curriculum.",
    },
    rating: 4.92,
    studentsCount: 14200,
    coursesCount: 4,
  },
  {
    id: "inst-layla",
    name: "ليلى الحربي",
    title: { ar: "مهندسة Full-Stack", en: "Full-Stack Engineer" },
    avatar: "",
    bio: {
      ar: "بنت ونشرت أكثر من 20 منصة ويب متكاملة من الصفر، تركز على Next.js و Prisma و PostgreSQL. تكتب تقنياً في مدونتها الخاصة التي يتابعها 50 ألف مطور.",
      en: "Built and shipped 20+ full web platforms from scratch, focuses on Next.js, Prisma, and PostgreSQL. Writes technical articles on her blog followed by 50K developers.",
    },
    rating: 4.87,
    studentsCount: 22100,
    coursesCount: 5,
  },
];

export function getInstructorById(id: string): Instructor | undefined {
  return INSTRUCTORS.find((i) => i.id === id);
}
