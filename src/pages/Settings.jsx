import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
    User, 
    Bell, 
    Shield, 
    Palette, 
    Globe, 
    HelpCircle, 
    LogOut,
    Camera,
    Check
} from 'lucide-react';

const Settings = () => {
    const [activeTab, setActiveTab] = useState('profile');
    const [notifications, setNotifications] = useState({
        orders: true,
        inventory: true,
        system: false
    });

    const tabs = [
        { id: 'profile', label: 'Profil', icon: <User size={18} /> },
        { id: 'notifications', label: 'Bildirishnomalar', icon: <Bell size={18} /> },
        { id: 'security', label: 'Xavfsizlik', icon: <Shield size={18} /> },
        { id: 'appearance', label: 'Ko\'rinish', icon: <Palette size={18} /> },
        { id: 'language', label: 'Til', icon: <Globe size={18} /> }
    ];

    return (
        <div className="settings-page animate-fade-in" style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <div style={{ marginBottom: '2.5rem' }}>
                <h1 style={{ fontSize: '1.8rem', color: 'white' }}>TIZIM SOZLAMALARI</h1>
                <p style={{ color: 'var(--text-dim)' }}>Hisobingiz va tizim afzalliklarini boshqaring.</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '250px 1fr', gap: '2rem' }}>
                {/* Sidebar Tabs */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '12px',
                                padding: '12px 20px',
                                borderRadius: '12px',
                                border: 'none',
                                background: activeTab === tab.id ? 'var(--primary)' : 'transparent',
                                color: activeTab === tab.id ? 'var(--accent)' : 'var(--text-dim)',
                                fontWeight: '600',
                                cursor: 'pointer',
                                transition: '0.3s',
                                textAlign: 'left'
                            }}
                        >
                            {tab.icon}
                            <span>{tab.label}</span>
                        </button>
                    ))}
                    <div style={{ marginTop: '2rem', paddingTop: '1rem', borderTop: '1px solid var(--border)' }}>
                        <button style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            padding: '12px 20px',
                            color: 'var(--danger)',
                            background: 'none',
                            border: 'none',
                            fontWeight: '600',
                            cursor: 'pointer'
                        }}>
                            <LogOut size={18} />
                            <span>Chiqish</span>
                        </button>
                    </div>
                </div>

                {/* Content Area */}
                <div className="glass-card" style={{ padding: '2.5rem' }}>
                    {activeTab === 'profile' && (
                        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                            <h3 style={{ marginBottom: '2rem', fontSize: '1.2rem' }}>Profil Ma'lumotlari</h3>
                            
                            <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', marginBottom: '2.5rem' }}>
                                <div style={{ position: 'relative' }}>
                                    <div style={{
                                        width: '100px',
                                        height: '100px',
                                        borderRadius: '50%',
                                        overflow: 'hidden',
                                        border: '3px solid var(--primary)'
                                    }}>
                                        <img 
                                            src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=200&q=80" 
                                            alt="Profile"
                                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                        />
                                    </div>
                                    <button style={{
                                        position: 'absolute',
                                        bottom: '0',
                                        right: '0',
                                        background: 'var(--primary)',
                                        border: 'none',
                                        borderRadius: '50%',
                                        padding: '8px',
                                        cursor: 'pointer',
                                        boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
                                    }}>
                                        <Camera size={16} />
                                    </button>
                                </div>
                                <div>
                                    <h4 style={{ fontSize: '1.1rem', marginBottom: '4px' }}>Alex Johnson</h4>
                                    <p style={{ color: 'var(--text-dim)', fontSize: '0.9rem' }}>Bosh administrator</p>
                                </div>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                                <div>
                                    <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-dim)', marginBottom: '8px', fontWeight: '600' }}>ISM VA FAMILIYA</label>
                                    <input 
                                        type="text" 
                                        defaultValue="Alex Johnson"
                                        style={{ width: '100%', padding: '12px', background: 'var(--bg-body)', border: '1px solid var(--border)', borderRadius: '10px', color: 'white', outline: 'none' }}
                                    />
                                </div>
                                <div>
                                    <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-dim)', marginBottom: '8px', fontWeight: '600' }}>EMAIL MANZILI</label>
                                    <input 
                                        type="email" 
                                        defaultValue="alex.j@fastfood.com"
                                        style={{ width: '100%', padding: '12px', background: 'var(--bg-body)', border: '1px solid var(--border)', borderRadius: '10px', color: 'white', outline: 'none' }}
                                    />
                                </div>
                            </div>

                            <button className="neon-btn" style={{ marginTop: '2rem' }}>O'zgarishlarni saqlash</button>
                        </motion.div>
                    )}

                    {activeTab === 'notifications' && (
                        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                            <h3 style={{ marginBottom: '2rem', fontSize: '1.2rem' }}>Bildirishnomalar Sozlamalari</h3>
                            
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                {[
                                    { id: 'orders', title: 'Yangi buyurtmalar', desc: 'Sizga yangi buyurtma kelganda xabar berish.' },
                                    { id: 'inventory', title: 'Invertar ogohlantirishlari', desc: 'Mahsulot kam qolganda xabar berish.' },
                                    { id: 'system', title: 'Tizim yangilanishlari', desc: 'Tizimda muhim yangilanishlar bo\'lganda xabar berish.' },
                                ].map(item => (
                                    <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', background: 'var(--bg-body)', borderRadius: '15px' }}>
                                        <div>
                                            <p style={{ fontWeight: '700', marginBottom: '4px' }}>{item.title}</p>
                                            <p style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>{item.desc}</p>
                                        </div>
                                        <div 
                                            onClick={() => setNotifications({ ...notifications, [item.id]: !notifications[item.id] })}
                                            style={{ 
                                                width: '45px', 
                                                height: '24px', 
                                                background: notifications[item.id] ? 'var(--primary)' : 'var(--text-dim)', 
                                                borderRadius: '12px', 
                                                position: 'relative', 
                                                cursor: 'pointer',
                                                transition: '0.3s'
                                            }}
                                        >
                                            <div style={{ 
                                                position: 'absolute', 
                                                left: notifications[item.id] ? '23px' : '3px', 
                                                top: '3px', 
                                                width: '18px', 
                                                height: '18px', 
                                                background: 'white', 
                                                borderRadius: '50%',
                                                transition: '0.3s'
                                            }}></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {activeTab !== 'profile' && activeTab !== 'notifications' && (
                        <div style={{ textAlign: 'center', padding: '4rem 0' }}>
                            <HelpCircle size={48} color="var(--text-dim)" style={{ marginBottom: '1rem' }} />
                            <p style={{ color: 'var(--text-dim)' }}>Ushbu bo'lim ishga tushirilmoqda...</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Settings;
