import { useLocalizeDocumentAttributes } from './hooks/use-localize-document-attributes';
import { Providers } from './providers';

function App() {
  useLocalizeDocumentAttributes();
  return <Providers />;
}

export default App;
