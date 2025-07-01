# 🚀 ConversSAFE - Frontend

**Plataforma colaborativa con IA para equipos**  
*MVP en desarrollo para No Country Express 2025*

---

## 📋 Descripción del Proyecto

ConversSAFE es una plataforma web que permitirá a equipos comunicarse mediante un chat interno, con una IA que analizará en tiempo real la conversación y sugerirá mejoras para una colaboración más clara y efectiva.

### 🎯 Características Planificadas
- 💬 **Chat en tiempo real** para equipos
- 🤖 **Análisis conversacional** con OpenAI API
- 📊 **Métricas de colaboración** (tono, participación, claridad)
- 🎨 **UI moderna y responsiva**
- ⚡ **Performance optimizada**

---

## 🛠️ Stack Tecnológico

### **Frontend:**
- **React 19.1.0** - Framework principal
- **TypeScript 5.8.3** - Tipado estático
- **Vite 6.3.5** - Bundler y dev server
- **Tailwind CSS 3.4.17** - Framework de estilos
- **React Router DOM 7.6.3** - Navegación básica

### **Herramientas de Desarrollo:**
- **ESLint 9.25.0** - Linting básico
- **TypeScript ESLint** - Reglas básicas para TS
- **PostCSS & Autoprefixer** - Procesamiento CSS

---

## 🚀 Instalación y Uso

### **Prerrequisitos:**
- Node.js 18+ 
- npm o yarn

### **Instalación:**
```bash
# Clonar el repositorio
git clone [URL_DEL_REPO]

# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm run dev

# Construir para producción
npm run build

# Preview de producción
npm run preview
```

### **Scripts Disponibles:**
- `npm run dev` - Servidor de desarrollo
- `npm run build` - Build de producción
- `npm run preview` - Preview del build
- `npm run lint` - Linting del código

---

## 📁 Estructura del Proyecto

```
src/
├── components/           # Componentes básicos
│   ├── ChatBox.tsx      # Estructura básica del chat
│   ├── MessageBubble.tsx # Componente de mensajes
│   └── NotFound.tsx     # Página 404
├── pages/               # Páginas principales
│   ├── Home.tsx         # Página de inicio
│   └── Dashboard.tsx    # Dashboard (estructura básica)
├── routes/              # Configuración de rutas
│   └── AppRoutes.tsx    # Sistema de navegación
├── features/            # Arquitectura de features
│   └── emailMarketing/  # Módulo de email marketing
├── layout/              # Layouts de la aplicación
├── utils/               # Utilidades
├── assets/              # Recursos estáticos
└── App.tsx              # Componente raíz
```

---

## 🎨 Componentes Principales

### **ChatBox** (En desarrollo)
- Estructura básica de la interfaz de chat
- Input para escribir mensajes (deshabilitado)
- Diseño responsive con Tailwind

### **Dashboard** (En desarrollo)
- Estructura básica para métricas de IA
- Preparado para gráficos y datos
- Diseño base implementado

### **MessageBubble** (Básico)
- Componente para renderizar mensajes
- Props básicas implementadas
- Estilos con Tailwind CSS

---

## 🚀 Rutas de la Aplicación

- `/` - **Home** - Página principal
- `/dashboard` - **Dashboard** - Estructura básica
- `/chat` - **ChatBox** - UI estática del chat
- `/*` - **NotFound** - Página 404

---

## 📊 Estado del Desarrollo

### ✅ **Completado (30%)**
- Estructura base del proyecto
- Configuración de herramientas
- Sistema de rutas básico
- Arquitectura de carpetas

### 🔄 **En Progreso (20%)**
- Componentes básicos
- Páginas principales
- Estructura de features

### ⏳ **Pendiente (50%)**
- Funcionalidad del chat
- Integración con API
- Dashboard con métricas
- Testing y deploy

---

## 🤝 Contribución

### **Equipo de Desarrollo:**
- **José Ortega** - Frontend Developer (Equipo 7)

### **Proceso de Contribución:**
1. Fork del repositorio
2. Crear rama feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit cambios (`git commit -am 'Agregar nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Crear Pull Request

---

## 📝 Reportes

- [📊 Reporte Detallado del Frontend 1](./FRONTEND_REPORT.md)


---

## 🎯 Próximos Pasos

### **Prioridad Alta:**
1. Implementar estado del chat con React hooks
2. Conectar con API del backend
3. Agregar funcionalidad real a los componentes
4. Implementar métricas en el dashboard
5. Implemtar diseño de Figma

### **Prioridad Media:**
1. Mejorar UI/UX con componentes reales
2. Agregar navegación entre páginas
3. Implementar features de email marketing

---

## 📄 Licencia

Este proyecto es desarrollado para **No Country Express 2025**.

---

## 👨‍💻 Desarrollado por

**José Ortega** - Frontend Developer  
**Equipo 7** - No Country Express 2025

---

**ConversSAFE** - Haciendo la colaboración más inteligente 🤖✨
