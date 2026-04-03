import React, { useState, useRef, useEffect, useContext } from 'react';
import { Search, MapPin, PlusCircle, User, ChevronDown, LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import AuthModal from './AuthModal';
import './Navbar.css';

const LOCATIONS = ['Jaipur, IN', 'Delhi, IN', 'Mumbai, IN', 'Bangalore, IN', 'Pune, IN', 'Remote'];

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [location, setLocation] = useState('Jaipur, IN');
  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const locationRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (locationRef.current && !locationRef.current.contains(event.target)) {
        setIsLocationOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className="glass-header navbar">
      <div className="navbar-container">
        <Link to="/" className="brand-logo">
          CL<span className="brand-accent">modern</span>
        </Link>
        <div className="search-bar-container">
          <div className="location-picker-wrapper" ref={locationRef}>
            <div 
              className="location-selector" 
              onClick={() => setIsLocationOpen(!isLocationOpen)}
            >
              <MapPin size={18} className="search-icon" />
              <span className="location-text">{location}</span>
              <ChevronDown size={14} className="chevron-icon" />
            </div>
            
            {isLocationOpen && (
              <div className="location-dropdown animate-fade-in">
                <div className="dropdown-header">Choose Location</div>
                <ul className="location-list">
                  {LOCATIONS.map(loc => (
                    <li 
                      key={loc} 
                      className={location === loc ? 'active' : ''}
                      onClick={() => {
                        setLocation(loc);
                        setIsLocationOpen(false);
                      }}
                    >
                      {loc}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          
          <div className="search-divider"></div>
          <Search size={18} className="search-icon" />
          <input type="text" placeholder="Search jobs, housing, for sale..." className="search-input" />
        </div>
        <div className="nav-actions">
          {user ? (
            <div className="user-profile" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <span className="user-greeting" style={{ fontSize: '0.9rem', fontWeight: '500' }}>Hi, {user.name}</span>
              <button className="nav-icon-btn" onClick={logout} title="Logout">
                <LogOut size={22} />
              </button>
            </div>
          ) : (
            <button className="nav-icon-btn" onClick={() => setIsAuthModalOpen(true)} title="Login / Register">
              <User size={22} />
            </button>
          )}
          <Link to="/post-ad" className="btn-primary flex-center" style={{ textDecoration: 'none' }}>
            <PlusCircle size={18} style={{ marginRight: '8px' }} />
            Post Ad
          </Link>
        </div>
        <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
      </div>
    </nav>
  );
};

export default Navbar;
