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

const REVENUE_DATA = [
    { name: 'Mon', revenue: 4500, orders: 120 },
    { name: 'Tue', revenue: 5200, orders: 145 },
    { name: 'Wed', revenue: 4800, orders: 132 },
    { name: 'Thu', revenue: 6100, orders: 168 },
    { name: 'Fri', revenue: 8900, orders: 240 },
    { name: 'Sat', revenue: 12400, orders: 310 },
    { name: 'Sun', revenue: 10200, orders: 280 },
];

const CATEGORY_DATA = [
    { name: 'Burgers', value: 45 },
    { name: 'Sides', value: 25 },
    { name: 'Drinks', value: 20 },
    { name: 'Other', value: 10 },
];

const COLORS = ['#bc13fe', '#00f2ff', '#10b981', '#f59e0b'];

const Analytics = () => {
    return (
        <div className="analytics-page animate-fade-in">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <div>
                    <h1 style={{ fontSize: '1.8rem', color: 'white' }}>ADVANCED ANALYTICS</h1>
                    <p style={{ color: 'var(--text-dim)' }}>Deep dive into your business performance.</p>
                </div>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <button className="glass-card" style={{ padding: '12px 20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Calendar size={18} />
                        <span>Select Range</span>
                    </button>
                    <button className="neon-btn" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Download size={18} />
                        <span>Export Report</span>
                    </button>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem', marginBottom: '2rem' }}>
                {[
                    { label: 'Weekly Revenue', value: '$52,100', change: '+14%', icon: <TrendingUp size={20} />, color: 'var(--primary)' },
                    { label: 'Avg. Order Value', value: '$34.20', change: '+5%', icon: <ShoppingBag size={20} />, color: 'var(--accent)' },
                    { label: 'Cust. Satisfaction', value: '4.8/5', change: '+0.2', icon: <Users size={20} />, color: 'var(--success)' },
                    { label: 'Peak Hour', value: '19:00 - 21:00', change: 'Stable', icon: <Clock size={20} />, color: 'var(--warning)' },
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
                    <h3 style={{ fontSize: '1.1rem', marginBottom: '1.5rem' }}>WEEKLY SALES PERFORMANCE</h3>
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
                    <h3 style={{ fontSize: '1.1rem', marginBottom: '1.5rem' }}>SALES BY CATEGORY</h3>
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
