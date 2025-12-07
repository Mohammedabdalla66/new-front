import { StrictMode, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import App from './App.jsx';
import './index.css';
import 'react-toastify/dist/ReactToastify.css';
import 'react-phone-input-2/lib/style.css';
import 'react-international-phone/style.css';
import { LanguageProvider } from './contexts/LanguageContext.jsx';
import { store } from './store/index.js';
import './i18n/index.js';
import { AuthProvider } from '@/context/AuthContext.jsx';
import { SocketProvider } from '@/context/SocketProvider.jsx';

// Dark Mode Initializer Component
const DarkModeInitializer = ({ children }) => {
  useEffect(() => {
    // Initialize dark mode from localStorage on app load
    try {
      const darkMode = localStorage.getItem('darkMode') === 'true';
      if (darkMode) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    } catch (error) {
      console.error('Error initializing dark mode:', error);
    }

    // Listen for dark mode toggle events from Settings component
    const handleDarkModeToggle = (e) => {
      const enabled = e.detail?.enabled;
      if (typeof enabled === 'boolean') {
        if (enabled) {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      }
    };

    window.addEventListener('toggle-dark-mode', handleDarkModeToggle);
    return () => window.removeEventListener('toggle-dark-mode', handleDarkModeToggle);
  }, []);

  return children;
};

const rootElement = document.getElementById('root');
if (rootElement) {
createRoot(rootElement).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <AuthProvider>
          <SocketProvider>
            <LanguageProvider>
              <DarkModeInitializer>
                <App />
                <ToastContainer 
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                />
              </DarkModeInitializer>
            </LanguageProvider>
          </SocketProvider>
        </AuthProvider>
      </BrowserRouter>
    </Provider>
  </StrictMode>
  );
}



