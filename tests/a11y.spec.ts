import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

// Axe analysis is CPU-heavy on content-rich pages; Firefox is slower than Chromium/WebKit
test.setTimeout(90_000);

const PAGES = [
  { name: 'Homepage',         path: '/' },
  { name: 'CRM',              path: '/crm' },
  { name: 'Commerce',         path: '/commerce' },
  { name: 'PLM',              path: '/plm' },
  { name: 'Logistics',        path: '/logistics' },
  { name: 'WMS',              path: '/wms' },
  { name: 'Creator Commerce', path: '/creator-commerce' },
  { name: 'Blog',             path: '/blog' },
  { name: 'Careers',          path: '/careers' },
  { name: 'Events',           path: '/events' },
  { name: 'Partners',         path: '/partners' },
  { name: 'Case Studies',     path: '/case-studies' },
];

for (const { name, path } of PAGES) {
  test(`${name} — no WCAG 2.1 A violations`, async ({ page }) => {
    await page.goto(path, { waitUntil: 'networkidle' });

    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a'])
      .analyze();

    // Attach full violation report as a test attachment for easy debugging
    if (results.violations.length > 0) {
      const report = results.violations.map(v =>
        `[${v.impact}] ${v.id}: ${v.description}\n` +
        v.nodes.slice(0, 2).map(n => `  → ${n.html}`).join('\n')
      ).join('\n\n');
      await test.info().attach('axe-violations.txt', {
        body: report,
        contentType: 'text/plain',
      });
    }

    expect(results.violations).toEqual([]);
  });
}
