import { useState, useEffect } from 'react';
import { ArrowRight, MapPin, Briefcase, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { fetchAPI } from '../lib/api';

const benefits = [
  { icon: '🌍', title: 'Remote-friendly', desc: 'Work from any of our 12 global offices or remotely — with async-first culture across 38 countries.' },
  { icon: '📈', title: 'Equity', desc: "Early-stage ownership through ESOP. Every full-time team member is a part-owner of what we're building." },
  { icon: '🏥', title: 'Health coverage', desc: 'Comprehensive health, dental, and vision plans for you and your dependants.' },
  { icon: '📚', title: 'Learning budget', desc: 'Annual stipend for courses, conferences, certifications, and books — no approval hoops.' },
  { icon: '🍱', title: 'Meals', desc: 'Daily catered lunches in all office locations, plus meal credits for remote team members.' },
  { icon: '🧘', title: 'Wellness', desc: 'Gym reimbursement, mental health days, and flexible working hours.' },
];

const deptColors = {
  'HR & People': '#8b5cf6',
  'Sales': '#0ea5e9',
  'Marketing': '#ec4899',
  'Strategy': '#f59e0b',
  'Business Development': '#10b981',
};

const Careers = () => {
  const [openings, setOpenings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCareers() {
      try {
        const response = await fetchAPI('/api/careers', {
          populate: '*',
        });
        if (response && response.data && response.data.length > 0) {
          const apiCareers = response.data.map(item => ({
            title: item.attributes.title,
            dept: item.attributes.job_types?.data?.[0]?.attributes?.name || 'General',
            type: item.attributes.job_types?.data?.[0]?.attributes?.name || 'Full-time',
            exp: item.attributes.level || 'Experienced',
            locations: item.attributes.location ? item.attributes.location.split(',').map(l => l.trim()) : ['Remote'],
            desc: item.attributes.description,
          }));
          setOpenings(apiCareers);
        }
      } catch (error) {
        console.error('Failed to load careers', error);
      } finally {
        setLoading(false);
      }
    }
    loadCareers();
  }, []);

  return (
  <div className="careers-page">
    <section className="section section-light" style={{ paddingBottom: '4rem' }}>
      <div className="container" style={{ maxWidth: '900px', textAlign: 'center' }}>
        <span style={{ textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: '600', color: 'var(--accent-color)' }}>Careers</span>
        <h1 style={{ fontSize: '3.75rem', fontWeight: '800', lineHeight: '1.1', marginTop: '0.5rem' }}>
          Work on the future of <em>enterprise software.</em>
        </h1>
        <p style={{ fontSize: '1.25rem', marginTop: '1.5rem', color: 'var(--muted)', lineHeight: '1.6' }}>
          Polluxa is building the agentic operating system for enterprise — CRM, Commerce, PLM, Logistics, and WMS on one intelligent platform. Join a team that ships fast and thinks big.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '2.5rem', flexWrap: 'wrap' }}>
          <a href="#openings" className="btn btn-primary" style={{ padding: '1rem 2rem', fontSize: '1.125rem' }}>
            See open roles <ArrowRight size={18} className="btn-icon" />
          </a>
        </div>
      </div>
    </section>

    <section className="section section-alt" style={{ padding: '3rem 0' }}>
      <div className="container">
        <div className="grid-4" style={{ textAlign: 'center' }}>
          <div>
            <h3 style={{ fontSize: '2.5rem', color: 'var(--primary-color)', marginBottom: '0.25rem' }}>450+</h3>
            <p style={{ color: 'var(--muted)', fontWeight: '500' }}>Team members</p>
          </div>
          <div>
            <h3 style={{ fontSize: '2.5rem', color: 'var(--primary-color)', marginBottom: '0.25rem' }}>12</h3>
            <p style={{ color: 'var(--muted)', fontWeight: '500' }}>Global offices</p>
          </div>
          <div>
            <h3 style={{ fontSize: '2.5rem', color: 'var(--primary-color)', marginBottom: '0.25rem' }}>38</h3>
            <p style={{ color: 'var(--muted)', fontWeight: '500' }}>Countries</p>
          </div>
          <div>
            <h3 style={{ fontSize: '2.5rem', color: 'var(--primary-color)', marginBottom: '0.25rem' }}>2018</h3>
            <p style={{ color: 'var(--muted)', fontWeight: '500' }}>Founded</p>
          </div>
        </div>
      </div>
    </section>

    <section id="openings" className="section section-light">
      <div className="container">
        <div style={{ marginBottom: '3rem' }}>
          <span style={{ textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: '600', color: 'var(--accent-color)', fontSize: '0.875rem' }}>Open Positions</span>
          <h2 style={{ marginTop: '0.5rem' }}>Join the <em>team.</em></h2>
          <p style={{ color: 'var(--muted)', marginTop: '0.5rem', maxWidth: '520px' }}>All roles are open to candidates across Dubai, Netherlands, Prague, Canada, and USA unless noted.</p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {openings.map(({ title, dept, type, exp, locations, desc }) => (
            <div key={title} className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '2rem', flexWrap: 'wrap' }}>
              <div style={{ flex: 1, minWidth: '280px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em', background: (deptColors[dept] || '#888') + '22', color: deptColors[dept] || '#888', padding: '0.2rem 0.6rem', borderRadius: '4px' }}>{dept}</span>
                </div>
                <h4 style={{ fontSize: '1.125rem', margin: '0 0 0.5rem 0' }}>{title}</h4>
                <p style={{ fontSize: '0.9rem', color: 'var(--muted)', lineHeight: '1.6', margin: '0 0 1rem 0' }}>{desc}</p>
                <div style={{ display: 'flex', gap: '1.25rem', flexWrap: 'wrap' }}>
                  <div style={{ display: 'flex', gap: '0.35rem', alignItems: 'center', color: 'var(--muted)', fontSize: '0.85rem' }}>
                    <Briefcase size={14} /> <span>{type}</span>
                  </div>
                  <div style={{ display: 'flex', gap: '0.35rem', alignItems: 'center', color: 'var(--muted)', fontSize: '0.85rem' }}>
                    <Clock size={14} /> <span>{exp}</span>
                  </div>
                  <div style={{ display: 'flex', gap: '0.35rem', alignItems: 'center', color: 'var(--muted)', fontSize: '0.85rem' }}>
                    <MapPin size={14} /> <span>{locations.join(' / ')}</span>
                  </div>
                </div>
              </div>
              <div style={{ flexShrink: 0, marginTop: '0.25rem' }}>
                <Link
                  to={`/contact?interest=Job+Application&subject=${encodeURIComponent(title)}`}
                  className="btn btn-primary"
                  style={{ padding: '0.6rem 1.25rem', fontSize: '0.875rem' }}
                >
                  Apply <ArrowRight size={14} className="btn-icon" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="section section-alt">
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <span style={{ textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: '600', color: 'var(--accent-color)', fontSize: '0.875rem' }}>Benefits</span>
          <h2 style={{ marginTop: '0.5rem' }}>Built for the <em>long run.</em></h2>
        </div>
        <div className="grid-3">
          {benefits.map(({ icon, title, desc }) => (
            <div key={title} className="card">
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{icon}</div>
              <h4>{title}</h4>
              <p style={{ fontSize: '0.95rem', color: 'var(--muted)' }}>{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="section section-light" style={{ borderTop: '1px solid var(--border-color)' }}>
      <div className="container" style={{ textAlign: 'center', maxWidth: '700px' }}>
        <h2>{"Don't see your role? "}<em>Reach out anyway.</em></h2>
        <p style={{ color: 'var(--muted)', marginBottom: '2.5rem' }}>
          We're always looking for great people. Send us a note — we'll flag it when something opens up.
        </p>
        <Link to="/contact" className="btn btn-primary" style={{ padding: '1rem 2rem', fontSize: '1.125rem' }}>
          Get in touch <ArrowRight size={18} className="btn-icon" />
        </Link>
      </div>
    </section>
  </div>
  );
};

export default Careers;
