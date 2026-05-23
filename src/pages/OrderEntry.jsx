import React, { useState, useEffect } from 'react';
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

const CATEGORIES = ['Hammasi', 'hotdog', 'lavash', 'burgerlar', 'drinks', 'fastfood'];
const CATEGORY_LABELS = {
    'Hammasi': 'Hammasi',
    'hotdog': 'Hot Dog',
    'lavash': 'Lavash',
    'burgerlar': 'Burgerlar',
    'drinks': 'Ichimliklar',
    'fastfood': 'Fast Food'
};

const OrderEntry = () => {
    const navigate = useNavigate();
    const [activeCategory, setActiveCategory] = useState('Hammasi');
    const [cart, setCart] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [products, setProducts] = useState([]);
    const [orderConfirmed, setOrderConfirmed] = useState(false);

    useEffect(() => {
        const savedProducts = localStorage.getItem('fastfood_products');
        if (savedProducts) {
            setProducts(JSON.parse(savedProducts));
        }
    }, []);

    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const total = subtotal;

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

    const confirmOrder = () => {
        if (cart.length === 0) return;

        const newOrder = {
            id: `ORD-${Date.now()}`,
            items: cart,
            total: total,
            status: 'pending',
            timestamp: new Date().toISOString()
        };

        const existingOrders = JSON.parse(localStorage.getItem('fastfood_orders') || '[]');
        localStorage.setItem('fastfood_orders', JSON.stringify([newOrder, ...existingOrders]));
        window.dispatchEvent(new Event('ordersUpdated'));

        setOrderConfirmed(true);
        setCart([]);
        
        setTimeout(() => {
            setOrderConfirmed(false);
            navigate('/orders-board');
        }, 2000);
    };

    const filteredProducts = products.filter(p => {
        const matchesCategory = activeCategory === 'Hammasi' || p.category === activeCategory;
        const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch && p.status;
    });

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
                                {CATEGORY_LABELS[cat] || cat}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Menu Grid */}
                {filteredProducts.length > 0 ? (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1.5rem' }}>
                        {filteredProducts.map(product => (
                            <motion.div
                                key={product.id}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => addToCart(product)}
                                className="glass-card"
                                style={{ padding: '0', overflow: 'hidden', cursor: 'pointer' }}
                            >
                                <div style={{ height: '140px', width: '100%' }}>
                                    <img src={product.img} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                </div>
                                <div style={{ padding: '1rem' }}>
                                    <h4 style={{ fontSize: '0.95rem', marginBottom: '5px' }}>{product.name}</h4>
                                    <p style={{ color: 'var(--primary)', fontWeight: '800' }}>{product.price.toLocaleString()} so'm</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                ) : (
                    <div className="glass-card" style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1.5rem', borderStyle: 'dashed', background: 'rgba(255,255,255,0.02)' }}>
                        <div style={{ padding: '30px', background: 'var(--bg-body)', borderRadius: '50%', color: 'var(--text-dim)' }}>
                            <ShoppingBag size={60} />
                        </div>
                        <div style={{ textAlign: 'center' }}>
                            <h3 style={{ fontSize: '1.4rem', marginBottom: '10px' }}>Menyu bo'sh</h3>
                            <p style={{ color: 'var(--text-dim)', maxWidth: '300px' }}>
                                {products.length === 0 
                                    ? "Hozircha hech qanday mahsulot kiritilmagan. Admin paneldan mahsulot qo'shing."
                                    : "Qidiruv bo'yicha mahsulot topilmadi."}
                            </p>
                        </div>
                        {products.length === 0 && (
                            <button onClick={() => navigate('/products')} className="neon-btn">Mahsulot qo'shish</button>
                        )}
                    </div>
                )}
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
                                    <div style={{ width: '50px', height: '50px', borderRadius: '12px', overflow: 'hidden' }}>
                                        <img src={item.img} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <h4 style={{ fontSize: '0.9rem', fontWeight: '700' }}>{item.name}</h4>
                                        <p style={{ fontSize: '0.8rem', color: 'var(--primary)', fontWeight: '800' }}>{(item.price * item.quantity).toLocaleString()} so'm</p>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'white', padding: '4px 8px', borderRadius: '10px' }}>
                                        <button onClick={(e) => { e.stopPropagation(); updateQuantity(item.id, -1); }} style={{ border: 'none', background: 'none', cursor: 'pointer' }}><Minus size={14} /></button>
                                        <span style={{ fontWeight: '700', minWidth: '20px', textAlign: 'center', color: 'black' }}>{item.quantity}</span>
                                        <button onClick={(e) => { e.stopPropagation(); updateQuantity(item.id, 1); }} style={{ border: 'none', background: 'none', cursor: 'pointer' }}><Plus size={14} /></button>
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
                        onClick={confirmOrder}
                        disabled={cart.length === 0}
                        className="neon-btn"
                        style={{ width: '100%', padding: '18px', opacity: cart.length === 0 ? 0.5 : 1 }}
                    >
                        Buyurtmani tasdiqlash
                    </button>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-dim)', textAlign: 'center' }}>Tasdiqlangandan so'ng buyurtma oshxonaga yuboriladi.</p>
                </div>

                {/* Order Confirmed Overlay */}
                <AnimatePresence>
                    {orderConfirmed && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            style={{
                                position: 'absolute',
                                inset: 0,
                                background: 'rgba(0,0,0,0.8)',
                                backdropFilter: 'blur(10px)',
                                borderRadius: '24px',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                zIndex: 10,
                                color: 'white'
                            }}
                        >
                            <div style={{ width: '80px', height: '80px', background: 'var(--success)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
                                <Check size={40} />
                            </div>
                            <h3 style={{ fontSize: '1.5rem' }}>Muallafaqiyatli!</h3>
                            <p style={{ opacity: 0.7 }}>Buyurtma qabul qilindi</p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default OrderEntry;

