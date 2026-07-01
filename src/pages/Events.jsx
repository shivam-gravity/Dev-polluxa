import { useState, useEffect } from 'react';
import { ArrowRight, MapPin, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import { fetchAPI } from '../lib/api';
import { useSeoEffect } from '../lib/seo';

const Events = () => {
  const [upcoming, setUpcoming] = useState([]);
  const [past, setPast] = useState([]);

  useSeoEffect(
    { metaTitle: 'Events — Polluxa', metaDescription: 'Stay updated with our latest events — conferences, summits and exhibitions across India, the Middle East, Southeast Asia, Australia, and beyond.' },
    'Events — Polluxa'
  );

  useEffect(() => {
    async function loadEvents() {
      try {
        const response = await fetchAPI('/api/events', {
          populate: '*',
          sort: 'StartDate:asc',
        });
        if (response && response.data && response.data.length > 0) {
          const now = new Date();
          const apiUpcoming = [];
          const apiPast = [];

          response.data.forEach(item => {
            const startDate = new Date(item.attributes.StartDate);
            const endDate = new Date(item.attributes.EndDate);
            
            // Format dates
            const startStr = startDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
            const endStr = endDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
            const dateStr = startStr === endStr ? startStr : `${startDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}–${endDate.getDate()}, ${endDate.getFullYear()}`;

            const eventObj = {
              name: item.attributes.title,
              date: dateStr,
              location: item.attributes.location,
              type: 'Event',
              desc: item.attributes.description,
              slug: item.attributes.slug,
              badge: null
            };

            if (endDate >= now || startDate >= now) {
              apiUpcoming.push(eventObj);
            } else {
              apiPast.push(eventObj);
            }
          });
          
          if (apiUpcoming.length > 0) setUpcoming(apiUpcoming);
          if (apiPast.length > 0) setPast(apiPast.reverse()); // latest past events first
        }
      } catch (error) {
        console.error('Failed to load events', error);
      }
    }
    loadEvents();
  }, []);

  return (
  <div className="events-page">
    <section className="section section-light" style={{ paddingBottom: '4rem' }}>
      <div className="container" style={{ maxWidth: '800px', textAlign: 'center' }}>
        <span style={{ textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: '600', color: 'var(--accent-color)' }}>Events</span>
        <h1 style={{ fontSize: '3.75rem', fontWeight: '800', lineHeight: '1.1', marginTop: '0.5rem' }}>
          Stay Updated with Our <em>Latest Events.</em>
        </h1>
        <p style={{ fontSize: '1.25rem', marginTop: '1.5rem', color: 'var(--muted)', lineHeight: '1.6' }}>
          Conferences, summits and exhibitions across India, the Middle East, Southeast Asia, Australia, and beyond.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '2.5rem', flexWrap: 'wrap' }}>
          <Link to="/contact" className="btn btn-primary" style={{ padding: '1rem 2rem', fontSize: '1.125rem' }}>
            Contact us <ArrowRight size={18} className="btn-icon" />
          </Link>
        </div>
      </div>
    </section>

    <section className="section section-alt">
      <div className="container">
        <div style={{ marginBottom: '3rem' }}>
          <span style={{ textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: '600', color: 'var(--accent-color)', fontSize: '0.875rem' }}>Upcoming Events</span>
          <h2 style={{ marginTop: '0.5rem' }}>Where we'll be <em>next.</em></h2>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {upcoming.map(({ name, date, location, type, desc, badge }) => (
            <div key={name} style={{ background: 'var(--panel)', border: badge ? '1px solid var(--cyan)' : '1px solid var(--line-strong)', borderRadius: '1rem', padding: '2rem', position: 'relative' }}>
              {badge && (
                <span style={{ position: 'absolute', top: '-12px', left: '2rem', background: 'var(--cyan)', color: '#fff', padding: '0.2rem 0.75rem', borderRadius: '999px', fontSize: '0.75rem', fontWeight: 'bold' }}>{badge}</span>
              )}
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: '2rem', flexWrap: 'wrap' }}>
                <div style={{ flex: 1, minWidth: '280px' }}>
                  <span style={{ fontSize: '0.8rem', color: 'var(--accent-color)', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{type}</span>
                  <h3 style={{ fontSize: '1.375rem', marginTop: '0.25rem', marginBottom: '0.75rem' }}>{name}</h3>
                  <p style={{ fontSize: '0.95rem', color: 'var(--muted)', lineHeight: '1.6', marginBottom: '1.25rem' }}>{desc}</p>
                  <Link to={`/contact?interest=Event+Registration&subject=${encodeURIComponent(name)}`} className="btn btn-secondary" style={{ padding: '0.6rem 1.25rem', fontSize: '0.875rem' }}>Register interest</Link>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', minWidth: '200px' }}>
                  <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start', color: 'var(--muted)', fontSize: '0.9rem' }}>
                    <Calendar size={16} color="var(--cyan)" style={{ marginTop: '2px', flexShrink: 0 }} />
                    <span>{date}</span>
                  </div>
                  <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start', color: 'var(--muted)', fontSize: '0.9rem' }}>
                    <MapPin size={16} color="var(--mint)" style={{ marginTop: '2px', flexShrink: 0 }} />
                    <span>{location}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="section section-light">
      <div className="container">
        <div style={{ marginBottom: '3rem' }}>
          <span style={{ textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: '600', color: 'var(--accent-color)', fontSize: '0.875rem' }}>Past Events</span>
          <h2 style={{ marginTop: '0.5rem' }}>Where we've <em>been.</em></h2>
        </div>
        <div className="grid-3">
          {past.map(({ name, date, location }) => (
            <div key={name} className="card" style={{ padding: '1.5rem' }}>
              <h4 style={{ marginBottom: '0.75rem', fontSize: '1rem' }}>{name}</h4>
              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', color: 'var(--muted)', fontSize: '0.85rem', marginBottom: '0.4rem' }}>
                <Calendar size={14} />
                <span>{date}</span>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', color: 'var(--muted)', fontSize: '0.85rem' }}>
                <MapPin size={14} />
                <span>{location}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="section section-alt" style={{ borderTop: '1px solid var(--border-color)' }}>
      <div className="container" style={{ textAlign: 'center', maxWidth: '700px' }}>
        <h2>We'd love to discuss <em>your organization's needs.</em></h2>
        <p style={{ color: 'var(--muted)', marginBottom: '2.5rem' }}>
          Contact us via the details below or fill in a quick request — our team will reach out within one business day.
        </p>
        <Link to="/contact" className="btn btn-primary" style={{ padding: '1rem 2rem', fontSize: '1.125rem' }}>
          Contact us <ArrowRight size={18} className="btn-icon" />
        </Link>
      </div>
    </section>
  </div>
  );
};

export default Events;
