import { useState, useEffect } from 'react';
import { dashboardApi } from '../api/dashboard.api';

export interface ChartDataPoint {
  month: string;
  Berkas: number;
}

const defaultChartData: ChartDataPoint[] = [
  { month: 'Jan', Berkas: 120 },
  { month: 'Feb', Berkas: 145 },
  { month: 'Mar', Berkas: 210 },
  { month: 'Apr', Berkas: 240 },
  { month: 'Mei', Berkas: 220 },
  { month: 'Jun', Berkas: 300 },
  { month: 'Jul', Berkas: 310 },
  { month: 'Agu', Berkas: 350 },
  { month: 'Sep', Berkas: 410 },
  { month: 'Okt', Berkas: 390 },
  { month: 'Nov', Berkas: 450 },
  { month: 'Des', Berkas: 520 },
];

export function useDashboardChart() {
  const [chartData, setChartData] = useState<ChartDataPoint[]>(defaultChartData);

  useEffect(() => {
    dashboardApi.getChartData()
      .then(data => {
        if (data.data) {
          setChartData(data.data);
        }
      })
      .catch(console.error);
  }, []);

  return { chartData };
}
