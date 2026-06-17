import { html } from "lit";

export function renderActionSection() {
  const items = this._getActionItems();
  const selectedIndex = Math.min(
    this._selectedActionIndex || 0,
    items.length - 1
  );
  const selectedItem = items[selectedIndex] || {};
  const domainFilter = this._actionEntityDomainFilter || "all";
  const selectorDomains = getActionEntityDomains(domainFilter);
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

        <div class="action-domain-filters">
          ${ACTION_DOMAIN_FILTERS.map((filter) => html`
            <button
              type="button"
              class=${filter.value === domainFilter ? "active" : ""}
              @click=${() => {
                this._actionEntityDomainFilter = filter.value;
              }}
            >
              ${this._t(filter.label)}
            </button>
          `)}
        </div>

        <div class="entity-row">
          <ha-selector
            class="entity-picker"
            .hass=${this.hass}
            .selector=${{
              entity: {
                domain: selectorDomains,
              },
            }}
            .value=${selectedItem.entity || ""}
            @value-changed=${(e) =>
              this._updateActionItem(selectedIndex, {
                entity: e.detail.value || "",
              })}
          ></ha-selector>

          ${selectedItem.entity
            ? html`
                <button
                  type="button"
                  class="clear-button"
                  @click=${() =>
                    this._updateActionItem(selectedIndex, {
                      entity: "",
                    })}
                >
                  ✕
                </button>
              `
            : ""}
        </div>
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

      ${this._renderActionItemIconInput(
        "Main Entity Icon",
        "main_entity_icon",
        selectedIndex
      )}

      ${selectedItem.entity
        ? html`
            ${this._renderActionItemActionSelector(
              "Tap Action",
              "tap_action",
              selectedIndex,
              getDefaultTapAction(selectedItem.entity)
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
    domains: [
      "scene",
      "script",
      "automation",
      "button",
      "input_button",
    ],
  },
  {
    label: "Scenes",
    value: "scene",
    domains: ["scene"],
  },
  {
    label: "Scripts",
    value: "script",
    domains: ["script"],
  },
  {
    label: "Automations",
    value: "automation",
    domains: ["automation"],
  },
  {
    label: "Buttons",
    value: "button",
    domains: ["button", "input_button", "input_boolean"],
  },
];

function getActionEntityDomains(value) {
  return (
    ACTION_DOMAIN_FILTERS.find((filter) => filter.value === value) ||
    ACTION_DOMAIN_FILTERS[0]
  ).domains;
}

function getDefaultTapAction(entityId) {
  const domain = entityId?.split(".")[0];

  if (domain === "scene") {
    return {
      action: "call-service",
      service: "scene.turn_on",
      service_data: {
        entity_id: entityId,
      },
    };
  }

  if (domain === "script") {
    return {
      action: "call-service",
      service: "script.turn_on",
      service_data: {
        entity_id: entityId,
      },
    };
  }

  if (domain === "automation") {
    return {
      action: "call-service",
      service: "automation.trigger",
      service_data: {
        entity_id: entityId,
      },
    };
  }

  if (domain === "button" || domain === "input_button") {
    return {
      action: "call-service",
      service: "button.press",
      service_data: {
        entity_id: entityId,
      },
    };
  }

  return {
    action: "toggle",
  };
}
