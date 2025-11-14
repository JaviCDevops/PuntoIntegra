'use client'; 
import Link from 'next/link';
import { FaWhatsapp } from 'react-icons/fa';

export default function BotonWhatsapp() {
  const numeroTelefono = '56962016401'; 
  const mensaje = encodeURIComponent('Hola, me gustaría más información sobre sus servicios.');

  const urlWhatsapp = `https://wa.me/${numeroTelefono}?text=${mensaje}`;

  return (
    <Link 
      href={urlWhatsapp}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg z-50"
      aria-label="Contactar por WhatsApp"
    >
      <FaWhatsapp size={28} />
    </Link>
  );
}