import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Homepage from './pages/Homepage';
import CRM from './pages/CRM';
import Commerce from './pages/Commerce';
import About from './pages/About';
import Contact from './pages/Contact';
import Customers from './pages/Customers';
import CreatorCommerce from './pages/CreatorCommerce';
import PLM from './pages/PLM';
import Logistics from './pages/Logistics';
import WMS from './pages/WMS';
import CaseStudies from './pages/CaseStudies';
import Partners from './pages/Partners';
import IndustryPage from './pages/IndustryPage';
import Pricing from './pages/Pricing';
import Careers from './pages/Careers';
import Blog from './pages/Blog';
import Events from './pages/Events';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Terms from './pages/Terms';
import DynamicPage from './pages/DynamicPage';

// Capabilities
import TAMCanvas from './pages/TAMCanvas';
import FindLead from './pages/FindLead';
import SignalAggregation from './pages/SignalAggregation';
import ContactEnrichment from './pages/ContactEnrichment';
import FundingDetection from './pages/FundingDetection';
import Outreach from './pages/Outreach';
import AIWorkflows from './pages/AIWorkflows';

// Modules
import Agents from './pages/Agents';
import Marketing from './pages/Marketing';
import SalesModule from './pages/SalesModule';
import DataModule from './pages/DataModule';
import HelpDesk from './pages/HelpDesk';

// Channels
import LinkedInOutreach from './pages/LinkedInOutreach';
import EmailOutreach from './pages/EmailOutreach';
import WhatsAppPage from './pages/WhatsAppPage';
import MetaAds from './pages/MetaAds';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Homepage />} />
          <Route path="homepage.html" element={<Homepage />} />

          {/* Main Product Pages */}
          <Route path="index.html" element={<CRM />} />
          <Route path="crm" element={<CRM />} />
          <Route path="crm.html" element={<CRM />} />
          <Route path="commerce" element={<Commerce />} />
          <Route path="commerce.html" element={<Commerce />} />
          <Route path="creator-commerce" element={<CreatorCommerce />} />
          <Route path="creator-commerce.html" element={<CreatorCommerce />} />
          <Route path="plm" element={<PLM />} />
          <Route path="plm.html" element={<PLM />} />
          <Route path="logistics" element={<Logistics />} />
          <Route path="logistics.html" element={<Logistics />} />
          <Route path="wms" element={<WMS />} />
          <Route path="wms.html" element={<WMS />} />

          {/* Pricing */}
          <Route path="pricing" element={<Pricing />} />
          <Route path="pricing.html" element={<Pricing />} />

          {/* Capabilities */}
          <Route path="tam-canvas" element={<TAMCanvas />} />
          <Route path="tam-canvas.html" element={<TAMCanvas />} />
          <Route path="find-lead" element={<FindLead />} />
          <Route path="find-lead.html" element={<FindLead />} />
          <Route path="signal-aggregation" element={<SignalAggregation />} />
          <Route path="signal-aggregation.html" element={<SignalAggregation />} />
          <Route path="contact-enrichment" element={<ContactEnrichment />} />
          <Route path="contact-enrichment.html" element={<ContactEnrichment />} />
          <Route path="funding-detection" element={<FundingDetection />} />
          <Route path="funding-detection.html" element={<FundingDetection />} />
          <Route path="outreach" element={<Outreach />} />
          <Route path="outreach.html" element={<Outreach />} />
          <Route path="ai-workflows" element={<AIWorkflows />} />
          <Route path="ai-workflows.html" element={<AIWorkflows />} />

          {/* Modules */}
          <Route path="agents" element={<Agents />} />
          <Route path="agents.html" element={<Agents />} />
          <Route path="marketing" element={<Marketing />} />
          <Route path="marketing.html" element={<Marketing />} />
          <Route path="sales" element={<SalesModule />} />
          <Route path="sales.html" element={<SalesModule />} />
          <Route path="data" element={<DataModule />} />
          <Route path="data.html" element={<DataModule />} />
          <Route path="helpdesk" element={<HelpDesk />} />
          <Route path="helpdesk.html" element={<HelpDesk />} />

          {/* Channels */}
          <Route path="linkedin-outreach" element={<LinkedInOutreach />} />
          <Route path="linkedin-outreach.html" element={<LinkedInOutreach />} />
          <Route path="email-outreach" element={<EmailOutreach />} />
          <Route path="email-outreach.html" element={<EmailOutreach />} />
          <Route path="whatsapp" element={<WhatsAppPage />} />
          <Route path="whatsapp.html" element={<WhatsAppPage />} />
          <Route path="meta-ads" element={<MetaAds />} />
          <Route path="meta-ads.html" element={<MetaAds />} />

          {/* Company & Customers */}
          <Route path="about" element={<About />} />
          <Route path="about.html" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="contact.html" element={<Contact />} />
          <Route path="customers" element={<Customers />} />
          <Route path="customers.html" element={<Customers />} />
          <Route path="case-studies" element={<CaseStudies />} />
          <Route path="case-studies.html" element={<CaseStudies />} />
          <Route path="partners" element={<Partners />} />
          <Route path="partners.html" element={<Partners />} />

          {/* Industry Pages */}
          <Route path="industry/:industryName" element={<IndustryPage />} />
          <Route path="industry-fashion-apparel" element={<IndustryPage name="Fashion & Apparel" count="420+" />} />
          <Route path="industry-outdoor-sports" element={<IndustryPage name="Outdoor & Sports" count="180+" />} />
          <Route path="industry-multi-category" element={<IndustryPage name="Multi-Category Retail" count="240+" />} />
          <Route path="industry-home-furniture" element={<IndustryPage name="Home & Furniture" count="140+" />} />
          <Route path="industry-food-beverage" element={<IndustryPage name="Food & Beverage" count="310+" />} />
          <Route path="industry-consumer-goods" element={<IndustryPage name="Consumer Goods" count="280+" />} />
          <Route path="industry-consumer-electronics" element={<IndustryPage name="Consumer Electronics" count="160+" />} />

          {/* Legal / Secondary Pages */}
          <Route path="privacy" element={<PrivacyPolicy />} />
          <Route path="privacy.html" element={<PrivacyPolicy />} />
          <Route path="terms" element={<Terms />} />
          <Route path="careers" element={<Careers />} />
          <Route path="blog" element={<Blog />} />
          <Route path="events" element={<Events />} />

          <Route path="*" element={<DynamicPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
