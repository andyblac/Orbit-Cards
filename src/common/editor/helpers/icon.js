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

  if (iconPath.startsWith("orbit:")) {
    return getOrbitIconPath(iconPath.slice(6));
  }

  if (iconPath.startsWith("local:")) {
    return `/local/icons/${iconPath.slice(6)}`;
  }

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

function getOrbitIconPath(file) {
  const moduleUrl = import.meta.url.split("?")[0];
  const base = moduleUrl.slice(0, moduleUrl.lastIndexOf("/") + 1);

  return `${base}icons/${file}`;
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
  const currentFile = getIconRecordFromValue(currentIcon);

  this._localIconFilesLoading = true;
  this._orbitIconFilesLoading = true;
  this.requestUpdate();

  const [
    orbitFiles,
    localFiles,
  ] = await Promise.all([
    discoverOrbitIconFiles(),
    discoverLocalIconFiles(),
  ]);

  this._orbitIconFiles = uniqueIconRecords(orbitFiles);
  this._localIconFiles = uniqueIconRecords([
    currentFile?.source === "local" || !currentFile?.source
      ? currentFile
      : null,
    ...localFiles,
  ]);
  this._orbitIconFilesLoading = false;
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
  const orbitFiles = this._orbitIconFiles || [];
  const localFiles = this._localIconFiles || [];
  const isLoading =
    this._orbitIconFilesLoading ||
    this._localIconFilesLoading;

  if (isLoading) {
    return html`
      <div class="icon-picker-note">Loading files...</div>
    `;
  }

  if (!orbitFiles.length && !localFiles.length) {
    return html`
      <div class="icon-picker-note">
        No files found. Add a local icon manifest at
        <code>/local/icons/manifest.json</code>
        or type the filename manually.
      </div>
    `;
  }

  return html`
    ${orbitFiles.length
      ? renderFileIconSection.call(
          this,
          "Orbit Icons",
          key,
          orbitFiles,
          value
        )
      : ""}

    ${localFiles.length
      ? renderFileIconSection.call(
          this,
          "Local Icons",
          key,
          localFiles,
          value
        )
      : ""}
  `;
}

function renderFileIconSection(title, key, files, value) {
  return html`
    <div class="file-icon-section">
      <div class="file-icon-section-title">${title}</div>
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
    </div>
  `;
}

function renderFileIconOption(key, icon, value) {
  const iconValue = getIconRecordValue(icon);
  const iconPath = this._resolveIconPath(iconValue);
  const inlineSvg =
    this._getInlineSvg
      ? this._getInlineSvg(iconPath)
      : "";
  const isActive =
    value === iconValue ||
    value === icon.file ||
    value === iconPath;

  return html`
    <button
      type="button"
      class=${isActive
        ? "file-icon-option active"
        : "file-icon-option"}
      title=${icon.name || icon.file}
      @click=${() => {
        this._handleConfigUpdate(key, iconValue);
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
      <span>${icon.name || icon.file}</span>
    </button>
  `;
}

async function discoverOrbitIconFiles() {
  const files = await loadIconManifest([
    getOrbitIconPath("manifest.json"),
    getOrbitIconPath("orbit-icons.json"),
  ]);

  return files.map((file) => ({
    ...file,
    source: "orbit",
  }));
}

async function discoverLocalIconFiles() {
  const globalFiles = Array.isArray(window.ORBIT_ICON_FILES)
    ? window.ORBIT_ICON_FILES
    : [];

  const manifestFiles = await loadIconManifest([
    "/local/icons/manifest.json",
    "/local/icons/orbit-icons.json",
    "/local/icons/icons.json",
  ]);
  const directoryFiles = await loadDirectoryListing();

  return [
    ...globalFiles,
    ...manifestFiles,
    ...directoryFiles,
  ].filter(isIconFile)
    .map((file) => normalizeIconRecord(file, "local"));
}

async function loadIconManifest(paths) {
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

      if (Array.isArray(files)) {
        return files
          .filter(isIconFile)
          .map((file) => normalizeIconRecord(file));
      }
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

  const file = typeof icon === "object"
    ? icon.file
    : icon;

  return file
    .toString()
    .split("?")[0]
    .split("/")
    .pop();
}

function isIconFile(file) {
  return isImageIcon(getIconFilename(file));
}

function normalizeIconRecord(icon, source = "") {
  const file = getIconFilename(icon);

  if (!file) return null;

  return {
    file,
    name: typeof icon === "object"
      ? icon.name || file
      : file,
    tags: Array.isArray(icon?.tags)
      ? icon.tags
      : [],
    source: icon?.source || source,
  };
}

function getIconRecordFromValue(value) {
  const file = getIconFilename(value);

  if (!file) return null;

  const source = value?.toString().startsWith("orbit:")
    ? "orbit"
    : value?.toString().startsWith("local:")
      ? "local"
      : "";

  return {
    file,
    name: file,
    tags: [],
    source,
  };
}

function getIconRecordValue(icon) {
  if (icon.source === "orbit") {
    return `orbit:${icon.file}`;
  }

  if (icon.source === "local") {
    return `local:${icon.file}`;
  }

  return icon.file;
}

function uniqueIconRecords(records) {
  const seen = new Set();

  return records
    .filter(Boolean)
    .filter((record) => {
      const key = `${record.source || ""}:${record.file}`;

      if (seen.has(key)) return false;

      seen.add(key);
      return true;
    })
    .sort((a, b) =>
      (a.name || a.file).localeCompare(b.name || b.file)
    );
}
