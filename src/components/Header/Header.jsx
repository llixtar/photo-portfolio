import React, { useState, useEffect } from 'react';
import './Header.scss';
import { useLanguage } from '../../context/LanguageContext';

const Header = () => {
  // ВИПРАВЛЕНО: беремо changeLanguage
  const { language, changeLanguage, t } = useLanguage();
  
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Відслідковуємо скрол
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Блокуємо прокрутку боді
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [menuOpen]);

  const handleScrollTo = (e, id) => {
    e.preventDefault();
    setMenuOpen(false);
    
    const element = document.querySelector(id);
    if (element) {
      const headerOffset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
  
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  const navLinks = [
    { name: t.header?.home || "Головна", href: '#home' },
    { name: t.about?.title || "Про мене", href: '#about' },
    { name: t.portfolio?.title || "Портфоліо", href: '#portfolio' },
    { name: t.services?.title || "Послуги", href: '#services' },
    { name: t.contact?.title || "Контакти", href: '#contact' },
  ];

  return (
    <header className={`header ${scrolled ? 'scrolled' : ''}`}>
      
      {/* БУРГЕР-КНОПКА (Як було раніше - зовні контейнера) */}
      <div 
        className={`burger-btn ${menuOpen ? 'active' : ''}`} 
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>

      {/* ПЕРЕМИКАЧ МОВИ (Як було раніше - зовні контейнера) */}
      <div className="header__lang">
        <span 
          className={`lang-item ${language === 'ua' ? 'active' : ''}`}
          onClick={() => changeLanguage('ua')} // <--- ТУТ ВИПРАВЛЕНО
        >
          UA
        </span>
        <span className="divider">|</span>
        <span 
          className={`lang-item ${language === 'pl' ? 'active' : ''}`}
          onClick={() => changeLanguage('pl')} // <--- ТУТ ВИПРАВЛЕНО
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