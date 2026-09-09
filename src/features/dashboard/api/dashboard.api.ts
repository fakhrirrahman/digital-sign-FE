const getToken = () => localStorage.getItem('auth_token');

const requestJson = async (url: string) => {
  const token = getToken();

  if (!token) {
    throw new Error('Sesi login tidak ditemukan. Silakan login ulang.');
  }

  const baseUrl = import.meta.env.VITE_API_BASE_URL || '';
  const res = await fetch(`${baseUrl}${url}`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });

  const contentType = res.headers.get('content-type') ?? '';
  const body = contentType.includes('application/json')
    ? await res.json()
    : await res.text();

  if (!res.ok) {
    const message = typeof body === 'string'
      ? body
      : body?.error?.message ?? body?.message ?? 'Request gagal';

    if (res.status === 401) {
      localStorage.removeItem('auth_token');
      window.location.assign('/login');
    }

    throw new Error(`${res.status} ${res.statusText}: ${message}`);
  }

  return body;
};

export const dashboardApi = {
  getStats: async () => {
    return requestJson('/api/dashboard/stats');
  },
  
  getChartData: async () => {
    return requestJson('/api/dashboard/chart');
  },

  getSignerStatus: async () => {
    return requestJson('/api/signer-setup/status');
  },

  getApprovalQueue: async () => {
    return requestJson('/api/approval-process');
  },

  getAuthUser: async () => {
    return requestJson('/api/auth/me');
  }
};
