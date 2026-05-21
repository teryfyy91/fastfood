import React from 'react';
import { NavLink } from 'react-router-dom';
import {
    Search,
    Bell,
    LayoutDashboard,
    UtensilsCrossed,
    Clock,
    Settings,
    ChefHat,
    Warehouse,
    Flame
} from 'lucide-react';

const Topbar = () => {
    const navItems = [
        { icon: <LayoutDashboard size={18} />, label: 'Boshqaruv', path: '/' },
        { icon: <UtensilsCrossed size={18} />, label: 'Buyurtmalar', path: '/orders' },
        { icon: <Clock size={18} />, label: 'Navbat', path: '/queue' },
        { icon: <ChefHat size={18} />, label: 'Tayyorlanmoqda', path: '/kitchen' },
        { icon: <Warehouse size={18} />, label: 'Ombor', path: '/inventory' },
        { icon: <Settings size={18} />, label: 'Sozlamalar', path: '/settings' },
    ];

    return (
        <header className="top-nav" style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            height: 'var(--topbar-height)',
            background: 'var(--bg-card)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 4rem',
            zIndex: 1000,
            boxShadow: '0 2px 20px rgba(0,0,0,0.03)',
            borderRadius: '0 0 30px 30px'
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
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                <div style={{ background: 'var(--bg-body)', padding: '10px', borderRadius: '50%', cursor: 'pointer' }}>
                    <Bell size={20} color="var(--text-main)" />
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', paddingLeft: '15px' }}>
                    <div style={{
                        width: '45px',
                        height: '45px',
                        borderRadius: '50%',
                        overflow: 'hidden',
                        border: '2px solid var(--primary)'
                    }}>
                        <img
                            src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&q=80"
                            alt="User"
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Topbar;
