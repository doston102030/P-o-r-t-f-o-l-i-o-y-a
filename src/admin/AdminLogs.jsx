import { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, query, orderBy, onSnapshot, doc, deleteDoc, updateDoc } from 'firebase/firestore';

export default function AdminLogs() {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [toast, setToast] = useState('');

    useEffect(() => {
        const q = query(collection(db, 'messages'), orderBy('timestamp', 'desc'));
        const unsubscribe = onSnapshot(q, (snap) => {
            const msgs = snap.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setMessages(msgs);
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    const handleDelete = async (id) => {
        if (!window.confirm('Haqiqatan ham ushbu xabarni o\'chirmoqchimisiz?')) return;
        try {
            await deleteDoc(doc(db, 'messages', id));
            setToast('Xabar o\'chirildi');
            setTimeout(() => setToast(''), 2000);
        } catch (err) {
            alert("Xatolik: " + err.message);
        }
    };

    const markAsRead = async (id, currentStatus) => {
        try {
            await updateDoc(doc(db, 'messages', id), { read: !currentStatus });
        } catch (err) {
            console.error(err);
        }
    };

    const formatDate = (ts) => {
        if (!ts) return 'Hozir';
        const date = ts.toDate();
        return date.toLocaleString('uz-UZ', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    if (loading) return <div className="admin-loading">Yuklanmoqda...</div>;

    return (
        <div>
            <div className="admin-page-header">
                <h1>📨 Xabarlar (Logs)</h1>
                <p>Kontakt formasi orqali kelgan xabarlar</p>
            </div>

            <div className="admin-card">
                <h3>Kelgan xabarlar ({messages.length})</h3>
                {messages.length === 0 ? (
                    <p style={{ color: '#94a3b8', textAlign: 'center', padding: '40px 0' }}>Hozircha xabarlar yo'q.</p>
                ) : (
                    <div className="logs-list">
                        {messages.map((m) => (
                            <div key={m.id} className={`admin-item log-item ${m.read ? '' : 'unread'}`} style={{ flexDirection: 'column', alignItems: 'flex-start', gap: 12 }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
                                    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                                        <div className="log-status-dot" style={{ width: 8, height: 8, borderRadius: '50%', background: m.read ? 'transparent' : '#6382ff' }} />
                                        <span style={{ fontWeight: 700, fontSize: '1rem' }}>{m.name}</span>
                                        <span style={{ color: '#6382ff', fontSize: '0.8rem' }}>{m.email}</span>
                                    </div>
                                    <span style={{ fontSize: '0.75rem', color: '#64748b' }}>{formatDate(m.timestamp)}</span>
                                </div>

                                <div className="log-message-body" style={{ background: 'rgba(255,255,255,0.02)', padding: 16, borderRadius: 12, width: '100%', fontSize: '0.9rem', lineBreak: 'anywhere' }}>
                                    {m.message}
                                </div>

                                <div className="admin-item-actions" style={{ width: '100%', justifyContent: 'flex-end', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: 12, marginTop: 4 }}>
                                    <button
                                        className="admin-edit-btn"
                                        onClick={() => markAsRead(m.id, m.read)}
                                        style={{ fontSize: '0.75rem' }}
                                    >
                                        {m.read ? 'O\'qilmagan deb belgilash' : 'O\'qildi deb belgilash'}
                                    </button>
                                    <button className="admin-delete-btn" onClick={() => handleDelete(m.id)}>🗑️ O'chirish</button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {toast && <div className="admin-toast">{toast}</div>}

            <style>{`
        .log-item.unread {
          border-left: 3px solid #6382ff;
          background: rgba(99, 130, 255, 0.03);
        }
        .logs-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
      `}</style>
        </div>
    );
}
