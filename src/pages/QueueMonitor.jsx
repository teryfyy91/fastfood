import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChefHat, Bell, CheckCircle2 } from 'lucide-react';

const QueueMonitor = () => {
    const [orders, setOrders] = useState([]);
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const loadOrders = () => {
            const saved = JSON.parse(localStorage.getItem('fastfood_orders') || '[]');
            setOrders(saved);
        };
        loadOrders();
        const interval = setInterval(loadOrders, 3000);
        const timer = setInterval(() => setTime(new Date()), 1000);
        
        return () => {
            clearInterval(interval);
            clearInterval(timer);
        };
    }, []);

    const preparing = orders
        .filter(o => o.status === 'pending' || o.status === 'preparing')
        .map(o => o.id.split('-')[1].slice(-3));

    const ready = orders
        .filter(o => o.status === 'ready')
        .map(o => o.id.split('-')[1].slice(-3));

    const formatTime = (date) => {
        return date.toLocaleTimeString('uz-UZ', { hour: '2-digit', minute: '2-digit' });
    };

    const formatDate = (date) => {
        return date.toLocaleDateString('uz-UZ', { weekday: 'long', day: 'numeric', month: 'long' });
    };

    return (
        <div className="queue-monitor-fullscreen" style={{
            position: 'fixed',
            inset: 0,
            background: '#0a0a0a',
            color: 'white',
            zIndex: 9999,
            padding: '3rem',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '2.5rem',
            overflow: 'hidden'
        }}>
            {/* Header / Brand */}
            <div style={{ position: 'absolute', top: '3rem', left: '3rem', display: 'flex', alignItems: 'center', gap: '20px' }}>
                <div style={{ padding: '12px', background: 'var(--primary)', borderRadius: '20px', boxShadow: '0 0 20px var(--primary-glow)' }}>
                    <ChefHat size={35} color="black" />
                </div>
                <h1 style={{ fontSize: '2.8rem', fontWeight: '900', letterSpacing: '-2px' }}>NEON<span style={{ color: 'var(--primary)' }}>DASH</span></h1>
            </div>

            <div style={{ position: 'absolute', top: '3rem', right: '3rem', textAlign: 'right' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px', justifyContent: 'flex-end' }}>
                    <h2 style={{ fontSize: '2.5rem', fontWeight: '800' }}>{formatTime(time)}</h2>
                    <div style={{ width: '10px', height: '10px', background: 'var(--primary)', borderRadius: '50%', animation: 'statusPulse 1.5s infinite' }}></div>
                </div>
                <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '1.1rem', fontWeight: '600', textTransform: 'capitalize' }}>{formatDate(time)}</p>
            </div>

            {/* Preparing Column */}
            <div style={{
                marginTop: '120px',
                background: 'rgba(255,255,255,0.02)',
                borderRadius: '40px',
                padding: '3rem',
                border: '1px solid rgba(255,255,255,0.05)',
                display: 'flex',
                flexDirection: 'column',
                gap: '2rem'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px', color: '#ff9f43' }}>
                    <Bell size={40} />
                    <h2 style={{ fontSize: '2.4rem', fontWeight: '900' }}>TAYYORLANMOQDA</h2>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5rem', flex: 1, alignItems: 'center', overflowY: 'auto' }}>
                    {preparing.length > 0 ? (
                        <AnimatePresence>
                            {preparing.map(num => (
                                <motion.div
                                    key={num}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.5 }}
                                    style={{
                                        fontSize: '5rem',
                                        fontWeight: '900',
                                        padding: '1.5rem',
                                        background: 'rgba(255,255,255,0.04)',
                                        borderRadius: '30px',
                                        textAlign: 'center',
                                        color: 'rgba(255,255,255,0.8)'
                                    }}
                                >
                                    {num}
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    ) : (
                        <div style={{ gridColumn: 'span 2', textAlign: 'center', color: 'rgba(255,255,255,0.1)' }}>
                            <p style={{ fontSize: '1.5rem', fontWeight: '600' }}>Faol buyurtmalar yo'q</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Ready Column */}
            <div style={{
                marginTop: '120px',
                background: 'rgba(198, 255, 0, 0.02)',
                borderRadius: '40px',
                padding: '3rem',
                border: '2px solid var(--primary)',
                display: 'flex',
                flexDirection: 'column',
                gap: '2rem',
                boxShadow: '0 0 50px rgba(198, 255, 0, 0.05)'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px', color: 'var(--primary)' }}>
                    <CheckCircle2 size={40} />
                    <h2 style={{ fontSize: '2.4rem', fontWeight: '900' }}>TAYYOR!</h2>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5rem', flex: 1, alignItems: 'center', overflowY: 'auto' }}>
                    {ready.length > 0 ? (
                        <AnimatePresence>
                            {ready.map(num => (
                                <motion.div
                                    key={num}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{
                                        opacity: 1,
                                        scale: [1, 1.05, 1],
                                    }}
                                    exit={{ opacity: 0, scale: 0.5 }}
                                    transition={{ 
                                        opacity: { duration: 0.5 },
                                        scale: { repeat: Infinity, duration: 2 } 
                                    }}
                                    style={{
                                        fontSize: '5rem',
                                        fontWeight: '900',
                                        padding: '1.5rem',
                                        background: 'var(--primary)',
                                        borderRadius: '30px',
                                        textAlign: 'center',
                                        color: 'black',
                                        boxShadow: '0 0 20px var(--primary-glow)'
                                    }}
                                >
                                    {num}
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    ) : (
                        <div style={{ gridColumn: 'span 2', textAlign: 'center', color: 'rgba(198, 255, 0, 0.1)' }}>
                            <p style={{ fontSize: '1.5rem', fontWeight: '600' }}>Hali hech narsa tayyor emas</p>
                        </div>
                    )}
                </div>
            </div>

            <style>{`
                @keyframes statusPulse {
                    0% { opacity: 1; transform: scale(1); }
                    50% { opacity: 0.4; transform: scale(1.2); }
                    100% { opacity: 1; transform: scale(1); }
                }
                body { overflow: hidden; }
            `}</style>
        </div>
    );
};

export default QueueMonitor;

