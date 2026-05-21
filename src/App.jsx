import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Topbar from './components/Topbar';
import DashboardOverview from './pages/DashboardOverview';
import Orders from './pages/Orders';
import Kitchen from './pages/Kitchen';
import Inventory from './pages/Inventory';
import Analytics from './pages/Analytics';
import Employees from './pages/Employees';
import Queue from './pages/Queue';
import QRMenu from './pages/QRMenu';
import Settings from './pages/Settings';
import './App.css';

// Placeholder Pages
const PlaceholderPage = ({ title }) => (
  <div className="animate-fade-in">
    <h1 style={{ fontSize: '1.8rem', color: 'var(--text-main)', marginBottom: '1.5rem' }}>{title}</h1>
    <div className="glass-card" style={{ padding: '4rem', textAlign: 'center', borderStyle: 'dashed' }}>
      <p style={{ color: 'var(--text-dim)', fontSize: '1.1rem', fontWeight: '500' }}>
        <span style={{ color: 'var(--accent)', fontWeight: '700' }}>{title}</span> moduli ishga tushirilmoqda...
      </p>
      <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'center' }}>
        <div style={{
          width: '45px',
          height: '45px',
          borderRadius: '50%',
          border: '4px solid var(--border)',
          borderTopColor: 'var(--primary)',
          animation: 'spin 1s linear infinite'
        }}></div>
      </div>
    </div>
    <style>{`
      @keyframes spin { to { transform: rotate(360deg); } }
    `}</style>
  </div>
);

function App() {
  return (
    <Router>
      <div className="app-container">
        <main className="main-content">
          <Topbar />
          <div style={{ padding: '0 2.5rem' }}>
            <Routes>
              <Route path="/" element={<DashboardOverview />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/kitchen" element={<Kitchen />} />
              <Route path="/queue" element={<Queue />} />
              <Route path="/qr-menu" element={<QRMenu />} />
              <Route path="/delivery" element={<PlaceholderPage title="YETKAZIB BERISHNI KUZATISH" />} />
              <Route path="/inventory" element={<Inventory />} />
              <Route path="/employees" element={<Employees />} />
              <Route path="/customers" element={<PlaceholderPage title="MIJOZLAR BAZASI" />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </div>
        </main>
      </div>
    </Router>
  );
}

export default App;
