import { html } from "lit";

export function renderButtonsSection() {
    return html`
      <div class="section">
        ${this._renderSectionHeader("Buttons", "buttons")}

        ${!this._collapsed.buttons
          ? html`

              ${[1, 2, 3, 4].map(
                (i) => html`
                  <div class="sub-section">

                    ${this._renderSubSectionHeader(
                      `Button ${i}`,
                      `button${i}`
                    )}

                    ${!this._collapsed[`button${i}`]
                      ? html`

                          ${this._renderEntity(
                            `Entity`,
                            `button${i}`
                          )}

                          ${this._renderColor(
                            `ON Color`,
                            `button${i}_on_color`
                          )}

                          ${this._renderColor(
                            `OFF Color`,
                            `button${i}_off_color`
                          )}

                          ${this._renderIconInput(
                            `Icon`,
                            `button${i}_icon`
                          )}

                          ${this._renderIconInput(
                            `ON Icon`,
                            `button${i}_icon_on`
                          )}

                          ${this._renderIconInput(
                            `OFF Icon`,
                            `button${i}_icon_off`
                          )}

                          ${this._renderTemplateInput(
                            `State Template`,
                            `button${i}_state_template`
                          )}

                          ${this._renderActionSelector(
                            `Tap Action`,
                            `button${i}_tap_action`
                          )}

                          ${this._renderActionSelector(
                            `Hold Action`,
                            `button${i}_hold_action`,
                            "more-info"
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