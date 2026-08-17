import fan from "./fan.svg?raw";
import garageDoorClosed from "./garage-door_closed.svg?raw";
import garageDoorOpen from "./garage-door_open.svg?raw";
import motionDetected from "./motion_detected.svg?raw";
import motionOff from "./motion_off.svg?raw";
import motionOn from "./motion_on.svg?raw";
import showerOff from "./shower_off.svg?raw";
import showerOn from "./shower_on.svg?raw";
import shutterClosing from "./shutter-closing.svg?raw";
import shutterOpening from "./shutter-opening.svg?raw";
import washingMachineRunning from "./washing-machine-running.svg?raw";
import manifest from "./manifest.json";

export const orbitIconManifest = manifest;

export const orbitIconSvgs = Object.freeze({
  "fan.svg": fan,
  "garage-door_closed.svg": garageDoorClosed,
  "garage-door_open.svg": garageDoorOpen,
  "motion_detected.svg": motionDetected,
  "motion_off.svg": motionOff,
  "motion_on.svg": motionOn,
  "shower_off.svg": showerOff,
  "shower_on.svg": showerOn,
  "shutter-closing.svg": shutterClosing,
  "shutter-opening.svg": shutterOpening,
  "washing-machine-running.svg": washingMachineRunning,
});

export function getBundledOrbitSvg(path) {
  if (!path?.startsWith("orbit:")) return "";

  const file = decodeURIComponent(path.slice(6).split("?")[0]);

  return orbitIconSvgs[file] || "";
}
