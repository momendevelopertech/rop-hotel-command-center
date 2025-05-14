
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Apply RTL styles if needed from localStorage
const storedLanguage = localStorage.getItem('language');
if (storedLanguage === 'ar') {
  document.documentElement.dir = 'rtl';
  document.documentElement.lang = 'ar';
  document.body.classList.add('rtl');
} else {
  document.documentElement.dir = 'ltr';
  document.documentElement.lang = 'en';
  document.body.classList.remove('rtl');
}

createRoot(document.getElementById("root")!).render(<App />);
