// components/ProjectTabs.js
'use client';

import { useState } from 'react';

// --- Iconos SVG (reemplazo para 'react-icons') ---
// Hemos movido los íconos a SVGs en línea para eliminar la dependencia externa.

const IconIndustry = ({ className = '' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 512 512"
    className={`inline-block ${className}`}
    fill="currentColor"
    width="1em"
    height="1em"
  >
    <path d="M416 160c-26.5 0-48 21.5-48 48v224h-64V272c0-26.5-21.5-48-48-48s-48 21.5-48 48v160H160V208c0-26.5-21.5-48-48-48s-48 21.5-48 48v288h-16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h480c8.8 0 16-7.2 16-16v-32c0-8.8-7.2-16-16-16h-16V208c0-26.5-21.5-48-48-48zm-16 288h-64V208c0-8.8 7.2-16 16-16s16 7.2 16 16v224zm-128 0h-64V272c0-8.8 7.2-16 16-16s16 7.2 16 16v176zm-128 0H80V208c0-8.8 7.2-16 16-16s16 7.2 16 16v224zM256 0L144 96h224L256 0z" />
  </svg>
);

const IconLaptopCode = ({ className = '' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 640 512"
    className={`inline-block ${className}`}
    fill="currentColor"
    width="1em"
    height="1em"
  >
    <path d="M384 0H256c-17.7 0-32 14.3-32 32v64h192V32c0-17.7-14.3-32-32-32zM224 128v320c0 17.7 14.3 32 32 32h128c17.7 0 32-14.3 32-32V128H224zM63.6 448H0V160c0-17.7 14.3-32 32-32h160v128h-96c-17.7 0-32 14.3-32 32v160zM640 160V448H576.4V288c0-17.7-14.3-32-32-32h-96V128h160c17.7 0 32 14.3 32 32z" />
  </svg>
);

const IconBullhorn = ({ className = '' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 576 512"
    className={`inline-block ${className}`}
    fill="currentColor"
    width="1em"
    height="1em"
  >
    <path d="M544 0H32C14.3 0 0 14.3 0 32v64c0 17.7 14.3 32 32 32h512c17.7 0 32-14.3 32-32V32c0-17.7-14.3-32-32-32zM64 160c-35.3 0-64 28.7-64 64v160c0 35.3 28.7 64 64 64h16c17.7 0 32-14.3 32-32V192c0-17.7-14.3-32-32-32H64zm512 144v-32c0-34.7-22.3-64.7-53.7-75.7c-2.8-.9-5.7-.9-8.5 0c-31.5 11-53.7 41-53.7 75.7v32c0 17.7 14.3 32 32 32h64c17.7 0 32-14.3 32-32zM224 192c-17.7 0-32 14.3-32 32v128c0 17.7 14.3 32 32 32h32c17.7 0 32-14.3 32-32V224c0-17.7-14.3-32-32-32h-32z" />
  </svg>
);
// --- Fin de Iconos SVG ---

// Datos de ejemplo para los proyectos.
// Ahora usan los componentes de íconos locales.
const projects = [
  {
    id: 'proyecto-1',
    title: 'Software de Trazabilidad',
    icon: IconIndustry, // <--- Actualizado
    description:
      'Desarrollamos una solución completa para el seguimiento de productos en tiempo real, desde la fábrica hasta el cliente final. Optimizando la logística y reduciendo pérdidas.',
    image:
      'https://placehold.co/600x400/3498db/ffffff?text=Proyecto+Trazabilidad',
  },
  {
    id: 'proyecto-2',
    title: 'Consultoría TI y Migración Cloud',
    icon: IconLaptopCode, // <--- Actualizado
    description:
      'Migramos la infraestructura completa de un cliente a la nube (AWS), mejorando la disponibilidad, reduciendo costos operativos y aumentando la seguridad de sus datos.',
    image: 'https://placehold.co/600x400/2ecc71/ffffff?text=Migraci%C3%B3n+Cloud',
  },
  {
    id: 'proyecto-3',
    title: 'Plataforma de Marketing Digital',
    icon: IconBullhorn, // <--- Actualizado
    description:
      'Creación de una plataforma interna para la gestión de campañas de marketing, integrando analíticas y automatización de correos para un cliente del sector retail.',
    image: 'https://placehold.co/600x400/e74c3c/ffffff?text=Plataforma+Marketing',
  },
];

export default function ProjectTabs() {
  // 'proyecto-1' será la pestaña activa por defecto
  const [activeTab, setActiveTab] = useState(projects[0].id);

  const activeProject = projects.find((p) => p.id === activeTab);

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Botones de Pestañas */}
      <div className="flex justify-center space-x-2 md:space-x-4 mb-8 border-b border-gray-300">
        {projects.map((project) => {
          // Obtiene el componente de ícono del array
          const IconComponent = project.icon;
          return (
            <button
              key={project.id}
              onClick={() => setActiveTab(project.id)}
              className={`
                flex-1 md:flex-none text-center py-3 px-4 text-sm md:text-base font-medium
                transition-all duration-300
                ${
                  activeTab === project.id
                    ? 'border-b-2 border-blue-600 text-blue-600'
                    : 'text-gray-500 hover:text-gray-800'
                }
              `}
            >
              <IconComponent className="inline-block md:hidden text-2xl" />
              <span className="hidden md:inline-block">{project.title}</span>
            </button>
          );
        })}
      </div>

      {/* Contenido de la Pestaña Activa */}
      {activeProject && (
        <div className="p-4 bg-white rounded-lg shadow-xl overflow-hidden transition-opacity duration-500">
          <div className="md:flex">
            <div className="md:w-1/2">
              <img
                src={activeProject.image}
                alt={activeProject.title}
                className="w-full h-48 md:h-full object-cover"
                onError={(e) => {
                  e.target.src =
                    'https://placehold.co/600x400/cccccc/ffffff?text=Imagen+No+Disponible';
                }}
              />
            </div>
            <div className="md:w-1/2 p-6 md:p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                {activeProject.title}
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {activeProject.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}