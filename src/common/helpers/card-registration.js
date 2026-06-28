export function registerOrbitCard({
  tag,
  cardClass,
  name,
  description,
  version,
  getEntitySuggestion,
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
    getEntitySuggestion,
  });

  console.info(
    `%c ${name} %c v${version} `,
    "color: #ffffff; font-weight: 700; background: #6a6a6a; padding: 2px 8px; border-radius: 999px 0 0 999px;",
    "color: #ffffff; font-weight: 700; background: #d88989; padding: 2px 8px; border-radius: 0 999px 999px 0;"
  );
}
