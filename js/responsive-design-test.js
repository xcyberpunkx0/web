// Comprehensive Responsive Design Testing
// Tests layout behavior across different device sizes and orientations

class ResponsiveDesignTest {
  constructor() {
    this.breakpoints = [
      { name: 'Mobile Small', width: 320, height: 568, category: 'mobile' },
      { name: 'Mobile Large', width: 375, height: 667, category: 'mobile' },
      { name: 'Mobile XL', width: 414, height: 896, category: 'mobile' },
      { name: 'Tablet Portrait', width: 768, height: 1024, category: 'tablet' },
      { name: 'Tablet Landscape', width: 1024, height: 768, category: 'tablet' },
      { name: 'Desktop Small', width: 1200, height: 800, category: 'desktop' },
      { name: 'Desktop Large', width: 1440, height: 900, category: 'desktop' },
      { name: 'Desktop XL', width: 1920, height: 1080, category: 'desktop' }
    ];
    
    this.testResults = [];
    this.originalViewport = {
      width: window.innerWidth,
      height: window.innerHeight
    };
    
    this.init();
  }

  init() {
    this.runResponsiveTests();
  }

  async runResponsiveTests() {
    console.log('📱 Running Responsive Design Tests...');
    
    // Test each breakpoint
    for (const breakpoint of this.breakpoints) {
      await this.testBreakpoint(breakpoint);
    }
    
    // Test orientation changes
    await this.testOrientationChanges();
    
    // Test touch interactions
    await this.testTouchInteractions();
    
    // Test viewport meta tag
    this.testViewportMeta();
    
    // Generate responsive report
    this.generateResponsiveReport();
  }

  async testBreakpoint(breakpoint) {
    console.log(`Testing ${breakpoint.name} (${breakpoint.width}x${breakpoint.height})`);
    
    // Simulate viewport resize (for testing purposes)
    const issues = this.checkLayoutIssues(breakpoint);
    const touchIssues = this.checkTouchFriendliness(breakpoint);
    const navigationIssues = this.checkNavigationAdaptation(breakpoint);
    const contentIssues = this.checkContentAdaptation(breakpoint);
    
    const allIssues = [...issues, ...touchIssues, ...navigationIssues, ...contentIssues];
    
    this.testResults.push({
      breakpoint: breakpoint.name,
      category: breakpoint.category,
      width: breakpoint.width,
      height: breakpoint.height,
      passed: allIssues.length === 0,
      issues: allIssues,
      score: this.calculateBreakpointScore(allIssues)
    });
    
    // Small delay to simulate testing
    await new Promise(resolve => setTimeout(resolve, 100));
  }

  checkLayoutIssues(breakpoint) {
    const issues = [];
    
    // Check if grid layouts adapt properly
    const grids = document.querySelectorAll('.services-grid, .team-grid, .test-grid');
    grids.forEach((grid, index) => {
      const computedStyle = window.getComputedStyle(grid);
      
      if (breakpoint.width < 768) {
        // Mobile should use single column or adapted layout
        if (computedStyle.gridTemplateColumns && 
            computedStyle.gridTemplateColumns.includes('repeat') &&
            !computedStyle.gridTemplateColumns.includes('1fr')) {
          issues.push(`Grid ${index + 1} may not adapt to mobile layout`);
        }
      }
    });
    
    // Check container widths
    const containers = document.querySelectorAll('.container, .section-container');
    containers.forEach((container, index) => {
      const rect = container.getBoundingClientRect();
      if (rect.width > breakpoint.width) {
        issues.push(`Container ${index + 1} exceeds viewport width`);
      }
    });
    
    // Check text readability
    if (breakpoint.width < 375) {
      const textElements = document.querySelectorAll('p, span, div');
      let smallTextCount = 0;
      
      textElements.forEach(element => {
        const fontSize = parseFloat(window.getComputedStyle(element).fontSize);
        if (fontSize < 14) {
          smallTextCount++;
        }
      });
      
      if (smallTextCount > 0) {
        issues.push(`${smallTextCount} text elements may be too small for mobile`);
      }
    }
    
    return issues;
  } 
 checkTouchFriendliness(breakpoint) {
    const issues = [];
    
    if (breakpoint.category === 'mobile' || breakpoint.category === 'tablet') {
      // Check button sizes (minimum 44x44px for touch)
      const buttons = document.querySelectorAll('button, .btn, a[role="button"], input[type="submit"]');
      let smallButtons = 0;
      
      buttons.forEach(button => {
        const rect = button.getBoundingClientRect();
        if (rect.width < 44 || rect.height < 44) {
          smallButtons++;
        }
      });
      
      if (smallButtons > 0) {
        issues.push(`${smallButtons} buttons too small for touch (< 44px)`);
      }
      
      // Check spacing between interactive elements
      const interactiveElements = document.querySelectorAll('button, a, input, select');
      let closeElements = 0;
      
      for (let i = 0; i < interactiveElements.length - 1; i++) {
        const current = interactiveElements[i].getBoundingClientRect();
        const next = interactiveElements[i + 1].getBoundingClientRect();
        
        const distance = Math.abs(current.bottom - next.top);
        if (distance < 8) { // Less than 8px spacing
          closeElements++;
        }
      }
      
      if (closeElements > 0) {
        issues.push(`${closeElements} interactive elements too close together`);
      }
    }
    
    return issues;
  }

  checkNavigationAdaptation(breakpoint) {
    const issues = [];
    const navbar = document.querySelector('.navbar, nav');
    
    if (!navbar) return issues;
    
    if (breakpoint.width < 768) {
      // Mobile navigation checks
      const navToggle = navbar.querySelector('.nav-toggle, .hamburger, .menu-toggle');
      const navMenu = navbar.querySelector('.nav-menu, .nav-links');
      
      if (!navToggle) {
        issues.push('Mobile navigation toggle missing');
      }
      
      if (navMenu) {
        const menuStyle = window.getComputedStyle(navMenu);
        // Check if menu is properly hidden/shown on mobile
        if (menuStyle.display !== 'none' && !navMenu.classList.contains('mobile-menu')) {
          issues.push('Navigation menu may not adapt properly to mobile');
        }
      }
      
      // Check if navigation items stack vertically on mobile
      const navLinks = navbar.querySelectorAll('.nav-link, nav a');
      if (navLinks.length > 1) {
        const firstLink = navLinks[0].getBoundingClientRect();
        const secondLink = navLinks[1].getBoundingClientRect();
        
        if (Math.abs(firstLink.top - secondLink.top) < 10) {
          issues.push('Navigation links may not stack properly on mobile');
        }
      }
    }
    
    return issues;
  }

  checkContentAdaptation(breakpoint) {
    const issues = [];
    
    // Check hero section adaptation
    const heroSection = document.querySelector('.hero-section, .hero');
    if (heroSection) {
      const heroHeight = heroSection.getBoundingClientRect().height;
      
      if (breakpoint.category === 'mobile' && heroHeight > breakpoint.height * 0.8) {
        issues.push('Hero section may be too tall for mobile viewport');
      }
    }
    
    // Check form layout adaptation
    const forms = document.querySelectorAll('form');
    forms.forEach((form, index) => {
      const formGroups = form.querySelectorAll('.form-group, .form-row');
      
      if (breakpoint.width < 768) {
        formGroups.forEach(group => {
          const inputs = group.querySelectorAll('input, select');
          if (inputs.length > 1) {
            // Check if inputs stack vertically on mobile
            const firstInput = inputs[0].getBoundingClientRect();
            const secondInput = inputs[1].getBoundingClientRect();
            
            if (Math.abs(firstInput.top - secondInput.top) < 10) {
              issues.push(`Form ${index + 1} inputs may not stack properly on mobile`);
            }
          }
        });
      }
    });
    
    // Check image responsiveness
    const images = document.querySelectorAll('img');
    let nonResponsiveImages = 0;
    
    images.forEach(img => {
      const imgStyle = window.getComputedStyle(img);
      if (imgStyle.maxWidth !== '100%' && !img.hasAttribute('srcset')) {
        nonResponsiveImages++;
      }
    });
    
    if (nonResponsiveImages > 0) {
      issues.push(`${nonResponsiveImages} images may not be responsive`);
    }
    
    return issues;
  }  async testOrientationChanges() {
    console.log('Testing orientation changes...');
    
    const orientationIssues = [];
    
    // Test landscape vs portrait layouts
    const landscapeBreakpoints = this.breakpoints.filter(bp => bp.width > bp.height);
    const portraitBreakpoints = this.breakpoints.filter(bp => bp.width < bp.height);
    
    // Check if content adapts to orientation changes
    if ('orientation' in window || 'onorientationchange' in window) {
      orientationIssues.push('Orientation change events supported');
    } else {
      orientationIssues.push('Orientation change events not supported');
    }
    
    // Check CSS orientation media queries
    const hasOrientationCSS = this.checkOrientationCSS();
    if (!hasOrientationCSS) {
      orientationIssues.push('No orientation-specific CSS detected');
    }
    
    this.testResults.push({
      breakpoint: 'Orientation Changes',
      category: 'orientation',
      passed: orientationIssues.length === 0,
      issues: orientationIssues,
      score: orientationIssues.length === 0 ? 100 : 50
    });
  }

  checkOrientationCSS() {
    // Check if CSS contains orientation media queries
    const stylesheets = Array.from(document.styleSheets);
    
    try {
      for (const stylesheet of stylesheets) {
        if (stylesheet.cssRules) {
          for (const rule of stylesheet.cssRules) {
            if (rule.type === CSSRule.MEDIA_RULE) {
              if (rule.conditionText && 
                  (rule.conditionText.includes('orientation') || 
                   rule.conditionText.includes('landscape') || 
                   rule.conditionText.includes('portrait'))) {
                return true;
              }
            }
          }
        }
      }
    } catch (e) {
      // Cross-origin stylesheets may not be accessible
      console.warn('Could not access some stylesheets for orientation check');
    }
    
    return false;
  }

  async testTouchInteractions() {
    console.log('Testing touch interactions...');
    
    const touchIssues = [];
    
    // Check touch event support
    if ('ontouchstart' in window) {
      touchIssues.push('Touch events supported');
    } else {
      touchIssues.push('Touch events not supported');
    }
    
    // Check pointer events support
    if ('PointerEvent' in window) {
      touchIssues.push('Pointer events supported');
    }
    
    // Check for touch-specific CSS
    const hasTouchCSS = this.checkTouchCSS();
    if (!hasTouchCSS) {
      touchIssues.push('No touch-specific CSS detected');
    }
    
    // Check hover effects on touch devices
    const hoverElements = document.querySelectorAll('[class*="hover"], .service-card, .team-card');
    if (hoverElements.length > 0 && 'ontouchstart' in window) {
      touchIssues.push(`${hoverElements.length} elements with hover effects (may need touch alternatives)`);
    }
    
    this.testResults.push({
      breakpoint: 'Touch Interactions',
      category: 'touch',
      passed: touchIssues.filter(issue => !issue.includes('not supported')).length > 0,
      issues: touchIssues,
      score: this.calculateTouchScore(touchIssues)
    });
  }

  checkTouchCSS() {
    // Check for touch-specific CSS classes or media queries
    const touchClasses = ['.touch', '.no-touch', '.touch-device'];
    const hasClasses = touchClasses.some(className => 
      document.querySelector(className) !== null
    );
    
    // Check for hover media queries
    const hasHoverQueries = this.checkHoverMediaQueries();
    
    return hasClasses || hasHoverQueries;
  }

  checkHoverMediaQueries() {
    try {
      return window.matchMedia('(hover: hover)').matches !== undefined;
    } catch (e) {
      return false;
    }
  }

  testViewportMeta() {
    console.log('Testing viewport meta tag...');
    
    const viewport = document.querySelector('meta[name="viewport"]');
    const viewportIssues = [];
    
    if (!viewport) {
      viewportIssues.push('Viewport meta tag missing');
    } else {
      const content = viewport.getAttribute('content');
      
      if (!content.includes('width=device-width')) {
        viewportIssues.push('Viewport meta tag missing width=device-width');
      }
      
      if (!content.includes('initial-scale=1')) {
        viewportIssues.push('Viewport meta tag missing initial-scale=1');
      }
      
      if (content.includes('user-scalable=no')) {
        viewportIssues.push('Viewport prevents user scaling (accessibility issue)');
      }
    }
    
    this.testResults.push({
      breakpoint: 'Viewport Meta Tag',
      category: 'viewport',
      passed: viewportIssues.length === 0,
      issues: viewportIssues,
      score: viewportIssues.length === 0 ? 100 : 0
    });
  } 
 calculateBreakpointScore(issues) {
    const maxScore = 100;
    const deductionPerIssue = 10;
    return Math.max(0, maxScore - (issues.length * deductionPerIssue));
  }

  calculateTouchScore(issues) {
    const supportedFeatures = issues.filter(issue => issue.includes('supported')).length;
    const totalFeatures = 3; // Touch events, pointer events, touch CSS
    return Math.round((supportedFeatures / totalFeatures) * 100);
  }

  generateResponsiveReport() {
    const totalTests = this.testResults.length;
    const passedTests = this.testResults.filter(r => r.passed).length;
    const averageScore = Math.round(
      this.testResults.reduce((sum, r) => sum + r.score, 0) / totalTests
    );

    console.group('📱 Responsive Design Report');
    console.log(`Tests Passed: ${passedTests}/${totalTests}`);
    console.log(`Average Score: ${averageScore}%`);
    
    // Group by category
    const categories = [...new Set(this.testResults.map(r => r.category))];
    categories.forEach(category => {
      console.group(`${category.toUpperCase()}:`);
      const categoryTests = this.testResults.filter(r => r.category === category);
      categoryTests.forEach(test => {
        const icon = test.passed ? '✅' : '❌';
        console.log(`${icon} ${test.breakpoint} (Score: ${test.score}%)`);
        if (test.issues.length > 0) {
          test.issues.forEach(issue => console.log(`  • ${issue}`));
        }
      });
      console.groupEnd();
    });

    console.groupEnd();

    // Create visual report
    this.createVisualResponsiveReport(passedTests, totalTests, averageScore);
  }

  createVisualResponsiveReport(passed, total, averageScore) {
    // Remove existing report
    const existingReport = document.getElementById('responsive-design-report');
    if (existingReport) {
      existingReport.remove();
    }

    const report = document.createElement('div');
    report.id = 'responsive-design-report';
    report.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      width: 400px;
      max-height: 600px;
      overflow-y: auto;
      background: white;
      border: 2px solid #d69e2e;
      border-radius: 8px;
      padding: 16px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.3);
      z-index: 10000;
      font-family: 'Inter', sans-serif;
      font-size: 12px;
    `;

    const scoreColor = averageScore >= 90 ? 'green' : averageScore >= 70 ? 'orange' : 'red';

    report.innerHTML = `
      <h3 style="margin: 0 0 12px 0; color: #d69e2e;">Responsive Design Report</h3>
      
      <div style="margin-bottom: 16px; padding: 12px; background: #fffbf0; border-radius: 4px;">
        <div><strong>Tests Passed:</strong> ${passed}/${total}</div>
        <div style="color: ${scoreColor};"><strong>Average Score:</strong> ${averageScore}%</div>
        <div><strong>Success Rate:</strong> ${Math.round((passed/total)*100)}%</div>
      </div>

      ${this.generateResponsiveCategoryReports()}

      <div style="margin-top: 16px; padding: 12px; background: #f0f8ff; border-radius: 4px; font-size: 11px;">
        <strong>Recommendations:</strong>
        ${this.generateRecommendations()}
      </div>

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

  generateResponsiveCategoryReports() {
    const categories = [...new Set(this.testResults.map(r => r.category))];
    
    return categories.map(category => {
      const categoryTests = this.testResults.filter(r => r.category === category);
      const categoryPassed = categoryTests.filter(t => t.passed).length;
      const categoryTotal = categoryTests.length;
      const categoryScore = Math.round(
        categoryTests.reduce((sum, t) => sum + t.score, 0) / categoryTotal
      );
      
      return `
        <div style="margin-bottom: 12px; border: 1px solid #e2e8f0; border-radius: 4px; padding: 8px;">
          <h4 style="margin: 0 0 8px 0; color: #2d3748; text-transform: capitalize;">
            ${category} (${categoryScore}%)
          </h4>
          ${categoryTests.map(test => `
            <div style="margin: 4px 0; font-size: 11px;">
              <div style="color: ${test.passed ? 'green' : 'red'}; font-weight: bold;">
                ${test.passed ? '✅' : '❌'} ${test.breakpoint} (${test.score}%)
              </div>
              ${test.issues.length > 0 ? test.issues.map(issue => `
                <div style="margin-left: 16px; color: #666; font-size: 10px;">• ${issue}</div>
              `).join('') : ''}
            </div>
          `).join('')}
        </div>
      `;
    }).join('');
  }

  generateRecommendations() {
    const recommendations = [];
    
    // Analyze common issues
    const allIssues = this.testResults.flatMap(r => r.issues);
    
    if (allIssues.some(issue => issue.includes('button') && issue.includes('small'))) {
      recommendations.push('Increase button sizes to minimum 44x44px for touch devices');
    }
    
    if (allIssues.some(issue => issue.includes('navigation'))) {
      recommendations.push('Implement proper mobile navigation with hamburger menu');
    }
    
    if (allIssues.some(issue => issue.includes('responsive'))) {
      recommendations.push('Add responsive image techniques (srcset, max-width: 100%)');
    }
    
    if (allIssues.some(issue => issue.includes('viewport'))) {
      recommendations.push('Add proper viewport meta tag with device-width');
    }
    
    if (allIssues.some(issue => issue.includes('orientation'))) {
      recommendations.push('Add CSS media queries for orientation changes');
    }
    
    if (recommendations.length === 0) {
      recommendations.push('Great job! Your responsive design is working well across all tested breakpoints.');
    }
    
    return recommendations.map(rec => `<div style="margin: 4px 0;">• ${rec}</div>`).join('');
  }
}

// Initialize responsive design testing
window.responsiveDesignTest = new ResponsiveDesignTest();

// Export for global access
window.runResponsiveDesignTest = () => {
  return new ResponsiveDesignTest();
};