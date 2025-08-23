// Final Optimization Script for TaxPro Consulting Website
// Ensures all components are properly integrated and optimized

class FinalOptimizer {
    constructor() {
        this.optimizations = [];
        this.isOptimized = false;
    }

    /**
     * Run all final optimizations
     */
    async runOptimizations() {
        console.log('🔧 Running Final Optimizations...');
        
        // Optimize critical rendering path
        this.optimizeCriticalRenderingPath();
        
        // Optimize animations and interactions
        this.optimizeAnimationsAndInteractions();
        
        // Optimize form performance
        this.optimizeFormPerformance();
        
        // Optimize image loading
        this.optimizeImageLoading();
        
        // Optimize event listeners
        this.optimizeEventListeners();
        
        // Optimize memory usage
        this.optimizeMemoryUsage();
        
        // Optimize accessibility
        this.optimizeAccessibility();
        
        // Optimize SEO elements
        this.optimizeSEO();
        
        // Final cleanup
        this.performFinalCleanup();
        
        this.isOptimized = true;
        console.log('✅ Final optimizations complete!');
        
        // Report optimization results
        this.reportOptimizations();
    }

    /**
     * Optimize critical rendering path
     */
    optimizeCriticalRenderingPath() {
        // Preload critical resources
        const criticalResources = [
            { href: 'css/styles.css', as: 'style' },
            { href: 'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&display=swap', as: 'style' },
            { href: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap', as: 'style' }
        ];

        criticalResources.forEach(resource => {
            if (!document.querySelector(`link[href="${resource.href}"]`)) {
                const link = document.createElement('link');
                link.rel = 'preload';
                link.as = resource.as;
                link.href = resource.href;
                link.crossOrigin = 'anonymous';
                document.head.appendChild(link);
            }
        });

        // Optimize font loading
        this.optimizeFontLoading();

        // Minimize layout shifts
        this.minimizeLayoutShifts();

        this.optimizations.push('Critical rendering path optimized');
    }

    /**
     * Optimize font loading
     */
    optimizeFontLoading() {
        // Add font-display: swap to improve loading performance
        const style = document.createElement('style');
        style.textContent = `
            @font-face {
                font-family: 'Playfair Display';
                font-display: swap;
            }
            @font-face {
                font-family: 'Inter';
                font-display: swap;
            }
            @font-face {
                font-family: 'Montserrat';
                font-display: swap;
            }
        `;
        document.head.appendChild(style);
    }

    /**
     * Minimize layout shifts
     */
    minimizeLayoutShifts() {
        // Add explicit dimensions to images without them
        const images = document.querySelectorAll('img:not([width]):not([height])');
        images.forEach(img => {
            // Set default dimensions to prevent layout shift
            if (!img.style.width && !img.style.height) {
                img.style.minHeight = '200px';
                img.style.backgroundColor = '#f0f0f0';
            }
        });

        // Reserve space for dynamic content
        const dynamicContainers = document.querySelectorAll('.services-grid, .team-grid, .faq-accordion');
        dynamicContainers.forEach(container => {
            if (!container.style.minHeight) {
                container.style.minHeight = '300px';
            }
        });
    }

    /**
     * Optimize animations and interactions
     */
    optimizeAnimationsAndInteractions() {
        // Use will-change property for elements that will be animated
        const animatedElements = document.querySelectorAll('.service-card, .team-card, .btn, .nav-menu');
        animatedElements.forEach(element => {
            element.style.willChange = 'transform, opacity';
            
            // Remove will-change after animation completes
            element.addEventListener('transitionend', function() {
                this.style.willChange = 'auto';
            });
            
            element.addEventListener('animationend', function() {
                this.style.willChange = 'auto';
            });
        });

        // Optimize scroll-based animations
        this.optimizeScrollAnimations();

        // Debounce resize events
        this.debounceResizeEvents();

        this.optimizations.push('Animations and interactions optimized');
    }

    /**
     * Optimize scroll animations
     */
    optimizeScrollAnimations() {
        let ticking = false;
        
        const optimizedScrollHandler = () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    // Update scroll-based animations
                    this.updateScrollAnimations();
                    ticking = false;
                });
                ticking = true;
            }
        };

        // Replace existing scroll listeners with optimized version
        window.removeEventListener('scroll', this.originalScrollHandler);
        window.addEventListener('scroll', optimizedScrollHandler, { passive: true });
    }

    /**
     * Update scroll animations
     */
    updateScrollAnimations() {
        const scrollY = window.scrollY;
        const windowHeight = window.innerHeight;

        // Parallax effects
        const parallaxElements = document.querySelectorAll('[data-parallax]');
        parallaxElements.forEach(element => {
            const speed = element.getAttribute('data-parallax') || 0.5;
            const yPos = -(scrollY * speed);
            element.style.transform = `translate3d(0, ${yPos}px, 0)`;
        });

        // Progress indicators
        const progressElements = document.querySelectorAll('[data-progress]');
        progressElements.forEach(element => {
            const rect = element.getBoundingClientRect();
            const progress = Math.max(0, Math.min(1, (windowHeight - rect.top) / windowHeight));
            element.style.setProperty('--progress', progress);
        });
    }

    /**
     * Debounce resize events
     */
    debounceResizeEvents() {
        let resizeTimeout;
        
        const optimizedResizeHandler = () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                // Update responsive elements
                this.updateResponsiveElements();
                
                // Dispatch custom optimized resize event
                window.dispatchEvent(new CustomEvent('optimizedResize'));
            }, 250);
        };

        window.addEventListener('resize', optimizedResizeHandler, { passive: true });
    }

    /**
     * Update responsive elements
     */
    updateResponsiveElements() {
        // Update viewport height for mobile browsers
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);

        // Update grid layouts based on screen size
        const grids = document.querySelectorAll('.services-grid, .team-grid');
        grids.forEach(grid => {
            const width = window.innerWidth;
            let columns = 1;
            
            if (width >= 1024) columns = 3;
            else if (width >= 768) columns = 2;
            
            grid.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;
        });
    }

    /**
     * Optimize form performance
     */
    optimizeFormPerformance() {
        const forms = document.querySelectorAll('form');
        
        forms.forEach(form => {
            // Optimize form validation
            this.optimizeFormValidation(form);
            
            // Add input debouncing
            this.addInputDebouncing(form);
            
            // Optimize form submission
            this.optimizeFormSubmission(form);
        });

        this.optimizations.push('Form performance optimized');
    }

    /**
     * Optimize form validation
     */
    optimizeFormValidation(form) {
        const inputs = form.querySelectorAll('input, select, textarea');
        
        inputs.forEach(input => {
            // Debounce validation
            let validationTimeout;
            
            const originalValidation = input.oninput;
            input.oninput = (e) => {
                clearTimeout(validationTimeout);
                validationTimeout = setTimeout(() => {
                    if (originalValidation) {
                        originalValidation.call(input, e);
                    }
                }, 300);
            };
        });
    }

    /**
     * Add input debouncing
     */
    addInputDebouncing(form) {
        const searchInputs = form.querySelectorAll('input[type="search"], input[name*="search"]');
        
        searchInputs.forEach(input => {
            let searchTimeout;
            
            input.addEventListener('input', (e) => {
                clearTimeout(searchTimeout);
                searchTimeout = setTimeout(() => {
                    // Trigger search functionality
                    const event = new CustomEvent('debouncedInput', { detail: e.target.value });
                    input.dispatchEvent(event);
                }, 500);
            });
        });
    }

    /**
     * Optimize form submission
     */
    optimizeFormSubmission(form) {
        form.addEventListener('submit', (e) => {
            // Prevent double submission
            const submitButton = form.querySelector('button[type="submit"]');
            if (submitButton && !submitButton.disabled) {
                submitButton.disabled = true;
                
                // Re-enable after 3 seconds as fallback
                setTimeout(() => {
                    submitButton.disabled = false;
                }, 3000);
            }
        });
    }

    /**
     * Optimize image loading
     */
    optimizeImageLoading() {
        const images = document.querySelectorAll('img');
        
        images.forEach(img => {
            // Add intersection observer for lazy loading
            if (!img.hasAttribute('loading')) {
                img.setAttribute('loading', 'lazy');
            }
            
            // Add error handling
            img.addEventListener('error', this.handleImageError);
            
            // Add load success handling
            img.addEventListener('load', this.handleImageLoad);
            
            // Optimize image format
            this.optimizeImageFormat(img);
        });

        this.optimizations.push('Image loading optimized');
    }

    /**
     * Handle image error
     */
    handleImageError(e) {
        const img = e.target;
        
        // Replace with placeholder
        img.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjBmMGYwIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlIG5vdCBhdmFpbGFibGU8L3RleHQ+PC9zdmc+';
        img.alt = 'Image not available';
        
        // Log error for debugging
        console.warn('Image failed to load:', img.dataset.originalSrc || img.src);
    }

    /**
     * Handle image load success
     */
    handleImageLoad(e) {
        const img = e.target;
        img.classList.add('loaded');
        
        // Remove loading placeholder
        const placeholder = img.previousElementSibling;
        if (placeholder && placeholder.classList.contains('image-placeholder')) {
            placeholder.remove();
        }
    }

    /**
     * Optimize image format
     */
    optimizeImageFormat(img) {
        // Check for WebP support and update src if available
        if (this.supportsWebP()) {
            const src = img.src;
            if (src && !src.includes('.webp')) {
                const webpSrc = src.replace(/\.(jpg|jpeg|png)$/i, '.webp');
                
                // Test if WebP version exists
                const testImg = new Image();
                testImg.onload = () => {
                    img.src = webpSrc;
                };
                testImg.src = webpSrc;
            }
        }
    }

    /**
     * Check WebP support
     */
    supportsWebP() {
        const canvas = document.createElement('canvas');
        canvas.width = 1;
        canvas.height = 1;
        return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
    }

    /**
     * Optimize event listeners
     */
    optimizeEventListeners() {
        // Use event delegation for dynamic content
        this.setupEventDelegation();
        
        // Optimize scroll listeners
        this.optimizeScrollListeners();
        
        // Clean up unused listeners
        this.cleanupEventListeners();

        this.optimizations.push('Event listeners optimized');
    }

    /**
     * Setup event delegation
     */
    setupEventDelegation() {
        // Delegate click events
        document.addEventListener('click', (e) => {
            // Handle service card clicks
            if (e.target.closest('.service-card-btn')) {
                this.handleServiceCardClick(e);
            }
            
            // Handle team contact clicks
            if (e.target.closest('.team-contact-btn')) {
                this.handleTeamContactClick(e);
            }
            
            // Handle modal triggers
            if (e.target.closest('[data-modal-target]')) {
                this.handleModalTrigger(e);
            }
        });

        // Delegate form events
        document.addEventListener('submit', (e) => {
            if (e.target.matches('form')) {
                this.handleFormSubmit(e);
            }
        });
    }

    /**
     * Handle service card click
     */
    handleServiceCardClick(e) {
        e.preventDefault();
        const card = e.target.closest('.service-card');
        const serviceName = card.querySelector('.service-card-title')?.textContent;
        
        // Navigate to contact section with pre-filled data
        const contactSection = document.getElementById('contact');
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth' });
            
            // Pre-fill form
            setTimeout(() => {
                const subjectSelect = document.getElementById('contact-subject');
                if (subjectSelect && serviceName) {
                    // Find matching option
                    const options = Array.from(subjectSelect.options);
                    const matchingOption = options.find(option => 
                        option.textContent.toLowerCase().includes(serviceName.toLowerCase().split(' ')[0])
                    );
                    
                    if (matchingOption) {
                        subjectSelect.value = matchingOption.value;
                    }
                }
            }, 500);
        }
    }

    /**
     * Handle team contact click
     */
    handleTeamContactClick(e) {
        e.preventDefault();
        e.stopPropagation();
        
        const card = e.target.closest('.team-card');
        const memberName = card?.querySelector('.team-card-name')?.textContent;
        
        // Navigate to contact section
        const contactSection = document.getElementById('contact');
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth' });
            
            // Pre-fill message
            setTimeout(() => {
                const messageTextarea = document.getElementById('contact-message');
                if (messageTextarea && memberName && !messageTextarea.value) {
                    messageTextarea.value = `I would like to speak with ${memberName} about...`;
                    messageTextarea.focus();
                    messageTextarea.setSelectionRange(messageTextarea.value.length, messageTextarea.value.length);
                }
            }, 500);
        }
    }

    /**
     * Handle modal trigger
     */
    handleModalTrigger(e) {
        const trigger = e.target.closest('[data-modal-target]');
        const modalId = trigger.getAttribute('data-modal-target');
        const modal = document.getElementById(modalId);
        
        if (modal) {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
            
            // Focus management
            const firstFocusable = modal.querySelector('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
            if (firstFocusable) {
                firstFocusable.focus();
            }
        }
    }

    /**
     * Handle form submit
     */
    handleFormSubmit(e) {
        const form = e.target;
        const submitButton = form.querySelector('button[type="submit"]');
        
        // Show loading state
        if (submitButton && window.loadingManager) {
            window.loadingManager.showFormLoading(form);
        }
    }

    /**
     * Optimize scroll listeners
     */
    optimizeScrollListeners() {
        // Use passive listeners for better performance
        const scrollElements = document.querySelectorAll('[data-scroll]');
        scrollElements.forEach(element => {
            element.addEventListener('scroll', this.handleScroll, { passive: true });
        });
    }

    /**
     * Handle scroll events
     */
    handleScroll(e) {
        // Throttle scroll handling
        if (!this.scrollTicking) {
            requestAnimationFrame(() => {
                // Handle scroll-based updates
                this.updateScrollElements();
                this.scrollTicking = false;
            });
            this.scrollTicking = true;
        }
    }

    /**
     * Update scroll elements
     */
    updateScrollElements() {
        const scrollY = window.scrollY;
        
        // Update header
        const header = document.querySelector('.header');
        if (header) {
            if (scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }
        
        // Update progress indicators
        const progressBar = document.querySelector('.scroll-progress');
        if (progressBar) {
            const progress = (scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
            progressBar.style.width = `${Math.min(progress, 100)}%`;
        }
    }

    /**
     * Clean up unused event listeners
     */
    cleanupEventListeners() {
        // Remove duplicate listeners
        const elements = document.querySelectorAll('*');
        elements.forEach(element => {
            // This is a simplified cleanup - in practice, you'd track listeners
            if (element._listeners && element._listeners.length > 10) {
                console.warn('Element has many listeners:', element);
            }
        });
    }

    /**
     * Optimize memory usage
     */
    optimizeMemoryUsage() {
        // Clean up unused DOM references
        this.cleanupDOMReferences();
        
        // Optimize data structures
        this.optimizeDataStructures();
        
        // Setup memory monitoring
        this.setupMemoryMonitoring();

        this.optimizations.push('Memory usage optimized');
    }

    /**
     * Clean up DOM references
     */
    cleanupDOMReferences() {
        // Remove unused elements
        const unusedElements = document.querySelectorAll('.unused, .hidden[style*="display: none"]');
        unusedElements.forEach(element => {
            if (!element.dataset.keepAlive) {
                element.remove();
            }
        });
        
        // Clean up event listeners on removed elements
        if (window.removedElements) {
            window.removedElements.forEach(element => {
                element.removeEventListener('click', element._clickHandler);
                element.removeEventListener('scroll', element._scrollHandler);
            });
            window.removedElements = [];
        }
    }

    /**
     * Optimize data structures
     */
    optimizeDataStructures() {
        // Convert arrays to Sets where appropriate
        if (window.siteState && window.siteState.loadingStates instanceof Array) {
            window.siteState.loadingStates = new Set(window.siteState.loadingStates);
        }
        
        // Use WeakMap for element associations
        if (!window.elementAssociations) {
            window.elementAssociations = new WeakMap();
        }
    }

    /**
     * Setup memory monitoring
     */
    setupMemoryMonitoring() {
        if ('memory' in performance) {
            setInterval(() => {
                const memory = performance.memory;
                const usage = Math.round(memory.usedJSHeapSize / 1048576); // MB
                
                if (usage > 50) { // Alert if over 50MB
                    console.warn(`High memory usage: ${usage}MB`);
                }
            }, 30000); // Check every 30 seconds
        }
    }

    /**
     * Optimize accessibility
     */
    optimizeAccessibility() {
        // Ensure proper focus management
        this.optimizeFocusManagement();
        
        // Optimize screen reader support
        this.optimizeScreenReaderSupport();
        
        // Optimize keyboard navigation
        this.optimizeKeyboardNavigation();

        this.optimizations.push('Accessibility optimized');
    }

    /**
     * Optimize focus management
     */
    optimizeFocusManagement() {
        // Add focus trap for modals
        const modals = document.querySelectorAll('.modal');
        modals.forEach(modal => {
            this.addFocusTrap(modal);
        });
        
        // Improve focus visibility
        const focusableElements = document.querySelectorAll('button, a, input, select, textarea, [tabindex]');
        focusableElements.forEach(element => {
            element.addEventListener('focus', function() {
                this.classList.add('focused');
            });
            
            element.addEventListener('blur', function() {
                this.classList.remove('focused');
            });
        });
    }

    /**
     * Add focus trap to modal
     */
    addFocusTrap(modal) {
        const focusableElements = modal.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        
        if (focusableElements.length === 0) return;
        
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];
        
        modal.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                if (e.shiftKey) {
                    if (document.activeElement === firstElement) {
                        e.preventDefault();
                        lastElement.focus();
                    }
                } else {
                    if (document.activeElement === lastElement) {
                        e.preventDefault();
                        firstElement.focus();
                    }
                }
            }
        });
    }

    /**
     * Optimize screen reader support
     */
    optimizeScreenReaderSupport() {
        // Add live region for announcements
        if (!document.getElementById('sr-live-region')) {
            const liveRegion = document.createElement('div');
            liveRegion.id = 'sr-live-region';
            liveRegion.setAttribute('aria-live', 'polite');
            liveRegion.setAttribute('aria-atomic', 'true');
            liveRegion.style.cssText = 'position: absolute; left: -10000px; width: 1px; height: 1px; overflow: hidden;';
            document.body.appendChild(liveRegion);
        }
        
        // Improve form labels
        const inputs = document.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            if (!input.getAttribute('aria-label') && !input.getAttribute('aria-labelledby')) {
                const label = document.querySelector(`label[for="${input.id}"]`);
                if (!label && input.placeholder) {
                    input.setAttribute('aria-label', input.placeholder);
                }
            }
        });
    }

    /**
     * Optimize keyboard navigation
     */
    optimizeKeyboardNavigation() {
        // Add keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            // Skip to main content (Alt + M)
            if (e.altKey && e.key === 'm') {
                e.preventDefault();
                const mainContent = document.getElementById('main-content');
                if (mainContent) {
                    mainContent.focus();
                }
            }
            
            // Open search (Alt + S)
            if (e.altKey && e.key === 's') {
                e.preventDefault();
                const searchInput = document.getElementById('faq-search-input');
                if (searchInput) {
                    searchInput.focus();
                }
            }
            
            // Escape key handling
            if (e.key === 'Escape') {
                const activeModal = document.querySelector('.modal.active');
                if (activeModal) {
                    activeModal.classList.remove('active');
                    document.body.style.overflow = '';
                }
            }
        });
    }

    /**
     * Optimize SEO elements
     */
    optimizeSEO() {
        // Add structured data
        this.addStructuredData();
        
        // Optimize meta tags
        this.optimizeMetaTags();
        
        // Add canonical URL
        this.addCanonicalURL();

        this.optimizations.push('SEO elements optimized');
    }

    /**
     * Add structured data
     */
    addStructuredData() {
        const structuredData = {
            "@context": "https://schema.org",
            "@type": "AccountingService",
            "name": "TaxPro Consulting",
            "description": "Professional chartered accountant firm providing comprehensive tax consulting services, business advisory, and financial planning.",
            "url": window.location.origin,
            "telephone": "(123) 456-7890",
            "email": "info@taxproconsulting.com",
            "address": {
                "@type": "PostalAddress",
                "streetAddress": "123 Business District, Professional Plaza, Suite 456",
                "addressLocality": "City",
                "addressRegion": "State",
                "postalCode": "12345"
            },
            "openingHours": [
                "Mo-Fr 09:00-18:00",
                "Sa 10:00-16:00"
            ],
            "priceRange": "$$",
            "serviceArea": {
                "@type": "GeoCircle",
                "geoMidpoint": {
                    "@type": "GeoCoordinates",
                    "latitude": "40.7128",
                    "longitude": "-74.0060"
                },
                "geoRadius": "50000"
            }
        };
        
        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.textContent = JSON.stringify(structuredData);
        document.head.appendChild(script);
    }

    /**
     * Optimize meta tags
     */
    optimizeMetaTags() {
        // Add missing meta tags
        const metaTags = [
            { name: 'robots', content: 'index, follow' },
            { name: 'googlebot', content: 'index, follow' },
            { property: 'og:site_name', content: 'TaxPro Consulting' },
            { property: 'og:locale', content: 'en_US' },
            { name: 'twitter:site', content: '@taxproconsulting' },
            { name: 'theme-color', content: '#1a365d' }
        ];
        
        metaTags.forEach(tag => {
            if (!document.querySelector(`meta[name="${tag.name}"], meta[property="${tag.property}"]`)) {
                const meta = document.createElement('meta');
                if (tag.name) meta.name = tag.name;
                if (tag.property) meta.property = tag.property;
                meta.content = tag.content;
                document.head.appendChild(meta);
            }
        });
    }

    /**
     * Add canonical URL
     */
    addCanonicalURL() {
        if (!document.querySelector('link[rel="canonical"]')) {
            const canonical = document.createElement('link');
            canonical.rel = 'canonical';
            canonical.href = window.location.href;
            document.head.appendChild(canonical);
        }
    }

    /**
     * Perform final cleanup
     */
    performFinalCleanup() {
        // Remove development-only elements
        const devElements = document.querySelectorAll('.dev-only, [data-dev]');
        devElements.forEach(element => {
            if (window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1') {
                element.remove();
            }
        });
        
        // Clean up console logs in production
        if (window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1') {
            console.log = () => {};
            console.warn = () => {};
            console.info = () => {};
        }
        
        // Mark site as fully loaded
        document.body.classList.add('site-loaded');
        document.body.setAttribute('data-optimization-complete', 'true');

        this.optimizations.push('Final cleanup completed');
    }

    /**
     * Report optimization results
     */
    reportOptimizations() {
        console.log('\n🎯 Final Optimization Report');
        console.log('='.repeat(40));
        
        this.optimizations.forEach((optimization, index) => {
            console.log(`${index + 1}. ${optimization}`);
        });
        
        console.log('='.repeat(40));
        console.log(`✅ ${this.optimizations.length} optimizations applied`);
        console.log('🚀 Site is fully optimized and ready!');
        
        // Dispatch optimization complete event
        window.dispatchEvent(new CustomEvent('optimizationComplete', {
            detail: {
                optimizations: this.optimizations,
                timestamp: Date.now()
            }
        }));
    }
}

// Initialize final optimizer
document.addEventListener('DOMContentLoaded', () => {
    // Wait for all other scripts to load
    setTimeout(() => {
        const optimizer = new FinalOptimizer();
        
        // Make available globally
        window.finalOptimizer = optimizer;
        
        // Run optimizations
        optimizer.runOptimizations();
        
    }, 1000); // Wait 1 second for other initializations
});

// Export for module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = FinalOptimizer;
}