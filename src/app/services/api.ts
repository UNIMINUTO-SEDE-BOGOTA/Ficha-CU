import axios from 'axios';

// Obtener la URL de la API desde variables de entorno
const API_URL = import.meta.env.VITE_API_URL || "https://api-cu-production.up.railway.app";
const API_KEY = import.meta.env.VITE_API_KEY;

// Asegurar que la URL tenga protocolo
const baseURL = API_URL.startsWith('http') ? API_URL : `https://${API_URL}`;

// Creamos la instancia de conexión
const api = axios.create({
  baseURL: baseURL,
  headers: {
    'Content-Type': 'application/json',
    ...(API_KEY && { 'Authorization': `Bearer ${API_KEY}` })
  }
});

export default api;