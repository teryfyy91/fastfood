import React from 'react';
import { NavLink } from 'react-router-dom';
import {
    Search,
    Bell,
    Heart,
    LayoutDashboard,
    UtensilsCrossed,
    Clock,
    Settings,
    Monitor,
    User,
    Utensils,
    ChefHat,
    Warehouse,
    Flame
} from 'lucide-react';

const Topbar = () => {
    const navItems = [
        { icon: <LayoutDashboard size={18} />, label: 'Boshqaruv', path: '/' },
        { icon: <UtensilsCrossed size={18} />, label: 'Mahsulotlar', path: '/products' },
        { icon: <Utensils size={18} />, label: 'Buyurtmalar', path: '/orders' },
        { icon: <Monitor size={18} />, label: 'Navbat Monitori', path: '/queue-monitor' },
        { icon: <ChefHat size={18} />, label: 'Oshxona', path: '/kitchen' },
        { icon: <Warehouse size={18} />, label: 'Ombor', path: '/inventory' },
        { icon: <Settings size={18} />, label: 'Sozlamalar', path: '/settings' },
    ];

    return (
        <header className="topbar" style={{
            position: 'fixed',
            top: '15px',
            left: '20px',
            right: '20px',
            height: '80px',
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 2.5rem',
            zIndex: 1000,
            boxShadow: '0 10px 40px rgba(0,0,0,0.06)',
            borderRadius: '25px',
            border: '1px solid rgba(255,255,255,0.3)'
        }}>
            {/* Logo */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{
                    width: '40px',
                    height: '40px',
                    background: 'var(--primary)',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 4px 15px var(--primary-glow)'
                }}>
                    <Flame size={22} color="var(--accent)" fill="var(--accent)" />
                </div>
                <h1 style={{
                    fontSize: '1.4rem',
                    fontWeight: '900',
                    letterSpacing: '1px',
                    textTransform: 'uppercase',
                    background: 'linear-gradient(to right, #000, var(--text-dim))',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                }}>
                    Fast<span style={{ color: 'var(--primary)', WebkitTextFillColor: 'initial' }}>Food</span>
                </h1>
            </div>

            {/* Navigation */}
            <nav style={{ display: 'flex', gap: '8px' }}>
                {navItems.map((item) => (
                    <NavLink
                        key={item.label}
                        to={item.path}
                        style={({ isActive }) => ({
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            padding: '10px 20px',
                            borderRadius: '30px',
                            textDecoration: 'none',
                            color: isActive ? 'var(--text-main)' : 'var(--text-dim)',
                            fontSize: '0.9rem',
                            fontWeight: isActive ? '700' : '500',
                            background: isActive ? 'var(--bg-body)' : 'transparent',
                            transition: '0.3s'
                        })}
                    >
                        {item.icon}
                        <span>{item.label}</span>
                    </NavLink>
                ))}
            </nav>

            {/* Actions */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <div style={{ display: 'flex', alignItems: 'center', background: 'var(--bg-body)', padding: '5px 15px', borderRadius: '30px', border: '1px solid var(--border)' }}>
                    <Search size={16} color="var(--text-dim)" />
                    <input type="text" placeholder="Qidiruv..." style={{ background: 'none', border: 'none', padding: '8px', outline: 'none', fontSize: '0.85rem', width: '120px' }} />
                </div>

                <div style={{ background: 'var(--bg-body)', padding: '10px', borderRadius: '12px', cursor: 'pointer', transition: '0.3s' }} className="icon-hover">
                    <Bell size={20} color="var(--text-main)" />
                </div>

                <div style={{ background: 'var(--bg-body)', padding: '10px', borderRadius: '12px', cursor: 'pointer', transition: '0.3s' }} className="icon-hover">
                    <Heart size={20} color="var(--text-main)" />
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginLeft: '10px', paddingLeft: '10px', borderLeft: '1px solid var(--border)' }}>
                    <div style={{ textAlign: 'right', display: 'none' }}>
                        <p style={{ fontSize: '0.85rem', fontWeight: '700' }}>Admin</p>
                    </div>
                    <div style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '12px',
                        overflow: 'hidden',
                        background: 'var(--primary)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <User size={20} color="var(--accent)" />
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Topbar;
