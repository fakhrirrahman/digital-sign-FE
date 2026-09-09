import React, { type ReactNode } from 'react';
import { ActionIcon, Indicator, Avatar } from '@mantine/core';

interface DashboardLayoutProps {
  children: ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="bg-surface font-body-md text-body-md text-on-surface antialiased min-h-screen flex flex-col">
      <header className="fixed top-0 left-0 w-full z-50 bg-surface-container-lowest/95 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
        <div className="h-28 w-full px-gutter-desktop flex flex-col justify-between pt-unit-xs">
          <div className="h-14 flex items-center justify-between gap-unit-lg">
            <div className="flex items-center gap-unit-md">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-on-primary shadow-sm">
                <span className="material-symbols-outlined text-[20px]">verified_user</span>
              </div>
              <div className="flex flex-col">
                <span className="font-title-md text-title-md text-on-surface tracking-tight">TandaDesa Otentikasi</span>
                <span className="font-label-sm text-label-sm text-primary uppercase tracking-wider font-semibold">Portal Sertifikasi BSrE / BSSN</span>
              </div>
            </div>
            <div className="flex-1 max-w-lg hidden lg:flex items-center">
              <div className="relative w-full">
                <span className="material-symbols-outlined absolute left-unit-sm top-1/2 -translate-y-1/2 text-outline text-[18px]">search</span>
                <input 
                  className="w-full pl-unit-xl pr-unit-md py-unit-xs bg-surface-container-low rounded-lg font-body-sm text-body-sm text-on-surface placeholder:text-outline focus:outline-none focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary/30 transition-all" 
                  placeholder="Cari NIK warga, jenis permohonan surat, atau nomor register..." 
                  type="search" 
                />
              </div>
            </div>
            <div className="flex items-center gap-unit-md">
              <div className="hidden sm:flex items-center gap-unit-2xs bg-secondary-container px-unit-sm py-unit-2xs rounded-full">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                <span className="font-label-sm text-label-sm text-on-secondary-container font-semibold">HSM Aktif</span>
              </div>
              <div className="relative flex items-center justify-center">
                <Indicator color="red" size={8} offset={4} processing>
                  <ActionIcon variant="subtle" radius="xl" size="lg" color="gray">
                    <span className="material-symbols-outlined text-[22px]">notifications</span>
                  </ActionIcon>
                </Indicator>
              </div>
              <div className="flex items-center gap-unit-sm pl-unit-xs">
                <div className="hidden md:flex flex-col text-right">
                  <span className="font-label-md text-label-md text-on-surface">I Wayan Sudarma, S.IP</span>
                  <span className="font-label-sm text-label-sm text-outline">Kepala Desa (Kelihan)</span>
                </div>
                <Avatar color="red" radius="xl">
                  <span className="material-symbols-outlined text-[18px]">person</span>
                </Avatar>
              </div>
            </div>
          </div>
          <div className="h-12 flex items-center">
            <nav className="flex items-center gap-unit-xs overflow-x-auto py-unit-2xs">
              <a className="px-unit-md py-unit-xs bg-primary text-on-primary font-label-md text-label-md rounded-lg shadow-sm whitespace-nowrap" href="#">Beranda/Dashboard</a>
              <a className="px-unit-md py-unit-xs text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface font-label-md text-label-md rounded-lg transition-colors whitespace-nowrap" href="#">Antrean Dokumen</a>
              <a className="px-unit-md py-unit-xs text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface font-label-md text-label-md rounded-lg transition-colors whitespace-nowrap" href="#">Review &amp; Sign</a>
              <a className="px-unit-md py-unit-xs text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface font-label-md text-label-md rounded-lg transition-colors whitespace-nowrap" href="#">Signer Setup</a>
              <a className="px-unit-md py-unit-xs text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface font-label-md text-label-md rounded-lg transition-colors whitespace-nowrap" href="#">Riwayat &amp; Audit</a>
              <a className="px-unit-md py-unit-xs text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface font-label-md text-label-md rounded-lg transition-colors whitespace-nowrap" href="#">Pengaturan</a>
            </nav>
          </div>
        </div>
      </header>

      <main className="w-full pt-28 bg-surface flex-1 px-gutter-desktop">
        <div className="flex flex-col w-full pb-unit-2xl">
          {children}
        </div>
      </main>

      <footer className="w-full bg-surface-container-lowest mt-unit-2xl py-unit-lg">
        <div className="w-full px-gutter-desktop flex flex-col md:flex-row items-center justify-between gap-unit-md">
          <div className="flex items-center gap-unit-sm">
            <span className="material-symbols-outlined text-primary text-[20px]">verified_user</span>
            <p className="font-body-sm text-body-sm text-outline">TandaDesa Otentikasi • Sistem Pengesahan Digital Terintegrasi BSrE BSSN &amp; Notika Core.</p>
          </div>
          <div className="flex items-center gap-unit-lg">
            <span className="font-label-sm text-label-sm text-outline">Protokol ISO/IEC 27001 Terverifikasi</span>
            <span className="font-body-sm text-body-sm text-outline">© 2024 Nexus Govern. Hak Cipta Dilindungi.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
