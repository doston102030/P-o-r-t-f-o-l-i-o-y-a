import { useEffect, useState } from 'react';
import './Background.css';

export default function Background() {
    const [stars, setStars] = useState([]);
    const [meteors, setMeteors] = useState([]);

    useEffect(() => {
        // Generate stars with size variety
        const starCount = 120;
        const generatedStars = Array.from({ length: starCount }).map((_, i) => ({
            id: i,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            size: `${i % 15 === 0 ? Math.random() * 3 + 2 : Math.random() * 2 + 0.8}px`,
            duration: `${Math.random() * 4 + 2}s`,
            delay: `${Math.random() * 6}s`,
        }));
        setStars(generatedStars);

        // Generate colorful meteors
        const meteorCount = 8;
        const generatedMeteors = Array.from({ length: meteorCount }).map((_, i) => ({
            id: i,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            duration: `${Math.random() * 2 + 4}s`,
            delay: `${Math.random() * 10}s`,
        }));
        setMeteors(generatedMeteors);
    }, []);

    return (
        <div className="cosmic-background">
            <div className="nebula nebula-1"></div>
            <div className="nebula nebula-2"></div>

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

            <div className="meteors-container">
                {meteors.map((m) => (
                    <div
                        key={m.id}
                        className="meteor"
                        style={{
                            top: m.top,
                            left: m.left,
                            '--m-duration': m.duration,
                            '--m-delay': m.delay,
                        }}
                    />
                ))}
            </div>
        </div>
    );
}
