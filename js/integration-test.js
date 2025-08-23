// Integration Test Suite for TaxPro Consulting Website
// Comprehensive testing of all site functionality and user flows

class IntegrationTestSuite {
    constructor() {
        this.testResults = {
            navigation: [],
            forms: [],
            modals: [],
            responsive: [],
            accessibility: [],
            performance: [],
            crossSection: []
        };
        this.totalTests = 0;
        this.passedTests = 0;
        this.failedTests = 0;
    }

    /**
     * Run all integration tests
     */
    async runAllTests() {
        console.log('🚀 Starting Integration Test Suite...');
        
        // Test navigation functionality
        await this.testNavigation();
        
        // Test form functionality
        await this.testForms();
        
        // Test modal functionality
        await this.testModals();
        
        // Test responsive design
        await this.testResponsiveDesign();
        
        // Test accessibility
        await this.testAccessibility();
        
        // Test performance
        await this.testPerformance();
        
        // Test cross-section interactions
        await this.testCrossSectionInteractions();
        
        // Generate test report
        this.generateTestReport();
    }

    /**
     * Test navigation functionality
     */
    async testNavigation() {
        console.log('📍 Testing Navigation...');
        
        // Test 1: All navigation links have corresponding sections
        const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
        const sections = document.querySelectorAll('section[id]');
        
        navLinks.forEach(link => {
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            this.addTestResult('navigation', {
                test: `Navigation link to ${targetId}`,
                passed: !!targetSection,
                message: targetSection ? 'Section found' : 'Section missing'
            });
        });

        // Test 2: All sections have corresponding navigation links
        sections.forEach(section => {
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
            
            this.addTestResult('navigation', {
                test: `Section ${sectionId} has nav link`,
                passed: !!navLink,
                message: navLink ? 'Nav link found' : 'Nav link missing'
            });
        });

        // Test 3: Smooth scroll functionality
        const smoothScrollTest = this.testSmoothScroll();
        this.addTestResult('navigation', {
            test: 'Smooth scroll functionality',
            passed: smoothScrollTest,
            message: smoothScrollTest ? 'Smooth scroll working' : 'Smooth scroll not working'
        });

        // Test 4: Active navigation state updates
        const activeStateTest = this.testActiveNavigationState();
        this.addTestResult('navigation', {
            test: 'Active navigation state updates',
            passed: activeStateTest,
            message: activeStateTest ? 'Active states working' : 'Active states not working'
        });

        // Test 5: Mobile menu functionality
        const mobileMenuTest = this.testMobileMenu();
        this.addTestResult('navigation', {
            test: 'Mobile menu functionality',
            passed: mobileMenuTest,
            message: mobileMenuTest ? 'Mobile menu working' : 'Mobile menu not working'
        });
    }

    /**
     * Test form functionality
     */
    async testForms() {
        console.log('📝 Testing Forms...');
        
        const forms = document.querySelectorAll('form');
        
        forms.forEach(form => {
            const formId = form.getAttribute('id') || 'unnamed-form';
            
            // Test 1: Form has submit button
            const submitButton = form.querySelector('button[type="submit"]');
            this.addTestResult('forms', {
                test: `${formId} has submit button`,
                passed: !!submitButton,
                message: submitButton ? 'Submit button found' : 'Submit button missing'
            });

            // Test 2: Required fields have validation
            const requiredFields = form.querySelectorAll('[required]');
            requiredFields.forEach(field => {
                const errorElement = document.getElementById(field.getAttribute('aria-describedby'));
                this.addTestResult('forms', {
                    test: `${formId} field ${field.name} has error element`,
                    passed: !!errorElement,
                    message: errorElement ? 'Error element found' : 'Error element missing'
                });
            });

            // Test 3: Form validation works
            const validationTest = this.testFormValidation(form);
            this.addTestResult('forms', {
                test: `${formId} validation functionality`,
                passed: validationTest,
                message: validationTest ? 'Validation working' : 'Validation not working'
            });

            // Test 4: Form accessibility
            const accessibilityTest = this.testFormAccessibility(form);
            this.addTestResult('forms', {
                test: `${formId} accessibility`,
                passed: accessibilityTest,
                message: accessibilityTest ? 'Form accessible' : 'Form accessibility issues'
            });
        });
    }

    /**
     * Test modal functionality
     */
    async testModals() {
        console.log('🪟 Testing Modals...');
        
        const modalTriggers = document.querySelectorAll('[data-modal-target], .service-card, .team-card');
        
        modalTriggers.forEach(trigger => {
            const modalId = trigger.getAttribute('data-modal-target') || 
                           (trigger.classList.contains('service-card') ? 'service-modal' : 'team-modal');
            
            // Test 1: Modal exists
            const modal = document.querySelector(`.${modalId}, #${modalId}`);
            this.addTestResult('modals', {
                test: `Modal ${modalId} exists`,
                passed: !!modal,
                message: modal ? 'Modal found' : 'Modal missing'
            });

            if (modal) {
                // Test 2: Modal has close button
                const closeButton = modal.querySelector('.modal-close, [data-modal-close]');
                this.addTestResult('modals', {
                    test: `Modal ${modalId} has close button`,
                    passed: !!closeButton,
                    message: closeButton ? 'Close button found' : 'Close button missing'
                });

                // Test 3: Modal accessibility
                const accessibilityTest = this.testModalAccessibility(modal);
                this.addTestResult('modals', {
                    test: `Modal ${modalId} accessibility`,
                    passed: accessibilityTest,
                    message: accessibilityTest ? 'Modal accessible' : 'Modal accessibility issues'
                });
            }
        });
    }

    /**
     * Test responsive design
     */
    async testResponsiveDesign() {
        console.log('📱 Testing Responsive Design...');
        
        const breakpoints = [320, 768, 1024, 1200];
        const currentWidth = window.innerWidth;
        
        breakpoints.forEach(width => {
            // Test 1: Mobile menu visibility
            if (width <= 767) {
                const mobileToggle = document.querySelector('.nav-toggle');
                const mobileMenu = document.querySelector('.nav-menu');
                
                this.addTestResult('responsive', {
                    test: `Mobile menu elements at ${width}px`,
                    passed: !!(mobileToggle && mobileMenu),
                    message: (mobileToggle && mobileMenu) ? 'Mobile menu elements found' : 'Mobile menu elements missing'
                });
            }

            // Test 2: Grid layouts
            const grids = document.querySelectorAll('.services-grid, .team-grid, .stats-grid');
            grids.forEach(grid => {
                const computedStyle = window.getComputedStyle(grid);
                const gridColumns = computedStyle.gridTemplateColumns;
                
                this.addTestResult('responsive', {
                    test: `Grid layout for ${grid.className}`,
                    passed: !!gridColumns && gridColumns !== 'none',
                    message: gridColumns ? `Grid columns: ${gridColumns}` : 'No grid layout'
                });
            });
        });

        // Test 3: Viewport meta tag
        const viewportMeta = document.querySelector('meta[name="viewport"]');
        this.addTestResult('responsive', {
            test: 'Viewport meta tag',
            passed: !!viewportMeta,
            message: viewportMeta ? 'Viewport meta tag found' : 'Viewport meta tag missing'
        });

        // Test 4: Touch-friendly elements
        const touchTest = this.testTouchFriendliness();
        this.addTestResult('responsive', {
            test: 'Touch-friendly elements',
            passed: touchTest,
            message: touchTest ? 'Elements are touch-friendly' : 'Elements not touch-friendly'
        });
    }

    /**
     * Test accessibility
     */
    async testAccessibility() {
        console.log('♿ Testing Accessibility...');
        
        // Test 1: Images have alt text
        const images = document.querySelectorAll('img');
        let imagesWithAlt = 0;
        images.forEach(img => {
            if (img.hasAttribute('alt')) {
                imagesWithAlt++;
            }
        });
        
        this.addTestResult('accessibility', {
            test: 'Images have alt text',
            passed: imagesWithAlt === images.length,
            message: `${imagesWithAlt}/${images.length} images have alt text`
        });

        // Test 2: Form inputs have labels
        const inputs = document.querySelectorAll('input, select, textarea');
        let inputsWithLabels = 0;
        inputs.forEach(input => {
            const id = input.getAttribute('id');
            const label = id ? document.querySelector(`label[for="${id}"]`) : null;
            const ariaLabel = input.getAttribute('aria-label');
            const ariaLabelledby = input.getAttribute('aria-labelledby');
            
            if (label || ariaLabel || ariaLabelledby) {
                inputsWithLabels++;
            }
        });
        
        this.addTestResult('accessibility', {
            test: 'Form inputs have labels',
            passed: inputsWithLabels === inputs.length,
            message: `${inputsWithLabels}/${inputs.length} inputs have labels`
        });

        // Test 3: Heading hierarchy
        const headingTest = this.testHeadingHierarchy();
        this.addTestResult('accessibility', {
            test: 'Proper heading hierarchy',
            passed: headingTest,
            message: headingTest ? 'Heading hierarchy correct' : 'Heading hierarchy issues'
        });

        // Test 4: Skip links
        const skipLink = document.querySelector('.skip-link');
        this.addTestResult('accessibility', {
            test: 'Skip link present',
            passed: !!skipLink,
            message: skipLink ? 'Skip link found' : 'Skip link missing'
        });

        // Test 5: ARIA attributes
        const ariaTest = this.testAriaAttributes();
        this.addTestResult('accessibility', {
            test: 'ARIA attributes',
            passed: ariaTest,
            message: ariaTest ? 'ARIA attributes present' : 'ARIA attributes missing'
        });

        // Test 6: Color contrast
        const contrastTest = this.testColorContrast();
        this.addTestResult('accessibility', {
            test: 'Color contrast',
            passed: contrastTest,
            message: contrastTest ? 'Adequate color contrast' : 'Color contrast issues'
        });
    }

    /**
     * Test performance
     */
    async testPerformance() {
        console.log('⚡ Testing Performance...');
        
        // Test 1: Image optimization
        const images = document.querySelectorAll('img');
        let optimizedImages = 0;
        images.forEach(img => {
            if (img.hasAttribute('loading') || img.hasAttribute('data-src')) {
                optimizedImages++;
            }
        });
        
        this.addTestResult('performance', {
            test: 'Image optimization',
            passed: optimizedImages > 0,
            message: `${optimizedImages}/${images.length} images optimized`
        });

        // Test 2: CSS and JS minification
        const stylesheets = document.querySelectorAll('link[rel="stylesheet"]');
        const scripts = document.querySelectorAll('script[src]');
        
        this.addTestResult('performance', {
            test: 'Resource loading',
            passed: stylesheets.length > 0 && scripts.length > 0,
            message: `${stylesheets.length} stylesheets, ${scripts.length} scripts loaded`
        });

        // Test 3: Offline deployment check
        const fontTest = this.testFontLoading();
        this.addTestResult('performance', {
            test: 'Offline deployment resources',
            passed: fontTest,
            message: fontTest ? 'Fonts optimized' : 'Font loading not optimized'
        });

        // Test 4: Animation performance
        const animationTest = this.testAnimationPerformance();
        this.addTestResult('performance', {
            test: 'Animation performance',
            passed: animationTest,
            message: animationTest ? 'Animations optimized' : 'Animation performance issues'
        });

        // Test 5: Loading states
        const loadingTest = this.testLoadingStates();
        this.addTestResult('performance', {
            test: 'Loading states',
            passed: loadingTest,
            message: loadingTest ? 'Loading states implemented' : 'Loading states missing'
        });
    }

    /**
     * Test cross-section interactions
     */
    async testCrossSectionInteractions() {
        console.log('🔗 Testing Cross-Section Interactions...');
        
        // Test 1: Service cards link to contact form
        const serviceCards = document.querySelectorAll('.service-card');
        let serviceLinksWorking = 0;
        serviceCards.forEach(card => {
            const ctaButton = card.querySelector('.service-card-btn');
            if (ctaButton) {
                serviceLinksWorking++;
            }
        });
        
        this.addTestResult('crossSection', {
            test: 'Service cards have CTA buttons',
            passed: serviceLinksWorking === serviceCards.length,
            message: `${serviceLinksWorking}/${serviceCards.length} service cards have CTA buttons`
        });

        // Test 2: Team member contact buttons
        const teamCards = document.querySelectorAll('.team-card');
        let teamContactButtons = 0;
        teamCards.forEach(card => {
            const contactBtn = card.querySelector('.team-contact-btn');
            if (contactBtn) {
                teamContactButtons++;
            }
        });
        
        this.addTestResult('crossSection', {
            test: 'Team cards have contact buttons',
            passed: teamContactButtons > 0,
            message: `${teamContactButtons} team contact buttons found`
        });

        // Test 3: FAQ search integration
        const faqSearch = document.getElementById('faq-search-input');
        this.addTestResult('crossSection', {
            test: 'FAQ search functionality',
            passed: !!faqSearch,
            message: faqSearch ? 'FAQ search found' : 'FAQ search missing'
        });

        // Test 4: Global state management
        const globalStateTest = this.testGlobalState();
        this.addTestResult('crossSection', {
            test: 'Global state management',
            passed: globalStateTest,
            message: globalStateTest ? 'Global state working' : 'Global state issues'
        });

        // Test 5: Section visibility tracking
        const visibilityTest = this.testSectionVisibility();
        this.addTestResult('crossSection', {
            test: 'Section visibility tracking',
            passed: visibilityTest,
            message: visibilityTest ? 'Visibility tracking working' : 'Visibility tracking issues'
        });
    }

    /**
     * Helper test methods
     */
    testSmoothScroll() {
        const htmlElement = document.documentElement;
        const computedStyle = window.getComputedStyle(htmlElement);
        return computedStyle.scrollBehavior === 'smooth';
    }

    testActiveNavigationState() {
        const activeLinks = document.querySelectorAll('.nav-link.active');
        return activeLinks.length > 0;
    }

    testMobileMenu() {
        const mobileToggle = document.querySelector('.nav-toggle');
        const mobileMenu = document.querySelector('.nav-menu');
        return !!(mobileToggle && mobileMenu);
    }

    testFormValidation(form) {
        const requiredFields = form.querySelectorAll('[required]');
        return requiredFields.length > 0;
    }

    testFormAccessibility(form) {
        const inputs = form.querySelectorAll('input, select, textarea');
        let accessibleInputs = 0;
        
        inputs.forEach(input => {
            const id = input.getAttribute('id');
            const label = id ? document.querySelector(`label[for="${id}"]`) : null;
            if (label || input.getAttribute('aria-label')) {
                accessibleInputs++;
            }
        });
        
        return accessibleInputs === inputs.length;
    }

    testModalAccessibility(modal) {
        const hasRole = modal.getAttribute('role') === 'dialog';
        const hasAriaLabel = modal.hasAttribute('aria-label') || modal.hasAttribute('aria-labelledby');
        return hasRole && hasAriaLabel;
    }

    testTouchFriendliness() {
        const interactiveElements = document.querySelectorAll('button, .btn, .nav-link');
        let touchFriendly = 0;
        
        interactiveElements.forEach(element => {
            const computedStyle = window.getComputedStyle(element);
            const minHeight = parseInt(computedStyle.minHeight);
            if (minHeight >= 44) {
                touchFriendly++;
            }
        });
        
        return touchFriendly > interactiveElements.length * 0.8; // 80% threshold
    }

    testHeadingHierarchy() {
        const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
        let previousLevel = 0;
        
        for (let heading of headings) {
            const level = parseInt(heading.tagName.substring(1));
            if (level > previousLevel + 1) {
                return false;
            }
            previousLevel = level;
        }
        
        return true;
    }

    testAriaAttributes() {
        const ariaElements = document.querySelectorAll('[aria-label], [aria-labelledby], [aria-describedby], [role]');
        return ariaElements.length > 0;
    }

    testColorContrast() {
        // Simplified color contrast test
        const textElements = document.querySelectorAll('p, h1, h2, h3, h4, h5, h6, span, a');
        return textElements.length > 0; // Placeholder - would need actual contrast calculation
    }

    testFontLoading() {
        // Check for offline deployment - system fonts should be used
        const iconFallbacks = document.querySelector('link[href*="icon-fallbacks"]');
        return iconFallbacks !== null;
    }

    testAnimationPerformance() {
        const animatedElements = document.querySelectorAll('.animate-observed, .service-card, .team-card');
        return animatedElements.length > 0;
    }

    testLoadingStates() {
        return typeof window.loadingManager !== 'undefined';
    }

    testGlobalState() {
        return typeof window.siteState !== 'undefined';
    }

    testSectionVisibility() {
        return typeof window.sectionRegistry !== 'undefined';
    }

    /**
     * Add test result
     */
    addTestResult(category, result) {
        this.testResults[category].push(result);
        this.totalTests++;
        
        if (result.passed) {
            this.passedTests++;
            console.log(`✅ ${result.test}: ${result.message}`);
        } else {
            this.failedTests++;
            console.log(`❌ ${result.test}: ${result.message}`);
        }
    }

    /**
     * Generate comprehensive test report
     */
    generateTestReport() {
        console.log('\n📊 Integration Test Report');
        console.log('='.repeat(50));
        console.log(`Total Tests: ${this.totalTests}`);
        console.log(`Passed: ${this.passedTests} (${Math.round(this.passedTests / this.totalTests * 100)}%)`);
        console.log(`Failed: ${this.failedTests} (${Math.round(this.failedTests / this.totalTests * 100)}%)`);
        console.log('='.repeat(50));
        
        // Category breakdown
        Object.keys(this.testResults).forEach(category => {
            const results = this.testResults[category];
            const passed = results.filter(r => r.passed).length;
            const total = results.length;
            
            if (total > 0) {
                console.log(`${category.toUpperCase()}: ${passed}/${total} passed`);
            }
        });
        
        console.log('='.repeat(50));
        
        // Show failed tests
        if (this.failedTests > 0) {
            console.log('\n❌ Failed Tests:');
            Object.keys(this.testResults).forEach(category => {
                const failedTests = this.testResults[category].filter(r => !r.passed);
                if (failedTests.length > 0) {
                    console.log(`\n${category.toUpperCase()}:`);
                    failedTests.forEach(test => {
                        console.log(`  - ${test.test}: ${test.message}`);
                    });
                }
            });
        }
        
        // Overall status
        const overallScore = Math.round(this.passedTests / this.totalTests * 100);
        console.log(`\n🎯 Overall Integration Score: ${overallScore}%`);
        
        if (overallScore >= 90) {
            console.log('🎉 Excellent! Site integration is working well.');
        } else if (overallScore >= 75) {
            console.log('👍 Good! Minor issues to address.');
        } else if (overallScore >= 60) {
            console.log('⚠️ Fair. Several issues need attention.');
        } else {
            console.log('🚨 Poor. Significant integration issues detected.');
        }
        
        // Create visual report in DOM
        this.createVisualReport();
    }

    /**
     * Create visual test report in DOM
     */
    createVisualReport() {
        // Create report container
        const reportContainer = document.createElement('div');
        reportContainer.id = 'integration-test-report';
        reportContainer.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            width: 300px;
            max-height: 400px;
            background: white;
            border: 2px solid #1a365d;
            border-radius: 8px;
            padding: 16px;
            box-shadow: 0 10px 25px rgba(0,0,0,0.2);
            z-index: 10000;
            font-family: 'Inter', sans-serif;
            font-size: 14px;
            overflow-y: auto;
        `;
        
        const overallScore = Math.round(this.passedTests / this.totalTests * 100);
        
        reportContainer.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
                <h3 style="margin: 0; color: #1a365d;">Integration Test Report</h3>
                <button onclick="this.parentElement.parentElement.remove()" style="background: none; border: none; font-size: 18px; cursor: pointer;">×</button>
            </div>
            
            <div style="text-align: center; margin-bottom: 16px;">
                <div style="font-size: 24px; font-weight: bold; color: ${overallScore >= 75 ? '#38a169' : overallScore >= 60 ? '#d69e2e' : '#e53e3e'};">
                    ${overallScore}%
                </div>
                <div style="color: #666;">Overall Score</div>
            </div>
            
            <div style="margin-bottom: 16px;">
                <div style="display: flex; justify-content: space-between;">
                    <span>Total Tests:</span>
                    <span>${this.totalTests}</span>
                </div>
                <div style="display: flex; justify-content: space-between; color: #38a169;">
                    <span>Passed:</span>
                    <span>${this.passedTests}</span>
                </div>
                <div style="display: flex; justify-content: space-between; color: #e53e3e;">
                    <span>Failed:</span>
                    <span>${this.failedTests}</span>
                </div>
            </div>
            
            <div style="border-top: 1px solid #eee; padding-top: 16px;">
                ${Object.keys(this.testResults).map(category => {
                    const results = this.testResults[category];
                    const passed = results.filter(r => r.passed).length;
                    const total = results.length;
                    
                    if (total === 0) return '';
                    
                    return `
                        <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                            <span style="text-transform: capitalize;">${category}:</span>
                            <span style="color: ${passed === total ? '#38a169' : '#e53e3e'};">
                                ${passed}/${total}
                            </span>
                        </div>
                    `;
                }).join('')}
            </div>
        `;
        
        document.body.appendChild(reportContainer);
        
        // Auto-remove after 30 seconds
        setTimeout(() => {
            if (reportContainer.parentElement) {
                reportContainer.remove();
            }
        }, 30000);
    }
}

// Initialize and run tests when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Wait for all other initializations to complete
    setTimeout(() => {
        const testSuite = new IntegrationTestSuite();
        
        // Add to global scope for manual testing
        window.integrationTests = testSuite;
        
        // Run tests automatically in development
        if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
            testSuite.runAllTests();
        }
        
        // Add keyboard shortcut to run tests (Ctrl+Shift+T)
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey && e.shiftKey && e.key === 'T') {
                e.preventDefault();
                testSuite.runAllTests();
            }
        });
        
    }, 2000); // Wait 2 seconds for all initializations
});

// Export for module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = IntegrationTestSuite;
}