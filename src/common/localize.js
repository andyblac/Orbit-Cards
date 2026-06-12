import en from "../translations/en.json";
import enGb from "../translations/en_gb.json";
import de from "../translations/de.json";
import es from "../translations/es.json";
import fr from "../translations/fr.json";
import it from "../translations/it.json";
import nl from "../translations/nl.json";
import ptBr from "../translations/pt_br.json";

const TRANSLATIONS = {
  de,
  en,
  "en-gb": enGb,
  en_gb: enGb,
  es,
  fr,
  it,
  nl,
  "pt-br": ptBr,
  pt_br: ptBr,
};

export function localize(hass, key, replacements = {}) {
  const language = getLanguage(hass);
  const normalizedLanguage = language.replace("_", "-");
  const baseLanguage = language.split("-")[0];
  const translated =
    getTranslation(language, key) ||
    getTranslation(normalizedLanguage, key) ||
    getTranslation(baseLanguage, key) ||
    TRANSLATIONS.en[key] ||
    key;

  return Object.entries(replacements).reduce(
    (text, [name, value]) =>
      text.replaceAll(`{${name}}`, value ?? ""),
    translated
  );
}

function getTranslation(language, key) {
  const value = TRANSLATIONS[language]?.[key];

  return value === ""
    ? null
    : value;
}

function getLanguage(hass) {
  return (
    hass?.locale?.language ||
    hass?.language ||
    "en"
  ).toLowerCase();
}
