// Comprehensive Form Validation Testing
// Tests all forms for validation, accessibility, and user experience

class FormValidationTest {
  constructor() {
    this.testResults = [];
    this.forms = document.querySelectorAll("form");
    this.init();
  }

  init() {
    this.runFormValidationTests();
  }

  async runFormValidationTests() {
    console.log("📝 Running Form Validation Tests...");

    // Test each form individually
    for (let i = 0; i < this.forms.length; i++) {
      await this.testForm(this.forms[i], i);
    }

    // Test global form features
    await this.testGlobalFormFeatures();

    // Generate form validation report
    this.generateFormValidationReport();
  }

  async testForm(form, index) {
    const formName = form.id || form.className || `Form ${index + 1}`;
    console.log(`Testing ${formName}...`);

    const formTests = {
      formName,
      structure: this.testFormStructure(form),
      validation: this.testFormValidation(form),
      accessibility: this.testFormAccessibility(form),
      usability: this.testFormUsability(form),
      security: this.testFormSecurity(form),
    };

    // Calculate overall form score
    const categories = Object.keys(formTests).filter(
      (key) => key !== "formName"
    );
    const totalScore = categories.reduce((sum, category) => {
      return sum + formTests[category].score;
    }, 0);

    formTests.overallScore = Math.round(totalScore / categories.length);
    formTests.passed = formTests.overallScore >= 80;

    this.testResults.push(formTests);

    // Small delay for testing simulation
    await new Promise((resolve) => setTimeout(resolve, 100));
  }

  testFormStructure(form) {
    const issues = [];
    const successes = [];

    // Check form has proper structure
    if (!form.getAttribute("action") && !form.getAttribute("onsubmit")) {
      issues.push("Form missing action attribute or submit handler");
    } else {
      successes.push("Form has submit handling");
    }

    // Check form method
    const method = form.getAttribute("method");
    if (
      method &&
      method.toLowerCase() === "get" &&
      this.hasPasswordField(form)
    ) {
      issues.push("Form with password field using GET method (security risk)");
    } else {
      successes.push("Form method appropriate for content");
    }

    // Check form groups
    const formGroups = form.querySelectorAll(
      ".form-group, .form-field, .input-group"
    );
    if (formGroups.length === 0) {
      issues.push("Form lacks proper field grouping structure");
    } else {
      successes.push(`Form has ${formGroups.length} properly grouped fields`);
    }

    // Check fieldsets for related fields
    const fieldsets = form.querySelectorAll("fieldset");
    const radioGroups = this.getRadioGroups(form);
    if (Object.keys(radioGroups).length > 0 && fieldsets.length === 0) {
      issues.push("Radio button groups should be wrapped in fieldsets");
    }

    return {
      score: this.calculateScore(issues, successes),
      issues,
      successes,
    };
  }
  test;
  FormValidation(form) {
    const issues = [];
    const successes = [];

    // Test HTML5 validation
    const inputs = form.querySelectorAll("input, select, textarea");
    let validationCount = 0;

    inputs.forEach((input, index) => {
      // Check required fields
      if (input.hasAttribute("required")) {
        validationCount++;

        // Test empty field validation
        const originalValue = input.value;
        input.value = "";

        if (input.checkValidity()) {
          issues.push(`Required field ${index + 1} not validating when empty`);
        } else {
          successes.push(`Required field ${index + 1} validates correctly`);
        }

        // Restore original value
        input.value = originalValue;
      }

      // Check email validation
      if (input.type === "email") {
        validationCount++;

        const originalValue = input.value;
        input.value = "invalid-email";

        if (input.checkValidity()) {
          issues.push(`Email field ${index + 1} not validating invalid email`);
        } else {
          successes.push(`Email field ${index + 1} validates email format`);
        }

        // Test valid email
        input.value = "test@example.com";
        if (!input.checkValidity()) {
          issues.push(`Email field ${index + 1} rejecting valid email`);
        }

        input.value = originalValue;
      }

      // Check pattern validation
      if (input.hasAttribute("pattern")) {
        validationCount++;
        const pattern = input.getAttribute("pattern");

        try {
          new RegExp(pattern);
          successes.push(`Pattern validation present for field ${index + 1}`);
        } catch (e) {
          issues.push(`Invalid regex pattern in field ${index + 1}`);
        }
      }

      // Check min/max validation for numbers
      if (input.type === "number" || input.type === "range") {
        if (input.hasAttribute("min") || input.hasAttribute("max")) {
          validationCount++;
          successes.push(`Numeric validation present for field ${index + 1}`);
        }
      }
    });

    if (validationCount === 0) {
      issues.push("No form validation detected");
    }

    // Test custom validation messages
    const customMessages = form.querySelectorAll(
      '.form-error, .error-message, [role="alert"]'
    );
    if (customMessages.length > 0) {
      successes.push(
        `${customMessages.length} custom error message containers found`
      );
    } else {
      issues.push("No custom error message containers found");
    }

    return {
      score: this.calculateScore(issues, successes),
      issues,
      successes,
    };
  }

  testFormAccessibility(form) {
    const issues = [];
    const successes = [];

    // Test form labels
    const inputs = form.querySelectorAll("input, select, textarea");
    let labeledInputs = 0;

    inputs.forEach((input, index) => {
      const label = form.querySelector(`label[for="${input.id}"]`);
      const ariaLabel = input.getAttribute("aria-label");
      const ariaLabelledBy = input.getAttribute("aria-labelledby");

      if (label || ariaLabel || ariaLabelledBy) {
        labeledInputs++;
        successes.push(`Input ${index + 1} has proper labeling`);
      } else {
        issues.push(`Input ${index + 1} missing label or aria-label`);
      }

      // Check required field indicators
      if (input.hasAttribute("required")) {
        const requiredIndicator =
          label?.querySelector(".required") ||
          label?.textContent.includes("*") ||
          input.getAttribute("aria-required") === "true";

        if (!requiredIndicator) {
          issues.push(`Required input ${index + 1} missing visual indicator`);
        } else {
          successes.push(`Required input ${index + 1} has visual indicator`);
        }
      }
    });

    // Test error message association
    const errorElements = form.querySelectorAll(
      '.form-error, .error-message, [role="alert"]'
    );
    errorElements.forEach((error, index) => {
      if (!error.getAttribute("aria-live")) {
        issues.push(`Error message ${index + 1} missing aria-live`);
      } else {
        successes.push(`Error message ${index + 1} has aria-live`);
      }
    });

    // Test fieldset and legend for radio groups
    const fieldsets = form.querySelectorAll("fieldset");
    fieldsets.forEach((fieldset, index) => {
      const legend = fieldset.querySelector("legend");
      if (!legend) {
        issues.push(`Fieldset ${index + 1} missing legend`);
      } else {
        successes.push(`Fieldset ${index + 1} has legend`);
      }
    });

    // Test form submission feedback
    const submitButton = form.querySelector(
      'button[type="submit"], input[type="submit"]'
    );
    if (submitButton) {
      if (!submitButton.getAttribute("aria-describedby")) {
        issues.push(
          "Submit button could benefit from aria-describedby for status updates"
        );
      }
      successes.push("Submit button present");
    } else {
      issues.push("No submit button found");
    }

    return {
      score: this.calculateScore(issues, successes),
      issues,
      successes,
    };
  }
  te;
  stFormUsability(form) {
    const issues = [];
    const successes = [];

    // Test input types for mobile optimization
    const inputs = form.querySelectorAll("input");
    let optimizedInputs = 0;

    inputs.forEach((input, index) => {
      const type = input.type;
      const inputMode = input.getAttribute("inputmode");

      // Check if email inputs use email type
      if (
        input.name &&
        input.name.toLowerCase().includes("email") &&
        type !== "email"
      ) {
        issues.push(
          `Input ${
            index + 1
          } should use type="email" for better mobile experience`
        );
      } else if (type === "email" || inputMode === "email") {
        optimizedInputs++;
        successes.push(`Input ${index + 1} optimized for email entry`);
      }

      // Check if phone inputs use tel type
      if (
        input.name &&
        (input.name.toLowerCase().includes("phone") ||
          input.name.toLowerCase().includes("tel")) &&
        type !== "tel"
      ) {
        issues.push(
          `Input ${
            index + 1
          } should use type="tel" for better mobile experience`
        );
      } else if (type === "tel" || inputMode === "tel") {
        optimizedInputs++;
        successes.push(`Input ${index + 1} optimized for phone entry`);
      }

      // Check if number inputs use number type
      if (
        input.name &&
        input.name.toLowerCase().includes("amount") &&
        type !== "number"
      ) {
        issues.push(
          `Input ${index + 1} should use type="number" for numeric entry`
        );
      } else if (type === "number" || inputMode === "numeric") {
        optimizedInputs++;
        successes.push(`Input ${index + 1} optimized for numeric entry`);
      }
    });

    // Test placeholder text
    const placeholders = form.querySelectorAll(
      "input[placeholder], textarea[placeholder]"
    );
    placeholders.forEach((input, index) => {
      const placeholder = input.getAttribute("placeholder");
      if (placeholder.length < 3) {
        issues.push(`Placeholder ${index + 1} too short to be helpful`);
      } else {
        successes.push(`Input ${index + 1} has helpful placeholder text`);
      }
    });

    // Test help text
    const helpTexts = form.querySelectorAll(
      '.form-help, .help-text, [id*="help"]'
    );
    if (helpTexts.length > 0) {
      successes.push(`${helpTexts.length} help text elements found`);
    } else {
      issues.push("No help text found for complex fields");
    }

    // Test form layout for mobile
    const formGroups = form.querySelectorAll(".form-group, .form-field");
    let mobileOptimized = 0;

    formGroups.forEach((group) => {
      const inputs = group.querySelectorAll("input, select, textarea");
      if (inputs.length === 1) {
        mobileOptimized++;
      }
    });

    if (mobileOptimized === formGroups.length) {
      successes.push("Form layout optimized for mobile (one input per row)");
    } else {
      issues.push("Some form groups may be too complex for mobile");
    }

    // Test autocomplete attributes
    const autoCompleteInputs = form.querySelectorAll("input[autocomplete]");
    if (autoCompleteInputs.length > 0) {
      successes.push(
        `${autoCompleteInputs.length} inputs have autocomplete attributes`
      );
    } else {
      issues.push("No autocomplete attributes found (reduces user effort)");
    }

    return {
      score: this.calculateScore(issues, successes),
      issues,
      successes,
    };
  }

  testFormSecurity(form) {
    const issues = [];
    const successes = [];

    // Test HTTPS for forms with sensitive data
    if (location.protocol !== "https:" && this.hasSensitiveFields(form)) {
      issues.push("Form with sensitive data not served over HTTPS");
    } else if (this.hasSensitiveFields(form)) {
      successes.push("Sensitive form data protected with HTTPS");
    }

    // Test password field security
    const passwordFields = form.querySelectorAll('input[type="password"]');
    passwordFields.forEach((field, index) => {
      if (field.getAttribute("autocomplete") === "off") {
        issues.push(
          `Password field ${index + 1} disables autocomplete (reduces security)`
        );
      } else {
        successes.push(
          `Password field ${index + 1} allows secure password managers`
        );
      }
    });

    // Test CSRF protection (basic check)
    const csrfToken = form.querySelector(
      'input[name*="csrf"], input[name*="token"]'
    );
    if (form.method && form.method.toLowerCase() === "post" && !csrfToken) {
      issues.push("POST form missing CSRF protection token");
    } else if (csrfToken) {
      successes.push("CSRF protection token present");
    }

    // Test input sanitization hints
    const textInputs = form.querySelectorAll('input[type="text"], textarea');
    let sanitizedInputs = 0;

    textInputs.forEach((input) => {
      if (input.hasAttribute("pattern") || input.hasAttribute("maxlength")) {
        sanitizedInputs++;
      }
    });

    if (sanitizedInputs > 0) {
      successes.push(
        `${sanitizedInputs} inputs have validation patterns for security`
      );
    }

    return {
      score: this.calculateScore(issues, successes),
      issues,
      successes,
    };
  }
  async;
  testGlobalFormFeatures() {
    console.log("Testing global form features...");

    const globalTests = {
      formName: "Global Form Features",
      browser: this.testBrowserFormSupport(),
      polyfills: this.testFormPolyfills(),
      frameworks: this.testFormFrameworks(),
    };

    const categories = Object.keys(globalTests).filter(
      (key) => key !== "formName"
    );
    const totalScore = categories.reduce((sum, category) => {
      return sum + globalTests[category].score;
    }, 0);

    globalTests.overallScore = Math.round(totalScore / categories.length);
    globalTests.passed = globalTests.overallScore >= 70;

    this.testResults.push(globalTests);
  }

  testBrowserFormSupport() {
    const issues = [];
    const successes = [];

    // Test HTML5 form validation support
    if ("checkValidity" in document.createElement("input")) {
      successes.push("HTML5 form validation supported");
    } else {
      issues.push("HTML5 form validation not supported");
    }

    // Test FormData API
    if ("FormData" in window) {
      successes.push("FormData API supported");
    } else {
      issues.push("FormData API not supported");
    }

    // Test input types
    const input = document.createElement("input");
    const supportedTypes = [];
    const testTypes = [
      "email",
      "tel",
      "url",
      "number",
      "date",
      "time",
      "color",
    ];

    testTypes.forEach((type) => {
      input.type = type;
      if (input.type === type) {
        supportedTypes.push(type);
      }
    });

    if (supportedTypes.length >= 5) {
      successes.push(`${supportedTypes.length} HTML5 input types supported`);
    } else {
      issues.push(`Only ${supportedTypes.length} HTML5 input types supported`);
    }

    return {
      score: this.calculateScore(issues, successes),
      issues,
      successes,
    };
  }

  testFormPolyfills() {
    const issues = [];
    const successes = [];

    // Check for common form polyfills
    const polyfills = [
      { name: "HTML5 Shiv", check: () => window.html5 !== undefined },
      { name: "Webshims", check: () => window.webshims !== undefined },
      { name: "Modernizr", check: () => window.Modernizr !== undefined },
    ];

    let polyfillCount = 0;
    polyfills.forEach((polyfill) => {
      if (polyfill.check()) {
        polyfillCount++;
        successes.push(`${polyfill.name} polyfill detected`);
      }
    });

    if (polyfillCount === 0) {
      issues.push(
        "No form polyfills detected (may cause issues in older browsers)"
      );
    }

    return {
      score: polyfillCount > 0 ? 100 : 50,
      issues,
      successes,
    };
  }

  testFormFrameworks() {
    const issues = [];
    const successes = [];

    // Check for form validation frameworks
    const frameworks = [
      {
        name: "jQuery Validation",
        check: () => window.jQuery && window.jQuery.fn.validate,
      },
      { name: "Parsley", check: () => window.Parsley !== undefined },
      { name: "Joi", check: () => window.Joi !== undefined },
    ];

    let frameworkCount = 0;
    frameworks.forEach((framework) => {
      if (framework.check()) {
        frameworkCount++;
        successes.push(`${framework.name} framework detected`);
      }
    });

    // Check for custom validation
    const customValidation = document.querySelectorAll(
      "[data-validate], .validate, .validation"
    );
    if (customValidation.length > 0) {
      successes.push("Custom validation attributes detected");
    }

    return {
      score: 100, // Not critical
      issues,
      successes,
    };
  }

  // Helper methods
  hasPasswordField(form) {
    return form.querySelector('input[type="password"]') !== null;
  }

  hasSensitiveFields(form) {
    const sensitiveTypes = ["password", "email"];
    const sensitiveNames = ["ssn", "social", "credit", "card", "payment"];

    const inputs = form.querySelectorAll("input");
    return Array.from(inputs).some((input) => {
      return (
        sensitiveTypes.includes(input.type) ||
        sensitiveNames.some(
          (name) => input.name && input.name.toLowerCase().includes(name)
        )
      );
    });
  }

  getRadioGroups(form) {
    const radios = form.querySelectorAll('input[type="radio"]');
    const groups = {};

    radios.forEach((radio) => {
      const name = radio.name;
      if (!groups[name]) {
        groups[name] = [];
      }
      groups[name].push(radio);
    });

    return groups;
  }

  calculateScore(issues, successes) {
    const total = issues.length + successes.length;
    if (total === 0) return 100;
    return Math.round((successes.length / total) * 100);
  }
  generateFormValidationReport() {
    const totalForms = this.testResults.length;
    const passedForms = this.testResults.filter((r) => r.passed).length;
    const averageScore = Math.round(
      this.testResults.reduce((sum, r) => sum + r.overallScore, 0) / totalForms
    );

    console.group("📝 Form Validation Report");
    console.log(`Forms Tested: ${totalForms}`);
    console.log(`Forms Passed: ${passedForms}/${totalForms}`);
    console.log(`Average Score: ${averageScore}%`);

    this.testResults.forEach((formResult) => {
      console.group(`${formResult.formName} (${formResult.overallScore}%)`);

      const categories = Object.keys(formResult).filter(
        (key) => !["formName", "overallScore", "passed"].includes(key)
      );

      categories.forEach((category) => {
        const categoryData = formResult[category];
        console.group(`${category.toUpperCase()} (${categoryData.score}%)`);

        if (categoryData.successes && categoryData.successes.length > 0) {
          console.log("✅ Successes:");
          categoryData.successes.forEach((success) =>
            console.log(`  • ${success}`)
          );
        }

        if (categoryData.issues && categoryData.issues.length > 0) {
          console.log("❌ Issues:");
          categoryData.issues.forEach((issue) => console.log(`  • ${issue}`));
        }

        console.groupEnd();
      });

      console.groupEnd();
    });

    console.groupEnd();

    // Create visual report
    this.createVisualFormReport(passedForms, totalForms, averageScore);
  }

  createVisualFormReport(passed, total, averageScore) {
    // Remove existing report
    const existingReport = document.getElementById("form-validation-report");
    if (existingReport) {
      existingReport.remove();
    }

    const report = document.createElement("div");
    report.id = "form-validation-report";
    report.style.cssText = `
      position: fixed;
      bottom: 20px;
      left: 20px;
      width: 450px;
      max-height: 600px;
      overflow-y: auto;
      background: white;
      border: 2px solid #38a169;
      border-radius: 8px;
      padding: 16px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.3);
      z-index: 10000;
      font-family: 'Inter', sans-serif;
      font-size: 12px;
    `;

    const scoreColor =
      averageScore >= 90 ? "green" : averageScore >= 70 ? "orange" : "red";

    report.innerHTML = `
      <h3 style="margin: 0 0 12px 0; color: #38a169;">Form Validation Report</h3>
      
      <div style="margin-bottom: 16px; padding: 12px; background: #f0fff4; border-radius: 4px;">
        <div><strong>Forms Tested:</strong> ${total}</div>
        <div><strong>Forms Passed:</strong> ${passed}/${total}</div>
        <div style="color: ${scoreColor};"><strong>Average Score:</strong> ${averageScore}%</div>
        <div><strong>Success Rate:</strong> ${Math.round(
          (passed / total) * 100
        )}%</div>
      </div>

      ${this.generateFormReports()}

      <div style="margin-top: 16px; padding: 12px; background: #f0f8ff; border-radius: 4px; font-size: 11px;">
        <strong>Key Recommendations:</strong>
        ${this.generateFormRecommendations()}
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

  generateFormReports() {
    return this.testResults
      .map((formResult) => {
        const categories = Object.keys(formResult).filter(
          (key) => !["formName", "overallScore", "passed"].includes(key)
        );

        return `
        <div style="margin-bottom: 12px; border: 1px solid #e2e8f0; border-radius: 4px; padding: 8px;">
          <h4 style="margin: 0 0 8px 0; color: #2d3748;">
            ${formResult.formName} (${formResult.overallScore}%)
            ${formResult.passed ? "✅" : "❌"}
          </h4>
          
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(100px, 1fr)); gap: 8px;">
            ${categories
              .map((category) => {
                const categoryData = formResult[category];
                const color =
                  categoryData.score >= 80
                    ? "green"
                    : categoryData.score >= 60
                    ? "orange"
                    : "red";
                return `
                <div style="text-align: center; padding: 4px; background: #f7fafc; border-radius: 4px;">
                  <div style="font-size: 10px; text-transform: uppercase; color: #666;">${category}</div>
                  <div style="font-weight: bold; color: ${color};">${categoryData.score}%</div>
                </div>
              `;
              })
              .join("")}
          </div>
          
          ${
            this.getTopIssues(formResult).length > 0
              ? `
            <div style="margin-top: 8px; font-size: 10px;">
              <strong>Top Issues:</strong>
              ${this.getTopIssues(formResult)
                .slice(0, 3)
                .map(
                  (issue) => `
                <div style="color: #e53e3e; margin: 2px 0;">• ${issue}</div>
              `
                )
                .join("")}
            </div>
          `
              : ""
          }
        </div>
      `;
      })
      .join("");
  }

  getTopIssues(formResult) {
    const allIssues = [];
    const categories = Object.keys(formResult).filter(
      (key) => !["formName", "overallScore", "passed"].includes(key)
    );

    categories.forEach((category) => {
      if (formResult[category].issues) {
        allIssues.push(...formResult[category].issues);
      }
    });

    return allIssues;
  }

  generateFormRecommendations() {
    const recommendations = [];
    const allIssues = this.testResults.flatMap((result) =>
      this.getTopIssues(result)
    );

    if (allIssues.some((issue) => issue.includes("label"))) {
      recommendations.push(
        "Add proper labels to all form inputs for accessibility"
      );
    }

    if (allIssues.some((issue) => issue.includes("validation"))) {
      recommendations.push(
        "Implement HTML5 validation attributes for better user experience"
      );
    }

    if (allIssues.some((issue) => issue.includes("mobile"))) {
      recommendations.push(
        "Use appropriate input types (email, tel, number) for mobile optimization"
      );
    }

    if (allIssues.some((issue) => issue.includes("HTTPS"))) {
      recommendations.push("Serve forms with sensitive data over HTTPS");
    }

    if (allIssues.some((issue) => issue.includes("error"))) {
      recommendations.push(
        "Add proper error message containers with ARIA live regions"
      );
    }

    if (recommendations.length === 0) {
      recommendations.push(
        "Excellent! Your forms follow best practices for validation, accessibility, and usability."
      );
    }

    return recommendations
      .map((rec) => `<div style="margin: 4px 0;">• ${rec}</div>`)
      .join("");
  }
}

// Initialize form validation testing
window.formValidationTest = new FormValidationTest();

// Export for global access
window.runFormValidationTest = () => {
  return new FormValidationTest();
};
