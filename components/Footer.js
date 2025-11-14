// components/Footer.js
export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white p-6 text-center">
      <p>© {new Date().getFullYear()} PuntoIntegra. Todos los derechos reservados.</p>
    </footer>
  );
}