import en from "./en";
import th from "./th";
import type { Locale } from "./config";

const dictionaries = { th, en };

export function getDictionary(locale: Locale) {
  return dictionaries[locale];
}

export type { Dictionary } from "./en";
export * from "./config";
