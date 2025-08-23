// CSS and JavaScript minification utilities for production
// This module provides client-side optimization for development and production builds

/**
 * Resource Minification and Optimization
 */
class ResourceOptimizer {
    constructor() {
        this.isProduction = this.detectProductionMode();
        this.init();
    }

    detectProductionMode() {
        // Check various indicators for production mode
        return (
            location.hostname !== 'localhost' &&
            location.hostname !== '127.0.0.1' &&
            !location.hostname.includes('dev') &&
            !location.hostname.includes('test') &&
            !location.search.includes('debug=true')
        );
    }

    init() {
        if (this.isProduction) {
            this.optimizeResources();
            this.enableResourceCompression();
            this.setupResourceCaching();
        }
        
        this.setupResourceLoading();
        this.optimizeImageDelivery();
    }

    optimizeResources() {
        // Minify inline styles and scripts
        this.minifyInlineCSS();
        this.minifyInlineJS();
        
        // Remove development-only elements
        this.removeDevElements();
        
        // Optimize resource loading
        this.optimizeResourceLoading();
    }

    minifyInlineCSS() {
        const styleElements = document.querySelectorAll('style');
        styleElements.forEach(style => {
            if (style.textContent) {
                style.textContent = this.minifyCSS(style.textContent);
            }
        });
    }

    minifyInlineJS() {
        const scriptElements = document.querySelectorAll('script:not([src])');
        scriptElements.forEach(script => {
            if (script.textContent) {
                script.textContent = this.minifyJS(script.textContent);
            }
        });
    }

    minifyCSS(css) {
        return css
            // Remove comments
            .replace(/\/\*[\s\S]*?\*\//g, '')
            // Remove unnecessary whitespace
            .replace(/\s+/g, ' ')
            // Remove whitespace around specific characters
            .replace(/\s*([{}:;,>+~])\s*/g, '$1')
            // Remove trailing semicolons
            .replace(/;}/g, '}')
            // Remove leading/trailing whitespace
            .trim();
    }

    minifyJS(js) {
        return js
            // Remove single-line comments (basic)
            .replace(/\/\/.*$/gm, '')
            // Remove multi-line comments
            .replace(/\/\*[\s\S]*?\*\//g, '')
            // Remove unnecessary whitespace
            .replace(/\s+/g, ' ')
            // Remove whitespace around operators and punctuation
            .replace(/\s*([{}();,=+\-*/<>!&|])\s*/g, '$1')
            // Remove leading/trailing whitespace
            .trim();
    }

    removeDevElements() {
        // Remove elements marked for development only
        const devElements = document.querySelectorAll('[data-dev-only]');
        devElements.forEach(element => element.remove());
        
        // Remove debug console statements
        if (window.console && this.isProduction) {
            ['log', 'debug', 'info', 'warn'].forEach(method => {
                const original = console[method];
                console[method] = function() {
                    // Only allow error logging in production
                    if (method === 'error') {
                        original.apply(console, arguments);
                    }
                };
            });
        }
    }

    optimizeResourceLoading() {
        // Preload critical resources
        this.preloadCriticalResources();
        
        // Defer non-critical resources
        this.deferNonCriticalResources();
        
        // Setup resource bundling
        this.setupResourceBundling();
    }

    preloadCriticalResources() {
        const criticalResources = [
            { href: 'css/styles.css', as: 'style' },
            { href: 'js/main.js', as: 'script' }
            // External font resources removed for offline deployment
        ];

        criticalResources.forEach(resource => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.href = resource.href;
            link.as = resource.as;
            if (resource.as === 'style') {
                link.onload = function() {
                    this.onload = null;
                    this.rel = 'stylesheet';
                };
            }
            document.head.appendChild(link);
        });
    }

    deferNonCriticalResources() {
        // Defer non-critical CSS
        const nonCriticalCSS = document.querySelectorAll('link[rel="stylesheet"]:not([data-critical])');
        nonCriticalCSS.forEach(link => {
            if (!link.dataset.critical) {
                link.media = 'print';
                link.onload = function() {
                    this.media = 'all';
                };
            }
        });

        // Defer non-critical JavaScript
        const nonCriticalJS = document.querySelectorAll('script[src]:not([data-critical])');
        nonCriticalJS.forEach(script => {
            if (!script.dataset.critical && !script.async && !script.defer) {
                script.defer = true;
            }
        });
    }

    setupResourceBundling() {
        // Combine multiple CSS files into one request (if not already bundled)
        this.bundleCSS();
        
        // Combine multiple JS files into one request (if not already bundled)
        this.bundleJS();
    }

    bundleCSS() {
        const cssLinks = Array.from(document.querySelectorAll('link[rel="stylesheet"]'));
        
        if (cssLinks.length > 3 && this.isProduction) {
            // Create a combined CSS file request
            const combinedCSS = cssLinks.map(link => `@import url("${link.href}");`).join('\n');
            
            const style = document.createElement('style');
            style.textContent = combinedCSS;
            document.head.appendChild(style);
            
            // Remove original link tags
            cssLinks.forEach(link => link.remove());
        }
    }

    bundleJS() {
        const jsScripts = Array.from(document.querySelectorAll('script[src]'));
        
        if (jsScripts.length > 3 && this.isProduction) {
            // Note: This is a simplified approach. In real production,
            // you'd use a build tool like Webpack, Rollup, or Vite
            console.info('Consider using a build tool for proper JS bundling in production');
        }
    }

    enableResourceCompression() {
        // Set up service worker for resource caching and compression
        if ('serviceWorker' in navigator && this.isProduction) {
            this.registerServiceWorker();
        }
        
        // Enable gzip/brotli compression headers (server-side configuration needed)
        this.setupCompressionHeaders();
    }

    registerServiceWorker() {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('Service Worker registered:', registration);
            })
            .catch(error => {
                console.log('Service Worker registration failed:', error);
            });
    }

    setupCompressionHeaders() {
        // This would typically be handled server-side
        // Here we just add meta tags to indicate compression preferences
        const meta = document.createElement('meta');
        meta.httpEquiv = 'Content-Encoding';
        meta.content = 'gzip, deflate, br';
        document.head.appendChild(meta);
    }

    setupResourceCaching() {
        // Implement client-side caching strategies
        this.setupLocalStorageCache();
        this.setupSessionStorageCache();
    }

    setupLocalStorageCache() {
        // Cache critical CSS in localStorage for faster subsequent loads
        const criticalCSS = this.getCriticalCSS();
        if (criticalCSS) {
            try {
                localStorage.setItem('critical-css', criticalCSS);
                localStorage.setItem('critical-css-timestamp', Date.now().toString());
            } catch (e) {
                console.warn('Could not cache CSS in localStorage:', e);
            }
        }
    }

    setupSessionStorageCache() {
        // Cache dynamic content in sessionStorage
        const dynamicContent = this.getDynamicContent();
        if (dynamicContent) {
            try {
                sessionStorage.setItem('dynamic-content', JSON.stringify(dynamicContent));
            } catch (e) {
                console.warn('Could not cache content in sessionStorage:', e);
            }
        }
    }

    getCriticalCSS() {
        const criticalStyles = document.querySelector('style[data-critical]');
        return criticalStyles ? criticalStyles.textContent : null;
    }

    getDynamicContent() {
        // Cache frequently accessed dynamic content
        return {
            services: window.servicesData || null,
            team: window.teamData || null,
            faq: window.faqData || null,
            timestamp: Date.now()
        };
    }

    setupResourceLoading() {
        // Optimize resource loading based on connection speed
        this.adaptToConnectionSpeed();
        
        // Setup progressive loading
        this.setupProgressiveLoading();
    }

    adaptToConnectionSpeed() {
        if ('connection' in navigator) {
            const connection = navigator.connection;
            const effectiveType = connection.effectiveType;
            
            // Adjust resource loading based on connection speed
            if (effectiveType === 'slow-2g' || effectiveType === '2g') {
                this.enableLowBandwidthMode();
            } else if (effectiveType === '4g') {
                this.enableHighBandwidthMode();
            }
        }
    }

    enableLowBandwidthMode() {
        // Reduce image quality and defer non-essential resources
        const images = document.querySelectorAll('img');
        images.forEach(img => {
            if (img.dataset.lowBandwidth) {
                img.src = img.dataset.lowBandwidth;
            }
        });
        
        // Disable non-essential animations
        document.body.classList.add('low-bandwidth');
        
        const style = document.createElement('style');
        style.textContent = `
            .low-bandwidth * {
                animation-duration: 0.1s !important;
                transition-duration: 0.1s !important;
            }
        `;
        document.head.appendChild(style);
    }

    enableHighBandwidthMode() {
        // Preload additional resources for better UX
        this.preloadAdditionalResources();
    }

    preloadAdditionalResources() {
        const additionalResources = [
            'images/hero/hero-bg-2.jpg',
            'images/hero/hero-bg-3.jpg',
            'js/animations.js',
            'css/animations.css'
        ];

        additionalResources.forEach(resource => {
            const link = document.createElement('link');
            link.rel = 'prefetch';
            link.href = resource;
            document.head.appendChild(link);
        });
    }

    setupProgressiveLoading() {
        // Load resources progressively based on user interaction
        this.setupIntersectionObserver();
        this.setupUserInteractionLoading();
    }

    setupIntersectionObserver() {
        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        this.loadSectionResources(entry.target);
                        observer.unobserve(entry.target);
                    }
                });
            }, {
                rootMargin: '100px'
            });

            // Observe sections for progressive loading
            const sections = document.querySelectorAll('section[id]');
            sections.forEach(section => observer.observe(section));
        }
    }

    loadSectionResources(section) {
        // Load section-specific resources
        const sectionId = section.id;
        const resourceMap = {
            'services': ['js/services.js'],
            'team': ['js/team.js'],
            'contact': ['js/form-validation.js'],
            'faq': ['js/faq.js'],
            'payment': ['js/payment.js']
        };

        const resources = resourceMap[sectionId];
        if (resources) {
            resources.forEach(resource => this.loadResource(resource));
        }
    }

    loadResource(src) {
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = src;
            script.onload = resolve;
            script.onerror = reject;
            document.head.appendChild(script);
        });
    }

    setupUserInteractionLoading() {
        // Load additional resources on first user interaction
        let hasInteracted = false;
        
        const loadOnInteraction = () => {
            if (!hasInteracted) {
                hasInteracted = true;
                this.loadInteractionResources();
                
                // Remove event listeners
                document.removeEventListener('click', loadOnInteraction);
                document.removeEventListener('scroll', loadOnInteraction);
                document.removeEventListener('keydown', loadOnInteraction);
            }
        };

        document.addEventListener('click', loadOnInteraction, { once: true });
        document.addEventListener('scroll', loadOnInteraction, { once: true, passive: true });
        document.addEventListener('keydown', loadOnInteraction, { once: true });
    }

    loadInteractionResources() {
        // Load resources that are only needed after user interaction
        const interactionResources = [
            'js/modal.js',
            'js/tooltip.js',
            'css/modal.css'
        ];

        interactionResources.forEach(resource => {
            if (resource.endsWith('.js')) {
                this.loadResource(resource);
            } else if (resource.endsWith('.css')) {
                const link = document.createElement('link');
                link.rel = 'stylesheet';
                link.href = resource;
                document.head.appendChild(link);
            }
        });
    }

    optimizeImageDelivery() {
        // Setup responsive image delivery
        this.setupResponsiveImages();
        
        // Setup WebP delivery with fallbacks
        this.setupWebPDelivery();
    }

    setupResponsiveImages() {
        const images = document.querySelectorAll('img[data-responsive]');
        images.forEach(img => {
            const sizes = img.dataset.responsive.split(',');
            const srcset = sizes.map(size => {
                const [width, src] = size.split(':');
                return `${src.trim()} ${width.trim()}w`;
            }).join(', ');
            
            img.srcset = srcset;
            img.sizes = '(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw';
        });
    }

    setupWebPDelivery() {
        // This is handled by the ImageLazyLoader class
        // Just ensure WebP images are properly configured
        const webpImages = document.querySelectorAll('img[data-webp]');
        webpImages.forEach(img => {
            if (!img.dataset.src) {
                img.dataset.src = img.src;
            }
        });
    }
}

// Initialize resource optimizer
document.addEventListener('DOMContentLoaded', () => {
    window.resourceOptimizer = new ResourceOptimizer();
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { ResourceOptimizer };
}