import { useEffect, useState } from 'react';
import './Background.css';

export default function Background() {
    return (
        <div className="cosmic-background">
            {/* Soft nebula glow */}
            <div className="nebula nebula-1" />
            <div className="nebula nebula-2" />
        </div>
    );
}
