// components/FadeIn.js
'use client';

import { useState, useEffect, useRef } from 'react';

/**
 * Un componente contenedor que aplica una animación de "fade-in"
 * cuando entra en el viewport (área visible de la pantalla).
 */
export default function FadeIn({ children, delay = 0 }) {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Una vez que es visible, activa la animación
            setIsVisible(true);
           
          }
        });
      },
      { threshold: 0.1 } 
    );

    const { current } = domRef;
    if (current) {
      observer.observe(current);
    }

    return () => {
      if (current) {
        observer.unobserve(current);
      }
    };
  }, []);

  return (
    <div
      ref={domRef}
      className={`
        transition-all duration-1000 ease-out
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
      `}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}