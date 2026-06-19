import { ArrowRight, MapPin, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';

const upcoming = [
  {
    name: 'Global AI Show Riyadh – Exhibit',
    date: 'June 28–29, 2026',
    location: 'Riyadh, Saudi Arabia',
    type: 'Exhibition',
    desc: 'Polluxa exhibits at the Global AI Show in Riyadh — showcasing our agentic enterprise platform and AI-driven solutions for retail, commerce, and supply chain.',
  },
  {
    name: 'Online Retailer Conference & Expo 2026',
    date: 'July 21–22, 2026',
    location: 'ICC Sydney, Darling Harbour, Sydney, Australia',
    type: 'Conference & Expo',
    desc: "Australia's leading retail technology conference. Meet the Polluxa team to learn how we're powering the next generation of omnichannel commerce operations.",
  },
  {
    name: 'Seamless Saudi Arabia 2026',
    date: 'November 8–9, 2026',
    location: 'Riyadh Front, Riyadh',
    type: 'Conference',
    badge: 'Featured',
    desc: 'The Middle East\'s leading payments and commerce event. Polluxa will be on the show floor demonstrating our full enterprise platform for retail and fintech audiences.',
  },
  {
    name: 'GITEX Global 2026',
    date: 'December 6–10, 2026',
    location: 'Expo City Dubai / Dubai Exhibition Centre, Dubai, UAE',
    type: 'Exhibition',
    badge: 'Featured',
    desc: "The world's largest tech show. Polluxa will have a dedicated stand at GITEX Global 2026 — come see our full agentic enterprise suite live on the show floor.",
  },
];

const past = [
  { name: 'Seamless Middle East 2026', date: 'May 11–13, 2026', location: 'Dubai World Trade Centre, Dubai, UAE' },
  { name: 'Retail Asia Summit – Malaysia 2026', date: 'April 14–15, 2026', location: 'Kuala Lumpur, Malaysia' },
  { name: 'Exhibit at LEAP 2026', date: 'April 12–15, 2026', location: 'Riyadh Front Exhibition & Conference Center, Riyadh, Saudi Arabia' },
  { name: 'eTail Asia 2026', date: 'March 23–24, 2026', location: 'Equarius Hotel, Sentosa, Singapore' },
  { name: 'NRF 2026 — National Retail Federation', date: 'January 12–14, 2026', location: 'New York, USA' },
  { name: 'GITEX Global 2025', date: 'October 14–18, 2025', location: 'Dubai, UAE' },
  { name: 'Polluxa World 2025', date: 'September 20–21, 2025', location: 'Bangalore, India' },
  { name: 'Seamless Middle East 2025', date: 'May 14–15, 2025', location: 'Dubai, UAE' },
  { name: 'IMAGES Retail India Forum 2025', date: 'April 10, 2025', location: 'New Delhi, India' },
  { name: 'Tech in Asia Singapore 2025', date: 'March 6–7, 2025', location: 'Singapore' },
  { name: 'LEAP 2025', date: 'February 9–12, 2025', location: 'Riyadh, Saudi Arabia' },
  { name: 'eTail Asia 2025', date: 'March, 2025', location: 'Singapore' },
];

const Events = () => (
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
                  <Link to="/contact" className="btn btn-secondary" style={{ padding: '0.6rem 1.25rem', fontSize: '0.875rem' }}>Register interest</Link>
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

export default Events;
