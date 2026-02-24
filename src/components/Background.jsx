import { useEffect, useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import './Background.css';

export default function Background() {
    return (
        <div className="cosmic-background">
            <div className="cosmic-nebula-1" />
            <div className="cosmic-nebula-2" />
        </div>
    );
}
