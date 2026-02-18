import React, { useState, useEffect } from 'react';
import './Portfolio.scss';
import { useLanguage } from '../../context/LanguageContext';

const Portfolio = () => {
  const { t } = useLanguage();
  
  const [activeCategory, setActiveCategory] = useState(null);
  const [lightboxIndex, setLightboxIndex] = useState(null);

  // --- СТЕЙТ ДЛЯ СВАЙПІВ ---
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const minSwipeDistance = 50; // Мінімальна довжина свайпу (в пікселях), щоб він спрацював

  // --- ІМПОРТ ФОТО ---
  const familyImports = import.meta.glob('../../assets/images/portfolio/family/*.{png,jpg,jpeg,webp}', { eager: true });
  const individualImports = import.meta.glob('../../assets/images/portfolio/individual/*.{png,jpg,jpeg,webp}', { eager: true });
  const lovestoryImports = import.meta.glob('../../assets/images/portfolio/lovestory/*.{png,jpg,jpeg,webp}', { eager: true });
  const weddingImports = import.meta.glob('../../assets/images/portfolio/wedding/*.{png,jpg,jpeg,webp}', { eager: true });

  const getImages = (imports) => Object.values(imports).map((mod) => mod.default);

  const familyPhotos = getImages(familyImports);
  const individualPhotos = getImages(individualImports);
  const lovestoryPhotos = getImages(lovestoryImports);
  const weddingPhotos = getImages(weddingImports);

  useEffect(() => {
    if (activeCategory || lightboxIndex !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [activeCategory, lightboxIndex]);

  const categoriesData = [
    { id: 'family', title: t.portfolio.categories.family, cover: familyPhotos[0] || null, photos: familyPhotos },
    { id: 'individual', title: t.portfolio.categories.individual, cover: individualPhotos[0] || null, photos: individualPhotos },
    { id: 'lovestory', title: t.portfolio.categories.lovestory, cover: lovestoryPhotos[0] || null, photos: lovestoryPhotos },
    { id: 'wedding', title: t.portfolio.categories.wedding, cover: weddingPhotos[0] || null, photos: weddingPhotos }
  ];

  const currentCategoryData = categoriesData.find(c => c.id === activeCategory);
  const currentPhotos = currentCategoryData ? currentCategoryData.photos : [];

  // --- ЛОГІКА ПЕРЕМИКАННЯ ФОТО ---
  const nextPhoto = (e) => {
    e?.stopPropagation();
    setLightboxIndex((prevIndex) => 
      prevIndex === currentPhotos.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevPhoto = (e) => {
    e?.stopPropagation();
    setLightboxIndex((prevIndex) => 
      prevIndex === 0 ? currentPhotos.length - 1 : prevIndex - 1
    );
  };

  // --- ЛОГІКА СВАЙПІВ (TOUCH EVENTS) ---
  const onTouchStart = (e) => {
    setTouchEnd(null); // Скидаємо кінець свайпу
    setTouchStart({ x: e.targetTouches[0].clientX, y: e.targetTouches[0].clientY });
  };

  const onTouchMove = (e) => {
    setTouchEnd({ x: e.targetTouches[0].clientX, y: e.targetTouches[0].clientY });
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distanceX = touchStart.x - touchEnd.x;
    const distanceY = touchStart.y - touchEnd.y;
    const isHorizontalSwipe = Math.abs(distanceX) > Math.abs(distanceY);

    // 1. ГОРИЗОНТАЛЬНИЙ СВАЙП (Вліво/Вправо - Гортання)
    if (isHorizontalSwipe) {
      if (distanceX > minSwipeDistance) {
        nextPhoto(); // Свайп вліво -> Наступне фото
      } else if (distanceX < -minSwipeDistance) {
        prevPhoto(); // Свайп вправо -> Попереднє фото
      }
    } 
    // 2. ВЕРТИКАЛЬНИЙ СВАЙП (Вгору/Вниз - Закриття)
    else {
      if (Math.abs(distanceY) > minSwipeDistance) {
        setLightboxIndex(null); // Закриваємо
      }
    }
  };

  // Керування клавіатурою
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (lightboxIndex === null) return;
      if (e.key === 'ArrowRight') nextPhoto();
      if (e.key === 'ArrowLeft') prevPhoto();
      if (e.key === 'Escape') setLightboxIndex(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex]);

  return (
    <section id="portfolio" className="portfolio-section">
      <div className="container">
        <h2 className="section-title">{t.portfolio.title}</h2>

        <div className="categories-grid">
          {categoriesData.map((cat) => (
            cat.photos.length > 0 && (
              <div 
                key={cat.id} 
                className="category-card"
                onClick={() => setActiveCategory(cat.id)}
              >
                <div className="card-image">
                  <img src={cat.cover} alt={cat.title} />
                  <div className="overlay">
                    <span>Переглянути</span>
                  </div>
                </div>
                <h3 className="card-title">{cat.title}</h3>
              </div>
            )
          ))}
        </div>
      </div>

      {/* --- МОДАЛЬНЕ ВІКНО КАТЕГОРІЇ --- */}
      {activeCategory && (
        <div className="category-modal">
          <div className="modal-header">
            <h3>{currentCategoryData.title}</h3>
            <button className="close-btn" onClick={() => setActiveCategory(null)}>✕</button>
          </div>
          
          <div className="modal-content">
            <div className="photos-grid">
              {currentCategoryData.photos.map((photo, index) => (
                <div 
                  key={index} 
                  className="photo-item"
                  onClick={() => setLightboxIndex(index)}
                >
                  <img src={photo} alt={`Portfolio ${index}`} loading="lazy" />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* --- LIGHTBOX (ОНОВЛЕНИЙ З ЖЕСТАМИ) --- */}
      {lightboxIndex !== null && (
        <div 
          className="lightbox" 
          onClick={() => setLightboxIndex(null)}
          // ДОДАЄМО ОБРОБНИКИ ДОТИКІВ
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          <button className="close-lightbox">✕</button>
          
          {/* Кнопки лишаємо для комп'ютера */}
          <button className="nav-btn prev" onClick={prevPhoto}>❮</button>
          
          <img 
            src={currentPhotos[lightboxIndex]} 
            alt="Full screen" 
            onClick={(e) => e.stopPropagation()} 
          />

          <button className="nav-btn next" onClick={nextPhoto}>❯</button>

          <div className="lightbox-counter">
            {lightboxIndex + 1} / {currentPhotos.length}
          </div>
        </div>
      )}
    </section>
  );
};

export default Portfolio;