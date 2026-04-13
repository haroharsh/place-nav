import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FiFilter, FiSearch, FiMessageSquare, FiBookOpen, FiPlus, FiX, FiExternalLink } from "react-icons/fi";
import SleekSpinner from "../components/SleekSpinner";

export default function CompanyQuestion() {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showSolutionModal, setShowSolutionModal] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [solutionForm, setSolutionForm] = useState({ type: "text", content: "" });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const userStr = localStorage.getItem("user");
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        if (user && user.role === 'admin') setIsAdmin(true);
      } catch (e) {
        console.error("Failed to parse user");
      }
    }

    const fetchQuestions = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL || ""}/api/questions`);
        setQuestions(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching global questions:", err);
        setLoading(false);
      }
    };
    fetchQuestions();
  }, []);

  const handleOpenSolutionModal = (q) => {
    setSelectedQuestion(q);
    if (q.solution) {
      setSolutionForm({ type: q.solution.type, content: q.solution.content });
    } else {
      setSolutionForm({ type: "text", content: "" });
    }
    setShowSolutionModal(true);
  };

  const handleSolutionSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const token = localStorage.getItem("token");
      const res = await axios.put(
        `${import.meta.env.VITE_API_URL || ""}/api/questions/${selectedQuestion._id}/solution`,
        solutionForm,
        { headers: { "x-auth-token": token } }
      );
      setQuestions(questions.map(q => q._id === selectedQuestion._id ? res.data : q));
      setShowSolutionModal(false);
    } catch (err) {
      alert("Failed to save solution");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="questions-dashboard">
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '20px' }}>
        <div>
          <h1>Interview Questions Hub</h1>
          <p>Browse through authentic technical and HR queries asked by top recruiters.</p>
        </div>
        <div style={{ display: 'flex', gap: '15px' }}>
          <button style={{ background: 'white', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '10px 15px', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', color: 'var(--text-muted)' }}>
            <FiFilter /> Filter
          </button>
        </div>
      </div>

      {loading ? (
        <SleekSpinner />
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '30px' }}>
          {questions.map((q) => (
            <div key={q._id} className="dashboard-card" style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
              <div style={{ padding: '15px', background: 'var(--primary-light)', borderRadius: '16px', color: 'var(--primary-accent)', flexShrink: 0 }}>
                <FiMessageSquare size={24} />
              </div>
              <div style={{ flex: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '15px' }}>
                <div>
                  <h3 style={{ fontSize: '1.1rem', color: 'var(--text-main)', margin: '0 0 10px 0', fontWeight: '600' }}>
                    {q.text}
                  </h3>
                  <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'center' }}>
                    <span style={{ padding: '4px 12px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: '600', background: 'var(--highlight-yellow)', color: 'var(--highlight-yellow-text)' }}>
                      Topic: {q.type}
                    </span>
                    <span style={{ padding: '4px 12px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: '600', background: 'var(--highlight-orange)', color: 'var(--highlight-orange-text)' }}>
                      Diff: {q.difficulty}
                    </span>
                    <span style={{ padding: '4px 12px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: '600', border: '1px solid var(--border-color)', color: 'var(--text-muted)' }}>
                      {q.role}
                    </span>
                    {q.companies && q.companies.length > 0 && (
                      <span style={{ fontSize: '0.8rem', color: 'white', background: 'var(--primary-accent)', padding: '4px 12px', borderRadius: '20px', fontWeight: '600' }}>
                        {q.companies.length} {q.companies.length === 1 ? 'Company' : 'Companies'}
                      </span>
                    )}
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                  {q.solution ? (
                    <button 
                      onClick={() => handleOpenSolutionModal(q)}
                      style={{ padding: '8px 16px', background: 'rgba(39, 174, 96, 0.1)', border: '1px solid #27ae60', borderRadius: '12px', color: '#27ae60', cursor: 'pointer', fontSize: '0.9rem', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '8px' }}
                    >
                      <FiBookOpen /> View Solution
                    </button>
                  ) : isAdmin ? (
                    <button 
                      onClick={() => handleOpenSolutionModal(q)}
                      style={{ padding: '8px 16px', background: 'rgba(255, 107, 107, 0.1)', border: '1px solid #ff6b6b', borderRadius: '12px', color: '#ff6b6b', cursor: 'pointer', fontSize: '0.9rem', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '8px' }}
                    >
                      <FiPlus /> Add Solution
                    </button>
                  ) : null}
                  <a href={q.link} target="_blank" rel="noopener noreferrer" style={{ padding: '8px 16px', background: 'var(--bg-primary)', border: '1px solid var(--border-color)', borderRadius: '12px', color: 'var(--text-main)', textDecoration: 'none', fontSize: '0.9rem', fontWeight: '500', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    Practice <FiExternalLink />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {showSolutionModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '20px' }}>
          <div className="dashboard-card" style={{ maxWidth: '600px', width: '100%', position: 'relative', maxHeight: '90vh', overflowY: 'auto' }}>
            <button 
              onClick={() => setShowSolutionModal(false)}
              style={{ position: 'absolute', top: '20px', right: '20px', border: 'none', background: 'none', cursor: 'pointer', fontSize: '1.5rem', color: 'var(--text-muted)' }}
            >
              <FiX />
            </button>
            <h2 style={{ marginBottom: '10px' }}>{isAdmin ? 'Manage Solution' : 'Question Solution'}</h2>
            <p style={{ color: 'var(--text-muted)', marginBottom: '20px', fontSize: '0.9rem' }}>{selectedQuestion?.text}</p>
            
            {isAdmin ? (
              <form onSubmit={handleSolutionSubmit}>
                <div style={{ marginBottom: '15px' }}>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>Solution Type</label>
                  <select 
                    value={solutionForm.type}
                    onChange={(e) => setSolutionForm({ ...solutionForm, type: e.target.value })}
                    style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--border-color)' }}
                  >
                    <option value="text">Text / Markdown</option>
                    <option value="pdf">PDF Link</option>
                  </select>
                </div>
                <div style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
                    {solutionForm.type === 'text' ? 'Solution Content' : 'PDF URL'}
                  </label>
                  <textarea 
                    value={solutionForm.content}
                    onChange={(e) => setSolutionForm({ ...solutionForm, content: e.target.value })}
                    rows={solutionForm.type === 'text' ? 10 : 2}
                    required
                    style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--border-color)', fontFamily: solutionForm.type === 'text' ? 'monospace' : 'inherit' }}
                    placeholder={solutionForm.type === 'text' ? "Write the step-by-step solution here..." : "https://example.com/solution.pdf"}
                  ></textarea>
                </div>
                <button 
                  type="submit" 
                  disabled={submitting}
                  style={{ width: '100%', padding: '12px', background: 'var(--primary-accent)', color: 'white', border: 'none', borderRadius: '12px', fontWeight: 'bold', cursor: 'pointer' }}
                >
                  {submitting ? "Saving..." : "Save Solution"}
                </button>
              </form>
            ) : (
              <div style={{ whiteSpace: 'pre-wrap', background: 'var(--bg-secondary)', padding: '20px', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
                {selectedQuestion?.solution?.type === 'pdf' ? (
                  <div style={{ textAlign: 'center', padding: '20px' }}>
                    <FiFileText size={48} style={{ color: 'var(--primary-accent)', marginBottom: '15px' }} />
                    <h3>PDF Solution Available</h3>
                    <p style={{ marginBottom: '20px', color: 'var(--text-muted)' }}>This solution is provided in PDF format.</p>
                    <a 
                      href={selectedQuestion.solution.content} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '10px 20px', background: 'var(--primary-accent)', color: 'white', borderRadius: '10px', textDecoration: 'none', fontWeight: 'bold' }}
                    >
                      Open PDF <FiExternalLink />
                    </a>
                  </div>
                ) : (
                  <div style={{ color: 'var(--text-main)', lineHeight: '1.6' }}>
                    {selectedQuestion?.solution?.content}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
