import { html } from "lit";
import { unsafeHTML } from "lit/directives/unsafe-html.js";

function t(editor, key) {
  return editor._t
    ? editor._t(key)
    : key;
}

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
  const defaultTab = value && this._isImageIcon(value)
    ? "files"
    : "ha";
  const activeTab = this._iconPickerKey === pickerKey
    ? this._iconPickerTab || defaultTab
    : defaultTab;

  if (
    activeTab === "files" &&
    !this._orbitIconFilesLoading &&
    !this._localIconFilesLoading &&
    !(this._orbitIconFiles || []).length &&
    !(this._localIconFiles || []).length
  ) {
    queueMicrotask(() => this._loadLocalIconFiles?.(value));
  }

  return html`
    <div class="field">
      <label>${t(this, label)}</label>

      <div
        class="icon-picker-panel"
        @click=${(e) => e.stopPropagation()}
      >
        <div class="icon-tabs">
          <button
            type="button"
            class=${activeTab === "ha" ? "active" : ""}
            @click=${() => {
              this._iconPickerKey = pickerKey;
              this._iconPickerTab = "ha";
            }}
          >
            ${t(this, "Icons")}
          </button>
          <button
            type="button"
            class=${activeTab === "files" ? "active" : ""}
            @click=${() => {
              this._iconPickerKey = pickerKey;
              this._iconPickerTab = "files";
              this._loadLocalIconFiles?.(value);
            }}
          >
            ${t(this, "Files")}
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
  const allItems = createFilePickerItems([
    ...orbitFiles,
    ...localFiles,
  ]);
  const isLoading =
    this._orbitIconFilesLoading ||
    this._localIconFilesLoading;

  if (isLoading) {
    return html`
      <div class="icon-picker-note">${t(this, "Loading files...")}</div>
    `;
  }

  if (!orbitFiles.length && !localFiles.length) {
    return html`
      <div class="icon-picker-note">
        ${t(
          this,
          "No files found. Add a local icon manifest at /local/icons/manifest.json or type the filename manually."
        )}
      </div>
    `;
  }

  return html`
    <ha-generic-picker
      .value=${value && this._isImageIcon(value) ? value : ""}
      .getItems=${(searchString) =>
        filterFilePickerItems(allItems, searchString)}
      .rowRenderer=${(item) =>
        renderFilePickerRow.call(this, item)}
      .valueRenderer=${(itemValue) =>
        renderFilePickerValue.call(
          this,
          allItems.find((item) => item.id === itemValue)
        )}
      .notFoundLabel=${t(this, "No matching files")}
      .emptyLabel=${""}
      .noSort=${true}
      @value-changed=${(e) => {
        e.stopPropagation();
        this._handleConfigUpdate(key, e.detail.value || "");
      }}
    ></ha-generic-picker>
  `;
}

function createFilePickerItems(files) {
  return uniqueIconRecords(files).map((file) => {
    const value = getIconRecordValue(file);
    const label = getFilePickerDisplayLabel(file);

    return {
      id: value,
      primary: label,
      sorting_label: label,
      iconFile: file,
      search_labels: {
        label,
        file: file.file || "",
        name: file.name || "",
        value,
      },
    };
  });
}

function getFilePickerDisplayLabel(file) {
  const prefix = file.source
    ? `${file.source}:`
    : "";
  const rawLabel = file.name || file.file || "";
  const displayLabel = rawLabel
    .trim()
    .replace(/\s+/g, "-");

  return `${prefix}${displayLabel}`;
}

function filterFilePickerItems(items, searchString = "") {
  const search = searchString.trim().toLowerCase();

  if (!search) return items;

  return items.filter((item) =>
    Object.values(item.search_labels || {}).some((label) =>
      String(label).toLowerCase().includes(search)
    )
  );
}

function renderFilePickerRow(item) {
  return html`
    <ha-combo-box-item type="button" compact>
      ${renderFilePickerStart.call(this, item)}
      <span slot="headline">${item.primary}</span>
    </ha-combo-box-item>
  `;
}

function renderFilePickerValue(item) {
  if (!item) return "";

  return html`
    ${renderFilePickerStart.call(this, item)}
    <span slot="headline">${item.primary}</span>
  `;
}

function renderFilePickerStart(item) {
  if (!item?.iconFile) return "";

  const previewStyle = getFilePickerPreviewStyle();

  return html`
    <span
      slot="start"
      class="file-picker-preview"
      style=${previewStyle}
    >
      ${renderFilePreviewContent.call(this, item.iconFile)}
    </span>
  `;
}

function renderFilePreviewContent(icon) {
  const iconValue = getIconRecordValue(icon);
  const iconPath = this._resolveIconPath(iconValue);

  if (!iconPath) return html``;

  const inlineSvg =
    this._getInlineSvg
      ? this._getInlineSvg(iconPath)
      : "";
  const darkMode =
    this.hass?.themes?.darkMode ?? this.hass?.selectedTheme?.dark ?? false;
  const previewStyle = getFilePickerPreviewStyle();
  const imageStyle = getFilePickerImageStyle(darkMode);

  return html`
    <span
      class="file-picker-preview-inner"
      style=${previewStyle}
    >
      ${inlineSvg
        ? html`${unsafeHTML(normalizeFilePickerSvg(inlineSvg))}`
        : html`
            <img
              class=${darkMode ? "dark" : ""}
              src=${iconPath}
              alt=""
              width="24"
              height="24"
              style=${imageStyle}
              loading="eager"
              decoding="sync"
              fetchpriority="high"
            />
          `}
    </span>
  `;
}

function getFilePickerPreviewStyle() {
  return [
    "display:inline-flex",
    "flex:0 0 24px",
    "width:24px !important",
    "height:24px !important",
    "min-width:24px !important",
    "min-height:24px !important",
    "max-width:24px !important",
    "max-height:24px !important",
    "align-items:center",
    "justify-content:center",
    "overflow:hidden",
    "line-height:0",
    "box-sizing:border-box",
    "contain:layout paint",
    "color:var(--secondary-text-color)",
  ].join(";");
}

function getFilePickerImageStyle(darkMode) {
  return [
    "display:block",
    "flex:none",
    "width:24px !important",
    "height:24px !important",
    "min-width:24px !important",
    "min-height:24px !important",
    "max-width:24px !important",
    "max-height:24px !important",
    "object-fit:contain",
    "box-sizing:border-box",
    "overflow:hidden",
    darkMode
      ? "filter:brightness(0) invert(72%)"
      : "filter:brightness(0) opacity(72%)",
  ].join(";");
}

function normalizeFilePickerSvg(svg) {
  if (!svg) return "";

  const preparedSvg = normalizeFilePickerSvgColors(
    svg
      .replace(/<\?xml[^>]*>/gi, "")
      .trim()
  );
  const openingTag = preparedSvg.match(/<svg\b[^>]*>/i)?.[0];

  if (!openingTag) return preparedSvg;

  const previewSvgStyle = [
    "display:block",
    "flex:none",
    "width:24px !important",
    "height:24px !important",
    "min-width:24px !important",
    "min-height:24px !important",
    "max-width:24px !important",
    "max-height:24px !important",
    "overflow:hidden",
    "box-sizing:border-box",
    "color:var(--secondary-text-color)",
    "fill:currentColor",
    "stroke:currentColor",
    "vertical-align:middle",
    "pointer-events:none",
  ].join(";");

  let normalizedTag = openingTag
    .replace(/\swidth=(["'])[^"']*\1/gi, "")
    .replace(/\sheight=(["'])[^"']*\1/gi, "")
    .replace(/\sstyle=(["'])[^"']*\1/gi, "")
    .replace(/\spreserveAspectRatio=(["'])[^"']*\1/gi, "");

  normalizedTag = normalizedTag.replace(
    /^<svg\b/i,
    `<svg width="24" height="24" preserveAspectRatio="xMidYMid meet" focusable="false" aria-hidden="true" style="${previewSvgStyle}"`
  );

  return preparedSvg.replace(openingTag, normalizedTag);
}

function normalizeFilePickerSvgColors(svg) {
  return svg
    .replace(
      /\s(fill|stroke)=(["'])(#000(?:000)?|black|rgb\(\s*0\s*,\s*0\s*,\s*0\s*\)|rgba\(\s*0\s*,\s*0\s*,\s*0\s*,\s*(?:1|1\.0|100%)\s*\))\2/gi,
      (_match, attr) => ` ${attr}="currentColor"`
    )
    .replace(
      /(fill|stroke)\s*:\s*(#000(?:000)?|black|rgb\(\s*0\s*,\s*0\s*,\s*0\s*\)|rgba\(\s*0\s*,\s*0\s*,\s*0\s*,\s*(?:1|1\.0|100%)\s*\))/gi,
      (_match, prop) => `${prop}:currentColor`
    );
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
      ${renderFileIconLabel.call(this, icon, value)}
    </button>
  `;
}

function renderFileIconLabel(icon) {
  const previewStyle = getFilePickerPreviewStyle();

  return html`
    <span class="file-icon-preview" style=${previewStyle}>
      ${renderFilePreviewContent.call(this, icon)}
    </span>
    <span>${icon.name || icon.file}</span>
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
  if (!value || !isIconFile(value)) return null;

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
