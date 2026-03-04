import { Tolgee, DevTools, FormatSimple, BackendFetch } from "@tolgee/react";

export const tolgee = Tolgee()
  .use(DevTools())
  .use(FormatSimple())
  .use(BackendFetch({ prefix: import.meta.env.VITE_I18N_URL }))
  .init({
    apiUrl: import.meta.env.VITE_TOLGEE_API_URL,
    apiKey: import.meta.env.VITE_TOLGEE_API_KEY,
    defaultLanguage: 'es',
    availableLanguages: ['es'],
    fallbackLanguage: 'es',
  });