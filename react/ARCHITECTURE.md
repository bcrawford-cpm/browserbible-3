# BrowserBible v3 - React Integration Architecture

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                     React Application (Vite)                 │
│                                                               │
│  ┌────────────────────────────────────────────────────────┐ │
│  │              Your React Components                     │ │
│  │                                                        │ │
│  │  ┌──────────────────────────────────────────────────┐ │ │
│  │  │      <BrowserBible />                            │ │ │
│  │  │                                                  │ │ │
│  │  │  Props: config, className, style                │ │ │
│  │  │  ├─ useEffect (mount/unmount)                   │ │ │
│  │  │  ├─ useRef (container, instance)                │ │ │
│  │  │  └─ Lifecycle management                        │ │ │
│  │  │                                                  │ │ │
│  │  │  ┌────────────────────────────────────────────┐ │ │ │
│  │  │  │    initializeBrowserBible()                │ │ │ │
│  │  │  │                                            │ │ │ │
│  │  │  │  Creates DOM structure:                   │ │ │ │
│  │  │  │  ├─ windows-container                     │ │ │ │
│  │  │  │  ├─ windows-header                        │ │ │ │
│  │  │  │  ├─ windows-main                          │ │ │ │
│  │  │  │  └─ windows-footer                        │ │ │ │
│  │  │  │                                            │ │ │ │
│  │  │  │  Initializes:                             │ │ │ │
│  │  │  │  ├─ WindowManager                         │ │ │ │
│  │  │  │  ├─ MainMenu                              │ │ │ │
│  │  │  │  └─ Plugins                               │ │ │ │
│  │  │  └────────────────────────────────────────────┘ │ │ │
│  │  └──────────────────────────────────────────────────┘ │ │
│  └────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
        ┌───────────────────────────────────────┐
        │    Static Assets (/public/app)        │
        │                                        │
        │  ├─ js/                                │
        │  │  ├─ core/ (startup, config)        │
        │  │  ├─ windows/ (text, search)        │
        │  │  ├─ ui/ (components)               │
        │  │  └─ plugins/                       │
        │  │                                     │
        │  ├─ css/                               │
        │  │  ├─ bible.css                      │
        │  │  ├─ windows.css                    │
        │  │  └─ fonts.css                      │
        │  │                                     │
        │  └─ content/                           │
        │     ├─ texts/ (Bible data)            │
        │     ├─ media/ (audio/video)           │
        │     └─ maps/                          │
        └───────────────────────────────────────┘
```

## Component Hierarchy

```
App (Your React App)
└── BrowserBible Component
    ├── Container Ref (DOM element)
    ├── Instance Ref (cleanup handler)
    └── Effects
        ├── Initialize on Mount
        │   └── initializeBrowserBible()
        │       ├── Create DOM structure
        │       ├── Load jQuery dependencies
        │       ├── Initialize sofia namespace
        │       └── Create App instance
        │
        └── Cleanup on Unmount
            └── destroyBrowserBible()
                ├── Call app.destroy()
                └── Clear container
```

## Data Flow

```
User Interaction
      │
      ▼
React Component (BrowserBible.jsx)
      │
      ▼
Props (config, style, className)
      │
      ▼
initializeBrowserBible(container, config)
      │
      ▼
Sofia Namespace (window.sofia)
      │
      ├─── config (merged with defaults)
      ├─── plugins array
      ├─── windowTypes array
      └─── globals object
      │
      ▼
App Instance (from windowapp.js)
      │
      ├─── WindowManager
      │    └─── Windows array
      │         ├─── BibleWindow
      │         ├─── SearchWindow
      │         └─── MediaWindow
      │
      ├─── MainMenu
      │    ├─── TopSearch
      │    ├─── AddWindow
      │    └─── Config
      │
      └─── Plugins
           ├─── LemmaInfo
           ├─── CrossReferences
           └─── MediaPlugin
```

## File Organization

```
browserbible-3/
├── app/                          # Original standalone app
│   ├── index.html               # Standalone HTML entry
│   ├── js/                      # All JavaScript
│   │   ├── core/               # Core application
│   │   ├── windows/            # Window types
│   │   ├── ui/                 # UI components
│   │   └── plugins/            # Feature plugins
│   ├── css/                     # Stylesheets
│   └── content/                 # Bible content
│
├── react/                        # NEW: React integration
│   ├── index.js                 # Main exports
│   ├── index.d.ts              # TypeScript definitions
│   ├── BrowserBible.jsx        # React component
│   ├── BrowserBibleInit.js     # Initialization
│   ├── ExampleApp.jsx          # Usage example
│   ├── README.md               # Full documentation
│   ├── VITE_INTEGRATION.md     # Vite guide
│   ├── QUICKREF.md             # Quick reference
│   └── SUMMARY.md              # Project summary
│
└── package.json                 # Updated for React module
```

## Integration Flow

```
Step 1: Installation
   npm install browserbible-3
          │
          ▼
Step 2: Copy Assets
   cp -r node_modules/browserbible-3/app public/app
          │
          ▼
Step 3: Import Component
   import { BrowserBible } from 'browserbible-3/react'
          │
          ▼
Step 4: Use in JSX
   <BrowserBible config={...} />
          │
          ▼
Step 5: Component Lifecycle
   Mount → Initialize → Render → Update → Unmount → Cleanup
```

## Build Process (Original Content)

```
input/                    # Source Bible texts
  ├── kjv/
  ├── nas/
  └── greek/
      │
      ▼
npm run build:content
      │
      ├── generate.js       # Parse USFM/XML
      ├── create_texts_index.js  # Create index
      └── generatedeafbibles.js  # Process sign language
      │
      ▼
app/content/texts/        # Generated Bible data
  ├── ENGNAS/
  │   ├── JN.json
  │   └── about.html
  └── texts.json          # Index of all texts
```

## Module Exports

```javascript
// ES6 Module Structure

react/index.js
├── export { BrowserBible }      // Main component
├── export { initializeBrowserBible }
├── export { destroyBrowserBible }
└── export { loadBrowserBibleAssets }

// TypeScript Definitions
react/index.d.ts
├── interface BrowserBibleConfig
├── interface BrowserBibleProps
├── interface BrowserBibleInstance
└── function signatures
```

## Dependencies

```
Production Dependencies (from package.json)
├── jquery          # Required by original app
├── base32          # Data encoding
├── xregexp         # Text processing
└── Other utilities

Peer Dependencies (React Integration)
├── react >= 16.8.0    # For hooks
└── react-dom >= 16.8.0

Dev Dependencies
└── prop-types         # Runtime type checking
```

## Browser Support

```
Supported Browsers:
├── Chrome/Edge (latest)
├── Firefox (latest)
├── Safari (latest)
├── Mobile browsers
└── Any browser supporting:
    ├── React 16.8+
    ├── ES6 modules
    └── Modern JavaScript
```

## State Management

```
Application State (managed by original app)
├── sofia.config           # Configuration
├── sofia.plugins          # Registered plugins
├── sofia.windowTypes      # Available window types
└── sofia.globals          # Shared state

React Component State
├── containerRef           # DOM reference
└── instanceRef            # Cleanup handler

No Redux/Context needed - Original app manages its own state
```

## Key Design Decisions

1. **Wrapper Pattern**: Minimal changes to original code
2. **Lifecycle Management**: React handles mount/unmount
3. **Asset Loading**: Static files served from public directory
4. **Configuration**: Extends original config system
5. **TypeScript**: Optional but included for better DX
6. **Backward Compatibility**: Standalone app still works

## Performance Considerations

- Assets load on component mount (lazy loading possible)
- Single jQuery instance shared across components
- Cleanup prevents memory leaks
- Original app optimized for performance
- Supports multiple instances (with caution)

## Future Extensibility

Potential enhancements without breaking changes:
- React Context for shared configuration
- Custom hooks (useBibleText, useBibleSearch)
- Server-side rendering support
- Progressive Web App features
- Modern build tools integration
