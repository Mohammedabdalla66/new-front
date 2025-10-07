import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      // Navigation
      dashboard: 'Dashboard',
      firms: 'Firms',
      clients: 'Clients',
      transactions: 'Transactions',
      reports: 'Reports',
      settings: 'Settings',
      
      // Dashboard
      dashboardTitle: 'Admin Dashboard',
      totalFirms: 'Total Firms',
      activeClients: 'Active Clients',
      totalRevenue: 'Total Revenue',
      pendingTransactions: 'Pending Transactions',
      
      // Charts
      revenueTrends: 'Revenue Trends',
      serviceDistribution: 'Service Distribution',
      last30Days: 'Last 30 Days',
      
      // Activity
      recentActivity: 'Recent Activity',
      recentActivityTable: 'Recent Activity',
      viewAll: 'View All',
      
      // Activity Table
      date: 'Date',
      userFirm: 'User/Firm',
      action: 'Action',
      amount: 'Amount',
      
      // Pending Approvals Section
      pendingApprovals: 'Pending Approvals',
      pendingFirms: 'Pending Firms',
      pendingPayments: 'Pending Payments',
      pendingTransactionsList: 'Pending Transactions',
      
      // Actions
      approve: 'Approve',
      reject: 'Reject',
      resolve: 'Resolve',
      
      // Common
      loading: 'Loading...',
      error: 'Error',
      export: 'Export CSV',
      search: 'Search...',
      filter: 'Filter',
      actions: 'Actions',
      status: 'Status',
      name: 'Name',
      email: 'Email',
      phone: 'Phone',
      
      // Time
      hoursAgo: 'hours ago',
      daysAgo: 'days ago',
      justNow: 'Just now',
      
      // Status
      pending: 'Pending',
      approved: 'Approved',
      rejected: 'Rejected',
      completed: 'Completed',
      processing: 'Processing',
      flagged: 'Flagged',
      
      // Theme
      lightMode: 'Light Mode',
      darkMode: 'Dark Mode',
      
      // Profile
      profile: 'Profile',
      logout: 'Logout',
    }
  },
  ar: {
    translation: {
      // Navigation
      dashboard: 'لوحة التحكم',
      firms: 'المكاتب',
      clients: 'العملاء',
      transactions: 'المعاملات',
      reports: 'التقارير',
      settings: 'الإعدادات',
      
      // Dashboard
      dashboardTitle: 'لوحة تحكم الإدارة',
      totalFirms: 'إجمالي المكاتب',
      activeClients: 'العملاء النشطون',
      totalRevenue: 'إجمالي الإيرادات',
      pendingTransactions: 'المعاملات المعلقة',
      
      // Charts
      revenueTrends: 'اتجاهات الإيرادات',
      serviceDistribution: 'توزيع الخدمات',
      last30Days: 'آخر 30 يوم',
      
      // Activity
      recentActivity: 'النشاط الأخير',
      recentActivityTable: 'جدول النشاط الأخير',
      viewAll: 'عرض الكل',
      
      // Activity Table
      date: 'التاريخ',
      userFirm: 'المستخدم/المكتب',
      action: 'الإجراء',
      amount: 'المبلغ',
      
      // Pending Approvals Section
      pendingApprovals: 'الموافقات المعلقة',
      pendingFirms: 'المكاتب المعلقة',
      pendingPayments: 'المدفوعات المعلقة',
      pendingTransactionsList: 'المعاملات المعلقة',
      
      // Actions
      approve: 'موافقة',
      reject: 'رفض',
      resolve: 'حل',
      
      // Common
      loading: 'جاري التحميل...',
      error: 'خطأ',
      export: 'تصدير CSV',
      search: 'بحث...',
      filter: 'تصفية',
      actions: 'الإجراءات',
      status: 'الحالة',
      name: 'الاسم',
      email: 'البريد الإلكتروني',
      phone: 'الهاتف',
      
      // Time
      hoursAgo: 'منذ ساعات',
      daysAgo: 'منذ أيام',
      justNow: 'الآن',
      
      // Status
      pending: 'معلق',
      approved: 'موافق عليه',
      rejected: 'مرفوض',
      completed: 'مكتمل',
      processing: 'قيد المعالجة',
      flagged: 'مبلغ عنه',
      
      // Theme
      lightMode: 'الوضع الفاتح',
      darkMode: 'الوضع الداكن',
      
      // Profile
      profile: 'الملف الشخصي',
      logout: 'تسجيل الخروج',
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: localStorage.getItem('language') || 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;