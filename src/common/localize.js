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
  const haTranslated = localizeHomeAssistant(hass, key);
  const translated =
    haTranslated ||
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

function localizeHomeAssistant(hass, key) {
  if (!hass?.localize || !key) return null;

  const candidates = HOME_ASSISTANT_TRANSLATION_KEYS[key] || [];

  for (const candidate of candidates) {
    const value = hass.localize(candidate);

    if (value && value !== candidate) return value;
  }

  return null;
}

const HOME_ASSISTANT_TRANSLATION_KEYS = {
  Add: [
    "ui.common.add",
  ],
  All: [
    "ui.components.selectors.automation_behavior.trigger.options.all.label",
    "ui.panel.config.backup.data.apps_all",
  ],
  Active: [
    "ui.panel.config.users.editor.active",
    "ui.panel.config.users.picker.headers.is_active",
    "ui.panel.config.zwave_js.provisioned.active",
  ],
  Area: [
    "ui.components.selectors.selector.types.area",
    "ui.components.entity.entity-name-picker.types.area",
    "ui.components.area-picker.area",
  ],
  Color: [
    "ui.panel.lovelace.editor.card.tile.color",
    "ui.dialogs.label-detail.color",
  ],
  Clear: [
    "ui.common.clear",
  ],
  Custom: [
    "ui.components.entity.entity-name-picker.mode_custom",
    "ui.panel.lovelace.editor.edit_card.pick_card.custom",
    "ui.panel.config.backup.setup.custom_heading",
    "ui.panel.config.backup.schedule.time_options.custom",
    "ui.panel.config.backup.data.apps_custom",
  ],
  Entity: [
    "ui.components.selectors.selector.types.entity",
    "ui.components.entity.entity-picker.entity",
    "ui.panel.lovelace.editor.card.generic.entity",
  ],
  Disabled: [
    "ui.dialogs.entity_registry.editor.disabled_label",
    "ui.panel.config.entities.picker.status.disabled",
  ],
  Enabled: [
    "ui.dialogs.entity_registry.editor.enabled_label",
    "ui.panel.config.entities.picker.status.enabled",
  ],
  Icon: [
    "ui.components.selectors.selector.types.icon",
    "ui.panel.lovelace.editor.card.generic.icon",
  ],
  Inactive: [
    "ui.components.color-picker.colors.inactive",
  ],
  None: [
    "ui.common.none",
  ],
  Accent: [
    "ui.components.color-picker.colors.accent",
  ],
  Automations: [
    "ui.panel.config.automation.caption",
    "ui.dialogs.more_info_control.add_to.automations_heading",
  ],
  Away: [
    "state_badge.person.not_home",
  ],
  Buttons: [
    "ui.panel.lovelace.editor.card.entities.entity_row.buttons",
  ],
  Card: [
    "ui.panel.lovelace.editor.card.conditional.card",
  ],
  "Display precision": [
    "ui.dialogs.entity_registry.editor.precision",
  ],
  Home: [
    "state_badge.person.home",
  ],
  Icons: [
    "ui.panel.lovelace.editor.features.types.climate-preset-modes.style_list.icons",
  ],
  "Icon tap behavior": [
    "ui.panel.lovelace.editor.card.tile.icon_tap_action",
  ],
  "Hold behavior": [
    "ui.panel.lovelace.editor.card.generic.hold_action",
  ],
  "Icon hold behavior": [
    "ui.panel.lovelace.editor.card.tile.icon_hold_action",
  ],
  Mode: [
    "ui.card.climate.mode",
  ],
  Person: [
    "component.person.entity_component._.name",
  ],
  Prefix: [
    "ui.panel.lovelace.editor.elements.prefix",
  ],
  Primary: [
    "ui.components.color-picker.colors.primary",
  ],
  Name: [
    "ui.common.name",
  ],
  Remove: [
    "ui.common.remove",
  ],
  Search: [
    "ui.components.data-table.search",
    "ui.panel.lovelace.editor.card.generic.search",
  ],
  Scenes: [
    "ui.panel.config.scene.caption",
  ],
  Scripts: [
    "ui.panel.config.script.caption",
  ],
  Security: [
    "panel.security",
  ],
  Standard: [
    "ui.panel.config.energy.battery.dialog.type_standard",
  ],
  Status: [
    "ui.panel.config.entities.picker.headers.status",
  ],
  "Tap behavior": [
    "ui.panel.lovelace.editor.card.generic.tap_action",
  ],
  Theme: [
    "ui.components.selectors.selector.types.theme",
    "ui.components.theme-picker.theme",
  ],
  Wrap: [
    "ui.panel.lovelace.editor.edit_view_header.settings.badges_wrap_options.wrap",
  ],
};

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
