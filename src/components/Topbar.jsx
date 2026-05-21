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
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                <div style={{ position: 'relative' }}>
                    <div style={{ 
                        background: 'rgba(0,0,0,0.03)', 
                        padding: '12px', 
                        borderRadius: '50%', 
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: '0.3s'
                    }} className="action-btn">
                        <Bell size={20} color="var(--text-main)" />
                    </div>
                    <div style={{
                        position: 'absolute',
                        top: '10px',
                        right: '10px',
                        width: '8px',
                        height: '8px',
                        background: 'var(--danger)',
                        borderRadius: '50%',
                        border: '2px solid white'
                    }}></div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '15px', paddingLeft: '10px' }}>
                    <div style={{ position: 'relative' }}>
                        <div style={{
                            width: '48px',
                            height: '48px',
                            borderRadius: '50%',
                            overflow: 'hidden',
                            border: '2px solid var(--primary)',
                            padding: '2px',
                            background: 'white',
                            cursor: 'pointer'
                        }}>
                            <img
                                src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&q=80"
                                alt="User"
                                style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }}
                            />
                        </div>
                        <div style={{
                            position: 'absolute',
                            bottom: '2px',
                            right: '2px',
                            width: '12px',
                            height: '12px',
                            background: 'var(--success)',
                            borderRadius: '50%',
                            border: '2px solid white'
                        }}></div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Topbar;
