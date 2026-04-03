import React from 'react';
import { Home as HomeIcon, Briefcase, Car, Users, ShoppingCart, HeartHandshake } from 'lucide-react';
import EventCalendar from '../components/EventCalendar';
import './Home.css';

const MOCK_CATEGORIES = [
  { id: 1, name: 'Community', icon: <Users size={24} />, sub: ['activities', 'artists', 'childcare', 'groups', 'events'] },
  { id: 2, name: 'Housing', icon: <HomeIcon size={24} />, sub: ['apts / housing', 'rooms / shared', 'sublets / temporary', 'office / commercial'] },
  { id: 3, name: 'Jobs', icon: <Briefcase size={24} />, sub: ['accounting', 'admin / office', 'customer service', 'software / QA', 'design / web'] },
  { id: 4, name: 'For Sale', icon: <ShoppingCart size={24} />, sub: ['antiques', 'appliances', 'electronics', 'furniture', 'tickets', 'cars+trucks'] },
  { id: 5, name: 'Services', icon: <HeartHandshake size={24} />, sub: ['automotive', 'beauty', 'computer', 'creative', 'financial'] },
  { id: 6, name: 'Vehicles', icon: <Car size={24} />, sub: ['cars', 'parts', 'motorcycles', 'boats', 'rvs'] }
];

const Home = () => {
  return (
    <div className="home-container animate-in">
      <header className="home-hero">
        <h1 className="hero-title">Find what you need locally.</h1>
        <p className="hero-subtitle">The modern marketplace for your community.</p>
      </header>

      <div className="category-grid">
        {MOCK_CATEGORIES.map(cat => (
          <div key={cat.id} className="card category-card">
            {/* Category content */}
            <div className="category-header">
              <div className="category-icon-wrapper">{cat.icon}</div>
              <h2>{cat.name}</h2>
            </div>
            <ul className="subcategory-list">
              {cat.sub.map((sub, i) => (
                <li key={i}><a href={`/search?category=${sub}`} className="subcategory-link">{sub}</a></li>
              ))}
            </ul>
            <a href={`/search?category=${cat.name}`} className="view-all-link">View all {cat.name} →</a>
          </div>
        ))}
      </div>

      <EventCalendar />
    </div>
  );
};

export default Home;
