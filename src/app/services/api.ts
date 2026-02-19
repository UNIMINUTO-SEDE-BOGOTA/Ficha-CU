import axios from 'axios';

// Creamos la instancia de conexión
const api = axios.create({
  baseURL: 'https://api-observatorio.com/v1', //Url de la api
  headers: {
    'Content-Type': 'application/json'
  }
});

export default api;