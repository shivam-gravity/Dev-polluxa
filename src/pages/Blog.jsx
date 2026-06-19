import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const posts = [
  { title: 'What is CRM? and How its Helpful for Business?', category: 'Product', date: 'Apr 15, 2025', read: '5 min read', desc: 'A complete guide to Customer Relationship Management — what it is, how it works, and why modern businesses can\'t scale without a CRM platform built for their team.' },
  { title: 'What is PLM? A complete Guide to Product Lifecycle Management', category: 'Product', date: 'Apr 10, 2025', read: '6 min read', desc: 'From concept to shelf: understand how PLM software helps brands reduce time-to-market, streamline vendor management, and improve product quality across the supply chain.' },
  { title: 'The Future of Influencer Marketing: Trends to Watch', category: 'Industry', date: 'Mar 28, 2025', read: '4 min read', desc: 'As creator commerce grows, the influencer-brand relationship is being reinvented. Here are the key shifts brands need to prepare for in 2025 and beyond.' },
  { title: 'Why Digital Location Management Matters More than Ever', category: 'Industry', date: 'Mar 20, 2025', read: '5 min read', desc: 'Customers expect accurate business info everywhere — Google, Maps, directories. Discover why location data consistency is now a critical competitive advantage.' },
  { title: 'Autonomous Logistics Intelligence: The Future of Modern Fulfillment', category: 'Engineering', date: 'Mar 12, 2025', read: '7 min read', desc: 'AI-driven logistics platforms are replacing manual dispatching. Explore how autonomous intelligence improves route decisions, reduces cost, and speeds up last-mile delivery.' },
  { title: 'Enterprise Commerce Trends 2025', category: 'Industry', date: 'Feb 25, 2025', read: '6 min read', desc: '2025 marks a turning point for enterprise commerce — agentic AI, unified platforms, and real-time inventory are setting the new standard for omnichannel retailers.' },
  { title: '2025 Trends: Creator Commerce', category: 'Industry', date: 'Feb 15, 2025', read: '4 min read', desc: 'Creators are building billion-dollar brands. We unpack the 2025 creator commerce trends shaping how brands collaborate with influencers, manage drops, and drive DTC revenue.' },
  { title: 'Top 5 Benefits of Agentic AI for Retailers!', category: 'Product', date: 'Feb 5, 2025', read: '5 min read', desc: 'Agentic AI doesn\'t just automate tasks — it reasons, plans, and executes end-to-end. Here are the five biggest gains enterprise retailers see when they deploy agentic systems.' },
  { title: 'Understanding the Basics of Commerce', category: 'Product', date: 'Jan 28, 2025', read: '4 min read', desc: 'What does modern commerce actually mean for enterprises? A breakdown of unified commerce fundamentals — from inventory to checkout to post-purchase — and how to get started.' },
  { title: 'Top Commerce Platforms for Enterprises in 2025', category: 'Industry', date: 'Jan 20, 2025', read: '6 min read', desc: 'We reviewed 12 enterprise commerce platforms. Here\'s how they stack up on scalability, integrations, AI features, and total cost of ownership for mid-market and enterprise buyers.' },
  { title: 'Agentic AI: The Future of Work is Here', category: 'Engineering', date: 'Jan 10, 2025', read: '8 min read', desc: 'Agentic AI is no longer a research concept — it\'s live in enterprise systems today. Learn what sets agentic AI apart from traditional automation and why it changes everything.' },
  { title: 'Top 5 Benefits of CRM for Businesses in 2025', category: 'Product', date: 'Dec 20, 2024', read: '5 min read', desc: 'From pipeline management to automated follow-ups, here are the five CRM capabilities that are delivering the most measurable ROI for businesses of all sizes in 2025.' },
  { title: 'What is Reverse Logistics? A Complete Guide', category: 'Industry', date: 'Dec 12, 2024', read: '6 min read', desc: 'Returns management is now a competitive differentiator. This guide covers the full reverse logistics lifecycle — from customer return to restocking — and how to do it profitably.' },
  { title: 'How to Build a Successful DTC Brand in 2025', category: 'Industry', date: 'Dec 5, 2024', read: '7 min read', desc: 'Direct-to-consumer brands that win in 2025 combine creator partnerships, first-party data, and tech stacks built for speed. Here\'s the blueprint.' },
  { title: 'Warehouse Management: The Complete Guide', category: 'Product', date: 'Nov 25, 2024', read: '8 min read', desc: 'A comprehensive walkthrough of modern warehouse management — from inbound to fulfilment — including how scan-based WMS drives 99% accuracy at enterprise scale.' },
  { title: 'What is BOPIS and Why it Matters for Retail?', category: 'Industry', date: 'Nov 15, 2024', read: '4 min read', desc: 'Buy Online, Pick Up In Store (BOPIS) is now expected by shoppers — not just a nice-to-have. Learn how to implement it operationally and what it takes to do it well.' },
  { title: '5 Strategies to Scale Your eCommerce Brand', category: 'Industry', date: 'Nov 5, 2024', read: '5 min read', desc: 'Growing an eCommerce business past $10M requires more than more ad spend. Here are the five operational and tech strategies that actually move the needle at scale.' },
  { title: 'The Rise of the Multi-Channel Seller', category: 'Industry', date: 'Oct 22, 2024', read: '5 min read', desc: 'Selling across Amazon, Shopify, social commerce, and your own website creates complexity — unless you unify on one platform. Learn how multi-channel sellers are winning.' },
  { title: 'AI in Supply Chain: What to Expect in 2025', category: 'Engineering', date: 'Oct 12, 2024', read: '7 min read', desc: 'AI is being applied across forecasting, routing, risk detection, and supplier negotiation. Here\'s the supply chain AI landscape heading into 2025 and which use cases are ready.' },
  { title: 'Building a Winning Vendor Management Strategy', category: 'Product', date: 'Oct 5, 2024', read: '5 min read', desc: 'Your vendor ecosystem is a competitive asset. Learn how enterprise PLM-integrated vendor portals cut lead times and improve product quality at source.' },
  { title: 'Omnichannel Commerce: From Buzzword to Blueprint', category: 'Industry', date: 'Sep 20, 2024', read: '6 min read', desc: 'Omnichannel isn\'t about being everywhere — it\'s about unified data and seamless experience. Here\'s the practical blueprint for building it without starting from scratch.' },
  { title: 'How Polluxa Helped a D2C Brand 10x Its Operations', category: 'Case Study', date: 'Sep 10, 2024', read: '6 min read', desc: 'A leading fashion-first D2C brand consolidated WMS, logistics, and CRM onto Polluxa — and doubled fulfilment capacity within 90 days. Here\'s the story.' },
];

const categories = ['All', 'Product', 'Industry', 'Engineering', 'Case Study'];

const Blog = () => (
  <div className="blog-page">
    <section className="section section-light" style={{ paddingBottom: '4rem' }}>
      <div className="container" style={{ maxWidth: '900px', textAlign: 'center' }}>
        <span style={{ textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: '600', color: 'var(--accent-color)' }}>Resources</span>
        <h1 style={{ fontSize: '3.75rem', fontWeight: '800', lineHeight: '1.1', marginTop: '0.5rem' }}>
          The Polluxa <em>Blog.</em>
        </h1>
        <p style={{ fontSize: '1.25rem', marginTop: '1.5rem', color: 'var(--muted)', lineHeight: '1.6' }}>
          Insights on agentic AI, enterprise commerce, supply chain, creator economy, and the future of work.
        </p>
        <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', marginTop: '2.5rem', flexWrap: 'wrap' }}>
          {categories.map((cat) => (
            <button key={cat} style={{ padding: '0.4rem 1.125rem', borderRadius: '999px', border: '1px solid var(--line-strong)', background: cat === 'All' ? 'var(--primary-color)' : 'transparent', color: cat === 'All' ? '#fff' : 'var(--ink)', cursor: 'pointer', fontSize: '0.875rem', fontWeight: '600' }}>{cat}</button>
          ))}
        </div>
      </div>
    </section>

    <section className="section section-alt">
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '1.5rem' }}>
          {posts.map(({ title, category, date, read, desc }) => (
            <div key={title} className="card" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--accent-color)', background: 'var(--panel-2)', padding: '0.2rem 0.6rem', borderRadius: '4px' }}>{category}</span>
                <span style={{ fontSize: '0.75rem', color: 'var(--muted)' }}>{read}</span>
              </div>
              <h4 style={{ fontSize: '1.0625rem', lineHeight: '1.45', margin: 0 }}>{title}</h4>
              <p style={{ fontSize: '0.875rem', color: 'var(--muted)', lineHeight: '1.6', flex: 1 }}>{desc}</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto', paddingTop: '0.75rem', borderTop: '1px solid var(--line-strong)' }}>
                <span style={{ fontSize: '0.8rem', color: 'var(--muted)' }}>{date}</span>
                <a href="#" style={{ fontSize: '0.875rem', fontWeight: '600', color: 'var(--primary-color)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>Read <ArrowRight size={14} /></a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="section section-light" style={{ borderTop: '1px solid var(--border-color)' }}>
      <div className="container" style={{ textAlign: 'center', maxWidth: '600px' }}>
        <h2>Stay ahead of the <em>curve.</em></h2>
        <p style={{ color: 'var(--muted)', marginBottom: '2rem' }}>Get the latest insights on agentic AI, commerce, and enterprise operations — delivered to your inbox.</p>
        <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <input type="email" placeholder="Your work email" style={{ padding: '0.75rem 1rem', borderRadius: '0.5rem', border: '1px solid var(--line-strong)', background: 'var(--panel)', color: 'var(--ink)', fontSize: '0.95rem', minWidth: '260px' }} />
          <Link to="/contact" className="btn btn-primary" style={{ padding: '0.75rem 1.5rem' }}>Subscribe <ArrowRight size={16} className="btn-icon" /></Link>
        </div>
      </div>
    </section>
  </div>
);

export default Blog;
