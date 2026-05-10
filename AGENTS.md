# Style

A themeable HTML/CSS style system with support for dark and light variants per theme.

## Files

| File | Purpose |
|---|---|
| `core.css` | All component styles. References `--theme-*` variables only — no colours or fonts hardcoded. |
| `themes.json` | Manifest listing available themes for the in-page picker |
| `index.html` | Demo page showing all supported elements |
| `scripts.js` | Theme picker, dark/light toggle, popup logic |

## Adding a Theme

1. **Create two CSS files** — `{id}-dark.css` and `{id}-light.css`.

   - `{id}-dark.css` defines everything on `:root`: font loading, font palette, colour primitives, and the dark semantic `--theme-*` mappings.
   - `{id}-light.css` defines only the light overrides on `[data-theme="light"]`, referencing primitives already declared in the dark file.

2. **Define the full `--theme-*` contract** in your dark file. All variables used by `core.css` must be present:

   ```
   --theme-bg / --theme-fg / --theme-border / --theme-accent / --theme-muted / --theme-focus-ring
   --theme-section-bg / -fg / -border / -heading-fg
   --theme-item-bg / -fg / -border / -hover-bg / -meta-fg
   --theme-btn-bg / -fg / -border / -hover-bg
   --theme-btn-primary-bg / -fg / -border / -hover
   --theme-btn-danger-bg / -fg / -hover
   --theme-input-bg / -fg / -border / -focus-border / -placeholder
   --theme-popup-bg / -fg / -border / -overlay
   --theme-badge-jedi-bg / -fg / -border
   --theme-badge-sith-bg / -fg / -border
   --theme-badge-alive-bg / -fg / -border
   --theme-badge-fallen-bg / -fg / -border
   --theme-font-display / -body / -ui / -btn / -badge
   --theme-btn-text-transform
   ```

3. **Register the theme** in `themes.json`:

   ```json
   { "id": "my-theme", "label": "My Theme" }
   ```

   The in-page theme picker reads this file and will list the new theme automatically (requires serving via HTTP; falls back to a hardcoded list in `scripts.js` for `file://`).

Existing themes — `star-wars` and `bauhaus` — are good references for structure and conventions.
