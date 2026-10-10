import { cookies } from 'next/headers';
import { cache } from 'react';
import { translator, type Language } from './index';
export const getLanguage = cache(async (): Promise<Language> =>
  (await cookies()).get('bustos-language')?.value === 'es' ? 'es' : 'en'
);
export async function getTranslations() { return translator(await getLanguage()); }
