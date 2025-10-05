import React, { createContext, useContext, useState, useEffect } from "react";

const LanguageContext = createContext(undefined);

const translations = {
  ar: {
    // Header
    home: "الرئيسية",
    services: "الخدمات",
    accountants: "المحاسبون",
    contact: "التواصل",
    notifications: "الإشعارات",
    messages: "الرسائل",
    myProjects: "مشاريعي",
    addProject: "+ إضافة مشروع",
    profile: "الملف الشخصي",
    settings: "الإعدادات",
    logout: "تسجيل الخروج",

    // Hero
    heroTitle: "خدمات محاسبية موثوقة بين يديك",
    heroSubtitle:
      "منصتنا تربطك بمحترفين في جميع مجالات المحاسبة والتدقيق والضرائب.",
    findService: "ابحث عن خدمة",
    joinAsAccountant: "انضم كمحاسب",
    certifiedAccountants: "500+ محاسب معتمد",
    clientsServed: "1000+ عميل",
    completedServices: "2000+ خدمة منفذة",

    // How it Works
    howItWorks: "كيف نعمل",
    step1: "أضف مشروعك أو اختر خدمة",
    step2: "استقبل عروض من المحاسبين",
    step3: "تواصل وادفع بأمان",
    step4: "استلم الخدمة بجودة عالية",

    // Services
    featuredServices: "الخدمات المميزة",
    bookkeeping: "مسك الدفاتر",
    financialStatements: "إعداد القوائم المالية",
    taxFiling: "الإقرارات الضريبية",
    auditing: "المراجعة والتدقيق",
    financialConsulting: "الاستشارات المالية",
    payroll: "الرواتب والتأمينات",

    // Top Accountants
    topAccountants: "أفضل المحاسبين",
    contactBtn: "تواصل",
    viewAll: "عرض الكل",

    // Why Choose Us
    whyChooseUs: "لماذا تختارنا",
    certifiedProfessionals: "محاسبون معتمدون",
    securePayment: "دفع آمن",
    verifiedContracts: "عقود موثقة",
    support24: "دعم متواصل",

    // Testimonials
    testimonials: "آراء العملاء",

    // Stats
    statsTitle: "أرقامنا تتحدث",

    // CTA
    ctaTitle: "ابدأ رحلتك المحاسبية اليوم",
    ctaText:
      "ابدأ الآن — سواء كنت تبحث عن خدمة محاسبية أو تريد تقديم خدماتك كمحاسب محترف.",
    signUpAccountant: "سجّل كمحاسب",

    // Footer
    aboutUs: "عن الموقع",
    privacyPolicy: "سياسة الخصوصية",
    terms: "الشروط",
    support: "الدعم",

    // Modal
    addProjectTitle: "إضافة مشروع جديد",
    projectTitle: "عنوان المشروع",
    category: "التصنيف",
    budget: "الميزانية",
    deadline: "الموعد النهائي",
    description: "الوصف",
    attachFile: "إرفاق ملف",
    contactMethod: "طريقة التواصل",
    submit: "إرسال",
    cancel: "إلغاء",

    // Contact Page
    contactTitle: "التواصل",
    contactSubtitle:
      "نحن هنا لمساعدتك في جميع احتياجاتك المحاسبية. تواصل معنا اليوم واكتشف كيف يمكننا دعم نجاح عملك في سلطنة عمان",
    contactInfo: "معلومات التواصل",
    address: "العنوان",
    addressDetails:
      "شارع السلطان قابوس، مبنى الأعمال المركزي\nالطابق الثالث، مكتب 301\nمسقط، سلطنة عمان",
    phone: "الهاتف",
    email: "البريد الإلكتروني",
    workingHours: "أوقات العمل",
    workingHoursDetails:
      "الأحد - الخميس: 8:00 ص - 6:00 م\nالجمعة: 9:00 ص - 12:00 م\nالسبت: مغلق",
    specializedServices: "خدماتنا المتخصصة",
    specializedServicesList:
      "• محاسبة معتمدة حسب المعايير العمانية\n• التدقيق المالي المتخصص\n• الاستشارات الضريبية والقانونية\n• دعم الشركات الناشئة والصغيرة",
    sendMessage: "أرسل لنا رسالة",
    fullName: "الاسم الكامل",
    fullNamePlaceholder: "أدخل اسمك الكامل",
    emailPlaceholder: "example@email.com",
    phonePlaceholder: "+968 xxxx xxxx",
    companyName: "اسم الشركة",
    companyPlaceholder: "اسم شركتك (اختياري)",
    serviceType: "نوع الخدمة المطلوبة",
    selectService: "اختر نوع الخدمة",
    messageDetails: "تفاصيل الرسالة",
    messagePlaceholder:
      "اكتب رسالتك هنا... أخبرنا عن احتياجاتك المحاسبية وكيف يمكننا مساعدتك",
    note: "ملاحظة:",
    noteText:
      "سيتم الرد على جميع الاستفسارات خلال 24 ساعة عمل. للطوارئ المحاسبية، يرجى الاتصال مباشرة على الرقم الموضح أعلاه.",
    sendMessageBtn: "إرسال الرسالة",
    whyChooseUsContact: "لماذا تختارنا؟",
    localExperience: "خبرة محلية",
    localExperienceText:
      "نفهم القوانين والأنظمة المحاسبية العمانية بعمق ونقدم خدمات متخصصة للسوق المحلي",
    specializedTeam: "فريق متخصص",
    specializedTeamText:
      "محاسبون معتمدون وخبراء ماليون يقدمون استشارات عالية الجودة لضمان نجاح أعمالك",
    quickResponse: "استجابة سريعة",
    quickResponseText:
      "نضمن الرد السريع على استفساراتك وتقديم الخدمات في الوقت المحدد",
    successTitle: "تم الإرسال بنجاح!",
    successMessage: "شكراً لتواصلك معنا. سيقوم فريقنا بالرد عليك خلال 24 ساعة.",
    sendAnotherMessage: "إرسال رسالة أخرى",

    // Services Page
    servicesSubtitle:
      "نقدم مجموعة شاملة من الخدمات المحاسبية والمالية المتخصصة للشركات والأفراد في سلطنة عمان",
    callNow: "اتصل بنا الآن",
    requestConsultation: "طلب استشارة",
    allServices: "جميع الخدمات",
    generalAccounting: "المحاسبة العامة",
    financialAudit: "التدقيق المالي",
    financialConsulting: "الاستشارات المالية",
    taxServices: "الخدمات الضريبية",
    mostRequested: "الأكثر طلباً",
    includes: "ما يشمله:",
    price: "السعر",
    duration: "مدة التنفيذ",
    whyChooseOurServices: "لماذا تختار خدماتنا المحاسبية؟",
    whyChooseOurServicesText:
      "نجمع بين الخبرة الطويلة والتقنيات الحديثة لنقدم لك أفضل الحلول المحاسبية",
    guaranteedCertified: "مضمونة ومعتمدة",
    guaranteedCertifiedText:
      "جميع خدماتنا مضمونة ومعتمدة من الجهات المختصة في سلطنة عمان",
    professionalTeam: "فريق محترف",
    professionalTeamText:
      "محاسبون قانونيون معتمدون مع سنوات من الخبرة في السوق العماني",
    fastExecution: "سرعة في التنفيذ",
    fastExecutionText: "نلتزم بالمواعيد المحددة ونقدم خدماتنا في أسرع وقت ممكن",
    competitivePrices: "أسعار تنافسية",
    competitivePricesText:
      "أسعار مناسبة مع جودة عالية لجميع أنواع الشركات والمشاريع",
    readyToStart: "جاهز لبدء مشروعك المحاسبي؟",
    readyToStartText:
      "تواصل معنا اليوم واحصل على استشارة مجانية لتحديد احتياجاتك المحاسبية",
    getFreeConsultation: "احصل على استشارة مجانية",
    learnMore: "اعرف المزيد",

    // Service Categories and Items
    financialStatementsPrep: "إعداد القوائم المالية",
    financialStatementsDesc:
      "إعداد القوائم المالية الأساسية وفقاً للمعايير المحاسبية العمانية والدولية",
    bookkeepingService: "مسك الدفاتر المحاسبية",
    bookkeepingDesc:
      "خدمات مسك الدفاتر اليومية والشهرية للشركات الصغيرة والمتوسطة",
    internalAudit: "التدقيق الداخلي",
    internalAuditDesc:
      "مراجعة وتدقيق الأنظمة المالية والإدارية لضمان الامتثال والكفاءة",
    externalAudit: "التدقيق الخارجي",
    externalAuditDesc: "تدقيق القوائم المالية من قبل محاسبين قانونيين معتمدين",
    financialConsultingService: "الاستشارات المالية",
    financialConsultingDesc:
      "استشارات متخصصة في التخطيط المالي وإدارة الاستثمارات",
    budgetPreparation: "إعداد الميزانيات",
    budgetPreparationDesc:
      "إعداد الميزانيات التقديرية والتشغيلية للشركات والمشاريع",
    taxReturns: "الإقرارات الضريبية",
    taxReturnsDesc: "إعداد وتقديم الإقرارات الضريبية للشركات والأفراد",
    taxConsulting: "الاستشارات الضريبية",
    taxConsultingDesc: "استشارات متخصصة في القوانين والأنظمة الضريبية العمانية",
    companyFormation: "تأسيس الشركات",
    companyFormationDesc: "خدمات شاملة لتأسيس الشركات وإعداد النظم المحاسبية",
  },
  en: {
    // Header
    home: "Home",
    services: "Services",
    accountants: "Accountants",
    contact: "Contact",
    notifications: "Notifications",
    messages: "Messages",
    myProjects: "My Projects",
    addProject: "+ Add Project",
    profile: "Profile",
    settings: "Settings",
    logout: "Logout",

    // Hero
    heroTitle: "Trusted Accounting Services at Your Fingertips",
    heroSubtitle:
      "Our platform connects you with certified professionals for all accounting, auditing, and tax needs.",
    findService: "Find a Service",
    joinAsAccountant: "Join as Accountant",
    certifiedAccountants: "500+ Certified Accountants",
    clientsServed: "1000+ Clients",
    completedServices: "2000+ Completed Services",

    // How it Works
    howItWorks: "How It Works",
    step1: "Post a project or choose a service",
    step2: "Receive offers from accountants",
    step3: "Communicate & pay securely",
    step4: "Get your service delivered",

    // Services
    featuredServices: "Featured Services",
    bookkeeping: "Bookkeeping",
    financialStatements: "Financial Statements",
    taxFiling: "Tax Filing",
    auditing: "Auditing & Review",
    financialConsulting: "Financial Consulting",
    payroll: "Payroll & Insurance",

    // Top Accountants
    topAccountants: "Top Accountants",
    contactBtn: "Contact",
    viewAll: "View All",

    // Why Choose Us
    whyChooseUs: "Why Choose Us",
    certifiedProfessionals: "Certified Professionals",
    securePayment: "Secure Payment",
    verifiedContracts: "Verified Contracts",
    support24: "24/7 Support",

    // Testimonials
    testimonials: "What Our Clients Say",

    // Stats
    statsTitle: "Our Numbers Speak",

    // CTA
    ctaTitle: "Start Your Accounting Journey Today",
    ctaText:
      "Get started today — whether you need accounting services or want to offer your expertise.",
    requestService: "Request a Service",
    signUpAccountant: "Sign Up as Accountant",

    // Footer
    aboutUs: "About Us",
    privacyPolicy: "Privacy Policy",
    terms: "Terms",
    support: "Support",

    // Modal
    addProjectTitle: "Add New Project",
    projectTitle: "Project Title",
    category: "Category",
    budget: "Budget",
    deadline: "Deadline",
    description: "Description",
    attachFile: "Attach File",
    contactMethod: "Contact Method",
    submit: "Submit",
    cancel: "Cancel",

    // Contact Page
    contactTitle: "Contact",
    contactSubtitle:
      "We are here to help you with all your accounting needs. Contact us today and discover how we can support your business success in Oman",
    contactInfo: "Contact Information",
    address: "Address",
    addressDetails:
      "Sultan Qaboos Street, Central Business Building\nThird Floor, Office 301\nMuscat, Sultanate of Oman",
    phone: "Phone",
    email: "Email",
    workingHours: "Working Hours",
    workingHoursDetails:
      "Sunday - Thursday: 8:00 AM - 6:00 PM\nFriday: 9:00 AM - 12:00 PM\nSaturday: Closed",
    specializedServices: "Our Specialized Services",
    specializedServicesList:
      "• Accounting certified according to Omani standards\n• Specialized financial auditing\n• Tax and legal consultations\n• Support for startups and small companies",
    sendMessage: "Send us a message",
    fullName: "Full Name",
    fullNamePlaceholder: "Enter your full name",
    emailPlaceholder: "example@email.com",
    phonePlaceholder: "+968 xxxx xxxx",
    companyName: "Company Name",
    companyPlaceholder: "Your company name (optional)",
    serviceType: "Required Service Type",
    selectService: "Select service type",
    messageDetails: "Message Details",
    messagePlaceholder:
      "Write your message here... Tell us about your accounting needs and how we can help you",
    note: "Note:",
    noteText:
      "All inquiries will be responded to within 24 business hours. For accounting emergencies, please call the number above directly.",
    sendMessageBtn: "Send Message",
    whyChooseUsContact: "Why Choose Us?",
    localExperience: "Local Experience",
    localExperienceText:
      "We deeply understand Omani accounting laws and regulations and provide specialized services for the local market",
    specializedTeam: "Specialized Team",
    specializedTeamText:
      "Certified accountants and financial experts who provide high-quality consultations to ensure your business success",
    quickResponse: "Quick Response",
    quickResponseText:
      "We guarantee quick response to your inquiries and timely service delivery",
    successTitle: "Sent Successfully!",
    successMessage:
      "Thank you for contacting us. Our team will respond to you within 24 hours.",
    sendAnotherMessage: "Send another message",

    // Services Page
    servicesSubtitle:
      "We provide a comprehensive range of specialized accounting and financial services for companies and individuals in the Sultanate of Oman",
    callNow: "Call us now",
    requestConsultation: "Request consultation",
    allServices: "All Services",
    generalAccounting: "General Accounting",
    financialAudit: "Financial Audit",
    financialConsulting: "Financial Consulting",
    taxServices: "Tax Services",
    mostRequested: "Most Requested",
    includes: "Includes:",
    price: "Price",
    duration: "Duration",
    requestService: "Request Service",
    whyChooseOurServices: "Why Choose Our Accounting Services?",
    whyChooseOurServicesText:
      "We combine long experience with modern technology to provide you with the best accounting solutions",
    guaranteedCertified: "Guaranteed and Certified",
    guaranteedCertifiedText:
      "All our services are guaranteed and certified by the relevant authorities in the Sultanate of Oman",
    professionalTeam: "Professional Team",
    professionalTeamText:
      "Certified public accountants with years of experience in the Omani market",
    fastExecution: "Fast Execution",
    fastExecutionText:
      "We commit to deadlines and provide our services as quickly as possible",
    competitivePrices: "Competitive Prices",
    competitivePricesText:
      "Reasonable prices with high quality for all types of companies and projects",
    readyToStart: "Ready to start your accounting project?",
    readyToStartText:
      "Contact us today and get a free consultation to determine your accounting needs",
    getFreeConsultation: "Get free consultation",
    learnMore: "Learn more",

    // Service Categories and Items
    financialStatementsPrep: "Financial Statements Preparation",
    financialStatementsDesc:
      "Preparation of basic financial statements according to Omani and international accounting standards",
    bookkeepingService: "Bookkeeping Services",
    bookkeepingDesc:
      "Daily and monthly bookkeeping services for small and medium companies",
    internalAudit: "Internal Audit",
    internalAuditDesc:
      "Review and audit of financial and administrative systems to ensure compliance and efficiency",
    externalAudit: "External Audit",
    externalAuditDesc:
      "Audit of financial statements by certified public accountants",
    financialConsultingService: "Financial Consulting",
    financialConsultingDesc:
      "Specialized consultations in financial planning and investment management",
    budgetPreparation: "Budget Preparation",
    budgetPreparationDesc:
      "Preparation of estimated and operational budgets for companies and projects",
    taxReturns: "Tax Returns",
    taxReturnsDesc:
      "Preparation and submission of tax returns for companies and individuals",
    taxConsulting: "Tax Consulting",
    taxConsultingDesc:
      "Specialized consultations on Omani tax laws and regulations",
    companyFormation: "Company Formation",
    companyFormationDesc:
      "Comprehensive services for company formation and accounting system setup",
  },
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState("en");

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "ar" ? "en" : "ar"));
  };

  const t = (key) => {
    return translations[language][key] || key;
  };

  const dir = language === "ar" ? "rtl" : "ltr";

  useEffect(() => {
    document.documentElement.setAttribute("dir", dir);
    document.documentElement.setAttribute("lang", language);
  }, [language, dir]);

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t, dir }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
