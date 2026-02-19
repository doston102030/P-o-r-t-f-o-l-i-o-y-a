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

const Gradients = () => (
    <svg style={{ height: 0, width: 0, position: 'absolute' }}>
        <defs>
            <linearGradient id="bottom-premium-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#6366f1" />
                <stop offset="100%" stopColor="#a855f7" />
            </linearGradient>
            <linearGradient id="active-bg-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#4f46e5" />
                <stop offset="100%" stopColor="#7c3aed" />
            </linearGradient>
            <filter id="icon-glow">
                <feGaussianBlur stdDeviation="1.5" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
        </defs>
    </svg>
);

const navIcons = {
    home: (active) => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 9.5L12 3L21 9.5V19C21 20.1046 20.1046 21 19 21H15V13H9V21H5C3.89543 21 3 20.1046 3 19V9.5Z"
                fill={active ? "url(#active-bg-gradient)" : "none"}
                stroke={active ? "none" : "url(#bottom-premium-gradient)"}
                strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                style={{ filter: active ? "drop-shadow(0 0 4px rgba(99, 102, 241, 0.4))" : "none" }}
            />
        </svg>
    ),
    user: (active) => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z"
                fill={active ? "url(#active-bg-gradient)" : "none"}
                stroke={active ? "none" : "url(#bottom-premium-gradient)"}
                strokeWidth="2" strokeLinejoin="round"
            />
            <path d="M6 21C6 17.134 9.13401 14 13 14H11C7.13401 14 4 17.134 4 21"
                stroke={active ? "white" : "url(#bottom-premium-gradient)"}
                strokeWidth="2" strokeLinecap="round"
            />
            <path d="M18 21C18 17.134 14.866 14 11 14"
                stroke={active ? "white" : "url(#bottom-premium-gradient)"}
                strokeWidth="2" strokeLinecap="round"
            />
        </svg>
    ),
    code: (active) => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16 18L22 12L16 6" stroke={active ? "white" : "url(#bottom-premium-gradient)"} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M8 6L2 12L8 18" stroke={active ? "white" : "url(#bottom-premium-gradient)"} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M13 19L11 5" stroke={active ? "white" : "url(#bottom-premium-gradient)"} strokeWidth="2" strokeLinecap="round" opacity={active ? "1" : "0.6"} />
        </svg>
    ),
    briefcase: (active) => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="3" y="7" width="18" height="13" rx="3" stroke={active ? "white" : "url(#bottom-premium-gradient)"} strokeWidth="2" />
            <path d="M9 7V5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7" stroke={active ? "white" : "url(#bottom-premium-gradient)"} strokeWidth="2" />
            <path d="M3 12H21" stroke={active ? "white" : "url(#bottom-premium-gradient)"} strokeWidth="1.5" opacity="0.4" />
        </svg>
    ),
    mail: (active) => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke={active ? "white" : "url(#bottom-premium-gradient)"} strokeWidth="2" />
            <path d="M22 6L12 13L2 6" stroke={active ? "white" : "url(#bottom-premium-gradient)"} strokeWidth="2" />
        </svg>
    ),
};

export default function BottomNav() {
    const { t } = useLanguage();
    const [active, setActive] = useState('home');

    useEffect(() => {
        const handleScroll = () => {
            const sections = navItems.map(item => document.querySelector(item.href));
            const scrollPosition = window.scrollY + 200;

            sections.forEach(section => {
                if (!section) return;
                const top = section.offsetTop;
                const height = section.offsetHeight;
                const id = section.getAttribute('id');

                if (scrollPosition >= top && scrollPosition < top + height) {
                    setActive(id);
                }
            });
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className="bottom-nav">
            <Gradients />
            <div className="bottom-nav-container">
                {navItems.map((item) => (
                    <a
                        key={item.id}
                        href={item.href}
                        className={`bottom-nav-item ${active === item.id ? 'active' : ''}`}
                        onClick={() => setActive(item.id)}
                    >
                        <span className="bottom-nav-icon">
                            {navIcons[item.icon](active === item.id)}
                        </span>
                        {active === item.id && (
                            <span className="bottom-nav-label">{t(`nav.${item.id}`)}</span>
                        )}
                    </a>
                ))}
            </div>
        </nav>
    );
}
