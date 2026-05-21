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
    Star
} from 'lucide-react';

const PRODUCTS = [];

const CATEGORIES = ['Hammasi', 'Pitsa', 'Burgerlar', 'Pasta', 'Biryani', 'Salatlar', 'Ichimliklar', 'Desertlar', 'Guruch'];

const Orders = () => {
    const [activeCategory, setActiveCategory] = useState('Hammasi');
    const [cart, setCart] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const discount = 25.00;
    const total = subtotal - discount;

    const updateQuantity = (id, delta) => {
        setCart(prev => prev.map(item => {
            if (item.id === id) {
                const newQty = Math.max(0, item.quantity + delta);
                return { ...item, quantity: newQty };
            }
            return item;
        }).filter(item => item.quantity > 0));
    };

    return (
        <div className="orders-page" style={{
            display: 'grid',
            gridTemplateColumns: '1fr 400px',
            gap: '2rem',
            marginTop: '1rem'
        }}>
            {/* Main Content */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                {/* Header & Categories */}
                <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                        <h2 style={{ fontSize: '1.8rem', fontWeight: '800' }}>Savatcha tafsilotlari</h2>
                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <div style={{ position: 'relative' }}>
                                <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-dim)' }} />
                                <input
                                    type="text"
                                    placeholder="Qidirish..."
                                    style={{ padding: '10px 15px 10px 40px', borderRadius: '30px', border: '1px solid var(--border)', background: 'var(--bg-card)', outline: 'none' }}
                                />
                            </div>
                            <button style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 20px', borderRadius: '30px', border: '1px solid var(--border)', background: 'var(--bg-card)', color: 'var(--text-dim)', fontWeight: '600' }}>
                                <Filter size={18} /> Filtr
                            </button>
                        </div>
                    </div>

                    <div style={{ display: 'flex', gap: '10px', overflowX: 'auto', paddingBottom: '10px' }}>
                        {CATEGORIES.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                style={{
                                    padding: '10px 24px',
                                    borderRadius: '30px',
                                    background: activeCategory === cat ? 'var(--primary)' : 'var(--bg-card)',
                                    border: '1px solid',
                                    borderColor: activeCategory === cat ? 'var(--primary)' : 'var(--border)',
                                    color: 'var(--text-main)',
                                    fontWeight: '700',
                                    cursor: 'pointer',
                                    whiteSpace: 'nowrap',
                                    transition: '0.3s'
                                }}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Featured Product Card */}
                <div className="glass-card" style={{
                    padding: '2.5rem',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '1rem',
                    minHeight: '400px',
                    color: 'var(--text-dim)'
                }}>
                    <ShoppingBag size={64} opacity={0.2} />
                    <p style={{ fontWeight: '600' }}>Mahsulot tanlanmagan</p>
                </div>

                {/* Recommended Section */}
                <div>
                    <h3 style={{ fontSize: '1.2rem', fontWeight: '800', marginBottom: '1rem' }}>Tavsiya etiladi</h3>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
                        {[].map((item, i) => (
                            <div key={i} className="glass-card" style={{ padding: '1rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                <div style={{ width: '60px', height: '60px', borderRadius: '50%', overflow: 'hidden' }}>
                                    <img src={item.image} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                </div>
                                <div style={{ flex: 1 }}>
                                    <h4 style={{ fontSize: '0.9rem', fontWeight: '700' }}>{item.name}</h4>
                                    <p style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>${item.price}</p>
                                </div>
                                <button style={{ width: '30px', height: '30px', borderRadius: '50%', border: 'none', background: '#000', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <Plus size={16} />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Sidebar / My Order */}
            <div className="glass-card" style={{ padding: '2rem', height: 'fit-content', position: 'sticky', top: 'calc(var(--topbar-height) + 1rem)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: '800' }}>Mening buyurtmam</h2>
                    <button style={{ color: 'var(--danger)', background: 'none', border: 'none', fontSize: '0.8rem', fontWeight: '600', cursor: 'pointer' }}>Barchasini o'chirish</button>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '2.5rem' }}>
                    {cart.map(item => (
                        <div key={item.id} style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                            <div style={{ width: '80px', height: '80px', borderRadius: '50%', overflow: 'hidden', background: 'var(--bg-body)', padding: '5px' }}>
                                <img src={item.image} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }} />
                            </div>
                            <div style={{ flex: 1 }}>
                                <h4 style={{ fontSize: '1rem', fontWeight: '700' }}>{item.name}</h4>
                                <p style={{ fontSize: '0.8rem', color: 'var(--text-dim)', marginBottom: '5px' }}>7-8 dyuym</p>
                                <p style={{ fontSize: '1rem', fontWeight: '800' }}>Jami ${item.price}</p>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5px' }}>
                                <button style={{ background: 'none', border: 'none', color: 'var(--text-dim)' }}><Trash2 size={16} /></button>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'var(--bg-body)', borderRadius: '20px', padding: '5px 10px' }}>
                                    <button onClick={() => updateQuantity(item.id, -1)} style={{ border: 'none', background: 'none', cursor: 'pointer' }}><Minus size={14} /></button>
                                    <span style={{ fontWeight: '700', fontSize: '0.9rem' }}>{item.quantity}</span>
                                    <button onClick={() => updateQuantity(item.id, 1)} style={{ border: 'none', background: 'none', cursor: 'pointer' }}><Plus size={14} /></button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div style={{ borderTop: '1px dashed var(--border)', paddingTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div style={{ background: 'var(--primary)', padding: '15px', borderRadius: '15px', color: 'var(--accent)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <Star size={20} fill="currentColor" />
                            <span style={{ fontWeight: '700' }}>Chegirma</span>
                        </div>
                        <button style={{ background: 'var(--bg-card)', border: 'none', padding: '6px 12px', borderRadius: '10px', fontSize: '0.7rem', fontWeight: '800' }}>Promo kod</button>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-dim)', fontWeight: '600' }}>
                        <span>Mahsulotlarning umumiy bahosi</span>
                        <span style={{ color: 'var(--text-main)' }}>${subtotal.toFixed(2)}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-dim)', fontWeight: '600' }}>
                        <span>Chegirma</span>
                        <span style={{ color: 'var(--text-main)' }}>-${discount.toFixed(2)}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '10px', fontWeight: '800', fontSize: '1.1rem' }}>
                        <span>Jami to'lov</span>
                        <span>${total.toFixed(2)}</span>
                    </div>

                    <button className="neon-btn" style={{ width: '100%', padding: '20px', fontSize: '1.1rem', marginTop: '1rem' }}>
                        Keyingi bosqichga o'tish
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Orders;
