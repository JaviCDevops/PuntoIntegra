'use client';
import React, { useState, useEffect, useRef, useCallback } from 'react';

// --- COMPONENTE DE ANIMACIÓN "FADE-IN" ---
function FadeIn({ children }) {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(domRef.current);
        }
      });
    });

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
      className={`transition-all duration-1000 ease-in-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      {children}
    </div>
  );
}

// --- COMPONENTE BOTÓN VOLVER ARRIBA ---
const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => {
    if (window.scrollY > 300) setIsVisible(true);
    else setIsVisible(false);
  };
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  return (
    <button
      type="button"
      onClick={scrollToTop}
      className={`fixed bottom-20 right-6 bg-gray-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg z-50 transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
      aria-label="Volver arriba"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
        <path fillRule="evenodd" d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5z"/>
      </svg>
    </button>
  );
};

// --- ICONOS PARA SECCIÓN "QUÉ HACEMOS" ---
const IconEngineering = () => (
   <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707.707M12 21v-1m0-18c-4.418 0-8 3.582-8 8s3.582 8 8 8 8-3.582 8-8-3.582-8-8-8z" /></svg>
);
const IconIndustry = () => (
  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h6m-6 4h6m-6 4h6" />
  </svg>
);
const IconClipboard = () => (
  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
  </svg>
);
const IconPLC = () => (
  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

// --- COMPONENTE DE COMPARACIÓN DE IMÁGENES (ANTES/DESPUÉS) ---
const ImageSlider = ({ beforeSrc, afterSrc, labelBefore, labelAfter }) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const sliderRef = useRef(null);

  const handleDrag = useCallback((e) => {
    if (!isDragging || !sliderRef.current) return;
    const clientX = e.clientX || (e.touches && e.touches[0].clientX);
    if (!clientX) return;

    const rect = sliderRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const newPosition = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(newPosition);
  }, [isDragging]);

  const startDrag = useCallback(() => {
    setIsDragging(true);
  }, []);

  const endDrag = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleDrag);
      window.addEventListener('mouseup', endDrag);
      window.addEventListener('touchmove', handleDrag);
      window.addEventListener('touchend', endDrag);
    } else {
      window.removeEventListener('mousemove', handleDrag);
      window.removeEventListener('mouseup', endDrag);
      window.removeEventListener('touchmove', handleDrag);
      window.removeEventListener('touchend', endDrag);
    }
    return () => {
      window.removeEventListener('mousemove', handleDrag);
      window.removeEventListener('mouseup', endDrag);
      window.removeEventListener('touchmove', handleDrag);
      window.removeEventListener('touchend', endDrag);
    };
  }, [isDragging, handleDrag, endDrag]);

  return (
    <div className="relative w-full overflow-hidden shadow-2xl rounded-lg cursor-pointer my-8 select-none" ref={sliderRef}
      style={{ aspectRatio: '16/9', maxHeight: '500px' }}
      onMouseDown={startDrag}
      onTouchStart={startDrag}
    >
      {/* Imagen "Antes" (La que se recorta) */}
      <img src={beforeSrc} alt={labelBefore} className="absolute inset-0 w-full h-full object-cover pointer-events-none" />

      {/* Imagen "Después" (La que se superpone) */}
      <img src={afterSrc} alt={labelAfter} className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
      />

      {/* Etiqueta "Antes" */}
      <span className="absolute top-4 left-4 bg-black/60 text-white px-3 py-1 text-sm rounded-lg z-10">{labelBefore}</span>

      {/* Etiqueta "Después" */}
      <span className="absolute bottom-4 right-4 bg-black/60 text-white px-3 py-1 text-sm rounded-lg z-10">{labelAfter}</span>

      {/* Divisor/Handle (Barra de arrastre) */}
      <div className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize z-20"
        style={{ left: `calc(${sliderPosition}% - 2px)` }}
        onMouseDown={startDrag}
        onTouchStart={startDrag}
      >
        {/* Círculo de arrastre */}
        <div className="absolute top-1/2 left-1/2 w-10 h-10 -translate-x-1/2 -translate-y-1/2 bg-white rounded-full shadow-lg border-2 border-gray-700 flex items-center justify-center">
          <svg className="w-5 h-5 text-gray-700" fill="currentColor" viewBox="0 0 20 20"><path d="M7.293 14.707a1 1 0 010-1.414L10.586 9l-3.293-3.293a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" /></svg>
        </div>
      </div>
    </div>
  );
};


// --- COMPONENTE DE SECCIÓN DE COMPARACIÓN DE INGENIERÍA ---
const EngineeringComparison = ({ cacheBuster }) => {
  return (
    <section className="py-12 md:py-16 " id="ingenieria-comparacion">
      <div className="container mx-auto px-6">
        <div className="max-w-5xl mx-auto">
          <ImageSlider 
            beforeSrc={`/images/comparacion/plano-antiguo.webp${cacheBuster}`}
            afterSrc={`/images/comparacion/plano-nuevo.webp${cacheBuster}`}
          />
        </div>

      </div>
    </section>
  );
};

// --- COMPONENTE "TIMELINE" ---
const ValorTimeline = () => {
  const steps = [
    {
      title: "Diagnóstico",
      text: "Visita Técnica, Levantamiento, Diagramación Conceptual y Crosschecking",
      icon: "/images/icons/icon-diagnostico.webp",
      color: "text-cyan-400",
      isHighlighted: false
    },
    {
      title: "Análisis Crítico",
      text: "Estudio de Factibilidad, Costos, Presupuestos y Alcances",
      icon: "/images/icons/icon-analisis.webp",
      color: "text-cyan-500",
      isHighlighted: false
    },
    {
      title: "Estrategia de Negocios",
      text: "Validaciones, Aprobación de alcances, retroalimentación y planificación",
      icon: "/images/icons/icon-estrategia.webp",
      color: "text-blue-500",
      isHighlighted: false
    },
    {
      title: "Diseño de Solución",
      text: "Ingeniería, Desarrollo e Innovación Tecnológica",
      icon: "/images/icons/icon-diseno.webp",
      color: "text-blue-600",
      isHighlighted: false
    },
    {
      title: "Implementación",
      text: "Integración de plataformas, sistemas y pruebas de campo",
      icon: "/images/icons/icon-implementacion.webp",
      color: "text-gray-700",
      isHighlighted: false
    },
  ];

  return (
    // Contenedor principal del timeline
    <div className="flex flex-col md:flex-row justify-center items-center md:items-start md:space-x-4">
      {steps.map((step, index) => (
        <React.Fragment key={index}>
          {/* Contenedor de CADA paso */}
          <div className="flex flex-col items-center text-center max-w-[200px]">
            
            {/* Círculo del Icono */}
            <div 
              className={`
                w-32 h-32 rounded-full flex items-center justify-center mb-4
                transition-all duration-300
                ${step.isHighlighted ? 'bg-blue-600 shadow-lg' : 'bg-transparent'}
              `}
            >
              <img 
                src={step.icon} 
                alt={step.title} 
                className={`
                  w-16 h-16
                  ${step.isHighlighted ? 'filter brightness-0 invert' : ''}
                `}
                // Si el ícono es destacado (fondo azul), lo invertimos (lo hacemos blanco)
              />
            </div>
            
            {/* Texto */}
            <h3 className={`text-xl font-bold mt-2 ${step.color}`}>{step.title}</h3>
            <p className="text-gray-600 mt-2 text-sm">{step.text}</p>
          </div>
          
          {/* Flecha de conexión (solo en escritorio) */}
          {index < steps.length - 1 && (
            <div className="hidden md:flex items-center pt-16">
              <svg className={`w-12 h-12 ${steps[index + 1].color}`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
              </svg>
            </div>
          )}

          {/* Espaciador vertical (solo en móvil) */}
          {index < steps.length - 1 && (
            <div className="md:hidden h-12 w-px bg-gray-300 my-4"></div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

// --- NUEVO COMPONENTE: TARJETA DE SERVICIO CON CARRUSEL ---
function ServiceCard({ service, onSelect, cacheBuster }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const nextImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % service.images.length);
  };

  const prevImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + service.images.length) % service.images.length);
  };

  const currentSrc = service.images[currentImageIndex].includes('placehold.co')
      ? service.images[currentImageIndex]
      : service.images[currentImageIndex] + cacheBuster;

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 relative group">
      {/* Área de la imagen con carrusel */}
      <div className="relative w-full h-48 bg-gray-200">
         <img 
            src={currentSrc}
            alt={service.title} 
            className="w-full h-full object-cover transition-opacity duration-500"
            onError={(e) => { e.target.src = 'https://placehold.co/600x400/e0e7ff/312e81?text=Servicio'; }}
         />
         
         {/* Flechas de navegación (solo si hay más de 1 imagen) */}
         {service.images.length > 1 && (
           <>
             <button 
               onClick={prevImage}
               className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-10"
               aria-label="Imagen anterior"
             >
               <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
             </button>
             <button 
               onClick={nextImage}
               className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-10"
               aria-label="Siguiente imagen"
             >
               <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
             </button>
             
             {/* Indicadores (puntos) */}
             <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex space-x-1">
                {service.images.map((_, idx) => (
                  <div key={idx} className={`w-2 h-2 rounded-full ${idx === currentImageIndex ? 'bg-white' : 'bg-white/50'}`} />
                ))}
             </div>
           </>
         )}
      </div>

      <div className="p-6 flex flex-col flex-grow">
        <h4 className="font-semibold text-gray-900 text-lg mb-4 flex-grow">
          {service.title}
        </h4>
        <button 
          onClick={() => onSelect(service.id)}
          className="mt-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg text-center transition-colors duration-300"
        >
          Ver Más
        </button>
      </div>
    </div>
  );
}

// --- NUEVO: COMPONENTE MODAL PARA SERVICIOS ---
function ServiceModal({ service, onClose, cacheBuster }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!service) return null;

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % service.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + service.images.length) % service.images.length);
  };

  const currentSrc = service.images[currentImageIndex].includes('placehold.co')
    ? service.images[currentImageIndex]
    : service.images[currentImageIndex] + cacheBuster;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-2xl overflow-hidden max-w-3xl w-full relative"
        onClick={(e) => e.stopPropagation()}
      >

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Columna de Imagen en el Modal (con carrusel) */}
          <div className="w-full h-64 md:h-full min-h-[300px] relative bg-gray-100">
            <img
              src={currentSrc}
              alt={service.title}
              className="w-full h-full object-cover transition-opacity duration-300"
              onError={(e) => { e.target.src = 'https://placehold.co/600x400/e0e7ff/312e81?text=Servicio'; }}
            />
            
            {/* Flechas de navegación en el modal */}
            {service.images.length > 1 && (
               <>
                 <button 
                   onClick={prevImage}
                   className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/60 text-white p-2 rounded-full transition-colors"
                 >
                   <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                 </button>
                 <button 
                   onClick={nextImage}
                   className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/60 text-white p-2 rounded-full transition-colors"
                 >
                   <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                 </button>
                 {/* Indicadores */}
                 <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                    {service.images.map((_, idx) => (
                      <div key={idx} className={`w-2 h-2 rounded-full ${idx === currentImageIndex ? 'bg-white' : 'bg-white/50'}`} />
                    ))}
                 </div>
               </>
            )}
          </div>
          
          <div className="p-6 md:p-8 flex flex-col overflow-y-auto max-h-[80vh] md:max-h-full">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">{service.title}</h3>
            <div className="text-gray-700 leading-relaxed mb-6 flex-grow text-sm md:text-base">
              {service.description}
            </div>
            <button
              onClick={onClose}
              className="mt-auto bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded-lg text-center transition-colors duration-300 self-start"
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// --- ********** PÁGINA DE INICIO ********** ---
export default function HomePage() {

  const [cacheBuster, setCacheBuster] = useState('');
  useEffect(() => {
    setCacheBuster(`?t=${new Date().getTime()}`);
  }, []);

  const [currentIndex, setCurrentIndex] = useState(0);
  const heroImages = [
    '/images/hero-1.webp',
    '/images/hero-2.webp',
    '/images/hero-3.webp'
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === heroImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);
    return () => clearTimeout(timer);
  }, [currentIndex, heroImages.length]);

  const [selectedService, setSelectedService] = useState(null);

  const handleSelectService = (serviceId) => {
    setSelectedService(serviceId);
  };
  const handleCloseModal = () => {
    setSelectedService(null);
  };
  
  // --- DATOS PARA LA NUEVA SECCIÓN DE SERVICIOS ---
const services = [
    {
      title: "1. Ingeniería",
      description: (
        <ul className="list-disc list-inside space-y-1">
           <li><strong> Conceptual</strong> : Presentamos la idea o requerimiento, realizamos análisis y diagnóstico, y evaluamos la factibilidad técnica y económica.</li>
           <li><strong> Basica</strong> : Desarrollamos el diseño preliminar con equipos, infraestructura y disciplinas necesarias, estableciendo la ruta específica de diseño tras la aprobación.</li>
           <li><strong> Detalle</strong> : Generamos planos definitivos y documentación técnica por área y disciplina, optimizando la planificación, control y ejecución del proyecto.</li>
        </ul>
      ),
      icon: <IconEngineering />,
      imageSrc: "/images/QueHacemos/foto1.webp"
    },
    {
      title: "2. Outsourcing de Oficina Técnica",
      description: (
        <ul className="list-disc list-inside space-y-1 text-left">
          <li><strong>Gestión Integral (End to End):</strong> Coordinamos todas las etapas.</li>
          <li><strong>Planimetría 2D y 3D:</strong> Modelado estructural, eléctrico, neumático.</li>
          <li><strong>Gestión Documental:</strong> Organización y trazabilidad.</li>
          <li><strong>Asesoría en Terreno:</strong> Expertos disponibles en planta.</li>
          <li><strong>Levantamiento:</strong> Diagnóstico y registro de instalaciones.</li>
        </ul>
      ),
      icon: <IconClipboard />,
      imageSrc: "/images/QueHacemos/foto3.webp"
    },
    {
      title: "3. Automatización y Control",
      description: (
        <ul className="list-disc list-inside space-y-1 text-left">
          <li><strong>Levantamiento:</strong> Análisis detallado de operaciones.</li>
          <li><strong>Tableros de Control:</strong> Diseño y montaje eléctrico.</li>
          <li><strong>Programación de PLC:</strong> Lógicas de control adaptadas y escalables.</li>
        </ul>
      ),
      icon: <IconPLC />,
      imageSrc: "/images/QueHacemos/foto4.webp" 
    },
    {
      title: "4. Fabricación de Equipo Industrial",
      description: (
        <ul className="list-disc list-inside space-y-1 text-left">
          <li><strong>Diseño:</strong> Soluciones personalizadas.</li>
          <li><strong>Fabricación:</strong> Materiales de alta calidad.</li>
          <li><strong>Montaje:</strong> Instalación segura en planta.</li>
          <li><strong>Puesta en Marcha:</strong> Validación técnica y operativa.</li>
        </ul>
      ),
      icon: <IconIndustry />,
      imageSrc: "/images/QueHacemos/foto2.webp" 
    }
  ];

  // Lista de clientes
  const clients = [
    { name: "MIRS", filename: "mirs.webp" },
    { name: "Godelius", filename: "godelius.webp" },
    { name: "Talleres Lucas", filename: "talleres-lucas.webp" },
    { name: "RepMin", filename: "repmin.webp" },
    { name: "Austin Powder", filename: "austin-powder.webp" },
    { name: "Bigniss", filename: "bigniss.webp" },
    { name: "Chamonate", filename: "chamonate.webp" },
    { name: "Orica", filename: "orica.webp" }
  ];
  const clientList = [...clients, ...clients];

  // --- DATOS para la Sección 4 (Otros Servicios) ---
  const otherServicesData = [
    {
      id: 'levantamiento',
      title: 'Levantamiento técnico en terreno',
      // Antes: imageSrc (string), Ahora: images (array)
      images: [
        `/images/servicios/levantamiento/1.webp`,
        `/images/servicios/levantamiento/2.webp`,
        `/images/servicios/levantamiento/3.webp`,
        `/images/servicios/levantamiento/4.webp`, 
      ],
      description: (
        <div>
          <p className="mb-2">Realizamos el levantamiento de máquinas, equipos y plantas industriales en disciplinas <strong>neumática, hidráulica, eléctrica y estructural.</strong></p>
          <p>Con la información obtenida definimos el <strong>concepto del requerimiento</strong> y evaluamos las siguientes etapas de ingeniería, asegurando una entrega precisa y alineada con tus necesidades.</p>
        </div>
      )
    },
    {
      id: 'filtracion',
      title: 'Filtración de aceite Oleo hidráulico',
      images: [
        `/images/servicios/microfiltrado/1.webp`,
        `/images/servicios/microfiltrado/2.webp`,
        `/images/servicios/microfiltrado/3.webp`,
        `/images/servicios/microfiltrado/4.webp`,
        `/images/servicios/microfiltrado/5.webp`,
        `/images/servicios/microfiltrado/6.webp`,
        
      ],
      description: (
        <div>
          <p className="mb-3">Contamos con <strong>equipos de última tecnología y calibración certificada</strong>, capaces de realizar <strong>microfiltrado oleo‑hidráulico</strong> en equipos críticos.</p>
          <p className="font-semibold mb-2">Este servicio asegura:</p>
          <ul className="list-disc list-inside space-y-2">
            <li>Mayor confiabilidad en la operación de sistemas hidráulicos.</li>
            <li>Reducción de tiempos de parada por fallas o contaminación.</li>
            <li>Extensión de la vida útil de componentes y fluidos.</li>
          </ul>
        </div>
      )
    },
    {
      id: 'inspeccion',
      title: 'Inspección técnica de Equipos',
      images: [
        `/images/servicios/inspeccion/1.webp`,
        `/images/servicios/inspeccion/2.webp`,
        `/images/servicios/inspeccion/3.webp`,
      ],
      description: (
        <div>
          <p className="mb-2">Nuestro equipo profesional realiza <strong>evaluaciones técnicas completas</strong> en fabricación, operación y conexionado eléctrico e hidráulico.</p>
          <p>Con la información obtenida elaboramos <strong>informes precisos y personalizados</strong>, ajustados a los requerimientos de cada cliente.</p>
        </div>
      )
    },
    {
      id: 'montaje',
      title: 'Montaje industrial',
      images: [
        `/images/servicios/montaje/1.webp`,
        `/images/servicios/montaje/2.webp`,
        `/images/servicios/montaje/3.webp`,
        `/images/servicios/montaje/4.webp`,
        `/images/servicios/montaje/5.webp`,
        
      ],
      description: (
        <div>
          <p className="mb-3">Contamos con amplia experiencia en <strong>montaje de máquinas, plantas y robots industriales (KUKA)</strong>, abarcando aplicaciones de diversa complejidad.</p>
          <p className="font-semibold mb-2">Nuestro campo de acción incluye:</p>
          <ul className="list-disc list-inside space-y-2">
            <li>Montajes oleo‑hidráulicos</li>
            <li>Montajes eléctricos y de control</li>
            <li>Montajes neumáticos</li>
            <li>Integración completa de sistema</li>
          </ul>
        </div>
      )
    },
    {
      id: 'tableros',
      title: 'Integración de Tableros',
      images: [
        `/images/servicios/tableros/1.webp`,
        `/images/servicios/tableros/2.webp`,
        `/images/servicios/tableros/3.webp`,
        `/images/servicios/tableros/4.webp`,
        `/images/servicios/tableros/5.webp`,
        `/images/servicios/tableros/6.webp`,
        `/images/servicios/tableros/7.webp`,
        
      ],
      description: (
       <div>
          <p className="mb-3">Nuestro equipo cuenta con amplia experiencia en el <strong>diseño, fabricación e integración de tableros de baja tensión (BT), automatización y control</strong>.</p>
          <p className="mb-2">Trabajamos junto al cliente para definir el <strong>alcance específico de cada proyecto</strong>, ofreciendo </p>
          <p className="mb-2">Ofrecemos desde etapas parciales hasta la <strong>cadena completa</strong>, que incluye:</p>
          <ul className="list-disc list-inside space-y-2">
            <li>Diseño conceptual</li>
            <li>Fabricación y montaje</li>
            <li>Integración total de sistemas</li>
            <li>Entrega llave en mano</li>
          </ul>
        </div>
      )
    }
  ];


  return (
    <main className="bg-white">
      <ScrollToTopButton />

      {/* ===== 1. SECCIÓN HERO ===== */}
      <section 
        id="inicio" 
        className="text-white min-h-screen flex items-center relative overflow-hidden"
      >
        {/* Contenedor del carrusel de imágenes (z-0, al fondo) */}
        <div className="absolute inset-0 z-0">
          {heroImages.map((src, index) => {
            const imgSrc = cacheBuster ? src + cacheBuster : src;
            return (
              <img
                key={index}
                src={imgSrc}
                alt={`Fondo Hero ${index + 1}`}
                className={`
                  absolute inset-0 w-full h-full object-cover
                  transition-opacity duration-1000 ease-in-out
                  ${index === currentIndex ? 'opacity-100' : 'opacity-0'}
                `}
              />
            );
          })}
        </div>
        
        <div className="absolute inset-0 bg-gray-900/60 z-10"></div>

        <div className="container mx-auto px-6 text-center py-32 md:py-48 relative z-20">
          <FadeIn>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4" style={{ textShadow: '0 2px 5px rgba(0, 0, 0, 0.7)' }}>
              Somos tu <span className="text-blue-400 font-extrabold">Oficina&nbsp;Técnica</span> para desarrollo de <span className="font-extrabold text-gray-100">P</span>royectos de <span className="font-extrabold text-gray-100">I</span>ngeniería y <span className="font-extrabold text-gray-100">S</span>ervicios en
            </h1>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-blue-400 mb-8" style={{ textShadow: '0 2px 5px rgba(0, 0, 0, 0.7)' }}>
              Minería y Agroindustria.
            </h2>
            <a 
              href="#servicios" 
              
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 sm:px-10 rounded-lg text-sm sm:text-lg transition duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              EXPLORA NUESTRAS SOLUCIONES
            </a>
          </FadeIn>
        </div>
      </section>
      
      {/* ===== 2. SECCIÓN "¿QUÉ HACEMOS?" ===== */}
      <FadeIn>
        <section id="servicios" className="py-20 md:py-24 bg-gray-100">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-6">
              ¿Qué es lo que hacemos?
            </h2>
            <p className="text-center text-gray-600 text-lg mb-0 max-w-2xl mx-auto">
              Desde la idea hasta la puesta en marcha,
              <br className="hidden md:block" />
              cubrimos el ciclo completo de tus proyectos industriales.
            </p>

      <FadeIn>
        <EngineeringComparison cacheBuster={cacheBuster} />
      </FadeIn>

            {/* --- INICIO DEL LAYOUT --- */}
            <div className="space-y-16">
              {services.map((service, index) => {
                const isEven = index % 2 === 0;

                const serviceImgSrc = cacheBuster ? service.imageSrc + cacheBuster : service.imageSrc;

                return (
                  <div key={service.title} className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
                    
                    {/* Bloque de Imagen */}
                    <div className={`w-full h-80 md:h-[500px] ${isEven ? 'md:order-1' : 'md:order-2'}`}>
                      <img
                        src={serviceImgSrc}
                        alt={service.title}
                        className="rounded-lg shadow-2xl object-cover w-full h-full"
                        onError={(e) => { 
                          console.error(`ERROR AL CARGAR: ${serviceImgSrc}`);
                          e.target.src = 'https://placehold.co/600x400/e0e7ff/312e81?text=Error+al+cargar+imagen'; 
                          e.target.alt = 'Error al cargar imagen'; 
                        }}
                      />
                    </div>

                    <div className={`flex flex-col justify-center ${isEven ? 'md:order-2' : 'md:order-1'}`}>
                      <div className="flex items-center justify-center w-16 h-16 bg-red-600 rounded-lg mb-6">
                        <div className="text-white">
                          {service.icon}
                        </div>
                      </div>
                      <h3 className="text-3xl font-bold text-gray-900 mb-4">
                        {service.title}
                      </h3>
                      <div className="text-gray-700 text-lg leading-relaxed">
                        {service.description}
                      </div>
                    </div>

                  </div>
                );
              })}
            </div>
            
          </div>
        </section>
      </FadeIn>

      {/* ===== 3. SECCIÓN "CÓMO APORTAMOS VALOR" ===== */}
      <FadeIn>
        <section id="propuesta-valor" className="py-20 md:py-24 bg-white overflow-hidden">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-6">
              Cómo Te Aportamos Valor
            </h2>
            <p className="text-center text-gray-600 text-lg mb-16 max-w-3xl mx-auto">
              "Aterrizamos estrategias e ideas de negocios a través de una
              estructura de procesos basada en las mejores prácticas,
              incorporando valor en todo momento."
            </p>
            <ValorTimeline />

          </div>
        </section>
      </FadeIn>

      {/* ===== 4. SECCIÓN "SERVICIOS" ===== */}
      <FadeIn>
        <section id="otros-servicios" className="py-20 md:py-24 bg-gray-100">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-16">
              Nuestros Servicios
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {otherServicesData.map((service) => (
                <ServiceCard 
                  key={service.id} 
                  service={service} 
                  onSelect={handleSelectService} 
                  cacheBuster={cacheBuster}
                />
              ))}
            </div>
          </div>
        </section>
      </FadeIn>


      {/* ===== 5. SECCIÓN CLIENTES (CARRUSEL CON IMÁGENES) ===== */}
      <section id="clientes" className="py-20 md:py-24 bg-white">
        <div className="container mx-auto px-6">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-16">
              Clientes que Confían en Nosotros
            </h2>
          </FadeIn>
          
          <FadeIn>
            <div 
              className="w-full max-w-5xl mx-auto overflow-hidden relative"
              style={{
                maskImage: 'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)',
                WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)',
              }}
            >
              <div className="flex w-max animate-scroll">
                {clientList.map((client, index) => (
                  <div key={index} className="flex-shrink-0 w-64 mx-8 flex items-center justify-center h-40">
                      <div className="flex flex-col items-center justify-center">
                          <img 
                            src={cacheBuster ? `/images/logos/${client.filename}${cacheBuster}` : `/images/logos/${client.filename}`}
                            alt={`Logo de ${client.name}`}
                            className="h-28 w-auto object-contain mb-2"
                            onError={(e) => { 
                              e.target.src = 'https://placehold.co/200x80/f1f5f9/64748b?text=Error'; 
                            }}
                          />
                          <span className="text-base  text-gray-700 whitespace-nowrap font-agency">{client.name}</span>
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
      {/* ===== 6. SECCIÓN CONTACTO (SIMPLIFICADA A WHATSAPP) ===== */}
      <section id="contacto" className="py-20 md:py-24 bg-gray-900 text-white">
        <div className="container mx-auto px-6">
          <FadeIn>
            {/* --- CORREGIDO: Título y Párrafo --- */}
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">
              Solicita más Información
            </h2>
            <p className="text-xl text-center text-gray-300 mb-12 max-w-2xl mx-auto">
              ¿Listo para cotizar tu proyecto o hablar con un especialista?
              <br />
              Contáctanos directamente por WhatsApp.
            </p>
          </FadeIn>

          <FadeIn>
            {/* Contenedor del botón */}
            <div className="w-full max-w-2xl mx-auto text-center">
              <a 
                // RECUERDA cambiar el '56912345678'
                href="https://wa.me/56962016401?text=Hola%2C%20me%20gustar%C3%ADa%20m%C3%A1s%20informaci%C3%B3n%20sobre%20sus%20servicios."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-10 rounded-lg text-xl transition duration-300 shadow-lg"
              >
                {/* Icono de WhatsApp */}
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" viewBox="0 0 16 16" className="mr-3">
                  <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.626-2.957 6.584-6.591 6.584zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.068-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.05-.087-.182-.133-.38-.232z"/>
                </svg>
                Hablar con un especialista
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* --- NUEVO: Renderizado del Modal --- */}
      {selectedService && (
        <ServiceModal 
          service={otherServicesData.find(s => s.id === selectedService)}
          onClose={handleCloseModal}
          cacheBuster={cacheBuster}
        />
      )}
    </main>
  );
}