import React, { useRef, useState } from 'react';
import { PenTool, UploadCloud, Check, X, Image as ImageIcon, Edit3 } from 'lucide-react';
import { signerSetupApi } from '../api/signer-setup.api';
import { SignatureCanvas } from './SignatureCanvas';

import { useAuthUser } from '../../../shared/hooks/useAuthUser';

interface SignatureProfileCardProps {
  signatureImageKey?: string;
  onSuccess: () => void;
}

export function SignatureProfileCard({ signatureImageKey, onSuccess }: SignatureProfileCardProps) {
  const { user } = useAuthUser();
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [mode, setMode] = useState<'upload' | 'draw'>('upload');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const baseUrl = import.meta.env.VITE_API_BASE_URL || '';
  const existingImageUrl = signatureImageKey 
    ? `${baseUrl}/api/upload/view?module=account&key=${encodeURIComponent(signatureImageKey)}`
    : null;

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selected = e.target.files[0];
      if (!selected.type.startsWith('image/')) {
        setError('Harap pilih berkas gambar (PNG/JPG).');
        return;
      }
      if (selected.size > 3 * 1024 * 1024) {
        setError('Ukuran gambar maksimal 3MB.');
        return;
      }
      setFile(selected);
      setError('');
      setSuccess('');
      
      const objectUrl = URL.createObjectURL(selected);
      setPreviewUrl(objectUrl);
    }
  };

  const processFileAndUpload = async (fileToUpload: File) => {
    if (!user?.account_id) {
      setError('Data akun tidak ditemukan');
      return;
    }

    setIsSubmitting(true);
    setError('');
    setSuccess('');

    try {
      const key = await signerSetupApi.uploadSignatureImage(fileToUpload, user.account_id);
      await signerSetupApi.upsertProfile(key);
      
      setSuccess('Profil Tanda Tangan berhasil disimpan!');
      setFile(null);
      setPreviewUrl(null);
      setMode('upload'); // Switch back to view mode basically
      onSuccess();
    } catch (err: any) {
      setError(err.message || 'Gagal mengunggah tanda tangan');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpload = () => {
    if (file) processFileAndUpload(file);
  };

  return (
    <div className="bg-surface-container-lowest p-unit-lg rounded-xl shadow-sm flex flex-col border border-outline-variant/30">
      <div className="flex items-center gap-unit-sm mb-unit-md">
        <div className={`p-unit-sm rounded-lg ${signatureImageKey ? 'bg-secondary-container text-on-secondary-container' : 'bg-primary-container text-on-primary-container'}`}>
          <PenTool size={24} />
        </div>
        <div className="flex-1">
          <h2 className="font-title-lg text-title-lg text-on-surface">Profil Tanda Tangan</h2>
          <p className="font-body-sm text-body-sm text-outline">
            Atur pindaian (scan) atau goresan tanda tangan Anda.
          </p>
        </div>
      </div>
      
      <div className="flex bg-surface-container-low rounded-lg p-1 mb-unit-md">
        <button
          className={`flex-1 py-unit-xs font-label-sm text-label-sm rounded-md transition-colors ${mode === 'upload' ? 'bg-surface-container-lowest shadow-sm text-on-surface font-semibold' : 'text-outline hover:text-on-surface'}`}
          onClick={() => setMode('upload')}
        >
          Unggah Gambar
        </button>
        <button
          className={`flex-1 py-unit-xs font-label-sm text-label-sm rounded-md transition-colors ${mode === 'draw' ? 'bg-surface-container-lowest shadow-sm text-on-surface font-semibold' : 'text-outline hover:text-on-surface'}`}
          onClick={() => setMode('draw')}
        >
          Gambar Langsung
        </button>
      </div>

      <div className="flex flex-col flex-1 gap-unit-md">
        {mode === 'draw' ? (
          <div className="flex-1 min-h-[250px]">
             {isSubmitting ? (
               <div className="w-full aspect-video bg-surface-container rounded-xl flex items-center justify-center">
                 <span className="font-label-md font-bold text-primary animate-pulse">Menyimpan...</span>
               </div>
             ) : (
               <SignatureCanvas onSave={processFileAndUpload} />
             )}
          </div>
        ) : (
          <>
            <div className="w-full aspect-video bg-surface-container rounded-xl border-2 border-dashed border-outline-variant overflow-hidden flex items-center justify-center relative">
              {previewUrl ? (
                <img src={previewUrl} alt="Preview" className="w-full h-full object-contain p-2" />
              ) : existingImageUrl ? (
                <img 
                  src={existingImageUrl} 
                  alt="Tanda Tangan Saat Ini" 
                  className="w-full h-full object-contain p-2 opacity-80 mix-blend-multiply" 
                  crossOrigin="use-credentials" 
                />
              ) : (
                <div className="flex flex-col items-center text-outline">
                  <ImageIcon size={48} className="mb-2 opacity-50" />
                  <span className="font-label-sm">Belum ada tanda tangan</span>
                </div>
              )}

              {isSubmitting && (
                <div className="absolute inset-0 bg-surface/80 flex items-center justify-center backdrop-blur-sm">
                  <span className="font-label-md font-bold text-primary animate-pulse">Mengunggah...</span>
                </div>
              )}
            </div>

            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleFileSelect} 
              accept="image/png, image/jpeg" 
              className="hidden" 
            />

            {error && (
              <div className="flex items-center gap-2 text-error bg-error-container/20 p-2 rounded text-sm">
                <X size={16} />
                <span>{error}</span>
              </div>
            )}
            
            {success && (
              <div className="flex items-center gap-2 text-primary bg-secondary-container/50 p-2 rounded text-sm">
                <Check size={16} />
                <span>{success}</span>
              </div>
            )}

            <div className="mt-auto flex gap-unit-sm">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={isSubmitting}
                className="flex-1 py-unit-sm bg-surface-container text-on-surface rounded-lg font-label-md text-label-md font-bold hover:bg-surface-container-high disabled:opacity-50 transition-colors flex items-center justify-center gap-2"
              >
                <UploadCloud size={18} />
                <span>Pilih Gambar</span>
              </button>
              
              {file && (
                <button
                  type="button"
                  onClick={handleUpload}
                  disabled={isSubmitting}
                  className="flex-1 py-unit-sm bg-primary text-on-primary rounded-lg font-label-md text-label-md font-bold hover:bg-primary/90 disabled:opacity-50 transition-colors"
                >
                  Simpan Profil
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
