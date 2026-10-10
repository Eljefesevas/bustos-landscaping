import spanish from './es.json';
export type Language = 'en' | 'es';
const dictionary: Record<string, string> = Object.fromEntries(
  Object.entries(spanish).map(([key, value]) => [key.trim().replace(/\s+/g, ' '), value.trim()])
);
// English copy is the stable lookup key. Keep whitespace outside the translation.
export function translator(language: Language) {
  return function t<T>(value: T): T {
    if (language === 'en' || typeof value !== 'string') return value;
    const key = value.trim().replace(/\s+/g, ' ');
    const translated = dictionary[key];
    return (translated === undefined ? value : value.replace(value.trim(), translated)) as T;
  };
}
