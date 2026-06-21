import { useEffect, useState } from 'react';

const API_BASE = import.meta.env.VITE_API_URL || '';

/**
 * usePortfolioData
 * Fetches the entire portfolio payload from GET /api/all in one request.
 * Returns { data, loading, error } so components can render loading/error
 * states gracefully instead of crashing on undefined data.
 */
export function usePortfolioData() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const res = await fetch(`${API_BASE}/api/all`);
        if (!res.ok) throw new Error(`Request failed with status ${res.status}`);
        const json = await res.json();
        if (!cancelled) {
          setData(json);
          setLoading(false);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message || 'Failed to load portfolio data');
          setLoading(false);
        }
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  return { data, loading, error };
}

/**
 * submitContactMessage
 * POSTs a contact-form submission to the backend.
 */
export async function submitContactMessage(payload) {
  const res = await fetch(`${API_BASE}/api/contact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  const json = await res.json();
  if (!res.ok) {
    throw new Error(json.error || 'Something went wrong sending your message.');
  }
  return json;
}
