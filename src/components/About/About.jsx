import React from 'react';
import './About.scss';
import { useLanguage } from '../../context/LanguageContext';
// Обери тут найкраще ПОРТРЕТНЕ фото (де вона дивиться в камеру)
import aboutImg from '../../assets/images/about.webp'; // Або завантаж нове, наприклад about.jpg

const About = () => {
  const { t } = useLanguage();

  return (
    <section id="about" className="about-section">
      <div className="container">
        <div className="about-content">
          
          {/* ЛІВА ЧАСТИНА: ФОТО З РАМКОЮ */}
          <div className="about-image">
            <div className="image-wrapper">
              <img src={aboutImg} alt="Photographer" />
            </div>
            {/* Декоративна рамка позаду */}
            <div className="image-frame"></div>
          </div>

          {/* ПРАВА ЧАСТИНА: ТЕКСТ */}
          <div className="about-text">
            
            <h3 className="photographer-name">{t.about.name}</h3>
            
            <div className="text-body">
              <p>{t.about.text1}</p>
              <p>{t.about.text2}</p>
            </div>

            {/* Статистика (для солідності) */}
            {/* <div className="about-stats">
              <div className="stat-item">
                <span className="number">5+</span>
                <span className="label">{t.about.stats.years}</span>
              </div>
              <div className="stat-item">
                <span className="number">200+</span>
                <span className="label">{t.about.stats.shoots}</span>
              </div>
            </div> */}

           
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;