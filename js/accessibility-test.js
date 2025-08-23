// Accessibility Testing and Validation Script
// This script tests and validates accessibility features

class AccessibilityTester {
  constructor() {
    this.testResults = [];
    this.errors = [];
    this.warnings = [];
  }
  
  // Run all accessibility tests
  runAllTests() {
    console.log('🔍 Running Accessibility Tests...');
    
    this.testSkipLinks();
    this.testARIALabels();
    this.testKeyboardNavigation();
    this.testFocusManagement();
    this.testFormAccessibility();
    this.testModalAccessibility();
    this.testSliderAccessibility();
    this.testAccordionAccessibility();
    this.testColorContrast();
    this.testScreenReaderSupport();
    this.testReducedMotion();
    
    this.generateReport();
  }
  
  // Test skip links functionality
  testSkipLinks() {
    const skipLinks = document.querySelectorAll('.skip-link');
    
    if (skipLinks.length === 0) {
      this.addError('No skip links found');
      return;
    }
    
    skipLinks.forEach((link, index) => {
      const href = link.getAttribute('href');
      const target = document.querySelector(href);
      
      if (!target) {
        this.addError(`Skip link ${index + 1} target "${href}" not found`);
      } else {
        this.addSuccess(`Skip link ${index + 1} target found`);
      }
      
      // Test skip link visibility on focus
      link.focus();
      const isVisible = this.isElementVisible(link);
      if (!isVisible) {
        this.addError(`Skip link ${index + 1} not visible on focus`);
      } else {
        this.addSuccess(`Skip link ${index + 1} visible on focus`);
      }
    });
  }
  
  // Test ARIA labels and attributes
  testARIALabels() {
    // Test navigation ARIA
    const nav = document.querySelector('.navbar');
    if (nav) {
      if (!nav.getAttribute('role') && !nav.tagName.toLowerCase() === 'nav') {
        this.addWarning('Navigation missing role attribute');
      }
      
      const navToggle = nav.querySelector('.nav-toggle');
      if (navToggle) {
        const requiredAttrs = ['aria-expanded', 'aria-controls', 'aria-label'];
        requiredAttrs.forEach(attr => {
          if (!navToggle.getAttribute(attr)) {
            this.addError(`Navigation toggle missing ${attr}`);
          } else {
            this.addSuccess(`Navigation toggle has ${attr}`);
          }
        });
      }
    }
    
    // Test form ARIA
    const forms = document.querySelectorAll('form');
    forms.forEach((form, formIndex) => {
      const inputs = form.querySelectorAll('input, select, textarea');
      inputs.forEach((input, inputIndex) => {
        const label = form.querySelector(`label[for="${input.id}"]`);
        if (!label && !input.getAttribute('aria-label') && !input.getAttribute('aria-labelledby')) {
          this.addError(`Form ${formIndex + 1}, input ${inputIndex + 1} missing label`);
        } else {
          this.addSuccess(`Form ${formIndex + 1}, input ${inputIndex + 1} has label`);
        }
        
        if (input.hasAttribute('required') && !input.getAttribute('aria-required')) {
          this.addWarning(`Form ${formIndex + 1}, input ${inputIndex + 1} missing aria-required`);
        }
      });
    });
    
    // Test modal ARIA
    const modals = document.querySelectorAll('.modal, .service-modal');
    modals.forEach((modal, index) => {
      const requiredAttrs = ['role', 'aria-modal', 'aria-hidden'];
      requiredAttrs.forEach(attr => {
        if (!modal.getAttribute(attr)) {
          this.addError(`Modal ${index + 1} missing ${attr}`);
        } else {
          this.addSuccess(`Modal ${index + 1} has ${attr}`);
        }
      });
    });
  }
  
  // Test keyboard navigation
  testKeyboardNavigation() {
    // Test focusable elements have proper tabindex
    const focusableElements = document.querySelectorAll(
      'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
    );
    
    let tabIndexIssues = 0;
    focusableElements.forEach((element, index) => {
      const tabIndex = element.getAttribute('tabindex');
      if (tabIndex && parseInt(tabIndex) > 0) {
        tabIndexIssues++;
      }
    });
    
    if (tabIndexIssues > 0) {
      this.addWarning(`${tabIndexIssues} elements have positive tabindex (should use 0 or -1)`);
    } else {
      this.addSuccess('No positive tabindex values found');
    }
    
    // Test interactive elements are keyboard accessible
    const interactiveElements = document.querySelectorAll('.service-card, .team-card, .faq-question');
    interactiveElements.forEach((element, index) => {
      if (!element.getAttribute('tabindex') && element.tagName.toLowerCase() !== 'button' && element.tagName.toLowerCase() !== 'a') {
        this.addWarning(`Interactive element ${index + 1} may not be keyboard accessible`);
      }
    });
  }
  
  // Test focus management
  testFocusManagement() {
    // Test focus indicators
    const testElement = document.querySelector('button, a, input');
    if (testElement) {
      testElement.focus();
      const computedStyle = window.getComputedStyle(testElement, ':focus');
      const outline = computedStyle.outline;
      
      if (outline === 'none' || outline === '0px') {
        // Check if custom focus styles exist
        const hasCustomFocus = computedStyle.boxShadow !== 'none' || 
                              computedStyle.border !== testElement.style.border;
        
        if (!hasCustomFocus) {
          this.addError('Focus indicators may be missing');
        } else {
          this.addSuccess('Custom focus indicators detected');
        }
      } else {
        this.addSuccess('Focus indicators present');
      }
    }
  }
  
  // Test form accessibility
  testFormAccessibility() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach((form, formIndex) => {
      // Test error message association
      const errorElements = form.querySelectorAll('.form-error, [role="alert"]');
      errorElements.forEach((error, errorIndex) => {
        if (!error.getAttribute('aria-live')) {
          this.addWarning(`Form ${formIndex + 1}, error ${errorIndex + 1} missing aria-live`);
        }
      });
      
      // Test required field indicators
      const requiredInputs = form.querySelectorAll('input[required], select[required], textarea[required]');
      requiredInputs.forEach((input, inputIndex) => {
        const label = form.querySelector(`label[for="${input.id}"]`);
        if (label) {
          const hasRequiredIndicator = label.querySelector('.required') || 
                                      label.textContent.includes('*') ||
                                      input.getAttribute('aria-required') === 'true';
          
          if (!hasRequiredIndicator) {
            this.addWarning(`Form ${formIndex + 1}, required input ${inputIndex + 1} missing visual indicator`);
          }
        }
      });
    });
  }
  
  // Test modal accessibility
  testModalAccessibility() {
    const modals = document.querySelectorAll('.modal, .service-modal');
    
    modals.forEach((modal, index) => {
      // Test close button
      const closeButton = modal.querySelector('.modal-close, .close-button, [aria-label*="close"]');
      if (!closeButton) {
        this.addError(`Modal ${index + 1} missing close button`);
      } else {
        if (!closeButton.getAttribute('aria-label')) {
          this.addWarning(`Modal ${index + 1} close button missing aria-label`);
        }
      }
      
      // Test modal title
      const title = modal.querySelector('h1, h2, h3, .modal-title');
      if (title && !modal.getAttribute('aria-labelledby')) {
        this.addWarning(`Modal ${index + 1} not associated with title`);
      }
    });
  }
  
  // Test slider accessibility
  testSliderAccessibility() {
    const slider = document.querySelector('.hero-slider');
    if (slider) {
      if (!slider.getAttribute('role')) {
        this.addError('Slider missing role attribute');
      }
      
      if (!slider.getAttribute('aria-label') && !slider.getAttribute('aria-labelledby')) {
        this.addError('Slider missing accessible name');
      }
      
      const slides = slider.querySelectorAll('.slider-slide');
      slides.forEach((slide, index) => {
        if (!slide.getAttribute('role')) {
          this.addWarning(`Slide ${index + 1} missing role attribute`);
        }
      });
      
      const indicators = slider.querySelectorAll('.slider-indicator');
      indicators.forEach((indicator, index) => {
        if (!indicator.getAttribute('aria-label')) {
          this.addWarning(`Slider indicator ${index + 1} missing aria-label`);
        }
      });
    }
  }
  
  // Test accordion accessibility
  testAccordionAccessibility() {
    const accordions = document.querySelectorAll('.faq-accordion, .accordion');
    
    accordions.forEach((accordion, accordionIndex) => {
      const items = accordion.querySelectorAll('.faq-item, .accordion-item');
      
      items.forEach((item, itemIndex) => {
        const button = item.querySelector('button, .faq-question');
        const content = item.querySelector('.faq-answer, .accordion-content');
        
        if (button && content) {
          if (!button.getAttribute('aria-expanded')) {
            this.addError(`Accordion ${accordionIndex + 1}, item ${itemIndex + 1} button missing aria-expanded`);
          }
          
          if (!button.getAttribute('aria-controls')) {
            this.addError(`Accordion ${accordionIndex + 1}, item ${itemIndex + 1} button missing aria-controls`);
          }
          
          if (!content.getAttribute('aria-hidden')) {
            this.addWarning(`Accordion ${accordionIndex + 1}, item ${itemIndex + 1} content missing aria-hidden`);
          }
        }
      });
    });
  }
  
  // Test color contrast (basic check)
  testColorContrast() {
    // This is a simplified test - in production, use tools like axe-core
    const textElements = document.querySelectorAll('p, h1, h2, h3, h4, h5, h6, span, a, button');
    let contrastIssues = 0;
    
    textElements.forEach(element => {
      const style = window.getComputedStyle(element);
      const color = style.color;
      const backgroundColor = style.backgroundColor;
      
      // Simple check for very light text on light backgrounds
      if (color.includes('rgb(255') && backgroundColor.includes('rgb(255')) {
        contrastIssues++;
      }
    });
    
    if (contrastIssues > 0) {
      this.addWarning(`${contrastIssues} potential color contrast issues detected`);
    } else {
      this.addSuccess('No obvious color contrast issues detected');
    }
  }
  
  // Test screen reader support
  testScreenReaderSupport() {
    // Test for screen reader only content
    const srOnlyElements = document.querySelectorAll('.visually-hidden, .sr-only');
    if (srOnlyElements.length > 0) {
      this.addSuccess(`${srOnlyElements.length} screen reader only elements found`);
    }
    
    // Test for aria-live regions
    const liveRegions = document.querySelectorAll('[aria-live]');
    if (liveRegions.length > 0) {
      this.addSuccess(`${liveRegions.length} live regions found`);
    } else {
      this.addWarning('No aria-live regions found');
    }
    
    // Test for landmark roles
    const landmarks = document.querySelectorAll('[role="banner"], [role="navigation"], [role="main"], [role="contentinfo"], header, nav, main, footer');
    if (landmarks.length > 0) {
      this.addSuccess(`${landmarks.length} landmark elements found`);
    } else {
      this.addWarning('No landmark elements found');
    }
  }
  
  // Test reduced motion support
  testReducedMotion() {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    if (prefersReducedMotion.matches) {
      // Check if animations are disabled
      const animatedElements = document.querySelectorAll('[style*="animation"], [class*="animate"]');
      let animationsDisabled = 0;
      
      animatedElements.forEach(element => {
        const style = window.getComputedStyle(element);
        if (style.animationDuration === '0s' || style.animationDuration === '0.01ms') {
          animationsDisabled++;
        }
      });
      
      if (animationsDisabled > 0) {
        this.addSuccess(`${animationsDisabled} animations properly disabled for reduced motion`);
      }
    }
    
    // Check for reduce-motion class support
    if (document.body.classList.contains('reduce-motion')) {
      this.addSuccess('Reduced motion class applied to body');
    }
  }
  
  // Helper methods
  isElementVisible(element) {
    const rect = element.getBoundingClientRect();
    return rect.width > 0 && rect.height > 0 && 
           window.getComputedStyle(element).visibility !== 'hidden' &&
           window.getComputedStyle(element).display !== 'none';
  }
  
  addSuccess(message) {
    this.testResults.push({ type: 'success', message });
    console.log('✅', message);
  }
  
  addWarning(message) {
    this.warnings.push(message);
    this.testResults.push({ type: 'warning', message });
    console.warn('⚠️', message);
  }
  
  addError(message) {
    this.errors.push(message);
    this.testResults.push({ type: 'error', message });
    console.error('❌', message);
  }
  
  // Generate accessibility report
  generateReport() {
    const successCount = this.testResults.filter(r => r.type === 'success').length;
    const warningCount = this.warnings.length;
    const errorCount = this.errors.length;
    
    console.log('\n📊 Accessibility Test Report');
    console.log('================================');
    console.log(`✅ Passed: ${successCount}`);
    console.log(`⚠️  Warnings: ${warningCount}`);
    console.log(`❌ Errors: ${errorCount}`);
    
    if (errorCount === 0 && warningCount === 0) {
      console.log('\n🎉 All accessibility tests passed!');
    } else if (errorCount === 0) {
      console.log('\n✨ No critical accessibility issues found, but some improvements recommended.');
    } else {
      console.log('\n🔧 Critical accessibility issues found that should be addressed.');
    }
    
    // Create visual report in DOM
    this.createVisualReport();
  }
  
  createVisualReport() {
    // Remove existing report
    const existingReport = document.getElementById('accessibility-report');
    if (existingReport) {
      existingReport.remove();
    }
    
    const report = document.createElement('div');
    report.id = 'accessibility-report';
    report.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      width: 300px;
      max-height: 400px;
      overflow-y: auto;
      background: white;
      border: 2px solid #333;
      border-radius: 8px;
      padding: 16px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.3);
      z-index: 10000;
      font-family: monospace;
      font-size: 12px;
    `;
    
    const successCount = this.testResults.filter(r => r.type === 'success').length;
    const warningCount = this.warnings.length;
    const errorCount = this.errors.length;
    
    report.innerHTML = `
      <h3 style="margin: 0 0 12px 0; color: #333;">Accessibility Report</h3>
      <div style="margin-bottom: 12px;">
        <div style="color: green;">✅ Passed: ${successCount}</div>
        <div style="color: orange;">⚠️ Warnings: ${warningCount}</div>
        <div style="color: red;">❌ Errors: ${errorCount}</div>
      </div>
      <button onclick="this.parentElement.remove()" style="
        position: absolute;
        top: 8px;
        right: 8px;
        background: none;
        border: none;
        font-size: 16px;
        cursor: pointer;
      ">×</button>
      <div style="max-height: 200px; overflow-y: auto;">
        ${this.testResults.map(result => `
          <div style="margin: 4px 0; color: ${
            result.type === 'success' ? 'green' : 
            result.type === 'warning' ? 'orange' : 'red'
          };">
            ${result.type === 'success' ? '✅' : 
              result.type === 'warning' ? '⚠️' : '❌'} ${result.message}
          </div>
        `).join('')}
      </div>
    `;
    
    document.body.appendChild(report);
  }
}

// Initialize accessibility tester
window.accessibilityTester = new AccessibilityTester();

// Add keyboard shortcut to run tests (Ctrl+Alt+A)
document.addEventListener('keydown', (e) => {
  if (e.ctrlKey && e.altKey && e.key === 'a') {
    e.preventDefault();
    window.accessibilityTester.runAllTests();
  }
});

// Auto-run tests in development
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
  document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
      console.log('🔍 Running automatic accessibility tests...');
      console.log('Press Ctrl+Alt+A to run tests manually');
      window.accessibilityTester.runAllTests();
    }, 2000);
  });
}