// Form validation JavaScript
// Real-time validation for contact and payment forms

class FormValidator {
  constructor(formId) {
    this.form = document.getElementById(formId);
    this.fields = {};
    this.isSubmitting = false;
    
    if (this.form) {
      this.init();
    }
  }
  
  init() {
    try {
      // Get all form inputs
      const inputs = this.form.querySelectorAll('input, select, textarea');
    
    inputs.forEach(input => {
      this.fields[input.name] = {
        element: input,
        errorElement: document.getElementById(input.getAttribute('aria-describedby')),
        rules: this.getValidationRules(input),
        isValid: false
      };
      
      // Add event listeners for real-time validation
      input.addEventListener('blur', () => this.validateField(input.name));
      input.addEventListener('input', () => this.clearFieldError(input.name));
      
      // Special handling for select elements
      if (input.type === 'select-one') {
        input.addEventListener('change', () => this.validateField(input.name));
      }
    });
    
    // Add form submit handler
    this.form.addEventListener('submit', (e) => this.handleSubmit(e));
    } catch (error) {
      console.warn('Form validation initialization error:', error);
    }
  }
  
  getValidationRules(input) {
    const rules = {};
    
    if (input.hasAttribute('required')) {
      rules.required = true;
    }
    
    if (input.type === 'email') {
      rules.email = true;
    }
    
    if (input.type === 'tel') {
      rules.phone = true;
    }
    
    if (input.name === 'firstName' || input.name === 'lastName') {
      rules.minLength = 2;
      rules.maxLength = 50;
      rules.namePattern = true;
    }
    
    if (input.name === 'message') {
      rules.minLength = 10;
      rules.maxLength = 1000;
    }
    
    return rules;
  }
  
  validateField(fieldName) {
    const field = this.fields[fieldName];
    if (!field) return true;
    
    const value = field.element.value.trim();
    const rules = field.rules;
    let isValid = true;
    let errorMessage = '';
    
    // Required validation
    if (rules.required && !value) {
      isValid = false;
      errorMessage = this.getRequiredMessage(field.element);
    }
    
    // Email validation
    else if (rules.email && value && !this.isValidEmail(value)) {
      isValid = false;
      errorMessage = 'Please enter a valid email address';
    }
    
    // Phone validation
    else if (rules.phone && value && !this.isValidPhone(value)) {
      isValid = false;
      errorMessage = 'Please enter a valid phone number';
    }
    
    // Name pattern validation
    else if (rules.namePattern && value && !this.isValidName(value)) {
      isValid = false;
      errorMessage = 'Please enter a valid name (letters, spaces, hyphens, and apostrophes only)';
    }
    
    // Length validation
    else if (rules.minLength && value && value.length < rules.minLength) {
      isValid = false;
      errorMessage = `Must be at least ${rules.minLength} characters long`;
    }
    
    else if (rules.maxLength && value && value.length > rules.maxLength) {
      isValid = false;
      errorMessage = `Must be no more than ${rules.maxLength} characters long`;
    }
    
    // Update field state
    field.isValid = isValid;
    this.updateFieldUI(fieldName, isValid, errorMessage);
    
    return isValid;
  }
  
  validateAllFields() {
    let allValid = true;
    
    Object.keys(this.fields).forEach(fieldName => {
      const isFieldValid = this.validateField(fieldName);
      if (!isFieldValid) {
        allValid = false;
      }
    });
    
    return allValid;
  }
  
  clearFieldError(fieldName) {
    const field = this.fields[fieldName];
    if (!field) return;
    
    // Only clear error if field was previously invalid
    if (!field.isValid) {
      field.element.classList.remove('error');
      if (field.errorElement) {
        field.errorElement.textContent = '';
        field.errorElement.setAttribute('aria-hidden', 'true');
      }
    }
  }
  
  updateFieldUI(fieldName, isValid, errorMessage) {
    const field = this.fields[fieldName];
    if (!field) return;
    
    if (isValid) {
      field.element.classList.remove('error');
      field.element.classList.add('valid');
      field.element.setAttribute('aria-invalid', 'false');
      field.element.parentElement.classList.remove('has-error');
      
      if (field.errorElement) {
        field.errorElement.textContent = '';
        field.errorElement.setAttribute('aria-hidden', 'true');
      }
    } else {
      field.element.classList.add('error');
      field.element.classList.remove('valid');
      field.element.setAttribute('aria-invalid', 'true');
      field.element.parentElement.classList.add('has-error');
      
      if (field.errorElement) {
        field.errorElement.textContent = errorMessage;
        field.errorElement.setAttribute('aria-hidden', 'false');
        
        // Announce error to screen readers
        if (window.accessibilityManager) {
          window.accessibilityManager.announce(`Error: ${errorMessage}`);
        }
      }
    }
  }
  
  getRequiredMessage(element) {
    const fieldType = element.type;
    const fieldName = element.name;
    
    switch (fieldName) {
      case 'firstName':
        return 'First name is required';
      case 'lastName':
        return 'Last name is required';
      case 'email':
        return 'Email address is required';
      case 'subject':
        return 'Please select a subject';
      case 'message':
        return 'Message is required';
      case 'consent':
        return 'You must consent to being contacted';
      default:
        return 'This field is required';
    }
  }
  
  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  
  isValidPhone(phone) {
    // Remove all non-digit characters
    const cleanPhone = phone.replace(/\D/g, '');
    // Check if it's a valid length (10-15 digits)
    return cleanPhone.length >= 10 && cleanPhone.length <= 15;
  }
  
  isValidName(name) {
    // Allow letters, spaces, hyphens, and apostrophes
    const nameRegex = /^[a-zA-Z\s\-']+$/;
    return nameRegex.test(name);
  }
  
  async handleSubmit(e) {
    e.preventDefault();
    
    if (this.isSubmitting) return;
    
    // Validate all fields
    const isFormValid = this.validateAllFields();
    
    if (!isFormValid) {
      this.showFormMessage('Please correct the errors above and try again.', 'error');
      // Focus on first invalid field
      this.focusFirstInvalidField();
      return;
    }
    
    // Show loading state
    if (window.loadingManager) {
      window.loadingManager.showFormLoading(this.form);
    }
    this.setSubmitButtonLoading(true);
    this.isSubmitting = true;
    
    try {
      // Simulate form submission (replace with actual API call)
      await this.submitForm();
      
      // Hide loading state
      if (window.loadingManager) {
        window.loadingManager.hideFormLoading(this.form);
      }
      
      // Show success message
      this.showFormMessage('Thank you for your message! We will get back to you within 24 hours.', 'success');
      
      // Reset form
      this.form.reset();
      this.resetFieldStates();
      
    } catch (error) {
      console.error('Form submission error:', error);
      this.showFormMessage('Sorry, there was an error sending your message. Please try again or contact us directly.', 'error');
    } finally {
      this.setSubmitButtonLoading(false);
      this.isSubmitting = false;
    }
  }
  
  async submitForm() {
    // Simulate API call delay
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true });
      }, 2000);
    });
  }
  
  setSubmitButtonLoading(isLoading) {
    const submitButton = this.form.querySelector('button[type="submit"]');
    if (!submitButton) return;
    
    if (isLoading) {
      submitButton.classList.add('loading');
      submitButton.disabled = true;
    } else {
      submitButton.classList.remove('loading');
      submitButton.disabled = false;
    }
  }
  
  showFormMessage(message, type) {
    const messageElement = this.form.querySelector('.form-message');
    if (!messageElement) return;
    
    messageElement.textContent = message;
    messageElement.className = `form-message ${type}`;
    messageElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    
    // Auto-hide success messages after 5 seconds
    if (type === 'success') {
      setTimeout(() => {
        messageElement.className = 'form-message';
      }, 5000);
    }
  }
  
  focusFirstInvalidField() {
    const firstInvalidField = Object.values(this.fields).find(field => !field.isValid);
    if (firstInvalidField) {
      firstInvalidField.element.focus();
    }
  }
  
  resetFieldStates() {
    Object.values(this.fields).forEach(field => {
      field.isValid = false;
      field.element.classList.remove('error', 'valid');
      if (field.errorElement) {
        field.errorElement.textContent = '';
        field.errorElement.setAttribute('aria-hidden', 'true');
      }
    });
  }
}

// Payment Form Validator Class
class PaymentFormValidator extends FormValidator {
  constructor(formId) {
    super(formId);
    this.currentStep = 1;
    this.totalSteps = 3;
    this.stepData = {};
    
    if (this.form) {
      this.initPaymentForm();
    }
  }
  
  initPaymentForm() {
    // Initialize step navigation
    this.initStepNavigation();
    
    // Initialize service selection
    this.initServiceSelection();
    
    // Initialize card type detection
    this.initCardTypeDetection();
    
    // Initialize input formatting
    this.initInputFormatting();
  }
  
  initStepNavigation() {
    // Step navigation buttons
    document.getElementById('step-1-next')?.addEventListener('click', () => this.goToStep(2));
    document.getElementById('step-2-back')?.addEventListener('click', () => this.goToStep(1));
    document.getElementById('step-2-next')?.addEventListener('click', () => this.goToStep(3));
    document.getElementById('step-3-back')?.addEventListener('click', () => this.goToStep(2));
  }
  
  initServiceSelection() {
    const serviceSelect = document.getElementById('service-type');
    const customAmountGroup = document.getElementById('custom-amount-group');
    const selectedServiceSpan = document.getElementById('selected-service');
    const totalAmountSpan = document.getElementById('total-amount');
    
    if (serviceSelect) {
      serviceSelect.addEventListener('change', (e) => {
        const selectedOption = e.target.selectedOptions[0];
        const price = selectedOption.getAttribute('data-price');
        const serviceName = selectedOption.textContent;
        
        if (e.target.value === 'custom') {
          customAmountGroup.style.display = 'block';
          selectedServiceSpan.textContent = 'Custom Service';
          totalAmountSpan.textContent = '$0.00';
        } else if (e.target.value) {
          customAmountGroup.style.display = 'none';
          selectedServiceSpan.textContent = serviceName;
          totalAmountSpan.textContent = `$${price}.00`;
        } else {
          customAmountGroup.style.display = 'none';
          selectedServiceSpan.textContent = '-';
          totalAmountSpan.textContent = '$0.00';
        }
      });
    }
    
    // Custom amount input
    const customAmountInput = document.getElementById('custom-amount');
    if (customAmountInput) {
      customAmountInput.addEventListener('input', (e) => {
        const amount = parseFloat(e.target.value) || 0;
        totalAmountSpan.textContent = `$${amount.toFixed(2)}`;
      });
    }
  }
  
  initCardTypeDetection() {
    const cardNumberInput = document.getElementById('card-number');
    const cardTypeIcon = document.getElementById('card-type-icon');
    
    if (cardNumberInput && cardTypeIcon) {
      cardNumberInput.addEventListener('input', (e) => {
        const cardNumber = e.target.value.replace(/\s/g, '');
        const cardType = this.detectCardType(cardNumber);
        
        cardTypeIcon.className = 'card-type-icon';
        if (cardType) {
          cardTypeIcon.classList.add(cardType);
        }
      });
    }
  }
  
  initInputFormatting() {
    // Card number formatting
    const cardNumberInput = document.getElementById('card-number');
    if (cardNumberInput) {
      cardNumberInput.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\s/g, '');
        let formattedValue = value.replace(/(.{4})/g, '$1 ').trim();
        if (formattedValue.length > 19) {
          formattedValue = formattedValue.substring(0, 19);
        }
        e.target.value = formattedValue;
      });
    }
    
    // Expiry date formatting
    const expiryInput = document.getElementById('expiry-date');
    if (expiryInput) {
      expiryInput.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length >= 2) {
          value = value.substring(0, 2) + '/' + value.substring(2, 4);
        }
        e.target.value = value;
      });
    }
    
    // CVV formatting
    const cvvInput = document.getElementById('cvv');
    if (cvvInput) {
      cvvInput.addEventListener('input', (e) => {
        e.target.value = e.target.value.replace(/\D/g, '');
      });
    }
  }
  
  detectCardType(cardNumber) {
    const patterns = {
      visa: /^4/,
      mastercard: /^5[1-5]/,
      amex: /^3[47]/
    };
    
    for (const [type, pattern] of Object.entries(patterns)) {
      if (pattern.test(cardNumber)) {
        return type;
      }
    }
    return null;
  }
  
  goToStep(stepNumber) {
    if (stepNumber < 1 || stepNumber > this.totalSteps) return;
    
    // Validate current step before proceeding
    if (stepNumber > this.currentStep && !this.validateCurrentStep()) {
      return;
    }
    
    // Hide current step
    const currentStepElement = document.getElementById(`step-${this.currentStep}`);
    if (currentStepElement) {
      currentStepElement.style.display = 'none';
    }
    
    // Show new step
    const newStepElement = document.getElementById(`step-${stepNumber}`);
    if (newStepElement) {
      newStepElement.style.display = 'block';
    }
    
    // Update progress indicator
    this.updateProgressIndicator(stepNumber);
    
    // Update current step
    this.currentStep = stepNumber;
    
    // Update review data if going to step 3
    if (stepNumber === 3) {
      this.updateReviewData();
    }
  }
  
  validateCurrentStep() {
    const stepFields = this.getStepFields(this.currentStep);
    let isValid = true;
    
    stepFields.forEach(fieldName => {
      if (!this.validateField(fieldName)) {
        isValid = false;
      }
    });
    
    return isValid;
  }
  
  getStepFields(stepNumber) {
    const stepFieldMap = {
      1: ['serviceType', 'clientName', 'clientEmail'],
      2: ['cardNumber', 'expiryDate', 'cvv', 'cardholderName', 'billingAddress', 'billingCity', 'billingState', 'billingZip', 'billingCountry'],
      3: ['paymentTerms']
    };
    
    let fields = stepFieldMap[stepNumber] || [];
    
    // Add custom amount if custom service is selected
    if (stepNumber === 1) {
      const serviceType = document.getElementById('service-type')?.value;
      if (serviceType === 'custom') {
        fields.push('customAmount');
      }
    }
    
    return fields;
  }
  
  updateProgressIndicator(stepNumber) {
    const progressSteps = document.querySelectorAll('.progress-step');
    const progressFill = document.querySelector('.progress-fill');
    const progressBar = document.querySelector('.payment-progress');
    
    // Update step indicators
    progressSteps.forEach((step, index) => {
      const stepNum = index + 1;
      step.classList.remove('active', 'completed');
      
      if (stepNum < stepNumber) {
        step.classList.add('completed');
      } else if (stepNum === stepNumber) {
        step.classList.add('active');
      }
    });
    
    // Update progress bar
    const progressPercentage = ((stepNumber - 1) / (this.totalSteps - 1)) * 100;
    if (progressFill) {
      progressFill.style.width = `${progressPercentage}%`;
    }
    
    // Update progress bar aria attributes
    if (progressBar) {
      progressBar.setAttribute('aria-valuenow', stepNumber);
    }
  }
  
  updateReviewData() {
    // Service details
    const serviceSelect = document.getElementById('service-type');
    const clientName = document.getElementById('client-name')?.value;
    const clientEmail = document.getElementById('client-email')?.value;
    const customAmount = document.getElementById('custom-amount')?.value;
    
    if (serviceSelect) {
      const selectedOption = serviceSelect.selectedOptions[0];
      const serviceName = selectedOption.textContent;
      const price = selectedOption.getAttribute('data-price');
      
      document.getElementById('review-service').textContent = serviceName;
      document.getElementById('review-client').textContent = clientName || '-';
      document.getElementById('review-email').textContent = clientEmail || '-';
      
      const totalAmount = serviceSelect.value === 'custom' ? 
        `$${parseFloat(customAmount || 0).toFixed(2)}` : 
        `$${price}.00`;
      document.getElementById('review-total').textContent = totalAmount;
    }
    
    // Payment method
    const cardNumber = document.getElementById('card-number')?.value;
    const cardholderName = document.getElementById('cardholder-name')?.value;
    
    if (cardNumber) {
      const maskedCard = '**** **** **** ' + cardNumber.slice(-4);
      document.getElementById('review-card').textContent = maskedCard;
    }
    document.getElementById('review-cardholder').textContent = cardholderName || '-';
    
    // Billing address
    const address = document.getElementById('billing-address')?.value;
    const city = document.getElementById('billing-city')?.value;
    const state = document.getElementById('billing-state')?.value;
    const zip = document.getElementById('billing-zip')?.value;
    
    const fullAddress = [address, city, state, zip].filter(Boolean).join(', ');
    document.getElementById('review-address').textContent = fullAddress || '-';
  }
  
  getValidationRules(input) {
    const rules = super.getValidationRules(input);
    
    // Add payment-specific validation rules
    if (input.name === 'serviceType') {
      rules.required = true;
    }
    
    if (input.name === 'customAmount') {
      rules.required = true;
      rules.min = 50;
      rules.max = 10000;
      rules.currency = true;
    }
    
    if (input.name === 'clientName' || input.name === 'cardholderName') {
      rules.required = true;
      rules.minLength = 2;
      rules.maxLength = 100;
      rules.namePattern = true;
    }
    
    if (input.name === 'clientEmail') {
      rules.required = true;
      rules.email = true;
    }
    
    if (input.name === 'cardNumber') {
      rules.required = true;
      rules.creditCard = true;
    }
    
    if (input.name === 'expiryDate') {
      rules.required = true;
      rules.expiryDate = true;
    }
    
    if (input.name === 'cvv') {
      rules.required = true;
      rules.cvv = true;
    }
    
    if (input.name.startsWith('billing')) {
      rules.required = true;
      if (input.name === 'billingZip') {
        rules.zipCode = true;
      }
    }
    
    if (input.name === 'paymentTerms') {
      rules.required = true;
    }
    
    return rules;
  }
  
  validateField(fieldName) {
    const field = this.fields[fieldName];
    if (!field) return true;
    
    const value = field.element.value.trim();
    const rules = field.rules;
    let isValid = true;
    let errorMessage = '';
    
    // Call parent validation first
    const parentValid = super.validateField(fieldName);
    if (!parentValid) return false;
    
    // Additional payment-specific validations
    if (rules.currency && value && !this.isValidCurrency(value)) {
      isValid = false;
      errorMessage = 'Please enter a valid amount';
    }
    
    else if (rules.creditCard && value && !this.isValidCreditCard(value)) {
      isValid = false;
      errorMessage = 'Please enter a valid credit card number';
    }
    
    else if (rules.expiryDate && value && !this.isValidExpiryDate(value)) {
      isValid = false;
      errorMessage = 'Please enter a valid expiry date (MM/YY)';
    }
    
    else if (rules.cvv && value && !this.isValidCVV(value)) {
      isValid = false;
      errorMessage = 'Please enter a valid CVV';
    }
    
    else if (rules.zipCode && value && !this.isValidZipCode(value)) {
      isValid = false;
      errorMessage = 'Please enter a valid ZIP code';
    }
    
    else if (rules.min && value && parseFloat(value) < rules.min) {
      isValid = false;
      errorMessage = `Amount must be at least $${rules.min}`;
    }
    
    else if (rules.max && value && parseFloat(value) > rules.max) {
      isValid = false;
      errorMessage = `Amount must not exceed $${rules.max}`;
    }
    
    if (!isValid) {
      field.isValid = false;
      this.updateFieldUI(fieldName, false, errorMessage);
      return false;
    }
    
    return parentValid;
  }
  
  isValidCurrency(value) {
    const currencyRegex = /^\d+(\.\d{1,2})?$/;
    return currencyRegex.test(value) && parseFloat(value) > 0;
  }
  
  isValidCreditCard(cardNumber) {
    const cleanNumber = cardNumber.replace(/\s/g, '');
    
    // Check length
    if (cleanNumber.length < 13 || cleanNumber.length > 19) {
      return false;
    }
    
    // Luhn algorithm
    let sum = 0;
    let isEven = false;
    
    for (let i = cleanNumber.length - 1; i >= 0; i--) {
      let digit = parseInt(cleanNumber.charAt(i));
      
      if (isEven) {
        digit *= 2;
        if (digit > 9) {
          digit -= 9;
        }
      }
      
      sum += digit;
      isEven = !isEven;
    }
    
    return sum % 10 === 0;
  }
  
  isValidExpiryDate(expiry) {
    const expiryRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
    if (!expiryRegex.test(expiry)) {
      return false;
    }
    
    const [month, year] = expiry.split('/');
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear() % 100;
    const currentMonth = currentDate.getMonth() + 1;
    
    const expiryYear = parseInt(year);
    const expiryMonth = parseInt(month);
    
    if (expiryYear < currentYear || (expiryYear === currentYear && expiryMonth < currentMonth)) {
      return false;
    }
    
    return true;
  }
  
  isValidCVV(cvv) {
    return /^\d{3,4}$/.test(cvv);
  }
  
  isValidZipCode(zip) {
    return /^\d{5}(-\d{4})?$/.test(zip);
  }
  
  getRequiredMessage(element) {
    const fieldName = element.name;
    
    const messages = {
      serviceType: 'Please select a service',
      customAmount: 'Please enter a custom amount',
      clientName: 'Client name is required',
      clientEmail: 'Email address is required',
      cardNumber: 'Card number is required',
      expiryDate: 'Expiry date is required',
      cvv: 'CVV is required',
      cardholderName: 'Cardholder name is required',
      billingAddress: 'Billing address is required',
      billingCity: 'City is required',
      billingState: 'State is required',
      billingZip: 'ZIP code is required',
      billingCountry: 'Country is required',
      paymentTerms: 'You must agree to the terms'
    };
    
    return messages[fieldName] || super.getRequiredMessage(element);
  }
  
  async submitForm() {
    // Simulate payment processing
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulate random success/failure for demo
        const success = Math.random() > 0.1; // 90% success rate
        
        if (success) {
          resolve({ 
            success: true, 
            transactionId: 'TXN' + Date.now(),
            message: 'Payment processed successfully!'
          });
        } else {
          reject(new Error('Payment processing failed. Please try again.'));
        }
      }, 3000);
    });
  }
  
  async handleSubmit(e) {
    e.preventDefault();
    
    if (this.isSubmitting) return;
    
    // Validate all fields in current step
    const isFormValid = this.validateCurrentStep();
    
    if (!isFormValid) {
      this.showFormMessage('Please correct the errors above and try again.', 'error');
      this.focusFirstInvalidField();
      return;
    }
    
    // Show loading state
    if (window.loadingManager) {
      window.loadingManager.showFormLoading(this.form);
    }
    this.setSubmitButtonLoading(true);
    this.isSubmitting = true;
    
    try {
      const result = await this.submitForm();
      
      // Hide loading state
      if (window.loadingManager) {
        window.loadingManager.hideFormLoading(this.form);
      }
      
      // Show success message
      this.showFormMessage(`Payment successful! Transaction ID: ${result.transactionId}`, 'success');
      
      // Reset form after delay
      setTimeout(() => {
        this.form.reset();
        this.resetFieldStates();
        this.goToStep(1);
      }, 3000);
      
    } catch (error) {
      console.error('Payment submission error:', error);
      this.showFormMessage(error.message || 'Payment failed. Please try again or contact support.', 'error');
    } finally {
      this.setSubmitButtonLoading(false);
      this.isSubmitting = false;
    }
  }
}

// Mobile form enhancements
function enhanceMobileForms() {
  // Add mobile-specific input types and attributes
  const emailInputs = document.querySelectorAll('input[type="email"]');
  emailInputs.forEach(input => {
    input.setAttribute('inputmode', 'email');
    input.setAttribute('autocomplete', 'email');
  });
  
  const phoneInputs = document.querySelectorAll('input[type="tel"]');
  phoneInputs.forEach(input => {
    input.setAttribute('inputmode', 'tel');
    input.setAttribute('autocomplete', 'tel');
  });
  
  const numberInputs = document.querySelectorAll('input[type="number"], input[name="customAmount"]');
  numberInputs.forEach(input => {
    input.setAttribute('inputmode', 'decimal');
  });
  
  // Improve mobile keyboard experience
  const cardNumberInputs = document.querySelectorAll('input[name="cardNumber"]');
  cardNumberInputs.forEach(input => {
    input.setAttribute('inputmode', 'numeric');
    input.setAttribute('autocomplete', 'cc-number');
  });
  
  const cvvInputs = document.querySelectorAll('input[name="cvv"]');
  cvvInputs.forEach(input => {
    input.setAttribute('inputmode', 'numeric');
    input.setAttribute('autocomplete', 'cc-csc');
  });
  
  const expiryInputs = document.querySelectorAll('input[name="expiryDate"]');
  expiryInputs.forEach(input => {
    input.setAttribute('inputmode', 'numeric');
    input.setAttribute('autocomplete', 'cc-exp');
  });
  
  // Add mobile-friendly error positioning
  const formGroups = document.querySelectorAll('.form-group');
  formGroups.forEach(group => {
    const input = group.querySelector('input, select, textarea');
    const errorElement = group.querySelector('.form-error');
    
    if (input && errorElement) {
      // Position error messages better on mobile
      if (window.innerWidth <= 767) {
        errorElement.style.position = 'relative';
        errorElement.style.marginTop = '4px';
      }
    }
  });
  
  // Improve mobile form scrolling
  const forms = document.querySelectorAll('form');
  forms.forEach(form => {
    form.addEventListener('submit', function(e) {
      // Scroll to form message on mobile after submission
      setTimeout(() => {
        const messageElement = form.querySelector('.form-message');
        if (messageElement && window.innerWidth <= 767) {
          messageElement.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'center' 
          });
        }
      }, 100);
    });
  });
  
  // Add touch-friendly focus management
  const inputs = document.querySelectorAll('input, select, textarea');
  inputs.forEach(input => {
    input.addEventListener('focus', function() {
      if (window.innerWidth <= 767) {
        // Scroll input into view on mobile
        setTimeout(() => {
          this.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'center' 
          });
        }, 300); // Wait for mobile keyboard to appear
      }
    });
  });
}

// Initialize form validators when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Initialize contact form validator only if form exists
  const contactForm = document.getElementById('contact-form');
  let contactFormValidator = null;
  if (contactForm) {
    contactFormValidator = new FormValidator('contact-form');
  }
  
  // Initialize payment form validator only if form exists
  const paymentForm = document.getElementById('payment-form');
  let paymentFormValidator = null;
  if (paymentForm) {
    paymentFormValidator = new PaymentFormValidator('payment-form');
  }
  
  // Add mobile enhancements
  if (window.innerWidth <= 767) {
    enhanceMobileForms();
  }
  
  // Re-apply mobile enhancements on resize
  window.addEventListener('resize', () => {
    if (window.innerWidth <= 767) {
      enhanceMobileForms();
    }
  });
  
  // Make validators available globally for debugging
  window.contactFormValidator = contactFormValidator;
  window.paymentFormValidator = paymentFormValidator;
});