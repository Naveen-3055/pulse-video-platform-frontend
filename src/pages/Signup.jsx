import { useContext } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom"
import { userDataContext } from "../context/Usercontext";
import { API_URL } from "../config/env";
import axios from 'axios'

const Signup = ()=>{
    // step 1: initializa states for UI updates.
    const navigate = useNavigate();
    const [form,setForm] = useState({
        email:"",
        password:"",
        role:"viewer"
    })
   
    // step 2: error representation
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    

    // step 3: update the states.
    const handleChange = (e)=>{
        setForm({
            ...form,[e.target.name] : e.target.value
        });
    };
    
    // step 4: signup function
    const handleSignup = async (e)=>{
        e.preventDefault();

        // loading 
        setLoading(true);
        setError("");

        try {
          // calling api
            let response = await axios.post(`${API_URL}/api/auth/register`,
                form,
                {withCredentials:true}
            )
            console.log(response.data);
            navigate('/login')
        } catch (error) {
            setError(error.response?.data?.message || "Signup failed");
            console.log(error.message);
        }finally{
            setLoading(false)
        }
    }


    return(
    <div className="signup-container">
      <div className="signup-card">
        <h2>Create Account</h2>
        <p className="subtitle">Sign up to access Pulse Video Platform</p>

        <form onSubmit={handleSignup}>
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

          <div className="form-group">
            <label>Role</label>
            <select name="role" value={form.role} onChange={handleChange}>
              <option value="viewer">Viewer</option>
              <option value="editor">Editor</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          {error && <p className="error-text">{error}</p>}

          <button type="submit" disabled={loading}>
            {loading ? "Creating account..." : "Sign Up"}
          </button>
        </form>

        <p className="login-link">
          Already have an account? <span onClick={() => navigate("/login")}>Login</span>
        </p>
      </div>
    </div>
  );
};

export default Signup;