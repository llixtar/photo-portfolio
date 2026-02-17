import React, { createContext, useState, useContext } from 'react';
import { translations } from '../utils/translations';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  // За замовчуванням українська
  const [language, setLanguage] = useState('ua');

  const changeLanguage = (lang) => {
    console.log(`Змінюємо мову на: ${lang}`); // <--- Перевірка в консолі
    setLanguage(lang);
  };

  // Отримуємо правильний об'єкт перекладів
  const t = translations[language];

  return (
    <LanguageContext.Provider value={{ language, changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);