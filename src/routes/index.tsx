import { createFileRoute } from '@tanstack/react-router';
import { MarketingHome } from '@/components/marketing';

export const Route = createFileRoute('/')({
  component: MarketingHome,
});
