# BrowserBible v3 - React Integration Guide

This guide explains how to integrate BrowserBible v3 into your React application running on Vite with a Deno Deploy backend.

## Table of Contents

- [Installation](#installation)
- [Quick Start](#quick-start)
- [Integration Steps](#integration-steps)
- [Configuration](#configuration)
- [Examples](#examples)
- [API Reference](#api-reference)

## Installation

### Option 1: Use as a Local Module

If you have cloned this repository:

```bash
# From your React app directory
npm install ../path/to/browserbible-3
```

### Option 2: Use as an npm Package

If published to npm:

```bash
npm install browserbible-3 react react-dom
```

## Quick Start

### 1. Copy Required Assets

The BrowserBible requires static assets (JavaScript files, CSS, fonts, and content). Copy the `app` directory to your public folder:

```bash
# From your React project root
cp -r node_modules/browserbible-3/app public/app

# Or if using local module
cp -r ../browserbible-3/app public/app
```

### 2. Basic Usage in Your React App

```jsx
import React from 'react';
import { BrowserBible } from 'browserbible-3/react';

function App() {
  const config = {
    windows: [
      {
        type: 'bible',
        data: { textid: 'ENGNAS', fragmentid: 'JN1_1' }
      }
    ],
    enableOnlineSources: true,
  };

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <BrowserBible config={config} />
    </div>
  );
}

export default App;
```

## Integration Steps

### Step 1: Install Dependencies

```bash
npm install browserbible-3 react react-dom prop-types
```

### Step 2: Set Up Vite Configuration

Ensure your `vite.config.js` is configured to serve static assets:

```javascript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  publicDir: 'public',
  server: {
    port: 3000,
  }
});
```

### Step 3: Copy Assets to Public Directory

```bash
cp -r node_modules/browserbible-3/app public/app
```

### Step 4: Build Bible Content (Optional)

If you need to build custom Bible texts:

```bash
cd node_modules/browserbible-3
npm run build:content
```

### Step 5: Use in Your React Component

See the [Examples](#examples) section below for various usage patterns.

## Configuration

The `BrowserBible` component accepts a `config` prop with the following options:

### Common Configuration Options

```javascript
const config = {
  // Initial windows to display
  windows: [
    { type: 'bible', data: { textid: 'ENGNAS', fragmentid: 'JN1_1' } },
    { type: 'search', data: { textid: 'ENGNAS', searchtext: 'love' } }
  ],
  
  // Enable/disable online features (maps, audio, video)
  enableOnlineSources: true,
  
  // Content URL configuration
  baseContentUrl: '',  // Leave empty for local content
  baseContentApiPath: '',  // Path to API proxy if needed
  
  // Default Bible version for new windows
  newBibleWindowVersion: 'eng-NASB1995',
  
  // Default verse for new windows
  newWindowFragmentid: 'JN1_1',
  
  // UI language
  defaultLanguage: 'en',
  
  // Languages to show at top of selector
  pinnedLanguages: ['English', 'Spanish', 'Greek', 'Hebrew'],
  
  // Custom CSS URL
  customCssUrl: '',
  
  // Faith Comes by Hearing API key (for audio)
  fcbhKey: '',
  
  // Jesus Film Media API key (for video)
  jfmKey: ''
};
```

### Window Types

Available window types:

- `bible` - Display Bible text
- `search` - Search within Bible texts
- `maps` - Display Bible maps
- `media` - Media library (audio/video)
- `parallels` - Parallel passages
- `comparison` - Text comparison
- `audio` - Audio player
- `statistics` - Text statistics

### Fragment IDs

Fragment IDs follow the pattern: `BOOK_CHAPTER_VERSE`

Examples:
- `JN1_1` - John 1:1
- `GN1_1` - Genesis 1:1
- `MT5_1` - Matthew 5:1
- `ROM8_28` - Romans 8:28

## Examples

### Example 1: Basic Bible Window

```jsx
import { BrowserBible } from 'browserbible-3/react';

function BasicBible() {
  return (
    <BrowserBible 
      config={{
        windows: [
          { type: 'bible', data: { textid: 'ENGNAS', fragmentid: 'JN3_16' } }
        ]
      }}
    />
  );
}
```

### Example 2: Side-by-Side Translation Comparison

```jsx
function ParallelBibles() {
  return (
    <BrowserBible 
      config={{
        windows: [
          { type: 'bible', data: { textid: 'ENGNAS', fragmentid: 'PS23_1' } },
          { type: 'bible', data: { textid: 'ENGKJV', fragmentid: 'PS23_1' } },
          { type: 'bible', data: { textid: 'heb', fragmentid: 'PS23_1' } }
        ]
      }}
    />
  );
}
```

### Example 3: Bible with Search

```jsx
function BibleWithSearch() {
  return (
    <BrowserBible 
      config={{
        windows: [
          { type: 'bible', data: { textid: 'ENGNAS', fragmentid: 'JN1_1' } },
          { type: 'search', data: { textid: 'ENGNAS', searchtext: 'faith hope love' } }
        ],
        enableOnlineSources: true
      }}
    />
  );
}
```

### Example 4: Custom Styling

```jsx
function CustomStyledBible() {
  return (
    <div style={{ 
      width: '100%', 
      height: '600px',
      border: '1px solid #ccc',
      borderRadius: '8px',
      overflow: 'hidden'
    }}>
      <BrowserBible 
        config={{
          windows: [
            { type: 'bible', data: { textid: 'ENGNAS', fragmentid: 'JN1_1' } }
          ]
        }}
        className="my-custom-bible"
        style={{ 
          backgroundColor: '#f5f5f5' 
        }}
      />
    </div>
  );
}
```

### Example 5: Embedded in Dashboard

```jsx
function Dashboard() {
  return (
    <div className="dashboard">
      <header>
        <h1>My Spiritual Dashboard</h1>
      </header>
      
      <div className="content-grid">
        <div className="bible-panel">
          <BrowserBible 
            config={{
              windows: [
                { type: 'bible', data: { textid: 'ENGNAS', fragmentid: 'JN1_1' } }
              ]
            }}
            style={{ height: '500px' }}
          />
        </div>
        
        <div className="notes-panel">
          {/* Your notes component */}
        </div>
      </div>
    </div>
  );
}
```

### Example 6: With Asset Loading

For better control over asset loading:

```jsx
import React, { useEffect, useState } from 'react';
import { BrowserBible, loadBrowserBibleAssets } from 'browserbible-3/react';

function BibleWithLoader() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    loadBrowserBibleAssets('/app')
      .then(() => setLoaded(true))
      .catch(err => console.error('Failed to load:', err));
  }, []);

  if (!loaded) {
    return <div>Loading Bible...</div>;
  }

  return (
    <BrowserBible 
      config={{
        windows: [
          { type: 'bible', data: { textid: 'ENGNAS', fragmentid: 'JN1_1' } }
        ]
      }}
    />
  );
}
```

## API Reference

### `<BrowserBible />` Component

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `config` | `object` | `{}` | Configuration object for BrowserBible |
| `className` | `string` | `''` | Additional CSS class names |
| `style` | `object` | `{}` | Inline styles for the container |

### Functions

#### `loadBrowserBibleAssets(basePath)`

Loads all required scripts and stylesheets for BrowserBible.

**Parameters:**
- `basePath` (string): Path to the app directory (default: `'/app'`)

**Returns:** Promise that resolves when all assets are loaded

**Example:**
```javascript
import { loadBrowserBibleAssets } from 'browserbible-3/react';

loadBrowserBibleAssets('/app')
  .then(() => console.log('Assets loaded'))
  .catch(err => console.error('Error:', err));
```

#### `initializeBrowserBible(container, config)`

Manually initialize BrowserBible in a DOM container.

**Parameters:**
- `container` (HTMLElement): DOM element to mount into
- `config` (object): Configuration object

**Returns:** Instance object with cleanup methods

#### `destroyBrowserBible(instance)`

Cleanup and destroy a BrowserBible instance.

**Parameters:**
- `instance` (object): Instance returned from `initializeBrowserBible`

## Deno Deploy Backend Integration

If you're using Deno Deploy for your backend, you can serve the BrowserBible assets statically:

### Example Deno Server

```typescript
// server.ts
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { serveDir } from "https://deno.land/std@0.177.0/http/file_server.ts";

serve(async (req) => {
  const url = new URL(req.url);
  
  // Serve BrowserBible static assets
  if (url.pathname.startsWith("/app")) {
    return serveDir(req, {
      fsRoot: "./public",
    });
  }
  
  // Your other API routes
  // ...
  
  return new Response("Not found", { status: 404 });
});
```

## Troubleshooting

### Assets Not Loading

Make sure the `app` directory is in your public folder and accessible:

```bash
ls public/app/index.html  # Should exist
```

### jQuery Not Found

The BrowserBible component should handle jQuery loading automatically. If you encounter issues, ensure jQuery is available globally or loaded before the component mounts.

### Content Not Found

Ensure you've built the content:

```bash
cd node_modules/browserbible-3
npm install
npm run build:content
```

## License

MIT License - see LICENSE.txt for details

## Credits

- Developed by [Digital Bible Society](http://www.digitalbiblesociety.com/)
- Major contributions from [John Dyer](http://j.hn/)
- Audio provided by [Faith Comes by Hearing](https://www.faithcomesbyhearing.com/)
- Video by [Jesus Film Project](http://www.jesusfilm.org/)
