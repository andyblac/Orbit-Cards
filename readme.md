# Orbit Room Card

A modern, highly configurable Home Assistant room card designed to provide a clean room overview with quick access to devices, scenes, sensors, and navigation.

# Installation

<details>

<summary>With HACS (Recommended)</summary>

<br>

This method allows you to get updates directly on the HACS main page

1. If HACS is not installed yet, download it following the instructions on [https://hacs.xyz/docs/setup/download/](https://hacs.xyz/docs/use/download/download/)
2. Proceed to the HACS initial configuration following the instructions on [https://hacs.xyz/docs/configuration/basic](https://hacs.xyz/docs/configuration/basic)
3. On your sidebar go to `HACS` > `Frontend`
3. Add this repository as a Custom Repository.
4. Click on the `+` button at the bottom right corner
5. Now search for `Orbit Room Card` and then click on the button at the bottom right corner to download it
6. Go back on your dashboard and click on the icon at the right top corner then on `Edit dashboard`
7. You can now click on `Add card` in the bottom right corner and search for `Orbit Room Card`

If it's not working, try to clear your browser cache.

</details>

---

<details>

<summary>Without HACS</summary>

<br>

1. Download this file: [orbit-room-card.js](https://raw.githubusercontent.com/andyblac/Orbit-Room-Card/main/dist/orbit-room-card.js)
2. Add this file to your `<config>/www/custom_cards` folder
3. On your dashboard click on the icon at the right top corner then on `Edit dashboard`
4. Click again on that icon and then click on `Manage resources`
5. Click on `Add resource`
6. Copy and paste this: `/local/custom_cards/orbit-room-card.js?v=1`
7. Click on `JavaScript Module` then `Create`
8. Go back and refresh your page
9. You can now click on `Add card` in the bottom right corner and search for `Bubble Card`
10. After any update of the file you will have to edit `/local/ustom_cards/bubble-card.js?v=1` and change the version to any higher number

If it's not working, just try to clear your browser cache.`

</details>

---

The card combines:

- Room overview
- Main room entity control
- Status sensors
- Side action buttons
- Curved action buttons
- Dynamic icon coloring
- Custom SVG support
- Area integration
- Navigation support
- Service calls
- State templates
- Visual editor support

---

## Features

### 🏠 Room Overview

Display a room name manually or automatically from a Home Assistant Area.

Features:

- Manual room name
- Area-based room naming
- Room navigation
- Dynamic room colors
- Custom icons
- SVG icon support

---

### 💡 Main Entity

Assign a primary room entity.

Examples:

- Light
- Fan
- Climate
- Media Player
- Switch

Supported actions:

- Toggle
- More Info
- Navigate
- Call Service

---

### 📊 Status Sensors

Display up to three status entities beneath the room title.

Examples:

- Temperature
- Humidity
- Occupancy
- Motion
- Window state
- Air Quality

Example:

```yaml
status1: sensor.living_room_temperature
status2: sensor.living_room_humidity
status3: sensor.living_room_air_quality
```

---

### 🔘 Side Buttons

Add up to four quick-access buttons.

Perfect for:

- Lamps
- Fans
- TVs
- Covers
- Switches

Features:

- Custom icons
- Custom colors
- SVG icons
- Tap actions
- State templates

---

### ⭕ Curve Buttons

Add up to six floating curved buttons around the card.

Perfect for:

- Scenes
- Scripts
- Automations
- Navigation
- Service Calls

Features:

- Custom icons
- Custom colors
- SVG support
- State templates
- Tap actions
- Position locking

---

## Color Options

### Theme Color

Uses your active Home Assistant theme color.

```yaml
room_color: theme
```

---

### Dashboard Colors

```yaml
room_color: blue
room_color: green
room_color: orange
room_color: purple
room_color: red
```

---

### Hex Colors

```yaml
room_color: "#ff7840"
```

---

### RGB Colors

```yaml
room_color: rgb(255,120,50)
```

---

### Dynamic Light Colors

When the main entity is a light:

```yaml
room_color: light
```

The card will automatically use the light's current color.

---

## Custom Icons

### Material Design Icons

```yaml
main_icon: mdi:sofa
```

---

### SVG Icons

```yaml
main_icon: /local/icons/lounge.svg
```

SVG icons can be used for:

- Main icon
- Side buttons
- Curve buttons

---

## Supported Actions

### Toggle

```yaml
tap_action:
  action: toggle
```

---

### More Info

```yaml
tap_action:
  action: more-info
```

---

### Navigate

```yaml
tap_action:
  action: navigate
  navigation_path: /lovelace/lounge
```

---

### Call Service

```yaml
tap_action:
  action: call-service
  service: scene.turn_on
  service_data:
    entity_id: scene.movie_time
```

---

### Popup

Open a Browser Mod popup from a tap or hold action.

Simple inline example:

```yaml
tap_action:
  action: popup
  popup_title: Security
  popup_content:
    type: tile
    entity: alarm_control_panel.house_alarm
```

Real-world inline example:

```yaml
tap_action:
  action: popup
  popup_title: Security
  popup_content:
    type: vertical-stack
    cards:
      - type: tile
        entity: alarm_control_panel.house_alarm
        vertical: true
  style: |
    --popup-min-width: 400px;
    --popup-max-width: 500px;
    --popup-border-radius: 20px;
  card_mod:
    style:
      ha-dialog$: |
        div.mdc-dialog__scrim {
          backdrop-filter: blur(4px) !important;
          -webkit-backdrop-filter: blur(5px) !important;
          background-color: rgba(0,0,0,0.1) !important;
        }

main_entity_tap_action:
  action: more-info

main_entity_hold_action:
  action: none
```

Add popup content inline in the card config.

The native Browser Mod `fire-dom-event` format is also supported:

```yaml
tap_action:
  action: fire-dom-event
  browser_mod:
    service: browser_mod.popup
    data:
      title: Security
      content:
        type: tile
        entity: alarm_control_panel.house_alarm
```

Full status card popup example:

```yaml
type: custom:orbit-status-card
main_entity: sensor.security_state
status_name: Security
icon: mdi:shield-home

tap_action:
  action: popup
  popup_title: Security
  popup_content:
    type: vertical-stack
    cards:
      - type: horizontal-stack
        cards:
          - type: tile
            entity: alarm_control_panel.house_alarm
            vertical: true
            features:
              - type: alarm-modes
                modes:
                  - armed_away
                  - disarmed
          - type: tile
            entity: alarm_control_panel.garage_alarm
            vertical: true
            features:
              - type: alarm-modes
                modes:
                  - armed_away
                  - disarmed
      - type: tile
        entity: cover.garage_roller_door
        vertical: true
        features:
          - type: cover-open-close
  style: |
    --popup-min-width: 400px;
    --popup-max-width: 500px;
    --popup-border-radius: 20px;
  card_mod:
    style:
      ha-dialog$: |
        div.mdc-dialog__scrim {
          backdrop-filter: blur(4px) !important;
          -webkit-backdrop-filter: blur(5px) !important;
          background-color: rgba(0,0,0,0.1) !important;
        }

main_entity_tap_action:
  action: more-info

main_entity_hold_action:
  action: none
```

## Status Card Modes

Status Card supports two modes.

### Standard

```yaml
type: custom:orbit-status-card
mode: standard
main_entity: sensor.heating_state
```

Standard mode shows the entity name and status text. The name comes from `status_name` when set, then the entity `friendly_name`. The status text comes from `label_template`, then the entity `label` attribute, then the entity state.

### Icon Only

```yaml
type: custom:orbit-status-card
mode: icon_only
main_entity: sensor.number_of_lights_on
```

Icon Only mode shows a square icon card with a numeric badge. The badge is hidden when the displayed number is `0`.

Both modes use:

```yaml
accent_on_color: amber
accent_off_color: theme
```

If the entity has a `color` attribute, it is used for the ON colour unless `accent_on_color` is set in the card config.

### Standard example

```yaml
type: custom:orbit-status-card
mode: standard
main_entity: sensor.heating_state
status_name: Heating
accent_on_color: red
accent_off_color: theme
main_entity_tap_action:
  action: more-info
tap_action:
  action: navigate
  navigation_path: /dashboard-heating/heating-control
```

### Icon Only example

```yaml
type: custom:orbit-status-card
mode: icon_only
main_entity: sensor.number_of_lights_on
accent_on_color: amber
accent_off_color: theme
tap_action:
  action: more-info
```

### Template example

```yaml
type: custom:orbit-status-card
mode: icon_only
main_entity: sensor.recycle_collection
state_template: "state_attr('sensor.recycle_collection', 'daysTo') | int < 2"
label_template: "state_attr('sensor.recycle_collection', 'daysTo')"
accent_on_color: green
accent_off_color: theme
```

### Config options

| Option | Description |
| --- | --- |
| `mode` | `standard` or `icon_only`. Defaults to `standard`. |
| `main_entity` | Required entity used for icon, status, name, state, actions, and attributes. |
| `status_name` | Standard mode only. Overrides the entity `friendly_name`. |
| `state_template` | Template used for ON/OFF detection. Numeric `0` is OFF, numeric values greater than `0` are ON. |
| `label_template` | Template used for displayed status text or Icon Only badge. |
| `accent_on_color` | ON colour override. If unset, the entity `color` attribute is used when available. |
| `accent_off_color` | OFF colour override. Defaults to `theme`. |
| `icon` | Main icon override. Falls back to entity `icon` attribute. |
| `icon_on` | Icon used when the status is ON. |
| `icon_off` | Icon used when the status is OFF. |
| `tap_action` | Card tap action. Defaults to `navigate` in Standard mode and `more-info` in Icon Only mode. |
| `main_entity_tap_action` | Main entity/icon tap action. Defaults to `more-info` in Standard mode. In Icon Only mode it falls back to `tap_action` when unset or `none`. |
| `main_entity_hold_action` | Main entity/icon hold action. Defaults to `none`. |

---

### Bubble Card popups

Bubble Card popups are opened by navigating to a hash. Add the Bubble popup card somewhere on the same dashboard view, then open it from Orbit with a normal `navigate` action.

Bubble popup card:

```yaml
type: custom:bubble-card
card_type: pop-up
hash: '#security'
name: Security
icon: mdi:shield-home
cards:
  - type: horizontal-stack
    cards:
      - type: tile
        entity: alarm_control_panel.house_alarm
        vertical: true
        features:
          - type: alarm-modes
            modes:
              - armed_away
              - disarmed
      - type: tile
        entity: alarm_control_panel.garage_alarm
        vertical: true
        features:
          - type: alarm-modes
            modes:
              - armed_away
              - disarmed

  - type: custom:advanced-camera-card
    cameras:
      - camera_entity: camera.back_door_video_doorbell_clear
      - camera_entity: camera.front_door_video_doorbell_clear

  - type: tile
    entity: cover.garage_roller_door
    vertical: true
    features:
      - type: cover-open-close

  - type: horizontal-stack
    cards:
      - type: tile
        entity: binary_sensor.garage_door_contact_sensor
        name: Garage Door
        vertical: true
        color: red
      - type: tile
        entity: binary_sensor.back_door_contact_sensor
        name: Back Door
        vertical: true
        color: red
      - type: tile
        entity: binary_sensor.front_door_contact_sensor
        name: Front Door
        vertical: true
        color: red
```

Open it from Orbit:

```yaml
main_entity_hold_action:
  action: navigate
  navigation_path: '#security'
```

The `hash` and `navigation_path` values must match exactly.

---

## State Templates

Status Card can use `state_template` for ON/OFF detection and `label_template` for the displayed status value.

```yaml
type: custom:orbit-status-card
main_entity: sensor.recycle_collection
state_template: "state_attr('sensor.recycle_collection', 'daysTo') | int < 2"
label_template: "state_attr('sensor.recycle_collection', 'daysTo')"
```

Buttons can use custom JavaScript templates to determine their active state.

Example:

```yaml
button1_state_template: |
  return states["sensor.house_mode"].state === "Home";
```

Useful for:

- Sensor conditions
- Multiple entity states
- Complex logic
- Virtual button states

---

# Basic Example

```yaml
type: custom:orbit-room-card

area: living_room

room_color: blue

status1: sensor.living_room_temperature
status2: sensor.living_room_humidity
status3: binary_sensor.living_room_motion

button1: light.floor_lamp
```

---

# Full Example

```yaml
type: custom:orbit-room-card

room_name: Living Room
area: living_room

room_color: theme
status_color: green

main_entity: light.living_room

main_icon: mdi:sofa
main_icon_on: mdi:lightbulb-on
main_icon_off: mdi:lightbulb

main_entity_tap_action:
  action: more-info

main_entity_hold_action:
  action: none

navigate:
  navigation_path: /lovelace/living-room

status1: sensor.living_room_temperature
status2: sensor.living_room_humidity
status3: binary_sensor.living_room_motion

button1: light.floor_lamp
button1_icon: mdi:floor-lamp
button1_on_color: amber
button1_off_color: theme
button1_tap_action:
  action: toggle

button2: fan.living_room
button2_icon: mdi:fan
button2_tap_action:
  action: toggle

button3: media_player.living_room_tv
button3_icon: mdi:television
button3_tap_action:
  action: more-info

button4: cover.living_room_blinds
button4_icon: mdi:blinds
button4_tap_action:
  action: more-info

curve_buttons_lock_position: true

curve_button1: scene.movie_time
curve_button1_icon: mdi:movie-open
curve_button1_tap_action:
  action: call-service
  service: scene.turn_on
  service_data:
    entity_id: scene.movie_time

curve_button2: scene.relax
curve_button2_icon: mdi:sofa

curve_button3: script.goodnight
curve_button3_icon: mdi:weather-night

curve_button4: automation.house_away
curve_button4_icon: mdi:shield-home

curve_button5: light.garden
curve_button5_icon: mdi:tree

curve_button6: switch.fountain
curve_button6_icon: mdi:fountain
```

---


# Visual Editor

The card includes a built-in editor with collapsible sections for:

- Room Settings
- Main Entity
- Status Sensors
- Side Buttons
- Curve Buttons
- Icons
- Colors
- Actions
- State Templates

Most configurations can be completed without writing YAML.

---

# Compatibility

Tested with:

- Home Assistant 2025+
- Lovelace Dashboard
- HACS

---

# Roadmap

Planned features:

- Additional animations
- Per-button badge indicators
- Enhanced theme integration
- Additional dynamic templates

---

# Credits

Created by AndyBlac.

Built for Home Assistant users who prefer a room-centric dashboard experience with modern styling and fast access to devices and scenes.

---

## Support

If you find a bug or have a feature request, please open an issue on GitHub.

Contributions and feedback are always welcome.
