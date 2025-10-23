import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { initializeBrowserBible, destroyBrowserBible } from './BrowserBibleInit';

/**
 * BrowserBible React Component
 * 
 * A React wrapper for the BrowserBible v3 application.
 * This component integrates the existing jQuery-based Bible app into a React application.
 * 
 * @component
 * @example
 * ```jsx
 * import { BrowserBible } from 'browserbible-3/react';
 * 
 * function App() {
 *   const config = {
 *     windows: [
 *       {type: 'bible', data: {textid: 'ENGNAS', fragmentid: 'JN1_1'}},
 *     ],
 *     enableOnlineSources: true,
 *   };
 *   
 *   return <BrowserBible config={config} />;
 * }
 * ```
 */
const BrowserBible = ({ config = {}, className = '', style = {} }) => {
  const containerRef = useRef(null);
  const instanceRef = useRef(null);

  useEffect(() => {
    if (containerRef.current && !instanceRef.current) {
      // Initialize BrowserBible
      instanceRef.current = initializeBrowserBible(containerRef.current, config);
    }

    // Cleanup on unmount
    return () => {
      if (instanceRef.current) {
        destroyBrowserBible(instanceRef.current);
        instanceRef.current = null;
      }
    };
  }, []); // Empty dependency array - only initialize once

  // Handle config updates
  useEffect(() => {
    if (instanceRef.current && config) {
      // Update configuration if needed
      if (window.sofia && window.sofia.config) {
        window.sofia.config = { ...window.sofia.config, ...config };
      }
    }
  }, [config]);

  return (
    <div 
      ref={containerRef} 
      className={`browserbible-container ${className}`}
      style={{ 
        width: '100%', 
        height: '100%',
        position: 'relative',
        ...style 
      }}
    />
  );
};

BrowserBible.propTypes = {
  /**
   * Configuration object for BrowserBible
   * See app/js/core/config-default.js for all available options
   */
  config: PropTypes.shape({
    windows: PropTypes.arrayOf(PropTypes.shape({
      type: PropTypes.string,
      data: PropTypes.object,
    })),
    enableOnlineSources: PropTypes.bool,
    baseContentUrl: PropTypes.string,
    topTexts: PropTypes.arrayOf(PropTypes.string),
    newBibleWindowVersion: PropTypes.string,
    newWindowFragmentid: PropTypes.string,
    pinnedLanguage: PropTypes.string,
    pinnedLanguages: PropTypes.arrayOf(PropTypes.string),
    defaultLanguage: PropTypes.string,
    customCssUrl: PropTypes.string,
  }),
  /**
   * Additional CSS class names for the container
   */
  className: PropTypes.string,
  /**
   * Inline styles for the container
   */
  style: PropTypes.object,
};

export default BrowserBible;
