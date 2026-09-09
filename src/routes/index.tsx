import { createFileRoute, redirect } from '@tanstack/react-router'
import { DashboardPage } from '../features/dashboard/pages/DashboardPage'

export const Route = createFileRoute('/')({
  beforeLoad: () => {
    if (!localStorage.getItem('auth_token')) {
      throw redirect({ to: '/login' });
    }
  },
  component: DashboardPage,
})
