import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Topbar from './components/Topbar';
import DashboardOverview from './pages/DashboardOverview';
import Products from './pages/Products';
import Orders from './pages/Orders';
import OrdersBoard from './pages/OrdersBoard';
import OrderEntry from './pages/OrderEntry';
import Queue from './pages/Queue';
import QueueMonitor from './pages/QueueMonitor';
import Kitchen from './pages/Kitchen';
import Inventory from './pages/Inventory';
import Analytics from './pages/Analytics';
import Employees from './pages/Employees';
import QRMenu from './pages/QRMenu';
import Settings from './pages/Settings';
import './App.css';

const PlaceholderPage = ({ title }) => (
  <div style={{ padding: '2rem', textAlign: 'center' }}>
    <h1 style={{ color: 'white' }}>{title}</h1>
    <p style={{ color: 'var(--text-dim)' }}>Bu sahifa tayyorlanmoqda...</p>
  </div>
);

const AppContent = () => {
  const location = useLocation();
  const isQueue = location.pathname === '/queue-monitor';

  return (
    <div className="app-container">
      <main className={isQueue ? "" : "main-content"}>
        {!isQueue && <Topbar />}
        <div style={{ padding: isQueue ? '0' : (location.pathname === '/' ? '0' : '0 2.5rem') }}>
          <Routes>
            <Route path="/" element={<DashboardOverview />} />
            <Route path="/products" element={<Products />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/orders-board" element={<OrdersBoard />} />
            <Route path="/new-order" element={<OrderEntry />} />
            <Route path="/kitchen" element={<Kitchen />} />
            <Route path="/queue" element={<Queue />} />
            <Route path="/queue-monitor" element={<QueueMonitor />} />
            <Route path="/qr-menu" element={<QRMenu />} />
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/employees" element={<Employees />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/delivery" element={<PlaceholderPage title="YETKAZIB BERISHNI KUZATISH" />} />
            <Route path="/customers" element={<PlaceholderPage title="MIJOZLAR BAZASI" />} />
          </Routes>
        </div>
      </main>
    </div>
  );
};


function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
