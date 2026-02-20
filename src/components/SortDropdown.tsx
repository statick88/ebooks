interface SortDropdownProps {
  value: string;
  onChange: (value: string) => void;
}

type SortOption = 'year-desc' | 'year-asc' | 'name-asc' | 'name-desc' | 'stars-desc';

const sortOptions: { value: SortOption; labelEs: string; labelEn: string; i18nKey: string }[] = [
  { value: 'year-desc', labelEs: 'Más reciente', labelEn: 'Newest first', i18nKey: 'sort.yearDesc' },
  { value: 'year-asc', labelEs: 'Más antiguo', labelEn: 'Oldest first', i18nKey: 'sort.yearAsc' },
  { value: 'name-asc', labelEs: 'Nombre A-Z', labelEn: 'Name A-Z', i18nKey: 'sort.nameAsc' },
  { value: 'name-desc', labelEs: 'Nombre Z-A', labelEn: 'Name Z-A', i18nKey: 'sort.nameDesc' },
  { value: 'stars-desc', labelEs: 'Más populares', labelEn: 'Most popular', i18nKey: 'sort.starsDesc' },
];

export default function SortDropdown({ value, onChange }: SortDropdownProps) {
  return (
    <div className="sort-dropdown">
      <label className="sort-label" data-i18n="sort.sortBy">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="4" y1="6" x2="11" y2="6" />
          <line x1="4" y1="12" x2="15" y2="12" />
          <line x1="4" y1="18" x2="20" y2="18" />
          <polyline points="15 3 18 6 15 9" />
          <polyline points="9 15 6 18 9 21" />
        </svg>
        Ordenar por:
      </label>
      <select 
        className="sort-select"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {sortOptions.map((option) => (
          <option key={option.value} value={option.value} data-i18n={option.i18nKey}>
            {option.labelEs}
          </option>
        ))}
      </select>
    </div>
  );
}
