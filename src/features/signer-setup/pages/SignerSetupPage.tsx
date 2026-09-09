import React, { useEffect, useState } from 'react';
import { ShieldAlert, CheckCircle2 } from 'lucide-react';
import { DashboardLayout } from '../../../shared/layouts/DashboardLayout';
import { useAuthUser } from '../../../shared/hooks/useAuthUser';
import { signerSetupApi } from '../api/signer-setup.api';
import { PinSetupCard } from '../components/PinSetupCard';
import { SignatureProfileCard } from '../components/SignatureProfileCard';

import { useSignerSetupStatus } from '../hooks/useSignerSetupStatus';

export function SignerSetupPage() {
  const { user } = useAuthUser();
  const { status, isLoading, refetch } = useSignerSetupStatus();

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-unit-lg max-w-4xl mx-auto w-full">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-unit-md border-b border-outline-variant pb-unit-md">
          <div>
            <h1 className="font-title-xl text-title-xl text-on-surface mb-unit-2xs">Signer Setup</h1>
            <p className="font-body-md text-body-md text-outline">
              Kelola pengaturan keamanan dan profil tanda tangan elektronik Anda.
            </p>
          </div>
          {status && (
            <div className={`flex items-center gap-unit-sm px-unit-md py-unit-xs rounded-full border ${status.hasPin && status.signatureImageKey ? 'bg-secondary-container border-secondary-container text-on-secondary-container' : 'bg-error-container border-error-container text-on-error-container'}`}>
              {status.hasPin && status.signatureImageKey ? <CheckCircle2 size={18} /> : <ShieldAlert size={18} />}
              <span className="font-label-md text-label-md font-semibold">
                {status.hasPin && status.signatureImageKey ? 'Profil Siap Digunakan' : 'Profil Belum Lengkap'}
              </span>
            </div>
          )}
        </div>

        {isLoading ? (
          <div className="flex justify-center p-unit-2xl">
            <span className="text-outline">Memuat status...</span>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-unit-lg">
            <PinSetupCard 
              hasPin={status?.hasPin} 
              onSuccess={refetch} 
            />
            <SignatureProfileCard 
              signatureImageKey={status?.signatureImageKey} 
              onSuccess={refetch} 
            />
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
