import { LineChart } from '@mantine/charts';
import '@mantine/charts/styles.css';
import { useDashboardChart } from '../hooks/useDashboardChart';

export function DashboardChart() {
  const { chartData } = useDashboardChart();

  return (
    <div className="bg-surface-container-lowest p-unit-lg rounded-lg shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-unit-sm pb-unit-md">
        <div>
          <h2 className="font-title-lg text-title-lg text-on-surface">Statistik Penerbitan Surat &amp; Tanda Tangan Elektronik</h2>
          <p className="font-body-sm text-body-sm text-outline">Volume dokumen desa tervalidasi sertifikat elektronik per bulan (Tahun 2024)</p>
        </div>
        <div className="flex items-center gap-unit-2xs bg-surface-container-low p-1 rounded-lg self-start sm:self-auto">
          <button className="px-unit-sm py-1 font-label-sm text-label-sm bg-surface-container-lowest text-on-surface rounded shadow-sm" type="button">Bulanan</button>
          <button className="px-unit-sm py-1 font-label-sm text-label-sm text-outline hover:text-on-surface" type="button">Mingguan</button>
          <button className="px-unit-sm py-1 font-label-sm text-label-sm text-outline hover:text-on-surface" type="button">Harian</button>
        </div>
      </div>
      
      {/* Mantine LineChart */}
      <div className="w-full h-64 mt-unit-sm">
        <LineChart
          h={250}
          data={chartData}
          dataKey="month"
          series={[{ name: 'Berkas', color: 'red.8' }]}
          curveType="monotone"
          withDots={true}
          gridAxis="y"
          strokeWidth={3}
        />
      </div>
      
      {/* Breakdown Badges for High Demand Certificates */}
      <div className="mt-unit-lg pt-unit-md bg-surface-container-low rounded-lg p-unit-md grid grid-cols-2 sm:grid-cols-4 gap-unit-md">
        <div className="flex flex-col">
          <span className="font-label-sm text-label-sm text-outline">SKU Online</span>
          <span className="font-title-md text-title-md text-on-surface mt-0.5">842 Berkas</span>
          <div className="w-full bg-surface-container-high h-1.5 rounded-full mt-1.5 overflow-hidden">
            <div className="bg-primary h-full rounded-full" style={{ width: '78%' }}></div>
          </div>
        </div>
        <div className="flex flex-col">
          <span className="font-label-sm text-label-sm text-outline">SK Domisili</span>
          <span className="font-title-md text-title-md text-on-surface mt-0.5">512 Berkas</span>
          <div className="w-full bg-surface-container-high h-1.5 rounded-full mt-1.5 overflow-hidden">
            <div className="bg-crimson-bright h-full rounded-full" style={{ width: '55%' }}></div>
          </div>
        </div>
        <div className="flex flex-col">
          <span className="font-label-sm text-label-sm text-outline">SKTM (Bansos)</span>
          <span className="font-title-md text-title-md text-on-surface mt-0.5">329 Berkas</span>
          <div className="w-full bg-surface-container-high h-1.5 rounded-full mt-1.5 overflow-hidden">
            <div className="bg-secondary-fixed-dim h-full rounded-full" style={{ width: '40%' }}></div>
          </div>
        </div>
        <div className="flex flex-col">
          <span className="font-label-sm text-label-sm text-outline">Akta Hibah/Sporadik</span>
          <span className="font-title-md text-title-md text-on-surface mt-0.5">157 Berkas</span>
          <div className="w-full bg-surface-container-high h-1.5 rounded-full mt-1.5 overflow-hidden">
            <div className="bg-tertiary-container h-full rounded-full" style={{ width: '25%' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
}
