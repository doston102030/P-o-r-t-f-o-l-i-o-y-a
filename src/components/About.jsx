import { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import './About.css';

export default function About() {
  const { t } = useLanguage();
  const [fsData, setFsData] = useState(null);

  useEffect(() => {
    getDoc(doc(db, 'portfolio', 'about')).then(snap => {
      if (snap.exists()) setFsData(snap.data());
    }).catch(err => console.error("Firestore error:", err));
  }, []);

  if (!fsData) return <section className="section about-section" id="about" style={{ minHeight: '600px' }} />;

  const val = (fsKey, tKey) => (fsData && fsData[fsKey]) || t(tKey);

  const stats = [
    { value: fsData?.stat1Value || '3+', labelKey: fsData?.stat1Label || 'about.stats.exp', icon: '⚡', isRawLabel: !!fsData?.stat1Label },
    { value: fsData?.stat2Value || '40+', labelKey: fsData?.stat2Label || 'about.stats.projects', icon: '🚀', isRawLabel: !!fsData?.stat2Label },
    { value: fsData?.stat3Value || '25+', labelKey: fsData?.stat3Label || 'about.stats.clients', icon: '🏆', isRawLabel: !!fsData?.stat3Label },
    { value: fsData?.stat4Value || '99%', labelKey: fsData?.stat4Label || 'about.stats.satisfaction', icon: '⭐', isRawLabel: !!fsData?.stat4Label },
  ];

  const highlights = t('about.highlights');

  return (
    <section className="section about-section" id="about">
      <div className="about-glow-orbs">
        <div className="orb orb-1" />
        <div className="orb orb-2" />
      </div>
      <div className="container">
        <div className="about-grid">
          {/* LEFT: IMAGE CARD */}
          <div className="about-visual animate-fade-up">
            <div className="about-card mega-card">
              <div className="card-shine" />
              <div className="card-glow-orb" />
              <div className="card-aura" />

              <div className="about-card-avatar">
                <span>DA</span>
              </div>
              <div className="about-card-info">
                <h4>{val('cardName', 'Adhamjonov Doston')}</h4>
                <p>{val('cardRole', 'Frontend Developer')}</p>
                <div className="about-card-location">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  {val('cardLocation', 'Tashkent, Uzbekistan')}
                </div>
              </div>
              <div className="about-card-badges">
                <span>{val('cardBadge1', 'Open to work')}</span>
                <span>{val('cardBadge2', 'Remote OK')}</span>
              </div>
            </div>
          </div>

          {/* RIGHT: TEXT */}
          <div className="about-content animate-fade-up delay-2">
            <p className="section-tag">{t('about.tag')}</p>
            <h2 className="section-title">
              {t('about.title')} <br />
              <span className="gradient-text">{t('about.titleGradient')}</span>
            </h2>

            {[val('text1', 'about.text1'), val('text2', 'about.text2')].map((text, i) => (
              text.split('\n').map((p, j) => p.trim() && (
                <p key={`${i}-${j}`} className="about-text">{p}</p>
              ))
            ))}

            <div className="about-highlights">
              {Array.isArray(highlights) && highlights.map((h, i) => (
                <div key={h} className={`highlight-item h-item-${i % 4}`}>
                  <div className="highlight-shine" />
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>{h}</span>
                </div>
              ))}
            </div>

            <a href="#contact" className="btn-primary" style={{ marginTop: '8px', display: 'inline-flex' }}>
              {t('about.btn')}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </div>

        {/* STATS */}
        <div className="about-stats animate-fade-up delay-3">
          {stats.map((s, idx) => (
            <div key={s.labelKey} className={`stat-card-mega s-card-${idx}`}>
              <div className="stat-shine" />
              <div className="stat-icon">{s.icon}</div>
              <div className="stat-value">{s.value}</div>
              <div className="stat-label">{s.isRawLabel ? s.labelKey : t(s.labelKey)}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
