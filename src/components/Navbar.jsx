import { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import './Navbar.css';

const Gradients = () => (
  <svg style={{ height: 0, width: 0, position: 'absolute' }}>
    <defs>
      <linearGradient id="premium-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#6366f1" />
        <stop offset="100%" stopColor="#a855f7" />
      </linearGradient>
      <radialGradient id="sun-gradient" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#fbbf24" />
        <stop offset="100%" stopColor="#f59e0b" />
      </radialGradient>
      <radialGradient id="moon-gradient" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#e2e8f0" />
        <stop offset="100%" stopColor="#94a3b8" />
      </radialGradient>
    </defs>
  </svg>
);

const GlobeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="10" stroke="url(#premium-gradient)" strokeWidth="2" />
    <path d="M2.5 12H21.5" stroke="url(#premium-gradient)" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M12 2.5C14.5 5 16 8.5 16 12C16 15.5 14.5 19 12 21.5C9.5 19 8 15.5 8 12C8 8.5 9.5 5 12 2.5Z" stroke="url(#premium-gradient)" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const MoonIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z" fill="url(#moon-gradient)" stroke="#94a3b8" strokeWidth="0.5" />
    <circle cx="18" cy="7" r="1" fill="white" fillOpacity="0.4" />
    <circle cx="14" cy="4" r="0.5" fill="white" fillOpacity="0.3" />
  </svg>
);

const SunIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="5" fill="url(#sun-gradient)" />
    {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
      <line
        key={angle}
        x1="12" y1="3" x2="12" y2="1"
        stroke="#fbbf24" strokeWidth="2" strokeLinecap="round"
        transform={`rotate(${angle} 12 12)`}
      />
    ))}
  </svg>
);

export default function Navbar() {
  const { language, setLanguage, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('home');
  const [langOpen, setLangOpen] = useState(false);

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
    const close = () => setLangOpen(false);
    if (langOpen) document.addEventListener('click', close);
    return () => document.removeEventListener('click', close);
  }, [langOpen]);

  return (
    <header className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <Gradients />
      <div className="nav-container container">
        <a href="#home" className="nav-logo">
          <span className="logo-bracket">&lt;</span>
          Uzdev
          <span className="logo-bracket">&gt;</span>
        </a>

        <nav className="nav-links">
          {navLinks.map((link) => (
            <a
              key={link.key}
              href={link.href}
              className={`nav-link ${active === link.href.replace('#', '') ? 'nav-link--active' : ''}`}
              onClick={() => setActive(link.href.replace('#', ''))}
            >
              {t(link.key)}
            </a>
          ))}
        </nav>

        {/* Controls */}
        <div className="nav-controls controls-on-top">
          {/* Language Dropdown */}
          <div className="lang-dropdown" onClick={(e) => e.stopPropagation()}>
            <button
              className="lang-current premium-btn"
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
          <button className="theme-toggle premium-btn" onClick={toggleTheme} aria-label="Toggle theme">
            {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
          </button>

        </div>
      </div>
    </header>
  );
}
