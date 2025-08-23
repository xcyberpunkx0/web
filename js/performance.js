// Performance optimizations and loading states
// Image lazy loading, WebP support, and performance enhancements

/**
 * Image Lazy Loading with WebP Support and Fallbacks
 */
class ImageLazyLoader {
    constructor() {
        this.imageObserver = null;
        this.init();
    }

    init() {
        // Check for Intersection Observer support
        if ('IntersectionObserver' in window) {
            this.setupIntersectionObserver();
        } else {
            // Fallback for older browsers
            this.loadAllImages();
        }
    }

    setupIntersectionObserver() {
        const options = {
            root: null,
            rootMargin: '50px',
            threshold: 0.1
        };

        this.imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.loadImage(entry.target);
                    this.imageObserver.unobserve(entry.target);
                }
            });
        }, options);

        // Observe all lazy images
        this.observeImages();
    }

    observeImages() {
        const lazyImages = document.querySelectorAll('img[data-src], img[data-srcset]');
        lazyImages.forEach(img => {
            this.imageObserver.observe(img);
        });
    }

    loadImage(img) {
        // Show loading indicator
        this.showImageLoading(img);

        // Check WebP support and load appropriate format
        this.loadWithWebPSupport(img)
            .then(() => {
                this.onImageLoad(img);
            })
            .catch(() => {
                this.onImageError(img);
            });
    }

    async loadWithWebPSupport(img) {
        const supportsWebP = await this.checkWebPSupport();
        
        return new Promise((resolve, reject) => {
            const newImg = new Image();
            
            newImg.onload = () => {
                // Update the actual image
                if (img.dataset.srcset) {
                    img.srcset = newImg.srcset;
                }
                if (img.dataset.src) {
                    img.src = newImg.src;
                }
                resolve();
            };
            
            newImg.onerror = () => {
                // Try fallback image
                this.loadFallbackImage(img, newImg, resolve, reject);
            };

            // Determine which image to load
            if (supportsWebP && img.dataset.webp) {
                newImg.src = img.dataset.webp;
            } else if (img.dataset.srcset) {
                newImg.srcset = img.dataset.srcset;
            } else if (img.dataset.src) {
                newImg.src = img.dataset.src;
            } else {
                reject(new Error('No image source found'));
            }
        });
    }

    loadFallbackImage(img, newImg, resolve, reject) {
        // Try loading the fallback image
        if (img.dataset.fallback) {
            newImg.onload = () => {
                img.src = newImg.src;
                resolve();
            };
            newImg.onerror = () => reject(new Error('Fallback image failed to load'));
            newImg.src = img.dataset.fallback;
        } else if (img.dataset.src && newImg.src !== img.dataset.src) {
            // Try the regular src if WebP failed
            newImg.onload = () => {
                img.src = newImg.src;
                resolve();
            };
            newImg.onerror = () => reject(new Error('Regular image failed to load'));
            newImg.src = img.dataset.src;
        } else {
            reject(new Error('No fallback available'));
        }
    }

    checkWebPSupport() {
        return new Promise((resolve) => {
            const webP = new Image();
            webP.onload = webP.onerror = () => {
                resolve(webP.height === 2);
            };
            webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
        });
    }

    showImageLoading(img) {
        img.classList.add('loading');
        
        // Create loading placeholder if it doesn't exist
        if (!img.nextElementSibling?.classList.contains('image-loading')) {
            const loadingDiv = document.createElement('div');
            loadingDiv.className = 'image-loading';
            loadingDiv.innerHTML = '<div class="loading-spinner"></div>';
            img.parentNode.insertBefore(loadingDiv, img.nextSibling);
        }
    }

    onImageLoad(img) {
        img.classList.remove('loading');
        img.classList.add('loaded');
        
        // Remove loading indicator
        const loadingDiv = img.nextElementSibling;
        if (loadingDiv?.classList.contains('image-loading')) {
            loadingDiv.remove();
        }

        // Trigger fade-in animation
        requestAnimationFrame(() => {
            img.style.opacity = '1';
        });
    }

    onImageError(img) {
        img.classList.remove('loading');
        img.classList.add('error');
        
        // Remove loading indicator
        const loadingDiv = img.nextElementSibling;
        if (loadingDiv?.classList.contains('image-loading')) {
            loadingDiv.remove();
        }

        // Set placeholder image
        img.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlIG5vdCBhdmFpbGFibGU8L3RleHQ+PC9zdmc+';
    }

    loadAllImages() {
        // Fallback for browsers without Intersection Observer
        const lazyImages = document.querySelectorAll('img[data-src], img[data-srcset]');
        lazyImages.forEach(img => {
            this.loadImage(img);
        });
    }
}

/**
 * Loading States Manager
 */
class LoadingStatesManager {
    constructor() {
        this.activeLoaders = new Set();
        this.init();
    }

    init() {
        this.createGlobalLoadingStyles();
        this.setupFormLoadingStates();
        this.setupContentLoadingStates();
    }

    createGlobalLoadingStyles() {
        const style = document.createElement('style');
        style.textContent = `
            /* Loading States Styles */
            .loading-overlay {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(255, 255, 255, 0.9);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 9999;
                backdrop-filter: blur(2px);
            }

            .loading-spinner {
                width: 40px;
                height: 40px;
                border: 3px solid #f3f3f3;
                border-top: 3px solid var(--color-primary);
                border-radius: 50%;
                animation: spin 1s linear infinite;
                will-change: transform;
            }

            .loading-spinner-small {
                width: 20px;
                height: 20px;
                border-width: 2px;
            }

            .image-loading {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                z-index: 1;
            }

            .image-loading .loading-spinner {
                width: 30px;
                height: 30px;
                border-width: 2px;
            }

            img.loading {
                opacity: 0.3;
                transition: opacity 0.3s ease;
            }

            img.loaded {
                opacity: 1;
                transition: opacity 0.3s ease;
            }

            img.error {
                opacity: 0.7;
                filter: grayscale(100%);
            }

            /* Button loading states */
            .btn.loading {
                position: relative;
                color: transparent !important;
                pointer-events: none;
            }

            .btn.loading::after {
                content: '';
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                width: 16px;
                height: 16px;
                border: 2px solid transparent;
                border-top: 2px solid currentColor;
                border-radius: 50%;
                animation: spin 1s linear infinite;
                color: white;
            }

            /* Content loading skeleton */
            .skeleton {
                background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
                background-size: 200% 100%;
                animation: loading-skeleton 1.5s infinite;
            }

            .skeleton-text {
                height: 1em;
                margin-bottom: 0.5em;
                border-radius: 4px;
            }

            .skeleton-text:last-child {
                width: 80%;
            }

            @keyframes loading-skeleton {
                0% {
                    background-position: 200% 0;
                }
                100% {
                    background-position: -200% 0;
                }
            }

            /* Pulse loading animation */
            .pulse-loading {
                animation: pulse-loading 1.5s ease-in-out infinite;
            }

            @keyframes pulse-loading {
                0%, 100% {
                    opacity: 1;
                }
                50% {
                    opacity: 0.5;
                }
            }
        `;
        document.head.appendChild(style);
    }

    setupFormLoadingStates() {
        // Handle form submissions
        document.addEventListener('submit', (e) => {
            const form = e.target;
            if (form.tagName === 'FORM') {
                this.showFormLoading(form);
            }
        });
    }

    setupContentLoadingStates() {
        // Handle dynamic content loading
        this.observeContentChanges();
    }

    showGlobalLoading(message = 'Loading...') {
        const loaderId = 'global-loader';
        
        if (document.getElementById(loaderId)) {
            return loaderId;
        }

        const overlay = document.createElement('div');
        overlay.id = loaderId;
        overlay.className = 'loading-overlay';
        overlay.innerHTML = `
            <div class="loading-content">
                <div class="loading-spinner"></div>
                <p style="margin-top: 1rem; color: var(--color-text);">${message}</p>
            </div>
        `;
        
        document.body.appendChild(overlay);
        this.activeLoaders.add(loaderId);
        
        return loaderId;
    }

    hideGlobalLoading(loaderId = 'global-loader') {
        const overlay = document.getElementById(loaderId);
        if (overlay) {
            overlay.remove();
            this.activeLoaders.delete(loaderId);
        }
    }

    showFormLoading(form) {
        const submitBtn = form.querySelector('button[type="submit"]');
        if (submitBtn) {
            submitBtn.classList.add('loading');
            submitBtn.disabled = true;
        }

        // Add loading class to form
        form.classList.add('form-loading');
    }

    hideFormLoading(form) {
        const submitBtn = form.querySelector('button[type="submit"]');
        if (submitBtn) {
            submitBtn.classList.remove('loading');
            submitBtn.disabled = false;
        }

        form.classList.remove('form-loading');
    }

    showContentLoading(container, type = 'skeleton') {
        if (type === 'skeleton') {
            this.showSkeletonLoading(container);
        } else if (type === 'spinner') {
            this.showSpinnerLoading(container);
        } else if (type === 'pulse') {
            container.classList.add('pulse-loading');
        }
    }

    hideContentLoading(container) {
        // Remove all loading states
        container.classList.remove('pulse-loading');
        
        // Remove skeleton elements
        const skeletons = container.querySelectorAll('.skeleton');
        skeletons.forEach(skeleton => skeleton.remove());
        
        // Remove spinner overlays
        const spinners = container.querySelectorAll('.content-loading-spinner');
        spinners.forEach(spinner => spinner.remove());
    }

    showSkeletonLoading(container) {
        const skeletonHTML = `
            <div class="skeleton skeleton-text"></div>
            <div class="skeleton skeleton-text"></div>
            <div class="skeleton skeleton-text"></div>
        `;
        
        const skeletonWrapper = document.createElement('div');
        skeletonWrapper.className = 'skeleton-wrapper';
        skeletonWrapper.innerHTML = skeletonHTML;
        
        container.appendChild(skeletonWrapper);
    }

    showSpinnerLoading(container) {
        const spinner = document.createElement('div');
        spinner.className = 'content-loading-spinner';
        spinner.style.cssText = `
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            z-index: 10;
        `;
        spinner.innerHTML = '<div class="loading-spinner"></div>';
        
        container.style.position = 'relative';
        container.appendChild(spinner);
    }

    observeContentChanges() {
        // Use MutationObserver to detect content changes
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'childList') {
                    // Check for new images that need lazy loading
                    mutation.addedNodes.forEach((node) => {
                        if (node.nodeType === Node.ELEMENT_NODE) {
                            const lazyImages = node.querySelectorAll?.('img[data-src], img[data-srcset]') || [];
                            lazyImages.forEach(img => {
                                if (window.imageLazyLoader?.imageObserver) {
                                    window.imageLazyLoader.imageObserver.observe(img);
                                }
                            });
                        }
                    });
                }
            });
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }
}

/**
 * Animation Performance Optimizer
 */
class AnimationOptimizer {
    constructor() {
        this.init();
    }

    init() {
        this.optimizeAnimations();
        this.setupWillChangeOptimization();
        this.handleReducedMotion();
    }

    optimizeAnimations() {
        // Add will-change property to animated elements
        const animatedElements = document.querySelectorAll(`
            .service-card,
            .team-card,
            .hero-slider,
            .nav-menu,
            .btn,
            .form-input,
            .modal,
            .faq-answer
        `);

        animatedElements.forEach(element => {
            element.style.willChange = 'transform, opacity';
        });

        // Use transform3d for better performance
        this.enableHardwareAcceleration();
    }

    enableHardwareAcceleration() {
        const style = document.createElement('style');
        style.textContent = `
            .service-card,
            .team-card,
            .hero-slider .slider-slide,
            .btn,
            .nav-menu {
                transform: translate3d(0, 0, 0);
                backface-visibility: hidden;
                perspective: 1000px;
            }

            /* Optimize hover animations */
            .service-card:hover,
            .team-card:hover,
            .btn:hover {
                will-change: transform;
            }

            /* Remove will-change after animation */
            .service-card,
            .team-card,
            .btn {
                transition: transform var(--transition-fast), will-change 0s var(--transition-fast);
            }
        `;
        document.head.appendChild(style);
    }

    setupWillChangeOptimization() {
        // Add will-change on hover/focus, remove after animation
        document.addEventListener('mouseenter', (e) => {
            if (e.target.matches('.service-card, .team-card, .btn')) {
                e.target.style.willChange = 'transform';
            }
        }, true);

        document.addEventListener('mouseleave', (e) => {
            if (e.target.matches('.service-card, .team-card, .btn')) {
                setTimeout(() => {
                    e.target.style.willChange = 'auto';
                }, 300);
            }
        }, true);

        // Optimize scroll-triggered animations
        this.optimizeScrollAnimations();
    }

    optimizeScrollAnimations() {
        let ticking = false;

        const optimizedScrollHandler = () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    // Batch DOM reads and writes
                    this.batchScrollAnimations();
                    ticking = false;
                });
                ticking = true;
            }
        };

        window.addEventListener('scroll', optimizedScrollHandler, { passive: true });
    }

    batchScrollAnimations() {
        // Batch all scroll-related DOM operations
        const scrollY = window.scrollY;
        const windowHeight = window.innerHeight;

        // Update navigation state
        const header = document.querySelector('.header');
        if (header) {
            header.classList.toggle('scrolled', scrollY > 50);
        }

        // Update parallax elements
        const parallaxElements = document.querySelectorAll('[data-parallax]');
        parallaxElements.forEach(element => {
            const rect = element.getBoundingClientRect();
            if (rect.bottom >= 0 && rect.top <= windowHeight) {
                const speed = element.dataset.parallax || 0.5;
                const yPos = -(scrollY - element.offsetTop) * speed;
                element.style.transform = `translate3d(0, ${yPos}px, 0)`;
            }
        });
    }

    handleReducedMotion() {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            // Disable complex animations
            const style = document.createElement('style');
            style.textContent = `
                *,
                *::before,
                *::after {
                    animation-duration: 0.01ms !important;
                    animation-iteration-count: 1 !important;
                    transition-duration: 0.01ms !important;
                    scroll-behavior: auto !important;
                }
            `;
            document.head.appendChild(style);
        }
    }
}

// Initialize performance optimizations
document.addEventListener('DOMContentLoaded', () => {
    // Initialize image lazy loading
    window.imageLazyLoader = new ImageLazyLoader();
    
    // Initialize loading states manager
    window.loadingManager = new LoadingStatesManager();
    
    // Initialize animation optimizer
    window.animationOptimizer = new AnimationOptimizer();
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        ImageLazyLoader,
        LoadingStatesManager,
        AnimationOptimizer
    };
}
/**

 * Performance Monitoring and Metrics
 */
class PerformanceMonitor {
    constructor() {
        this.metrics = {};
        this.observers = [];
        this.init();
    }

    init() {
        this.setupPerformanceObserver();
        this.monitorPageLoad();
        this.monitorUserInteractions();
        this.monitorResourceLoading();
    }

    setupPerformanceObserver() {
        if ('PerformanceObserver' in window) {
            // Monitor navigation timing
            const navObserver = new PerformanceObserver((list) => {
                const entries = list.getEntries();
                entries.forEach(entry => {
                    if (entry.entryType === 'navigation') {
                        this.recordNavigationMetrics(entry);
                    }
                });
            });

            try {
                navObserver.observe({ entryTypes: ['navigation'] });
                this.observers.push(navObserver);
            } catch (e) {
                console.warn('Navigation timing not supported');
            }

            // Monitor resource loading
            const resourceObserver = new PerformanceObserver((list) => {
                const entries = list.getEntries();
                entries.forEach(entry => {
                    if (entry.entryType === 'resource') {
                        this.recordResourceMetrics(entry);
                    }
                });
            });

            try {
                resourceObserver.observe({ entryTypes: ['resource'] });
                this.observers.push(resourceObserver);
            } catch (e) {
                console.warn('Resource timing not supported');
            }

            // Monitor paint timing
            const paintObserver = new PerformanceObserver((list) => {
                const entries = list.getEntries();
                entries.forEach(entry => {
                    if (entry.entryType === 'paint') {
                        this.recordPaintMetrics(entry);
                    }
                });
            });

            try {
                paintObserver.observe({ entryTypes: ['paint'] });
                this.observers.push(paintObserver);
            } catch (e) {
                console.warn('Paint timing not supported');
            }
        }
    }

    recordNavigationMetrics(entry) {
        this.metrics.navigation = {
            domContentLoaded: entry.domContentLoadedEventEnd - entry.domContentLoadedEventStart,
            loadComplete: entry.loadEventEnd - entry.loadEventStart,
            domInteractive: entry.domInteractive - entry.navigationStart,
            firstByte: entry.responseStart - entry.navigationStart,
            dnsLookup: entry.domainLookupEnd - entry.domainLookupStart,
            tcpConnect: entry.connectEnd - entry.connectStart,
            serverResponse: entry.responseEnd - entry.responseStart,
            domProcessing: entry.domComplete - entry.domLoading,
            totalLoadTime: entry.loadEventEnd - entry.navigationStart
        };

        // Log performance metrics in development
        if (!this.isProduction()) {
            console.log('Navigation Metrics:', this.metrics.navigation);
        }
    }

    recordResourceMetrics(entry) {
        if (!this.metrics.resources) {
            this.metrics.resources = [];
        }

        const resourceMetric = {
            name: entry.name,
            type: this.getResourceType(entry.name),
            duration: entry.duration,
            size: entry.transferSize || entry.encodedBodySize,
            cached: entry.transferSize === 0 && entry.encodedBodySize > 0
        };

        this.metrics.resources.push(resourceMetric);

        // Monitor slow resources
        if (entry.duration > 1000) {
            console.warn(`Slow resource detected: ${entry.name} (${entry.duration}ms)`);
        }
    }

    recordPaintMetrics(entry) {
        if (!this.metrics.paint) {
            this.metrics.paint = {};
        }

        this.metrics.paint[entry.name] = entry.startTime;

        // Log paint metrics
        if (!this.isProduction()) {
            console.log(`${entry.name}: ${entry.startTime}ms`);
        }
    }

    monitorPageLoad() {
        // Monitor Core Web Vitals
        this.monitorLCP();
        this.monitorFID();
        this.monitorCLS();
    }

    monitorLCP() {
        // Largest Contentful Paint
        if ('PerformanceObserver' in window) {
            const lcpObserver = new PerformanceObserver((list) => {
                const entries = list.getEntries();
                const lastEntry = entries[entries.length - 1];
                
                this.metrics.lcp = lastEntry.startTime;
                
                if (lastEntry.startTime > 2500) {
                    console.warn(`Poor LCP: ${lastEntry.startTime}ms (should be < 2.5s)`);
                }
            });

            try {
                lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
                this.observers.push(lcpObserver);
            } catch (e) {
                console.warn('LCP monitoring not supported');
            }
        }
    }

    monitorFID() {
        // First Input Delay
        if ('PerformanceObserver' in window) {
            const fidObserver = new PerformanceObserver((list) => {
                const entries = list.getEntries();
                entries.forEach(entry => {
                    this.metrics.fid = entry.processingStart - entry.startTime;
                    
                    if (this.metrics.fid > 100) {
                        console.warn(`Poor FID: ${this.metrics.fid}ms (should be < 100ms)`);
                    }
                });
            });

            try {
                fidObserver.observe({ entryTypes: ['first-input'] });
                this.observers.push(fidObserver);
            } catch (e) {
                console.warn('FID monitoring not supported');
            }
        }
    }

    monitorCLS() {
        // Cumulative Layout Shift
        if ('PerformanceObserver' in window) {
            let clsValue = 0;
            
            const clsObserver = new PerformanceObserver((list) => {
                const entries = list.getEntries();
                entries.forEach(entry => {
                    if (!entry.hadRecentInput) {
                        clsValue += entry.value;
                    }
                });
                
                this.metrics.cls = clsValue;
                
                if (clsValue > 0.1) {
                    console.warn(`Poor CLS: ${clsValue} (should be < 0.1)`);
                }
            });

            try {
                clsObserver.observe({ entryTypes: ['layout-shift'] });
                this.observers.push(clsObserver);
            } catch (e) {
                console.warn('CLS monitoring not supported');
            }
        }
    }

    monitorUserInteractions() {
        // Monitor interaction responsiveness
        let interactionCount = 0;
        const interactionTimes = [];

        const monitorInteraction = (eventType) => {
            document.addEventListener(eventType, (e) => {
                const startTime = performance.now();
                
                requestAnimationFrame(() => {
                    const endTime = performance.now();
                    const duration = endTime - startTime;
                    
                    interactionTimes.push(duration);
                    interactionCount++;
                    
                    if (duration > 50) {
                        console.warn(`Slow ${eventType} interaction: ${duration}ms`);
                    }
                    
                    // Calculate average interaction time
                    if (interactionCount % 10 === 0) {
                        const avgTime = interactionTimes.reduce((a, b) => a + b, 0) / interactionTimes.length;
                        this.metrics.avgInteractionTime = avgTime;
                    }
                });
            }, { passive: true });
        };

        ['click', 'touchstart', 'keydown'].forEach(monitorInteraction);
    }

    monitorResourceLoading() {
        // Monitor image loading performance
        const images = document.querySelectorAll('img');
        let imageLoadTimes = [];

        images.forEach(img => {
            const startTime = performance.now();
            
            const onLoad = () => {
                const loadTime = performance.now() - startTime;
                imageLoadTimes.push(loadTime);
                
                if (loadTime > 2000) {
                    console.warn(`Slow image load: ${img.src} (${loadTime}ms)`);
                }
                
                img.removeEventListener('load', onLoad);
                img.removeEventListener('error', onError);
            };
            
            const onError = () => {
                console.error(`Failed to load image: ${img.src}`);
                img.removeEventListener('load', onLoad);
                img.removeEventListener('error', onError);
            };
            
            if (img.complete) {
                onLoad();
            } else {
                img.addEventListener('load', onLoad);
                img.addEventListener('error', onError);
            }
        });

        // Calculate average image load time
        setTimeout(() => {
            if (imageLoadTimes.length > 0) {
                this.metrics.avgImageLoadTime = imageLoadTimes.reduce((a, b) => a + b, 0) / imageLoadTimes.length;
            }
        }, 5000);
    }

    getResourceType(url) {
        if (url.includes('.css')) return 'css';
        if (url.includes('.js')) return 'js';
        if (url.match(/\.(jpg|jpeg|png|gif|webp|svg)$/i)) return 'image';
        if (url.match(/\.(woff|woff2|ttf|eot)$/i)) return 'font';
        return 'other';
    }

    isProduction() {
        return location.hostname !== 'localhost' && 
               location.hostname !== '127.0.0.1' && 
               !location.hostname.includes('dev');
    }

    getMetrics() {
        return this.metrics;
    }

    generateReport() {
        const report = {
            timestamp: new Date().toISOString(),
            url: location.href,
            userAgent: navigator.userAgent,
            connection: navigator.connection ? {
                effectiveType: navigator.connection.effectiveType,
                downlink: navigator.connection.downlink,
                rtt: navigator.connection.rtt
            } : null,
            metrics: this.metrics
        };

        return report;
    }

    sendMetrics() {
        // Send metrics to analytics service (implement as needed)
        if (this.isProduction()) {
            const report = this.generateReport();
            
            // Example: Send to Google Analytics or custom endpoint
            if (typeof gtag !== 'undefined') {
                gtag('event', 'performance_metrics', {
                    custom_map: {
                        lcp: this.metrics.lcp,
                        fid: this.metrics.fid,
                        cls: this.metrics.cls
                    }
                });
            }
            
            // Or send to custom endpoint
            // fetch('/api/metrics', {
            //     method: 'POST',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify(report)
            // }).catch(console.error);
        }
    }

    cleanup() {
        // Clean up observers
        this.observers.forEach(observer => {
            observer.disconnect();
        });
        this.observers = [];
    }
}

// Initialize performance monitoring
document.addEventListener('DOMContentLoaded', () => {
    window.performanceMonitor = new PerformanceMonitor();
    
    // Send metrics after page is fully loaded
    window.addEventListener('load', () => {
        setTimeout(() => {
            if (window.performanceMonitor) {
                window.performanceMonitor.sendMetrics();
            }
        }, 2000);
    });
});

// Clean up on page unload
window.addEventListener('beforeunload', () => {
    if (window.performanceMonitor) {
        window.performanceMonitor.cleanup();
    }
});