import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Bot, Link2, BarChart3, Globe, Zap, ShieldCheck, Rocket, Building2, Users, Plug } from 'lucide-react';
import { fetchAPI } from '../lib/api';

/* ── Unsplash image helpers ─────────────────────────── */
const UNS = (id, w = 800, h = 420) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&h=${h}&q=80`;

const productImages = {
  crm:             UNS('1552664730-d307ca884978'),
  commerce:        UNS('1556742049-0cfed4f6a45d'),
  creatorCommerce: UNS('1611162617213-7d7a39e9b1d7'),
  plm:             UNS('1581291518633-83b4ebd1d83e'),
  logistics:       UNS('1586528116311-ad8dd3c8310d'),   // delivery truck / logistics
  wms:             UNS('1694885156873-6a0823e14848'),   // warehouse shelves / scanning
};

const resourceImages = {
  blog:       UNS('1499750310107-5fef28a66643', 600, 300),
  caseStudy:  UNS('1554224155-6726b3ff858f', 600, 300),
  whitepaper: UNS('1568992687947-868a62a9f521', 600, 300),
  events:     UNS('1540575467537-1a1d4bf6cf5a', 600, 300),
};

/* ── Data ───────────────────────────────────────────── */
const logoNames = ['PharmEasy', 'TeaBox', 'Pepperfry', 'Lucrin', 'Licious', 'Liberty', 'New Balance', 'Allbirds'];

const products = [
  { slug: '/crm',              img: productImages.crm,             name: 'CRM',                          desc: 'Our SaaS-based Sales CRM empowers partners to manage leads, close deals faster, and grow revenue with ease.' },
  { slug: '/commerce',         img: productImages.commerce,        name: 'Commerce',                     desc: "Polluxa can help you unleash the potential of business trade. Improve customer relations, optimize supply chain, and expedite B2B transactions." },
  { slug: '/creator-commerce', img: productImages.creatorCommerce, name: 'Creator Commerce',             desc: 'Polluxa empowers creators and influencers to launch, manage, and scale their e-Commerce brands with confidence.' },
  { slug: '/plm',              img: productImages.plm,             name: 'Product Lifecycle Management', desc: 'Reduce costs and time to market. Improve collaboration to get products to market fast while improving sustainability.' },
  { slug: '/logistics',        img: productImages.logistics,       name: 'Logistics',                    desc: 'Our robust network of delivery hubs and couriers allows us to offer last-mile delivery services at extremely reasonable prices.' },
  { slug: '/wms',              img: productImages.wms,             name: 'Warehouse Management System',  desc: 'Increase fulfilment rates and view your whole inventory across all sales channels by streamlining warehouse operations.' },
];

const keyFeatures = [
  { Icon: Bot,         title: 'Agentic AI',           desc: 'Autonomous agents that reason, plan, and execute across CRM, commerce, and supply chain without human intervention.' },
  { Icon: Link2,       title: 'Unified Platform',      desc: 'CRM, Commerce, PLM, Logistics, and WMS on one connected data model — no more siloed systems or costly integrations.' },
  { Icon: BarChart3,   title: 'Real-Time Analytics',   desc: 'Live dashboards with AI-powered forecasting, anomaly detection, and actionable recommendations across every module.' },
  { Icon: Globe,       title: 'Global Scale',          desc: 'Multi-currency, multi-language, multi-warehouse — built to run across 38 countries and 12 time zones from day one.' },
  { Icon: Zap,         title: 'Fast Go-Live',          desc: '100% go-live rate. Enterprise onboarding in weeks, not months, with dedicated migration engineering and support.' },
  { Icon: ShieldCheck, title: 'Enterprise Security',   desc: 'SOC 2 compliant, role-based access, audit trails, and data residency options for regulated industries worldwide.' },
];

const successStories = [
  { company: 'PharmEasy',    category: 'Pharma · PLM',      gradient: 'linear-gradient(135deg, #0ea5e9 0%, #06b6d4 100%)', desc: 'An Indian e-pharmacy company that sells medicines, diagnostics and telehealth online.' },
  { company: 'New Balance',  category: 'Manufacturing · PLM', gradient: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)', desc: "One of the world's major sports footwear and apparel manufacturers." },
  { company: 'Allbirds',     category: 'Retail · PLM',       gradient: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', desc: 'Allbirds is a footwear and apparel company selling sustainable, comfortable shoes and accessories.' },
  { company: 'Pebble',       category: 'Fashion · PLM',      gradient: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)', desc: 'A leading garment shop and top choice for women wear — tops, shirts, skirts — across South Asia.' },
];

const promises = [
  { Icon: Rocket,    title: 'Faster GTM',                      desc: 'With enterprise-grade, scalable technology, Polluxa enables faster deployment, helping your business stay ahead in competitive markets.' },
  { Icon: Building2, title: 'Enterprise-Ready from Day One',   desc: "Tailored to fit your unique business processes, Polluxa's software streamlines operations and maximizes efficiency." },
  { Icon: Users,     title: 'Scale with a Trusted SI Network', desc: "Benefit from Polluxa's certified partners with deep expertise in customizing the codebase to meet your specific needs across 38 countries." },
  { Icon: Plug,      title: 'Seamless Integrations',           desc: "Polluxa's flexible architecture ensures easy integration with existing systems, reducing disruption and protecting your technology investments." },
];

const resources = [
  { slug: '/blog',         img: resourceImages.blog,       type: 'Blog',        title: 'Latest from the Polluxa Blog',           desc: 'Learn how to streamline processes, boost collaboration, and enhance efficiency across your enterprise operations.' },
  { slug: '/case-studies', img: resourceImages.caseStudy,  type: 'Case Study',  title: 'Customer Success Stories',               desc: 'Discover how our solutions transformed businesses — from pharma to fashion, logistics to creator commerce.' },
  { slug: '/case-studies', img: resourceImages.whitepaper, type: 'White Paper', title: 'Role of PLM in Regulatory Compliance',   desc: 'Explore our latest whitepaper for insights on optimizing Product Lifecycle Management in regulated industries.' },
  { slug: '/events',       img: resourceImages.events,     type: 'Events',      title: 'Upcoming Events & Conferences',          desc: 'Engaging events and continuous learning opportunities — from GITEX to Seamless Arabia.' },
];

const testimonials = [
  {
    quote: "The fastest-moving, most agile technology available is Polluxa. We've discovered a lot of alignment between our operational goals and what Polluxa delivers. It's transformed how our teams collaborate across the supply chain.",
    name: 'Head of Technology',
    company: 'Global Retail Brand',
    avatar: `https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=96&h=96&q=80`,
  },
  {
    quote: "Partnering with Polluxa has been transformative for our organization. Polluxa's PLM system is robust, intuitive, and backed by a team that genuinely understands enterprise-level complexity. We went live on schedule and within budget.",
    name: 'VP of Product Operations',
    company: 'Leading Fashion Manufacturer',
    avatar: `https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=96&h=96&q=80`,
  },
];

/* ── Scroll reveal hook ─────────────────────────────── */
function useScrollReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal');
    const io = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }),
      { threshold: 0.07 }
    );
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);
}

/* ── Animated counter hook ──────────────────────────── */
function useCounters() {
  useEffect(() => {
    const els = document.querySelectorAll('[data-count]');
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach(e => {
          if (!e.isIntersecting) return;
          const el = e.target;
          const target = parseFloat(el.dataset.count);
          const suffix = el.dataset.suffix || '';
          const prefix = el.dataset.prefix || '';
          let t0 = null;
          const duration = 1800;
          const ease = t => 1 - Math.pow(1 - t, 3);
          const tick = ts => {
            if (!t0) t0 = ts;
            const p = Math.min((ts - t0) / duration, 1);
            el.textContent = prefix + Math.floor(ease(p) * target) + suffix;
            if (p < 1) requestAnimationFrame(tick);
            else el.textContent = prefix + target + suffix;
          };
          requestAnimationFrame(tick);
          io.unobserve(el);
        });
      },
      { threshold: 0.6 }
    );
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);
}

/* ── Wave divider ───────────────────────────────────── */
const Wave = ({ color }) => (
  <div style={{ lineHeight: 0, marginBottom: '-1px', pointerEvents: 'none', userSelect: 'none' }}>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 52" preserveAspectRatio="none" style={{ width: '100%', display: 'block' }}>
      <path d="M0,26 C360,52 720,0 1080,26 C1260,39 1380,13 1440,26 L1440,52 L0,52 Z" fill={color} />
    </svg>
  </div>
);

/* ── Component ──────────────────────────────────────── */
const Homepage = () => {
  useScrollReveal();
  useCounters();

  const [articleCount, setArticleCount] = useState(null);

  useEffect(() => {
    async function loadStats() {
      try {
        const response = await fetchAPI('/api/articles');
        if (response && response.meta && response.meta.pagination) {
          setArticleCount(response.meta.pagination.total);
        }
      } catch (err) {
        // ignore
      }
    }
    loadStats();
  }, []);

  return (
    <>
      {/* ════════════════════════════════════════
          HERO
      ════════════════════════════════════════ */}
      <section className="hero" style={{ overflow: 'hidden' }}>
        {/* Animated background blobs + gradient mesh */}
        <div className="hero-blob hero-blob-a"></div>
        <div className="hero-blob hero-blob-b"></div>
        <div className="hero-blob hero-blob-c"></div>
        <div className="hero-blob hero-blob-d"></div>
        <div className="hero-mesh-grid" aria-hidden="true"></div>

        <div className="hero-inner" style={{ position: 'relative', zIndex: 2 }}>
          <span className="eyebrow"><span className="dot"></span> The complete agentic enterprise platform</span>

          <h1 className="hero-h" style={{ animationDelay: '0.1s' }}>
            The future of Work <em>is Agentic.</em>
          </h1>

          <p className="lede" style={{ animationDelay: '0.2s' }}>
            Polluxa is to enterprise software what a neural network is to AI — intelligent, adaptive, and built for the future.
          </p>

          <div className="cta-row" style={{ justifyContent: 'center' }}>
            <a href="https://crm.polluxa.com/auth/login" className="btn-primary" style={{ fontSize: '1rem', padding: '0.875rem 1.75rem' }}>
              Start Today →
            </a>
            <Link to="/contact" className="btn-ghost" style={{ fontSize: '1rem', padding: '0.875rem 1.75rem' }}>
              Book a live demo
            </Link>
          </div>

          <div style={{ marginTop: '2rem', display: 'flex', gap: '0.5rem', justifyContent: 'center', alignItems: 'center' }}>
            <span style={{ fontSize: '2rem', fontWeight: '900', background: 'var(--grad-hero)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>2000+</span>
            <span style={{ color: 'var(--muted)', fontSize: '0.9375rem', fontWeight: '500' }}>Customers worldwide</span>
          </div>

          <div className="glow-line"></div>

          {/* Floating dashboard cards */}
          <div className="hero-dash">
            <div className="dash-card float">
              <div className="dc-label">CRM · Live pipeline</div>
              <div className="dc-val">142 leads</div>
              <div className="dc-sub up">↑ 18% vs last week</div>
            </div>
            <div className="dash-card float-med">
              <div className="dc-label">Logistics · Daily orders</div>
              <div className="dc-val">20,480</div>
              <div className="dc-sub up">↑ 400+ courier partners</div>
            </div>
            <div className="dash-card float-slow">
              <div className="dc-label">WMS · Accuracy</div>
              <div className="dc-val">99.0%</div>
              <div className="dc-sub muted">Bin-level · scan-based</div>
            </div>
            <div className="dash-card float">
              <div className="dc-label">PLM · Products live</div>
              <div className="dc-val">7× faster</div>
              <div className="dc-sub up">↑ Styles to market</div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          CUSTOMER LOGOS — MARQUEE
      ════════════════════════════════════════ */}
      <div style={{ background: 'var(--bg-2)', borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)', padding: '1.75rem 0' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto 1rem', textAlign: 'center' }}>
          <span style={{ fontSize: '0.6875rem', textTransform: 'uppercase', letterSpacing: '0.14em', color: 'var(--muted)', fontWeight: '700' }}>
            Trusted by leading brands worldwide
          </span>
        </div>
        <div className="marquee-outer">
          <div className="marquee-track">
            {[...logoNames, ...logoNames].map((name, i) => (
              <span key={i} className="marquee-item">{name}</span>
            ))}
          </div>
        </div>
      </div>

      {/* ════════════════════════════════════════
          OUR SOFTWARES
      ════════════════════════════════════════ */}
      <section className="block" style={{ padding: '5rem 0' }}>
        <div className="container">
          <div className="section-head reveal">
            <div className="section-tag">Products</div>
            <h2 className="section-h">Our <em>Softwares.</em></h2>
            <p className="section-sub">CRM, Commerce, PLM, Logistics and WMS — unified on one intelligent platform for the modern enterprise.</p>
          </div>

          <div className="grid-3" style={{ gap: '1.5rem', marginTop: '3rem' }}>
            {products.map(({ slug, img, name, desc }, i) => (
              <Link key={name} to={slug} style={{ textDecoration: 'none' }}>
                <div className={`card reveal d${i + 1}`} style={{ padding: '0', overflow: 'hidden', display: 'flex', flexDirection: 'column', height: '100%' }}>
                  <div className="prod-img">
                    <img src={img} alt={name} loading="lazy" />
                  </div>
                  <div style={{ padding: '1.25rem 1.375rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                    <h4 style={{ color: 'var(--ink)', marginBottom: '0.5rem' }}>{name}</h4>
                    <p style={{ fontSize: '0.875rem', color: 'var(--muted)', lineHeight: '1.65', flex: 1 }}>{desc}</p>
                    <span style={{ marginTop: '1.125rem', fontSize: '0.875rem', fontWeight: '700', color: 'var(--cyan)', display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
                      Learn more <ArrowRight size={14} />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Wave color="var(--bg-2)" />

      {/* ════════════════════════════════════════
          KEY FEATURES
      ════════════════════════════════════════ */}
      <section className="bg-alt" style={{ padding: '5rem 0' }}>
        <div className="container">
          <div className="section-head reveal">
            <div className="section-tag">Platform</div>
            <h2 className="section-h">Key Features of <em>Polluxa Softwares.</em></h2>
            <p className="section-sub">Built for enterprise scale — intelligent, connected, and ready for the agentic era.</p>
          </div>

          <div className="bento-grid">
            {keyFeatures.map(({ Icon, title, desc }, i) => (
              <div
                key={title}
                className={`card reveal d${i + 1}${i === 0 ? ' bento-large' : ''}`}
                style={{
                  padding: i === 0 ? '2rem' : '1.5rem',
                  display: 'flex', flexDirection: 'column',
                  transition: 'transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease',
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 20px 48px rgba(0,0,0,0.35)'; e.currentTarget.style.borderColor = 'rgba(43,182,255,0.4)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = ''; e.currentTarget.style.borderColor = ''; }}
              >
                {i === 0 ? (
                  <>
                    <div className="bento-icon">
                      <Icon size={32} color="var(--cyan)" strokeWidth={1.5} />
                    </div>
                    <h4 style={{ color: 'var(--ink)', marginBottom: '0.75rem', fontSize: '1.3125rem' }}>{title}</h4>
                    <p style={{ fontSize: '1rem', color: 'var(--muted)', lineHeight: '1.75', margin: 0 }}>{desc}</p>
                  </>
                ) : (
                  <>
                    <div className="bento-icon-sm">
                      <Icon size={22} color="var(--cyan)" strokeWidth={1.5} />
                    </div>
                    <h4 style={{ color: 'var(--ink)', marginBottom: '0.375rem', fontSize: '0.9375rem' }}>{title}</h4>
                    <p style={{ fontSize: '0.84rem', color: 'var(--muted)', lineHeight: '1.65', margin: 0 }}>{desc}</p>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <Wave color="var(--bg)" />

      {/* ════════════════════════════════════════
          SUCCESS STORIES
      ════════════════════════════════════════ */}
      <section className="block" style={{ padding: '5rem 0' }}>
        <div className="container">
          <div className="section-head reveal">
            <div className="section-tag">Success Stories</div>
            <h2 className="section-h"><em>Success Stories.</em></h2>
            <p className="section-sub">We power change for hundreds of global brands, retailers and manufacturers through our ERP and CRM software solutions.</p>
          </div>

          <div className="grid-4" style={{ gap: '1.25rem', marginTop: '3rem' }}>
            {successStories.map(({ company, category, gradient, desc }, i) => (
              <Link key={company} to="/case-studies" style={{ textDecoration: 'none' }}>
                <div className={`card reveal d${i + 1}`} style={{ padding: '0', overflow: 'hidden', height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <div className="story-hdr" style={{ background: gradient }}>
                    {company[0]}
                  </div>
                  <div style={{ padding: '1.125rem 1.375rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <span style={{ fontSize: '0.7rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--cyan)', marginBottom: '0.375rem' }}>{category}</span>
                    <h4 style={{ color: 'var(--ink)', marginBottom: '0.5rem', fontSize: '1.0625rem' }}>{company}</h4>
                    <p style={{ fontSize: '0.85rem', color: 'var(--muted)', lineHeight: '1.6', flex: 1 }}>{desc}</p>
                    <span style={{ marginTop: '1rem', fontSize: '0.8125rem', fontWeight: '700', color: 'var(--cyan)', display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                      Read case study <ArrowRight size={13} />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Wave color="var(--bg-2)" />

      {/* ════════════════════════════════════════
          OUR UNIQUE PROMISE
      ════════════════════════════════════════ */}
      <section className="bg-alt" style={{ padding: '5rem 0' }}>
        <div className="container">
          <div className="section-head reveal" style={{ maxWidth: '760px' }}>
            <div className="section-tag">Our Unique Promise</div>
            <h2 className="section-h"><em>Our Unique Promise.</em></h2>
            <p className="section-sub">Your business is unique, and so should be your software. Polluxa delivers tailored ERP and CRM software solutions to streamline your processes and fuel growth.</p>
          </div>

          <div className="split-rows">
            {promises.map(({ Icon, title, desc }, i) => (
              <div key={title} className={`split-row reveal d${i + 1}${i % 2 === 1 ? ' flip' : ''}`}>
                <div className="split-icon-box">
                  <Icon size={32} color="var(--cyan)" strokeWidth={1.5} />
                </div>
                <div className="split-body">
                  <h4>{title}</h4>
                  <p>{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Wave color="var(--bg)" />

      {/* ════════════════════════════════════════
          SHIFT YOUR ORBIT — RESOURCES
      ════════════════════════════════════════ */}
      <section className="block" style={{ padding: '5rem 0' }}>
        <div className="container">
          <div className="section-head reveal">
            <div className="section-tag">Resources</div>
            <h2 className="section-h">Shift your orbit <em>with Polluxa.</em></h2>
            <p className="section-sub">Discover how our solutions seamlessly drive success.</p>
          </div>

          <div className="grid-4" style={{ gap: '1.25rem', marginTop: '3rem' }}>
            {resources.map(({ slug, img, type, title, desc }, i) => (
              <Link key={type + title} to={slug} style={{ textDecoration: 'none' }}>
                <div className={`card reveal d${i + 1}`} style={{ padding: '0', overflow: 'hidden', height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <div className="res-img">
                    <img src={img} alt={type} loading="lazy" />
                  </div>
                  <div style={{ padding: '1.125rem 1.375rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <span style={{ fontSize: '0.7rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--cyan)', marginBottom: '0.375rem' }}>{type}</span>
                    <h4 style={{ color: 'var(--ink)', marginBottom: '0.5rem', fontSize: '0.9375rem', lineHeight: '1.4' }}>{title}</h4>
                    <p style={{ fontSize: '0.8125rem', color: 'var(--muted)', lineHeight: '1.6', flex: 1 }}>
                      {type === 'Blog' && articleCount ? `Explore our collection of ${articleCount}+ articles and learn how to streamline processes, boost collaboration, and enhance efficiency.` : desc}
                    </p>
                    <span style={{ marginTop: '0.875rem', fontSize: '0.8125rem', fontWeight: '700', color: 'var(--cyan)', display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                      Explore <ArrowRight size={13} />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          STATISTICS — animated counters
      ════════════════════════════════════════ */}
      <section className="bg-alt" style={{ padding: '5.5rem 0' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <p className="reveal" style={{ fontSize: '0.6875rem', textTransform: 'uppercase', letterSpacing: '0.14em', color: 'var(--cyan)', fontWeight: '700', marginBottom: '0.875rem' }}>By the numbers</p>
          <h2 className="reveal" style={{ maxWidth: '720px', margin: '0 auto 3.5rem', fontSize: 'clamp(1.625rem, 3vw, 2.375rem)', fontWeight: '800', lineHeight: '1.2', color: '#e2e8f0' }}>
            We are a key innovation partner for iconic and emerging brands <em>across the world.</em>
          </h2>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '5rem', flexWrap: 'wrap' }}>
            {[
              { count: 2000, suffix: '+', label: 'Brands trust Polluxa' },
              { count: 100,  suffix: '%', label: 'Go live rate' },
              { count: 99,   suffix: '%', label: 'Customer retention rate' },
            ].map(({ count, suffix, label }, i) => (
              <div key={label} className={`reveal d${i + 1}`} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div className="stat-num" data-count={count} data-suffix={suffix}>0{suffix}</div>
                <div style={{ marginTop: '0.5rem', fontSize: '0.9375rem', color: 'var(--muted)', fontWeight: '500' }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          CTA
      ════════════════════════════════════════ */}
      <section className="final">
        <div className="container">
          <div className="final-card reveal">
            <span className="eyebrow"><span className="dot"></span> Driving creativity in Product Development</span>
            <h2>Make better <em>a reality.</em></h2>
            <p>Your business is unique. Polluxa delivers the tailored tools, integrations, and expert support to turn your growth ambitions into measurable outcomes — at enterprise scale.</p>
            <div className="cta-row" style={{ justifyContent: 'center' }}>
              <Link to="/contact" className="btn-primary">Book Live Demo →</Link>
              <Link to="/customers" className="btn-ghost">See customer stories</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          TESTIMONIALS
      ════════════════════════════════════════ */}
      <section className="block" style={{ padding: '5rem 0' }}>
        <div className="container">
          <div className="section-head reveal">
            <div className="section-tag">Testimonials</div>
            <h2 className="section-h">What our <em>clients say.</em></h2>
          </div>

          <div className="grid-2" style={{ gap: '1.5rem', marginTop: '3rem' }}>
            {testimonials.map(({ quote, name, company, avatar }, i) => (
              <div key={name} className={`reveal d${i + 1}`} style={{ background: 'var(--panel)', border: '1px solid var(--line-strong)', borderRadius: '1rem', padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.25rem', transition: 'transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease' }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 16px 40px rgba(0,0,0,0.3)'; e.currentTarget.style.borderColor = 'rgba(43,182,255,0.35)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = ''; e.currentTarget.style.borderColor = ''; }}>
                {/* Quote mark */}
                <div style={{ fontSize: '3rem', lineHeight: 0.8, color: 'var(--cyan)', opacity: 0.5, fontFamily: 'Georgia, serif', userSelect: 'none' }}>"</div>
                <p style={{ fontSize: '1rem', lineHeight: '1.75', color: 'var(--ink)', fontStyle: 'italic', flex: 1 }}>{quote}</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem', borderTop: '1px solid var(--line-strong)', paddingTop: '1.125rem' }}>
                  <img src={avatar} alt={name} className="t-avatar" />
                  <div>
                    <div style={{ fontWeight: '700', fontSize: '0.9rem', color: 'var(--ink)' }}>{name}</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--muted)' }}>{company}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Homepage;
