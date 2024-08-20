import { useLocalizeDocumentAttributes } from './hooks';
import { Providers } from './providers';

function App() {
  useLocalizeDocumentAttributes();
  return <Providers />;
}

export default App;
