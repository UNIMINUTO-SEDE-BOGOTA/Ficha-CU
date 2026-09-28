# Redundancia de backends

`api/proxy.js` mantiene Render como backend principal y Vercel como respaldo. El navegador consume `/api/proxy`; `API_KEY_SECRET` se inyecta únicamente en el servidor.

## Variables de entorno de Vercel

- `API_KEY_SECRET` (obligatoria): clave enviada a ambos backends como `X-API-Key`.
- `PRIMARY_BACKEND_URL`: principal; por defecto `https://api-cu.onrender.com`.
- `FALLBACK_BACKEND_URL`: respaldo; por defecto `https://fichas-cu-backend-v2.vercel.app`.
- `PRIMARY_BACKEND_TIMEOUT_MS` (opcional): timeout del principal; por defecto `4000`.
- `CIRCUIT_FAILURE_THRESHOLD` (opcional): fallos antes de abrir el circuito; por defecto `3`.
- `CIRCUIT_OPEN_DURATION_MS` (opcional): espera antes de una prueba real `HALF_OPEN`; por defecto `30000`.

`BACKEND_URL` se conserva como alias transitorio del principal; `PRIMARY_BACKEND_URL` tiene prioridad.
No se debe configurar `VITE_API_KEY`: cualquier variable `VITE_*` puede quedar expuesta en el bundle del navegador.

## Comportamiento

- `GET` y `HEAD` usan el respaldo ante timeout, error de red o `5xx` del principal.
- Los `4xx` del principal se devuelven directamente.
- `POST`, `PUT`, `PATCH` y `DELETE` se envían una sola vez al principal.
- No hay health checks. Una solicitud real segura prueba la recuperación en `HALF_OPEN`.
- `X-Backend-Used` y `X-Circuit-State` dan diagnóstico sin revelar secretos.

El estado reside en memoria por instancia serverless y puede reiniciarse con un cold start; es una optimización *best-effort*, no un estado global distribuido.
