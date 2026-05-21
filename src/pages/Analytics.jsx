import React from 'react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    LineChart,
    Line
} from 'recharts';
import { Download, Calendar, TrendingUp, Users, ShoppingBag, Clock } from 'lucide-react';

const REVENUE_DATA = [];

const CATEGORY_DATA = [];

const COLORS = ['#bc13fe', '#00f2ff', '#10b981', '#f59e0b'];

const Analytics = () => {
    return (
        <div className="analytics-page animate-fade-in">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <div>
                    <h1 style={{ fontSize: '1.8rem', color: 'white' }}>KENGAYTIRILGAN ANALITIKA</h1>
                    <p style={{ color: 'var(--text-dim)' }}>Biznesingiz samaradorligini chuqur tahlil qiling.</p>
                </div>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <button className="glass-card" style={{ padding: '12px 20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Calendar size={18} />
                        <span>Vaqtni tanlash</span>
                    </button>
                    <button className="neon-btn" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Download size={18} />
                        <span>Hisobotni yuklash</span>
                    </button>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem', marginBottom: '2rem' }}>
                {[
                    { label: 'Haftalik tushum', value: '$0', change: '0%', icon: <TrendingUp size={20} />, color: 'var(--primary)' },
                    { label: 'O\'rtacha buyurtma', value: '$0.00', change: '0%', icon: <ShoppingBag size={20} />, color: 'var(--accent)' },
                    { label: 'Mijozlar mamnuniyati', value: '0.0/5', change: '0', icon: <Users size={20} />, color: 'var(--success)' },
                    { label: 'Eng faol vaqt', value: '-', change: 'Noma\'lum', icon: <Clock size={20} />, color: 'var(--warning)' },
                ].map((stat, i) => (
                    <div key={i} className="glass-card" style={{ padding: '1.5rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                            <div style={{ padding: '8px', background: 'var(--glass)', borderRadius: '8px', color: stat.color }}>{stat.icon}</div>
                            <span style={{ fontSize: '0.8rem', color: stat.color }}>{stat.change}</span>
                        </div>
                        <p style={{ fontSize: '0.8rem', color: 'var(--text-dim)', marginBottom: '4px' }}>{stat.label}</p>
                        <h2 style={{ fontSize: '1.5rem' }}>{stat.value}</h2>
                    </div>
                ))}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
                <div className="glass-card" style={{ padding: '1.5rem' }}>
                    <h3 style={{ fontSize: '1.1rem', marginBottom: '1.5rem' }}>HAFTALIK SOTUV SAMARADORLIGI</h3>
                    <div style={{ height: '350px' }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={REVENUE_DATA}>
                                <XAxis dataKey="name" stroke="var(--text-dim)" axisLine={false} tickLine={false} fontSize={12} />
                                <YAxis stroke="var(--text-dim)" axisLine={false} tickLine={false} fontSize={12} />
                                <Tooltip contentStyle={{ background: 'var(--bg-sidebar)', border: '1px solid var(--border)', borderRadius: '8px' }} />
                                <Bar dataKey="revenue" fill="var(--primary)" radius={[4, 4, 0, 0]} barSize={40} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="glass-card" style={{ padding: '1.5rem' }}>
                    <h3 style={{ fontSize: '1.1rem', marginBottom: '1.5rem' }}>TOIFALAR BO'YICHA SOTUVLAR</h3>
                    <div style={{ height: '350px' }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={CATEGORY_DATA}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={80}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {CATEGORY_DATA.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend layout="vertical" align="right" verticalAlign="middle" />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Analytics;
