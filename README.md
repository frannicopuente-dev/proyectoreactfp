# 🌍 Theo Tour - Agencia de Turismo

Aplicación web moderna desarrollada con React para la gestión de destinos turísticos, carrito de compras y administración de productos.

## 📋 Características

### ✨ Funcionalidades Principales

- **🔐 Autenticación de Usuarios**
  - Sistema de login simulado con localStorage
  - Rutas protegidas para secciones privadas
  - Gestión de sesión de usuario

- **🛒 Carrito de Compras**
  - Carrito modal interactivo
  - Agregar y eliminar productos
  - Cálculo automático de totales
  - Persistencia en localStorage

- **📦 CRUD de Productos**
  - Crear, leer, actualizar y eliminar productos
  - Integración con MockAPI
  - Validaciones completas de formularios
  - Modal de confirmación para eliminación

- **🔍 Búsqueda y Filtrado**
  - Búsqueda en tiempo real
  - Filtrado por nombre, descripción y categoría
  - Debounce para optimizar rendimiento

- **📄 Paginación**
  - Navegación entre páginas
  - Salto directo a página específica
  - Información de paginación clara

- **📱 Diseño Responsive**
  - Compatible con móviles, tablets y escritorio
  - Interfaz adaptativa con Bootstrap 5

## 🚀 Instalación

### Requisitos Previos

- Node.js (versión 18 o superior)
- npm o yarn

### Pasos de Instalación

1. **Clonar el repositorio** (o descargar el proyecto)
   ```bash
   git clone <url-del-repositorio>
   cd proyectoreactfp
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Iniciar el servidor de desarrollo**
   ```bash
   npm run dev
   ```

4. **Abrir en el navegador**
   - La aplicación estará disponible en `http://localhost:5173`

## 📦 Scripts Disponibles

- `npm run dev` - Inicia el servidor de desarrollo con hot-reload
- `npm run build` - Crea una versión optimizada para producción
- `npm run preview` - Previsualiza la versión de producción
- `npm run lint` - Ejecuta el linter para verificar el código

## 🏗️ Estructura del Proyecto

```
proyectoreactfp/
├── src/
│   ├── components/          # Componentes reutilizables
│   │   ├── common/          # Componentes comunes (Modal, Pagination, etc.)
│   │   ├── CartModal.jsx    # Modal del carrito
│   │   ├── Login.jsx        # Componente de login
│   │   └── ...
│   ├── contexts/            # Context API (Estado global)
│   │   ├── AuthContext.jsx      # Autenticación
│   │   ├── CarritoContext.jsx   # Carrito de compras
│   │   └── ProductosContext.jsx # Gestión de productos
│   ├── hooks/               # Custom hooks
│   │   └── useProductosFiltrados.js
│   ├── pages/               # Páginas principales
│   │   ├── Home.jsx         # Página principal
│   │   ├── Admin.jsx        # Administración
│   │   └── Cart.jsx         # Página del carrito (legacy)
│   ├── App.jsx              # Componente principal
│   └── main.jsx             # Punto de entrada
├── public/                  # Archivos estáticos
├── package.json             # Dependencias y scripts
└── vite.config.js           # Configuración de Vite
```

## 🎯 Uso de la Aplicación

### Para Usuarios

1. **Navegar por destinos**
   - En la página principal puedes ver todos los destinos disponibles
   - Usa la barra de búsqueda para filtrar productos
   - Navega entre páginas usando el paginador

2. **Iniciar sesión**
   - Haz clic en "Iniciar Sesión"
   - Ingresa cualquier email y contraseña (login simulado)
   - Una vez autenticado, tendrás acceso al carrito y administración

3. **Agregar al carrito**
   - Haz clic en "Agregar" en cualquier destino
   - Abre el carrito desde el menú de navegación
   - Revisa tus productos y elimina los que no necesites

### Para Administradores

1. **Acceder a administración**
   - Inicia sesión
   - Haz clic en "Administración" en el menú

2. **Crear producto**
   - Haz clic en "+ Agregar Producto"
   - Completa el formulario:
     - Nombre (obligatorio, mínimo 3 caracteres)
     - Precio (obligatorio, mayor a 0)
     - Descripción (obligatorio, mínimo 10 caracteres)
     - URL de imagen (opcional)
   - Haz clic en "Crear"

3. **Editar producto**
   - Haz clic en "Editar" en cualquier producto
   - Modifica los campos necesarios
   - Haz clic en "Actualizar"

4. **Eliminar producto**
   - Haz clic en "Eliminar" en cualquier producto
   - Confirma la eliminación en el modal

## 🔧 Tecnologías Utilizadas

- **React 19.1.1** - Biblioteca de JavaScript para interfaces
- **React Router DOM 7.9.4** - Enrutamiento
- **Bootstrap 5.3.8** - Framework CSS
- **Vite 7.1.7** - Build tool y dev server
- **MockAPI** - API simulada para datos

## 📱 Compatibilidad

La aplicación está optimizada para:
- ✅ Navegadores modernos (Chrome, Firefox, Safari, Edge)
- ✅ Dispositivos móviles (iOS y Android)
- ✅ Tablets
- ✅ Escritorio

## 🎨 Características de Diseño

- Diseño responsive con Bootstrap 5
- Interfaz intuitiva y moderna
- Modales para mejor UX
- Feedback visual en todas las acciones
- Mensajes de error y éxito claros

## 🔒 Seguridad

- Rutas protegidas para secciones privadas
- Validación de formularios en cliente
- Manejo seguro de datos en localStorage
- Protección contra navegación no autorizada

## 🐛 Solución de Problemas

### Error al cargar productos
- Verifica tu conexión a internet
- La API de MockAPI puede tener límites de rate
- Revisa la consola del navegador para más detalles

### Problemas de autenticación
- Limpia el localStorage del navegador
- Asegúrate de que JavaScript esté habilitado

### Problemas de build
- Elimina `node_modules` y `package-lock.json`
- Ejecuta `npm install` nuevamente
- Verifica que tengas Node.js 18+

## 📝 Notas de Desarrollo

- El login es simulado: acepta cualquier email/contraseña
- Los datos se persisten en localStorage
- La API utilizada es MockAPI (gratuita con límites)
- El carrito se guarda automáticamente

## 🚢 Despliegue

### Build para Producción

```bash
npm run build
```

Esto generará una carpeta `dist/` con los archivos optimizados.

### Desplegar en Vercel

1. Instala Vercel CLI: `npm i -g vercel`
2. Ejecuta: `vercel`
3. Sigue las instrucciones

### Desplegar en Netlify

1. Conecta tu repositorio a Netlify
2. Configura el build command: `npm run build`
3. Configura el publish directory: `dist`

### Desplegar en GitHub Pages

1. Instala `gh-pages`: `npm install --save-dev gh-pages`
2. Agrega al `package.json`:
   ```json
   "scripts": {
     "deploy": "npm run build && gh-pages -d dist"
   }
   ```
3. Ejecuta: `npm run deploy`

## 👥 Contribución

Este es un proyecto educativo. Las contribuciones son bienvenidas.

## 📄 Licencia

Este proyecto es de uso educativo.

## 📧 Contacto

Para más información sobre Theo Tour, visita nuestro sitio web.

---

**Desarrollado con ❤️ usando React y Vite**
