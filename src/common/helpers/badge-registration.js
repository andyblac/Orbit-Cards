import { getOrbitDocumentationURL } from "./documentation.js";
import { logOrbitVersion } from "./version-log.js";

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

  logOrbitVersion(name, version);
}
