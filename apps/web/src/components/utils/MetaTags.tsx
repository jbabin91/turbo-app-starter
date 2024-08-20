import { Helmet } from 'react-helmet-async';

export function MetaTags({
  title,
  description,
}: {
  title?: string;
  description?: string;
}) {
  return (
    <Helmet>
      {title ? <title>{title}</title> : null}
      {description ? <meta content={description} name="description" /> : null}
    </Helmet>
  );
}
