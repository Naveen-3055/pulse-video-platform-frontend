import React from 'react'
import { useContext } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { userDataContext } from '../context/Usercontext';
import axios from 'axios';
import { API_URL } from '../config/env';

function Login() {
    const navigate = useNavigate();
    const [form,setForm] = useState({
        email:"",
        password:""
    })

    // step 1: error representation.
    const [error,setError] = useState('')
    const [loading, setLoading] = useState(false);
    const {setUser,fetchUser} = useContext(userDataContext)

    // step 2: update the form
    const handleChange = (e)=>{
        setForm(
            {...form,[e.target.name] : e.target.value}
        )
    }

    // step 3: login function
    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true); // start loading

      try {
        // calling API
        const response = await axios.post(`${API_URL}/api/auth/login`, form, { withCredentials: true });

       setUser(response.data.User)
        
        navigate('/dashboard'); // redirect
      } catch (error) {
        setError(error.response?.data?.message || "Login failed");
      } finally {
        setLoading(false); // stop loading
      }
};

// UI
  return (
    <div className="signup-container">
      <div className="signup-card">
        <h2>Login</h2>
        <p className="subtitle">welcome Pulse Video Platform</p>

        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Minimum 6 characters"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>

          {error && <p className="error-text">{error}</p>}

          <button type="submit" disabled={loading}>
            {loading ? "Creating account..." : "Login"}
          </button>
        </form>

        <p className="login-link">
          Don't you have an account? <span onClick={() => navigate("/signup")}>Register</span>
        </p>
      </div>
    </div>
  );
  
}

export default Login
