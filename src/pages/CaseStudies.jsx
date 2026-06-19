import { ArrowRight, FileText, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';

const caseStudies = [
  {
    type: 'Case Study',
    category: 'Logistics',
    title: 'How a Global Retailer Streamlined Its Logistics with Polluxa Intelligence',
    desc: 'This retailer was grappling with disjointed logistics workflows across warehouses, third-party carriers, and last-mile delivery partners. Polluxa unified the entire operation on one platform.',
    tags: ['Logistics', 'Last-mile', 'WMS'],
  },
  {
    type: 'Case Study',
    category: 'PLM · Retail',
    title: 'How Polluxa PLM Simplified Product Lifecycle Management for a Leading Retail Brand',
    desc: 'A fast-scaling lifestyle retailer operating across the GCC region was facing growing pressure from SKU expansion and fragmented cross-departmental collaboration. Polluxa PLM brought everything together.',
    tags: ['PLM', 'GCC', 'Retail'],
  },
  {
    type: 'Case Study',
    category: 'PLM · Manufacturing',
    title: 'How Polluxa PLM Transformed Product Lifecycle Management in Manufacturing',
    desc: 'A mid-sized automotive parts supplier in Riyadh faced rising inefficiencies — disconnected tools, delayed engineering change approvals, and audit stress. Polluxa resolved all three.',
    tags: ['PLM', 'Manufacturing', 'Riyadh'],
  },
  {
    type: 'Case Study',
    category: 'PLM · Beauty & Compliance',
    title: 'Global & Homegrown Beauty Brands Company Streamlines Compliance with Polluxa',
    desc: 'Polluxa was approached by a best-in-class global and homegrown beauty brands company to help them meet strict regulatory guidelines across their multi-brand portfolio.',
    tags: ['PLM', 'Beauty', 'Compliance'],
  },
  {
    type: 'Case Study',
    category: 'PLM · Process Efficiency',
    title: 'Polluxa PLM: Streamlining Technical Errors and Processes',
    desc: 'Polluxa PLM is a cutting-edge Product Lifecycle Management system designed to streamline product development processes. This analysis examines how one customer eliminated systemic errors at scale.',
    tags: ['PLM', 'Process', 'Efficiency'],
  },
  {
    type: 'Case Study',
    category: 'PLM · Accuracy',
    title: 'Increases Accuracy and Speed with Polluxa PLM',
    desc: 'An analysis of a Multi-Retail Brand that used Polluxa to dramatically reduce data entry errors and accelerate time-to-market across their full product range.',
    tags: ['PLM', 'Multi-retail', 'Speed'],
  },
  {
    type: 'Case Study',
    category: 'PLM · Speed',
    title: 'Produces Styles 7× Faster with Polluxa PLM',
    desc: "A customer used to take two weeks to enter styles. With Polluxa PLM, that same work now takes a day and a half — a 7× acceleration across the entire product development cycle.",
    tags: ['PLM', 'Speed', '7x faster'],
    highlight: '7× faster',
  },
  {
    type: 'Case Study',
    category: 'PLM · Fragrance & Compliance',
    title: 'Global Fragrance Company Streamlines Compliance with Polluxa',
    desc: 'Polluxa was approached by a well-known perfume manufacturing company to help them meet strict international regulatory guidelines — across ingredients, labelling, and supply chain documentation.',
    tags: ['PLM', 'Fragrance', 'Compliance'],
  },
  {
    type: 'Case Study',
    category: 'PLM · Pharma',
    title: 'The Impact of Product Lifecycle Management (PLM) in the Pharmaceutical Industry',
    desc: 'The pharmaceutical industry is characterized by its complexity, stringent regulatory requirements, and critical need for innovation. This study explores how PLM reduces compliance burden while accelerating R&D cycles.',
    tags: ['PLM', 'Pharma', 'Regulatory'],
  },
];

const whitepapers = [
  { title: 'The Future of Agentic Commerce', sub: 'How AI is Transforming the E-Commerce Landscape', tag: 'Commerce' },
  { title: 'Commerce Anywhere', sub: 'Strategies for Cross-Channel Growth in E-Commerce', tag: 'Commerce' },
  { title: 'Personalisation at Scale', sub: 'Leveraging Behavioral Data for Customer Retention', tag: 'Commerce' },
  { title: 'Seamless Integrations', sub: 'Building a Scalable E-Commerce Ecosystem', tag: 'Commerce' },
  { title: 'Advanced Search in E-Commerce', sub: 'Enhancing User Experience with NLP and AI', tag: 'Commerce' },
  { title: 'Headless CMS', sub: 'The Backbone of Omnichannel E-Commerce Experiences', tag: 'Commerce' },
  { title: 'Building Trust Online', sub: 'Security and Transparency in E-Commerce Transactions', tag: 'Commerce' },
  { title: 'The Role of Advanced Analytics', sub: 'Driving E-Commerce Success', tag: 'Commerce' },
  { title: 'Sustainability in E-Commerce', sub: 'How Technology Can Drive Ethical Shopping', tag: 'Sustainability' },
  { title: 'Accelerating Fulfilment', sub: 'Optimizing Supply Chain for Modern E-Commerce', tag: 'Logistics' },
  { title: 'Enhancing Collaboration Across Supply Chains with PLM', sub: 'Breaking down silos for faster product delivery', tag: 'PLM' },
  { title: 'Sustainability and PLM: Driving Eco-Friendly Practices', sub: 'Embedding sustainability into the product lifecycle', tag: 'PLM' },
  { title: 'Implementing a Bill of Information (BOI) Approach with PLM', sub: 'Structured information architecture for complex products', tag: 'PLM' },
  { title: 'The Role of PLM in Regulatory Compliance', sub: 'Meeting global standards without slowing down development', tag: 'PLM' },
  { title: 'Digital Transformation in Product Lifecycle Management', sub: 'From legacy systems to intelligent, connected PLM', tag: 'PLM' },
];

const tagColor = (tag) => {
  const map = { Commerce: '#0ea5e9', PLM: '#8b5cf6', Logistics: '#10b981', Sustainability: '#16a34a', Pharma: '#f59e0b', Beauty: '#ec4899', Fragrance: '#f97316' };
  return map[tag] || '#6b7280';
};

const CaseStudies = () => (
  <div className="case-studies-page">
    {/* Hero */}
    <section className="section section-light">
      <div className="container" style={{ textAlign: 'center', maxWidth: '800px' }}>
        <span style={{ textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: '600', color: 'var(--accent-color)' }}>Resources</span>
        <h1 style={{ marginTop: '0.5rem', fontSize: '3.75rem', fontWeight: '800', lineHeight: '1.1' }}>
          Case Studies & <em>Whitepapers.</em>
        </h1>
        <p style={{ color: 'var(--muted)', fontSize: '1.25rem', marginTop: '1.5rem' }}>
          Real outcomes from real enterprises. Plus in-depth whitepapers on the future of commerce, PLM, logistics, and agentic AI.
        </p>
      </div>
    </section>

    {/* Stats */}
    <section className="section section-alt" style={{ padding: '3rem 0' }}>
      <div className="container">
        <div className="grid-4" style={{ textAlign: 'center' }}>
          <div>
            <h3 style={{ fontSize: '2.5rem', color: 'var(--primary-color)', marginBottom: '0.25rem' }}>2000+</h3>
            <p style={{ color: 'var(--muted)', fontWeight: '500' }}>Customers globally</p>
          </div>
          <div>
            <h3 style={{ fontSize: '2.5rem', color: 'var(--primary-color)', marginBottom: '0.25rem' }}>100%</h3>
            <p style={{ color: 'var(--muted)', fontWeight: '500' }}>Go-live rate</p>
          </div>
          <div>
            <h3 style={{ fontSize: '2.5rem', color: 'var(--primary-color)', marginBottom: '0.25rem' }}>38</h3>
            <p style={{ color: 'var(--muted)', fontWeight: '500' }}>Countries served</p>
          </div>
          <div>
            <h3 style={{ fontSize: '2.5rem', color: 'var(--primary-color)', marginBottom: '0.25rem' }}>99%</h3>
            <p style={{ color: 'var(--muted)', fontWeight: '500' }}>Customer retention</p>
          </div>
        </div>
      </div>
    </section>

    {/* Case Studies */}
    <section className="section section-light">
      <div className="container">
        <div style={{ marginBottom: '3rem' }}>
          <span style={{ textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: '600', color: 'var(--accent-color)', fontSize: '0.875rem' }}>Case Studies</span>
          <h2 style={{ marginTop: '0.5rem' }}>Real enterprises. <em>Proven results.</em></h2>
        </div>
        <div className="grid-3">
          {caseStudies.map(({ category, title, desc, tags, highlight }) => (
            <div key={title} className="card" style={{ display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>
              {highlight && (
                <div style={{ position: 'absolute', top: 0, right: 0, background: 'var(--primary-color)', color: '#fff', padding: '0.25rem 0.75rem', fontSize: '0.75rem', fontWeight: '800', borderBottomLeftRadius: '0.5rem' }}>{highlight}</div>
              )}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
                <FileText size={14} color="var(--accent-color)" />
                <span style={{ fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--accent-color)' }}>{category}</span>
              </div>
              <h4 style={{ fontSize: '1rem', lineHeight: '1.5', marginBottom: '0.75rem', flex: 1 }}>{title}</h4>
              <p style={{ fontSize: '0.875rem', color: 'var(--muted)', lineHeight: '1.6', marginBottom: '1rem' }}>{desc}</p>
              <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
                {tags.map((t) => (
                  <span key={t} style={{ fontSize: '0.7rem', padding: '0.15rem 0.5rem', borderRadius: '4px', background: tagColor(t) + '22', color: tagColor(t), fontWeight: '600' }}>{t}</span>
                ))}
              </div>
              <a href="#" style={{ fontSize: '0.875rem', fontWeight: '600', color: 'var(--primary-color)', display: 'flex', alignItems: 'center', gap: '0.25rem', marginTop: 'auto' }}>
                Read case study <ArrowRight size={14} />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Whitepapers */}
    <section className="section section-alt">
      <div className="container">
        <div style={{ marginBottom: '3rem' }}>
          <span style={{ textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: '600', color: 'var(--accent-color)', fontSize: '0.875rem' }}>Whitepapers</span>
          <h2 style={{ marginTop: '0.5rem' }}>Deep dives for <em>enterprise leaders.</em></h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1rem' }}>
          {whitepapers.map(({ title, sub, tag }) => (
            <div key={title} className="card" style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', padding: '1.25rem' }}>
              <div style={{ flexShrink: 0, width: '40px', height: '40px', borderRadius: '0.5rem', background: tagColor(tag) + '22', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <BookOpen size={18} color={tagColor(tag)} />
              </div>
              <div style={{ flex: 1 }}>
                <span style={{ fontSize: '0.7rem', fontWeight: '700', textTransform: 'uppercase', color: tagColor(tag) }}>{tag}</span>
                <h4 style={{ fontSize: '0.9375rem', lineHeight: '1.4', margin: '0.2rem 0 0.3rem 0' }}>{title}</h4>
                <p style={{ fontSize: '0.8125rem', color: 'var(--muted)', margin: '0 0 0.75rem 0', lineHeight: '1.5' }}>{sub}</p>
                <a href="#" style={{ fontSize: '0.8125rem', fontWeight: '600', color: 'var(--primary-color)', display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
                  Download <ArrowRight size={13} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* CTA */}
    <section className="section section-light" style={{ borderTop: '1px solid var(--border-color)' }}>
      <div className="container" style={{ textAlign: 'center', maxWidth: '800px' }}>
        <h2>See what Polluxa can do <em>for your business.</em></h2>
        <p style={{ color: 'var(--muted)', marginBottom: '2.5rem' }}>
          Join 2000+ enterprises across 38 countries that run on Polluxa — with a 100% go-live rate and 99% customer retention.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/contact" className="btn btn-primary" style={{ padding: '1rem 2rem', fontSize: '1.125rem' }}>
            Book a demo <ArrowRight size={18} className="btn-icon" />
          </Link>
          <Link to="/customers" className="btn btn-secondary" style={{ padding: '1rem 2rem', fontSize: '1.125rem' }}>
            All customers
          </Link>
        </div>
      </div>
    </section>
  </div>
);

export default CaseStudies;
