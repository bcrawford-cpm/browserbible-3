/**
 * Type definitions for BrowserBible v3 React Integration
 */

import { CSSProperties, ReactElement } from 'react';

export interface BibleWindowData {
  textid: string;
  fragmentid: string;
}

export interface SearchWindowData {
  textid: string;
  searchtext: string;
}

export interface WindowConfig {
  type: 'bible' | 'search' | 'maps' | 'media' | 'parallels' | 'comparison' | 'audio' | 'statistics';
  data: BibleWindowData | SearchWindowData | Record<string, any>;
  windowType?: string;
}

export interface BrowserBibleConfig {
  /**
   * Change this to clear all user settings
   */
  settingsPrefix?: string;

  /**
   * Enables the use of online sources (Google Maps, FCBH, Jesus Film, etc.)
   * @default true
   */
  enableOnlineSources?: boolean;

  /**
   * Initial windows to display
   */
  windows?: WindowConfig[];

  /**
   * URL to content
   * (1) Leave blank to use local content folder.
   * (2) Enter URL (http://www.biblesite.com/) for CORS enabled sites
   */
  baseContentUrl?: string;

  /**
   * API path for content
   * (1) Leave blank for local files or for CORS enabled CDN
   * (2) Enter path of script that will convert all files to JSONP (e.g., api.php)
   */
  baseContentApiPath?: string;

  /**
   * API key for content CDN
   */
  baseContentApiKey?: string;

  /**
   * File name of texts lists
   * @default 'texts.json'
   */
  textsIndexPath?: string;

  /**
   * URL to about page
   * @default 'about.html'
   */
  aboutPagePath?: string;

  /**
   * Server search path
   * (1) Leave blank for JSON search
   * (2) Enter path of script that will return JSON data
   */
  serverSearchPath?: string;

  /**
   * Texts shown before the "MORE" button
   */
  topTexts?: string[];

  /**
   * Default Bible version for new windows
   * @default 'eng-NASB1995'
   */
  newBibleWindowVersion?: string;

  /**
   * Default verse for new windows
   * @default 'JN1_1'
   */
  newWindowFragmentid?: string;

  /**
   * Default commentary window text ID
   * @default 'comm_eng_wesley'
   */
  newCommentaryWindowTextId?: string;

  /**
   * Language for top of text selector
   * @default 'English'
   */
  pinnedLanguage?: string;

  /**
   * Languages for top of text selector
   * @default ['English', 'Spanish']
   */
  pinnedLanguages?: string[];

  /**
   * Override the browser and user's choice for UI language
   */
  defaultLanguage?: string;

  /**
   * URL to custom CSS
   */
  customCssUrl?: string;

  /**
   * Faith Comes by Hearing API key
   */
  fcbhKey?: string;

  /**
   * Texts to ignore from FCBH
   */
  fcbhTextExclusions?: string[];

  /**
   * true: live parse all versions
   * false: loads texts_fcbh.json
   * @default false
   */
  fcbhLoadVersions?: boolean;

  /**
   * Jesus Film Media API key
   */
  jfmKey?: string;
}

export interface BrowserBibleProps {
  /**
   * Configuration object for BrowserBible
   */
  config?: BrowserBibleConfig;

  /**
   * Additional CSS class names for the container
   */
  className?: string;

  /**
   * Inline styles for the container
   */
  style?: CSSProperties;
}

export interface BrowserBibleInstance {
  container: HTMLElement;
  $container: any; // jQuery object
  app: any;
  destroy: () => void;
}

/**
 * BrowserBible React Component
 * 
 * A React wrapper for the BrowserBible v3 application.
 * This component integrates the existing jQuery-based Bible app into a React application.
 */
export const BrowserBible: React.FC<BrowserBibleProps>;

/**
 * Initialize BrowserBible in a container
 * @param container - The DOM element to mount BrowserBible into
 * @param config - Configuration object for BrowserBible
 * @returns Instance object with methods to interact with BrowserBible
 */
export function initializeBrowserBible(
  container: HTMLElement,
  config?: BrowserBibleConfig
): BrowserBibleInstance | null;

/**
 * Destroy a BrowserBible instance
 * @param instance - The instance returned by initializeBrowserBible
 */
export function destroyBrowserBible(instance: BrowserBibleInstance): void;

/**
 * Load all required BrowserBible assets
 * This should be called once before using BrowserBible components
 * @param basePath - Base path to the BrowserBible app directory
 * @returns Promise that resolves when all assets are loaded
 */
export function loadBrowserBibleAssets(basePath?: string): Promise<boolean>;

export default BrowserBible;
