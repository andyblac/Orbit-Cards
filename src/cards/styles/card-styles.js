import { RoomCardStyles } from "./styles.js";
import { RoomCardHeaderStyles } from "./header.js";

import { CurveButtonStyles } from "./curve-buttons/button.js";
import { CurveButtonContainerStyles } from "./curve-buttons/container.js";
import { CurveButtonIconStyles } from "./curve-buttons/icon.js";
import { CurveButtonPositionStyles } from "./curve-buttons/position.js";

import { EntityButtonStyles } from "./entity-buttons/button.js";
import { EntityButtonLayoutStyles } from "./entity-buttons/layout.js";

import { MainIconStyles } from "./main-icon/icon.js";
import { MainIconCircleStyles } from "./main-icon/circle.js";


export const cardStyles = [
  MainIconCircleStyles,
  MainIconStyles,
];

export const room_cardStyles = [
  RoomCardStyles,
  RoomCardHeaderStyles,
  EntityButtonStyles,
  EntityButtonLayoutStyles,
  CurveButtonStyles,
  CurveButtonContainerStyles,
  CurveButtonIconStyles,
  CurveButtonPositionStyles,
  cardStyles,
];