const VERSION_LABEL_STYLE =
  "color: #ffffff; font-weight: 700; background: #6a6a6a; padding: 2px 8px; border-radius: 999px 0 0 999px;";
const VERSION_VALUE_STYLE =
  "color: #ffffff; font-weight: 700; background: #d88989; padding: 2px 8px; border-radius: 0 999px 999px 0;";

export function logOrbitVersion(name, version) {
  console.info(
    `%c ${name} %c v${version} `,
    VERSION_LABEL_STYLE,
    VERSION_VALUE_STYLE
  );
}
