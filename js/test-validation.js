// Test Validation Script
// Validates that all testing components are working correctly

class TestValidation {
  constructor() {
    this.validationResults = [];
    this.init();
  }

  init() {
    this.validateTestingInfrastructure();
  }

  validateTestingInfrastructure() {
    console.log('🔍 Validating Testing Infrastructure...');
    
    // Validate test files are loaded
    this.validateTestFiles();
    
    // Validate test functions are available
    this.validateTestFunctions();
    
    // Validate DOM elements for testing
    this.validateTestElements();
    
    // Validate browser compatibility for testing
    this.validateBrowserSupport();
    
    // Generate validation report
    this.generateValidationReport();
  }

  validateTestFiles() {
    const requiredScripts = [
      'js/test-suite.js',
      'js/browser-compatibility-test.js',
      'js/responsive-design-test.js',
      'js/form-validation-test.js',
      'js/accessibility-test.js',
      'js/comprehensive-test-runner.js'
    ];
    
    const loadedScripts = Array.from(document.scripts).map(script => 
      script.src.split('/').slice(-2).join('/')
    );
    
    requiredScripts.forEach(script => {
      const isLoaded = loadedScripts.some(loaded => loaded.includes(script.split('/').pop()));
      this.validationResults.push({
        category: 'Script Loading',
        test: script,
        passed: isLoaded,
        message: isLoaded ? 'Loaded successfully' : 'Not loaded'
      });
    });
  }

  validateTestFunctions() {
    const requiredFunctions = [
      { name: 'runBrowserTests', object: window },
      { name: 'runAllTests', object: window },
      { name: 'runComprehensiveTests', object: window },
      { name: 'runBrowserCompatibilityTest', object: window },
      { name: 'runResponsiveDesignTest', object: window },
      { name: 'runFormValidationTest', object: window },
      { name: 'testSuite', object: window, property: true },
      { name: 'accessibilityTester', object: window, property: true },
      { name: 'comprehensiveTestRunner', object: window, property: true }
    ];
    
    requiredFunctions.forEach(func => {
      const exists = func.property ? 
        (func.object[func.name] !== undefined) : 
        (typeof func.object[func.name] === 'function');
      
      this.validationResults.push({
        category: 'Function Availability',
        test: func.name,
        passed: exists,
        message: exists ? 'Available' : 'Not available'
      });
    });
  }

  validateTestElements() {
    const requiredElements = [
      '#browser-grid',
      '#responsive-iframe',
      '#test-results',
      '#run-all-button',
      '#run-comprehensive-button'
    ];
    
    requiredElements.forEach(selector => {
      const element = document.querySelector(selector);
      this.validationResults.push({
        category: 'DOM Elements',
        test: selector,
        passed: !!element,
        message: element ? 'Element found' : 'Element missing'
      });
    });
  }

  validateBrowserSupport() {
    const browserFeatures = [
      { name: 'Console API', test: () => typeof console !== 'undefined' },
      { name: 'Promise Support', test: () => typeof Promise !== 'undefined' },
      { name: 'Fetch API', test: () => typeof fetch !== 'undefined' },
      { name: 'CSS.supports', test: () => typeof CSS !== 'undefined' && typeof CSS.supports === 'function' },
      { name: 'Performance API', test: () => typeof performance !== 'undefined' },
      { name: 'Local Storage', test: () => this.testLocalStorage() },
      { name: 'Event Listeners', test: () => typeof addEventListener !== 'undefined' }
    ];
    
    browserFeatures.forEach(feature => {
      const supported = feature.test();
      this.validationResults.push({
        category: 'Browser Support',
        test: feature.name,
        passed: supported,
        message: supported ? 'Supported' : 'Not supported'
      });
    });
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

  generateValidationReport() {
    const categories = [...new Set(this.validationResults.map(r => r.category))];
    const totalTests = this.validationResults.length;
    const passedTests = this.validationResults.filter(r => r.passed).length;
    const successRate = Math.round((passedTests / totalTests) * 100);
    
    console.group('✅ Test Infrastructure Validation');
    console.log(`Validation Tests: ${passedTests}/${totalTests} passed (${successRate}%)`);
    
    categories.forEach(category => {
      console.group(`${category}:`);
      const categoryTests = this.validationResults.filter(r => r.category === category);
      categoryTests.forEach(test => {
        const icon = test.passed ? '✅' : '❌';
        console.log(`${icon} ${test.test}: ${test.message}`);
      });
      console.groupEnd();
    });
    
    if (successRate === 100) {
      console.log('🎉 All validation tests passed! Testing infrastructure is ready.');
    } else {
      console.warn('⚠️ Some validation tests failed. Check the issues above.');
    }
    
    console.groupEnd();
    
    return {
      totalTests,
      passedTests,
      successRate,
      results: this.validationResults
    };
  }
}

// Run validation when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    window.testValidation = new TestValidation();
  }, 1000);
});