const PrivacyPolicy = () => (
  <div className="privacy-page">
    <section className="section section-light" style={{ paddingBottom: '3rem' }}>
      <div className="container" style={{ maxWidth: '800px' }}>
        <span style={{ textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: '600', color: 'var(--accent-color)' }}>Legal</span>
        <h1 style={{ fontSize: '3rem', fontWeight: '800', lineHeight: '1.1', marginTop: '0.5rem', borderBottom: '1px solid var(--line-strong)', paddingBottom: '1.5rem', marginBottom: '0.5rem' }}>
          Privacy Policy
        </h1>
        <p style={{ color: 'var(--muted)', fontSize: '0.9rem' }}>Last updated: June 1, 2026</p>
      </div>
    </section>

    <section className="section-light" style={{ paddingBottom: '5rem' }}>
      <div className="container" style={{ maxWidth: '800px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem', color: 'var(--muted)', lineHeight: '1.8', fontSize: '1rem' }}>

          <div>
            <h3 style={{ color: 'var(--ink)', marginBottom: '0.75rem' }}>1. Introduction</h3>
            <p>Polluxa Technologies Pvt Ltd ("Polluxa", "we", "us", or "our") respects your privacy and is committed to protecting your personal data. This Privacy Policy explains how we collect, use, disclose and safeguard your information when you visit our website polluxa.com or use any of our services.</p>
          </div>

          <div>
            <h3 style={{ color: 'var(--ink)', marginBottom: '0.75rem' }}>2. Information We Collect</h3>
            <p style={{ marginBottom: '0.75rem' }}>We collect information you provide directly, information we collect automatically, and information from third parties.</p>
            <p style={{ marginBottom: '0.75rem' }}><strong style={{ color: 'var(--ink)' }}>Information you provide:</strong> Name, email address, company name, phone number, payment information, and any communications you send us including enquiry forms, demo requests, and support tickets.</p>
            <p style={{ marginBottom: '0.75rem' }}><strong style={{ color: 'var(--ink)' }}>Information collected automatically:</strong> IP address, browser type, operating system, referring URLs, page views, access times, and other usage information collected through cookies and similar technologies.</p>
            <p><strong style={{ color: 'var(--ink)' }}>Information from third parties:</strong> We may receive information about you from analytics providers, advertising networks, and publicly available sources to supplement the information you provide.</p>
          </div>

          <div>
            <h3 style={{ color: 'var(--ink)', marginBottom: '0.75rem' }}>3. How We Use Your Information</h3>
            <p>We use the information we collect to:</p>
            <ul style={{ paddingLeft: '1.5rem', marginTop: '0.75rem' }}>
              <li style={{ marginBottom: '0.5rem' }}>Provide, maintain and improve our services</li>
              <li style={{ marginBottom: '0.5rem' }}>Process transactions and send related information</li>
              <li style={{ marginBottom: '0.5rem' }}>Send promotional communications, including product updates, newsletters and event invitations (with your consent where required)</li>
              <li style={{ marginBottom: '0.5rem' }}>Respond to comments, questions and customer service requests</li>
              <li style={{ marginBottom: '0.5rem' }}>Monitor and analyse trends, usage and activities in connection with our services</li>
              <li style={{ marginBottom: '0.5rem' }}>Detect, investigate and prevent fraudulent transactions and other illegal activities</li>
              <li>Comply with legal obligations</li>
            </ul>
          </div>

          <div>
            <h3 style={{ color: 'var(--ink)', marginBottom: '0.75rem' }}>4. Sharing of Information</h3>
            <p style={{ marginBottom: '0.75rem' }}>We do not sell, rent or trade your personal information to third parties for their marketing purposes. We may share your information:</p>
            <ul style={{ paddingLeft: '1.5rem', marginTop: '0.75rem' }}>
              <li style={{ marginBottom: '0.5rem' }}>With service providers who assist us in operating our website and conducting our business, subject to confidentiality obligations</li>
              <li style={{ marginBottom: '0.5rem' }}>With partners where you have consented to such sharing</li>
              <li style={{ marginBottom: '0.5rem' }}>In connection with, or during negotiations of, any merger, sale of company assets, financing or acquisition</li>
              <li>In response to a request for information if we believe disclosure is required by law, regulation or legal process</li>
            </ul>
          </div>

          <div>
            <h3 style={{ color: 'var(--ink)', marginBottom: '0.75rem' }}>5. Cookies and Tracking Technologies</h3>
            <p>We use cookies, web beacons and similar tracking technologies to track activity on our website and hold certain information. Cookies are files with a small amount of data that may include an anonymous unique identifier. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our service.</p>
          </div>

          <div>
            <h3 style={{ color: 'var(--ink)', marginBottom: '0.75rem' }}>6. Data Security</h3>
            <p>We implement commercially reasonable security measures to protect your personal information from accidental or unlawful destruction, loss, alteration, unauthorised disclosure or access. Polluxa is SOC 2 Type II certified and complies with ISO 27001. However, no method of transmission over the Internet or electronic storage is 100% secure. We cannot guarantee absolute security.</p>
          </div>

          <div>
            <h3 style={{ color: 'var(--ink)', marginBottom: '0.75rem' }}>7. Data Retention</h3>
            <p>We retain your personal information for as long as necessary to fulfil the purposes for which it was collected, including for the purposes of satisfying any legal, accounting, or reporting requirements. To determine the appropriate retention period, we consider the amount, nature and sensitivity of the personal data, the potential risk of harm from unauthorised use or disclosure, and the applicable legal requirements.</p>
          </div>

          <div>
            <h3 style={{ color: 'var(--ink)', marginBottom: '0.75rem' }}>8. Your Rights</h3>
            <p style={{ marginBottom: '0.75rem' }}>Depending on your jurisdiction, you may have the following rights with respect to your personal data:</p>
            <ul style={{ paddingLeft: '1.5rem', marginTop: '0.75rem' }}>
              <li style={{ marginBottom: '0.5rem' }}>The right to access and receive a copy of the personal information we hold about you</li>
              <li style={{ marginBottom: '0.5rem' }}>The right to request correction or deletion of your personal information</li>
              <li style={{ marginBottom: '0.5rem' }}>The right to object to or restrict our processing of your personal information</li>
              <li style={{ marginBottom: '0.5rem' }}>The right to data portability</li>
              <li>The right to withdraw consent at any time where we rely on consent to process your information</li>
            </ul>
            <p style={{ marginTop: '0.75rem' }}>To exercise any of these rights, please contact us at <a href="mailto:privacy@polluxa.com" style={{ color: 'var(--cyan)' }}>privacy@polluxa.com</a>.</p>
          </div>

          <div>
            <h3 style={{ color: 'var(--ink)', marginBottom: '0.75rem' }}>9. International Transfers</h3>
            <p>Your information may be transferred to and maintained on servers located outside your state, province, country or other governmental jurisdiction where the data protection laws may differ from those of your jurisdiction. If you are located outside India and choose to provide information to us, please note that we transfer the data, including personal data, to India and process it there.</p>
          </div>

          <div>
            <h3 style={{ color: 'var(--ink)', marginBottom: '0.75rem' }}>10. Children's Privacy</h3>
            <p>Our services are not directed to individuals under the age of 18. We do not knowingly collect personal information from children under 18. If we become aware that a child under 18 has provided us with personal information, we will take steps to delete such information.</p>
          </div>

          <div>
            <h3 style={{ color: 'var(--ink)', marginBottom: '0.75rem' }}>11. Changes to This Policy</h3>
            <p>We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date. You are advised to review this Privacy Policy periodically for any changes.</p>
          </div>

          <div>
            <h3 style={{ color: 'var(--ink)', marginBottom: '0.75rem' }}>12. Contact Us</h3>
            <p>If you have any questions about this Privacy Policy, please contact our Data Protection Officer at:</p>
            <div style={{ marginTop: '1rem', background: 'var(--panel)', border: '1px solid var(--line-strong)', borderRadius: '0.5rem', padding: '1.5rem' }}>
              <p style={{ margin: '0 0 0.25rem' }}><strong style={{ color: 'var(--ink)' }}>Polluxa Technologies Pvt Ltd</strong></p>
              <p style={{ margin: '0 0 0.25rem' }}>4th Floor, Manyata Tech Park, Hebbal, Bangalore 560045, India</p>
              <p style={{ margin: '0 0 0.25rem' }}>Email: <a href="mailto:privacy@polluxa.com" style={{ color: 'var(--cyan)' }}>privacy@polluxa.com</a></p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
);

export default PrivacyPolicy;
