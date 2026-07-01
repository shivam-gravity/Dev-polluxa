import { useState, useEffect } from 'react';
import { ArrowRight, Clock, Calendar, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import { fetchAPI } from '../lib/api';
import { useSeoEffect } from '../lib/seo';

const SkeletonCard = () => (
  <div className="blog-card blog-card-skeleton" aria-hidden="true">
    <div className="blog-card-meta">
      <span className="skel skel-tag" />
      <span className="skel skel-read" />
    </div>
    <div className="skel skel-title" />
    <div className="skel skel-title skel-title-short" />
    <div className="skel skel-body" />
    <div className="skel skel-body" />
    <div className="skel skel-body skel-body-short" />
    <div className="blog-card-footer">
      <span className="skel skel-date" />
    </div>
  </div>
);

const Blog = () => {
  const [posts, setPosts]               = useState([]);
  const [categories, setCategories]     = useState(['All']);
  const [loading, setLoading]           = useState(true);
  const [error, setError]               = useState(false);
  const [activeCategory, setActiveCategory] = useState('All');
  const [search, setSearch]             = useState('');
  const [subEmail, setSubEmail]         = useState('');
  const [subDone, setSubDone]           = useState(false);

  useSeoEffect(
    { metaTitle: 'Blog — Polluxa', metaDescription: 'Practical insights on enterprise software, supply chain, creator commerce, and the future of AI-driven operations.' },
    'Blog — Polluxa'
  );

  useEffect(() => {
    let cancelled = false;
    async function loadBlog() {
      try {
        const [articlesRes, catsRes] = await Promise.all([
          fetchAPI('/api/articles', { populate: '*', sort: 'publishedAt:desc' }),
          fetchAPI('/api/blog-categories', { sort: 'sort_order:asc' }),
        ]);
        if (cancelled) return;

        if (articlesRes?.data?.length > 0) {
          setPosts(articlesRes.data.map(item => ({
            title:    item.attributes.title,
            category: item.attributes.category?.data?.attributes?.name || 'General',
            date:     new Date(item.attributes.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
            read:     item.attributes.read_time || '5 min read',
            desc:     item.attributes.description,
            slug:     item.attributes.slug,
          })));
        }

        if (catsRes?.data?.length > 0) {
          setCategories(['All', ...catsRes.data.map(c => c.attributes.name)]);
        }
      } catch {
        if (!cancelled) setError(true);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    loadBlog();
    return () => { cancelled = true; };
  }, []);

  const displayPosts = posts
    .filter(p => activeCategory === 'All' || p.category === activeCategory)
    .filter(p => !search || p.title.toLowerCase().includes(search.toLowerCase()) || p.desc?.toLowerCase().includes(search.toLowerCase()));

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!subEmail.trim()) return;
    setSubDone(true);
  };

  return (
    <div className="blog-page">

      {/* ── Hero ── */}
      <section className="section section-light blog-hero-section">
        <div className="container blog-hero-inner">
          <span className="section-tag">Resources</span>
          <h1 className="blog-hero-h1">
            The Polluxa <em>Blog.</em>
          </h1>
          <p className="blog-hero-lede">
            Practical insights on enterprise software, supply chain, creator commerce, and the future of AI-driven operations.
          </p>

          <div className="blog-search-wrap">
            <Search size={16} className="blog-search-icon" aria-hidden="true" />
            <input
              type="search"
              className="blog-search-input"
              placeholder="Search articles…"
              value={search}
              onChange={e => setSearch(e.target.value)}
              aria-label="Search blog articles"
            />
          </div>

          {categories.length > 1 && (
            <div className="blog-cats" role="group" aria-label="Filter by category">
              {categories.map(cat => (
                <button
                  key={cat}
                  className={`blog-cat-btn${activeCategory === cat ? ' active' : ''}`}
                  onClick={() => setActiveCategory(cat)}
                  aria-pressed={activeCategory === cat}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      {error && !loading && (
        <div className="blog-notice" role="alert">
          Could not reach the articles API. Please try again later.
        </div>
      )}

      {/* ── Posts grid ── */}
      <section className="section section-alt blog-posts-section">
        <div className="container">
          {loading ? (
            <div className="blog-grid">
              {[1, 2, 3, 4, 5, 6].map(i => <SkeletonCard key={i} />)}
            </div>
          ) : displayPosts.length === 0 ? (
            <div className="blog-empty">
              {posts.length === 0 ? (
                <p>No articles published yet — check back soon.</p>
              ) : (
                <>
                  <p>No articles found{search ? ` for "${search}"` : ' in this category'}.</p>
                  <button className="blog-cat-btn active" onClick={() => { setActiveCategory('All'); setSearch(''); }}>
                    Clear filters
                  </button>
                </>
              )}
            </div>
          ) : (
            <div className="blog-grid">
              {displayPosts.map(({ title, category, date, read, desc, slug }) => (
                <article key={title} className="blog-card">
                  <div className="blog-card-meta">
                    <span className={`blog-cat-tag blog-cat-${category.toLowerCase().replace(/\s+/g, '-')}`}>
                      {category}
                    </span>
                    <span className="blog-read-time">
                      <Clock size={12} aria-hidden="true" /> {read}
                    </span>
                  </div>
                  <h2 className="blog-card-title">{title}</h2>
                  <p className="blog-card-desc">{desc}</p>
                  <div className="blog-card-footer">
                    <span className="blog-card-date">
                      <Calendar size={12} aria-hidden="true" /> {date}
                    </span>
                    <Link
                      to={slug ? `/blog/${slug}` : '/contact'}
                      className="blog-card-link"
                      aria-label={`Read: ${title}`}
                    >
                      Read <ArrowRight size={13} aria-hidden="true" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}

          {!loading && displayPosts.length > 0 && (
            <p className="blog-count">
              Showing {displayPosts.length} article{displayPosts.length !== 1 ? 's' : ''}
              {activeCategory !== 'All' ? ` in ${activeCategory}` : ''}
              {search ? ` matching "${search}"` : ''}
            </p>
          )}
        </div>
      </section>

      {/* ── Newsletter ── */}
      <section className="section section-light blog-newsletter-section">
        <div className="container blog-newsletter-inner">
          <h2>Stay ahead of the <em>curve.</em></h2>
          <p className="blog-newsletter-sub">
            New insights every week — enterprise AI, commerce, and supply chain. No spam.
          </p>
          {subDone ? (
            <div className="blog-sub-success" role="status">
              You're subscribed! We'll send the next article straight to your inbox.
            </div>
          ) : (
            <form className="blog-sub-form" onSubmit={handleSubscribe} aria-label="Newsletter subscription">
              <input
                type="email"
                className="blog-sub-input"
                placeholder="Your work email"
                value={subEmail}
                onChange={e => setSubEmail(e.target.value)}
                required
                autoComplete="email"
                aria-label="Work email address"
              />
              <button type="submit" className="btn-primary blog-sub-btn">
                Subscribe <ArrowRight size={15} aria-hidden="true" />
              </button>
            </form>
          )}
        </div>
      </section>

    </div>
  );
};

export default Blog;
