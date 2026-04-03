import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { Filter, Star, Image as ImageIcon } from 'lucide-react';
import './Search.css';

const Search = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const categoryStr = searchParams.get('category') || 'All Categories';

  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const observer = useRef();

  // Mocking an API call for infinite scroll
  const fetchListings = async (pageNum) => {
    setLoading(true);
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const newItems = Array.from({ length: 10 }).map((_, i) => ({
      id: `${pageNum}-${i}`,
      title: `Premium ${categoryStr} Listing ${pageNum}-${i}`,
      price: Math.floor(Math.random() * 1000) + 50,
      image: `https://picsum.photos/seed/${pageNum*10+i}/400/300`, // Using dummy images directly for CDN feeling
      sellerRating: (Math.random() * 2 + 3).toFixed(1),
      verified: Math.random() > 0.5,
      location: 'Jaipur, Rajasthan'
    }));

    setListings(prev => [...prev, ...newItems]);
    setHasMore(pageNum < 4); // Mock stopping after 4 pages
    setLoading(false);
  };

  useEffect(() => {
    setListings([]);
    setPage(1);
    setHasMore(true);
    fetchListings(1);
  }, [categoryStr]);

  // Infinite Scroll Observer Setup
  const lastElementRef = useCallback(node => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        const next = page + 1;
        setPage(next);
        fetchListings(next);
      }
    });
    
    if (node) observer.current.observe(node);
  }, [loading, hasMore]);

  return (
    <div className="search-layout animate-in">
      <aside className="search-filters glass-panel">
        <div className="filter-header">
          <h3>Filters</h3>
          <Filter size={18} />
        </div>
        <div className="filter-section">
          <h4>Category</h4>
          <p className="active-category">{categoryStr}</p>
        </div>
        <div className="filter-section">
          <h4>Price Range</h4>
          <input type="range" className="price-slider" />
        </div>
        <div className="filter-section">
          <h4>Trust & Safety</h4>
          <label style={{display: 'block', marginBottom: '8px'}}><input type="checkbox" /> Verified Sellers Only</label>
          <label style={{display: 'block'}}><input type="checkbox" /> 4+ Star Ratings</label>
        </div>
      </aside>
      
      <div className="search-results">
        <h2 className="results-title">Showing results for: {categoryStr}</h2>
        <div className="listings-grid">
          {listings.map((item, index) => {
            const isLast = listings.length === index + 1;
            return (
              <div ref={isLast ? lastElementRef : null} key={item.id} className="card listing-card">
                <div className="listing-image-wrapper">
                  <img src={item.image} alt={item.title} className="listing-image" loading="lazy" />
                  {item.verified && <span className="verified-badge">Verified Hub</span>}
                </div>
                <div className="listing-content">
                  <div className="listing-price">${item.price}</div>
                  <h3 className="listing-title">{item.title}</h3>
                  <p className="listing-location">{item.location}</p>
                  <div className="listing-meta">
                    <span className="rating"><Star size={14} className="star-icon" /> {item.sellerRating}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        {loading && <div className="loading-spinner">Loading more listings...</div>}
        {!hasMore && !loading && <div className="end-msg">You've reached the end of the results.</div>}
      </div>
    </div>
  );
};

export default Search;
