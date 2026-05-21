import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Plus,
    Search,
    Filter,
    Edit3,
    Trash2,
    Check,
    X,
    MoreVertical,
    Coffee,
    Utensils,
    Pizza,
    IceCream
} from 'lucide-react';

const CATEGORIES = [
    { id: 'all', label: 'Hamma mahsulotlar', icon: Utensils },
    { id: 'hotdog', label: 'Hot Dog', icon: Pizza }, // No Hotdog icon in Lucide, using Pizza
    { id: 'lavash', label: 'Lavash', icon: Utensils },
    { id: 'drinks', label: 'Ichimliklar', icon: Coffee },
    { id: 'fastfood', label: 'Fast Food', icon: IceCream },
];

const INITIAL_PRODUCTS = [];

const Products = () => {
    const [activeTab, setActiveTab] = useState('all');
    const [products, setProducts] = useState(INITIAL_PRODUCTS);
    const [searchQuery, setSearchQuery] = useState('');

    const toggleStatus = (id) => {
        setProducts(prev => prev.map(p => p.id === id ? { ...p, status: !p.status } : p));
    };

    const filteredProducts = products.filter(p => {
        const matchesCategory = activeTab === 'all' || p.category === activeTab;
        const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <div className="products-container" style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: '2rem' }}>
            {/* Sidebar */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div className="glass-card" style={{ padding: '1.5rem', height: 'fit-content', position: 'sticky', top: 'calc(var(--topbar-height) + 1rem)' }}>
                    <h3 style={{ marginBottom: '1.5rem', fontSize: '1.1rem' }}>Kategoriyalar</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        {CATEGORIES.map(cat => (
                            <button
                                key={cat.id}
                                onClick={() => setActiveTab(cat.id)}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '12px',
                                    padding: '12px 16px',
                                    borderRadius: '16px',
                                    border: 'none',
                                    background: activeTab === cat.id ? 'var(--primary)' : 'transparent',
                                    color: activeTab === cat.id ? 'var(--accent)' : 'var(--text-dim)',
                                    fontWeight: '700',
                                    cursor: 'pointer',
                                    transition: '0.3s',
                                    textAlign: 'left'
                                }}
                            >
                                <cat.icon size={18} />
                                {cat.label}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="glass-card" style={{ padding: '1.5rem', background: 'var(--primary)', color: 'var(--accent)' }}>
                    <h4 style={{ marginBottom: '8px' }}>Yordam kerakmi?</h4>
                    <p style={{ fontSize: '0.8rem', opacity: 0.8, marginBottom: '15px' }}>Menyuni boshqarishda muammo bormi?</p>
                    <button style={{ background: 'white', border: 'none', padding: '10px 15px', borderRadius: '10px', fontWeight: '800', width: '100%', fontSize: '0.85rem' }}>Qo'llab-quvvatlash</button>
                </div>
            </div>

            {/* Main Content */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                {/* Header Actions */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '16px', padding: '5px 15px', display: 'flex', alignItems: 'center', width: '400px' }}>
                        <Search size={20} color="var(--text-dim)" />
                        <input
                            type="text"
                            placeholder="Mahsulotlarni qidirish..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            style={{ border: 'none', padding: '12px', outline: 'none', background: 'none', width: '100%', fontSize: '0.95rem' }}
                        />
                    </div>
                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <button className="glass-card" style={{ padding: '12px 20px', display: 'flex', alignItems: 'center', gap: '8px', border: '1px solid var(--border)' }}>
                            <Filter size={18} /> Filtr
                        </button>
                        <button className="neon-btn" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <Plus size={20} /> Mahsulot qo'shish
                        </button>
                    </div>
                </div>

                {/* Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
                    <AnimatePresence mode='popLayout'>
                        {filteredProducts.map(product => (
                            <motion.div
                                key={product.id}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                className="glass-card"
                                style={{ overflow: 'hidden', padding: 0 }}
                            >
                                <div style={{ position: 'relative', height: '180px' }}>
                                    <img src={product.img} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                    <div style={{ position: 'absolute', top: '12px', right: '12px', display: 'flex', gap: '8px' }}>
                                        <button style={{ padding: '8px', background: 'white', borderRadius: '10px', color: 'var(--text-main)', border: 'none', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}><Edit3 size={16} /></button>
                                        <button style={{ padding: '8px', background: 'white', borderRadius: '10px', color: 'var(--danger)', border: 'none', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}><Trash2 size={16} /></button>
                                    </div>
                                    {!product.status && (
                                        <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <span style={{ color: 'white', fontWeight: '800', fontSize: '0.9rem', padding: '6px 15px', background: 'rgba(0,0,0,0.6)', borderRadius: '30px' }}>MAVJUD EMAS</span>
                                        </div>
                                    )}
                                </div>
                                <div style={{ padding: '1.5rem' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                                        <div>
                                            <p style={{ color: 'var(--text-dim)', fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase', marginBottom: '4px' }}>{product.category}</p>
                                            <h4 style={{ fontSize: '1.1rem' }}>{product.name}</h4>
                                        </div>
                                        <p style={{ color: 'var(--primary)', fontWeight: '900', fontSize: '1.2rem' }}>${(product.price / 10000).toFixed(2)}</p>
                                    </div>

                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid var(--border)' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            <div
                                                onClick={() => toggleStatus(product.id)}
                                                style={{
                                                    width: '40px',
                                                    height: '22px',
                                                    background: product.status ? 'var(--primary)' : 'var(--border)',
                                                    borderRadius: '20px',
                                                    position: 'relative',
                                                    cursor: 'pointer',
                                                    transition: '0.3s'
                                                }}
                                            >
                                                <div style={{
                                                    position: 'absolute',
                                                    left: product.status ? '20px' : '2px',
                                                    top: '2px',
                                                    width: '18px',
                                                    height: '18px',
                                                    background: 'white',
                                                    borderRadius: '50%',
                                                    transition: '0.3s',
                                                    boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
                                                }}></div>
                                            </div>
                                            <span style={{ fontSize: '0.8rem', fontWeight: '700', color: product.status ? 'var(--text-main)' : 'var(--text-dim)' }}>
                                                {product.status ? 'Sotuvda' : 'Vaqtincha yo\'q'}
                                            </span>
                                        </div>
                                        <MoreVertical size={18} color="var(--text-dim)" cursor="pointer" />
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};

export default Products;
