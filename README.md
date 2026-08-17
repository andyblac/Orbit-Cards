# Orbit Cards

![Downloads](https://img.shields.io/github/downloads/Andyblac/Orbit-Cards/total?color=41BDF5&logo=home-assistant&label=Downloads&suffix=%20downloads)
![hacs_badge](https://img.shields.io/badge/HACS-Default-41BDF5)
[![GitHub Release](https://img.shields.io/github/release/Andyblac/Orbit-Cards.svg)](https://github.com/Andyblac/Orbit-Cards/releases)
[![License](https://img.shields.io/github/license/Andyblac/Orbit-Cards.svg)](LICENSE)
![Home Assistant](https://img.shields.io/badge/Home%20Assistant-2025.6.0%2B-blue.svg)
![Maintenance](https://img.shields.io/maintenance/yes/2026.svg)
[![GitHub Stars](https://img.shields.io/github/stars/Andyblac/Orbit-Cards?style=social)](https://github.com/Andyblac/Orbit-Cards)
[![GitHub Issues](https://img.shields.io/github/issues/Andyblac/Orbit-Cards?style=flat-square)](https://github.com/Andyblac/Orbit-Cards/issues)

Orbit Cards is a collection of modern Home Assistant dashboard cards with a shared visual style, shared editor controls, and support for custom icons, dynamic colours, popups, navigation, and compact grouped layouts.

It also includes the `custom:orbit-status-badge`, which counts active entities of a selected domain in an area.

Orbit Cards is available directly from the default HACS repository. Search for `Orbit Cards` in HACS to install it.

---

## Cards

<table>
  <tr>
    <td width="50%" valign="top" align="center">
      <h3>Area Card</h3>
      <p><code>custom:orbit-area-card</code></p>
      <img src="https://raw.githubusercontent.com/andyblac/Orbit-Cards/master/images/area-card-light.png" alt="Orbit Area Card" width="300">
      <p align="left">An area overview with status text, a main entity, side buttons, curved quick actions, and navigation.</p>
    </td>
    <td width="50%" valign="top" align="center">
      <h3>Status Card</h3>
      <p><code>custom:orbit-status-card</code></p>
      <img src="https://raw.githubusercontent.com/andyblac/Orbit-Cards/master/images/status-card-modes-light.png" alt="Orbit Status Card modes" width="380">
      <p align="left">Visual entity summaries in Standard, Person, Icon only, and compact grouped Icon only modes.</p>
    </td>
  </tr>
  <tr>
    <td width="50%" valign="top" align="center">
      <h3>Action Card</h3>
      <p><code>custom:orbit-action-card</code></p>
      <img src="https://raw.githubusercontent.com/andyblac/Orbit-Cards/master/images/action-card-grouped-light.png" alt="Orbit Action Card group" width="380">
      <p align="left">Compact controls for scenes, scripts, automations, buttons, cameras, and grouped shortcuts.</p>
    </td>
    <td width="50%" valign="top" align="center">
      <h3>Deck Card</h3>
      <p><code>custom:orbit-deck-card</code></p>
      <p><strong>Wrap</strong></p>
      <img src="https://raw.githubusercontent.com/andyblac/Orbit-Cards/master/images/deck-card-wrap-light.png" alt="Orbit Deck Card wrap layout" width="420">
      <p><strong>Tabs</strong></p>
      <img src="https://raw.githubusercontent.com/andyblac/Orbit-Cards/master/images/deck-card-tabs-home-light.png" alt="Orbit Deck Card tabs layout" width="360">
      <p align="left">A generic container that wraps Lovelace cards into rows, switches between them with tabs, or places compact cards over a main card.</p>
    </td>
  </tr>
</table>

## Features

- Built-in visual editors for all cards.
- Tabbed editor sections with grouped controls for area/card settings, status fields, buttons, curved buttons, and action buttons.
- Shared colour handling across cards.
- Named colours, theme colours, hex colours, `rgb()`, `hsl()`, and light colour support where supported.
- Colour preview swatches with a native colour picker and selectable theme colour previews.
- Material Design Icons and local SVG/image icons.
- Tap, hold, navigation, service, popup, and Browser Mod actions.
- Dynamic entity state updates scoped to only the entities used by each card.
- Native Home Assistant Jinja rendering shared by every Orbit component that
  supports templates.
- Grouped compact layouts for Status Icon only and Action Card.
- Deck Card layouts for wrapping Lovelace cards into rows, showing them as tabs, or overlaying compact controls on a main card.
- Entity-compatible status badges plus area/domain active counts, live Home
  Assistant Jinja templates, native state content, basic/on/off custom icons,
  and separate active/inactive colours.

## Status Badge

The Orbit Status Badge can be used anywhere Home Assistant accepts badges. Entity is the default state type, so a native Entity badge can be converted by changing only its type:

```yaml
type: custom:orbit-status-badge
entity: binary_sensor.front_door_contact_sensor
```

Native Entity badge options such as `entity`, `name`, `icon`, `color`,
`show_name`, `show_state`, `show_icon`, `show_entity_picture`,
`state_content`, `time_format`, and tap/hold/double-tap actions are supported.
Set Mode to Card (`display_style: card`) for a circular, icon-only badge suited
to card overlays such as an Orbit Deck Card. Set its
background with `card_color`. In Card mode, State type controls visibility:
Always, Entity state, or Template. Template visibility uses `active_template`
and shows the badge when that template renders a truthy result.

Area Count is the Orbit-specific state type and can also be used inside a Heading card:

```yaml
type: heading
heading: Room Trends
icon: mdi:chart-line
badges:
  - type: custom:orbit-status-badge
    state_source: area_count
    area: landing
    domain: light
```

Area Count counts active entities in the selected area and domain. The
`state_source: area_count` setting can be supplied explicitly and is inferred
when an area or domain is configured without an entity. A device-class filter is offered when Home Assistant reports
device classes for that domain, allowing
semantic types such as sockets and motion sensors to be counted separately:

```yaml
# Sockets
domain: switch
device_class: outlet

# Motion sensors
domain: binary_sensor
device_class: motion
```

Lights use `domain: light` without a device-class filter. Both Orbit colour pickers are pre-populated with the shared `State colour (default)` palette option; inside the badge, that option resolves from the representative entity's domain, device class, and exact state, followed by Home Assistant's domain and global active/inactive fallbacks. The editor also provides basic, active, and inactive custom icons.

Template is the third state type and accepts any Home Assistant Jinja template.
The rendered value updates automatically when an entity referenced by the
template changes:

```yaml
type: custom:orbit-status-badge
state_source: template
name: Net power
state_template: >-
  {{ (states('sensor.consumer_unit_power') | float(0)
      - states('sensor.boiler_power') | float(0)) | round(2) }} kW
active_template: >-
  {{ (states('sensor.consumer_unit_power') | float(0)
      - states('sensor.boiler_power') | float(0)) > 50 }}
name_template: >-
  {{ 'High usage' if states('sensor.consumer_unit_power') | float(0) > 50
     else 'Net power' }}
```

The display template controls the badge text. The optional active template
independently controls the badge colour and active/inactive icon selection.
When no active template is configured, rendered numeric zero and common off
values are treated as inactive; non-zero numbers and other rendered values are
treated as active.

For the Template state type, the optional name template supplies a rendered
Template name source that can be selected and combined in the composed Name
picker. The source remains visible as `Not configured` until a template is set.

Area Card button state templates and Status Card state/label templates use the
same native Home Assistant renderer. Legacy bare expressions are migrated
automatically when their card is loaded in the visual editor. For example:

```yaml
# Legacy
state_template: state_attr('fan.wetroom_extractor_fan', 'percentage') | int > 50

# Migrated native Home Assistant template
state_template: >-
  {{ state_attr('fan.wetroom_extractor_fan', 'percentage') | int > 50 }}
```

Existing templates that already contain Jinja delimiters are left unchanged.

## Installation

### HACS

1. Open HACS in Home Assistant.

2. Search for `Orbit Cards`.

3. Select `Orbit Cards`, then choose `Download`.

4. Refresh Home Assistant when the download is complete.

5. Add one of the Orbit cards from the dashboard card picker.

### Manual

1. Download `dist/orbit-cards.js` from the repository.

2. Copy it to:
   
   ```text
   /config/www/orbit-cards.js
   ```

3. Optional: to use bundled `orbit:` icons with a manual install, copy
   `dist/manifest.json` and the `dist/*.svg` files beside `orbit-cards.js` in:
   
   ```text
   /config/www
   ```

4. In Home Assistant, go to `Settings` -> `Dashboards` -> `Resources`.

5. Add this resource:
   
   ```text
   /local/orbit-cards.js
   ```

6. Set the resource type to `JavaScript module`.

7. Refresh Home Assistant.

## Updating

After updating the JavaScript file, refresh the browser or reload Home Assistant frontend resources. Some browsers and Home Assistant apps cache frontend resources aggressively, so a hard refresh may be needed after manual updates.

## Compatibility

- Home Assistant Lovelace dashboards.
- Home Assistant 2025.6.0 and newer recommended.
- Available from the default HACS repository, with manual resource installation as a fallback.
- Browser Mod is required only for Browser Mod popup actions.
- Bubble Card is required only for Bubble Card hash popups.
- `custom:orbit-room-card` remains registered as a legacy alias for `custom:orbit-area-card`.
- `room_name` remains supported as a legacy alias for `area_name`.
- Legacy Area Card configs are migrated when the editor opens: `custom:orbit-room-card` is rewritten to `custom:orbit-area-card`, and `room_name` is rewritten to `area_name`.

## Support

For bugs, feature requests, and releases, use the GitHub repository:
[andyblac/Orbit-Cards](https://github.com/andyblac/Orbit-Cards)

A WiKi guide is available:
[Here](https://github.com/andyblac/Orbit-Cards/wiki)
## Credits

Created by AndyBlac.
