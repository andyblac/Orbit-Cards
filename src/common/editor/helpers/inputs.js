import { html } from "lit";

function t(editor, key) {
  return editor._t
    ? editor._t(key)
    : key;
}

/* ==========================================
 * COLLAPSE HELPERS
 * ========================================== */

export function renderInput(label, key, placeholder) {
    return html`
      <div class="field">
        <label>${t(this, label)}</label>

        <input
          .value=${this._config?.[key] || ""}
          placeholder=${placeholder}
          @input=${(e) => this._handleInput(key, e)}
        />
      </div>
    `;
  }

export function renderTemplateInput(label, key) {
    return html`
      <div class="field">
        <label>${t(this, label)}</label>

        <input
          .value=${this._config?.[key] || ""}
          placeholder="states[entity.entity_id].attributes.percentage > 50"
          @input=${(e) =>
            this._handleConfigUpdate(
              key,
              e.target.value
            )}
        />
      </div>
    `;
  }
  
