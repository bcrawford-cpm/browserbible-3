# Vite + Deno Deploy Integration Guide

This guide shows how to integrate BrowserBible v3 into a React app running on Vite with a Deno Deploy backend.

## Prerequisites

- Node.js (for Vite development)
- A React app created with Vite
- Deno for the backend (optional)

## Step-by-Step Integration

### 1. Install BrowserBible

From your React project directory:

```bash
# If using as a local module
npm install ../path/to/browserbible-3

# Or if published to npm
npm install browserbible-3
```

### 2. Copy Static Assets

BrowserBible requires its static files to be publicly accessible:

```bash
# Copy to Vite's public directory
cp -r node_modules/browserbible-3/app public/app

# Or create a symbolic link (development)
ln -s $(pwd)/node_modules/browserbible-3/app public/app
```

### 3. Vite Configuration

Ensure your `vite.config.js` serves the public directory:

```javascript
// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  publicDir: 'public',
  server: {
    port: 3000,
  },
  // If you have CORS issues during development
  server: {
    cors: true,
    proxy: {
      // Add any API proxies here
    }
  }
});
```

### 4. Create Your React Component

```jsx
// src/components/BibleViewer.jsx
import React from 'react';
import { BrowserBible } from 'browserbible-3/react';

export default function BibleViewer() {
  const config = {
    windows: [
      {
        type: 'bible',
        data: { textid: 'ENGNAS', fragmentid: 'JN1_1' }
      }
    ],
    enableOnlineSources: true,
    defaultLanguage: 'en',
  };

  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <BrowserBible config={config} />
    </div>
  );
}
```

### 5. Use in Your App

```jsx
// src/App.jsx
import React from 'react';
import BibleViewer from './components/BibleViewer';

function App() {
  return (
    <div className="App">
      <BibleViewer />
    </div>
  );
}

export default App;
```

### 6. Run Development Server

```bash
npm run dev
```

Visit `http://localhost:3000` to see your Bible app!

## Deno Deploy Backend (Optional)

If you're using Deno Deploy for your backend API:

### Deno Server Example

```typescript
// deno-server.ts
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { serveDir } from "https://deno.land/std@0.177.0/http/file_server.ts";

const PORT = 8000;

async function handler(req: Request): Promise<Response> {
  const url = new URL(req.url);

  // Serve BrowserBible static files
  if (url.pathname.startsWith("/app")) {
    return serveDir(req, {
      fsRoot: "./public",
      showDirListing: false,
    });
  }

  // Your API routes
  if (url.pathname.startsWith("/api")) {
    return new Response(JSON.stringify({ message: "API endpoint" }), {
      headers: { "Content-Type": "application/json" },
    });
  }

  // Fallback
  return new Response("Not found", { status: 404 });
}

console.log(`Server running on http://localhost:${PORT}`);
serve(handler, { port: PORT });
```

### Run the Deno Server

```bash
deno run --allow-net --allow-read deno-server.ts
```

### Deploy to Deno Deploy

1. Push your code to GitHub
2. Connect your repository to Deno Deploy
3. Set the entry file to your server file
4. Deploy!

## Project Structure

```
my-react-app/
├── public/
│   └── app/              # BrowserBible static files
│       ├── js/
│       ├── css/
│       ├── content/
│       └── index.html
├── src/
│   ├── components/
│   │   └── BibleViewer.jsx
│   ├── App.jsx
│   └── main.jsx
├── deno-server.ts        # Optional Deno backend
├── vite.config.js
└── package.json
```

## Advanced Configuration

### Custom Styling

```jsx
import { BrowserBible } from 'browserbible-3/react';

function CustomBible() {
  return (
    <div className="bible-container">
      <BrowserBible 
        config={{
          windows: [
            { type: 'bible', data: { textid: 'ENGNAS', fragmentid: 'PS23_1' } }
          ],
          customCssUrl: '/custom-bible-styles.css'
        }}
        className="my-bible"
        style={{
          border: '1px solid #ddd',
          borderRadius: '8px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}
      />
    </div>
  );
}
```

### Multiple Bible Windows

```jsx
function StudyView() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', height: '100vh' }}>
      <BrowserBible 
        config={{
          windows: [
            { type: 'bible', data: { textid: 'ENGNAS', fragmentid: 'MT5_1' } }
          ]
        }}
      />
      <BrowserBible 
        config={{
          windows: [
            { type: 'bible', data: { textid: 'grc_tisch', fragmentid: 'MT5_1' } }
          ]
        }}
      />
    </div>
  );
}
```

### With Loading State

```jsx
import React, { useEffect, useState } from 'react';
import { BrowserBible, loadBrowserBibleAssets } from 'browserbible-3/react';

function BibleWithLoader() {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadBrowserBibleAssets('/app')
      .then(() => {
        setLoaded(true);
      })
      .catch(err => {
        setError(err.message);
        console.error('Failed to load BrowserBible:', err);
      });
  }, []);

  if (error) {
    return (
      <div className="error-container">
        <h2>Error Loading Bible</h2>
        <p>{error}</p>
      </div>
    );
  }

  if (!loaded) {
    return (
      <div className="loading-container">
        <div className="spinner" />
        <p>Loading Bible resources...</p>
      </div>
    );
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

## Environment Variables

You can use environment variables for configuration:

```javascript
// .env
VITE_BIBLE_DEFAULT_VERSION=ENGNAS
VITE_BIBLE_DEFAULT_VERSE=JN1_1
VITE_ENABLE_ONLINE=true
```

```jsx
// Use in your component
const config = {
  windows: [
    {
      type: 'bible',
      data: {
        textid: import.meta.env.VITE_BIBLE_DEFAULT_VERSION,
        fragmentid: import.meta.env.VITE_BIBLE_DEFAULT_VERSE
      }
    }
  ],
  enableOnlineSources: import.meta.env.VITE_ENABLE_ONLINE === 'true'
};
```

## Troubleshooting

### Module not found errors

Make sure you've copied the `app` directory to `public/app`:
```bash
ls public/app/index.html  # Should exist
```

### Assets not loading

Check your browser console. Assets should load from `/app/...`. If they're not:
1. Verify the `app` folder is in `public/`
2. Check Vite's `publicDir` setting
3. Ensure no .gitignore is excluding the files

### CORS errors in development

Add CORS headers in your Vite config:
```javascript
server: {
  cors: true
}
```

### Build size is too large

The BrowserBible includes many assets. Consider:
1. Using a CDN for the app files
2. Lazy loading the component
3. Code splitting in Vite

## Production Build

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

Deploy the `dist` folder to your hosting provider or Deno Deploy.

## TypeScript Support

The package includes TypeScript definitions. Import with full type support:

```typescript
import { BrowserBible, BrowserBibleConfig } from 'browserbible-3/react';

const config: BrowserBibleConfig = {
  windows: [
    { type: 'bible', data: { textid: 'ENGNAS', fragmentid: 'JN1_1' } }
  ],
  enableOnlineSources: true,
};

function App() {
  return <BrowserBible config={config} />;
}
```

## Support

For issues or questions:
- GitHub Issues: https://github.com/digitalbiblesociety/browserbible-3/issues
- Documentation: See main README.md and react/README.md
