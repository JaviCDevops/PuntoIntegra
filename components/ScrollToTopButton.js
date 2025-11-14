// components/ScrollToTopButton.js
'use client';

import { useState, useEffect } from 'react';

// --- Icono SVG (reemplazo para 'react-icons/fa') ---
const IconArrowUp = ({ className = '' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 448 512"
    className={`inline-block ${className}`}
    fill="currentColor"
    width="1em"
    height="1em"
  >
    <path d="M246.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L224 109.3V480c0 17.7 14.3 32 32 32s32-14.3 32-32V109.3l137.4 137.4c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z" />
  </svg>
);
// --- Fin de Icono SVG ---

export default function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  // Muestra el botón cuando el usuario baja 400px
  const toggleVisibility = () => {
    if (window.scrollY > 400) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Vuelve al inicio de la página suavemente
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  return (
    <button
      type="button"
      onClick={scrollToTop}
      className={`
        fixed bottom-6 right-20 bg-gray-700 hover:bg-gray-900 text-white p-3 rounded-full shadow-lg z-40
        transition-opacity duration-300
        ${isVisible ? 'opacity-100' : 'opacity-0'}
      `}
      aria-label="Volver arriba"
    >
      {/* Usamos el componente SVG en lugar de FaArrowUp */}
      <IconArrowUp className="w-5 h-5" />
    </button>
  );
}