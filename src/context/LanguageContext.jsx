import React, { createContext, useState, useContext, useEffect } from 'react';
import { translations } from '../utils/translations'; // Перевір шлях, якщо він інший

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  // 1. При запуску перевіряємо, чи є збережена мова. Якщо ні — ставимо 'ua'
  const [language, setLanguage] = useState(() => {
    const savedLanguage = localStorage.getItem('siteLanguage');
    return savedLanguage || 'ua';
  });

  const changeLanguage = (lang) => {
    console.log(`Змінюємо мову на: ${lang}`);
    setLanguage(lang);
    // 2. При зміні мови — зберігаємо її в пам'ять
    localStorage.setItem('siteLanguage', lang);
  };

  const t = translations[language];

  return (
    <LanguageContext.Provider value={{ language, changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);