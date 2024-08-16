import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export function useLocalizeDocumentAttributes() {
  const { i18n } = useTranslation();

  useEffect(() => {
    if (i18n.language) {
      // Set the <html lang> attribute
      document.documentElement.lang = i18n.language;

      // Set the <html dir> attribute
      document.documentElement.dir = i18n.dir(i18n.language);
    }
  }, [i18n, i18n.language]);
}
