import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Search,
    Plus,
    Minus,
    Trash2,
    CreditCard,
    Wallet,
    ChevronRight,
    Filter
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

const CATEGORIES = ['Hammasi', 'Burgerlar', 'Xot-doglar', 'Pitsa', 'Qo\'shimchalar', 'Ichimliklar', 'Meksikan'];

const Orders = () => {
    const [activeCategory, setActiveCategory] = useState('Hammasi');
    const [cart, setCart] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    const filteredProducts = PRODUCTS.filter(p =>
        (activeCategory === 'Hammasi' || p.category === activeCategory) &&
        p.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const addToCart = (product) => {
        setCart(prev => {
            const existing = prev.find(item => item.id === product.id);
            if (existing) {
                return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
            }
            return [...prev, { ...product, quantity: 1 }];
        });
    };

    const updateQuantity = (id, delta) => {
        setCart(prev => prev.map(item => {
            if (item.id === id) {
                const newQty = Math.max(0, item.quantity + delta);
                return { ...item, quantity: newQty };
            }
            return item;
        }).filter(item => item.quantity > 0));
    };

    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const tax = subtotal * 0.08;
    const total = subtotal + tax;

    return (
        <div className="orders-page" style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '1.5rem', height: 'calc(100vh - 120px)' }}>
            {/* Products Section */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', overflow: 'hidden' }}>
                <div className="glass-card" style={{ padding: '1rem', display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <div style={{ display: 'flex', flex: 1, gap: '1rem', overflowX: 'auto', paddingBottom: '4px' }}>
                        {CATEGORIES.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                style={{
                                    padding: '10px 20px',
                                    borderRadius: '12px',
                                    background: activeCategory === cat ? 'var(--primary)' : 'var(--glass)',
                                    border: '1px solid',
                                    borderColor: activeCategory === cat ? 'var(--primary)' : 'var(--glass-border)',
                                    color: 'white',
                                    whiteSpace: 'nowrap',
                                    cursor: 'pointer',
                                    transition: '0.3s'
                                }}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                    <div style={{ position: 'relative', width: '250px' }}>
                        <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-dim)' }} />
                        <input
                            type="text"
                            placeholder="Mahsulotni qidirish..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            style={{ padding: '10px 12px 10px 40px', width: '100%', background: 'var(--bg-dark)', border: '1px solid var(--glass-border)', borderRadius: '10px', color: 'white' }}
                        />
                    </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1.2rem', overflowY: 'auto', paddingRight: '4px' }}>
                    {filteredProducts.map(product => (
                        <motion.div
                            key={product.id}
                            layout
                            whileHover={{ scale: 1.02 }}
                            onClick={() => addToCart(product)}
                            className="glass-card"
                            style={{ overflow: 'hidden', cursor: 'pointer' }}
                        >
                            <div style={{ height: '140px', overflow: 'hidden' }}>
                                <img src={product.image} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            </div>
                            <div style={{ padding: '1rem' }}>
                                <p style={{ fontSize: '0.75rem', color: 'var(--primary)', fontWeight: 'bold', marginBottom: '4px' }}>{product.category}</p>
                                <h4 style={{ fontSize: '1rem', marginBottom: '8px' }}>{product.name}</h4>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <span style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>${product.price.toFixed(2)}</span>
                                    <div style={{ background: 'var(--primary)', borderRadius: '8px', padding: '4px' }}><Plus size={16} /></div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Cart Section */}
            <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', padding: '1.5rem', height: '100%' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                    <h3 style={{ fontSize: '1.1rem' }}>JORIY BUYURTMA</h3>
                    <button style={{ background: 'transparent', border: 'none', color: 'var(--danger)', cursor: 'pointer' }} onClick={() => setCart([])}>
                        <Trash2 size={18} />
                    </button>
                </div>

                <div style={{ flex: 1, overflowY: 'auto', marginBottom: '1.5rem' }}>
                    <AnimatePresence>
                        {cart.length === 0 ? (
                            <div style={{ textAlign: 'center', marginTop: '3rem', color: 'var(--text-dim)' }}>
                                <ShoppingBag size={48} style={{ opacity: 0.2, marginBottom: '1rem' }} />
                                <p>Savatchada mahsulot yo'q</p>
                            </div>
                        ) : (
                            cart.map(item => (
                                <motion.div
                                    key={item.id}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    style={{ display: 'flex', gap: '1rem', marginBottom: '1rem', alignItems: 'center' }}
                                >
                                    <div style={{ width: '50px', height: '50px', borderRadius: '8px', overflow: 'hidden' }}>
                                        <img src={item.image} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <p style={{ fontSize: '0.9rem', fontWeight: '600' }}>{item.name}</p>
                                        <p style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>${item.price.toFixed(2)}</p>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'var(--glass)', borderRadius: '8px', padding: '4px' }}>
                                        <button onClick={() => updateQuantity(item.id, -1)} style={{ border: 'none', background: 'transparent', color: 'white', cursor: 'pointer' }}><Minus size={14} /></button>
                                        <span style={{ fontSize: '0.9rem', width: '20px', textAlign: 'center' }}>{item.quantity}</span>
                                        <button onClick={() => updateQuantity(item.id, 1)} style={{ border: 'none', background: 'transparent', color: 'white', cursor: 'pointer' }}><Plus size={14} /></button>
                                    </div>
                                </motion.div>
                            ))
                        )}
                    </AnimatePresence>
                </div>

                <div style={{ borderTop: '1px solid var(--glass-border)', paddingTop: '1.5rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', color: 'var(--text-dim)' }}>
                        <span>Oraliq jami</span>
                        <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', color: 'var(--text-dim)' }}>
                        <span>Soliq (8%)</span>
                        <span>${tax.toFixed(2)}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem', fontWeight: 'bold', fontSize: '1.2rem' }}>
                        <span>Umumiy</span>
                        <span className="neon-text">${total.toFixed(2)}</span>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                        <button className="glass-card" style={{ padding: '12px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', cursor: 'pointer' }}>
                            <CreditCard size={18} />
                            <span style={{ fontSize: '0.8rem' }}>Karta</span>
                        </button>
                        <button className="glass-card" style={{ padding: '12px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', cursor: 'pointer' }}>
                            <Wallet size={18} />
                            <span style={{ fontSize: '0.8rem' }}>Naqd</span>
                        </button>
                    </div>

                    <button className="neon-btn" style={{ width: '100%', padding: '16px', fontSize: '1rem' }} disabled={cart.length === 0}>
                        BUYURTMA BERISH <ChevronRight size={18} style={{ verticalAlign: 'middle', marginLeft: '4px' }} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Orders;
