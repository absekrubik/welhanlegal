// Main JavaScript file for WELHAN LEGAL website with all animations

// This function serves as the entry point, ensuring the entire DOM is loaded before initializing scripts.
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all core components and event listeners.
    initNavigation();
    initScrollAnimations();
    initTestimonials();
    initContactForm();
    initSmoothScrolling();
    initHeroAnimations();
    initServiceCardAnimations();

    // Add a class to the body to signify that the page has finished loading.
    // This can be used for pre-loader animations.
    document.body.classList.add('loaded');
});

/**
 * Initializes all navigation-related functionality.
 * This includes the mobile menu, sticky header, and active link highlighting.
 */
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');

    // Mobile menu toggle with animation.
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            // Toggle classes to trigger CSS animations for the hamburger icon and menu.
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // Close mobile menu when a navigation link is clicked.
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (hamburger && navMenu) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    });

    // Sticky navigation on scroll with performance throttling.
    // Throttling prevents the function from firing too often, improving performance.
    let lastScrollY = window.scrollY;
    const throttledScroll = throttle(() => {
        const currentScrollY = window.scrollY;
        
        // Add or remove the 'scrolled' class based on scroll position.
        // This class can be used to style the navbar (e.g., change background color, add shadow).
        if (currentScrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Hide or show navbar based on scroll direction.
        if (currentScrollY > lastScrollY && currentScrollY > 100) {
            navbar.classList.add('hide');
        } else {
            navbar.classList.remove('hide');
        }
        lastScrollY = currentScrollY;
    }, 100);

    window.addEventListener('scroll', throttledScroll);

    // Active link highlighting based on section position.
    const throttledHighlight = throttle(() => {
        const scrollPosition = window.scrollY + 150; // Add an offset for better UX
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const correspondingLink = document.querySelector(`a[href="#${sectionId}"]`);

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                // Remove 'active' from all links and add it to the current one.
                navLinks.forEach(link => link.classList.remove('active'));
                if (correspondingLink) {
                    correspondingLink.classList.add('active');
                }
            }
        });
    }, 100);

    window.addEventListener('scroll', throttledHighlight);
}

/**
 * Initializes animations for elements as they enter the viewport.
 * Uses the IntersectionObserver API for efficient, performant scroll animations.
 */
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1, // Trigger when 10% of the element is visible
        rootMargin: '0px 0px -50px 0px' // Start animation 50px before the element enters view
    };
    
    // Create a single observer to watch all elements with the 'animate-on-scroll' class.
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // When element enters the viewport, add the 'animated' class.
                entry.target.classList.add('animated');
                // Stop observing after animation to save resources.
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Select all elements to be animated. You can add this class to any element you want to animate.
    const animateElements = document.querySelectorAll('.animate-on-scroll');
    animateElements.forEach(element => {
        observer.observe(element);
    });
}

/**
 * Initializes special animations for the hero section.
 */
function initHeroAnimations() {
    // Animated gradient text effect.
    const gradientText = document.querySelector('.gradient-text');
    if (gradientText) {
        // Add a class to trigger a CSS animation on the gradient text.
        gradientText.classList.add('animate-gradient');
    }

    // Scroll indicator animation.
    const scrollIndicator = document.querySelector('.scroll-indicator span');
    if (scrollIndicator) {
        // Add a class to trigger a CSS animation on the scroll indicator.
        scrollIndicator.classList.add('animate-scroll-indicator');
    }
}

/**
 * Handles the hover animations for service cards.
 */
function initServiceCardAnimations() {
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.classList.add('hovered');
        });
        
        card.addEventListener('mouseleave', () => {
            card.classList.remove('hovered');
        });
    });
}

/**
 * Initializes and manages the testimonials slider.
 * Includes auto-play, navigation, and touch/swipe support.
 */
function initTestimonials() {
    const track = document.getElementById('testimonial-track');
    const slides = document.querySelectorAll('.testimonial-slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');

    if (!track || slides.length === 0) return;
    
    let currentSlide = 0;
    const totalSlides = slides.length;
    let autoPlayInterval;

    function showSlide(index) {
        // Ensure index is within bounds.
        currentSlide = (index + totalSlides) % totalSlides;
        
        // Use CSS classes to manage slide visibility and animations.
        slides.forEach((slide, i) => {
            slide.classList.remove('active');
            if (i === currentSlide) {
                slide.classList.add('active');
            }
        });
        
        // Update dot indicators.
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === currentSlide);
        });
    }

    function nextSlide() {
        showSlide(currentSlide + 1);
    }
    
    function prevSlide() {
        showSlide(currentSlide - 1);
    }

    // Initialize the slider with the first slide.
    showSlide(0);

    // Event listeners for navigation buttons.
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);

    // Dot navigation.
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => showSlide(index));
    });

    // Auto-play functionality.
    const startAutoPlay = () => {
        clearInterval(autoPlayInterval);
        autoPlayInterval = setInterval(nextSlide, 5000);
    };

    const stopAutoPlay = () => {
        clearInterval(autoPlayInterval);
    };

    // Start auto-play and pause on hover.
    startAutoPlay();
    track.addEventListener('mouseenter', stopAutoPlay);
    track.addEventListener('mouseleave', startAutoPlay);

    // Keyboard navigation.
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') prevSlide();
        if (e.key === 'ArrowRight') nextSlide();
    });

    // Touch/swipe support.
    let startX = 0;
    track.addEventListener('touchstart', (e) => startX = e.touches[0].clientX);
    track.addEventListener('touchend', (e) => {
        const endX = e.changedTouches[0].clientX;
        const diff = startX - endX;
        
        if (Math.abs(diff) > 50) { // A threshold for a valid swipe.
            if (diff > 0) nextSlide();
            else prevSlide();
        }
    });
}

/**
 * Initializes the contact form functionality, including submission
 * animations and form validation.
 */
function initContactForm() {
    const form = document.getElementById('contact-form');
    const submitBtn = form?.querySelector('.form-submit');
    
    if (!form || !submitBtn) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const originalText = submitBtn.textContent;
        const formInputs = form.querySelectorAll('input, textarea');
        let isValid = true;
        
        // Basic validation check
        formInputs.forEach(input => {
            if (!validateInput(input)) {
                isValid = false;
            }
        });
        
        if (!isValid) {
            showNotification('Please correct the errors in the form.', 'error');
            return;
        }

        // Animate button to loading state
        submitBtn.innerHTML = '<span class="loading-spinner"></span> Sending...';
        submitBtn.disabled = true;

        // Simulate form submission
        try {
            // Replace this with your actual form submission logic (e.g., fetch request to a server).
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // Success animation
            submitBtn.innerHTML = '✓ Message Sent!';
            submitBtn.classList.add('success');
            form.reset();
            showNotification('Thank you! Your message has been sent successfully.', 'success');
        } catch (error) {
            // Error animation
            submitBtn.innerHTML = '✗ Error - Try Again';
            submitBtn.classList.add('error');
            showNotification('Sorry, there was an error sending your message. Please try again.', 'error');
        } finally {
            // Reset button after a delay
            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                submitBtn.classList.remove('success', 'error');
            }, 3000);
        }
    });

    // Input validation with visual feedback
    const inputs = form.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', () => validateInput(input));
        input.addEventListener('input', () => {
            input.classList.remove('error');
        });
    });

    function validateInput(input) {
        const value = input.value.trim();
        let isValid = true;
        
        if (input.hasAttribute('required') && !value) {
            isValid = false;
        } else if (input.type === 'email' && value && !isValidEmail(value)) {
            isValid = false;
        }
        
        // Toggle the error class to trigger CSS styling
        input.classList.toggle('error', !isValid);
        return isValid;
    }
    
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
}

/**
 * Initializes smooth scrolling for all anchor links pointing to sections.
 * The smooth scrolling effect is achieved using JavaScript for custom easing.
 */
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                const headerHeight = document.getElementById('navbar').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight - 3; // Added 3px offset
                
                smoothScrollTo(targetPosition, 1000);
            }
        });
    });
}

/**
 * Custom smooth scroll function with easing for a more dynamic feel.
 * @param {number} targetPosition The Y-coordinate to scroll to.
 * @param {number} duration The duration of the scroll animation in milliseconds.
 */
function smoothScrollTo(targetPosition, duration) {
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;
    
    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const run = easeInOutQuad(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
    }
    
    // Custom easing function (Quadratic ease-in-out).
    function easeInOutQuad(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }
    
    requestAnimationFrame(animation);
}

//--- Utility Functions ---//

/**
 * Throttling function to limit the rate at which a function is called.
 * Prevents performance issues on fast-firing events like 'scroll' and 'resize'.
 */
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

/**
 * Displays a custom animated notification message.
 * @param {string} message The message to display.
 * @param {string} type The type of notification ('success', 'error', 'info').
 */
function showNotification(message, type = 'info') {
    // Remove any existing notifications to avoid stacking.
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-icon">
                ${type === 'success' ? '✓' : type === 'error' ? '✗' : 'ℹ'}
            </span>
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    document.body.appendChild(notification);
    
    // Animate the notification into view.
    setTimeout(() => notification.classList.add('show'), 100);

    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => notification.classList.remove('show'));
    
    // Auto-hide after a delay.
    setTimeout(() => notification.classList.remove('show'), 5000);
}
