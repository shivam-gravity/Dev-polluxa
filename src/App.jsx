import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Homepage from './pages/Homepage';
import Pricing from './pages/Pricing';
import Agents from './pages/Agents';
import Careers from './pages/Careers';
import Blog from './pages/Blog';
import Events from './pages/Events';
import Partners from './pages/Partners';
import Customers from './pages/Customers';
import CaseStudies from './pages/CaseStudies';
import IndustryPage from './pages/IndustryPage';
import DynamicPage from './pages/DynamicPage';

/* Phase 2 note on routing shape:
   Every page that is fully driven by the generic `page` content type
   (contact, about, privacy, marketing, terms, all product pages, all
   Capabilities/Channels/Modules pages) has NO explicit route here — it
   falls through to the `*` catch-all -> DynamicPage, which fetches
   `api::page.page` by slug and renders it via the shared
   src/lib/PageRenderer.jsx SECTION_RENDERERS map.

   Two categories of route stay explicit, both documented below:
   1. Class A pages (Homepage, Pricing, Agents, Careers, Blog, Events,
      Partners, Customers, Case Studies) — these already fetch their own
      content directly from dedicated flat Strapi collections (not the
      `page` dynamic-zone system) and were explicitly kept as their own
      components rather than being rebuilt onto DynamicPage.
   2. /industry/:slug — CMS-driven (fetches api::industry.industry by
      slug, which has its own dynamic zone) but lives in a distinct URL
      namespace from flat page slugs, so it can't be folded into the
      same catch-all without special-casing DynamicPage itself. */
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Homepage />} />
          <Route path="homepage.html" element={<Homepage />} />

          {/* Class A — dedicated components, own flat-collection fetches, not CMS dynamic-zone driven */}
          <Route path="pricing" element={<Pricing />} />
          <Route path="pricing.html" element={<Pricing />} />
          <Route path="agents" element={<Agents />} />
          <Route path="agents.html" element={<Agents />} />
          <Route path="careers" element={<Careers />} />
          <Route path="blog" element={<Blog />} />
          <Route path="events" element={<Events />} />
          <Route path="partners" element={<Partners />} />
          <Route path="partners.html" element={<Partners />} />
          <Route path="customers" element={<Customers />} />
          <Route path="customers.html" element={<Customers />} />
          <Route path="case-studies" element={<CaseStudies />} />
          <Route path="case-studies.html" element={<CaseStudies />} />

          {/* CMS-driven via api::industry.industry, distinct URL namespace from flat page slugs */}
          <Route path="industry/:slug" element={<IndustryPage />} />

          {/* Legacy static multi-page-site alias — no CMS content behind /index.html itself */}
          <Route path="index.html" element={<Navigate to="/" replace />} />

          <Route path="*" element={<DynamicPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
