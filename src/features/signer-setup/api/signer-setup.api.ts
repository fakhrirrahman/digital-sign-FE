const getToken = () => localStorage.getItem('auth_token');

const getBaseUrl = () => import.meta.env.VITE_API_BASE_URL || '';

const requestJson = async (url: string, options: RequestInit = {}) => {
  let token = getToken();

  if (!token) {
    throw new Error('Sesi login tidak ditemukan. Silakan login ulang.');
  }

  const executeRequest = async (currentToken: string) => {
    const isFormData = options.body instanceof FormData;
    const headers: Record<string, string> = {
      'Authorization': `Bearer ${currentToken}`,
      ...options.headers as Record<string, string>,
    };

    if (!isFormData && !headers['Content-Type']) {
      headers['Content-Type'] = 'application/json';
    }

    return fetch(`${getBaseUrl()}${url}`, {
      ...options,
      headers,
    });
  };

  let res = await executeRequest(token);

  // If 401, try to refresh token
  if (res.status === 401) {
    try {
      const refreshRes = await fetch(`${getBaseUrl()}/api/auth/refresh`, {
        method: 'POST',
        credentials: 'include',
      });

      if (refreshRes.ok) {
        const refreshData = await refreshRes.json();
        const newToken = refreshData.data?.access_token || refreshData.access_token;
        if (newToken) {
          localStorage.setItem('auth_token', newToken);
          res = await executeRequest(newToken);
        } else {
          throw new Error('Format token baru tidak valid');
        }
      } else {
        localStorage.removeItem('auth_token');
        throw new Error('Sesi telah berakhir. Silakan login ulang.');
      }
    } catch (refreshErr) {
      console.error('Failed to refresh token:', refreshErr);
      throw new Error('Sesi telah berakhir. Silakan login ulang.');
    }
  }

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || errorData.error || 'Terjadi kesalahan pada server');
  }

  return res.json();
};

export const signerSetupApi = {
  getStatus: async () => {
    return requestJson('/api/signer-setup/status');
  },

  setupPin: async (pin: string) => {
    return requestJson('/api/signer-setup/pin', {
      method: 'POST',
      body: JSON.stringify({ pin }),
    });
  },

  upsertProfile: async (signatureImageKey: string) => {
    return requestJson('/api/signer-setup/profile', {
      method: 'POST',
      body: JSON.stringify({ signatureImageKey }),
    });
  },

  uploadSignatureImage: async (file: File, accountId: string) => {
    const formData = new FormData();
    formData.append('module', 'account');
    formData.append('account_id', accountId);
    formData.append('file', file);

    const presignData = await requestJson('/api/upload/presign', {
      method: 'POST',
      body: formData,
    });

    if (!presignData || !presignData.data || !presignData.data.upload_url || !presignData.data.key) {
      throw new Error('Format balasan presign tidak valid dari server');
    }

    const { upload_url, key, content_type } = presignData.data;

    // 2. Upload file directly to R2
    const uploadRes = await fetch(upload_url, {
      method: 'PUT',
      headers: {
        'Content-Type': file.type || content_type,
      },
      body: file,
    });

    if (!uploadRes.ok) {
      throw new Error('Gagal mengunggah berkas ke penyimpanan Cloud');
    }

    return key as string;
  }
};
