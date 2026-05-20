import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown } from 'lucide-react';

const StatCard = ({ label, value, trend, trendValue, icon: Icon, color = 'var(--primary)' }) => {
    const isPositive = trend === 'up';

    return (
        <motion.div
            whileHover={{ y: -5 }}
            className="glass-card stat-card"
            style={{ padding: '1.5rem', position: 'relative', overflow: 'hidden' }}
        >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{
                    padding: '12px',
                    borderRadius: '16px',
                    background: 'var(--bg-body)',
                    color: color === 'var(--primary)' ? 'var(--text-main)' : color,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <Icon size={24} />
                </div>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    padding: '4px 10px',
                    borderRadius: '20px',
                    background: isPositive ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                    color: isPositive ? 'var(--success)' : 'var(--danger)',
                    fontSize: '0.8rem',
                    fontWeight: '700'
                }}>
                    {isPositive ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                    <span>{trendValue}%</span>
                </div>
            </div>

            <div style={{ marginTop: '1.5rem' }}>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-dim)', fontWeight: '600', marginBottom: '4px' }}>{label}</p>
                <h3 style={{ fontSize: '1.8rem', fontWeight: '800', color: 'var(--text-main)' }}>{value}</h3>
            </div>

            <div style={{
                position: 'absolute',
                top: 0,
                right: 0,
                width: '100px',
                height: '100px',
                background: `radial-gradient(circle at 100% 0%, ${color}10, transparent)`,
                zIndex: 0
            }}></div>
        </motion.div>
    );
};

export default StatCard;
