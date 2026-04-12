import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { FiHome, FiBriefcase, FiFileText, FiBarChart2, FiSearch, FiBell, FiSettings, FiHelpCircle, FiLogOut, FiShield, FiSun, FiMoon } from 'react-icons/fi';
import { useTheme } from '../context/ThemeContext';

const Layout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();
  const [userName, setUserName] = useState("Original name from database");
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const userStr = localStorage.getItem("user");
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        if (user && user.name) setUserName(user.name);
        if (user && user.role === 'admin') setIsAdmin(true);
      } catch (e) {
        console.error("Failed to parse user");
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate('/');
  };

  const getPageTitle = () => {
    const path = location.pathname;
    if (path.includes('/company-analytics')) return 'Analytics';
    if (path.includes('/company-detail') || path.match(/\/company\/[a-zA-Z0-9]+/)) return 'Company Detail';
    if (path.includes('/company-question')) return 'Interview Questions';
    if (path.includes('/company')) return 'Companies';
    if (path.includes('/home')) return 'Overview';
    if (path.includes('/admin')) return 'Admin Control Center';
    return 'Dashboard';
  };

  return (
    <div className="dashboard-layout">
      <aside className="sidebar">
        <div className="sidebar-logo">
          Placement-Navigator
        </div>
        
        <div className="sidebar-profile">
          <div className="profile-img">{userName.charAt(0).toUpperCase()}</div>
          <div className="profile-info">
            <h4>{userName}</h4>
            <span>{isAdmin ? 'Administrator' : 'B.Tech CSE'}</span>
          </div>
        </div>

        <nav className="nav-links">
          <NavLink 
            to="/home" 
            className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
          >
            <FiHome /> Overview
          </NavLink>
          <NavLink 
            to="/company" 
            className={({ isActive }) => `nav-item ${location.pathname === '/company' || location.pathname.includes('/company/') && !location.pathname.includes('-') ? 'active' : ''}`}
          >
            <FiBriefcase /> Companies
          </NavLink>
          <NavLink 
            to="/company-question" 
            className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
          >
            <FiFileText /> Questions
          </NavLink>
          <NavLink 
            to="/company-analytics" 
            className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
          >
            <FiBarChart2 /> Analytics
          </NavLink>

          {isAdmin && (
            <NavLink 
              to="/admin" 
              className={({ isActive }) => `nav-item admin-nav ${isActive ? 'active' : ''}`}
              style={{ marginTop: 'auto', background: 'rgba(255, 107, 107, 0.1)', color: '#ff6b6b' }}
            >
              <FiShield /> Admin Panel
            </NavLink>
          )}
        </nav>

        <div className="sidebar-footer">
          <button onClick={handleLogout} className="nav-item" style={{ background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', width: '100%' }}>
            <FiLogOut /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="main-content">
        <header className="top-bar">
          <div className="top-bar-nav">
            <span className="top-bar-link active">{getPageTitle()}</span>
          </div>
          
          <div className="top-bar-actions">
            <div 
              className="action-icon theme-toggle" 
              onClick={toggleTheme}
              title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
              style={{ fontSize: '1.2rem', display: 'flex', alignItems: 'center' }}
            >
              {theme === 'light' ? <FiMoon /> : <FiSun />}
            </div>
          </div>
        </header>

        <div className="page-content">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
