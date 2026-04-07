import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

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
    <>
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: "Poppins", sans-serif;
        }

        .companies-section {
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
          align-items: center;
          gap: 40px;
          padding: 60px 40px;
          width: 100%;
          max-width: 1200px;
        }

        .header {
          text-align: center;
          animation: fadeInDown 1s ease-out;
        }

        @keyframes fadeInDown {
          from { opacity: 0; transform: translateY(-30px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .header h1 {
          font-size: 3.5em;
          color: #fff;
          text-shadow: 2px 2px 15px rgba(0,0,0,0.6);
          margin-bottom: 15px;
          font-weight: 700;
        }
        
        .grid-container {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 30px;
          width: 100%;
          animation: fadeInUp 1s ease-out 0.3s backwards;
        }

        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .company-card {
          background: rgba(255, 255, 255, 0.15);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-radius: 20px;
          padding: 30px;
          display: flex;
          flex-direction: column;
          gap: 15px;
          box-shadow: 0 15px 35px rgba(0,0,0,0.2);
          border: 1px solid rgba(255,255,255,0.25);
          transition: all 0.4s ease;
          text-decoration: none;
        }

        .company-card:hover {
          transform: translateY(-10px);
          background: rgba(255, 255, 255, 0.25);
          box-shadow: 0 25px 50px rgba(0,0,0,0.3);
          border: 1px solid rgba(255,255,255,0.5);
        }

        .company-name {
          font-size: 1.5em;
          color: #fff;
          font-weight: 600;
          text-shadow: 1px 1px 8px rgba(0,0,0,0.4);
        }

        .company-industry {
          color: #f1f1f1;
          font-size: 0.9em;
          text-transform: uppercase;
          letter-spacing: 1px;
          font-weight: 500;
        }

        .company-stats {
          display: flex;
          justify-content: space-between;
          margin-top: 10px;
          padding-top: 15px;
          border-top: 1px solid rgba(255,255,255,0.2);
        }

        .stat {
          display: flex;
          flex-direction: column;
        }

        .stat span:first-child {
          font-size: 0.8em;
          color: #ddd;
        }

        .stat span:last-child {
          font-size: 1.2em;
          color: #fff;
          font-weight: 600;
        }

        .loader {
          color: white;
          font-size: 1.5em;
          margin-top: 50px;
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
      `}</style>

      <section className="companies-section">
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
          <Link to="/home" className="back-link">
            <span>←</span> Back to Home
          </Link>
          
          <div className="header">
            <h1>Participating Companies</h1>
          </div>

          {loading ? (
            <div className="loader">Loading companies...</div>
          ) : (
            <div className="grid-container">
              {companies.map((company) => (
                <Link to={`/company/${company._id}`} key={company._id} className="company-card">
                  <div className="company-industry">{company.industry || "Technology"}</div>
                  <div className="company-name">{company.name}</div>
                  
                  <div className="company-stats">
                    <div className="stat">
                      <span>Avg Package</span>
                      <span>{company.averagePackage ? `${company.averagePackage} LPA` : "N/A"}</span>
                    </div>
                    <div className="stat">
                      <span>Students Placed</span>
                      <span>{company.noOfStudentsPlaced || "0"}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
