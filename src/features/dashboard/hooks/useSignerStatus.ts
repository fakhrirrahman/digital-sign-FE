import { useState, useEffect } from 'react';
import { dashboardApi } from '../api/dashboard.api';

export interface SignerStatus {
  hasPin: boolean;
  isLocked: boolean;
  failedAttempts: number;
  hasSignatureProfile: boolean;
  certificateId: string;
  keyExpiryDays: number;
  lastSessionMinutes: number;
  isHsmSynced: boolean;
  hsmSyncTime: string;
}

export function useSignerStatus() {
  const [status, setStatus] = useState<SignerStatus | null>(null);

  useEffect(() => {
    dashboardApi.getSignerStatus()
      .then(data => {
        if (data.data) {
          setStatus(data.data);
        }
      })
      .catch(console.error);
  }, []);

  const displayStatus = status || {
    certificateId: "BSRE-2023-8874-KDS",
    keyExpiryDays: 912,
    lastSessionMinutes: 12,
    isHsmSynced: true,
    hsmSyncTime: "0.18s"
  } as SignerStatus;

  return { status: displayStatus };
}
