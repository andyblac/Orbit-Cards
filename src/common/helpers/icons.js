import { getBundledOrbitSvg } from "../../icons/bundled.js";

export function getMainIconColor(stateObj, isOn) {
  const accentColor = this._config.accent_color || "theme";

  if (!isOn) {
    return this._computeIconColor(accentColor);
  }

  if (accentColor === "light") {
    return (
      this._getEntityColor(stateObj) ||
      this._computeFullColor("theme")
    );
  }

  return this._computeFullColor(accentColor);
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

  if (iconPath.startsWith("orbit:")) {
    return iconPath;
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

export function getInlineSvg(path, options = {}) {
  if (!path) return "";

  const forceColor = options.forceColor !== false;
  const animate = options.animate === true;
  const cacheKey = [
    path,
    forceColor ? "forced" : "auto",
    animate ? "animated" : "static",
  ].join("::");
  const svgCache = this.constructor.svgCache;
  const cached = svgCache[cacheKey];

  if (
    typeof cached === "string" &&
    cached !== "loading"
  ) {
    return cached;
  }

  if (cached === "loading") {
    addSvgSubscriber(cacheKey, this);
    return "";
  }

  const bundledSvg = getBundledOrbitSvg(path);

  if (bundledSvg) {
    const svg = prepareInlineSvg(bundledSvg, forceColor, animate);
    svgCache[cacheKey] = svg;
    return svg;
  }

  svgCache[cacheKey] = "loading";
  addSvgSubscriber(cacheKey, this);

  fetchInlineSvg(path)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      return response.text();
    })
    .then((svg) => {
      svg = prepareInlineSvg(svg, forceColor, animate);

      svgCache[cacheKey] = svg;

      notifySvgSubscribers(cacheKey);
    })
    .catch((err) => {
      console.error("SVG load failed:", path, err);

      delete svgCache[cacheKey];

      notifySvgSubscribers(cacheKey);
    });

  return "";
}

export function getSvgColorOverride(config, iconKey) {
  if (!config || !iconKey) return true;

  return config[`${iconKey}_svg_color_override`] !== false;
}

function prepareInlineSvg(svg, forceColor, animate = false) {
  let prepared = svg.replace(
    /<svg\b[^>]*>/i,
    (openingTag) => {
      let preparedTag = openingTag
        .replace(/\swidth="[^"]*"/i, ' width="100%"')
        .replace(/\sheight="[^"]*"/i, ' height="100%"');

      if (animate) {
        preparedTag = preparedTag.replace(
          /^<svg\b/i,
          '<svg data-orbit-animate="true"'
        );
      }

      return preparedTag;
    }
  );

  if (!forceColor) {
    return prepared;
  }

  return prepared
    .replace(
      /fill="(?!none|transparent|currentColor|inherit|initial|unset|url\()[^"]*"/gi,
      'fill="currentColor"'
    )
    .replace(
      /stroke="(?!none|transparent|currentColor|inherit|initial|unset|url\()[^"]*"/gi,
      'stroke="currentColor"'
    )
    .replace(
      /fill:\s*(?!none|transparent|currentColor|inherit|initial|unset|url\()[^;"]+/gi,
      "fill:currentColor"
    )
    .replace(
      /stroke:\s*(?!none|transparent|currentColor|inherit|initial|unset|url\()[^;"]+/gi,
      "stroke:currentColor"
    );
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
  return fetch(path).then((response) => {
    if (response.ok) return response;

    return fetch(path, { cache: "reload" });
  });
}
