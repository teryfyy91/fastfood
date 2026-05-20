import React from 'react';
import { motion } from 'framer-motion';
import {
    Users,
    UserPlus,
    Shield,
    Edit3,
    Trash2,
    Check,
    X
} from 'lucide-react';

const EMPLOYEES = [
    { id: 1, name: 'Alex Rivera', role: 'Admin', status: 'Active', shift: 'Morning', email: 'alex@fastfood.sys' },
    { id: 2, name: 'Sarah Chen', role: 'Kitchen', status: 'Active', shift: 'Morning', email: 'sarah.c@fastfood.sys' },
    { id: 3, name: 'Marco Rossi', role: 'Cashier', status: 'Active', shift: 'Evening', email: 'marco.r@fastfood.sys' },
    { id: 4, name: 'Elena Vance', role: 'Manager', status: 'Active', shift: 'Morning', email: 'elena.v@fastfood.sys' },
    { id: 5, name: 'David Smith', role: 'Courier', status: 'Offline', shift: 'Evening', email: 'david.s@fastfood.sys' },
    { id: 6, name: 'Jasmine Lee', role: 'Kitchen', status: 'Active', shift: 'Evening', email: 'jasmine.l@fastfood.sys' },
];

const Employees = () => {
    return (
        <div className="employees-page animate-fade-in">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <div>
                    <h1 style={{ fontSize: '1.8rem', color: 'white' }}>XODIMLAR LAVOZIMLARI</h1>
                    <p style={{ color: 'var(--text-dim)' }}>Xodimlar ruxsatnomalari, smenalari va samaradorligini boshqarish.</p>
                </div>
                <button className="neon-btn" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <UserPlus size={18} />
                    <span>Xodim qo'shish</span>
                </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', marginBottom: '2rem' }}>
                <div className="glass-card" style={{ padding: '1.5rem' }}>
                    <h4 style={{ fontSize: '0.8rem', color: 'var(--text-dim)', marginBottom: '1rem' }}>ISHDA BO'LGAN XODIMLAR</h4>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>12</div>
                        <div style={{ flex: 1, height: '6px', background: 'var(--glass)', borderRadius: '3px' }}>
                            <div style={{ width: '80%', height: '100%', background: 'var(--success)', borderRadius: '3px' }}></div>
                        </div>
                    </div>
                </div>
                <div className="glass-card" style={{ padding: '1.5rem' }}>
                    <h4 style={{ fontSize: '0.8rem', color: 'var(--text-dim)', marginBottom: '1rem' }}>FAOL SMENALAR</h4>
                    <div style={{ display: 'flex', gap: '8px' }}>
                        <span style={{ padding: '4px 12px', background: 'var(--primary)', borderRadius: '12px', fontSize: '0.75rem' }}>Ertalabki: 8</span>
                        <span style={{ padding: '4px 12px', background: 'var(--glass)', borderRadius: '12px', fontSize: '0.75rem' }}>Kechki: 4</span>
                    </div>
                </div>
                <div className="glass-card" style={{ padding: '1.5rem' }}>
                    <h4 style={{ fontSize: '0.8rem', color: 'var(--text-dim)', marginBottom: '1rem' }}>LAVOZIMLAR</h4>
                    <div style={{ display: 'flex', gap: '8px' }}>
                        <span style={{ color: 'var(--primary)', fontSize: '0.75rem' }}>4 Admin</span>
                        <span style={{ color: 'var(--accent)', fontSize: '0.75rem' }}>12 Oshpaz</span>
                        <span style={{ color: 'var(--success)', fontSize: '0.75rem' }}>8 Kuryer</span>
                    </div>
                </div>
            </div>

            <div className="glass-card" style={{ overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead>
                        <tr style={{ background: 'var(--glass)', color: 'var(--text-dim)', fontSize: '0.85rem' }}>
                            <th style={{ padding: '1.2rem' }}>ISM</th>
                            <th style={{ padding: '1.2rem' }}>LAVOZIM</th>
                            <th style={{ padding: '1.2rem' }}>HOLAT</th>
                            <th style={{ padding: '1.2rem' }}>SMENA</th>
                            <th style={{ padding: '1.2rem' }}>RUXSATNOMALAR</th>
                            <th style={{ padding: '1.2rem' }}>HARAKAT</th>
                        </tr>
                    </thead>
                    <tbody>
                        {EMPLOYEES.map((employee) => (
                            <tr key={employee.id} style={{ borderBottom: '1px solid var(--glass-border)' }}>
                                <td style={{ padding: '1.2rem' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                        <div style={{
                                            width: '32px',
                                            height: '32px',
                                            borderRadius: '8px',
                                            background: 'var(--glass)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            fontWeight: 'bold',
                                            color: 'var(--primary)'
                                        }}>
                                            {employee.name.split(' ').map(n => n[0]).join('')}
                                        </div>
                                        <div>
                                            <p style={{ fontWeight: '600', fontSize: '0.9rem' }}>{employee.name}</p>
                                            <p style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>{employee.email}</p>
                                        </div>
                                    </div>
                                </td>
                                <td style={{ padding: '1.2rem' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                        <Shield size={14} color={employee.role === 'Admin' ? 'var(--primary)' : 'var(--text-dim)'} />
                                        <span style={{ fontSize: '0.9rem' }}>{employee.role}</span>
                                    </div>
                                </td>
                                <td style={{ padding: '1.2rem' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                        <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: employee.status === 'Active' ? 'var(--success)' : 'var(--text-dim)' }}></div>
                                        <span style={{ fontSize: '0.85rem' }}>{employee.status}</span>
                                    </div>
                                </td>
                                <td style={{ padding: '1.2rem', fontSize: '0.9rem' }}>{employee.shift}</td>
                                <td style={{ padding: '1.2rem' }}>
                                    <div style={{ display: 'flex', gap: '4px' }}>
                                        <Check size={14} color="var(--success)" />
                                        <Check size={14} color="var(--success)" />
                                        {employee.role === 'Admin' ? <Check size={14} color="var(--success)" /> : <X size={14} color="var(--danger)" />}
                                    </div>
                                </td>
                                <td style={{ padding: '1.2rem' }}>
                                    <div style={{ display: 'flex', gap: '10px' }}>
                                        <button style={{ background: 'transparent', border: 'none', color: 'var(--text-dim)', cursor: 'pointer' }}><Edit3 size={18} /></button>
                                        <button style={{ background: 'transparent', border: 'none', color: 'var(--danger)', cursor: 'pointer' }}><Trash2 size={18} /></button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Employees;
