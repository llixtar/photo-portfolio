import React from 'react';
import './Contact.scss';
import { useLanguage } from '../../context/LanguageContext';

const Contact = () => {
  const { t } = useLanguage();

  return (
    <section id="contact" className="contact-section">
      <div className="container">
        
        {/* ЗАГОЛОВОК */}
        <h2 className="section-title">{t.contact.title}</h2>

        {/* ТЕКСТ */}
        <p className="contact-text">
          {t.contact.text}
        </p>

        {/* 1. СОЦМЕРЕЖІ (Тепер тут) */}
        <div className="social-links">
          
          {/* INSTAGRAM */}
          <a href="https://www.instagram.com/deviant.ph" target="_blank" rel="noopener noreferrer" className="social-item">
            <div className="icon-wrapper">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </div>
            <span className="social-name">{t.contact.instagram}</span>
          </a>

          {/* TELEGRAM */}
          <a href="https://t.me/deeviaant" target="_blank" rel="noopener noreferrer" className="social-item">
            <div className="icon-wrapper">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
              </svg>
            </div>
            <span className="social-name">{t.contact.telegram}</span>
          </a>

          {/* FACEBOOK */}
          <a href="https://www.facebook.com/share/1KG3QjyS1z/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" className="social-item">
            <div className="icon-wrapper">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
              </svg>
            </div>
            <span className="social-name">{t.contact.facebook}</span>
          </a>

          {/* EMAIL */}
          <a href="mailto:deeviaant@gmail.com" className="social-item">
            <div className="icon-wrapper">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
            </div>
            <span className="social-name">{t.contact.email}</span>
          </a>

        </div>

        {/* 2. ЛОКАЦІЯ (Тепер знизу) */}
        <div className="location-block">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
            <circle cx="12" cy="10" r="3"></circle>
          </svg>
          <span className="location-text">{t.contact.location}</span>
        </div>

      </div>
    </section>
  );
};

export default Contact;