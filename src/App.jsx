import React, { useEffect } from 'react'; // <--- БУЛО useEffct, СТАЛО useEffect
import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';
import About from './components/About/About';
import Portfolio from './components/Portfolio/Portfolio';
import Services from './components/Services/Services';
import Contact from './components/Contact/Contact';
import Footer from './components/Footer/Footer';
import { LanguageProvider } from './context/LanguageContext';
import './styles/main.scss';

function App() {

  useEffect(() => {
    // 1. Вимикаємо "пам'ять" браузера про скрол
    if ('scrollRestoration' in history) {
      window.history.scrollRestoration = 'manual';
    }
    
    // 2. Примусово кидаємо нагору
    window.scrollTo(0, 0);
  }, []);

  return (
    <LanguageProvider>
      <div className="app">
        <Header />
        <main>
          <Hero />
          <About />
          <Services />
          <Portfolio />
          <Contact />
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  );
}

export default App;