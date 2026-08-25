# Orbit Cards

![Downloads](https://img.shields.io/github/downloads/Andyblac/Orbit-Cards/total?color=41BDF5&logo=home-assistant&label=Downloads&suffix=%20downloads)
![hacs_badge](https://img.shields.io/badge/HACS-Default-41BDF5)
[![GitHub Release](https://img.shields.io/github/release/Andyblac/Orbit-Cards.svg)](https://github.com/Andyblac/Orbit-Cards/releases)
[![License](https://img.shields.io/github/license/Andyblac/Orbit-Cards.svg)](LICENSE)
![Home Assistant](https://img.shields.io/badge/Home%20Assistant-2025.6.0%2B-blue.svg)
![Maintenance](https://img.shields.io/maintenance/yes/2026.svg)
[![GitHub Stars](https://img.shields.io/github/stars/Andyblac/Orbit-Cards?style=social)](https://github.com/Andyblac/Orbit-Cards)
[![GitHub Issues](https://img.shields.io/github/issues/Andyblac/Orbit-Cards?style=flat-square)](https://github.com/Andyblac/Orbit-Cards/issues)

Orbit Cards is a collection of modern Home Assistant dashboard cards and badges. Every component shares the same visual language and editor experience, with flexible layouts, dynamic colours, custom icons, templates, and configurable interactions.

Install Orbit Cards directly from the default HACS repository, then configure its cards and badges from Home Assistant's dashboard editor.

**[Documentation](https://github.com/Andyblac/Orbit-Cards/wiki)** · **[Installation guide](https://github.com/Andyblac/Orbit-Cards/wiki/Installation)** · **[Examples](https://github.com/Andyblac/Orbit-Cards/wiki/Examples)** · **[Screenshots](https://github.com/Andyblac/Orbit-Cards/wiki/Screenshots)**

---

## Cards and badges

<table>
  <tr>
    <td width="50%" valign="top" align="center">
      <h3>Area Card</h3>
      <p><code>custom:orbit-area-card</code></p>
      <img src="https://raw.githubusercontent.com/andyblac/Orbit-Cards/master/images/area-card-light.png" alt="Orbit Area Card" width="300">
      <p align="left">An area overview with status text, a main entity, side buttons, curved quick actions, and navigation.</p>
      <p><a href="https://github.com/Andyblac/Orbit-Cards/wiki/Area-Card">Area Card guide</a></p>
    </td>
    <td width="50%" valign="top" align="center">
      <h3>Status Card</h3>
      <p><code>custom:orbit-status-card</code></p>
      <img src="https://raw.githubusercontent.com/andyblac/Orbit-Cards/master/images/status-card-modes-light.png" alt="Orbit Status Card modes" width="380">
      <p align="left">Visual entity summaries in Standard, Person, Icon only, and compact grouped Icon only modes.</p>
      <p><a href="https://github.com/Andyblac/Orbit-Cards/wiki/Status-Card">Status Card guide</a></p>
    </td>
  </tr>
  <tr>
    <td width="50%" valign="top" align="center">
      <h3>Action Card</h3>
      <p><code>custom:orbit-action-card</code></p>
      <img src="https://raw.githubusercontent.com/andyblac/Orbit-Cards/master/images/action-card-grouped-light.png" alt="Orbit Action Card group" width="380">
      <p align="left">Compact controls for scenes, scripts, automations, buttons, cameras, and grouped shortcuts.</p>
      <p><a href="https://github.com/Andyblac/Orbit-Cards/wiki/Action-Card">Action Card guide</a></p>
    </td>
    <td width="50%" valign="top" align="center">
      <h3>Deck Card</h3>
      <p><code>custom:orbit-deck-card</code></p>
      <p><strong>Wrap</strong></p>
      <img src="https://raw.githubusercontent.com/andyblac/Orbit-Cards/master/images/deck-card-wrap-light.png" alt="Orbit Deck Card wrap layout" width="420">
      <p><strong>Tabs</strong></p>
      <img src="https://raw.githubusercontent.com/andyblac/Orbit-Cards/master/images/deck-card-tabs-home-light.png" alt="Orbit Deck Card tabs layout" width="360">
      <p align="left">A generic container that wraps Lovelace cards into rows, switches between them with tabs, or places compact cards over a main card.</p>
      <p><a href="https://github.com/Andyblac/Orbit-Cards/wiki/Deck-Card">Deck Card guide</a></p>
    </td>
  </tr>
  <tr>
    <td width="50%" valign="top" align="center">
      <h3>Status Badge</h3>
      <p><code>custom:orbit-status-badge</code></p>
      <p><strong>Badge</strong></p>
      <img src="https://raw.githubusercontent.com/andyblac/Orbit-Cards/master/images/status-badge-badge-light.png" alt="Orbit Status Badge using the Home Assistant Badge type" width="500">
      <p><strong>Heading badge</strong></p>
      <img src="https://raw.githubusercontent.com/andyblac/Orbit-Cards/master/images/status-badge-heading-badge-light.png" alt="Orbit Status Badge using the Home Assistant Heading badge type" width="500">
      <p><strong>Active entities</strong></p>
      <img src="https://raw.githubusercontent.com/andyblac/Orbit-Cards/master/images/status-badge-active-entities-light.png" alt="Orbit Status Badge active entities dialog" width="360">
      <p align="left">Flexible entity, area-count, and template-driven status indicators for Home Assistant badge rows and card layouts.</p>
      <p><a href="https://github.com/Andyblac/Orbit-Cards/wiki/Status-Badge">Status Badge guide</a></p>
    </td>
    <td width="50%"></td>
  </tr>
</table>

## Features

- Built-in visual editors with grouped, Home Assistant-style controls.
- Shared colour handling with theme colours, named colours, CSS colour values, preview swatches, and light-derived colours where supported.
- Material Design Icons, bundled `orbit:` icons, local SVG/image icons, and configurable active and inactive icon states.
- Tap, hold, and double-tap interactions with more-info, navigation, service calls, popups, and optional Browser Mod and Bubble Card integrations.
- Native Home Assistant Jinja rendering and live entity updates for components that support templates.
- Compact grouped layouts for Status and Action cards, plus Deck Card Wrap, Tabs, and Overlay layouts for any Lovelace card.
- Deck Card child visibility, automatic layout reflow, transparent backgrounds, and per-item padding controls.
- Unavailable-entity indicators across Area, Status, and Action cards.
- Translations for English, British English, German, Spanish, French, Italian, Dutch, and Brazilian Portuguese.

Full configuration references and YAML examples are available in the **[Wiki](https://github.com/Andyblac/Orbit-Cards/wiki)**.

## Installation

### HACS

1. Open HACS in Home Assistant.
2. Search for `Orbit Cards`.
3. Select `Orbit Cards`, then choose `Download`.
4. Refresh Home Assistant when the download is complete.
5. Add an Orbit card or badge from the appropriate dashboard picker.

### Manual

1. Download `orbit-cards.js` from the latest release.
2. Copy it to:

   ```text
   /config/www/orbit-cards.js
   ```

3. Optional: to use bundled `orbit:` icons, copy `manifest.json` and the bundled `.svg` files beside `orbit-cards.js` in:

   ```text
   /config/www
   ```

4. In Home Assistant, go to `Settings` → `Dashboards` → `Resources`.
5. Add this resource:

   ```text
   /local/orbit-cards.js
   ```

6. Set the resource type to `JavaScript module`.
7. Refresh Home Assistant.

See the **[installation guide](https://github.com/Andyblac/Orbit-Cards/wiki/Installation)** for more information.

## Updating

After updating, refresh the browser or reload Home Assistant frontend resources. Some browsers and Home Assistant apps cache frontend modules aggressively, so a hard refresh may be needed before changes appear.

## Compatibility

- Home Assistant Lovelace dashboards running Home Assistant 2025.6.0 or newer.
- Available from the default HACS repository, with manual resource installation as a fallback.
- Browser Mod is required only for Browser Mod popup actions.
- Bubble Card is required only for Bubble Card hash popups.
- `custom:orbit-room-card` remains registered as a legacy alias for `custom:orbit-area-card`.
- `room_name` remains supported as a legacy alias for `area_name`.
- Legacy Area Card configs are migrated when the editor opens: `custom:orbit-room-card` is rewritten to `custom:orbit-area-card`, and `room_name` is rewritten to `area_name`.

See the **[migration guide](https://github.com/Andyblac/Orbit-Cards/wiki/Migration-Guide)** for legacy configuration details.

## Support

- Read the **[Wiki](https://github.com/Andyblac/Orbit-Cards/wiki)** for configuration guides and examples.
- Check **[Troubleshooting](https://github.com/Andyblac/Orbit-Cards/wiki/Troubleshooting)** for common setup and caching problems.
- Use **[GitHub Issues](https://github.com/Andyblac/Orbit-Cards/issues)** for bugs and feature requests.
- See **[GitHub Releases](https://github.com/Andyblac/Orbit-Cards/releases)** for downloads and release notes.

## Credits

Created by AndyBlac and released under the [MIT License](LICENSE).
