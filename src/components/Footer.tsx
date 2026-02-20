export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-container">
        <p>
          <span data-i18n="footer.createdBy">Creado por</span>{' '}
          <a href="https://github.com/statick88" target="_blank" rel="noopener noreferrer">
            Diego Saavedra
          </a>
          {' '}· {new Date().getFullYear()}
        </p>
        <div className="footer-links">
          <a href="https://statick88.github.io" target="_blank" rel="noopener noreferrer">
            Portfolio
          </a>
          <a href="https://github.com/statick88" target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
          <a href="https://linkedin.com/in/diego-saavedra-developer" target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
}
