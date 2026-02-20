interface TechFilterProps {
  tags: string[];
  activeTags: string[];
  onTagClick: (tag: string) => void;
}

export default function TechFilter({ tags, activeTags, onTagClick }: TechFilterProps) {
  return (
    <div className="tech-filter">
      <span className="filter-label" data-i18n="filters.filterBy">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
        </svg>
        Filtrar por:
      </span>
      <div className="filter-tags">
        {tags.map((tag) => (
          <button
            key={tag}
            className={`tag ${activeTags.includes(tag) ? 'active' : ''}`}
            onClick={() => onTagClick(tag)}
          >
            {tag}
          </button>
        ))}
        {activeTags.length > 0 && (
          <button 
            className="clear-filter" 
            onClick={() => activeTags.forEach(t => onTagClick(t))}
            data-i18n="filters.clear"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
            Limpiar
          </button>
        )}
      </div>
    </div>
  );
}
