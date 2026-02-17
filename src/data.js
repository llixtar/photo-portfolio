// src/data.js

// Імпортуємо картинки (перевір, чи ти їх додав і чи назви збігаються!)
import img1 from './assets/images/portfolio/1.jpg';
import img2 from './assets/images/portfolio/2.jpg';
import img3 from './assets/images/portfolio/3.jpg';
import img4 from './assets/images/portfolio/4.jpg';
// Якщо додав більше - імпортуй і їх

export const portfolioData = [
  {
    id: 1,
    img: img1,
    category: 'portrait', // Категорія для фільтру
  },
  {
    id: 2,
    img: img2,
    category: 'family',
  },
  {
    id: 3,
    img: img3,
    category: 'love-story',
  },
  {
    id: 4,
    img: img4,
    category: 'portrait',
  },
  // Можеш дублювати об'єкти, щоб було більше картинок для тесту
];

// ... (тут твій export const portfolioData ...)

export const servicesData = [
  {
    id: 1,
    icon: "📸", // Можна використати емодзі або потім підключимо бібліотеку іконок
    key: "individual", // Ключ для перекладу
  },
  {
    id: 2,
    icon: "❤️",
    key: "lovestory",
  },
  {
    id: 3,
    icon: "👨‍👩‍👧‍👦",
    key: "family",
  },
  {
    id: 4,
    icon: "💍", // Додаткова послуга (наприклад, розписка або весілля)
    key: "event", 
  }
];