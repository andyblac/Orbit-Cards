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
  Above: [
    "ui.components.selectors.numeric_threshold.crossed.above",
    "ui.panel.config.automation.editor.conditions.type.numeric_state.above",
  ],
  "Add card": [
    "ui.panel.lovelace.editor.edit_card.add",
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
  Areas: [
    "ui.components.area-filter.title",
  ],
  Background: [
    "ui.panel.lovelace.editor.card.tile.background",
    "ui.panel.lovelace.editor.card.generic.background",
  ],
  Below: [
    "ui.components.selectors.numeric_threshold.crossed.below",
    "ui.panel.config.automation.editor.conditions.type.numeric_state.below",
  ],
  "Binary sensors": [
    "component.binary_sensor.entity_component._.name_plural",
  ],
  "Binary Sensors": [
    "component.binary_sensor.entity_component._.name_plural",
  ],
  Badges: [
    "ui.panel.lovelace.editor.card.heading.badges",
    "ui.panel.lovelace.editor.badges.name",
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
  Content: [
    "ui.panel.lovelace.editor.card.generic.content",
  ],
  "Configuration error": [
    "ui.errors.config.configuration_error",
  ],
  Domain: [
    "ui.panel.config.entities.picker.headers.domain",
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
  Divider: [
    "ui.panel.lovelace.editor.card.entities.entity_row.divider",
  ],
  Default: [
    "ui.common.default",
  ],
  Duplicate: [
    "ui.common.duplicate",
  ],
  Enabled: [
    "ui.dialogs.entity_registry.editor.enabled_label",
    "ui.panel.config.entities.picker.status.enabled",
  ],
  Equal: [
    "ui.components.selectors.select.options.equal",
  ],
  Icon: [
    "ui.components.selectors.selector.types.icon",
    "ui.panel.lovelace.editor.card.generic.icon",
  ],
  Hide: [
    "ui.common.hide",
  ],
  Inactive: [
    "ui.components.color-picker.colors.inactive",
  ],
  Interactions: [
    "ui.panel.lovelace.editor.card.tile.interactions",
    "ui.panel.lovelace.editor.card.generic.interactions",
  ],
  Threshold: [
    "ui.components.selectors.selector.types.threshold",
    "ui.panel.config.automation.editor.conditions.type.numeric_state.threshold",
  ],
  None: [
    "ui.common.none",
  ],
  Accent: [
    "ui.components.color-picker.colors.accent",
  ],
  "Accent color": [
    "ui.panel.profile.themes.accent_color",
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
  Cameras: [
    "component.camera.entity_component._.name_plural",
  ],
  Climate: [
    "component.climate.entity_component._.name_plural",
    "panel.climate",
  ],
  Covers: [
    "component.cover.entity_component._.name_plural",
  ],
  Crop: [
    "ui.dialogs.image_cropper.crop",
  ],
  "Display precision": [
    "ui.dialogs.entity_registry.editor.precision",
  ],
  "Displayed elements": [
    "ui.panel.lovelace.editor.badge.entity.displayed_elements",
  ],
  "Double tap behavior": [
    "ui.panel.lovelace.editor.card.generic.double_tap_action",
  ],
  Home: [
    "state_badge.person.home",
  ],
  Fans: [
    "component.fan.entity_component._.name_plural",
  ],
  Header: [
    "ui.panel.lovelace.editor.header-footer.header",
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
  "Icon double tap behavior": [
    "ui.panel.lovelace.editor.card.tile.icon_double_tap_action",
  ],
  Mode: [
    "ui.card.climate.mode",
  ],
  Multiple: [
    "ui.components.selectors.selector.multiple",
  ],
  "Navigation path": [
    "ui.panel.lovelace.editor.action-editor.navigation_path",
  ],
  Person: [
    "component.person.entity_component._.name",
  ],
  Position: [
    "ui.panel.lovelace.editor.card.entities.secondary_info_values.position",
    "ui.card.cover.position",
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
  Labels: [
    "ui.components.label-picker.labels",
  ],
  Lights: [
    "component.light.entity_component._.name_plural",
  ],
  Locks: [
    "component.lock.entity_component._.name_plural",
  ],
  "Media players": [
    "component.media_player.entity_component._.name_plural",
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
  Sensors: [
    "component.sensor.entity_component._.name_plural",
  ],
  Scripts: [
    "ui.panel.config.script.caption",
  ],
  Security: [
    "panel.security",
  ],
  Separator: [
    "ui.panel.lovelace.editor.card.clock.date.sections.separator",
  ],
  Standard: [
    "ui.panel.config.energy.battery.dialog.type_standard",
  ],
  State: [
    "ui.panel.lovelace.editor.card.generic.state",
  ],
  Switches: [
    "component.switch.entity_component._.name_plural",
  ],
  "State color": [
    "ui.components.color-picker.state",
  ],
  "State content": [
    "ui.panel.lovelace.editor.badge.entity.state_content",
  ],
  "Entity state": [
    "ui.panel.lovelace.editor.condition-editor.condition.state.label",
  ],
  Status: [
    "ui.panel.config.entities.picker.headers.status",
  ],
  Style: [
    "ui.panel.lovelace.editor.features.types.climate-preset-modes.style",
    "ui.panel.lovelace.editor.features.types.numeric-input.style",
  ],
  "Tap behavior": [
    "ui.panel.lovelace.editor.card.generic.tap_action",
  ],
  Theme: [
    "ui.components.selectors.selector.types.theme",
    "ui.components.theme-picker.theme",
  ],
  Template: [
    "ui.components.selectors.selector.types.template",
  ],
  Type: [
    "ui.components.selectors.selector.type",
  ],
  Unavailable: [
    "state.default.unavailable",
  ],
  Top: [
    "ui.panel.lovelace.editor.edit_view_header.settings.badges_position_options.top",
  ],
  Right: [
    "ui.panel.lovelace.editor.card.energy-date-selection.opening_directions.right",
  ],
  Bottom: [
    "ui.panel.lovelace.editor.card.tile.features_position_options.bottom",
    "ui.panel.lovelace.editor.edit_view_header.settings.badges_position_options.bottom",
  ],
  Left: [
    "ui.panel.lovelace.editor.card.energy-date-selection.opening_directions.left",
  ],
  Width: [
    "ui.panel.lovelace.editor.edit_section.settings.column_span",
  ],
  Visibility: [
    "ui.panel.lovelace.editor.edit_card.tab_visibility",
  ],
  "Visible if selected in state content": [
    "ui.panel.lovelace.editor.card.heading.entity_config.name_helper",
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
