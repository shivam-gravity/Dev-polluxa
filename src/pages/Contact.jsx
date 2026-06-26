import { useState, useEffect } from 'react';
import { Mail, Shield, MessageSquare, Handshake, MapPin } from 'lucide-react';
import { postAPI, fetchAPI } from '../lib/api';

const ICON_MAP = { Mail, Shield, MessageSquare, Handshake };
const getIcon = (name) => ICON_MAP[name] || Mail;

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: '', lastName: '', email: '', company: '',
    industry: '', interest: '', message: '',
  });
  const [errors, setErrors]         = useState({});
  const [submitted, setSubmitted]   = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [industries, setIndustries]   = useState([]);
  const [products, setProducts]       = useState([]);
  const [offices, setOffices]         = useState([]);
  const [channels, setChannels]       = useState([]);
  const [optionsLoading, setOptionsLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      const [indRes, prodRes, offRes, chanRes] = await Promise.all([
        fetchAPI('/api/industries', { sort: 'sort_order:asc' }),
        fetchAPI('/api/products',   { sort: 'sort_order:asc' }),
        fetchAPI('/api/offices',    { sort: 'sort_order:asc' }),
        fetchAPI('/api/contact-channels', { sort: 'sort_order:asc' }),
      ]);
      if (cancelled) return;

      setIndustries((indRes?.data  || []).map(i => i.attributes.name));
      setProducts((prodRes?.data   || []).map(i => i.attributes.name));
      setOffices((offRes?.data     || []).map(i => ({
        city:    i.attributes.city,
        isHq:    i.attributes.is_hq,
        address: i.attributes.address,
      })));
      setChannels((chanRes?.data   || []).map(i => ({
        label:    i.attributes.label,
        email:    i.attributes.email,
        iconName: i.attributes.icon_name,
      })));
      setOptionsLoading(false);
    }
    load();
    return () => { cancelled = true; };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => { const n = { ...prev }; delete n[name]; return n; });
  };

  const sanitize = (str) => typeof str !== 'string' ? '' : str.trim()
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#x27;').replace(/\//g, '&#x2F;');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    const fn = sanitize(formData.firstName);
    const ln = sanitize(formData.lastName);
    const em = formData.email.trim();
    const co = sanitize(formData.company);
    const ms = sanitize(formData.message);

    if (!fn)             newErrors.firstName = 'First name is required.';
    else if (fn.length > 50) newErrors.firstName = 'First name must be 50 characters or less.';
    if (!ln)             newErrors.lastName  = 'Last name is required.';
    else if (ln.length > 50) newErrors.lastName  = 'Last name must be 50 characters or less.';
    if (!em)             newErrors.email = 'Email is required.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em)) newErrors.email = 'Please provide a valid work email address.';
    if (!co)             newErrors.company  = 'Company is required.';
    else if (co.length > 100) newErrors.company = 'Company name must be 100 characters or less.';
    if (!formData.industry) newErrors.industry = 'Please select an industry.';
    if (!formData.interest) newErrors.interest = 'Please select your interest.';
    if (ms.length > 1000)   newErrors.message  = 'Message must be 1000 characters or less.';

    if (Object.keys(newErrors).length > 0) { setErrors(newErrors); return; }
    setIsSubmitting(true);
    try {
      const response = await postAPI('/api/contact-form-submissions', {
        FirstName:    fn,
        LastName:     ln,
        PhoneNumber:  'Not provided',
        Email:        em,
        Organization: co,
        Message: `Industry: ${formData.industry}\nInterest: ${formData.interest}\n\n${ms}`,
      });
      if (!response.error) setSubmitted(true);
      else setErrors({ submit: 'Failed to submit the form. Please try again later.' });
    } catch {
      setErrors({ submit: 'An unexpected error occurred.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="contact-page">

      {/* ── Hero ── */}
      <section className="section section-light contact-hero-section">
        <div className="container" style={{ maxWidth: '800px', textAlign: 'center' }}>
          <span className="contact-hero-eyebrow">We respond within 1 business day</span>
          <h1 className="gradient-text contact-hero-h1">Let's talk about your platform.</h1>
          <p className="contact-hero-lede">
            Whether you're evaluating Polluxa, exploring partnership, hiring with us, or looking for help — fill the form below or pick the right channel. A real human answers.
          </p>
        </div>
      </section>

      {/* ── Form + Channels / Offices ── */}
      <section className="section section-alt contact-body-section">
        <div className="container">
          <div className="grid-2 contact-main-grid">

            {/* ── Contact Form ── */}
            <div className="contact-form-card" style={{ background: 'var(--panel)', border: '1px solid var(--line-strong)', borderRadius: '1rem' }}>
              <h3 style={{ fontSize: '1.75rem', marginBottom: '0.5rem', color: 'var(--ink)' }}>Book a live demo</h3>
              <p style={{ color: 'var(--muted)', fontSize: '0.95rem', marginBottom: '2rem' }}>
                Tell us about your business. A solution architect for your industry will reach out within one business day.
              </p>

              {submitted ? (
                <div style={{ padding: '2rem', background: 'rgba(16,185,129,0.12)', border: '1px solid rgba(16,185,129,0.35)', color: '#6ee7b7', borderRadius: '0.5rem', textAlign: 'center', fontWeight: 'bold' }}>
                  Thank you! Our solution architect will reach out to you within 1 business day.
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  <div className="contact-name-row">
                    <div>
                      <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: 'var(--muted)', marginBottom: '0.35rem' }}>First Name</label>
                      <input type="text" name="firstName" value={formData.firstName} onChange={handleChange}
                        className="contact-input" style={{ border: errors.firstName ? '1px solid #f87171' : undefined }} />
                      {errors.firstName && <span style={{ color: '#f87171', fontSize: '0.75rem', marginTop: '0.25rem', display: 'block' }}>{errors.firstName}</span>}
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: 'var(--muted)', marginBottom: '0.35rem' }}>Last Name</label>
                      <input type="text" name="lastName" value={formData.lastName} onChange={handleChange}
                        className="contact-input" style={{ border: errors.lastName ? '1px solid #f87171' : undefined }} />
                      {errors.lastName && <span style={{ color: '#f87171', fontSize: '0.75rem', marginTop: '0.25rem', display: 'block' }}>{errors.lastName}</span>}
                    </div>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: 'var(--muted)', marginBottom: '0.35rem' }}>Work Email</label>
                    <input type="text" name="email" value={formData.email} onChange={handleChange}
                      className="contact-input" style={{ border: errors.email ? '1px solid #f87171' : undefined }} />
                    {errors.email && <span style={{ color: '#f87171', fontSize: '0.75rem', marginTop: '0.25rem', display: 'block' }}>{errors.email}</span>}
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: 'var(--muted)', marginBottom: '0.35rem' }}>Company</label>
                    <input type="text" name="company" value={formData.company} onChange={handleChange}
                      className="contact-input" style={{ border: errors.company ? '1px solid #f87171' : undefined }} />
                    {errors.company && <span style={{ color: '#f87171', fontSize: '0.75rem', marginTop: '0.25rem', display: 'block' }}>{errors.company}</span>}
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: 'var(--muted)', marginBottom: '0.35rem' }}>Industry</label>
                    <select name="industry" value={formData.industry} onChange={handleChange}
                      className="contact-input" style={{ border: errors.industry ? '1px solid #f87171' : undefined }}
                      disabled={optionsLoading}>
                      <option value="">{optionsLoading ? 'Loading…' : 'Select industry...'}</option>
                      {industries.map(ind => <option key={ind} value={ind}>{ind}</option>)}
                    </select>
                    {errors.industry && <span style={{ color: '#f87171', fontSize: '0.75rem', marginTop: '0.25rem', display: 'block' }}>{errors.industry}</span>}
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: 'var(--muted)', marginBottom: '0.35rem' }}>Interest</label>
                    <select name="interest" value={formData.interest} onChange={handleChange}
                      className="contact-input" style={{ border: errors.interest ? '1px solid #f87171' : undefined }}
                      disabled={optionsLoading}>
                      <option value="">{optionsLoading ? 'Loading…' : 'Select interest...'}</option>
                      {products.map(p => <option key={p} value={p}>{p}</option>)}
                      <option value="All">All / Not sure</option>
                    </select>
                    {errors.interest && <span style={{ color: '#f87171', fontSize: '0.75rem', marginTop: '0.25rem', display: 'block' }}>{errors.interest}</span>}
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: 'var(--muted)', marginBottom: '0.35rem' }}>Anything we should know?</label>
                    <textarea name="message" rows="4" value={formData.message} onChange={handleChange}
                      className="contact-input contact-textarea" style={{ border: errors.message ? '1px solid #f87171' : undefined, resize: 'vertical' }} />
                    {errors.message && <span style={{ color: '#f87171', fontSize: '0.75rem', marginTop: '0.25rem', display: 'block' }}>{errors.message}</span>}
                  </div>

                  {errors.submit && <p style={{ color: '#f87171', fontSize: '0.875rem', textAlign: 'center' }}>{errors.submit}</p>}

                  <button type="submit" className="btn-primary" style={{ width: '100%', padding: '1rem', fontWeight: '600', marginTop: '0.5rem' }} disabled={isSubmitting}>
                    {isSubmitting ? 'Sending…' : "Send · we'll reach out in 1 day"}
                  </button>
                </form>
              )}
            </div>

            {/* ── Channels & Offices ── */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>

              {/* Direct channels */}
              <div>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', color: 'var(--ink)' }}>Direct Channels</h3>
                {channels.length > 0 ? (
                  <div className="contact-channels-grid">
                    {channels.map(({ label, email, iconName }) => {
                      const Icon = getIcon(iconName);
                      return (
                        <div key={label} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                          <div style={{ background: 'var(--panel)', border: '1px solid var(--line)', padding: '0.5rem', borderRadius: '0.375rem', color: 'var(--cyan)', flexShrink: 0 }}>
                            <Icon size={20} />
                          </div>
                          <div>
                            <strong style={{ display: 'block', fontSize: '0.9rem', color: 'var(--ink)' }}>{label}</strong>
                            <a href={`mailto:${email}`} style={{ fontSize: '0.9rem', color: 'var(--cyan)' }}>{email}</a>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  !optionsLoading && (
                    <p style={{ color: 'var(--muted)', fontSize: '0.9rem' }}>Channel information not available.</p>
                  )
                )}
              </div>

              {/* Offices */}
              <div>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', color: 'var(--ink)' }}>Offices</h3>
                {offices.length > 0 ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    {offices.map(({ city, isHq, address }) => (
                      <div key={city} style={{ display: 'flex', gap: '0.75rem' }}>
                        <MapPin size={20} color="var(--cyan)" style={{ flexShrink: 0, marginTop: '0.25rem' }} />
                        <div>
                          <strong style={{ fontSize: '1rem', color: 'var(--ink)' }}>
                            {city}{isHq ? ' · HQ' : ''}
                          </strong>
                          <p style={{ fontSize: '0.9rem', color: 'var(--muted)', margin: '0.25rem 0 0 0' }}>{address}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  !optionsLoading && (
                    <p style={{ color: 'var(--muted)', fontSize: '0.9rem' }}>Office information not available.</p>
                  )
                )}
              </div>

            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Contact;
