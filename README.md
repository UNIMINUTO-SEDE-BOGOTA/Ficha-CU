# 📊 Ficha Inteligente de Centros Universitarios

Aplicación web desarrollada para la visualización estratégica de información institucional mediante una Ficha de Centro Universitario (CU).

El observatorio centraliza indicadores clave y permite analizar datos relevantes para la toma de decisiones académicas y administrativas.

## 🎯 Objetivo del Proyecto

Desarrollar una herramienta digital que permita:

Consolidar información institucional en una sola vista.

Visualizar indicadores estratégicos.

Facilitar el análisis comparativo entre Centros Universitarios.

Apoyar la toma de decisiones basada en datos.

Modernizar la consulta y explotación de información institucional.

📌 Indicadores Visualizados

👥 Total de estudiantes

📊 Caracterización poblacional

📈 Proyecciones

🏢 Centros de costos

📍 Información demográfica

📑 Indicadores estratégicos adicionales

## 🚀 Tecnologías Utilizadas
<p align="center"> <img src="https://vitejs.dev/logo.svg" alt="Vite Logo" width="120"/> <img src="https://react.dev/images/branding/react-logo.svg" alt="React Logo" width="120"/> </p>

## 🧩 Frontend

React

Vite

Arquitectura modular por componentes

Consumo de API REST

## 🔌 Backend

API REST desplegada en la nube

Gestión de permisos mediante variables de entorno

Configuración de CORS para control de acceso por origen

## ☁️ Base de Datos

SQL Server

Base de datos alojada en infraestructura cloud

Modelo estructurado para análisis institucional

### ⚠️ Nota: La estructura de base de datos incluida en este repositorio es referencial y no funcional.

# 🏗️ Arquitectura General

Frontend (React + Vite)
        │
        │  Peticiones HTTP
        ▼
API REST (Cloud)
        │
        │  Conexión segura
        ▼
SQL Server (Base de Datos en la Nube)

## 🔐 Seguridad

El proyecto implementa buenas prácticas para la protección de la información:

## ✅ Variables de Entorno

Las credenciales y configuraciones sensibles no están expuestas en el código.

Se utilizan variables de entorno para:

Permisos de acceso a la API.

Configuración de conexión.

Parámetros sensibles.

## ✅ Configuración CORS

La API tiene habilitado control de CORS (Cross-Origin Resource Sharing).

Solo se permiten orígenes autorizados.

Se restringen solicitudes desde dominios no aprobados.

Se evita la exposición no controlada de información.

Esto garantiza mayor seguridad en el intercambio de datos entre cliente y servidor.

## 📂 Estructura del Proyecto

📦 observatorio-ficha-cu
 ┣ 📂 src
 ┃ ┣ 📂 components
 ┃ ┣ 📂 pages
 ┃ ┣ 📂 services
 ┃ ┣ 📂 hooks
 ┃ ┗ 📜 main.jsx
 ┣ 📜 package.json
 ┣ 📜 vite.config.js
 ┗ 📜 README.md

## ⚙️ Instalación
1️⃣ Clonar el repositorio
git clone https://github.com/tu-usuario/observatorio-ficha-cu.git
cd observatorio-ficha-cu
2️⃣ Instalar dependencias
npm install
3️⃣ Ejecutar en entorno de desarrollo
npm run dev

La aplicación estará disponible en:

http://localhost:5173
🛠️ Scripts Disponibles
npm run dev        # Entorno de desarrollo
npm run build      # Build para producción
npm run preview    # Previsualización del build
🌎 Variables de Entorno (Frontend)

Crear un archivo .env en la raíz del proyecto:

VITE_API_URL=URL_DE_LA_API

No se deben exponer credenciales ni configuraciones sensibles en el repositorio.

## 📊 Consideraciones Técnicas

Arquitectura desacoplada (Frontend / API / Base de Datos).

Infraestructura en la nube.

Control de acceso mediante configuración CORS.

Uso de variables de entorno para seguridad.

Proyecto escalable y preparado para integración futura con herramientas BI.