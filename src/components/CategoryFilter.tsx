interface CategoryFilterProps {
  categories: string[];
  activeCategory: string | null;
  onCategoryChange: (category: string | null) => void;
}

// Category labels for SSR (will be replaced by i18n on client)
const categoryLabels: Record<string, { es: string; en: string }> = {
  Backend: { es: 'Backend', en: 'Backend' },
  Frontend: { es: 'Frontend', en: 'Frontend' },
  DevOps: { es: 'DevOps', en: 'DevOps' },
  Mobile: { es: 'Mobile', en: 'Mobile' },
  Data: { es: 'Data Science', en: 'Data Science' },
  Other: { es: 'Otros', en: 'Other' },
};

export default function CategoryFilter({ categories, activeCategory, onCategoryChange }: CategoryFilterProps) {
  return (
    <div className="category-filter">
      <label className="category-label" data-i18n="filters.category">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
        </svg>
        Categoría
      </label>
      <select
        className="category-select"
        value={activeCategory || ''}
        onChange={(e) => onCategoryChange(e.target.value || null)}
      >
        <option value="" data-i18n="filters.allCategories">
          Todas las categorías
        </option>
        {categories.map((category) => (
          <option key={category} value={category} data-i18n={`categories.${category}`}>
            {categoryLabels[category]?.es || category}
          </option>
        ))}
      </select>
    </div>
  );
}
