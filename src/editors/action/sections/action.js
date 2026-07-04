import { html } from "lit";
import { renderEntitySelector } from "../../../common/editor/helpers/renders.js";
import { renderIconSourceControl } from "../../../common/editor/helpers/icon.js";
import {
  getGroupedEditorState,
  renderGroupedEditorOptions,
} from "../../../common/editor/helpers/group-options.js";

export function renderActionSection() {
  const items = this._getActionItems();
  const selectedIndex = Math.min(
    this._selectedActionIndex || 0,
    items.length - 1
  );
  const selectedItem = items[selectedIndex] || {};
  const domainFilter = this._actionEntityDomainFilter || "all";
  const {
    itemsPerRow: actionsPerRow,
    shouldWrapTabs,
    showTabScrollHint,
  } = getGroupedEditorState({
    config: this._config,
    itemCount: items.length,
    perRowKey: "actions_per_row",
    defaultPerRow: 3,
  });

  return html`
    <div class="section">
      ${renderGroupedEditorOptions.call(this, {
        itemCount: items.length,
        classPrefix: "action",
        perRowKey: "actions_per_row",
        perRowLabel: "Actions per row",
        defaultPerRow: 3,
      })}

      <div
        class="action-tabs ${shouldWrapTabs ? "wrapped" : ""} ${showTabScrollHint ? "scroll-hint" : ""} ${items.length > 1 ? "has-tools" : ""}"
        style=${shouldWrapTabs
          ? `--action-tabs-per-row: ${actionsPerRow};`
          : ""}
      >
        <div class="action-tab-items">
          ${items.map((_, index) => html`
            <button
              type="button"
              class="action-tab ${index === selectedIndex ? "active" : ""}"
              @click=${() => this._selectActionItem(index)}
            >
              ${index + 1}
            </button>
          `)}
        </div>

        ${showTabScrollHint
          ? html`
              <div class="action-tabs-scroll-indicator" aria-hidden="true">
                <ha-icon icon="mdi:chevron-right"></ha-icon>
              </div>
            `
          : ""}

        <div class="action-editor-tools">
          <button
            type="button"
            class="action-tab-add"
            title=${this._t("Add")}
            @click=${() => this._addActionItem()}
          >
            +
          </button>

          ${items.length > 1
            ? html`
                <button
                  type="button"
                  class="action-tool-button action-tool-remove"
                  title=${this._t("Remove")}
                  @click=${() => this._removeActionItem(selectedIndex)}
                >
                  <ha-icon icon="mdi:trash-can"></ha-icon>
                </button>

                <button
                  type="button"
                  class="action-tool-button"
                  title=${this._t("Move left")}
                  ?disabled=${selectedIndex === 0}
                  @click=${() => this._moveActionItem(selectedIndex, -1)}
                >
                  <ha-icon icon="mdi:arrow-left"></ha-icon>
                </button>

                <button
                  type="button"
                  class="action-tool-button"
                  title=${this._t("Move right")}
                  ?disabled=${selectedIndex === items.length - 1}
                  @click=${() => this._moveActionItem(selectedIndex, 1)}
                >
                  <ha-icon icon="mdi:arrow-right"></ha-icon>
                </button>
              `
            : ""}
        </div>
      </div>

      <div class="field">
        <label>${this._t("Main entity")}</label>

        ${renderEntitySelector.call(this, {
          value: selectedItem.entity || "",
          filterOptions: ACTION_DOMAIN_FILTERS,
          activeFilter: domainFilter,
          onValueChanged: (value) =>
            this._updateActionItem(selectedIndex, {
              entity: value,
            }),
        })}
      </div>

      ${this._renderColorControl(
        ["Accent", "Color"],
        `action-${selectedIndex}-accent_color`,
        selectedItem.accent_color || "",
        (value) =>
          this._updateActionItem(selectedIndex, {
            accent_color: value,
          })
      )}

      ${renderActionItemIconSource.call(
        this,
        selectedIndex,
        selectedItem
      )}

      ${selectedItem.entity
        ? this._renderActionItemInteractions(
            selectedIndex,
            selectedItem
          )
        : ""}
    </div>
  `;
}

const ACTION_DOMAIN_FILTERS = [
  {
    label: "All",
    value: "all",
    domains: null,
  },
  {
    label: "Automations",
    haDomains: ["automation"],
    value: "automation",
    domains: ["automation"],
  },
  {
    label: "Buttons",
    haDomains: ["button"],
    value: "button",
    domains: ["button", "input_button", "input_boolean"],
  },
  {
    label: "Cameras",
    haDomains: ["camera"],
    value: "camera",
    domains: ["camera"],
  },
  {
    label: "Scenes",
    haDomains: ["scene"],
    value: "scene",
    domains: ["scene"],
  },
  {
    label: "Scripts",
    haDomains: ["script"],
    value: "script",
    domains: ["script"],
  },
];

function renderActionItemIconSource(index, item) {
  const editor = this;
  const scopedEditor = {
    hass: this.hass,
    _config: item,
    _t: (key, replacements) =>
      this._t(key, replacements),
    _handleConfigUpdate: (fieldKey, value) =>
      editor._updateActionItem(index, {
        [fieldKey]: value,
      }),
    _renderIconInput: (label, key) =>
      editor._renderActionItemIconInput(label, key, index),
  };

  return renderIconSourceControl.call(scopedEditor, {
    label: "Icon",
    sourceKey: "main_entity_icon_source",
    entityKey: "entity",
    customIconKeys: [
      "main_entity_icon",
    ],
    renderCustom() {
      return this._renderIconInput("", "main_entity_icon");
    },
  });
}
