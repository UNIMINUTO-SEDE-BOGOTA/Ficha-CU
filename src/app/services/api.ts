import axios from 'axios';

// Obtener la URL de la API desde variables de entorno (por defecto usa el proxy serverless seguro de Vercel)
const API_URL = import.meta.env.VITE_API_URL || '/api/proxy';

// Creamos la instancia de conexión
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  }
});

export default api;