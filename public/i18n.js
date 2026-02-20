/**
 * Sistema de internacionalización (i18n) para Ebooks Portfolio
 * Archivo separado para mejor mantenimiento
 */
window.i18n = {
  translations: {
    es: {
      hero: {
        title: "Portafolio de Ebooks",
        subtitle: "Cursos y materiales educativos creados a lo largo de mi carrera como desarrollador y educador."
      },
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
      sort: {
        sortBy: "Ordenar por:",
        yearDesc: "Más reciente",
        yearAsc: "Más antiguo",
        nameAsc: "Nombre A-Z",
        nameDesc: "Nombre Z-A",
        starsDesc: "Más populares"
      },
      results: {
        single: "ebook encontrado",
        plural: "ebooks encontrados",
        noResults: "No se encontraron ebooks con los filtros actuales"
      },
      card: {
        viewEbook: "Ver Ebook",
        code: "Código",
        published: "Publicado",
        stars: "estrellas"
      },
      detail: {
        backToPortfolio: "Volver al portafolio",
        viewOnline: "Ver Ebook Online",
        viewCode: "Ver Código en GitHub",
        publishedOn: "Publicado en GitHub Pages",
        lastUpdated: "Última actualización",
        relatedEbooks: "Ebooks relacionados",
        noRelated: "No hay ebooks relacionados"
      },
      categories: {
        Backend: "Backend",
        Frontend: "Frontend",
        DevOps: "DevOps",
        Mobile: "Mobile",
        Data: "Data Science",
        Other: "Otros"
      },
      levels: {
        Básico: "Básico",
        Intermedio: "Intermedio",
        Avanzado: "Avanzado"
      },
      footer: {
        createdBy: "Creado por"
      },
      notFound: {
        title: "Página no encontrada",
        description: "La página que buscas no existe o ha sido movida.",
        backHome: "Volver al inicio"
      }
    },
    en: {
      hero: {
        title: "Ebooks Portfolio",
        subtitle: "Courses and educational materials created throughout my career as a developer and educator."
      },
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
      sort: {
        sortBy: "Sort by:",
        yearDesc: "Newest first",
        yearAsc: "Oldest first",
        nameAsc: "Name A-Z",
        nameDesc: "Name Z-A",
        starsDesc: "Most popular"
      },
      results: {
        single: "ebook found",
        plural: "ebooks found",
        noResults: "No ebooks found with current filters"
      },
      card: {
        viewEbook: "View Ebook",
        code: "Code",
        published: "Published",
        stars: "stars"
      },
      detail: {
        backToPortfolio: "Back to portfolio",
        viewOnline: "View Ebook Online",
        viewCode: "View Code on GitHub",
        publishedOn: "Published on GitHub Pages",
        lastUpdated: "Last updated",
        relatedEbooks: "Related ebooks",
        noRelated: "No related ebooks"
      },
      categories: {
        Backend: "Backend",
        Frontend: "Frontend",
        DevOps: "DevOps",
        Mobile: "Mobile",
        Data: "Data Science",
        Other: "Other"
      },
      levels: {
        Básico: "Beginner",
        Intermedio: "Intermediate",
        Avanzado: "Advanced"
      },
      footer: {
        createdBy: "Created by"
      },
      notFound: {
        title: "Page not found",
        description: "The page you're looking for doesn't exist or has been moved.",
        backHome: "Back to home"
      }
    }
  },

  getNestedValue(obj, path) {
    if (!obj || !path) return undefined;
    return path.split('.').reduce((current, key) => {
      if (current && typeof current === 'object' && key in current) {
        return current[key];
      }
      return undefined;
    }, obj);
  },

  t(key, lang) {
    const currentLang = lang || document.documentElement.getAttribute('lang') || 'es';
    const translations = this.translations[currentLang] || this.translations.es;
    return this.getNestedValue(translations, key) || key;
  },

  updateContent(lang) {
    const t = this.translations[lang];
    if (!t) return;

    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (!key) return;
      const value = this.getNestedValue(t, key);
      if (value !== undefined) {
        if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
          el.placeholder = value;
        } else {
          el.textContent = value;
        }
      }
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      if (!key) return;
      const value = this.getNestedValue(t, key);
      if (value !== undefined) {
        el.placeholder = value;
      }
    });

    document.querySelectorAll('[data-i18n-aria]').forEach(el => {
      const key = el.getAttribute('data-i18n-aria');
      if (!key) return;
      const value = this.getNestedValue(t, key);
      if (value !== undefined) {
        el.setAttribute('aria-label', value);
      }
    });

    document.querySelectorAll('[data-i18n-title]').forEach(el => {
      const key = el.getAttribute('data-i18n-title');
      if (!key) return;
      const value = this.getNestedValue(t, key);
      const suffix = el.getAttribute('data-i18n-title-suffix');
      if (value !== undefined) {
        el.setAttribute('title', suffix ? `${value}: ${suffix}` : value);
      }
    });
  },

  init() {
    const lang = document.documentElement.getAttribute('lang') || 'es';

    const doUpdate = () => {
      try {
        this.updateContent(lang);
      } catch (e) {
        console.error('i18n updateContent error:', e.message);
      }
    };

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', doUpdate, { once: true });
    } else {
      requestAnimationFrame(() => {
        requestAnimationFrame(doUpdate);
      });
    }

    window.addEventListener('langchange', (event) => {
      try {
        this.updateContent(event.detail.lang);
      } catch (e) {
        console.error('i18n langchange error:', e.message);
      }
    });
  }
};

// Auto-inicializar cuando el DOM esté listo
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => window.i18n.init());
} else {
  window.i18n.init();
}
