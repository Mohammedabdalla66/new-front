import React, { useEffect } from 'react';
import { Provider, useSelector } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { store } from './store';
import { selectTheme, selectLanguage } from './features/theme/themeSlice';
import Dashboard from './pages/Dashboard';
import Firms from './pages/Firms.jsx';
import Clients from './pages/Clients.jsx';
import Transactions from './pages/Transactions.jsx';
import Reports from './pages/Reports.jsx';
import './i18n';

// Theme and Language Initializer Component
const AppInitializer = ({ children }) => {
  const theme = useSelector(selectTheme);
  const language = useSelector(selectLanguage);

  useEffect(() => {
    // Apply theme
    document.documentElement.classList.toggle('dark', theme === 'dark');
    
    // Apply language and direction
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
    
    // Apply font family based on language
    if (language === 'ar') {
      document.body.style.fontFamily = 'Cairo, sans-serif';
    } else {
      document.body.style.fontFamily = 'Inter, sans-serif';
    }
  }, [theme, language]);

  return children;
};

function AppAdmin() {
  return (
    <Provider store={store}>
      <Router>
        <AppInitializer>
          <div className="font-inter">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/firms" element={<Firms />} />
              <Route path="/clients" element={<Clients />} />
              <Route path="/transactions" element={<Transactions />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="/settings" element={<AdminDashboard />} />
                            <Route path="/settings" element={<Settings />} />

            </Routes>
          </div>
        </AppInitializer>
      </Router>
    </Provider>
  );
}
export default AppAdmin;