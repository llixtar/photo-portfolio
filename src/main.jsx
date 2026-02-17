// src/main.jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './styles/main.scss' // переконайся що шлях вірний
import { LanguageProvider } from './context/LanguageContext'; // <--- Імпортуємо

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* Огортаємо App, щоб мова була доступна всюди */}
    <LanguageProvider>
      <App />
    </LanguageProvider>
  </React.StrictMode>,
)