import React from 'react';
import { Landmark, ShieldCheck, CheckCircle } from 'lucide-react';
import { LoginShowcase } from '../components/LoginShowcase';
import { LoginForm } from '../components/LoginForm';
import { useLogin } from '../hooks/useLogin';

export function LoginPage() {
  const loginState = useLogin();
  const { toast } = loginState;

  return (
    <div className="bg-surface font-body-md text-body-md text-on-surface h-screen overflow-hidden flex items-center justify-center p-4 lg:p-8">
      <main className="w-full flex justify-center items-center h-full">
        <div className="flex flex-col w-full h-full justify-center">
          <div className="w-full max-w-7xl mx-auto px-2 sm:px-4">
            
            {/* Top Micro Bar: Civic Authority Breadcrumb */}
            <div className="flex flex-wrap items-center justify-between gap-2 mb-3 lg:mb-5 bg-surface-container-lowest px-4 py-2.5 rounded-xl shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center text-primary">
                  <Landmark size={20} />
                </div>
                <div>
                  <span className="font-label-sm text-outline tracking-wider uppercase">Portal Resmi Layanan Sipil</span>
                  <p className="font-label-md text-on-surface">Kementerian Dalam Negeri RI • Dirjen Bina Pemerintahan Desa</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container font-label-md text-on-surface-variant">
                  <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                  Kanal Enkripsi Terproteksi TLS 1.3
                </span>
                <div className="hidden sm:flex items-center gap-1 text-outline text-label-md">
                  <ShieldCheck size={18} />
                  <span>Node ID: JBR-DPS-8842</span>
                </div>
              </div>
            </div>

            {/* Main Dual Split Card */}
            <div className="grid grid-cols-1 lg:grid-cols-12 bg-surface-container-lowest rounded-2xl shadow-xl overflow-hidden">
              <LoginShowcase />
              <LoginForm loginState={loginState} />
            </div>

            {/* Live System Toast */}
            {toast && (
              <div className="fixed bottom-6 right-6 max-w-sm bg-surface-container-lowest p-4 rounded-xl shadow-2xl flex items-start gap-3 z-50 transition-all border border-surface-container">
                <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center text-primary flex-shrink-0">
                  <CheckCircle size={20} />
                </div>
                <div className="flex-1">
                  <h4 className="font-title-md text-on-surface">{toast.title}</h4>
                  <p className="font-body-sm text-on-surface-variant">{toast.desc}</p>
                </div>
              </div>
            )}
            
          </div>
        </div>
      </main>
    </div>
  );
}
