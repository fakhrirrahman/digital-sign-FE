import React, { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { authApi } from '../api/auth.api';

const getLoginToken = (data: any) =>
  data?.token
  ?? data?.accessToken
  ?? data?.access_token
  ?? data?.data?.token
  ?? data?.data?.accessToken
  ?? data?.data?.access_token;

export function useLogin() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'kades' | 'operator' | 'superadmin'>('kades');
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState<{title: string, desc: string} | null>(null);
  
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');

  const handleTabChange = (tab: 'kades' | 'operator' | 'superadmin') => {
    setActiveTab(tab);
    // Optionally reset fields on tab change
    setIdentifier('');
    setPassword('');
  };

  const showToastMsg = (title: string, desc: string) => {
    setToast({ title, desc });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const result = await authApi.login(identifier, password);
      if (result.success) {
        const token = getLoginToken(result.data);

        if (!token) {
          showToastMsg('Login Gagal', 'Token login tidak ditemukan dari server.');
          return;
        }

        localStorage.setItem('auth_token', token);
        
        showToastMsg('Login Berhasil', 'Selamat datang di Portal OSS Desa. Mengalihkan ke Dashboard...');
        
        // Navigate to dashboard after short delay
        setTimeout(() => {
          navigate({ to: '/' });
        }, 1500);
      } else {
        showToastMsg('Login Gagal', result.message || 'Kredensial tidak valid');
      }
    } catch (error) {
      showToastMsg('Login Gagal', 'Silakan periksa kembali NIK atau kata sandi Anda.');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    activeTab,
    isLoading,
    toast,
    identifier,
    setIdentifier,
    password,
    setPassword,
    handleTabChange,
    handleLogin
  };
}
