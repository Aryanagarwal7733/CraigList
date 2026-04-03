import React, { useState, useContext } from 'react';
import ReactDOM from 'react-dom';
import { AuthContext } from '../context/AuthContext';
import { X } from 'lucide-react';
import './AuthModal.css';

const AuthModal = ({ isOpen, onClose }) => {
  const { login, register, loading, error } = useContext(AuthContext);
  const [isLoginView, setIsLoginView] = useState(true);
  
  const [name, setName] = useState('');
  const [loginId, setLoginId] = useState('');
  const [password, setPassword] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    let success = false;
    if (isLoginView) {
      success = await login(loginId, password);
    } else {
      success = await register(name, loginId, password);
    }
    
    if (success) onClose();
  };

  return ReactDOM.createPortal(
    <div className="modal-overlay">
      <div className="modal-content glass-panel animate-in">
        <button className="close-btn" onClick={onClose}><X size={20} /></button>
        <h2 className="modal-title">{isLoginView ? 'Welcome back' : 'Create an account'}</h2>
        <p className="modal-subtitle">
          {isLoginView ? 'Enter your details to access your account.' : 'Join the modern community marketplace.'}
        </p>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          {!isLoginView && (
            <div className="input-group">
              <label>Full Name</label>
              <input 
                type="text" 
                value={name} 
                onChange={e => setName(e.target.value)} 
                required 
                placeholder="John Doe"
              />
            </div>
          )}
          <div className="input-group">
            <label>Email or Phone Number</label>
            <input 
              type="text" 
              value={loginId} 
              onChange={e => setLoginId(e.target.value)} 
              required 
              placeholder="name@example.com or +1234567890"
            />
          </div>
          <div className="input-group">
            <label>Password</label>
            <input 
              type="password" 
              value={password} 
              onChange={e => setPassword(e.target.value)} 
              required 
              placeholder="••••••••"
            />
          </div>
          
          <button type="submit" className="btn-primary auth-submit" disabled={loading}>
            {loading ? 'Processing...' : (isLoginView ? 'Sign In' : 'Sign Up')}
          </button>
        </form>

        <div className="auth-switch">
          {isLoginView ? "Don't have an account? " : "Already have an account? "}
          <span className="auth-switch-link" onClick={() => setIsLoginView(!isLoginView)}>
            {isLoginView ? 'Sign up' : 'Log in'}
          </span>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default AuthModal;
