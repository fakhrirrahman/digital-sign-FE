import { useState, useEffect, useCallback } from 'react';
import { signerSetupApi } from '../api/signer-setup.api';

export interface SignerSetupStatus {
  hasPin: boolean;
  signatureImageKey?: string | null;
  // field lain dari API...
}

export function useSignerSetupStatus() {
  const [status, setStatus] = useState<SignerSetupStatus | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStatus = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await signerSetupApi.getStatus();
      setStatus(res.data);
    } catch (err: any) {
      console.error('Gagal mengambil status signer:', err);
      setError(err.message || 'Gagal mengambil data profil');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStatus();
  }, [fetchStatus]);

  return { status, isLoading, error, refetch: fetchStatus };
}
