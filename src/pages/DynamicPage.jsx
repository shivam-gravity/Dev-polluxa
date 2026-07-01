import { useParams, useLocation } from 'react-router-dom';
import PageRenderer from '../lib/PageRenderer';

/* Generic catch-all: resolves a slug from the URL and renders the matching
   api::page.page entry via the shared PageRenderer + SECTION_RENDERERS map.
   No page-specific logic lives here — every route falls through to this
   component unless it has genuinely non-CMS behavior (see App.jsx). */
const DynamicPage = () => {
  const { '*': wildcard } = useParams();
  const location = useLocation();
  const rawSlug = wildcard || location.pathname.replace(/^\//, '').replace(/\/$/, '');
  const slug = rawSlug.replace(/\.html$/, '');

  return <PageRenderer apiEndpoint="/api/pages" sectionsField="contentSections" slug={slug} notFoundLabel="page" />;
};

export default DynamicPage;
