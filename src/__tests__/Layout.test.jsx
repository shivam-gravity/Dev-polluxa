import { render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, test, expect } from 'vitest';
import Layout from '../components/Layout.jsx';

const renderLayout = (initialPath = '/') => {
  const utils = render(
    <MemoryRouter initialEntries={[initialPath]}>
      <Layout />
    </MemoryRouter>
  );
  return utils;
};

// ── Topnav ────────────────────────────────────────────────────────────────────
describe('Layout — topnav', () => {
  test('renders the Polluxa wordmark', () => {
    const { container } = renderLayout();
    const topnav = container.querySelector('.topnav');
    expect(within(topnav).getAllByText('Polluxa').length).toBeGreaterThanOrEqual(1);
  });

  test('renders all 4 top-level nav dropdown labels', () => {
    const { container } = renderLayout();
    // Each .nav-dd span has the label as its first text node.
    // We inspect those text nodes directly to avoid matching the mega-menu
    // head divs that can share the same text (e.g. <div class="head">Customers</div>).
    const navDds = Array.from(container.querySelectorAll('.topnav .nav-dd'));
    const labels = navDds.map(dd =>
      Array.from(dd.childNodes)
        .filter(n => n.nodeType === Node.TEXT_NODE)
        .map(n => n.textContent.trim())
        .join('')
    );
    expect(labels).toContain('Products');
    expect(labels).toContain('Customers');
    expect(labels).toContain('Partners');
    expect(labels).toContain('Company');
  });

  test('renders Contact Us CTA link in topnav-right', () => {
    const { container } = renderLayout();
    // Scoped to .topnav-right to avoid matching the same link inside Company mega-menu
    const navRight = container.querySelector('.topnav-right');
    expect(within(navRight).getByRole('link', { name: /Contact Us/i })).toBeInTheDocument();
  });

  test('Products mega-menu lists all 6 products', () => {
    const { container } = renderLayout();
    const mega = container.querySelector('.topnav .mega-wide');
    expect(within(mega).getByText('CRM')).toBeInTheDocument();
    expect(within(mega).getByText('Commerce')).toBeInTheDocument();
    expect(within(mega).getByText('Creator Commerce')).toBeInTheDocument();
    expect(within(mega).getByText('Product Lifecycle Management')).toBeInTheDocument();
    expect(within(mega).getByText('Logistics')).toBeInTheDocument();
    expect(within(mega).getByText('Warehouse Management System')).toBeInTheDocument();
  });

  test('Partners mega-menu has "Partner network" link', () => {
    const { container } = renderLayout();
    expect(
      within(container.querySelector('.topnav')).getByRole('link', { name: /Partner network/i })
    ).toBeInTheDocument();
  });

  test('Company mega-menu has Careers and Blog links', () => {
    const { container } = renderLayout();
    const topnav = container.querySelector('.topnav');
    expect(within(topnav).getByRole('link', { name: /^Careers$/i })).toBeInTheDocument();
    expect(within(topnav).getByRole('link', { name: /^Blog$/i })).toBeInTheDocument();
  });
});

// ── Footer ────────────────────────────────────────────────────────────────────
describe('Layout — footer', () => {
  test('renders the Polluxa wordmark in footer', () => {
    const { container } = renderLayout();
    const footer = container.querySelector('footer');
    expect(within(footer).getAllByText('Polluxa').length).toBeGreaterThanOrEqual(1);
  });

  test('footer Products column links to all 6 products', () => {
    const { container } = renderLayout();
    const footer = container.querySelector('footer');
    // Each product appears as a plain-text link in the Products column
    const links = within(footer).getAllByRole('link');
    const hrefs = links.map(l => l.getAttribute('href'));
    expect(hrefs).toContain('/crm');
    expect(hrefs).toContain('/commerce');
    expect(hrefs).toContain('/creator-commerce');
    expect(hrefs).toContain('/plm');
    expect(hrefs).toContain('/logistics');
    expect(hrefs).toContain('/wms');
  });

  test('footer Industries column has 8 entries', () => {
    const { container } = renderLayout();
    const footer = container.querySelector('footer');
    const lists = footer.querySelectorAll('.footer-col-list');
    // Second footer-col-list is the Industries column
    const industryList = lists[1];
    expect(industryList.querySelectorAll('li').length).toBe(8);
  });

  test('footer renders the Quick Contact form', () => {
    renderLayout();
    expect(screen.getByPlaceholderText('Business Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Company')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Phone')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Submit/i })).toBeInTheDocument();
  });

  test('footer copyright notice is present', () => {
    const { container } = renderLayout();
    const footer = container.querySelector('footer');
    expect(within(footer).getByText(/2025 Pollux/i)).toBeInTheDocument();
  });

  test('footer bottom bar contains quick-nav links', () => {
    const { container } = renderLayout();
    const bottomNav = container.querySelector('.footer-bottom-links');
    expect(within(bottomNav).getByRole('link', { name: /About Us/i })).toBeInTheDocument();
    expect(within(bottomNav).getByRole('link', { name: /Events/i })).toBeInTheDocument();
    expect(within(bottomNav).getByRole('link', { name: /Careers/i })).toBeInTheDocument();
    expect(within(bottomNav).getByRole('link', { name: /Blog/i })).toBeInTheDocument();
  });
});
