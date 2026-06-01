import { html } from "lit";

export function renderCurvedButtonsSection() {
    return html`
      <div class="section">
        ${this._renderSectionHeader("Curve Buttons", "curve")}

        ${!this._collapsed.curve
          ? html`

              <!-- GLOBAL POSITION LOCK -->
              <div class="field">
                <label>Lock Curve Button Positions</label>

                <select
                  .value=${this._config?.curve_buttons_lock_position
                    ? "true"
                    : "false"}
                  @change=${(e) =>
                    this._updateConfig({
                      curve_buttons_lock_position:
                        e.target.value === "true",
                    })}
                >
                  <option value="false">Disabled</option>
                  <option value="true">Enabled</option>
                </select>
              </div>

              </div>

              <div class="curve-divider"></div>

              ${[1, 2, 3, 4, 5, 6].map(
                (i) => html`
                  <div class="sub-section">

                    ${this._renderSubSectionHeader(
                      `Curve Button ${i}`,
                      `curve${i}`
                    )}

                    ${!this._collapsed[`curve${i}`]
                      ? html`

                          ${this._renderEntity(
                            `Entity`,
                            `curve_button${i}`
                          )}

                          ${this._renderIconInput(
                            `Icon`,
                            `curve_button${i}_icon`
                          )}

                          ${this._renderIconInput(
                            `ON Icon`,
                            `curve_button${i}_icon_on`
                          )}

                          ${this._renderIconInput(
                            `OFF Icon`,
                            `curve_button${i}_icon_off`
                          )}

                          ${this._renderTemplateInput(
                            `State Template`,
                            `curve_button${i}_state_template`
                          )}

                          ${this._renderActionSelector(
                            `Tap Action`,
                            `curve_button${i}_tap_action`,
                            "more-info"
                          )}

                          ${this._renderActionSelector(
                            `Hold Action`,
                            `curve_button${i}_hold_action`,
                            "none"
                          )}
                        `
                      : ""}

                  </div>
                `
              )}
            `
          : ""}
      </div>
    `;
  }
