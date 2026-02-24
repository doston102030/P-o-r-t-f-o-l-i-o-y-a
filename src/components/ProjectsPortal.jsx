import { useEffect } from 'react';
import './ProjectsPortal.css';

const AI_TOOLS = [
    {
        key: 'claude',
        name: 'Claude',
        by: 'Anthropic',
        href: 'https://claude.ai',
        color: '#D97757',
        emoji: '🟠',
        icon: (
            <svg width="36" height="36" viewBox="0 0 48 48" fill="none">
                <rect width="48" height="48" rx="12" fill="#D97757" />
                <text x="50%" y="55%" dominantBaseline="middle" textAnchor="middle" fontSize="22" fill="white">✦</text>
            </svg>
        ),
    },
    {
        key: 'chatgpt',
        name: 'ChatGPT',
        by: 'OpenAI',
        href: 'https://chat.openai.com',
        color: '#10a37f',
        emoji: '🟢',
        icon: (
            <svg width="36" height="36" viewBox="0 0 48 48" fill="none">
                <rect width="48" height="48" rx="12" fill="#10a37f" />
                <path d="M24 8C15.163 8 8 15.163 8 24s7.163 16 16 16 16-7.163 16-16S32.837 8 24 8zm0 4a12 12 0 110 24 12 12 0 010-24zm-1 6v7h-5l6 9 6-9h-5V18h-2z" fill="white" opacity=".9" />
            </svg>
        ),
    },
    {
        key: 'gemini',
        name: 'Gemini',
        by: 'Google',
        href: 'https://gemini.google.com',
        color: '#4285F4',
        emoji: '🔵',
        icon: (
            <svg width="36" height="36" viewBox="0 0 48 48" fill="none">
                <rect width="48" height="48" rx="12" fill="#1a1a2e" />
                <defs>
                    <linearGradient id="gemGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#4285F4" />
                        <stop offset="50%" stopColor="#9c59f5" />
                        <stop offset="100%" stopColor="#EA4335" />
                    </linearGradient>
                </defs>
                <path d="M24 10 C24 10 18 24 10 24 C18 24 24 38 24 38 C24 38 30 24 38 24 C30 24 24 10 24 10Z" fill="url(#gemGrad)" />
            </svg>
        ),
    },
    {
        key: 'copilot',
        name: 'Copilot',
        by: 'GitHub',
        href: 'https://github.com/features/copilot',
        color: '#6e5494',
        emoji: '🟣',
        icon: (
            <svg width="36" height="36" viewBox="0 0 48 48" fill="none">
                <rect width="48" height="48" rx="12" fill="#161b22" />
                <circle cx="24" cy="20" r="8" fill="#58a6ff" opacity=".9" />
                <ellipse cx="24" cy="34" rx="10" ry="6" fill="#58a6ff" opacity=".7" />
                <circle cx="21" cy="19" r="2" fill="#161b22" />
                <circle cx="27" cy="19" r="2" fill="#161b22" />
            </svg>
        ),
    },
    {
        key: 'perplexity',
        name: 'Perplexity',
        by: 'Perplexity AI',
        href: 'https://www.perplexity.ai',
        color: '#20b2aa',
        emoji: '🩵',
        icon: (
            <svg width="36" height="36" viewBox="0 0 48 48" fill="none">
                <rect width="48" height="48" rx="12" fill="#1a1a2e" />
                <polygon points="24,8 40,20 40,36 24,44 8,36 8,20" fill="none" stroke="#20b2aa" strokeWidth="2" />
                <line x1="24" y1="8" x2="24" y2="44" stroke="#20b2aa" strokeWidth="2" />
                <line x1="8" y1="28" x2="40" y2="28" stroke="#20b2aa" strokeWidth="1.5" opacity=".6" />
            </svg>
        ),
    },
    {
        key: 'midjourney',
        name: 'Midjourney',
        by: 'Midjourney',
        href: 'https://www.midjourney.com',
        color: '#ffffff',
        emoji: '🎨',
        icon: (
            <svg width="36" height="36" viewBox="0 0 48 48" fill="none">
                <rect width="48" height="48" rx="12" fill="#000" />
                <path d="M8 32 Q24 8 40 32" stroke="white" strokeWidth="3" fill="none" strokeLinecap="round" />
                <path d="M16 30 Q24 14 32 30" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" opacity=".6" />
            </svg>
        ),
    },
];

export default function AIToolsPortal({ open, onClose }) {
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
            <button className="portal-close" onClick={onClose}>✕</button>

            <div className="portal-sphere-wrap" onClick={(e) => e.stopPropagation()}>
                <div className="portal-ring portal-ring--1" />
                <div className="portal-ring portal-ring--2" />
                <div className="portal-ring portal-ring--3" />

                <div className="portal-sphere">
                    <div className="portal-inner">
                        <p className="portal-label">🤖 Men ishlatadigan AI toollar</p>

                        <div className="portal-grid portal-grid--ai">
                            {AI_TOOLS.map((tool, i) => (
                                <a
                                    key={tool.key}
                                    href={tool.href}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="portal-ai-card"
                                    style={{ animationDelay: `${i * 0.07}s`, '--tool-color': tool.color }}
                                >
                                    <div className="portal-ai-icon">{tool.icon}</div>
                                    <div className="portal-ai-info">
                                        <span className="portal-ai-name">{tool.name}</span>
                                        <span className="portal-ai-by">{tool.by}</span>
                                    </div>
                                    <div className="portal-ai-arrow">→</div>
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
