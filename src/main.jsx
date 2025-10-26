import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import App from './App.jsx';
import './index.css';
import 'react-toastify/dist/ReactToastify.css';
import 'react-phone-input-2/lib/style.css';
import { LanguageProvider } from './contexts/LanguageContext.jsx';
import { store } from './store/index.js';
import './i18n/index.js';

const rootElement = document.getElementById('root');
if (rootElement) {
createRoot(rootElement).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <LanguageProvider>
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
        </LanguageProvider>
      </BrowserRouter>
    </Provider>
  </StrictMode>
  );
}



