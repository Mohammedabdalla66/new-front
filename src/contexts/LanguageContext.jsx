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
    messageHistory: "تاريخ الرسائل",
    messageHistoryDesc: "عرض تاريخ الرسائل والتفاصيل المتعلقة بالرسالة",
    messageDetailsDesc: "عرض تفاصيل الرسالة والتفاصيل المتعلقة بالرسالة",
    messageSender: "المرسل",
    messageReceiver: "المستقبل",
    messageTimestamp: "الوقت",
    messageContent: "المحتوى",
    messageStatus: "الحالة",
    messageStatusDesc: "عرض الحالة الحالية للرسالة",
    messageActions: "الإجراءات",
    messageActionsDesc: "عرض الإجراءات المتعلقة بالرسالة",
    NotificationPreferences: "تفضيلات الإشعارات",

    // Service Provider Dashboard & Proposals
    requestService: "طلب خدمة",
    financialConsultingService: "الاستشارات المالية",
    myProposals: "عروضي",
    myProposalsSubtitle: "عرض وإدارة جميع عروضك المقدمة للعملاء",
    proposalStatus: "حالة العرض",
    proposalRequest: "الطلب",
    proposalClient: "العميل",
    proposalSubmittedDate: "تاريخ الإرسال",
    viewProposal: "عرض العرض",
    editProposal: "تعديل العرض",
    withdrawProposal: "سحب العرض",
    proposalWithdrawn: "تم سحب العرض",
    confirmWithdrawProposal: "هل أنت متأكد من سحب هذا العرض؟",
    proposalCannotBeWithdrawn: "لا يمكن سحب العرض بعد أن يرد العميل عليه",
    noProposalsFound: "لا توجد عروض",
    noProposalsMessage: "لم تقم بإرسال أي عروض بعد. ابدأ بتصفح المشاريع المتاحة.",
    searchProposals: "البحث في العروض...",
    filterByStatus: "تصفية حسب الحالة",
    allProposals: "جميع العروض",
    pendingProposals: "العروض المعلقة",
    activeProposals: "العروض النشطة",
    acceptedProposals: "العروض المقبولة",
    rejectedProposals: "العروض المرفوضة",
    canceledProposals: "العروض الملغاة",
    proposalDetails: "تفاصيل العرض",
    backToProposals: "العودة إلى العروض",
    proposalFor: "عرض لـ",
    submittedOn: "تم الإرسال في",
    proposalNotes: "ملاحظات العرض",
    proposalAttachments: "مرفقات العرض",
    requestInformation: "معلومات الطلب",
    clientBudget: "ميزانية العميل",
    viewRequestDetails: "عرض تفاصيل الطلب",
    priceRange: "نطاق السعر",
    priceMustBeWithinRange: "يجب أن يكون السعر ضمن النطاق المحدد",
    priceTooLow: "السعر منخفض جداً",
    priceTooHigh: "السعر مرتفع جداً",
    priceWithinRange: "السعر ضمن النطاق المحدد",
    submitProposal: "إرسال العرض",
    submittingProposal: "جاري الإرسال...",
    proposalSubmitted: "تم إرسال العرض بنجاح!",
    proposalSubmittedMessage: "سيتم مراجعة عرضك من قبل الإدارة قبل أن يصبح مرئياً للعميل.",
    proposalPrice: "سعر العرض",
    proposalDuration: "مدة العرض",
    proposalNotesLabel: "ملاحظات",
    proposalAttachmentsLabel: "المرفقات (اختياري)",
    selectFiles: "اختر الملفات",
    removeFile: "إزالة الملف",
    browseProjectsTitle: "تصفح المشاريع",
    browseProjectsSubtitle: "ابحث وتقدم للمشاريع المحاسبية التي تناسب مهاراتك",
    searchProjects: "البحث في المشاريع...",
    allStatus: "جميع الحالات",
    newestFirst: "الأحدث أولاً",
    highestBudget: "أعلى ميزانية",
    mostProposals: "أكثر العروض",
    viewDetails: "عرض التفاصيل",
    submitProposalButton: "إرسال عرض",
    noProjectsFound: "لم يتم العثور على مشاريع",
    noProjectsMessage: "حاول تعديل معايير البحث أو تحقق مرة أخرى لاحقاً للمشاريع الجديدة.",
    previousPage: "السابق",
    nextPage: "التالي",
    page: "صفحة",
    of: "من",
    loadingProjects: "جاري تحميل المشاريع...",
    failedToLoadProjects: "فشل تحميل المشاريع",
    projectDescription: "وصف المشروع",
    projectBudget: "ميزانية المشروع",
    projectDeadline: "الموعد النهائي",
    projectStatus: "حالة المشروع",
    projectAttachments: "مرفقات المشروع",
    clientInformation: "معلومات العميل",
    clientName: "اسم العميل",
    clientEmail: "البريد الإلكتروني للعميل",
    backToBrowse: "العودة إلى التصفح",
    hasProposal: "لديك عرض",
    viewYourProposal: "عرض عرضك",
    alreadyProposed: "لقد قمت بالفعل بإرسال عرض لهذا الطلب.",
    proposalFormTitle: "إرسال عرض",
    priceLabel: "السعر (دولار أمريكي) *",
    priceHelper: "يجب أن يكون السعر ضمن نطاق ميزانية العميل",
    durationLabel: "المدة (أيام) *",
    notesLabel: "ملاحظات",
    notesPlaceholder: "أضف أي معلومات إضافية حول عرضك...",
    attachmentsLabel: "المرفقات (اختياري)",
    selectFilesLabel: "اختر الملفات",
    fileTypesAllowed: "أنواع الملفات المسموحة: PDF, DOC, DOCX, الصور",
    priceRequired: "السعر والمدة مطلوبان",
    proposalSubmittedSuccess: "تم إرسال العرض بنجاح! في انتظار موافقة الإدارة.",
    failedToSubmitProposal: "فشل إرسال العرض",
    loadingRequest: "جاري تحميل الطلب...",
    failedToLoadRequest: "فشل تحميل الطلب",
    requestNotFound: "الطلب غير موجود",
    backToBrowseProjects: "العودة إلى تصفح المشاريع",
    cancelProposal: "إلغاء العرض",
    confirmCancelProposal: "هل أنت متأكد أنك تريد إلغاء هذا العرض؟",
    proposalCanceled: "تم إلغاء العرض بنجاح",
    failedToCancelProposal: "فشل إلغاء العرض",

    // Dashboard
    showcaseYourWorkSamplesCaseStudiesCertifications: "عرض عينات العمل، دراسات الحالة، والشهادات",
    pleaseEnterMessage: "يرجى إدخال رسالة",
    pleaseSelectConversation: "يرجى اختيار محادثة للبدء",
    chat: "محادثة",
    dashboard: "لوحة التحكم",
    myRequests: "طلباتي",
    wallet: "المحفظة",
    portfolio: "الملف الشخصي",
    browseProjects: "تصفح المشاريع",
    helpSupport: "المساعدة والدعم",
    accountingPlatform: "منصة المحاسبة",
    searchPlaceholder: "البحث...",
    toggleLanguage: "تغيير اللغة",
    toggleDarkMode: "الوضع المظلم",
    totalBookings: "إجمالي الحجوزات",
    activeProjects: "المشاريع النشطة",
    completedProjects: "المشاريع المكتملة",
    earnings: "الأرباح",
    recentActivity: "النشاط الأخير",
    quickActions: "الإجراءات السريعة",
    upcomingDeadlines: "المواعيد النهائية القادمة",
    monthlyOverview: "نظرة شهرية",
    createProposal: "إنشاء عرض جديد",
    scheduleCall: "جدولة مكالمة",
    uploadDocument: "رفع مستند",
    pending: "في الانتظار",
    accepted: "مقبول",
    rejected: "مرفوض",
    balance: "الرصيد",
    withdrawals: "السحوبات",
    paymentHistory: "تاريخ المدفوعات",
    workSamples: "عينات العمل",
    caseStudies: "دراسات الحالة",
    certifications: "الشهادات",
    availableProjects: "المشاريع المتاحة",
    applyForProject: "التقدم للمشروع",
    profileSettings: "إعدادات الملف الشخصي",
    changePassword: "تغيير كلمة المرور",
    languageSwitcher: "مبدل اللغة",
    faq: "الأسئلة الشائعة",
    supportForm: "نموذج الدعم",
    clock: "الساعة",

    // FAQ Page
    faqTitle: "الأسئلة الشائعة",
    faqSubtitle:
      "كل ما تحتاج معرفته حول استخدام المنصة وإدارة المشاريع والمدفوعات.",
    faqCallNow: "اتصل الآن",
    faqRequestConsultation: "طلب استشارة",

    // FAQ Categories
    faqCategoryGettingStarted: "البدء",
    faqCategoryProjects: "المشاريع والعروض",
    faqCategoryPayments: "المدفوعات والفواتير",
    faqCategoryAccount: "الحساب والأمان",

    // FAQ Questions - Getting Started
    faqQ1: "كيف أنشئ عرض مشروعي الأول؟",
    faqA1:
      'لإنشاء عرض مشروعك الأول، اذهب إلى صفحة "تصفح المشاريع"، ابحث عن مشروع يناسب مهاراتك، وانقر على "التقدم للمشروع". املأ نموذج العرض بمنهجك والجدول الزمني والتسعير.',
    faqQ2: "ما المعلومات التي يجب أن أدرجها في ملفي الشخصي؟",
    faqA2:
      "يجب أن يتضمن ملفك الشخصي لقبك المهني وخبرتك ومهاراتك وشهاداتك وسيرة ذاتية مقنعة تسلط الضوء على خبرتك. ارفع عينات من أعمالك ودراسات الحالة لعرض قدراتك.",
    faqQ3: "كيف أحدد معدل الساعة الخاص بي؟",
    faqA3:
      "يمكنك تحديد معدل الساعة الخاص بك في إعدادات ملفك الشخصي. ضع في اعتبارك خبرتك وأسعار السوق وتعقيد المشاريع عند تحديد تسعيرك.",

    // FAQ Questions - Projects & Proposals
    faqQ4: "كم من الوقت لديه العملاء للرد على عرضي؟",
    faqA4:
      'عادة ما يكون لدى العملاء 7-14 يومًا للرد على العروض. يمكنك التحقق من حالة عروضك في قسم "طلباتي" في لوحة التحكم الخاصة بك.',
    faqQ5: "هل يمكنني سحب عرض بعد إرساله؟",
    faqA5:
      'نعم، يمكنك سحب عرض قبل أن يرد العميل. اذهب إلى "طلباتي"، ابحث عن العرض، وانقر على "سحب".',
    faqQ6: "ماذا يحدث إذا لم يرد العميل على عرضي؟",
    faqA6:
      "إذا لم يرد العميل خلال الإطار الزمني المحدد، ستنتهي صلاحية العرض تلقائيًا ويمكنك التقدم لمشاريع أخرى.",

    // FAQ Questions - Payments & Billing
    faqQ7: "كيف أحصل على أجر المشاريع المكتملة؟",
    faqA7:
      "بمجرد اكتمال المشروع وموافقة العميل عليه، يتم معالجة الدفع تلقائيًا إلى محفظتك. يمكنك بعد ذلك سحب الأموال إلى حسابك المصرفي.",
    faqQ8: "ما هي رسوم المنصة؟",
    faqA8:
      "رسوم منصتنا هي 10% من كل مشروع مكتمل. وهذا يغطي معالجة المدفوعات وحل النزاعات وصيانة المنصة.",
    faqQ9: "كم من الوقت يستغرق استلام المدفوعات؟",
    faqA9:
      "عادة ما تتم معالجة المدفوعات خلال 24-48 ساعة بعد اكتمال المشروع وموافقة العميل.",

    // FAQ Questions - Account & Security
    faqQ10: "كيف أتحقق من CaHup؟",
    faqA10:
      "للتحقق من حسابك، ارفع بطاقة هوية صادرة عن الحكومة وإثبات أوراق اعتمادك المهنية. عادة ما يستغرق التحقق من 1-3 أيام عمل.",
    faqQ11: "هل يمكنني تغيير عنوان بريدي الإلكتروني؟",
    faqA11:
      "نعم، يمكنك تغيير عنوان بريدك الإلكتروني في إعدادات حسابك. ستحتاج إلى التحقق من عنوان البريد الإلكتروني الجديد قبل أن يصبح نشطًا.",
    faqQ12: "كيف أحذف CaHup؟",
    faqA12:
      "لحذف حسابك، اتصل بفريق الدعم لدينا. يرجى ملاحظة أن هذا الإجراء لا يمكن التراجع عنه وستفقد الوصول إلى جميع بياناتك.",

    // Client Dashboard
    clientDashboardTitle: "لوحة التحكم",
    clientDashboardSubtitle: "مرحباً بعودتك! إليك ما يحدث مع حسابك.",
    completed: "مكتمل",
    totalSpent: "إجمالي المصروف",
    chartVisualization: "سيتم عرض الرسم البياني هنا",
    urgent: "عاجل",
    soon: "قريباً",
    scheduled: "مجدول",
    dueIn: "مستحق خلال",
    days: "أيام",
    week: "أسبوع",
    weeks: "أسابيع",

    // Client Requests
    myRequestsSubtitle: "أنشئ وأدر طلبات الخدمة الخاصة بك.",
    newRequest: "طلب جديد",
    createAndManage: "أنشئ وأدر طلبات الخدمة الخاصة بك.",
    searchRequests: "البحث في الطلبات...",
    all: "الكل",
    submitted: "مقدم",
    inProgress: "قيد التنفيذ",
    requestTitle: "عنوان الطلب",
    status: "الحالة",
    offers: "عروض",
    lastUpdated: "آخر تحديث",
    loading: "جاري التحميل...",
    failedToLoad: "فشل التحميل",
    noRequests: "لا توجد طلبات",

    // Request Details
    requestDetails: "تفاصيل الطلب",
    backToRequests: "العودة إلى الطلبات",
    offersTab: "العروض",
    chatTab: "المحادثة",
    deliveredTab: "المسلمة",
    noProposalsYet: "لا توجد عروض بعد. يمكن لمقدمي الخدمات تقديم عروض لهذا الطلب.",
    loadingProposals: "جاري تحميل العروض...",
    daysLabel: "أيام",
    accept: "قبول",
    accepting: "جاري القبول...",
    noMessagesYet: "لا توجد رسائل بعد. ستظهر الرسائل من مقدمي الخدمات الذين قدموا عروضاً هنا.",
    loadingMessages: "جاري تحميل الرسائل...",
    selectConversation: "اختر محادثة",
    noConversationSelected: "لم يتم اختيار محادثة",
    selectServiceProvider: "اختر مقدم خدمة لبدء المراسلة",
    startConversation: "ابدأ المحادثة!",
    deliveredFiles: "ستظهر الملفات المسلمة هنا بمجرد اكتمال العمل من قبل مقدم الخدمة.",

    // Service Request Form
    createServiceRequest: "إنشاء طلب خدمة",
    provideDetails: "قدم التفاصيل حتى يتمكن المزودون من تقديم عروض دقيقة.",
    serviceTitle: "عنوان الخدمة",
    serviceTitlePlaceholder: "مثال: مسك الدفاتر الشهري للأعمال الصغيرة",
    descriptionPlaceholder: "اوصف بإيجاز نطاق العمل والنتائج المطلوبة وأي سياق يجب أن يعرفه المزودون.",
    attachments: "المرفقات",
    legalFormLabel: "الشكل القانوني للشركة",
    businessActivityLabel: "النشاط التجاري",
    registeredCapitalLabel: "رأس المال بالسجل التجاري (ريال)",
    registeredCapitalPlaceholder: "أدخل رأس المال",
    estimatedRevenueLabel: "الإيرادات التقديرية (ريال)",
    estimatedRevenuePlaceholder: "أدخل الإيرادات التقديرية",
    estimatedExpensesLabel: "المصاريف التقديرية (ريال)",
    estimatedExpensesPlaceholder: "أدخل المصاريف التقديرية",
    budgetRange: "نطاق الميزانية (ريال)",
    selectBudgetRange: "اختر نطاق الميزانية",
    selectBudgetRangeHelper: "اختر نطاق الميزانية المقدر.",
    selectDeadline: "اختر الموعد النهائي المستهدف.",
    submitRequest: "إرسال الطلب",
    submitting: "جاري الإرسال...",
    requestSubmittedSuccess: "تم إرسال الطلب بنجاح!",
    redirectingToRequests: "جاري إعادة التوجيه إلى طلباتك...",
    pleaseVerifyPhone: "يرجى التحقق من رقم هاتفك قبل الإرسال",
    pleaseUploadDocument: "يرجى رفع مستند واحد على الأقل",
    failedToSubmit: "فشل إرسال الطلب. يرجى المحاولة مرة أخرى.",

    // Messages
    conversations: "المحادثات",
    noConversationsYet: "لا توجد محادثات بعد. ابدأ محادثة من ملف مقدم الخدمة.",
    chattingWith: "التحدث مع",
    selectConversationToStart: "اختر محادثة",
    writeMessage: "اكتب رسالة... (Enter للإرسال، Shift+Enter للسطر الجديد)",
    send: "إرسال",
    attached: "مرفق:",
    loadingMessagesLabel: "جاري تحميل الرسائل...",
    failedToLoadMessages: "فشل تحميل الرسائل",
    failedToSendMessage: "فشل إرسال الرسالة",
    invalidServiceProviderId: "معرف مقدم الخدمة غير صحيح",

    // Wallet
    currentWalletBalance: "رصيد المحفظة الحالي",
    updatedJustNow: "تم التحديث للتو",
    addFunds: "إضافة أموال",
    amountUSD: "المبلغ (ريال عماني)",
    amountPlaceholder: "مثال: 250",
    paymentMethod: "طريقة الدفع",
    cardNumber: "رقم البطاقة",
    cardNumberPlaceholder: "1234 5678 9012 3456",
    expiry: "انتهاء الصلاحية",
    expiryPlaceholder: "MM/YY",
    cvv: "CVV",
    fundsAddedSuccess: "تمت إضافة الأموال بنجاح.",
    failedToAddFunds: "فشل إضافة الأموال",
    failedToLoadWallet: "فشل تحميل المحفظة",
    transactions: "المعاملات",
    date: "التاريخ",
    amount: "المبلغ",

    // Documents
    documents: "المستندات",
    documentManagementUI: "ستظهر واجهة إدارة المستندات هنا.",

    // Help
    supportContentFAQs: "سيتم عرض محتوى الدعم والأسئلة الشائعة هنا.",

    // Client Profile
    myProfile: "ملفي الشخصي",
    updatePersonalDetails: "حدّث تفاصيلك الشخصية والتفضيلات.",
    totalRequests: "إجمالي الطلبات",
    totalPaid: "إجمالي المدفوع",
    pendingDocuments: "المستندات المعلقة",

    // Client Sidebar
    myRequestsSidebar: "طلباتي",
    messagesSidebar: "الرسائل",
    walletSidebar: "المحفظة",
    documentsSidebar: "المستندات",
    myProfileSidebar: "ملفي الشخصي",
    settingsSidebar: "الإعدادات",
    helpSupportSidebar: "المساعدة والدعم",

    // Settings
    manageAccountPreferences: "أدر تفضيلات حسابك وإعدادات الأمان.",
    security: "الأمان",
    billing: "الفواتير والمدفوعات",
    dataPrivacy: "البيانات والخصوصية",
    appearance: "المظهر",
    darkMode: "الوضع المظلم",
    applyDarkTheme: "تطبيق مظهر داكن على التخطيط والشريط الجانبي",
    on: "تشغيل",
    off: "إيقاف",
    billingSettingsAvailable: "ستكون إعدادات الفواتير وطرق الدفع متاحة هنا.",
    dataManagementAvailable: "ستكون إدارة البيانات وإعدادات الخصوصية متاحة هنا.",
    language: "اللغة",
    selectLanguage: "اختر اللغة",
    arabic: "العربية",
    english: "الإنجليزية",
    acceptProposalConfirm: "هل أنت متأكد أنك تريد قبول هذا العرض؟ سيتم إنشاء حجز ووضع الأموال في الضمان.",
    proposalAccepted: "تم قبول العرض! تم إنشاء الحجز ووضع الأموال في الضمان.",
    
    // Additional translations for hardcoded strings and missing keys
    viewRequestInfo: "عرض معلومات الطلب وإرسال عرض",
    priceUSD: "السعر (دولار أمريكي) *",
    durationDays: "المدة (أيام) *",
    attachmentsOptional: "المرفقات (اختياري)",
    priceAndDurationRequired: "السعر والمدة مطلوبان",
    priceOutsideRange: "السعر خارج نطاق ميزانية العميل",
    priceMustBeValid: "يجب أن يكون السعر رقماً موجباً صحيحاً",
    priceAtLeast: "يجب أن يكون السعر على الأقل",
    priceNotExceed: "يجب ألا يتجاوز السعر",
    clientBudgetRange: "نطاق ميزانية العميل",
    loadingProposal: "جاري تحميل العرض...",
    failedToLoadProposal: "فشل تحميل العرض",
    proposalNotFound: "العرض غير موجود",
    backToMyProposals: "العودة إلى عروضي",
    proposalDetailsTitle: "تفاصيل العرض",
    viewProposalInfo: "عرض معلومات عرضك وحالته",
    proposalForRequest: "عرض لـ",
    open: "مفتوح",
    notSpecified: "غير محدد",
    today: "اليوم",
    yesterday: "أمس",
    daysAgo: "منذ أيام",
    weeksAgo: "منذ أسابيع",
    updateResubmitRequest: "تحديث وإعادة إرسال الطلب",
    requestRejected: "تم رفض الطلب",
    rejectionReason: "سبب الرفض:",
    requestPending: "الطلب قيد المراجعة",
    requestPendingMessage: "طلبك قيد المراجعة من قبل الإدارة. سيتم إشعارك عند الموافقة أو الرفض.",
    requestStatus: "حالة الطلب",
    requestDescription: "وصف الطلب",
    requestBudget: "ميزانية الطلب",
    requestDeadline: "الموعد النهائي",
    requestAttachments: "مرفقات الطلب",
    serviceProviderName: "اسم مقدم الخدمة",
    serviceProviderEmail: "البريد الإلكتروني",
    chatWithProvider: "التحدث مع مقدم الخدمة",
    acceptThisProposal: "قبول هذا العرض",
    proposalAcceptedSuccess: "تم قبول العرض بنجاح! تم إنشاء الحجز ووضع الأموال في الضمان.",
    failedToAcceptProposal: "فشل قبول العرض",
    noActiveProposals: "لا توجد عروض نشطة حالياً",
    onlyActiveProposalsShown: "يتم عرض العروض النشطة فقط (التي تمت الموافقة عليها من قبل الإدارة)",
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

    // Dashboard
    dashboard: "Dashboard",
    myRequests: "My Requests",
    wallet: "Wallet",
    portfolio: "Portfolio",
    browseProjects: "Browse Projects",
    helpSupport: "Help & Support",
    accountingPlatform: "Accounting Platform",
    searchPlaceholder: "Search...",
    toggleLanguage: "Toggle Language",
    toggleDarkMode: "Toggle Dark Mode",
    totalBookings: "Total Bookings",
    activeProjects: "Active Projects",
    completedProjects: "Completed Projects",
    earnings: "Earnings",
    recentActivity: "Recent Activity",
    quickActions: "Quick Actions",
    upcomingDeadlines: "Upcoming Deadlines",
    monthlyOverview: "Monthly Overview",
    createProposal: "Create New Proposal",
    scheduleCall: "Schedule a Call",
    uploadDocument: "Upload Document",
    pending: "Pending",
    accepted: "Accepted",
    rejected: "Rejected",
    balance: "Balance",
    withdrawals: "Withdrawals",
    paymentHistory: "Payment History",
    workSamples: "Work Samples",
    caseStudies: "Case Studies",
    certifications: "Certifications",
    availableProjects: "Available Projects",
    applyForProject: "Apply for Project",
    profileSettings: "Profile Settings",
    changePassword: "Change Password",
    languageSwitcher: "Language Switcher",
    faq: "FAQ",
    supportForm: "Support Form",
    clock: "Clock",

    // FAQ Page
    faqTitle: "Frequently Asked Questions (FAQ)",
    faqSubtitle:
      "Everything you need to know about using the platform, managing projects, and payments.",
    faqCallNow: "Call Now",
    faqRequestConsultation: "Request Consultation",

    // FAQ Categories
    faqCategoryGettingStarted: "Getting Started",
    faqCategoryProjects: "Projects & Proposals",
    faqCategoryPayments: "Payments & Billing",
    faqCategoryAccount: "Account & Security",

    // FAQ Questions - Getting Started
    faqQ1: "How do I create my first project proposal?",
    faqA1:
      'To create your first project proposal, go to the "Browse Projects" page, find a project that matches your skills, and click "Apply for Project". Fill out the proposal form with your approach, timeline, and pricing.',
    faqQ2: "What information should I include in my profile?",
    faqA2:
      "Your profile should include your professional title, experience, skills, certifications, and a compelling bio that highlights your expertise. Upload work samples and case studies to showcase your capabilities.",
    faqQ3: "How do I set my hourly rate?",
    faqA3:
      "You can set your hourly rate in your profile settings. Consider your experience, market rates, and the complexity of projects when determining your pricing.",

    // FAQ Questions - Projects & Proposals
    faqQ4: "How long do clients have to respond to my proposal?",
    faqA4:
      'Clients typically have 7-14 days to respond to proposals. You can check the status of your proposals in the "My Requests" section of your dashboard.',
    faqQ5: "Can I withdraw a proposal after submitting it?",
    faqA5:
      'Yes, you can withdraw a proposal before the client responds. Go to "My Requests", find the proposal, and click "Withdraw".',
    faqQ6: "What happens if a client doesn't respond to my proposal?",
    faqA6:
      "If a client doesn't respond within the specified timeframe, the proposal will automatically expire and you can apply to other projects.",

    // FAQ Questions - Payments & Billing
    faqQ7: "How do I get paid for completed projects?",
    faqA7:
      "Once a project is completed and approved by the client, payment is automatically processed to your wallet. You can then withdraw funds to your bank account.",
    faqQ8: "What are the platform fees?",
    faqA8:
      "Our platform fee is 10% of each completed project. This covers payment processing, dispute resolution, and platform maintenance.",
    faqQ9: "How long does it take to receive payments?",
    faqA9:
      "Payments are typically processed within 24-48 hours after project completion and client approval.",

    // FAQ Questions - Account & Security
    faqQ10: "How do I verify my account?",
    faqA10:
      "To verify your account, upload a government-issued ID and proof of your professional credentials. Verification typically takes 1-3 business days.",
    faqQ11: "Can I change my email address?",
    faqA11:
      "Yes, you can change your email address in your account settings. You'll need to verify the new email address before it becomes active.",
    faqQ12: "How do I delete my account?",
    faqA12:
      "To delete your account, contact our support team. Please note that this action is irreversible and you'll lose access to all your data.",

    // Client Dashboard
    clientDashboardTitle: "Dashboard Overview",
    clientDashboardSubtitle: "Welcome back! Here's what's happening with your account.",
    completed: "Completed",
    totalSpent: "Total Spent",
    chartVisualization: "Chart visualization would go here",
    urgent: "Urgent",
    soon: "Soon",
    scheduled: "Scheduled",
    dueIn: "Due in",
    days: "days",
    week: "week",
    weeks: "weeks",

    // Client Requests
    myRequestsSubtitle: "Create and manage your service requests.",
    newRequest: "New Request",
    createAndManage: "Create and manage your service requests.",
    searchRequests: "Search requests...",
    all: "All",
    submitted: "Submitted",
    inProgress: "In Progress",
    requestTitle: "Request Title",
    status: "Status",
    offers: "Offers",
    lastUpdated: "Last Updated",
    loading: "Loading...",
    failedToLoad: "Failed to load",
    noRequests: "No requests",

    // Request Details
    requestDetails: "Request Details",
    backToRequests: "Back to Requests",
    offersTab: "Offers",
    chatTab: "Chat",
    deliveredTab: "Delivered",
    noProposalsYet: "No proposals yet. Service providers can submit proposals for this request.",
    loadingProposals: "Loading proposals...",
    daysLabel: "days",
    accept: "Accept",
    accepting: "Accepting...",
    noMessagesYet: "No messages yet. Messages from service providers who have submitted proposals will appear here.",
    loadingMessages: "Loading messages...",
    selectConversation: "Select a conversation",
    noConversationSelected: "No conversation selected",
    selectServiceProvider: "Select a service provider to start messaging",
    startConversation: "Start the conversation!",
    deliveredFiles: "Delivered files will appear here once the service provider completes the work.",

    // Service Request Form
    createServiceRequest: "Create Service Request",
    provideDetails: "Provide details so providers can make accurate offers.",
    serviceTitle: "Service Title",
    serviceTitlePlaceholder: "E.g. Monthly Bookkeeping for Small Business",
    descriptionPlaceholder: "Briefly describe the work scope, required deliverables, and any context providers should know.",
    attachments: "Attachments",
    legalFormLabel: "Legal Form",
    businessActivityLabel: "Business Activity",
    registeredCapitalLabel: "Registered Capital (OMR)",
    registeredCapitalPlaceholder: "Enter registered capital",
    estimatedRevenueLabel: "Estimated Revenue (OMR)",
    estimatedRevenuePlaceholder: "Enter estimated revenue",
    estimatedExpensesLabel: "Estimated Expenses (OMR)",
    estimatedExpensesPlaceholder: "Enter estimated expenses",
    budgetRange: "Budget Range (OMR)",
    selectBudgetRange: "Select a budget range",
    selectBudgetRangeHelper: "Select an estimated budget range.",
    selectDeadline: "Select a target due date.",
    submitRequest: "Submit Request",
    submitting: "Submitting...",
    requestSubmittedSuccess: "Request submitted successfully!",
    redirectingToRequests: "Redirecting to your requests...",
    pleaseVerifyPhone: "Please verify your phone number before submitting",
    pleaseUploadDocument: "Please upload at least one document",
    failedToSubmit: "Failed to submit request. Please try again.",

    // Messages
    conversations: "Conversations",
    noConversationsYet: "No conversations yet. Start a conversation from a service provider profile.",
    chattingWith: "Chatting with",
    selectConversationToStart: "Select a conversation",
    serviceProvider: "Service Provider",
    writeMessage: "Write a message... (Enter to send, Shift+Enter for new line)",
    send: "Send",
    attached: "Attached:",
    loadingMessagesLabel: "Loading messages...",
    failedToLoadMessages: "Failed to load messages",
    failedToSendMessage: "Failed to send message",
    invalidServiceProviderId: "Invalid service provider ID",

    // Wallet
    currentWalletBalance: "Current Wallet Balance",
    updatedJustNow: "Updated just now",
    addFunds: "Add Funds",
    amountUSD: "Amount (OMR)",
    amountPlaceholder: "e.g. 250",
    paymentMethod: "Payment Method",
    cardNumber: "Card Number",
    cardNumberPlaceholder: "1234 5678 9012 3456",
    expiry: "Expiry",
    expiryPlaceholder: "MM/YY",
    cvv: "CVV",
    fundsAddedSuccess: "Funds added successfully.",
    failedToAddFunds: "Failed to add funds",
    failedToLoadWallet: "Failed to load wallet",
    transactions: "Transactions",
    date: "Date",
    amount: "Amount",

    // Documents
    documents: "Documents",
    documentManagementUI: "Document management UI will appear here.",

    // Help
    supportContentFAQs: "Support content and FAQs will be shown here.",

    // Client Profile
    myProfile: "My Profile",
    updatePersonalDetails: "Update your personal details and preferences.",
    totalRequests: "Total Requests",
    totalPaid: "Total Paid",
    pendingDocuments: "Pending Documents",

    // Client Sidebar
    myRequestsSidebar: "My Requests",
    messagesSidebar: "Messages",
    walletSidebar: "Wallet",
    documentsSidebar: "Documents",
    myProfileSidebar: "My Profile",
    helpSupportSidebar: "Help & Support",

    // Settings
    manageAccountPreferences: "Manage your account preferences and security settings.",
    security: "Security",
    billing: "Billing & Payments",
    dataPrivacy: "Data & Privacy",
    appearance: "Appearance",
    darkMode: "Dark Mode",
    applyDarkTheme: "Apply a dark theme to the layout and sidebar",
    on: "On",
    off: "Off",
    billingSettingsAvailable: "Billing settings and payment methods will be available here.",
    dataManagementAvailable: "Data management and privacy settings will be available here.",
    language: "Language",
    selectLanguage: "Select Language",
    arabic: "Arabic",
    english: "English",
    acceptProposalConfirm: "Are you sure you want to accept this proposal? This will create a booking and place funds in escrow.",
    proposalAccepted: "Proposal accepted! Booking created and funds placed in escrow.",
  },
};

export const LanguageProvider = ({ children }) => {
  // Load language from localStorage or default to "en"
  const [language, setLanguage] = useState(() => {
    try {
      const savedLang = localStorage.getItem("language");
      // Validate that the language exists in translations
      if (savedLang && translations[savedLang]) {
        return savedLang;
      }
      return "en";
    } catch (error) {
      console.error('Error loading language from localStorage:', error);
      return "en";
    }
  });

  const toggleLanguage = () => {
    setLanguage((prev) => {
      const newLang = prev === "ar" ? "en" : "ar";
      try {
        localStorage.setItem("language", newLang);
      } catch {}
      return newLang;
    });
  };

  const t = (key) => {
    try {
      if (!translations[language]) {
        console.warn(`Language "${language}" not found, falling back to "en"`);
        return translations.en?.[key] || key;
      }
      return translations[language][key] || key;
    } catch (error) {
      console.error('Error in translation function:', error);
      return key;
    }
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