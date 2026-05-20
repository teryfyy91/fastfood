import React from 'react';
import { motion } from 'framer-motion';
import {
    DollarSign,
    ShoppingBag,
    Users,
    Activity,
    ArrowUpRight,
    Clock,
    CheckCircle2,
    Timer
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
import StatCard from '../components/StatCard';

const data = [
    { name: '08:00', revenue: 400 },
    { name: '10:00', revenue: 1200 },
    { name: '12:00', revenue: 3800 },
    { name: '14:00', revenue: 2400 },
    { name: '16:00', revenue: 1800 },
    { name: '18:00', revenue: 4200 },
    { name: '20:00', revenue: 5600 },
    { name: '22:00', revenue: 3100 },
];

const DashboardOverview = () => {
    return (
        <div className="animate-fade-in">
            <div style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <h1 style={{ fontSize: '1.8rem', color: 'white' }}>BOSHQARUV PANELI SHARHI</h1>
                    <p style={{ color: 'var(--text-dim)' }}>Xush kelibsiz, bugungi yangiliklar bilan tanishing.</p>
                </div>
                <div className="glass-card" style={{ padding: '8px 16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ width: '8px', height: '8px', background: 'var(--success)', borderRadius: '50%', boxShadow: '0 0 10px var(--success)' }}></div>
                    <span style={{ fontSize: '0.8rem', fontWeight: '600' }}>TIZIM HOLATI: ALO_</span>
                </div>
            </div>

            <div className="dashboard-grid">
                <StatCard
                    label="Umumiy tushum"
                    value="$12,845.20"
                    trend="up"
                    trendValue="12.5"
                    icon={DollarSign}
                />
                <StatCard
                    label="Jami buyurtmalar"
                    value="458"
                    trend="up"
                    trendValue="8.2"
                    icon={ShoppingBag}
                    color="var(--accent)"
                />
                <StatCard
                    label="Yangi mijozlar"
                    value="24"
                    trend="down"
                    trendValue="3.1"
                    icon={Users}
                />
                <StatCard
                    label="O'rtacha tayyorlanish"
                    value="12m 30s"
                    trend="up"
                    trendValue="5.4"
                    icon={Activity}
                    color="var(--accent)"
                />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem', marginBottom: '2rem' }}>
                <div className="glass-card" style={{ padding: '1.5rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                        <h3 style={{ fontSize: '1.1rem' }}>TUSHUM ANALITIKASI</h3>
                        <select style={{ background: 'transparent', color: 'white', border: '1px solid var(--border)', padding: '4px 8px', borderRadius: '4px' }}>
                            <option>Bugun</option>
                            <option>Haftalik</option>
                            <option>Oylik</option>
                        </select>
                    </div>
                    <div style={{ height: '300px', width: '100%' }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={data}>
                                <defs>
                                    <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="var(--primary)" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <XAxis dataKey="name" stroke="var(--text-dim)" fontSize={12} tickLine={false} axisLine={false} />
                                <YAxis stroke="var(--text-dim)" fontSize={12} tickLine={false} axisLine={false} />
                                <Tooltip
                                    contentStyle={{ background: 'var(--bg-sidebar)', border: '1px solid var(--border)', borderRadius: '8px' }}
                                    itemStyle={{ color: 'var(--primary)' }}
                                />
                                <Area type="monotone" dataKey="revenue" stroke="var(--primary)" strokeWidth={3} fillOpacity={1} fill="url(#colorRev)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="glass-card" style={{ padding: '1.5rem' }}>
                    <h3 style={{ fontSize: '1.1rem', marginBottom: '1.5rem' }}>SO'NGGI HARAKATLAR</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {[
                            { id: '#4512', time: '2 daq oldin', type: 'order', status: 'tayyorlanmoqda' },
                            { id: '#4511', time: '5 daq oldin', type: 'order', status: 'tayyor' },
                            { id: '#4510', time: '8 daq oldin', type: 'delivery', status: 'yo\'lda' },
                            { id: '#4509', time: '12 daq oldin', type: 'order', status: 'yakunlandi' },
                        ].map((activity, index) => (
                            <div key={index} style={{ display: 'flex', gap: '1rem', paddingBottom: '1rem', borderBottom: index < 3 ? '1px solid var(--glass-border)' : 'none' }}>
                                <div style={{
                                    width: '40px',
                                    height: '40px',
                                    borderRadius: '10px',
                                    background: 'var(--glass)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: activity.status === 'tayyorlanmoqda' ? 'var(--warning)' : activity.status === 'tayyor' ? 'var(--success)' : 'var(--primary)'
                                }}>
                                    {activity.status === 'tayyorlanmoqda' ? <Timer size={20} /> : <CheckCircle2 size={20} />}
                                </div>
                                <div style={{ flex: 1 }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <p style={{ fontSize: '0.9rem', fontWeight: '600' }}>Buyurtma {activity.id}</p>
                                        <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>{activity.time}</span>
                                    </div>
                                    <p style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>Holati: <span style={{ textTransform: 'uppercase', fontSize: '0.7rem' }}>{activity.status}</span></p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <button className="neon-btn" style={{ width: '100%', marginTop: '1rem', padding: '12px', background: 'transparent', border: '1px solid var(--primary)', boxShadow: 'none' }}>
                        BARCHASINI KO'RISH
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DashboardOverview;
