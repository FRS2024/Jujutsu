import { createFileRoute } from '@tanstack/react-router';
import { AppDashboard } from '@/components/app-dashboard';

export const Route = createFileRoute('/app')({
  component: AppDashboard,
});
