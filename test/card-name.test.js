import test from "node:test";
import assert from "node:assert/strict";

import {
  formatCardNameValue,
  getCardName,
} from "../src/common/helpers/card-name.js";

test("composed card names resolve Home Assistant context", () => {
  const hass = {
    areas: {
      study: { name: "Study", floor_id: "upstairs" },
    },
    floors: {
      upstairs: { name: "Upstairs" },
    },
  };
  const config = { area: "study" };

  assert.equal(formatCardNameValue([
    { type: "floor" },
    { type: "area" },
    { type: "text", text: "Lights" },
  ], config, hass), "Upstairs Study Lights");
});

test("empty composed names retain their configured fallback", () => {
  assert.equal(formatCardNameValue([], {}, {}, "Card"), "Card");
  assert.equal(getCardName({ area_name: [] }, {}, "Area"), "Area");
});
