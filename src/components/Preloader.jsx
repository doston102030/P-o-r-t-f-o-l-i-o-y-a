import { useEffect, useState } from 'react';
import './Preloader.css';

export default function Preloader() {
    const [visible, setVisible] = useState(true);
    const [fadeOut, setFadeOut] = useState(false);
    const text = "Doston Dev Portfolio'ya xush kelibsiz";

    useEffect(() => {
        const timer = setTimeout(() => {
            setFadeOut(true);
            setTimeout(() => setVisible(false), 800);
        }, 2800);
        return () => clearTimeout(timer);
    }, []);

    if (!visible) return null;

    return (
        <div className={`preloader ${fadeOut ? 'fade-out' : ''}`}>
            <div className="preloader-content">
                <div className="preloader-text">
                    {text.split("").map((char, index) => (
                        <span
                            key={index}
                            style={{ animationDelay: `${index * 0.04}s` }}
                            className={char === " " ? "space" : ""}
                        >
                            {char}
                        </span>
                    ))}
                </div>
                <div className="preloader-line">
                    <div className="line-fill" />
                </div>
            </div>
            <div className="preloader-bg-effects">
                <div className="bg-glow" />
            </div>
        </div>
    );
}
