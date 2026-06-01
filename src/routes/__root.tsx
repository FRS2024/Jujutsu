import { ClerkProvider, useAuth } from '@clerk/tanstack-react-start';
import { Outlet, createRootRoute, HeadContent, Scripts } from '@tanstack/react-router';
import { ConvexReactClient } from 'convex/react';
import { ConvexProviderWithClerk } from 'convex/react-clerk';
import appCss from '@/styles.css?url';

const convexUrl = import.meta.env.VITE_CONVEX_URL;
const convex = convexUrl ? new ConvexReactClient(convexUrl) : null;
const clerkPublishableKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

export const rootRoute = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: 'Jujutsu · AppSec SaaS' },
      { name: 'description', content: 'Jujutsu is a developer-first AppSec SaaS for code, attack, cloud, and compliance workflows.' },
    ],
    links: [{ rel: 'stylesheet', href: appCss }],
  }),
  component: RootComponent,
});

function RootComponent() {
  const outlet = <Outlet />;
  const content = clerkPublishableKey ? (
    <ClerkProvider publishableKey={clerkPublishableKey}>
      {convex ? (
        <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
          {outlet}
        </ConvexProviderWithClerk>
      ) : outlet}
    </ClerkProvider>
  ) : outlet;

  return (
    <html lang="en">
      <head><HeadContent /></head>
      <body>
        {content}
        <Scripts />
      </body>
    </html>
  );
}
