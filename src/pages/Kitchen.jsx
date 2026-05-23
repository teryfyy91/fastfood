import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Clock,
    CheckCircle2,
    ChefHat,
    Volume2,
    Bell,
    Flame,
    Timer
} from 'lucide-react';

const Kitchen = () => {
    const [orders, setOrders] = useState([]);
    const [time, setTime] = useState(new Date());

    // Load orders from localStorage and listen for updates
    const loadOrders = () => {
        const saved = JSON.parse(localStorage.getItem('fastfood_orders') || '[]');
        // Only show active orders (not completed)
        setOrders(saved.filter(o => o.status !== 'completed'));
    };

    useEffect(() => {
        loadOrders();
        window.addEventListener('ordersUpdated', loadOrders);
        window.addEventListener('storage', loadOrders);
        const tick = setInterval(() => setTime(new Date()), 1000);
        return () => {
            window.removeEventListener('ordersUpdated', loadOrders);
            window.removeEventListener('storage', loadOrders);
            clearInterval(tick);
        };
    }, []);

    const moveStatus = (id, nextStatus) => {
        const all = JSON.parse(localStorage.getItem('fastfood_orders') || '[]');
        const updated = all.map(o => o.id === id ? { ...o, status: nextStatus } : o);
        localStorage.setItem('fastfood_orders', JSON.stringify(updated));
        window.dispatchEvent(new Event('ordersUpdated'));
    };

    const columns = [
        {
            key: 'pending',
            label: 'Yangi buyurtmalar',
            icon: <Bell size={18} />,
            color: '#6366f1',
            bg: 'rgba(99,102,241,0.08)'
        },
        {
            key: 'preparing',
            label: 'Tayyorlanmoqda',
            icon: <ChefHat size={18} />,
            color: '#f59e0b',
            bg: 'rgba(245,158,11,0.08)'
        },
        {
            key: 'ready',
            label: 'Tayyor — berilsin',
            icon: <CheckCircle2 size={18} />,
            color: '#10b981',
            bg: 'rgba(16,185,129,0.08)'
        },
    ];

    const pad = n => String(n).padStart(2, '0');
    const timeStr = `${pad(time.getHours())}:${pad(time.getMinutes())}:${pad(time.getSeconds())}`;

    const shortId = (id) => '#' + (id.split('-')[1] || id).slice(-4);
    const elapsed = (ts) => {
        const m = Math.floor((Date.now() - new Date(ts).getTime()) / 60000);
        if (m < 1) return 'Hozir';
        if (m < 60) return `${m} daq`;
        return `${Math.floor(m / 60)}s ${m % 60}d`;
    };

    return (
        <div className="kitchen-page" style={{ height: 'calc(100vh - 120px)', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

            {/* ── Premium Header ── */}
            <div style={{
                background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #0f172a 100%)',
                borderRadius: '24px',
                padding: '1.5rem 2rem',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                boxShadow: '0 8px 32px rgba(99,102,241,0.15)',
                border: '1px solid rgba(99,102,241,0.2)'
            }}>
                {/* Left: Title */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div style={{
                        width: '52px',
                        height: '52px',
                        background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                        borderRadius: '16px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 4px 20px rgba(99,102,241,0.4)'
                    }}>
                        <Flame size={28} color="white" />
                    </div>
                    <div>
                        <h1 style={{
                            fontSize: '1.6rem',
                            fontWeight: '900',
                            letterSpacing: '2px',
                            textTransform: 'uppercase',
                            background: 'linear-gradient(90deg, #fff, #a5b4fc)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            margin: 0
                        }}>
                            Oshxona boshqaruv tizimi
                        </h1>
                        <p style={{ color: 'rgba(165,180,252,0.7)', fontSize: '0.85rem', margin: 0, marginTop: '2px' }}>
                            Buyurtmalarni real vaqt rejimida kuzatish va boshqarish
                        </p>
                    </div>
                </div>

                {/* Right: Clock + Stats */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                    {/* Live orders count */}
                    <div style={{ textAlign: 'center' }}>
                        <p style={{ fontSize: '0.7rem', color: 'rgba(165,180,252,0.6)', letterSpacing: '1px', textTransform: 'uppercase', margin: 0 }}>Faol</p>
                        <p style={{ fontSize: '1.8rem', fontWeight: '900', color: '#6366f1', margin: 0, lineHeight: 1 }}>{orders.length}</p>
                    </div>

                    <div style={{ width: '1px', height: '40px', background: 'rgba(255,255,255,0.1)' }} />

                    {/* Live Clock */}
                    <div style={{
                        background: 'rgba(99,102,241,0.15)',
                        border: '1px solid rgba(99,102,241,0.3)',
                        borderRadius: '14px',
                        padding: '10px 18px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
                    }}>
                        <Timer size={18} color="#a5b4fc" />
                        <span style={{
                            fontFamily: 'monospace',
                            fontSize: '1.3rem',
                            fontWeight: '800',
                            color: '#a5b4fc',
                            letterSpacing: '2px'
                        }}>
                            {timeStr}
                        </span>
                    </div>
                </div>
            </div>

            {/* ── Kanban Columns ── */}
            <div style={{ flex: 1, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', overflow: 'hidden' }}>
                {columns.map(col => {
                    const colOrders = orders.filter(o => o.status === col.key);
                    return (
                        <div key={col.key} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', overflow: 'hidden' }}>
                            {/* Column Header */}
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '10px',
                                padding: '12px 16px',
                                background: col.bg,
                                borderRadius: '14px',
                                border: `1px solid ${col.color}30`,
                                borderBottom: `3px solid ${col.color}`
                            }}>
                                <span style={{ color: col.color }}>{col.icon}</span>
                                <h3 style={{ fontSize: '0.9rem', fontWeight: '800', color: col.color, letterSpacing: '0.5px', flex: 1 }}>
                                    {col.label.toUpperCase()}
                                </h3>
                                <span style={{
                                    background: col.color,
                                    color: 'white',
                                    padding: '2px 10px',
                                    borderRadius: '20px',
                                    fontSize: '0.8rem',
                                    fontWeight: '800'
                                }}>
                                    {colOrders.length}
                                </span>
                            </div>

                            {/* Order Cards */}
                            <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1rem', paddingRight: '4px' }}>
                                <AnimatePresence>
                                    {colOrders.length === 0 ? (
                                        <div style={{
                                            flex: 1,
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            padding: '3rem 1rem',
                                            color: 'var(--text-dim)',
                                            opacity: 0.4,
                                            gap: '10px'
                                        }}>
                                            <ChefHat size={36} />
                                            <p style={{ fontSize: '0.85rem' }}>Bo'sh</p>
                                        </div>
                                    ) : colOrders.map(order => {
                                        const mins = Math.floor((Date.now() - new Date(order.timestamp).getTime()) / 60000);
                                        const isLate = mins > 15;
                                        return (
                                            <motion.div
                                                key={order.id}
                                                layout
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, scale: 0.9 }}
                                                className="glass-card"
                                                style={{
                                                    padding: '1.2rem',
                                                    borderLeft: `4px solid ${isLate ? '#ef4444' : col.color}`,
                                                    background: isLate ? 'rgba(239,68,68,0.04)' : 'white'
                                                }}
                                            >
                                                {/* Card Header */}
                                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                                                    <span style={{
                                                        fontWeight: '900',
                                                        fontSize: '1.1rem',
                                                        color: col.color
                                                    }}>
                                                        Buyurtma {shortId(order.id)}
                                                    </span>
                                                    <div style={{
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: '4px',
                                                        fontSize: '0.78rem',
                                                        fontWeight: '700',
                                                        color: isLate ? '#ef4444' : 'var(--text-dim)',
                                                        background: isLate ? 'rgba(239,68,68,0.08)' : 'var(--bg-body)',
                                                        padding: '4px 8px',
                                                        borderRadius: '8px'
                                                    }}>
                                                        <Clock size={12} />
                                                        {elapsed(order.timestamp)}
                                                    </div>
                                                </div>

                                                {/* Items */}
                                                <div style={{ marginBottom: '14px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                                                    {Array.isArray(order.items) ? order.items.map((item, i) => (
                                                        <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem' }}>
                                                            <span style={{ fontWeight: '600' }}>{item.name}</span>
                                                            <span style={{ color: col.color, fontWeight: '800' }}>×{item.quantity}</span>
                                                        </div>
                                                    )) : (
                                                        <p style={{ fontSize: '0.88rem', color: 'var(--text-dim)' }}>{order.items}</p>
                                                    )}
                                                </div>

                                                {/* Total */}
                                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', paddingTop: '10px', borderTop: '1px solid var(--border)' }}>
                                                    <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>Jami</span>
                                                    <span style={{ fontWeight: '900', fontSize: '0.95rem', color: '#0f172a' }}>{order.total?.toLocaleString()} so'm</span>
                                                </div>

                                                {/* Action Button */}
                                                {col.key === 'pending' && (
                                                    <button
                                                        onClick={() => moveStatus(order.id, 'preparing')}
                                                        style={{
                                                            width: '100%', padding: '10px', borderRadius: '10px', border: 'none',
                                                            background: 'linear-gradient(135deg, #f59e0b, #d97706)',
                                                            color: 'white', fontWeight: '800', fontSize: '0.85rem',
                                                            cursor: 'pointer', letterSpacing: '0.5px'
                                                        }}
                                                    >
                                                        ⚡ TAYYORLASHNI BOSHLASH
                                                    </button>
                                                )}
                                                {col.key === 'preparing' && (
                                                    <button
                                                        onClick={() => moveStatus(order.id, 'ready')}
                                                        style={{
                                                            width: '100%', padding: '10px', borderRadius: '10px', border: 'none',
                                                            background: 'linear-gradient(135deg, #10b981, #059669)',
                                                            color: 'white', fontWeight: '800', fontSize: '0.85rem',
                                                            cursor: 'pointer', letterSpacing: '0.5px'
                                                        }}
                                                    >
                                                        ✓ TAYYOR
                                                    </button>
                                                )}
                                                {col.key === 'ready' && (
                                                    <button
                                                        onClick={() => moveStatus(order.id, 'completed')}
                                                        style={{
                                                            width: '100%', padding: '10px', borderRadius: '10px', border: 'none',
                                                            background: 'linear-gradient(135deg, #6366f1, #4f46e5)',
                                                            color: 'white', fontWeight: '800', fontSize: '0.85rem',
                                                            cursor: 'pointer', letterSpacing: '0.5px'
                                                        }}
                                                    >
                                                        📦 BERILDI — YAKUNLASH
                                                    </button>
                                                )}
                                            </motion.div>
                                        );
                                    })}
                                </AnimatePresence>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Kitchen;
