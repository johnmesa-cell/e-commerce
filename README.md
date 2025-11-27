# 🎸 Music Tools - E-commerce de Instrumentos Musicales

![Music Tools Logo](frontend/assets/images/logo%20Music%20Tools.png)

## 📋 Descripción

Music Tools es una plataforma de comercio electrónico especializada en la venta de instrumentos musicales y equipos de audio profesional. El proyecto fue desarrollado como parte de un curso de Técnicas de Modelado de Software, implementando una arquitectura completa con frontend y backend.

## ✨ Características Principales

### 🛒 Funcionalidades de E-commerce
- **Catálogo de Productos**: Navegación por categorías (Guitarras, Teclados, Baterías, Audio, Vientos, Cuerdas, Accesorios)
- **Carrito de Compras Personalizado**: Cada usuario tiene su propio carrito vinculado a su sesión
- **Búsqueda en Tiempo Real**: Sistema de búsqueda inteligente de productos
- **Gestión de Cantidades**: Incrementar/decrementar productos directamente desde el carrito
- **Cálculo Automático**: Subtotales, envío y total con envío gratis sobre $100.000 COP

### 👤 Sistema de Autenticación
- **Registro de Usuarios**: Sistema completo de registro con validación de datos
- **Inicio de Sesión**: Autenticación segura con persistencia de sesión
- **Gestión de Sesiones**: Carritos individuales por usuario con opción de conservar al cerrar sesión
- **Migración de Carrito**: Los productos del carrito de invitado se fusionan al iniciar sesión

### 🎨 Diseño y UX
- **Tema Oscuro Moderno**: Esquema de colores azul oscuro (#0F2A60) con acentos amarillos (#FFED4E)
- **Diseño Responsivo**: Adaptado para dispositivos móviles, tablets y desktop
- **Accesibilidad**: Contraste de colores optimizado (WCAG AA/AAA)
- **Animaciones Suaves**: Transiciones y efectos hover para mejor experiencia

### 📝 Comunidad y Blog
- **Sección de Blog**: Artículos sobre música, instrumentos y técnicas
- **Contenido Educativo**: Guías para músicos principiantes y avanzados

## 🛠️ Tecnologías Utilizadas

### Frontend
- **HTML5**: Estructura semántica
- **CSS3**: Estilos personalizados con variables CSS y Flexbox/Grid
- **JavaScript (Vanilla)**: Lógica del cliente sin frameworks
- **LocalStorage**: Persistencia de datos del carrito y sesiones
- **Fetch API**: Comunicación con el backend

### Backend
- **Node.js**: Entorno de ejecución
- **Express.js**: Framework para API REST
- **Base de Datos**: Sistema de gestión de productos y usuarios

### Herramientas
- **Git/GitHub**: Control de versiones
- **Montserrat Font**: Tipografía moderna de Google Fonts

## 📁 Estructura del Proyecto

e-commerce/
├── backend/
│ ├── config/
│ ├── controllers/
│ ├── models/
│ ├── routes/
│ └── server.js
│
├── frontend/
│ ├── assets/
│ │ ├── css/
│ │ │ ├── style.css # Estilos principales
│ │ │ ├── cart.css # Estilos del carrito
│ │ │ ├── auth.css # Estilos de autenticación
│ │ │ └── normalize.css # Reset CSS
│ │ ├── js/
│ │ │ ├── app.js # Lógica de productos
│ │ │ ├── cart.js # Gestión del carrito
│ │ │ ├── auth.js # Autenticación
│ │ │ ├── storage.js # Utilidades de localStorage
│ │ │ ├── config.js # Configuración
│ │ │ ├── search.js # Búsqueda
│ │ │ └── main.js # Inicialización
│ │ ├── images/
│ │ └── json/
│ │ └── data.json # Datos de productos (fallback)
│ │
│ ├── index.html # Página principal
│ ├── tienda.html # Catálogo de productos
│ ├── cart.html # Carrito de compras
│ ├── login.html # Inicio de sesión
│ ├── register.html # Registro de usuarios
│ ├── categories.html # Vista de categorías
│ ├── blog.html # Blog principal
│ └── blog-post-*.html # Artículos del blog
│
└── README.md


## 🚀 Instalación y Configuración

### Prerrequisitos
- Node.js (v14 o superior)
- npm o yarn
- Navegador web moderno

### Instalación

1. **Clonar el repositorio**

2. **Instalar dependencias del backend**

3. **Configurar variables de entorno**

4. **Iniciar el servidor backend**

5. **Abrir el frontend**

6. **Acceder a la aplicación**

## 💻 Uso

### Para Clientes

1. **Navegar el Catálogo**
   - Explora productos por categorías
   - Usa la búsqueda para encontrar productos específicos

2. **Agregar al Carrito**
   - Haz clic en "🛒 Agregar al Carrito" en cualquier producto
   - Inicia sesión si aún no lo has hecho

3. **Gestionar el Carrito**
   - Ve al carrito haciendo clic en el ícono 🛒
   - Ajusta cantidades con los botones +/-
   - Elimina productos con el botón 🗑️

4. **Finalizar Compra**
   - Revisa el resumen del pedido
   - Haz clic en "Proceder al Pago"

### Para Desarrolladores

#### Agregar Nuevos Productos

**Opción 1: Desde la base de datos**

**Opción 2: Desde el JSON local** (fallback)
Editar `frontend/assets/json/data.json`

#### Personalizar Estilos


## 🎨 Paleta de Colores

| Color | Hex | Uso |
|-------|-----|-----|
| Azul Oscuro | `#0F2A60` | Fondo principal |
| Azul Medio | `#1A3A6B` | Tarjetas y contenedores |
| Amarillo | `#FFED4E` | Botones y acentos |
| Amarillo Claro | `#FFF176` | Hover en botones |
| Blanco | `#FFFFFF` | Texto principal |
| Gris Claro | `#E0E0E0` | Texto secundario |
| Rojo | `#FF5252` | Botones de eliminar y errores |
| Verde | `#4CAF50` | Mensajes de éxito |

## 🔐 Seguridad

- Validación de datos en frontend y backend
- Sanitización de inputs del usuario
- Protección contra XSS
- Gestión segura de sesiones con localStorage
- Validación de contraseñas con requisitos mínimos

## 📱 Responsive Design

El sitio está optimizado para:
- **Desktop**: 1024px y superior
- **Tablet**: 768px - 1023px
- **Mobile**: 320px - 767px

## 🐛 Problemas Conocidos y Soluciones

### El carrito no guarda productos
**Solución**: Limpia el caché del navegador (`Ctrl + Shift + R`) y verifica que localStorage esté habilitado.

### Los productos no cargan
**Solución**: Verifica que el backend esté corriendo y la URL de la API esté configurada correctamente en `config.js`.

### Estilos no se aplican
**Solución**: Asegúrate de que todos los archivos CSS estén enlazados en el HTML y limpia el caché.

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Para contribuir:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/NuevaCaracteristica`)
3. Commit tus cambios (`git commit -m 'Agrega nueva característica'`)
4. Push a la rama (`git push origin feature/NuevaCaracteristica`)
5. Abre un Pull Request

## 📝 Changelog

### v1.0.0 (2025-11-27)
- ✅ Sistema de carrito de compras por usuario
- ✅ Autenticación completa (login/registro)
- ✅ Diseño responsivo con tema oscuro
- ✅ Búsqueda en tiempo real
- ✅ Integración con backend API
- ✅ Sistema de categorías
- ✅ Blog de contenido educativo
- ✅ Optimización de contraste y accesibilidad

## 👥 Autores

- **John Mesa** - [@johnmesa-cell](https://github.com/johnmesa-cell)

## 📄 Licencia

Este proyecto fue desarrollado con fines educativos como parte del curso de Técnicas de Modelado de Software.

## 🙏 Agradecimientos

- A los profesores del curso de Técnicas de Modelado de Software
- A la comunidad de desarrolladores que comparten conocimiento
- A los músicos que inspiraron este proyecto

## 📞 Contacto

Para preguntas, sugerencias o reportar bugs:
- GitHub Issues: [https://github.com/johnmesa-cell/e-commerce/issues](https://github.com/johnmesa-cell/e-commerce/issues)
- Email: [tu-email@ejemplo.com]

---

⭐ Si te gustó este proyecto, no olvides darle una estrella en GitHub!

**Music Tools** - Donde la música cobra vida 🎵
