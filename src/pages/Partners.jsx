import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const solutionPartners = [
  'Comviva', 'Web Creator Live', 'HEITS', 'Cabriales Web Studio', 'SimpliRise',
  'Gravity', 'I-Cube Systems', 'LBM Solutions', 'VELANDIRCH', 'Eliftech',
  'Fncee Consult', 'Zigiwigi', 'Thoth Studio', 'Growzzy', 'Mapping Metrics',
  'Market Surgeons', 'ADST', 'Dmgenix', 'N Digitals', 'Spreadify Digital Marketing',
  'OnvoCore', 'Digital Wom', 'Nextinera', 'Zen Digital Services', 'Global Info Edge',
  'Online Ads Agency', 'Tara Media Works', 'Cognegiac', 'Infiniserve', 'Digital Deyar',
  'Niksh Digital', 'RND Digital', 'Promofox Digital', 'adzglobe', 'DBSoftech',
  'Imborn Digital', 'TweeLabs', 'Adept IT', 'Oye Nishant', 'IJS Infotech',
  'The Π Lab', 'MINDTEK', 'Scalient Consulting LLP', 'Aharnish Infotech',
  'Raulo Enterprises', 'Hexile Services', 'Puppy Atlas', 'Rivora Tech',
  'Geeks IT Services', '1IT',
];

const techPartners = [
  'DigitalOcean', 'Microsoft Azure', 'AWS', 'Google Cloud',
  'MongoDB', 'Amazon CloudFront', 'OVHcloud', 'Eligere',
];

const Partners = () => (
  <div className="partners-page">
    {/* Hero */}
    <section className="section section-light" style={{ textAlign: 'center', paddingBottom: '4rem' }}>
      <div className="container" style={{ maxWidth: '800px' }}>
        <span style={{ textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: '600', color: 'var(--accent-color)' }}>Ecosystem</span>
        <h1 style={{ marginTop: '0.5rem', fontSize: '3.75rem', fontWeight: '800', lineHeight: '1.1' }}>
          Our <em>Partners.</em>
        </h1>
        <p style={{ color: 'var(--muted)', fontSize: '1.25rem', marginTop: '1.5rem' }}>
          We collaborate with the top associations and partners in the industry and technology to keep innovating our products and hasten the adoption of Polluxa.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '2rem', flexWrap: 'wrap' }}>
          <Link to="/contact" className="btn btn-primary" style={{ padding: '1rem 2rem', fontSize: '1.125rem' }}>
            Become a partner <ArrowRight size={18} className="btn-icon" />
          </Link>
        </div>
      </div>
    </section>

    {/* Network stats */}
    <section className="section section-alt" style={{ padding: '3rem 0' }}>
      <div className="container">
        <div className="grid-3" style={{ textAlign: 'center' }}>
          <div>
            <h3 style={{ fontSize: '2.75rem', color: 'var(--primary-color)', marginBottom: '0.25rem' }}>50+</h3>
            <p style={{ color: 'var(--muted)', fontWeight: '500' }}>Solutions partners</p>
          </div>
          <div>
            <h3 style={{ fontSize: '2.75rem', color: 'var(--primary-color)', marginBottom: '0.25rem' }}>8</h3>
            <p style={{ color: 'var(--muted)', fontWeight: '500' }}>Technology partners</p>
          </div>
          <div>
            <h3 style={{ fontSize: '2.75rem', color: 'var(--primary-color)', marginBottom: '0.25rem' }}>100%</h3>
            <p style={{ color: 'var(--muted)', fontWeight: '500' }}>Go-live rate · 38 countries</p>
          </div>
        </div>
      </div>
    </section>

    {/* Solutions Partners */}
    <section className="section section-light">
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <span style={{ textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: '600', color: 'var(--accent-color)' }}>Solutions Partners</span>
          <h2 style={{ marginTop: '0.5rem' }}>Implementation & <em>consulting network.</em></h2>
          <p style={{ color: 'var(--muted)', maxWidth: '600px', margin: '1rem auto 0' }}>
            Certified implementation partners that deploy Polluxa for enterprises across the globe.
          </p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '0.75rem' }}>
          {solutionPartners.map((name) => (
            <div key={name} style={{ background: 'var(--panel)', border: '1px solid var(--line-strong)', borderRadius: '0.5rem', padding: '0.875rem 1rem', fontSize: '0.9rem', fontWeight: '600', color: 'var(--ink)', textAlign: 'center' }}>
              {name}
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Technology Partners */}
    <section className="section section-alt">
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <span style={{ textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: '600', color: 'var(--accent-color)' }}>Technology Partners</span>
          <h2 style={{ marginTop: '0.5rem' }}>Built on the best <em>infrastructure.</em></h2>
          <p style={{ color: 'var(--muted)', maxWidth: '600px', margin: '1rem auto 0' }}>
            Polluxa runs on and integrates with the world's leading cloud and data infrastructure providers.
          </p>
        </div>
        <div className="grid-4">
          {techPartners.map((name) => (
            <div key={name} className="card" style={{ textAlign: 'center', padding: '1.5rem', fontSize: '1rem', fontWeight: '700', color: 'var(--primary-color)' }}>
              {name}
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Partner types */}
    <section className="section section-light">
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <span style={{ textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: '600', color: 'var(--accent-color)' }}>Partner Types</span>
          <h2 style={{ marginTop: '0.5rem' }}>Find your <em>partner tier.</em></h2>
        </div>
        <div className="grid-2">
          <div className="card">
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🔧</div>
            <h4>SI Partner — Systems Integration</h4>
            <p style={{ fontSize: '0.95rem', color: 'var(--muted)', marginTop: '0.5rem' }}>
              Lead the implementation. Deploy Polluxa for enterprise customers with full handover, go-live support and post-implementation care.
            </p>
          </div>
          <div className="card">
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📐</div>
            <h4>Consulting</h4>
            <p style={{ fontSize: '0.95rem', color: 'var(--muted)', marginTop: '0.5rem' }}>
              Help customers map their operating model to the Polluxa platform. Process design, change management and platform configuration.
            </p>
          </div>
          <div className="card">
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>⚙️</div>
            <h4>Technology Partner</h4>
            <p style={{ fontSize: '0.95rem', color: 'var(--muted)', marginTop: '0.5rem' }}>
              Build connectors, apps and integrations for distribution through the Polluxa marketplace. Direct product-team access included.
            </p>
          </div>
          <div className="card">
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🤝</div>
            <h4>Channel Reseller</h4>
            <p style={{ fontSize: '0.95rem', color: 'var(--muted)', marginTop: '0.5rem' }}>
              Resell Polluxa regionally with co-marketing support, deal registration protection, and tiered margin structures.
            </p>
          </div>
        </div>
      </div>
    </section>

    {/* CTA */}
    <section className="section section-alt" style={{ borderTop: '1px solid var(--border-color)' }}>
      <div className="container" style={{ textAlign: 'center', maxWidth: '700px' }}>
        <h2>Ready to join <em>our partner network?</em></h2>
        <p style={{ color: 'var(--muted)', marginBottom: '2.5rem' }}>
          Contact our partner team to explore the right tier and region together.
        </p>
        <Link to="/contact" className="btn btn-primary" style={{ padding: '1rem 2rem', fontSize: '1.125rem' }}>
          Find out more <ArrowRight size={18} className="btn-icon" />
        </Link>
      </div>
    </section>
  </div>
);

export default Partners;
