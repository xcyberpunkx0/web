// Accessibility Enhancement JavaScript
// Comprehensive ARIA support and keyboard navigation

class AccessibilityManager {
  constructor() {
    this.focusableElements = [
      'a[href]',
      'button:not([disabled])',
      'input:not([disabled])',
      'select:not([disabled])',
      'textarea:not([disabled])',
      '[tabindex]:not([tabindex="-1"])',
      '[contenteditable="true"]'
    ].join(', ');
    
    this.init();
  }
  
  init() {
    this.enhanceNavigation();
    this.enhanceModals();
    this.enhanceForms();
    this.enhanceSlider();
    this.enhanceAccordion();
    this.enhanceSkipLinks();
    this.setupFocusManagement();
    this.setupKeyboardNavigation();
    this.setupScreenReaderAnnouncements();
    this.setupReducedMotion();
  }
  
  // Enhanced Navigation Accessibility
  enhanceNavigation() {
    const nav = document.querySelector('.navbar');
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (!nav || !navToggle || !navMenu) return;
    
    // Enhance mobile menu button
    navToggle.setAttribute('role', 'button');
    navToggle.setAttribute('aria-controls', 'nav-menu');
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.setAttribute('aria-label', 'Toggle navigation menu');
    
    // Enhance navigation menu
    navMenu.setAttribute('role', 'menu');
    navMenu.setAttribute('aria-labelledby', 'nav-toggle');
    
    // Enhance navigation links
    navLinks.forEach((link, index) => {
      link.setAttribute('role', 'menuitem');
      link.setAttribute('tabindex', index === 0 ? '0' : '-1');
      
      // Add keyboard navigation
      link.addEventListener('keydown', (e) => {
        this.handleMenuKeyNavigation(e, navLinks, index);
      });
    });
    
    // Enhanced mobile menu toggle
    navToggle.addEventListener('click', () => {
      const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', !isExpanded);
      
      if (!isExpanded) {
        // Focus first menu item when opening
        setTimeout(() => {
          navLinks[0]?.focus();
        }, 100);
        
        // Trap focus in mobile menu
        this.trapFocus(navMenu);
      } else {
        // Return focus to toggle button when closing
        navToggle.focus();
        this.removeFocusTrap();
      }
    });
    
    // Close menu on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        navToggle.click();
      }
    });
  }
  
  // Enhanced Modal Accessibility
  enhanceModals() {
    const modals = document.querySelectorAll('.modal, .service-modal');
    
    modals.forEach(modal => {
      // Set ARIA attributes
      modal.setAttribute('role', 'dialog');
      modal.setAttribute('aria-modal', 'true');
      modal.setAttribute('aria-hidden', 'true');
      
      // Find or create modal title
      const title = modal.querySelector('h2, h3, .modal-title');
      if (title) {
        const titleId = title.id || `modal-title-${Date.now()}`;
        title.id = titleId;
        modal.setAttribute('aria-labelledby', titleId);
      }
      
      // Find modal description
      const description = modal.querySelector('.modal-description, .modal-content p');
      if (description) {
        const descId = description.id || `modal-desc-${Date.now()}`;
        description.id = descId;
        modal.setAttribute('aria-describedby', descId);
      }
      
      // Add close button if not present
      let closeButton = modal.querySelector('.modal-close, .close-button');
      if (!closeButton) {
        closeButton = document.createElement('button');
        closeButton.className = 'modal-close';
        closeButton.innerHTML = '<i class="fas fa-times" aria-hidden="true"></i>';
        closeButton.setAttribute('aria-label', 'Close modal');
        modal.appendChild(closeButton);
      }
      
      // Enhance close button
      closeButton.setAttribute('aria-label', 'Close modal');
      closeButton.addEventListener('click', () => this.closeModal(modal));
      
      // Close on Escape key
      modal.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
          this.closeModal(modal);
        }
      });
      
      // Close on backdrop click
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          this.closeModal(modal);
        }
      });
    });
  }
  
  // Enhanced Form Accessibility
  enhanceForms() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
      // Add form role and labels
      form.setAttribute('role', 'form');
      
      const formTitle = form.querySelector('h2, h3, .form-title');
      if (formTitle) {
        const titleId = formTitle.id || `form-title-${Date.now()}`;
        formTitle.id = titleId;
        form.setAttribute('aria-labelledby', titleId);
      }
      
      // Enhance form fields
      const formGroups = form.querySelectorAll('.form-group');
      formGroups.forEach(group => {
        const input = group.querySelector('input, select, textarea');
        const label = group.querySelector('label');
        const errorElement = group.querySelector('.form-error');
        const helpText = group.querySelector('.form-help, .help-text');
        
        if (input && label) {
          // Ensure proper label association
          const inputId = input.id || `input-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
          input.id = inputId;
          label.setAttribute('for', inputId);
          
          // Add required indicator to label
          if (input.hasAttribute('required')) {
            input.setAttribute('aria-required', 'true');
            
            const requiredSpan = label.querySelector('.required');
            if (requiredSpan) {
              requiredSpan.setAttribute('aria-label', 'required field');
            }
          }
          
          // Associate error messages
          if (errorElement) {
            const errorId = errorElement.id || `error-${inputId}`;
            errorElement.id = errorId;
            errorElement.setAttribute('role', 'alert');
            errorElement.setAttribute('aria-live', 'polite');
            errorElement.setAttribute('aria-atomic', 'true');
            input.setAttribute('aria-describedby', errorId);
          }
          
          // Associate help text
          if (helpText) {
            const helpId = helpText.id || `help-${inputId}`;
            helpText.id = helpId;
            const describedBy = input.getAttribute('aria-describedby');
            input.setAttribute('aria-describedby', describedBy ? `${describedBy} ${helpId}` : helpId);
          }
          
          // Add invalid state handling
          input.addEventListener('invalid', () => {
            input.setAttribute('aria-invalid', 'true');
          });
          
          input.addEventListener('input', () => {
            if (input.checkValidity()) {
              input.setAttribute('aria-invalid', 'false');
            }
          });
        }
      });
      
      // Enhance checkboxes and radio buttons
      const checkboxes = form.querySelectorAll('input[type="checkbox"]');
      const radios = form.querySelectorAll('input[type="radio"]');
      
      [...checkboxes, ...radios].forEach(input => {
        const customControl = input.parentElement;
        if (customControl && customControl.classList.contains('form-checkbox-label')) {
          customControl.setAttribute('role', input.type === 'checkbox' ? 'checkbox' : 'radio');
          customControl.setAttribute('aria-checked', input.checked);
          
          input.addEventListener('change', () => {
            customControl.setAttribute('aria-checked', input.checked);
          });
        }
      });
      
      // Group related radio buttons
      const radioGroups = {};
      radios.forEach(radio => {
        const name = radio.name;
        if (!radioGroups[name]) {
          radioGroups[name] = [];
        }
        radioGroups[name].push(radio);
      });
      
      Object.values(radioGroups).forEach(group => {
        if (group.length > 1) {
          const fieldset = document.createElement('fieldset');
          const legend = document.createElement('legend');
          legend.textContent = group[0].getAttribute('aria-label') || 'Options';
          fieldset.appendChild(legend);
          
          group[0].parentElement.parentElement.insertBefore(fieldset, group[0].parentElement);
          group.forEach(radio => {
            fieldset.appendChild(radio.parentElement);
          });
        }
      });
    });
  }
  
  // Enhanced Slider Accessibility
  enhanceSlider() {
    const slider = document.querySelector('.hero-slider');
    const sliderTrack = document.querySelector('#hero-slider-track');
    const prevButton = document.querySelector('#slider-prev');
    const nextButton = document.querySelector('#slider-next');
    const indicators = document.querySelectorAll('.slider-indicator');
    
    if (!slider || !sliderTrack) return;
    
    // Set slider container attributes
    slider.setAttribute('role', 'region');
    slider.setAttribute('aria-label', 'Service highlights carousel');
    slider.setAttribute('aria-live', 'polite');
    
    // Enhance slider track
    sliderTrack.setAttribute('role', 'tablist');
    sliderTrack.setAttribute('aria-label', 'Service slides');
    
    // Enhance slides
    const slides = sliderTrack.querySelectorAll('.slider-slide');
    slides.forEach((slide, index) => {
      slide.setAttribute('role', 'tabpanel');
      slide.setAttribute('aria-label', `Slide ${index + 1}`);
      slide.setAttribute('tabindex', index === 0 ? '0' : '-1');
      
      const title = slide.querySelector('.slider-slide-title');
      if (title) {
        const titleId = `slide-title-${index}`;
        title.id = titleId;
        slide.setAttribute('aria-labelledby', titleId);
      }
    });
    
    // Enhance navigation buttons
    if (prevButton) {
      prevButton.setAttribute('aria-label', 'Previous slide');
      prevButton.setAttribute('aria-controls', 'hero-slider-track');
    }
    
    if (nextButton) {
      nextButton.setAttribute('aria-label', 'Next slide');
      nextButton.setAttribute('aria-controls', 'hero-slider-track');
    }
    
    // Enhance indicators
    indicators.forEach((indicator, index) => {
      indicator.setAttribute('role', 'tab');
      indicator.setAttribute('aria-label', `Go to slide ${index + 1}`);
      indicator.setAttribute('aria-controls', `slide-${index}`);
      indicator.setAttribute('aria-selected', index === 0 ? 'true' : 'false');
    });
    
    // Add keyboard navigation for slider
    slider.addEventListener('keydown', (e) => {
      const currentSlide = sliderTrack.querySelector('.slider-slide.active');
      const currentIndex = Array.from(slides).indexOf(currentSlide);
      
      switch (e.key) {
        case 'ArrowLeft':
          e.preventDefault();
          prevButton?.click();
          break;
        case 'ArrowRight':
          e.preventDefault();
          nextButton?.click();
          break;
        case 'Home':
          e.preventDefault();
          indicators[0]?.click();
          break;
        case 'End':
          e.preventDefault();
          indicators[indicators.length - 1]?.click();
          break;
      }
    });
  }
  
  // Enhanced Accordion Accessibility
  enhanceAccordion() {
    const accordions = document.querySelectorAll('.faq-accordion, .accordion');
    
    accordions.forEach(accordion => {
      const items = accordion.querySelectorAll('.faq-item, .accordion-item');
      
      items.forEach((item, index) => {
        const button = item.querySelector('.faq-question, .accordion-button, button');
        const content = item.querySelector('.faq-answer, .accordion-content');
        
        if (button && content) {
          // Set up IDs
          const buttonId = `accordion-button-${index}`;
          const contentId = `accordion-content-${index}`;
          
          button.id = buttonId;
          content.id = contentId;
          
          // Set ARIA attributes
          button.setAttribute('role', 'button');
          button.setAttribute('aria-expanded', 'false');
          button.setAttribute('aria-controls', contentId);
          
          content.setAttribute('role', 'region');
          content.setAttribute('aria-labelledby', buttonId);
          content.setAttribute('aria-hidden', 'true');
          
          // Add keyboard support
          button.addEventListener('keydown', (e) => {
            switch (e.key) {
              case 'Enter':
              case ' ':
                e.preventDefault();
                button.click();
                break;
              case 'ArrowDown':
                e.preventDefault();
                this.focusNextAccordionItem(items, index);
                break;
              case 'ArrowUp':
                e.preventDefault();
                this.focusPrevAccordionItem(items, index);
                break;
              case 'Home':
                e.preventDefault();
                items[0].querySelector('button')?.focus();
                break;
              case 'End':
                e.preventDefault();
                items[items.length - 1].querySelector('button')?.focus();
                break;
            }
          });
          
          // Update ARIA states on toggle
          button.addEventListener('click', () => {
            const isExpanded = button.getAttribute('aria-expanded') === 'true';
            button.setAttribute('aria-expanded', !isExpanded);
            content.setAttribute('aria-hidden', isExpanded);
          });
        }
      });
    });
  }
  
  // Enhanced Skip Links
  enhanceSkipLinks() {
    const skipLink = document.querySelector('.skip-link');
    
    if (skipLink) {
      skipLink.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(skipLink.getAttribute('href'));
        
        if (target) {
          target.setAttribute('tabindex', '-1');
          target.focus();
          target.scrollIntoView({ behavior: 'smooth' });
          
          // Remove tabindex after focus
          target.addEventListener('blur', () => {
            target.removeAttribute('tabindex');
          }, { once: true });
        }
      });
    }
    
    // Add additional skip links if needed
    this.addSkipLinks();
  }
  
  // Focus Management
  setupFocusManagement() {
    // Focus visible indicator
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
      }
    });
    
    document.addEventListener('mousedown', () => {
      document.body.classList.remove('keyboard-navigation');
    });
    
    // Focus trap for modals
    this.setupModalFocusTrap();
  }
  
  // Keyboard Navigation Enhancement
  setupKeyboardNavigation() {
    // Service cards keyboard navigation
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach((card, index) => {
      card.setAttribute('tabindex', '0');
      card.setAttribute('role', 'button');
      card.setAttribute('aria-label', `View details for ${card.querySelector('h3')?.textContent || 'service'}`);
      
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          card.click();
        }
      });
    });
    
    // Team cards keyboard navigation
    const teamCards = document.querySelectorAll('.team-card');
    teamCards.forEach((card, index) => {
      card.setAttribute('tabindex', '0');
      card.setAttribute('role', 'button');
      card.setAttribute('aria-label', `View profile for ${card.querySelector('h3')?.textContent || 'team member'}`);
      
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          card.click();
        }
      });
    });
  }
  
  // Screen Reader Announcements
  setupScreenReaderAnnouncements() {
    // Create announcement region
    const announcer = document.createElement('div');
    announcer.id = 'sr-announcer';
    announcer.setAttribute('aria-live', 'polite');
    announcer.setAttribute('aria-atomic', 'true');
    announcer.className = 'visually-hidden';
    document.body.appendChild(announcer);
    
    this.announcer = announcer;
    
    // Announce page changes
    this.setupPageChangeAnnouncements();
    
    // Announce form validation
    this.setupFormValidationAnnouncements();
  }
  
  // Reduced Motion Support
  setupReducedMotion() {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    const handleReducedMotion = (mediaQuery) => {
      if (mediaQuery.matches) {
        document.body.classList.add('reduce-motion');
        
        // Disable auto-playing animations
        const autoAnimations = document.querySelectorAll('[data-auto-animate]');
        autoAnimations.forEach(element => {
          element.style.animationPlayState = 'paused';
        });
        
        // Reduce transition durations
        document.documentElement.style.setProperty('--transition-fast', '0ms');
        document.documentElement.style.setProperty('--transition-normal', '0ms');
        document.documentElement.style.setProperty('--transition-slow', '0ms');
      } else {
        document.body.classList.remove('reduce-motion');
      }
    };
    
    prefersReducedMotion.addListener(handleReducedMotion);
    handleReducedMotion(prefersReducedMotion);
  }
  
  // Helper Methods
  handleMenuKeyNavigation(e, navLinks, currentIndex) {
    let targetIndex;
    
    switch (e.key) {
      case 'ArrowDown':
      case 'ArrowRight':
        e.preventDefault();
        targetIndex = (currentIndex + 1) % navLinks.length;
        break;
      case 'ArrowUp':
      case 'ArrowLeft':
        e.preventDefault();
        targetIndex = (currentIndex - 1 + navLinks.length) % navLinks.length;
        break;
      case 'Home':
        e.preventDefault();
        targetIndex = 0;
        break;
      case 'End':
        e.preventDefault();
        targetIndex = navLinks.length - 1;
        break;
      default:
        return;
    }
    
    // Update tabindex and focus
    navLinks.forEach((link, index) => {
      link.setAttribute('tabindex', index === targetIndex ? '0' : '-1');
    });
    
    navLinks[targetIndex].focus();
  }
  
  focusNextAccordionItem(items, currentIndex) {
    const nextIndex = (currentIndex + 1) % items.length;
    items[nextIndex].querySelector('button')?.focus();
  }
  
  focusPrevAccordionItem(items, currentIndex) {
    const prevIndex = (currentIndex - 1 + items.length) % items.length;
    items[prevIndex].querySelector('button')?.focus();
  }
  
  trapFocus(container) {
    const focusableElements = container.querySelectorAll(this.focusableElements);
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];
    
    this.focusTrapHandler = (e) => {
      if (e.key === 'Tab') {
        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    };
    
    document.addEventListener('keydown', this.focusTrapHandler);
  }
  
  removeFocusTrap() {
    if (this.focusTrapHandler) {
      document.removeEventListener('keydown', this.focusTrapHandler);
      this.focusTrapHandler = null;
    }
  }
  
  openModal(modal) {
    modal.setAttribute('aria-hidden', 'false');
    modal.style.display = 'flex';
    
    // Focus first focusable element in modal
    const firstFocusable = modal.querySelector(this.focusableElements);
    if (firstFocusable) {
      firstFocusable.focus();
    }
    
    // Trap focus
    this.trapFocus(modal);
    
    // Store previously focused element
    this.previouslyFocused = document.activeElement;
  }
  
  closeModal(modal) {
    modal.setAttribute('aria-hidden', 'true');
    modal.style.display = 'none';
    
    // Remove focus trap
    this.removeFocusTrap();
    
    // Return focus to previously focused element
    if (this.previouslyFocused) {
      this.previouslyFocused.focus();
      this.previouslyFocused = null;
    }
  }
  
  setupModalFocusTrap() {
    // This will be called when modals are opened
    const modalTriggers = document.querySelectorAll('[data-modal-target]');
    modalTriggers.forEach(trigger => {
      trigger.addEventListener('click', (e) => {
        const modalId = trigger.getAttribute('data-modal-target');
        const modal = document.getElementById(modalId);
        if (modal) {
          this.openModal(modal);
        }
      });
    });
  }
  
  setupPageChangeAnnouncements() {
    // Announce section changes during navigation
    const sections = document.querySelectorAll('section[id]');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
          const sectionTitle = entry.target.querySelector('h1, h2')?.textContent;
          if (sectionTitle) {
            this.announce(`Now viewing: ${sectionTitle}`);
          }
        }
      });
    }, { threshold: 0.5 });
    
    sections.forEach(section => observer.observe(section));
  }
  
  setupFormValidationAnnouncements() {
    // Announce form validation errors
    document.addEventListener('invalid', (e) => {
      const field = e.target;
      const label = document.querySelector(`label[for="${field.id}"]`)?.textContent || field.name;
      const message = field.validationMessage;
      
      this.announce(`Error in ${label}: ${message}`);
    }, true);
  }
  
  addSkipLinks() {
    const skipLinksContainer = document.createElement('div');
    skipLinksContainer.className = 'skip-links';
    
    const skipLinks = [
      { href: '#main-content', text: 'Skip to main content' },
      { href: '#services', text: 'Skip to services' },
      { href: '#contact', text: 'Skip to contact form' }
    ];
    
    skipLinks.forEach(link => {
      const skipLink = document.createElement('a');
      skipLink.href = link.href;
      skipLink.textContent = link.text;
      skipLink.className = 'skip-link';
      skipLinksContainer.appendChild(skipLink);
    });
    
    document.body.insertBefore(skipLinksContainer, document.body.firstChild);
  }
  
  announce(message) {
    if (this.announcer) {
      this.announcer.textContent = message;
      
      // Clear after announcement
      setTimeout(() => {
        this.announcer.textContent = '';
      }, 1000);
    }
  }
}

// Initialize accessibility manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  window.accessibilityManager = new AccessibilityManager();
});