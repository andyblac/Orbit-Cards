export function getMainIconColor(stateObj, isOn) {
  const roomColor = this._config.accent_color || "theme";

  if (!isOn) {
    return this._computeIconColor(roomColor);
  }

  if (roomColor === "light") {
    return (
      this._getEntityColor(stateObj) ||
      this._computeFullColor("theme")
    );
  }

  return this._computeFullColor(roomColor);
}

export function getEntityColor(stateObj) {
  if (!stateObj) return null;

  const domain = stateObj.entity_id?.split(".")[0];
  const attrs = stateObj.attributes || {};

  if (domain === "light") {
    if (Array.isArray(attrs.rgb_color)) {
      const [r, g, b] = attrs.rgb_color;
      return `rgb(${r}, ${g}, ${b})`;
    }

    if (Array.isArray(attrs.hs_color)) {
      const [h, s] = attrs.hs_color;
      return `hsl(${h}, ${s}%, 50%)`;
    }
  }

  return null;
}

export function getBinarySensorIcon(stateObj) {
  if (!stateObj) return null;

  const deviceClass = stateObj.attributes.device_class;
  const isOn = stateObj.state === "on";

  switch (deviceClass) {
    case "door":
      return isOn
        ? "mdi:door-open"
        : "mdi:door-closed";

    case "window":
      return isOn
        ? "mdi:window-open"
        : "mdi:window-closed";

    case "garage_door":
      return isOn
        ? "mdi:garage-open"
        : "mdi:garage";

    case "opening":
      return isOn
        ? "mdi:square-outline"
        : "mdi:square";

    case "motion":
    case "occupancy":
      return isOn
        ? "mdi:motion-sensor"
        : "mdi:motion-sensor-off";

    case "presence":
      return isOn
        ? "mdi:account"
        : "mdi:account-off";

    case "smoke":
      return isOn
        ? "mdi:smoke-detector-alert"
        : "mdi:smoke-detector";

    case "moisture":
      return isOn
        ? "mdi:water-alert"
        : "mdi:water-off";

    case "gas":
      return isOn
        ? "mdi:gas-cylinder"
        : "mdi:gas-cylinder-off";

    case "problem":
      return isOn
        ? "mdi:alert-circle"
        : "mdi:check-circle";

    case "power":
      return isOn
        ? "mdi:flash"
        : "mdi:flash-off";

    case "plug":
      return isOn
        ? "mdi:power-plug"
        : "mdi:power-plug-off";

    case "battery":
      return isOn
        ? "mdi:battery-alert"
        : "mdi:battery";

    case "connectivity":
      return isOn
        ? "mdi:wifi"
        : "mdi:wifi-off";

    case "lock":
      return isOn
        ? "mdi:lock-open"
        : "mdi:lock";

    case "light":
      return isOn
        ? "mdi:lightbulb-on"
        : "mdi:lightbulb-off";

    default:
      return isOn
        ? "mdi:check-circle"
        : "mdi:circle-outline";
  }
}

export function getDefaultDomainIcon(domain, stateObj = null) {
  const isOn = stateObj
    ? this._getEntityActiveState(stateObj)
    : false;

  switch (domain) {
    case "light":
      return isOn
        ? "mdi:lightbulb-on"
        : "mdi:lightbulb-off";

    case "switch":
      return stateObj?.attributes?.device_class === "outlet"
        ? isOn
          ? "mdi:power-plug"
          : "mdi:power-plug-off"
        : isOn
          ? "mdi:toggle-switch-variant"
          : "mdi:toggle-switch-variant-off";

    case "fan":
      return isOn
        ? "mdi:fan"
        : "mdi:fan-off";

    case "cover":
      return isOn
        ? "mdi:blinds-open"
        : "mdi:blinds";

    case "binary_sensor":
      return this._getBinarySensorIcon(stateObj);

    case "climate":
      return "mdi:thermostat";

    case "media_player":
      return "mdi:play-box-multiple";

    case "sensor":
      return "mdi:gauge";

    case "person":
      return "mdi:account";

    case "camera":
      return "mdi:cctv";

    case "vacuum":
      return "mdi:robot-vacuum";

    default:
      return "mdi:help-circle";
  }
}

export function isImageIcon(icon) {
  if (!icon) return false;

  const cleanIcon = icon.split("?")[0].toLowerCase();

  return (
    cleanIcon.endsWith(".svg") ||
    cleanIcon.endsWith(".png") ||
    cleanIcon.endsWith(".webp") ||
    cleanIcon.endsWith(".gif")
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

export function getInlineSvg(path) {
  if (!path) return "";

  const svgCache = this.constructor.svgCache;
  const cached = svgCache[path];

  if (
    typeof cached === "string" &&
    cached !== "loading"
  ) {
    return cached;
  }

  if (cached === "loading") {
    addSvgSubscriber(path, this);
    return "";
  }

  svgCache[path] = "loading";
  addSvgSubscriber(path, this);

  fetchInlineSvg(path)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      return response.text();
    })
    .then((svg) => {
      svg = svg
        .replace(
          /fill="(?!none)[^"]*"/gi,
          'fill="currentColor"'
        )
        .replace(
          /stroke="(?!none)[^"]*"/gi,
          'stroke="currentColor"'
        )
        .replace(/width="[^"]*"/gi, 'width="100%"')
        .replace(/height="[^"]*"/gi, 'height="100%"');

      svgCache[path] = svg;

      notifySvgSubscribers(path);
    })
    .catch((err) => {
      console.error("SVG load failed:", path, err);

      delete svgCache[path];

      notifySvgSubscribers(path);
    });

  return "";
}

const svgSubscribers = {};

function addSvgSubscriber(path, element) {
  if (!element) return;

  svgSubscribers[path] = svgSubscribers[path] || new Set();
  svgSubscribers[path].add(element);
}

function notifySvgSubscribers(path) {
  const subscribers = svgSubscribers[path];

  if (!subscribers) return;

  delete svgSubscribers[path];

  requestAnimationFrame(() => {
    subscribers.forEach((element) => {
      if (element.isConnected) {
        element.requestUpdate();
      }
    });
  });
}

function fetchInlineSvg(path) {
  return fetch(path)
    .then((response) => {
      if (response.ok) return response;

      return fetch(path, { cache: "reload" });
    });
}
