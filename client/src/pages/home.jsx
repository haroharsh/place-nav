import { Link } from "react-router-dom";
import { FiBriefcase, FiFileText, FiBarChart2 } from "react-icons/fi";
import { useEffect, useState } from "react";

export default function Home() {
  const [userName, setUserName] = useState("Student");

  useEffect(() => {
    const userStr = localStorage.getItem("user");
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        if (user && user.name) setUserName(user.name.split(' ')[0]);
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  return (
    <div className="home-dashboard">
      <div className="page-header">
        <h1>Welcome Back, {userName}</h1>
        <p>Here is your placement portal overview for today.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '30px', marginTop: '30px' }}>
        
        {/* Companies Card */}
        <div className="dashboard-card" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ padding: '15px', background: 'var(--primary-light)', borderRadius: '16px', width: 'fit-content', color: 'var(--primary-accent)' }}>
            <FiBriefcase size={28} />
          </div>
          <div>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '8px' }}>Explore Companies</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.5' }}>
              Discover comprehensive profiles of prestigious companies visiting our campus for recruitment drives.
            </p>
          </div>
          <Link to="/company" className="primary-btn" style={{ marginTop: 'auto' }}>
            View Companies
          </Link>
        </div>

        {/* Questions Card */}
        <div className="dashboard-card" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ padding: '15px', background: 'var(--highlight-orange)', borderRadius: '16px', width: 'fit-content', color: 'var(--highlight-orange-text)' }}>
            <FiFileText size={28} />
          </div>
          <div>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '8px' }}>Interview Questions</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.5' }}>
              Prepare effectively with authentic technical and HR questions asked by top recruiters.
            </p>
          </div>
          <Link to="/company-question" className="secondary-btn" style={{ marginTop: 'auto', background: 'var(--highlight-orange)', color: 'var(--highlight-orange-text)' }}>
            Practice Now
          </Link>
        </div>

        {/* Analytics Card */}
        <div className="dashboard-card" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ padding: '15px', background: 'var(--highlight-yellow)', borderRadius: '16px', width: 'fit-content', color: 'var(--highlight-yellow-text)' }}>
            <FiBarChart2 size={28} />
          </div>
          <div>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '8px' }}>Placement Analytics</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.5' }}>
              Dive deep into placement statistics, hiring trends, and package details across departments.
            </p>
          </div>
          <Link to="/company-analytics" className="secondary-btn" style={{ marginTop: 'auto' }}>
            See Analytics
          </Link>
        </div>

      </div>
    </div>
  );
}
