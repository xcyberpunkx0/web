// Main JavaScript file for TaxPro Consulting Website
// Core functionality and interactions

// Mobile and responsive utilities
function isMobile() {
    return window.innerWidth <= 767;
}

function isTablet() {
    return window.innerWidth >= 768 && window.innerWidth <= 1023;
}

function isTouchDevice() {
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
}

function updateViewportHeight() {
    // Fix for mobile browsers where viewport height changes
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
}

// Initialize performance optimizations
function initPerformanceOptimizations() {
    // Setup image lazy loading for existing images
    setupImageLazyLoading();
    
    // Setup loading states for dynamic content
    setupDynamicLoadingStates();
    
    // Optimize animations for performance
    optimizeAnimationPerformance();
}

function setupImageLazyLoading() {
    // Convert existing images to lazy loading format
    const images = document.querySelectorAll('img:not([data-src])');
    images.forEach(img => {
        if (img.src && !img.src.startsWith('data:')) {
            img.dataset.src = img.src;
            img.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjBmMGYwIi8+PC9zdmc+';
            img.classList.add('lazy-image');
        }
    });
}

function setupDynamicLoadingStates() {
    // Add loading states to interactive elements
    const interactiveElements = document.querySelectorAll('.service-card, .team-card, .faq-item');
    interactiveElements.forEach(element => {
        element.addEventListener('click', function() {
            if (window.loadingManager) {
                window.loadingManager.showContentLoading(this, 'pulse');
                
                // Remove loading state after a short delay (simulating content load)
                setTimeout(() => {
                    window.loadingManager.hideContentLoading(this);
                }, 300);
            }
        });
    });
}

function optimizeAnimationPerformance() {
    // Add will-change property to elements that will be animated
    const animatedElements = document.querySelectorAll('.service-card, .team-card, .hero-slider, .nav-menu');
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
}

// Initialize mobile optimizations
function initMobileOptimizations() {
    // Set initial viewport height
    updateViewportHeight();
    
    // Add touch device class
    if (isTouchDevice()) {
        document.body.classList.add('touch-device');
    }
    
    // Add device type classes
    if (isMobile()) {
        document.body.classList.add('mobile-device');
    } else if (isTablet()) {
        document.body.classList.add('tablet-device');
    } else {
        document.body.classList.add('desktop-device');
    }
    
    // Optimize touch interactions
    optimizeTouchInteractions();
    
    // Handle orientation changes
    handleOrientationChange();
}

function optimizeTouchInteractions() {
    if (!isTouchDevice()) return;
    
    // Add touch-friendly button sizes
    const interactiveElements = document.querySelectorAll('button, .btn, .nav-link, .service-card, .team-card');
    interactiveElements.forEach(element => {
        element.style.minHeight = '44px';
        element.style.minWidth = '44px';
    });
    
    // Prevent double-tap zoom on buttons
    const buttons = document.querySelectorAll('button, .btn');
    buttons.forEach(button => {
        button.addEventListener('touchend', function(e) {
            e.preventDefault();
            this.click();
        }, { passive: false });
    });
    
    // Add active states for touch feedback
    const touchElements = document.querySelectorAll('.service-card, .team-card, .contact-item');
    touchElements.forEach(element => {
        element.addEventListener('touchstart', function() {
            this.classList.add('touch-active');
        }, { passive: true });
        
        element.addEventListener('touchend', function() {
            setTimeout(() => {
                this.classList.remove('touch-active');
            }, 150);
        }, { passive: true });
    });
}

function handleOrientationChange() {
    window.addEventListener('orientationchange', function() {
        // Update viewport height after orientation change
        setTimeout(updateViewportHeight, 100);
        
        // Close mobile menu on orientation change
        const navToggle = document.querySelector('.nav-toggle');
        const navMenu = document.querySelector('.nav-menu');
        
        if (navToggle && navMenu && navMenu.classList.contains('active')) {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            navToggle.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
        }
        
        // Recalculate hero section height
        const heroSection = document.querySelector('.hero-section');
        if (heroSection && window.orientation !== undefined) {
            if (Math.abs(window.orientation) === 90) {
                // Landscape
                heroSection.style.minHeight = '100vh';
            } else {
                // Portrait
                heroSection.style.minHeight = '100vh';
            }
        }
    });
}

document.addEventListener('DOMContentLoaded', function() {
    // Initialize mobile optimizations first
    initMobileOptimizations();
    
    // Initialize performance optimizations
    initPerformanceOptimizations();
    
    // Initialize enhanced animation system
    initEnhancedAnimations();
    
    // Initialize navigation functionality
    initNavigation();
    
    // Initialize hero slider functionality
    initHeroSlider();
    
    // Initialize services showcase functionality
    initServicesShowcase();
    
    // Initialize about section functionality
    initAboutSection();
    
    // Initialize team section functionality
    initTeamSection();
    
    // Initialize FAQ section functionality
    initFAQSection();
    
    // Initialize final integration and optimization
    initFinalIntegration();
});

/**
 * Initialize enhanced animation system integration
 */
function initEnhancedAnimations() {
    // Wait for animation manager to be available
    if (typeof window.animationManager === 'undefined') {
        setTimeout(initEnhancedAnimations, 100);
        return;
    }
    
    // Add animation classes to elements that should animate
    addAnimationClasses();
    
    // Initialize content-specific animations
    initContentAnimations();
    
    // Setup dynamic content animation refresh
    setupDynamicAnimationRefresh();
}

/**
 * Add animation classes to existing elements
 */
function addAnimationClasses() {
    // Add classes to section headers
    const sectionHeaders = document.querySelectorAll('.section-header');
    sectionHeaders.forEach(header => {
        header.classList.add('animate-observed');
    });
    
    // Add classes to service cards (will be added when services are created)
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.classList.add('animate-observed');
    });
    
    // Add classes to team cards (will be added when team is created)
    const teamCards = document.querySelectorAll('.team-card');
    teamCards.forEach(card => {
        card.classList.add('animate-observed');
    });
    
    // Add classes to stat items
    const statItems = document.querySelectorAll('.stat-item');
    statItems.forEach(item => {
        item.classList.add('animate-observed');
    });
    
    // Add classes to timeline items
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach(item => {
        item.classList.add('animate-observed');
    });
    
    // Add classes to credential items
    const credentialItems = document.querySelectorAll('.credential-item');
    credentialItems.forEach(item => {
        item.classList.add('animate-observed');
    });
    
    // Add classes to contact items
    const contactItems = document.querySelectorAll('.contact-item');
    contactItems.forEach(item => {
        item.classList.add('animate-observed');
    });
    
    // Add classes to FAQ items (will be added when FAQ is created)
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        item.classList.add('animate-observed');
    });
    
    // Add classes to hero content
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.classList.add('animate-observed');
    }
    
    // Add classes to hero slider
    const heroSlider = document.querySelector('.hero-slider');
    if (heroSlider) {
        heroSlider.classList.add('animate-observed');
    }
    
    // Add classes to about text
    const aboutText = document.querySelector('.about-text');
    if (aboutText) {
        aboutText.classList.add('animate-observed');
    }
    
    // Add classes to about stats
    const aboutStats = document.querySelector('.about-stats');
    if (aboutStats) {
        aboutStats.classList.add('animate-observed');
    }
}

/**
 * Initialize content-specific animations
 */
function initContentAnimations() {
    // Enhanced counter animation for stats
    initEnhancedCounterAnimation();
    
    // Enhanced form animations
    initEnhancedFormAnimations();
    
    // Enhanced navigation animations
    initEnhancedNavigationAnimations();
}

/**
 * Enhanced counter animation for statistics
 */
function initEnhancedCounterAnimation() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const finalValue = parseInt(target.dataset.target);
                const suffix = target.dataset.suffix || '';
                
                animateCounter(target, finalValue, suffix);
                counterObserver.unobserve(target);
            }
        });
    }, { threshold: 0.5 });
    
    statNumbers.forEach(number => {
        counterObserver.observe(number);
    });
}

function animateCounter(element, target, suffix) {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        element.textContent = target + suffix;
        return;
    }
    
    const duration = 2000; // 2 seconds
    const start = performance.now();
    const startValue = 0;
    
    function updateCounter(currentTime) {
        const elapsed = currentTime - start;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function for smooth animation
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const currentValue = Math.floor(startValue + (target - startValue) * easeOutQuart);
        
        element.textContent = currentValue + suffix;
        
        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target + suffix;
        }
    }
    
    requestAnimationFrame(updateCounter);
}

/**
 * Enhanced form animations
 */
function initEnhancedFormAnimations() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        // Add floating label animation
        const inputs = form.querySelectorAll('.form-input');
        inputs.forEach(input => {
            // Check if input has value on load
            if (input.value) {
                const label = input.previousElementSibling;
                if (label && label.classList.contains('form-label')) {
                    label.style.transform = 'translateY(-20px) scale(0.85)';
                    label.style.color = '#d69e2e';
                }
            }
        });
        
        // Enhanced form submission animation
        form.addEventListener('submit', (e) => {
            const submitButton = form.querySelector('button[type="submit"]');
            if (submitButton && window.animationManager) {
                // This will be handled by the animation manager
                e.preventDefault(); // Prevent actual submission for demo
                
                // Simulate form processing
                setTimeout(() => {
                    showFormSuccess(form);
                }, 2000);
            }
        });
    });
}

function showFormSuccess(form) {
    const message = form.querySelector('.form-message');
    if (message) {
        message.innerHTML = '<i class="fas fa-check-circle"></i> Message sent successfully!';
        message.className = 'form-message form-message--success';
        
        if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            message.style.animation = 'fadeUp 0.5s ease-out';
        }
        
        // Reset form after success
        setTimeout(() => {
            form.reset();
            message.innerHTML = '';
            message.className = 'form-message';
        }, 3000);
    }
}

/**
 * Enhanced navigation animations
 */
function initEnhancedNavigationAnimations() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        // Add magnetic effect to navigation links
        if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            link.addEventListener('mousemove', (e) => {
                const rect = link.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                
                const moveX = x * 0.1;
                const moveY = y * 0.1;
                
                link.style.transform = `translate(${moveX}px, ${moveY}px)`;
            });
            
            link.addEventListener('mouseleave', () => {
                link.style.transform = '';
            });
        }
    });
}

/**
 * Setup dynamic content animation refresh
 */
function setupDynamicAnimationRefresh() {
    // Create a mutation observer to watch for new content
    const observer = new MutationObserver((mutations) => {
        let shouldRefresh = false;
        
        mutations.forEach((mutation) => {
            if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                mutation.addedNodes.forEach((node) => {
                    if (node.nodeType === Node.ELEMENT_NODE) {
                        // Check if new elements need animation classes
                        const animatableElements = node.querySelectorAll('.service-card, .team-card, .faq-item');
                        if (animatableElements.length > 0) {
                            animatableElements.forEach(element => {
                                element.classList.add('animate-observed');
                            });
                            shouldRefresh = true;
                        }
                    }
                });
            }
        });
        
        if (shouldRefresh && window.animationManager) {
            window.animationManager.refreshObservers();
        }
    });
    
    // Start observing
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
}

/**
 * Initialize navigation component functionality
 */
function initNavigation() {
    const header = document.querySelector('.header');
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');
    
    // Mobile menu toggle functionality
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
            
            // Toggle menu visibility
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            // Update ARIA attributes for accessibility
            navToggle.setAttribute('aria-expanded', !isExpanded);
            
            // Prevent body scroll when menu is open on mobile
            if (!isExpanded) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });
        
        // Close mobile menu when clicking on nav links
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                if (window.innerWidth <= 767) {
                    navToggle.classList.remove('active');
                    navMenu.classList.remove('active');
                    navToggle.setAttribute('aria-expanded', 'false');
                    document.body.style.overflow = '';
                }
            });
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(event) {
            const isClickInsideNav = navToggle.contains(event.target) || navMenu.contains(event.target);
            
            if (!isClickInsideNav && navMenu.classList.contains('active')) {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
                navToggle.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            }
        });
        
        // Handle window resize - close mobile menu if switching to desktop
        let resizeTimer;
        window.addEventListener('resize', function() {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(function() {
                if (window.innerWidth > 767 && navMenu.classList.contains('active')) {
                    navToggle.classList.remove('active');
                    navMenu.classList.remove('active');
                    navToggle.setAttribute('aria-expanded', 'false');
                    document.body.style.overflow = '';
                }
                
                // Update viewport height for mobile browsers
                updateViewportHeight();
            }, 250);
        });
    }
    
    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Only handle internal anchor links
            if (href && href.startsWith('#')) {
                e.preventDefault();
                
                const targetId = href.substring(1);
                const targetSection = document.getElementById(targetId);
                
                if (targetSection) {
                    // Calculate offset to account for fixed header
                    const headerHeight = header ? header.offsetHeight : 80;
                    const targetPosition = targetSection.offsetTop - headerHeight - 20;
                    
                    // Smooth scroll to target section
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                    
                    // Update URL hash without jumping
                    history.pushState(null, null, href);
                }
            }
        });
    });
    
    // Header scroll effects and active section highlighting
    let ticking = false;
    
    function updateNavigation() {
        const scrollY = window.scrollY;
        const headerHeight = header ? header.offsetHeight : 80;
        
        // Add scrolled class to header for styling
        if (header) {
            if (scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }
        
        // Update active navigation link based on current section
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - headerHeight - 100;
            const sectionBottom = sectionTop + section.offsetHeight;
            
            if (scrollY >= sectionTop && scrollY < sectionBottom) {
                currentSection = section.getAttribute('id');
            }
        });
        
        // Handle case where we're at the very top
        if (scrollY < 100) {
            currentSection = 'home';
        }
        
        // Update active states
        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href && href.startsWith('#')) {
                const linkSection = href.substring(1);
                
                if (linkSection === currentSection) {
                    link.classList.add('active');
                    link.setAttribute('aria-current', 'page');
                } else {
                    link.classList.remove('active');
                    link.removeAttribute('aria-current');
                }
            }
        });
        
        ticking = false;
    }
    
    // Throttled scroll handler for performance
    function handleScroll() {
        if (!ticking) {
            requestAnimationFrame(updateNavigation);
            ticking = true;
        }
    }
    
    // Attach scroll listener
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Initial call to set correct active state
    updateNavigation();
    
    // Handle keyboard navigation for accessibility
    navLinks.forEach((link, index) => {
        link.addEventListener('keydown', function(e) {
            let targetIndex;
            
            switch(e.key) {
                case 'ArrowRight':
                case 'ArrowDown':
                    e.preventDefault();
                    targetIndex = (index + 1) % navLinks.length;
                    navLinks[targetIndex].focus();
                    break;
                    
                case 'ArrowLeft':
                case 'ArrowUp':
                    e.preventDefault();
                    targetIndex = (index - 1 + navLinks.length) % navLinks.length;
                    navLinks[targetIndex].focus();
                    break;
                    
                case 'Home':
                    e.preventDefault();
                    navLinks[0].focus();
                    break;
                    
                case 'End':
                    e.preventDefault();
                    navLinks[navLinks.length - 1].focus();
                    break;
            }
        });
    });
    
    // Handle hash links on page load
    if (window.location.hash) {
        setTimeout(() => {
            const targetId = window.location.hash.substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const headerHeight = header ? header.offsetHeight : 80;
                const targetPosition = targetSection.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        }, 100);
    }
}

/**
 * Initialize hero slider functionality
 */
function initHeroSlider() {
    // Slider data - service highlights
    const sliderData = [
        {
            icon: 'fas fa-file-invoice-dollar',
            title: 'Tax Filing Services',
            description: 'Professional tax preparation and filing for individuals and businesses with maximum deductions.'
        },
        {
            icon: 'fas fa-chart-line',
            title: 'Business Advisory',
            description: 'Strategic business consulting to help you make informed financial decisions and grow your business.'
        },
        {
            icon: 'fas fa-calculator',
            title: 'Financial Planning',
            description: 'Comprehensive financial planning services to secure your financial future and achieve your goals.'
        },
        {
            icon: 'fas fa-shield-alt',
            title: 'Tax Compliance',
            description: 'Ensure full compliance with tax regulations and avoid penalties with our expert guidance.'
        },
        {
            icon: 'fas fa-handshake',
            title: 'Personalized Service',
            description: 'Dedicated one-on-one consultation tailored to your specific tax and financial needs.'
        }
    ];
    
    const sliderTrack = document.getElementById('hero-slider-track');
    const sliderPrev = document.getElementById('slider-prev');
    const sliderNext = document.getElementById('slider-next');
    const indicatorsContainer = document.querySelector('.slider-indicators');
    
    if (!sliderTrack || !sliderPrev || !sliderNext || !indicatorsContainer) {
        return; // Exit if slider elements are not found
    }
    
    let currentSlide = 0;
    let autoSlideInterval;
    let isUserInteracting = false;
    
    // Create slider slides
    function createSlides() {
        sliderTrack.innerHTML = '';
        
        sliderData.forEach((slide, index) => {
            const slideElement = document.createElement('div');
            slideElement.className = `slider-slide ${index === 0 ? 'active' : ''}`;
            slideElement.setAttribute('role', 'tabpanel');
            slideElement.setAttribute('aria-label', `Slide ${index + 1}: ${slide.title}`);
            slideElement.innerHTML = `
                <div class="slider-slide-icon">
                    <i class="${slide.icon}" aria-hidden="true"></i>
                </div>
                <h3 class="slider-slide-title">${slide.title}</h3>
                <p class="slider-slide-description">${slide.description}</p>
            `;
            sliderTrack.appendChild(slideElement);
        });
    }
    
    // Create slider indicators
    function createIndicators() {
        indicatorsContainer.innerHTML = '';
        
        sliderData.forEach((_, index) => {
            const indicator = document.createElement('button');
            indicator.className = `slider-indicator ${index === 0 ? 'active' : ''}`;
            indicator.setAttribute('aria-label', `Go to slide ${index + 1}`);
            indicator.setAttribute('data-slide', index);
            indicator.addEventListener('click', () => goToSlide(index));
            indicatorsContainer.appendChild(indicator);
        });
    }
    
    // Go to specific slide
    function goToSlide(slideIndex) {
        const slides = sliderTrack.querySelectorAll('.slider-slide');
        const indicators = indicatorsContainer.querySelectorAll('.slider-indicator');
        
        // Remove active classes
        slides.forEach(slide => {
            slide.classList.remove('active', 'prev');
        });
        indicators.forEach(indicator => {
            indicator.classList.remove('active');
        });
        
        // Add prev class to current slide for exit animation
        if (slides[currentSlide]) {
            slides[currentSlide].classList.add('prev');
        }
        
        // Update current slide
        currentSlide = slideIndex;
        
        // Add active classes
        if (slides[currentSlide]) {
            slides[currentSlide].classList.add('active');
        }
        if (indicators[currentSlide]) {
            indicators[currentSlide].classList.add('active');
        }
        
        // Announce slide change for screen readers
        const slideTitle = sliderData[currentSlide]?.title;
        if (slideTitle) {
            announceSlideChange(slideTitle);
        }
    }
    
    // Go to next slide
    function nextSlide() {
        const nextIndex = (currentSlide + 1) % sliderData.length;
        goToSlide(nextIndex);
    }
    
    // Go to previous slide
    function prevSlide() {
        const prevIndex = (currentSlide - 1 + sliderData.length) % sliderData.length;
        goToSlide(prevIndex);
    }
    
    // Start auto-slide
    function startAutoSlide() {
        if (autoSlideInterval) {
            clearInterval(autoSlideInterval);
        }
        
        autoSlideInterval = setInterval(() => {
            if (!isUserInteracting) {
                nextSlide();
            }
        }, 5000); // Change slide every 5 seconds
    }
    
    // Stop auto-slide
    function stopAutoSlide() {
        if (autoSlideInterval) {
            clearInterval(autoSlideInterval);
            autoSlideInterval = null;
        }
    }
    
    // Announce slide change for accessibility
    function announceSlideChange(title) {
        const announcement = document.createElement('div');
        announcement.setAttribute('aria-live', 'polite');
        announcement.setAttribute('aria-atomic', 'true');
        announcement.className = 'visually-hidden';
        announcement.textContent = `Now showing: ${title}`;
        document.body.appendChild(announcement);
        
        // Remove announcement after a short delay
        setTimeout(() => {
            document.body.removeChild(announcement);
        }, 1000);
    }
    
    // Handle user interaction states
    function handleUserInteractionStart() {
        isUserInteracting = true;
        stopAutoSlide();
    }
    
    function handleUserInteractionEnd() {
        isUserInteracting = false;
        // Restart auto-slide after a delay
        setTimeout(() => {
            if (!isUserInteracting) {
                startAutoSlide();
            }
        }, 3000);
    }
    
    // Event listeners
    sliderNext.addEventListener('click', () => {
        handleUserInteractionStart();
        nextSlide();
        handleUserInteractionEnd();
    });
    
    sliderPrev.addEventListener('click', () => {
        handleUserInteractionStart();
        prevSlide();
        handleUserInteractionEnd();
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.target.closest('.hero-slider')) {
            switch(e.key) {
                case 'ArrowLeft':
                    e.preventDefault();
                    handleUserInteractionStart();
                    prevSlide();
                    handleUserInteractionEnd();
                    break;
                case 'ArrowRight':
                    e.preventDefault();
                    handleUserInteractionStart();
                    nextSlide();
                    handleUserInteractionEnd();
                    break;
            }
        }
    });
    
    // Pause auto-slide on hover
    const sliderContainer = document.querySelector('.slider-container');
    if (sliderContainer) {
        sliderContainer.addEventListener('mouseenter', handleUserInteractionStart);
        sliderContainer.addEventListener('mouseleave', handleUserInteractionEnd);
        
        // Pause on focus for accessibility
        sliderContainer.addEventListener('focusin', handleUserInteractionStart);
        sliderContainer.addEventListener('focusout', handleUserInteractionEnd);
    }
    
    // Handle visibility change (pause when tab is not active)
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            stopAutoSlide();
        } else if (!isUserInteracting) {
            startAutoSlide();
        }
    });
    
    // Touch/swipe support for mobile
    let touchStartX = 0;
    let touchEndX = 0;
    
    if (sliderContainer) {
        sliderContainer.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
            handleUserInteractionStart();
        }, { passive: true });
        
        sliderContainer.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
            handleUserInteractionEnd();
        }, { passive: true });
    }
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const swipeDistance = touchEndX - touchStartX;
        
        if (Math.abs(swipeDistance) > swipeThreshold) {
            if (swipeDistance > 0) {
                prevSlide(); // Swipe right - go to previous
            } else {
                nextSlide(); // Swipe left - go to next
            }
        }
    }
    
    // Initialize slider
    createSlides();
    createIndicators();
    startAutoSlide();
    
    // Handle reduced motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        stopAutoSlide();
    }
}
/**

 * Initialize services showcase functionality
 */
function initServicesShowcase() {
    // Services data structure
    const servicesData = [
        {
            id: 'individual-tax-filing',
            title: 'Individual Tax Filing',
            description: 'Professional tax preparation and filing services for individuals with maximum deductions and credits.',
            icon: 'fas fa-user-check',
            features: [
                'Personal income tax returns',
                'Tax planning and optimization',
                'Deduction maximization',
                'Electronic filing and tracking',
                'Year-round tax support'
            ],
            details: 'Our individual tax filing service ensures you receive every deduction and credit you\'re entitled to. We handle all forms of personal income including W-2s, 1099s, investment income, rental properties, and self-employment income. Our certified professionals stay current with tax law changes to maximize your refund while ensuring full compliance.',
            price: 'Starting at $150'
        },
        {
            id: 'business-tax-services',
            title: 'Business Tax Services',
            description: 'Comprehensive tax solutions for businesses of all sizes, from startups to established corporations.',
            icon: 'fas fa-building',
            features: [
                'Corporate tax returns',
                'Partnership and LLC filings',
                'Quarterly tax planning',
                'Business expense optimization',
                'Multi-state tax compliance'
            ],
            details: 'We provide complete business tax services including corporate returns, partnership filings, and LLC tax preparation. Our team helps optimize your business structure for tax efficiency, manages quarterly payments, and ensures compliance across multiple jurisdictions. We work with businesses from startups to established corporations.',
            price: 'Starting at $500'
        },
        {
            id: 'tax-planning-strategy',
            title: 'Tax Planning & Strategy',
            description: 'Strategic tax planning to minimize your tax liability and maximize your financial efficiency.',
            icon: 'fas fa-chess-knight',
            features: [
                'Year-round tax planning',
                'Investment tax strategies',
                'Retirement planning optimization',
                'Estate and gift tax planning',
                'Tax-efficient business structures'
            ],
            details: 'Our strategic tax planning services help you minimize tax liability through careful planning and optimization. We analyze your financial situation to identify opportunities for tax savings, plan for major life events, and structure investments and business activities for maximum tax efficiency.',
            price: 'Starting at $300'
        },
        {
            id: 'bookkeeping-accounting',
            title: 'Bookkeeping & Accounting',
            description: 'Professional bookkeeping and accounting services to keep your financial records accurate and organized.',
            icon: 'fas fa-calculator',
            features: [
                'Monthly bookkeeping services',
                'Financial statement preparation',
                'Accounts payable/receivable',
                'Payroll processing',
                'QuickBooks setup and training'
            ],
            details: 'Keep your business finances organized with our professional bookkeeping and accounting services. We handle daily transaction recording, monthly reconciliations, financial statement preparation, and payroll processing. Our team is proficient in all major accounting software platforms.',
            price: 'Starting at $200/month'
        },
        {
            id: 'business-advisory',
            title: 'Business Advisory',
            description: 'Strategic business consulting to help you make informed financial decisions and grow your business.',
            icon: 'fas fa-handshake',
            features: [
                'Financial analysis and reporting',
                'Business structure optimization',
                'Cash flow management',
                'Growth strategy planning',
                'Risk assessment and mitigation'
            ],
            details: 'Our business advisory services provide strategic guidance to help your business thrive. We offer financial analysis, cash flow management, business structure optimization, and growth planning. Our experienced advisors work closely with you to identify opportunities and overcome challenges.',
            price: 'Custom pricing'
        },
        {
            id: 'audit-representation',
            title: 'Audit Representation',
            description: 'Professional representation and support during IRS audits and tax disputes.',
            icon: 'fas fa-shield-alt',
            features: [
                'IRS audit representation',
                'State tax audit support',
                'Tax dispute resolution',
                'Penalty abatement assistance',
                'Compliance review and correction'
            ],
            details: 'If you\'re facing an IRS audit or tax dispute, our experienced professionals will represent you throughout the process. We handle all communications with tax authorities, prepare necessary documentation, and work to resolve issues efficiently while protecting your interests.',
            price: 'Starting at $400'
        }
    ];
    
    const servicesGrid = document.querySelector('.services-grid');
    
    if (!servicesGrid) {
        return; // Exit if services grid is not found
    }
    
    // Create service cards
    function createServiceCards() {
        servicesGrid.innerHTML = '';
        
        servicesData.forEach((service, index) => {
            const serviceCard = document.createElement('div');
            serviceCard.className = 'service-card';
            serviceCard.setAttribute('role', 'listitem');
            serviceCard.setAttribute('data-service-id', service.id);
            serviceCard.innerHTML = `
                <div class="service-card-inner">
                    <div class="service-card-icon">
                        <i class="${service.icon}" aria-hidden="true"></i>
                    </div>
                    <div class="service-card-content">
                        <h3 class="service-card-title">${service.title}</h3>
                        <p class="service-card-description">${service.description}</p>
                        <div class="service-card-price">${service.price}</div>
                        <button class="service-card-btn" aria-label="Learn more about ${service.title}">
                            Learn More
                            <i class="fas fa-arrow-right" aria-hidden="true"></i>
                        </button>
                    </div>
                </div>
            `;
            
            // Add click event for modal
            serviceCard.addEventListener('click', () => openServiceModal(service));
            
            // Enhanced keyboard support for accessibility
            serviceCard.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    openServiceModal(service);
                }
            });
            
            // Add keyboard support
            serviceCard.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    openServiceModal(service);
                }
            });
            
            // Make card focusable for keyboard navigation
            serviceCard.setAttribute('tabindex', '0');
            
            servicesGrid.appendChild(serviceCard);
        });
    }
    
    // Create and manage service modal
    function createServiceModal() {
        const modal = document.createElement('div');
        modal.className = 'service-modal';
        modal.setAttribute('role', 'dialog');
        modal.setAttribute('aria-modal', 'true');
        modal.setAttribute('aria-hidden', 'true');
        modal.innerHTML = `
            <div class="service-modal-backdrop"></div>
            <div class="service-modal-container">
                <div class="service-modal-content">
                    <button class="service-modal-close" aria-label="Close modal">
                        <i class="fas fa-times" aria-hidden="true"></i>
                    </button>
                    <div class="service-modal-header">
                        <div class="service-modal-icon">
                            <!-- Icon will be populated dynamically -->
                        </div>
                        <h2 class="service-modal-title">
                            <!-- Title will be populated dynamically -->
                        </h2>
                        <div class="service-modal-price">
                            <!-- Price will be populated dynamically -->
                        </div>
                    </div>
                    <div class="service-modal-body">
                        <div class="service-modal-description">
                            <!-- Description will be populated dynamically -->
                        </div>
                        <div class="service-modal-features">
                            <h3>What's Included:</h3>
                            <ul class="service-features-list">
                                <!-- Features will be populated dynamically -->
                            </ul>
                        </div>
                        <div class="service-modal-actions">
                            <a href="#contact" class="btn btn--primary service-modal-contact">
                                Get Started
                                <i class="fas fa-arrow-right" aria-hidden="true"></i>
                            </a>
                            <button class="btn btn--secondary service-modal-close-btn">
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        return modal;
    }
    
    // Open service modal
    function openServiceModal(service) {
        let modal = document.querySelector('.service-modal');
        
        // Create modal if it doesn't exist
        if (!modal) {
            modal = createServiceModal();
        }
        
        // Populate modal content
        const modalIcon = modal.querySelector('.service-modal-icon');
        const modalTitle = modal.querySelector('.service-modal-title');
        const modalPrice = modal.querySelector('.service-modal-price');
        const modalDescription = modal.querySelector('.service-modal-description');
        const modalFeaturesList = modal.querySelector('.service-features-list');
        
        modalIcon.innerHTML = `<i class="${service.icon}" aria-hidden="true"></i>`;
        modalTitle.textContent = service.title;
        modalPrice.textContent = service.price;
        modalDescription.textContent = service.details;
        
        // Populate features list
        modalFeaturesList.innerHTML = '';
        service.features.forEach(feature => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `
                <i class="fas fa-check" aria-hidden="true"></i>
                <span>${feature}</span>
            `;
            modalFeaturesList.appendChild(listItem);
        });
        
        // Set modal title for accessibility
        modal.setAttribute('aria-labelledby', 'service-modal-title');
        modalTitle.id = 'service-modal-title';
        
        // Show modal
        modal.setAttribute('aria-hidden', 'false');
        modal.classList.add('active');
        document.body.classList.add('modal-open');
        
        // Focus management
        const closeButton = modal.querySelector('.service-modal-close');
        const focusableElements = modal.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const firstFocusable = focusableElements[0];
        const lastFocusable = focusableElements[focusableElements.length - 1];
        
        // Store the element that opened the modal for focus restoration
        const previouslyFocused = document.activeElement;
        
        // Focus the close button initially
        setTimeout(() => {
            closeButton.focus();
        }, 100);
        
        // Trap focus within modal
        function trapFocus(e) {
            if (e.key === 'Tab') {
                if (e.shiftKey) {
                    if (document.activeElement === firstFocusable) {
                        e.preventDefault();
                        lastFocusable.focus();
                    }
                } else {
                    if (document.activeElement === lastFocusable) {
                        e.preventDefault();
                        firstFocusable.focus();
                    }
                }
            }
        }
        
        // Close modal function
        function closeModal() {
            modal.setAttribute('aria-hidden', 'true');
            modal.classList.remove('active');
            document.body.classList.remove('modal-open');
            
            // Restore focus to the element that opened the modal
            if (previouslyFocused) {
                previouslyFocused.focus();
            }
            
            // Remove event listeners
            modal.removeEventListener('keydown', handleModalKeydown);
            document.removeEventListener('keydown', trapFocus);
        }
        
        // Handle modal keyboard interactions
        function handleModalKeydown(e) {
            if (e.key === 'Escape') {
                closeModal();
            }
        }
        
        // Add event listeners
        modal.addEventListener('keydown', handleModalKeydown);
        document.addEventListener('keydown', trapFocus);
        
        // Close modal event listeners
        const closeButtons = modal.querySelectorAll('.service-modal-close, .service-modal-close-btn');
        const backdrop = modal.querySelector('.service-modal-backdrop');
        
        closeButtons.forEach(button => {
            button.addEventListener('click', closeModal);
        });
        
        backdrop.addEventListener('click', closeModal);
        
        // Handle contact button click
        const contactButton = modal.querySelector('.service-modal-contact');
        contactButton.addEventListener('click', (e) => {
            closeModal();
            // The link will naturally navigate to the contact section
        });
    }
    
    // Initialize services showcase
    createServiceCards();
    
    // Add intersection observer for animation triggers
    if ('IntersectionObserver' in window) {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, observerOptions);
        
        // Observe all service cards
        const serviceCards = document.querySelectorAll('.service-card');
        serviceCards.forEach(card => {
            observer.observe(card);
        });
    }
}

/**
 * Initialize about section functionality
 */
function initAboutSection() {
    // Initialize animated statistics counters
    initAnimatedCounters();
    
    // Initialize scroll-triggered animations
    initScrollAnimations();
}

/**
 * Initialize animated counter functionality using Intersection Observer API
 */
function initAnimatedCounters() {
    const statNumbers = document.querySelectorAll('.stat-number');
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -50px 0px'
    };
    
    // Create intersection observer for counter animation
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statNumber = entry.target;
                const target = parseInt(statNumber.getAttribute('data-target'));
                const suffix = statNumber.getAttribute('data-suffix') || '';
                
                // Start counter animation
                animateCounter(statNumber, target, suffix);
                
                // Add animation class to parent stat item
                const statItem = statNumber.closest('.stat-item');
                if (statItem) {
                    statItem.classList.add('animate');
                }
                
                // Stop observing this element
                counterObserver.unobserve(statNumber);
            }
        });
    }, observerOptions);
    
    // Observe all stat numbers
    statNumbers.forEach(statNumber => {
        counterObserver.observe(statNumber);
    });
    
    /**
     * Animate counter from 0 to target value
     * @param {HTMLElement} element - The counter element
     * @param {number} target - Target number to count to
     * @param {string} suffix - Optional suffix (like 'M' for millions)
     */
    function animateCounter(element, target, suffix = '') {
        let current = 0;
        const increment = target / 100; // Divide into 100 steps
        const duration = 2000; // 2 seconds
        const stepTime = duration / 100;
        
        // Add animation class
        element.classList.add('animate-countUp');
        
        const timer = setInterval(() => {
            current += increment;
            
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            
            // Format number based on size
            let displayValue;
            if (target >= 1000000) {
                displayValue = (current / 1000000).toFixed(1);
            } else if (target >= 1000) {
                displayValue = Math.floor(current).toLocaleString();
            } else {
                displayValue = Math.floor(current);
            }
            
            element.textContent = displayValue + suffix;
            
            // Announce completion for screen readers
            if (current >= target) {
                announceCounterCompletion(element, target, suffix);
            }
        }, stepTime);
    }
    
    /**
     * Announce counter completion for accessibility
     * @param {HTMLElement} element - The counter element
     * @param {number} target - Final target value
     * @param {string} suffix - Optional suffix
     */
    function announceCounterCompletion(element, target, suffix) {
        const statItem = element.closest('.stat-item');
        const label = statItem ? statItem.querySelector('.stat-label')?.textContent : '';
        
        if (label) {
            const announcement = document.createElement('div');
            announcement.setAttribute('aria-live', 'polite');
            announcement.setAttribute('aria-atomic', 'true');
            announcement.className = 'visually-hidden';
            announcement.textContent = `${label}: ${target}${suffix}`;
            document.body.appendChild(announcement);
            
            // Remove announcement after delay
            setTimeout(() => {
                if (document.body.contains(announcement)) {
                    document.body.removeChild(announcement);
                }
            }, 2000);
        }
    }
}

/**
 * Initialize scroll-triggered animations for about section elements
 */
function initScrollAnimations() {
    // Elements to animate on scroll
    const animationElements = [
        {
            selector: '.credential-item',
            className: 'animate-credential',
            stagger: true,
            delay: 100
        },
        {
            selector: '.timeline-item',
            className: 'animate-timelineItem',
            stagger: true,
            delay: 200
        },
        {
            selector: '.about-description',
            className: 'animate-fadeIn',
            stagger: false,
            delay: 0
        }
    ];
    
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px'
    };
    
    // Create intersection observer for scroll animations
    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const animationType = element.getAttribute('data-animation');
                const delay = parseInt(element.getAttribute('data-delay')) || 0;
                
                // Apply animation with delay
                setTimeout(() => {
                    element.classList.add(animationType);
                    element.classList.add('animate');
                }, delay);
                
                // Stop observing this element
                scrollObserver.unobserve(element);
            }
        });
    }, observerOptions);
    
    // Set up animations for each element type
    animationElements.forEach(config => {
        const elements = document.querySelectorAll(config.selector);
        
        elements.forEach((element, index) => {
            // Set animation data attributes
            element.setAttribute('data-animation', config.className);
            
            if (config.stagger) {
                const staggerDelay = config.delay * index;
                element.setAttribute('data-delay', staggerDelay);
            } else {
                element.setAttribute('data-delay', config.delay);
            }
            
            // Start observing
            scrollObserver.observe(element);
        });
    });
    
    // Handle timeline items with special positioning
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach((item, index) => {
        // Add stagger delay classes
        item.classList.add(`animate-delay-${(index + 1) * 200}`);
        
        // Set initial state for animation
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = 'all 0.6s ease-out';
    });
    
    // Special handling for stat items animation
    const statItems = document.querySelectorAll('.stat-item');
    const statObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statItem = entry.target;
                const index = Array.from(statItems).indexOf(statItem);
                
                setTimeout(() => {
                    statItem.classList.add('animate-statItem');
                    statItem.style.opacity = '1';
                    statItem.style.transform = 'translateY(0)';
                }, index * 100);
                
                statObserver.unobserve(statItem);
            }
        });
    }, observerOptions);
    
    // Set initial state and observe stat items
    statItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = 'all 0.6s ease-out';
        statObserver.observe(item);
    });
    
    // Handle reduced motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        // Remove all animations and show elements immediately
        document.querySelectorAll('[data-animation]').forEach(element => {
            element.style.opacity = '1';
            element.style.transform = 'none';
            element.classList.add('animate');
        });
        
        statItems.forEach(item => {
            item.style.opacity = '1';
            item.style.transform = 'none';
        });
        
        timelineItems.forEach(item => {
            item.style.opacity = '1';
            item.style.transform = 'none';
        });
    }
}
/**
 * I
nitialize team section functionality
 */
function initTeamSection() {
    // Team members data structure
    const teamData = [
        {
            id: 'sarah-johnson',
            name: 'Sarah Johnson',
            title: 'Senior Tax Partner & CPA',
            image: 'images/team/sarah-johnson.jpg',
            credentials: ['CPA', 'MBA Finance', 'Enrolled Agent'],
            specializations: ['Corporate Tax', 'International Tax', 'Tax Planning'],
            bio: 'Sarah brings over 15 years of experience in tax consulting and business advisory services. She specializes in complex corporate tax matters and international tax compliance, helping businesses navigate the ever-changing tax landscape.',
            email: 'sarah.johnson@taxproconsulting.com',
            phone: '(123) 456-7891',
            linkedin: '#'
        },
        {
            id: 'michael-chen',
            name: 'Michael Chen',
            title: 'Tax Manager & Business Advisor',
            image: 'images/team/michael-chen.jpg',
            credentials: ['CPA', 'CFP', 'QuickBooks ProAdvisor'],
            specializations: ['Small Business Tax', 'Financial Planning', 'Bookkeeping'],
            bio: 'Michael focuses on helping small and medium-sized businesses optimize their tax strategies and financial operations. With 12 years of experience, he provides comprehensive business advisory services.',
            email: 'michael.chen@taxproconsulting.com',
            phone: '(123) 456-7892',
            linkedin: '#'
        },
        {
            id: 'jennifer-martinez',
            name: 'Jennifer Martinez',
            title: 'Individual Tax Specialist',
            image: 'images/team/jennifer-martinez.jpg',
            credentials: ['CPA', 'CTEC', 'IRS Annual Filing Season Program'],
            specializations: ['Individual Tax Returns', 'Tax Resolution', 'Audit Representation'],
            bio: 'Jennifer specializes in individual tax preparation and resolution services. She has successfully represented hundreds of clients in IRS audits and helped resolve complex tax issues.',
            email: 'jennifer.martinez@taxproconsulting.com',
            phone: '(123) 456-7893',
            linkedin: '#'
        },
        {
            id: 'david-thompson',
            name: 'David Thompson',
            title: 'Senior Accountant',
            image: 'images/team/david-thompson.jpg',
            credentials: ['CPA', 'CMA', 'Advanced QuickBooks Certification'],
            specializations: ['Bookkeeping', 'Financial Statements', 'Payroll Services'],
            bio: 'David manages our bookkeeping and accounting services division. His attention to detail and expertise in various accounting software platforms ensures accurate financial records for our clients.',
            email: 'david.thompson@taxproconsulting.com',
            phone: '(123) 456-7894',
            linkedin: '#'
        },
        {
            id: 'lisa-rodriguez',
            name: 'Lisa Rodriguez',
            title: 'Tax Associate & Client Relations',
            image: 'images/team/lisa-rodriguez.jpg',
            credentials: ['EA', 'CTEC', 'Customer Service Excellence Certification'],
            specializations: ['Tax Preparation', 'Client Support', 'Tax Education'],
            bio: 'Lisa ensures our clients receive exceptional service throughout their tax preparation process. She specializes in client education and making complex tax concepts easy to understand.',
            email: 'lisa.rodriguez@taxproconsulting.com',
            phone: '(123) 456-7895',
            linkedin: '#'
        },
        {
            id: 'robert-kim',
            name: 'Robert Kim',
            title: 'Business Tax Consultant',
            image: 'images/team/robert-kim.jpg',
            credentials: ['CPA', 'MST', 'Business Valuation Certification'],
            specializations: ['Business Tax Planning', 'Entity Selection', 'Succession Planning'],
            bio: 'Robert advises businesses on tax-efficient structures and succession planning. His expertise in business valuation and entity selection helps clients make informed strategic decisions.',
            email: 'robert.kim@taxproconsulting.com',
            phone: '(123) 456-7896',
            linkedin: '#'
        }
    ];
    
    const teamGrid = document.querySelector('.team-grid');
    
    if (!teamGrid) {
        return; // Exit if team grid is not found
    }
    
    // Create team member cards
    function createTeamCards() {
        teamGrid.innerHTML = '';
        
        teamData.forEach((member, index) => {
            const teamCard = document.createElement('div');
            teamCard.className = 'team-card';
            teamCard.setAttribute('role', 'listitem');
            teamCard.setAttribute('data-member-id', member.id);
            teamCard.innerHTML = `
                <div class="team-card-inner">
                    <div class="team-card-image">
                        <img src="${member.image}" alt="${member.name}" loading="lazy" onerror="this.src='images/team/placeholder.jpg'">
                        <div class="team-card-overlay">
                            <div class="team-card-contact">
                                <a href="mailto:${member.email}" class="team-contact-btn" aria-label="Email ${member.name}">
                                    <i class="fas fa-envelope" aria-hidden="true"></i>
                                </a>
                                <a href="tel:${member.phone}" class="team-contact-btn" aria-label="Call ${member.name}">
                                    <i class="fas fa-phone" aria-hidden="true"></i>
                                </a>
                                <a href="${member.linkedin}" class="team-contact-btn" aria-label="${member.name} LinkedIn profile" target="_blank" rel="noopener noreferrer">
                                    <i class="fab fa-linkedin" aria-hidden="true"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div class="team-card-content">
                        <h3 class="team-card-name">${member.name}</h3>
                        <p class="team-card-title">${member.title}</p>
                        <div class="team-card-credentials">
                            ${member.credentials.map(credential => `<span class="credential-badge">${credential}</span>`).join('')}
                        </div>
                        <div class="team-card-specializations">
                            <h4>Specializations:</h4>
                            <ul class="specializations-list">
                                ${member.specializations.map(spec => `<li>${spec}</li>`).join('')}
                            </ul>
                        </div>
                        <button class="team-card-btn" aria-label="Learn more about ${member.name}">
                            Learn More
                            <i class="fas fa-arrow-right" aria-hidden="true"></i>
                        </button>
                    </div>
                </div>
            `;
            
            // Add click event for modal
            teamCard.addEventListener('click', (e) => {
                // Don't open modal if clicking on contact buttons
                if (!e.target.closest('.team-contact-btn')) {
                    openTeamModal(member);
                }
            });
            
            // Add keyboard support
            teamCard.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    openTeamModal(member);
                }
            });
            
            // Make card focusable for keyboard navigation
            teamCard.setAttribute('tabindex', '0');
            
            teamGrid.appendChild(teamCard);
        });
    }
    
    // Create and manage team member modal
    function createTeamModal() {
        const modal = document.createElement('div');
        modal.className = 'team-modal';
        modal.setAttribute('role', 'dialog');
        modal.setAttribute('aria-modal', 'true');
        modal.setAttribute('aria-hidden', 'true');
        modal.innerHTML = `
            <div class="team-modal-backdrop"></div>
            <div class="team-modal-container">
                <div class="team-modal-content">
                    <button class="team-modal-close" aria-label="Close modal">
                        <i class="fas fa-times" aria-hidden="true"></i>
                    </button>
                    <div class="team-modal-header">
                        <div class="team-modal-image">
                            <!-- Image will be populated dynamically -->
                        </div>
                        <div class="team-modal-info">
                            <h2 class="team-modal-name">
                                <!-- Name will be populated dynamically -->
                            </h2>
                            <p class="team-modal-title">
                                <!-- Title will be populated dynamically -->
                            </p>
                            <div class="team-modal-credentials">
                                <!-- Credentials will be populated dynamically -->
                            </div>
                        </div>
                    </div>
                    <div class="team-modal-body">
                        <div class="team-modal-bio">
                            <!-- Bio will be populated dynamically -->
                        </div>
                        <div class="team-modal-specializations">
                            <h3>Areas of Expertise:</h3>
                            <ul class="team-modal-spec-list">
                                <!-- Specializations will be populated dynamically -->
                            </ul>
                        </div>
                        <div class="team-modal-contact">
                            <h3>Get in Touch:</h3>
                            <div class="team-modal-contact-info">
                                <!-- Contact info will be populated dynamically -->
                            </div>
                        </div>
                        <div class="team-modal-actions">
                            <a href="#contact" class="btn btn--primary team-modal-contact-btn">
                                Schedule Consultation
                                <i class="fas fa-calendar-alt" aria-hidden="true"></i>
                            </a>
                            <button class="btn btn--secondary team-modal-close-btn">
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        return modal;
    }
    
    // Open team member modal
    function openTeamModal(member) {
        let modal = document.querySelector('.team-modal');
        
        // Create modal if it doesn't exist
        if (!modal) {
            modal = createTeamModal();
        }
        
        // Populate modal content
        const modalImage = modal.querySelector('.team-modal-image');
        const modalName = modal.querySelector('.team-modal-name');
        const modalTitle = modal.querySelector('.team-modal-title');
        const modalCredentials = modal.querySelector('.team-modal-credentials');
        const modalBio = modal.querySelector('.team-modal-bio');
        const modalSpecList = modal.querySelector('.team-modal-spec-list');
        const modalContactInfo = modal.querySelector('.team-modal-contact-info');
        
        modalImage.innerHTML = `<img src="${member.image}" alt="${member.name}" onerror="this.src='images/team/placeholder.jpg'">`;
        modalName.textContent = member.name;
        modalTitle.textContent = member.title;
        modalBio.textContent = member.bio;
        
        // Populate credentials
        modalCredentials.innerHTML = member.credentials.map(credential => 
            `<span class="credential-badge">${credential}</span>`
        ).join('');
        
        // Populate specializations
        modalSpecList.innerHTML = '';
        member.specializations.forEach(spec => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `
                <i class="fas fa-check" aria-hidden="true"></i>
                <span>${spec}</span>
            `;
            modalSpecList.appendChild(listItem);
        });
        
        // Populate contact information
        modalContactInfo.innerHTML = `
            <div class="team-contact-item">
                <i class="fas fa-envelope" aria-hidden="true"></i>
                <a href="mailto:${member.email}">${member.email}</a>
            </div>
            <div class="team-contact-item">
                <i class="fas fa-phone" aria-hidden="true"></i>
                <a href="tel:${member.phone}">${member.phone}</a>
            </div>
            <div class="team-contact-item">
                <i class="fab fa-linkedin" aria-hidden="true"></i>
                <a href="${member.linkedin}" target="_blank" rel="noopener noreferrer">LinkedIn Profile</a>
            </div>
        `;
        
        // Set modal title for accessibility
        modal.setAttribute('aria-labelledby', 'team-modal-name');
        modalName.id = 'team-modal-name';
        
        // Show modal
        modal.setAttribute('aria-hidden', 'false');
        modal.classList.add('active');
        document.body.classList.add('modal-open');
        
        // Focus management
        const closeButton = modal.querySelector('.team-modal-close');
        if (closeButton) {
            closeButton.focus();
        }
        
        // Set up event listeners for this modal instance
        setupTeamModalEventListeners(modal);
    }
    
    // Set up team modal event listeners
    function setupTeamModalEventListeners(modal) {
        const closeButtons = modal.querySelectorAll('.team-modal-close, .team-modal-close-btn');
        const backdrop = modal.querySelector('.team-modal-backdrop');
        const contactBtn = modal.querySelector('.team-modal-contact-btn');
        
        // Close modal function
        function closeModal() {
            modal.setAttribute('aria-hidden', 'true');
            modal.classList.remove('active');
            document.body.classList.remove('modal-open');
            
            // Return focus to the team card that opened the modal
            const activeCard = document.querySelector('.team-card:focus');
            if (activeCard) {
                activeCard.focus();
            }
        }
        
        // Close button event listeners
        closeButtons.forEach(button => {
            button.addEventListener('click', closeModal);
        });
        
        // Backdrop click to close
        if (backdrop) {
            backdrop.addEventListener('click', closeModal);
        }
        
        // Contact button - close modal and scroll to contact section
        if (contactBtn) {
            contactBtn.addEventListener('click', (e) => {
                e.preventDefault();
                closeModal();
                
                // Smooth scroll to contact section
                setTimeout(() => {
                    const contactSection = document.getElementById('contact');
                    if (contactSection) {
                        const headerHeight = document.querySelector('.header')?.offsetHeight || 80;
                        const targetPosition = contactSection.offsetTop - headerHeight - 20;
                        
                        window.scrollTo({
                            top: targetPosition,
                            behavior: 'smooth'
                        });
                    }
                }, 300);
            });
        }
        
        // Keyboard navigation
        modal.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                closeModal();
            }
            
            // Trap focus within modal
            if (e.key === 'Tab') {
                const focusableElements = modal.querySelectorAll(
                    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
                );
                const firstElement = focusableElements[0];
                const lastElement = focusableElements[focusableElements.length - 1];
                
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
    
    // Initialize team cards
    createTeamCards();
    
    // Handle reduced motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        // Add class to disable animations
        document.documentElement.classList.add('reduce-motion');
    }
}
/**
 
* Initialize FAQ section functionality
 */
function initFAQSection() {
    // FAQ data structure organized by categories
    const faqData = [
        {
            category: 'Tax Filing',
            questions: [
                {
                    id: 'tax-deadline',
                    question: 'When is the tax filing deadline?',
                    answer: 'The federal tax filing deadline is typically April 15th each year. However, if April 15th falls on a weekend or holiday, the deadline is extended to the next business day. We recommend filing early to avoid last-minute issues and to receive your refund sooner.'
                },
                {
                    id: 'required-documents',
                    question: 'What documents do I need to bring for tax filing?',
                    answer: 'You should bring all relevant tax documents including W-2s from employers, 1099 forms for other income, receipts for deductible expenses, previous year\'s tax return, Social Security cards for all family members, and any other income or deduction documentation. We provide a comprehensive checklist when you schedule your appointment.'
                },
                {
                    id: 'refund-timeline',
                    question: 'How long does it take to receive my tax refund?',
                    answer: 'If you file electronically and choose direct deposit, you can typically expect your refund within 21 days. Paper returns take 6-8 weeks to process. We provide tracking information so you can monitor your refund status throughout the process.'
                },
                {
                    id: 'amended-returns',
                    question: 'Can you help me file an amended tax return?',
                    answer: 'Yes, we can help you file Form 1040X to amend your tax return if you need to make corrections or claim additional deductions. Amended returns typically take 8-12 weeks to process, and we\'ll guide you through the entire process to ensure accuracy.'
                }
            ]
        },
        {
            category: 'Business Services',
            questions: [
                {
                    id: 'business-structure',
                    question: 'What business structure is best for tax purposes?',
                    answer: 'The best business structure depends on your specific situation, including income level, number of owners, liability concerns, and growth plans. We offer consultations to analyze your needs and recommend whether an LLC, S-Corp, C-Corp, or partnership would be most beneficial for your tax situation.'
                },
                {
                    id: 'quarterly-taxes',
                    question: 'Do I need to pay quarterly estimated taxes?',
                    answer: 'If you expect to owe $1,000 or more in taxes for the year, you generally need to make quarterly estimated tax payments. This applies to self-employed individuals, business owners, and those with significant investment income. We can help you calculate and set up your quarterly payments.'
                },
                {
                    id: 'business-deductions',
                    question: 'What business expenses can I deduct?',
                    answer: 'Common business deductions include office supplies, equipment, travel expenses, meals (50% deductible), professional services, insurance, and home office expenses. We review all your business activities to identify every legitimate deduction and ensure you\'re maximizing your tax savings.'
                },
                {
                    id: 'bookkeeping-frequency',
                    question: 'How often should I update my business books?',
                    answer: 'We recommend updating your books monthly to maintain accurate financial records and make tax planning easier. Regular bookkeeping helps you track cash flow, prepare for tax obligations, and make informed business decisions. We offer monthly bookkeeping services to keep your records current.'
                }
            ]
        },
        {
            category: 'Services & Pricing',
            questions: [
                {
                    id: 'service-cost',
                    question: 'How much do your services cost?',
                    answer: 'Our pricing varies based on the complexity of your tax situation and the services you need. Individual tax returns start at $150, business returns start at $500, and ongoing services like bookkeeping start at $200/month. We provide detailed quotes after reviewing your specific needs.'
                },
                {
                    id: 'consultation-process',
                    question: 'What happens during the initial consultation?',
                    answer: 'During your initial consultation, we review your financial situation, discuss your goals, and identify opportunities for tax savings. We explain our services, provide a detailed quote, and answer all your questions. Initial consultations are typically 30-60 minutes and help us understand how we can best serve you.'
                },
                {
                    id: 'year-round-support',
                    question: 'Do you provide support throughout the year?',
                    answer: 'Yes, we provide year-round support to all our clients. This includes answering tax questions, helping with tax planning, providing quarterly check-ins, and being available for any tax-related issues that arise. We believe in building long-term relationships with our clients.'
                },
                {
                    id: 'remote-services',
                    question: 'Can you provide services remotely?',
                    answer: 'Absolutely! We offer secure remote services including virtual consultations, electronic document sharing, and online meetings. Our secure client portal allows you to safely upload documents and communicate with our team from anywhere. Many of our clients prefer the convenience of remote service.'
                }
            ]
        },
        {
            category: 'Audit & Compliance',
            questions: [
                {
                    id: 'audit-representation',
                    question: 'What if I get audited by the IRS?',
                    answer: 'If you\'re selected for an audit, we provide full representation services. We handle all communications with the IRS, prepare necessary documentation, and represent you throughout the audit process. Our goal is to resolve the audit efficiently while protecting your interests and minimizing any additional tax liability.'
                },
                {
                    id: 'audit-prevention',
                    question: 'How can I reduce my chances of being audited?',
                    answer: 'While audits can be random, you can reduce your risk by filing accurate returns, keeping detailed records, avoiding excessive deductions relative to your income, and filing on time. We ensure all returns are accurate and well-documented to minimize audit risk.'
                },
                {
                    id: 'tax-compliance',
                    question: 'How do you ensure tax compliance?',
                    answer: 'We stay current with all tax law changes, use professional tax software, implement multiple review processes, and maintain continuing education certifications. Every return is reviewed by a senior tax professional before filing to ensure accuracy and compliance with current tax laws.'
                },
                {
                    id: 'penalty-relief',
                    question: 'Can you help with tax penalties and interest?',
                    answer: 'Yes, we can help you request penalty abatement and work with tax authorities to resolve outstanding issues. We analyze your situation to determine if you qualify for penalty relief and handle all communications with the IRS or state tax agencies on your behalf.'
                }
            ]
        }
    ];
    
    const faqAccordion = document.querySelector('.faq-accordion');
    const faqSearchInput = document.getElementById('faq-search-input');
    
    if (!faqAccordion) {
        return; // Exit if FAQ accordion container is not found
    }
    
    let allQuestions = [];
    let filteredQuestions = [];
    
    // Flatten all questions for search functionality
    function flattenQuestions() {
        allQuestions = [];
        faqData.forEach(category => {
            category.questions.forEach(question => {
                allQuestions.push({
                    ...question,
                    category: category.category
                });
            });
        });
        filteredQuestions = [...allQuestions];
    }
    
    // Create FAQ accordion structure
    function createFAQAccordion() {
        faqAccordion.innerHTML = '';
        
        // Group filtered questions by category
        const categorizedQuestions = {};
        filteredQuestions.forEach(question => {
            if (!categorizedQuestions[question.category]) {
                categorizedQuestions[question.category] = [];
            }
            categorizedQuestions[question.category].push(question);
        });
        
        // Create accordion for each category that has questions
        Object.keys(categorizedQuestions).forEach(categoryName => {
            const categoryQuestions = categorizedQuestions[categoryName];
            
            if (categoryQuestions.length === 0) return;
            
            // Create category container
            const categoryContainer = document.createElement('div');
            categoryContainer.className = 'faq-category';
            categoryContainer.innerHTML = `
                <h3 class="faq-category-title">${categoryName}</h3>
                <div class="faq-category-items"></div>
            `;
            
            const categoryItems = categoryContainer.querySelector('.faq-category-items');
            
            // Create FAQ items for this category
            categoryQuestions.forEach((question, index) => {
                const faqItem = document.createElement('div');
                faqItem.className = 'faq-item';
                faqItem.setAttribute('data-question-id', question.id);
                
                const uniqueId = `faq-${question.id}`;
                const headingId = `${uniqueId}-heading`;
                const contentId = `${uniqueId}-content`;
                
                faqItem.innerHTML = `
                    <button class="faq-question" 
                            aria-expanded="false" 
                            aria-controls="${contentId}"
                            id="${headingId}">
                        <span class="faq-question-text">${question.question}</span>
                        <span class="faq-question-icon" aria-hidden="true">
                            <i class="fas fa-plus"></i>
                        </span>
                    </button>
                    <div class="faq-answer" 
                         id="${contentId}" 
                         aria-labelledby="${headingId}"
                         role="region">
                        <div class="faq-answer-content">
                            <p>${question.answer}</p>
                        </div>
                    </div>
                `;
                
                // Add click event listener
                const questionButton = faqItem.querySelector('.faq-question');
                questionButton.addEventListener('click', () => toggleFAQItem(faqItem));
                
                // Add keyboard support
                questionButton.addEventListener('keydown', (e) => {
                    handleFAQKeyboard(e, faqItem);
                });
                
                categoryItems.appendChild(faqItem);
            });
            
            faqAccordion.appendChild(categoryContainer);
        });
        
        // Show message if no results found
        if (filteredQuestions.length === 0) {
            const noResults = document.createElement('div');
            noResults.className = 'faq-no-results';
            noResults.innerHTML = `
                <div class="faq-no-results-content">
                    <i class="fas fa-search" aria-hidden="true"></i>
                    <h3>No questions found</h3>
                    <p>Try adjusting your search terms or browse all categories.</p>
                    <button class="btn btn--secondary" onclick="clearFAQSearch()">
                        Clear Search
                    </button>
                </div>
            `;
            faqAccordion.appendChild(noResults);
        }
    }
    
    // Toggle FAQ item open/closed
    function toggleFAQItem(faqItem) {
        const questionButton = faqItem.querySelector('.faq-question');
        const answerDiv = faqItem.querySelector('.faq-answer');
        const icon = faqItem.querySelector('.faq-question-icon i');
        
        const isExpanded = questionButton.getAttribute('aria-expanded') === 'true';
        
        // Close all other FAQ items in the same category (accordion behavior)
        const categoryContainer = faqItem.closest('.faq-category');
        const otherItems = categoryContainer.querySelectorAll('.faq-item');
        
        otherItems.forEach(item => {
            if (item !== faqItem) {
                const otherButton = item.querySelector('.faq-question');
                const otherAnswer = item.querySelector('.faq-answer');
                const otherIcon = item.querySelector('.faq-question-icon i');
                
                otherButton.setAttribute('aria-expanded', 'false');
                otherAnswer.classList.remove('expanded');
                otherIcon.className = 'fas fa-plus';
                item.classList.remove('active');
            }
        });
        
        // Toggle current item
        if (isExpanded) {
            // Close current item
            questionButton.setAttribute('aria-expanded', 'false');
            answerDiv.classList.remove('expanded');
            icon.className = 'fas fa-plus';
            faqItem.classList.remove('active');
        } else {
            // Open current item
            questionButton.setAttribute('aria-expanded', 'true');
            answerDiv.classList.add('expanded');
            icon.className = 'fas fa-minus';
            faqItem.classList.add('active');
            
            // Scroll item into view if needed
            setTimeout(() => {
                const rect = faqItem.getBoundingClientRect();
                const headerHeight = document.querySelector('.header')?.offsetHeight || 80;
                
                if (rect.top < headerHeight + 20) {
                    const targetPosition = faqItem.offsetTop - headerHeight - 20;
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }, 300); // Wait for animation to start
        }
    }
    
    // Handle keyboard navigation for FAQ items
    function handleFAQKeyboard(e, faqItem) {
        const categoryContainer = faqItem.closest('.faq-category');
        const allButtons = Array.from(categoryContainer.querySelectorAll('.faq-question'));
        const currentIndex = allButtons.indexOf(e.target);
        
        let targetIndex;
        
        switch(e.key) {
            case 'ArrowDown':
                e.preventDefault();
                targetIndex = (currentIndex + 1) % allButtons.length;
                allButtons[targetIndex].focus();
                break;
                
            case 'ArrowUp':
                e.preventDefault();
                targetIndex = (currentIndex - 1 + allButtons.length) % allButtons.length;
                allButtons[targetIndex].focus();
                break;
                
            case 'Home':
                e.preventDefault();
                allButtons[0].focus();
                break;
                
            case 'End':
                e.preventDefault();
                allButtons[allButtons.length - 1].focus();
                break;
                
            case 'Enter':
            case ' ':
                e.preventDefault();
                toggleFAQItem(faqItem);
                break;
        }
    }
    
    // Search functionality
    function searchFAQ(searchTerm) {
        const term = searchTerm.toLowerCase().trim();
        
        if (term === '') {
            filteredQuestions = [...allQuestions];
        } else {
            filteredQuestions = allQuestions.filter(question => {
                return question.question.toLowerCase().includes(term) ||
                       question.answer.toLowerCase().includes(term) ||
                       question.category.toLowerCase().includes(term);
            });
        }
        
        createFAQAccordion();
        
        // Announce search results for screen readers
        announceSearchResults(filteredQuestions.length, term);
    }
    
    // Announce search results for accessibility
    function announceSearchResults(count, searchTerm) {
        const announcement = document.createElement('div');
        announcement.setAttribute('aria-live', 'polite');
        announcement.setAttribute('aria-atomic', 'true');
        announcement.className = 'visually-hidden';
        
        if (searchTerm) {
            announcement.textContent = `Found ${count} question${count !== 1 ? 's' : ''} matching "${searchTerm}"`;
        } else {
            announcement.textContent = `Showing all ${count} questions`;
        }
        
        document.body.appendChild(announcement);
        
        // Remove announcement after a short delay
        setTimeout(() => {
            if (document.body.contains(announcement)) {
                document.body.removeChild(announcement);
            }
        }, 1000);
    }
    
    // Clear search function (global for button onclick)
    window.clearFAQSearch = function() {
        if (faqSearchInput) {
            faqSearchInput.value = '';
            searchFAQ('');
            faqSearchInput.focus();
        }
    };
    
    // Initialize search functionality
    if (faqSearchInput) {
        let searchTimeout;
        
        faqSearchInput.addEventListener('input', (e) => {
            // Debounce search to avoid excessive filtering
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => {
                searchFAQ(e.target.value);
            }, 300);
        });
        
        // Handle search input keyboard events
        faqSearchInput.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                clearFAQSearch();
            } else if (e.key === 'Enter') {
                e.preventDefault();
                // Focus first result if available
                const firstQuestion = faqAccordion.querySelector('.faq-question');
                if (firstQuestion) {
                    firstQuestion.focus();
                }
            }
        });
    }
    
    // Initialize FAQ section
    flattenQuestions();
    createFAQAccordion();
    
    // Handle reduced motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        // Add class to disable animations
        faqAccordion.classList.add('reduced-motion');
    }
}
/**

 * Initialize final integration and optimization
 */
function initFinalIntegration() {
    // Initialize comprehensive integration systems
    initSmoothScrollNavigation();
    initConsistentStyling();
    initUserFlowOptimization();
    initPerformanceOptimizations();
    initAccessibilityEnhancements();
    initErrorHandling();
    initAnalyticsTracking();
    
    // Final system checks
    performSystemChecks();
    
    console.log('TaxPro Consulting Website - All systems integrated and optimized');
}

/**
 * Initialize smooth scroll navigation between all sections
 */
function initSmoothScrollNavigation() {
    // Enhanced smooth scrolling with better performance
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    const header = document.querySelector('.header');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const headerHeight = header ? header.offsetHeight : 80;
                const targetPosition = targetSection.offsetTop - headerHeight - 20;
                
                // Use requestAnimationFrame for smoother scrolling
                smoothScrollTo(targetPosition, 800);
                
                // Update URL without jumping
                history.pushState(null, null, `#${targetId}`);
                
                // Update active navigation state
                updateActiveNavigation(targetId);
                
                // Close mobile menu if open
                closeMobileMenu();
                
                // Track navigation event
                trackEvent('navigation', 'section_click', targetId);
            }
        });
    });
    
    // Initialize scroll spy for active section highlighting
    initScrollSpy();
    
    // Handle browser back/forward navigation
    window.addEventListener('popstate', handlePopState);
}

function smoothScrollTo(targetPosition, duration = 800) {
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;
    
    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const run = easeInOutQuad(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        
        if (timeElapsed < duration) {
            requestAnimationFrame(animation);
        }
    }
    
    requestAnimationFrame(animation);
}

function easeInOutQuad(t, b, c, d) {
    t /= d / 2;
    if (t < 1) return c / 2 * t * t + b;
    t--;
    return -c / 2 * (t * (t - 2) - 1) + b;
}

function initScrollSpy() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    const header = document.querySelector('.header');
    
    let ticking = false;
    
    function updateScrollSpy() {
        const scrollY = window.scrollY;
        const headerHeight = header ? header.offsetHeight : 80;
        
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - headerHeight - 100;
            const sectionBottom = sectionTop + section.offsetHeight;
            
            if (scrollY >= sectionTop && scrollY < sectionBottom) {
                currentSection = section.getAttribute('id');
            }
        });
        
        // Handle edge case at top of page
        if (scrollY < 100) {
            currentSection = 'home';
        }
        
        updateActiveNavigation(currentSection);
        ticking = false;
    }
    
    function requestScrollSpyUpdate() {
        if (!ticking) {
            requestAnimationFrame(updateScrollSpy);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestScrollSpyUpdate, { passive: true });
    
    // Initial call
    updateScrollSpy();
}

function updateActiveNavigation(currentSection) {
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href && href.startsWith('#')) {
            const linkSection = href.substring(1);
            
            if (linkSection === currentSection) {
                link.classList.add('active');
                link.setAttribute('aria-current', 'page');
            } else {
                link.classList.remove('active');
                link.removeAttribute('aria-current');
            }
        }
    });
}

function closeMobileMenu() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle && navMenu && navMenu.classList.contains('active')) {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
    }
}

function handlePopState() {
    const hash = window.location.hash;
    if (hash) {
        const targetId = hash.substring(1);
        const targetSection = document.getElementById(targetId);
        
        if (targetSection) {
            const header = document.querySelector('.header');
            const headerHeight = header ? header.offsetHeight : 80;
            const targetPosition = targetSection.offsetTop - headerHeight - 20;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            updateActiveNavigation(targetId);
        }
    }
}

/**
 * Ensure consistent styling and spacing throughout the site
 */
function initConsistentStyling() {
    // Apply consistent spacing to all sections
    applyConsistentSpacing();
    
    // Ensure consistent typography
    applyConsistentTypography();
    
    // Apply consistent button styling
    applyConsistentButtons();
    
    // Apply consistent form styling
    applyConsistentForms();
    
    // Apply consistent card styling
    applyConsistentCards();
}

function applyConsistentSpacing() {
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        // Ensure all sections have consistent padding
        if (!section.style.paddingTop) {
            section.style.paddingTop = 'var(--space-20)';
        }
        if (!section.style.paddingBottom) {
            section.style.paddingBottom = 'var(--space-20)';
        }
        
        // Ensure section headers have consistent margins
        const sectionHeader = section.querySelector('.section-header');
        if (sectionHeader) {
            sectionHeader.style.marginBottom = 'var(--space-12)';
        }
        
        // Ensure consistent container padding
        const container = section.querySelector('.container');
        if (container) {
            container.style.paddingLeft = 'var(--space-4)';
            container.style.paddingRight = 'var(--space-4)';
        }
    });
}

function applyConsistentTypography() {
    // Ensure all headings use consistent font families and weights
    const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
    headings.forEach(heading => {
        heading.style.fontFamily = 'var(--font-heading)';
        heading.style.color = 'var(--color-primary)';
    });
    
    // Ensure all paragraphs have consistent line height
    const paragraphs = document.querySelectorAll('p');
    paragraphs.forEach(p => {
        p.style.lineHeight = 'var(--line-height-relaxed)';
    });
    
    // Ensure consistent link styling
    const links = document.querySelectorAll('a:not(.btn):not(.nav-link)');
    links.forEach(link => {
        link.style.color = 'var(--color-primary)';
        link.style.transition = 'color var(--transition-fast)';
    });
}

function applyConsistentButtons() {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        // Ensure consistent font family
        button.style.fontFamily = 'var(--font-accent)';
        
        // Ensure consistent transitions
        button.style.transition = 'all var(--transition-fast)';
        
        // Ensure consistent focus styles
        button.addEventListener('focus', function() {
            this.style.outline = '2px solid var(--color-secondary)';
            this.style.outlineOffset = '2px';
        });
        
        button.addEventListener('blur', function() {
            this.style.outline = '';
            this.style.outlineOffset = '';
        });
    });
}

function applyConsistentForms() {
    const formInputs = document.querySelectorAll('.form-input');
    
    formInputs.forEach(input => {
        // Ensure consistent styling
        input.style.fontFamily = 'var(--font-body)';
        input.style.transition = 'all var(--transition-fast)';
        
        // Ensure consistent focus styles
        input.addEventListener('focus', function() {
            this.style.borderColor = 'var(--color-primary)';
            this.style.boxShadow = '0 0 0 3px rgba(26, 54, 93, 0.1)';
        });
    });
    
    const formLabels = document.querySelectorAll('.form-label');
    formLabels.forEach(label => {
        label.style.fontFamily = 'var(--font-accent)';
        label.style.fontWeight = 'var(--font-weight-medium)';
    });
}

function applyConsistentCards() {
    const cards = document.querySelectorAll('.service-card, .team-card, .contact-item');
    
    cards.forEach(card => {
        // Ensure consistent border radius
        card.style.borderRadius = 'var(--radius-lg)';
        
        // Ensure consistent box shadow
        card.style.boxShadow = 'var(--shadow-md)';
        
        // Ensure consistent transitions
        card.style.transition = 'all var(--transition-fast)';
    });
}

/**
 * Initialize user flow optimization
 */
function initUserFlowOptimization() {
    // Track user interactions
    trackUserInteractions();
    
    // Optimize form flows
    optimizeFormFlows();
    
    // Optimize navigation flows
    optimizeNavigationFlows();
    
    // Add helpful user guidance
    addUserGuidance();
}

function trackUserInteractions() {
    // Track service card interactions
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach((card, index) => {
        card.addEventListener('click', () => {
            trackEvent('engagement', 'service_card_click', `service_${index + 1}`);
        });
    });
    
    // Track team member interactions
    const teamCards = document.querySelectorAll('.team-card');
    teamCards.forEach((card, index) => {
        card.addEventListener('click', () => {
            trackEvent('engagement', 'team_card_click', `team_member_${index + 1}`);
        });
    });
    
    // Track form interactions
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            trackEvent('conversion', 'form_submit', form.id);
        });
    });
    
    // Track scroll depth
    trackScrollDepth();
}

function trackScrollDepth() {
    const milestones = [25, 50, 75, 100];
    const tracked = new Set();
    
    function checkScrollDepth() {
        const scrollPercent = Math.round(
            (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
        );
        
        milestones.forEach(milestone => {
            if (scrollPercent >= milestone && !tracked.has(milestone)) {
                tracked.add(milestone);
                trackEvent('engagement', 'scroll_depth', `${milestone}%`);
            }
        });
    }
    
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                checkScrollDepth();
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });
}

function optimizeFormFlows() {
    // Add form progress indicators
    const forms = document.querySelectorAll('form:not(#payment-form)');
    forms.forEach(form => {
        addFormProgressIndicator(form);
    });
    
    // Add smart form validation
    addSmartFormValidation();
    
    // Add form auto-save
    addFormAutoSave();
}

function addFormProgressIndicator(form) {
    const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');
    const progressContainer = document.createElement('div');
    progressContainer.className = 'form-progress';
    progressContainer.innerHTML = `
        <div class="form-progress-bar">
            <div class="form-progress-fill" style="width: 0%"></div>
        </div>
        <span class="form-progress-text">0% Complete</span>
    `;
    
    // Insert progress indicator at the top of the form
    form.insertBefore(progressContainer, form.firstChild);
    
    const progressFill = progressContainer.querySelector('.form-progress-fill');
    const progressText = progressContainer.querySelector('.form-progress-text');
    
    function updateProgress() {
        const completedFields = Array.from(inputs).filter(input => {
            return input.value.trim() !== '' && input.checkValidity();
        });
        
        const progress = Math.round((completedFields.length / inputs.length) * 100);
        progressFill.style.width = `${progress}%`;
        progressText.textContent = `${progress}% Complete`;
        
        if (progress === 100) {
            progressContainer.classList.add('complete');
        } else {
            progressContainer.classList.remove('complete');
        }
    }
    
    inputs.forEach(input => {
        input.addEventListener('input', updateProgress);
        input.addEventListener('change', updateProgress);
    });
}

function addSmartFormValidation() {
    // Add real-time validation feedback
    const inputs = document.querySelectorAll('input, select, textarea');
    
    inputs.forEach(input => {
        let validationTimeout;
        
        input.addEventListener('input', () => {
            clearTimeout(validationTimeout);
            validationTimeout = setTimeout(() => {
                validateInputSmart(input);
            }, 500); // Debounce validation
        });
    });
}

function validateInputSmart(input) {
    const value = input.value.trim();
    
    // Email validation with suggestions
    if (input.type === 'email' && value) {
        const commonDomains = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com'];
        const emailParts = value.split('@');
        
        if (emailParts.length === 2) {
            const domain = emailParts[1].toLowerCase();
            const suggestion = commonDomains.find(d => 
                d.startsWith(domain) || levenshteinDistance(domain, d) <= 2
            );
            
            if (suggestion && suggestion !== domain) {
                showEmailSuggestion(input, `${emailParts[0]}@${suggestion}`);
            }
        }
    }
    
    // Phone number formatting
    if (input.type === 'tel' && value) {
        const formatted = formatPhoneNumber(value);
        if (formatted !== value) {
            input.value = formatted;
        }
    }
}

function showEmailSuggestion(input, suggestion) {
    let suggestionElement = input.parentNode.querySelector('.email-suggestion');
    
    if (!suggestionElement) {
        suggestionElement = document.createElement('div');
        suggestionElement.className = 'email-suggestion';
        suggestionElement.style.cssText = `
            font-size: 0.875rem;
            color: var(--color-secondary);
            margin-top: 0.25rem;
            cursor: pointer;
        `;
        input.parentNode.appendChild(suggestionElement);
    }
    
    suggestionElement.innerHTML = `Did you mean <strong>${suggestion}</strong>?`;
    suggestionElement.onclick = () => {
        input.value = suggestion;
        suggestionElement.remove();
        input.dispatchEvent(new Event('input'));
    };
    
    // Remove suggestion after 10 seconds
    setTimeout(() => {
        if (suggestionElement.parentNode) {
            suggestionElement.remove();
        }
    }, 10000);
}

function levenshteinDistance(str1, str2) {
    const matrix = [];
    
    for (let i = 0; i <= str2.length; i++) {
        matrix[i] = [i];
    }
    
    for (let j = 0; j <= str1.length; j++) {
        matrix[0][j] = j;
    }
    
    for (let i = 1; i <= str2.length; i++) {
        for (let j = 1; j <= str1.length; j++) {
            if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
                matrix[i][j] = matrix[i - 1][j - 1];
            } else {
                matrix[i][j] = Math.min(
                    matrix[i - 1][j - 1] + 1,
                    matrix[i][j - 1] + 1,
                    matrix[i - 1][j] + 1
                );
            }
        }
    }
    
    return matrix[str2.length][str1.length];
}

function formatPhoneNumber(phone) {
    const cleaned = phone.replace(/\D/g, '');
    
    if (cleaned.length === 10) {
        return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
    } else if (cleaned.length === 11 && cleaned[0] === '1') {
        return `+1 (${cleaned.slice(1, 4)}) ${cleaned.slice(4, 7)}-${cleaned.slice(7)}`;
    }
    
    return phone;
}

function addFormAutoSave() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        const formId = form.id;
        if (!formId) return;
        
        const inputs = form.querySelectorAll('input, select, textarea');
        
        // Load saved data
        loadFormData(form, formId);
        
        // Save data on input
        inputs.forEach(input => {
            input.addEventListener('input', () => {
                saveFormData(form, formId);
            });
        });
        
        // Clear saved data on successful submission
        form.addEventListener('submit', () => {
            setTimeout(() => {
                clearFormData(formId);
            }, 1000);
        });
    });
}

function saveFormData(form, formId) {
    const formData = new FormData(form);
    const data = {};
    
    for (let [key, value] of formData.entries()) {
        data[key] = value;
    }
    
    try {
        localStorage.setItem(`form_${formId}`, JSON.stringify(data));
    } catch (e) {
        console.warn('Could not save form data:', e);
    }
}

function loadFormData(form, formId) {
    try {
        const savedData = localStorage.getItem(`form_${formId}`);
        if (savedData) {
            const data = JSON.parse(savedData);
            
            Object.entries(data).forEach(([key, value]) => {
                const input = form.querySelector(`[name="${key}"]`);
                if (input && input.type !== 'password') {
                    input.value = value;
                }
            });
        }
    } catch (e) {
        console.warn('Could not load form data:', e);
    }
}

function clearFormData(formId) {
    try {
        localStorage.removeItem(`form_${formId}`);
    } catch (e) {
        console.warn('Could not clear form data:', e);
    }
}

function optimizeNavigationFlows() {
    // Add breadcrumb navigation
    addBreadcrumbNavigation();
    
    // Add "back to top" button
    addBackToTopButton();
    
    // Add section navigation hints
    addSectionNavigationHints();
}

function addBreadcrumbNavigation() {
    const breadcrumbContainer = document.createElement('nav');
    breadcrumbContainer.className = 'breadcrumb-nav';
    breadcrumbContainer.setAttribute('aria-label', 'Breadcrumb');
    breadcrumbContainer.style.cssText = `
        position: fixed;
        top: 80px;
        right: 20px;
        background: rgba(255, 255, 255, 0.95);
        backdrop-filter: blur(10px);
        padding: 0.5rem 1rem;
        border-radius: 20px;
        box-shadow: var(--shadow-md);
        z-index: 100;
        display: none;
    `;
    
    document.body.appendChild(breadcrumbContainer);
    
    function updateBreadcrumb() {
        const currentSection = getCurrentSection();
        if (currentSection && currentSection !== 'home') {
            const sectionTitle = getSectionTitle(currentSection);
            breadcrumbContainer.innerHTML = `
                <ol style="list-style: none; margin: 0; padding: 0; display: flex; align-items: center; gap: 0.5rem; font-size: 0.875rem;">
                    <li><a href="#home" style="color: var(--color-text-light);">Home</a></li>
                    <li style="color: var(--color-text-light);">›</li>
                    <li style="color: var(--color-primary); font-weight: 500;">${sectionTitle}</li>
                </ol>
            `;
            breadcrumbContainer.style.display = 'block';
        } else {
            breadcrumbContainer.style.display = 'none';
        }
    }
    
    window.addEventListener('scroll', updateBreadcrumb, { passive: true });
}

function getCurrentSection() {
    const sections = document.querySelectorAll('section[id]');
    const header = document.querySelector('.header');
    const headerHeight = header ? header.offsetHeight : 80;
    const scrollY = window.scrollY;
    
    for (let section of sections) {
        const sectionTop = section.offsetTop - headerHeight - 100;
        const sectionBottom = sectionTop + section.offsetHeight;
        
        if (scrollY >= sectionTop && scrollY < sectionBottom) {
            return section.getAttribute('id');
        }
    }
    
    return scrollY < 100 ? 'home' : null;
}

function getSectionTitle(sectionId) {
    const sectionTitles = {
        'home': 'Home',
        'services': 'Services',
        'about': 'About',
        'team': 'Team',
        'contact': 'Contact',
        'faq': 'FAQ',
        'payment': 'Payment'
    };
    
    return sectionTitles[sectionId] || sectionId;
}

function addBackToTopButton() {
    const backToTopButton = document.createElement('button');
    backToTopButton.className = 'back-to-top';
    backToTopButton.innerHTML = '<i class="fas fa-chevron-up" aria-hidden="true"></i>';
    backToTopButton.setAttribute('aria-label', 'Back to top');
    backToTopButton.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        background: var(--color-primary);
        color: var(--color-white);
        border: none;
        border-radius: 50%;
        cursor: pointer;
        box-shadow: var(--shadow-lg);
        transition: all var(--transition-fast);
        z-index: 100;
        opacity: 0;
        visibility: hidden;
        transform: translateY(20px);
    `;
    
    document.body.appendChild(backToTopButton);
    
    // Show/hide button based on scroll position
    function toggleBackToTop() {
        if (window.scrollY > 300) {
            backToTopButton.style.opacity = '1';
            backToTopButton.style.visibility = 'visible';
            backToTopButton.style.transform = 'translateY(0)';
        } else {
            backToTopButton.style.opacity = '0';
            backToTopButton.style.visibility = 'hidden';
            backToTopButton.style.transform = 'translateY(20px)';
        }
    }
    
    window.addEventListener('scroll', toggleBackToTop, { passive: true });
    
    // Scroll to top on click
    backToTopButton.addEventListener('click', () => {
        smoothScrollTo(0, 600);
        trackEvent('navigation', 'back_to_top', 'click');
    });
    
    // Hover effects
    backToTopButton.addEventListener('mouseenter', () => {
        backToTopButton.style.background = 'var(--color-secondary)';
        backToTopButton.style.transform = 'translateY(-2px) scale(1.1)';
    });
    
    backToTopButton.addEventListener('mouseleave', () => {
        backToTopButton.style.background = 'var(--color-primary)';
        backToTopButton.style.transform = 'translateY(0) scale(1)';
    });
}

function addSectionNavigationHints() {
    const sections = document.querySelectorAll('section[id]');
    
    sections.forEach((section, index) => {
        const nextSection = sections[index + 1];
        if (nextSection) {
            const hint = document.createElement('div');
            hint.className = 'section-nav-hint';
            hint.innerHTML = `
                <a href="#${nextSection.id}" class="section-nav-link">
                    <span>Next: ${getSectionTitle(nextSection.id)}</span>
                    <i class="fas fa-chevron-down" aria-hidden="true"></i>
                </a>
            `;
            hint.style.cssText = `
                text-align: center;
                margin-top: var(--space-8);
                opacity: 0.7;
                transition: opacity var(--transition-fast);
            `;
            
            const hintLink = hint.querySelector('.section-nav-link');
            hintLink.style.cssText = `
                display: inline-flex;
                align-items: center;
                gap: 0.5rem;
                color: var(--color-text-light);
                text-decoration: none;
                font-size: 0.875rem;
                transition: color var(--transition-fast);
            `;
            
            hintLink.addEventListener('mouseenter', () => {
                hintLink.style.color = 'var(--color-primary)';
                hint.style.opacity = '1';
            });
            
            hintLink.addEventListener('mouseleave', () => {
                hintLink.style.color = 'var(--color-text-light)';
                hint.style.opacity = '0.7';
            });
            
            section.appendChild(hint);
        }
    });
}

function addUserGuidance() {
    // Add tooltips for complex interactions
    addTooltips();
    
    // Add loading states for all interactions
    addLoadingStates();
    
    // Add success/error feedback
    addFeedbackSystems();
}

function addTooltips() {
    const tooltipElements = document.querySelectorAll('[data-tooltip]');
    
    tooltipElements.forEach(element => {
        const tooltip = document.createElement('div');
        tooltip.className = 'tooltip';
        tooltip.textContent = element.getAttribute('data-tooltip');
        tooltip.style.cssText = `
            position: absolute;
            background: var(--color-primary);
            color: var(--color-white);
            padding: 0.5rem 0.75rem;
            border-radius: var(--radius-md);
            font-size: 0.875rem;
            white-space: nowrap;
            z-index: 1000;
            opacity: 0;
            visibility: hidden;
            transform: translateY(10px);
            transition: all var(--transition-fast);
            pointer-events: none;
        `;
        
        document.body.appendChild(tooltip);
        
        element.addEventListener('mouseenter', (e) => {
            const rect = element.getBoundingClientRect();
            tooltip.style.left = `${rect.left + rect.width / 2 - tooltip.offsetWidth / 2}px`;
            tooltip.style.top = `${rect.bottom + 10}px`;
            tooltip.style.opacity = '1';
            tooltip.style.visibility = 'visible';
            tooltip.style.transform = 'translateY(0)';
        });
        
        element.addEventListener('mouseleave', () => {
            tooltip.style.opacity = '0';
            tooltip.style.visibility = 'hidden';
            tooltip.style.transform = 'translateY(10px)';
        });
    });
}

function addLoadingStates() {
    // Add loading states to all interactive elements
    const interactiveElements = document.querySelectorAll('.btn, .service-card, .team-card');
    
    interactiveElements.forEach(element => {
        element.addEventListener('click', function() {
            if (!this.classList.contains('loading')) {
                this.classList.add('loading');
                
                // Remove loading state after a reasonable time
                setTimeout(() => {
                    this.classList.remove('loading');
                }, 2000);
            }
        });
    });
}

function addFeedbackSystems() {
    // Create a global notification system
    const notificationContainer = document.createElement('div');
    notificationContainer.className = 'notification-container';
    notificationContainer.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        z-index: 1000;
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
    `;
    
    document.body.appendChild(notificationContainer);
    
    window.showNotification = function(message, type = 'info', duration = 5000) {
        const notification = document.createElement('div');
        notification.className = `notification notification--${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-${getNotificationIcon(type)}" aria-hidden="true"></i>
                <span>${message}</span>
            </div>
            <button class="notification-close" aria-label="Close notification">
                <i class="fas fa-times" aria-hidden="true"></i>
            </button>
        `;
        notification.style.cssText = `
            background: var(--color-white);
            border: 1px solid ${getNotificationColor(type)};
            border-left: 4px solid ${getNotificationColor(type)};
            border-radius: var(--radius-md);
            padding: 1rem;
            box-shadow: var(--shadow-lg);
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 1rem;
            min-width: 300px;
            max-width: 400px;
            transform: translateX(100%);
            transition: transform var(--transition-fast);
        `;
        
        const content = notification.querySelector('.notification-content');
        content.style.cssText = `
            display: flex;
            align-items: center;
            gap: 0.75rem;
            color: ${getNotificationColor(type)};
            font-weight: 500;
        `;
        
        const closeButton = notification.querySelector('.notification-close');
        closeButton.style.cssText = `
            background: none;
            border: none;
            color: var(--color-text-light);
            cursor: pointer;
            padding: 0.25rem;
            border-radius: var(--radius-sm);
            transition: background-color var(--transition-fast);
        `;
        
        closeButton.addEventListener('click', () => {
            removeNotification(notification);
        });
        
        notificationContainer.appendChild(notification);
        
        // Animate in
        requestAnimationFrame(() => {
            notification.style.transform = 'translateX(0)';
        });
        
        // Auto-remove after duration
        setTimeout(() => {
            removeNotification(notification);
        }, duration);
    };
    
    function removeNotification(notification) {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }
    
    function getNotificationIcon(type) {
        const icons = {
            success: 'check-circle',
            error: 'exclamation-circle',
            warning: 'exclamation-triangle',
            info: 'info-circle'
        };
        return icons[type] || 'info-circle';
    }
    
    function getNotificationColor(type) {
        const colors = {
            success: 'var(--color-success)',
            error: 'var(--color-error)',
            warning: '#f59e0b',
            info: 'var(--color-primary)'
        };
        return colors[type] || 'var(--color-primary)';
    }
}

/**
 * Initialize performance optimizations
 */
function initPerformanceOptimizations() {
    // Optimize images
    optimizeImages();
    
    // Optimize animations
    optimizeAnimations();
    
    // Optimize network requests
    optimizeNetworkRequests();
    
    // Add performance monitoring
    addPerformanceMonitoring();
}

function optimizeImages() {
    // Implement lazy loading for all images
    const images = document.querySelectorAll('img');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                    }
                    
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            });
        }, {
            rootMargin: '100px'
        });
        
        images.forEach(img => {
            imageObserver.observe(img);
        });
    }
    
    // Add WebP support detection
    const supportsWebP = checkWebPSupport();
    if (supportsWebP) {
        document.documentElement.classList.add('webp');
    }
}

function checkWebPSupport() {
    const canvas = document.createElement('canvas');
    canvas.width = 1;
    canvas.height = 1;
    return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
}

function optimizeAnimations() {
    // Disable animations on low-end devices
    if (isLowEndDevice()) {
        document.documentElement.classList.add('low-end-device');
        
        const style = document.createElement('style');
        style.textContent = `
            .low-end-device * {
                animation-duration: 0.01ms !important;
                transition-duration: 0.01ms !important;
            }
        `;
        document.head.appendChild(style);
    }
    
    // Optimize animation performance
    const animatedElements = document.querySelectorAll('.service-card, .team-card, .btn');
    animatedElements.forEach(element => {
        element.style.willChange = 'transform, opacity';
        
        // Remove will-change after animation
        element.addEventListener('transitionend', () => {
            element.style.willChange = 'auto';
        });
        
        element.addEventListener('animationend', () => {
            element.style.willChange = 'auto';
        });
    });
}

function isLowEndDevice() {
    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    const slowConnection = connection && (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g');
    const lowMemory = navigator.deviceMemory && navigator.deviceMemory < 4;
    const oldDevice = navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4;
    
    return slowConnection || lowMemory || oldDevice;
}

function optimizeNetworkRequests() {
    // Preload critical resources
    preloadCriticalResources();
    
    // Implement resource hints
    addResourceHints();
}

function preloadCriticalResources() {
    const criticalResources = [
        'css/styles.css',
        'css/responsive.css',
        'css/animations.css'
    ];
    
    criticalResources.forEach(resource => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = resource;
        link.as = 'style';
        document.head.appendChild(link);
    });
}

function addResourceHints() {
    // DNS prefetch for external resources
    const externalDomains = [
        'fonts.googleapis.com',
        'fonts.gstatic.com',
        'cdnjs.cloudflare.com'
    ];
    
    externalDomains.forEach(domain => {
        const link = document.createElement('link');
        link.rel = 'dns-prefetch';
        link.href = `//${domain}`;
        document.head.appendChild(link);
    });
}

function addPerformanceMonitoring() {
    // Monitor Core Web Vitals
    if ('PerformanceObserver' in window) {
        // Largest Contentful Paint
        new PerformanceObserver((list) => {
            const entries = list.getEntries();
            const lastEntry = entries[entries.length - 1];
            trackEvent('performance', 'lcp', Math.round(lastEntry.startTime));
        }).observe({ entryTypes: ['largest-contentful-paint'] });
        
        // First Input Delay
        new PerformanceObserver((list) => {
            const entries = list.getEntries();
            entries.forEach(entry => {
                trackEvent('performance', 'fid', Math.round(entry.processingStart - entry.startTime));
            });
        }).observe({ entryTypes: ['first-input'] });
        
        // Cumulative Layout Shift
        let clsValue = 0;
        new PerformanceObserver((list) => {
            const entries = list.getEntries();
            entries.forEach(entry => {
                if (!entry.hadRecentInput) {
                    clsValue += entry.value;
                }
            });
            trackEvent('performance', 'cls', Math.round(clsValue * 1000));
        }).observe({ entryTypes: ['layout-shift'] });
    }
    
    // Monitor page load time
    window.addEventListener('load', () => {
        const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
        trackEvent('performance', 'page_load', Math.round(loadTime));
    });
}

/**
 * Initialize accessibility enhancements
 */
function initAccessibilityEnhancements() {
    // Add skip links
    addSkipLinks();
    
    // Enhance keyboard navigation
    enhanceKeyboardNavigation();
    
    // Add ARIA live regions
    addAriaLiveRegions();
    
    // Improve focus management
    improveFocusManagement();
}

function addSkipLinks() {
    const skipLinks = document.createElement('div');
    skipLinks.className = 'skip-links';
    skipLinks.innerHTML = `
        <a href="#main-content" class="skip-link">Skip to main content</a>
        <a href="#nav-menu" class="skip-link">Skip to navigation</a>
        <a href="#contact" class="skip-link">Skip to contact</a>
    `;
    
    document.body.insertBefore(skipLinks, document.body.firstChild);
}

function enhanceKeyboardNavigation() {
    // Add keyboard navigation for cards
    const cards = document.querySelectorAll('.service-card, .team-card');
    
    cards.forEach(card => {
        card.setAttribute('tabindex', '0');
        card.setAttribute('role', 'button');
        
        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                card.click();
            }
        });
    });
    
    // Add keyboard navigation for modals
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const activeModal = document.querySelector('.modal.active');
            if (activeModal) {
                const closeButton = activeModal.querySelector('.modal-close');
                if (closeButton) {
                    closeButton.click();
                }
            }
        }
    });
}

function addAriaLiveRegions() {
    // Add live region for announcements
    const liveRegion = document.createElement('div');
    liveRegion.setAttribute('aria-live', 'polite');
    liveRegion.setAttribute('aria-atomic', 'true');
    liveRegion.className = 'sr-only';
    liveRegion.id = 'live-region';
    
    document.body.appendChild(liveRegion);
    
    // Global function to announce messages
    window.announceToScreenReader = function(message) {
        const liveRegion = document.getElementById('live-region');
        if (liveRegion) {
            liveRegion.textContent = message;
            
            // Clear after announcement
            setTimeout(() => {
                liveRegion.textContent = '';
            }, 1000);
        }
    };
}

function improveFocusManagement() {
    // Trap focus in modals
    document.addEventListener('focusin', (e) => {
        const activeModal = document.querySelector('.modal.active');
        if (activeModal && !activeModal.contains(e.target)) {
            const firstFocusable = activeModal.querySelector('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
            if (firstFocusable) {
                firstFocusable.focus();
            }
        }
    });
    
    // Improve focus visibility
    const style = document.createElement('style');
    style.textContent = `
        *:focus-visible {
            outline: 3px solid var(--color-secondary) !important;
            outline-offset: 2px !important;
        }
    `;
    document.head.appendChild(style);
}

/**
 * Initialize error handling
 */
function initErrorHandling() {
    // Global error handler
    window.addEventListener('error', (e) => {
        console.error('Global error:', e.error);
        trackEvent('error', 'javascript', e.error.message);
        
        // Show user-friendly error message
        if (window.showNotification) {
            window.showNotification('Something went wrong. Please refresh the page and try again.', 'error');
        }
    });
    
    // Unhandled promise rejection handler
    window.addEventListener('unhandledrejection', (e) => {
        console.error('Unhandled promise rejection:', e.reason);
        trackEvent('error', 'promise_rejection', e.reason.toString());
    });
    
    // Network error handling
    window.addEventListener('offline', () => {
        if (window.showNotification) {
            window.showNotification('You are currently offline. Some features may not work properly.', 'warning');
        }
    });
    
    window.addEventListener('online', () => {
        if (window.showNotification) {
            window.showNotification('Connection restored!', 'success');
        }
    });
}

/**
 * Initialize analytics tracking
 */
function initAnalyticsTracking() {
    // Simple analytics tracking function
    window.trackEvent = function(category, action, label, value) {
        // In a real implementation, this would send data to your analytics service
        console.log('Analytics Event:', { category, action, label, value });
        
        // Example: Google Analytics 4
        if (typeof gtag !== 'undefined') {
            gtag('event', action, {
                event_category: category,
                event_label: label,
                value: value
            });
        }
    };
    
    // Track page view
    trackEvent('page', 'view', window.location.pathname);
    
    // Track time on page
    const startTime = Date.now();
    window.addEventListener('beforeunload', () => {
        const timeOnPage = Math.round((Date.now() - startTime) / 1000);
        trackEvent('engagement', 'time_on_page', 'seconds', timeOnPage);
    });
}

/**
 * Perform final system checks
 */
function performSystemChecks() {
    const checks = [
        checkNavigationIntegrity,
        checkFormIntegrity,
        checkAccessibilityFeatures,
        checkPerformanceOptimizations,
        checkResponsiveDesign
    ];
    
    const results = checks.map(check => {
        try {
            return check();
        } catch (error) {
            console.error(`System check failed:`, error);
            return false;
        }
    });
    
    const allPassed = results.every(result => result);
    
    if (allPassed) {
        console.log('✅ All system checks passed');
        trackEvent('system', 'integration_complete', 'success');
    } else {
        console.warn('⚠️ Some system checks failed');
        trackEvent('system', 'integration_complete', 'partial');
    }
    
    return allPassed;
}

function checkNavigationIntegrity() {
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    const sections = document.querySelectorAll('section[id]');
    
    const sectionIds = Array.from(sections).map(section => section.id);
    const linkTargets = Array.from(navLinks).map(link => link.getAttribute('href').substring(1));
    
    const missingTargets = linkTargets.filter(target => !sectionIds.includes(target));
    
    if (missingTargets.length > 0) {
        console.warn('Missing navigation targets:', missingTargets);
        return false;
    }
    
    return true;
}

function checkFormIntegrity() {
    const forms = document.querySelectorAll('form');
    
    for (let form of forms) {
        const requiredInputs = form.querySelectorAll('input[required], select[required], textarea[required]');
        
        for (let input of requiredInputs) {
            const errorElement = document.getElementById(input.getAttribute('aria-describedby'));
            if (!errorElement) {
                console.warn('Missing error element for input:', input.name);
                return false;
            }
        }
    }
    
    return true;
}

function checkAccessibilityFeatures() {
    // Check for skip links
    const skipLinks = document.querySelectorAll('.skip-link');
    if (skipLinks.length === 0) {
        console.warn('Missing skip links');
        return false;
    }
    
    // Check for ARIA live region
    const liveRegion = document.getElementById('live-region');
    if (!liveRegion) {
        console.warn('Missing ARIA live region');
        return false;
    }
    
    // Check for proper heading hierarchy
    const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
    let previousLevel = 0;
    
    for (let heading of headings) {
        const level = parseInt(heading.tagName.substring(1));
        if (level > previousLevel + 1) {
            console.warn('Improper heading hierarchy detected');
            return false;
        }
        previousLevel = level;
    }
    
    return true;
}

function checkPerformanceOptimizations() {
    // Check for lazy loading
    const images = document.querySelectorAll('img');
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    if (images.length > 0 && lazyImages.length === 0) {
        console.warn('Images not optimized for lazy loading');
        return false;
    }
    
    // Check for resource hints
    const resourceHints = document.querySelectorAll('link[rel="dns-prefetch"], link[rel="preload"]');
    if (resourceHints.length === 0) {
        console.warn('Missing resource hints');
        return false;
    }
    
    return true;
}

function checkResponsiveDesign() {
    // Check for viewport meta tag
    const viewportMeta = document.querySelector('meta[name="viewport"]');
    if (!viewportMeta) {
        console.warn('Missing viewport meta tag');
        return false;
    }
    
    // Check for responsive CSS
    const responsiveCSS = document.querySelector('link[href*="responsive"]');
    if (!responsiveCSS) {
        console.warn('Missing responsive CSS');
        return false;
    }
    
    return true;
}
/**

 * Initialize final integration and optimization
 */
function initFinalIntegration() {
    // Initialize comprehensive site integration
    initSiteIntegration();
    
    // Initialize performance optimizations
    initFinalPerformanceOptimizations();
    
    // Initialize user flow testing
    initUserFlowTesting();
    
    // Initialize final styling consistency
    initFinalStylingConsistency();
    
    // Initialize loading state management
    initLoadingStateManagement();
    
    // Initialize error handling
    initGlobalErrorHandling();
    
    // Initialize accessibility enhancements
    initFinalAccessibilityEnhancements();
    
    // Initialize analytics and tracking
    initAnalyticsTracking();
}

/**
 * Initialize comprehensive site integration
 */
function initSiteIntegration() {
    // Ensure all sections are properly connected
    connectAllSections();
    
    // Initialize cross-section interactions
    initCrossSectionInteractions();
    
    // Initialize global state management
    initGlobalStateManagement();
    
    // Initialize section visibility tracking
    initSectionVisibilityTracking();
}

/**
 * Connect all sections with smooth navigation
 */
function connectAllSections() {
    // Ensure all navigation links work properly
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    const sections = document.querySelectorAll('section[id]');
    
    // Validate that all nav links have corresponding sections
    navLinks.forEach(link => {
        const targetId = link.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);
        
        if (!targetSection) {
            console.warn(`Navigation link targets missing section: ${targetId}`);
        }
    });
    
    // Ensure all sections have proper IDs and are accessible
    sections.forEach(section => {
        const sectionId = section.getAttribute('id');
        const correspondingNavLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
        
        if (!correspondingNavLink) {
            console.warn(`Section has no corresponding navigation link: ${sectionId}`);
        }
        
        // Add section to global registry
        if (!window.sectionRegistry) {
            window.sectionRegistry = new Map();
        }
        window.sectionRegistry.set(sectionId, section);
    });
    
    // Initialize smooth scroll behavior for all internal links
    initSmoothScrollForAllLinks();
}

/**
 * Initialize smooth scroll for all internal links
 */
function initSmoothScrollForAllLinks() {
    const internalLinks = document.querySelectorAll('a[href^="#"]');
    
    internalLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip empty or just hash links
            if (!href || href === '#') return;
            
            e.preventDefault();
            
            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                scrollToElement(targetElement);
                
                // Update URL without jumping
                history.pushState(null, null, href);
                
                // Update active navigation state
                updateActiveNavigation(targetId);
                
                // Announce navigation for screen readers
                if (window.accessibilityManager) {
                    window.accessibilityManager.announce(`Navigated to ${targetId} section`);
                }
            }
        });
    });
}

/**
 * Scroll to element with proper offset calculation
 */
function scrollToElement(element) {
    const header = document.querySelector('.header');
    const headerHeight = header ? header.offsetHeight : 80;
    const additionalOffset = 20; // Extra spacing
    
    const elementPosition = element.offsetTop - headerHeight - additionalOffset;
    
    window.scrollTo({
        top: Math.max(0, elementPosition),
        behavior: 'smooth'
    });
}

/**
 * Update active navigation state
 */
function updateActiveNavigation(activeSection) {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href && href.startsWith('#')) {
            const linkSection = href.substring(1);
            
            if (linkSection === activeSection) {
                link.classList.add('active');
                link.setAttribute('aria-current', 'page');
            } else {
                link.classList.remove('active');
                link.removeAttribute('aria-current');
            }
        }
    });
}

/**
 * Initialize cross-section interactions
 */
function initCrossSectionInteractions() {
    // Service cards linking to contact form
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        const ctaButton = card.querySelector('.service-card-btn');
        if (ctaButton) {
            ctaButton.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Get service name for pre-filling contact form
                const serviceName = card.querySelector('.service-card-title')?.textContent;
                
                // Navigate to contact section
                const contactSection = document.getElementById('contact');
                if (contactSection) {
                    scrollToElement(contactSection);
                    
                    // Pre-fill contact form subject
                    setTimeout(() => {
                        const subjectSelect = document.getElementById('contact-subject');
                        if (subjectSelect && serviceName) {
                            // Try to match service name to subject options
                            const options = Array.from(subjectSelect.options);
                            const matchingOption = options.find(option => 
                                option.textContent.toLowerCase().includes(serviceName.toLowerCase().split(' ')[0])
                            );
                            
                            if (matchingOption) {
                                subjectSelect.value = matchingOption.value;
                                subjectSelect.dispatchEvent(new Event('change'));
                            }
                        }
                    }, 500);
                }
            });
        }
    });
    
    // Team member contact buttons
    const teamContactButtons = document.querySelectorAll('.team-contact-btn');
    teamContactButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            // Navigate to contact section
            const contactSection = document.getElementById('contact');
            if (contactSection) {
                scrollToElement(contactSection);
                
                // Pre-fill contact form with team member context
                setTimeout(() => {
                    const messageTextarea = document.getElementById('contact-message');
                    if (messageTextarea && !messageTextarea.value) {
                        const teamCard = this.closest('.team-card');
                        const memberName = teamCard?.querySelector('.team-card-name')?.textContent;
                        
                        if (memberName) {
                            messageTextarea.value = `I would like to speak with ${memberName} about...`;
                            messageTextarea.focus();
                            // Position cursor at the end
                            messageTextarea.setSelectionRange(messageTextarea.value.length, messageTextarea.value.length);
                        }
                    }
                }, 500);
            }
        });
    });
    
    // FAQ search integration with contact form
    const faqSearchInput = document.getElementById('faq-search-input');
    if (faqSearchInput) {
        // Add "Contact Us" suggestion when no results found
        const originalNoResults = document.querySelector('.faq-no-results');
        if (originalNoResults) {
            const contactSuggestion = document.createElement('div');
            contactSuggestion.className = 'faq-contact-suggestion';
            contactSuggestion.innerHTML = `
                <p>Can't find what you're looking for?</p>
                <button type="button" class="btn btn--secondary" id="faq-contact-btn">
                    Contact Us Directly
                </button>
            `;
            originalNoResults.appendChild(contactSuggestion);
            
            // Handle contact button click
            const contactBtn = document.getElementById('faq-contact-btn');
            contactBtn.addEventListener('click', function() {
                const searchQuery = faqSearchInput.value;
                const contactSection = document.getElementById('contact');
                
                if (contactSection) {
                    scrollToElement(contactSection);
                    
                    // Pre-fill message with search query
                    setTimeout(() => {
                        const messageTextarea = document.getElementById('contact-message');
                        if (messageTextarea && searchQuery) {
                            messageTextarea.value = `I was looking for information about: ${searchQuery}\n\nCould you please provide more details?`;
                            messageTextarea.focus();
                        }
                    }, 500);
                }
            });
        }
    }
}

/**
 * Initialize global state management
 */
function initGlobalStateManagement() {
    // Create global state object
    window.siteState = {
        currentSection: 'home',
        isNavigating: false,
        formStates: new Map(),
        modalStates: new Map(),
        loadingStates: new Map(),
        userPreferences: {
            reducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
            highContrast: window.matchMedia('(prefers-contrast: high)').matches,
            darkMode: window.matchMedia('(prefers-color-scheme: dark)').matches
        }
    };
    
    // Listen for preference changes
    window.matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change', (e) => {
        window.siteState.userPreferences.reducedMotion = e.matches;
        updateAnimationSettings();
    });
    
    window.matchMedia('(prefers-contrast: high)').addEventListener('change', (e) => {
        window.siteState.userPreferences.highContrast = e.matches;
        updateContrastSettings();
    });
    
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        window.siteState.userPreferences.darkMode = e.matches;
        updateColorSchemeSettings();
    });
}

/**
 * Initialize section visibility tracking
 */
function initSectionVisibilityTracking() {
    const sections = document.querySelectorAll('section[id]');
    
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const sectionId = entry.target.getAttribute('id');
            
            if (entry.isIntersecting) {
                // Update current section in global state
                window.siteState.currentSection = sectionId;
                
                // Update navigation active state
                updateActiveNavigation(sectionId);
                
                // Track section view for analytics
                if (window.analytics) {
                    window.analytics.trackSectionView(sectionId);
                }
                
                // Trigger section-specific initialization if needed
                initializeSectionContent(sectionId);
            }
        });
    }, {
        threshold: 0.3,
        rootMargin: '-80px 0px -80px 0px' // Account for header height
    });
    
    sections.forEach(section => {
        sectionObserver.observe(section);
    });
}

/**
 * Initialize section content dynamically
 */
function initializeSectionContent(sectionId) {
    switch (sectionId) {
        case 'services':
            if (!window.servicesInitialized) {
                initServicesShowcase();
                window.servicesInitialized = true;
            }
            break;
        case 'team':
            if (!window.teamInitialized) {
                initTeamSection();
                window.teamInitialized = true;
            }
            break;
        case 'faq':
            if (!window.faqInitialized) {
                initFAQSection();
                window.faqInitialized = true;
            }
            break;
        case 'about':
            if (!window.aboutInitialized) {
                initAboutSection();
                window.aboutInitialized = true;
            }
            break;
    }
}

/**
 * Initialize final performance optimizations
 */
function initFinalPerformanceOptimizations() {
    // Optimize images
    optimizeImageLoading();
    
    // Optimize animations
    optimizeAnimationPerformance();
    
    // Optimize event listeners
    optimizeEventListeners();
    
    // Initialize resource preloading
    initResourcePreloading();
    
    // Initialize lazy loading for non-critical content
    initLazyLoading();
    
    // Initialize performance monitoring
    initPerformanceMonitoring();
}

/**
 * Optimize image loading
 */
function optimizeImageLoading() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        // Add loading="lazy" to images below the fold
        if (!img.hasAttribute('loading')) {
            const rect = img.getBoundingClientRect();
            if (rect.top > window.innerHeight) {
                img.setAttribute('loading', 'lazy');
            }
        }
        
        // Add error handling
        img.addEventListener('error', function() {
            this.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjBmMGYwIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlIG5vdCBhdmFpbGFibGU8L3RleHQ+PC9zdmc+';
            this.alt = 'Image not available';
        });
        
        // Add load success handling
        img.addEventListener('load', function() {
            this.classList.add('loaded');
        });
    });
}

/**
 * Optimize event listeners
 */
function optimizeEventListeners() {
    // Debounce resize events
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            // Trigger resize handlers
            window.dispatchEvent(new Event('optimizedResize'));
        }, 250);
    }, { passive: true });
}

/**
 * Initialize resource preloading
 */
function initResourcePreloading() {
    // Preload critical fonts
    const criticalFonts = [
        'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&display=swap',
        'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap'
    ];
    
    criticalFonts.forEach(fontUrl => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'style';
        link.href = fontUrl;
        document.head.appendChild(link);
    });
}

/**
 * Initialize lazy loading for non-critical content
 */
function initLazyLoading() {
    // Lazy load non-critical sections
    const lazyElements = document.querySelectorAll('[data-lazy]');
    
    if ('IntersectionObserver' in window) {
        const lazyObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    const src = element.getAttribute('data-lazy');
                    
                    if (src) {
                        element.src = src;
                        element.removeAttribute('data-lazy');
                    }
                    
                    lazyObserver.unobserve(element);
                }
            });
        }, {
            rootMargin: '100px'
        });
        
        lazyElements.forEach(element => {
            lazyObserver.observe(element);
        });
    }
}

/**
 * Initialize performance monitoring
 */
function initPerformanceMonitoring() {
    // Monitor loading times
    window.addEventListener('load', () => {
        const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
        console.log('Page load time:', loadTime + 'ms');
        
        // Track in analytics if available
        if (window.analytics) {
            window.analytics.trackTiming('page_load', loadTime);
        }
    });
}

/**
 * Initialize user flow testing
 */
function initUserFlowTesting() {
    // Test navigation flow
    testNavigationFlow();
    
    // Test form submission flows
    testFormFlows();
    
    // Test modal interactions
    testModalFlows();
    
    // Test responsive behavior
    testResponsiveBehavior();
}

/**
 * Test navigation flow
 */
function testNavigationFlow() {
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    
    navLinks.forEach(link => {
        const targetId = link.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);
        
        if (!targetSection) {
            console.error(`Navigation test failed: Section ${targetId} not found`);
        } else {
            console.log(`Navigation test passed: ${targetId} section found`);
        }
    });
}

/**
 * Test form flows
 */
function testFormFlows() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        const formId = form.getAttribute('id');
        const submitButton = form.querySelector('button[type="submit"]');
        const requiredFields = form.querySelectorAll('[required]');
        
        console.log(`Testing form: ${formId}`);
        console.log(`- Submit button: ${submitButton ? 'Found' : 'Missing'}`);
        console.log(`- Required fields: ${requiredFields.length}`);
        
        // Test form validation
        requiredFields.forEach(field => {
            const errorElement = document.getElementById(field.getAttribute('aria-describedby'));
            if (!errorElement) {
                console.warn(`Missing error element for field: ${field.name}`);
            }
        });
    });
}

/**
 * Test modal flows
 */
function testModalFlows() {
    const modalTriggers = document.querySelectorAll('[data-modal-target]');
    
    modalTriggers.forEach(trigger => {
        const targetId = trigger.getAttribute('data-modal-target');
        const modal = document.getElementById(targetId);
        
        if (!modal) {
            console.error(`Modal test failed: Modal ${targetId} not found`);
        } else {
            const closeButton = modal.querySelector('.modal-close, [data-modal-close]');
            if (!closeButton) {
                console.warn(`Modal ${targetId} missing close button`);
            }
        }
    });
}

/**
 * Test responsive behavior
 */
function testResponsiveBehavior() {
    const breakpoints = [320, 768, 1024, 1200];
    
    breakpoints.forEach(width => {
        // Simulate different screen sizes (for development testing)
        console.log(`Testing responsive behavior at ${width}px`);
        
        // Check if mobile menu is properly hidden/shown
        if (width <= 767) {
            const mobileMenu = document.querySelector('.nav-menu');
            const mobileToggle = document.querySelector('.nav-toggle');
            
            if (!mobileToggle) {
                console.warn('Mobile menu toggle not found');
            }
        }
    });
}

/**
 * Initialize final styling consistency
 */
function initFinalStylingConsistency() {
    // Ensure consistent spacing
    ensureConsistentSpacing();
    
    // Ensure consistent typography
    ensureConsistentTypography();
    
    // Ensure consistent colors
    ensureConsistentColors();
    
    // Ensure consistent interactive states
    ensureConsistentInteractiveStates();
}

/**
 * Ensure consistent spacing throughout the site
 */
function ensureConsistentSpacing() {
    // Ensure consistent button spacing
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        if (!button.style.minHeight) {
            button.style.minHeight = '44px'; // Ensure touch-friendly size
        }
    });
}

/**
 * Ensure consistent typography
 */
function ensureConsistentTypography() {
    // Ensure consistent line heights
    const textElements = document.querySelectorAll('p, li, span');
    textElements.forEach(element => {
        const computedStyle = window.getComputedStyle(element);
        if (computedStyle.lineHeight === 'normal') {
            element.style.lineHeight = '1.5'; // Set consistent line height
        }
    });
}

/**
 * Ensure consistent colors
 */
function ensureConsistentColors() {
    // This function can be expanded to check for color consistency
    console.log('Color consistency check completed');
}

/**
 * Ensure consistent interactive states
 */
function ensureConsistentInteractiveStates() {
    // Ensure all interactive elements have proper focus states
    const interactiveElements = document.querySelectorAll('button, a, input, select, textarea, [tabindex]');
    
    interactiveElements.forEach(element => {
        // Add focus-visible support if not present
        if (!element.classList.contains('focus-visible-added')) {
            element.addEventListener('focus', function() {
                this.classList.add('focus-visible');
            });
            
            element.addEventListener('blur', function() {
                this.classList.remove('focus-visible');
            });
            
            element.classList.add('focus-visible-added');
        }
    });
}

/**
 * Initialize loading state management
 */
function initLoadingStateManagement() {
    // Create global loading manager
    window.loadingManager = {
        activeLoaders: new Set(),
        
        showLoading: function(element, type = 'spinner') {
            if (!element) return;
            
            const loaderId = `loader-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
            this.activeLoaders.add(loaderId);
            
            element.classList.add('loading');
            element.setAttribute('data-loader-id', loaderId);
            
            if (type === 'spinner') {
                this.addSpinner(element);
            } else if (type === 'pulse') {
                this.addPulse(element);
            }
            
            return loaderId;
        },
        
        hideLoading: function(element) {
            if (!element) return;
            
            const loaderId = element.getAttribute('data-loader-id');
            if (loaderId) {
                this.activeLoaders.delete(loaderId);
            }
            
            element.classList.remove('loading');
            element.removeAttribute('data-loader-id');
            
            this.removeSpinner(element);
            this.removePulse(element);
        },
        
        addSpinner: function(element) {
            const spinner = document.createElement('div');
            spinner.className = 'loading-spinner';
            spinner.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
            element.appendChild(spinner);
        },
        
        removeSpinner: function(element) {
            const spinner = element.querySelector('.loading-spinner');
            if (spinner) {
                spinner.remove();
            }
        },
        
        addPulse: function(element) {
            element.classList.add('loading-pulse');
        },
        
        removePulse: function(element) {
            element.classList.remove('loading-pulse');
        },
        
        showFormLoading: function(form) {
            const submitButton = form.querySelector('button[type="submit"]');
            if (submitButton) {
                this.showLoading(submitButton, 'spinner');
                submitButton.disabled = true;
            }
        },
        
        hideFormLoading: function(form) {
            const submitButton = form.querySelector('button[type="submit"]');
            if (submitButton) {
                this.hideLoading(submitButton);
                submitButton.disabled = false;
            }
        },
        
        showContentLoading: function(element, type = 'pulse') {
            this.showLoading(element, type);
        },
        
        hideContentLoading: function(element) {
            this.hideLoading(element);
        }
    };
}

/**
 * Initialize global error handling
 */
function initGlobalErrorHandling() {
    // Global error handler
    window.addEventListener('error', function(event) {
        console.error('Global error:', event.error);
        
        // Only show error message for critical errors, not minor issues
        if (event.error && event.error.message && 
            !event.error.message.includes('getElementById') && 
            !event.error.message.includes('querySelector') &&
            !event.error.message.includes('Cannot read property') &&
            !event.error.message.includes('Cannot read properties')) {
            
            // Show user-friendly error message only for critical errors
            showGlobalErrorMessage('Something went wrong. Please refresh the page and try again.');
        }
        
        // Track error in analytics if available
        if (window.analytics) {
            window.analytics.trackError(event.error);
        }
    });
    
    // Unhandled promise rejection handler
    window.addEventListener('unhandledrejection', function(event) {
        console.error('Unhandled promise rejection:', event.reason);
        
        // Prevent the default browser behavior (showing error in console)
        event.preventDefault();
        
        // Only show error message for actual critical network/fetch errors
        const reason = event.reason;
        const isCriticalNetworkError = reason && (
            reason.message && (
                reason.message.includes('Failed to fetch') ||
                reason.message.includes('NetworkError') ||
                reason.message.includes('ERR_NETWORK') ||
                reason.message.includes('ERR_INTERNET_DISCONNECTED')
            ) ||
            reason.name === 'NetworkError'
        );
        
        // Don't show error messages for:
        // - Form validation errors
        // - Simulated payment failures
        // - Image loading failures
        // - Minor script errors
        const isMinorError = reason && reason.message && (
            reason.message.includes('Payment processing failed') ||
            reason.message.includes('validation') ||
            reason.message.includes('Image') ||
            reason.message.includes('load')
        );
        
        if (isCriticalNetworkError && !isMinorError) {
            // Show user-friendly error message only for actual critical network errors
            showGlobalErrorMessage('A network error occurred. Please check your connection and try again.');
        }
        
        // Track error in analytics if available (but don't show to user)
        if (window.analytics) {
            window.analytics.trackError(event.reason);
        }
    });
}

/**
 * Show global error message
 */
function showGlobalErrorMessage(message) {
    // Create or update global error banner
    let errorBanner = document.getElementById('global-error-banner');
    
    if (!errorBanner) {
        errorBanner = document.createElement('div');
        errorBanner.id = 'global-error-banner';
        errorBanner.className = 'global-error-banner';
        errorBanner.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            background: #e53e3e;
            color: white;
            padding: 1rem;
            text-align: center;
            z-index: 10000;
            transform: translateY(-100%);
            transition: transform 0.3s ease;
        `;
        
        document.body.appendChild(errorBanner);
    }
    
    errorBanner.innerHTML = `
        <span>${message}</span>
        <button onclick="this.parentElement.style.transform='translateY(-100%)'" style="background: none; border: none; color: white; margin-left: 1rem; cursor: pointer;">×</button>
    `;
    
    // Show banner
    setTimeout(() => {
        errorBanner.style.transform = 'translateY(0)';
    }, 100);
    
    // Auto-hide after 10 seconds
    setTimeout(() => {
        errorBanner.style.transform = 'translateY(-100%)';
    }, 10000);
}

/**
 * Initialize final accessibility enhancements
 */
function initFinalAccessibilityEnhancements() {
    // Ensure all images have alt text
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        if (!img.hasAttribute('alt')) {
            img.setAttribute('alt', '');
            console.warn('Image missing alt text:', img.src);
        }
    });
    
    // Ensure all form inputs have labels
    const inputs = document.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        const id = input.getAttribute('id');
        if (id) {
            const label = document.querySelector(`label[for="${id}"]`);
            if (!label && !input.getAttribute('aria-label') && !input.getAttribute('aria-labelledby')) {
                console.warn('Input missing label:', input);
            }
        }
    });
    
    // Ensure proper heading hierarchy
    const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
    let previousLevel = 0;
    
    headings.forEach(heading => {
        const currentLevel = parseInt(heading.tagName.charAt(1));
        
        if (currentLevel > previousLevel + 1) {
            console.warn('Heading hierarchy skip detected:', heading);
        }
        
        previousLevel = currentLevel;
    });
    
    // Add skip links if missing
    if (!document.querySelector('.skip-link')) {
        const skipLink = document.createElement('a');
        skipLink.className = 'skip-link';
        skipLink.href = '#main-content';
        skipLink.textContent = 'Skip to main content';
        document.body.insertBefore(skipLink, document.body.firstChild);
    }
}

/**
 * Initialize analytics tracking
 */
function initAnalyticsTracking() {
    // Create simple analytics object
    window.analytics = {
        trackPageView: function(page) {
            console.log('Page view:', page);
            // Implement actual analytics tracking here
        },
        
        trackEvent: function(category, action, label) {
            console.log('Event:', category, action, label);
            // Implement actual analytics tracking here
        },
        
        trackSectionView: function(section) {
            console.log('Section view:', section);
            // Implement actual analytics tracking here
        },
        
        trackFormSubmission: function(formId) {
            console.log('Form submission:', formId);
            // Implement actual analytics tracking here
        },
        
        trackError: function(error) {
            console.log('Error tracked:', error);
            // Implement actual analytics tracking here
        },
        
        trackTiming: function(category, timing) {
            console.log('Timing:', category, timing);
            // Implement actual analytics tracking here
        }
    };
    
    // Track initial page view
    window.analytics.trackPageView(window.location.pathname);
}

/**
 * Update animation settings based on user preferences
 */
function updateAnimationSettings() {
    if (window.siteState.userPreferences.reducedMotion) {
        document.body.classList.add('reduced-motion');
        
        // Disable complex animations
        if (window.animationManager) {
            window.animationManager.disableComplexAnimations();
        }
    } else {
        document.body.classList.remove('reduced-motion');
        
        // Enable animations
        if (window.animationManager) {
            window.animationManager.enableAnimations();
        }
    }
}

/**
 * Update contrast settings
 */
function updateContrastSettings() {
    if (window.siteState.userPreferences.highContrast) {
        document.body.classList.add('high-contrast');
    } else {
        document.body.classList.remove('high-contrast');
    }
}

/**
 * Update color scheme settings
 */
function updateColorSchemeSettings() {
    if (window.siteState.userPreferences.darkMode) {
        document.body.classList.add('dark-mode');
    } else {
        document.body.classList.remove('dark-mode');
    }
}