export default async function handler(req, res) {
  const { path = "" } = req.query;
  
  // Variables de servidor privadas en Vercel (SIN prefijo VITE_)
  const BACKEND_URL = process.env.BACKEND_URL || "https://api-cu-production.up.railway.app";
  const API_KEY_SECRET = process.env.API_KEY_SECRET;

  if (!API_KEY_SECRET) {
    return res.status(500).json({ error: "Falta configurar API_KEY_SECRET en las variables de entorno de Vercel" });
  }

  const targetUrl = `${BACKEND_URL}/api/${path}`;

  try {
    const options = {
      method: req.method,
      headers: {
        "Content-Type": "application/json",
        "X-API-Key": API_KEY_SECRET, // Se inyecta de forma segura en el servidor de Vercel
      },
    };

    if (req.method !== "GET" && req.method !== "HEAD" && req.body) {
      options.body = typeof req.body === "string" ? req.body : JSON.stringify(req.body);
    }

    const response = await fetch(targetUrl, options);
    const data = await response.json();

    return res.status(response.status).json(data);
  } catch (error) {
    return res.status(500).json({
      error: "Error en el proxy de Vercel",
      details: error.message,
    });
  }
}

