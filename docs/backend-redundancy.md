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

## Consulta consolidada de Sede Bogotá

El frontend solicita Sede Bogotá una sola vez mediante
`GET /api/proxy/observatorio/sede-bogota`. El backend devuelve los cinco centros
en el campo `centros`; el navegador conserva la consolidación visual existente,
pero ya no abre cinco solicitudes simultáneas.

Un `503` indica que la caché compartida todavía no está inicializada o no está
disponible. El frontend muestra el error y no inicia reintentos automáticos. La
actualización se realiza exclusivamente por el endpoint administrativo del
backend; sus credenciales y las de Redis nunca se exponen al navegador.

## Desarrollo local

El frontend sigue solicitando `/api/proxy/...`, pero el proxy de desarrollo de
Vite reescribe esa ruta a `/api/...` antes de enviarla al backend configurado en
`PRIMARY_BACKEND_URL`. El backend local no necesita implementar una ruta
`/api/proxy`. Vite también inyecta la cabecera `X-API-Key` usando
`API_KEY_SECRET`; la clave no debe configurarse con prefijo `VITE_`.
