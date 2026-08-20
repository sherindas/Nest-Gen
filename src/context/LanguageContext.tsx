"use client";

import React, { useSyncExternalStore, useCallback, useEffect } from "react";
import { translations, TranslationKey } from "../lib/translations";

export type { TranslationKey };
export { translations };

export type Language = "en" | "kn";

let currentLanguage: Language = "en";
const listeners = new Set<() => void>();

function getSnapshot(): Language {
  return currentLanguage;
}

function getServerSnapshot(): Language {
  return "en";
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function setGlobalLanguage(lang: Language) {
  currentLanguage = lang;
  if (typeof document !== "undefined") {
    document.documentElement.lang = lang;
  }
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem("nextgen_lang", lang);
    } catch {
      // Ignore
    }
  }
  listeners.forEach((listener) => {
    try {
      listener();
    } catch {
      // Ignore
    }
  });
}

export function useLanguage() {
  const language = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("nextgen_lang") as Language;
      if (saved && (saved === "en" || saved === "kn") && saved !== currentLanguage) {
        setGlobalLanguage(saved);
      }
    } catch {
      // Ignore
    }
  }, []);

  const setLanguage = useCallback((lang: Language) => {
    setGlobalLanguage(lang);
  }, []);

  const t = useCallback(
    (key: TranslationKey): string => {
      const dict = translations[language] || translations["en"];
      return dict[key] || translations["en"][key] || key;
    },
    [language]
  );

  return { language, setLanguage, t };
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

export default useLanguage;
