import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Search,
    Plus,
    Minus,
    Trash2,
    ChevronRight,
    Filter,
    Clock,
    ShoppingBag,
    Star,
    X,
    Check
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CATEGORIES = ['Hammasi', 'Hot Dog', 'Lavash', 'Burgerlar', 'Drinks', 'Fast Food'];

const OrderEntry = () => {
    const navigate = useNavigate();
    const [activeCategory, setActiveCategory] = useState('Hammasi');
    const [cart, setCart] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const total = subtotal; // Simplified for now

    const updateQuantity = (id, delta) => {
        setCart(prev => {
            const existing = prev.find(item => item.id === id);
            if (existing) {
                const newQty = existing.quantity + delta;
                if (newQty <= 0) return prev.filter(item => item.id !== id);
                return prev.map(item => item.id === id ? { ...item, quantity: newQty } : item);
            }
            return prev;
        });
    };

    return (
        <div className="order-entry-container" style={{
            display: 'grid',
            gridTemplateColumns: '1fr 400px',
            gap: '2rem',
            height: 'calc(100vh - 140px)'
        }}>
            {/* Menu Section */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', overflowY: 'auto', paddingRight: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h1 style={{ fontSize: '2rem' }}>Yangi buyurtma yaratish</h1>
                    <button onClick={() => navigate('/')} style={{ background: 'var(--bg-body)', border: 'none', padding: '10px 20px', borderRadius: '12px', fontWeight: '700', cursor: 'pointer' }}>Bekor qilish</button>
                </div>

                {/* Filters */}
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <div style={{ flex: 1, background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '16px', padding: '5px 15px', display: 'flex', alignItems: 'center' }}>
                        <Search size={20} color="var(--text-dim)" />
                        <input
                            type="text"
                            placeholder="Taomlarni qidirish..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            style={{ border: 'none', padding: '12px', outline: 'none', background: 'none', width: '100%', fontSize: '0.95rem' }}
                        />
                    </div>
                    <div style={{ display: 'flex', gap: '10px', overflowX: 'auto', whiteSpace: 'nowrap', maxWidth: '500px' }}>
                        {CATEGORIES.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                style={{
                                    padding: '12px 20px',
                                    borderRadius: '16px',
                                    border: 'none',
                                    background: activeCategory === cat ? 'var(--primary)' : 'var(--bg-card)',
                                    color: activeCategory === cat ? 'var(--accent)' : 'var(--text-dim)',
                                    fontWeight: '700',
                                    cursor: 'pointer',
                                    transition: '0.3s'
                                }}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Empty Menu State */}
                <div className="glass-card" style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1.5rem', borderStyle: 'dashed', background: 'rgba(255,255,255,0.02)' }}>
                    <div style={{ padding: '30px', background: 'var(--bg-body)', borderRadius: '50%', color: 'var(--text-dim)' }}>
                        <ShoppingBag size={60} />
                    </div>
                    <div style={{ textAlign: 'center' }}>
                        <h3 style={{ fontSize: '1.4rem', marginBottom: '10px' }}>Menyu bo'sh</h3>
                        <p style={{ color: 'var(--text-dim)', maxWidth: '300px' }}>Hozircha hech qanday mahsulot kiritilmagan. Admin paneldan mahsulot qo'shing.</p>
                    </div>
                    <button onClick={() => navigate('/products')} className="neon-btn">Mahsulot qo'shish</button>
                </div>
            </div>

            {/* Cart Sidebar */}
            <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', padding: '2rem', height: '100%', position: 'relative' }}>
                <h2 style={{ fontSize: '1.4rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    Savatcha <span style={{ background: 'var(--primary)', color: 'var(--accent)', fontSize: '0.8rem', padding: '2px 8px', borderRadius: '10px' }}>{cart.length}</span>
                </h2>

                <div style={{ flex: 1, overflowY: 'auto', marginBottom: '1.5rem' }}>
                    {cart.length > 0 ? (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {cart.map(item => (
                                <div key={item.id} style={{ display: 'flex', gap: '12px', alignItems: 'center', padding: '10px', background: 'var(--bg-body)', borderRadius: '16px' }}>
                                    <div style={{ width: '50px', height: '50px', background: '#eee', borderRadius: '12px' }}></div>
                                    <div style={{ flex: 1 }}>
                                        <h4 style={{ fontSize: '0.9rem', fontWeight: '700' }}>{item.name}</h4>
                                        <p style={{ fontSize: '0.8rem', color: 'var(--primary)', fontWeight: '800' }}>{item.price.toLocaleString()} so'm</p>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'white', padding: '4px 8px', borderRadius: '10px' }}>
                                        <button onClick={() => updateQuantity(item.id, -1)} style={{ border: 'none', background: 'none' }}><Minus size={14} /></button>
                                        <span style={{ fontWeight: '700', minWidth: '20px', textAlign: 'center' }}>{item.quantity}</span>
                                        <button onClick={() => updateQuantity(item.id, 1)} style={{ border: 'none', background: 'none' }}><Plus size={14} /></button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'var(--text-dim)', gap: '1rem' }}>
                            <ShoppingBag size={40} opacity={0.3} />
                            <p style={{ fontSize: '0.9rem' }}>Savatcha hozircha bo'sh</p>
                        </div>
                    )}
                </div>

                <div style={{ borderTop: '1px solid var(--border)', paddingTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: '600' }}>
                        <span style={{ color: 'var(--text-dim)' }}>Jami:</span>
                        <span style={{ fontSize: '1.2rem', fontWeight: '800' }}>{total.toLocaleString()} so'm</span>
                    </div>
                    <button
                        disabled={cart.length === 0}
                        className="neon-btn"
                        style={{ width: '100%', padding: '18px', opacity: cart.length === 0 ? 0.5 : 1 }}
                    >
                        Buyurtmani tasdiqlash
                    </button>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-dim)', textAlign: 'center' }}>Tasdiqlangandan so'ng buyurtma oshxonaga yuboriladi.</p>
                </div>
            </div>
        </div>
    );
};

export default OrderEntry;
