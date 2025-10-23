# Quick Reference - React Integration

## Installation

```bash
npm install browserbible-3 react react-dom
cp -r node_modules/browserbible-3/app public/app
```

## Basic Usage

```jsx
import { BrowserBible } from 'browserbible-3/react';

<BrowserBible 
  config={{
    windows: [
      { type: 'bible', data: { textid: 'ENGNAS', fragmentid: 'JN1_1' } }
    ]
  }}
/>
```

## Common Fragment IDs

| Book | Example | Meaning |
|------|---------|---------|
| Genesis | `GN1_1` | Genesis 1:1 |
| Psalms | `PS23_1` | Psalm 23:1 |
| Matthew | `MT5_1` | Matthew 5:1 |
| John | `JN3_16` | John 3:16 |
| Romans | `ROM8_28` | Romans 8:28 |

## Common Text IDs

| ID | Translation |
|----|-------------|
| `ENGNAS` | New American Standard |
| `ENGKJV` | King James Version |
| `ENGNIV` | New International Version |
| `grc_tisch` | Greek (Tischendorf) |
| `heb` | Hebrew |

## Window Types

- `bible` - Bible text viewer
- `search` - Search functionality
- `maps` - Bible maps
- `media` - Audio/video library
- `parallels` - Parallel passages

## Configuration Quick Reference

```jsx
const config = {
  // Initial windows
  windows: [
    { type: 'bible', data: { textid: 'ENGNAS', fragmentid: 'JN1_1' } }
  ],
  
  // Online features
  enableOnlineSources: true,
  
  // Defaults
  newBibleWindowVersion: 'eng-NASB1995',
  newWindowFragmentid: 'JN1_1',
  
  // Language
  defaultLanguage: 'en',
  pinnedLanguages: ['English', 'Spanish'],
  
  // Custom styling
  customCssUrl: '/my-custom-styles.css',
};
```

## Multiple Windows

```jsx
<BrowserBible 
  config={{
    windows: [
      { type: 'bible', data: { textid: 'ENGNAS', fragmentid: 'MT5_1' } },
      { type: 'bible', data: { textid: 'grc_tisch', fragmentid: 'MT5_1' } },
      { type: 'search', data: { textid: 'ENGNAS', searchtext: 'love' } }
    ]
  }}
/>
```

## With Loading State

```jsx
import { BrowserBible, loadBrowserBibleAssets } from 'browserbible-3/react';

const [loaded, setLoaded] = useState(false);

useEffect(() => {
  loadBrowserBibleAssets('/app')
    .then(() => setLoaded(true));
}, []);

if (!loaded) return <div>Loading...</div>;

return <BrowserBible config={config} />;
```

## Custom Styling

```jsx
<BrowserBible 
  className="my-bible"
  style={{ 
    height: '600px', 
    border: '1px solid #ccc' 
  }}
  config={config}
/>
```

## TypeScript

```typescript
import { BrowserBible, BrowserBibleConfig } from 'browserbible-3/react';

const config: BrowserBibleConfig = {
  windows: [
    { type: 'bible', data: { textid: 'ENGNAS', fragmentid: 'JN1_1' } }
  ],
};

<BrowserBible config={config} />
```

## Vite Setup

```javascript
// vite.config.js
export default defineConfig({
  plugins: [react()],
  publicDir: 'public',
});
```

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Assets not loading | Verify `public/app` exists |
| Module not found | Run `npm install browserbible-3` |
| CORS errors | Add `server: { cors: true }` to vite.config.js |
| jQuery errors | Assets will load automatically |

## Documentation Links

- Full README: [react/README.md](README.md)
- Vite Guide: [react/VITE_INTEGRATION.md](VITE_INTEGRATION.md)
- Summary: [react/SUMMARY.md](SUMMARY.md)
- Main README: [../README.md](../README.md)

## Support

- GitHub: https://github.com/digitalbiblesociety/browserbible-3
- Issues: https://github.com/digitalbiblesociety/browserbible-3/issues
