import { getOrbitDocumentationURL } from "./documentation.js";

export function registerOrbitBadge({
  tag,
  badgeClass,
  name,
  description,
  version,
  documentationURL,
}) {
  if (!customElements.get(tag)) {
    customElements.define(tag, badgeClass);
  }

  window.customBadges = window.customBadges || [];

  for (let index = window.customBadges.length - 1; index >= 0; index -= 1) {
    if (window.customBadges[index].type === tag) {
      window.customBadges.splice(index, 1);
    }
  }

  window.customBadges.push({
    type: tag,
    name,
    description,
    preview: true,
    documentationURL: documentationURL || getOrbitDocumentationURL(tag),
  });

  console.info(
    `%c ${name} %c v${version} `,
    "color: #ffffff; font-weight: 700; background: #6a6a6a; padding: 2px 8px; border-radius: 999px 0 0 999px;",
    "color: #ffffff; font-weight: 700; background: #d88989; padding: 2px 8px; border-radius: 0 999px 999px 0;"
  );
}
