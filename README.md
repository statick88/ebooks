# Ebooks Portfolio

Portafolio de ebooks y cursos de programación creados por Diego Saavedra.

![Astro](https://img.shields.io/badge/Astro-5.x-FF5D01?style=flat&logo=astro)
![React](https://img.shields.io/badge/React-19-61DAFB?style=flat&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=flat&logo=typescript)

## Características

- **27 ebooks** de programación y desarrollo
- **Filtros** por categoría y tecnología
- **Búsqueda** en tiempo real
- **Ordenamiento** por fecha, nombre y popularidad
- **Dark/Light mode** con persistencia
- **Multi-idioma** (Español/English)
- **SEO optimizado** con sitemap, meta tags y JSON-LD
- **PWA ready** con manifest.json
- **Responsive design**

## Tecnologías

- [Astro 5](https://astro.build/) - Static Site Generator
- [React 19](https://react.dev/) - UI Components
- [TypeScript](https://www.typescriptlang.org/) - Type Safety
- [GitHub API](https://api.github.com/) - Fetch repo data

## Ebooks Disponibles

### Backend
- Curso de Django
- Curso de Django y React
- Curso de FastAPI
- Curso de C#

### Frontend
- Curso de Next.js
- Aprendiendo React
- Curso de JavaScript
- Curso de HTML5 y CSS3

### DevOps
- Administración de Servidores Linux
- Curso de Docker

### Mobile
- Flutter Avanzado
- Curso de Dart

### Otros
- Desarrollo de Software Seguro
- Curso de Neovim
- Accesibilidad Web
- Data Science en Python

## Desarrollo

```bash
# Instalar dependencias
npm install

# Servidor de desarrollo
npm run dev

# Build para producción
npm run build

# Preview del build
npm run preview

# Actualizar datos de GitHub
npm run fetch-data
```

## Deploy

El proyecto está configurado para deployar en GitHub Pages:

- **URL**: https://statick88.github.io/ebooks/
- **Base path**: `/ebooks`

## Estructura del Proyecto

```
ebooks/
├── src/
│   ├── components/     # Componentes React y Astro
│   ├── data/           # JSON con metadata de ebooks
│   ├── layouts/        # Layout principal
│   ├── pages/          # Páginas y rutas
│   ├── styles/         # CSS global
│   └── types/          # Tipos TypeScript
├── public/             # Archivos estáticos
├── scripts/            # Scripts de build
└── astro.config.mjs    # Configuración de Astro
```

## Autor

**Diego Medardo Saavedra García**
- GitHub: [@statick88](https://github.com/statick88)
- Portfolio: [statick88.github.io](https://statick88.github.io)

## Licencia

MIT
