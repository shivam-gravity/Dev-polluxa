/**
 * Shared form-submission helpers. Mirrors the sanitize + postAPI pattern
 * already working in PageRenderer.jsx's ContactFormSection.
 */
import { postAPI } from './api';

export const sanitize = (str) => (typeof str !== 'string' ? '' : str.trim()
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;').replace(/'/g, '&#x27;').replace(/\//g, '&#x2F;'));

export async function submitContactForm({ firstName, lastName, email, company, phone, message }) {
  return postAPI('/api/contact-form-submissions', {
    FirstName: sanitize(firstName),
    LastName: sanitize(lastName),
    PhoneNumber: (phone || '').trim() || 'Not provided',
    Email: (email || '').trim(),
    Organization: sanitize(company),
    Message: sanitize(message),
  });
}

export async function submitNewsletterSignup(email) {
  return postAPI('/api/newsletter-subscribers', { email: (email || '').trim() });
}
