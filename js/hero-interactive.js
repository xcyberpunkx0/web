// Interactive Hero Section JavaScript
// Enhanced functionality for dynamic hero section

class InteractiveHero {
    constructor() {
        this.currentSlide = 0;
        this.slides = [];
        this.particles = [];
        this.typingTexts = [
            'Tax Consulting',
            'Business Advisory',
            'Financial Planning',
            'Audit Services',
            'Tax Preparation'
        ];
        this.currentTextIndex = 0;
        this.isTyping = false;
        
        this.init();
    }

    init() {
        try {
            // Initialize all hero components
            this.createParticles();
            this.initCarousel();
            this.initTypingEffect();
            this.initCounterAnimation();
            this.initQuickActions();
            this.initScrollIndicator();
            this.initParallaxEffect();
            
            // Start animations
            this.startAnimations();
        } catch (error) {
            console.warn('Hero initialization error:', error);
            // Continue without hero enhancements if there's an error
        }
    }

    /**
     * Create floating particles
     */
    createParticles() {
        try {
            const particlesContainer = document.getElementById('hero-particles');
            if (!particlesContainer) return;

            const particleCount = window.innerWidth > 768 ? 50 : 25;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            // Random size and position
            const size = Math.random() * 4 + 2;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.top = `${Math.random() * 100}%`;
            
            // Random animation delay and duration
            particle.style.animationDelay = `${Math.random() * 6}s`;
            particle.style.animationDuration = `${6 + Math.random() * 4}s`;
            
            particlesContainer.appendChild(particle);
            this.particles.push(particle);
        }
        } catch (error) {
            console.warn('Particles creation error:', error);
        }
    }

    /**
     * Initialize carousel functionality
     */
    initCarousel() {
        // Carousel data
        this.slides = [
            {
                icon: 'fas fa-file-invoice-dollar',
                title: 'Tax Filing & Preparation',
                description: 'Professional tax preparation with maximum deductions and compliance assurance.'
            },
            {
                icon: 'fas fa-chart-line',
                title: 'Business Growth Advisory',
                description: 'Strategic consulting to accelerate your business growth and profitability.'
            },
            {
                icon: 'fas fa-calculator',
                title: 'Financial Planning',
                description: 'Comprehensive financial planning for individuals and businesses.'
            },
            {
                icon: 'fas fa-shield-alt',
                title: 'Audit & Compliance',
                description: 'Thorough auditing services ensuring regulatory compliance and accuracy.'
            },
            {
                icon: 'fas fa-handshake',
                title: 'Personalized Service',
                description: 'One-on-one consultation tailored to your specific needs and goals.'
            }
        ];

        this.createCarouselSlides();
        this.createCarouselIndicators();
        this.bindCarouselEvents();
        this.startCarouselAutoplay();
    }

    /**
     * Create carousel slides
     */
    createCarouselSlides() {
        const track = document.getElementById('hero-carousel-track');
        if (!track) return;

        track.innerHTML = '';

        this.slides.forEach((slide, index) => {
            const slideElement = document.createElement('div');
            slideElement.className = `carousel-slide ${index === 0 ? 'active' : ''}`;
            slideElement.innerHTML = `
                <div class="carousel-slide-icon">
                    <i class="${slide.icon}"></i>
                </div>
                <h4 class="carousel-slide-title">${slide.title}</h4>
                <p class="carousel-slide-description">${slide.description}</p>
            `;
            track.appendChild(slideElement);
        });
    }

    /**
     * Create carousel indicators
     */
    createCarouselIndicators() {
        const indicators = document.getElementById('carousel-indicators');
        if (!indicators) return;

        indicators.innerHTML = '';

        this.slides.forEach((_, index) => {
            const indicator = document.createElement('button');
            indicator.className = `carousel-indicator ${index === 0 ? 'active' : ''}`;
            indicator.setAttribute('aria-label', `Go to slide ${index + 1}`);
            indicator.addEventListener('click', () => this.goToSlide(index));
            indicators.appendChild(indicator);
        });
    }

    /**
     * Bind carousel events
     */
    bindCarouselEvents() {
        const prevBtn = document.getElementById('carousel-prev');
        const nextBtn = document.getElementById('carousel-next');

        if (prevBtn) {
            prevBtn.addEventListener('click', () => this.previousSlide());
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', () => this.nextSlide());
        }

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.target.closest('.hero-carousel')) {
                if (e.key === 'ArrowLeft') {
                    e.preventDefault();
                    this.previousSlide();
                } else if (e.key === 'ArrowRight') {
                    e.preventDefault();
                    this.nextSlide();
                }
            }
        });

        // Touch/swipe support
        this.initTouchSupport();
    }

    /**
     * Initialize touch/swipe support
     */
    initTouchSupport() {
        const track = document.getElementById('hero-carousel-track');
        if (!track) return;

        let startX = 0;
        let startY = 0;
        let isDragging = false;

        track.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
            isDragging = true;
        }, { passive: true });

        track.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            
            const currentX = e.touches[0].clientX;
            const currentY = e.touches[0].clientY;
            const diffX = startX - currentX;
            const diffY = startY - currentY;

            // Prevent vertical scrolling if horizontal swipe is detected
            if (Math.abs(diffX) > Math.abs(diffY)) {
                e.preventDefault();
            }
        }, { passive: false });

        track.addEventListener('touchend', (e) => {
            if (!isDragging) return;
            
            const endX = e.changedTouches[0].clientX;
            const diffX = startX - endX;

            if (Math.abs(diffX) > 50) { // Minimum swipe distance
                if (diffX > 0) {
                    this.nextSlide();
                } else {
                    this.previousSlide();
                }
            }

            isDragging = false;
        }, { passive: true });
    }

    /**
     * Go to specific slide
     */
    goToSlide(index) {
        const slides = document.querySelectorAll('.carousel-slide');
        const indicators = document.querySelectorAll('.carousel-indicator');

        // Remove active classes
        slides.forEach(slide => slide.classList.remove('active'));
        indicators.forEach(indicator => indicator.classList.remove('active'));

        // Add active class to current slide
        if (slides[index]) {
            slides[index].classList.add('active');
        }
        if (indicators[index]) {
            indicators[index].classList.add('active');
        }

        this.currentSlide = index;
    }

    /**
     * Go to next slide
     */
    nextSlide() {
        const nextIndex = (this.currentSlide + 1) % this.slides.length;
        this.goToSlide(nextIndex);
    }

    /**
     * Go to previous slide
     */
    previousSlide() {
        const prevIndex = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
        this.goToSlide(prevIndex);
    }

    /**
     * Start carousel autoplay
     */
    startCarouselAutoplay() {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            return;
        }

        this.carouselInterval = setInterval(() => {
            this.nextSlide();
        }, 4000);

        // Pause on hover
        const carousel = document.querySelector('.hero-carousel');
        if (carousel) {
            carousel.addEventListener('mouseenter', () => {
                clearInterval(this.carouselInterval);
            });

            carousel.addEventListener('mouseleave', () => {
                this.startCarouselAutoplay();
            });
        }
    }

    /**
     * Initialize typing effect
     */
    initTypingEffect() {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            return;
        }

        const typingElement = document.getElementById('typing-text');
        if (!typingElement) return;

        this.startTypingAnimation(typingElement);
    }

    /**
     * Start typing animation
     */
    startTypingAnimation(element) {
        const typeText = (text, callback) => {
            let i = 0;
            element.textContent = '';
            
            const typeInterval = setInterval(() => {
                element.textContent += text.charAt(i);
                i++;
                
                if (i >= text.length) {
                    clearInterval(typeInterval);
                    setTimeout(callback, 2000); // Wait 2 seconds before next text
                }
            }, 100);
        };

        const eraseText = (callback) => {
            const currentText = element.textContent;
            let i = currentText.length;
            
            const eraseInterval = setInterval(() => {
                element.textContent = currentText.substring(0, i);
                i--;
                
                if (i < 0) {
                    clearInterval(eraseInterval);
                    setTimeout(callback, 500); // Wait 0.5 seconds before typing next
                }
            }, 50);
        };

        const cycleTexts = () => {
            const currentText = this.typingTexts[this.currentTextIndex];
            
            typeText(currentText, () => {
                eraseText(() => {
                    this.currentTextIndex = (this.currentTextIndex + 1) % this.typingTexts.length;
                    cycleTexts();
                });
            });
        };

        // Start the cycle
        cycleTexts();
    }

    /**
     * Initialize counter animation
     */
    initCounterAnimation() {
        const statItems = document.querySelectorAll('.hero-stats .stat-item');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        statItems.forEach(item => {
            observer.observe(item);
        });
    }

    /**
     * Animate counter
     */
    animateCounter(element) {
        const numberElement = element.querySelector('.stat-number');
        const target = parseInt(element.getAttribute('data-count'));
        const suffix = element.getAttribute('data-suffix') || '';
        
        if (!numberElement || !target) return;

        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            numberElement.textContent = target + suffix;
            return;
        }

        const duration = 2000;
        const start = performance.now();
        const startValue = 0;

        const updateCounter = (currentTime) => {
            const elapsed = currentTime - start;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const currentValue = Math.floor(startValue + (target - startValue) * easeOutQuart);
            
            numberElement.textContent = currentValue + suffix;
            
            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                numberElement.textContent = target + suffix;
            }
        };

        requestAnimationFrame(updateCounter);
    }

    /**
     * Initialize quick actions
     */
    initQuickActions() {
        const quickActionBtns = document.querySelectorAll('.quick-action-btn');
        
        quickActionBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const action = btn.getAttribute('data-action');
                this.handleQuickAction(action);
            });
        });
    }

    /**
     * Handle quick action clicks
     */
    handleQuickAction(action) {
        switch (action) {
            case 'calculator':
                this.openTaxCalculator();
                break;
            case 'appointment':
                this.openAppointmentBooking();
                break;
            case 'documents':
                this.openDocumentUpload();
                break;
        }
    }

    /**
     * Open tax calculator modal
     */
    openTaxCalculator() {
        // Create and show tax calculator modal
        const modal = this.createModal('Tax Calculator', `
            <div class="tax-calculator">
                <div class="calculator-form">
                    <div class="form-group">
                        <label for="annual-income">Annual Income ($)</label>
                        <input type="number" id="annual-income" placeholder="Enter your annual income">
                    </div>
                    <div class="form-group">
                        <label for="filing-status">Filing Status</label>
                        <select id="filing-status">
                            <option value="single">Single</option>
                            <option value="married-joint">Married Filing Jointly</option>
                            <option value="married-separate">Married Filing Separately</option>
                            <option value="head-household">Head of Household</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="deductions">Estimated Deductions ($)</label>
                        <input type="number" id="deductions" placeholder="Enter estimated deductions">
                    </div>
                    <button type="button" class="btn btn--primary" onclick="window.heroInstance.calculateTax()">
                        Calculate Tax
                    </button>
                </div>
                <div class="calculator-result" id="tax-result" style="display: none;">
                    <h4>Estimated Tax Calculation</h4>
                    <div class="result-item">
                        <span>Taxable Income:</span>
                        <span id="taxable-income">$0</span>
                    </div>
                    <div class="result-item">
                        <span>Estimated Tax:</span>
                        <span id="estimated-tax">$0</span>
                    </div>
                    <div class="result-item">
                        <span>Effective Tax Rate:</span>
                        <span id="tax-rate">0%</span>
                    </div>
                </div>
            </div>
        `);
        
        this.showModal(modal);
    }

    /**
     * Calculate tax (simplified calculation)
     */
    calculateTax() {
        const income = parseFloat(document.getElementById('annual-income').value) || 0;
        const deductions = parseFloat(document.getElementById('deductions').value) || 0;
        const filingStatus = document.getElementById('filing-status').value;
        
        if (income <= 0) {
            alert('Please enter a valid annual income.');
            return;
        }
        
        const taxableIncome = Math.max(0, income - deductions);
        let estimatedTax = 0;
        
        // Simplified tax calculation (2023 tax brackets for single filers)
        if (filingStatus === 'single') {
            if (taxableIncome <= 11000) {
                estimatedTax = taxableIncome * 0.10;
            } else if (taxableIncome <= 44725) {
                estimatedTax = 1100 + (taxableIncome - 11000) * 0.12;
            } else if (taxableIncome <= 95375) {
                estimatedTax = 5147 + (taxableIncome - 44725) * 0.22;
            } else {
                estimatedTax = 16290 + (taxableIncome - 95375) * 0.24;
            }
        } else {
            // Simplified calculation for other filing statuses
            estimatedTax = taxableIncome * 0.15; // Approximate average rate
        }
        
        const effectiveRate = income > 0 ? (estimatedTax / income * 100) : 0;
        
        // Display results
        document.getElementById('taxable-income').textContent = `$${taxableIncome.toLocaleString()}`;
        document.getElementById('estimated-tax').textContent = `$${estimatedTax.toLocaleString()}`;
        document.getElementById('tax-rate').textContent = `${effectiveRate.toFixed(2)}%`;
        document.getElementById('tax-result').style.display = 'block';
    }

    /**
     * Open appointment booking
     */
    openAppointmentBooking() {
        // Navigate to contact section and pre-fill appointment request
        const contactSection = document.getElementById('contact');
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth' });
            
            setTimeout(() => {
                const subjectSelect = document.getElementById('contact-subject');
                const messageTextarea = document.getElementById('contact-message');
                
                if (subjectSelect) {
                    subjectSelect.value = 'tax-consultation';
                }
                
                if (messageTextarea) {
                    messageTextarea.value = 'I would like to schedule a consultation appointment. Please let me know your available times.';
                    messageTextarea.focus();
                }
            }, 1000);
        }
    }

    /**
     * Open document upload
     */
    openDocumentUpload() {
        const modal = this.createModal('Upload Documents', `
            <div class="document-upload">
                <p>Securely upload your tax documents for review. We accept PDF, JPG, PNG, and DOC files.</p>
                <div class="upload-area" id="upload-area">
                    <i class="fas fa-cloud-upload-alt"></i>
                    <p>Drag and drop files here or click to browse</p>
                    <input type="file" id="file-input" multiple accept=".pdf,.jpg,.jpeg,.png,.doc,.docx" style="display: none;">
                </div>
                <div class="uploaded-files" id="uploaded-files"></div>
                <div class="upload-actions">
                    <button type="button" class="btn btn--secondary" onclick="window.heroInstance.closeModal()">
                        Cancel
                    </button>
                    <button type="button" class="btn btn--primary" onclick="window.heroInstance.submitDocuments()">
                        Upload Documents
                    </button>
                </div>
            </div>
        `);
        
        this.showModal(modal);
        this.initFileUpload();
    }

    /**
     * Initialize file upload functionality
     */
    initFileUpload() {
        const uploadArea = document.getElementById('upload-area');
        const fileInput = document.getElementById('file-input');
        const uploadedFiles = document.getElementById('uploaded-files');
        
        if (!uploadArea || !fileInput) return;
        
        uploadArea.addEventListener('click', () => fileInput.click());
        
        uploadArea.addEventListener('dragover', (e) => {
            e.preventDefault();
            uploadArea.classList.add('drag-over');
        });
        
        uploadArea.addEventListener('dragleave', () => {
            uploadArea.classList.remove('drag-over');
        });
        
        uploadArea.addEventListener('drop', (e) => {
            e.preventDefault();
            uploadArea.classList.remove('drag-over');
            this.handleFiles(e.dataTransfer.files);
        });
        
        fileInput.addEventListener('change', (e) => {
            this.handleFiles(e.target.files);
        });
    }

    /**
     * Handle file selection
     */
    handleFiles(files) {
        const uploadedFiles = document.getElementById('uploaded-files');
        if (!uploadedFiles) return;
        
        Array.from(files).forEach(file => {
            const fileItem = document.createElement('div');
            fileItem.className = 'file-item';
            fileItem.innerHTML = `
                <i class="fas fa-file"></i>
                <span class="file-name">${file.name}</span>
                <span class="file-size">(${this.formatFileSize(file.size)})</span>
                <button type="button" class="remove-file" onclick="this.parentElement.remove()">
                    <i class="fas fa-times"></i>
                </button>
            `;
            uploadedFiles.appendChild(fileItem);
        });
    }

    /**
     * Format file size
     */
    formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }

    /**
     * Submit documents
     */
    submitDocuments() {
        const fileItems = document.querySelectorAll('.file-item');
        if (fileItems.length === 0) {
            alert('Please select at least one file to upload.');
            return;
        }
        
        // Simulate upload process
        alert('Documents uploaded successfully! We will review them and contact you within 24 hours.');
        this.closeModal();
    }

    /**
     * Create modal
     */
    createModal(title, content) {
        const modal = document.createElement('div');
        modal.className = 'hero-modal';
        modal.innerHTML = `
            <div class="hero-modal-backdrop" onclick="window.heroInstance.closeModal()"></div>
            <div class="hero-modal-container">
                <div class="hero-modal-header">
                    <h3>${title}</h3>
                    <button type="button" class="hero-modal-close" onclick="window.heroInstance.closeModal()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="hero-modal-body">
                    ${content}
                </div>
            </div>
        `;
        return modal;
    }

    /**
     * Show modal
     */
    showModal(modal) {
        document.body.appendChild(modal);
        document.body.style.overflow = 'hidden';
        
        // Animate in
        setTimeout(() => {
            modal.classList.add('active');
        }, 10);
        
        // Focus management
        const firstFocusable = modal.querySelector('input, select, button, textarea');
        if (firstFocusable) {
            firstFocusable.focus();
        }
    }

    /**
     * Close modal
     */
    closeModal() {
        const modal = document.querySelector('.hero-modal');
        if (modal) {
            modal.classList.remove('active');
            setTimeout(() => {
                modal.remove();
                document.body.style.overflow = '';
            }, 300);
        }
    }

    /**
     * Initialize scroll indicator
     */
    initScrollIndicator() {
        const scrollIndicator = document.querySelector('.scroll-indicator');
        if (!scrollIndicator) return;
        
        scrollIndicator.addEventListener('click', () => {
            const servicesSection = document.getElementById('services');
            if (servicesSection) {
                servicesSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
        
        // Hide scroll indicator when user scrolls
        let scrollTimeout;
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                scrollIndicator.style.opacity = '0';
            } else {
                scrollIndicator.style.opacity = '1';
            }
        }, { passive: true });
    }

    /**
     * Initialize parallax effect
     */
    initParallaxEffect() {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            return;
        }
        
        let ticking = false;
        
        const updateParallax = () => {
            const scrollY = window.scrollY;
            const heroSection = document.querySelector('.hero-section');
            
            if (heroSection && scrollY < window.innerHeight) {
                const shapes = document.querySelectorAll('.floating-shape');
                shapes.forEach((shape, index) => {
                    const speed = 0.1 + (index * 0.05);
                    const yPos = scrollY * speed;
                    shape.style.transform = `translateY(${yPos}px)`;
                });
                
                // Parallax for particles
                this.particles.forEach((particle, index) => {
                    const speed = 0.05 + (index % 3) * 0.02;
                    const yPos = scrollY * speed;
                    particle.style.transform = `translateY(${yPos}px)`;
                });
            }
            
            ticking = false;
        };
        
        const handleScroll = () => {
            if (!ticking) {
                requestAnimationFrame(updateParallax);
                ticking = true;
            }
        };
        
        window.addEventListener('scroll', handleScroll, { passive: true });
    }

    /**
     * Start all animations
     */
    startAnimations() {
        // Animate particles
        this.animateParticles();
        
        // Start floating shapes animation
        this.animateFloatingShapes();
    }

    /**
     * Animate particles
     */
    animateParticles() {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            return;
        }
        
        this.particles.forEach(particle => {
            // Random movement
            setInterval(() => {
                const newX = Math.random() * 100;
                const newY = Math.random() * 100;
                particle.style.left = `${newX}%`;
                particle.style.top = `${newY}%`;
            }, 8000 + Math.random() * 4000);
        });
    }

    /**
     * Animate floating shapes
     */
    animateFloatingShapes() {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            return;
        }
        
        const shapes = document.querySelectorAll('.floating-shape');
        shapes.forEach((shape, index) => {
            // Add random movement
            setInterval(() => {
                const currentTransform = shape.style.transform || '';
                const randomX = (Math.random() - 0.5) * 20;
                const randomY = (Math.random() - 0.5) * 20;
                shape.style.transform = `${currentTransform} translate(${randomX}px, ${randomY}px)`;
            }, 5000 + index * 1000);
        });
    }

    /**
     * Cleanup method
     */
    destroy() {
        // Clear intervals
        if (this.carouselInterval) {
            clearInterval(this.carouselInterval);
        }
        
        // Remove event listeners
        window.removeEventListener('scroll', this.handleScroll);
        window.removeEventListener('resize', this.handleResize);
        
        // Clear particles
        this.particles = [];
    }
}

// Initialize interactive hero when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Wait for other scripts to load and ensure hero section exists
    setTimeout(() => {
        const heroSection = document.querySelector('.hero-section');
        if (heroSection) {
            try {
                // Check if all required elements exist before initializing
                const requiredElements = [
                    '#hero-particles',
                    '#hero-carousel-track',
                    '#typing-text',
                    '.hero-stats'
                ];
                
                const allElementsExist = requiredElements.every(selector => 
                    document.querySelector(selector) !== null
                );
                
                if (allElementsExist) {
                    window.heroInstance = new InteractiveHero();
                    console.log('Hero interactive features initialized successfully');
                } else {
                    console.log('Some hero elements missing, using fallback styles');
                    // Add fallback class to enable basic styling
                    heroSection.classList.add('hero-fallback');
                }
            } catch (error) {
                console.warn('Hero initialization failed, using fallback:', error);
                // Add fallback class
                heroSection.classList.add('hero-fallback');
            }
        } else {
            console.warn('Hero section not found');
        }
    }, 1000);
});

// Handle page visibility change
document.addEventListener('visibilitychange', () => {
    if (window.heroInstance) {
        if (document.hidden) {
            // Pause animations when page is hidden
            if (window.heroInstance.carouselInterval) {
                clearInterval(window.heroInstance.carouselInterval);
            }
        } else {
            // Resume animations when page is visible
            window.heroInstance.startCarouselAutoplay();
        }
    }
});

// Export for module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = InteractiveHero;
}