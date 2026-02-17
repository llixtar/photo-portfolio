import React, { useState, useEffect } from 'react';
import './Header.scss';
import { useLanguage } from '../../context/LanguageContext';

const Header = () => {
  const { language, setLanguage, t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Відслідковуємо скрол для зміни стилю хедера
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Блокуємо прокрутку сторінки, коли відкрите мобільне меню
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [menuOpen]);

  // Плавний скрол до якоря
  const handleScrollTo = (e, id) => {
    e.preventDefault();
    setMenuOpen(false); // Закриваємо меню
    
    const element = document.querySelector(id);
    if (element) {
      // Враховуємо висоту хедера при скролі (щоб заголовок не ховався)
      const headerOffset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
  
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  // Список посилань
  const navLinks = [
    { name: t.header?.home || "Головна", href: '#home' },
    { name: t.about?.title || "Про мене", href: '#about' },
    { name: t.portfolio?.title || "Портфоліо", href: '#portfolio' },
    { name: t.services?.title || "Послуги", href: '#services' },
    { name: t.contact?.title || "Контакти", href: '#contact' }, // Перевір, щоб у Contact.jsx був id="contact"
  ];

  return (
    <header className={`header ${scrolled ? 'scrolled' : ''}`}>
      
      {/* БУРГЕР-КНОПКА (Мобільна) */}
      <div 
        className={`burger-btn ${menuOpen ? 'active' : ''}`} 
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>

      {/* ПЕРЕМИКАЧ МОВИ */}
      <div className="header__lang">
        <span 
          className={`lang-item ${language === 'ua' ? 'active' : ''}`}
          onClick={() => setLanguage('ua')}
        >
          UA
        </span>
        <span className="divider">|</span>
        <span 
          className={`lang-item ${language === 'pl' ? 'active' : ''}`}
          onClick={() => setLanguage('pl')}
        >
          PL
        </span>
      </div>

      <div className="container">
        
        {/* ЛОГОТИП */}
        <div className="header__top">
          <a href="#home" className="logo" onClick={(e) => handleScrollTo(e, '#home')}>
            {t.header?.logo || "DEVIANT"} 
          </a>
        </div>

        {/* НАВІГАЦІЯ */}
        <nav className={`header__nav ${menuOpen ? 'mobile-active' : ''}`}>
          <ul>
            {navLinks.map((link) => (
              <li 
                key={link.href}
                // Додаємо клас 'mobile-only' тільки для посилання 'Головна' (#home)
                className={link.href === '#home' ? 'mobile-only' : ''}
              >
                <a 
                  href={link.href} 
                  onClick={(e) => handleScrollTo(e, link.href)}
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;