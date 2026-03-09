import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import Layout from './layout/Layout';

import Home from './pages/Home';
import Company from './pages/Company';
import Business from './pages/Business';
import Portfolio from './pages/Portfolio';
import Contact from './pages/Contact';

// Admin Import
import Login from './pages/admin/Login';
import Dashboard from './pages/admin/Dashboard';
import { AdminProvider } from './context/AdminContext';

// Logic to conditionally render Layout (Navbar/Footer)
const AppContent = () => {
  return (
    <>
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
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </Layout>
        } />
      </Routes>
    </>
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
