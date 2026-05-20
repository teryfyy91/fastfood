import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown } from 'lucide-react';

const StatCard = ({ label, value, trend, trendValue, icon: Icon, color = 'var(--primary)' }) => {
    const isPositive = trend === 'up';

    return (
        <motion.div
            whileHover={{ y: -5 }}
            className="glass-card stat-card"
        >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{
                    padding: '12px',
                    borderRadius: '12px',
                    background: `rgba(${color === 'var(--primary)' ? '188, 19, 254' : '0, 242, 255'}, 0.1)`,
                    color: color
                }}>
                    <Icon size={24} />
                </div>
                <div className={`stat-trend ${isPositive ? 'trend-up' : 'trend-down'}`}>
                    {isPositive ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                    <span>{trendValue}%</span>
                </div>
            </div>

            <div style={{ marginTop: '1.5rem' }}>
                <p className="stat-label">{label}</p>
                <h3 className="stat-value" style={{ color: color }}>{value}</h3>
            </div>

            <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                height: '2px',
                background: `linear-gradient(to right, transparent, ${color}, transparent)`,
                opacity: 0.5
            }}></div>
        </motion.div>
    );
};

export default StatCard;
