import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    User,
    Bell,
    Shield,
    Globe,
    Moon,
    CreditCard,
    Smartphone,
    HelpCircle,
    ChevronRight,
    LogOut,
    Check,
    Save,
    Camera,
    Lock,
    Eye,
    Languages,
    DollarSign
} from 'lucide-react';

const Settings = () => {
    const [activeTab, setActiveTab] = useState('general');
    const [notifications, setNotifications] = useState({
        orders: true,
        inventory: false,
        reports: true,
        marketing: false
    });
    const [profile, setProfile] = useState({
        name: 'Alex Johnson',
        email: 'alex@fastfood.uz',
        phone: '+998 90 123 45 67',
        role: 'Administrator'
    });

    const tabs = [
        { id: 'general', label: 'Umumiy', icon: User },
        { id: 'notifications', label: 'Bildirishnomalar', icon: Bell },
        { id: 'security', label: 'Xavfsizlik', icon: Shield },
        { id: 'payments', label: 'To\'lovlar', icon: CreditCard },
    ];

    const toggleNotification = (key) => {
        setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
    };

    const renderContent = () => {
        switch (activeTab) {
            case 'general':
                return (
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="glass-card" style={{ padding: '2rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', marginBottom: '2.5rem' }}>
                            <div style={{ position: 'relative' }}>
                                <div style={{ width: '100px', height: '100px', borderRadius: '50%', background: 'linear-gradient(45deg, var(--primary), var(--secondary))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.5rem', color: 'var(--accent)', fontWeight: '800' }}>
                                    A
                                </div>
                                <button style={{ position: 'absolute', bottom: '0', right: '0', background: 'white', border: '1px solid var(--border)', borderRadius: '50%', padding: '8px', cursor: 'pointer' }}>
                                    <Camera size={16} />
                                </button>
                            </div>
                            <div>
                                <h3 style={{ fontSize: '1.4rem' }}>{profile.name}</h3>
                                <p style={{ color: 'var(--text-dim)' }}>{profile.role}</p>
                            </div>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                <label style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--text-dim)' }}>To'liq ismingiz</label>
                                <input 
                                    type="text" 
                                    value={profile.name} 
                                    onChange={(e) => setProfile({...profile, name: e.target.value})}
                                    style={{ padding: '12px', borderRadius: '12px', border: '1px solid var(--border)', outline: 'none', background: 'var(--bg-body)' }} 
                                />
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                <label style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--text-dim)' }}>Email manzilingiz</label>
                                <input 
                                    type="email" 
                                    value={profile.email} 
                                    onChange={(e) => setProfile({...profile, email: e.target.value})}
                                    style={{ padding: '12px', borderRadius: '12px', border: '1px solid var(--border)', outline: 'none', background: 'var(--bg-body)' }} 
                                />
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                <label style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--text-dim)' }}>Telefon raqam</label>
                                <input 
                                    type="text" 
                                    value={profile.phone} 
                                    onChange={(e) => setProfile({...profile, phone: e.target.value})}
                                    style={{ padding: '12px', borderRadius: '12px', border: '1px solid var(--border)', outline: 'none', background: 'var(--bg-body)' }} 
                                />
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                <label style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--text-dim)' }}>Tizim tili</label>
                                <select style={{ padding: '12px', borderRadius: '12px', border: '1px solid var(--border)', outline: 'none', background: 'var(--bg-body)' }}>
                                    <option>O'zbekcha</option>
                                    <option>English</option>
                                    <option>Русский</option>
                                </select>
                            </div>
                        </div>

                        <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'flex-end' }}>
                            <button className="neon-btn" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <Save size={18} /> Saqlash
                            </button>
                        </div>
                    </motion.div>
                );
            case 'notifications':
                return (
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="glass-card" style={{ padding: 0, overflow: 'hidden' }}>
                        {[
                            { key: 'orders', title: 'Yangi buyurtmalar', desc: 'Har bir yangi buyurtma kelganda ovozli bildirishnoma.' },
                            { key: 'inventory', title: 'Ombor ogohlantirishlari', desc: 'Mahsulot tugash arafasida bo\'lganda ogohlantirish.' },
                            { key: 'reports', title: 'Kunlik hisobotlar', desc: 'Har kun yakunida umumiy savdo hisobotini olish.' },
                            { key: 'marketing', title: 'Marketing yangiliklari', desc: 'Yangi funksiyalar va aksiyalar haqida ma\'lumot.' }
                        ].map((item, idx) => (
                            <div key={item.key} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1.5rem', borderBottom: idx === 3 ? 'none' : '1px solid var(--border)' }}>
                                <div>
                                    <h4 style={{ fontWeight: '700', marginBottom: '4px' }}>{item.title}</h4>
                                    <p style={{ fontSize: '0.85rem', color: 'var(--text-dim)' }}>{item.desc}</p>
                                </div>
                                <div 
                                    onClick={() => toggleNotification(item.key)}
                                    style={{ 
                                        width: '45px', 
                                        height: '24px', 
                                        background: notifications[item.key] ? 'var(--primary)' : 'var(--border)', 
                                        borderRadius: '30px', 
                                        position: 'relative', 
                                        cursor: 'pointer',
                                        transition: '0.3s'
                                    }}
                                >
                                    <div style={{ 
                                        position: 'absolute', 
                                        left: notifications[item.key] ? '23px' : '3px', 
                                        top: '3px', 
                                        width: '18px', 
                                        height: '18px', 
                                        background: 'white', 
                                        borderRadius: '50%',
                                        transition: '0.3s',
                                        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                                    }}></div>
                                </div>
                            </div>
                        ))}
                    </motion.div>
                );
            case 'security':
                return (
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="glass-card" style={{ padding: '2rem' }}>
                        <h3 style={{ marginBottom: '1.5rem', fontSize: '1.2rem' }}>Parolni o'zgartirish</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                <label style={{ fontSize: '0.85rem', fontWeight: '700' }}>Hozirgi parol</label>
                                <div style={{ position: 'relative' }}>
                                    <input type="password" style={{ width: '100%', padding: '12px', borderRadius: '12px', border: '1px solid var(--border)', outline: 'none' }} placeholder="••••••••" />
                                    <Lock size={18} style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-dim)' }} />
                                </div>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                <label style={{ fontSize: '0.85rem', fontWeight: '700' }}>Yangi parol</label>
                                <div style={{ position: 'relative' }}>
                                    <input type="password" style={{ width: '100%', padding: '12px', borderRadius: '12px', border: '1px solid var(--border)', outline: 'none' }} placeholder="Kamida 8 belgi" />
                                    <Eye size={18} style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-dim)' }} />
                                </div>
                            </div>
                            <button className="neon-btn" style={{ background: 'var(--text-main)', color: 'white', alignSelf: 'flex-start' }}>Parolni yangilash</button>
                        </div>
                    </motion.div>
                );
            case 'payments':
                 return (
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="glass-card" style={{ padding: '2rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                            <h3 style={{ fontSize: '1.2rem' }}>To'lov usullari</h3>
                            <button className="neon-btn" style={{ fontSize: '0.8rem', padding: '8px 15px' }}>+ Qo'shish</button>
                        </div>
                        <div style={{ padding: '1.5rem', border: '2px solid var(--primary)', borderRadius: '20px', background: 'var(--bg-body)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                                <div style={{ background: 'white', padding: '10px', borderRadius: '12px', border: '1px solid var(--border)' }}>
                                    <CreditCard size={24} color="#1b44ec" />
                                </div>
                                <div>
                                    <h4 style={{ fontWeight: '800' }}>UzCard •••• 1234</h4>
                                    <p style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>Asosiy to'lov usuli</p>
                                </div>
                            </div>
                            <Check size={20} color="var(--success)" />
                        </div>
                    </motion.div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="settings-page animate-fade-in" style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: '2.5rem', maxWidth: '1200px', margin: '0 auto' }}>
            {/* Sidebar Tabs */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ marginBottom: '1rem' }}>
                    <h1 style={{ fontSize: '2rem', fontWeight: '800' }}>Sozlamalar</h1>
                    <p style={{ color: 'var(--text-dim)', fontSize: '0.9rem' }}>Tizim parametrlarini boshqarish.</p>
                </div>
                
                <div className="glass-card" style={{ padding: '10px', display: 'flex', flexDirection: 'column', gap: '5px' }}>
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '12px',
                                padding: '12px 16px',
                                borderRadius: '14px',
                                border: 'none',
                                background: activeTab === tab.id ? 'var(--primary)' : 'transparent',
                                color: activeTab === tab.id ? 'var(--accent)' : 'var(--text-dim)',
                                fontWeight: '700',
                                cursor: 'pointer',
                                transition: '0.3s',
                                textAlign: 'left'
                            }}
                        >
                            <tab.icon size={18} />
                            {tab.label}
                        </button>
                    ))}
                    <div style={{ height: '1px', background: 'var(--border)', margin: '10px 5px' }}></div>
                    <button style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px', borderRadius: '14px', border: 'none', background: 'transparent', color: 'var(--danger)', fontWeight: '700', cursor: 'pointer' }}>
                        <LogOut size={18} /> Chiqish
                    </button>
                </div>

                <div className="glass-card" style={{ padding: '1.5rem', background: '#0f172a', color: 'white' }}>
                    <HelpCircle size={30} color="var(--primary)" style={{ marginBottom: '1rem' }} />
                    <h4 style={{ marginBottom: '8px' }}>Yordam Markazi</h4>
                    <p style={{ fontSize: '0.75rem', opacity: 0.6, marginBottom: '15px' }}>Tizimdan foydalanishda savollar bormi?</p>
                    <button style={{ width: '100%', padding: '10px', borderRadius: '10px', background: 'rgba(255,255,255,0.1)', border: 'none', color: 'white', fontWeight: '700', fontSize: '0.8rem', cursor: 'pointer' }}>Qo'llanmani o'qish</button>
                </div>
            </div>

            {/* Main Content Area */}
            <div style={{ minHeight: '600px' }}>
                <AnimatePresence mode="wait">
                    {renderContent()}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default Settings;

