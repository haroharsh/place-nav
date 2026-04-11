import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FiArrowLeft, FiSave } from "react-icons/fi";

export default function AddCompany() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    industry: "",
    website: "",
    logoUrl: "",
    averagePackage: "",
    noOfStudentsPlaced: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const token = localStorage.getItem("token");
      await axios.post(`${import.meta.env.VITE_API_URL || ""}/api/companies`, formData, {
        headers: { "x-auth-token": token }
      });
      navigate("/admin");
    } catch (err) {
      setError(err.response?.data?.msg || "Failed to add company");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-company-page">
      <button onClick={() => navigate("/admin")} style={{ display: 'flex', alignItems: 'center', gap: '8px', border: 'none', background: 'none', cursor: 'pointer', color: 'var(--text-muted)', marginBottom: '20px' }}>
        <FiArrowLeft /> Back to Admin Panel
      </button>

      <div className="dashboard-card" style={{ maxWidth: '800px', margin: '0 auto' }}>
        <h1>Add New Company</h1>
        <p style={{ color: 'var(--text-muted)' }}>Fill in the details for the new recruitment partner.</p>

        {error && <div style={{ color: 'red', background: 'rgba(255,0,0,0.1)', padding: '10px', borderRadius: '8px', margin: '20px 0' }}>{error}</div>}

        <form onSubmit={handleSubmit} style={{ marginTop: '30px', display: 'grid', gap: '20px' }}>
          <div className="form-group">
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>Company Name *</label>
            <input 
              name="name" 
              required 
              style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--border-color)' }}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>Logo URL</label>
            <input 
              name="logoUrl" 
              style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--border-color)' }}
              onChange={handleChange}
              placeholder="https://example.com/logo.png"
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div className="form-group">
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>Industry</label>
              <input 
                name="industry" 
                style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--border-color)' }}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>Website</label>
              <input 
                name="website" 
                style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--border-color)' }}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-group">
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>Description</label>
            <textarea 
              name="description" 
              rows="4"
              style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--border-color)' }}
              onChange={handleChange}
            ></textarea>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div className="form-group">
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>Avg Package (LPA)</label>
              <input 
                name="averagePackage" 
                type="number"
                style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--border-color)' }}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>Students Placed</label>
              <input 
                name="noOfStudentsPlaced" 
                type="number"
                style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--border-color)' }}
                onChange={handleChange}
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            style={{ padding: '15px', background: 'var(--primary-accent)', color: 'white', border: 'none', borderRadius: '12px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}
          >
            {loading ? "Saving..." : <><FiSave /> Save Company</>}
          </button>
        </form>
      </div>
    </div>
  );
}
