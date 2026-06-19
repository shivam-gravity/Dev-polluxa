import { useState } from 'react';
import { Mail, Shield, MessageSquare, Handshake, MapPin } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    industry: '',
    interest: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear field-specific error as user types
    if (errors[name]) {
      setErrors(prev => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const sanitizeInput = (str) => {
    if (typeof str !== 'string') return '';
    return str
      .trim()
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#x27;')
      .replace(/\//g, '&#x2F;');
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};

    // Validate inputs
    const cleanFirstName = sanitizeInput(formData.firstName);
    const cleanLastName = sanitizeInput(formData.lastName);
    const cleanEmail = formData.email.trim();
    const cleanCompany = sanitizeInput(formData.company);
    const cleanMessage = sanitizeInput(formData.message);

    if (!cleanFirstName) {
      newErrors.firstName = 'First name is required.';
    } else if (cleanFirstName.length > 50) {
      newErrors.firstName = 'First name must be 50 characters or less.';
    }

    if (!cleanLastName) {
      newErrors.lastName = 'Last name is required.';
    } else if (cleanLastName.length > 50) {
      newErrors.lastName = 'Last name must be 50 characters or less.';
    }

    if (!cleanEmail) {
      newErrors.email = 'Email is required.';
    } else if (!validateEmail(cleanEmail)) {
      newErrors.email = 'Please provide a valid work email address.';
    }

    if (!cleanCompany) {
      newErrors.company = 'Company is required.';
    } else if (cleanCompany.length > 100) {
      newErrors.company = 'Company name must be 100 characters or less.';
    }

    if (!formData.industry) {
      newErrors.industry = 'Please select an industry.';
    }

    if (!formData.interest) {
      newErrors.interest = 'Please select your interest.';
    }

    if (cleanMessage.length > 1000) {
      newErrors.message = 'Message must be 1000 characters or less.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const sanitizedData = {
      firstName: cleanFirstName,
      lastName: cleanLastName,
      email: cleanEmail,
      company: cleanCompany,
      industry: formData.industry,
      interest: formData.interest,
      message: cleanMessage
    };

    console.log('Secure and sanitized form data submitted:', sanitizedData);
    setSubmitted(true);
  };

  return (
    <div className="contact-page">
      {/* Hero Header */}
      <section className="section section-light" style={{ paddingBottom: '3rem' }}>
        <div className="container" style={{ maxWidth: '800px', textAlign: 'center' }}>
          <span style={{ textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: '600', color: 'var(--color-primary-light)', display: 'block', marginBottom: '0.5rem' }}>
            We respond within 1 business day
          </span>
          <h1 className="gradient-text" style={{ fontSize: '3.75rem', fontWeight: '800', lineHeight: '1.1' }}>
            Let's talk about your platform.
          </h1>
          <p style={{ fontSize: '1.25rem', marginTop: '1.5rem', color: 'var(--color-text-secondary)' }}>
            Whether you're evaluating Polluxa, exploring partnership, hiring with us, or looking for help — fill the form below or pick the right channel. A real human answers.
          </p>
        </div>
      </section>

      {/* Form and Office/Channels grid */}
      <section className="section section-alt" style={{ paddingTop: '4rem' }}>
        <div className="container">
          <div className="grid-2" style={{ gap: '4rem' }}>
            {/* Contact Form */}
            <div style={{ background: 'var(--color-background-light)', border: '1px solid var(--color-border)', borderRadius: '1rem', padding: '2.5rem', boxShadow: 'var(--shadow-lg)' }}>
              <h3 style={{ fontSize: '1.75rem', marginBottom: '0.5rem', color: 'var(--color-primary)' }}>Book a live demo</h3>
              <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.95rem', marginBottom: '2rem' }}>
                Tell us about your business. A solution architect for your industry will reach out within one business day.
              </p>

              {submitted ? (
                <div style={{ padding: '2rem', background: 'rgba(16, 185, 129, 0.15)', border: '1px solid var(--color-success)', color: 'var(--color-success-highlight)', borderRadius: '0.5rem', textAlign: 'center', fontWeight: 'bold' }}>
                  Thank you! Our solution architect will reach out to you within 1 business day.
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: 'var(--color-text-secondary)', marginBottom: '0.35rem' }}>First Name</label>
                      <input 
                        type="text" 
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        style={{ width: '100%', padding: '0.75rem', borderRadius: '0.375rem', border: errors.firstName ? '1px solid var(--color-warning)' : '1px solid var(--color-border)', outline: 'none' }}
                      />
                      {errors.firstName && <span style={{ color: 'var(--color-warning)', fontSize: '0.75rem', marginTop: '0.25rem', display: 'block' }}>{errors.firstName}</span>}
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: 'var(--color-text-secondary)', marginBottom: '0.35rem' }}>Last Name</label>
                      <input 
                        type="text" 
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        style={{ width: '100%', padding: '0.75rem', borderRadius: '0.375rem', border: errors.lastName ? '1px solid var(--color-warning)' : '1px solid var(--color-border)', outline: 'none' }}
                      />
                      {errors.lastName && <span style={{ color: 'var(--color-warning)', fontSize: '0.75rem', marginTop: '0.25rem', display: 'block' }}>{errors.lastName}</span>}
                    </div>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: 'var(--color-text-secondary)', marginBottom: '0.35rem' }}>Work Email</label>
                    <input 
                      type="text" 
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      style={{ width: '100%', padding: '0.75rem', borderRadius: '0.375rem', border: errors.email ? '1px solid var(--color-warning)' : '1px solid var(--color-border)', outline: 'none' }}
                    />
                    {errors.email && <span style={{ color: 'var(--color-warning)', fontSize: '0.75rem', marginTop: '0.25rem', display: 'block' }}>{errors.email}</span>}
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: 'var(--color-text-secondary)', marginBottom: '0.35rem' }}>Company</label>
                    <input 
                      type="text" 
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      style={{ width: '100%', padding: '0.75rem', borderRadius: '0.375rem', border: errors.company ? '1px solid var(--color-warning)' : '1px solid var(--color-border)', outline: 'none' }}
                    />
                    {errors.company && <span style={{ color: 'var(--color-warning)', fontSize: '0.75rem', marginTop: '0.25rem', display: 'block' }}>{errors.company}</span>}
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: 'var(--color-text-secondary)', marginBottom: '0.35rem' }}>Industry</label>
                    <select 
                      name="industry"
                      value={formData.industry}
                      onChange={handleChange}
                      style={{ width: '100%', padding: '0.75rem', borderRadius: '0.375rem', border: errors.industry ? '1px solid var(--color-warning)' : '1px solid var(--color-border)', outline: 'none' }}
                    >
                      <option value="">Select industry...</option>
                      <option value="Fashion & Apparel">Fashion & Apparel</option>
                      <option value="Outdoor & Sports">Outdoor & Sports</option>
                      <option value="Multi-Category Retail">Multi-Category Retail</option>
                      <option value="Home & Furniture">Home & Furniture</option>
                      <option value="Food & Beverage">Food & Beverage</option>
                      <option value="Consumer Goods">Consumer Goods</option>
                      <option value="Cosmetics & Personal Care">Cosmetics & Personal Care</option>
                      <option value="Consumer Electronics">Consumer Electronics</option>
                      <option value="Other">Other</option>
                    </select>
                    {errors.industry && <span style={{ color: 'var(--color-warning)', fontSize: '0.75rem', marginTop: '0.25rem', display: 'block' }}>{errors.industry}</span>}
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: 'var(--color-text-secondary)', marginBottom: '0.35rem' }}>Interest</label>
                    <select 
                      name="interest"
                      value={formData.interest}
                      onChange={handleChange}
                      style={{ width: '100%', padding: '0.75rem', borderRadius: '0.375rem', border: errors.interest ? '1px solid var(--color-warning)' : '1px solid var(--color-border)', outline: 'none' }}
                    >
                      <option value="">Select interest...</option>
                      <option value="CRM">CRM (Agentic Revenue)</option>
                      <option value="Commerce">Commerce</option>
                      <option value="Creator Commerce">Creator Commerce</option>
                      <option value="PLM">PLM</option>
                      <option value="Logistics">Logistics</option>
                      <option value="WMS">WMS</option>
                      <option value="All">All / Not sure</option>
                    </select>
                    {errors.interest && <span style={{ color: 'var(--color-warning)', fontSize: '0.75rem', marginTop: '0.25rem', display: 'block' }}>{errors.interest}</span>}
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: 'var(--color-text-secondary)', marginBottom: '0.35rem' }}>Anything we should know?</label>
                    <textarea 
                      name="message"
                      rows="4"
                      value={formData.message}
                      onChange={handleChange}
                      style={{ width: '100%', padding: '0.75rem', borderRadius: '0.375rem', border: errors.message ? '1px solid var(--color-warning)' : '1px solid var(--color-border)', outline: 'none', resize: 'vertical' }}
                    ></textarea>
                    {errors.message && <span style={{ color: 'var(--color-warning)', fontSize: '0.75rem', marginTop: '0.25rem', display: 'block' }}>{errors.message}</span>}
                  </div>

                  <button type="submit" className="btn btn-primary" style={{ padding: '1rem', fontWeight: '600', marginTop: '0.5rem' }}>
                    Send · we'll reach out in 1 day
                  </button>
                </form>
              )}
            </div>

            {/* Office Locations & Info Channels */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
              {/* Channels */}
              <div>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', color: 'var(--color-primary)' }}>Direct Channels</h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                  <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                    <div style={{ background: 'var(--color-background-light)', border: '1px solid var(--color-border)', padding: '0.5rem', borderRadius: '0.375rem', color: 'var(--color-primary-light)' }}>
                      <Mail size={20} />
                    </div>
                    <div>
                      <strong style={{ display: 'block', fontSize: '0.9rem', color: 'var(--color-primary)' }}>Sales</strong>
                      <a href="mailto:hello@polluxa.com" style={{ fontSize: '0.9rem', color: 'var(--color-primary-light)' }}>hello@polluxa.com</a>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                    <div style={{ background: 'var(--color-background-light)', border: '1px solid var(--color-border)', padding: '0.5rem', borderRadius: '0.375rem', color: 'var(--color-primary-light)' }}>
                      <Handshake size={20} />
                    </div>
                    <div>
                      <strong style={{ display: 'block', fontSize: '0.9rem', color: 'var(--color-primary)' }}>Partnerships</strong>
                      <a href="mailto:partners@polluxa.com" style={{ fontSize: '0.9rem', color: 'var(--color-primary-light)' }}>partners@polluxa.com</a>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                    <div style={{ background: 'var(--color-background-light)', border: '1px solid var(--color-border)', padding: '0.5rem', borderRadius: '0.375rem', color: 'var(--color-primary-light)' }}>
                      <Shield size={20} />
                    </div>
                    <div>
                      <strong style={{ display: 'block', fontSize: '0.9rem', color: 'var(--color-primary)' }}>Support</strong>
                      <a href="mailto:support@polluxa.com" style={{ fontSize: '0.9rem', color: 'var(--color-primary-light)' }}>support@polluxa.com</a>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                    <div style={{ background: 'var(--color-background-light)', border: '1px solid var(--color-border)', padding: '0.5rem', borderRadius: '0.375rem', color: 'var(--color-primary-light)' }}>
                      <MessageSquare size={20} />
                    </div>
                    <div>
                      <strong style={{ display: 'block', fontSize: '0.9rem', color: 'var(--color-primary)' }}>Press</strong>
                      <a href="mailto:press@polluxa.com" style={{ fontSize: '0.9rem', color: 'var(--color-primary-light)' }}>press@polluxa.com</a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Offices */}
              <div>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', color: 'var(--color-primary)' }}>Offices</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  <div style={{ display: 'flex', gap: '0.75rem' }}>
                    <MapPin size={20} color="var(--color-accent-teal)" style={{ flexShrink: 0, marginTop: '0.25rem' }} />
                    <div>
                      <strong style={{ fontSize: '1rem', color: 'var(--color-primary)' }}>Bangalore · HQ</strong>
                      <p style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)', margin: '0.25rem 0 0 0' }}>Polluxa, 4th Floor, Manyata Tech Park, Hebbal, Bangalore 560045</p>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '0.75rem' }}>
                    <MapPin size={20} color="var(--color-accent-teal)" style={{ flexShrink: 0, marginTop: '0.25rem' }} />
                    <div>
                      <strong style={{ fontSize: '1rem', color: 'var(--color-primary)' }}>Mumbai</strong>
                      <p style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)', margin: '0.25rem 0 0 0' }}>Polluxa, BKC Tower 2, 14th Floor, Bandra-Kurla Complex, Mumbai 400051</p>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '0.75rem' }}>
                    <MapPin size={20} color="var(--color-accent-teal)" style={{ flexShrink: 0, marginTop: '0.25rem' }} />
                    <div>
                      <strong style={{ fontSize: '1rem', color: 'var(--color-primary)' }}>Dubai</strong>
                      <p style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)', margin: '0.25rem 0 0 0' }}>DIFC, Gate Avenue Level 5, Dubai International Financial Centre</p>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '0.75rem' }}>
                    <MapPin size={20} color="var(--color-accent-teal)" style={{ flexShrink: 0, marginTop: '0.25rem' }} />
                    <div>
                      <strong style={{ fontSize: '1rem', color: 'var(--color-primary)' }}>Riyadh</strong>
                      <p style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)', margin: '0.25rem 0 0 0' }}>Olaya Towers, Tower B, Floor 18, King Fahd Road, Riyadh</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
