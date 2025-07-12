"use client";

import { useLanguage } from "@/context/language-context";

const languages = ["ru", "en", "uz"] as const;

export default function LanguageSwitch() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="fixed bottom-5 left-5 z-50 bg-white/80 dark:bg-gray-800/80 px-3 py-2 rounded-lg flex gap-2 text-sm backdrop-blur">
      {languages.map((lang) => (
        <button
          key={lang}
          onClick={() => {
            setLanguage(lang);
            location.reload();
          }}
          style={{textDecoration: 'none'}}
          className={`px-2 py-1 rounded ${
            lang === language ? "bg-black text-white dark:bg-white dark:text-black" : "hover:underline"
          }`}
        >
          {lang.toUpperCase()}
        </button>
      ))}
    </div>
  );
}