import { createFileRoute } from '@tanstack/react-router';
import { PricingPage } from '@/components/pricing';

export const Route = createFileRoute('/pricing')({
  component: PricingPage,
});
