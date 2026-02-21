import { useState, useEffect } from 'react';
import { db } from '../firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

const defaultSkills = [
    { name: 'HTML5', icon: '🟠', level: 98, color: '#e34f26', category: 'languages' },
    { name: 'CSS3', icon: '🔵', level: 95, color: '#264de4', category: 'languages' },
    { name: 'JavaScript', icon: '🟡', level: 93, color: '#f7df1e', category: 'languages' },
    { name: 'TypeScript', icon: '💙', level: 85, color: '#3178c6', category: 'languages' },
    { name: 'React', icon: '⚛️', level: 94, color: '#61dafb', category: 'libraries' },
    { name: 'Next.js', icon: '⬛', level: 88, color: '#ffffff', category: 'libraries' },
    { name: 'Tailwind CSS', icon: '🌊', level: 92, color: '#38bdf8', category: 'libraries' },
    { name: 'Git', icon: '🔴', level: 87, color: '#f05032', category: 'tools' },
    { name: 'GitHub', icon: '🐙', level: 90, color: '#ffffff', category: 'tools' },
    { name: 'REST API', icon: '🔌', level: 89, color: '#a78bfa', category: 'tools' },
];

const emptyForm = { name: '', icon: '📦', level: 80, color: '#6382ff', category: 'languages' };

export default function AdminSkills() {
    const [skills, setSkills] = useState(defaultSkills);
    const [editing, setEditing] = useState(null);
    const [form, setForm] = useState({ ...emptyForm });
    const [saving, setSaving] = useState(false);
    const [toast, setToast] = useState('');

    useEffect(() => {
        getDoc(doc(db, 'portfolio', 'skills')).then((snap) => {
            if (snap.exists() && snap.data().items) {
                // Migratsiya: toifasi yo'q skillarga default toifa berish
                const data = snap.data().items.map(s => ({
                    ...s,
                    category: s.category || (languagesOrder.includes(s.name) ? 'languages' : 'libraries')
                }));
                setSkills(data);
            }
        }).catch(() => { });
    }, []);

    const languagesOrder = ['HTML', 'HTML5', 'CSS', 'CSS3', 'JavaScript', 'JS', 'TypeScript'];

    const handleSave = async () => {
        setSaving(true);
        try {
            await setDoc(doc(db, 'portfolio', 'skills'), { items: skills });
            setToast('Saqlandi! ✅');
            setTimeout(() => setToast(''), 2500);
        } catch (err) {
            setToast('Xatolik: ' + err.message);
            setTimeout(() => setToast(''), 3000);
        }
        setSaving(false);
    };

    const handleCancel = () => {
        setEditing(null);
        setForm({ ...emptyForm });
    };

    const handleAdd = () => {
        if (!form.name.trim()) return;
        setSkills([...skills, { ...form, level: Number(form.level) }]);
        setForm({ ...emptyForm });
    };

    const handleEdit = (i) => {
        setEditing(i);
        setForm({ ...skills[i], icon: skills[i].icon || '📦', category: skills[i].category || 'languages' });
    };

    const handleUpdate = () => {
        const updated = [...skills];
        updated[editing] = { ...form, level: Number(form.level) };
        setSkills(updated);
        handleCancel();
    };

    const handleDelete = (i) => {
        if (editing === i) handleCancel();
        setSkills(skills.filter((_, idx) => idx !== i));
    };

    return (
        <div>
            <div className="admin-page-header">
                <h1>💻 Bilimlar (Toifali)</h1>
                <p>Skills bo'limi — texnologiyalarni guruhlar bo'yicha boshqarish</p>
            </div>

            {/* List */}
            <div className="admin-card">
                <h3>Mavjud Skilllar ({skills.length})</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {skills.map((s, i) => (
                        <div key={i} className={`admin-item${editing === i ? ' admin-item-editing' : ''}`}>
                            <span style={{ fontSize: '1.3rem', flexShrink: 0 }}>{s.icon || '📦'}</span>
                            <div style={{ width: 12, height: 12, borderRadius: 4, background: s.color, flexShrink: 0 }} />
                            <div className="admin-item-info">
                                <h4>{s.name}</h4>
                                <p style={{ fontSize: '0.75rem', opacity: 0.7 }}>{s.category?.toUpperCase()} • {s.level}%</p>
                            </div>
                            <div className="admin-item-actions">
                                <button className={`admin-edit-btn${editing === i ? ' active-edit' : ''}`} onClick={() => editing === i ? handleCancel() : handleEdit(i)}>
                                    {editing === i ? '✖️' : '✏️'}
                                </button>
                                <button className="admin-delete-btn" onClick={() => handleDelete(i)}>🗑️</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Add / Edit form */}
            <div className="admin-card" style={editing !== null ? { border: '1px solid #6382ff', boxShadow: '0 0 15px rgba(99,130,255,0.15)' } : {}}>
                <h3>{editing !== null ? `✏️ "${skills[editing]?.name}" ni tahrirlash` : '➕ Yangi Skill'}</h3>
                <div className="admin-form-row">
                    <div className="admin-form-group">
                        <label>Nomi</label>
                        <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="React" />
                    </div>
                    <div className="admin-form-group">
                        <label>Toifa (Category)</label>
                        <select
                            value={form.category}
                            onChange={(e) => setForm({ ...form, category: e.target.value })}
                            style={{ padding: '8px 12px', borderRadius: 8, border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.2)', color: '#fff' }}
                        >
                            <option value="languages">Languages (Tillar)</option>
                            <option value="libraries">Libraries & Frameworks</option>
                            <option value="tools">Tools & Utilities</option>
                        </select>
                    </div>
                </div>
                <div className="admin-form-row">
                    <div className="admin-form-group">
                        <label>Icon (emoji)</label>
                        <input value={form.icon} onChange={(e) => setForm({ ...form, icon: e.target.value })} placeholder="⚛️" style={{ fontSize: '1.2rem' }} />
                    </div>
                    <div className="admin-form-group">
                        <label>Rang</label>
                        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                            <input type="color" value={form.color} onChange={(e) => setForm({ ...form, color: e.target.value })} style={{ width: 48, height: 36, border: 'none', cursor: 'pointer' }} />
                            <input value={form.color} onChange={(e) => setForm({ ...form, color: e.target.value })} style={{ flex: 1 }} />
                        </div>
                    </div>
                </div>
                <div className="admin-form-row">
                    <div className="admin-form-group">
                        <label>Daraja (%) - Foydalanilmaydi, lekin saqlanadi</label>
                        <input type="number" min="0" max="100" value={form.level} onChange={(e) => setForm({ ...form, level: e.target.value })} />
                    </div>
                </div>
                {editing !== null ? (
                    <div style={{ display: 'flex', gap: 10 }}>
                        <button className="admin-save-btn" onClick={handleUpdate}>✅ O'zgartirish</button>
                        <button className="admin-delete-btn" onClick={handleCancel}>✖️ Bekor qilish</button>
                    </div>
                ) : (
                    <button className="admin-add-btn" onClick={handleAdd}>+ Qo'shish</button>
                )}
            </div>

            <button className="admin-save-btn" onClick={handleSave} style={{ marginTop: 20 }} disabled={saving}>
                {saving ? '⏳ Saqlanmoqda...' : '💾 Firebasega Saqlash'}
            </button>
            {toast && <div className="admin-toast">{toast}</div>}
        </div>
    );
}
