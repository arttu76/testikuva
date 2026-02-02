# Claude Code Development Context

This document provides context for Claude Code to continue development on this project.

## Project Overview

A Finnish TV test card (testikuva) generator that creates an interactive web page where users can customize the text overlay on a classic FuBK test pattern.

## Architecture

### Build System
The project uses a simple shell script (`build.sh`) to combine three source files into a single `index.html`:

1. **testcard.svg** - The base SVG containing:
   - Embedded PNG test pattern image (base64)
   - Vector overlay elements
   - Embedded VCR OSD Mono font (base64 TTF in `@font-face`)
   - Text element with id `text_yle_tv2`

2. **template.html** - HTML template with:
   - Placeholders: `{{SVG_CONTENT}}` and `{{JS_CONTENT}}`
   - CSS for responsive layout using flexbox
   - Control inputs for text, size, and Y position

3. **script.js** - JavaScript providing:
   - Real-time SVG text updates
   - URL state persistence (query parameters)
   - Reset functionality

### Key CSS Decisions

- Body uses `height: 100%` with flexbox column layout
- Container fills height with `display: flex; flex-direction: column`
- SVG container uses `flex: 1` to fill remaining space after controls
- SVG uses `width: 100%; height: 100%` with viewBox handling aspect ratio
- `min-height: 0` on svg-container allows flex shrinking
- Drop shadow uses `filter: drop-shadow()` to follow content edges

### SVG Text Element

```xml
<text
   id="text_yle_tv2"
   x="50%"
   y="325"
   xml:space="preserve"
   style="font-family:'VCR OSD Mono', monospace;font-size:41px;fill:#FFFFFF;text-anchor:middle">YLE     TV2</text>
```

Key attributes:
- `x="50%"` with `text-anchor:middle` for horizontal centering
- `xml:space="preserve"` to keep multiple spaces between YLE and TV2
- White fill (`#FFFFFF`) for visibility on black background

### JavaScript State Management

Default values stored in `defaults` object:
```javascript
const defaults = {
    text: 'YLE     TV2',
    size: 41,
    y: 325
};
```

URL parameters: `?text=...&size=...&y=...`

## Common Tasks

### Changing Default Text
1. Edit `script.js` - update `defaults.text`
2. Edit `template.html` - update input `value` attribute
3. Edit `testcard.svg` - update text element content
4. Run `./build.sh`

### Adding New Controls
1. Add HTML input in `template.html` within `.controls`
2. Add CSS styling if needed
3. Add JavaScript handler in `script.js`:
   - Get element reference
   - Add to `defaults` object
   - Add event listener
   - Update `saveToUrl()` and `loadFromUrl()`
   - Update `reset()` function
4. Run `./build.sh`

### Modifying SVG Appearance
Edit `testcard.svg` directly. The build script only strips the XML declaration.

### Changing Layout/Styling
Edit `template.html` CSS section, then run `./build.sh`.

## Gotchas

1. **Preserved spaces**: The text "YLE     TV2" has 5 spaces. Use `xml:space="preserve"` in SVG.

2. **Font embedding**: The VCR OSD Mono font is embedded as base64 in the SVG's `<defs>` section. Without it, browsers fall back to monospace.

3. **SVG scaling**: The SVG has `viewBox="0 0 768 576"`. Remove explicit width/height to allow CSS scaling, but the build script currently keeps them for the viewBox aspect ratio to work.

4. **Drop shadow alignment**: Use `filter: drop-shadow()` not `box-shadow` to follow actual SVG content edges.

5. **Flex layout**: The svg-container needs `min-height: 0` to allow the SVG to shrink below its intrinsic size.

## File Sizes

- `testcard.svg`: ~222KB (mostly embedded font ~100KB + embedded image)
- `index.html`: ~226KB (includes everything)
- `template.html`: ~2KB
- `script.js`: ~1KB

## Testing

1. Run `./build.sh`
2. Open `index.html` in browser
3. Test controls update SVG in real-time
4. Test URL persistence by changing values and reloading
5. Test reset button
6. Test responsive behavior by resizing window
7. Test controls wrapping on narrow viewports
