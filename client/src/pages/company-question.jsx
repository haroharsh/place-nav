import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function CompanyQuestion() {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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

  return (
    <>
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: "Poppins", sans-serif;
        }

        .questions-section {
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
          margin-bottom: 10px;
          font-weight: 700;
        }

        .header p {
          color: #f1f1f1;
          font-size: 1.1em;
          text-shadow: 1px 1px 5px rgba(0,0,0,0.5);
        }

        .questions-list {
          display: flex;
          flex-direction: column;
          gap: 20px;
          width: 100%;
          animation: fadeInUp 1s ease-out 0.3s backwards;
        }

        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .question-card {
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
          position: relative;
        }

        .question-card:hover {
          background: rgba(255, 255, 255, 0.25);
          box-shadow: 0 25px 50px rgba(0,0,0,0.3);
          transform: translateY(-5px);
        }

        .q-meta {
          display: flex;
          flex-wrap: wrap;
          gap: 15px;
          font-size: 0.9em;
          color: #ccc;
          align-items: center;
        }

        .q-tag {
          background: rgba(0,0,0,0.3);
          padding: 6px 15px;
          border-radius: 20px;
          color: #fff;
          font-weight: 500;
          letter-spacing: 0.5px;
        }

        .q-tag.company-count {
          background: #8f2c24;
          box-shadow: 0 4px 10px rgba(143, 44, 36, 0.4);
        }

        .q-text {
          font-size: 1.3em;
          color: #fff;
          font-weight: 500;
          line-height: 1.5;
          text-shadow: 1px 1px 3px rgba(0,0,0,0.3);
        }

        .loader {
          color: white;
          font-size: 1.5em;
          margin-top: 50px;
        }
      `}</style>

      <section className="questions-section">
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
            <h1>Interview Questions Hub</h1>
            <p>Browse through hundreds of authentic technical and HR queries asked by top recruiters.</p>
          </div>

          {loading ? (
            <div className="loader">Loading all question data...</div>
          ) : (
            <div className="questions-list">
              {questions.map((q) => (
                <div key={q._id} className="question-card">
                  <div className="q-meta">
                    <span className="q-tag">{q.type}</span>
                    <span className="q-tag">{q.difficulty}</span>
                    <span className="q-tag">{q.role}</span>
                    <span className="q-tag company-count">
                      🏢 Asked by {q.companies ? q.companies.length : 0} {q.companies && q.companies.length === 1 ? 'Company' : 'Companies'}
                    </span>
                  </div>
                  <div className="q-text">{q.text}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
