import { useEffect, useState } from 'react';
import './Background.css';

export default function Background() {
    const [stars, setStars] = useState([]);

    useEffect(() => {
        // Minimal star count — elegant, not overwhelming
        const starCount = 70;
        const generatedStars = Array.from({ length: starCount }).map((_, i) => ({
            id: i,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            size: `${Math.random() * 2 + 0.8}px`,
            duration: `${Math.random() * 5 + 3}s`,
            delay: `${Math.random() * 8}s`,
        }));
        setStars(generatedStars);
    }, []);

    return (
        <div className="cosmic-background">
            {/* Soft nebula glow */}
            <div className="nebula nebula-1" />
            <div className="nebula nebula-2" />

            {/* Subtle stars */}
            <div className="stars-container">
                {stars.map((star) => (
                    <div
                        key={star.id}
                        className="star"
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
        </div>
    );
}
