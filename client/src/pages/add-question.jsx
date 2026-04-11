import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FiArrowLeft, FiSave, FiCheckCircle } from "react-icons/fi";

export default function AddQuestion() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    text: "",
    type: "Technical",
    role: "Software Development Engineer",
    link: "",
    difficulty: "Medium",
    companies: [],
  });
  const [allCompanies, setAllCompanies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL || ""}/api/companies`);
        setAllCompanies(res.data);
      } catch (err) {
        console.error("Failed to fetch companies");
      } finally {
        setFetching(false);
      }
    };
    fetchCompanies();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCompanyToggle = (companyId) => {
    const companies = [...formData.companies];
    const index = companies.indexOf(companyId);
    if (index > -1) {
      companies.splice(index, 1);
    } else {
      companies.push(companyId);
    }
    setFormData({ ...formData, companies });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.companies.length === 0) {
      setError("Please select at least one company");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const token = localStorage.getItem("token");
      await axios.post(`${import.meta.env.VITE_API_URL || ""}/api/questions`, formData, {
        headers: { "x-auth-token": token }
      });
      navigate("/admin");
    } catch (err) {
      setError(err.response?.data?.msg || "Failed to add question");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-question-page">
      <button onClick={() => navigate("/admin")} style={{ display: 'flex', alignItems: 'center', gap: '8px', border: 'none', background: 'none', cursor: 'pointer', color: 'var(--text-muted)', marginBottom: '20px' }}>
        <FiArrowLeft /> Back to Admin Panel
      </button>

      <div className="dashboard-card" style={{ maxWidth: '800px', margin: '0 auto' }}>
        <h1>Add New Question</h1>
        <p style={{ color: 'var(--text-muted)' }}>Input a question asked in interviews and link it to companies.</p>

        {error && <div style={{ color: 'red', background: 'rgba(255,0,0,0.1)', padding: '10px', borderRadius: '8px', margin: '20px 0' }}>{error}</div>}

        <form onSubmit={handleSubmit} style={{ marginTop: '30px', display: 'grid', gap: '20px' }}>
          <div className="form-group">
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>Question Text *</label>
            <textarea 
              name="text" 
              required 
              rows="3"
              style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--border-color)' }}
              onChange={handleChange}
              placeholder="What is your favorite data structure?"
            ></textarea>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div className="form-group">
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>Type</label>
              <select 
                name="type" 
                style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--border-color)' }}
                onChange={handleChange}
              >
                <option value="Technical">Technical</option>
                <option value="HR">HR</option>
                <option value="Aptitude">Aptitude</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="form-group">
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>Difficulty</label>
              <select 
                name="difficulty" 
                style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--border-color)' }}
                onChange={handleChange}
              >
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>Target Role</label>
            <input 
              name="role" 
              required
              defaultValue="Software Development Engineer"
              style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--border-color)' }}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>Resource Link (LeetCode, GFG, etc.) *</label>
            <input 
              name="link" 
              required
              style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--border-color)' }}
              onChange={handleChange}
              placeholder="https://leetcode.com/..."
            />
          </div>

          <div className="form-group">
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>Select Companies (at least one) *</label>
            {fetching ? <p>Loading companies...</p> : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '10px', maxHeight: '200px', overflowY: 'auto', padding: '10px', border: '1px solid var(--border-color)', borderRadius: '8px' }}>
                {allCompanies.map(company => (
                  <div 
                    key={company._id} 
                    onClick={() => handleCompanyToggle(company._id)}
                    style={{ 
                      padding: '8px', 
                      borderRadius: '6px', 
                      cursor: 'pointer', 
                      fontSize: '0.9rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      background: formData.companies.includes(company._id) ? 'var(--primary-light)' : 'transparent',
                      border: `1px solid ${formData.companies.includes(company._id) ? 'var(--primary-accent)' : 'var(--border-color)'}`,
                      color: formData.companies.includes(company._id) ? 'var(--primary-accent)' : 'var(--text-main)'
                    }}
                  >
                    {formData.companies.includes(company._id) && <FiCheckCircle />}
                    {company.name}
                  </div>
                ))}
              </div>
            )}
          </div>

          <button 
            type="submit" 
            disabled={loading}
            style={{ padding: '15px', background: 'var(--primary-accent)', color: 'white', border: 'none', borderRadius: '12px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginTop: '10px' }}
          >
            {loading ? "Saving..." : <><FiSave /> Save Question</>}
          </button>
        </form>
      </div>
    </div>
  );
}
