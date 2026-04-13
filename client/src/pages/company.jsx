import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FiTrendingUp, FiUsers, FiMapPin } from "react-icons/fi";
import SleekSpinner from "../components/SleekSpinner";

export default function Company() {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL || ""}/api/companies`);
        setCompanies(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching companies:", err);
        setLoading(false);
      }
    };
    fetchCompanies();
  }, []);

  return (
    <div className="company-dashboard">
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <h1>Participating Companies</h1>
          <p>Discover roles and packages offered by top recruiters.</p>
        </div>
        <div style={{ background: 'white', padding: '10px 15px', borderRadius: '12px', fontSize: '0.9rem', color: 'var(--text-muted)', border: '1px solid var(--border-color)' }}>
          Showing {companies.length} companies
        </div>
      </div>

      {loading ? (
        <SleekSpinner />
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '25px', marginTop: '20px' }}>
          {companies.map((company, i) => (
            <Link to={`/company/${company._id}`} key={company._id} style={{ textDecoration: 'none' }}>
              <div className="dashboard-card" style={{ transition: 'transform 0.2s, box-shadow 0.2s', cursor: 'pointer', height: '100%', display: 'flex', flexDirection: 'column' }} onMouseOver={e => e.currentTarget.style.transform = 'translateY(-5px)'} onMouseOut={e => e.currentTarget.style.transform = 'translateY(0)'}>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '15px' }}>
                  <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'var(--primary-light)', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    {company.logoUrl ? (
                      <img src={company.logoUrl} alt={company.name} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                    ) : (
                      <span style={{ color: 'var(--primary-accent)', fontSize: '1.1rem', fontWeight: 'bold' }}>{company.name.charAt(0)}</span>
                    )}
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '5px' }}>
                    <div style={{ padding: '4px 10px', background: i % 2 === 0 ? 'var(--highlight-yellow)' : 'var(--primary-light)', color: i % 2 === 0 ? 'var(--highlight-yellow-text)' : 'var(--primary-accent)', borderRadius: '6px', fontSize: '0.7rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                      {company.industry || "Technology"}
                    </div>
                    <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <FiMapPin size={14} /> Multiple
                    </div>
                  </div>
                </div>

                <h3 style={{ fontSize: '1.4rem', color: 'var(--text-main)', marginBottom: '15px' }}>{company.name}</h3>
                
                <div style={{ display: 'flex', gap: '20px', marginTop: 'auto', paddingTop: '20px', borderTop: '1px solid var(--border-color)' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', flex: 1 }}>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <FiTrendingUp /> Avg Package
                    </span>
                    <span style={{ fontSize: '1.1rem', fontWeight: '600', color: 'var(--text-main)' }}>
                      {company.averagePackage ? `${company.averagePackage} LPA` : "N/A"}
                    </span>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', flex: 1 }}>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <FiUsers /> Students Placed
                    </span>
                    <span style={{ fontSize: '1.1rem', fontWeight: '600', color: 'var(--text-main)' }}>
                      {company.noOfStudentsPlaced || "0"}
                    </span>
                  </div>
                </div>

              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
