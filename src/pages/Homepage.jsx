import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Bot, Link2, BarChart3, Globe, Zap, ShieldCheck,
  Rocket, Building2, Users, Plug, HelpCircle,
} from 'lucide-react';
import { fetchAPI, getImgUrl } from '../lib/api';

/* ── Icon registry: maps Strapi icon_name strings → Lucide components ── */
const ICON_MAP = {
  Bot, Link2, BarChart3, Globe, Zap, ShieldCheck,
  Rocket, Building2, Users, Plug,
};
const getIcon = (name) => ICON_MAP[name] || HelpCircle;

/* ── Wave divider ── */
const Wave = ({ color }) => (
  <div style={{ lineHeight: 0, marginBottom: '-1px', pointerEvents: 'none', userSelect: 'none' }}>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 52" preserveAspectRatio="none" style={{ width: '100%', display: 'block' }}>
      <path d="M0,26 C360,52 720,0 1080,26 C1260,39 1380,13 1440,26 L1440,52 L0,52 Z" fill={color} />
    </svg>
  </div>
);

/* ── Scroll reveal hook ── */
function useScrollReveal(deps = []) {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal');
    const io = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }),
      { threshold: 0.07 }
    );
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, deps);
}

/* ── Animated counter hook ── */
function useCounters(deps = []) {
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
  }, deps);
}

const Homepage = () => {
  const [data, setData] = useState({
    logoNames:      [],
    products:       [],
    keyFeatures:    [],
    successStories: [],
    promises:       [],
    resources:      [],
    testimonials:   [],
    articleCount:   null,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      const [logos, products, features, stories, promises, resources, testimonials, articles] = await Promise.all([
        fetchAPI('/api/customer-logos',  { sort: 'sort_order:asc' }),
        fetchAPI('/api/products',        { sort: 'sort_order:asc', populate: 'image' }),
        fetchAPI('/api/key-features',    { sort: 'sort_order:asc' }),
        fetchAPI('/api/success-stories', { sort: 'sort_order:asc' }),
        fetchAPI('/api/promises',        { sort: 'sort_order:asc' }),
        fetchAPI('/api/resources',       { sort: 'sort_order:asc', populate: 'image' }),
        fetchAPI('/api/testimonials',    { sort: 'sort_order:asc', populate: 'avatar' }),
        fetchAPI('/api/articles'),
      ]);
      if (cancelled) return;

      setData({
        logoNames:      (logos?.data     || []).map(i => i.attributes.name),
        products:       (products?.data  || []).map(i => ({
          slug:  i.attributes.slug,
          img:   getImgUrl(i.attributes.image),
          name:  i.attributes.name,
          desc:  i.attributes.description,
        })),
        keyFeatures:    (features?.data  || []).map(i => ({
          iconName: i.attributes.icon_name,
          title:    i.attributes.title,
          desc:     i.attributes.description,
        })),
        successStories: (stories?.data   || []).map(i => ({
          company:  i.attributes.company,
          category: i.attributes.category,
          gradient: i.attributes.gradient,
          desc:     i.attributes.description,
        })),
        promises:       (promises?.data  || []).map(i => ({
          iconName: i.attributes.icon_name,
          title:    i.attributes.title,
          desc:     i.attributes.description,
        })),
        resources:      (resources?.data || []).map(i => ({
          slug:  i.attributes.slug,
          img:   getImgUrl(i.attributes.image),
          type:  i.attributes.resource_type,
          title: i.attributes.title,
          desc:  i.attributes.description,
        })),
        testimonials:   (testimonials?.data || []).map(i => ({
          quote:   i.attributes.quote,
          name:    i.attributes.name,
          company: i.attributes.company,
          avatar:  getImgUrl(i.attributes.avatar),
        })),
        articleCount:   articles?.meta?.pagination?.total || null,
      });
      setLoading(false);
    }
    load();
    return () => { cancelled = true; };
  }, []);

  useScrollReveal([loading]);
  useCounters([loading]);

  const { logoNames, products, keyFeatures, successStories, promises, resources, testimonials, articleCount } = data;

  return (
    <>
      {/* ════════════════════════════════════════
          HERO
      ════════════════════════════════════════ */}
      <div className="page-scroll-bar" aria-hidden="true" />

      <section className="hero" style={{ overflow: 'hidden' }}>
        <div className="hero-blob hero-blob-a" />
        <div className="hero-blob hero-blob-b" />
        <div className="hero-blob hero-blob-c" />
        <div className="hero-blob hero-blob-d" />
        <div className="hero-mesh-grid" aria-hidden="true" />
        <div className="hero-prism" aria-hidden="true" />

        <div className="hero-inner" style={{ position: 'relative', zIndex: 2 }}>
          <span className="eyebrow"><span className="dot" />The complete agentic enterprise platform</span>
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
          <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'center' }}>
            <div className="hero-count-badge">
              <span className="hcb-num">2000+</span>
              <span className="hcb-label">Customers worldwide</span>
            </div>
          </div>
          <div className="glow-line" />
          <div className="hero-dash">
            <div className="dash-card float"><div className="dc-label">CRM · Live pipeline</div><div className="dc-val">142 leads</div><div className="dc-sub up">↑ 18% vs last week</div></div>
            <div className="dash-card float-med"><div className="dc-label">Logistics · Daily orders</div><div className="dc-val">20,480</div><div className="dc-sub up">↑ 400+ courier partners</div></div>
            <div className="dash-card float-slow"><div className="dc-label">WMS · Accuracy</div><div className="dc-val">99.0%</div><div className="dc-sub muted">Bin-level · scan-based</div></div>
            <div className="dash-card float"><div className="dc-label">PLM · Products live</div><div className="dc-val">7× faster</div><div className="dc-sub up">↑ Styles to market</div></div>
          </div>
        </div>
      </section>

{/* ════════════════════════════════════════
          CUSTOMER LOGOS — MARQUEE
      ════════════════════════════════════════ */}
      {(() => {
        const fallback = ['Reliance', 'Tata', 'Zara', 'H&M', 'Myntra', 'Flipkart', 'Nykaa', 'Decathlon', 'Puma', 'Adidas', 'Lenskart', 'Mamaearth', 'Sugar', 'Boat', 'Bewakoof'];
        const names = logoNames.length > 0 ? logoNames : fallback;
        const items = [...names, ...names, ...names];
        return (
          <div style={{ background: 'var(--bg-2)', borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)', padding: '1.75rem 0' }}>
            <div style={{ maxWidth: '900px', margin: '0 auto 1rem', textAlign: 'center' }}>
              <span style={{ fontSize: '0.6875rem', textTransform: 'uppercase', letterSpacing: '0.14em', color: 'var(--muted)', fontWeight: '700' }}>
                Trusted by leading brands worldwide
              </span>
            </div>
            <div className="marquee-outer">
              <div className="marquee-track">
                {items.map((name, i) => (
                  <span key={i} className="marquee-item">{name}</span>
                ))}
              </div>
            </div>
          </div>
        );
      })()}

      {/* ════════════════════════════════════════
          PRODUCTS
      ════════════════════════════════════════ */}
      {products.length > 0 && (
        <section className="block" style={{ padding: '5rem 0' }}>
          <div className="container">
            <div className="section-head reveal">
              <div className="section-tag">Products</div>
              <h2 className="section-h">Our <em>Softwares.</em></h2>
              <p className="section-sub">CRM, Commerce, PLM, Logistics and WMS — unified on one intelligent platform for the modern enterprise.</p>
            </div>
            <div className="grid-3" style={{ gap: '1.5rem', marginTop: '3rem' }}>
              {products.map(({ slug, img, name, desc }, i) => (
                <Link key={name} to={slug || '/'} style={{ textDecoration: 'none' }}>
                  <div className={`card reveal d${i + 1}${i === 0 ? ' holo-card' : ''}`} style={{ padding: '0', overflow: 'hidden', display: 'flex', flexDirection: 'column', height: '100%' }}>
                    {img ? (
                      <div className="prod-img">
                        <img src={img} alt={name} loading="lazy" />
                      </div>
                    ) : (
                      <div className="prod-icon-hdr" style={{ background: `linear-gradient(135deg, rgba(${i%3===0?'0,245,255':i%3===1?'123,47,255':'255,0,195'},0.12) 0%, rgba(0,0,0,0.3) 100%)` }}>
                        <div className="prod-icon-ring">
                          <Zap size={26} color="var(--w3-cyan)" strokeWidth={1.5} />
                        </div>
                      </div>
                    )}
                    <div style={{ padding: '1.25rem 1.375rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                      <h4 style={{ color: 'var(--ink)', marginBottom: '0.5rem' }}>{name}</h4>
                      <p style={{ fontSize: '0.875rem', color: 'var(--muted)', lineHeight: '1.65', flex: 1 }}>{desc}</p>
                      <span className="card-arrow-link">
                        Learn more <ArrowRight size={14} />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <Wave color="var(--bg-2)" />

      {/* ════════════════════════════════════════
          KEY FEATURES
      ════════════════════════════════════════ */}
      {keyFeatures.length > 0 && (
        <section className="bg-alt" style={{ padding: '5rem 0' }}>
          <div className="container">
            <div className="section-head reveal">
              <div className="section-tag">Platform</div>
              <h2 className="section-h">Key Features of <em>Polluxa Softwares.</em></h2>
              <p className="section-sub">Built for enterprise scale — intelligent, connected, and ready for the agentic era.</p>
            </div>
            <div className="bento-grid">
              {keyFeatures.map(({ iconName, title, desc }, i) => {
                const Icon = getIcon(iconName);
                return (
                  <div
                    key={title}
                    className={`card reveal d${i + 1}${i === 0 ? ' bento-large' : ''}`}
                    style={{ padding: i === 0 ? '2rem' : '1.5rem', display: 'flex', flexDirection: 'column', transition: 'transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease' }}
                    onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 20px 48px rgba(0,0,0,0.35)'; e.currentTarget.style.borderColor = 'rgba(43,182,255,0.4)'; }}
                    onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = ''; e.currentTarget.style.borderColor = ''; }}
                  >
                    {i === 0 ? (
                      <>
                        <div className="bento-icon"><Icon size={32} color="var(--cyan)" strokeWidth={1.5} /></div>
                        <h4 style={{ color: 'var(--ink)', marginBottom: '0.75rem', fontSize: '1.3125rem' }}>{title}</h4>
                        <p style={{ fontSize: '1rem', color: 'var(--muted)', lineHeight: '1.75', margin: 0 }}>{desc}</p>
                      </>
                    ) : (
                      <>
                        <div className="bento-icon-sm"><Icon size={22} color="var(--cyan)" strokeWidth={1.5} /></div>
                        <h4 style={{ color: 'var(--ink)', marginBottom: '0.375rem', fontSize: '0.9375rem' }}>{title}</h4>
                        <p style={{ fontSize: '0.84rem', color: 'var(--muted)', lineHeight: '1.65', margin: 0 }}>{desc}</p>
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      <Wave color="var(--bg)" />

      {/* ════════════════════════════════════════
          HOW IT WORKS
      ════════════════════════════════════════ */}
      <section className="block hiw-section">
        <div className="container">
          <div className="section-head reveal">
            <div className="section-tag">How it works</div>
            <h2 className="section-h">Up and running in <em>three steps.</em></h2>
            <p className="section-sub">No months-long IT projects. No data silos. Polluxa connects your whole business and starts working from day one.</p>
          </div>
          <div className="hiw-steps reveal">
            <div className="hiw-step">
              <div className="hiw-num" aria-hidden="true">01</div>
              <div className="hiw-icon-wrap"><Plug size={24} color="var(--w3-cyan)" strokeWidth={1.5} /></div>
              <h3 className="hiw-title">Connect your systems</h3>
              <p className="hiw-desc">Plug in your existing tools — ERP, e-commerce stores, warehouses, courier partners. Polluxa connects everything on one data layer in days, not months.</p>
            </div>
            <div className="hiw-connector" aria-hidden="true" />
            <div className="hiw-step">
              <div className="hiw-num" aria-hidden="true">02</div>
              <div className="hiw-icon-wrap w3-violet"><Bot size={24} color="var(--w3-violet)" strokeWidth={1.5} /></div>
              <h3 className="hiw-title">Let AI agents do the routine work</h3>
              <p className="hiw-desc">Autonomous agents monitor your business 24/7 — chasing approvals, flagging stock issues, updating CRM records, and routing tasks to the right person automatically.</p>
            </div>
            <div className="hiw-connector" aria-hidden="true" />
            <div className="hiw-step">
              <div className="hiw-num" aria-hidden="true">03</div>
              <div className="hiw-icon-wrap w3-magenta"><Rocket size={24} color="var(--w3-magenta)" strokeWidth={1.5} /></div>
              <h3 className="hiw-title">Your team focuses on growth</h3>
              <p className="hiw-desc">With agents handling the repetitive, your sales, ops, and logistics teams spend their time on customers and strategy — not spreadsheets and data entry.</p>
            </div>
          </div>
          <div className="hiw-cta reveal">
            <Link to="/contact" className="btn-primary">See a live demo →</Link>
            <Link to="/customers" className="btn-ghost">Read customer stories</Link>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          SUCCESS STORIES
      ════════════════════════════════════════ */}
      {successStories.length > 0 && (
        <section className="block" style={{ padding: '2.5rem 0' }}>
          <div className="container">
            <div className="section-head reveal">
              <div className="section-tag">Success Stories</div>
              <h2 className="section-h"><em>Success Stories.</em></h2>
              <p className="section-sub">We power change for hundreds of global brands, retailers and manufacturers through our ERP and CRM software solutions.</p>
            </div>
            <div className="grid-4" style={{ gap: '1.25rem', marginTop: '1.5rem' }}>
              {successStories.map(({ company, category, gradient, desc }, i) => (
                <Link key={company} to="/case-studies" style={{ textDecoration: 'none' }}>
                  <div className={`card reveal d${i + 1}`} style={{ padding: '0', overflow: 'hidden', height: '100%', display: 'flex', flexDirection: 'column' }}>
                    <div className="story-hdr" style={{ background: gradient || 'var(--grad-hero)' }}>
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
      )}

      <Wave color="var(--bg-2)" />

      {/* ════════════════════════════════════════
          OUR UNIQUE PROMISE
      ════════════════════════════════════════ */}
      {promises.length > 0 && (
        <section className="bg-alt" style={{ padding: '5rem 0' }}>
          <div className="container">
            <div className="section-head reveal" style={{ maxWidth: '760px' }}>
              <div className="section-tag">Our Unique Promise</div>
              <h2 className="section-h"><em>Our Unique Promise.</em></h2>
              <p className="section-sub">Your business is unique, and so should be your software. Polluxa delivers tailored ERP and CRM software solutions to streamline your processes and fuel growth.</p>
            </div>
            <div className="split-rows">
              {promises.map(({ iconName, title, desc }, i) => {
                const Icon = getIcon(iconName);
                return (
                  <div key={title} className={`split-row reveal d${i + 1}${i % 2 === 1 ? ' flip' : ''}`}>
                    <div className="split-icon-box">
                      <Icon size={32} color="var(--cyan)" strokeWidth={1.5} />
                    </div>
                    <div className="split-body">
                      <h4>{title}</h4>
                      <p>{desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      <Wave color="var(--bg)" />

      {/* ════════════════════════════════════════
          RESOURCES
      ════════════════════════════════════════ */}
      {resources.length > 0 && (
        <section className="block" style={{ padding: '5rem 0' }}>
          <div className="container">
            <div className="section-head reveal">
              <div className="section-tag">Resources</div>
              <h2 className="section-h">Shift your orbit <em>with Polluxa.</em></h2>
              <p className="section-sub">Discover how our solutions seamlessly drive success.</p>
            </div>
            <div className="grid-4" style={{ gap: '1.25rem', marginTop: '3rem' }}>
              {resources.map(({ slug, img, type, title, desc }, i) => (
                <Link key={type + title} to={slug || '/'} style={{ textDecoration: 'none' }}>
                  <div className={`card reveal d${i + 1}`} style={{ padding: '0', overflow: 'hidden', height: '100%', display: 'flex', flexDirection: 'column' }}>
                    {img && (
                      <div className="res-img">
                        <img src={img} alt={type} loading="lazy" />
                      </div>
                    )}
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
      )}

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
            <span className="eyebrow"><span className="dot" />Driving creativity in Product Development</span>
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
      {testimonials.length > 0 && (
        <section className="block" style={{ padding: '2.5rem 0' }}>
          <div className="container">
            <div className="section-head reveal">
              <div className="section-tag">Testimonials</div>
              <h2 className="section-h">What our <em>clients say.</em></h2>
            </div>
            <div className="grid-2" style={{ gap: '1.5rem', marginTop: '1.5rem' }}>
              {testimonials.map(({ quote, name, company, avatar }, i) => (
                <div key={name} className={`reveal d${i + 1}`}
                  style={{ background: 'var(--panel)', border: '1px solid var(--line-strong)', borderRadius: '1rem', padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.25rem', transition: 'transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease' }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 16px 40px rgba(0,0,0,0.3)'; e.currentTarget.style.borderColor = 'rgba(43,182,255,0.35)'; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = ''; e.currentTarget.style.borderColor = ''; }}
                >
                  <div style={{ fontSize: '3rem', lineHeight: 0.8, color: 'var(--cyan)', opacity: 0.5, fontFamily: 'Georgia, serif', userSelect: 'none' }}>"</div>
                  <p style={{ fontSize: '1rem', lineHeight: '1.75', color: 'var(--ink)', fontStyle: 'italic', flex: 1 }}>{quote}</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem', borderTop: '1px solid var(--line-strong)', paddingTop: '1.125rem' }}>
                    {avatar && <img src={avatar} alt={name} className="t-avatar" />}
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
      )}
    </>
  );
};

export default Homepage;
