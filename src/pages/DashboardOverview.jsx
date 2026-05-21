import React from 'react';
import { motion } from 'framer-motion';
import {
    DollarSign,
    ShoppingBag,
    Users,
    TrendingUp,
    ArrowUpRight,
    ArrowDownRight,
    Search,
    ChevronRight,
    CheckCircle2,
    Clock,
    Plus
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

const SALES_DATA = [];

const StatCard = ({ title, value, change, isUp, icon: Icon, color }) => (
    <motion.div
        whileHover={{ translateY: -5 }}
        className="glass-card"
        style={{ padding: '1.5rem', flex: 1 }}
    >
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <div style={{ padding: '10px', background: `${color}15`, borderRadius: '12px', color }}>
                <Icon size={22} />
            </div>
            <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                padding: '4px 8px',
                borderRadius: '20px',
                background: isUp ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                color: isUp ? 'var(--success)' : 'var(--danger)',
                fontSize: '0.75rem',
                fontWeight: '700'
            }}>
                {isUp ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                {change}
            </div>
        </div>
        <p style={{ color: 'var(--text-dim)', fontSize: '0.85rem', fontWeight: '600', marginBottom: '4px' }}>{title}</p>
        <h2 style={{ fontSize: '1.8rem', fontWeight: '800' }}>{value}</h2>
    </motion.div>
);

const DashboardOverview = () => {
    return (
        <div className="dashboard-container" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {/* Hero Section */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <h1 style={{ fontSize: '2.2rem', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '10px' }}>
                        Xush kelibsiz, Alex <span style={{ animation: 'wave 2s infinite' }}>👋</span>
                    </h1>
                    <p style={{ color: 'var(--text-dim)', fontWeight: '500' }}>Hot-dog va Lavash SaaS platformangizning bugungi ko'rsatkichlari.</p>
                </div>
                <button className="neon-btn" style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '15px 25px' }}>
                    <Plus size={20} /> Yangi Buyurtma
                </button>
            </div>

            {/* Stats Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
                <StatCard title="Jami tushum" value="$0" change="0%" isUp={true} icon={DollarSign} color="var(--primary)" />
                <StatCard title="Buyurtmalar" value="0" change="0%" isUp={true} icon={ShoppingBag} color="#3498db" />
                <StatCard title="Yangi mijozlar" value="0" change="0%" isUp={true} icon={Users} color="#e67e22" />
                <StatCard title="O'rtacha chek" value="$0" change="0%" icon={TrendingUp} color="#9b59b6" />
            </div>

            {/* Main Dashboard Section */}
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem' }}>
                {/* Left Side: Analytics & Products */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    {/* Sales Chart */}
                    <div className="glass-card" style={{ padding: '1.5rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                            <h3 style={{ fontSize: '1.2rem' }}>Sotuvlar tahlili</h3>
                            <select style={{ background: 'var(--bg-body)', border: 'none', padding: '8px 15px', borderRadius: '10px', fontSize: '0.85rem' }}>
                                <option>Bugun</option>
                                <option>Hafta</option>
                                <option>Oy</option>
                            </select>
                        </div>
                        <div style={{ height: '300px', width: '100%' }}>
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={SALES_DATA}>
                                    <defs>
                                        <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="var(--primary)" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: 'var(--text-dim)', fontSize: 12 }} />
                                    <YAxis axisLine={false} tickLine={false} tick={{ fill: 'var(--text-dim)', fontSize: 12 }} />
                                    <Tooltip contentStyle={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '12px' }} />
                                    <Area type="monotone" dataKey="sales" stroke="var(--primary)" strokeWidth={3} fillOpacity={1} fill="url(#colorSales)" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Top Selling Products */}
                    <div className="glass-card" style={{ padding: '1.5rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                            <h3 style={{ fontSize: '1.2rem' }}>Eng ko'p sotilganlar</h3>
                            <button style={{ color: 'var(--primary)', background: 'none', border: 'none', fontWeight: '700', cursor: 'pointer' }}>Barchasi</button>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
                            {/* Mahsulotlar yo'q */}
                        </div>
                    </div>
                </div>

                {/* Right Side: Activity & Recent Orders */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    {/* Live Activity */}
                    <div className="glass-card" style={{ padding: '1.5rem', maxHeight: '400px', overflowY: 'auto' }}>
                        <h3 style={{ fontSize: '1.2rem', marginBottom: '1.5rem' }}>Jonli faoliyat</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                            {/* Faoliyat yo'q */}
                        </div>
                    </div>

                    {/* Recent Orders Shortlist */}
                    <div className="glass-card" style={{ padding: '1.5rem' }}>
                        <h3 style={{ fontSize: '1.2rem', marginBottom: '1.5rem' }}>Oxirgi buyurtmalar</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {/* Buyurtmalar yo'q */}
                        </div>
                    </div>
                </div>
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

export default DashboardOverview;
