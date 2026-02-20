interface HeaderProps {
  title?: string;
}

export default function Header({ title = 'Ebooks' }: HeaderProps) {
  return (
    <header className="site-header">
      <div className="header-container">
        <div className="header-left">
          <a href="/" className="logo">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
              <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
            </svg>
            <span>{title}</span>
          </a>
        </div>
        
        <nav className="header-nav">
          <a href="https://statick88.github.io" target="_blank" rel="noopener noreferrer" className="nav-link">
            Portfolio
          </a>
          <a href="https://github.com/statick88" target="_blank" rel="noopener noreferrer" className="nav-link">
            GitHub
          </a>
        </nav>
      </div>
    </header>
  );
}
