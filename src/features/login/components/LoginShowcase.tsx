import React from 'react';
import { BadgeCheck, FileText, Users, Eye } from 'lucide-react';
import ossLogo from '../../../assets/oss.png';

export function LoginShowcase() {
  return (
    <div className="lg:col-span-5 bg-gradient-to-br from-[#7f1d1d] via-[#991b1b] to-[#b91c1c] text-on-primary p-4 sm:p-6 lg:p-8 flex flex-col justify-between relative overflow-hidden">
      <svg className="absolute -right-16 -top-16 w-80 h-80 opacity-10 pointer-events-none" fill="currentColor" viewBox="0 0 200 200">
        <path d="M42.7,-62.9C53.8,-52.8,60.2,-38.5,65.3,-23.7C70.4,-8.9,74.2,6.5,70.6,20.4C67,34.3,55.9,46.7,43,55.2C30.1,63.7,15,68.3,-0.9,69.5C-16.8,70.7,-33.5,68.6,-46.8,59.9C-60,51.2,-69.7,35.9,-72.6,19.6C-75.5,3.3,-71.5,-14.1,-63.4,-28.9C-55.3,-43.7,-43.1,-55.9,-29.7,-64.8C-16.3,-73.7,-1.8,-79.3,11.8,-77.4C25.4,-75.5,31.6,-73,42.7,-62.9Z" transform="translate(100 100)"></path>
      </svg>
      
      <div className="relative z-10">
        {/* Official Platform Identity */}
        <div className="flex items-center gap-3 mb-4 lg:mb-6">
          <div className="w-12 h-12 rounded-xl bg-surface-container-lowest p-1 shadow-md flex-shrink-0">
            <img alt="OSS Desa Logo" className="w-full h-full object-contain rounded-lg" src={ossLogo} />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-headline-md text-on-primary tracking-tight">OSS Desa</span>
            </div>
            <p className="font-label-sm text-red-200 tracking-wider uppercase">Sistem Layanan Terpadu Desa</p>
          </div>
        </div>

        {/* Hero Typography */}
        <h1 className="font-headline-md lg:font-headline-lg text-on-primary mb-2 lg:mb-4 leading-tight">
          Portal Layanan Terpadu Satu Pintu Pemerintahan Desa
        </h1>
        <p className="font-body-sm lg:font-body-md text-red-100 mb-4 lg:mb-6 leading-relaxed">
          Sistem informasi manajemen desa terpadu untuk memudahkan pelayanan administrasi masyarakat dan memajukan tata kelola desa.
        </p>

        {/* Security Badges Showcase */}
        <div className="mb-4 lg:mb-6">
          <span className="font-label-sm text-red-200 uppercase tracking-wider block mb-2">Nilai Utama Pelayanan</span>
          <div className="grid grid-cols-3 gap-2.5">
            <div className="bg-on-primary/10 backdrop-blur-sm p-3 rounded-lg flex flex-col items-center justify-center text-center">
              <BadgeCheck size={24} className="text-red-200 mb-1" />
              <span className="font-label-sm font-bold text-on-primary">Cepat</span>
              <span className="font-label-sm text-[9px] text-red-100 leading-tight mt-1">Layanan Prima</span>
            </div>
            <div className="bg-on-primary/10 backdrop-blur-sm p-3 rounded-lg flex flex-col items-center justify-center text-center">
              <FileText size={24} className="text-red-200 mb-1" />
              <span className="font-label-sm font-bold text-on-primary">Akurat</span>
              <span className="font-label-sm text-[9px] text-red-100 leading-tight mt-1">Data Terintegrasi</span>
            </div>
            <div className="bg-on-primary/10 backdrop-blur-sm p-3 rounded-lg flex flex-col items-center justify-center text-center">
              <Eye size={24} className="text-red-200 mb-1" />
              <span className="font-label-sm font-bold text-on-primary">Transparan</span>
              <span className="font-label-sm text-[9px] text-red-100 leading-tight mt-1">Terbuka &amp; Informatif</span>
            </div>
          </div>
        </div>

        {/* Feature Cards / Security Pillars */}
        <div className="space-y-2">
          <div className="flex items-start gap-2.5 bg-on-primary/10 p-2.5 rounded-lg">
            <FileText size={20} className="text-red-200 mt-0.5 shrink-0" />
            <div>
              <p className="font-label-md text-on-primary font-bold">Pelayanan Persuratan</p>
              <p className="font-body-sm text-red-100">Layanan pembuatan surat pengantar, keterangan, dan perizinan desa secara otomatis.</p>
            </div>
          </div>
          <div className="flex items-start gap-2.5 bg-on-primary/10 p-2.5 rounded-lg">
            <Users size={20} className="text-red-200 mt-0.5 shrink-0" />
            <div>
              <p className="font-label-md text-on-primary font-bold">Administrasi Penduduk</p>
              <p className="font-body-sm text-red-100">Pengelolaan dan visualisasi data kependudukan, statistik, dan potensi desa yang terpusat.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Security Metric Sparkline Indicator */}
      <div className="mt-4 pt-4 border-none bg-black/20 -mx-4 -mb-4 sm:-mx-6 sm:-mb-6 lg:-mx-8 lg:-mb-8 p-4 lg:p-6 flex items-center justify-between">
        <div>
          <div className="font-label-sm text-red-200 uppercase">Status Sistem Layanan</div>
          <div className="font-title-md text-on-primary flex items-center gap-1.5 mt-0.5">
            <span className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse"></span>
            Sistem Online
          </div>
        </div>
      </div>
    </div>
  );
}
