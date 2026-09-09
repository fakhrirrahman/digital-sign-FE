import { useState, useEffect } from 'react';
import { dashboardApi } from '../api/dashboard.api';

export function useApprovalQueue() {
  const [requests, setRequests] = useState<any[]>([]);

  useEffect(() => {
    dashboardApi.getApprovalQueue()
      .then(data => {
        if (data.data?.requests) {
          setRequests(data.data.requests);
        }
      })
      .catch(console.error);
  }, []);

  return { requests };
}
