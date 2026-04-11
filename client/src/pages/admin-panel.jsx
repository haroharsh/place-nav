import { useState } from "react";
import { Link } from "react-router-dom";
import { FiPlusCircle, FiBriefcase, FiFileText, FiArrowRight } from "react-icons/fi";

export default function AdminPanel() {
  return (
    <div className="admin-dashboard">
      <div className="page-header">
        <h1>Admin Control Center</h1>
        <p>Manage companies and interview questions for the placement portal.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px', marginTop: '40px' }}>
        <div className="dashboard-card" style={{ padding: '30px', textAlign: 'center' }}>
          <div style={{ background: 'var(--primary-light)', padding: '20px', borderRadius: '50%', width: '80px', height: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', color: 'var(--primary-accent)' }}>
            <FiBriefcase size={40} />
          </div>
          <h2 style={{ marginBottom: '10px' }}>Manage Companies</h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '25px' }}>Add new recruitment partners and their details to the portal.</p>
          <Link to="/admin/add-company" style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', padding: '12px 24px', background: 'var(--primary-accent)', color: 'white', borderRadius: '12px', textDecoration: 'none', fontWeight: 'bold' }}>
            <FiPlusCircle /> Add Company <FiArrowRight />
          </Link>
        </div>

        <div className="dashboard-card" style={{ padding: '30px', textAlign: 'center' }}>
          <div style={{ background: 'rgba(255, 153, 0, 0.1)', padding: '20px', borderRadius: '50%', width: '80px', height: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', color: '#ff9900' }}>
            <FiFileText size={40} />
          </div>
          <h2 style={{ marginBottom: '10px' }}>Manage Questions</h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '25px' }}>Input authentic interview questions and solutions for students.</p>
          <Link to="/admin/add-question" style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', padding: '12px 24px', border: '2px solid var(--primary-accent)', color: 'var(--primary-accent)', borderRadius: '12px', textDecoration: 'none', fontWeight: 'bold' }}>
            <FiPlusCircle /> Add Question <FiArrowRight />
          </Link>
        </div>
      </div>
    </div>
  );
}
