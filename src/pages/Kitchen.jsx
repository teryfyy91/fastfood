import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Clock,
    CheckCircle2,
    AlertCircle,
    ChefHat,
    Volume2,
    Bell
} from 'lucide-react';

const INITIAL_ORDERS = [];

const Kitchen = () => {
    const [orders, setOrders] = useState(INITIAL_ORDERS);

    const moveStatus = (id, nextStatus) => {
        setOrders(prev => prev.map(order =>
            order.id === id ? { ...order, status: nextStatus } : order
        ));
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'new': return 'var(--primary)';
            case 'preparing': return 'var(--warning)';
            case 'ready': return 'var(--success)';
            default: return 'var(--text-dim)';
        }
    };

    const columns = [
        { key: 'new', label: 'YANGI BUYURTMALAR', icon: <Bell size={20} /> },
        { key: 'preparing', label: 'TAYYORLANMOQDA', icon: <ChefHat size={20} /> },
        { key: 'ready', label: 'OLIB KETISHGA TAYYOR', icon: <CheckCircle2 size={20} /> },
    ];

    return (
        <div className="kitchen-page animate-fade-in" style={{ height: 'calc(100vh - 120px)', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <h1 style={{ fontSize: '1.8rem', color: 'white' }}>OSHXONA BOSHQUV TIZIMI</h1>
                    <p style={{ color: 'var(--text-dim)' }}>Buyurtmalarni real vaqt rejimida kuzatish va boshqarish.</p>
                </div>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <button className="glass-card" style={{ padding: '10px 20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Volume2 size={20} color="var(--primary)" />
                        <span>Ovoz yoqilgan</span>
                    </button>
                    <div className="glass-card" style={{ padding: '10px 20px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{ textAlign: 'right' }}>
                            <p style={{ fontSize: '0.7rem', color: 'var(--text-dim)' }}>O'RT. TAYYORLANISH VAQTI</p>
                            <p style={{ fontSize: '1rem', fontWeight: 'bold', color: 'var(--success)' }}>00:00</p>
                        </div>
                        <TimerIcon color="var(--success)" />
                    </div>
                </div>
            </div>

            <div style={{ flex: 1, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', overflow: 'hidden' }}>
                {columns.map(col => (
                    <div key={col.key} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', overflow: 'hidden' }}>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            padding: '12px 16px',
                            background: 'var(--glass)',
                            borderRadius: '12px',
                            borderBottom: `2px solid ${getStatusColor(col.key)}`
                        }}>
                            <span style={{ color: getStatusColor(col.key) }}>{col.icon}</span>
                            <h3 style={{ fontSize: '0.9rem', letterSpacing: '1px' }}>{col.label}</h3>
                            <span style={{ marginLeft: 'auto', background: 'rgba(255,255,255,0.1)', padding: '2px 8px', borderRadius: '10px', fontSize: '0.8rem' }}>
                                {orders.filter(o => o.status === col.key).length}
                            </span>
                        </div>

                        <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1rem', paddingRight: '4px' }}>
                            <AnimatePresence>
                                {orders.filter(o => o.status === col.key).map(order => (
                                    <motion.div
                                        key={order.id}
                                        layout
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        className="glass-card"
                                        style={{
                                            padding: '1.2rem',
                                            borderLeft: order.priority ? '4px solid var(--danger)' : '1px solid var(--glass-border)'
                                        }}
                                    >
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                                            <span style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>{order.id}</span>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-dim)', fontSize: '0.85rem' }}>
                                                <Clock size={14} />
                                                <span>{order.time}</span>
                                            </div>
                                        </div>

                                        <div style={{ marginBottom: '1.5rem' }}>
                                            {order.items.map((item, i) => (
                                                <p key={i} style={{ marginBottom: '4px', fontSize: '0.9rem', color: '#fff' }}>{item}</p>
                                            ))}
                                        </div>

                                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                                            {col.key === 'new' && (
                                                <button
                                                    onClick={() => moveStatus(order.id, 'preparing')}
                                                    className="neon-btn"
                                                    style={{ flex: 1, padding: '8px', fontSize: '0.8rem', background: 'var(--warning)', boxShadow: 'none' }}
                                                >
                                                    TAYYORLASH
                                                </button>
                                            )}
                                            {col.key === 'preparing' && (
                                                <button
                                                    onClick={() => moveStatus(order.id, 'ready')}
                                                    className="neon-btn"
                                                    style={{ flex: 1, padding: '8px', fontSize: '0.8rem', background: 'var(--success)', boxShadow: 'none' }}
                                                >
                                                    TAYYOR
                                                </button>
                                            )}
                                            {col.key === 'ready' && (
                                                <button
                                                    onClick={() => setOrders(prev => prev.filter(o => o.id !== order.id))}
                                                    className="neon-btn"
                                                    style={{ flex: 1, padding: '8px', fontSize: '0.8rem', boxShadow: 'none' }}
                                                >
                                                    YAKUNLASH
                                                </button>
                                            )}
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const TimerIcon = ({ color }) => (
    <div style={{
        width: '32px',
        height: '32px',
        borderRadius: '50%',
        border: `2px solid ${color}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    }}>
        <div style={{ width: '2px', height: '10px', background: color, transform: 'rotate(45deg)', transformOrigin: 'bottom' }}></div>
    </div>
);

export default Kitchen;
