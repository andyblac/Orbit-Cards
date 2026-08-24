import { getOrbitDocumentationURL } from "./documentation.js";
import { logOrbitVersion } from "./version-log.js";

export function registerOrbitCard({
  tag,
  cardClass,
  name,
  description,
  version,
  getEntitySuggestion,
  documentationURL,
  aliases = [],
}) {
  if (!customElements.get(tag)) {
    customElements.define(tag, cardClass);
  }

  aliases.forEach((alias) => {
    if (!customElements.get(alias.tag)) {
      customElements.define(alias.tag, alias.cardClass || cardClass);
    }
  });

  const registeredTypes = new Set([
    tag,
    ...aliases.map((alias) => alias.tag),
  ]);

  window.customCards = window.customCards || [];

  for (let index = window.customCards.length - 1; index >= 0; index -= 1) {
    if (registeredTypes.has(window.customCards[index].type)) {
      window.customCards.splice(index, 1);
    }
  }

  window.customCards.push({
    type: tag,
    name,
    description,
    preview: true,
    version,
    documentationURL: documentationURL || getOrbitDocumentationURL(tag),
    getEntitySuggestion,
  });

  logOrbitVersion(name, version);
}
