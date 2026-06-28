import { CardHeaderStyles } from "../../../common/styles/header.js";
import { CardShellStyles } from "../../../common/styles/card-shell.js";
import { MainIconStyles } from "../../../common/styles/main-icon.js";

import { AreaCardHeaderStyles } from "./header.js";
import { AreaCardLayoutStyles } from "./layout.js";

import { CurveButtonStyles } from "./curve-buttons/button.js";
import { CurveButtonContainerStyles } from "./curve-buttons/container.js";
import { CurveButtonIconStyles } from "./curve-buttons/icon.js";
import { CurveButtonPositionStyles } from "./curve-buttons/position.js";

import { EntityButtonStyles } from "./entity-buttons/button.js";
import { EntityButtonLayoutStyles } from "./entity-buttons/layout.js";

import { MainIconCircleStyles } from "./main-icon/circle.js";

export const areaCardStyles = [
  CardShellStyles,
  CardHeaderStyles,
  MainIconStyles,
  AreaCardLayoutStyles,
  AreaCardHeaderStyles,
  MainIconCircleStyles,
  EntityButtonStyles,
  EntityButtonLayoutStyles,
  CurveButtonStyles,
  CurveButtonContainerStyles,
  CurveButtonIconStyles,
  CurveButtonPositionStyles,
];
