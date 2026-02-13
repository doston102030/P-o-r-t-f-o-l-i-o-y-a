import { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import './Projects.css';

const defaultProjects = [
  {
    id: 1,
    title: 'ShopVibe E-Commerce',
    description: 'A full-featured e-commerce platform with cart, payment integration, and admin dashboard. Real-time inventory management.',
    tags: ['React', 'Next.js', 'TypeScript', 'Stripe', 'Tailwind'],
    demo: '#',
    github: '#',
    featured: true,
    emoji: '🛍️',
  },
  {
    id: 2,
    title: 'TaskFlow Dashboard',
    description: 'Project management tool with drag-and-drop boards, team collaboration, and analytics charts.',
    tags: ['React', 'Redux', 'REST API', 'Chart.js'],
    demo: '#',
    github: '#',
    featured: false,
    emoji: '📊',
  },
  {
    id: 3,
    title: 'WeatherApp Pro',
    description: 'Beautiful weather application with 7-day forecasts, interactive maps, and location-based alerts.',
    tags: ['React', 'TypeScript', 'OpenWeather API', 'CSS'],
    demo: '#',
    github: '#',
    featured: false,
    emoji: '🌤️',
  },
];

export default function Projects() {
  const { t } = useLanguage();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDoc(doc(db, 'portfolio', 'projects')).then(snap => {
      if (snap.exists() && snap.data().items) {
        setProjects(snap.data().items);
      } else {
        setProjects(defaultProjects);
      }
      setLoading(false);
    }).catch(err => {
      console.error("Firestore error:", err);
      setProjects(defaultProjects);
      setLoading(false);
    });
  }, []);

  if (loading) return <section className="section projects-section" id="projects" style={{ minHeight: '400px' }} />;

  const handleMouseMove = (e, id) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty('--x', `${x}px`);
    card.style.setProperty('--y', `${y}px`);
  };

  return (
    <section className="section projects-section" id="projects">
      <div className="mesh-bg" />
      <div className="container">
        <div className="section-header animate-fade-up">
          <p className="section-tag">{t('projects.tag')}</p>
          <h2 className="section-title">
            {t('projects.title')} <span className="gradient-text">{t('projects.titleGradient')}</span>
          </h2>
          <p className="section-subtitle">
            {t('projects.subtitle')}
          </p>
        </div>

        {projects.length > 0 && (
          <div className="projects-grid">
            {projects.map((p, i) => (
              <div
                key={p.id}
                className={`project-card ${p.featured ? 'project-card--featured' : ''} animate-fade-up`}
                style={{ animationDelay: `${0.2 + (i * 0.1)}s` }}
                onMouseMove={(e) => handleMouseMove(e, p.id)}
              >
                {p.featured && <div className="featured-badge">⭐ {t('projects.featured')}</div>}

                {/* Card Meta / Image */}
                <div className="project-image-wrapper">
                  {p.imageUrl ? (
                    <img src={p.imageUrl} alt={p.title} className="project-main-image" />
                  ) : (
                    <div className="project-emoji-placeholder">
                      <span className="project-logo-circle">{p.emoji}</span>
                    </div>
                  )}
                  <div className="project-overlay-glow" />
                </div>

                {/* Content */}
                <div className="project-body">
                  <h3 className="project-title">{p.title}</h3>
                  <p className="project-desc">{p.description}</p>

                  {/* Tags */}
                  <div className="project-tags">
                    {(typeof p.tags === 'string' ? p.tags.split(',').map(s => s.trim()) : p.tags).map(tag => (
                      tag && <span key={tag} className="tag">{tag}</span>
                    ))}
                  </div>

                  {/* Action buttons */}
                  <div className="project-actions">
                    <a href={p.demo} target="_blank" rel="noreferrer" className="action-btn action-btn--primary">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <circle cx="12" cy="12" r="10" /><polygon points="10 8 16 12 10 16 10 8" />
                      </svg>
                      {t('projects.demo')}
                    </a>
                    <a href={p.github} target="_blank" rel="noreferrer" className="action-btn action-btn--outline">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                      </svg>
                      {t('projects.github')}
                    </a>
                  </div>
                </div>

                {/* Hover effect overlays */}
                <div className="card-glow" />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
