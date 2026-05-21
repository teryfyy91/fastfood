import React from 'react';
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
    LogOut
} from 'lucide-react';

const SettingItem = ({ icon: Icon, title, desc, toggle }) => (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1.5rem', borderBottom: '1px solid var(--border)' }}>
        <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
            <div style={{ padding: '10px', background: 'var(--bg-body)', borderRadius: '12px', color: 'var(--text-dim)' }}>
                <Icon size={20} />
            </div>
            <div>
                <h4 style={{ fontSize: '1rem', fontWeight: '700' }}>{title}</h4>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>{desc}</p>
            </div>
        </div>
        {toggle ? (
            <div style={{ width: '40px', height: '22px', background: 'var(--primary)', borderRadius: '20px', position: 'relative' }}>
                <div style={{ position: 'absolute', right: '2px', top: '2px', width: '18px', height: '18px', background: 'white', borderRadius: '50%' }}></div>
            </div>
        ) : (
            <ChevronRight size={20} color="var(--text-dim)" />
        )}
    </div>
);

const Settings = () => {
    return (
        <div className="settings-container" style={{ maxWidth: '1000px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div>
                <h1 style={{ fontSize: '2rem', marginBottom: '8px' }}>Tizim sozlamalari</h1>
                <p style={{ color: 'var(--text-dim)' }}>Hisobingiz va do'koningiz parametrlarini boshqaring.</p>
            </div>

            <div className="glass-card" style={{ padding: 0, overflow: 'hidden' }}>
                <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--border)', background: 'var(--bg-body)' }}>
                    <h3 style={{ fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--text-dim)' }}>Umumiy sozlamalar</h3>
                </div>
                <SettingItem icon={User} title="Profil ma'lumotlari" desc="Ism, rasm va aloqa ma'lumotlari" />
                <SettingItem icon={Bell} title="Bildirishnomalar" desc="Buyurtmalar va tizim yangiliklari haqida ogohlantirish" toggle={true} />
                <SettingItem icon={Moon} title="Tungi rejim" desc="Interfeys rangini o'zgartirish" toggle={false} />
            </div>

            <div className="glass-card" style={{ padding: 0, overflow: 'hidden' }}>
                <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--border)', background: 'var(--bg-body)' }}>
                    <h3 style={{ fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--text-dim)' }}>Xavfsizlik va Do'kon</h3>
                </div>
                <SettingItem icon={Shield} title="Xavfsizlik" desc="Parol va ikki bosqichli autentifikatsiya" />
                <SettingItem icon={Globe} title="Tizim tili" desc="Hozirgi til: O'zbekcha" />
                <SettingItem icon={Smartphone} title="Mobil ilova" desc="QR kod orqali bog'lanish" />
            </div>

            <button className="glass-card" style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '1.2rem',
                color: 'var(--danger)',
                border: '1px solid rgba(239, 68, 68, 0.2)',
                justifyContent: 'center',
                fontWeight: '800'
            }}>
                <LogOut size={20} />
                Hisobdan chiqish
            </button>
        </div>
    );
};

export default Settings;
