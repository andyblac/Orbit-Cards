// ==============================
// Orbit Cards bundle entry
// ==============================

import { ORBIT_CARDS_VERSION } from "./version.js";

console.info(
  `%c Orbit Cards %c v${ORBIT_CARDS_VERSION} `,
  "color: #ffffff; font-weight: 700; background: #6a6a6a; padding: 2px 8px; border-radius: 999px 0 0 999px;",
  "color: #ffffff; font-weight: 700; background: #d88989; padding: 2px 8px; border-radius: 0 999px 999px 0;"
);

import "./cards/area-card.js";
import "./cards/status-card.js";
import "./cards/action-card.js";
import "./cards/deck-card.js";
import "./badges/status-badge.js";
