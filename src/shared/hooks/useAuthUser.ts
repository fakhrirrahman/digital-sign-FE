import { useState, useEffect } from 'react';
import { dashboardApi } from '../../features/dashboard/api/dashboard.api';

export interface AuthUser {
  id: string;
  name: string;
  email?: string;
  telepon?: string;
  role?: {
    id: string;
    name: string;
  };
  penduduk?: {
    id: string;
    nik: string;
    nama_lengkap: string;
  };
}

// Simple global cache to avoid redundant fetching across components
let globalUserCache: AuthUser | null = null;
let globalUserPromise: Promise<any> | null = null;

export function useAuthUser() {
  const [user, setUser] = useState<AuthUser | null>(globalUserCache);
  const [isLoading, setIsLoading] = useState(!globalUserCache);

  useEffect(() => {
    if (globalUserCache) {
      return; // Already loaded
    }

    if (!globalUserPromise) {
      globalUserPromise = dashboardApi.getAuthUser();
    }

    globalUserPromise
      .then(res => {
        const userData = res.data;
        globalUserCache = userData;
        setUser(userData);
      })
      .catch(err => {
        console.error("Failed to load user:", err);
        // Reset promise on error so it can be retried if needed
        globalUserPromise = null;
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return { user, isLoading };
}
