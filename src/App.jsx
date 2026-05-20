import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import DashboardOverview from './pages/DashboardOverview';
import Orders from './pages/Orders';
import Kitchen from './pages/Kitchen';
import Inventory from './pages/Inventory';
import Analytics from './pages/Analytics';
import Employees from './pages/Employees';
import Queue from './pages/Queue';
import QRMenu from './pages/QRMenu';
import './App.css';

// Placeholder Pages
const PlaceholderPage = ({ title }) => (
  <div className="animate-fade-in">
    <h1 style={{ fontSize: '1.8rem', color: 'white', marginBottom: '1rem' }}>{title}</h1>
    <div className="glass-card" style={{ padding: '3rem', textAlign: 'center' }}>
      <p style={{ color: 'var(--text-dim)', fontSize: '1.1rem' }}>
        The <span className="neon-text">{title}</span> module is being initialized...
      </p>
      <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'center' }}>
        <div className="neon-border" style={{ width: '40px', height: '40px', borderRadius: '50%', borderTopColor: 'transparent', animation: 'spin 1s linear infinite' }}></div>
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
        <Sidebar />
        <main className="main-content">
          <Topbar />
          <Routes>
            <Route path="/" element={<DashboardOverview />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/kitchen" element={<Kitchen />} />
            <Route path="/queue" element={<Queue />} />
            <Route path="/qr-menu" element={<QRMenu />} />
            <Route path="/delivery" element={<PlaceholderPage title="DELIVERY TRACKING" />} />
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/employees" element={<Employees />} />
            <Route path="/customers" element={<PlaceholderPage title="CUSTOMER DATABASE" />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/settings" element={<PlaceholderPage title="SYSTEM SETTINGS" />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
