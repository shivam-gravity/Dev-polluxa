import { useEffect } from 'react';
import { resolveMedia } from './api';

/* Shared SEO effect: sets document.title + meta description + og:image.
   Pass a Strapi `shared.seo` component (or a plain { metaTitle, metaDescription }
   object for pages that don't have one) plus a fallback title. */
export function useSeoEffect(seo, fallbackTitle) {
  useEffect(() => {
    const setMetaTag = (name, content, attr = 'name') => {
      let tag = document.querySelector(`meta[${attr}="${name}"]`);
      if (!content) {
        if (tag) tag.remove();
        return;
      }
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute(attr, name);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', content);
    };

    document.title = seo?.metaTitle || fallbackTitle || 'Polluxa';
    setMetaTag('description', seo?.metaDescription || '');
    setMetaTag('og:image', resolveMedia(seo?.shareImage) || '', 'property');
  }, [seo, fallbackTitle]);
}
