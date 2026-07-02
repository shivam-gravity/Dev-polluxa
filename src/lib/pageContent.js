/**
 * Shared helpers for pulling hero/CTA/stats copy out of an `api::page.page`
 * entry's `contentSections` dynamic zone — used by Homepage and the
 * "Class A" pages that fetch their own collections but source their
 * hero/CTA copy from Strapi instead of hardcoding it.
 */
import { fetchAPI } from './api';

export async function fetchPage(slug) {
  const res = await fetchAPI('/api/pages', { 'filters[slug][$eq]': slug, locale: 'en' });
  const entry = res?.data?.[0];
  const attrs = entry?.attributes ?? entry;
  return { sections: attrs?.contentSections ?? [], seo: attrs?.seo ?? null };
}

export async function fetchPageSections(slug) {
  const { sections } = await fetchPage(slug);
  return sections;
}

export function getSection(sections, componentType) {
  return sections?.find((s) => s.__component === componentType) ?? null;
}
