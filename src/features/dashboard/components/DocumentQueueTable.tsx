import React from 'react';
import { Eye, Pen, CheckSquare, ChevronLeft, ChevronRight } from 'lucide-react';
import { useApprovalQueue } from '../hooks/useApprovalQueue';

interface DocumentQueueTableProps {
  onSignDocument: (docNum: string, applicant: string, docType: string) => void;
}

export function DocumentQueueTable({ onSignDocument }: DocumentQueueTableProps) {
  const { requests } = useApprovalQueue();

  return (
    <section className="bg-surface-container-lowest rounded-lg shadow-sm p-unit-lg">
      {/* Table Header Toolbar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-unit-md mb-unit-lg pb-unit-sm">
        <div>
          <div className="flex items-center gap-unit-xs">
            <h2 className="font-title-lg text-title-lg text-on-surface">Antrean Dokumen Terkini</h2>
            <span className="px-unit-xs py-0.5 bg-primary text-on-primary font-label-sm text-label-sm rounded-full font-bold">
              5 Menunggu Tindakan
            </span>
          </div>
          <p className="font-body-sm text-body-sm text-outline">Daftar permohonan surat administrasi warga yang telah diverifikasi operator desa dan siap ditandatangani Kepala Desa.</p>
        </div>
        {/* Action Tabs / Filter Categories */}
        <div className="flex items-center gap-unit-2xs overflow-x-auto pb-unit-2xs md:pb-0">
          <button className="px-unit-md py-unit-xs bg-primary text-on-primary font-label-md text-label-md rounded-lg shadow-sm whitespace-nowrap" type="button">
            Semua (142)
          </button>
          <button className="px-unit-md py-unit-xs bg-surface-container hover:bg-surface-container-high text-on-surface-variant font-label-md text-label-md rounded-lg whitespace-nowrap" type="button">
            Mendesak / Prioritas (3)
          </button>
          <button className="px-unit-md py-unit-xs bg-surface-container hover:bg-surface-container-high text-on-surface-variant font-label-md text-label-md rounded-lg whitespace-nowrap" type="button">
            SKU Online (48)
          </button>
          <button className="px-unit-md py-unit-xs bg-surface-container hover:bg-surface-container-high text-on-surface-variant font-label-md text-label-md rounded-lg whitespace-nowrap" type="button">
            Pertanahan (12)
          </button>
        </div>
      </div>

      {/* Responsive Table Container */}
      <div className="overflow-x-auto w-full">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-surface-container-low text-outline font-label-md text-label-md uppercase tracking-wider">
              <th className="py-unit-sm px-unit-md rounded-l-lg">Nomor &amp; Tanggal</th>
              <th className="py-unit-sm px-unit-md">Jenis Surat</th>
              <th className="py-unit-sm px-unit-md">Pemohon / Warga</th>
              <th className="py-unit-sm px-unit-md">Verifikator Desa</th>
              <th className="py-unit-sm px-unit-md">Status Validasi</th>
              <th className="py-unit-sm px-unit-md text-right rounded-r-lg">Tindakan Pengesahan</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-surface-container text-body-md text-on-surface">
            {/* Row 1 */}
            <tr className="hover:bg-surface-container-low/50 transition-colors group">
              <td className="py-unit-md px-unit-md font-mono text-xs">
                <div className="font-semibold text-on-surface">503/089/SKU/VI/2024</div>
                <span className="text-outline text-[11px]">24 Mei 2024 • 08:30 WITA</span>
              </td>
              <td className="py-unit-md px-unit-md">
                <span className="inline-flex items-center px-2.5 py-1 rounded-md font-label-sm text-label-sm bg-secondary-container text-primary font-semibold">
                  Surat Keterangan Usaha (SKU)
                </span>
              </td>
              <td className="py-unit-md px-unit-md">
                <div className="font-title-md text-title-md text-on-surface">I Made Arya Kusuma</div>
                <div className="text-outline text-xs font-mono">NIK: 5171021408890001 • Dusun Batukandik</div>
              </td>
              <td className="py-unit-md px-unit-md">
                <div className="text-on-surface font-medium text-xs">Ni Luh Putu Sintya, S.Kom</div>
                <div className="text-outline text-[11px]">Kasi Pelayanan • Dokumen Lengkap</div>
              </td>
              <td className="py-unit-md px-unit-md">
                <span className="inline-flex items-center gap-1.5 text-xs text-primary font-semibold bg-secondary-container px-2.5 py-1 rounded-full">
                  <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                  Siap TTD Elektronik
                </span>
              </td>
              <td className="py-unit-md px-unit-md text-right">
                <div className="flex items-center justify-end gap-unit-xs">
                  <button aria-label="Lihat Pratinjau Dokumen" className="p-unit-xs rounded-lg hover:bg-surface-container text-outline hover:text-on-surface transition-colors" title="Lihat Pratinjau Dokumen" type="button">
                    <Eye size={20} />
                  </button>
                  <button 
                    className="px-unit-md py-unit-xs bg-primary hover:bg-deep-ruby text-on-primary font-label-md text-label-md rounded-lg shadow-sm transition-all flex items-center gap-1" 
                    onClick={() => onSignDocument('503/089/SKU/VI/2024', 'I Made Arya Kusuma', 'Surat Keterangan Usaha')} 
                    type="button"
                  >
                    <Pen size={16} />
                    <span>Teken Dokumen</span>
                  </button>
                </div>
              </td>
            </tr>
            {/* Row 2 */}
            <tr className="hover:bg-surface-container-low/50 transition-colors group">
              <td className="py-unit-md px-unit-md font-mono text-xs">
                <div className="font-semibold text-on-surface">470/112/Dom/VI/2024</div>
                <span className="text-outline text-[11px]">24 Mei 2024 • 09:15 WITA</span>
              </td>
              <td className="py-unit-md px-unit-md">
                <span className="inline-flex items-center px-2.5 py-1 rounded-md font-label-sm text-label-sm bg-surface-container-high text-on-surface font-semibold">
                  Surat Keterangan Domisili
                </span>
              </td>
              <td className="py-unit-md px-unit-md">
                <div className="font-title-md text-title-md text-on-surface">Yayasan Satya Dharma Pertiwi</div>
                <div className="text-outline text-xs font-mono">Ketua: Dr. Ketut Sujana, M.Pd</div>
              </td>
              <td className="py-unit-md px-unit-md">
                <div className="text-on-surface font-medium text-xs">Ni Luh Putu Sintya, S.Kom</div>
                <div className="text-outline text-[11px]">Kasi Pelayanan • Terverifikasi Akta</div>
              </td>
              <td className="py-unit-md px-unit-md">
                <span className="inline-flex items-center gap-1.5 text-xs text-primary font-semibold bg-secondary-container px-2.5 py-1 rounded-full">
                  <span className="w-2 h-2 rounded-full bg-primary"></span>
                  Siap TTD Elektronik
                </span>
              </td>
              <td className="py-unit-md px-unit-md text-right">
                <div className="flex items-center justify-end gap-unit-xs">
                  <button aria-label="Lihat Pratinjau Dokumen" className="p-unit-xs rounded-lg hover:bg-surface-container text-outline hover:text-on-surface transition-colors" title="Lihat Pratinjau Dokumen" type="button">
                    <Eye size={20} />
                  </button>
                  <button 
                    className="px-unit-md py-unit-xs bg-primary hover:bg-deep-ruby text-on-primary font-label-md text-label-md rounded-lg shadow-sm transition-all flex items-center gap-1" 
                    onClick={() => onSignDocument('470/112/Dom/VI/2024', 'Yayasan Satya Dharma Pertiwi', 'Surat Keterangan Domisili')} 
                    type="button"
                  >
                    <Pen size={16} />
                    <span>Teken Dokumen</span>
                  </button>
                </div>
              </td>
            </tr>
            {/* Row 3 */}
            <tr className="hover:bg-surface-container-low/50 transition-colors group">
              <td className="py-unit-md px-unit-md font-mono text-xs">
                <div className="font-semibold text-on-surface">590/041/Pem-DS/2024</div>
                <span className="text-outline text-[11px]">24 Mei 2024 • 10:02 WITA</span>
              </td>
              <td className="py-unit-md px-unit-md">
                <span className="inline-flex items-center px-2.5 py-1 rounded-md font-label-sm text-label-sm bg-secondary-container text-primary font-semibold">
                  Sporadik / Waris Tanah
                </span>
              </td>
              <td className="py-unit-md px-unit-md">
                <div className="font-title-md text-title-md text-on-surface">Gusti Ayu Made Rai Dewi</div>
                <div className="text-outline text-xs font-mono">NIK: 5171016503710003 • Dusun Gunung</div>
              </td>
              <td className="py-unit-md px-unit-md">
                <div className="text-on-surface font-medium text-xs">I Gede Wira Utama (Sekdes)</div>
                <div className="text-outline text-[11px]">Telah Dicek Tapal Batas Banjar</div>
              </td>
              <td className="py-unit-md px-unit-md">
                <span className="inline-flex items-center gap-1.5 text-xs text-primary font-semibold bg-secondary-container px-2.5 py-1 rounded-full">
                  <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                  Prioritas Kades
                </span>
              </td>
              <td className="py-unit-md px-unit-md text-right">
                <div className="flex items-center justify-end gap-unit-xs">
                  <button aria-label="Lihat Pratinjau Dokumen" className="p-unit-xs rounded-lg hover:bg-surface-container text-outline hover:text-on-surface transition-colors" title="Lihat Pratinjau Dokumen" type="button">
                    <Eye size={20} />
                  </button>
                  <button 
                    className="px-unit-md py-unit-xs bg-primary hover:bg-deep-ruby text-on-primary font-label-md text-label-md rounded-lg shadow-sm transition-all flex items-center gap-1" 
                    onClick={() => onSignDocument('590/041/Pem-DS/2024', 'Gusti Ayu Made Rai Dewi', 'Sporadik / Waris Tanah')} 
                    type="button"
                  >
                    <Pen size={16} />
                    <span>Teken Dokumen</span>
                  </button>
                </div>
              </td>
            </tr>
            {/* Row 4 */}
            <tr className="hover:bg-surface-container-low/50 transition-colors group">
              <td className="py-unit-md px-unit-md font-mono text-xs">
                <div className="font-semibold text-on-surface">460/328/Kesra/VI/2024</div>
                <span className="text-outline text-[11px]">24 Mei 2024 • 10:44 WITA</span>
              </td>
              <td className="py-unit-md px-unit-md">
                <span className="inline-flex items-center px-2.5 py-1 rounded-md font-label-sm text-label-sm bg-secondary-container text-primary font-semibold">
                  SK Tidak Mampu (SKTM)
                </span>
              </td>
              <td className="py-unit-md px-unit-md">
                <div className="font-title-md text-title-md text-on-surface">Kadek Dwi Purnomo</div>
                <div className="text-outline text-xs font-mono">NIK: 5171032109010005 • KIP Kuliah</div>
              </td>
              <td className="py-unit-md px-unit-md">
                <div className="text-on-surface font-medium text-xs">Ni Made Suwarni</div>
                <div className="text-outline text-[11px]">Kaur Kesra • Terdaftar DTKS Kemensos</div>
              </td>
              <td className="py-unit-md px-unit-md">
                <span className="inline-flex items-center gap-1.5 text-xs text-primary font-semibold bg-secondary-container px-2.5 py-1 rounded-full">
                  <span className="w-2 h-2 rounded-full bg-primary"></span>
                  Siap TTD Elektronik
                </span>
              </td>
              <td className="py-unit-md px-unit-md text-right">
                <div className="flex items-center justify-end gap-unit-xs">
                  <button aria-label="Lihat Pratinjau Dokumen" className="p-unit-xs rounded-lg hover:bg-surface-container text-outline hover:text-on-surface transition-colors" title="Lihat Pratinjau Dokumen" type="button">
                    <Eye size={20} />
                  </button>
                  <button 
                    className="px-unit-md py-unit-xs bg-primary hover:bg-deep-ruby text-on-primary font-label-md text-label-md rounded-lg shadow-sm transition-all flex items-center gap-1" 
                    onClick={() => onSignDocument('460/328/Kesra/VI/2024', 'Kadek Dwi Purnomo', 'Surat Keterangan Tidak Mampu')} 
                    type="button"
                  >
                    <Pen size={16} />
                    <span>Teken Dokumen</span>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Table Pagination & Bulk Action Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-unit-md mt-unit-lg pt-unit-md border-t border-surface-container">
        <div className="flex items-center gap-unit-sm">
          <button className="px-unit-sm py-unit-xs bg-primary hover:bg-deep-ruby rounded-lg text-xs font-semibold text-on-primary transition-colors flex items-center gap-1 shadow-sm" type="button">
            <CheckSquare size={16} />
            Tanda Tangani Massal (Batch Sign 5 Dokumen)
          </button>
          <span className="text-outline font-body-sm text-body-sm">Menampilkan 1-4 dari 142 antrean aktif</span>
        </div>
        <div className="flex items-center gap-1">
          <button aria-label="Halaman Sebelumnya" className="p-unit-xs rounded-lg hover:bg-surface-container text-outline disabled:opacity-40" disabled type="button">
            <ChevronLeft size={18} />
          </button>
          <span className="px-unit-sm py-1 bg-primary text-on-primary rounded font-label-sm text-label-sm font-bold">1</span>
          <button aria-label="Halaman 2" className="px-unit-sm py-1 hover:bg-surface-container rounded font-label-sm text-label-sm text-outline" type="button">2</button>
          <button aria-label="Halaman 3" className="px-unit-sm py-1 hover:bg-surface-container rounded font-label-sm text-label-sm text-outline" type="button">3</button>
          <span className="px-1 text-outline">...</span>
          <button aria-label="Halaman 15" className="px-unit-sm py-1 hover:bg-surface-container rounded font-label-sm text-label-sm text-outline" type="button">15</button>
          <button aria-label="Halaman Berikutnya" className="p-unit-xs rounded-lg hover:bg-surface-container text-outline" type="button">
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}
