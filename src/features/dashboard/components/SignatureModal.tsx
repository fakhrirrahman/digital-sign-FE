import React, { useState } from 'react';
import { X, ShieldCheck, Loader2, CheckCircle, BadgeCheck } from 'lucide-react';

interface SignatureModalProps {
  isOpen: boolean;
  onClose: () => void;
  documentData: {
    docNum: string;
    applicant: string;
    docType: string;
  } | null;
}

export function SignatureModal({ isOpen, onClose, documentData }: SignatureModalProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [passphrase, setPassphrase] = useState('');

  if (!isOpen || !documentData) return null;

  const handleSign = () => {
    setIsProcessing(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSuccess(true);
      setTimeout(() => {
        setIsProcessing(false);
        setIsSuccess(false);
        setPassphrase('');
        onClose();
      }, 1200);
    }, 900);
  };

  const handleClose = () => {
    if (isProcessing) return;
    setPassphrase('');
    setIsSuccess(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-inverse-surface/40 backdrop-blur-sm flex items-center justify-center p-unit-md transition-opacity">
      <div className="bg-surface-container-lowest rounded-xl max-w-lg w-full p-unit-xl shadow-2xl relative flex flex-col animate-in fade-in zoom-in-95 duration-200">
        {/* Drawer Close Button */}
        <button 
          className="absolute top-unit-md right-unit-md p-unit-xs rounded-full hover:bg-surface-container text-outline hover:text-on-surface" 
          onClick={handleClose} 
          type="button"
          disabled={isProcessing}
        >
          <X size={22} />
        </button>
        
        {/* Security Trust Badge */}
        <div className="flex items-center gap-unit-xs text-primary mb-unit-sm">
          <ShieldCheck size={24} />
          <span className="font-label-sm text-label-sm uppercase tracking-widest font-bold">Otorisasi Sertifikat Elektronik BSrE</span>
        </div>
        
        <h3 className="font-headline-md text-headline-md text-on-surface mb-unit-2xs">
          Pengesahan {documentData.docType}
        </h3>
        
        <p className="font-body-sm text-body-sm text-outline mb-unit-lg">
          Anda akan menandatangani dokumen secara digital sebagai <span className="font-semibold text-on-surface">Kepala Desa Pemecutan Kaja</span>. Tanda tangan ini memiliki kekuatan hukum yang sah.
        </p>
        
        {/* Document Metadata Card in Modal */}
        <div className="bg-surface-container-low p-unit-md rounded-lg mb-unit-lg space-y-unit-2xs font-body-sm text-body-sm">
          <div className="flex justify-between">
            <span className="text-outline">Nomor Surat:</span>
            <span className="font-mono font-semibold text-on-surface">{documentData.docNum}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-outline">Nama Pemohon:</span>
            <span className="font-semibold text-on-surface">{documentData.applicant}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-outline">Enkripsi Hash:</span>
            <span className="font-mono text-[11px] text-outline">SHA256: 7f83b165...e921b</span>
          </div>
        </div>
        
        {/* PIN Input Simulation */}
        <div className="mb-unit-lg">
          <label className="block font-label-md text-label-md text-on-surface mb-unit-2xs" htmlFor="passphraseInput">
            Masukkan PIN / Passphrase Sertifikat Pribadi
          </label>
          <div className="relative">
            <input 
              className="w-full text-center tracking-[1em] text-title-lg font-mono py-unit-sm px-unit-md bg-surface-container-low rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-on-surface" 
              id="passphraseInput" 
              maxLength={6} 
              placeholder="******" 
              type="password"
              value={passphrase}
              onChange={(e) => setPassphrase(e.target.value)}
              disabled={isProcessing || isSuccess}
            />
          </div>
          <span className="text-outline text-[11px] mt-1 block text-center">Dilindungi Enkripsi Kunci Privat Hardware Security Module (HSM)</span>
        </div>
        
        {/* Action Buttons */}
        <div className="flex items-center gap-unit-sm">
          <button 
            className="flex-1 py-unit-xs px-unit-md bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md text-label-md rounded-lg transition-colors disabled:opacity-50" 
            onClick={handleClose} 
            type="button"
            disabled={isProcessing || isSuccess}
          >
            Batal
          </button>
          <button 
            className="flex-1 py-unit-xs px-unit-md bg-primary hover:bg-deep-ruby text-on-primary font-label-md text-label-md rounded-lg shadow-sm transition-colors flex items-center justify-center gap-unit-xs disabled:opacity-50" 
            onClick={handleSign} 
            type="button"
            disabled={isProcessing || isSuccess || passphrase.length < 4}
          >
            {isProcessing && !isSuccess ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                <span>Memproses...</span>
              </>
            ) : isSuccess ? (
              <>
                <CheckCircle size={18} />
                <span>Selesai</span>
              </>
            ) : (
              <>
                <BadgeCheck size={18} />
                <span>Bubuhi TTD Digital</span>
              </>
            )}
          </button>
        </div>
        
        {/* Processing Toast / Alert Inside Modal */}
        {isSuccess && (
          <div className="mt-unit-md p-unit-sm bg-secondary-container rounded-lg text-center font-label-md text-label-md text-primary font-semibold">
            Dokumen Berhasil Diteken &amp; Diberikan Segel Waktu (TSA) BSrE!
          </div>
        )}
      </div>
    </div>
  );
}
