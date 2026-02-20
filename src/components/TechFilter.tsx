import { useState, useEffect } from 'react';

interface TechFilterProps {
  tags: string[];
  activeTags: string[];
  onTagClick: (tag: string) => void;
}

export default function TechFilter({ tags, activeTags, onTagClick }: TechFilterProps) {
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
    <div className="tech-filter">
      <span className="filter-label">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
        </svg>
        {lang === 'es' ? 'Filtrar por:' : 'Filter by:'}
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
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
            {lang === 'es' ? 'Limpiar' : 'Clear'}
          </button>
        )}
      </div>
    </div>
  );
}
