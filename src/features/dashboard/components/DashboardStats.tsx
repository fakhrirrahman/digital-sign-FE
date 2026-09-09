import React from 'react';
import { BadgeCheck, Timer } from 'lucide-react';
import { useDashboardStats } from '../hooks/useDashboardStats';

export function DashboardStats() {
  const { stats } = useDashboardStats();

  return (
    <section className="w-full pt-unit-md mb-unit-lg">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-unit-md">
        {/* Card 1: Antrean Menunggu TTD */}
        <div className="bg-surface-container-lowest rounded-lg p-unit-md shadow-sm hover:shadow-md transition-all flex items-center justify-between relative overflow-hidden group">
          <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-primary"></div>
          <div className="flex flex-col">
            <span className="font-headline-lg text-headline-lg text-on-surface tracking-tight">{stats.pendingSignatures}</span>
            <span className="font-label-md text-label-md text-outline">Antrean Menunggu TTD</span>
            <div className="flex items-center gap-unit-2xs mt-unit-xs">
              <span className="inline-flex items-center px-unit-xs py-0.5 rounded-full font-label-sm text-label-sm bg-secondary-container text-primary font-semibold">
                +14% bln ini
              </span>
              <span className="font-body-sm text-body-sm text-outline">Perlu atensi</span>
            </div>
          </div>
          <div className="w-20 h-10 flex items-center justify-end">
            <svg className="w-full h-full text-primary" fill="none" viewBox="0 0 100 40">
              <path d="M0 32 Q 25 10, 45 28 T 85 8 L 100 18" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5"></path>
            </svg>
          </div>
        </div>

        {/* Card 2: Total Surat Terbit & Tervalidasi */}
        <div className="bg-surface-container-lowest rounded-lg p-unit-md shadow-sm hover:shadow-md transition-all flex items-center justify-between relative overflow-hidden group">
          <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-deep-ruby"></div>
          <div className="flex flex-col">
            <span className="font-headline-lg text-headline-lg text-on-surface tracking-tight">{stats.totalSigned.toLocaleString('id-ID')}</span>
            <span className="font-label-md text-label-md text-outline">Surat Terbit &amp; Tervalidasi</span>
            <div className="flex items-center gap-unit-2xs mt-unit-xs">
              <span className="inline-flex items-center px-unit-xs py-0.5 rounded-full font-label-sm text-label-sm bg-secondary-container text-deep-ruby font-semibold">
                Tersertifikasi
              </span>
              <span className="font-body-sm text-body-sm text-outline">Tahun 2024</span>
            </div>
          </div>
          <div className="w-20 h-10 flex items-center justify-end">
            <svg className="w-full h-full text-deep-ruby" fill="none" viewBox="0 0 100 40">
              <path d="M0 35 L 20 25 L 40 30 L 60 12 L 80 18 L 100 5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5"></path>
            </svg>
          </div>
        </div>

        {/* Card 3: Kepatuhan BSrE / BSSN */}
        <div className="bg-surface-container-lowest rounded-lg p-unit-md shadow-sm hover:shadow-md transition-all flex items-center justify-between relative overflow-hidden group">
          <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-secondary"></div>
          <div className="flex flex-col">
            <span className="font-headline-lg text-headline-lg text-on-surface tracking-tight">{stats.integrityPercentage}%</span>
            <span className="font-label-md text-label-md text-outline">Integritas BSrE &amp; BSSN</span>
            <div className="flex items-center gap-unit-2xs mt-unit-xs">
              <span className="inline-flex items-center px-unit-xs py-0.5 rounded-full font-label-sm text-label-sm bg-secondary-container text-secondary font-semibold">
                RSA 2048-bit
              </span>
              <span className="font-body-sm text-body-sm text-outline">Valid</span>
            </div>
          </div>
          <div className="w-12 h-12 rounded-full bg-secondary-container flex items-center justify-center text-primary">
            <BadgeCheck size={26} />
          </div>
        </div>

        {/* Card 4: Kecepatan Layanan */}
        <div className="bg-surface-container-lowest rounded-lg p-unit-md shadow-sm hover:shadow-md transition-all flex items-center justify-between relative overflow-hidden group">
          <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-tertiary"></div>
          <div className="flex flex-col">
            <span className="font-headline-lg text-headline-lg text-on-surface tracking-tight">{stats.avgTimeMinutes} mnt</span>
            <span className="font-label-md text-label-md text-outline">Rata-rata Waktu TTD</span>
            <div className="flex items-center gap-unit-2xs mt-unit-xs">
              <span className="inline-flex items-center px-unit-xs py-0.5 rounded-full font-label-sm text-label-sm bg-surface-container-high text-tertiary font-semibold">
                -12 mnt vs 2023
              </span>
            </div>
          </div>
          <div className="w-12 h-12 rounded-full bg-surface-container-low flex items-center justify-center text-tertiary">
            <Timer size={26} />
          </div>
        </div>
      </div>
    </section>
  );
}
