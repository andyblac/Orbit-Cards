import { html } from "lit";

export function renderStatusSection() {
  const mode = this._config?.mode || "standard";
  const isIconOnly = mode === "icon_only";
  const isPerson = mode === "person";
  const cardActionDefault =
    isIconOnly || isPerson
      ? "more-info"
      : "navigate";
  const effectiveCardAction =
    this._config?.tap_action?.action ||
    cardActionDefault;
  const mainEntityActionDefault =
    isIconOnly || isPerson
      ? effectiveCardAction
      : "more-info";

  return html`
    <div class="section">
      <div class="field">
        <label>Mode</label>

        <select
          .value=${this._config?.mode || "standard"}
          @change=${(e) =>
            this._updateConfig({
              mode: e.target.value,
            })}
        >
          <option value="standard">Standard</option>
          <option value="icon_only">Icon Only</option>
          <option value="person">Person</option>
        </select>
      </div>
    </div>

    ${isIconOnly
      ? renderIconOnlyStatusConfig.call(this, {
          cardActionDefault,
          mainEntityActionDefault,
        })
      : html`
          <div class="section">
            ${isPerson
              ? html`
                  ${this._renderEntity("Person Entity", "main_entity")}
                  ${this._renderEntity("Tracker Entity", "tracker_entity")}
                  ${this._renderEntity("ETA Entity", "eta_entity")}
                  ${this._renderEntity("Battery Entity 1", "battery_entity_1")}
                  ${this._renderEntity("Battery Entity 2", "battery_entity_2")}
                  ${this._renderColor("Accent ON Color", "accent_on_color")}
                  ${this._renderColor("Accent OFF Color", "accent_off_color")}
                `
              : html`
                  ${this._renderInput("Status Name", "status_name")}
                  ${this._renderEntity("Main Entity", "main_entity")}
                  ${this._renderColor("Accent ON Color", "accent_on_color")}
                  ${this._renderColor("Accent OFF Color", "accent_off_color")}
                  ${this._renderIconInput("Main Entity Icon", "main_entity_icon")}
                  ${this._renderIconInput("Main Entity ON Icon", "main_entity_icon_on")}
                  ${this._renderIconInput("Main Entity OFF Icon", "main_entity_icon_off")}
                  ${this._renderInput("State Template", "state_template")}
                  ${this._renderInput("Label Template", "label_template")}
                `}

            ${this._config?.main_entity
              ? html`
                  ${this._renderActionSelector(
                    "Card Action",
                    "tap_action",
                    cardActionDefault
                  )}
                  ${this._renderActionSelector(
                    "Main Entity Action",
                    "main_entity_tap_action",
                    mainEntityActionDefault
                  )}
                  ${this._renderActionSelector(
                    "Hold Action",
                    "main_entity_hold_action",
                    "none"
                  )}
                `
              : ""}
          </div>
        `}
  `;
}

function renderIconOnlyStatusConfig({
  cardActionDefault,
  mainEntityActionDefault,
}) {
  const items = this._getStatusItems();
  const selectedIndex = Math.min(
    this._selectedStatusIndex || 0,
    items.length - 1
  );
  const selectedItem = items[selectedIndex] || {};

  return html`
    <div class="section">
      <div class="status-group-options">
        <label class="status-wrap-toggle">
          <input
            type="checkbox"
            .checked=${!!this._config?.wrap}
            @change=${(e) =>
              this._updateConfig({
                wrap: e.target.checked,
                items_per_row: e.target.checked
                  ? this._config?.items_per_row || 3
                  : this._config?.items_per_row,
              })}
          />
          <span>Wrap</span>
        </label>

        ${items.length > 1
          ? html`
              <label class="status-wrap-toggle">
                <input
                  type="checkbox"
                  .checked=${!!this._config?.separate_cards}
                  @change=${(e) =>
                    this._updateConfig({
                      separate_cards: e.target.checked,
                    })}
                />
                <span>Separate Cards</span>
              </label>

              <div class="status-editor-tools">
                <button
                  type="button"
                  class="status-tool-button"
                  title="Move left"
                  ?disabled=${selectedIndex === 0}
                  @click=${() => this._moveStatusItem(selectedIndex, -1)}
                >
                  <ha-icon icon="mdi:arrow-left"></ha-icon>
                </button>

                <button
                  type="button"
                  class="status-tool-button"
                  title="Move right"
                  ?disabled=${selectedIndex === items.length - 1}
                  @click=${() => this._moveStatusItem(selectedIndex, 1)}
                >
                  <ha-icon icon="mdi:arrow-right"></ha-icon>
                </button>

                <button
                  type="button"
                  class="status-tool-button"
                  title="Remove"
                  @click=${() => this._removeStatusItem(selectedIndex)}
                >
                  <ha-icon icon="mdi:trash-can"></ha-icon>
                </button>
              </div>
            `
          : ""}
      </div>

      ${this._config?.wrap
        ? html`
            <div class="field">
              <label>Items Per Row</label>

              <input
                type="number"
                min="1"
                step="1"
                .value=${String(this._config?.items_per_row || 3)}
                @input=${(e) =>
                  this._updateConfig({
                    items_per_row: Math.max(
                      1,
                      Number(e.target.value) || 1
                    ),
                  })}
              />
            </div>
          `
        : ""}

      <div class="status-tabs">
        ${items.map((_, index) => html`
          <button
            type="button"
            class="status-tab ${index === selectedIndex ? "active" : ""}"
            @click=${() => this._selectStatusItem(index)}
          >
            ${index + 1}
          </button>
        `)}

        <button
          type="button"
          class="status-tab-add"
          @click=${() => this._addStatusItem()}
        >
          +
        </button>
      </div>

      <div class="field">
        <label>Main Entity</label>

        <div class="entity-row">
          <ha-selector
            class="entity-picker"
            .hass=${this.hass}
            .selector=${{ entity: {} }}
            .value=${selectedItem.entity || ""}
            @value-changed=${(e) =>
              this._updateStatusItem(selectedIndex, {
                entity: e.detail.value || "",
              })}
          ></ha-selector>

          ${selectedItem.entity
            ? html`
                <button
                  type="button"
                  class="clear-button"
                  @click=${() =>
                    this._updateStatusItem(selectedIndex, {
                      entity: "",
                    })}
                >
                  ✕
                </button>
              `
            : ""}
        </div>
      </div>

      ${renderStatusItemColor.call(
        this,
        "Accent ON Color",
        "accent_on_color",
        selectedIndex,
        selectedItem
      )}
      ${renderStatusItemColor.call(
        this,
        "Accent OFF Color",
        "accent_off_color",
        selectedIndex,
        selectedItem
      )}

      ${this._renderStatusItemIconInput(
        "Main Entity Icon",
        "main_entity_icon",
        selectedIndex
      )}
      ${this._renderStatusItemIconInput(
        "Main Entity ON Icon",
        "main_entity_icon_on",
        selectedIndex
      )}
      ${this._renderStatusItemIconInput(
        "Main Entity OFF Icon",
        "main_entity_icon_off",
        selectedIndex
      )}

      ${renderStatusItemInput.call(
        this,
        "State Template",
        "state_template",
        selectedIndex,
        selectedItem
      )}
      ${renderStatusItemInput.call(
        this,
        "Label Template",
        "label_template",
        selectedIndex,
        selectedItem
      )}

      ${selectedItem.entity
        ? html`
            ${this._renderStatusItemActionSelector(
              "Card Action",
              "tap_action",
              selectedIndex,
              cardActionDefault
            )}
            ${this._renderStatusItemActionSelector(
              "Main Entity Action",
              "main_entity_tap_action",
              selectedIndex,
              mainEntityActionDefault
            )}
            ${this._renderStatusItemActionSelector(
              "Hold Action",
              "main_entity_hold_action",
              selectedIndex,
              "none"
            )}
          `
        : ""}
    </div>
  `;
}

function renderStatusItemInput(label, key, index, item) {
  return html`
    <div class="field">
      <label>${label}</label>
      <input
        .value=${item[key] || ""}
        @input=${(e) =>
          this._updateStatusItem(index, {
            [key]: e.target.value,
          })}
      />
    </div>
  `;
}

function renderStatusItemColor(label, key, index, item) {
  return this._renderColorControl(
    label,
    `status-${index}-${key}`,
    item[key] || "",
    (value) =>
      this._updateStatusItem(index, {
        [key]: value,
      })
  );
}
