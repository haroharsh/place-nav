import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { FiHome, FiBriefcase, FiFileText, FiBarChart2, FiSearch, FiBell, FiSettings, FiHelpCircle, FiLogOut } from 'react-icons/fi';

const Layout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [userName, setUserName] = useState("Original name from database");

  useEffect(() => {
    const userStr = localStorage.getItem("user");
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        if (user && user.name) setUserName(user.name);
      } catch (e) {
        console.error("Failed to parse user");
      }
    }
  }, []);

  const handleLogout = () => {
    // Basic logout handling for now
    navigate('/');
  };

  const getPageTitle = () => {
    const path = location.pathname;
    if (path.includes('/company-analytics')) return 'Analytics';
    if (path.includes('/company-detail') || path.match(/\/company\/[a-zA-Z0-9]+/)) return 'Company Detail';
    if (path.includes('/company-question')) return 'Interview Questions';
    if (path.includes('/company')) return 'Companies';
    if (path.includes('/home')) return 'Overview';
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
            <span>B.Tech CSE</span>
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
          </div>
        </header>

        {/* Dynamic Page Content */}
        <div className="page-content">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
