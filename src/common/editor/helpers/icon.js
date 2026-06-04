import { html } from "lit";
import { unsafeHTML } from "lit/directives/unsafe-html.js";

/* ==========================================
 * ICON HELPERS
 * ========================================== */

export function isImageIcon(icon) {
  if (!icon) return false;

  const cleanIcon = icon.split("?")[0].toLowerCase();

  return (
    cleanIcon.endsWith(".svg") ||
    cleanIcon.endsWith(".png") ||
    cleanIcon.endsWith(".gif") ||
    cleanIcon.endsWith(".webp")
  );
}

export function resolveIconPath(iconPath) {
  if (!iconPath) return "";

  if (
    iconPath.startsWith("/")
  ) {
    return iconPath;
  }

  if (iconPath.startsWith("http")) {
    return iconPath;
  }

  return `/local/icons/${iconPath}`;
}

export function renderIconInput(label, key, placeholder) {
  const value = this._config?.[key] || "";
  const pickerKey = `${this._iconPickerPrefix || "icon"}-${key}`;
  const isOpen = this._iconPickerKey === pickerKey;
  const activeTab = this._iconPickerTab || "ha";
  const iconPath =
    value && this._isImageIcon(value)
      ? this._resolveIconPath(value)
      : "";
  const inlineSvg =
    iconPath && this._getInlineSvg
      ? this._getInlineSvg(iconPath)
      : "";

  return html`
    <div class="field">
      <label>${label}</label>

      <div class="icon-input-row">

        <input
          .value=${value}
          placeholder=${placeholder}
          @input=${(e) =>
            this._handleConfigUpdate(
              key,
              e.target.value
            )}
        />

        <div
          class="icon-preview"
          title="Choose icon"
          @click=${(e) => {
            e.preventDefault();
            e.stopPropagation();

            this._iconPickerKey = isOpen ? "" : pickerKey;
            this._iconPickerTab = this._isImageIcon(value)
              ? "files"
              : "ha";

            if (!isOpen) {
              this._loadLocalIconFiles?.(value);
            }

            this.requestUpdate?.();
          }}
        >

          ${value
            ? this._isImageIcon(value)
              ? html`
                  <span class="preview-image-stack">
                    ${inlineSvg
                      ? html`
                          <span class="preview-svg">
                            ${unsafeHTML(inlineSvg)}
                          </span>
                        `
                      : html`
                          <img
                            src=${iconPath}
                            class="preview-image"
                            alt=""
                          />
                        `}
                  </span>
                `
              : html`
                  <ha-icon
                    .icon=${value}
                  ></ha-icon>
                `
            : html`
                <ha-icon
                  icon="mdi:image-outline"
                ></ha-icon>
              `}
        </div>

        ${isOpen
          ? html`
              <div
                class="icon-popover"
                @click=${(e) => e.stopPropagation()}
              >
                <div class="icon-tabs">
                  <button
                    type="button"
                    class=${activeTab === "ha" ? "active" : ""}
                    @click=${() => {
                      this._iconPickerTab = "ha";
                    }}
                  >
                    Icons
                  </button>
                  <button
                    type="button"
                    class=${activeTab === "files" ? "active" : ""}
                    @click=${() => {
                      this._iconPickerTab = "files";
                      this._loadLocalIconFiles?.(value);
                    }}
                  >
                    Files
                  </button>
                </div>

                ${activeTab === "files"
                  ? renderFileIconPicker.call(
                      this,
                      key,
                      value
                    )
                  : renderHaIconPicker.call(
                      this,
                      key,
                      value
                    )}
              </div>
            `
          : ""}

      </div>
    </div>
  `;
}

export async function loadLocalIconFiles(currentIcon = "") {
  const currentFile = getIconFilename(currentIcon);

  this._localIconFilesLoading = true;
  this.requestUpdate();

  const discoveredFiles = await discoverLocalIconFiles();
  const files = [
    currentFile,
    ...discoveredFiles,
  ].filter(Boolean);

  this._localIconFiles = [...new Set(files)].sort();
  this._localIconFilesLoading = false;
  this.requestUpdate();
}

function renderHaIconPicker(key, value) {
  return html`
    <ha-icon-picker
      .hass=${this.hass}
      .value=${value && !this._isImageIcon(value) ? value : ""}
      @value-changed=${(e) => {
        this._handleConfigUpdate(key, e.detail.value || "");
      }}
    ></ha-icon-picker>
  `;
}

function renderFileIconPicker(key, value) {
  const files = this._localIconFiles || [];

  if (this._localIconFilesLoading) {
    return html`
      <div class="icon-picker-note">Loading files...</div>
    `;
  }

  if (!files.length) {
    return html`
      <div class="icon-picker-note">
        No files found. Add an icon manifest at
        <code>/local/icons/orbit-icons.json</code>
        or type the filename manually.
      </div>
    `;
  }

  return html`
    <div class="file-icon-grid">
      ${files.map((file) =>
        renderFileIconOption.call(
          this,
          key,
          file,
          value
        )
      )}
    </div>
  `;
}

function renderFileIconOption(key, file, value) {
  const iconPath = this._resolveIconPath(file);
  const inlineSvg =
    this._getInlineSvg
      ? this._getInlineSvg(iconPath)
      : "";

  return html`
    <button
      type="button"
      class=${value === file || value === iconPath
        ? "file-icon-option active"
        : "file-icon-option"}
      title=${file}
      @click=${() => {
        this._handleConfigUpdate(key, file);
        this._iconPickerKey = "";
      }}
    >
      <span class="file-icon-preview">
        ${inlineSvg
          ? html`${unsafeHTML(inlineSvg)}`
          : html`
              <img src=${iconPath} alt="" />
            `}
      </span>
      <span>${file}</span>
    </button>
  `;
}

async function discoverLocalIconFiles() {
  const globalFiles = Array.isArray(window.ORBIT_ICON_FILES)
    ? window.ORBIT_ICON_FILES
    : [];

  const manifestFiles = await loadIconManifest();
  const directoryFiles = await loadDirectoryListing();

  return [
    ...globalFiles,
    ...manifestFiles,
    ...directoryFiles,
  ].filter(isIconFile)
    .map(getIconFilename);
}

async function loadIconManifest() {
  const paths = [
    "/local/icons/orbit-icons.json",
    "/local/icons/icons.json",
    "/local/icons/manifest.json",
  ];

  for (const path of paths) {
    try {
      const response = await fetch(path, {
        cache: "no-store",
      });

      if (!response.ok) continue;

      const data = await response.json();
      const files = Array.isArray(data)
        ? data
        : data.files;

      if (Array.isArray(files)) return files;
    } catch (_err) {
      // Home Assistant often does not expose local manifests.
    }
  }

  return [];
}

async function loadDirectoryListing() {
  try {
    const response = await fetch("/local/icons/", {
      cache: "no-store",
    });

    if (!response.ok) return [];

    const text = await response.text();

    return [...text.matchAll(/href=["']([^"']+)["']/gi)]
      .map((match) => match[1]);
  } catch (_err) {
    return [];
  }
}

function getIconFilename(icon) {
  if (!icon) return "";

  return icon
    .toString()
    .split("?")[0]
    .split("/")
    .pop();
}

function isIconFile(file) {
  return isImageIcon(getIconFilename(file));
}
