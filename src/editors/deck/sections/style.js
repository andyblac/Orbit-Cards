import { html } from "lit";

export function renderDeckStyleControls(index, item) {
  const attributes = item?.attributes || {};
  const isWrap = this._config?.layout === "wrap";
  const isTabs = this._config?.layout === "tabs";
  const isOverlaySecondary =
    this._config?.layout === "overlay" && index > 0;
  const showTransparentBackground = isWrap || isTabs || isOverlaySecondary;
  const defaultTransparentBackground =
    isTabs || (isWrap && !this._config?.separate_cards);
  const transparentBackground =
    typeof attributes.transparent_background === "boolean"
      ? attributes.transparent_background
      : defaultTransparentBackground;
  const expanded = this._styleSectionExpanded === true;

  return html`
    <ha-expansion-panel
      class="deck-card-section deck-style-section"
      outlined
      .expanded=${expanded}
      @expanded-changed=${(ev) => {
        this._styleSectionExpanded = ev.detail.expanded;
      }}
    >
      <ha-icon slot="leading-icon" icon="mdi:palette"></ha-icon>
      <div slot="header" role="heading" aria-level="3">
        ${this._t("Style")}
      </div>
      <div class="deck-card-section-content deck-style-content">
        ${isTabs
          ? html`
              <div class="field-grid two-columns">
                ${this._renderAttributeSelector(index, {
                  label: "Icon",
                  selector: { icon: {} },
                  value: attributes.icon || "",
                  changeKey: "icon",
                })}
                ${this._renderAttributeSelector(index, {
                  label: "Name",
                  selector: { text: {} },
                  value: attributes.name || attributes.label || "",
                  changeKey: "name",
                })}
              </div>
            `
          : ""}

        ${isTabs && this._config?.tab_width_mode === "custom"
          ? this._renderAttributeSelector(index, {
              label: "Tab width",
              selector: { text: {} },
              value: attributes.width || "",
              changeKey: "width",
            })
          : ""}

        ${isOverlaySecondary
          ? html`
              <div class="field editor-button-toggle-field">
                <div class="field-header">
                  <label>${this._t("Mode")}</label>
                  <ha-selector
                    class="editor-header-button-toggle deck-overlay-fit-toggle"
                    .hass=${this.hass}
                    .selector=${{
                      button_toggle: {
                        options: [
                          {
                            label: this._t("Crop"),
                            value: "crop",
                          },
                          {
                            label: this._t("Resize"),
                            value: "resize",
                          },
                        ],
                      },
                    }}
                    .value=${attributes.fit || "resize"}
                    @value-changed=${(ev) =>
                      this._updateDeckAttributes(index, {
                        fit: ev.detail.value === "resize"
                          ? undefined
                          : ev.detail.value,
                      })}
                  ></ha-selector>
                </div>
              </div>
              <div class="field-grid four-columns deck-overlay-layout-grid">
                ${this._renderOverlayNumberSelector(index, {
                  label: "Left",
                  value: attributes.left,
                  changeKey: "left",
                  min: -10000,
                })}
                ${this._renderOverlayNumberSelector(index, {
                  label: "Top",
                  value: attributes.top,
                  changeKey: "top",
                  min: -10000,
                })}
                ${this._renderOverlayNumberSelector(index, {
                  label: "Width",
                  value: attributes.width,
                  changeKey: "width",
                })}
                ${this._renderOverlayNumberSelector(index, {
                  label: "Height",
                  value: attributes.height,
                  changeKey: "height",
                })}
              </div>
            `
          : ""}

        ${showTransparentBackground
          ? html`
              <label class="deck-force-padding-row">
                <span>${this._t("Transparent background")}</span>
                <ha-switch
                  .checked=${transparentBackground}
                  @change=${(ev) => {
                    const enabled = ev.target.checked;

                    this._updateDeckAttributes(index, {
                      transparent_background:
                        enabled === defaultTransparentBackground
                          ? undefined
                          : enabled,
                    });
                  }}
                ></ha-switch>
              </label>
            `
          : ""}

        <label class="deck-force-padding-row">
          <span>${this._t("Force padding")}</span>
          <ha-switch
            .checked=${attributes.force_padding === true}
            @change=${(ev) =>
              this._updateDeckAttributes(index, {
                force_padding: ev.target.checked ? true : undefined,
              })}
          ></ha-switch>
        </label>

        <div class="field-grid four-columns deck-padding-grid">
          ${this._renderAttributeSelector(index, {
            label: "Top",
            selector: { text: {} },
            value: attributes.padding_top || "",
            changeKey: "padding_top",
          })}
          ${this._renderAttributeSelector(index, {
            label: "Bottom",
            selector: { text: {} },
            value: attributes.padding_bottom || "",
            changeKey: "padding_bottom",
          })}
          ${this._renderAttributeSelector(index, {
            label: "Left",
            selector: { text: {} },
            value: attributes.padding_left || "",
            changeKey: "padding_left",
          })}
          ${this._renderAttributeSelector(index, {
            label: "Right",
            selector: { text: {} },
            value: attributes.padding_right || "",
            changeKey: "padding_right",
          })}
        </div>
      </div>
    </ha-expansion-panel>
  `;
}
