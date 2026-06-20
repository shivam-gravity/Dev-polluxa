import { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { fetchAPI } from '../lib/api';

const categories = ['All', 'Product', 'Industry', 'Engineering', 'Case Study'];

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPosts() {
      try {
        const response = await fetchAPI('/api/articles', {
          populate: '*',
          sort: 'publishedAt:desc',
        });
        if (response && response.data && response.data.length > 0) {
          const apiPosts = response.data.map(item => ({
            title: item.attributes.title,
            category: item.attributes.category?.data?.attributes?.name || 'General',
            date: new Date(item.attributes.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
            read: '5 min read',
            desc: item.attributes.description,
            slug: item.attributes.slug,
          }));
          setPosts(apiPosts);
        }
      } catch (error) {
        console.error('Failed to load posts', error);
      } finally {
        setLoading(false);
      }
    }
    loadPosts();
  }, []);

  return (
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
};

export default Blog;
