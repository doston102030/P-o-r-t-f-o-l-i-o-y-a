import { useState, useEffect } from 'react';
import { db } from '../firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

const defaultProjects = [
    { id: 1, title: 'ShopVibe E-Commerce', description: 'A full-featured e-commerce platform with cart, payment integration, and admin dashboard.', tags: 'React, Next.js, TypeScript, Stripe, Tailwind', demo: '#', github: '#', featured: true, emoji: '🛍️' },
    { id: 2, title: 'TaskFlow Dashboard', description: 'Project management tool with drag-and-drop boards, team collaboration, and analytics.', tags: 'React, Redux, REST API, Chart.js', demo: '#', github: '#', featured: false, emoji: '📊' },
    { id: 3, title: 'WeatherApp Pro', description: 'Beautiful weather application with 7-day forecasts and interactive maps.', tags: 'React, TypeScript, OpenWeather API, CSS', demo: '#', github: '#', featured: false, emoji: '🌤️' },
];

export default function AdminProjects() {
    const [projects, setProjects] = useState(defaultProjects);
    const [editing, setEditing] = useState(null);
    const [form, setForm] = useState({ title: '', description: '', tags: '', demo: '#', github: '#', featured: false, emoji: '📦', imageUrl: '' });
    const [saving, setSaving] = useState(false);
    const [toast, setToast] = useState('');

    useEffect(() => {
        getDoc(doc(db, 'portfolio', 'projects')).then((snap) => {
            if (snap.exists() && snap.data().items) setProjects(snap.data().items);
        }).catch(() => { });
    }, []);

    const handleSave = async () => {
        setSaving(true);
        try {
            await setDoc(doc(db, 'portfolio', 'projects'), { items: projects });
            setToast('Saqlandi! ✅');
            setTimeout(() => setToast(''), 2500);
        } catch (err) {
            setToast('Xatolik: ' + err.message);
            setTimeout(() => setToast(''), 3000);
        }
        setSaving(false);
    };

    const handleAdd = () => {
        if (!form.title.trim()) return;
        setProjects([...projects, { ...form, id: Date.now() }]);
        setForm({ title: '', description: '', tags: '', demo: '#', github: '#', featured: false, emoji: '📦', imageUrl: '' });
    };

    const handleEdit = (i) => {
        setEditing(i);
        setForm(projects[i]);
    };

    const handleUpdate = () => {
        const updated = [...projects];
        updated[editing] = { ...form };
        setProjects(updated);
        setEditing(null);
        setForm({ title: '', description: '', tags: '', demo: '#', github: '#', featured: false, emoji: '📦', imageUrl: '' });
    };

    const handleDelete = (i) => {
        setProjects(projects.filter((_, idx) => idx !== i));
    };

    return (
        <div>
            <div className="admin-page-header">
                <h1>🚀 Loyihalar</h1>
                <p>Projects bo'limi — loyihalarni boshqarish</p>
            </div>

            {/* List */}
            <div className="admin-card">
                <h3>Mavjud Loyihalar ({projects.length})</h3>
                {projects.map((p, i) => (
                    <div key={i} className="admin-item">
                        <span style={{ fontSize: '1.3rem' }}>{p.emoji}</span>
                        <div className="admin-item-info">
                            <h4>{p.title} {p.featured && '⭐'}</h4>
                            <p>{p.description}</p>
                        </div>
                        <div className="admin-item-actions">
                            <button className="admin-edit-btn" onClick={() => handleEdit(i)}>✏️</button>
                            <button className="admin-delete-btn" onClick={() => handleDelete(i)}>🗑️</button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Add / Edit */}
            <div className="admin-card">
                <h3>{editing !== null ? '✏️ Tahrirlash' : '➕ Yangi Loyiha'}</h3>
                <div className="admin-form-row">
                    <div className="admin-form-group">
                        <label>Nomi</label>
                        <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="My Project" />
                    </div>
                    <div className="admin-form-group">
                        <label>Emoji</label>
                        <input value={form.emoji} onChange={(e) => setForm({ ...form, emoji: e.target.value })} placeholder="🚀" />
                    </div>
                </div>
                <div className="admin-form-group">
                    <label>Tavsif</label>
                    <textarea rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
                </div>
                <div className="admin-form-group">
                    <label>Teglar (vergul bilan)</label>
                    <input value={form.tags} onChange={(e) => setForm({ ...form, tags: e.target.value })} placeholder="React, TypeScript, Node.js" />
                </div>
                <div className="admin-form-group">
                    <label>Rasm URL (Screenshot)</label>
                    <input value={form.imageUrl} onChange={(e) => setForm({ ...form, imageUrl: e.target.value })} placeholder="https://example.com/project.jpg" />
                </div>
                <div className="admin-form-row">
                    <div className="admin-form-group">
                        <label>Demo link</label>
                        <input value={form.demo} onChange={(e) => setForm({ ...form, demo: e.target.value })} />
                    </div>
                    <div className="admin-form-group">
                        <label>GitHub link</label>
                        <input value={form.github} onChange={(e) => setForm({ ...form, github: e.target.value })} />
                    </div>
                </div>
                <div className="admin-form-group">
                    <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
                        <input type="checkbox" checked={form.featured} onChange={(e) => setForm({ ...form, featured: e.target.checked })} style={{ width: 18, height: 18 }} />
                        ⭐ Featured loyiha
                    </label>
                </div>
                {editing !== null ? (
                    <div style={{ display: 'flex', gap: 10 }}>
                        <button className="admin-save-btn" onClick={handleUpdate}>✅ Yangilash</button>
                        <button className="admin-delete-btn" onClick={() => { setEditing(null); setForm({ title: '', description: '', tags: '', demo: '#', github: '#', featured: false, emoji: '📦', imageUrl: '' }); }}>Bekor</button>
                    </div>
                ) : (
                    <button className="admin-add-btn" onClick={handleAdd}>+ Qo'shish</button>
                )}
            </div>

            <button className="admin-save-btn" onClick={handleSave} disabled={saving}>
                {saving ? '⏳ Saqlanmoqda...' : '💾 Firebasega Saqlash'}
            </button>
            {toast && <div className="admin-toast">{toast}</div>}
        </div>
    );
}
