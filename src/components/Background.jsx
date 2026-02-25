import { useEffect, useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import './Background.css';

export default function Background() {
    return (
        <div className="cosmic-background">
            <div className="nebula-mesh-global" />
            <div className="nebula-particles-global" />
            <div className="nebula-grain-global" />
            <div className="cosmic-nebula-1" />
            <div className="cosmic-nebula-2" />
        </div>
    );
}
