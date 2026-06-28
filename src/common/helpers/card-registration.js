export function registerOrbitCard({
  tag,
  cardClass,
  name,
  description,
  version,
  getEntitySuggestion,
  aliases = [],
}) {
  customElements.define(tag, cardClass);

  aliases.forEach((alias) => {
    customElements.define(alias.tag, alias.cardClass || cardClass);
  });

  window.customCards = window.customCards || [];
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
