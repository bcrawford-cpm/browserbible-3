/**
 * Example React Integration for BrowserBible v3
 * 
 * This file demonstrates how to integrate BrowserBible into a React application.
 */

import React, { useEffect, useState } from 'react';
import { BrowserBible, loadBrowserBibleAssets } from './index.js';

/**
 * Example App Component
 * Shows basic usage of the BrowserBible component in a React app
 */
function ExampleApp() {
  const [assetsLoaded, setAssetsLoaded] = useState(false);
  const [error, setError] = useState(null);

  // Load BrowserBible assets on mount
  useEffect(() => {
    loadBrowserBibleAssets('/app')
      .then(() => {
        setAssetsLoaded(true);
        console.log('BrowserBible assets loaded successfully');
      })
      .catch((err) => {
        setError(err.message);
        console.error('Failed to load BrowserBible assets:', err);
      });
  }, []);

  // Configuration for BrowserBible
  const bibleConfig = {
    // Initial windows to display
    windows: [
      {
        type: 'bible',
        data: { textid: 'ENGNAS', fragmentid: 'JN1_1' }
      },
      {
        type: 'bible',
        data: { textid: 'grc_tisch', fragmentid: 'JN1_1' }
      }
    ],
    
    // Enable online sources (maps, audio, video)
    enableOnlineSources: true,
    
    // Default Bible version for new windows
    newBibleWindowVersion: 'eng-NASB1995',
    
    // Default verse for new windows
    newWindowFragmentid: 'JN1_1',
    
    // UI Language
    defaultLanguage: 'en',
    
    // Pinned languages in text selector
    pinnedLanguages: ['English', 'Spanish', 'Greek', 'Hebrew']
  };

  if (error) {
    return (
      <div style={{ padding: '20px', color: 'red' }}>
        <h2>Error Loading BrowserBible</h2>
        <p>{error}</p>
      </div>
    );
  }

  if (!assetsLoaded) {
    return (
      <div style={{ padding: '20px' }}>
        <h2>Loading BrowserBible...</h2>
        <p>Please wait while the Bible application loads.</p>
      </div>
    );
  }

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <BrowserBible 
        config={bibleConfig}
        style={{ 
          width: '100%', 
          height: '100%' 
        }}
      />
    </div>
  );
}

export default ExampleApp;


/**
 * Example: Using BrowserBible in a Vite React App
 * 
 * 1. Install dependencies:
 *    npm install react react-dom
 * 
 * 2. Copy the BrowserBible app folder to your public directory:
 *    cp -r browserbible-3/app public/app
 * 
 * 3. Import and use the component:
 *    import ExampleApp from './ExampleApp';
 *    
 *    function App() {
 *      return <ExampleApp />;
 *    }
 * 
 * 4. The BrowserBible component will handle initialization and cleanup
 * 
 * 
 * Example: Custom Configuration
 * 
 * ```jsx
 * const customConfig = {
 *   windows: [
 *     { type: 'bible', data: { textid: 'ENGKJV', fragmentid: 'GN1_1' } }
 *   ],
 *   enableOnlineSources: false,  // Disable online features
 *   baseContentUrl: 'https://mycdn.com/bible',  // Use custom CDN
 *   topTexts: ['ENGKJV', 'ENGNAS', 'ENGNIV'],  // Pin favorite translations
 * };
 * 
 * <BrowserBible config={customConfig} />
 * ```
 * 
 * 
 * Example: Multiple Bible Windows
 * 
 * ```jsx
 * function MultiWindowApp() {
 *   return (
 *     <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', height: '100vh' }}>
 *       <BrowserBible 
 *         config={{
 *           windows: [{ type: 'bible', data: { textid: 'ENGNAS', fragmentid: 'MT5_1' } }]
 *         }}
 *       />
 *       <BrowserBible 
 *         config={{
 *           windows: [{ type: 'bible', data: { textid: 'grc_tisch', fragmentid: 'MT5_1' } }]
 *         }}
 *       />
 *     </div>
 *   );
 * }
 * ```
 */
