
const GenericPage = ({ title }) => {
  return (
    <div className="generic-page">
      <section className="section section-light" style={{ minHeight: '60vh' }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <h1 style={{ fontSize: '3rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1.5rem', marginBottom: '2rem' }}>
            {title}
          </h1>
          <p style={{ color: 'var(--muted)', fontSize: '1.1rem', lineHeight: '1.8', marginBottom: '1.5rem' }}>
            Welcome to Polluxa's {title.toLowerCase()} page. We are committed to transparency, compliance, and excellence across all our operational frameworks.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', color: 'var(--muted)' }}>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam elementum dolor ac ante pulvinar convallis. Proin vitae hendrerit tellus. Praesent vel risus nec est hendrerit consequat ac sodales arcu. Fusce a tellus at urna pulvinar tempor.
            </p>
            <p>
              Integer convallis, leo a convallis tempor, metus lectus rhoncus massa, eget varius nisi justo eu risus. Sed sed efficitur sapien. Vivamus pulvinar lorem id urna molestie pretium. Proin luctus nunc ac augue congue placerat.
            </p>
            <p>
              Curabitur volutpat sem in augue gravida molestie. Curabitur eleifend tristique interdum. Nam iaculis at sem vitae tempor. Aliquam nec efficitur turpis. In a ante ac risus commodo dictum eget et sem.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default GenericPage;
