export function translateEditorLabel(editor, key, replacements) {
  if (Array.isArray(key)) {
    return formatComposedLabel(
      editor,
      key.map((part) => translateEditorLabel(editor, part, replacements))
    );
  }

  return editor._t
    ? editor._t(key, replacements)
    : key;
}

function formatComposedLabel(editor, parts) {
  const language =
    editor?.hass?.locale?.language ||
    editor?.hass?.language ||
    "en";

  if (!language.toLowerCase().startsWith("en")) {
    return parts.join(" ");
  }

  return parts
    .map((part, index) =>
      index === 0 ? part : lowercaseFirstLetter(part))
    .join(" ");
}

function lowercaseFirstLetter(value = "") {
  return value.replace(/^(\p{L})/u, (letter) =>
    letter.toLocaleLowerCase()
  );
}
