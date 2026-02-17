import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
// Імпортуємо модулі
import { EffectFade, Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/effect-fade';

import './Hero.scss';
import { useLanguage } from '../../context/LanguageContext';

// Ручні імпорти видалили. Тепер тут чисто.

const Hero = () => {
  const { t } = useLanguage();
  
  // --- НОВА ЛОГІКА: АВТОМАТИЧНЕ ЗЧИТУВАННЯ ФОТО ---
  // 1. Знаходимо всі картинки в папці hero
  const heroImports = import.meta.glob('../../assets/images/hero/*.{png,jpg,jpeg,webp}', { eager: true });
  
  // 2. Перетворюємо їх на простий масив
  const photos = Object.values(heroImports).map((mod) => mod.default);

  // --- ДАЛІ ВСЕ ЯК БУЛО У ТВОЄМУ РОБОЧОМУ КОДІ ---
  const swiperRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(1);

  const handlePrev = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slidePrev();
    } else if (swiperRef.current) {
        // Страховка для різних версій Swiper
        swiperRef.current.slidePrev();
    }
  };

  const handleNext = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slideNext();
    } else if (swiperRef.current) {
        swiperRef.current.slideNext();
    }
  };

  // Якщо фоток немає, повертаємо null, щоб не ламати верстку
  if (photos.length === 0) {
    return null; 
  }

  return (
    <section id="home" className="hero-split">
      
      {/* ЛІВА ЧАСТИНА (Текст) */}
      <div className="hero-split__left">
        <div className="hero-split__content">
          <p className="subtitle">{t.hero.subtitle}</p>
          <h1>{t.hero.title}</h1>
        </div>
        
        <div className="hero-split__bottom">
          <p className="location">{t.hero.location}</p>
        </div>
      </div>

      {/* ПРАВА ЧАСТИНА (Слайдер) */}
      <div className="hero-split__right">
        
        {/* КАРТКА СЛАЙДЕРА */}
        <div className="carousel-card">
          <Swiper
            modules={[EffectFade, Autoplay]}
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            onSlideChange={(swiper) => setCurrentSlide(swiper.realIndex + 1)}
            effect="fade"
            fadeEffect={{ crossFade: true }}
            speed={1200}
            autoplay={{
              delay: 3000, // Збільшив до 3с, щоб не миготіло надто швидко
              disableOnInteraction: false,
            }}
            loop={true}
            allowTouchMove={false}
            className="hero-swiper"
          >
            {photos.map((img, index) => (
              <SwiperSlide key={index}>
                <img src={img} alt={`Slide ${index + 1}`} loading="eager" />
              </SwiperSlide>
            ))}
          </Swiper>

          {/* КОНТРОЛИ */}
          <div className="slider-controls-overlay">
            
            {/* Кнопка НАЗАД */}
            <button className="control-btn" onClick={handlePrev}>
               <svg width="40" height="14" viewBox="0 0 40 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7 13L1 7L7 1M1 7H39" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>

            {/* ЛІЧИЛЬНИК */}
            <div className="slide-counter">
              <span className="current">{currentSlide}</span>
              <span className="divider">/</span>
              <span className="total">{photos.length}</span>
            </div>

            {/* Кнопка ВПЕРЕД */}
            <button className="control-btn" onClick={handleNext}>
               <svg width="40" height="14" viewBox="0 0 40 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M33 1L39 7L33 13M39 7H1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            
          </div>
        </div>

      </div>
    </section>
  );
};

export default Hero;