# Prueba Tecnica Gendra - Frontend

Este es el portal web para la prueba tecnica que consiste en un backoffice KYC, diseñado con un enfoque en la experiencia de usuario
URL Productiva: <https://front-prueba-tecnica-lcpc.onrender.com/>

## Tecnologias Utilizadas

* **Vue 3:** Framework reactivo para la interfaz.
* **TypeScript:** Garantiza la integridad de los datos en el flujo de la aplicación.
* **Tailwind CSS:** Estilizado basado en Material Design 3 para una UI moderna y limpia.
* **Axios:** Cliente HTTP configurado para comunicación asíncrona.
* **Vite:** Herramienta de construcción ultra rápida.
* **Nginx & Docker:** Servidor de producción y containerización.

## Decisiones Técnicas Clave

* **Resiliencia:** Lógica de reintento recursivo para manejar la latencia del servidor.
* **Dockerización:** Uso de Nginx para servir la SPA de forma profesional.
* **Performance:** Filtrado de datos en el cliente mediante Computed Properties.
* **UI/UX:** Estilizado moderno con Tailwind CSS siguiendo Material Design 3.

## Configuración y Ejecución

### **1. Requisitos Previos**
* Node.js

### **2. Instalación Local**
```bash
# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm run dev

# Construir imagen
docker build -t kyc-frontend .

# Ejecutar contenedor
docker run -p 80:80 kyc-frontend

# Pruebas Unirias
npm run test:unit