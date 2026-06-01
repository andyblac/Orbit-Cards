export function evaluateStateTemplate(template, entityId) {
  if (!template || !this.hass) return null;

  let processedTemplate = template;

  try {
    processedTemplate = template
      .replace(/\|\s*float\b/g, "")
      .replace(/\|\s*int\b/g, "")
      .replace(/\|\s*lower\b/g, ".toLowerCase()")
      .replace(/\|\s*upper\b/g, ".toUpperCase()");

    const states = (id) =>
      this.hass.states[id]?.state ?? "";

    const state_attr = (id, attr) =>
      this.hass.states[id]?.attributes?.[attr];

    const is_state = (id, value) =>
      this.hass.states[id]?.state === value;

    const is_state_attr = (id, attr, value) =>
      this.hass.states[id]?.attributes?.[attr] === value;

    const stateObj = (id) =>
      this.hass.states[id] ?? null;

    const float = (value) =>
      parseFloat(value) || 0;

    const int = (value) =>
      parseInt(value, 10) || 0;

    const bool = (value) => {
      if (typeof value === "boolean") return value;

      return [
        "on",
        "true",
        "yes",
        "home",
        "open",
        "locked"
      ].includes(String(value).toLowerCase());
    };

    const fn = new Function(
      "states",
      "state_attr",
      "is_state",
      "is_state_attr",
      "stateObj",
      "entity",
      "float",
      "int",
      "bool",
      `
      return (${processedTemplate});
      `
    );

    return fn(
      states,
      state_attr,
      is_state,
      is_state_attr,
      stateObj,
      this.hass.states[entityId],
      float,
      int,
      bool
    );
  } catch (err) {
    console.error(
      "State template error:",
      err,
      {
        template,
        processedTemplate,
        entityId
      }
    );

    return null;
  }
}
