import { useState, useEffect } from 'react';
import { db, storage } from '../firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

export default function AdminHero() {
    const [data, setData] = useState({
        name1: 'Adhamjonov',
        name2: 'Doston',
        role: 'Frontend Developer',
        tagline: 'Zamonaviy va chiroyli web saytlar yarataman',
        badge: '✋ Salom, men frontend dasturchiman',
        stack: 'React, Next.js, TypeScript, Tailwind',
        initials: 'DA',
        badgeTL: '⚡ Tez va sifatli',
        badgeBR: '🏆 3+ yil tajriba',
        cvUrl: '',
    });
    const [saving, setSaving] = useState(false);
    const [cvUploading, setCvUploading] = useState(false);
    const [cvProgress, setCvProgress] = useState('');
    const [toast, setToast] = useState('');

    useEffect(() => {
        getDoc(doc(db, 'portfolio', 'hero')).then((snap) => {
            if (snap.exists()) {
                const snapData = snap.data();
                // avatarUrl ni olib tashlaymiz, kerak emas
                const { avatarUrl, ...rest } = snapData;
                setData(prev => ({ ...prev, ...rest }));
            }
        }).catch(() => { });
    }, []);

    const handleCvUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // Faqat PDF tekshirish
        if (!file.name.toLowerCase().endsWith('.pdf')) {
            showToast('❌ Faqat PDF fayl yuklang!');
            e.target.value = '';
            return;
        }

        // 10MB dan katta bo'lsa
        if (file.size > 10 * 1024 * 1024) {
            showToast('❌ Fayl hajmi 10MB dan katta!');
            e.target.value = '';
            return;
        }

        setCvUploading(true);
        setCvProgress('📤 Yuklanmoqda...');

        try {
            const fileName = `cv_${Date.now()}_${file.name}`;
            const fileRef = ref(storage, `portfolio/docs/${fileName}`);

            setCvProgress('📤 Firebase ga yuklanmoqda...');
            await uploadBytes(fileRef, file);

            setCvProgress('🔗 URL olinmoqda...');
            const url = await getDownloadURL(fileRef);

            setData(prev => ({ ...prev, cvUrl: url }));
            showToast('✅ CV muvaffaqiyatli yuklandi!');
            setCvProgress('');
        } catch (err) {
            console.error("CV Upload error:", err);

            // Aniq xatolik xabarlarini ko'rsatish
            let errorMsg = 'Yuklashda xatolik!';
            if (err.code === 'storage/unauthorized') {
                errorMsg = '🔒 Firebase Storage ruxsati yo\'q! Firebase Console → Storage → Rules ni tekshiring';
            } else if (err.code === 'storage/canceled') {
                errorMsg = '❌ Yuklash bekor qilindi';
            } else if (err.code === 'storage/unknown') {
                errorMsg = '❌ Noma\'lum xatolik. Internet aloqangizni tekshiring';
            } else {
                errorMsg = '❌ ' + err.message;
            }

            showToast(errorMsg);
            setCvProgress('');
        } finally {
            setCvUploading(false);
            e.target.value = '';
        }
    };

    const showToast = (msg) => {
        setToast(msg);
        setTimeout(() => setToast(''), 4000);
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            await setDoc(doc(db, 'portfolio', 'hero'), data);
            showToast('✅ Saqlandi!');
        } catch (err) {
            showToast('❌ Xatolik: ' + err.message);
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

                {/* CV UPLOAD */}
                <div className="admin-form-group">
                    <label>CV Fayl (PDF)</label>
                    <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
                        <input
                            type="file"
                            accept=".pdf,application/pdf"
                            onChange={handleCvUpload}
                            style={{ padding: '8px' }}
                            disabled={cvUploading}
                        />
                        {cvUploading && (
                            <span style={{
                                fontSize: '0.85rem',
                                color: '#6382ff',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px'
                            }}>
                                <span style={{
                                    width: '14px',
                                    height: '14px',
                                    border: '2px solid rgba(99,130,255,0.2)',
                                    borderTop: '2px solid #6382ff',
                                    borderRadius: '50%',
                                    display: 'inline-block',
                                    animation: 'spin 0.8s linear infinite'
                                }} />
                                {cvProgress}
                            </span>
                        )}
                    </div>
                    <input
                        value={data.cvUrl}
                        onChange={(e) => setData({ ...data, cvUrl: e.target.value })}
                        placeholder="Yoki CV URL kiriting..."
                        style={{ marginTop: '10px' }}
                    />
                    {data.cvUrl && (
                        <div style={{
                            marginTop: '10px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                            padding: '10px 14px',
                            background: 'rgba(99, 130, 255, 0.06)',
                            borderRadius: '10px',
                            border: '1px solid rgba(99, 130, 255, 0.15)'
                        }}>
                            <span style={{ fontSize: '1.2rem' }}>📄</span>
                            <a
                                href={data.cvUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{ color: '#6382ff', fontSize: '0.85rem', wordBreak: 'break-all' }}
                            >
                                CV yuklangan ✅ (Ko'rish uchun bosing)
                            </a>
                        </div>
                    )}
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

            <button className="admin-save-btn" onClick={handleSave} disabled={saving || cvUploading}>
                {saving ? '⏳ Saqlanmoqda...' : '💾 Saqlash'}
            </button>

            {toast && <div className="admin-toast">{toast}</div>}

            <style>{`
                @keyframes spin {
                    to { transform: rotate(360deg); }
                }
            `}</style>
        </div>
    );
}

