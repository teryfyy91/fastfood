import React from 'react';
import { motion } from 'framer-motion';
import {
    Users,
    Clock,
    CheckCircle2,
    UserCheck,
    Megaphone,
    Monitor
} from 'lucide-react';

const QUEUE_DATA = [];

const Queue = () => {
    return (
        <div className="queue-page animate-fade-in">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <div>
                    <h1 style={{ fontSize: '1.8rem', color: 'white' }}>NAVBATNI BOSHQARISH</h1>
                    <p style={{ color: 'var(--text-dim)' }}>Buyurtma holati va mijozlarni xabardor qilish tizimi.</p>
                </div>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <button className="glass-card" style={{ padding: '12px 20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Monitor size={18} />
                        <span>Holat doskasini ochish</span>
                    </button>
                    <button className="neon-btn" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Megaphone size={18} />
                        <span>Keyingisini chaqirish</span>
                    </button>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                {/* Customer View Console (Simulation) */}
                <div className="glass-card" style={{ padding: '2rem', background: 'var(--bg-sidebar)', border: '2px solid var(--primary)' }}>
                    <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                        <h2 style={{ fontSize: '1.5rem', color: 'var(--primary)', marginBottom: '8px' }}>HOZIR XIZMAT KO'RSATILMOQDA</h2>
                        <div style={{ fontSize: '5rem', fontWeight: 'bold', fontFamily: 'var(--font-display)', textShadow: '0 0 20px var(--primary-glow)' }}>-</div>
                        <p style={{ color: 'var(--text-dim)' }}>Iltimos, 1-oynaga murojaat qiling</p>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                        <div>
                            <h3 style={{ fontSize: '0.9rem', color: 'var(--warning)', marginBottom: '1rem', textAlign: 'center' }}>TAYYORLANMOQDA</h3>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'center' }}>
                                {[].map(num => (
                                    <div key={num} style={{ fontSize: '1.5rem', fontWeight: 'bold', padding: '10px 20px', background: 'var(--glass)', borderRadius: '8px' }}>{num}</div>
                                ))}
                            </div>
                        </div>
                        <div>
                            <h3 style={{ fontSize: '0.9rem', color: 'var(--success)', marginBottom: '1rem', textAlign: 'center' }}>TAYYOR</h3>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'center' }}>
                                {[].map(num => (
                                    <div key={num} style={{ fontSize: '1.5rem', fontWeight: 'bold', padding: '10px 20px', background: 'rgba(16, 185, 129, 0.2)', borderRadius: '8px', color: 'var(--success)', border: '1px solid var(--success)' }}>{num}</div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Admin Queue Control */}
                <div className="glass-card" style={{ padding: '1.5rem' }}>
                    <h3 style={{ fontSize: '1.1rem', marginBottom: '1.5rem' }}>NAVBAT BOSHQARUVI</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {QUEUE_DATA.map((customer, index) => (
                            <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', background: 'var(--glass)', borderRadius: '12px' }}>
                                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
                                    {customer.id}
                                </div>
                                <div style={{ flex: 1 }}>
                                    <p style={{ fontWeight: '600' }}>{customer.name}</p>
                                    <p style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>{customer.items} ta mahsulot • {customer.time} kutilmoqda</p>
                                </div>
                                <div style={{ textAlign: 'right' }}>
                                    <span style={{
                                        padding: '4px 10px',
                                        borderRadius: '12px',
                                        fontSize: '0.7rem',
                                        fontWeight: 'bold',
                                        background: customer.status === 'Ready' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(245, 158, 11, 0.1)',
                                        color: customer.status === 'Ready' ? 'var(--success)' : 'var(--warning)'
                                    }}>
                                        {customer.status}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Queue;
