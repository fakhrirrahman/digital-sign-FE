import { useState, useEffect } from 'react';
import { dashboardApi } from '../api/dashboard.api';

export interface Stats {
  pendingSignatures: number;
  totalSigned: number;
  integrityPercentage: number;
  avgTimeMinutes: number;
}

export function useDashboardStats() {
  const [stats, setStats] = useState<Stats>({
    pendingSignatures: 142,
    totalSigned: 1840,
    integrityPercentage: 99.4,
    avgTimeMinutes: 28,
  });

  useEffect(() => {
    dashboardApi.getStats()
      .then(data => {
        if (data.data) {
          setStats(data.data);
        }
      })
      .catch(console.error);
  }, []);

  return { stats };
}
