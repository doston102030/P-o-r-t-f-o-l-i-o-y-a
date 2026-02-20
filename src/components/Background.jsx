import { useEffect, useState, useRef } from 'react';
import './Background.css';

export default function Background() {
    const [stars, setStars] = useState([]);
    const [meteors, setMeteors] = useState([]);
    const [floatingOrbs, setFloatingOrbs] = useState([]);
    const canvasRef = useRef(null);

    useEffect(() => {
        // Generate multi-layered stars with variety
        const starCount = 180;
        const generatedStars = Array.from({ length: starCount }).map((_, i) => {
            const isBright = i % 12 === 0;
            const isMedium = i % 7 === 0;
            return {
                id: i,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                size: isBright
                    ? `${Math.random() * 4 + 3}px`
                    : isMedium
                        ? `${Math.random() * 3 + 2}px`
                        : `${Math.random() * 2 + 0.6}px`,
                duration: `${Math.random() * 4 + 2}s`,
                delay: `${Math.random() * 8}s`,
                type: isBright ? 'bright' : isMedium ? 'medium' : 'small',
            };
        });
        setStars(generatedStars);

        // Generate colorful meteors with variety
        const meteorCount = 10;
        const generatedMeteors = Array.from({ length: meteorCount }).map((_, i) => ({
            id: i,
            top: `${Math.random() * 60}%`,
            left: `${50 + Math.random() * 60}%`,
            duration: `${Math.random() * 3 + 3}s`,
            delay: `${Math.random() * 15}s`,
            size: i % 3 === 0 ? 'large' : 'small',
        }));
        setMeteors(generatedMeteors);

        // Generate floating orbs
        const orbCount = 5;
        const orbColors = ['#6366f1', '#a855f7', '#06b6d4', '#8b5cf6', '#ec4899'];
        const generatedOrbs = Array.from({ length: orbCount }).map((_, i) => ({
            id: i,
            color: orbColors[i],
            size: Math.random() * 150 + 100,
            top: `${Math.random() * 80 + 10}%`,
            left: `${Math.random() * 80 + 10}%`,
            duration: `${Math.random() * 15 + 20}s`,
            delay: `${i * 2}s`,
        }));
        setFloatingOrbs(generatedOrbs);
    }, []);

    // Interactive mouse parallax on stars
    useEffect(() => {
        const container = canvasRef.current;
        if (!container) return;

        const handleMouseMove = (e) => {
            const x = (e.clientX / window.innerWidth - 0.5) * 2;
            const y = (e.clientY / window.innerHeight - 0.5) * 2;
            container.style.setProperty('--mouse-x', `${x * 8}px`);
            container.style.setProperty('--mouse-y', `${y * 8}px`);
        };

        window.addEventListener('mousemove', handleMouseMove, { passive: true });
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <div className="cosmic-background" ref={canvasRef}>
            {/* Animated nebulae */}
            <div className="nebula nebula-1" />
            <div className="nebula nebula-2" />
            <div className="nebula nebula-3" />

            {/* Floating ambient orbs */}
            <div className="orbs-container">
                {floatingOrbs.map((orb) => (
                    <div
                        key={orb.id}
                        className="floating-orb"
                        style={{
                            '--orb-color': orb.color,
                            '--orb-size': `${orb.size}px`,
                            top: orb.top,
                            left: orb.left,
                            animationDuration: orb.duration,
                            animationDelay: orb.delay,
                        }}
                    />
                ))}
            </div>

            {/* Starfield with parallax */}
            <div className="stars-container">
                {stars.map((star) => (
                    <div
                        key={star.id}
                        className={`star star--${star.type}`}
                        style={{
                            top: star.top,
                            left: star.left,
                            width: star.size,
                            height: star.size,
                            '--duration': star.duration,
                            animationDelay: star.delay,
                        }}
                    />
                ))}
            </div>

            {/* Constellation lines (decorative) */}
            <svg className="constellation-svg" viewBox="0 0 1920 1080" preserveAspectRatio="none">
                <line x1="200" y1="150" x2="350" y2="250" className="constellation-line" style={{ animationDelay: '0s' }} />
                <line x1="350" y1="250" x2="450" y2="180" className="constellation-line" style={{ animationDelay: '0.5s' }} />
                <line x1="450" y1="180" x2="520" y2="300" className="constellation-line" style={{ animationDelay: '1s' }} />
                <line x1="1200" y1="400" x2="1350" y2="350" className="constellation-line" style={{ animationDelay: '2s' }} />
                <line x1="1350" y1="350" x2="1500" y2="450" className="constellation-line" style={{ animationDelay: '2.5s' }} />
                <line x1="1500" y1="450" x2="1400" y2="550" className="constellation-line" style={{ animationDelay: '3s' }} />
                <line x1="800" y1="700" x2="950" y2="650" className="constellation-line" style={{ animationDelay: '4s' }} />
                <line x1="950" y1="650" x2="1050" y2="750" className="constellation-line" style={{ animationDelay: '4.5s' }} />
            </svg>

            {/* Meteors layer */}
            <div className="meteors-container">
                {meteors.map((m) => (
                    <div
                        key={m.id}
                        className={`meteor meteor--${m.size}`}
                        style={{
                            top: m.top,
                            left: m.left,
                            '--m-duration': m.duration,
                            '--m-delay': m.delay,
                        }}
                    />
                ))}
            </div>

            {/* Grid pattern overlay */}
            <div className="grid-overlay" />
        </div>
    );
}
