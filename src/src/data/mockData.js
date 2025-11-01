export const accountants = [
  {
    id: 1,
    name: { ar: "أحمد المحاسب", en: "Ahmed Al-Mohaseb" },
    specialization: {
      ar: "محاسب قانوني معتمد",
      en: "Certified Public Accountant",
    },
    rating: 4.9,
    avatar:
      "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?w=150",
    completedProjects: 150,
    responseTime: "2 hours",
  },
  {
    id: 2,
    name: { ar: "فاطمة الخبيرة", en: "Fatima Al-Khabira" },
    specialization: { ar: "خبير ضرائب", en: "Tax Expert" },
    rating: 4.8,
    avatar:
      "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?w=150",
    completedProjects: 120,
    responseTime: "1 hour",
  },
  {
    id: 3,
    name: { ar: "محمد المدقق", en: "Mohammed Al-Mudaqiq" },
    specialization: { ar: "مراجع خارجي", en: "External Auditor" },
    rating: 5.0,
    avatar:
      "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?w=150",
    completedProjects: 200,
    responseTime: "30 minutes",
  },
  {
    id: 4,
    name: { ar: "سارة الاستشارية", en: "Sara Al-Istisharia" },
    specialization: { ar: "استشارات مالية", en: "Financial Consultant" },
    rating: 4.7,
    avatar:
      "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?w=150",
    completedProjects: 90,
    responseTime: "45 minutes",
  },
];

export const testimonials = [
  {
    id: 1,
    text: {
      ar: "خدمة ممتازة ومحاسبون محترفون. تم تسليم العمل في الوقت المحدد وبجودة عالية.",
      en: "Excellent service and professional accountants. Work delivered on time with high quality.",
    },
    name: { ar: "علي الريادي", en: "Ali Al-Riadi" },
    role: { ar: "مدير شركة", en: "Company Manager" },
    avatar:
      "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?w=100",
  },
  {
    id: 2,
    text: {
      ar: "منصة موثوقة وسهلة الاستخدام. وجدت المحاسب المناسب خلال ساعات قليلة.",
      en: "Reliable and easy-to-use platform. Found the right accountant within hours.",
    },
    name: { ar: "نورا التاجرة", en: "Nora Al-Tajira" },
    role: { ar: "صاحبة مشروع", en: "Business Owner" },
    avatar:
      "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?w=100",
  },
  {
    id: 3,
    text: {
      ar: "الدعم الفني ممتاز والأسعار منافسة. أنصح بها لكل من يحتاج خدمات محاسبية.",
      en: "Excellent technical support and competitive prices. Highly recommend for accounting services.",
    },
    name: { ar: "خالد المقاول", en: "Khaled Al-Muqawel" },
    role: { ar: "مقاول", en: "Contractor" },
    avatar:
      "https://images.pexels.com/photos/556047/pexels-photo-556047.jpeg?w=100",
  },
];

export const stats = [
  { number: 500, suffix: "+", key: "certifiedAccountants" },
  { number: 1000, suffix: "+", key: "clientsServed" },
  { number: 2000, suffix: "+", key: "completedServices" },
];

export const categories = {
  ar: [
    "مسك الدفاتر",
    "الضرائب",
    "المراجعة",
    "الاستشارات المالية",
    "كشوف الرواتب",
    "أخرى",
  ],
  en: [
    "Bookkeeping",
    "Taxes",
    "Auditing",
    "Financial Consulting",
    "Payroll",
    "Other",
  ],
};

export const budgetRanges = {
  ar: [
    "أقل من 500 ريال",
    "500-1000 ريال",
    "1000-5000 ريال",
    "أكثر من 5000 ريال",
  ],
  en: ["Less than $500", "$500-1000", "$1000-5000", "More than $5000"],
};

export const contactMethods = {
  ar: ["واتساب", "بريد إلكتروني", "مكالمة هاتفية", "رسائل المنصة"],
  en: ["WhatsApp", "Email", "Phone Call", "Platform Messages"],
};
