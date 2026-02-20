export const translations = {
  es: {
    // Hero
    hero: {
      title: "Portafolio de Ebooks",
      subtitle: "Cursos y materiales educativos creados a lo largo de mi carrera como desarrollador y educador."
    },
    // Filters
    filters: {
      search: "Buscar ebooks...",
      filterBy: "Filtrar por:",
      category: "Categoría",
      level: "Nivel",
      allCategories: "Todas las categorías",
      allLevels: "Todos los niveles",
      clear: "Limpiar",
      clearFilters: "Limpiar filtros"
    },
    // Sort
    sort: {
      sortBy: "Ordenar por:",
      yearDesc: "Más reciente",
      yearAsc: "Más antiguo",
      nameAsc: "Nombre A-Z",
      nameDesc: "Nombre Z-A",
      starsDesc: "Más populares"
    },
    // Results
    results: {
      single: "ebook encontrado",
      plural: "ebooks encontrados",
      noResults: "No se encontraron ebooks con los filtros actuales"
    },
    // Card
    card: {
      viewEbook: "Ver Ebook",
      code: "Código",
      published: "Publicado",
      stars: "estrellas"
    },
    // Detail page
    detail: {
      backToPortfolio: "Volver al portafolio",
      viewOnline: "Ver Ebook Online",
      viewCode: "Ver Código en GitHub",
      publishedOn: "Publicado en GitHub Pages",
      lastUpdated: "Última actualización",
      relatedEbooks: "Ebooks relacionados",
      noRelated: "No hay ebooks relacionados"
    },
    // Categories
    categories: {
      Backend: "Backend",
      Frontend: "Frontend",
      DevOps: "DevOps",
      Mobile: "Mobile",
      Data: "Data Science",
      Other: "Otros"
    },
    // Levels
    levels: {
      Básico: "Básico",
      Intermedio: "Intermedio",
      Avanzado: "Avanzado"
    },
    // Footer
    footer: {
      createdBy: "Creado por"
    },
    // 404
    notFound: {
      title: "Página no encontrada",
      description: "La página que buscas no existe o ha sido movida.",
      backHome: "Volver al inicio"
    }
  },
  en: {
    // Hero
    hero: {
      title: "Ebooks Portfolio",
      subtitle: "Courses and educational materials created throughout my career as a developer and educator."
    },
    // Filters
    filters: {
      search: "Search ebooks...",
      filterBy: "Filter by:",
      category: "Category",
      level: "Level",
      allCategories: "All categories",
      allLevels: "All levels",
      clear: "Clear",
      clearFilters: "Clear filters"
    },
    // Sort
    sort: {
      sortBy: "Sort by:",
      yearDesc: "Newest first",
      yearAsc: "Oldest first",
      nameAsc: "Name A-Z",
      nameDesc: "Name Z-A",
      starsDesc: "Most popular"
    },
    // Results
    results: {
      single: "ebook found",
      plural: "ebooks found",
      noResults: "No ebooks found with current filters"
    },
    // Card
    card: {
      viewEbook: "View Ebook",
      code: "Code",
      published: "Published",
      stars: "stars"
    },
    // Detail page
    detail: {
      backToPortfolio: "Back to portfolio",
      viewOnline: "View Ebook Online",
      viewCode: "View Code on GitHub",
      publishedOn: "Published on GitHub Pages",
      lastUpdated: "Last updated",
      relatedEbooks: "Related ebooks",
      noRelated: "No related ebooks"
    },
    // Categories
    categories: {
      Backend: "Backend",
      Frontend: "Frontend",
      DevOps: "DevOps",
      Mobile: "Mobile",
      Data: "Data Science",
      Other: "Other"
    },
    // Levels
    levels: {
      Básico: "Beginner",
      Intermedio: "Intermediate",
      Avanzado: "Advanced"
    },
    // Footer
    footer: {
      createdBy: "Created by"
    },
    // 404
    notFound: {
      title: "Page not found",
      description: "The page you're looking for doesn't exist or has been moved.",
      backHome: "Back to home"
    }
  }
};

export type TranslationKey = keyof typeof translations.es;
export type Lang = 'es' | 'en';
