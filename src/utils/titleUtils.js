/**
 * Utility functions for converting service title values to display labels
 */

/**
 * Get the display label for a service title value
 * @param {string} titleValue - The title value (e.g., "option_1", "option_3")
 * @param {string} language - The language code ("ar" or "en")
 * @returns {string} The display label for the title
 */
export const getServiceTitleLabel = (titleValue, language = "en") => {
  if (!titleValue) return "Request";

  const TITLE_OPTIONS = [
    {
      value: "option_1",
      label: language === "ar" ? "الاستشارات المالية" : "Financial Consultancy",
    },
    {
      value: "option_2",
      label: language === "ar" ? "إستشارات الحوكمة وإدارة المخاطر " : "Governance Services",
    },
    {
      value: "option_3",
      label: language === "ar" ? "التقييم التجاري للشركات" : "Business Valuation services",
    },
    {
      value: "option_4",
      label: language === "ar" ? "التدقيق الخارجي وعمل الميزانيات السنوية " : "External Auditing",
    },
    {
      value: "option_5",
      label: language === "ar" ? "التدقيق الداخلي" : "Internal Auditing",
    },
    {
      value: "option_6",
      label: language === "ar" ? "مسك الدفاتر المحاسبية " : "Accounting bookkeeping",
    },
    {
      value: "option_7",
      label: language === "ar" ? " دراسات الجدوى الإقتصادية " : "Economic Feasibility Studies",
    },
    {
      value: "option_8",
      label: language === "ar" ? " تقارير الملاءة المالية" : "Financial Solvency Reports",
    },
    {
      value: "option_9",
      label: language === "ar" ? " تأسيس الشركات وادارة الأعمال " : "Business Setup",
    },
    {
      value: "option_10",
      label: language === "ar" ? "خدمات الضرائب وتقييم ضريبة القيمة المضافة" : "Tax and VAT Assessment Services",
    },
    {
      value: "option_11",
      label: language === "ar" ? "التصفيات وإغلاق السجل التجاري " : "Liquidation of the companies ",
    },
    {
      value: "option_12",
      label: language === "ar" ? "المحاسبة الجنائية والتحقيق في الاحتيال المالي وتقارير إساءة الأمانة" : "Forensic Accounting, Financial Fraud Investigations, and Reports of Abuse of Trust",
    },
    {
      value: "option_13",
      label: language === "ar" ? " تدقيق الامتثال والأداء " : "ISO Compliance Services ",
    },
    {
      value: "option_14",
      label: language === "ar" ? "خدمات أخرى" : "Other Services",
    },
  ];

  const option = TITLE_OPTIONS.find((opt) => opt.value === titleValue);
  return option ? option.label : titleValue; // Return original value if not found
};

/**
 * Get all title options for dropdowns/selects
 * @param {string} language - The language code ("ar" or "en")
 * @returns {Array} Array of title options with value and label
 */
export const getTitleOptions = (language = "en") => {
  return [
    {
      value: "",
      label: language === "ar" ? "اختر عنوان الخدمة" : "Select Service Title",
    },
    {
      value: "option_1",
      label: language === "ar" ? "الاستشارات المالية" : "Financial Consultancy",
    },
    {
      value: "option_2",
      label: language === "ar" ? "إستشارات الحوكمة وإدارة المخاطر " : "Governance Services",
    },
    {
      value: "option_3",
      label: language === "ar" ? "التقييم التجاري للشركات" : "Business Valuation services",
    },
    {
      value: "option_4",
      label: language === "ar" ? "التدقيق الخارجي وعمل الميزانيات السنوية " : "External Auditing",
    },
    {
      value: "option_5",
      label: language === "ar" ? "التدقيق الداخلي" : "Internal Auditing",
    },
    {
      value: "option_6",
      label: language === "ar" ? "مسك الدفاتر المحاسبية " : "Accounting bookkeeping",
    },
    {
      value: "option_7",
      label: language === "ar" ? " دراسات الجدوى الإقتصادية " : "Economic Feasibility Studies",
    },
    {
      value: "option_8",
      label: language === "ar" ? " تقارير الملاءة المالية" : "Financial Solvency Reports",
    },
    {
      value: "option_9",
      label: language === "ar" ? " تأسيس الشركات وادارة الأعمال " : "Business Setup",
    },
    {
      value: "option_10",
      label: language === "ar" ? "خدمات الضرائب وتقييم ضريبة القيمة المضافة" : "Tax and VAT Assessment Services",
    },
    {
      value: "option_11",
      label: language === "ar" ? "التصفيات وإغلاق السجل التجاري " : "Liquidation of the companies ",
    },
    {
      value: "option_12",
      label: language === "ar" ? "المحاسبة الجنائية والتحقيق في الاحتيال المالي وتقارير إساءة الأمانة" : "Forensic Accounting, Financial Fraud Investigations, and Reports of Abuse of Trust",
    },
    {
      value: "option_13",
      label: language === "ar" ? " تدقيق الامتثال والأداء " : "ISO Compliance Services ",
    },
    {
      value: "option_14",
      label: language === "ar" ? "خدمات أخرى" : "Other Services",
    },
  ];
};

