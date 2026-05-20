import React from 'react';
import { Search, Bell, User, Plus } from 'lucide-react';

const Topbar = () => {
    return (
        <header className="topbar">
            <div className="search-container" style={{ position: 'relative', width: '400px' }}>
                <Search
                    style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-dim)' }}
                    size={18}
                />
                <input
                    type="text"
                    placeholder="Buyurtmalar, mijozlar yoki hisobotlarni qidirish..."
                    style={{
                        width: '100%',
                        padding: '12px 12px 12px 48px',
                        background: 'var(--glass)',
                        border: '1px solid var(--glass-border)',
                        borderRadius: '12px',
                        color: 'white',
                        outline: 'none',
                        fontSize: '0.9rem'
                    }}
                />
            </div>

            <div className="topbar-actions" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                <button className="neon-btn" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 20px' }}>
                    <Plus size={18} />
                    <span>Yangi buyurtma</span>
                </button>

                <div style={{ position: 'relative', cursor: 'pointer' }}>
                    <div style={{
                        position: 'absolute',
                        top: '-2px',
                        right: '-2px',
                        width: '8px',
                        height: '8px',
                        background: 'var(--danger)',
                        borderRadius: '50%',
                        border: '2px solid var(--bg-dark)'
                    }}></div>
                    <Bell color="var(--text-dim)" size={22} />
                </div>

                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '4px 4px 4px 16px',
                    borderLeft: '1px solid var(--border)'
                }}>
                    <div style={{ textAlign: 'right' }}>
                        <p style={{ fontSize: '0.9rem', fontWeight: '600' }}>Alex Rivera</p>
                        <p style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>Boshqaruvchi</p>
                    </div>
                    <div style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '12px',
                        background: 'linear-gradient(135deg, var(--primary), var(--accent))',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 'bold'
                    }}>
                        AR
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Topbar;
