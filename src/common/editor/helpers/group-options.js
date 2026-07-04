import { html } from "lit";

export function getGroupedEditorState({
  config = {},
  itemCount = 0,
  wrapEnabled = Boolean(config?.wrap),
  perRowKey = "items_per_row",
  defaultPerRow = 3,
  scrollThreshold = 6,
} = {}) {
  const itemsPerRow = Math.max(
    1,
    Number(config?.[perRowKey]) || defaultPerRow
  );
  const shouldWrapTabs =
    Boolean(wrapEnabled) &&
    itemCount > itemsPerRow;
  const showTabScrollHint =
    (!shouldWrapTabs && itemCount > scrollThreshold) ||
    (shouldWrapTabs && itemsPerRow > scrollThreshold);

  return {
    itemsPerRow,
    shouldWrapTabs,
    showTabScrollHint,
  };
}

export function renderGroupedEditorOptions({
  itemCount = 0,
  classPrefix,
  wrapKey = "wrap",
  wrapEnabled = Boolean(this._config?.[wrapKey]),
  showWrapToggle = true,
  showSeparateToggle = itemCount > 1,
  separateKey = "separate_cards",
  perRowKey = "items_per_row",
  perRowLabel = "Items per row",
  defaultPerRow = 3,
} = {}) {
  const prefix = classPrefix || "action";

  return html`
    <div class="${prefix}-group-options">
      ${showWrapToggle
        ? html`
            <label class="${prefix}-wrap-toggle">
              <span>${this._t("Wrap")}</span>
              <ha-switch
                .checked=${!!wrapEnabled}
                @change=${(e) =>
                  this._updateConfig({
                    [wrapKey]: e.target.checked,
                    [perRowKey]: e.target.checked
                      ? this._config?.[perRowKey] || defaultPerRow
                      : this._config?.[perRowKey],
                  })}
              ></ha-switch>
            </label>
          `
        : ""}

      ${showSeparateToggle
        ? html`
            <label class="${prefix}-wrap-toggle">
              <span>${this._t("Separate cards")}</span>
              <ha-switch
                .checked=${!!this._config?.[separateKey]}
                @change=${(e) =>
                  this._updateConfig({
                    [separateKey]: e.target.checked,
                  })}
              ></ha-switch>
            </label>
          `
        : ""}

      ${wrapEnabled
        ? html`
            <div class="${prefix}-per-row-field">
              ${this._renderNumberInput(perRowLabel, perRowKey, {
                value: this._config?.[perRowKey] || defaultPerRow,
                min: 1,
                step: 1,
                onValueChanged: (value) =>
                  this._updateConfig({
                    [perRowKey]: Math.max(
                      1,
                      Number(value) || 1
                    ),
                  }),
              })}
            </div>
          `
        : ""}
    </div>
  `;
}
