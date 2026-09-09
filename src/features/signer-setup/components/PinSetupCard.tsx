import React, { useState } from 'react';
import { KeyRound, Check, X } from 'lucide-react';
import { signerSetupApi } from '../api/signer-setup.api';

interface PinSetupCardProps {
  hasPin: boolean;
  onSuccess: () => void;
}

export function PinSetupCard({ hasPin, onSuccess }: PinSetupCardProps) {
  const [pin, setPin] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (pin.length !== 6) {
      setError('PIN harus tepat 6 digit.');
      return;
    }
    
    setIsSubmitting(true);
    setError('');
    setSuccess('');
    
    try {
      await signerSetupApi.setupPin(pin);
      setSuccess('PIN berhasil disimpan!');
      setPin('');
      onSuccess();
    } catch (err: any) {
      setError(err.message || 'Gagal menyimpan PIN');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, '').slice(0, 6);
    setPin(val);
  };

  return (
    <div className="bg-surface-container-lowest p-unit-lg rounded-xl shadow-sm flex flex-col border border-outline-variant/30">
      <div className="flex items-center gap-unit-sm mb-unit-md">
        <div className={`p-unit-sm rounded-lg ${hasPin ? 'bg-secondary-container text-on-secondary-container' : 'bg-primary-container text-on-primary-container'}`}>
          <KeyRound size={24} />
        </div>
        <div>
          <h2 className="font-title-lg text-title-lg text-on-surface">Konfigurasi PIN</h2>
          <p className="font-body-sm text-body-sm text-outline">
            {hasPin ? 'Anda sudah memiliki PIN (Passphrase).' : 'Buat PIN 6-digit baru untuk mengamankan tanda tangan Anda.'}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="mt-auto flex flex-col gap-unit-md">
        <div className="flex flex-col gap-unit-2xs">
          <label className="font-label-md text-label-md text-on-surface font-semibold" htmlFor="pin">
            {hasPin ? 'Ganti PIN (Passphrase)' : 'Buat PIN Baru'}
          </label>
          <input
            id="pin"
            type="password"
            value={pin}
            onChange={handlePinChange}
            placeholder="••••••"
            className="w-full px-unit-md py-unit-sm bg-surface-container-low rounded-lg border border-outline-variant focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all font-mono text-center tracking-[0.5em] text-lg"
            disabled={isSubmitting}
          />
          <p className="font-label-sm text-label-sm text-outline mt-1">Hanya angka (6 digit).</p>
        </div>

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

        <button
          type="submit"
          disabled={isSubmitting || pin.length !== 6}
          className="w-full py-unit-sm bg-primary text-on-primary rounded-lg font-label-md text-label-md font-bold hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isSubmitting ? 'Menyimpan...' : (hasPin ? 'Perbarui PIN' : 'Simpan PIN')}
        </button>
      </form>
    </div>
  );
}
