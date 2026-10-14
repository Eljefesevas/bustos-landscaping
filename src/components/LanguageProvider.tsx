'use client';
import { createContext, useContext } from 'react';
import { translator, type Language } from '@/lib/i18n';
const LanguageContext = createContext<Language>('en');
export function LanguageProvider({ language, children }: { language: Language; children: React.ReactNode }) {
  return <LanguageContext.Provider value={language}>{children}</LanguageContext.Provider>;
}
export function useTranslations() { return translator(useContext(LanguageContext)); }
export function useLanguage() { return useContext(LanguageContext); }
// `compact` shows the short code (ES / EN) while keeping the full phrase as the accessible name.
export function LanguageToggle({ className = '', compact = false }: { className?: string; compact?: boolean }) {
  const language = useContext(LanguageContext);
  const target = language === 'en' ? 'es' : 'en';
  const label = language === 'en' ? 'Ver en Español' : 'View in English';
  return <button type="button" className={`language-toggle ${className}`} lang={target} aria-label={compact ? label : undefined} onClick={() => {
    document.cookie = `bustos-language=${target}; Path=/; Max-Age=31536000; SameSite=Lax${location.protocol === 'https:' ? '; Secure' : ''}`;
    // Reload the current URL (including its hash) with translated server content and metadata.
    window.location.reload();
  }}>{compact ? target.toUpperCase() : label}</button>;
}
