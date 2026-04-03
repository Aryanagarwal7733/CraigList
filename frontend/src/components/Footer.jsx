import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Link as LinkIcon, Globe, Info } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        <div className="footer-section">
          <h3 className="footer-logo">CL<span className="brand-accent">modern</span></h3>
          <p className="footer-description">
            A modern approach to community classifieds. Simple, secure, and fast.
          </p>
          <div className="footer-socials">
            <a href="#"><Globe size={20} /></a>
            <a href="#"><LinkIcon size={20} /></a>
            <a href="#"><Info size={20} /></a>
            <a href="#"><Mail size={20} /></a>
          </div>
        </div>

        <div className="footer-section">
          <h4>Platform</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/search">Search Listings</Link></li>
            <li><Link to="/post-ad">Post an Ad</Link></li>
            <li><a href="#">Categories</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Support</h4>
          <ul>
            <li><a href="#">Help Center</a></li>
            <li><a href="#">Safety Tips</a></li>
            <li><a href="#">Terms of Use</a></li>
            <li><a href="#">Privacy Policy</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Company</h4>
          <ul>
            <li><a href="#">About Us</a></li>
            <li><a href="#">Careers</a></li>
            <li><a href="#">Contact</a></li>
            <li><a href="#">Blog</a></li>
          </ul>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} CL Modern Inc. All rights reserved.</p>
        <div className="footer-links">
          <a href="#">Privacy</a>
          <a href="#">Terms</a>
          <a href="#">Cookies</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
