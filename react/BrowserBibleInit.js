/**
 * BrowserBible Initialization Module for React Integration
 * 
 * This module provides functions to initialize and destroy BrowserBible instances
 * within React applications. It handles the loading of required scripts and styles,
 * and manages the lifecycle of the jQuery-based BrowserBible application.
 */

/**
 * Load a script dynamically
 * @private
 */
function loadScript(src) {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = src;
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  });
}

/**
 * Load a stylesheet dynamically
 * @private
 */
function loadStylesheet(href) {
  return new Promise((resolve, reject) => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    link.onload = resolve;
    link.onerror = reject;
    document.head.appendChild(link);
  });
}

/**
 * Initialize BrowserBible in a container
 * @param {HTMLElement} container - The DOM element to mount BrowserBible into
 * @param {Object} config - Configuration object for BrowserBible
 * @returns {Object} Instance object with methods to interact with BrowserBible
 */
export function initializeBrowserBible(container, config = {}) {
  // Ensure jQuery is available
  if (typeof window.$ === 'undefined' && typeof window.jQuery === 'undefined') {
    console.error('jQuery is required for BrowserBible. Please include jQuery before initializing.');
    return null;
  }

  // Initialize sofia namespace if not present
  if (!window.sofia) {
    window.sofia = {
      version: '3.8.4',
      plugins: [],
      windowTypes: [],
      menuComponents: [],
      initMethods: [],
      globals: {},
      resources: {},
      protocol: window.location.protocol === 'file:' ? 'https:' : '',
    };
  }

  // Set default config
  if (!window.sofia.config) {
    window.sofia.config = {
      settingsPrefix: '20140307',
      enableOnlineSources: true,
      windows: [
        {type: 'bible', data: {textid: 'ENGNAS', fragmentid: 'JN1_1'}},
      ],
      baseContentUrl: '',
      baseContentApiPath: '',
      baseContentApiKey: '',
      textsIndexPath: 'texts.json',
      aboutPagePath: 'about.html',
      serverSearchPath: '',
      topTexts: [],
      newBibleWindowVersion: 'eng-NASB1995',
      newWindowFragmentid: 'JN1_1',
      newCommentaryWindowTextId: 'comm_eng_wesley',
      pinnedLanguage: 'English',
      pinnedLanguages: ['English', 'Spanish'],
      defaultLanguage: '',
      customCssUrl: '',
      fcbhKey: '',
      fcbhTextExclusions: [''],
      fcbhLoadVersions: false,
      jfmKey: ''
    };
  }

  // Merge user config
  window.sofia.config = { ...window.sofia.config, ...config };

  // Create the app structure within the container
  const $ = window.jQuery || window.$;
  const $container = $(container);
  
  // Clear container
  $container.empty();
  
  // Add necessary HTML structure
  const $body = $('<div class="browserbible-body"></div>').appendTo($container);
  const $windowsContainer = $('<div class="windows-container"></div>').appendTo($body);
  const $header = $('<div class="windows-header"></div>').appendTo($windowsContainer);
  const $main = $('<div class="windows-main"></div>').appendTo($windowsContainer);
  const $footer = $('<div class="windows-footer"></div>').appendTo($windowsContainer);

  // Store reference to prevent reinitialization
  const instance = {
    container: container,
    $container: $container,
    app: null,
    destroy: function() {
      // Cleanup logic here
      if (this.app && typeof this.app.destroy === 'function') {
        this.app.destroy();
      }
      $container.empty();
    }
  };

  // Note: Actual initialization would happen here
  // This is a placeholder - in a real implementation, you would need to
  // load all required scripts and initialize the App
  
  return instance;
}

/**
 * Destroy a BrowserBible instance
 * @param {Object} instance - The instance returned by initializeBrowserBible
 */
export function destroyBrowserBible(instance) {
  if (instance && typeof instance.destroy === 'function') {
    instance.destroy();
  }
}

/**
 * Load all required BrowserBible assets
 * This should be called once before using BrowserBible components
 * @param {string} basePath - Base path to the BrowserBible app directory
 * @returns {Promise} Promise that resolves when all assets are loaded
 */
export async function loadBrowserBibleAssets(basePath = '/app') {
  const scripts = [
    // Core
    `${basePath}/js/lib/jquery.min.js`,
    `${basePath}/js/core/namespace.js`,
    `${basePath}/js/core/config-default.js`,
    `${basePath}/js/core/windowmanager.js`,
    `${basePath}/js/core/windowapp.js`,
    `${basePath}/js/core/startup.js`,
    // External libraries
    `${basePath}/js/lib/xregexp.js`,
    `${basePath}/js/lib/clipboard.js`,
    `${basePath}/js/lib/i18next-1.7.2.js`,
    `${basePath}/js/lib/jsdiff.js`,
    // Resources
    `${basePath}/js/resources/en.js`,
    // Common
    `${basePath}/js/common/languagedata.js`,
    `${basePath}/js/common/countriesdata.js`,
    `${basePath}/js/common/ajax.js`,
    `${basePath}/js/common/appsettings.js`,
    `${basePath}/js/common/eventlistener.js`,
    `${basePath}/js/common/timer.js`,
    `${basePath}/js/common/stringutility.js`,
    `${basePath}/js/common/detection.js`,
    `${basePath}/js/common/navigation.js`,
    `${basePath}/js/common/iso2iana.js`,
    `${basePath}/js/common/clickoff.js`,
    // Bible
    `${basePath}/js/bible/bible.data.js`,
    `${basePath}/js/bible/bible.reference.js`,
    `${basePath}/js/bible/morphology.js`,
    // Text loading
    `${basePath}/js/texts/textloader.js`,
    `${basePath}/js/texts/textprovider-local.js`,
    `${basePath}/js/texts/textprovider-dbs.js`,
    `${basePath}/js/texts/search.js`,
    // Media
    `${basePath}/js/media/audiodatamanager.js`,
    `${basePath}/js/media/jesusfilmapi.js`,
    `${basePath}/js/media/medialibrary.js`,
    // UI
    `${basePath}/js/ui/textchooser.js`,
    `${basePath}/js/ui/textnavigator.js`,
    `${basePath}/js/ui/infowindow.js`,
    `${basePath}/js/ui/movablewindow.js`,
    // Plugins
    `${basePath}/js/plugins/lemmainfo.js`,
    `${basePath}/js/plugins/lemmamatch.js`,
    `${basePath}/js/plugins/lemmapopup.js`,
    `${basePath}/js/plugins/versematch.js`,
    `${basePath}/js/plugins/eng2p.js`,
    `${basePath}/js/plugins/visualfilters.js`,
    `${basePath}/js/plugins/crossreferences.js`,
    `${basePath}/js/plugins/notes.js`,
    `${basePath}/js/plugins/googleanalytics.js`,
    `${basePath}/js/plugins/mediaplugin.js`,
    // Windows
    `${basePath}/js/windows/textwindow.js`,
    `${basePath}/js/windows/searchwindow.js`,
    `${basePath}/js/windows/mapswindow.js`,
    `${basePath}/js/windows/mediawindow.js`,
    `${basePath}/js/windows/parallelswindow.js`,
    `${basePath}/js/windows/scroller.js`,
    `${basePath}/js/windows/scrolleraudio.js`,
    `${basePath}/js/windows/textcomparisonwindow.js`,
    `${basePath}/js/windows/audiowindow.js`,
    `${basePath}/js/windows/statisticswindow.js`,
    `${basePath}/js/windows/deafbiblewindow.js`,
    // Menu
    `${basePath}/js/menu/mainmenu.js`,
    `${basePath}/js/menu/topsearch.js`,
    `${basePath}/js/menu/fullscreen.js`,
    `${basePath}/js/menu/addwindow.js`,
    `${basePath}/js/menu/config.js`,
    `${basePath}/js/menu/about.js`,
    `${basePath}/js/menu/feedback.js`,
    `${basePath}/js/menu/restore.js`,
    `${basePath}/js/menu/navigation.js`,
    `${basePath}/js/menu/config-fontsize.js`,
    `${basePath}/js/menu/config-fontfamily.js`,
    `${basePath}/js/menu/config-theme.js`,
    `${basePath}/js/menu/config-language.js`,
    `${basePath}/js/menu/config-toggles.js`,
    `${basePath}/js/menu/config-url.js`,
  ];

  const stylesheets = [
    `${basePath}/css/fonts.css`,
    `${basePath}/css/bible.css`,
    `${basePath}/css/windows.css`,
    `${basePath}/css/common.css`,
    `${basePath}/js/media/medialibrary.css`,
    `${basePath}/js/ui/textchooser.css`,
    `${basePath}/js/ui/textnavigator.css`,
    `${basePath}/js/ui/infowindow.css`,
    `${basePath}/js/ui/movablewindow.css`,
    `${basePath}/js/plugins/lemmainfo.css`,
    `${basePath}/js/plugins/lemmamatch.css`,
    `${basePath}/js/plugins/lemmapopup.css`,
    `${basePath}/js/plugins/versematch.css`,
    `${basePath}/js/plugins/eng2p.css`,
    `${basePath}/js/plugins/visualfilters.css`,
    `${basePath}/js/windows/textwindow.css`,
    `${basePath}/js/windows/searchwindow.css`,
    `${basePath}/js/windows/mapswindow.css`,
    `${basePath}/js/windows/mediawindow.css`,
    `${basePath}/js/windows/parallelswindow.css`,
    `${basePath}/js/windows/scrolleraudio.css`,
    `${basePath}/js/windows/textcomparisonwindow.css`,
    `${basePath}/js/windows/audiowindow.css`,
    `${basePath}/js/windows/statisticswindow.css`,
    `${basePath}/js/windows/deafbiblewindow.css`,
    `${basePath}/js/menu/mainmenu.css`,
    `${basePath}/js/menu/topsearch.css`,
    `${basePath}/js/menu/fullscreen.css`,
    `${basePath}/js/menu/addwindow.css`,
    `${basePath}/js/menu/config.css`,
    `${basePath}/js/menu/about.css`,
    `${basePath}/js/menu/feedback.css`,
    `${basePath}/js/menu/restore.css`,
    `${basePath}/js/menu/navigation.css`,
    `${basePath}/js/menu/config-fontsize.css`,
    `${basePath}/js/menu/config-fontfamily.css`,
    `${basePath}/js/menu/config-theme.css`,
    `${basePath}/js/menu/config-language.css`,
    `${basePath}/js/menu/config-toggles.css`,
    `${basePath}/js/menu/config-url.css`,
  ];

  try {
    // Load stylesheets first
    await Promise.all(stylesheets.map(href => loadStylesheet(href)));
    
    // Then load scripts in order
    for (const src of scripts) {
      await loadScript(src);
    }
    
    return true;
  } catch (error) {
    console.error('Error loading BrowserBible assets:', error);
    throw error;
  }
}
