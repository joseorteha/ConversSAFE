# 🛠️ Reporte Backend 2 - ConversSAFE

## 📁 Estructura del Backend

- **index.ts**: Arranque y configuración principal del servidor Express.
- **db.ts**: Conexión a la base de datos PostgreSQL (usando pool de pg).
- **routes/**: Rutas principales de la API (equipos, canales, mensajes, IA, etc).
- **controllers/**: Lógica modular para equipos, canales y mensajes.
- **services/**: Servicios auxiliares (ej: aiService para IA).

## 🚦 Endpoints principales
- `/api/teams` - Equipos
- `/api/channels` - Canales
- `/api/messages` - Mensajes de canal
- `/api/direct_messages` - Mensajes directos
- `/api/users` - Usuarios
- `/api/ai/analyze-channel` - Análisis de canal con IA

## ⚠️ Errores y advertencias actuales

### 1. **404 en /api/ai/analyze-channel**
- El frontend espera este endpoint para análisis de IA.
- Si responde 404, puede ser por:
  - El backend no está corriendo o no está actualizado.
  - El endpoint no está montado correctamente en Express.
  - El método es GET en vez de POST.
- **Solución:**
  - Verificar que el backend esté corriendo y actualizado.
  - Confirmar que la ruta esté montada con `app.use('/api/ai', aiRoutes);`.
  - Probar con Postman/curl usando POST.

### 2. **400 en /api/direct_messages**
- Ocurre si uno de los IDs de usuario es `undefined` o no es un número válido.
- **Solución:**
  - Validar en el frontend que ambos IDs estén definidos antes de hacer la petición.
  - El backend ya responde con error claro si los IDs no son válidos.

### 3. **401/409 en /api/login y /api/register**
- 401: Credenciales inválidas.
- 409: Usuario o email ya existe.
- **Solución:**
  - El frontend ya muestra mensajes claros. No es un error de código, sino de uso esperado.

### 4. **Cannot GET /api/ai/analyze-channel**
- Si accedes por navegador (GET), es normal. El endpoint solo acepta POST.

## 🧩 Notas adicionales
- El endpoint de IA tiene fallback: si no hay API Key o hay error, responde con un mock para que el frontend nunca falle.
- Revisa los logs del backend al arrancar para detectar errores de importación o compilación.
- Si usas TypeScript, asegúrate de que los archivos estén en la carpeta correcta y el build esté actualizado.

## ✅ Recomendaciones rápidas
- Reinicia el backend tras cambios.
- Prueba los endpoints críticos con Postman/curl.
- Mantén la estructura modular (routes, controllers, services).
- Documenta endpoints nuevos en este reporte.

---

**Cualquier duda, revisa este archivo antes de preguntar.**

--- 