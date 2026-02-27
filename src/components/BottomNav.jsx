import { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import './BottomNav.css';

const navItems = [
    { id: 'home', icon: 'home', href: '#home' },
    { id: 'about', icon: 'user', href: '#about' },
    { id: 'skills', icon: 'code', href: '#skills' },
    { id: 'projects', icon: 'briefcase', href: '#projects' },
    { id: 'contact', icon: 'mail', href: '#contact' },
];

const navIcons = {
    home: () => (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 9.5L12 3L21 9.5V19C21 20.1 20.1 21 19 21H15V13H9V21H5C3.9 21 3 20.1 3 19V9.5Z" />
        </svg>
    ),
    user: () => (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="8" r="4" />
            <path d="M6 21v-1a6 6 0 0 1 12 0v1" />
        </svg>
    ),
    code: () => (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="16 18 22 12 16 6" />
            <polyline points="8 6 2 12 8 18" />
        </svg>
    ),
    briefcase: () => (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="7" width="20" height="14" rx="2" />
            <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
        </svg>
    ),
    mail: () => (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="4" width="20" height="16" rx="2" />
            <path d="M22 6L12 13L2 6" />
        </svg>
    ),
};

export default function BottomNav() {
    const { t } = useLanguage();
    const [active, setActive] = useState('home');

    useEffect(() => {
        const observerOptions = {
            root: null,
            rootMargin: '-40% 0px -40% 0px',
            threshold: 0
        };

        const handleIntersect = (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setActive(entry.target.id);
                }
            });
        };

        const observer = new IntersectionObserver(handleIntersect, observerOptions);

        navItems.forEach((item) => {
            const section = document.querySelector(item.href);
            if (section) observer.observe(section);
        });

        return () => observer.disconnect();
    }, []);

    return (
        <nav className="bottom-nav">
            <div className="bottom-nav-container">
                {navItems.map((item) => (
                    <a
                        key={item.id}
                        href={item.href}
                        className={`bottom-nav-item ${active === item.id ? 'active' : ''}`}
                        onClick={() => setActive(item.id)}
                    >
                        <span className="bottom-nav-icon">
                            {navIcons[item.icon]()}
                        </span>
                        <span className="bottom-nav-label">{t(`nav.${item.id}`)}</span>
                    </a>
                ))}
            </div>
        </nav>
    );
}
