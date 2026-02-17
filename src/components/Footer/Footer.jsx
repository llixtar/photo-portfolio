import React from 'react';
import './Footer.scss';
import { useLanguage } from '../../context/LanguageContext';

const Footer = () => {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear(); // Автоматичний рік

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__content">
          
          {/* 1. Логотип */}
          {/* <div className="footer__logo">
            deviant.ph
          </div> */}

          {/* 2. Навігація (повторюємо пункти з хедера) */}
          {/* <ul className="footer__nav">
            <li><a href="#portfolio">{t.header.portfolio}</a></li>
            <li><a href="#contacts">{t.header.contacts}</a></li>
          </ul> */}

          {/* 3. Копірайт */}
          <div className="footer__copyright">
            <p>&copy; {currentYear} deviant-ph. {t.footer.rights}</p>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;