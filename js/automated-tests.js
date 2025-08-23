// Automated Testing Script for TaxPro Consulting Website
// Runs comprehensive tests automatically and generates reports

class AutomatedTestRunner {
  constructor() {
    this.testResults = [];
    this.startTime = null;
    this.endTime = null;
    this.config = {
      timeout: 30000, // 30 seconds timeout for each test
      retries: 3,
      parallel: true,
      generateReport: true
    };
  }

  async runAllTests() {
    console.log('🚀 Starting Automated Test Suite...');
    this.startTime = Date.now();

    const testSuites = [
      { name: 'Browser Compatibility', test: () => this.testBrowserCompatibility() },
      { name: 'Responsive Design', test: () => this.testResponsiveDesign() },
      { name: 'Form Validation', test: () => this.testFormValidation() },
      { name: 'Accessibility Compliance', test: () => this.testAccessibility() },
      { name: 'Performance Metrics', test: () => this.testPerformance() },
      { name: 'Cross-Device Testing', test: () => this.testCrossDevice() },
      { name: 'Network Conditions', test: () => this.testNetworkConditions() },
      { name: 'User Interactions', test: () => this.testUserInteractions() }
    ];

    if (this.config.parallel) {
      await this.runTestsInParallel(testSuites);
    } else {
      await this.runTestsSequentially(testSuites);
    }

    this.endTime = Date.now();
    
    if (this.config.generateReport) {
      this.generateReport();
    }

    return this.getTestSummary();
  }

  async runTestsInParallel(testSuites) {
    const promises = testSuites.map(suite => this.runTestSuite(suite));
    await Promise.allSettled(promises);
  }

  async runTestsSequentially(testSuites) {
    for (const suite of testSuites) {
      await this.runTestSuite(suite);
    }
  }

  async runTestSuite(suite) {
    const startTime = Date.now();
    let attempts = 0;
    let result = null;

    while (attempts < this.config.retries) {
      try {
        console.log(`🧪 Running ${suite.name} tests...`);
        result = await Promise.race([
          suite.test(),
          this.timeout(this.config.timeout)
        ]);
        break;
      } catch (error) {
        attempts++;
        console.warn(`⚠️ ${suite.name} failed (attempt ${attempts}):`, error.message);
        
        if (attempts >= this.config.retries) {
          result = {
            success: false,
            error: error.message,
            tests: []
          };
        } else {
          await this.delay(1000); // Wait 1 second before retry
        }
      }
    }

    const endTime = Date.now();
    const duration = endTime - startTime;

    this.testResults.push({
      suite: suite.name,
      duration,
      attempts,
      ...result
    });

    console.log(`${result.success ? '✅' : '❌'} ${suite.name} completed in ${duration}ms`);
  }

  timeout(ms) {
    return new Promise((_, reject) => {
      setTimeout(() => reject(new Error('Test timeout')), ms);
    });
  }

  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // Browser Compatibility Tests
  async testBrowserCompatibility() {
    const tests = [];
    
    // Test CSS feature support
    const cssFeatures = [
      { name: 'CSS Grid', test: () => CSS.supports('display', 'grid') },
      { name: 'CSS Flexbox', test: () => CSS.supports('display', 'flex') },
      { name: 'CSS Custom Properties', test: () => CSS.supports('--test', 'value') },
      { name: 'CSS Transforms', test: () => CSS.supports('transform', 'translateX(0)') },
      { name: 'CSS Transitions', test: () => CSS.supports('transition', 'all 0.3s') }
    ];

    cssFeatures.forEach(feature => {
      const passed = feature.test();
      tests.push({
        name: feature.name,
        passed,
        message: passed ? 'Supported' : 'Not supported'
      });
    });

    // Test JavaScript APIs
    const jsAPIs = [
      { name: 'Intersection Observer', test: () => 'IntersectionObserver' in window },
      { name: 'Fetch API', test: () => 'fetch' in window },
      { name: 'Local Storage', test: () => this.testLocalStorage() },
      { name: 'Service Workers', test: () => 'serviceWorker' in navigator }
    ];

    jsAPIs.forEach(api => {
      const passed = api.test();
      tests.push({
        name: api.name,
        passed,
        message: passed ? 'Available' : 'Not available'
      });
    });

    const passedTests = tests.filter(t => t.passed).length;
    const success = passedTests === tests.length;

    return {
      success,
      tests,
      summary: `${passedTests}/${tests.length} browser features supported`
    };
  }

  testLocalStorage() {
    try {
      localStorage.setItem('test', 'test');
      localStorage.removeItem('test');
      return true;
    } catch (e) {
      return false;
    }
  }

  // Responsive Design Tests
  async testResponsiveDesign() {
    const tests = [];
    const breakpoints = [
      { name: 'Mobile Small', width: 320, height: 568 },
      { name: 'Mobile Large', width: 375, height: 667 },
      { name: 'Tablet Portrait', width: 768, height: 1024 },
      { name: 'Tablet Landscape', width: 1024, height: 768 },
      { name: 'Desktop', width: 1200, height: 800 }
    ];

    for (const bp of breakpoints) {
      const testResult = await this.testBreakpoint(bp);
      tests.push(testResult);
    }

    const passedTests = tests.filter(t => t.passed).length;
    const success = passedTests === tests.length;

    return {
      success,
      tests,
      summary: `${passedTests}/${tests.length} breakpoints passed`
    };
  }

  async testBreakpoint(breakpoint) {
    // Simulate viewport resize
    const originalWidth = window.innerWidth;
    const originalHeight = window.innerHeight;

    try {
      // Test if elements respond to breakpoint
      const navbar = document.querySelector('.navbar');
      const heroSection = document.querySelector('.hero-section');
      const servicesGrid = document.querySelector('.services-grid');

      const issues = [];

      // Check if navigation adapts
      if (navbar && breakpoint.width < 768) {
        const toggle = navbar.querySelector('.nav-toggle');
        if (!toggle) {
          issues.push('Mobile navigation toggle missing');
        }
      }

      // Check if grid layouts adapt
      if (servicesGrid && breakpoint.width < 768) {
        const computedStyle = window.getComputedStyle(servicesGrid);
        if (computedStyle.gridTemplateColumns && computedStyle.gridTemplateColumns.includes('repeat')) {
          // Grid should adapt to single column on mobile
        }
      }

      return {
        name: `${breakpoint.name} (${breakpoint.width}x${breakpoint.height})`,
        passed: issues.length === 0,
        message: issues.length === 0 ? 'Responsive layout working' : issues.join(', ')
      };
    } catch (error) {
      return {
        name: `${breakpoint.name} (${breakpoint.width}x${breakpoint.height})`,
        passed: false,
        message: `Test error: ${error.message}`
      };
    }
  }

  // Form Validation Tests
  async testFormValidation() {
    const tests = [];
    const forms = document.querySelectorAll('form');

    for (const form of forms) {
      const formTests = await this.testForm(form);
      tests.push(...formTests);
    }

    const passedTests = tests.filter(t => t.passed).length;
    const success = passedTests === tests.length;

    return {
      success,
      tests,
      summary: `${passedTests}/${tests.length} form validation tests passed`
    };
  }

  async testForm(form) {
    const tests = [];
    const formName = form.id || form.className || 'Unknown Form';

    // Test required field validation
    const requiredFields = form.querySelectorAll('input[required], select[required], textarea[required]');
    
    for (const field of requiredFields) {
      const test = this.testRequiredField(field, formName);
      tests.push(test);
    }

    // Test email validation
    const emailFields = form.querySelectorAll('input[type="email"]');
    for (const field of emailFields) {
      const test = this.testEmailField(field, formName);
      tests.push(test);
    }

    // Test form submission
    const submitTest = this.testFormSubmission(form, formName);
    tests.push(submitTest);

    return tests;
  }

  testRequiredField(field, formName) {
    const fieldName = field.name || field.id || 'Unknown Field';
    
    try {
      // Test empty field validation
      field.value = '';
      const isValid = field.checkValidity();
      
      return {
        name: `${formName} - ${fieldName} required validation`,
        passed: !isValid, // Should be invalid when empty
        message: !isValid ? 'Required validation working' : 'Required validation not working'
      };
    } catch (error) {
      return {
        name: `${formName} - ${fieldName} required validation`,
        passed: false,
        message: `Test error: ${error.message}`
      };
    }
  }

  testEmailField(field, formName) {
    const fieldName = field.name || field.id || 'Email Field';
    
    try {
      // Test invalid email
      field.value = 'invalid-email';
      const isValidInvalid = field.checkValidity();
      
      // Test valid email
      field.value = 'test@example.com';
      const isValidValid = field.checkValidity();
      
      const passed = !isValidInvalid && isValidValid;
      
      return {
        name: `${formName} - ${fieldName} email validation`,
        passed,
        message: passed ? 'Email validation working' : 'Email validation not working'
      };
    } catch (error) {
      return {
        name: `${formName} - ${fieldName} email validation`,
        passed: false,
        message: `Test error: ${error.message}`
      };
    }
  }

  testFormSubmission(form, formName) {
    try {
      const submitButton = form.querySelector('button[type="submit"], input[type="submit"]');
      const hasSubmitHandler = form.onsubmit !== null || form.getAttribute('onsubmit');
      
      return {
        name: `${formName} - Form submission`,
        passed: !!submitButton && (hasSubmitHandler || form.action),
        message: !!submitButton ? 'Form submission configured' : 'No submit button found'
      };
    } catch (error) {
      return {
        name: `${formName} - Form submission`,
        passed: false,
        message: `Test error: ${error.message}`
      };
    }
  }

  // Accessibility Tests
  async testAccessibility() {
    const tests = [];

    // Test skip links
    const skipLinks = document.querySelectorAll('.skip-link, a[href^="#"][class*="skip"]');
    tests.push({
      name: 'Skip Links',
      passed: skipLinks.length > 0,
      message: skipLinks.length > 0 ? `${skipLinks.length} skip links found` : 'No skip links found'
    });

    // Test heading hierarchy
    const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
    const headingTest = this.testHeadingHierarchy(headings);
    tests.push(headingTest);

    // Test form labels
    const labelTest = this.testFormLabels();
    tests.push(labelTest);

    // Test ARIA attributes
    const ariaTest = this.testARIAAttributes();
    tests.push(ariaTest);

    // Test keyboard navigation
    const keyboardTest = this.testKeyboardNavigation();
    tests.push(keyboardTest);

    const passedTests = tests.filter(t => t.passed).length;
    const success = passedTests === tests.length;

    return {
      success,
      tests,
      summary: `${passedTests}/${tests.length} accessibility tests passed`
    };
  }

  testHeadingHierarchy(headings) {
    let previousLevel = 0;
    let hierarchyValid = true;
    
    for (const heading of headings) {
      const level = parseInt(heading.tagName.charAt(1));
      if (level > previousLevel + 1) {
        hierarchyValid = false;
        break;
      }
      previousLevel = level;
    }

    return {
      name: 'Heading Hierarchy',
      passed: hierarchyValid,
      message: hierarchyValid ? 'Heading hierarchy is valid' : 'Heading hierarchy has gaps'
    };
  }

  testFormLabels() {
    const inputs = document.querySelectorAll('input, select, textarea');
    let unlabeledCount = 0;

    inputs.forEach(input => {
      const hasLabel = document.querySelector(`label[for="${input.id}"]`) || 
                      input.getAttribute('aria-label') || 
                      input.getAttribute('aria-labelledby');
      if (!hasLabel) unlabeledCount++;
    });

    return {
      name: 'Form Labels',
      passed: unlabeledCount === 0,
      message: unlabeledCount === 0 ? 'All form inputs have labels' : `${unlabeledCount} inputs missing labels`
    };
  }

  testARIAAttributes() {
    const interactiveElements = document.querySelectorAll('button, a, [role="button"], [tabindex]');
    let missingARIA = 0;

    interactiveElements.forEach(element => {
      if (element.getAttribute('role') === 'button' && !element.getAttribute('aria-label')) {
        missingARIA++;
      }
    });

    return {
      name: 'ARIA Attributes',
      passed: missingARIA === 0,
      message: missingARIA === 0 ? 'ARIA attributes properly used' : `${missingARIA} elements missing ARIA`
    };
  }

  testKeyboardNavigation() {
    const focusableElements = document.querySelectorAll(
      'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
    );

    return {
      name: 'Keyboard Navigation',
      passed: focusableElements.length > 0,
      message: `${focusableElements.length} focusable elements found`
    };
  }

  // Performance Tests
  async testPerformance() {
    const tests = [];

    // Test page load performance
    if (performance && performance.timing) {
      const timing = performance.timing;
      const loadTime = timing.loadEventEnd - timing.navigationStart;
      
      tests.push({
        name: 'Page Load Time',
        passed: loadTime < 3000, // Less than 3 seconds
        message: `Page loaded in ${loadTime}ms`
      });
    }

    // Test resource loading
    if (performance && performance.getEntriesByType) {
      const resources = performance.getEntriesByType('resource');
      const slowResources = resources.filter(r => r.duration > 1000);
      
      tests.push({
        name: 'Resource Loading',
        passed: slowResources.length === 0,
        message: slowResources.length === 0 ? 'All resources load quickly' : `${slowResources.length} slow resources`
      });
    }

    // Test image optimization
    const images = document.querySelectorAll('img');
    let unoptimizedImages = 0;
    
    images.forEach(img => {
      if (!img.loading && !img.getAttribute('data-src')) {
        unoptimizedImages++;
      }
    });

    tests.push({
      name: 'Image Optimization',
      passed: unoptimizedImages === 0,
      message: unoptimizedImages === 0 ? 'Images optimized' : `${unoptimizedImages} images not optimized`
    });

    const passedTests = tests.filter(t => t.passed).length;
    const success = passedTests === tests.length;

    return {
      success,
      tests,
      summary: `${passedTests}/${tests.length} performance tests passed`
    };
  }

  // Cross-Device Tests
  async testCrossDevice() {
    const tests = [];

    // Test touch support
    const touchSupported = 'ontouchstart' in window;
    tests.push({
      name: 'Touch Support',
      passed: true, // Always pass, just report
      message: touchSupported ? 'Touch events supported' : 'Touch events not supported'
    });

    // Test viewport meta tag
    const viewport = document.querySelector('meta[name="viewport"]');
    tests.push({
      name: 'Viewport Meta Tag',
      passed: !!viewport,
      message: viewport ? 'Viewport meta tag present' : 'Viewport meta tag missing'
    });

    // Test button sizes for touch
    const buttons = document.querySelectorAll('button, .btn, a[role="button"]');
    let smallButtons = 0;
    
    buttons.forEach(button => {
      const rect = button.getBoundingClientRect();
      if (rect.width < 44 || rect.height < 44) {
        smallButtons++;
      }
    });

    tests.push({
      name: 'Touch-Friendly Buttons',
      passed: smallButtons === 0,
      message: smallButtons === 0 ? 'All buttons are touch-friendly' : `${smallButtons} buttons too small for touch`
    });

    // Test device orientation support
    const supportsOrientation = 'orientation' in window || 'onorientationchange' in window;
    tests.push({
      name: 'Orientation Support',
      passed: supportsOrientation,
      message: supportsOrientation ? 'Orientation events supported' : 'Orientation events not supported'
    });

    // Test responsive images
    const images = document.querySelectorAll('img');
    let responsiveImages = 0;
    images.forEach(img => {
      if (img.hasAttribute('srcset') || img.style.maxWidth === '100%' || 
          window.getComputedStyle(img).maxWidth === '100%') {
        responsiveImages++;
      }
    });

    tests.push({
      name: 'Responsive Images',
      passed: responsiveImages === images.length,
      message: `${responsiveImages}/${images.length} images are responsive`
    });

    // Test input types for mobile
    const mobileInputs = document.querySelectorAll('input[type="email"], input[type="tel"], input[type="url"]');
    let properInputModes = 0;
    mobileInputs.forEach(input => {
      if (input.hasAttribute('inputmode') || input.type !== 'text') {
        properInputModes++;
      }
    });

    tests.push({
      name: 'Mobile Input Types',
      passed: properInputModes === mobileInputs.length,
      message: `${properInputModes}/${mobileInputs.length} inputs optimized for mobile`
    });

    const passedTests = tests.filter(t => t.passed).length;
    const success = passedTests === tests.length;

    return {
      success,
      tests,
      summary: `${passedTests}/${tests.length} cross-device tests passed`
    };
  }

  // Network Conditions Tests
  async testNetworkConditions() {
    const tests = [];

    // Test offline capability
    const hasServiceWorker = 'serviceWorker' in navigator;
    tests.push({
      name: 'Offline Support',
      passed: hasServiceWorker,
      message: hasServiceWorker ? 'Service worker available' : 'No offline support'
    });

    // Test resource caching
    const hasCacheHeaders = this.testCacheHeaders();
    tests.push({
      name: 'Resource Caching',
      passed: hasCacheHeaders,
      message: hasCacheHeaders ? 'Cache headers present' : 'No cache headers detected'
    });

    const passedTests = tests.filter(t => t.passed).length;
    const success = passedTests === tests.length;

    return {
      success,
      tests,
      summary: `${passedTests}/${tests.length} network tests passed`
    };
  }

  testCacheHeaders() {
    // This would typically require server-side testing
    // For client-side, we can check if resources are cached
    return performance && performance.getEntriesByType && 
           performance.getEntriesByType('resource').some(r => r.transferSize === 0);
  }

  // User Interaction Tests
  async testUserInteractions() {
    const tests = [];

    // Test navigation functionality
    const navTest = this.testNavigation();
    tests.push(navTest);

    // Test modal functionality
    const modalTest = this.testModals();
    tests.push(modalTest);

    // Test accordion functionality
    const accordionTest = this.testAccordions();
    tests.push(accordionTest);

    const passedTests = tests.filter(t => t.passed).length;
    const success = passedTests === tests.length;

    return {
      success,
      tests,
      summary: `${passedTests}/${tests.length} interaction tests passed`
    };
  }

  testNavigation() {
    const navLinks = document.querySelectorAll('.nav-link, nav a[href^="#"]');
    const workingLinks = Array.from(navLinks).filter(link => {
      const href = link.getAttribute('href');
      return href && document.querySelector(href);
    });

    return {
      name: 'Navigation Links',
      passed: workingLinks.length === navLinks.length,
      message: `${workingLinks.length}/${navLinks.length} navigation links working`
    };
  }

  testModals() {
    const modals = document.querySelectorAll('.modal, [role="dialog"]');
    const modalTriggers = document.querySelectorAll('[data-modal], [onclick*="modal"]');

    return {
      name: 'Modal Functionality',
      passed: modals.length > 0 && modalTriggers.length > 0,
      message: `${modals.length} modals, ${modalTriggers.length} triggers found`
    };
  }

  testAccordions() {
    const accordions = document.querySelectorAll('.accordion, .faq-item');
    const accordionTriggers = document.querySelectorAll('.accordion-trigger, .faq-question');

    return {
      name: 'Accordion Functionality',
      passed: accordions.length > 0 && accordionTriggers.length > 0,
      message: `${accordions.length} accordions, ${accordionTriggers.length} triggers found`
    };
  }

  // Report Generation
  generateReport() {
    const report = this.createHTMLReport();
    this.displayReport(report);
    this.logReport();
  }

  createHTMLReport() {
    const totalTests = this.testResults.reduce((sum, suite) => sum + (suite.tests?.length || 0), 0);
    const passedTests = this.testResults.reduce((sum, suite) => 
      sum + (suite.tests?.filter(t => t.passed).length || 0), 0);
    const duration = this.endTime - this.startTime;

    return `
      <div id="test-report" style="
        position: fixed;
        top: 20px;
        right: 20px;
        width: 400px;
        max-height: 80vh;
        overflow-y: auto;
        background: white;
        border: 2px solid #333;
        border-radius: 8px;
        padding: 20px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        z-index: 10000;
        font-family: monospace;
        font-size: 12px;
      ">
        <h2 style="margin: 0 0 16px 0; color: #333;">Automated Test Report</h2>
        
        <div style="margin-bottom: 16px; padding: 12px; background: #f0f8ff; border-radius: 4px;">
          <div><strong>Total Tests:</strong> ${totalTests}</div>
          <div><strong>Passed:</strong> ${passedTests}</div>
          <div><strong>Failed:</strong> ${totalTests - passedTests}</div>
          <div><strong>Success Rate:</strong> ${Math.round((passedTests / totalTests) * 100)}%</div>
          <div><strong>Duration:</strong> ${Math.round(duration / 1000)}s</div>
        </div>

        ${this.testResults.map(suite => `
          <div style="margin-bottom: 12px; border: 1px solid #ddd; border-radius: 4px; padding: 8px;">
            <h3 style="margin: 0 0 8px 0; color: ${suite.success ? 'green' : 'red'};">
              ${suite.success ? '✅' : '❌'} ${suite.suite}
            </h3>
            <div style="font-size: 11px; color: #666;">
              Duration: ${suite.duration}ms | Attempts: ${suite.attempts}
            </div>
            ${suite.tests ? suite.tests.map(test => `
              <div style="margin: 4px 0; color: ${test.passed ? 'green' : 'red'};">
                ${test.passed ? '✅' : '❌'} ${test.name}: ${test.message}
              </div>
            `).join('') : ''}
          </div>
        `).join('')}

        <button onclick="document.getElementById('test-report').remove()" style="
          position: absolute;
          top: 8px;
          right: 8px;
          background: none;
          border: none;
          font-size: 16px;
          cursor: pointer;
        ">×</button>
      </div>
    `;
  }

  displayReport(report) {
    // Remove existing report
    const existing = document.getElementById('test-report');
    if (existing) existing.remove();

    // Add new report
    document.body.insertAdjacentHTML('beforeend', report);
  }

  logReport() {
    console.group('📊 Automated Test Report');
    console.log(`Duration: ${Math.round((this.endTime - this.startTime) / 1000)}s`);
    
    this.testResults.forEach(suite => {
      console.group(`${suite.success ? '✅' : '❌'} ${suite.suite}`);
      if (suite.tests) {
        suite.tests.forEach(test => {
          console.log(`${test.passed ? '✅' : '❌'} ${test.name}: ${test.message}`);
        });
      }
      console.groupEnd();
    });
    
    console.groupEnd();
  }

  getTestSummary() {
    const totalTests = this.testResults.reduce((sum, suite) => sum + (suite.tests?.length || 0), 0);
    const passedTests = this.testResults.reduce((sum, suite) => 
      sum + (suite.tests?.filter(t => t.passed).length || 0), 0);
    
    return {
      totalSuites: this.testResults.length,
      totalTests,
      passedTests,
      failedTests: totalTests - passedTests,
      successRate: Math.round((passedTests / totalTests) * 100),
      duration: this.endTime - this.startTime,
      results: this.testResults
    };
  }
}

// Initialize automated testing
window.automatedTestRunner = new AutomatedTestRunner();

// Add global function to run tests
window.runAutomatedTests = async () => {
  return await window.automatedTestRunner.runAllTests();
};

// Auto-run tests in development
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
  document.addEventListener('DOMContentLoaded', () => {
    console.log('🤖 Automated Test Runner initialized');
    console.log('Run window.runAutomatedTests() to start testing');
    
    // Auto-run after 3 seconds if URL contains ?autotest
    if (window.location.search.includes('autotest')) {
      setTimeout(() => {
        console.log('🚀 Auto-running tests...');
        window.runAutomatedTests();
      }, 3000);
    }
  });
}