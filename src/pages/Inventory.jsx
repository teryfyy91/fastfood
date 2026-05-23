import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Package,
    AlertTriangle,
    ArrowUpRight,
    RefreshCcw,
    Truck,
    Plus,
    X,
    Check
} from 'lucide-react';

const INITIAL_INVENTORY = [];

const Inventory = () => {
    const [items, setItems] = useState(() => {
        const saved = localStorage.getItem('fastfood_inventory');
        return saved ? JSON.parse(saved) : INITIAL_INVENTORY;
    });

    useEffect(() => {
        localStorage.setItem('fastfood_inventory', JSON.stringify(items));
        window.dispatchEvent(new Event('inventoryUpdated'));
    }, [items]);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);
    const [newItem, setNewItem] = useState({ item: '', stock: '', min: '', unit: 'pcs' });

    const handleRefresh = () => {
        setIsRefreshing(true);
        setTimeout(() => {
            setIsRefreshing(false);
        }, 1500);
    };

    const handleAddItem = (e) => {
        e.preventDefault();
        const status = Number(newItem.stock) <= Number(newItem.min) ? (Number(newItem.stock) < Number(newItem.min) / 2 ? 'Critical' : 'Low Stock') : 'In Stock';
        const itemToAdd = {
            id: Date.now(),
            ...newItem,
            stock: Number(newItem.stock),
            min: Number(newItem.min),
            status
        };
        setItems([itemToAdd, ...items]);
        setShowAddModal(false);
        setNewItem({ item: '', stock: '', min: '', unit: 'pcs' });
    };

    return (
        <div className="inventory-page animate-fade-in" style={{ position: 'relative' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <div>
                    <h1 style={{ fontSize: '1.8rem' }}>INVENTAR VA OMBOR</h1>
                    <p style={{ color: 'var(--text-dim)' }}>Masalliqlarni boshqarish va omborni avtomatik ayirish.</p>
                </div>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <button
                        onClick={handleRefresh}
                        className="glass-card"
                        style={{
                            padding: '12px 20px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            border: '1px solid var(--primary)',
                            cursor: 'pointer',
                            opacity: isRefreshing ? 0.7 : 1
                        }}
                    >
                        <RefreshCcw size={18} className={isRefreshing ? 'animate-spin' : ''} />
                        <span>{isRefreshing ? 'Yangilanmoqda...' : 'Omborni yangilash'}</span>
                    </button>
                    <button
                        onClick={() => setShowAddModal(true)}
                        className="neon-btn"
                        style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
                    >
                        <Plus size={18} />
                        <span>Mahsulot qo'shish</span>
                    </button>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem', marginBottom: '2rem' }}>
                <div className="glass-card" style={{ padding: '1.5rem' }}>
                    <p style={{ color: 'var(--text-dim)', fontSize: '0.8rem', marginBottom: '8px' }}>JAMI MAHSULOTLAR</p>
                    <h2 style={{ fontSize: '1.5rem' }}>{items.length}</h2>
                </div>
                <div className="glass-card" style={{ padding: '1.5rem', borderLeft: '4px solid var(--warning)' }}>
                    <p style={{ color: 'var(--text-dim)', fontSize: '0.8rem', marginBottom: '8px' }}>KAM QOLGAN</p>
                    <h2 style={{ fontSize: '1.5rem', color: 'var(--warning)' }}>{items.filter(i => i.status === 'Low Stock').length}</h2>
                </div>
                <div className="glass-card" style={{ padding: '1.5rem', borderLeft: '4px solid var(--danger)' }}>
                    <p style={{ color: 'var(--text-dim)', fontSize: '0.8rem', marginBottom: '8px' }}>TANQIS</p>
                    <h2 style={{ fontSize: '1.5rem', color: 'var(--danger)' }}>{items.filter(i => i.status === 'Critical').length}</h2>
                </div>
                <div className="glass-card" style={{ padding: '1.5rem', borderLeft: '4px solid var(--success)' }}>
                    <p style={{ color: 'var(--text-dim)', fontSize: '0.8rem', marginBottom: '8px' }}>YETKAZIB BERISHLAR (BUGUN)</p>
                    <h2 style={{ fontSize: '1.5rem', color: 'var(--success)' }}>0</h2>
                </div>
            </div>

            <div className="glass-card" style={{ overflow: 'hidden' }}>
                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                        <thead>
                            <tr style={{ background: 'rgba(255,255,255,0.02)', color: 'var(--text-dim)', fontSize: '0.85rem' }}>
                                <th style={{ padding: '1.2rem' }}>MASALLIQ / MAHSULOT</th>
                                <th style={{ padding: '1.2rem' }}>JORIY MIQDOR</th>
                                <th style={{ padding: '1.2rem' }}>MIN. DARAJA</th>
                                <th style={{ padding: '1.2rem' }}>HOLAT</th>
                                <th style={{ padding: '1.2rem' }}>AVTOMATIK AYIRISH</th>
                                <th style={{ padding: '1.2rem' }}>HARAKAT</th>
                            </tr>
                        </thead>
                        <tbody>
                            <AnimatePresence initial={false}>
                                {items.length > 0 ? items.map((item) => (
                                    <motion.tr
                                        key={item.id}
                                        layout
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        style={{ borderBottom: '1px solid var(--border)', transition: '0.3s' }}
                                        className="table-row-hover"
                                    >
                                        <td style={{ padding: '1.2rem', display: 'flex', alignItems: 'center', gap: '12px' }}>
                                            <div style={{ padding: '8px', background: 'var(--bg-body)', borderRadius: '8px' }}><Package size={18} /></div>
                                            <span style={{ fontWeight: '600' }}>{item.item}</span>
                                        </td>
                                        <td style={{ padding: '1.2rem' }}>{item.stock} {item.unit}</td>
                                        <td style={{ padding: '1.2rem', color: 'var(--text-dim)' }}>{item.min} {item.unit}</td>
                                        <td style={{ padding: '1.2rem' }}>
                                            <span style={{
                                                padding: '4px 12px',
                                                borderRadius: '20px',
                                                fontSize: '0.75rem',
                                                fontWeight: 'bold',
                                                background: item.status === 'In Stock' ? 'rgba(16, 185, 129, 0.1)' : item.status === 'Low Stock' ? 'rgba(245, 158, 11, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                                                color: item.status === 'In Stock' ? 'var(--success)' : item.status === 'Low Stock' ? 'var(--warning)' : 'var(--danger)'
                                            }}>
                                                {item.status.toUpperCase()}
                                            </span>
                                        </td>
                                        <td style={{ padding: '1.2rem' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                <div style={{ width: '32px', height: '18px', background: 'var(--primary)', borderRadius: '10px', position: 'relative' }}>
                                                    <div style={{ position: 'absolute', right: '2px', top: '2px', width: '14px', height: '14px', background: 'white', borderRadius: '50%' }}></div>
                                                </div>
                                                <span style={{ fontSize: '0.8rem' }}>Faol</span>
                                            </div>
                                        </td>
                                        <td style={{ padding: '1.2rem' }}>
                                            <button
                                                onClick={() => setItems(items.filter(i => i.id !== item.id))}
                                                style={{ background: 'transparent', border: '1px solid var(--danger)', padding: '6px 12px', borderRadius: '6px', color: 'var(--danger)', cursor: 'pointer' }}
                                            >
                                                O'chirish
                                            </button>
                                        </td>
                                    </motion.tr>
                                )) : (
                                    <tr>
                                        <td colSpan="6" style={{ padding: '4rem', textAlign: 'center', color: 'var(--text-dim)' }}>
                                            Ombor bo'sh. Mahsulot qo'shing.
                                        </td>
                                    </tr>
                                )}
                            </AnimatePresence>
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Add Item Modal */}
            <AnimatePresence>
                {showAddModal && (
                    <div style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: 'rgba(0,0,0,0.5)',
                        backdropFilter: 'blur(8px)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 2000,
                        padding: '20px'
                    }}>
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            style={{
                                background: 'white',
                                width: '100%',
                                maxWidth: '500px',
                                borderRadius: '24px',
                                padding: '2rem',
                                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.2)'
                            }}
                        >
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                                <h2 style={{ fontSize: '1.5rem', fontWeight: '800' }}>Yangi mahsulot qo'shish</h2>
                                <button
                                    onClick={() => setShowAddModal(false)}
                                    style={{ background: 'var(--bg-body)', border: 'none', borderRadius: '50%', padding: '8px', cursor: 'pointer' }}
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            <form onSubmit={handleAddItem} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                <div>
                                    <label style={{ display: 'block', color: 'var(--text-dim)', fontSize: '0.8rem', marginBottom: '8px', fontWeight: '600' }}>MAHSULOT NOMI</label>
                                    <input
                                        required
                                        type="text"
                                        placeholder="Masalan: Go'sht, Non..."
                                        value={newItem.item}
                                        onChange={e => setNewItem({ ...newItem, item: e.target.value })}
                                        style={{ width: '100%', background: 'var(--bg-body)', border: '1px solid var(--border)', borderRadius: '12px', padding: '12px 16px', outline: 'none' }}
                                    />
                                </div>

                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                    <div>
                                        <label style={{ display: 'block', color: 'var(--text-dim)', fontSize: '0.8rem', marginBottom: '8px', fontWeight: '600' }}>MIQDOR</label>
                                        <input
                                            required
                                            type="number"
                                            placeholder="0"
                                            value={newItem.stock}
                                            onChange={e => setNewItem({ ...newItem, stock: e.target.value })}
                                            style={{ width: '100%', background: 'var(--bg-body)', border: '1px solid var(--border)', borderRadius: '12px', padding: '12px 16px', outline: 'none' }}
                                        />
                                    </div>
                                    <div>
                                        <label style={{ display: 'block', color: 'var(--text-dim)', fontSize: '0.8rem', marginBottom: '8px', fontWeight: '600' }}>MINIMUM DARAJA</label>
                                        <input
                                            required
                                            type="number"
                                            placeholder="0"
                                            value={newItem.min}
                                            onChange={e => setNewItem({ ...newItem, min: e.target.value })}
                                            style={{ width: '100%', background: 'var(--bg-body)', border: '1px solid var(--border)', borderRadius: '12px', padding: '12px 16px', outline: 'none' }}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label style={{ display: 'block', color: 'var(--text-dim)', fontSize: '0.8rem', marginBottom: '8px', fontWeight: '600' }}>O'LCHOV BIRLIGI</label>
                                    <select
                                        value={newItem.unit}
                                        onChange={e => setNewItem({ ...newItem, unit: e.target.value })}
                                        style={{ width: '100%', background: 'var(--bg-body)', border: '1px solid var(--border)', borderRadius: '12px', padding: '12px 16px', outline: 'none' }}
                                    >
                                        <option value="pcs">Dona (pcs)</option>
                                        <option value="kg">Kilogram (kg)</option>
                                        <option value="L">Litr (L)</option>
                                        <option value="box">Quti (box)</option>
                                    </select>
                                </div>

                                <button
                                    type="submit"
                                    className="neon-btn"
                                    style={{ width: '100%', marginTop: '1rem', padding: '15px' }}
                                >
                                    Saqlash
                                </button>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            <style>{`
                .table-row-hover:hover {
                    background: rgba(0, 0, 0, 0.01);
                }
                .animate-spin {
                    animation: spin 1s linear infinite;
                }
                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
            `}</style>
        </div>
    );
};

export default Inventory;
