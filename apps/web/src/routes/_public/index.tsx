import { Button } from '@repo/ui';
import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import viteLogo from '/vite.svg';
import reactLogo from '@/assets/react.svg';
import { APP_NAME } from '@/configs';
import { useExample } from '@/modules/example';

export const Route = createFileRoute('/_public/')({
  component: IndexComponent,
});

function IndexComponent() {
  const [count, setCount] = useState(0);
  const { t } = useTranslation();
  const { data } = useExample();

  return (
    <>
      <div className="flex justify-center">
        <a href="https://vitejs.dev" rel="noreferrer" target="_blank">
          <img alt="Vite logo" className="logo" src={viteLogo} />
        </a>
        <a href="https://react.dev" rel="noreferrer" target="_blank">
          <img alt="React logo" className="logo react" src={reactLogo} />
        </a>
      </div>
      <h1>{APP_NAME}</h1>
      <p>{t('common:hello_world')}</p>
      <p>
        {t('common:date.long_date', {
          date: new Date('2024-01-25'),
        })}
      </p>
      <div className="p-[2em]">
        <Button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </Button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="text-[#888]">
        Click on the Vite and React logos to learn more
      </p>
      <p>Example Message: {data?.message}</p>
    </>
  );
}
