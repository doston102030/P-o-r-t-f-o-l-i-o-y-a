import { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import './Navbar.css';

const GlobeIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);

export default function Navbar() {
  const { language, setLanguage, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('home');
  const [langOpen, setLangOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { key: 'nav.home', href: '#home' },
    { key: 'nav.about', href: '#about' },
    { key: 'nav.skills', href: '#skills' },
    { key: 'nav.projects', href: '#projects' },
    { key: 'nav.contact', href: '#contact' },
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const close = () => {
      setLangOpen(false);
      setMenuOpen(false);
    };
    if (langOpen || menuOpen) document.addEventListener('click', close);
    return () => document.removeEventListener('click', close);
  }, [langOpen, menuOpen]);

  const toggleMenu = (e) => {
    e.stopPropagation();
    setMenuOpen(!menuOpen);
    setLangOpen(false);
  };

  return (
    <header className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-container container">
        <a href="#home" className="nav-logo">
          <span className="logo-bracket">&lt;</span>
          AX
          <span className="logo-bracket">/&gt;</span>
        </a>

        <nav className={`nav-links ${menuOpen ? 'nav-links--open' : ''}`}>
          {navLinks.map((link) => (
            <a
              key={link.key}
              href={link.href}
              className={`nav-link ${active === link.href.replace('#', '') ? 'nav-link--active' : ''}`}
              onClick={() => {
                setActive(link.href.replace('#', ''));
                setMenuOpen(false);
              }}
            >
              {t(link.key)}
            </a>
          ))}
        </nav>

        {/* Controls */}
        <div className="nav-controls">
          {/* Language Dropdown */}
          <div className="lang-dropdown" onClick={(e) => e.stopPropagation()}>
            <button
              className="lang-current"
              onClick={() => setLangOpen(!langOpen)}
              aria-label="Change language"
            >
              <GlobeIcon />
              <span className="lang-code">{language.toUpperCase()}</span>
              <svg className={`lang-chevron ${langOpen ? 'open' : ''}`} width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>
            {langOpen && (
              <div className="lang-menu">
                {['uz', 'ru', 'en'].map((lang) => (
                  <button
                    key={lang}
                    className={`lang-option ${language === lang ? 'lang-option--active' : ''}`}
                    onClick={() => { setLanguage(lang); setLangOpen(false); }}
                  >
                    <span>{lang.toUpperCase()}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Theme Toggle */}
          <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
            {theme === 'dark' ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="5" />
                <line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" />
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                <line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" />
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
              </svg>
            )}
          </button>

          {/* Mobile Menu Toggle Button */}
          <button className={`nav-menu-btn ${menuOpen ? 'active' : ''}`} onClick={toggleMenu} aria-label="Menu">
            <span className="btn-line"></span>
            <span className="btn-line"></span>
            <span className="btn-line"></span>
          </button>
        </div>
      </div>
    </header>
  );
}
