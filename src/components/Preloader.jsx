import { useEffect, useState } from 'react';
import './Preloader.css';

export default function Preloader() {
    const [visible, setVisible] = useState(true);
    const [fadeOut, setFadeOut] = useState(false);
    const text = "Doston Dev Portfolio'ya xush kelibsiz";

    useEffect(() => {
        // 🔒 Lock scroll
        document.body.style.overflow = "hidden";

        const timer = setTimeout(() => {
            setFadeOut(true);
            setTimeout(() => {
                setVisible(false);
                // 🔓 Unlock scroll
                document.body.style.overflow = "auto";
            }, 800);
        }, 2800);

        return () => {
            clearTimeout(timer);
            document.body.style.overflow = "auto";
        };
    }, []);

    if (!visible) return null;

    return (
        <div className={`preloader-glass-wrapper ${fadeOut ? 'fade-out' : ''}`}>
            {/* Cinematic Particle Background */}
            <div className="preloader-particles">
                {Array.from({ length: 30 }).map((_, i) => (
                    <div
                        key={i}
                        className="magic-particle"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 5}s`,
                            opacity: Math.random() * 0.5 + 0.1
                        }}
                    />
                ))}
            </div>

            <div className="preloader-glass-card backdrop-mode">
                <div className="glass-card-shine" />
                <div className="preloader-flare" />

                <div className="preloader-info">
                    <div className="preloader-text-cinematic">
                        {text.split("").map((char, index) => (
                            <span
                                key={index}
                                style={{ animationDelay: `${index * 0.05}s` }}
                                className={char === " " ? "space" : ""}
                            >
                                {char}
                            </span>
                        ))}
                    </div>

                    <div className="preloader-loading-bar-mega">
                        <div className="bar-track">
                            <div className="bar-progress-glow" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
