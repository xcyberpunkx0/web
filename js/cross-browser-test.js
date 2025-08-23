// Cross-Browser Compatibility Testing Script
// Tests specific browser features and provides fallbacks

class CrossBrowserTester {
  constructor() {
    this.browserInfo = this.detectBrowser();
    this.featureSupport = {};
    this.init();
  }

  init() {
    this.testFeatureSupport();
    this.applyPolyfills();
    this.setupBrowserSpecificFixes();
    this.logBrowserInfo();
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
          userAgent: ua
        };
      }
    }

    return { name: 'unknown', version: 0, userAgent: ua };
  }

  testFeatureSupport() {
    const features = {
      // CSS Features
      cssGrid: CSS.supports('display', 'grid'),
      cssFlexbox: CSS.supports('display', 'flex'),
      cssCustomProperties: CSS.supports('--test', 'value'),
      cssTransforms: CSS.supports('transform', 'translateX(0)'),
      cssTransitions: CSS.supports('transition', 'all 0.3s'),
      cssAnimations: CSS.supports('animation', 'test 1s'),
      cssSmoothScroll: CSS.supports('scroll-behavior', 'smooth'),
      cssObjectFit: CSS.supports('object-fit', 'cover'),
      cssClipPath: CSS.supports('clip-path', 'circle(50%)'),

      // JavaScript APIs
      intersectionObserver: 'IntersectionObserver' in window,
      mutationObserver: 'MutationObserver' in window,
      resizeObserver: 'ResizeObserver' in window,
      webAnimationsAPI: 'animate' in document.createElement('div'),
      fetchAPI: 'fetch' in window,
      promiseAPI: 'Promise' in window,
      asyncAwait: this.testAsyncAwait(),

      // Storage APIs
      localStorage: 'localStorage' in window && this.testLocalStorage(),
      sessionStorage: 'sessionStorage' in window,
      indexedDB: 'indexedDB' in window,

      // Form Features
      html5FormValidation: 'checkValidity' in document.createElement('input'),
      html5InputTypes: this.testHTML5InputTypes(),
      formData: 'FormData' in window,

      // Media Features
      webp: this.testWebPSupport(),
      avif: this.testAVIFSupport(),
      touchEvents: 'ontouchstart' in window,
      pointerEvents: 'PointerEvent' in window,

      // Network Features
      serviceWorker: 'serviceWorker' in navigator,
      webWorkers: 'Worker' in window,
      geolocation: 'geolocation' in navigator,

      // Security Features
      https: location.protocol === 'https:',
      csp: this.testCSP()
    };

    this.featureSupport = features;
    return features;
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

  testHTML5InputTypes() {
    const input = document.createElement('input');
    const types = ['email', 'tel', 'url', 'number', 'date', 'time', 'color'];
    const supported = {};

    types.forEach(type => {
      input.type = type;
      supported[type] = input.type === type;
    });

    return supported;
  }

  testWebPSupport() {
    return new Promise((resolve) => {
      const webP = new Image();
      webP.onload = webP.onerror = () => resolve(webP.height === 2);
      webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
    });
  }

  testAVIFSupport() {
    return new Promise((resolve) => {
      const avif = new Image();
      avif.onload = avif.onerror = () => resolve(avif.height === 2);
      avif.src = 'data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAAB0AAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAIAAAACAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQ0MAAAAABNjb2xybmNseAACAAIAAYAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAACVtZGF0EgAKCBgABogQEAwgMg8f8D///8WfhwB8+ErK42A=';
    });
  }

  testCSP() {
    try {
      return document.querySelector('meta[http-equiv="Content-Security-Policy"]') !== null;
    } catch (e) {
      return false;
    }
  }

  applyPolyfills() {
    // Intersection Observer Polyfill
    if (!this.featureSupport.intersectionObserver) {
      this.loadPolyfill('https://polyfill.io/v3/polyfill.min.js?features=IntersectionObserver');
    }

    // Fetch API Polyfill
    if (!this.featureSupport.fetchAPI) {
      this.loadPolyfill('https://polyfill.io/v3/polyfill.min.js?features=fetch');
    }

    // Promise Polyfill
    if (!this.featureSupport.promiseAPI) {
      this.loadPolyfill('https://polyfill.io/v3/polyfill.min.js?features=Promise');
    }

    // CSS Custom Properties Polyfill for IE
    if (!this.featureSupport.cssCustomProperties && this.browserInfo.name === 'ie') {
      this.loadPolyfill('https://cdn.jsdelivr.net/npm/css-vars-ponyfill@2');
    }

    // Smooth Scroll Polyfill
    if (!this.featureSupport.cssSmoothScroll) {
      this.addSmoothScrollPolyfill();
    }

    // Object-fit Polyfill
    if (!this.featureSupport.cssObjectFit) {
      this.addObjectFitPolyfill();
    }
  }

  loadPolyfill(url) {
    const script = document.createElement('script');
    script.src = url;
    script.async = true;
    document.head.appendChild(script);
  }

  addSmoothScrollPolyfill() {
    // Simple smooth scroll polyfill
    if (!Element.prototype.scrollIntoView) return;

    const originalScrollIntoView = Element.prototype.scrollIntoView;
    Element.prototype.scrollIntoView = function(options) {
      if (typeof options === 'object' && options.behavior === 'smooth') {
        const targetPosition = this.getBoundingClientRect().top + window.pageYOffset;
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        const duration = 500;
        let start = null;

        function animation(currentTime) {
          if (start === null) start = currentTime;
          const timeElapsed = currentTime - start;
          const run = ease(timeElapsed, startPosition, distance, duration);
          window.scrollTo(0, run);
          if (timeElapsed < duration) requestAnimationFrame(animation);
        }

        function ease(t, b, c, d) {
          t /= d / 2;
          if (t < 1) return c / 2 * t * t + b;
          t--;
          return -c / 2 * (t * (t - 2) - 1) + b;
        }

        requestAnimationFrame(animation);
      } else {
        originalScrollIntoView.call(this, options);
      }
    };
  }

  addObjectFitPolyfill() {
    // Simple object-fit polyfill for images
    const images = document.querySelectorAll('img[style*="object-fit"]');
    images.forEach(img => {
      const objectFit = img.style.objectFit;
      if (objectFit === 'cover' || objectFit === 'contain') {
        const wrapper = document.createElement('div');
        wrapper.style.cssText = `
          position: relative;
          overflow: hidden;
          width: ${img.offsetWidth}px;
          height: ${img.offsetHeight}px;
        `;
        
        img.parentNode.insertBefore(wrapper, img);
        wrapper.appendChild(img);
        
        img.style.cssText += `
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          ${objectFit === 'cover' ? 'min-width: 100%; min-height: 100%;' : 'max-width: 100%; max-height: 100%;'}
        `;
      }
    });
  }

  setupBrowserSpecificFixes() {
    const { name, version } = this.browserInfo;

    // Safari-specific fixes
    if (name === 'safari') {
      this.applySafariFixes();
    }

    // Firefox-specific fixes
    if (name === 'firefox') {
      this.applyFirefoxFixes();
    }

    // Chrome-specific fixes
    if (name === 'chrome') {
      this.applyChromeFixes();
    }

    // Edge-specific fixes
    if (name === 'edge') {
      this.applyEdgeFixes();
    }

    // IE-specific fixes (if still supporting)
    if (name === 'ie') {
      this.applyIEFixes();
    }

    // Mobile browser fixes
    if (this.isMobile()) {
      this.applyMobileFixes();
    }
  }

  applySafariFixes() {
    // Fix for Safari's viewport height issue
    const setVH = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };
    
    setVH();
    window.addEventListener('resize', setVH);
    window.addEventListener('orientationchange', setVH);

    // Fix for Safari's date input styling
    const dateInputs = document.querySelectorAll('input[type="date"]');
    dateInputs.forEach(input => {
      input.style.webkitAppearance = 'none';
    });

    // Fix for Safari's smooth scrolling
    document.documentElement.style.webkitScrollBehavior = 'smooth';
  }

  applyFirefoxFixes() {
    // Fix for Firefox's focus outline
    const style = document.createElement('style');
    style.textContent = `
      @-moz-document url-prefix() {
        button::-moz-focus-inner {
          border: 0;
          padding: 0;
        }
      }
    `;
    document.head.appendChild(style);
  }

  applyChromeFixes() {
    // Fix for Chrome's autofill styling
    const style = document.createElement('style');
    style.textContent = `
      input:-webkit-autofill,
      input:-webkit-autofill:hover,
      input:-webkit-autofill:focus {
        -webkit-box-shadow: 0 0 0 1000px white inset !important;
        -webkit-text-fill-color: #333 !important;
      }
    `;
    document.head.appendChild(style);
  }

  applyEdgeFixes() {
    // Fix for Edge's grid layout issues
    const style = document.createElement('style');
    style.textContent = `
      @supports (-ms-grid-columns: 1fr) {
        .grid-container {
          display: -ms-grid;
        }
      }
    `;
    document.head.appendChild(style);
  }

  applyIEFixes() {
    // Add IE-specific class to body
    document.body.classList.add('ie-browser');

    // Fix for IE's flexbox issues
    const style = document.createElement('style');
    style.textContent = `
      .ie-browser .flex-container {
        display: -ms-flexbox;
        -ms-flex-direction: row;
        -ms-flex-wrap: wrap;
      }
      .ie-browser .flex-item {
        -ms-flex: 1 1 auto;
      }
    `;
    document.head.appendChild(style);

    // Show IE deprecation notice
    this.showIENotice();
  }

  applyMobileFixes() {
    // Fix for mobile viewport
    const viewport = document.querySelector('meta[name="viewport"]');
    if (viewport) {
      viewport.content = 'width=device-width, initial-scale=1.0, user-scalable=no';
    }

    // Fix for mobile touch events
    document.addEventListener('touchstart', () => {}, { passive: true });

    // Fix for mobile 100vh issue
    const setMobileVH = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--mobile-vh', `${vh}px`);
    };
    
    setMobileVH();
    window.addEventListener('resize', setMobileVH);
    window.addEventListener('orientationchange', () => {
      setTimeout(setMobileVH, 100);
    });
  }

  isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  }

  showIENotice() {
    const notice = document.createElement('div');
    notice.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      background: #f8d7da;
      color: #721c24;
      padding: 1rem;
      text-align: center;
      z-index: 10000;
      border-bottom: 1px solid #f5c6cb;
    `;
    notice.innerHTML = `
      <strong>Browser Notice:</strong> You are using an outdated browser. 
      For the best experience, please upgrade to a modern browser like Chrome, Firefox, Safari, or Edge.
      <button onclick="this.parentElement.remove()" style="margin-left: 1rem; background: #721c24; color: white; border: none; padding: 0.25rem 0.5rem; border-radius: 3px;">×</button>
    `;
    document.body.insertBefore(notice, document.body.firstChild);
  }

  logBrowserInfo() {
    console.group('🌐 Cross-Browser Compatibility Report');
    console.log('Browser:', this.browserInfo.name, this.browserInfo.version);
    console.log('User Agent:', this.browserInfo.userAgent);
    console.log('Feature Support:', this.featureSupport);
    
    // Log unsupported features
    const unsupported = Object.entries(this.featureSupport)
      .filter(([, supported]) => !supported)
      .map(([feature]) => feature);
    
    if (unsupported.length > 0) {
      console.warn('Unsupported Features:', unsupported);
    } else {
      console.log('✅ All features supported!');
    }
    
    console.groupEnd();
  }

  // Public method to get compatibility report
  getCompatibilityReport() {
    return {
      browser: this.browserInfo,
      features: this.featureSupport,
      unsupportedFeatures: Object.entries(this.featureSupport)
        .filter(([, supported]) => !supported)
        .map(([feature]) => feature),
      compatibilityScore: this.calculateCompatibilityScore()
    };
  }

  calculateCompatibilityScore() {
    const totalFeatures = Object.keys(this.featureSupport).length;
    const supportedFeatures = Object.values(this.featureSupport).filter(Boolean).length;
    return Math.round((supportedFeatures / totalFeatures) * 100);
  }

  // Test specific website features
  testWebsiteFeatures() {
    const tests = {
      navigation: this.testNavigation(),
      forms: this.testForms(),
      animations: this.testAnimations(),
      responsive: this.testResponsive(),
      accessibility: this.testAccessibility()
    };

    return tests;
  }

  testNavigation() {
    const nav = document.querySelector('.navbar');
    const toggle = document.querySelector('.nav-toggle');
    const menu = document.querySelector('.nav-menu');

    return {
      navExists: !!nav,
      toggleExists: !!toggle,
      menuExists: !!menu,
      smoothScroll: this.featureSupport.cssSmoothScroll,
      stickySupport: CSS.supports('position', 'sticky')
    };
  }

  testForms() {
    const forms = document.querySelectorAll('form');
    const hasValidation = Array.from(forms).some(form => 
      form.querySelector('input[required]') || form.querySelector('input[pattern]')
    );

    return {
      formsExist: forms.length > 0,
      html5Validation: this.featureSupport.html5FormValidation,
      customValidation: hasValidation,
      formData: this.featureSupport.formData
    };
  }

  testAnimations() {
    const animatedElements = document.querySelectorAll('[class*="animate"], [style*="animation"]');
    
    return {
      cssAnimations: this.featureSupport.cssAnimations,
      cssTransitions: this.featureSupport.cssTransitions,
      webAnimationsAPI: this.featureSupport.webAnimationsAPI,
      animatedElements: animatedElements.length,
      intersectionObserver: this.featureSupport.intersectionObserver
    };
  }

  testResponsive() {
    return {
      viewport: !!document.querySelector('meta[name="viewport"]'),
      cssGrid: this.featureSupport.cssGrid,
      flexbox: this.featureSupport.cssFlexbox,
      mediaQueries: window.matchMedia('(min-width: 768px)').matches !== undefined,
      touchEvents: this.featureSupport.touchEvents
    };
  }

  testAccessibility() {
    const skipLinks = document.querySelectorAll('.skip-link');
    const landmarks = document.querySelectorAll('main, nav, header, footer, [role="main"], [role="navigation"]');
    const altTexts = document.querySelectorAll('img[alt]');
    const labels = document.querySelectorAll('label[for]');

    return {
      skipLinks: skipLinks.length > 0,
      landmarks: landmarks.length > 0,
      altTexts: altTexts.length > 0,
      formLabels: labels.length > 0,
      ariaSupport: 'setAttribute' in document.createElement('div')
    };
  }
}

// Initialize cross-browser testing
document.addEventListener('DOMContentLoaded', () => {
  window.crossBrowserTester = new CrossBrowserTester();
  
  // Add to global scope for testing
  window.getBrowserCompatibility = () => {
    return window.crossBrowserTester.getCompatibilityReport();
  };
  
  window.testWebsiteFeatures = () => {
    return window.crossBrowserTester.testWebsiteFeatures();
  };
});

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
  module.exports = CrossBrowserTester;
}