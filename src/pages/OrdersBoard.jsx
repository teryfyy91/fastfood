import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Clock,
    User,
    DollarSign,
    MoreVertical,
    ChevronRight,
    MapPin,
    Phone,
    CreditCard,
    Calendar,
    Search,
    Bell,
    X
} from 'lucide-react';

const COLUMNS = [
    { id: 'pending', label: 'Yangi buyurtmalar', color: 'var(--primary)' },
    { id: 'preparing', label: 'Tayyorlanmoqda', color: 'var(--warning)' },
    { id: 'ready', label: 'Tayyor', color: 'var(--success)' },
    { id: 'completed', label: 'Yakunlangan', color: 'var(--text-dim)' }
];

const OrderCard = React.forwardRef(({ order, onSelect }, ref) => {
    const timeElapsed = Math.floor((Date.now() - new Date(order.timestamp).getTime()) / 1000 / 60);
    const isDelayed = timeElapsed > 15;

    return (
        <motion.div
            ref={ref}
            layout
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.02 }}
            onClick={() => onSelect(order)}
            className="glass-card"
            style={{
                padding: '1.2rem',
                marginBottom: '1rem',
                cursor: 'pointer',
                borderLeft: `4px solid ${isDelayed && order.status !== 'completed' ? 'var(--danger)' : 'transparent'}`
            }}
        >
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                <span style={{ fontWeight: '800', color: 'var(--text-main)' }}>#{order.id.split('-')[1]}</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: isDelayed ? 'var(--danger)' : 'var(--text-dim)', fontSize: '0.8rem', fontWeight: '700' }}>
                    <Clock size={14} />
                    <span>{timeElapsed}m</span>
                </div>
            </div>

            <h4 style={{ fontSize: '1rem', marginBottom: '5px' }}>Mijoz #{order.id.split('-')[1]}</h4>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-dim)', marginBottom: '15px', lineClamp: 2, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxDirection: 'vertical', overflow: 'hidden' }}>
                {Array.isArray(order.items) ? order.items.map(i => `${i.quantity}x ${i.name}`).join(', ') : order.items}
            </p>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: '900', color: 'var(--primary)', fontSize: '0.95rem' }}>{order.total.toLocaleString()} so'm</span>
                <div style={{ padding: '4px', borderRadius: '8px', background: 'var(--bg-body)' }}>
                    <MoreVertical size={16} color="var(--text-dim)" />
                </div>
            </div>
        </motion.div>
    );
});

const OrdersBoard = () => {
    const [orders, setOrders] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);

    useEffect(() => {
        const loadOrders = () => {
            const saved = JSON.parse(localStorage.getItem('fastfood_orders') || '[]');
            setOrders(saved);
        };
        loadOrders();
        const interval = setInterval(loadOrders, 5000);
        return () => clearInterval(interval);
    }, []);

    const moveOrder = (id, newStatus) => {
        const updated = orders.map(o => o.id === id ? { ...o, status: newStatus } : o);
        setOrders(updated);
        localStorage.setItem('fastfood_orders', JSON.stringify(updated));
        if (selectedOrder && selectedOrder.id === id) {
            setSelectedOrder({ ...selectedOrder, status: newStatus });
        }
    };

    return (
        <div className="orders-board-container" style={{ display: 'flex', height: 'calc(100vh - 150px)', gap: '1.5rem', position: 'relative' }}>
            {/* Columns */}
            <div style={{ display: 'flex', gap: '1.5rem', flex: 1, overflowX: 'auto', paddingBottom: '1rem' }}>
                {COLUMNS.map(col => (
                    <div key={col.id} style={{ minWidth: '320px', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            padding: '12px 16px',
                            background: 'var(--bg-card)',
                            borderRadius: '16px',
                            borderBottom: `3px solid ${col.color}`
                        }}>
                            <h3 style={{ fontSize: '0.9rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1px' }}>{col.label}</h3>
                            <span style={{ padding: '2px 8px', background: 'var(--bg-body)', borderRadius: '10px', fontSize: '0.8rem', fontWeight: '700' }}>
                                {orders.filter(o => o.status === col.id).length}
                            </span>
                        </div>

                        <div style={{ flex: 1, overflowY: 'auto', paddingRight: '5px' }}>
                            <AnimatePresence mode='popLayout'>
                                {orders.filter(o => o.status === col.id).map(order => (
                                    <OrderCard key={order.id} order={order} onSelect={setSelectedOrder} />
                                ))}
                            </AnimatePresence>
                            {orders.filter(o => o.status === col.id).length === 0 && (
                                <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-dim)', opacity: 0.5, fontSize: '0.85rem' }}>
                                    Hozircha buyurtma yo'q
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {/* Side Panel */}
            <AnimatePresence>
                {selectedOrder && (
                    <motion.div
                        initial={{ x: 400 }}
                        animate={{ x: 0 }}
                        exit={{ x: 400 }}
                        className="glass-card"
                        style={{
                            width: '400px',
                            height: '100%',
                            position: 'absolute',
                            right: -20,
                            top: 0,
                            zIndex: 100,
                            borderRadius: '24px 0 0 24px',
                            padding: '2rem',
                            display: 'flex',
                            flexDirection: 'column',
                            boxShadow: '-10px 0 30px rgba(0,0,0,0.1)'
                        }}
                    >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                            <h2 style={{ fontSize: '1.5rem' }}>Buyurtma #{selectedOrder.id.split('-')[1]}</h2>
                            <button onClick={() => setSelectedOrder(null)} style={{ background: 'var(--bg-body)', border: 'none', padding: '10px', borderRadius: '12px', cursor: 'pointer' }}>
                                <X size={20} />
                            </button>
                        </div>

                        <div style={{ flex: 1, overflowY: 'auto' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                                {/* User Info */}
                                <div>
                                    <p style={{ fontSize: '0.8rem', color: 'var(--text-dim)', fontWeight: '700', marginBottom: '12px' }}>MIJOZ MA'LUMOTLARI</p>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '15px' }}>
                                        <div style={{ width: '45px', height: '45px', background: 'var(--primary)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <User size={24} color="var(--accent)" />
                                        </div>
                                        <div>
                                            <h4 style={{ fontSize: '1.1rem' }}>Mijoz #{selectedOrder.id.split('-')[1]}</h4>
                                            <p style={{ fontSize: '0.85rem', color: 'var(--text-dim)' }}>Tel: Aniqlanmagan</p>
                                        </div>
                                    </div>
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                                        <div style={{ padding: '12px', background: 'var(--bg-body)', borderRadius: '12px' }}>
                                            <p style={{ fontSize: '0.7rem', color: 'var(--text-dim)' }}>TURI</p>
                                            <p style={{ fontWeight: '700', fontSize: '0.9rem' }}>Restoranda</p>
                                        </div>
                                        <div style={{ padding: '12px', background: 'var(--bg-body)', borderRadius: '12px' }}>
                                            <p style={{ fontSize: '0.7rem', color: 'var(--text-dim)' }}>TO'LOV</p>
                                            <p style={{ fontWeight: '700', fontSize: '0.9rem' }}>Naqd/Karta</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Order Items */}
                                <div>
                                    <p style={{ fontSize: '0.8rem', color: 'var(--text-dim)', fontWeight: '700', marginBottom: '12px' }}>BUYURTMA TARKIBI</p>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                        {Array.isArray(selectedOrder.items) ? selectedOrder.items.map((item, i) => (
                                            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid var(--border)' }}>
                                                <span>{item.name} <span style={{ color: 'var(--text-dim)' }}>x{item.quantity}</span></span>
                                                <span style={{ fontWeight: '700' }}>{(item.price * item.quantity).toLocaleString()} so'm</span>
                                            </div>
                                        )) : <span>{selectedOrder.items}</span>}
                                    </div>
                                    <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <h3 style={{ fontSize: '1.1rem' }}>Jami</h3>
                                        <h3 style={{ fontSize: '1.5rem', color: 'var(--primary)' }}>{selectedOrder.total.toLocaleString()} so'm</h3>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Actions */}
                        <div style={{ marginTop: '2rem', display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                            {selectedOrder.status === 'pending' && (
                                <button onClick={() => moveOrder(selectedOrder.id, 'preparing')} className="neon-btn" style={{ flex: 1, background: 'var(--warning)', color: 'white' }}>Tayyorlashni boshlash</button>
                            )}
                            {selectedOrder.status === 'preparing' && (
                                <button onClick={() => moveOrder(selectedOrder.id, 'ready')} className="neon-btn" style={{ flex: 1, background: 'var(--success)', color: 'white' }}>Tayyor deb belgilash</button>
                            )}
                            {selectedOrder.status === 'ready' && (
                                <button onClick={() => moveOrder(selectedOrder.id, 'completed')} className="neon-btn" style={{ flex: 1 }}>Yakunlash</button>
                            )}
                            <button className="glass-card" style={{ width: '100%', padding: '12px', fontWeight: '700' }}>Chekni chiqarish</button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default OrdersBoard;

