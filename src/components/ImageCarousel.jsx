import { useState, useRef, useCallback } from 'react';

export default function ImageCarousel({ images = [], autoPlay = false, interval = 4000 }) {
    const [current, setCurrent] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const touchStartRef = useRef(0);

    const slides = images.length > 0 ? images : [
        { src: '/avatar.jpg', alt: 'Photo 1' },
    ];

    const goTo = useCallback((idx) => {
        if (isTransitioning) return;
        setIsTransitioning(true);
        setCurrent(idx);
        setTimeout(() => setIsTransitioning(false), 500);
    }, [isTransitioning]);

    const next = useCallback(() => {
        goTo((current + 1) % slides.length);
    }, [current, slides.length, goTo]);

    const prev = useCallback(() => {
        goTo((current - 1 + slides.length) % slides.length);
    }, [current, slides.length, goTo]);

    const onTouchStart = (e) => {
        touchStartRef.current = e.touches[0].clientX;
    };

    const onTouchEnd = (e) => {
        const diff = touchStartRef.current - e.changedTouches[0].clientX;
        if (Math.abs(diff) > 50) {
            diff > 0 ? next() : prev();
        }
    };

    if (slides.length === 0) return null;

    return (
        <div
            className="relative w-full rounded-sm overflow-hidden border border-border bg-surface aspect-[3/4] group"
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
        >
            {/* Slides */}
            <div className="relative w-full h-full">
                {slides.map((slide, i) => (
                    <div
                        key={i}
                        className={`absolute inset-0 transition-opacity duration-500 ${i === current ? 'opacity-100 z-[1]' : 'opacity-0 z-0'}`}
                    >
                        <img
                            src={slide.src}
                            alt={slide.alt || `Slide ${i + 1}`}
                            className="w-full h-full object-cover block"
                            loading="lazy"
                            onError={(e) => { e.target.style.display = 'none'; }}
                        />
                    </div>
                ))}
            </div>

            {/* Navigation arrows */}
            {slides.length > 1 && (
                <>
                    <button
                        className="absolute top-1/2 left-2 -translate-y-1/2 z-10 w-8 h-8 flex items-center justify-center bg-bg border border-border rounded-sm text-text-muted cursor-pointer transition-all duration-300 opacity-0 group-hover:opacity-100 hover:border-accent hover:text-accent hover:bg-bg2 p-0"
                        onClick={prev}
                        aria-label="Previous"
                    >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <path d="M15 18l-6-6 6-6" />
                        </svg>
                    </button>
                    <button
                        className="absolute top-1/2 right-2 -translate-y-1/2 z-10 w-8 h-8 flex items-center justify-center bg-bg border border-border rounded-sm text-text-muted cursor-pointer transition-all duration-300 opacity-0 group-hover:opacity-100 hover:border-accent hover:text-accent hover:bg-bg2 p-0"
                        onClick={next}
                        aria-label="Next"
                    >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <path d="M9 18l6-6-6-6" />
                        </svg>
                    </button>
                </>
            )}

            {/* Dots */}
            {slides.length > 1 && (
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
                    {slides.map((_, i) => (
                        <button
                            key={i}
                            className={`w-1.5 h-1.5 rounded-full border-none cursor-pointer p-0 transition-all duration-300 ${i === current
                                ? 'bg-accent opacity-100 shadow-[0_0_8px_rgba(var(--accent-rgb),0.3)]'
                                : 'bg-text-dim opacity-50 hover:opacity-80'
                                }`}
                            onClick={() => goTo(i)}
                            aria-label={`Slide ${i + 1}`}
                        />
                    ))}
                </div>
            )}

            {/* Counter */}
            {slides.length > 1 && (
                <div className="absolute top-2.5 right-2.5 z-10 font-mono text-[0.65rem] font-bold text-text-muted bg-[rgba(10,10,10,0.7)] backdrop-blur-sm px-2 py-0.5 rounded-sm border border-border tracking-wider">
                    <span className="text-accent">{String(current + 1).padStart(2, '0')}</span>
                    <span className="mx-0.5 opacity-40">/</span>
                    <span>{String(slides.length).padStart(2, '0')}</span>
                </div>
            )}
        </div>
    );
}
