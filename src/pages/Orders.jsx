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

const PRODUCTS = [
    { id: 1, name: 'Neon Burger', category: 'Burgerlar', price: 12.99, image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&q=80' },
    { id: 2, name: 'Cyber Hotdog', category: 'Xot-doglar', price: 8.50, image: 'https://images.unsplash.com/photo-1541232390620-adeaae62e9c7?w=400&q=80' },
    { id: 3, name: 'Turbo Fries', category: 'Qo\'shimchalar', price: 4.99, image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400&q=80' },
    { id: 4, name: 'Quantum Pizza', category: 'Pitsa', price: 18.20, image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&q=80' },
    { id: 5, name: 'Fusion Taco', category: 'Meksikan', price: 6.50, image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=400&q=80' },
    { id: 6, name: 'Plasma Soda', category: 'Ichimliklar', price: 3.50, image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=400&q=80' },
    { id: 7, name: 'Giga Shake', category: 'Ichimliklar', price: 7.99, image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=400&q=80' },
    { id: 8, name: 'Stealth Wings', category: 'Qo\'shimchalar', price: 11.50, image: 'https://images.unsplash.com/photo-1567620832903-9fc6debc209f?w=400&q=80' },
];

const CATEGORIES = ['Hammasi', 'Pitsa', 'Burgerlar', 'Pasta', 'Biryani', 'Salatlar', 'Ichimliklar', 'Desertlar', 'Guruch'];

const Orders = () => {
    const [activeCategory, setActiveCategory] = useState('Hammasi');
    const [cart, setCart] = useState([
        { id: 101, name: 'BBQ Pizza', price: 120.00, quantity: 2, image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=200&q=80' },
        { id: 102, name: 'Biryani', price: 100.00, quantity: 2, image: 'https://images.unsplash.com/photo-1563379091339-03b21bc4a4f8?w=200&q=80' },
        { id: 103, name: 'Pasta', price: 30.00, quantity: 2, image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=200&q=80' },
    ]);
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
                    display: 'grid',
                    gridTemplateColumns: '1.2fr 1fr',
                    gap: '2rem',
                    position: 'relative',
                    overflow: 'hidden'
                }}>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <div style={{ position: 'relative', width: '300px', height: '300px' }}>
                            <div style={{
                                position: 'absolute',
                                top: '-20px',
                                left: '-20px',
                                width: '100%',
                                height: '100%',
                                background: 'var(--primary)',
                                borderRadius: '50%',
                                opacity: 0.1,
                                filter: 'blur(40px)'
                            }}></div>
                            <img
                                src="https://images.unsplash.com/photo-1563379091339-03b21bc4a4f8?w=500&q=80"
                                alt="Pasta"
                                style={{ width: '100%', height: '100%', objectFit: 'contain', position: 'relative', zIndex: 2 }}
                            />
                        </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                            <span style={{ color: 'var(--text-dim)', fontWeight: '600' }}>Vaqt</span>
                            <span style={{ padding: '4px 12px', background: 'var(--bg-body)', borderRadius: '20px', fontSize: '0.8rem', fontWeight: '700' }}>20 daqiqa</span>
                        </div>
                        <h2 style={{ fontSize: '2.5rem', fontWeight: '900', marginBottom: '0.5rem', lineHeight: 1.1 }}>Creamy Pasta</h2>
                        <p style={{ color: 'var(--text-dim)', marginBottom: '1.5rem', fontSize: '1rem' }}>Yangi ko'katlar va parmezan pishlog'i bilan tayyorlangan qaymoqli pasta.</p>

                        <div style={{ marginBottom: '1.5rem' }}>
                            <p style={{ fontWeight: '700', marginBottom: '0.8rem', fontSize: '0.9rem' }}>O'lcham</p>
                            <div style={{ display: 'flex', gap: '10px' }}>
                                {['500g', '750g', '1000g'].map(size => (
                                    <button key={size} style={{
                                        padding: '8px 16px',
                                        borderRadius: '10px',
                                        border: 'none',
                                        background: size === '500g' ? '#000' : 'var(--bg-body)',
                                        color: size === '500g' ? '#fff' : 'var(--text-main)',
                                        fontWeight: '700'
                                    }}>
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div style={{ marginBottom: '2rem' }}>
                            <p style={{ fontWeight: '700', marginBottom: '0.8rem', fontSize: '0.9rem' }}>Qo'shimchalar</p>
                            <div style={{ display: 'flex', gap: '15px' }}>
                                {['Pomidor', 'Ko\'kat', 'Pishloq'].map((extra, i) => (
                                    <div key={extra} style={{ textAlign: 'center' }}>
                                        <div style={{ width: '45px', height: '45px', background: 'var(--bg-body)', borderRadius: '12px', marginBottom: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <Star size={18} fill={i === 0 ? "gold" : "none"} color={i === 0 ? "gold" : "var(--text-dim)"} />
                                        </div>
                                        <p style={{ fontSize: '0.7rem', fontWeight: '600', color: 'var(--text-dim)' }}>{extra}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div>
                                <p style={{ fontSize: '0.8rem', fontWeight: '600', color: 'var(--text-dim)' }}>Umumiy miqdor</p>
                                <p style={{ fontSize: '1.5rem', fontWeight: '900' }}>$30.00</p>
                            </div>
                            <button className="neon-btn">Savatchaga qo'shish</button>
                        </div>
                    </div>
                </div>

                {/* Recommended Section */}
                <div>
                    <h3 style={{ fontSize: '1.2rem', fontWeight: '800', marginBottom: '1rem' }}>Tavsiya etiladi</h3>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
                        {[
                            { name: 'BBQ Pizza', price: 80, image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=300&q=80' },
                            { name: 'Noodles', price: 25, image: 'https://images.unsplash.com/photo-1563379091339-03b21bc4a4f8?w=300&q=80' },
                            { name: 'Red Pasta', price: 28, image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=300&q=80' },
                        ].map((item, i) => (
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
