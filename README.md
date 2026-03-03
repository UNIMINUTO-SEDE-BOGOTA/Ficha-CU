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
<p align="center">

  <!-- React SVG -->
  <svg width="120" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M18.6789 15.9759C18.6789 14.5415 17.4796 13.3785 16 13.3785C14.5206 13.3785 13.3211 14.5415 13.3211 15.9759C13.3211 17.4105 14.5206 18.5734 16 18.5734C17.4796 18.5734 18.6789 17.4105 18.6789 15.9759Z" fill="#53C1DE"/>
    <path fill-rule="evenodd" clip-rule="evenodd" d="M24.7004 11.1537C25.2661 8.92478 25.9772 4.79148 23.4704 3.39016C20.9753 1.99495 17.7284 4.66843 16.0139 6.27318C14.3044 4.68442 10.9663 2.02237 8.46163 3.42814C5.96751 4.82803 6.73664 8.8928 7.3149 11.1357C4.98831 11.7764 1 13.1564 1 15.9759C1 18.7874 4.98416 20.2888 7.29698 20.9289C6.71658 23.1842 5.98596 27.1909 8.48327 28.5877C10.9973 29.9932 14.325 27.3945 16.0554 25.7722C17.7809 27.3864 20.9966 30.0021 23.4922 28.6014C25.9956 27.1963 25.3436 23.1184 24.7653 20.8625C27.0073 20.221 31 18.7523 31 15.9759C31 13.1835 26.9903 11.7923 24.7004 11.1537Z" fill="#53C1DE"/>
  </svg>

  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

  <!-- Vite SVG -->
  <svg width="120" viewBox="-0.5 0 257 257" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid">
    <defs>
      <linearGradient x1="-0.828097821%" y1="7.6518539%" x2="57.6359644%" y2="78.4107719%" id="viteGradient1">
        <stop stop-color="#41D1FF" offset="0%"/>
        <stop stop-color="#BD34FE" offset="100%"/>
      </linearGradient>
      <linearGradient x1="43.3760053%" y1="2.24179788%" x2="50.3158848%" y2="89.0299051%" id="viteGradient2">
        <stop stop-color="#FFEA83" offset="0%"/>
        <stop stop-color="#FFDD35" offset="8.33333%"/>
        <stop stop-color="#FFA800" offset="100%"/>
      </linearGradient>
    </defs>
    <path d="M255.152904,37.937763 L134.896865,252.97646 C132.413943,257.416178 126.035075,257.442321 123.5149,253.02417 L0.87443175,37.9584812 C-1.87111536,33.1438084 2.24595371,27.3119153 7.70191187,28.2871109 L128.086639,49.8052023 C128.854587,49.9424525 129.640835,49.9411454 130.408783,49.8012155 L248.276014,28.3179595 C253.713738,27.3268821 257.850198,33.1136134 255.152904,37.937763 Z" fill="url(#viteGradient1)"/>
    <path d="M185.432401,0.0631038902 L96.4393502,17.500942 C94.9766549,17.7875335 93.8936852,19.0270992 93.8054529,20.5146956 L88.3311293,112.971419 C88.2023755,115.149123 90.2023075,116.839261 92.3277254,116.349082 L117.10466,110.630976 C119.422882,110.096354 121.517582,112.138114 121.041128,114.469407 L113.67994,150.515893 C113.184532,152.941955 115.462232,155.016394 117.831433,154.29681 L133.134834,149.647295 C135.507302,148.927059 137.786963,151.00738 137.285019,153.435402 L125.586724,210.056351 C124.854723,213.598061 129.565674,215.529368 131.530313,212.49287 L132.842687,210.464834 L205.359174,65.745575 C206.573511,63.3224548 204.479465,60.5594769 201.818118,61.0730542 L176.31441,65.9952397 C173.91776,66.4573155 171.878614,64.2253653 172.555061,61.8805431 L189.2009,4.17570253 C189.878001,1.82692623 187.831665,-0.406957894 185.432401,0.0631038902 Z" fill="url(#viteGradient2)"/>
  </svg>

</p>



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