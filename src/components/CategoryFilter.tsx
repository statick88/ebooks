import { useState, useEffect } from 'react';

interface CategoryFilterProps {
  categories: string[];
  activeCategory: string | null;
  onCategoryChange: (category: string | null) => void;
}

const categoryLabels: Record<string, { es: string; en: string }> = {
  Backend: { es: 'Backend', en: 'Backend' },
  Frontend: { es: 'Frontend', en: 'Frontend' },
  DevOps: { es: 'DevOps', en: 'DevOps' },
  Mobile: { es: 'Mobile', en: 'Mobile' },
  Data: { es: 'Data Science', en: 'Data Science' },
  Other: { es: 'Otros', en: 'Other' },
};

export default function CategoryFilter({ categories, activeCategory, onCategoryChange }: CategoryFilterProps) {
  const [lang, setLang] = useState<'es' | 'en'>('es');

  useEffect(() => {
    const currentLang = document.documentElement.getAttribute('lang') as 'es' | 'en' || 'es';
    setLang(currentLang);

    const handleLangChange = (e: Event) => {
      const customEvent = e as CustomEvent<{ lang: 'es' | 'en' }>;
      setLang(customEvent.detail.lang);
    };

    window.addEventListener('langchange', handleLangChange);
    return () => window.removeEventListener('langchange', handleLangChange);
  }, []);

  return (
    <div className="category-filter">
      <label className="category-label">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
        </svg>
        {lang === 'es' ? 'Categoría' : 'Category'}
      </label>
      <select
        className="category-select"
        value={activeCategory || ''}
        onChange={(e) => onCategoryChange(e.target.value || null)}
      >
        <option value="">
          {lang === 'es' ? 'Todas las categorías' : 'All categories'}
        </option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {categoryLabels[category]?.[lang] || category}
          </option>
        ))}
      </select>
    </div>
  );
}
