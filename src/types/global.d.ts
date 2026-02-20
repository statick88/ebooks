// Global type declarations
declare global {
  interface Window {
    i18n: {
      t: (key: string, lang?: string) => string;
      translations: Record<string, unknown>;
      updateContent: (lang: string) => void;
      getNestedValue: (obj: unknown, path: string) => unknown;
      init: () => void;
    };
  }
}

export {};
