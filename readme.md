# Orbit Room Card

A modern, highly configurable Home Assistant room card designed to provide a clean room overview with quick access to devices, scenes, sensors, and navigation.

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

## State Templates

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

tap_action:
  action: more-info

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

# Installation

## HACS (Recommended)

1. Open HACS.
2. Add this repository as a Custom Repository.
3. Install the card.
4. Refresh Home Assistant.

Add the resource:

```yaml
url: /hacsfiles/orbit-room-card/orbit-room-card.js
type: module
```

---

## Manual Installation

1. Download `orbit-room-card.js`
2. Download `orbit-room-card-editor.js`
3. Copy them to:

```text
/config/www/orbit-room-card
```

3. Add the resource:

```yaml
url: /local/orbit-room-card/orbit-room-card-editor.js
type: module
```

4. Refresh Home Assistant.

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

# Credits

Created by AndyBlac.

Built for Home Assistant users who prefer a room-centric dashboard experience with modern styling and fast access to devices and scenes.

---

## Support

If you find a bug or have a feature request, please open an issue on GitHub.

Contributions and feedback are always welcome.