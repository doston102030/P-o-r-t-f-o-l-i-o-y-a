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
            <div className="bottom-nav-container">
                {navItems.map((item) => (
                    <a
                        key={item.id}
                        href={item.href}
                        className={`bottom-nav-item ${active === item.id ? 'active' : ''}`}
                        onClick={() => setActive(item.id)}
                    >
                        <span className="bottom-nav-icon">
                            {item.icon === 'home' && (
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
                            )}
                            {item.icon === 'user' && (
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                            )}
                            {item.icon === 'code' && (
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>
                            )}
                            {item.icon === 'briefcase' && (
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>
                            )}
                            {item.icon === 'mail' && (
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                            )}
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
