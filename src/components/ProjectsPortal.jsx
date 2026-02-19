import { useState, useEffect } from 'react';
import { db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import './ProjectsPortal.css';

const defaultProjects = [
    { id: 1, title: 'ShopVibe E-Commerce', imageUrl: '', emoji: '🛍️', demo: '#', tags: ['React', 'Next.js'] },
    { id: 2, title: 'TaskFlow Dashboard', imageUrl: '', emoji: '📊', demo: '#', tags: ['React', 'Redux'] },
    { id: 3, title: 'WeatherApp Pro', imageUrl: '', emoji: '🌤️', demo: '#', tags: ['React', 'API'] },
    { id: 4, title: 'Portfolio v1', imageUrl: '', emoji: '💼', demo: '#', tags: ['HTML', 'CSS'] },
];

export default function ProjectsPortal({ open, onClose }) {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        getDoc(doc(db, 'portfolio', 'projects')).then(snap => {
            if (snap.exists() && snap.data().items?.length > 0) {
                setProjects(snap.data().items);
            } else {
                setProjects(defaultProjects);
            }
        }).catch(() => setProjects(defaultProjects));
    }, []);

    useEffect(() => {
        if (open) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => { document.body.style.overflow = ''; };
    }, [open]);

    if (!open) return null;

    return (
        <div className="portal-backdrop" onClick={onClose}>
            {/* Close button */}
            <button className="portal-close" onClick={onClose}>✕</button>

            {/* Sphere */}
            <div className="portal-sphere-wrap" onClick={(e) => e.stopPropagation()}>
                {/* Glow rings */}
                <div className="portal-ring portal-ring--1" />
                <div className="portal-ring portal-ring--2" />
                <div className="portal-ring portal-ring--3" />

                <div className="portal-sphere">
                    <div className="portal-inner">
                        <p className="portal-label">✨ Mening loyihalarim</p>

                        <div className="portal-grid">
                            {projects.slice(0, 4).map((p, i) => (
                                <a
                                    key={p.id || i}
                                    href={p.demo || '#'}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="portal-card"
                                    style={{ animationDelay: `${i * 0.08}s` }}
                                >
                                    {p.imageUrl ? (
                                        <img src={p.imageUrl} alt={p.title} className="portal-card-img" />
                                    ) : (
                                        <div className="portal-card-placeholder">
                                            <span className="portal-card-emoji">{p.emoji || '🚀'}</span>
                                        </div>
                                    )}
                                    <div className="portal-card-info">
                                        <span className="portal-card-title">{p.title}</span>
                                        {p.tags && (
                                            <div className="portal-card-tags">
                                                {(typeof p.tags === 'string' ? p.tags.split(',').map(s => s.trim()) : p.tags)
                                                    .slice(0, 2).map(tag => (
                                                        <span key={tag} className="portal-card-tag">{tag}</span>
                                                    ))}
                                            </div>
                                        )}
                                    </div>
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
