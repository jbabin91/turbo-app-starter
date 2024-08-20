import { createFileRoute } from '@tanstack/react-router';

import { MetaTags } from '@/components/utils';

export const Route = createFileRoute('/_public/about')({
  component: AboutPage,
});

function AboutPage() {
  return (
    <>
      <MetaTags title="About" />
      <div>
        <h1>About</h1>
        <p>This is the about page.</p>
      </div>
    </>
  );
}
