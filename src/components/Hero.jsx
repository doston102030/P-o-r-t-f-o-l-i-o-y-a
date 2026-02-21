import { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import { db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import './Hero.css';

export default function Hero({ onPortalOpen }) {
  const { t } = useLanguage();
  const { theme } = useTheme();
  const [fsData, setFsData] = useState(null);

  useEffect(() => {
    getDoc(doc(db, 'portfolio', 'hero')).then(snap => {
      if (snap.exists()) setFsData(snap.data());
    }).catch(err => console.error("Firestore error:", err));
  }, []);

  if (!fsData) return <section className="hero section" id="home" style={{ minHeight: '100vh' }} />;

  const val = (fsKey, tKey) => (fsData && fsData[fsKey]) || t(tKey);

  return (
    <section className="hero section" id="home">
      {/* Background orbs */}
      <div className="hero-orb hero-orb--1" />
      <div className="hero-orb hero-orb--2" />
      <div className="hero-orb hero-orb--3" />

      <div className="container hero-container">
        {/* LEFT CONTENT */}
        <div className="hero-content">


          <h1 className="hero-name animate-fade-up delay-1">
            {val('name1', 'Adhamjonov')}<br />
            <span className="gradient-text">{val('name2', 'Doston')}</span>
          </h1>

          <div className="hero-role-wrapper animate-fade-up delay-2">
            <div className="premium-badge">
              <span className="badge-glow" />
              <span className="badge-text">
                {val('role', 'hero.role').split('').map((char, i) => (
                  <span key={i} className="letter">{char === ' ' ? '\u00A0' : char}</span>
                ))}
              </span>
            </div>
          </div>

          <div className="hero-tagline-mega animate-fade-up delay-3">
            {[
              { icon: '⚡', text: t('hero.tagline').split('.')[0], color: 'emerald' },
              { icon: '💎', text: t('hero.tagline').split('.')[1], color: 'sky' },
              { icon: '🚀', text: t('hero.tagline').split('.')[2], color: 'amber' }
            ].map((item, idx) => item.text && (
              <div key={idx} className={`tagline-card card-${item.color}`}>
                <span className="card-icon">{item.icon}</span>
                <p className="card-text">{item.text.trim()}</p>
                <div className="card-shine" />
              </div>
            ))}
          </div>

          <div className="hero-actions animate-fade-up delay-4">
            <a href={fsData.cvUrl || "/cv.pdf"} download="Adhamjonov_Doston_CV.pdf" className="btn-primary">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" />
              </svg>
              {t('hero.downloadCv')}
            </a>
            <a href="#contact" className="btn-outline">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 12a19.79 19.79 0 01-3.07-8.67A2 2 0 012 1.18h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
              </svg>
              {t('hero.contactMe')}
            </a>

          </div>

          <div className="hero-stack animate-fade-up delay-5">
            <span className="stack-label">Stack:</span>
            {(fsData?.stack ? fsData.stack.split(',').map(s => s.trim()) : ['React', 'TypeScript', 'Tailwind']).map(tech => (
              <span key={tech} className={`stack-pill pill-${tech.toLowerCase().replace('.', '').replace(/\s+/g, '')}`}>{tech}</span>
            ))}
          </div>
        </div>

        {/* RIGHT: AVATAR */}
        <div className="hero-visual animate-fade-up delay-3">
          <div className="hero-avatar-wrapper">
            <div className="hero-avatar-ring" />
            <div className="hero-avatar-ring hero-avatar-ring--2" />
            <div className="hero-avatar">
              <div className="hero-avatar-inner">
                {fsData.avatarUrl ? (
                  <img src={fsData.avatarUrl} alt="Profile" className="hero-img" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  <div className="illustration-wrapper">
                    {/* Local Image Fallback */}
                    <img
                      src="/avatar.jpg"
                      alt="Profile"
                      className="hero-img local-avatar"
                      style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', inset: 0, zIndex: 5 }}
                      onLoad={(e) => {
                        const placeholder = e.target.parentElement.querySelector('.avatar-placeholder');
                        if (placeholder) placeholder.style.opacity = '0';
                      }}
                      onError={(e) => e.target.style.display = 'none'}
                    />

                    {/* Theme-based Illustration (Optional) */}
                    <div className={`hero-illustration ${theme}`}>
                      <img src="/hero-day.png" alt="" className="illustration-img day" onError={(e) => e.target.style.display = 'none'} />
                      <img src="/hero-night.png" alt="" className="illustration-img night" onError={(e) => e.target.style.display = 'none'} />
                    </div>

                    {/* Initials Placeholder - only visible if image fails */}
                    <div className="avatar-placeholder" style={{ transition: 'opacity 0.6s ease' }}>
                      <div className="placeholder-glow" />
                      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="avatar-svg">
                        <circle cx="50" cy="38" r="20" fill="#6382ff" opacity="0.3" />
                        <ellipse cx="50" cy="85" rx="30" ry="20" fill="#6382ff" opacity="0.2" />
                      </svg>
                      <span className="avatar-initials">{val('initials', 'DA')}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
            {/* floating badges */}
            <div className="avatar-badge avatar-badge--tl">
              <span>⚡</span> {val('badgeTL', 'hero.dev')}
            </div>
            <div className="avatar-badge avatar-badge--br">
              <span>🏆</span> {val('badgeBR', 'hero.years')}
            </div>
          </div>

        </div>
      </div>

      {/* Floating AI Portal Trigger */}
      <button className="btn-portal-floating" onClick={onPortalOpen}>
        <div className="btn-portal-glow" />
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 3c.3 1.3 1.2 2.2 2.5 2.5a3 3 0 0 1 0 5c-1.3.3-2.2 1.2-2.5 2.5a3 3 0 0 1-5 0c-.3-1.3-1.2-2.2-2.5-2.5a3 3 0 0 1 0-5c1.3-.3 2.2-1.2 2.5-2.5a3 3 0 0 1 5 0z" />
          <path d="M19 13c.3 1.3 1.2 2.2 2.5 2.5a3 3 0 0 1 0 5c-1.3.3-2.2 1.2-2.5 2.5a3 3 0 0 1-5 0c-.3-1.3-1.2-2.2-2.5-2.5a3 3 0 0 1 0-5c1.3-.3 2.2-1.2 2.5-2.5a3 3 0 0 1 5 0z" opacity="0.6" />
        </svg>
        <span>Top AI</span>
      </button>
    </section>
  );
}
