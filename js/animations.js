// Enhanced Animation System for TaxPro Consulting Website
// Comprehensive entrance animations, micro-interactions, and accessibility support

/**
 * Global Animation Manager
 * Handles all animations with performance optimization and accessibility support
 */
class AnimationManager {
  constructor() {
    this.observers = new Map();
    this.reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    this.isLowEndDevice = this.detectLowEndDevice();
    this.animationQueue = [];
    this.isInitialized = false;

    this.init();
  }

  init() {
    if (this.isInitialized) return;

    // Listen for reduced motion preference changes
    window
      .matchMedia("(prefers-reduced-motion: reduce)")
      .addEventListener("change", (e) => {
        this.reducedMotion = e.matches;
        this.updateAnimationSettings();
      });

    // Initialize core animation systems
    this.initIntersectionObserver();
    this.initMicroInteractions();
    this.initStaggeredAnimations();
    this.initFormAnimations();
    this.initButtonAnimations();
    this.initCardAnimations();

    this.isInitialized = true;
  }

  detectLowEndDevice() {
    const connection =
      navigator.connection ||
      navigator.mozConnection ||
      navigator.webkitConnection;
    const slowConnection =
      connection &&
      (connection.effectiveType === "slow-2g" ||
        connection.effectiveType === "2g");
    const lowMemory = navigator.deviceMemory && navigator.deviceMemory < 4;
    const oldDevice =
      navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4;

    return slowConnection || lowMemory || oldDevice;
  }

  updateAnimationSettings() {
    if (this.reducedMotion || this.isLowEndDevice) {
      this.disableComplexAnimations();
    } else {
      this.enableAnimations();
    }
  }

  disableComplexAnimations() {
    const style = document.createElement("style");
    style.id = "reduced-motion-override";
    style.textContent = `
            *, *::before, *::after {
                animation-duration: 0.01ms !important;
                animation-iteration-count: 1 !important;
                transition-duration: 0.01ms !important;
                scroll-behavior: auto !important;
            }
        `;

    // Remove existing override if present
    const existing = document.getElementById("reduced-motion-override");
    if (existing) existing.remove();

    document.head.appendChild(style);
  }

  enableAnimations() {
    const existing = document.getElementById("reduced-motion-override");
    if (existing) existing.remove();
  }

  /**
   * Initialize Intersection Observer for entrance animations
   */
  initIntersectionObserver() {
    const options = {
      threshold: this.isLowEndDevice ? 0.1 : 0.15,
      rootMargin: this.isLowEndDevice ? "100px" : "50px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          this.triggerEntranceAnimation(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, options);

    this.observers.set("entrance", observer);

    // Observe elements for entrance animations
    this.observeEntranceElements();
  }

  observeEntranceElements() {
    const observer = this.observers.get("entrance");
    if (!observer) return;

    // Define selectors for elements that should animate in
    const selectors = [
      ".section-header",
      ".service-card",
      ".team-card",
      ".stat-item",
      ".timeline-item",
      ".credential-item",
      ".contact-item",
      ".faq-item",
      ".about-text",
      ".about-stats",
      ".hero-content",
      ".hero-slider",
    ];

    selectors.forEach((selector) => {
      const elements = document.querySelectorAll(selector);
      elements.forEach((element) => {
        if (!element.classList.contains("animate-observed")) {
          element.classList.add("animate-observed");
          observer.observe(element);
        }
      });
    });
  }

  triggerEntranceAnimation(element) {
    if (this.reducedMotion) {
      element.style.opacity = "1";
      element.style.transform = "none";
      return;
    }

    // Determine animation type based on element
    const animationType = this.getAnimationType(element);
    const delay = this.calculateStaggerDelay(element);

    // Apply animation with delay
    setTimeout(() => {
      element.classList.add("animate-in", animationType);
    }, delay);
  }

  getAnimationType(element) {
    if (element.classList.contains("section-header")) return "animate-fade-up";
    if (element.classList.contains("service-card")) return "animate-scale-in";
    if (element.classList.contains("team-card")) return "animate-slide-up";
    if (element.classList.contains("stat-item")) return "animate-fade-up";
    if (element.classList.contains("timeline-item"))
      return "animate-slide-left";
    if (element.classList.contains("credential-item")) return "animate-fade-in";
    if (element.classList.contains("contact-item"))
      return "animate-slide-right";
    if (element.classList.contains("faq-item")) return "animate-fade-up";
    if (element.classList.contains("hero-content")) return "animate-fade-up";
    if (element.classList.contains("hero-slider")) return "animate-slide-right";

    return "animate-fade-in"; // Default animation
  }

  calculateStaggerDelay(element) {
    if (this.reducedMotion || this.isLowEndDevice) return 0;

    // Calculate stagger delay based on element position
    const container = element.closest(
      ".services-grid, .team-grid, .stats-grid, .timeline-container, .credentials-grid"
    );
    if (!container) return 0;

    const siblings = Array.from(container.children);
    const index = siblings.indexOf(element);

    return Math.min(index * 100, 600); // Max 600ms delay
  }

  /**
   * Initialize micro-interactions for interactive elements
   */
  initMicroInteractions() {
    this.initHoverEffects();
    this.initFocusEffects();
    this.initClickEffects();
    this.initScrollEffects();
  }

  initHoverEffects() {
    if (this.reducedMotion) return;

    // Enhanced hover effects for cards
    const cards = document.querySelectorAll(".service-card, .team-card");
    cards.forEach((card) => {
      card.addEventListener("mouseenter", (e) => {
        if (!this.reducedMotion) {
          e.target.style.transform = "translateY(-8px) scale(1.02)";
          e.target.style.boxShadow = "0 20px 40px rgba(0,0,0,0.15)";
        }
      });

      card.addEventListener("mouseleave", (e) => {
        e.target.style.transform = "";
        e.target.style.boxShadow = "";
      });
    });

    // Button hover effects
    const buttons = document.querySelectorAll(".btn");
    buttons.forEach((button) => {
      button.addEventListener("mouseenter", (e) => {
        if (!this.reducedMotion) {
          e.target.style.transform = "translateY(-2px)";
        }
      });

      button.addEventListener("mouseleave", (e) => {
        e.target.style.transform = "";
      });
    });
  }

  initFocusEffects() {
    // Enhanced focus effects for accessibility
    const focusableElements = document.querySelectorAll(
      "button, a, input, select, textarea, [tabindex]"
    );

    focusableElements.forEach((element) => {
      element.addEventListener("focus", (e) => {
        if (!this.reducedMotion) {
          e.target.style.outline = "3px solid rgba(214, 158, 46, 0.6)";
          e.target.style.outlineOffset = "2px";
          e.target.style.transform = "scale(1.02)";
        }
      });

      element.addEventListener("blur", (e) => {
        e.target.style.outline = "";
        e.target.style.outlineOffset = "";
        e.target.style.transform = "";
      });
    });
  }

  initClickEffects() {
    // Ripple effect for buttons and interactive elements
    const interactiveElements = document.querySelectorAll(
      ".btn, .service-card, .team-card, .nav-link"
    );

    interactiveElements.forEach((element) => {
      element.addEventListener("click", (e) => {
        if (this.reducedMotion) return;

        this.createRippleEffect(e);
      });
    });
  }

  createRippleEffect(event) {
    const element = event.currentTarget;
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    const ripple = document.createElement("span");
    ripple.className = "ripple-effect";
    ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s ease-out;
            pointer-events: none;
            z-index: 1;
        `;

    // Ensure element has relative positioning
    if (getComputedStyle(element).position === "static") {
      element.style.position = "relative";
    }

    element.appendChild(ripple);

    // Remove ripple after animation
    setTimeout(() => {
      if (ripple.parentNode) {
        ripple.parentNode.removeChild(ripple);
      }
    }, 600);
  }

  initScrollEffects() {
    if (this.reducedMotion) return;

    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          this.updateScrollEffects();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
  }

  updateScrollEffects() {
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;

    // Parallax effect for hero section
    const heroSection = document.querySelector(".hero-section");
    if (heroSection && scrollY < windowHeight) {
      const parallaxSpeed = 0.5;
      heroSection.style.transform = `translateY(${scrollY * parallaxSpeed}px)`;
    }

    // Update navigation progress indicator
    this.updateScrollProgress();
  }

  updateScrollProgress() {
    const scrollProgress =
      (window.scrollY /
        (document.documentElement.scrollHeight - window.innerHeight)) *
      100;

    let progressBar = document.querySelector(".scroll-progress");
    if (!progressBar) {
      progressBar = document.createElement("div");
      progressBar.className = "scroll-progress";
      progressBar.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 0%;
                height: 3px;
                background: linear-gradient(90deg, #d69e2e, #1a365d);
                z-index: 1000;
                transition: width 0.1s ease;
            `;
      document.body.appendChild(progressBar);
    }

    progressBar.style.width = `${Math.min(scrollProgress, 100)}%`;
  }

  /**
   * Initialize staggered animations for content sections
   */
  initStaggeredAnimations() {
    if (this.reducedMotion) return;

    // Staggered animations for service cards
    this.initServiceCardStagger();

    // Staggered animations for team cards
    this.initTeamCardStagger();

    // Staggered animations for stats
    this.initStatsStagger();

    // Staggered animations for FAQ items
    this.initFAQStagger();
  }

  initServiceCardStagger() {
    const serviceCards = document.querySelectorAll(".service-card");
    serviceCards.forEach((card, index) => {
      card.style.animationDelay = `${index * 0.1}s`;
    });
  }

  initTeamCardStagger() {
    const teamCards = document.querySelectorAll(".team-card");
    teamCards.forEach((card, index) => {
      card.style.animationDelay = `${index * 0.15}s`;
    });
  }

  initStatsStagger() {
    const statItems = document.querySelectorAll(".stat-item");
    statItems.forEach((item, index) => {
      item.style.animationDelay = `${index * 0.2}s`;
    });
  }

  initFAQStagger() {
    const faqItems = document.querySelectorAll(".faq-item");
    faqItems.forEach((item, index) => {
      item.style.animationDelay = `${Math.min(index * 0.1, 0.6)}s`;
    });
  }

  /**
   * Initialize form animations
   */
  initFormAnimations() {
    const formInputs = document.querySelectorAll(".form-input");

    formInputs.forEach((input) => {
      // Floating label effect
      input.addEventListener("focus", (e) => {
        const label = e.target.previousElementSibling;
        if (label && label.classList.contains("form-label")) {
          if (!this.reducedMotion) {
            label.style.transform = "translateY(-20px) scale(0.85)";
            label.style.color = "#d69e2e";
          }
        }
      });

      input.addEventListener("blur", (e) => {
        const label = e.target.previousElementSibling;
        if (
          label &&
          label.classList.contains("form-label") &&
          !e.target.value
        ) {
          label.style.transform = "";
          label.style.color = "";
        }
      });

      // Input validation animations
      input.addEventListener("input", (e) => {
        this.animateInputValidation(e.target);
      });
    });
  }

  animateInputValidation(input) {
    if (this.reducedMotion) return;

    const isValid = input.checkValidity();

    if (isValid && input.value) {
      input.style.borderColor = "#38a169";
      input.style.boxShadow = "0 0 0 3px rgba(56, 161, 105, 0.1)";
    } else if (!isValid && input.value) {
      input.style.borderColor = "#e53e3e";
      input.style.boxShadow = "0 0 0 3px rgba(229, 62, 62, 0.1)";

      // Shake animation for invalid input
      input.style.animation = "shake 0.5s ease-in-out";
      setTimeout(() => {
        input.style.animation = "";
      }, 500);
    } else {
      input.style.borderColor = "";
      input.style.boxShadow = "";
    }
  }

  /**
   * Initialize button animations
   */
  initButtonAnimations() {
    const buttons = document.querySelectorAll(".btn");

    buttons.forEach((button) => {
      // Loading state animation
      button.addEventListener("click", (e) => {
        if (button.classList.contains("loading")) return;

        this.animateButtonLoading(button);
      });

      // Pulse animation for CTA buttons
      if (button.classList.contains("btn--primary")) {
        this.addPulseAnimation(button);
      }
    });
  }

  animateButtonLoading(button) {
    if (this.reducedMotion) return;

    button.classList.add("loading");
    const originalText = button.textContent;

    // Create loading spinner
    const spinner = document.createElement("i");
    spinner.className = "fas fa-spinner fa-spin";

    button.innerHTML = "";
    button.appendChild(spinner);
    button.appendChild(document.createTextNode(" Loading..."));

    // Simulate loading (remove in production)
    setTimeout(() => {
      button.classList.remove("loading");
      button.textContent = originalText;
    }, 2000);
  }

  addPulseAnimation(button) {
    if (this.reducedMotion) return;

    setInterval(() => {
      if (!button.matches(":hover") && !button.matches(":focus")) {
        button.style.animation = "pulse 2s ease-in-out";
        setTimeout(() => {
          button.style.animation = "";
        }, 2000);
      }
    }, 10000); // Pulse every 10 seconds
  }

  /**
   * Initialize card animations
   */
  initCardAnimations() {
    const cards = document.querySelectorAll(".service-card, .team-card");

    cards.forEach((card) => {
      // Tilt effect on mouse move
      card.addEventListener("mousemove", (e) => {
        if (this.reducedMotion) return;

        this.applyTiltEffect(card, e);
      });

      card.addEventListener("mouseleave", () => {
        card.style.transform = "";
      });

      // Magnetic effect for team cards
      if (card.classList.contains("team-card")) {
        this.addMagneticEffect(card);
      }
    });
  }

  applyTiltEffect(card, event) {
    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
  }

  addMagneticEffect(card) {
    if (this.reducedMotion) return;

    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      const moveX = x * 0.1;
      const moveY = y * 0.1;

      card.style.transform += ` translate(${moveX}px, ${moveY}px)`;
    });
  }

  /**
   * Public methods for external use
   */
  animateElement(element, animationType, delay = 0) {
    if (this.reducedMotion) return;

    setTimeout(() => {
      element.classList.add("animate-in", animationType);
    }, delay);
  }

  removeAnimation(element) {
    element.classList.remove("animate-in");
    element.style.animation = "";
    element.style.transform = "";
  }

  refreshObservers() {
    // Re-observe new elements that may have been added dynamically
    this.observeEntranceElements();
  }
}

// Initialize global animation manager
let animationManager;

document.addEventListener("DOMContentLoaded", () => {
  animationManager = new AnimationManager();

  // Make it globally available
  window.animationManager = animationManager;
});

// Export for module use
if (typeof module !== "undefined" && module.exports) {
  module.exports = AnimationManager;
}
/**
  Team Section Scroll Animations
  **/
function initTeamAnimations() {
  const teamGrid = document.querySelector(".team-grid");

  if (!teamGrid) return;

  // Intersection Observer for team grid animation
  const teamObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-in");

          // Add loaded class to images when they load
          const teamImages = entry.target.querySelectorAll(
            ".team-card-image img"
          );
          teamImages.forEach((img) => {
            if (img.complete) {
              img.classList.add("loaded");
            } else {
              img.addEventListener("load", () => {
                img.classList.add("loaded");
              });
              img.addEventListener("error", () => {
                // Handle image load error
                img.src = "images/team/placeholder.jpg";
                img.classList.add("loaded");
              });
            }
          });

          teamObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.2,
      rootMargin: "50px",
    }
  );

  teamObserver.observe(teamGrid);
}

// Initialize team animations when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  initTeamAnimations();
});

/**
 * Team Modal Animation Enhancements
 */
function enhanceTeamModalAnimations() {
  // Add smooth scrolling when modal opens
  document.addEventListener("click", function (e) {
    if (
      e.target.closest(".team-card") &&
      !e.target.closest(".team-contact-btn")
    ) {
      // Prevent body scroll when modal opens
      document.body.style.overflow = "hidden";
    }
  });

  // Restore body scroll when modal closes
  document.addEventListener("click", function (e) {
    if (
      e.target.closest(".team-modal-close") ||
      e.target.closest(".team-modal-close-btn") ||
      e.target.closest(".team-modal-backdrop")
    ) {
      document.body.style.overflow = "";
    }
  });

  // Handle escape key
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      const activeModal = document.querySelector(".team-modal.active");
      if (activeModal) {
        document.body.style.overflow = "";
      }
    }
  });
}

// Initialize modal enhancements
document.addEventListener("DOMContentLoaded", function () {
  enhanceTeamModalAnimations();
});

/**
 * Team Card Hover Effects Enhancement
 */
function enhanceTeamCardEffects() {
  const teamCards = document.querySelectorAll(".team-card");

  teamCards.forEach((card) => {
    // Add mouse move effect for subtle tilt
    card.addEventListener("mousemove", function (e) {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return;
      }

      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = (y - centerY) / 20;
      const rotateY = (centerX - x) / 20;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
    });

    // Reset transform on mouse leave
    card.addEventListener("mouseleave", function () {
      card.style.transform = "";
    });

    // Add focus effects
    card.addEventListener("focus", function () {
      if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        card.style.transform = "translateY(-8px) scale(1.02)";
      }
    });

    card.addEventListener("blur", function () {
      card.style.transform = "";
    });
  });
}

// Initialize card effects after team section is loaded
document.addEventListener("DOMContentLoaded", function () {
  // Wait for team cards to be created
  setTimeout(() => {
    enhanceTeamCardEffects();
  }, 100);
});

/**
 * Parallax Effect for Team Section Background
 */
function initTeamParallax() {
  const teamSection = document.querySelector(".team-section");

  if (
    !teamSection ||
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  ) {
    return;
  }

  let ticking = false;

  function updateParallax() {
    const scrolled = window.scrollY;
    const sectionTop = teamSection.offsetTop;
    const sectionHeight = teamSection.offsetHeight;
    const windowHeight = window.innerHeight;

    // Check if section is in viewport
    if (
      scrolled + windowHeight > sectionTop &&
      scrolled < sectionTop + sectionHeight
    ) {
      const yPos = -(scrolled - sectionTop) * 0.1;
      teamSection.style.backgroundPosition = `center ${yPos}px`;
    }

    ticking = false;
  }

  function requestParallaxUpdate() {
    if (!ticking) {
      requestAnimationFrame(updateParallax);
      ticking = true;
    }
  }

  window.addEventListener("scroll", requestParallaxUpdate, { passive: true });
}

// Initialize parallax effect
document.addEventListener("DOMContentLoaded", function () {
  initTeamParallax();
});

/**
 * Team Section Performance Optimizations
 */
function optimizeTeamPerformance() {
  // Lazy load team member images
  const teamImages = document.querySelectorAll(".team-card-image img");

  if ("IntersectionObserver" in window) {
    const imageObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target;

            // Create a new image to preload
            const newImg = new Image();
            newImg.onload = () => {
              img.src = newImg.src;
              img.classList.add("loaded");
            };
            newImg.onerror = () => {
              img.src = "images/team/placeholder.jpg";
              img.classList.add("loaded");
            };
            newImg.src = img.dataset.src || img.src;

            imageObserver.unobserve(img);
          }
        });
      },
      {
        rootMargin: "100px",
      }
    );

    teamImages.forEach((img) => {
      imageObserver.observe(img);
    });
  } else {
    // Fallback for browsers without IntersectionObserver
    teamImages.forEach((img) => {
      img.classList.add("loaded");
    });
  }
}

// Initialize performance optimizations
document.addEventListener("DOMContentLoaded", function () {
  setTimeout(() => {
    optimizeTeamPerformance();
  }, 200);
});

/**
 * Mobile Animation Optimizations
 */
function initMobileAnimationOptimizations() {
  // Disable complex animations on low-end devices
  if (isLowEndDevice()) {
    disableComplexAnimations();
  }

  // Optimize animations for mobile
  if (window.innerWidth <= 767) {
    optimizeForMobile();
  }

  // Handle reduced motion preference
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    disableAllAnimations();
  }
}

function isLowEndDevice() {
  // Simple heuristic to detect low-end devices
  const connection =
    navigator.connection ||
    navigator.mozConnection ||
    navigator.webkitConnection;
  const slowConnection =
    connection &&
    (connection.effectiveType === "slow-2g" ||
      connection.effectiveType === "2g");
  const lowMemory = navigator.deviceMemory && navigator.deviceMemory < 4;
  const oldDevice =
    navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4;

  return slowConnection || lowMemory || oldDevice;
}

function disableComplexAnimations() {
  // Disable parallax effects
  const parallaxElements = document.querySelectorAll("[data-parallax]");
  parallaxElements.forEach((element) => {
    element.style.transform = "none";
    element.style.backgroundAttachment = "scroll";
  });

  // Simplify hover effects
  const style = document.createElement("style");
  style.textContent = `
        .service-card:hover,
        .team-card:hover {
            transform: translateY(-4px) !important;
            transition: transform 0.2s ease !important;
        }
    `;
  document.head.appendChild(style);
}

function optimizeForMobile() {
  // Use transform3d for better performance
  const animatedElements = document.querySelectorAll(
    ".service-card, .team-card, .stat-item"
  );
  animatedElements.forEach((element) => {
    element.style.transform = "translate3d(0, 0, 0)";
    element.style.backfaceVisibility = "hidden";
    element.style.perspective = "1000px";
  });

  // Reduce animation complexity on mobile
  const style = document.createElement("style");
  style.textContent = `
        @media (max-width: 767px) {
            .service-card,
            .team-card {
                transition: transform 0.2s ease-out !important;
            }
            
            .service-card:hover,
            .team-card:hover {
                transform: translate3d(0, -4px, 0) !important;
            }
            
            .hero-slider .slider-slide {
                transition: opacity 0.3s ease !important;
            }
        }
    `;
  document.head.appendChild(style);
}

function disableAllAnimations() {
  const style = document.createElement("style");
  style.textContent = `
        *,
        *::before,
        *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
            scroll-behavior: auto !important;
        }
    `;
  document.head.appendChild(style);
}

/**
 * Touch-Optimized Interactions
 */
function initTouchOptimizations() {
  if (!("ontouchstart" in window)) return;

  // Add touch feedback for interactive elements
  const touchElements = document.querySelectorAll(
    ".service-card, .team-card, .btn, .nav-link"
  );

  touchElements.forEach((element) => {
    element.addEventListener(
      "touchstart",
      function () {
        this.classList.add("touch-active");
      },
      { passive: true }
    );

    element.addEventListener(
      "touchend",
      function () {
        setTimeout(() => {
          this.classList.remove("touch-active");
        }, 150);
      },
      { passive: true }
    );

    element.addEventListener(
      "touchcancel",
      function () {
        this.classList.remove("touch-active");
      },
      { passive: true }
    );
  });

  // Add CSS for touch feedback
  const style = document.createElement("style");
  style.textContent = `
        .touch-active {
            transform: scale(0.98) !important;
            opacity: 0.8 !important;
            transition: all 0.1s ease !important;
        }
    `;
  document.head.appendChild(style);
}

/**
 * Intersection Observer Optimizations for Mobile
 */
function initMobileIntersectionObserver() {
  // Use larger root margins on mobile for better performance
  const rootMargin = window.innerWidth <= 767 ? "100px" : "50px";
  const threshold = window.innerWidth <= 767 ? 0.1 : 0.2;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-in");

          // Unobserve after animation to improve performance
          observer.unobserve(entry.target);
        }
      });
    },
    {
      rootMargin,
      threshold,
    }
  );

  // Observe elements that should animate in
  const animateElements = document.querySelectorAll(
    ".service-card, .team-card, .stat-item, .faq-item"
  );
  animateElements.forEach((element) => {
    observer.observe(element);
  });
}

/**
 * Performance Monitoring
 */
function initPerformanceMonitoring() {
  // Monitor frame rate and adjust animations accordingly
  let lastTime = performance.now();
  let frameCount = 0;
  let fps = 60;

  function measureFPS() {
    const now = performance.now();
    frameCount++;

    if (now - lastTime >= 1000) {
      fps = Math.round((frameCount * 1000) / (now - lastTime));
      frameCount = 0;
      lastTime = now;

      // Reduce animation complexity if FPS is low
      if (fps < 30) {
        disableComplexAnimations();
      }
    }

    requestAnimationFrame(measureFPS);
  }

  // Only monitor on mobile devices
  if (window.innerWidth <= 767) {
    requestAnimationFrame(measureFPS);
  }
}

// Initialize mobile optimizations
document.addEventListener("DOMContentLoaded", function () {
  initMobileAnimationOptimizations();
  initTouchOptimizations();
  initMobileIntersectionObserver();
  initPerformanceMonitoring();
});

// Re-initialize on resize
window.addEventListener("resize", function () {
  // Debounce resize events
  clearTimeout(window.resizeTimeout);
  window.resizeTimeout = setTimeout(function () {
    if (window.innerWidth <= 767) {
      optimizeForMobile();
    }
  }, 250);
});
