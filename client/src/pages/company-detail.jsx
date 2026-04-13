import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { FiArrowLeft, FiBriefcase, FiDollarSign, FiUsers, FiFileText } from "react-icons/fi";
import SleekSpinner from "../components/SleekSpinner";

export default function CompanyDetail() {
  const { id } = useParams();
  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL || ""}/api/companies/${id}`);
        setCompany(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching company details:", err);
        setLoading(false);
      }
    };
    fetchCompany();
  }, [id]);

  if (loading) {
    return <SleekSpinner />;
  }

  if (!company) {
    return <div style={{ padding: '50px', textAlign: 'center', color: 'var(--text-muted)' }}>Company not found.</div>;
  }

  return (
    <div className="company-detail-dashboard">
      <div style={{ marginBottom: '20px' }}>
        <Link to="/company" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', textDecoration: 'none', color: 'var(--text-muted)', fontWeight: '500', fontSize: '0.9rem' }}>
          <FiArrowLeft /> Back to Companies
        </Link>
      </div>

      <div className="dashboard-card" style={{ marginBottom: '30px', display: 'flex', gap: '30px', flexWrap: 'wrap' }}>
        <div style={{ flex: '1 1 300px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '15px' }}>
            <div style={{ width: '60px', height: '60px', borderRadius: '16px', background: 'var(--primary-light)', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {company.logoUrl ? (
                <img src={company.logoUrl} alt={company.name} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
              ) : (
                <span style={{ color: 'var(--primary-accent)', fontSize: '1.5rem', fontWeight: 'bold' }}>{company.name.charAt(0)}</span>
              )}
            </div>
            <div>
              <h1 style={{ fontSize: '2rem', color: 'var(--text-main)', margin: 0 }}>{company.name}</h1>
              <span style={{ color: 'var(--primary-accent)', fontWeight: '600', fontSize: '0.9rem', textTransform: 'uppercase' }}>
                {company.industry || "Technology"}
              </span>
            </div>
          </div>
          <p style={{ color: 'var(--text-muted)', lineHeight: '1.6', fontSize: '0.95rem' }}>
            {company.description || "A top recruiter at JUIT providing excellent opportunities to fresh graduates."}
          </p>
        </div>

        <div style={{ flex: '1 1 300px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
          <div style={{ background: 'var(--bg-primary)', padding: '20px', borderRadius: '16px', border: '1px solid var(--border-color)' }}>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '8px' }}>
              <FiDollarSign /> Avg Package
            </div>
            <div style={{ fontSize: '1.4rem', fontWeight: 'bold', color: 'var(--text-main)' }}>
              {company.averagePackage ? `${company.averagePackage} LPA` : "N/A"}
            </div>
          </div>
          <div style={{ background: 'var(--bg-primary)', padding: '20px', borderRadius: '16px', border: '1px solid var(--border-color)' }}>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '8px' }}>
              <FiUsers /> Students Placed
            </div>
            <div style={{ fontSize: '1.4rem', fontWeight: 'bold', color: 'var(--text-main)' }}>
              {company.noOfStudentsPlaced || "0"}
            </div>
          </div>
          {company.allOffers && company.allOffers.length > 0 && (
            <div style={{ background: 'var(--bg-primary)', padding: '20px', borderRadius: '16px', border: '1px solid var(--border-color)', gridColumn: '1 / -1' }}>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '8px' }}>
                <FiBriefcase /> All Offers (LPA)
              </div>
              <div style={{ fontSize: '1.1rem', fontWeight: '600', color: 'var(--text-main)' }}>
                {company.allOffers.join(", ")}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="dashboard-card">
        <h2 style={{ fontSize: '1.4rem', color: 'var(--text-main)', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <FiFileText color="var(--primary-accent)" /> Recorded Interview Questions
        </h2>

        {company.questions && company.questions.length > 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            {company.questions.map((q) => (
              <div key={q._id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '15px', padding: '20px', borderRadius: '16px', border: '1px solid var(--border-color)', background: 'var(--bg-primary)' }}>
                <div>
                  <h3 style={{ fontSize: '1.1rem', color: 'var(--text-main)', margin: '0 0 10px 0', fontWeight: '600' }}>
                    {q.text?.length > 60 ? q.text.substring(0, 60) + '...' : q.text}
                  </h3>
                  <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'center' }}>
                    <span style={{ padding: '4px 12px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: '600', background: 'var(--primary-light)', color: 'var(--primary-accent)' }}>
                      Topic: {q.type}
                    </span>
                    <span style={{ padding: '4px 12px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: '600', background: 'var(--highlight-yellow)', color: 'var(--highlight-yellow-text)' }}>
                      Diff: {q.difficulty}
                    </span>
                    <span style={{ padding: '4px 12px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: '600', background: 'var(--highlight-orange)', color: 'var(--highlight-orange-text)' }}>
                      {q.role}
                    </span>
                  </div>
                </div>
                <a href={q.link} target="_blank" rel="noopener noreferrer" style={{ padding: '8px 16px', background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '12px', color: 'var(--text-main)', textDecoration: 'none', fontSize: '0.9rem', fontWeight: '500' }}>
                  View Link
                </a>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ padding: '40px', textAlign: 'center', background: 'var(--bg-primary)', borderRadius: '16px', border: '1px dashed var(--border-color)', color: 'var(--text-muted)' }}>
            No interview questions recorded yet for this company.
          </div>
        )}
      </div>
    </div>
  );
}
