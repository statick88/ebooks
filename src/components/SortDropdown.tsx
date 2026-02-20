import { useState, useEffect } from 'react';

export type SortOption = 'year-desc' | 'year-asc' | 'name-asc' | 'name-desc' | 'stars-desc';

interface SortDropdownProps {
  value: SortOption;
  onChange: (value: SortOption) => void;
}

const sortOptions: { value: SortOption; labelEs: string; labelEn: string }[] = [
  { value: 'year-desc', labelEs: 'Más reciente', labelEn: 'Newest first' },
  { value: 'year-asc', labelEs: 'Más antiguo', labelEn: 'Oldest first' },
  { value: 'name-asc', labelEs: 'Nombre A-Z', labelEn: 'Name A-Z' },
  { value: 'name-desc', labelEs: 'Nombre Z-A', labelEn: 'Name Z-A' },
  { value: 'stars-desc', labelEs: 'Más populares', labelEn: 'Most popular' },
];

export default function SortDropdown({ value, onChange }: SortDropdownProps) {
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
    <div className="sort-dropdown">
      <label className="sort-label">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="4" y1="6" x2="11" y2="6" />
          <line x1="4" y1="12" x2="15" y2="12" />
          <line x1="4" y1="18" x2="20" y2="18" />
          <polyline points="15 3 18 6 15 9" />
          <polyline points="9 15 6 18 9 21" />
        </svg>
        {lang === 'es' ? 'Ordenar por:' : 'Sort by:'}
      </label>
      <select 
        className="sort-select"
        value={value}
        onChange={(e) => onChange(e.target.value as SortOption)}
      >
        {sortOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {lang === 'es' ? option.labelEs : option.labelEn}
          </option>
        ))}
      </select>
    </div>
  );
}
