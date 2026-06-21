import { test, expect } from '@playwright/test';

const PAGES = [
  { name: 'Homepage',        path: '/' },
  { name: 'Blog',            path: '/blog' },
  { name: 'Careers',         path: '/careers' },
  { name: 'Case Studies',    path: '/case-studies' },
  { name: 'Events',          path: '/events' },
  { name: 'Partners',        path: '/partners' },
  { name: 'CRM',             path: '/crm' },
  { name: 'Commerce',        path: '/commerce' },
  { name: 'Creator Commerce',path: '/creator-commerce' },
  { name: 'Logistics',       path: '/logistics' },
  { name: 'PLM',             path: '/plm' },
  { name: 'WMS',             path: '/wms' },
];

// ── Every page loads without a crash ──────────────────────────────────────────
for (const pg of PAGES) {
  test(`${pg.name} — loads without errors`, async ({ page }) => {
    const jsErrors: string[] = [];
    page.on('pageerror', e => jsErrors.push(e.message));

    await page.goto(pg.path, { waitUntil: 'domcontentloaded' });

    // Wait for React to mount and the nav to be visible — this is more reliable
    // than networkidle in Firefox when Strapi responses are slow (>500 ms).
    await page.waitForSelector('nav.topnav', { state: 'visible', timeout: 15_000 });

    // Page must not be blank
    const body = await page.textContent('body');
    expect(body?.trim().length).toBeGreaterThan(100);

    // No uncaught JS errors
    expect(jsErrors).toHaveLength(0);
  });
}

// ── CRM: features section renders from API ────────────────────────────────────
test('CRM — features section renders 6 API-driven cards', async ({ page }) => {
  await page.goto('/crm', { waitUntil: 'networkidle' });

  // Section heading
  await expect(page.getByRole('heading', { name: /Core Features of CRM/i })).toBeVisible();

  // All 6 tag labels present (scoped to feature cards to avoid nav/footer collisions)
  for (const tag of ['AGENTS', 'CRM', 'SALES', 'MARKETING', 'DATA', 'HELP DESK']) {
    await expect(page.locator('.crm-feat-tag', { hasText: tag }).first()).toBeVisible();
  }

  // Tagline titles present
  for (const title of [
    'Focused on Closing',
    'Free & AI-Driven',
    'Your Living Pipeline',
    'Organized & Connected',
    'Verified & Enriched',
    'Smart Support, Seamless Experience',
  ]) {
    await expect(page.getByRole('heading', { name: title })).toBeVisible();
  }

  // Sub-nav must NOT show "Capabilities" (removed)
  const capLink = page.getByRole('link', { name: 'Capabilities' });
  await expect(capLink).toHaveCount(0);
});

// ── Commerce: features section renders from API ───────────────────────────────
test('Commerce — features section renders 6 API-driven cards', async ({ page }) => {
  await page.goto('/commerce', { waitUntil: 'networkidle' });

  await expect(page.getByRole('heading', { name: /E-commerce Encompassed/i })).toBeVisible();

  for (const tag of ['STOREFRONT', 'PAYMENTS', 'INVENTORY', 'SHIPPING', 'ANALYTICS']) {
    await expect(page.getByText(tag, { exact: true })).toBeVisible();
  }

  for (const title of [
    'Build Your Online Storefront',
    'Enable Seamless & Secure Payments',
    'Real-time Inventory & Order Control',
    'Streamlined Delivery & Fulfillment',
    'Measure Sales & Customer Insights',
    'Manage Customers & Engagement',
  ]) {
    await expect(page.getByRole('heading', { name: title })).toBeVisible();
  }
});

// ── CRM: hero and metrics come from Strapi ────────────────────────────────────
test('CRM — hero and metrics render Strapi data', async ({ page }) => {
  await page.goto('/crm', { waitUntil: 'networkidle' });

  await expect(page.getByRole('heading', { name: /The Future of Sales is Agentic/i })).toBeVisible();
  await expect(page.getByText('85%')).toBeVisible();
  await expect(page.getByText('Autonomous execution')).toBeVisible();
});
