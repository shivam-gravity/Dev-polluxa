import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const WMS = () => {
  return (
    <div className="wms-page">
      {/* Hero */}
      <section className="section section-light" style={{ paddingBottom: '3rem' }}>
        <div className="container" style={{ textAlign: 'center', maxWidth: '900px' }}>
          <span style={{ textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: '600', color: 'var(--accent-color)' }}>Warehouse Management</span>
          <h1 style={{ fontSize: '3.75rem', fontWeight: '800', lineHeight: '1.1', marginTop: '0.5rem' }}>
            Unprecedented Growth. <em>Fully Customized.</em>
          </h1>
          <p style={{ fontSize: '1.25rem', marginTop: '1.5rem', color: 'var(--muted)', lineHeight: '1.6' }}>
            Increase fulfilment rates and view your whole inventory across all sales channels by streamlining warehouse operations. Order inventory syncs in a matter of seconds.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '2.5rem', flexWrap: 'wrap' }}>
            <Link to="/contact" className="btn btn-primary" style={{ padding: '1rem 2rem', fontSize: '1.125rem' }}>
              Book a live demo <ArrowRight size={18} className="btn-icon" />
            </Link>
            <Link to="/customers" className="btn btn-secondary" style={{ padding: '1rem 2rem', fontSize: '1.125rem' }}>
              Read customer stories
            </Link>
          </div>
        </div>
      </section>

      {/* Key Metrics */}
      <section className="section section-alt" style={{ padding: '3rem 0' }}>
        <div className="container">
          <div className="grid-4" style={{ textAlign: 'center' }}>
            <div>
              <h3 style={{ fontSize: '2.5rem', color: 'var(--primary-color)', marginBottom: '0.25rem' }}>100%</h3>
              <p style={{ color: 'var(--muted)', fontWeight: '500' }}>Scan-based error-proof ops</p>
            </div>
            <div>
              <h3 style={{ fontSize: '2.5rem', color: 'var(--primary-color)', marginBottom: '0.25rem' }}>25-30%</h3>
              <p style={{ color: 'var(--muted)', fontWeight: '500' }}>Reduction in manpower cost</p>
            </div>
            <div>
              <h3 style={{ fontSize: '2.5rem', color: 'var(--primary-color)', marginBottom: '0.25rem' }}>100%</h3>
              <p style={{ color: 'var(--muted)', fontWeight: '500' }}>Right first time operations</p>
            </div>
            <div>
              <h3 style={{ fontSize: '2.5rem', color: 'var(--primary-color)', marginBottom: '0.25rem' }}>99.0%</h3>
              <p style={{ color: 'var(--muted)', fontWeight: '500' }}>Bin-level inventory accuracy</p>
            </div>
          </div>
        </div>
      </section>

      {/* Live dashboard mock */}
      <section className="section section-light">
        <div className="container" style={{ maxWidth: '720px' }}>
          <div style={{ background: 'var(--panel)', border: '1px solid var(--color-border)', borderRadius: '1rem', padding: '2rem', boxShadow: 'var(--shadow-md)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--color-border)', paddingBottom: '0.75rem', marginBottom: '1.5rem' }}>
              <strong>Floor · MUM-WH-02</strong>
              <span style={{ background: '#dcfce7', color: '#16a34a', padding: '0.2rem 0.6rem', borderRadius: '999px', fontSize: '0.75rem', fontWeight: 'bold' }}>Live</span>
            </div>
            <div className="grid-3" style={{ gap: '1rem' }}>
              <div style={{ background: 'var(--panel-2)', padding: '1rem', borderRadius: '0.5rem' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--muted)', display: 'block' }}>Wave W-2418</span>
                <strong>142 orders</strong>
              </div>
              <div style={{ background: 'var(--panel-2)', padding: '1rem', borderRadius: '0.5rem' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--muted)', display: 'block' }}>Active Pickers</span>
                <strong>14 · 12 zones</strong>
              </div>
              <div style={{ background: 'var(--panel-2)', padding: '1rem', borderRadius: '0.5rem' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--muted)', display: 'block' }}>Avg Picks/Hour</span>
                <strong>96</strong>
              </div>
              <div style={{ background: 'var(--panel-2)', padding: '1rem', borderRadius: '0.5rem' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--muted)', display: 'block' }}>Accuracy (30d)</span>
                <strong style={{ color: '#16a34a' }}>99.97%</strong>
              </div>
              <div style={{ background: 'var(--panel-2)', padding: '1rem', borderRadius: '0.5rem', gridColumn: 'span 2' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--muted)', display: 'block' }}>Critical Stock-outs</span>
                <strong style={{ color: '#16a34a' }}>0 SKUs</strong>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6 Core Features */}
      <section className="section section-alt">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <span style={{ textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: '600', color: 'var(--accent-color)' }}>Features</span>
            <h2 style={{ marginTop: '0.5rem' }}>Six modules. <em>One warehouse brain.</em></h2>
          </div>
          <div className="grid-3">
            <div className="card">
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📊</div>
              <h4>Prioritization</h4>
              <p style={{ fontSize: '0.95rem', color: 'var(--muted)' }}>
                Smart order ranking and scheduling. Prioritize orders using real-time rules to process urgent or complex tasks faster and more efficiently.
              </p>
            </div>
            <div className="card">
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🔍</div>
              <h4>Traceability</h4>
              <p style={{ fontSize: '0.95rem', color: 'var(--muted)' }}>
                Full supply-chain visibility. Monitor every item across inbound, picking, packing, and dispatch for complete operational visibility.
              </p>
            </div>
            <div className="card">
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🔗</div>
              <h4>Integration</h4>
              <p style={{ fontSize: '0.95rem', color: 'var(--muted)' }}>
                Connect with core business systems. Connect WMS with ERP, CRM, and logistics tools for unified data flow and coordinated operations.
              </p>
            </div>
            <div className="card">
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🔄</div>
              <h4>Rotation</h4>
              <p style={{ fontSize: '0.95rem', color: 'var(--muted)' }}>
                Efficient stock rotation strategies. Apply FIFO and FEFO methods to improve stock turnover, reduce waste, and maintain product quality.
              </p>
            </div>
            <div className="card">
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📈</div>
              <h4>Scalability</h4>
              <p style={{ fontSize: '0.95rem', color: 'var(--muted)' }}>
                Grow without constraints. Handle rising order volumes and expanding warehouse needs with a flexible, scalable WMS built for enterprise growth.
              </p>
            </div>
            <div className="card">
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🗺️</div>
              <h4>Routing</h4>
              <p style={{ fontSize: '0.95rem', color: 'var(--muted)' }}>
                Intelligent order-to-warehouse assignment. Automatically assign orders to the optimal warehouse based on location, stock, and delivery goals.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section section-light" style={{ borderTop: '1px solid var(--border-color)' }}>
        <div className="container" style={{ textAlign: 'center', maxWidth: '800px' }}>
          <h2>30-minute live demo on data that looks like yours.</h2>
          <p style={{ color: 'var(--muted)', marginBottom: '2.5rem' }}>
            We'll run Polluxa WMS on a replica of your warehouse profile — SKU counts, order volume, channel mix — so the demo is real.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <Link to="/contact" className="btn btn-primary" style={{ padding: '1rem 2rem', fontSize: '1.125rem' }}>
              Book demo <ArrowRight size={18} className="btn-icon" />
            </Link>
            <Link to="/customers" className="btn btn-secondary" style={{ padding: '1rem 2rem', fontSize: '1.125rem' }}>
              Read Licious story
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WMS;
