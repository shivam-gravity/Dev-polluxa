import { describe, test, expect, vi, beforeEach, afterEach } from 'vitest';
import { fetchAPI, postAPI } from '../lib/api.js';

beforeEach(() => {
  vi.stubGlobal('fetch', vi.fn());
});
afterEach(() => {
  vi.unstubAllGlobals();
});

// ── fetchAPI ──────────────────────────────────────────────────────────────────
describe('fetchAPI', () => {
  test('returns parsed JSON on a 200 response', async () => {
    const mockData = { data: [{ id: 1, attributes: { title: 'Test' } }] };
    fetch.mockResolvedValue({ ok: true, json: () => Promise.resolve(mockData) });

    const result = await fetchAPI('/api/articles');
    expect(result).toEqual(mockData);
  });

  test('returns null on a non-ok response', async () => {
    fetch.mockResolvedValue({ ok: false, status: 404, statusText: 'Not Found' });
    const result = await fetchAPI('/api/missing');
    expect(result).toBeNull();
  });

  test('returns null on a network error', async () => {
    fetch.mockRejectedValue(new Error('Network Error'));
    const result = await fetchAPI('/api/articles');
    expect(result).toBeNull();
  });

  test('appends scalar query params to the URL', async () => {
    fetch.mockResolvedValue({ ok: true, json: () => Promise.resolve({}) });
    await fetchAPI('/api/articles', { populate: 'image', sort: 'createdAt:desc' });

    const calledUrl = fetch.mock.calls[0][0];
    expect(calledUrl).toContain('populate=image');
    expect(calledUrl).toContain('sort=createdAt%3Adesc');
  });

  test('JSON-stringifies object query params', async () => {
    fetch.mockResolvedValue({ ok: true, json: () => Promise.resolve({}) });
    await fetchAPI('/api/articles', { filters: { slug: { $eq: 'overview' } } });

    const calledUrl = fetch.mock.calls[0][0];
    expect(calledUrl).toContain('filters=');
  });

  test('always sends Content-Type: application/json', async () => {
    fetch.mockResolvedValue({ ok: true, json: () => Promise.resolve({}) });
    await fetchAPI('/api/articles');

    const headers = fetch.mock.calls[0][1].headers;
    expect(headers['Content-Type']).toBe('application/json');
  });

  test('hits the correct base URL', async () => {
    fetch.mockResolvedValue({ ok: true, json: () => Promise.resolve({}) });
    await fetchAPI('/api/crms');

    const calledUrl = fetch.mock.calls[0][0];
    expect(calledUrl).toContain('/api/crms');
    expect(calledUrl).toContain('localhost:1338');
  });
});

// ── postAPI ───────────────────────────────────────────────────────────────────
describe('postAPI', () => {
  test('sends POST with the payload wrapped in { data: ... }', async () => {
    fetch.mockResolvedValue({ ok: true, json: () => Promise.resolve({ data: {} }) });
    const payload = { name: 'Acme', email: 'acme@example.com' };
    await postAPI('/api/contact-form-submissions', payload);

    const [, opts] = fetch.mock.calls[0];
    expect(opts.method).toBe('POST');
    expect(JSON.parse(opts.body)).toEqual({ data: payload });
  });

  test('returns the parsed response on success', async () => {
    const created = { data: { id: 42 } };
    fetch.mockResolvedValue({ ok: true, json: () => Promise.resolve(created) });

    const result = await postAPI('/api/contact-form-submissions', { name: 'Test' });
    expect(result).toEqual(created);
  });

  test('returns { error: true, status } on a non-ok response', async () => {
    fetch.mockResolvedValue({
      ok: false,
      status: 422,
      statusText: 'Unprocessable Entity',
      text: () => Promise.resolve('Validation failed'),
    });

    const result = await postAPI('/api/contact-form-submissions', {});
    expect(result.error).toBe(true);
    expect(result.status).toBe(422);
  });

  test('returns { error: true, message } on a network failure', async () => {
    fetch.mockRejectedValue(new Error('Connection refused'));

    const result = await postAPI('/api/contact-form-submissions', {});
    expect(result.error).toBe(true);
    expect(result.message).toBe('Connection refused');
  });
});
