import React from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Building2, 
  Users, 
  CreditCard, 
  FileText, 
  Settings 
} from 'lucide-react';
import { selectSidebarCollapsed } from '../../features/theme/themeSlice';

const Sidebar = () => {
  const { t } = useTranslation();
  const collapsed = useSelector(selectSidebarCollapsed);
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { icon: LayoutDashboard, label: t('dashboard'), path: '/', active: location.pathname === '/' },
    { icon: Building2, label: t('firms'), path: '/firms', active: location.pathname === '/firms' },
    { icon: Users, label: t('clients'), path: '/clients', active: location.pathname === '/clients' },
    { icon: CreditCard, label: t('transactions'), path: '/transactions', active: location.pathname === '/transactions' },
    { icon: FileText, label: t('reports'), path: '/reports', active: location.pathname === '/reports' },
    { icon: Settings, label: t('settings'), path: '/settings', active: location.pathname === '/settings' },
  ];

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <aside className={`${
      collapsed ? 'w-16' : 'w-64'
    } bg-white dark:bg-neutral-800 border-r border-neutral-200 dark:border-neutral-700 transition-all duration-300 flex flex-col`}>
      <div className="p-4">
        <div className="flex items-center space-x-3 rtl:space-x-reverse">
          <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center">
            <Building2 className="w-5 h-5 text-white" />
          </div>
          {!collapsed && (
            <span className="font-bold text-lg text-neutral-900 dark:text-white">
              AccountHub
            </span>
          )}
        </div>
      </div>

      <nav className="flex-1 px-4 pb-4">
        <ul className="space-y-2">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <li key={index}>
                <button
                  onClick={() => handleNavigation(item.path)}
                  className={`${
                    item.active
                      ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 border-r-2 border-primary-500'
                      : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-700'
                  } flex items-center space-x-3 rtl:space-x-reverse w-full px-3 py-2 rounded-lg transition-colors text-left rtl:text-right`}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  {!collapsed && (
                    <span className="font-medium">{item.label}</span>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;