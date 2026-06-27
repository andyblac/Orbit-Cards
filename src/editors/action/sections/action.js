import { html } from "lit";
import { renderEntitySelector } from "../../../common/editor/helpers/renders.js";
import { renderIconSourceControl } from "../../../common/editor/helpers/icon.js";
import { getDefaultEntityAction } from "../../../common/helpers/default-actions.js";

export function renderActionSection() {
  const items = this._getActionItems();
  const selectedIndex = Math.min(
    this._selectedActionIndex || 0,
    items.length - 1
  );
  const selectedItem = items[selectedIndex] || {};
  const domainFilter = this._actionEntityDomainFilter || "all";
  const actionsPerRow = Math.max(
    1,
    Number(this._config?.actions_per_row) || 3
  );
  const shouldWrapTabs =
    Boolean(this._config?.wrap) &&
    items.length > actionsPerRow;
  const showTabScrollHint =
    (!shouldWrapTabs && items.length > 6) ||
    (shouldWrapTabs && actionsPerRow > 6);

  return html`
    <div class="section">
      <div class="action-group-options">
        <label class="action-wrap-toggle">
          <span>${this._t("Wrap")}</span>
          <ha-switch
            .checked=${!!this._config?.wrap}
            @change=${(e) =>
              this._updateConfig({
                wrap: e.target.checked,
                actions_per_row: e.target.checked
                  ? this._config?.actions_per_row || 3
                  : this._config?.actions_per_row,
              })}
          ></ha-switch>
        </label>

        ${items.length > 1
          ? html`
              <label class="action-wrap-toggle">
                <span>${this._t("Separate Cards")}</span>
                <ha-switch
                  .checked=${!!this._config?.separate_cards}
                  @change=${(e) =>
                    this._updateConfig({
                      separate_cards: e.target.checked,
                    })}
                ></ha-switch>
              </label>
            `
          : ""}

      ${this._config?.wrap
        ? html`
            <label class="action-per-row-field">
              <span>${this._t("Actions Per Row")}</span>

              <input
                type="number"
                min="1"
                step="1"
                .value=${String(this._config?.actions_per_row || 3)}
                @input=${(e) =>
                  this._updateConfig({
                    actions_per_row: Math.max(
                      1,
                      Number(e.target.value) || 1
                    ),
                  })}
              />
            </label>
          `
        : ""}
      </div>

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
        <label>${this._t("Main Entity")}</label>

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
        "Accent Color",
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
        ? html`
            ${this._renderActionItemActionSelector(
              "Tap Action",
              "tap_action",
              selectedIndex,
              getDefaultEntityAction(selectedItem.entity, "toggle")
            )}
            ${this._renderActionItemActionSelector(
              "Hold Action",
              "hold_action",
              selectedIndex,
              "more-info"
            )}
          `
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
