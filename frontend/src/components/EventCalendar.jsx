import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Clock, MapPin } from 'lucide-react';
import './EventCalendar.css';

const MOCK_EVENTS = [
  { id: 1, date: 5, title: 'Local Farmers Market', time: '09:00 AM', location: 'City Square' },
  { id: 2, date: 12, title: 'Tech Meetup: Web Dev', time: '06:00 PM', location: 'Innovators Hub' },
  { id: 3, date: 15, title: 'Live Music Night', time: '08:00 PM', location: 'Jazz Lounge' },
  { id: 4, date: 22, title: 'Community Cleanup', time: '10:00 AM', location: 'Central Park' },
  { id: 5, date: 28, title: 'Yoga in the Park', time: '07:00 AM', location: 'West Garden' }
];

const EventCalendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date().getDate());
  const currentMonth = "April 2026";
  const daysInMonth = 30;
  const startDay = 3; // Wednesday (0=Sun, 1=Mon, ..., 3=Wed)

  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const padding = Array.from({ length: startDay }, (_, i) => null);

  const selectedEvent = MOCK_EVENTS.find(e => e.date === selectedDate);

  return (
    <div className="event-calendar-section glass-panel">
      <div className="calendar-header">
        <div className="calendar-title-wrapper">
          <CalendarIcon className="calendar-title-icon" size={24} />
          <h2>Community Events</h2>
        </div>
        <div className="calendar-nav">
          <button className="nav-btn"><ChevronLeft size={20} /></button>
          <span className="month-label">{currentMonth}</span>
          <button className="nav-btn"><ChevronRight size={20} /></button>
        </div>
      </div>

      <div className="calendar-grid-container">
        <div className="calendar-main">
          <div className="calendar-days-header">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
              <div key={d} className="day-name">{d}</div>
            ))}
          </div>
          <div className="calendar-days">
            {padding.map((_, i) => <div key={`p-${i}`} className="day empty"></div>)}
            {days.map(d => {
              const hasEvent = MOCK_EVENTS.some(e => e.date === d);
              return (
                <div 
                  key={d} 
                  className={`day ${selectedDate === d ? 'selected' : ''} ${hasEvent ? 'has-event' : ''}`}
                  onClick={() => setSelectedDate(d)}
                >
                  <span className="day-number">{d}</span>
                  {hasEvent && <div className="event-dot"></div>}
                </div>
              );
            })}
          </div>
        </div>

        <div className="calendar-sidebar">
          <h3>Events on {selectedDate} {currentMonth.split(' ')[0]}</h3>
          {selectedEvent ? (
            <div className="event-detail-card animate-in">
              <h4>{selectedEvent.title}</h4>
              <div className="event-meta">
                <div className="meta-item">
                  <Clock size={16} />
                  <span>{selectedEvent.time}</span>
                </div>
                <div className="meta-item">
                  <MapPin size={16} />
                  <span>{selectedEvent.location}</span>
                </div>
              </div>
              <button className="btn-secondary join-btn">RSVP Now</button>
            </div>
          ) : (
            <div className="no-events">
              <p>No events scheduled for this day.</p>
              <button className="btn-outline create-event-btn">Host an Event</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventCalendar;
