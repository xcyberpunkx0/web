// Debug Helper for Network Error Troubleshooting
// This script helps identify what's causing network errors

(function() {
    'use strict';
    
    console.log('🔍 Debug Helper: Starting network error troubleshooting...');
    
    // Track all network requests
    const originalFetch = window.fetch;
    window.fetch = function(...args) {
        console.log('🌐 Fetch request:', args[0]);
        return originalFetch.apply(this, args)
            .then(response => {
                console.log('✅ Fetch success:', args[0], response.status);
                return response;
            })
            .catch(error => {
                console.error('❌ Fetch failed:', args[0], error);
                throw error;
            });
    };
    
    // Track XMLHttpRequest
    const originalXHROpen = XMLHttpRequest.prototype.open;
    XMLHttpRequest.prototype.open = function(method, url, ...args) {
        console.log('🌐 XHR request:', method, url);
        this.addEventListener('load', function() {
            console.log('✅ XHR success:', method, url, this.status);
        });
        this.addEventListener('error', function() {
            console.error('❌ XHR failed:', method, url);
        });
        return originalXHROpen.call(this, method, url, ...args);
    };
    
    // Track resource loading
    const resourceTypes = ['script', 'link', 'img'];
    resourceTypes.forEach(tagName => {
        const elements = document.querySelectorAll(tagName);
        elements.forEach(element => {
            const src = element.src || element.href;
            if (src) {
                element.addEventListener('load', function() {
                    console.log(`✅ ${tagName.toUpperCase()} loaded:`, src);
                });
                element.addEventListener('error', function() {
                    console.error(`❌ ${tagName.toUpperCase()} failed:`, src);
                });
            }
        });
    });
    
    // Monitor for new elements being added
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            mutation.addedNodes.forEach(function(node) {
                if (node.nodeType === Node.ELEMENT_NODE) {
                    const src = node.src || node.href;
                    if (src && resourceTypes.includes(node.tagName.toLowerCase())) {
                        console.log(`🔄 New ${node.tagName} added:`, src);
                        node.addEventListener('load', function() {
                            console.log(`✅ New ${node.tagName} loaded:`, src);
                        });
                        node.addEventListener('error', function() {
                            console.error(`❌ New ${node.tagName} failed:`, src);
                        });
                    }
                }
            });
        });
    });
    
    observer.observe(document, { childList: true, subtree: true });
    
    // Track promise rejections with more detail
    window.addEventListener('unhandledrejection', function(event) {
        console.error('🚨 Unhandled Promise Rejection Details:');
        console.error('Reason:', event.reason);
        console.error('Promise:', event.promise);
        console.error('Stack:', event.reason?.stack);
        console.error('Type:', typeof event.reason);
        console.error('Constructor:', event.reason?.constructor?.name);
        
        // Try to identify the source
        if (event.reason?.message) {
            console.error('Message:', event.reason.message);
            
            // Check for common patterns
            if (event.reason.message.includes('fetch')) {
                console.error('🌐 This appears to be a fetch-related error');
            }
            if (event.reason.message.includes('load')) {
                console.error('📁 This appears to be a resource loading error');
            }
            if (event.reason.message.includes('network')) {
                console.error('🌐 This appears to be a network connectivity error');
            }
        }
    });
    
    // Track regular errors too
    window.addEventListener('error', function(event) {
        if (event.target !== window) {
            console.error('🚨 Resource Error Details:');
            console.error('Element:', event.target.tagName);
            console.error('Source:', event.target.src || event.target.href);
            console.error('Type:', event.type);
        } else {
            console.error('🚨 Script Error Details:');
            console.error('Message:', event.message);
            console.error('Filename:', event.filename);
            console.error('Line:', event.lineno);
            console.error('Column:', event.colno);
            console.error('Error:', event.error);
        }
    });
    
    // Check for common issues
    setTimeout(function() {
        console.log('🔍 Running diagnostic checks...');
        
        // Check for offline deployment resources
        const iconFallbacks = document.querySelector('link[href*="icon-fallbacks"]');
        if (iconFallbacks) {
            console.log('Icon fallbacks loaded:', iconFallbacks.href);
        } else {
            console.warn('Icon fallbacks not found - icons may not display properly');
        }
        }
        
        // Check if all scripts loaded
        const scripts = document.querySelectorAll('script[src]');
        console.log(`Found ${scripts.length} script tags`);
        
        // Check if service worker is trying to register
        if ('serviceWorker' in navigator) {
            console.log('Service Worker support detected');
        }
        
        console.log('🔍 Debug Helper: Initial checks complete');
    }, 1000);
    
})();