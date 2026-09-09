import { createFileRoute, redirect } from '@tanstack/react-router';
import { SignerSetupPage } from '../features/signer-setup/pages/SignerSetupPage';

export const Route = createFileRoute('/signer-setup')({
  beforeLoad: () => {
    if (!localStorage.getItem('auth_token')) {
      throw redirect({ to: '/login' });
    }
  },
  component: SignerSetupPage,
});
