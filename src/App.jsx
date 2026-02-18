import React, { useEffect } from 'react';
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
    // 1. Вимикаємо стандартне відновлення скролу
    if ('scrollRestoration' in history) {
      window.history.scrollRestoration = 'manual';
    }

    // 2. Якщо в адресі є #hash (наприклад, #services), прибираємо його тихо
    if (window.location.hash) {
      window.history.replaceState(null, '', window.location.pathname);
    }
    
    // 3. Скролимо нагору з мікро-затримкою (це перебиває поведінку браузера)
    const timer = setTimeout(() => {
      window.scrollTo(0, 0);
    }, 10); // 10 мілісекунд достатньо

    return () => clearTimeout(timer); // Чистимо таймер при виході
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