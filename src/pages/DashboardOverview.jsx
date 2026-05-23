import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    DollarSign,
    ShoppingBag,
    Users,
    TrendingUp,
    ArrowUpRight,
    ArrowDownRight,
    Plus,
    Package,
    AlertTriangle
} from 'lucide-react';
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from 'recharts';
import { useNavigate } from 'react-router-dom';

const StatCard = ({ title, value, change, isUp, icon: Icon, color }) => (
    <motion.div
        whileHover={{ translateY: -5 }}
        style={{
            padding: '1.5rem',
            background: '#ffffff',
            borderRadius: '20px',
            boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
            border: '1px solid rgba(0,0,0,0.05)',
            flex: 1,
            minWidth: 0
        }}
    >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.2rem' }}>
            <div style={{
                padding: '10px',
                background: `${color}18`,
                borderRadius: '12px',
                color,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <Icon size={22} />
            </div>
            <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '3px',
                padding: '4px 10px',
                borderRadius: '20px',
                background: isUp ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                color: isUp ? '#10b981' : '#ef4444',
                fontSize: '0.78rem',
                fontWeight: '700'
            }}>
                {isUp ? <ArrowUpRight size={13} /> : <ArrowDownRight size={13} />}
                {change}
            </div>
        </div>
        <p style={{ color: '#94a3b8', fontSize: '0.82rem', fontWeight: '600', marginBottom: '6px' }}>{title}</p>
        <h2 style={{ fontSize: '2rem', fontWeight: '800', color: '#0f172a', lineHeight: 1 }}>{value}</h2>
    </motion.div>
);

const DashboardOverview = () => {
    const navigate = useNavigate();
    const [stats, setStats] = useState({
        revenue: 0,
        orders: 0,
        customers: 0,
        avgCheck: 0,
        chartData: []
    });

    const loadStats = () => {
        const orders = JSON.parse(localStorage.getItem('fastfood_orders') || '[]');

        const completed = orders.filter(o => o.status === 'completed');
        const allOrders = orders;

        const totalRevenue = completed.reduce((sum, o) => sum + (o.total || 0), 0);
        const totalOrders = allOrders.length;
        const avgCheck = completed.length > 0 ? Math.round(totalRevenue / completed.length) : 0;

        // Build hourly chart data from today's orders
        const today = new Date();
        const todayStr = today.toDateString();
        const hoursMap = {};
        for (let h = 8; h <= 22; h += 2) {
            hoursMap[h] = 0;
        }
        allOrders.forEach(o => {
            const d = new Date(o.timestamp);
            if (d.toDateString() === todayStr) {
                const h = d.getHours();
                const slot = Math.floor(h / 2) * 2;
                if (slot >= 8 && slot <= 22) {
                    hoursMap[slot] = (hoursMap[slot] || 0) + (o.total || 0);
                }
            }
        });
        const chartData = Object.entries(hoursMap).map(([h, sales]) => ({
            name: `${h}:00`,
            sales
        }));

        setStats({
            revenue: totalRevenue,
            orders: totalOrders,
            customers: totalOrders,  // 1 buyurtma = 1 mijoz (taxminiy)
            avgCheck,
            chartData
        });
    };

    useEffect(() => {
        loadStats();
        // Same-tab real-time (OrderEntry, OrdersBoard dispatch this)
        window.addEventListener('ordersUpdated', loadStats);
        // Cross-tab real-time (another browser tab changes localStorage)
        window.addEventListener('storage', loadStats);
        return () => {
            window.removeEventListener('ordersUpdated', loadStats);
            window.removeEventListener('storage', loadStats);
        };
    }, []);

    const fmt = (n) => n >= 1000000
        ? `${(n / 1000000).toFixed(1)}M`
        : n >= 1000
            ? `${(n / 1000).toFixed(0)}K`
            : n.toLocaleString();

    return (
        <div className="dashboard-container" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {/* Hero Section */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <h1 style={{ fontSize: '2.2rem', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '10px' }}>
                        Xush kelibsiz, Alex <span style={{ animation: 'wave 2s infinite', display: 'inline-block' }}>👋</span>
                    </h1>
                    <p style={{ color: 'var(--text-dim)', fontWeight: '500' }}>Hot-dog va Lavash SaaS platformangizning bugungi ko'rsatkichlari.</p>
                </div>
                <button
                    onClick={() => navigate('/new-order')}
                    className="neon-btn"
                    style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '15px 25px' }}
                >
                    <Plus size={20} /> Yangi Buyurtma
                </button>
            </div>

            {/* Stats Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem' }}>
                <StatCard
                    title="Jami tushum"
                    value={stats.revenue > 0 ? `${fmt(stats.revenue)} so'm` : '$0'}
                    change="bugun"
                    isUp={true}
                    icon={DollarSign}
                    color="#22c55e"
                />
                <StatCard
                    title="Buyurtmalar"
                    value={stats.orders}
                    change="jami"
                    isUp={true}
                    icon={ShoppingBag}
                    color="#3b82f6"
                />
                <StatCard
                    title="Yangi mijozlar"
                    value={stats.customers}
                    change="taxminiy"
                    isUp={true}
                    icon={Users}
                    color="#f97316"
                />
                <StatCard
                    title="O'rtacha chek"
                    value={stats.avgCheck > 0 ? `${fmt(stats.avgCheck)} so'm` : '$0'}
                    change="yakunlangan"
                    isUp={stats.avgCheck > 0}
                    icon={TrendingUp}
                    color="#a855f7"
                />
            </div>

            {/* Main Dashboard Section */}
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem' }}>
                {/* Left Side */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    {/* Sales Chart */}
                    <div className="glass-card" style={{ padding: '1.5rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                            <h3 style={{ fontSize: '1.2rem' }}>Sotuvlar tahlili (bugun)</h3>
                            <select style={{ background: 'var(--bg-body)', border: 'none', padding: '8px 15px', borderRadius: '10px', fontSize: '0.85rem' }}>
                                <option>Bugun</option>
                                <option>Hafta</option>
                                <option>Oy</option>
                            </select>
                        </div>
                        <div style={{ height: '280px', width: '100%' }}>
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={stats.chartData}>
                                    <defs>
                                        <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="var(--primary)" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: 'var(--text-dim)', fontSize: 12 }} />
                                    <YAxis axisLine={false} tickLine={false} tick={{ fill: 'var(--text-dim)', fontSize: 12 }} />
                                    <Tooltip
                                        contentStyle={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '12px' }}
                                        formatter={(v) => [`${v.toLocaleString()} so'm`, 'Sotuv']}
                                    />
                                    <Area type="monotone" dataKey="sales" stroke="var(--primary)" strokeWidth={3} fillOpacity={1} fill="url(#colorSales)" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Top Selling Products */}
                    <div className="glass-card" style={{ padding: '1.5rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                            <h3 style={{ fontSize: '1.2rem' }}>Eng ko'p sotilganlar</h3>
                            <button onClick={() => navigate('/products')} style={{ color: 'var(--primary)', background: 'none', border: 'none', fontWeight: '700', cursor: 'pointer' }}>Barchasi</button>
                        </div>
                        <TopProducts />
                    </div>
                </div>

                {/* Right Side */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    {/* Live Activity */}
                    <div className="glass-card" style={{ padding: '1.5rem', maxHeight: '400px', overflowY: 'auto' }}>
                        <h3 style={{ fontSize: '1.2rem', marginBottom: '1.5rem' }}>Jonli faoliyat</h3>
                        <RecentActivity />
                    </div>

                    {/* Recent Orders Shortlist */}
                    <div className="glass-card" style={{ padding: '1.5rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                            <h3 style={{ fontSize: '1.2rem' }}>Oxirgi buyurtmalar</h3>
                            <button onClick={() => navigate('/orders-board')} style={{ color: 'var(--primary)', background: 'none', border: 'none', fontWeight: '700', cursor: 'pointer' }}>Barchasi</button>
                        </div>
                        <RecentOrders />
                    </div>
                </div>
            </div>

            {/* Inventory Widget — full width */}
            <div className="glass-card" style={{ padding: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div style={{ padding: '8px', background: 'rgba(99,102,241,0.1)', borderRadius: '10px', color: '#6366f1' }}>
                            <Package size={20} />
                        </div>
                        <h3 style={{ fontSize: '1.2rem' }}>Ombor holati</h3>
                    </div>
                    <button onClick={() => navigate('/inventory')} style={{ color: 'var(--primary)', background: 'none', border: 'none', fontWeight: '700', cursor: 'pointer', fontSize: '0.9rem' }}>Barchasi →</button>
                </div>
                <InventoryWidget />
            </div>

            <style>{`
                @keyframes wave {
                    0% { transform: rotate(0deg); }
                    25% { transform: rotate(15deg); }
                    50% { transform: rotate(0deg); }
                    75% { transform: rotate(-15deg); }
                    100% { transform: rotate(0deg); }
                }
            `}</style>
        </div>
    );
};

// ── Top Products component ──────────────────────────────────────────────────
const TopProducts = () => {
    const [items, setItems] = useState([]);

    const load = () => {
        const orders = JSON.parse(localStorage.getItem('fastfood_orders') || '[]');
        const map = {};
        orders.forEach(o => {
            if (Array.isArray(o.items)) {
                o.items.forEach(it => {
                    map[it.name] = (map[it.name] || 0) + it.quantity;
                });
            }
        });
        const sorted = Object.entries(map)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 6)
            .map(([name, qty]) => ({ name, qty }));
        setItems(sorted);
    };

    useEffect(() => {
        load();
        window.addEventListener('ordersUpdated', load);
        window.addEventListener('storage', load);
        return () => {
            window.removeEventListener('ordersUpdated', load);
            window.removeEventListener('storage', load);
        };
    }, []);

    if (items.length === 0) return (
        <p style={{ color: 'var(--text-dim)', fontSize: '0.9rem', textAlign: 'center', padding: '1rem' }}>
            Hozircha buyurtma yo'q
        </p>
    );

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {items.map((it, i) => (
                <div key={it.name} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span style={{ width: '24px', height: '24px', background: 'var(--primary)', color: 'var(--accent)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: '800', flexShrink: 0 }}>
                        {i + 1}
                    </span>
                    <div style={{ flex: 1 }}>
                        <p style={{ fontWeight: '600', fontSize: '0.9rem' }}>{it.name}</p>
                        <div style={{ height: '4px', background: 'var(--bg-body)', borderRadius: '4px', marginTop: '4px' }}>
                            <div style={{ height: '100%', width: `${Math.min(100, (it.qty / (items[0]?.qty || 1)) * 100)}%`, background: 'var(--primary)', borderRadius: '4px', transition: 'width 0.4s' }} />
                        </div>
                    </div>
                    <span style={{ fontWeight: '800', fontSize: '0.9rem', color: 'var(--primary)' }}>{it.qty} ta</span>
                </div>
            ))}
        </div>
    );
};

// ── Recent Activity component ───────────────────────────────────────────────
const RecentActivity = () => {
    const [orders, setOrders] = useState([]);

    const load = () => {
        const all = JSON.parse(localStorage.getItem('fastfood_orders') || '[]');
        setOrders(all.slice(0, 8));
    };

    useEffect(() => {
        load();
        window.addEventListener('ordersUpdated', load);
        window.addEventListener('storage', load);
        return () => {
            window.removeEventListener('ordersUpdated', load);
            window.removeEventListener('storage', load);
        };
    }, []);

    const statusInfo = {
        pending: { label: 'Yangi', color: 'var(--primary)' },
        preparing: { label: 'Tayyorlanmoqda', color: 'var(--warning)' },
        ready: { label: 'Tayyor', color: 'var(--success)' },
        completed: { label: 'Yakunlangan', color: 'var(--text-dim)' }
    };

    if (orders.length === 0) return (
        <p style={{ color: 'var(--text-dim)', fontSize: '0.9rem', textAlign: 'center' }}>Hozircha faoliyat yo'q</p>
    );

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {orders.map(o => {
                const info = statusInfo[o.status] || statusInfo.pending;
                const elapsed = Math.floor((Date.now() - new Date(o.timestamp).getTime()) / 60000);
                return (
                    <div key={o.id} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: info.color, flexShrink: 0 }} />
                        <div style={{ flex: 1 }}>
                            <p style={{ fontSize: '0.85rem', fontWeight: '700' }}>Buyurtma #{o.id.split('-')[1]}</p>
                            <p style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>{info.label}</p>
                        </div>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)', fontWeight: '600' }}>{elapsed}m oldin</span>
                    </div>
                );
            })}
        </div>
    );
};

// ── Recent Orders component ─────────────────────────────────────────────────
const RecentOrders = () => {
    const [orders, setOrders] = useState([]);

    const load = () => {
        const all = JSON.parse(localStorage.getItem('fastfood_orders') || '[]');
        setOrders(all.slice(0, 5));
    };

    useEffect(() => {
        load();
        window.addEventListener('ordersUpdated', load);
        window.addEventListener('storage', load);
        return () => {
            window.removeEventListener('ordersUpdated', load);
            window.removeEventListener('storage', load);
        };
    }, []);

    if (orders.length === 0) return (
        <p style={{ color: 'var(--text-dim)', fontSize: '0.9rem', textAlign: 'center' }}>Buyurtmalar yo'q</p>
    );

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {orders.map(o => (
                <div key={o.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 14px', background: 'var(--bg-body)', borderRadius: '14px' }}>
                    <div>
                        <p style={{ fontWeight: '700', fontSize: '0.9rem' }}>#{o.id.split('-')[1]}</p>
                        <p style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>
                            {Array.isArray(o.items) ? `${o.items.length} ta mahsulot` : '—'}
                        </p>
                    </div>
                    <span style={{ fontWeight: '800', color: 'var(--primary)', fontSize: '0.9rem' }}>
                        {o.total?.toLocaleString()} so'm
                    </span>
                </div>
            ))}
        </div>
    );
};

// ── Inventory Widget ────────────────────────────────────────────────────────
const InventoryWidget = () => {
    const [items, setItems] = useState([]);

    const load = () => {
        const saved = JSON.parse(localStorage.getItem('fastfood_inventory') || '[]');
        setItems(saved);
    };

    useEffect(() => {
        load();
        window.addEventListener('inventoryUpdated', load);
        window.addEventListener('storage', load);
        return () => {
            window.removeEventListener('inventoryUpdated', load);
            window.removeEventListener('storage', load);
        };
    }, []);

    if (items.length === 0) return (
        <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-dim)' }}>
            <Package size={36} style={{ opacity: 0.3, marginBottom: '10px' }} />
            <p style={{ fontSize: '0.9rem' }}>Ombor bo'sh. <a href="/inventory" style={{ color: 'var(--primary)', textDecoration: 'none', fontWeight: '700' }}>Mahsulot qo'shing</a></p>
        </div>
    );

    const getColor = (item) => {
        if (item.status === 'Critical') return { bar: '#ef4444', bg: 'rgba(239,68,68,0.08)', text: '#ef4444' };
        if (item.status === 'Low Stock') return { bar: '#f59e0b', bg: 'rgba(245,158,11,0.08)', text: '#f59e0b' };
        return { bar: '#10b981', bg: 'rgba(16,185,129,0.08)', text: '#10b981' };
    };

    const getLabel = (item) => {
        if (item.status === 'Critical') return '⚠️ Tanqis';
        if (item.status === 'Low Stock') return '⚡ Kam qoldi';
        return '✅ Yetarli';
    };

    const maxStock = Math.max(...items.map(i => Math.max(i.stock, i.min, 1)));

    return (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '12px' }}>
            {items.map(item => {
                const c = getColor(item);
                const pct = Math.min(100, Math.round((item.stock / Math.max(item.min * 2, item.stock, 1)) * 100));
                return (
                    <div key={item.id} style={{
                        padding: '14px 16px',
                        background: c.bg,
                        borderRadius: '16px',
                        border: `1px solid ${c.bar}30`,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '10px'
                    }}>
                        {/* Header */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <div style={{ padding: '6px', background: `${c.bar}18`, borderRadius: '8px', color: c.bar }}>
                                    <Package size={15} />
                                </div>
                                <span style={{ fontWeight: '700', fontSize: '0.9rem' }}>{item.item}</span>
                            </div>
                            <span style={{ fontSize: '0.72rem', fontWeight: '700', color: c.text, background: `${c.bar}18`, padding: '3px 8px', borderRadius: '10px' }}>
                                {getLabel(item)}
                            </span>
                        </div>

                        {/* Stock bar */}
                        <div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                                <span style={{ fontSize: '0.78rem', color: 'var(--text-dim)', fontWeight: '600' }}>
                                    Joriy: <strong style={{ color: c.text }}>{item.stock} {item.unit}</strong>
                                </span>
                                <span style={{ fontSize: '0.78rem', color: 'var(--text-dim)' }}>
                                    Min: {item.min} {item.unit}
                                </span>
                            </div>
                            <div style={{ height: '6px', background: 'rgba(0,0,0,0.06)', borderRadius: '4px', overflow: 'hidden' }}>
                                <div style={{
                                    height: '100%',
                                    width: `${pct}%`,
                                    background: c.bar,
                                    borderRadius: '4px',
                                    transition: 'width 0.5s ease'
                                }} />
                            </div>
                            <div style={{ textAlign: 'right', fontSize: '0.72rem', color: 'var(--text-dim)', marginTop: '4px' }}>
                                {pct}%
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default DashboardOverview;
