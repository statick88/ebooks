import { useState, useMemo, useCallback, useEffect } from 'react';
import type { Ebook } from '../types/ebook';
import EbookCard from './EbookCard';
import SearchBar from './SearchBar';
import TechFilter from './TechFilter';
import SortDropdown, { type SortOption } from './SortDropdown';
import CategoryFilter from './CategoryFilter';

interface EbookGridProps {
  ebooks: Ebook[];
}

export default function EbookGrid({ ebooks }: EbookGridProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [activeTags, setActiveTags] = useState<string[]>([]);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<SortOption>('year-desc');

  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Load preferences from localStorage (only on client)
  useEffect(() => {
    const savedSort = localStorage.getItem('ebook-sort') as SortOption;
    if (savedSort) setSortBy(savedSort);
  }, []);

  // Save sort preference
  useEffect(() => {
    localStorage.setItem('ebook-sort', sortBy);
  }, [sortBy]);

  const allTags = useMemo(() => {
    const tagSet = new Set<string>();
    ebooks.forEach((ebook) => {
      ebook.tags.forEach((tag) => tagSet.add(tag));
    });
    return Array.from(tagSet).sort();
  }, [ebooks]);

  const allCategories = useMemo(() => {
    const catSet = new Set<string>();
    ebooks.forEach((ebook) => {
      if (ebook.category) catSet.add(ebook.category);
    });
    return Array.from(catSet).sort();
  }, [ebooks]);

  const filteredAndSortedEbooks = useMemo(() => {
    let filtered = ebooks.filter((ebook) => {
      const matchesSearch =
        debouncedQuery === '' ||
        ebook.title.toLowerCase().includes(debouncedQuery.toLowerCase()) ||
        ebook.description.toLowerCase().includes(debouncedQuery.toLowerCase()) ||
        ebook.tags.some((tag) => tag.toLowerCase().includes(debouncedQuery.toLowerCase()));

      const matchesTags =
        activeTags.length === 0 || activeTags.every((tag) => ebook.tags.includes(tag));

      const matchesCategory = !activeCategory || ebook.category === activeCategory;

      return matchesSearch && matchesTags && matchesCategory;
    });

    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'year-desc':
          return b.year - a.year;
        case 'year-asc':
          return a.year - b.year;
        case 'name-asc':
          return a.title.localeCompare(b.title);
        case 'name-desc':
          return b.title.localeCompare(a.title);
        case 'stars-desc':
          return (b.stars || 0) - (a.stars || 0);
        default:
          return 0;
      }
    });

    return sorted;
  }, [ebooks, debouncedQuery, activeTags, activeCategory, sortBy]);

  const handleTagClick = useCallback((tag: string) => {
    setActiveTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  }, []);

  const clearFilters = useCallback(() => {
    setSearchQuery('');
    setActiveTags([]);
    setActiveCategory(null);
  }, []);

  return (
    <div className="ebook-grid-container">
      <div className="filters-section">
        <div className="filters-row">
          <SearchBar value={searchQuery} onChange={setSearchQuery} />
          <div className="filters-dropdowns">
            <CategoryFilter 
              categories={allCategories}
              activeCategory={activeCategory}
              onCategoryChange={setActiveCategory}
            />
            <SortDropdown 
              value={sortBy} 
              onChange={setSortBy}
            />
          </div>
        </div>
        <TechFilter 
          tags={allTags} 
          activeTags={activeTags} 
          onTagClick={handleTagClick}
        />
      </div>

      <div className="results-info">
        <span data-i18n-text={filteredAndSortedEbooks.length === 1 ? 'results.single' : 'results.plural'}>
          {filteredAndSortedEbooks.length} {filteredAndSortedEbooks.length === 1 ? 'ebook encontrado' : 'ebooks encontrados'}
        </span>
      </div>

      {filteredAndSortedEbooks.length > 0 ? (
        <div className="ebooks-grid">
          {filteredAndSortedEbooks.map((ebook, index) => (
            <EbookCard key={ebook.id} ebook={ebook} index={index} />
          ))}
        </div>
      ) : (
        <div className="no-results">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <p data-i18n="results.noResults">No se encontraron ebooks con los filtros actuales</p>
          <button className="btn" onClick={clearFilters} data-i18n="filters.clearFilters">
            Limpiar filtros
          </button>
        </div>
      )}
    </div>
  );
}
