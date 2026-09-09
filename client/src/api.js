const BASE_URL = '/api';

async function handleResponse(res) {
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const error = new Error(data.error || `Request failed with status ${res.status}`);
    error.status = res.status;
    throw error;
  }
  return data;
}

export async function fetchCars(filters = {}) {
  const params = new URLSearchParams();
  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      params.set(key, value);
    }
  });
  const query = params.toString();
  const res = await fetch(`${BASE_URL}/cars${query ? `?${query}` : ''}`);
  return handleResponse(res);
}

export async function fetchCarById(id) {
  const res = await fetch(`${BASE_URL}/cars/${id}`);
  return handleResponse(res);
}

export async function fetchMeta() {
  const res = await fetch(`${BASE_URL}/meta`);
  return handleResponse(res);
}

export async function submitInquiry(payload) {
  const res = await fetch(`${BASE_URL}/inquiries`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  return handleResponse(res);
}
