import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
} from "lucide-react";

import AuthLayout from "../components/AuthLayout";

function Signup() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSignup(e) {
    e.preventDefault();

    try {
      const res = await fetch(
       `${import.meta.env.VITE_API_URL}/auth/signup`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        alert(data.message);
        return;
      }

      alert("Account created successfully!");

      navigate("/login");
    } catch (err) {
      console.error(err);
      alert("Server Error");
    }
  }

  return (
    <AuthLayout>
      <div className="auth-card">

        <h1>Create Account</h1>

        <p>Start tracking your internships today.</p>

        <form onSubmit={handleSignup}>

          <div className="input-group">

            <label>Name</label>

            <div className="input-icon">

              <User size={18} />

              <input
                type="text"
                name="name"
                placeholder="Your name"
                value={form.name}
                onChange={handleChange}
                required
              />

            </div>

          </div>

          <div className="input-group">

            <label>Email</label>

            <div className="input-icon">

              <Mail size={18} />

              <input
                type="email"
                name="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={handleChange}
                required
              />

            </div>

          </div>

          <div className="input-group">

            <label>Password</label>

            <div className="input-icon">

              <Lock size={18} />

              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                required
              />

              <button
                type="button"
                className="eye-btn"
                onClick={() =>
                  setShowPassword(!showPassword)
                }
              >
                {showPassword ? (
                  <EyeOff size={18} />
                ) : (
                  <Eye size={18} />
                )}
              </button>

            </div>

          </div>

          <button className="auth-btn">
            Create Account
          </button>

        </form>

        <div className="bottom-text">
          Already have an account?{" "}
          <Link to="/login">
            Login
          </Link>
        </div>

      </div>
    </AuthLayout>
  );
}

export default Signup;