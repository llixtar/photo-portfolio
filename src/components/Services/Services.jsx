import React from 'react';
import './Services.scss';
import { useLanguage } from '../../context/LanguageContext';

const Services = () => {
  const { t } = useLanguage();

  const servicesList = [
    { id: 1, data: t.services.items.family },
    { id: 2, data: t.services.items.individual },
    { id: 3, data: t.services.items.lovestory },
    { id: 4, data: t.services.items.events },
  ];

  return (
    <section id="services" className="services-section">
      <div className="container">
        {/* Заголовок (Стиль як у Портфоліо) */}
        <h2 className="section-title">{t.services.title}</h2>

        <div className="services-grid">
          {servicesList.map((service) => (
            <div key={service.id} className="service-card">
              <div className="card-content">
                <h3 className="service-title">{service.data.title}</h3>
                {/* Декоративна лінія */}
                <div className="divider"></div>
                <p className="service-desc">{service.data.desc}</p>
                {/* Можна додати кнопку "Замовити" або ціну, якщо захочеш */}
                {/* <span className="price">від 3000 грн</span> */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;