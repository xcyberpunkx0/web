// Comprehensive Test Runner for TaxPro Consulting Website
// Executes all testing suites and generates a unified report

class ComprehensiveTestRunner {
  constructor() {
    this.testSuites = [];
    this.overallResults = {
      startTime: null,
      endTime: null,
      totalTests: 0,
      passedTests: 0,
      failedTests: 0,
      suiteResults: []
    };
    
    this.init();
  }

  init() {
    console.log('🚀 Initializing Comprehensive Test Runner...');
    this.setupTestSuites();
  }

  setupTestSuites() {
    this.testSuites = [
      {
        name: 'Browser Compatibility',
        runner: () => window.runBrowserCompatibilityTest ? window.runBrowserCompatibilityTest() : null,
        weight: 25,
        critical: true
      },
      {
        name: 'Responsive Design',
        runner: () => window.runResponsiveDesignTest ? window.runResponsiveDesignTest() : null,
        weight: 25,
        critical: true
      },
      {
        name: 'Form Validation',
        runner: () => window.runFormValidationTest ? window.runFormValidationTest() : null,
        weight: 20,
        critical: true
      },
      {
        name: 'Accessibility Compliance',
        runner: () => window.accessibilityTester ? window.accessibilityTester.runAllTests() : null,
        weight: 20,
        critical: true
      },
      {
        name: 'Automated Tests',
        runner: () => window.runAutomatedTests ? window.runAutomatedTests() : null,
        weight: 10,
        critical: false
      }
    ];
  }

  async runAllTests() {
    console.log('🧪 Starting Comprehensive Test Suite...');
    this.overallResults.startTime = Date.now();
    
    // Show progress indicator
    this.showProgressIndicator();
    
    // Run each test suite
    for (let i = 0; i < this.testSuites.length; i++) {
      const suite = this.testSuites[i];
      await this.runTestSuite(suite, i);
      this.updateProgress((i + 1) / this.testSuites.length * 100);
    }
    
    this.overallResults.endTime = Date.now();
    
    // Generate comprehensive report
    this.generateComprehensiveReport();
    
    // Hide progress indicator
    this.hideProgressIndicator();
    
    return this.overallResults;
  }

  async runTestSuite(suite, index) {
    console.log(`🔍 Running ${suite.name} tests...`);
    
    const startTime = Date.now();
    let result = null;
    let error = null;
    
    try {
      if (suite.runner) {
        result = await suite.runner();
      } else {
        throw new Error(`Test runner not available for ${suite.name}`);
      }
    } catch (e) {
      error = e.message;
      console.error(`❌ Error running ${suite.name}:`, e);
    }
    
    const endTime = Date.now();
    const duration = endTime - startTime;
    
    const suiteResult = {
      name: suite.name,
      weight: suite.weight,
      critical: suite.critical,
      duration,
      success: !error && result,
      result,
      error,
      score: this.calculateSuiteScore(result, error)
    };
    
    this.overallResults.suiteResults.push(suiteResult);
    
    console.log(`${suiteResult.success ? '✅' : '❌'} ${suite.name} completed (${duration}ms)`);
  }  calc
ulateSuiteScore(result, error) {
    if (error) return 0;
    if (!result) return 50;
    
    // Different scoring based on result structure
    if (typeof result === 'object') {
      if (result.successRate !== undefined) {
        return result.successRate;
      }
      if (result.overallScore !== undefined) {
        return result.overallScore;
      }
      if (result.passedTests !== undefined && result.totalTests !== undefined) {
        return Math.round((result.passedTests / result.totalTests) * 100);
      }
    }
    
    return 100; // Default for successful completion
  }

  showProgressIndicator() {
    const indicator = document.createElement('div');
    indicator.id = 'comprehensive-test-progress';
    indicator.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 400px;
      padding: 2rem;
      background: white;
      border: 2px solid #1a365d;
      border-radius: 12px;
      box-shadow: 0 8px 24px rgba(0,0,0,0.3);
      z-index: 10001;
      text-align: center;
      font-family: 'Inter', sans-serif;
    `;
    
    indicator.innerHTML = `
      <h3 style="margin: 0 0 1rem 0; color: #1a365d;">Running Comprehensive Tests</h3>
      <div style="margin-bottom: 1rem;">
        <div id="current-test" style="font-size: 0.875rem; color: #666;">Initializing...</div>
      </div>
      <div style="width: 100%; height: 8px; background: #e2e8f0; border-radius: 4px; overflow: hidden;">
        <div id="progress-bar" style="height: 100%; background: linear-gradient(90deg, #1a365d, #2d3748); width: 0%; transition: width 0.3s ease;"></div>
      </div>
      <div style="margin-top: 1rem; font-size: 0.75rem; color: #666;">
        This may take a few moments...
      </div>
    `;
    
    document.body.appendChild(indicator);
  }

  updateProgress(percentage) {
    const progressBar = document.getElementById('progress-bar');
    const currentTest = document.getElementById('current-test');
    
    if (progressBar) {
      progressBar.style.width = percentage + '%';
    }
    
    if (currentTest) {
      const currentIndex = Math.floor((percentage / 100) * this.testSuites.length);
      const suite = this.testSuites[currentIndex - 1];
      if (suite) {
        currentTest.textContent = `Completed: ${suite.name}`;
      }
    }
  }

  hideProgressIndicator() {
    const indicator = document.getElementById('comprehensive-test-progress');
    if (indicator) {
      indicator.remove();
    }
  }

  generateComprehensiveReport() {
    const duration = this.overallResults.endTime - this.overallResults.startTime;
    const totalSuites = this.overallResults.suiteResults.length;
    const passedSuites = this.overallResults.suiteResults.filter(s => s.success).length;
    const criticalSuites = this.overallResults.suiteResults.filter(s => s.critical);
    const passedCritical = criticalSuites.filter(s => s.success).length;
    
    // Calculate weighted score
    const weightedScore = this.calculateWeightedScore();
    
    console.group('🎯 Comprehensive Test Report');
    console.log(`Duration: ${Math.round(duration / 1000)}s`);
    console.log(`Test Suites: ${passedSuites}/${totalSuites} passed`);
    console.log(`Critical Suites: ${passedCritical}/${criticalSuites.length} passed`);
    console.log(`Weighted Score: ${weightedScore}%`);
    
    this.overallResults.suiteResults.forEach(suite => {
      const icon = suite.success ? '✅' : '❌';
      const critical = suite.critical ? ' (Critical)' : '';
      console.log(`${icon} ${suite.name}${critical}: ${suite.score}% (${suite.duration}ms)`);
      
      if (suite.error) {
        console.error(`  Error: ${suite.error}`);
      }
    });
    
    console.groupEnd();
    
    // Create visual comprehensive report
    this.createVisualComprehensiveReport(weightedScore, passedSuites, totalSuites, duration);
  }

  calculateWeightedScore() {
    const totalWeight = this.overallResults.suiteResults.reduce((sum, suite) => sum + suite.weight, 0);
    const weightedSum = this.overallResults.suiteResults.reduce((sum, suite) => {
      return sum + (suite.score * suite.weight);
    }, 0);
    
    return Math.round(weightedSum / totalWeight);
  }  crea
teVisualComprehensiveReport(weightedScore, passed, total, duration) {
    // Remove existing reports
    const existingReports = document.querySelectorAll('[id$="-report"]');
    existingReports.forEach(report => report.remove());
    
    const report = document.createElement('div');
    report.id = 'comprehensive-test-report';
    report.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 600px;
      max-height: 80vh;
      overflow-y: auto;
      background: white;
      border: 3px solid #1a365d;
      border-radius: 12px;
      padding: 2rem;
      box-shadow: 0 8px 32px rgba(0,0,0,0.3);
      z-index: 10002;
      font-family: 'Inter', sans-serif;
    `;
    
    const scoreColor = weightedScore >= 90 ? '#38a169' : weightedScore >= 70 ? '#d69e2e' : '#e53e3e';
    const statusIcon = weightedScore >= 90 ? '🎉' : weightedScore >= 70 ? '⚠️' : '❌';
    const statusText = weightedScore >= 90 ? 'Excellent' : weightedScore >= 70 ? 'Good' : 'Needs Improvement';
    
    report.innerHTML = `
      <div style="text-align: center; margin-bottom: 2rem;">
        <div style="font-size: 3rem; margin-bottom: 0.5rem;">${statusIcon}</div>
        <h2 style="margin: 0; color: #1a365d;">Comprehensive Test Results</h2>
        <div style="font-size: 1.25rem; color: ${scoreColor}; font-weight: bold; margin-top: 0.5rem;">
          ${statusText} - ${weightedScore}%
        </div>
      </div>
      
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(120px, 1fr)); gap: 1rem; margin-bottom: 2rem;">
        <div style="text-align: center; padding: 1rem; background: #f7fafc; border-radius: 8px;">
          <div style="font-size: 1.5rem; font-weight: bold; color: #1a365d;">${passed}/${total}</div>
          <div style="font-size: 0.875rem; color: #666;">Suites Passed</div>
        </div>
        <div style="text-align: center; padding: 1rem; background: #f7fafc; border-radius: 8px;">
          <div style="font-size: 1.5rem; font-weight: bold; color: #1a365d;">${Math.round(duration/1000)}s</div>
          <div style="font-size: 0.875rem; color: #666;">Duration</div>
        </div>
        <div style="text-align: center; padding: 1rem; background: #f7fafc; border-radius: 8px;">
          <div style="font-size: 1.5rem; font-weight: bold; color: ${scoreColor};">${weightedScore}%</div>
          <div style="font-size: 0.875rem; color: #666;">Overall Score</div>
        </div>
      </div>
      
      <div style="margin-bottom: 2rem;">
        <h3 style="margin: 0 0 1rem 0; color: #2d3748;">Test Suite Results</h3>
        ${this.generateSuiteResultsHTML()}
      </div>
      
      <div style="margin-bottom: 2rem;">
        <h3 style="margin: 0 0 1rem 0; color: #2d3748;">Summary & Recommendations</h3>
        ${this.generateRecommendationsHTML()}
      </div>
      
      <div style="text-align: center;">
        <button onclick="this.parentElement.remove()" style="
          background: #1a365d;
          color: white;
          border: none;
          padding: 0.75rem 2rem;
          border-radius: 6px;
          font-size: 1rem;
          cursor: pointer;
          transition: background 0.2s;
        " onmouseover="this.style.background='#2d3748'" onmouseout="this.style.background='#1a365d'">
          Close Report
        </button>
      </div>
      
      <button onclick="this.parentElement.remove()" style="
        position: absolute;
        top: 1rem;
        right: 1rem;
        background: none;
        border: none;
        font-size: 1.5rem;
        cursor: pointer;
        color: #666;
      ">×</button>
    `;
    
    document.body.appendChild(report);
  }

  generateSuiteResultsHTML() {
    return this.overallResults.suiteResults.map(suite => {
      const scoreColor = suite.score >= 90 ? '#38a169' : suite.score >= 70 ? '#d69e2e' : '#e53e3e';
      const icon = suite.success ? '✅' : '❌';
      const criticalBadge = suite.critical ? '<span style="background: #e53e3e; color: white; padding: 2px 6px; border-radius: 3px; font-size: 0.75rem; margin-left: 0.5rem;">Critical</span>' : '';
      
      return `
        <div style="display: flex; align-items: center; justify-content: space-between; padding: 0.75rem; margin-bottom: 0.5rem; background: #f7fafc; border-radius: 6px; border-left: 4px solid ${scoreColor};">
          <div style="display: flex; align-items: center;">
            <span style="margin-right: 0.5rem; font-size: 1.25rem;">${icon}</span>
            <div>
              <div style="font-weight: 500; color: #2d3748;">
                ${suite.name}${criticalBadge}
              </div>
              <div style="font-size: 0.75rem; color: #666;">
                ${suite.duration}ms
                ${suite.error ? `• Error: ${suite.error}` : ''}
              </div>
            </div>
          </div>
          <div style="text-align: right;">
            <div style="font-size: 1.25rem; font-weight: bold; color: ${scoreColor};">
              ${suite.score}%
            </div>
            <div style="font-size: 0.75rem; color: #666;">
              Weight: ${suite.weight}%
            </div>
          </div>
        </div>
      `;
    }).join('');
  }

  generateRecommendationsHTML() {
    const recommendations = [];
    const failedSuites = this.overallResults.suiteResults.filter(s => !s.success);
    const lowScoreSuites = this.overallResults.suiteResults.filter(s => s.score < 80);
    
    if (failedSuites.length > 0) {
      recommendations.push(`❌ ${failedSuites.length} test suite(s) failed - investigate and fix critical issues`);
    }
    
    if (lowScoreSuites.length > 0) {
      recommendations.push(`⚠️ ${lowScoreSuites.length} test suite(s) scored below 80% - review and improve`);
    }
    
    // Specific recommendations based on suite performance
    this.overallResults.suiteResults.forEach(suite => {
      if (suite.critical && suite.score < 90) {
        recommendations.push(`🔧 ${suite.name} is critical and needs attention (${suite.score}%)`);
      }
    });
    
    if (recommendations.length === 0) {
      recommendations.push('🎉 Excellent! All tests are passing with high scores. Your website is ready for production.');
    }
    
    return `
      <div style="background: #f0f8ff; padding: 1rem; border-radius: 6px; border-left: 4px solid #3182ce;">
        ${recommendations.map(rec => `<div style="margin: 0.5rem 0; color: #2d3748;">${rec}</div>`).join('')}
      </div>
    `;
  }

  // Export results for CI/CD integration
  exportResults() {
    const exportData = {
      timestamp: new Date().toISOString(),
      duration: this.overallResults.endTime - this.overallResults.startTime,
      weightedScore: this.calculateWeightedScore(),
      suites: this.overallResults.suiteResults.map(suite => ({
        name: suite.name,
        score: suite.score,
        success: suite.success,
        critical: suite.critical,
        weight: suite.weight,
        duration: suite.duration,
        error: suite.error
      }))
    };
    
    // Log for CI/CD systems
    console.log('COMPREHENSIVE_TEST_RESULTS:', JSON.stringify(exportData));
    
    return exportData;
  }
}

// Initialize comprehensive test runner
window.comprehensiveTestRunner = new ComprehensiveTestRunner();

// Global function to run all tests
window.runComprehensiveTests = async () => {
  return await window.comprehensiveTestRunner.runAllTests();
};

// Auto-run comprehensive tests if URL parameter is present
document.addEventListener('DOMContentLoaded', () => {
  if (window.location.search.includes('comprehensive-test')) {
    setTimeout(() => {
      console.log('🚀 Auto-running comprehensive tests...');
      window.runComprehensiveTests();
    }, 2000);
  }
});

// Add keyboard shortcut (Ctrl+Alt+C)
document.addEventListener('keydown', (e) => {
  if (e.ctrlKey && e.altKey && e.key === 'c') {
    e.preventDefault();
    window.runComprehensiveTests();
  }
});