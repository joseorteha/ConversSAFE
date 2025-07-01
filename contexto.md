# 🧠 Contexto para Agente de Desarrollo (ConversSAFE - Frontend)

👋 Hola, agente o asistente de código. Este archivo fue creado por **José Ortega**, frontend developer del equipo 7, para darte el contexto completo del frontend de **ConversSAFE**, un MVP creado en el marco de la **Convocatoria Express 2025 de No Country**.

Este documento sirve como guía en herramientas como **Cursor**, **Copilot Chat**, **Continue**, etc., para acelerar el desarrollo desde el rol de frontend.

---

## 💡 ¿Qué es ConversSAFE?

Es una plataforma web colaborativa que permite a equipos comunicarse mediante un chat interno, con una IA que analiza en tiempo real la conversación y sugiere mejoras para una colaboración más clara y efectiva.

### Objetivos clave del MVP:

* Interfaz tipo **chat en tiempo real**.
* Análisis conversacional usando **OpenAI API**.
* Visualización de métricas como **tono, participación y claridad**.
* UI clara, funcional y deploy público.

🔧 **IMPORTANTE:** Este documento cubre solo el **frontend**. Backend, IA y lógica API son responsabilidad de otros miembros del equipo.

---

## 🎯 Rol del frontend en este proyecto

Desde el frontend vamos a encargarnos de:

* Crear el componente de **chat** con soporte para feedback dinámico.
* Diseñar un **dashboard** que muestre los insights generados por la IA.
* Conectar los componentes con los endpoints REST del backend.
* Diseñar con estilo responsivo, intuitivo y claro.

---

## 🛠️ Stack Tecnológico (Frontend)

* **React**: Framework base
* **Tailwind CSS**: Estilado moderno y rápido
* **Chart.js**: Para visualización de métricas
* **Axios o fetch**: Para consumo de APIs
* **Netlify**: Deploy del frontend

---

## 👨‍💻 Rol de este archivo

Cuando este contexto esté cargado en el entorno de desarrollo o IA, debe:

* Sugerir o generar componentes (`ChatBox`, `Dashboard`, etc.)
* Mostrar buenas prácticas para estructurar carpetas en React
* Ayudar a integrar datos externos al dashboard
* Detectar errores comunes de lógica o UI
* Proponer mejoras de experiencia o visuales en Tailwind
* Autocompletar documentación técnica (comentarios, propTypes, etc.)

---

## 📁 Estructura propuesta del frontend

```
frontend/
├── src/
│   ├── components/
│   │   ├── ChatBox.jsx
│   │   ├── MessageBubble.jsx
│   │   ├── Dashboard.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   │   └── NotFound.jsx
│   ├── services/
│   │   └── api.js
│   └── App.jsx
├── public/
├── tailwind.config.js
└── README.md
```

---

## 🚧 Estado actual del proyecto

* [x] Estructura base clonada (estructura oficial No Country)
* [ ] UI en boceto / diseño Figma en proceso
* [ ] Sin componentes funcionales aún
* [ ] A la espera de endpoints del backend

---

## 📅 Cronograma Express Oficial (del 30/06 al 04/07)

| Día   | Actividades Frontend relevantes                |
| ----- | ---------------------------------------------- |
| 30/06 | Kickoff, definición de MVP, lectura de brief   |
| 01/07 | Setup técnico, UI con Figma, estructura React  |
| 02/07 | Desarrollo del chat y conexión a IA            |
| 03/07 | Dashboard, QA visual, ajustes UI               |
| 04/07 | Deploy en Netlify, documentación, presentación |

---

## ✅ ¿Qué evalúa No Country?

* Chat funcional
* Integración de IA (visual desde el frontend)
* Dashboard usable y claro
* Diseño responsivo, mobile-first
* Deploy público y funcional
* Trabajo colaborativo y documentación clara

---

## 🧠 Misión del agente

> Acelera mi desarrollo frontend, proponiendo código limpio, componentes reutilizables, UI clara y conexiones eficientes con la API.

Checklist para ayudarte:

* [ ] Crear componentes principales (`ChatBox`, `Dashboard`)
* [ ] Conectar al backend usando `fetch` o `axios`
* [ ] Aplicar estilos elegantes con Tailwind
* [ ] Renderizar métricas de IA usando Chart.js
* [ ] Sugerir mejoras en estructura y flujo

---

Gracias por tu ayuda. Vamos con todo, **#TeamConversSAFE** 🚀

— José Ortega
Frontend Developer – Equipo 7
