# Tee oma testikuva

Interactive Finnish TV test card (testikuva) generator based on the classic FuBK test pattern used by YLE TV2 in the 1980s.

## Features

- Customizable text overlay (default: "YLE     TV2")
- Adjustable font size and vertical position
- Embedded VCR OSD Mono font for authentic retro look
- Responsive design that scales to viewport
- Settings persist in URL for easy sharing
- Self-contained single HTML file output

## Files

```
testikuva/
├── testcard.svg      # Base SVG with embedded font and default text
├── template.html     # HTML template with CSS and placeholders
├── script.js         # JavaScript for interactivity and URL state
├── build.sh          # Build script to generate index.html
├── index.html        # Generated output (run build.sh to create)
├── README.md         # This file
└── CLAUDE.md         # Development context for Claude Code
```

## Building

Run the build script to generate `index.html`:

```bash
./build.sh
```

This combines `testcard.svg`, `template.html`, and `script.js` into a single self-contained HTML file.

## Usage

1. Open `index.html` in a browser
2. Edit the text field to change the overlay text
3. Adjust "Koko" (size) to change font size (10-100)
4. Adjust "Y" to change vertical position (0-576)
5. Click "Palauta vakioarvot" to reset to defaults
6. Share the URL - settings are preserved in query parameters

## Technical Details

### SVG Structure
- ViewBox: 768x576 (4:3 aspect ratio, PAL standard)
- Contains embedded base64-encoded VCR OSD Mono font
- Text element uses `xml:space="preserve"` for multiple spaces

### Font
The VCR OSD Mono font is embedded directly in the SVG as a base64-encoded TTF, making the file self-contained without external dependencies.

### URL Parameters
- `text` - The overlay text
- `size` - Font size in pixels
- `y` - Vertical position in SVG coordinates

Example: `index.html?text=HELLO&size=50&y=300`

## History

The FuBK (Fernseh-Betriebsuntersuchungskarte) test pattern was widely used in European television broadcasting. YLE (Finnish Broadcasting Company) used this pattern with their channel identification on TV2 from 1985.

## License

The FuBK test pattern is in the public domain. The VCR OSD Mono font is freeware.
