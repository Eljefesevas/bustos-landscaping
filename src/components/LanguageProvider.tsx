'use client';
import { createContext, useContext } from 'react';
import { translator, type Language } from '@/lib/i18n';
const LanguageContext = createContext<Language>('en');
export function LanguageProvider({ language, children }: { language: Language; children: React.ReactNode }) {
  return <LanguageContext.Provider value={language}>{children}</LanguageContext.Provider>;
}
export function useTranslations() { return translator(useContext(LanguageContext)); }
export function LanguageToggle({ className = '' }: { className?: string }) {
  const language = useContext(LanguageContext);
  const target = language === 'en' ? 'es' : 'en';
  return <button type="button" className={`language-toggle ${className}`} lang={target} onClick={() => {
    document.cookie = `bustos-language=${target}; Path=/; Max-Age=31536000; SameSite=Lax${location.protocol === 'https:' ? '; Secure' : ''}`;
    // Reload the current URL (including its hash) with translated server content and metadata.
    window.location.reload();
  }}>{language === 'en' ? 'Ver en Español' : 'View in English'}</button>;
}
