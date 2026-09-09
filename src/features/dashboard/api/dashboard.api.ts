export const dashboardApi = {
  getStats: async () => {
    const res = await fetch('/api/dashboard/stats', {
      headers: { 'Authorization': `Bearer fake-token-for-dev` }
    });
    return res.json();
  },
  
  getChartData: async () => {
    const res = await fetch('/api/dashboard/chart', {
      headers: { 'Authorization': `Bearer fake-token-for-dev` }
    });
    return res.json();
  },

  getSignerStatus: async () => {
    const res = await fetch('/api/signer-setup/status', {
      headers: { 'Authorization': `Bearer fake-token-for-dev` }
    });
    return res.json();
  },

  getApprovalQueue: async () => {
    const res = await fetch('/api/approval-process', {
      headers: { 'Authorization': `Bearer fake-token-for-dev` }
    });
    return res.json();
  }
};
