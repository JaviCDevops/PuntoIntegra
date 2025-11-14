Proyecto Landing Page - Ingeniería Industrial

Este repositorio contiene el código fuente de la landing page de una empresa de ingeniería y servicios industriales, desarrollada con Next.js y Tailwind CSS.

🚀 Características Principales

Página Única (Landing Page): Toda la información se presenta en una sola página (app/page.js) con navegación interna suave (scroll-spy).

Diseño 100% Responsivo: Incluye un menú de hamburguesa funcional para dispositivos móviles.

Componentes Interactivos:

Hero (Inicio): Carrusel de imágenes de fondo con efecto "fade".

Qué Hacemos: Sección de servicios principales con layout alternado de imagen y texto.

Propuesta de Valor: Diagrama de flujo de 5 pasos (timeline) basado en la metodología de la empresa.

Nuestros Servicios: Cuadrícula de servicios secundarios con modal interactivo (ventana emergente) para "Ver Más".

Clientes: Carrusel de logos automático (marquee) construido con CSS.

Animaciones: Efectos sutiles de "fade-in" al hacer scroll para las secciones.

Stack Moderno: Construido con Next.js 14+ (App Router) y Tailwind CSS.

🛠️ Stack Tecnológico

Next.js (Framework de React)

React (Biblioteca de UI)

Tailwind CSS (Framework de CSS)

⚙️ Instalación y Ejecución Local

Para correr este proyecto en tu máquina local, sigue estos pasos:

Clonar el repositorio:

git clone https://[URL-DE-TU-REPOSITORIO].git


Navegar a la carpeta del proyecto:

cd web-puntointegra


Instalar las dependencias:

npm install


Ejecutar el servidor de desarrollo:

npm run dev


Abrir http://localhost:3000 en tu navegador para ver el resultado.

📁 Estructura de Carpetas (¡Importante!)

Toda la lógica de la página se encuentra en app/page.js. Los componentes reutilizables como el Navbar y el Footer están en components/.

Gestión de Imágenes

Todas las imágenes estáticas DEBEN ir dentro de la carpeta public/. La estructura de carpetas usada en el código es la siguiente:

public/

images/

hero-1.jpg (Imágenes del carrusel principal)

hero-2.jpg

hero-3.jpg

QueHacemos/

foto1.jpg (Imágenes de la sección "Qué Hacemos")

foto2.jpg

foto3.jpg

foto4.jpg

servicios/

servicio-filtracion.jpg (Imágenes para los 5 modales)

servicio-inspeccion.jpg

(etc...)

icons/

icon-diagnostico.png (Iconos PNG para el timeline)

icon-analisis.png

(etc...)

logos/

mirs.jpeg (Logos de clientes)

godelius.jpeg

(etc...)

Importante: Cuando llames una imagen en el código (<img>), la ruta siempre empieza desde la raíz (/), que Next.js entiende como la carpeta public.

Ejemplo:

Archivo: public/images/logos/mirs.jpeg

Código: <img src="/images/logos/mirs.jpeg" ... />

🎨 Personalización

1. Textos y Contenidos

Casi todo el contenido (títulos, descripciones, datos del timeline, etc.) está definido directamente en app/page.js.

2. Número de WhatsApp

Debes actualizar el número de teléfono de WhatsApp en dos lugares:

app/page.js: En la Sección 6 (Contacto), en el href del botón.

components/Footer.js: En el href del ícono de WhatsApp.

3. Información del Footer

Edita components/Footer.js para cambiar el email y teléfono de contacto.

🚀 Despliegue (Deploy) en Netlify

Netlify detectará automáticamente que este es un proyecto de Next.js.

Sube tu proyecto a un repositorio de GitHub (o GitLab/Bitbucket).

Crea un nuevo sitio en Netlify e impórtalo desde tu repositorio.

Netlify debería configurar todo automáticamente. Si te pide la configuración de build, usa:

Build command: npm run build

Publish directory: .next