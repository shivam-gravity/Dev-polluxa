import { useParams } from 'react-router-dom';
import PageRenderer from '../lib/PageRenderer';

/* CMS-driven, but backed by api::industry.industry (its own `blocks` dynamic
   zone) rather than api::page.page — a distinct collection with its own
   URL namespace (/industry/:slug), so it reuses the same SECTION_RENDERERS
   map via PageRenderer instead of duplicating any rendering logic. */
const IndustryPage = () => {
  const { slug } = useParams();
  return <PageRenderer apiEndpoint="/api/industries" sectionsField="blocks" slug={slug} notFoundLabel="industry" />;
};

export default IndustryPage;
