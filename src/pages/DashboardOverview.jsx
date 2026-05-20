import React from 'react';
import { motion } from 'framer-motion';
import {
    DollarSign,
    ShoppingBag,
    Users,
    ArrowUpRight,
    Search,
    Filter
} from 'lucide-react';
import StatCard from '../components/StatCard';

const DashboardOverview = () => {
    const stats = [
        { label: 'Jami tushum', value: '$24,500', trend: 'up', trendValue: 12, icon: DollarSign, color: 'var(--primary)' },
        { label: 'Buyurtmalar', value: '1,280', trend: 'up', trendValue: 8, icon: ShoppingBag, color: '#3498db' },
        { label: 'Yangi mijozlar', value: '342', trend: 'up', trendValue: 5, icon: Users, color: '#e67e22' },
        { label: 'O\'rtacha chek', value: '$19.20', trend: 'down', trendValue: 2, icon: ArrowUpRight, color: '#9b59b6' },
    ];

    const recentActivity = [
        { id: 1, user: 'Alex Rivera', action: 'Yangi buyurtma qabul qildi', time: '2 daqiqa oldin', amount: '$45.00' },
        { id: 2, user: 'Sarah Chen', action: 'Buyurtma tayyorlandi', time: '5 daqiqa oldin', amount: null },
        { id: 3, user: 'Marco Rossi', action: 'To\'lov amalga oshirildi', time: '12 daqiqa oldin', amount: '$120.50' },
    ];

    return (
        <div className="dashboard-page animate-fade-in">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <div>
                    <h1 style={{ fontSize: '2rem', fontWeight: '800' }}>Xush kelibsiz, Alex! 👋</h1>
                    <p style={{ color: 'var(--text-dim)', fontWeight: '500' }}>Bugungi savdo ko'rsatkichlaringizni kuzating.</p>
                </div>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <button className="glass-card" style={{ padding: '12px 20px', display: 'flex', alignItems: 'center', gap: '8px', border: '1px solid var(--border)' }}>
                        <Search size={18} /> Qidirish
                    </button>
                    <button className="neon-btn">Hisobot yaratish</button>
                </div>
            </div>

            <div className="dashboard-grid">
                {stats.map((stat, i) => (
                    <StatCard key={i} {...stat} />
                ))}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
                <div className="glass-card" style={{ padding: '2rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                        <h3 style={{ fontSize: '1.2rem', fontWeight: '800' }}>Jonli faoliyat</h3>
                        <button style={{ color: 'var(--primary)', background: 'none', border: 'none', fontWeight: '700', cursor: 'pointer' }}>Barchasini ko'rish</button>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {recentActivity.map(activity => (
                            <div key={activity.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', background: 'var(--bg-body)', borderRadius: '16px' }}>
                                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                                    <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'var(--bg-card)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <Users size={20} color="var(--primary)" />
                                    </div>
                                    <div>
                                        <p style={{ fontWeight: '700' }}>{activity.user}</p>
                                        <p style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>{activity.action}</p>
                                    </div>
                                </div>
                                <div style={{ textAlign: 'right' }}>
                                    {activity.amount && <p style={{ fontWeight: '800', color: 'var(--success)' }}>{activity.amount}</p>}
                                    <p style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>{activity.time}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="glass-card" style={{ padding: '2rem' }}>
                    <h3 style={{ fontSize: '1.2rem', fontWeight: '800', marginBottom: '1.5rem' }}>Oshxona holati</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        {[
                            { label: 'Tayyorlanmoqda', count: 12, color: 'var(--warning)' },
                            { label: 'Yetkazilmoqda', count: 5, color: '#3498db' },
                            { label: 'Tayyor', count: 8, color: 'var(--success)' },
                        ].map((item, i) => (
                            <div key={i}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                                    <span style={{ fontWeight: '600', fontSize: '0.9rem' }}>{item.label}</span>
                                    <span style={{ fontWeight: '800' }}>{item.count}</span>
                                </div>
                                <div style={{ height: '8px', background: 'var(--bg-body)', borderRadius: '4px', overflow: 'hidden' }}>
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${(item.count / 25) * 100}%` }}
                                        style={{ height: '100%', background: item.color, borderRadius: '4px' }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                    <button className="neon-btn" style={{ width: '100%', marginTop: '2rem', background: '#000', color: '#fff' }}>KDS Ko'rinishi</button>
                </div>
            </div>
        </div>
    );
};

export default DashboardOverview;
