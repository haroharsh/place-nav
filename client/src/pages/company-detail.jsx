import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

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

  return (
    <>
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: "Poppins", sans-serif;
        }

        .detail-section {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 100%;
          min-height: 100vh;
          overflow-x: hidden;
          padding-bottom: 50px;
        }

        .bg, .trees {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100vh;
          object-fit: cover;
          pointer-events: none;
        }

        .trees {
          z-index: 100;
        }

        .leaves {
          position: fixed;
          top: 0; left: 0; width: 100%; height: 100vh;
          z-index: 90; pointer-events: none;
        }

        .leaves .set div {
          position: absolute;
          animation: fall 10s linear infinite;
        }

        @keyframes fall {
          0% { top: -10%; opacity: 0; }
          100% { top: 110%; opacity: 1; }
        }

        .content-wrapper {
          position: relative;
          z-index: 150;
          display: flex;
          flex-direction: column;
          gap: 40px;
          padding: 60px 40px;
          width: 100%;
          max-width: 1000px;
        }

        .back-link {
          align-self: flex-start;
          color: #f1f1f1;
          text-decoration: none;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 10px;
          background: rgba(143, 44, 36, 0.8);
          padding: 10px 20px;
          border-radius: 30px;
          transition: 0.3s;
        }

        .back-link:hover {
          background: #d64c42;
          transform: translateX(-5px);
        }

        .glass-panel {
          background: rgba(255, 255, 255, 0.15);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-radius: 25px;
          padding: 40px;
          box-shadow: 0 15px 35px rgba(0,0,0,0.2);
          border: 1px solid rgba(255,255,255,0.25);
          color: white;
          animation: fadeInUp 1s ease-out backwards;
        }

        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .company-header {
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin-bottom: 30px;
          border-bottom: 2px solid rgba(255,255,255,0.2);
          padding-bottom: 20px;
        }

        .company-name {
          font-size: 3em;
          font-weight: 700;
          text-shadow: 2px 2px 10px rgba(0,0,0,0.5);
        }

        .company-desc {
          font-size: 1.1em;
          color: #eee;
          line-height: 1.6;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 20px;
          margin-bottom: 40px;
        }

        .stat-box {
          background: rgba(143, 44, 36, 0.4);
          padding: 20px;
          border-radius: 15px;
          text-align: center;
          border: 1px solid rgba(255,255,255,0.1);
          transition: 0.3s;
        }

        .stat-box:hover {
          background: rgba(214, 76, 66, 0.5);
          transform: translateY(-5px);
        }

        .stat-title {
          font-size: 0.9em;
          color: #ddd;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-bottom: 5px;
        }

        .stat-value {
          font-size: 1.8em;
          font-weight: 700;
        }

        .section-title {
          font-size: 2em;
          margin-bottom: 20px;
          text-shadow: 1px 1px 5px rgba(0,0,0,0.4);
        }

        .questions-list {
          display: flex;
          flex-direction: column;
          gap: 15px;
        }

        .question-item {
          background: rgba(255, 255, 255, 0.1);
          padding: 20px;
          border-radius: 15px;
          border-left: 5px solid #d64c42;
          transition: 0.3s;
        }

        .question-item:hover {
          background: rgba(255, 255, 255, 0.2);
        }

        .q-meta {
          display: flex;
          gap: 15px;
          margin-bottom: 10px;
          font-size: 0.85em;
          color: #ccc;
        }
        
        .q-tag {
          background: rgba(0,0,0,0.3);
          padding: 4px 10px;
          border-radius: 12px;
        }

        .q-text {
          font-size: 1.1em;
          color: #fff;
          font-weight: 500;
        }

        .loader {
          color: white;
          font-size: 1.5em;
          margin-top: 50px;
          text-align: center;
        }
      `}</style>

      <section className="detail-section">
        <div className="leaves">
          <div className="set">
            {[...Array(12)].map((_, i) => (
              <div key={i} style={{ 
                left: `${i * 8.5}%`, 
                animationDuration: `${8 + (i % 5)}s`,
                animationDelay: `${(i % 4)}s` 
              }}>
                <img src={`/images/leaf_0${(i % 4) + 1}.png`} alt="" width={30 + (i % 3) * 12} />
              </div>
            ))}
          </div>
        </div>

        <img src="/images/bg.jpg" className="bg" alt="" />
        <img src="/images/trees.png" className="trees" alt="" />

        <div className="content-wrapper">
          <Link to="/company" className="back-link">
            <span>←</span> Back to Companies
          </Link>

          {loading ? (
            <div className="loader">Loading details...</div>
          ) : company ? (
            <div className="glass-panel">
              <div className="company-header">
                <h1 className="company-name">{company.name}</h1>
                <p className="company-desc">{company.description || "A top recruiter at JUIT providing excellent opportunities to fresh graduates."}</p>
              </div>

              <div className="stats-grid">
                <div className="stat-box">
                  <div className="stat-title">Industry</div>
                  <div className="stat-value">{company.industry || "Tech"}</div>
                </div>
                <div className="stat-box">
                  <div className="stat-title">Avg Package</div>
                  <div className="stat-value">{company.averagePackage ? `${company.averagePackage} LPA` : "N/A"}</div>
                </div>
                <div className="stat-box">
                  <div className="stat-title">Students Placed</div>
                  <div className="stat-value">{company.noOfStudentsPlaced || "0"}</div>
                </div>
                {company.allOffers && company.allOffers.length > 0 && (
                  <div className="stat-box" style={{ gridColumn: "1 / -1" }}>
                    <div className="stat-title">All Offers (LPA)</div>
                    <div className="stat-value" style={{ fontSize: "1.3em" }}>
                      {company.allOffers.join(", ")}
                    </div>
                  </div>
                )}
              </div>

              <h2 className="section-title">Interview Questions</h2>
              
              {company.questions && company.questions.length > 0 ? (
                <div className="questions-list">
                  {company.questions.map((q) => (
                    <div key={q._id} className="question-item">
                      <div className="q-meta">
                        <span className="q-tag">{q.type}</span>
                        <span className="q-tag">{q.difficulty}</span>
                        <span className="q-tag">{q.role}</span>
                      </div>
                      <div className="q-text">{q.text}</div>
                    </div>
                  ))}
                </div>
              ) : (
                <p style={{ color: "#ccc", fontStyle: "italic" }}>No interview questions recorded yet for this company.</p>
              )}
            </div>
          ) : (
            <div className="loader">Company not found.</div>
          )}
        </div>
      </section>
    </>
  );
}
