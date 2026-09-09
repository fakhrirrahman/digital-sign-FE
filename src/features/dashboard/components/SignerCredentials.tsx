import React from 'react';
import { Key, Lock } from 'lucide-react';
import { useSignerStatus } from '../hooks/useSignerStatus';
import { useAuthUser } from '../../../shared/hooks/useAuthUser';

export function SignerCredentials() {
  const { status: displayStatus } = useSignerStatus();
  const { user } = useAuthUser();
  
  // Ambil inisial dari nama
  const initials = user?.name
    ? user.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()
    : 'WS';
    
  const nik = user?.penduduk?.nik || user?.telepon || '197804122005011004';

  return (
    <div className="lg:col-span-4 flex flex-col gap-unit-md">
      {/* Pejabat Penandatangan Active Card */}
      <div className="bg-surface-container-lowest p-unit-lg rounded-lg shadow-sm flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-unit-md">
            <h3 className="font-title-lg text-title-lg text-on-surface">Kredensial Penandatangan</h3>
            <span className="inline-flex items-center gap-1 font-label-sm text-label-sm text-primary bg-secondary-container px-2 py-0.5 rounded-full font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-ping"></span>
              Aktif
            </span>
          </div>
          <div className="flex items-center gap-unit-md p-unit-sm bg-surface-container-low rounded-lg mb-unit-md">
            <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-on-primary font-headline-md text-headline-md shadow-sm">
              {initials}
            </div>
            <div className="flex flex-col min-w-0">
              <span className="font-title-md text-title-md text-on-surface truncate">{user?.name || 'I Wayan Sudarma, S.IP'}</span>
              <span className="font-body-sm text-body-sm text-outline truncate">{user?.role?.name || 'Kades Pemecutan Kaja'}</span>
              <span className="font-label-sm text-label-sm text-primary font-mono mt-0.5">NIK: {nik}</span>
            </div>
          </div>
          <div className="space-y-unit-sm font-body-sm text-body-sm">
            <div className="flex justify-between items-center py-unit-2xs border-b border-surface-container">
              <span className="text-outline">Sertifikat BSrE ID</span>
              <span className="font-mono text-on-surface font-semibold text-xs">{displayStatus.certificateId}</span>
            </div>
            <div className="flex justify-between items-center py-unit-2xs border-b border-surface-container">
              <span className="text-outline">Masa Berlaku Kunci</span>
              <span className="text-on-surface font-semibold text-xs">{displayStatus.keyExpiryDays} hari tersisa</span>
            </div>
            <div className="flex justify-between items-center py-unit-2xs">
              <span className="text-outline">Sesi Terakhir</span>
              <span className="text-primary font-semibold text-xs">{displayStatus.lastSessionMinutes} menit lalu • Biometrik OK</span>
            </div>
          </div>
        </div>
        <button className="w-full mt-unit-md py-unit-xs px-unit-sm rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md text-label-md transition-colors flex items-center justify-center gap-unit-xs" type="button">
          <Key size={18} />
          <span>Perbarui Passphrase Kunci</span>
        </button>
      </div>

      {/* Module Status: HSM & Jaringan Desa */}
      <div className="bg-surface-container-lowest p-unit-md rounded-lg shadow-sm">
        <div className="flex items-center gap-unit-sm mb-unit-sm">
          <Lock size={22} className="text-primary" />
          <span className="font-title-md text-title-md text-on-surface">Validasi Protokol BSSN</span>
        </div>
        <p className="font-body-sm text-body-sm text-outline mb-unit-md">
          Node Otorisasi Terkoneksi ke Root CA Republik Indonesia dengan enkripsi asimetris SHA-256 with RSA.
        </p>
        <div className="bg-surface-container-low rounded-lg p-unit-sm space-y-unit-2xs">
          <div className="flex items-center justify-between text-xs">
            <span className="text-on-surface-variant font-medium">HSM Cloud Sync</span>
            <span className="text-primary font-bold">{displayStatus.isHsmSynced ? `Sinkron (${displayStatus.hsmSyncTime})` : 'Tidak Sinkron'}</span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-on-surface-variant font-medium">Timestamp Authority (TSA)</span>
            <span className="text-primary font-bold">Tersegel Otomatis</span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-on-surface-variant font-medium">Cadangan Dokumen Terenkripsi</span>
            <span className="text-primary font-bold">Aktif • ISO 27001</span>
          </div>
        </div>
      </div>
    </div>
  );
}
