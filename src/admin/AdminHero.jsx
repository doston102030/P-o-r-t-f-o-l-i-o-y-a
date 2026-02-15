import { useState, useEffect } from 'react';
import { db, storage } from '../firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

export default function AdminHero() {
    const [data, setData] = useState({
        name1: 'Abdumajid',
        name2: 'Xolmatov',
        role: 'Frontend Developer',
        tagline: 'Zamonaviy va chiroyli web saytlar yarataman',
        badge: '✋ Salom, men frontend dasturchiman',
        stack: 'React, Next.js, TypeScript, Tailwind',
        initials: 'AX',
        badgeTL: '⚡ Tez va sifatli',
        badgeBR: '🏆 3+ yil tajriba',
        avatarUrl: '',
        cvUrl: '',
    });
    const [saving, setSaving] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [toast, setToast] = useState('');

    useEffect(() => {
        getDoc(doc(db, 'portfolio', 'hero')).then((snap) => {
            if (snap.exists()) setData(snap.data());
        }).catch(() => { });
    }, []);

    const handleFileUpload = async (e, type) => {
        const file = e.target.files[0];
        if (!file) return;

        setUploading(true);
        try {
            const folder = type === 'cv' ? 'docs' : 'images';
            const fileRef = ref(storage, `portfolio/${folder}/${Date.now()}_${file.name}`);
            await uploadBytes(fileRef, file);
            const url = await getDownloadURL(fileRef);

            setData(prev => ({
                ...prev,
                [type === 'cv' ? 'cvUrl' : 'avatarUrl']: url
            }));
            setToast(`${type === 'cv' ? 'CV' : 'Rasm'} yuklandi! ✅`);
        } catch (err) {
            console.error("Upload error:", err);
            setToast('Yuklashda xatolik: ' + err.message);
        } finally {
            setUploading(false);
            setTimeout(() => setToast(''), 3000);
        }
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            await setDoc(doc(db, 'portfolio', 'hero'), data);
            setToast('Saqlandi! ✅');
            setTimeout(() => setToast(''), 2500);
        } catch (err) {
            setToast('Xatolik: ' + err.message);
            setTimeout(() => setToast(''), 3000);
        }
        setSaving(false);
    };

    return (
        <div>
            <div className="admin-page-header">
                <h1>🏠 Hero Bo'limi</h1>
                <p>Asosiy sahifadagi bosh qism ma'lumotlari</p>
            </div>

            <div className="admin-card">
                <h3>Ism va Lavozim</h3>
                <div className="admin-form-row">
                    <div className="admin-form-group">
                        <label>Ism (1-qator)</label>
                        <input value={data.name1} onChange={(e) => setData({ ...data, name1: e.target.value })} />
                    </div>
                    <div className="admin-form-group">
                        <label>Ism (2-qator, gradient)</label>
                        <input value={data.name2} onChange={(e) => setData({ ...data, name2: e.target.value })} />
                    </div>
                </div>
                <div className="admin-form-group">
                    <label>Lavozim / Rol</label>
                    <input value={data.role} onChange={(e) => setData({ ...data, role: e.target.value })} />
                </div>
                <div className="admin-form-group">
                    <label>Initials (Avatar o'rniga)</label>
                    <input value={data.initials} onChange={(e) => setData({ ...data, initials: e.target.value })} maxLength={3} />
                </div>

                <div className="admin-form-group">
                    <label>Avatar Rasm</label>
                    <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleFileUpload(e, 'avatar')}
                            style={{ padding: '8px' }}
                            disabled={uploading}
                        />
                        {uploading && <span style={{ fontSize: '0.9rem', color: 'var(--accent)' }}>Yuklanmoqda...</span>}
                    </div>
                    <input
                        value={data.avatarUrl}
                        onChange={(e) => setData({ ...data, avatarUrl: e.target.value })}
                        placeholder="Yoki URL kiriting..."
                        style={{ marginTop: '10px' }}
                    />
                    {data.avatarUrl && (
                        <img src={data.avatarUrl} alt="Preview" style={{ width: 60, height: 60, borderRadius: '50%', marginTop: 10, objectFit: 'cover' }} />
                    )}
                </div>

                <div className="admin-form-group">
                    <label>CV Fayl (PDF)</label>
                    <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                        <input
                            type="file"
                            accept=".pdf"
                            onChange={(e) => handleFileUpload(e, 'cv')}
                            style={{ padding: '8px' }}
                            disabled={uploading}
                        />
                    </div>
                    <input
                        value={data.cvUrl}
                        onChange={(e) => setData({ ...data, cvUrl: e.target.value })}
                        placeholder="Yoki URL kiriting..."
                        style={{ marginTop: '10px' }}
                    />
                </div>
            </div>

            <div className="admin-card">
                <h3>Matn va Badge</h3>
                <div className="admin-form-group">
                    <label>Badge (yuqoridagi yashil nuqta yonidagi)</label>
                    <input value={data.badge} onChange={(e) => setData({ ...data, badge: e.target.value })} />
                </div>
                <div className="admin-form-group">
                    <label>Tagline (qisqa tavsif)</label>
                    <textarea rows={3} value={data.tagline} onChange={(e) => setData({ ...data, tagline: e.target.value })} />
                </div>
            </div>

            <div className="admin-card">
                <h3>Texnologiyalar va Badgelar</h3>
                <div className="admin-form-group">
                    <label>Stack (vergul bilan)</label>
                    <input value={data.stack} onChange={(e) => setData({ ...data, stack: e.target.value })} placeholder="React, Next.js, TypeScript" />
                </div>
                <div className="admin-form-row">
                    <div className="admin-form-group">
                        <label>Suzuvchi badge (chap-yuqori)</label>
                        <input value={data.badgeTL} onChange={(e) => setData({ ...data, badgeTL: e.target.value })} />
                    </div>
                    <div className="admin-form-group">
                        <label>Suzuvchi badge (o'ng-pastki)</label>
                        <input value={data.badgeBR} onChange={(e) => setData({ ...data, badgeBR: e.target.value })} />
                    </div>
                </div>
            </div>

            <button className="admin-save-btn" onClick={handleSave} disabled={saving || uploading}>
                {saving ? '⏳ Saqlanmoqda...' : '💾 Saqlash'}
            </button>

            {toast && <div className="admin-toast">{toast}</div>}
        </div>
    );
}
