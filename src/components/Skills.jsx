import { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import './Skills.css';

const defaultSkills = [
  // 🧱 Languages
  { name: 'HTML', icon: '🟠', level: 98, color: '#e34f26', category: 'languages' },
  { name: 'CSS', icon: '🔵', level: 95, color: '#264de4', category: 'languages' },
  { name: 'JavaScript', icon: '🟡', level: 93, color: '#f7df1e', category: 'languages' },

  // ⚛️ Frameworks & Libraries
  { name: 'TypeScript', icon: '💙', level: 85, color: '#3178c6', category: 'frameworks' },
  { name: 'React', icon: '⚛️', level: 94, color: '#61dafb', category: 'frameworks' },
  { name: 'Next.js', icon: '⬛', level: 88, color: '#ffffff', category: 'frameworks' },
  { name: 'Redux Toolkit', icon: '🟣', level: 85, color: '#764abc', category: 'frameworks' },
  { name: 'Zustand', icon: '🐻', level: 82, color: '#433929', category: 'frameworks' },
  { name: 'React Hook Form', icon: '📋', level: 90, color: '#ec5990', category: 'frameworks' },
  { name: 'Axios', icon: '📡', level: 95, color: '#5a29e4', category: 'frameworks' },
  { name: 'TanStack Query', icon: '🔍', level: 88, color: '#ff4154', category: 'frameworks' },
  { name: 'Framer Motion', icon: '🎭', level: 85, color: '#00ccff', category: 'frameworks' },

  // 🎨 Styling & UI
  { name: 'Tailwind CSS', icon: '🌊', level: 92, color: '#38bdf8', category: 'styling' },
  { name: 'Shadcn/ui', icon: '🔳', level: 90, color: '#ffffff', category: 'styling' },
  { name: 'Material UI', icon: '🟦', level: 85, color: '#007fff', category: 'styling' },
  { name: 'Ant Design', icon: '🐜', level: 80, color: '#0170fe', category: 'styling' },

  // 🔧 Tools
  { name: 'Git', icon: '🔴', level: 87, color: '#f05032', category: 'tools' },
  { name: 'GitHub', icon: '🐙', level: 90, color: '#ffffff', category: 'tools' },
  { name: 'VS Code', icon: '💻', level: 95, color: '#007acc', category: 'tools' },
  { name: 'Figma', icon: '🎨', level: 88, color: '#f24e1e', category: 'tools' },
  { name: 'Postman', icon: '🚀', level: 85, color: '#ff6c37', category: 'tools' },
  { name: 'Vercel', icon: '▲', level: 90, color: '#ffffff', category: 'tools' },
  { name: 'Netlify', icon: '◈', level: 85, color: '#00c7b7', category: 'tools' },

  // 🔥 Backend
  { name: 'Firebase', icon: '🔥', level: 85, color: '#ffca28', category: 'backend' },
  { name: 'Supabase', icon: '⚡', level: 80, color: '#3ecf8e', category: 'backend' },

  // 🧠 Additional
  { name: 'REST API', icon: '🔌', level: 90, color: '#a78bfa', category: 'additional' },
  { name: 'Responsive Design', icon: '📱', level: 95, color: '#4ade80', category: 'additional' },
  { name: 'SEO Basics', icon: '📈', level: 80, color: '#fb923c', category: 'additional' },
  { name: 'Performance Optimization', icon: '⚡', level: 85, color: '#facc15', category: 'additional' },
];

const svgIcons = {
  // ... (keeping existing icons, will add more later if needed)
  'HTML5': (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.565-2.438L1.5 0zm7.031 9.75l-.232-2.718 10.059.003.23-2.622L5.412 4.41l.698 8.01h9.126l-.326 3.426-2.91.804-2.955-.81-.188-2.11H6.248l.33 4.171L12 19.351l5.379-1.443.744-8.157H8.531z" />
    </svg>
  ),
  'HTML': (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.565-2.438L1.5 0zm7.031 9.75l-.232-2.718 10.059.003.23-2.622L5.412 4.41l.698 8.01h9.126l-.326 3.426-2.91.804-2.955-.81-.188-2.11H6.248l.33 4.171L12 19.351l5.379-1.443.744-8.157H8.531z" />
    </svg>
  ),
  'CSS3': (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.565-2.438L1.5 0zm17.09 4.413L5.41 4.41l.213 2.622 10.125.002-.255 2.716h-6.64l.24 2.573h6.182l-.366 3.523-2.91.804-2.956-.81-.188-2.11h-2.61l.29 3.855L12 19.288l5.373-1.53L18.59 4.414v-.001z" />
    </svg>
  ),
  'CSS': (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.565-2.438L1.5 0zm17.09 4.413L5.41 4.41l.213 2.622 10.125.002-.255 2.716h-6.64l.24 2.573h6.182l-.366 3.523-2.91.804-2.956-.81-.188-2.11h-2.61l.29 3.855L12 19.288l5.373-1.53L18.59 4.414v-.001z" />
    </svg>
  ),
  'JavaScript': (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M0 0h24v24H0V0zm22.034 18.276c-.175-1.095-.888-2.015-3.003-2.873-.736-.345-1.554-.585-1.797-1.14-.091-.33-.105-.51-.046-.705.15-.646.915-.84 1.515-.66.39.12.75.42.976.9 1.034-.676 1.034-.676 1.755-1.125-.27-.42-.404-.601-.586-.78-.63-.705-1.469-1.065-2.834-1.034l-.705.089c-.676.165-1.32.525-1.71 1.005-1.14 1.291-.811 3.541.569 4.471 1.365 1.02 3.361 1.244 3.616 2.205.24 1.17-.87 1.545-1.966 1.41-.811-.18-1.26-.586-1.755-1.336l-1.83 1.051c.21.48.45.689.81 1.109 1.74 1.756 6.09 1.666 6.871-1.004.029-.09.24-.705.074-1.65l.046.067zm-8.983-7.245h-2.248c0 1.938-.009 3.864-.009 5.805 0 1.232.063 2.363-.138 2.711-.33.689-1.18.601-1.566.48-.396-.196-.597-.466-.83-.855-.063-.105-.11-.196-.127-.196l-1.825 1.125c.305.63.75 1.172 1.324 1.517.855.51 2.004.675 3.207.405.783-.226 1.458-.691 1.811-1.411.51-.93.402-2.07.397-3.346.012-2.054 0-4.109 0-6.179l.004-.056z" />
    </svg>
  ),
  'TypeScript': (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0zm17.363 9.75c.612 0 1.154.037 1.627.111a6.38 6.38 0 0 1 1.306.34v2.458a3.95 3.95 0 0 0-.643-.361 5.093 5.093 0 0 0-.717-.26 5.453 5.453 0 0 0-1.426-.2c-.3 0-.573.028-.819.086a2.1 2.1 0 0 0-.623.242c-.17.104-.3.229-.393.374a.888.888 0 0 0-.14.49c0 .196.053.373.156.529.104.156.252.304.443.444s.423.276.696.41c.273.135.582.274.926.416.47.197.892.407 1.266.628.374.222.695.473.963.753.268.279.472.598.614.957.142.359.214.776.214 1.253 0 .657-.125 1.21-.373 1.656a3.033 3.033 0 0 1-1.012 1.085 4.38 4.38 0 0 1-1.487.596c-.566.12-1.163.18-1.79.18a9.916 9.916 0 0 1-1.84-.164 5.544 5.544 0 0 1-1.512-.493v-2.63a5.033 5.033 0 0 0 3.237 1.2c.333 0 .624-.03.872-.09.249-.06.456-.144.623-.25.166-.108.29-.234.373-.38a1.023 1.023 0 0 0-.074-1.089 2.12 2.12 0 0 0-.537-.5 5.597 5.597 0 0 0-.807-.444 27.72 27.72 0 0 0-1.007-.436c-.918-.383-1.602-.852-2.053-1.405-.45-.553-.676-1.222-.676-2.005 0-.614.123-1.141.369-1.582.246-.441.58-.804 1.004-1.089a4.494 4.494 0 0 1 1.47-.629 7.536 7.536 0 0 1 1.77-.201zm-15.113.188h9.563v2.166H9.506v9.646H6.789v-9.646H3.375z" />
    </svg>
  ),
  'React': (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M14.23 12.004a2.236 2.236 0 0 1-2.235 2.236 2.236 2.236 0 0 1-2.236-2.236 2.236 2.236 0 0 1 2.235-2.236 2.236 2.236 0 0 1 2.236 2.236zm2.648-10.69c-1.346 0-3.107.96-4.888 2.622-1.78-1.653-3.542-2.602-4.887-2.602-.41 0-.783.093-1.106.278-1.375.793-1.683 3.264-.973 6.365C1.98 8.917 0 10.42 0 12.004c0 1.59 1.99 3.097 5.043 4.03-.704 3.113-.39 5.588.988 6.38.32.187.69.275 1.102.275 1.345 0 3.107-.96 4.888-2.624 1.78 1.654 3.542 2.603 4.887 2.603.41 0 .783-.09 1.106-.275 1.374-.792 1.683-3.263.973-6.365C22.02 15.096 24 13.59 24 12.004c0-1.59-1.99-3.097-5.043-4.032.704-3.11.39-5.587-.988-6.38-.318-.184-.688-.277-1.092-.278zm-.005 1.09v.006c.225 0 .406.044.558.127.666.382.955 1.835.73 3.704-.054.46-.142.945-.25 1.44-.96-.236-2.006-.417-3.107-.534-.66-.905-1.345-1.727-2.035-2.447 1.592-1.48 3.087-2.292 4.105-2.295zm-9.77.02c1.012 0 2.514.808 4.11 2.28-.686.72-1.37 1.537-2.02 2.442-1.107.117-2.154.298-3.113.538-.112-.49-.195-.964-.254-1.42-.23-1.868.054-3.32.714-3.707.19-.09.4-.127.563-.132zm4.882 3.05c.455.468.91.992 1.36 1.564-.44-.02-.89-.034-1.345-.034-.46 0-.915.01-1.36.034.44-.572.895-1.096 1.345-1.565zM12 8.1c.74 0 1.477.034 2.202.093.406.582.802 1.203 1.183 1.86.372.64.71 1.29 1.018 1.946-.308.655-.646 1.31-1.013 1.95-.38.66-.773 1.288-1.18 1.87-.728.063-1.466.098-2.21.098-.74 0-1.477-.035-2.202-.093-.406-.582-.802-1.204-1.183-1.86-.372-.64-.71-1.29-1.018-1.946.303-.657.646-1.313 1.013-1.954.38-.66.773-1.286 1.18-1.868.728-.064 1.466-.098 2.21-.098zm-3.635.254c-.24.377-.48.763-.704 1.16-.225.39-.435.782-.635 1.174-.265-.656-.49-1.31-.676-1.947.64-.15 1.315-.283 2.015-.386zm7.26 0c.695.103 1.365.23 2.006.387-.18.632-.405 1.282-.66 1.933-.2-.39-.41-.783-.64-1.174-.225-.392-.465-.774-.705-1.146zm3.063.675c.484.15.944.317 1.375.498 1.732.74 2.852 1.708 2.852 2.476-.005.768-1.125 1.74-2.857 2.475-.42.18-.88.342-1.355.493-.28-.958-.646-1.956-1.1-2.98.45-1.017.81-2.01 1.085-2.964zm-13.395.004c.278.96.645 1.957 1.1 2.98-.45 1.017-.812 2.01-1.086 2.964-.484-.15-.944-.318-1.37-.5-1.732-.737-2.852-1.706-2.852-2.474 0-.768 1.12-1.742 2.852-2.476.42-.18.88-.342 1.356-.494zm11.678 4.28c.265.657.49 1.312.676 1.948-.64.150-1.315.283-2.015.386.24-.375.48-.762.705-1.158.225-.39.435-.782.634-1.176zm-9.945.02c.2.392.41.783.64 1.175.23.39.465.772.705 1.143-.695-.102-1.365-.23-2.006-.386.18-.63.406-1.282.66-1.933zM17.92 16.32c.112.493.2.968.254 1.423.23 1.868-.054 3.32-.714 3.708-.147.09-.338.128-.563.128-1.012 0-2.514-.807-4.11-2.28.686-.72 1.37-1.536 2.02-2.44 1.107-.118 2.154-.3 3.113-.54zm-11.83.01c.96.234 2.006.415 3.107.532.66.905 1.345 1.727 2.035 2.446-1.595 1.483-3.092 2.295-4.11 2.295-.22-.005-.406-.05-.553-.132-.666-.38-.955-1.834-.73-3.703.054-.46.142-.944.25-1.438zm4.56.64c.44.02.89.034 1.345.034.46 0 .915-.01 1.36-.034-.44.572-.895 1.095-1.345 1.565-.455-.47-.91-.993-1.36-1.565z" />
    </svg>
  ),
  'Next.js': (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M12.001 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6.75 18.25l-7.5-10.5h-1.5v10.5h1.5v-7.5l7.5 10.5h1.5v-10.5h-1.5v7.5z" />
    </svg>
  ),
  'Tailwind CSS': (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z" />
    </svg>
  ),
  'Git': (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.546 10.93L13.067.452a1.55 1.55 0 0 0-2.188 0L8.708 2.627l2.76 2.76a1.838 1.838 0 0 1 2.327 2.341l2.658 2.66a1.838 1.838 0 0 1 1.903 3.009 1.84 1.84 0 0 1-2.59 0 1.846 1.846 0 0 1-.404-2.013L12.723 8.74v6.79a1.842 1.842 0 0 1 .486 3.612 1.84 1.84 0 0 1-2.324-1.761 1.846 1.846 0 0 1 1.028-1.644V8.667a1.845 1.845 0 0 1-1.004-2.42L8.183 3.5 .452 11.23a1.55 1.55 0 0 0 0 2.189l10.48 10.478a1.55 1.55 0 0 0 2.189 0l10.424-10.424a1.55 1.55 0 0 0 0-2.542z" />
    </svg>
  ),
  'GitHub': (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  ),
  'REST API': (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M14.995 1.772c-4.8-1.762-10.12.695-11.883 5.496-1.762 4.8.695 10.12 5.495 11.882 4.8 1.762 10.12-.695 11.883-5.495 1.762-4.8-.695-10.12-5.495-11.883zm-.626 1.701c3.905 1.434 5.906 5.77 4.474 9.676-1.434 3.905-5.77 5.906-9.675 4.473C5.263 16.187 3.262 11.851 4.696 7.946c1.434-3.905 5.77-5.906 9.673-4.473zM8.19 7.064l-1.367 3.723L5.455 7.07 4.02 7.593l2.353 6.412 1.436-.527 1.372-3.737 1.37 3.73 1.434-.526L14 6.537l-1.434-.527-1.373 3.724-1.368-3.72L8.19 7.064z" />
    </svg>
  ),
  'Firebase': (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M3.89 15.672L2.095 4.194a.5.5 0 0 1 .838-.492l1.986 3.737L3.89 15.672zm16.792-6.52L17.72 2.144a.5.5 0 0 0-.84 0l-1.928 3.655 5.73 3.353zM13.23 8.358L12.19 6.42a.5.5 0 0 0-.84 0L3.58 20.66a.5.5 0 0 0 .7.652l8.95-12.954zm1.18-1.513l-.53-1-.07-.132a.5.5 0 0 0-.84 0l-.07.132-5.91 11.235 7.42 4.264 4.18-8.204a.5.5 0 0 0 0-.42l-4.18-5.875z" />
    </svg>
  ),
};

export default function Skills() {
  const { t } = useLanguage();
  const [isMobile, setIsMobile] = useState(false);
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);

    const skillsRef = doc(db, 'portfolio', 'skills');
    getDoc(skillsRef).then(snapshot => {
      let dbItems = [];
      if (snapshot.exists() && snapshot.data().items) {
        dbItems = snapshot.data().items;
      }

      const essentialNames = ['HTML', 'HTML5', 'CSS', 'CSS3', 'JavaScript', 'JavaScript (ES6+)', 'JS'];

      // 🚀 Migration logic: Add categories to old DB items if missing
      const processedDbItems = dbItems.map(s => {
        // Identity matching & Basic Normalization
        if (['HTML', 'HTML5'].includes(s.name)) return { ...s, name: 'HTML', icon: '🟠', category: 'languages', color: '#e34f26' };
        if (['CSS', 'CSS3'].includes(s.name)) return { ...s, name: 'CSS', icon: '🔵', category: 'languages', color: '#264de4' };
        if (['JavaScript', 'JavaScript (ES6+)', 'JS'].includes(s.name)) return { ...s, name: 'JavaScript', icon: '🟡', category: 'languages', color: '#f7df1e' };
        if (s.name === 'TypeScript' || s.name === 'TS') return { ...s, name: 'TypeScript', icon: '💙', category: 'frameworks', color: '#3178c6' };

        // Normalize 'libraries' to 'frameworks' for backward compatibility
        if (s.category === 'libraries') return { ...s, category: 'frameworks' };

        if (s.category) return s;

        let category = 'frameworks'; // Default fallback
        if (essentialNames.includes(s.name)) category = 'languages';
        if (['Git', 'GitHub', 'Figma', 'Postman', 'Vercel', 'Netlify', 'VS Code'].includes(s.name)) category = 'tools';
        if (['Tailwind CSS', 'Sass', 'SCSS', 'Sass / SCSS', 'Bootstrap', 'Shadcn/ui', 'Material UI', 'Ant Design'].includes(s.name)) category = 'styling';
        if (['Firebase', 'Supabase'].includes(s.name)) category = 'backend';
        if (['REST API', 'Responsive Design', 'SEO Basics', 'Performance Optimization'].includes(s.name)) category = 'additional';

        return { ...s, category };
      });

      const merged = [...processedDbItems];

      defaultSkills.forEach(defSkill => {
        const exists = merged.some(s => s.name === defSkill.name);
        if (!exists) {
          merged.push(defSkill);
        }
      });

      setSkills(merged.length > 0 ? merged : defaultSkills);
      setLoading(false);
    }).catch(err => {
      console.error("Firestore error:", err);
      setSkills(defaultSkills);
      setLoading(false);
    });
  }, []);

  if (loading) return <section className="section skills-section" id="skills" style={{ minHeight: '400px' }} />;

  // 📂 Categorize skills dynamically from DB categories
  const languagesOrder = ['HTML', 'HTML5', 'CSS', 'CSS3', 'JavaScript', 'JavaScript (ES6+)', 'JS'];

  const categorizedSkills = {
    languages: skills
      .filter(s => s.category === 'languages')
      .sort((a, b) => languagesOrder.indexOf(a.name) - languagesOrder.indexOf(b.name)),
    frameworks: skills.filter(s => s.category === 'frameworks'),
    styling: skills.filter(s => s.category === 'styling'),
    tools: skills.filter(s => s.category === 'tools'),
    backend: skills.filter(s => s.category === 'backend'),
    additional: skills.filter(s => s.category === 'additional')
  };

  const rainbowColors = ['#8B5CF6', '#06B6D4', '#F43F5E', '#F59E0B', '#10B981', '#3B82F6'];

  const renderSkillGroup = (categoryKey, skillList, groupIndex) => {
    if (skillList.length === 0) return null;

    return (
      <div className="skills-category-group animate-fade-up">
        <h3 className="skills-category-title">
          {t(`skills.${categoryKey}`).split('').map((char, i) => {
            const colorIndex = (i + (groupIndex * 3)) % rainbowColors.length;
            return (
              <span
                key={i}
                className="title-letter"
                style={{ color: rainbowColors[colorIndex] }}
              >
                {char === ' ' ? '\u00A0' : char}
              </span>
            );
          })}
        </h3>
        <div className="skills-grid-minimal">
          {skillList.map((skill, i) => {
            // 🌬 Normalize names for a clean "Quiet Luxury" look
            let displayName = skill.name;
            if (displayName === 'HTML5' || displayName === 'HTML') displayName = 'HTML';
            if (displayName === 'CSS3' || displayName === 'CSS') displayName = 'CSS';
            if (displayName === 'JavaScript' || displayName === 'JS') displayName = 'JavaScript';

            return (
              <div
                key={skill.name}
                className="skill-item-compact"
                style={{ '--skill-color': skill.color, animationDelay: `${i * 0.05}s` }}
              >
                <div className="skill-icon-circle">
                  <div className="skill-circle-glow" />
                  <div className="skill-svg-wrapper" style={{ color: skill.color }}>
                    {svgIcons[skill.name] || svgIcons[displayName] || <span>{skill.icon}</span>}
                  </div>
                </div>
                <span className="skill-name-compact">{displayName}</span>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <section className="section skills-section" id="skills">
      {/* Hyper-Space Cinematic Background */}
      <div className="skills-cinematic-bg">
        {/* Layer 1: Distant Stars */}
        <div className="hero-stars-container">
          {Array.from({ length: isMobile ? 40 : 120 }).map((_, i) => (
            <div
              key={i}
              className="hero-star"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${Math.random() * 1.5 + 0.5}px`,
                height: `${Math.random() * 1.5 + 0.5}px`,
                '--twinkle-duration': `${Math.random() * 3 + 2}s`,
                '--star-opacity': Math.random() * 0.4 + 0.2,
                animationDelay: `${Math.random() * 5}s`
              }}
            />
          ))}
        </div>

        {/* Layer 2: Aurora Waves */}
        <div className="aurora-waves">
          <div className="aurora-wave aurora-wave--1" />
          <div className="aurora-wave aurora-wave--2" />
        </div>

        {/* Layer 3: Meteors (Shooting Stars) */}
        <div className="meteors-container">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="meteor"
              style={{
                top: `${Math.random() * 50}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 15}s`,
                animationDuration: `${Math.random() * 3 + 2}s`
              }}
            />
          ))}
        </div>

        {/* Layer 4: Floating Energy Particles */}
        <div className="energy-particles">
          {Array.from({ length: isMobile ? 10 : 25 }).map((_, i) => (
            <div
              key={i}
              className="energy-particle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 10}s`,
                '--move-x': `${Math.random() * 100 - 50}px`,
                '--move-y': `${Math.random() * 100 - 50}px`
              }}
            />
          ))}
        </div>

        <div className="skills-nebula" />
      </div>
      <div className="skills-bg-pattern" />

      <div className="container">
        <div className="section-header animate-fade-up">
          <p className="section-tag">{t('skills.tag')}</p>
          <h2 className="section-title">
            {t('skills.title')} <span className="gradient-text">{t('skills.titleGradient')}</span>
          </h2>
          <p className="section-subtitle">
            {t('skills.subtitle')}
          </p>
        </div>

        <div className="skills-container-minimal">
          {renderSkillGroup('languages', categorizedSkills.languages, 0)}
          {renderSkillGroup('frameworks', categorizedSkills.frameworks, 1)}
          {renderSkillGroup('styling', categorizedSkills.styling, 2)}
          {renderSkillGroup('tools', categorizedSkills.tools, 3)}
          {renderSkillGroup('backend', categorizedSkills.backend, 4)}
          {renderSkillGroup('additional', categorizedSkills.additional, 5)}
        </div>
      </div>
    </section>
  );
}
