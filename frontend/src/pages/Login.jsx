import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

export const Login = () => {
  const [state, setState] = useState('sign up');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  
  const { backendUrl, token, setToken } = useContext(AppContext);
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    
    if (!email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Email is invalid';
    
    if (!password) newErrors.password = 'Password is required';
    else if (password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    
    if (state === 'sign up' && !name) newErrors.name = 'Name is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);
    
    try {
      let url, payload;
      
      if (state === 'sign up') {
        url = `${backendUrl}api/user/register`;
        payload = { name, email, password };
      } else {
        url = `${backendUrl}api/user/login`;
        payload = { email, password };
      }
      
      const { data } = await axios.post(url, payload);
      
      if (data.success) {
        localStorage.setItem("token", data.token);
        setToken(data.token);
        toast.success(data.message || (state === 'sign up' ? 'Account created successfully!' : 'Login successful!'));
        navigate(state === 'sign up' ? '/' : '/doctors');
      } else {
        toast.error(data.message || 'Something went wrong');
      }
    } catch (error) {
      const message = error.response?.data?.message || 'Network error. Please try again.';
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token, navigate]);

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-header">
            <h1>{state === 'sign up' ? 'Create Account' : 'Welcome Back'}</h1>
            <p>Please {state === 'sign up' ? 'create your account' : 'sign in'} to continue</p>
          </div>

          <form onSubmit={handleSubmit} className="auth-form">
            {state === 'sign up' && (
              <div className="form-group">
                <label>Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={errors.name ? 'error' : ''}
                  placeholder="Enter your full name"
                  disabled={loading}
                />
                {errors.name && <span className="error-message">{errors.name}</span>}
              </div>
            )}
            
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={errors.email ? 'error' : ''}
                placeholder="Enter your email"
                disabled={loading}
              />
              {errors.email && <span className="error-message">{errors.email}</span>}
            </div>
            
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={errors.password ? 'error' : ''}
                placeholder="Enter your password"
                disabled={loading}
              />
              {errors.password && <span className="error-message">{errors.password}</span>}
            </div>

            <button 
              type="submit" 
              className="submit-btn"
              disabled={loading || Object.keys(errors).length > 0}
            >
              {loading ? (
                <>
                  <span className="spinner"></span>
                  {state === 'sign up' ? 'Creating Account...' : 'Signing In...'}
                </>
              ) : (
                state === 'sign up' ? 'Create Account' : 'Sign In'
              )}
            </button>
          </form>

          <div className="auth-footer">
            {state === 'sign up' ? (
              <p>
                Already have an account?{' '}
                <button 
                  type="button"
                  className="auth-link"
                  onClick={() => setState('login')}
                  disabled={loading}
                >
                  Sign in here
                </button>
              </p>
            ) : (
              <p>
                Don't have an account?{' '}
                <button 
                  type="button"
                  className="auth-link"
                  onClick={() => setState('sign up')}
                  disabled={loading}
                >
                  Create one now
                </button>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
