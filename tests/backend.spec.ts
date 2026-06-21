import { test, expect } from '@playwright/test';

const STRAPI = 'http://localhost:1338';
const TOKEN  = 'fff1c63089123dbf9cc5aeccea6315254546d69f13254554a507b770542dab23dcae0d4505580d66fd095eea8a1442c0ee62843ceabdd5c4df55459a3c2737a18c9515a42c48401992ae64d30b180dbfa6b7735ed2a6011ed5cf131b004e92bc2d28f94d04fc7c87e159b2d0913618a617ae60fcac771c74ee71d283e5470e87';

const H = { Authorization: `Bearer ${TOKEN}` };

const get = async (request: any, path: string) => {
  const res = await request.get(`${STRAPI}${path}`, { headers: H });
  expect(res.status()).toBe(200);
  return res.json();
};

// ── Strapi is reachable ───────────────────────────────────────────────────────
test('Strapi health — server responds', async ({ request }) => {
  const res = await request.get(`${STRAPI}/api/crms`);
  expect(res.status()).toBe(200);
});

// ── Every product page record exists ─────────────────────────────────────────
const PRODUCT_ENDPOINTS = [
  { label: 'CRM',              url: '/api/crms?filters[slug][$eq]=overview' },
  { label: 'Commerce',         url: '/api/commerces?filters[slug][$eq]=overview' },
  { label: 'PLM',              url: '/api/plms?filters[slug][$eq]=overview' },
  { label: 'Logistics',        url: '/api/logistics?filters[slug][$eq]=overview' },
  { label: 'WMS',              url: '/api/wmss?filters[slug][$eq]=overview' },
  { label: 'Creator Commerce', url: '/api/creator-commerces?filters[slug][$eq]=overview' },
];

for (const { label, url } of PRODUCT_ENDPOINTS) {
  test(`${label} — record exists in Strapi`, async ({ request }) => {
    const json = await get(request, url);
    expect(json.data.length).toBeGreaterThan(0);
    expect(json.data[0].id).toBeTruthy();
  });
}

// ── Content collections ───────────────────────────────────────────────────────
test('Articles — 22+ records with title + slug + description', async ({ request }) => {
  const json = await get(request, '/api/articles');
  expect(json.data.length).toBeGreaterThanOrEqual(22);
  json.data.forEach((item: any) => {
    expect(item.attributes.title).toBeTruthy();
    expect(item.attributes.slug).toBeTruthy();
    expect(item.attributes.description).toBeTruthy();
  });
});

test('Careers — 5 records with title + location + level + slug', async ({ request }) => {
  const json = await get(request, '/api/careers');
  expect(json.data.length).toBe(5);
  json.data.forEach((item: any) => {
    expect(item.attributes.title).toBeTruthy();
    expect(item.attributes.location).toBeTruthy();
    expect(item.attributes.level).toBeTruthy();
    expect(item.attributes.slug).toBeTruthy();
  });
});

test('Case Studies — 9 records with title + slug + description', async ({ request }) => {
  const json = await get(request, '/api/case-studies');
  expect(json.data.length).toBe(9);
  json.data.forEach((item: any) => {
    expect(item.attributes.title).toBeTruthy();
    expect(item.attributes.slug).toBeTruthy();
    expect(item.attributes.description).toBeTruthy();
  });
});

test('Events — 16+ records with title + slug + location + EndDate', async ({ request }) => {
  const json = await get(request, '/api/events');
  expect(json.data.length).toBeGreaterThanOrEqual(16);
  json.data.forEach((item: any) => {
    expect(item.attributes.title).toBeTruthy();
    expect(item.attributes.slug).toBeTruthy();
    expect(item.attributes.location).toBeTruthy();
    expect(item.attributes.EndDate).toBeTruthy();
  });
});

test('Partners — 10 records with title + slug + description', async ({ request }) => {
  const json = await get(request, '/api/partners');
  expect(json.data.length).toBe(10);
  json.data.forEach((item: any) => {
    expect(item.attributes.title).toBeTruthy();
    expect(item.attributes.slug).toBeTruthy();
    expect(item.attributes.description).toBeTruthy();
  });
});

// ── CRM: capabilities ─────────────────────────────────────────────────────────
test('CRM — capabilities: 6 items with tag + title + description + link_url', async ({ request }) => {
  const attrs = (await get(request, '/api/crms?filters[slug][$eq]=overview')).data[0].attributes;
  const caps = attrs.capabilities;
  expect(Array.isArray(caps)).toBe(true);
  expect(caps.length).toBe(6);

  const expectedTags   = ['AGENTS', 'CRM', 'SALES', 'MARKETING', 'DATA', 'HELP DESK'];
  const expectedTitles = [
    'Focused on Closing', 'Free & AI-Driven', 'Your Living Pipeline',
    'Organized & Connected', 'Verified & Enriched', 'Smart Support, Seamless Experience',
  ];

  caps.forEach((cap: any, i: number) => {
    expect(cap.tag).toBe(expectedTags[i]);
    expect(cap.title).toBe(expectedTitles[i]);
    expect(cap.description).toBeTruthy();
    expect(cap.link_url).toContain('polluxa.com');
    expect(cap.icon).toBeTruthy();
  });
});

// ── CRM: hero + metrics ───────────────────────────────────────────────────────
test('CRM — hero_title and 4 metrics present', async ({ request }) => {
  const attrs = (await get(request, '/api/crms?filters[slug][$eq]=overview')).data[0].attributes;
  expect(attrs.hero_title).toBe('The Future of Sales is Agentic');
  expect(Array.isArray(attrs.metrics)).toBe(true);
  expect(attrs.metrics.length).toBe(4);
  expect(attrs.metrics[0].display).toBe('85%');
});

// ── CRM: FAQ ──────────────────────────────────────────────────────────────────
test('CRM — FAQ: 8 entries with question + answer', async ({ request }) => {
  const faq = (await get(request, '/api/crms?filters[slug][$eq]=overview')).data[0].attributes.faq;
  expect(Array.isArray(faq)).toBe(true);
  expect(faq.length).toBe(8);
  faq.forEach((item: any) => {
    expect(item.question).toBeTruthy();
    expect(item.answer).toBeTruthy();
  });
});

// ── CRM: channels ─────────────────────────────────────────────────────────────
test('CRM — channels: 4 items with title + badge + description + link_url', async ({ request }) => {
  const channels = (await get(request, '/api/crms?filters[slug][$eq]=overview')).data[0].attributes.channels;
  expect(Array.isArray(channels)).toBe(true);
  expect(channels.length).toBe(4);

  const expectedTitles = ['LinkedIn Outreach', 'Email Outreach', 'WhatsApp', 'Meta Ads'];
  channels.forEach((ch: any, i: number) => {
    expect(ch.title).toBe(expectedTitles[i]);
    expect(ch.badge).toBeTruthy();
    expect(ch.description).toBeTruthy();
    expect(ch.link_url).toBeTruthy();
  });

  // LinkedIn must be flagged as featured
  expect(channels[0].is_featured).toBe(true);
  expect(channels[0].featured_label).toBeTruthy();
});

// ── CRM: modules ──────────────────────────────────────────────────────────────
test('CRM — modules: 6 items with title + badge + description + link_url + link_label', async ({ request }) => {
  const modules = (await get(request, '/api/crms?filters[slug][$eq]=overview')).data[0].attributes.modules;
  expect(Array.isArray(modules)).toBe(true);
  expect(modules.length).toBe(6);

  const expectedTitles = ['Agents', 'CRM', 'Marketing', 'Sales', 'Data', 'Help Desk'];
  modules.forEach((mod: any, i: number) => {
    expect(mod.title).toBe(expectedTitles[i]);
    expect(mod.badge).toBeTruthy();
    expect(mod.description).toBeTruthy();
    expect(mod.link_url).toBeTruthy();
    expect(mod.link_label).toBeTruthy();
  });
});

// ── Commerce: ecommerce_features ──────────────────────────────────────────────
test('Commerce — ecommerce_features: 6 items with tag + title + link_url', async ({ request }) => {
  const feats = (await get(request, '/api/commerces?filters[slug][$eq]=overview')).data[0].attributes.ecommerce_features;
  expect(Array.isArray(feats)).toBe(true);
  expect(feats.length).toBe(6);

  const expectedTags = ['STOREFRONT', 'PAYMENTS', 'INVENTORY', 'SHIPPING', 'ANALYTICS', 'CRM'];
  feats.forEach((f: any, i: number) => {
    expect(f.tag).toBe(expectedTags[i]);
    expect(f.title).toBeTruthy();
    expect(f.description).toBeTruthy();
    expect(f.link_url).toContain('polluxa.com');
    expect(f.icon).toBeTruthy();
  });
});

// ── Commerce: metrics ─────────────────────────────────────────────────────────
test('Commerce — metrics: 4 items, first value = "99%"', async ({ request }) => {
  const metrics = (await get(request, '/api/commerces?filters[slug][$eq]=overview')).data[0].attributes.metrics;
  expect(Array.isArray(metrics)).toBe(true);
  expect(metrics.length).toBe(4);
  expect(metrics[0].value).toBe('99%');
  metrics.forEach((m: any) => {
    expect(m.value).toBeTruthy();
    expect(m.label).toBeTruthy();
  });
});

// ── Commerce: FAQ ─────────────────────────────────────────────────────────────
test('Commerce — FAQ: 5 entries with question + answer', async ({ request }) => {
  const faq = (await get(request, '/api/commerces?filters[slug][$eq]=overview')).data[0].attributes.faq;
  expect(Array.isArray(faq)).toBe(true);
  expect(faq.length).toBe(5);
  faq.forEach((item: any) => {
    expect(item.question).toBeTruthy();
    expect(item.answer).toBeTruthy();
  });
});

// ── Commerce: b2b_section + d2c_section + integrations_list ───────────────────
test('Commerce — b2b_section has required keys', async ({ request }) => {
  const b2b = (await get(request, '/api/commerces?filters[slug][$eq]=overview')).data[0].attributes.b2b_section;
  expect(b2b).toBeTruthy();
  expect(b2b.title).toBeTruthy();
  expect(b2b.description).toBeTruthy();
  expect(b2b.label).toBeTruthy();
  expect(Array.isArray(b2b.bullets)).toBe(true);
  expect(b2b.bullets.length).toBeGreaterThan(0);
  expect(b2b.portal_title).toBeTruthy();
  expect(Array.isArray(b2b.portal_items)).toBe(true);
});

test('Commerce — d2c_section has required keys', async ({ request }) => {
  const d2c = (await get(request, '/api/commerces?filters[slug][$eq]=overview')).data[0].attributes.d2c_section;
  expect(d2c).toBeTruthy();
  expect(d2c.title).toBeTruthy();
  expect(d2c.description).toBeTruthy();
  expect(d2c.label).toBeTruthy();
  expect(Array.isArray(d2c.bullets)).toBe(true);
  expect(d2c.bullets.length).toBeGreaterThan(0);
  expect(d2c.dashboard_title).toBeTruthy();
  expect(Array.isArray(d2c.dashboard)).toBe(true);
});

test('Commerce — integrations_list: 12 items', async ({ request }) => {
  const list = (await get(request, '/api/commerces?filters[slug][$eq]=overview')).data[0].attributes.integrations_list;
  expect(Array.isArray(list)).toBe(true);
  expect(list.length).toBe(12);
  list.forEach((item: any) => expect(item).toBeTruthy());
});

// ── PLM / Logistics / WMS / Creator Commerce: features ───────────────────────
const FEATURE_PAGES = [
  { label: 'PLM',       url: '/api/plms',              count: 6, first: 'Product Development' },
  { label: 'Logistics', url: '/api/logistics',          count: 6, first: 'Delivery Suite'       },
  { label: 'WMS',       url: '/api/wmss',               count: 6, first: 'Prioritization'       },
  { label: 'Creator Commerce', url: '/api/creator-commerces', count: 6, first: 'Discovery'       },
];

for (const { label, url, count, first } of FEATURE_PAGES) {
  test(`${label} — features: ${count} items, first = "${first}"`, async ({ request }) => {
    const feats = (await get(request, url)).data[0].attributes.features;
    expect(Array.isArray(feats)).toBe(true);
    expect(feats.length).toBe(count);
    expect(feats[0].title).toBe(first);
    feats.forEach((f: any) => {
      expect(f.icon).toBeTruthy();
      expect(f.title).toBeTruthy();
      expect(f.description).toBeTruthy();
    });
  });
}

// ── PLM: metrics + FAQ ────────────────────────────────────────────────────────
test('PLM — metrics: 4 items, first = "40% Faster time-to-market"', async ({ request }) => {
  const attrs = (await get(request, '/api/plms')).data[0].attributes;
  expect(attrs.metrics.length).toBe(4);
  expect(attrs.metrics[0].value).toBe('40%');
  expect(attrs.metrics[0].label).toBe('Faster time-to-market');
  attrs.metrics.forEach((m: any) => { expect(m.value).toBeTruthy(); expect(m.label).toBeTruthy(); });
});

test('PLM — FAQ: 6 entries with question + answer', async ({ request }) => {
  const faq = (await get(request, '/api/plms')).data[0].attributes.faq;
  expect(faq.length).toBe(6);
  faq.forEach((item: any) => { expect(item.question).toBeTruthy(); expect(item.answer).toBeTruthy(); });
});

// ── Logistics: metrics + FAQ ──────────────────────────────────────────────────
test('Logistics — metrics: 3 items, first = "20K+ Orders processed daily"', async ({ request }) => {
  const attrs = (await get(request, '/api/logistics')).data[0].attributes;
  expect(attrs.metrics.length).toBe(3);
  expect(attrs.metrics[0].value).toBe('20K+');
  expect(attrs.metrics[0].label).toBe('Orders processed daily');
  attrs.metrics.forEach((m: any) => { expect(m.value).toBeTruthy(); expect(m.label).toBeTruthy(); });
});

test('Logistics — FAQ: 5 entries with question + answer', async ({ request }) => {
  const faq = (await get(request, '/api/logistics')).data[0].attributes.faq;
  expect(faq.length).toBe(5);
  faq.forEach((item: any) => { expect(item.question).toBeTruthy(); expect(item.answer).toBeTruthy(); });
});

// ── WMS: metrics + FAQ ────────────────────────────────────────────────────────
test('WMS — metrics: 4 items, first = "100% Scan-based error-proof operations"', async ({ request }) => {
  const attrs = (await get(request, '/api/wmss')).data[0].attributes;
  expect(attrs.metrics.length).toBe(4);
  expect(attrs.metrics[0].value).toBe('100%');
  expect(attrs.metrics[0].label).toBe('Scan-based error-proof operations');
  attrs.metrics.forEach((m: any) => { expect(m.value).toBeTruthy(); expect(m.label).toBeTruthy(); });
});

test('WMS — FAQ: 5 entries with question + answer', async ({ request }) => {
  const faq = (await get(request, '/api/wmss')).data[0].attributes.faq;
  expect(faq.length).toBe(5);
  faq.forEach((item: any) => { expect(item.question).toBeTruthy(); expect(item.answer).toBeTruthy(); });
});

// ── Creator Commerce: metrics + integrations_list + FAQ ──────────────────────
test('Creator Commerce — metrics: 3 items, first = "100+ Satisfied users"', async ({ request }) => {
  const attrs = (await get(request, '/api/creator-commerces')).data[0].attributes;
  expect(attrs.metrics.length).toBe(3);
  expect(attrs.metrics[0].value).toBe('100+');
  expect(attrs.metrics[0].label).toBe('Satisfied users');
  attrs.metrics.forEach((m: any) => { expect(m.value).toBeTruthy(); expect(m.label).toBeTruthy(); });
});

test('Creator Commerce — integrations_list: 8 items starting with "WooCommerce"', async ({ request }) => {
  const list = (await get(request, '/api/creator-commerces')).data[0].attributes.integrations_list;
  expect(Array.isArray(list)).toBe(true);
  expect(list.length).toBe(8);
  expect(list[0]).toBe('WooCommerce');
  list.forEach((item: string) => expect(item).toBeTruthy());
});

test('Creator Commerce — FAQ: 6 entries with question + answer', async ({ request }) => {
  const faq = (await get(request, '/api/creator-commerces')).data[0].attributes.faq;
  expect(faq.length).toBe(6);
  faq.forEach((item: any) => { expect(item.question).toBeTruthy(); expect(item.answer).toBeTruthy(); });
});
