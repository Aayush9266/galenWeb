import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { Sidebar } from './components/Sidebar';
import Home from './pages/Home';
import CreateResearch from './pages/CreateResearch';
import Profile from './pages/Profile';
import AdminDashboard from './pages/Dashboard';
import ResearchDetails from './pages/ResearchDetails';
import Login from './pages/Login';
import { StudiesProvider } from './contexts/StudiesContext';
import { Toaster } from "./components/ui/toaster";
import Payment from './pages/payment';
import Dashboard from './pages/Dashboard';

function AppContent() {
  const location = useLocation();

  // Determine if the current page is the Login page
  const isLoginPage = location.pathname === '/';
  

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Render the Sidebar only if not on the Login page */}
      {!isLoginPage && <Sidebar />}
      <main className={`flex-1 overflow-x-hidden overflow-y-auto bg-gray-100`}>
      {/* <main className={`flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 ${!isLoginPage ? 'ml-64' : ''}`}> */}
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/create-research" element={<CreateResearch />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/admin" element={<Dashboard />} />
          <Route path="/research/:id" element={<ResearchDetails />} />
          <Route path="/payment" element={<Payment />} />
        </Routes>
      </main>
      <Toaster />
    </div>
  );
}

function App() {
  return (
    <StudiesProvider>
      <Router>
        <AppContent />
      </Router>
    </StudiesProvider>
  );
}

export default App;
