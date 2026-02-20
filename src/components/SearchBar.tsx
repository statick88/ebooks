import { useState, useEffect } from 'react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchBar({ value, onChange }: SearchBarProps) {
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
    <div className="search-container">
      <svg
        className="search-icon"
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
      <input
        type="text"
        className="search-input"
        placeholder={lang === 'es' ? 'Buscar ebooks...' : 'Search ebooks...'}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      {value && (
        <button 
          className="search-clear" 
          onClick={() => onChange('')} 
          aria-label={lang === 'es' ? 'Limpiar' : 'Clear'}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      )}
    </div>
  );
}
