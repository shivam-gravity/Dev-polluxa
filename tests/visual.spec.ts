/**
 * Visual regression tests using Playwright's built-in screenshot diffing.
 *
 * First run: generate baselines
 *   npm run test:visual:update
 *
 * Subsequent runs: compare against baselines
 *   npm run test:visual
 *
 * Snapshots are stored in tests/__snapshots__/
 */
import { test, expect } from '@playwright/test';

// Only run on Chromium — screenshots are pixel-perfect per OS/browser,
// so one reference browser is sufficient for visual regression.
test.use({ ...require('@playwright/test').devices['Desktop Chrome'] });

const KEY_PAGES = [
  { name: 'homepage',         path: '/' },
  { name: 'crm',              path: '/crm' },
  { name: 'commerce',         path: '/commerce' },
  { name: 'plm',              path: '/plm' },
  { name: 'logistics',        path: '/logistics' },
  { name: 'wms',              path: '/wms' },
  { name: 'creator-commerce', path: '/creator-commerce' },
];

for (const { name, path } of KEY_PAGES) {
  test(`${name} — full-page visual snapshot`, async ({ page }) => {
    await page.goto(path, { waitUntil: 'networkidle' });

    // Freeze animations so screenshots are deterministic
    await page.addStyleTag({
      content: `*, *::before, *::after { animation-duration: 0s !important; transition-duration: 0s !important; }`,
    });

    await expect(page).toHaveScreenshot(`${name}.png`, {
      fullPage: true,
      maxDiffPixelRatio: 0.02,
    });
  });
}
