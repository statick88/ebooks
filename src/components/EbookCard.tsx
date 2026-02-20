import { useState, useEffect } from 'react';
import type { Ebook } from '../types/ebook';

interface EbookCardProps {
  ebook: Ebook;
  index?: number;
}

export default function EbookCard({ ebook, index = 0 }: EbookCardProps) {
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
    <article 
      className="ebook-card"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <div className="ebook-card-header">
        <a href={`/ebook/${ebook.id}`} className="ebook-card-title-link">
          <h3 className="ebook-card-title">{ebook.title}</h3>
        </a>
        <div className="ebook-card-badges">
          {ebook.hasPages && <span className="badge">{lang === 'es' ? 'Publicado' : 'Published'}</span>}
          {ebook.stars !== undefined && ebook.stars > 0 && (
            <span className="badge badge-stars">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
              {ebook.stars}
            </span>
          )}
        </div>
      </div>
      
      <p className="ebook-card-description">{ebook.description}</p>
      
      <div className="ebook-card-tags">
        {ebook.tags.slice(0, 4).map((tag) => (
          <span key={tag} className="tag">
            {tag}
          </span>
        ))}
      </div>
      
      <div className="ebook-card-footer">
        <div className="ebook-card-meta">
          {ebook.language && (
            <span className="meta-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                <polyline points="14 2 14 8 20 8" />
              </svg>
              {ebook.language}
            </span>
          )}
          <span className="meta-item">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            {ebook.year}
          </span>
          {ebook.lastUpdated && (
            <span 
              className="meta-item meta-updated" 
              title={lang === 'es' ? `Última actualización: ${ebook.lastUpdated}` : `Last updated: ${ebook.lastUpdated}`}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
            </span>
          )}
        </div>
        
        <div className="ebook-card-actions">
          {ebook.hasPages && ebook.pagesUrl && (
            <a
              href={ebook.pagesUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary btn-sm"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
              <span>{lang === 'es' ? 'Ver Ebook' : 'View Ebook'}</span>
            </a>
          )}
          <a
            href={ebook.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-github btn-sm"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            <span>{lang === 'es' ? 'Código' : 'Code'}</span>
          </a>
        </div>
      </div>
    </article>
  );
}
