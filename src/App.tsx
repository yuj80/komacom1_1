import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import Layout from './layout/Layout';

import React, { Suspense } from 'react';

const Home = React.lazy(() => import('./pages/Home'));
const Company = React.lazy(() => import('./pages/Company'));
const Business = React.lazy(() => import('./pages/Business'));
const Portfolio = React.lazy(() => import('./pages/Portfolio'));
const PortfolioDetail = React.lazy(() => import('./pages/PortfolioDetail'));
const Contact = React.lazy(() => import('./pages/Contact'));
const Partners = React.lazy(() => import('./pages/Partners'));
const Clients = React.lazy(() => import('./pages/Clients'));

// Admin Import
const Login = React.lazy(() => import('./pages/admin/Login'));
const Dashboard = React.lazy(() => import('./pages/admin/Dashboard'));
import { AdminProvider } from './context/AdminContext';

// Logic to conditionally render Layout (Navbar/Footer)
const AppContent = () => {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-white text-zinc-400">Loading...</div>}>
      <Routes>
        {/* Admin Routes (No Standard Layout) */}
        <Route path="/admin/login" element={<Login />} />
        <Route path="/admin/dashboard" element={<Dashboard />} />

        {/* Public Routes (With Standard Layout) */}
        <Route path="*" element={
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/company" element={<Company />} />
              <Route path="/business" element={<Business />} />
              <Route path="/portfolio" element={<Portfolio />} />
              <Route path="/portfolio/:id" element={<PortfolioDetail />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/partners" element={<Partners />} />
              <Route path="/clients" element={<Clients />} />
            </Routes>
          </Layout>
        } />
      </Routes>
    </Suspense>
  );
};

function App() {
  return (
    <AdminProvider>
      <Router>
        <ScrollToTop />
        <AppContent />
      </Router>
    </AdminProvider>
  );
}

export default App;
