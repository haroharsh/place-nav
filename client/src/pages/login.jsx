import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import InteractiveDots from "../components/InteractiveDots";

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: ""
  });
  const [isLoading, setIsLoading] = useState(false);

  const isValidJUITEmail = (email) => {
    const regex = /^[2-9][0-9]*[a-zA-Z0-9._%+-]*@juitsolan\.in$/;
    return regex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isValidJUITEmail(form.email)) {
      alert("Use valid JUIT email (start >=2, @juitsolan.in)");
      return;
    }

    setIsLoading(true);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL || ""}/api/auth/login`,
        form
      );

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      navigate("/home");

    } catch (err) {
      alert(err.response?.data?.msg || "Error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: 'Inter', 'Poppins', sans-serif;
        }

        section {
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
          height: 100vh;
          overflow: hidden;
          background: transparent;
        }

        .login-card {
          position: relative;
          padding: 50px 40px;
          background: rgba(255, 255, 255, 0.08);
          backdrop-filter: blur(25px);
          -webkit-backdrop-filter: blur(25px);
          border-radius: 30px;
          border: 1px solid rgba(255, 255, 255, 0.15);
          width: 100%;
          max-width: 420px;
          display: flex;
          flex-direction: column;
          gap: 30px;
          box-shadow: 0 25px 50px rgba(0, 0, 0, 0.5);
          z-index: 10;
        }

        .login-card h2 {
          text-align: center;
          font-size: 2.2rem;
          font-weight: 700;
          color: #fff;
          letter-spacing: -0.5px;
        }

        .inputBox {
          position: relative;
          width: 100%;
        }

        .inputBox input {
          width: 100%;
          padding: 15px 20px;
          font-size: 1rem;
          border-radius: 15px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          background: rgba(255, 255, 255, 0.05);
          color: #fff;
          outline: none;
          transition: 0.3s;
          margin-bottom: 20px;
        }

        .inputBox input:focus {
          border-color: #fff;
          background: rgba(255, 255, 255, 0.1);
        }

        .inputBox input::placeholder {
          color: rgba(255, 255, 255, 0.4);
        }

        #btn {
          background: #fff;
          color: #000;
          font-weight: 600;
          cursor: pointer;
          border: none;
          transition: 0.3s;
          margin-top: 10px;
        }

        #btn:hover {
          background: rgba(255, 255, 255, 0.9);
          transform: translateY(-2px);
          box-shadow: 0 10px 20px rgba(255, 255, 255, 0.1);
        }

        #btn:active {
          transform: translateY(0);
        }

        #btn:disabled {
          background: rgba(255, 255, 255, 0.4);
          cursor: not-allowed;
          transform: none;
        }

        .spinner {
          width: 20px;
          height: 20px;
          border: 3px solid rgba(0,0,0,0.1);
          border-top: 3px solid #000;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
          display: inline-block;
          margin-right: 10px;
          vertical-align: middle;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .group {
          display: flex;
          justify-content: space-between;
          font-size: 0.9rem;
        }

        .group a {
          color: rgba(255, 255, 255, 0.6);
          text-decoration: none;
          transition: 0.3s;
        }

        .group a:hover {
          color: #fff;
        }
      `}</style>

      <section>
        <InteractiveDots />
        
        <div className="login-card">
          <h2>Login</h2>

          <form onSubmit={handleSubmit}>
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
              <button type="submit" id="btn" disabled={isLoading} style={{ width: '100%', padding: '15px', borderRadius: '15px' }}>
                {isLoading ? (
                  <>
                    <span className="spinner"></span>
                    Signing In...
                  </>
                ) : (
                  "Sign In"
                )}
              </button>
            </div>
          </form>

          <div className="group">
            <a href="#">Forgot Password?</a>
            <Link to="/signup">Create Account</Link>
          </div>
        </div>
      </section>
    </>
  );
}