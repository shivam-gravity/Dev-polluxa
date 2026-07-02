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
import ProductPage from './pages/ProductPage';
import PageRenderer from './lib/PageRenderer';

/* Phase 2 note on routing shape:
   Every page that is fully driven by the generic `page` content type
   (contact, about, privacy, marketing, terms, all Capabilities/Channels/
   Modules pages) has NO explicit route here — it falls through to the `*`
   catch-all -> DynamicPage, which fetches `api::page.page` by slug and
   renders it via the shared src/lib/PageRenderer.jsx SECTION_RENDERERS map.

   Three categories of route stay explicit, all documented below:
   1. Class A pages (Homepage, Pricing, Agents, Careers, Blog, Events,
      Partners, Customers, Case Studies) — these already fetch their own
      content directly from dedicated flat Strapi collections (not the
      `page` dynamic-zone system) and were explicitly kept as their own
      components rather than being rebuilt onto DynamicPage.
   2. /industry/:slug — CMS-driven (fetches api::industry.industry by
      slug, which has its own dynamic zone) but lives in a distinct URL
      namespace from flat page slugs, so it can't be folded into the
      same catch-all without special-casing DynamicPage itself.
   3. The 6 rich product pages (crm, commerce, creator-commerce, plm,
      logistics, wms) — each backed by its own dedicated Strapi content-type
      (already seeded with hero/metrics/faq data) rather than the generic
      `page` type, via src/pages/ProductPage.jsx.
   4. 5 more product-suite pages (retail, dlm, enterprisegpt, agentcommerce,
      merchandise-financial-planning) — simpler content-types shaped like
      `industry` (title/description + a `blocks` dynamic zone), each with a
      single entry at slug "overview", rendered directly via the shared
      PageRenderer (same engine IndustryPage uses) instead of a dedicated
      page component. `marketing`, a sixth content-type in this same family,
      does NOT get a new route here — an earlier seed migration already
      copied its blocks into a `page` entry at slug "marketing", so it
      already renders via the DynamicPage catch-all; it only needed a nav
      entry (see Layout.jsx). `salescrm` — a seventh — was deliberately left
      unwired: it's a thinner, stale-URL CRM landing page superseded by the
      richer /crm page; its one non-redundant idea (AI Lead Scoring) was
      folded into crm's own capabilities list instead of standing up a
      duplicate page (see seed-phase3-cms-copy.js). */
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

          {/* Product pages — each backed by its own dedicated Strapi content-type */}
          <Route path="crm" element={<ProductPage type="crm" />} />
          <Route path="commerce" element={<ProductPage type="commerce" />} />
          <Route path="creator-commerce" element={<ProductPage type="creator-commerce" />} />
          <Route path="plm" element={<ProductPage type="plm" />} />
          <Route path="logistics" element={<ProductPage type="logistics" />} />
          <Route path="wms" element={<ProductPage type="wms" />} />

          {/* Simpler product-suite pages — title/description + `blocks` dynamic zone, one entry at slug "overview" each, rendered via the shared PageRenderer (same engine as IndustryPage) */}
          <Route path="retail" element={<PageRenderer apiEndpoint="/api/retails" sectionsField="blocks" slug="overview" notFoundLabel="retail" />} />
          <Route path="dlm" element={<PageRenderer apiEndpoint="/api/dlms" sectionsField="blocks" slug="overview" notFoundLabel="dlm" />} />
          <Route path="enterprisegpt" element={<PageRenderer apiEndpoint="/api/enterprisegpts" sectionsField="blocks" slug="overview" notFoundLabel="enterprisegpt" />} />
          <Route path="agentcommerce" element={<PageRenderer apiEndpoint="/api/agentcommerces" sectionsField="blocks" slug="overview" notFoundLabel="agentcommerce" />} />
          <Route path="merchandise-financial-planning" element={<PageRenderer apiEndpoint="/api/merchandise-financial-plannings" sectionsField="blocks" slug="overview" notFoundLabel="merchandise financial planning" />} />

          {/* Legacy static multi-page-site alias — no CMS content behind /index.html itself */}
          <Route path="index.html" element={<Navigate to="/" replace />} />

          <Route path="*" element={<DynamicPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
