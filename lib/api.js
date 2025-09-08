
const API = process.env.NEXT_PUBLIC_API_URL || '';

async function request(path, opts = {}) {
  const url = `${API}${path}`;
  const defaultHeaders = { 'Content-Type': 'application/json' };
  const merged = {
    headers: { ...defaultHeaders, ...(opts.headers || {}) },
    ...opts
  };
  try {
    const res = await fetch(url, merged);
    const contentType = res.headers.get('content-type') || '';
    const isJson = contentType.includes('application/json');
    const body = isJson ? await res.json() : await res.text();
    if (!res.ok) {
      const message = body && body.message ? body.message : res.statusText;
      const err = new Error(message || 'Request failed');
      err.status = res.status;
      err.body = body;
      throw err;
    }
    return body;
  } catch (err) {
    throw err;
  }
}

export async function getProfile() {
  return request('/profile/get', { method: 'GET' });
}

export async function updateProfile(data, token) {
  return request('/profile/update', {
    method: 'PUT',
    body: JSON.stringify(data),
    headers: { Authorization: `Bearer ${token}` }
  });
}

export async function getProjects(query = '') {
  const q = query ? `?${query}` : '';
  const res = await request(`/projects${q}`, { method: 'GET' });
  return Array.isArray(res) ? res : res.data || [];
}

export async function getTopSkills() {
  return request('/skills/top', { method: 'GET' });
}

export async function search(q) {
  const encoded = encodeURIComponent(q || '');
  return request(`/search?q=${encoded}`, { method: 'GET' });
}
