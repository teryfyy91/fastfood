import React from 'react';
import { NavLink } from 'react-router-dom';
import {
    LayoutDashboard,
    ShoppingBag,
    ChefHat,
    Truck,
    Package,
    Users,
    UserCircle,
    BarChart3,
    Settings,
    Flame,
    Monitor,
    Smartphone
} from 'lucide-react';

const Sidebar = () => {
    const menuItems = [
        { icon: <LayoutDashboard />, label: 'Boshqaruv paneli', path: '/' },
        { icon: <ShoppingBag />, label: 'Buyurtmalar', path: '/orders' },
        { icon: <ChefHat />, label: 'Oshxona', path: '/kitchen' },
        { icon: <Monitor />, label: 'Navbat', path: '/queue' },
        { icon: <Smartphone />, label: 'QR Menyu', path: '/qr-menu' },
        { icon: <Truck />, label: 'Yetkazib berish', path: '/delivery' },
        { icon: <Package />, label: 'Inventar', path: '/inventory' },
        { icon: <Users />, label: 'Xodimlar', path: '/employees' },
        { icon: <UserCircle />, label: 'Mijozlar', path: '/customers' },
        { icon: <BarChart3 />, label: 'Analitika', path: '/analytics' },
        { icon: <Settings />, label: 'Sozlamalar', path: '/settings' },
    ];

    return (
        <aside className="sidebar">
            <div className="brand" style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '3rem' }}>
                <div style={{
                    background: 'var(--primary)',
                    padding: '8px',
                    borderRadius: '12px',
                    boxShadow: '0 0 15px var(--primary-glow)'
                }}>
                    <Flame color="white" fill="white" size={24} />
                </div>
                <h2 className="brand-text" style={{ fontSize: '1.2rem', background: 'linear-gradient(to right, #fff, #bc13fe)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                    FASTFOOD
                </h2>
            </div>

            <nav style={{ flex: 1, overflowY: 'auto' }}>
                {menuItems.map((item) => (
                    <NavLink
                        key={item.label}
                        to={item.path}
                        className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                    >
                        {item.icon}
                        <span>{item.label}</span>
                    </NavLink>
                ))}
            </nav>

            <div className="sidebar-footer" style={{ marginTop: 'auto', paddingTop: '1rem' }}>
                <div className="glass-card" style={{ padding: '0.8rem', borderRadius: '12px' }}>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>Pro Reja</p>
                    <div style={{ height: '4px', background: 'rgba(255,255,255,0.1)', borderRadius: '2px', margin: '4px 0' }}>
                        <div style={{ width: '70%', height: '100%', background: 'var(--primary)', borderRadius: '2px' }}></div>
                    </div>
                    <p style={{ fontSize: '0.7rem', color: 'white', fontWeight: '600' }}>70% Xotira</p>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
