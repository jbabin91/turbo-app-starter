import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_public/about')({
  component: AboutPage,
});

function AboutPage() {
  return (
    <div>
      <h1>About</h1>
      <p>This is the about page.</p>
    </div>
  );
}
