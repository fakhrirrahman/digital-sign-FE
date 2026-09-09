import React from 'react';
import { Gavel, UserCheck, IdCard, User, KeyRound, LockKeyhole, BadgeCheck, ShieldAlert } from 'lucide-react';
import { TextInput, PasswordInput, Checkbox, Button } from '@mantine/core';
import { useLogin } from '../hooks/useLogin';

export function LoginForm({ loginState }: { loginState: ReturnType<typeof useLogin> }) {
  const {
    activeTab,
    isLoading,
    identifier,
    setIdentifier,
    password,
    setPassword,
    handleTabChange,
    handleLogin,
  } = loginState;

  return (
    <div className="lg:col-span-7 p-4 sm:p-6 lg:p-8 flex flex-col justify-between bg-surface-container-lowest">
      <div>
        {/* Header Area */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
          <div>
            <h2 className="font-headline-lg text-on-surface">Masuk ke OSS Desa</h2>
            <p className="font-body-md text-on-surface-variant">Silakan masukkan kredensial Anda untuk mengakses sistem</p>
          </div>
          <div className="flex items-center gap-1 bg-red-50 text-primary px-2.5 py-1 rounded-full self-start">
            <Gavel size={16} />
            <span className="font-label-sm font-semibold">Sistem Terpadu</span>
          </div>
        </div>

        {/* Role Selector Tabs */}
        <div className="bg-surface-container p-1 rounded-xl flex items-center gap-1 mb-4 flex-wrap sm:flex-nowrap">
          <button 
            onClick={() => handleTabChange('kades')}
            className={`flex-1 py-2.5 px-2 rounded-lg font-label-md transition-all flex items-center justify-center gap-2 font-semibold min-w-fit ${activeTab === 'kades' ? 'bg-primary text-white shadow-sm' : 'text-on-surface-variant hover:text-on-surface'}`} 
            type="button"
          >
            <UserCheck size={18} />
            <span className="hidden sm:inline">Kepala Desa / Kelihan</span>
            <span className="sm:hidden">Kades</span>
          </button>
          <button 
            onClick={() => handleTabChange('operator')}
            className={`flex-1 py-2.5 px-2 rounded-lg font-label-md transition-all flex items-center justify-center gap-2 font-semibold min-w-fit ${activeTab === 'operator' ? 'bg-primary text-white shadow-sm' : 'text-on-surface-variant hover:text-on-surface'}`} 
            type="button"
          >
            <IdCard size={18} />
            <span className="hidden sm:inline">Operator Desa</span>
            <span className="sm:hidden">Operator</span>
          </button>
          <button 
            onClick={() => handleTabChange('superadmin')}
            className={`flex-1 py-2.5 px-2 rounded-lg font-label-md transition-all flex items-center justify-center gap-2 font-semibold min-w-fit ${activeTab === 'superadmin' ? 'bg-gray-800 text-white shadow-sm' : 'text-on-surface-variant hover:text-on-surface'}`} 
            type="button"
          >
            <ShieldAlert size={18} />
            <span className="hidden sm:inline">Admin Sistem</span>
            <span className="sm:hidden">Admin</span>
          </button>
        </div>

        {/* Authentication Form */}
        <form className="space-y-4" onSubmit={handleLogin}>
          {/* Input 1: NIP / NIK */}
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="font-label-md text-on-surface" htmlFor="identifier">
                {activeTab === 'superadmin' ? 'ID Admin / Email' : 'NIP Pejabat / NIK KTP Terdaftar'}
              </label>
            </div>
            <TextInput 
              size="md"
              id="identifier"
              placeholder={activeTab === 'kades' ? "19780512 200501 1 008" : activeTab === 'operator' ? "3204128900010003" : "admin@ossdesa.id"}
              value={identifier}
              onChange={(e) => setIdentifier(e.currentTarget.value)}
              required
              leftSection={<User size={20} className="text-outline" />}
              classNames={{
                input: "bg-surface-container-low text-on-surface rounded-xl font-body-md focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary transition-all border-none"
              }}
            />
          </div>

          {/* Input 2: Password */}
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="font-label-md text-on-surface" htmlFor="password">Kata Sandi</label>
              <a className="font-label-sm text-primary hover:text-deep-ruby font-semibold transition-colors" href="#reset">Lupa Sandi?</a>
            </div>
            <PasswordInput 
              size="md"
              id="password"
              placeholder="••••••••••••"
              value={password}
              onChange={(e) => setPassword(e.currentTarget.value)}
              required
              leftSection={<KeyRound size={20} className="text-outline" />}
              classNames={{
                input: "bg-surface-container-low text-on-surface rounded-xl font-body-md focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary transition-all border-none"
              }}
            />
          </div>

          {/* Session & Helper Options */}
          <div className="flex flex-wrap items-center justify-between gap-2 pt-2">
            <Checkbox 
              defaultChecked 
              label={<span className="font-body-sm text-on-surface">Ingat sesi saya</span>}
              color="red"
              classNames={{ input: "cursor-pointer" }}
            />
          </div>

          {/* Primary Action Button */}
          <div className="pt-4">
            <Button 
              type="submit"
              loading={isLoading}
              size="lg"
              radius="xl"
              color="red"
              className="w-full bg-primary hover:bg-[#8e0d15] text-white font-title-md shadow-md transition-all group"
              leftSection={!isLoading && <LockKeyhole size={22} className="group-hover:rotate-6 transition-transform" />}
            >
              Masuk ke Aplikasi
            </Button>
          </div>
        </form>
      </div>

      {/* Footer Legal & Reassurance Notice */}
      <div className="mt-4 pt-3 border-none bg-surface-container-low -mx-4 sm:-mx-6 lg:-mx-8 -mb-4 sm:-mb-6 lg:-mb-8 p-3 sm:p-4 flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-2 text-on-surface-variant">
          <BadgeCheck size={18} className="text-primary shrink-0" />
          <p className="font-body-sm">
            Portal Resmi Pelayanan Terpadu OSS Desa
          </p>
        </div>
        <div className="flex items-center gap-3 font-label-sm text-outline">
          <a className="hover:text-primary transition-colors" href="#bantuan">Pusat Bantuan</a>
          <span>•</span>
          <a className="hover:text-primary transition-colors" href="#kontak">Hubungi Kami</a>
        </div>
      </div>
    </div>
  );
}
