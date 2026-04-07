import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function Signup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });
  
  const navigate = useNavigate();

  const isValidJUITEmail = (email) => {
    const regex = /^[2-9][0-9]*[a-zA-Z0-9._%+-]*@juitsolan\.in$/;
    return regex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isValidJUITEmail(form.email)) {
      alert("Use valid JUIT email (start ≥2, @juitsolan.in)");
      return;
    }

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL || ""}/api/auth/register`,
        form
      );

      alert(res.data.msg);
      navigate("/"); // Redirect to login

    } catch (err) {
      alert(err.response?.data?.msg || "Error");
    }
  };

  return (
    <>
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: "Poppins", sans-serif;
        }

        section {
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
          height: 100vh;
          overflow: hidden;
        }

        .bg, .trees {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          pointer-events: none;
        }

        .trees {
          z-index: 100;
        }

        .girl {
          position: absolute;
          scale: 0.65;
          animation: animateGirl 10s linear infinite;
        }

        @keyframes animateGirl {
          0% { transform: translateX(100vw); }
          50% { transform: translateX(-100vw); }
          100% { transform: translateX(100vw) rotateY(180deg); }
        }

        .login {
          position: relative;
          padding: 60px;
          background: rgba(255,255,255,0.25);
          backdrop-filter: blur(15px);
          border-radius: 20px;
          width: 400px;
          display: flex;
          flex-direction: column;
          gap: 20px;
          box-shadow: 0 25px 50px rgba(0,0,0,0.1);
        }

        .login h2 {
          text-align: center;
          font-size: 2em;
          color: #8f2c24;
        }

        .inputBox input {
          width: 100%;
          padding: 12px;
          font-size: 1em;
          border-radius: 5px;
          border: none;
          margin-bottom: 10px;
        }

        #btn {
          background: #8f2c24;
          color: #fff;
          cursor: pointer;
          transition: 0.3s;
        }

        #btn:hover {
          background: #d64c42;
        }

        .group {
          display: flex;
          justify-content: space-between;
        }

        .group a {
          color: #8f2c24;
          text-decoration: none;
        }

        .leaves .set div {
          position: absolute;
          animation: fall 10s linear infinite;
        }

        @keyframes fall {
          0% { top: -10%; opacity: 0; }
          100% { top: 110%; opacity: 1; }
        }
      `}</style>

      <section>
        <div className="leaves">
          <div className="set">
            {[...Array(8)].map((_, i) => (
              <div key={i} style={{ left: `${i * 10}%` }}>
                <img
                  src={`/images/leaf_0${(i % 4) + 1}.png`}
                  alt=""
                  width="50"
                />
              </div>
            ))}
          </div>
        </div>

        <img src="/images/bg.jpg" className="bg" alt="" />
        <img src="/images/girl.png" className="girl" alt="" />
        <img src="/images/trees.png" className="trees" alt="" />

        <div className="login">
          <h2>Sign Up</h2>

          <form onSubmit={handleSubmit}>
            <div className="inputBox">
              <input
                type="text"
                placeholder="Full Name"
                value={form.name}
                onChange={(e) =>
                  setForm({ ...form, name: e.target.value })
                }
                required
              />
            </div>
          
            <div className="inputBox">
              <input
                type="text"
                placeholder="College Email"
                value={form.email}
                onChange={(e) =>
                  setForm({ ...form, email: e.target.value })
                }
                required
              />
            </div>

            <div className="inputBox">
              <input
                type="password"
                placeholder="Password"
                value={form.password}
                onChange={(e) =>
                  setForm({ ...form, password: e.target.value })
                }
                required
              />
            </div>

            <div className="inputBox">
              <input type="submit" value="Register" id="btn" />
            </div>
          </form>

          <div className="group">
            <Link to="/">Already have an account? Login</Link>
          </div>
        </div>
      </section>
    </>
  );
}
