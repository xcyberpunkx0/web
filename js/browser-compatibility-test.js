// Comprehensive Browser Compatibility Testing
// Tests specific features across Chrome, Firefox, Safari, and Edge

class BrowserCompatibilityTest {
  constructor() {
    this.browserInfo = this.detectBrowser();
    this.testResults = [];
    this.init();
  }

  init() {
    this.runCompatibilityTests();
  }

  detectBrowser() {
    const ua = navigator.userAgent;
    const browsers = {
      chrome: /Chrome\/(\d+)/.exec(ua),
      firefox: /Firefox\/(\d+)/.exec(ua),
      safari: /Version\/(\d+).*Safari/.exec(ua),
      edge: /Edg\/(\d+)/.exec(ua),
      ie: /MSIE (\d+)|Trident.*rv:(\d+)/.exec(ua)
    };

    for (const [name, match] of Object.entries(browsers)) {
      if (match) {
        return {
          name: name,
          version: parseInt(match[1] || match[2]),
          userAgent: ua,
          isModern: this.isModernBrowser(name, parseInt(match[1] || match[2]))
        };
      }
    }

    return { name: 'unknown', version: 0, userAgent: ua, isModern: false };
  }

  isModernBrowser(name, version) {
    const minimumVersions = {
      chrome: 90,
      firefox: 88,
      safari: 14,
      edge: 90,
      ie: 0 // IE not supported
    };
    
    return version >= (minimumVersions[name] || 0);
  }

  async runCompatibilityTests() {
    console.log('🌐 Running Browser Compatibility Tests...');
    
    // Test CSS features
    await this.testCSSFeatures();
    
    // Test JavaScript APIs
    await this.testJavaScriptAPIs();
    
    // Test HTML5 features
    await this.testHTML5Features();
    
    // Test performance APIs
    await this.testPerformanceAPIs();
    
    // Test security features
    await this.testSecurityFeatures();
    
    // Generate compatibility report
    this.generateCompatibilityReport();
  }  
async testCSSFeatures() {
    const cssTests = [
      { name: 'CSS Grid', test: () => CSS.supports('display', 'grid') },
      { name: 'CSS Flexbox', test: () => CSS.supports('display', 'flex') },
      { name: 'CSS Custom Properties', test: () => CSS.supports('--test', 'value') },
      { name: 'CSS Transforms', test: () => CSS.supports('transform', 'translateX(0)') },
      { name: 'CSS Transitions', test: () => CSS.supports('transition', 'all 0.3s') },
      { name: 'CSS Animations', test: () => CSS.supports('animation', 'test 1s') },
      { name: 'CSS Object Fit', test: () => CSS.supports('object-fit', 'cover') },
      { name: 'CSS Clip Path', test: () => CSS.supports('clip-path', 'circle(50%)') },
      { name: 'CSS Smooth Scroll', test: () => CSS.supports('scroll-behavior', 'smooth') },
      { name: 'CSS Backdrop Filter', test: () => CSS.supports('backdrop-filter', 'blur(10px)') }
    ];

    cssTests.forEach(test => {
      const passed = test.test();
      this.testResults.push({
        category: 'CSS Features',
        name: test.name,
        passed,
        message: passed ? 'Supported' : 'Not supported',
        critical: ['CSS Grid', 'CSS Flexbox', 'CSS Custom Properties'].includes(test.name)
      });
    });
  }

  async testJavaScriptAPIs() {
    const jsTests = [
      { name: 'Fetch API', test: () => 'fetch' in window },
      { name: 'Promise API', test: () => 'Promise' in window },
      { name: 'Async/Await', test: () => this.testAsyncAwait() },
      { name: 'Intersection Observer', test: () => 'IntersectionObserver' in window },
      { name: 'Mutation Observer', test: () => 'MutationObserver' in window },
      { name: 'Resize Observer', test: () => 'ResizeObserver' in window },
      { name: 'Web Animations API', test: () => 'animate' in document.createElement('div') },
      { name: 'Service Workers', test: () => 'serviceWorker' in navigator },
      { name: 'Web Workers', test: () => 'Worker' in window },
      { name: 'Local Storage', test: () => this.testLocalStorage() },
      { name: 'Session Storage', test: () => 'sessionStorage' in window },
      { name: 'IndexedDB', test: () => 'indexedDB' in window }
    ];

    jsTests.forEach(test => {
      const passed = test.test();
      this.testResults.push({
        category: 'JavaScript APIs',
        name: test.name,
        passed,
        message: passed ? 'Available' : 'Not available',
        critical: ['Fetch API', 'Promise API', 'Intersection Observer'].includes(test.name)
      });
    });
  }

  testAsyncAwait() {
    try {
      eval('(async () => {})');
      return true;
    } catch (e) {
      return false;
    }
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
async testHTML5Features() {
    const html5Tests = [
      { name: 'HTML5 Form Validation', test: () => 'checkValidity' in document.createElement('input') },
      { name: 'HTML5 Input Types', test: () => this.testHTML5InputTypes() },
      { name: 'FormData API', test: () => 'FormData' in window },
      { name: 'Canvas API', test: () => 'getContext' in document.createElement('canvas') },
      { name: 'SVG Support', test: () => document.implementation.hasFeature('http://www.w3.org/TR/SVG11/feature#BasicStructure', '1.1') },
      { name: 'Audio API', test: () => 'Audio' in window },
      { name: 'Video API', test: () => 'HTMLVideoElement' in window },
      { name: 'Geolocation API', test: () => 'geolocation' in navigator },
      { name: 'History API', test: () => 'pushState' in history },
      { name: 'WebRTC', test: () => 'RTCPeerConnection' in window }
    ];

    html5Tests.forEach(test => {
      const passed = test.test();
      this.testResults.push({
        category: 'HTML5 Features',
        name: test.name,
        passed,
        message: passed ? 'Supported' : 'Not supported',
        critical: ['HTML5 Form Validation', 'FormData API'].includes(test.name)
      });
    });
  }

  testHTML5InputTypes() {
    const input = document.createElement('input');
    const types = ['email', 'tel', 'url', 'number', 'date', 'time', 'color'];
    let supportedCount = 0;

    types.forEach(type => {
      input.type = type;
      if (input.type === type) {
        supportedCount++;
      }
    });

    return supportedCount >= 5; // At least 5 out of 7 types supported
  }

  async testPerformanceAPIs() {
    const perfTests = [
      { name: 'Performance API', test: () => 'performance' in window },
      { name: 'Performance Observer', test: () => 'PerformanceObserver' in window },
      { name: 'Navigation Timing', test: () => 'timing' in performance },
      { name: 'Resource Timing', test: () => 'getEntriesByType' in performance },
      { name: 'User Timing', test: () => 'mark' in performance && 'measure' in performance },
      { name: 'Paint Timing', test: () => this.testPaintTiming() }
    ];

    perfTests.forEach(test => {
      const passed = test.test();
      this.testResults.push({
        category: 'Performance APIs',
        name: test.name,
        passed,
        message: passed ? 'Available' : 'Not available',
        critical: ['Performance API'].includes(test.name)
      });
    });
  }

  testPaintTiming() {
    try {
      return performance.getEntriesByType('paint').length > 0 || 
             'PerformancePaintTiming' in window;
    } catch (e) {
      return false;
    }
  }  async
testSecurityFeatures() {
    const securityTests = [
      { name: 'HTTPS Protocol', test: () => location.protocol === 'https:' },
      { name: 'Content Security Policy', test: () => this.testCSP() },
      { name: 'Secure Context', test: () => window.isSecureContext },
      { name: 'Crypto API', test: () => 'crypto' in window && 'subtle' in crypto },
      { name: 'Permissions API', test: () => 'permissions' in navigator },
      { name: 'Credential Management', test: () => 'credentials' in navigator }
    ];

    securityTests.forEach(test => {
      const passed = test.test();
      this.testResults.push({
        category: 'Security Features',
        name: test.name,
        passed,
        message: passed ? 'Available' : 'Not available',
        critical: ['HTTPS Protocol'].includes(test.name)
      });
    });
  }

  testCSP() {
    try {
      return document.querySelector('meta[http-equiv="Content-Security-Policy"]') !== null ||
             document.querySelector('meta[http-equiv="content-security-policy"]') !== null;
    } catch (e) {
      return false;
    }
  }

  generateCompatibilityReport() {
    const totalTests = this.testResults.length;
    const passedTests = this.testResults.filter(r => r.passed).length;
    const criticalTests = this.testResults.filter(r => r.critical);
    const passedCritical = criticalTests.filter(r => r.passed).length;
    
    const compatibilityScore = Math.round((passedTests / totalTests) * 100);
    const criticalScore = Math.round((passedCritical / criticalTests.length) * 100);

    console.group('🌐 Browser Compatibility Report');
    console.log(`Browser: ${this.browserInfo.name} ${this.browserInfo.version}`);
    console.log(`Modern Browser: ${this.browserInfo.isModern ? 'Yes' : 'No'}`);
    console.log(`Overall Compatibility: ${compatibilityScore}%`);
    console.log(`Critical Features: ${criticalScore}%`);
    
    // Group results by category
    const categories = [...new Set(this.testResults.map(r => r.category))];
    categories.forEach(category => {
      console.group(`${category}:`);
      const categoryTests = this.testResults.filter(r => r.category === category);
      categoryTests.forEach(test => {
        const icon = test.passed ? '✅' : '❌';
        const critical = test.critical ? ' (Critical)' : '';
        console.log(`${icon} ${test.name}${critical}: ${test.message}`);
      });
      console.groupEnd();
    });

    console.groupEnd();

    // Create visual report
    this.createVisualCompatibilityReport(compatibilityScore, criticalScore);
  }

  createVisualCompatibilityReport(overallScore, criticalScore) {
    // Remove existing report
    const existingReport = document.getElementById('browser-compatibility-report');
    if (existingReport) {
      existingReport.remove();
    }

    const report = document.createElement('div');
    report.id = 'browser-compatibility-report';
    report.style.cssText = `
      position: fixed;
      top: 20px;
      left: 20px;
      width: 350px;
      max-height: 500px;
      overflow-y: auto;
      background: white;
      border: 2px solid #1a365d;
      border-radius: 8px;
      padding: 16px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.3);
      z-index: 10000;
      font-family: 'Inter', sans-serif;
      font-size: 12px;
    `;

    const scoreColor = overallScore >= 90 ? 'green' : overallScore >= 70 ? 'orange' : 'red';
    const criticalColor = criticalScore >= 90 ? 'green' : criticalScore >= 70 ? 'orange' : 'red';

    report.innerHTML = `
      <h3 style="margin: 0 0 12px 0; color: #1a365d;">Browser Compatibility</h3>
      
      <div style="margin-bottom: 16px; padding: 12px; background: #f7fafc; border-radius: 4px;">
        <div><strong>Browser:</strong> ${this.browserInfo.name} ${this.browserInfo.version}</div>
        <div><strong>Modern:</strong> ${this.browserInfo.isModern ? '✅ Yes' : '❌ No'}</div>
        <div style="color: ${scoreColor};"><strong>Overall:</strong> ${overallScore}%</div>
        <div style="color: ${criticalColor};"><strong>Critical:</strong> ${criticalScore}%</div>
      </div>

      ${this.generateCategoryReports()}

      <button onclick="this.parentElement.remove()" style="
        position: absolute;
        top: 8px;
        right: 8px;
        background: none;
        border: none;
        font-size: 16px;
        cursor: pointer;
        color: #666;
      ">×</button>
    `;

    document.body.appendChild(report);
  }

  generateCategoryReports() {
    const categories = [...new Set(this.testResults.map(r => r.category))];
    
    return categories.map(category => {
      const categoryTests = this.testResults.filter(r => r.category === category);
      const passed = categoryTests.filter(t => t.passed).length;
      const total = categoryTests.length;
      const percentage = Math.round((passed / total) * 100);
      
      return `
        <div style="margin-bottom: 12px; border: 1px solid #e2e8f0; border-radius: 4px; padding: 8px;">
          <h4 style="margin: 0 0 8px 0; color: #2d3748;">${category} (${percentage}%)</h4>
          ${categoryTests.map(test => `
            <div style="margin: 2px 0; font-size: 11px; color: ${test.passed ? 'green' : 'red'};">
              ${test.passed ? '✅' : '❌'} ${test.name}${test.critical ? ' ⭐' : ''}
            </div>
          `).join('')}
        </div>
      `;
    }).join('');
  }
}

// Initialize browser compatibility testing
window.browserCompatibilityTest = new BrowserCompatibilityTest();

// Export for global access
window.runBrowserCompatibilityTest = () => {
  return new BrowserCompatibilityTest();
};