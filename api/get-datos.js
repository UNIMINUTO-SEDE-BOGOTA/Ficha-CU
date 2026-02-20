export default async function handler(req, res) {
    // Solo permitir GET
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Método no permitido' });
    }

    const { centro_id } = req.query;
    if (!centro_id) {
        return res.status(400).json({ error: "Falta el centro_id" });
    }

    const API_KEY = process.env.API_KEY_SECRET;
    const RAILWAY_URL = `https://tu-api.railway.app/api/observatorio/completo/${centro_id}`;

    try {
        const response = await fetch(RAILWAY_URL, {
            method: 'GET',
            headers: {
                'X-API-Key': API_KEY,   // Consistente con FastAPI
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json();

        // Reenviar el código de estado correcto
        return res.status(response.status).json(data);
    } catch (error) {
        console.error("Error en Proxy:", error);
        return res.status(500).json({ error: "Error conectando con la API de Railway" });
    }
}