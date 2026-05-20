import React from 'react';
import { motion } from 'framer-motion';
import {
    Smartphone,
    QrCode,
    ShoppingBag,
    ChevronRight,
    Star
} from 'lucide-react';

const QRMenu = () => {
    return (
        <div className="qr-menu-page animate-fade-in">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <div>
                    <h1 style={{ fontSize: '1.8rem', color: 'white' }}>QR MENYU TIZIMI</h1>
                    <p style={{ color: 'var(--text-dim)' }}>Stollar uchun raqamli menyu va aloqasiz buyurtma berish.</p>
                </div>
                <button className="neon-btn" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <QrCode size={18} />
                    <span>QR kodlarni yaratish</span>
                </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 400px) 1fr', gap: '2.5rem' }}>
                {/* Mobile Preview Interface */}
                <div style={{
                    width: '320px',
                    height: '640px',
                    background: '#000',
                    borderRadius: '40px',
                    border: '8px solid #1a1a1a',
                    position: 'relative',
                    overflow: 'hidden',
                    boxShadow: '0 0 40px rgba(188, 19, 254, 0.2)',
                    margin: '0 auto'
                }}>
                    {/* Status Bar */}
                    <div style={{ height: '30px', padding: '10px 20px', display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem' }}>
                        <span>9:41</span>
                        <div style={{ display: 'flex', gap: '4px' }}>
                            <div style={{ width: '12px', height: '12px', background: 'white', borderRadius: '2px' }}></div>
                        </div>
                    </div>

                    <div style={{ padding: '0 1.5rem', overflowY: 'auto', height: 'calc(100% - 30px)' }}>
                        <div style={{ textAlign: 'center', margin: '1.5rem 0' }}>
                            <h2 style={{ fontSize: '1.2rem', fontFamily: 'var(--font-display)' }}>NEON DINER</h2>
                            <p style={{ fontSize: '0.7rem', color: 'var(--text-dim)' }}>Stol #24 • Faol</p>
                        </div>

                        <div style={{ marginBottom: '1.5rem' }}>
                            <img src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&q=80"
                                style={{ width: '100%', height: '140px', objectFit: 'cover', borderRadius: '16px', marginBottom: '1rem' }}
                            />
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <h3 style={{ fontSize: '1rem' }}>Neon Burger</h3>
                                <span className="neon-text">$12.99</span>
                            </div>
                            <p style={{ fontSize: '0.7rem', color: 'var(--text-dim)', marginTop: '4px' }}>Double beef patty with nitro-cheese and plasma-bacon.</p>
                        </div>

                        <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', marginBottom: '1.5rem' }}>
                            {['Ommabop', 'Burgerlar', 'Qo\'shimchalar', 'Ichimliklar'].map((cat, i) => (
                                <span key={i} style={{
                                    padding: '6px 12px',
                                    background: i === 0 ? 'var(--primary)' : 'var(--glass)',
                                    borderRadius: '10px',
                                    fontSize: '0.7rem',
                                    whiteSpace: 'nowrap'
                                }}>{cat}</span>
                            ))}
                        </div>

                        <div className="glass-card" style={{ padding: '10px', marginBottom: '1rem', display: 'flex', gap: '10px', alignItems: 'center' }}>
                            <img src="https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400&q=80" style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '8px' }} />
                            <div style={{ flex: 1 }}>
                                <p style={{ fontSize: '0.8rem', fontWeight: '600' }}>Turbo Fries</p>
                                <div style={{ display: 'flex', gap: '2px' }}>
                                    {[1, 2, 3, 4, 5].map(s => <Star key={s} size={8} fill="var(--warning)" color="var(--warning)" />)}
                                </div>
                            </div>
                            <div style={{ background: 'var(--primary)', padding: '4px', borderRadius: '6px' }}><ShoppingBag size={14} /></div>
                        </div>
                    </div>

                    {/* Cart Button */}
                    <div style={{ position: 'absolute', bottom: '20px', left: '20px', right: '20px' }}>
                        <button style={{
                            width: '100%',
                            background: 'linear-gradient(to right, var(--primary), var(--secondary))',
                            border: 'none',
                            padding: '12px',
                            borderRadius: '12px',
                            color: 'white',
                            fontWeight: 'bold',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        }}>
                            <span>Savatchani ko'rish (2)</span>
                            <span>$17.98</span>
                        </button>
                    </div>
                </div>

                {/* QR Features */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div className="glass-card" style={{ padding: '1.5rem' }}>
                        <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>MOBIL IMKONIYATLAR</h3>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
                            {[
                                { title: 'Mustaqil buyurtma', desc: 'Mijozlar o\'z telefonlaridan buyurtma berishadi' },
                                { title: 'Raqamli to\'lovlar', desc: 'Apple Pay, Google Pay qo\'llab-quvvatlash' },
                                { title: 'Sharhlar', desc: 'Mahsulotlar haqida fikrlar' },
                                { title: 'Sotuvlarni oshirish', desc: 'Aqlli AI tavsiyalari' },
                            ].map((f, i) => (
                                <div key={i} style={{ padding: '1rem', background: 'var(--glass)', borderRadius: '12px' }}>
                                    <p style={{ fontWeight: 'bold', fontSize: '0.9rem', color: 'var(--primary)', marginBottom: '4px' }}>{f.title}</p>
                                    <p style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>{f.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="glass-card" style={{ padding: '1.5rem' }}>
                        <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>SHOBCHA QR KODLARI</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                            {[1, 2, 3, 4].map(table => (
                                <div key={table} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', borderBottom: '1px solid var(--glass-border)' }}>
                                    <span style={{ fontWeight: '600' }}>Stol #{table}</span>
                                    <div style={{ display: 'flex', gap: '8px' }}>
                                        <button style={{ background: 'var(--glass)', border: 'none', padding: '6px 12px', borderRadius: '6px', fontSize: '0.7rem', color: 'white' }}>Yuklab olish</button>
                                        <button style={{ background: 'var(--primary)', border: 'none', padding: '6px 12px', borderRadius: '6px', fontSize: '0.7rem', color: 'white' }}>Ko'rish</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QRMenu;
