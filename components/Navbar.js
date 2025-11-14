'use client'; // Necesario para el hook useState (para el menú móvil)
import { useState } from 'react';

// --- Iconos SVG para el menú móvil (evita react-icons) ---
const IconMenu = () => (
  <svg
    className="w-6 h-6"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M4 6h16M4 12h16M4 18h16"
    />
  </svg>
);

const IconClose = () => (
  <svg
    className="w-6 h-6"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M6 18L18 6M6 6l12 12"
    />
  </svg>
);
// --- Fin Iconos ---

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  // Links basados en el PDF que me enviaste
  const navLinks = [
    { href: '#inicio', label: 'Inicio' },
    { href: '#servicios', label: 'Qué Hacemos' },
    { href: '#propuesta-valor', label: 'Propuesta de Valor' },
    { href: '#otros-servicios', label: 'Servicios' },
    { href: '#clientes', label: 'Clientes' },
    { href: '#contacto', label: 'Contacto' },
  ];

  return (
    <nav className="bg-gray-800 text-white p-4 sticky top-0 z-50 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        
        {/* Logo/Nombre de la Empresa */}
        <a href="#inicio" className="text-2xl font-bold text-blue-400">
          PuntoIntegra
        </a>

        {/* Botón de Menú Móvil (visible en 'md' y menos) */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
            {isOpen ? <IconClose /> : <IconMenu />}
          </button>
        </div>

        {/* Links de Navegación (Escritorio) */}
        {/* Usamos 'hidden' para ocultar en móvil, 'md:flex' para mostrar en escritorio */}
        <div className="hidden md:flex space-x-6">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="hover:text-blue-300 transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>

      {/* Panel de Navegación (Móvil) */}
      {/* Usamos 'transition-all' y 'max-h-0' / 'max-h-96' 
        para un efecto de 'acordeón' al abrir y cerrar.
      */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-96 mt-4' : 'max-h-0'
        }`}
      >
        <div className="flex flex-col space-y-4 pt-2">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="block hover:text-blue-300"
              onClick={() => setIsOpen(false)} // Cierra el menú al hacer clic
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}