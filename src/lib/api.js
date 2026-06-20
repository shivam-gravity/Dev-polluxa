/**
 * Base utility for fetching data from Strapi API
 */
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:1338';
const API_TOKEN = import.meta.env.VITE_API_TOKEN;
const FORM_TOKEN = import.meta.env.VITE_FORM_TOKEN;

/**
 * Fetch data from Strapi API using GET
 * @param {string} endpoint - The API endpoint (e.g., '/api/articles')
 * @param {object} params - Query parameters
 * @returns {Promise<any>} The parsed JSON response
 */
export async function fetchAPI(endpoint, params = {}) {
  try {
    const url = new URL(`${API_URL}${endpoint}`);
    
    // Append query params
    Object.keys(params).forEach(key => {
      if (typeof params[key] === 'object') {
        url.searchParams.append(key, JSON.stringify(params[key]));
      } else {
        url.searchParams.append(key, params[key]);
      }
    });

    const headers = {
      'Content-Type': 'application/json',
    };

    if (API_TOKEN) {
      headers['Authorization'] = `Bearer ${API_TOKEN}`;
    }

    const res = await fetch(url.toString(), { headers });

    if (!res.ok) {
      console.warn(`[fetchAPI] Failed to fetch ${endpoint}: ${res.status} ${res.statusText}`);
      return null;
    }

    return await res.json();
  } catch (error) {
    console.warn(`[fetchAPI] Error fetching ${endpoint}:`, error);
    return null;
  }
}

/**
 * Submit form data to Strapi API using POST
 * @param {string} endpoint - The API endpoint (e.g., '/api/contact-form-submissions')
 * @param {object} data - The payload data
 * @returns {Promise<any>} The parsed JSON response
 */
export async function postAPI(endpoint, data) {
  try {
    const url = new URL(`${API_URL}${endpoint}`);
    
    const headers = {
      'Content-Type': 'application/json',
    };

    if (FORM_TOKEN) {
      headers['Authorization'] = `Bearer ${FORM_TOKEN}`;
    }

    const res = await fetch(url.toString(), {
      method: 'POST',
      headers,
      body: JSON.stringify({ data })
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.warn(`[postAPI] Failed to post to ${endpoint}: ${res.status} ${res.statusText}`, errorText);
      return { error: true, status: res.status, message: errorText };
    }

    return await res.json();
  } catch (error) {
    console.warn(`[postAPI] Error posting to ${endpoint}:`, error);
    return { error: true, message: error.message };
  }
}
