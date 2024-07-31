import { Button } from '@repo/ui';
import { useEffect, useState } from 'react';

import viteLogo from '/vite.svg';
import reactLogo from '@/assets/react.svg';

function App() {
  const [count, setCount] = useState(0);
  const [example, setExample] = useState('');

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('http://localhost:3000/example').then(
        (res) => res.json(),
      );

      setExample(response.message);
    }

    fetchData();
  });

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
      <h1 className="text-5xl font-semibold">Vite + React</h1>
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
      <p>Example Message: {example}</p>
    </>
  );
}

export default App;
