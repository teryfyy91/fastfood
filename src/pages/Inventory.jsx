import React from 'react';
import { motion } from 'framer-motion';
import {
    Package,
    AlertTriangle,
    ArrowUpRight,
    RefreshCcw,
    Truck,
    Plus
} from 'lucide-react';

const INVENTORY_DATA = [
    { item: 'Beef Patties', stock: 120, min: 50, unit: 'pcs', status: 'In Stock' },
    { item: 'Burger Buns', stock: 45, min: 50, unit: 'pcs', status: 'Low Stock' },
    { item: 'Potatoes', stock: 200, min: 100, unit: 'kg', status: 'In Stock' },
    { item: 'Cooking Oil', stock: 15, min: 20, unit: 'L', status: 'Low Stock' },
    { item: 'Secret Sauce', stock: 8, min: 5, unit: 'L', status: 'In Stock' },
    { item: 'Tomato', stock: 12, min: 10, unit: 'kg', status: 'In Stock' },
    { item: 'Cheese Slices', stock: 30, min: 100, unit: 'pcs', status: 'Critical' },
];

const Inventory = () => {
    return (
        <div className="inventory-page animate-fade-in">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <div>
                    <h1 style={{ fontSize: '1.8rem', color: 'white' }}>INVENTORY & STOCK</h1>
                    <p style={{ color: 'var(--text-dim)' }}>Manage ingredients and automated stock deduction.</p>
                </div>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <button className="glass-card" style={{ padding: '12px 20px', display: 'flex', alignItems: 'center', gap: '8px', border: '1px solid var(--primary)' }}>
                        <RefreshCcw size={18} />
                        <span>Update Stock</span>
                    </button>
                    <button className="neon-btn" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Plus size={18} />
                        <span>Add Item</span>
                    </button>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem', marginBottom: '2rem' }}>
                <div className="glass-card" style={{ padding: '1.5rem' }}>
                    <p style={{ color: 'var(--text-dim)', fontSize: '0.8rem', marginBottom: '8px' }}>TOTAL ITEMS</p>
                    <h2 style={{ fontSize: '1.5rem' }}>142</h2>
                </div>
                <div className="glass-card" style={{ padding: '1.5rem', borderLeft: '4px solid var(--warning)' }}>
                    <p style={{ color: 'var(--text-dim)', fontSize: '0.8rem', marginBottom: '8px' }}>LOW STOCK</p>
                    <h2 style={{ fontSize: '1.5rem', color: 'var(--warning)' }}>5</h2>
                </div>
                <div className="glass-card" style={{ padding: '1.5rem', borderLeft: '4px solid var(--danger)' }}>
                    <p style={{ color: 'var(--text-dim)', fontSize: '0.8rem', marginBottom: '8px' }}>CRITICAL</p>
                    <h2 style={{ fontSize: '1.5rem', color: 'var(--danger)' }}>2</h2>
                </div>
                <div className="glass-card" style={{ padding: '1.5rem', borderLeft: '4px solid var(--success)' }}>
                    <p style={{ color: 'var(--text-dim)', fontSize: '0.8rem', marginBottom: '8px' }}>DELIVERIES (TODAY)</p>
                    <h2 style={{ fontSize: '1.5rem', color: 'var(--success)' }}>4</h2>
                </div>
            </div>

            <div className="glass-card" style={{ overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead>
                        <tr style={{ background: 'var(--glass)', color: 'var(--text-dim)', fontSize: '0.85rem' }}>
                            <th style={{ padding: '1.2rem' }}>INGREDIENT / ITEM</th>
                            <th style={{ padding: '1.2rem' }}>CURRENT STOCK</th>
                            <th style={{ padding: '1.2rem' }}>MIN. LEVEL</th>
                            <th style={{ padding: '1.2rem' }}>STATUS</th>
                            <th style={{ padding: '1.2rem' }}>AUTO-DEDUCT</th>
                            <th style={{ padding: '1.2rem' }}>ACTION</th>
                        </tr>
                    </thead>
                    <tbody>
                        {INVENTORY_DATA.map((item, index) => (
                            <tr key={index} style={{ borderBottom: '1px solid var(--glass-border)', transition: '0.3s' }} className="table-row-hover">
                                <td style={{ padding: '1.2rem', display: 'flex', alignItems: 'center', gap: '12px' }}>
                                    <div style={{ padding: '8px', background: 'var(--glass)', borderRadius: '8px' }}><Package size={18} /></div>
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
                                        {item.status}
                                    </span>
                                </td>
                                <td style={{ padding: '1.2rem' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <div style={{ width: '32px', height: '18px', background: 'var(--primary)', borderRadius: '10px', position: 'relative' }}>
                                            <div style={{ position: 'absolute', right: '2px', top: '2px', width: '14px', height: '14px', background: 'white', borderRadius: '50%' }}></div>
                                        </div>
                                        <span style={{ fontSize: '0.8rem' }}>Active</span>
                                    </div>
                                </td>
                                <td style={{ padding: '1.2rem' }}>
                                    <button style={{ background: 'transparent', border: '1px solid var(--border)', padding: '6px 12px', borderRadius: '6px', color: 'white', cursor: 'pointer' }}>
                                        Orders
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <style>{`
        .table-row-hover:hover {
          background: rgba(255, 255, 255, 0.02);
        }
      `}</style>
        </div>
    );
};

export default Inventory;
