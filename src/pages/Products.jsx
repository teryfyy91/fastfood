import React, { useState, useEffect } from 'react';
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
    IceCream,
    Camera,
    Upload
} from 'lucide-react';

const CATEGORIES = [
    { id: 'all', label: 'Hamma mahsulotlar', icon: Utensils },
    { id: 'hotdog', label: 'Hot Dog', icon: Pizza },
    { id: 'lavash', label: 'Lavash', icon: Utensils },
    { id: 'drinks', label: 'Ichimliklar', icon: Coffee },
    { id: 'fastfood', label: 'Fast Food', icon: IceCream },
];

const INITIAL_PRODUCTS = [];

const Products = () => {
    const [activeTab, setActiveTab] = useState('all');
    const [products, setProducts] = useState(() => {
        const saved = localStorage.getItem('fastfood_products');
        return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
    });
    const [searchQuery, setSearchQuery] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        localStorage.setItem('fastfood_products', JSON.stringify(products));
    }, [products]);

    const [formState, setFormState] = useState({
        id: null,
        name: '',
        price: '',
        category: 'hotdog',
        img: 'https://images.unsplash.com/photo-1541232390620-adeaae62e9c7?w=400&q=80'
    });

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormState({ ...formState, img: reader.result });
            };
            reader.readAsDataURL(file);
        }
    };

    const openAddModal = () => {
        setIsEditing(false);
        setFormState({
            id: null,
            name: '',
            price: '',
            category: 'hotdog',
            img: 'https://images.unsplash.com/photo-1541232390620-adeaae62e9c7?w=400&q=80'
        });
        setShowModal(true);
    };

    const openEditModal = (product) => {
        setIsEditing(true);
        setFormState({
            id: product.id,
            name: product.name,
            price: product.price,
            category: product.category,
            img: product.img
        });
        setShowModal(true);
    };

    const handleSave = () => {
        if (!formState.name || !formState.price) return;

        if (isEditing) {
            setProducts(prev => prev.map(p => p.id === formState.id ? { ...p, ...formState, price: Number(formState.price) } : p));
        } else {
            const productToAdd = {
                id: Date.now(),
                ...formState,
                price: Number(formState.price),
                status: true
            };
            setProducts([...products, productToAdd]);
        }
        setShowModal(false);
    };

    const toggleStatus = (id) => {
        setProducts(prev => prev.map(p => p.id === id ? { ...p, status: !p.status } : p));
    };

    const deleteProduct = (id) => {
        if (window.confirm("Haqiqatdan ham ushbu mahsulotni o'chirmoqchimisiz?")) {
            setProducts(prev => prev.filter(p => p.id !== id));
        }
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
                        <button
                            onClick={openAddModal}
                            className="neon-btn"
                            style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
                        >
                            <Plus size={20} /> Mahsulot qo'shish
                        </button>
                    </div>
                </div>

                <AnimatePresence>
                    {showModal && (
                        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(8px)', zIndex: 3000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                className="glass-card"
                                style={{ width: '100%', maxWidth: '500px', padding: '2rem', background: 'white' }}
                            >
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                                    <h2 style={{ fontSize: '1.5rem' }}>{isEditing ? 'Mahsulotni tahrirlash' : 'Yangi mahsulot'}</h2>
                                    <button onClick={() => setShowModal(false)} style={{ background: 'var(--bg-body)', border: 'none', padding: '10px', borderRadius: '12px', cursor: 'pointer' }}>
                                        <X size={20} />
                                    </button>
                                </div>

                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                    {/* Image Upload Area */}
                                    <div style={{ position: 'relative', width: '100%', height: '150px', background: 'var(--bg-body)', borderRadius: '20px', overflow: 'hidden', border: '2px dashed var(--border)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '10px', cursor: 'pointer' }}>
                                        {formState.img ? (
                                            <img src={formState.img} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                        ) : (
                                            <>
                                                <Camera size={30} color="var(--text-dim)" />
                                                <p style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>Rasm yuklang</p>
                                            </>
                                        )}
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleImageUpload}
                                            style={{ position: 'absolute', inset: 0, opacity: 0, cursor: 'pointer' }}
                                        />
                                        {formState.img && (
                                            <div style={{ position: 'absolute', bottom: '10px', right: '10px', background: 'rgba(0,0,0,0.6)', padding: '5px 10px', borderRadius: '8px', color: 'white', fontSize: '0.7rem', display: 'flex', alignItems: 'center', gap: '5px' }}>
                                                <Upload size={12} /> O'zgartirish
                                            </div>
                                        )}
                                    </div>

                                    <div>
                                        <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', marginBottom: '8px' }}>Mahsulot nomi</label>
                                        <input
                                            type="text"
                                            placeholder="Masalan: Katta Lavash"
                                            value={formState.name}
                                            onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                                            style={{ width: '100%', padding: '12px', borderRadius: '12px', border: '1px solid var(--border)', outline: 'none' }}
                                        />
                                    </div>
                                    <div>
                                        <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', marginBottom: '8px' }}>Narxi (so'm)</label>
                                        <input
                                            type="number"
                                            placeholder="35000"
                                            value={formState.price}
                                            onChange={(e) => setFormState({ ...formState, price: e.target.value })}
                                            style={{ width: '100%', padding: '12px', borderRadius: '12px', border: '1px solid var(--border)', outline: 'none' }}
                                        />
                                    </div>
                                    <div>
                                        <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', marginBottom: '8px' }}>Kategoriya</label>
                                        <select
                                            value={formState.category}
                                            onChange={(e) => setFormState({ ...formState, category: e.target.value })}
                                            style={{ width: '100%', padding: '12px', borderRadius: '12px', border: '1px solid var(--border)', outline: 'none' }}
                                        >
                                            {CATEGORIES.slice(1).map(cat => <option key={cat.id} value={cat.id}>{cat.label}</option>)}
                                        </select>
                                    </div>
                                    <button
                                        onClick={handleSave}
                                        className="neon-btn"
                                        style={{ width: '100%', padding: '15px', marginTop: '1rem', opacity: (!formState.name || !formState.price) ? 0.5 : 1 }}
                                    >
                                        {isEditing ? 'O\'zgarishlarni saqlash' : 'Mahsulotni qo\'shish'}
                                    </button>
                                </div>
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
                    <AnimatePresence mode='popLayout'>
                        {filteredProducts.length > 0 ? filteredProducts.map(product => (
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
                                        <button
                                            onClick={() => openEditModal(product)}
                                            style={{ padding: '8px', background: 'white', borderRadius: '10px', color: 'var(--text-main)', border: 'none', boxShadow: '0 4px 10px rgba(0,0,0,0.1)', cursor: 'pointer' }}
                                        >
                                            <Edit3 size={16} />
                                        </button>
                                        <button
                                            onClick={() => deleteProduct(product.id)}
                                            style={{ padding: '8px', background: 'white', borderRadius: '10px', color: 'var(--danger)', border: 'none', boxShadow: '0 4px 10px rgba(0,0,0,0.1)', cursor: 'pointer' }}
                                        >
                                            <Trash2 size={16} />
                                        </button>
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
                                            <p style={{ color: 'var(--text-dim)', fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase', marginBottom: '4px' }}>
                                                {CATEGORIES.find(c => c.id === product.category)?.label || product.category}
                                            </p>
                                            <h4 style={{ fontSize: '1.1rem' }}>{product.name}</h4>
                                        </div>
                                        <p style={{ color: 'var(--primary)', fontWeight: '900', fontSize: '1.2rem' }}>{product.price.toLocaleString()} so'm</p>
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
                        )) : (
                            <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '4rem', color: 'var(--text-dim)' }}>
                                <p style={{ fontSize: '1.2rem', fontWeight: '600' }}>Hozircha mahsulotlar yo'q</p>
                                <p>Yangisini qo'shing!</p>
                            </div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};

export default Products;
