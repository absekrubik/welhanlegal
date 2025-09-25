// Main JavaScript file for WELHAN LEGAL website with all animations

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initNavigation();
    initScrollAnimations();
    initTestimonials();
    initContactForm();
    initSmoothScrolling();
    initHeroAnimations();
    initServiceCardAnimations();
    
    // Add loading complete class
    document.body.classList.add('loaded');
});

// Hero section animations
function initHeroAnimations() {
    // Animated gradient text effect
    const gradientText = document.querySelector('.gradient-text');
    if (gradientText) {
        // Create animated gradient background
        gradientText.style.background = 'linear-gradient(45deg, #462c8a, #573bbc, #bd9c60)';
        gradientText.style.backgroundSize = '300% 300%';
        gradientText.style.webkitBackgroundClip = 'text';
        gradientText.style.webkitTextFillColor = 'transparent';
        gradientText.style.backgroundClip = 'text';
        
        // Animate gradient position
        let position = 0;
        setInterval(() => {
            position += 1;
            if (position > 100) position = 0;
            gradientText.style.backgroundPosition = `${position}% 50%`;
        }, 50);
    }
    
    // Scroll indicator animation
    const scrollIndicator = document.querySelector('.scroll-indicator span');
    if (scrollIndicator) {
        let animationFrame;
        
        function animateScrollIndicator() {
            let top = 0;
            let opacity = 1;
            
            function animate() {
                top += 0.5;
                opacity = Math.max(0, 1 - (top / 30));
                
                scrollIndicator.style.top = `${top}px`;
                scrollIndicator.style.opacity = opacity;
                
                if (top >= 30) {
                    top = 0;
                    opacity = 1;
                }
                
                animationFrame = requestAnimationFrame(animate);
            }
            
            animate();
        }
        
        animateScrollIndicator();
    }
}

// Service card lift animations
function initServiceCardAnimations() {
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            // Lift up animation
            this.style.transform = 'translateY(-15px) scale(1.02)';
            this.style.boxShadow = '0 20px 40px rgba(70, 44, 138, 0.3)';
            
            // Background gradient animation
            this.style.setProperty('--before-left', '0');
            this.style.setProperty('--before-opacity', '0.95');
            
            // Radial gradient effect
            this.style.setProperty('--after-width', '300px');
            this.style.setProperty('--after-height', '300px');
            
            // Change icon background and scale
            const icon = this.querySelector('.service-icon');
            if (icon) {
                icon.style.background = '#bd9c60';
                icon.style.transform = 'scale(1.1)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            // Reset animations
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 4px 20px rgba(70, 44, 138, 0.1)';
            
            // Reset pseudo-element effects
            this.style.setProperty('--before-left', '-100%');
            this.style.setProperty('--before-opacity', '0');
            this.style.setProperty('--after-width', '0');
            this.style.setProperty('--after-height', '0');
            
            // Reset icon
            const icon = this.querySelector('.service-icon');
            if (icon) {
                icon.style.background = '';
                icon.style.transform = '';
            }
        });
    });
}

// Navigation functionality
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Sticky navigation on scroll with animation
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', throttle(() => {
        const currentScrollY = window.scrollY;
        
        // Add scrolled class with animation
        if (currentScrollY > 100) {
            navbar.classList.add('scrolled');
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 30px rgba(0,0,0,0.15)';
        } else {
            navbar.classList.remove('scrolled');
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
        }
        
        // Hide/show navbar on scroll direction with smooth animation
        if (currentScrollY > lastScrollY && currentScrollY > 100) {
            navbar.style.transform = 'translateY(0)';
            navbar.style.transition = 'transform 0.3s ease';
        } else {
            navbar.style.transform = 'translateY(0)';
            navbar.style.transition = 'transform 0.3s ease';
        }
        
        lastScrollY = currentScrollY;
    }, 16));
    
    // Mobile menu toggle with animation
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        // Animate hamburger bars
        const bars = hamburger.querySelectorAll('.bar');
        if (hamburger.classList.contains('active')) {
            bars[0].style.transform = 'translateY(6px) rotate(45deg)';
            bars[1].style.opacity = '0';
            bars[2].style.transform = 'translateY(-6px) rotate(-45deg)';
        } else {
            bars[0].style.transform = '';
            bars[1].style.opacity = '';
            bars[2].style.transform = '';
        }
    });
    
    // Close mobile menu when clicking on links
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            
            // Reset hamburger animation
            const bars = hamburger.querySelectorAll('.bar');
            bars[0].style.transform = '';
            bars[1].style.opacity = '';
            bars[2].style.transform = '';
        });
    });
    
    // Active link highlighting with animation
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', throttle(() => {
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const correspondingLink = document.querySelector(`a[href="#${sectionId}"]`);
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    // Animate underline
                    link.style.setProperty('--underline-width', '0%');
                });
                if (correspondingLink) {
                    correspondingLink.classList.add('active');
                    correspondingLink.style.setProperty('--underline-width', '100%');
                }
            }
        });
    }, 16));
}

// Enhanced scroll animations with JavaScript
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateElement(entry.target);
                
                // Special handling for grid containers
                if (entry.target.classList.contains('services-grid')) {
                    animateServiceCards(entry.target);
                }
                
                if (entry.target.classList.contains('team-grid')) {
                    animateTeamCards(entry.target);
                }
                
                if (entry.target.classList.contains('about-stats')) {
                    animateStats(entry.target);
                }
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll(
        '.section-header, .about-text, .about-media, .services-grid, .team-grid, .about-stats, .contact-info, .contact-form-container'
    );
    
    animateElements.forEach(element => {
        // Set initial state
        element.style.opacity = '0';
        element.style.transform = 'translateY(50px)';
        element.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        
        observer.observe(element);
    });
}

// Animate individual elements
function animateElement(element) {
    element.style.opacity = '1';
    element.style.transform = 'translateY(0)';
    
    // Add special effects based on element type
    if (element.classList.contains('about-text')) {
        element.style.transform = 'translateX(0)';
        element.style.opacity = '1';
    }
    
    if (element.classList.contains('about-media')) {
        element.style.transform = 'translateX(0)';
        element.style.opacity = '1';
    }
}

// Animate service cards with stagger effect
function animateServiceCards(container) {
    const cards = container.querySelectorAll('.service-card');
    
    cards.forEach((card, index) => {
        // Set initial state
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px) scale(0.9)';
        card.style.transition = 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        
        // Animate with delay
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0) scale(1)';
            
            // Add bounce effect
            setTimeout(() => {
                card.style.transform = 'translateY(-5px) scale(1.02)';
                setTimeout(() => {
                    card.style.transform = 'translateY(0) scale(1)';
                }, 150);
            }, 300);
        }, index * 150);
    });
}

// Animate team cards
function animateTeamCards(container) {
    const cards = container.querySelectorAll('.team-card');
    
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px) rotateY(15deg)';
        card.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0) rotateY(0deg)';
        }, index * 200);
    });
}

// Animate statistics with counting effect
function animateStats(container) {
    const stats = container.querySelectorAll('.stat h4');
    
    stats.forEach(stat => {
        const finalValue = parseInt(stat.textContent);
        const suffix = stat.textContent.replace(/[0-9]/g, '');
        let currentValue = 0;
        const increment = finalValue / 50;
        
        const counter = setInterval(() => {
            currentValue += increment;
            if (currentValue >= finalValue) {
                currentValue = finalValue;
                clearInterval(counter);
            }
            stat.textContent = Math.floor(currentValue) + suffix;
        }, 30);
    });
}

// Enhanced testimonials slider with smooth transitions
function initTestimonials() {
    const track = document.getElementById('testimonial-track');
    const slides = document.querySelectorAll('.testimonial-slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    
    let currentSlide = 0;
    const totalSlides = slides.length;
    let isTransitioning = false;
    
    function showSlide(index, direction = 'next') {
        if (isTransitioning) return;
        isTransitioning = true;
        
        const currentSlideElement = slides[currentSlide];
        const nextSlideElement = slides[index];
        
        // Animate out current slide
        currentSlideElement.style.transform = direction === 'next' ? 'translateX(-100%)' : 'translateX(100%)';
        currentSlideElement.style.opacity = '0';
        
        // Prepare next slide
        nextSlideElement.style.display = 'block';
        nextSlideElement.style.transform = direction === 'next' ? 'translateX(100%)' : 'translateX(-100%)';
        nextSlideElement.style.opacity = '0';
        
        // Animate in next slide
        setTimeout(() => {
            nextSlideElement.style.transform = 'translateX(0)';
            nextSlideElement.style.opacity = '1';
            nextSlideElement.classList.add('active');
            
            // Hide previous slide
            setTimeout(() => {
                currentSlideElement.classList.remove('active');
                currentSlideElement.style.display = 'none';
                currentSlideElement.style.transform = 'translateX(0)';
                isTransitioning = false;
            }, 500);
        }, 50);
        
        // Update dots
        dots.forEach(dot => dot.classList.remove('active'));
        dots[index].classList.add('active');
        
        // Add pulse animation to active dot
        dots[index].style.transform = 'scale(1.3)';
        setTimeout(() => {
            dots[index].style.transform = 'scale(1.2)';
        }, 150);
        
        currentSlide = index;
    }
    
    function nextSlide() {
        const nextIndex = (currentSlide + 1) % totalSlides;
        showSlide(nextIndex, 'next');
    }
    
    function prevSlide() {
        const prevIndex = (currentSlide - 1 + totalSlides) % totalSlides;
        showSlide(prevIndex, 'prev');
    }
    
    // Event listeners with animation feedback
    nextBtn.addEventListener('click', () => {
        nextBtn.style.transform = 'scale(0.9)';
        setTimeout(() => {
            nextBtn.style.transform = 'scale(1.1)';
            setTimeout(() => {
                nextBtn.style.transform = 'scale(1)';
            }, 100);
        }, 100);
        nextSlide();
    });
    
    prevBtn.addEventListener('click', () => {
        prevBtn.style.transform = 'scale(0.9)';
        setTimeout(() => {
            prevBtn.style.transform = 'scale(1.1)';
            setTimeout(() => {
                prevBtn.style.transform = 'scale(1)';
            }, 100);
        }, 100);
        prevSlide();
    });
    
    // Dot navigation with animation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            if (index !== currentSlide) {
                const direction = index > currentSlide ? 'next' : 'prev';
                showSlide(index, direction);
            }
        });
    });
    
    // Auto-play with pause on hover
    let autoPlayInterval = setInterval(nextSlide, 5000);
    
    track.addEventListener('mouseenter', () => {
        clearInterval(autoPlayInterval);
    });
    
    track.addEventListener('mouseleave', () => {
        autoPlayInterval = setInterval(nextSlide, 5000);
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') prevSlide();
        if (e.key === 'ArrowRight') nextSlide();
    });
    
    // Touch/swipe support
    let startX = 0;
    let endX = 0;
    
    track.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
    });
    
    track.addEventListener('touchend', (e) => {
        endX = e.changedTouches[0].clientX;
        const diff = startX - endX;
        
        if (Math.abs(diff) > 50) {
            if (diff > 0) {
                nextSlide();
            } else {
                prevSlide();
            }
        }
    });
}

// Enhanced contact form with animations
function initContactForm() {
    const form = document.getElementById('contact-form');
    
    if (!form) return;
    
    // Add focus animations to form inputs
    const inputs = form.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.style.transform = 'scale(1.02)';
            this.style.boxShadow = '0 0 0 3px rgba(70, 44, 138, 0.1)';
            this.style.borderColor = '#462c8a';
        });
        
        input.addEventListener('blur', function() {
            this.style.transform = 'scale(1)';
            this.style.boxShadow = '';
            if (!this.classList.contains('error')) {
                this.style.borderColor = '';
            }
        });
    });
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const submitBtn = form.querySelector('.form-submit');
        const originalText = submitBtn.textContent;
        
        // Animate button to loading state
        submitBtn.innerHTML = '<span class="loading-spinner"></span> Sending...';
        submitBtn.disabled = true;
        submitBtn.style.background = 'linear-gradient(135deg, #6c757d, #495057)';
        
        // Add loading spinner animation
        const spinner = submitBtn.querySelector('.loading-spinner');
        if (spinner) {
            spinner.style.display = 'inline-block';
            spinner.style.width = '16px';
            spinner.style.height = '16px';
            spinner.style.border = '2px solid rgba(255, 255, 255, 0.3)';
            spinner.style.borderRadius = '50%';
            spinner.style.borderTopColor = '#fff';
            spinner.style.animation = 'spin 1s linear infinite';
        }
        
        // Get form data
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        try {
            // Simulate form submission
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // Success animation
            submitBtn.innerHTML = '✓ Message Sent!';
            submitBtn.style.background = 'linear-gradient(135deg, #28a745, #20c997)';
            submitBtn.style.transform = 'scale(1.05)';
            
            // Reset form with animation
            inputs.forEach(input => {
                input.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    input.value = '';
                    input.style.transform = 'scale(1)';
                }, 100);
            });
            
            // Show success notification
            showNotification('Thank you! Your message has been sent successfully.', 'success');
            
        } catch (error) {
            // Error animation
            submitBtn.innerHTML = '✗ Error - Try Again';
            submitBtn.style.background = 'linear-gradient(135deg, #dc3545, #c82333)';
            submitBtn.style.animation = 'shake 0.5s ease-in-out';
            
            showNotification('Sorry, there was an error sending your message. Please try again.', 'error');
        }
        
        // Reset button after 3 seconds
        setTimeout(() => {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            submitBtn.style.background = '';
            submitBtn.style.transform = '';
            submitBtn.style.animation = '';
        }, 3000);
    });
    
    // Form validation with animations
    inputs.forEach(input => {
        input.addEventListener('blur', validateInput);
        input.addEventListener('input', clearValidationError);
    });
    
    function validateInput(e) {
        const input = e.target;
        const value = input.value.trim();
        
        // Remove existing error styling
        input.classList.remove('error');
        
        if (!value && input.hasAttribute('required')) {
            showInputError(input, 'This field is required');
            return false;
        }
        
        if (input.type === 'email' && !isValidEmail(value)) {
            showInputError(input, 'Please enter a valid email address');
            return false;
        }
        
        return true;
    }
    
    function clearValidationError(e) {
        const input = e.target;
        input.classList.remove('error');
        input.style.borderColor = '';
        const errorMsg = input.parentNode.querySelector('.error-message');
        if (errorMsg) {
            errorMsg.style.opacity = '0';
            errorMsg.style.transform = 'translateY(-10px)';
            setTimeout(() => errorMsg.remove(), 300);
        }
    }
    
    function showInputError(input, message) {
        input.classList.add('error');
        input.style.borderColor = '#dc3545';
        input.style.animation = 'shake 0.3s ease-in-out';
        
        // Remove existing error message
        const existingError = input.parentNode.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }
        
        // Add animated error message
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        errorDiv.style.cssText = `
            color: #dc3545;
            font-size: 0.875rem;
            margin-top: 0.25rem;
            opacity: 0;
            transform: translateY(-10px);
            transition: all 0.3s ease;
        `;
        
        input.parentNode.appendChild(errorDiv);
        
        // Animate in
        setTimeout(() => {
            errorDiv.style.opacity = '1';
            errorDiv.style.transform = 'translateY(0)';
        }, 50);
        
        // Clear animation
        setTimeout(() => {
            input.style.animation = '';
        }, 300);
    }
    
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
}

// Smooth scrolling with easing animation
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                const headerHeight = document.getElementById('navbar').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight;
                
                // Custom smooth scroll with easing
                smoothScrollTo(targetPosition, 1000);
            }
        });
    });
}

// Custom smooth scroll function with easing
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
    
    function easeInOutQuad(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }
    
    requestAnimationFrame(animation);
}

// Enhanced notification system with animations
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-icon">${type === 'success' ? '✓' : type === 'error' ? '✗' : 'ℹ'}</span>
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles with animations
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? 'linear-gradient(135deg, #28a745, #20c997)' : 
                    type === 'error' ? 'linear-gradient(135deg, #dc3545, #c82333)' : 
                    'linear-gradient(135deg, #17a2b8, #138496)'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 12px;
        box-shadow: 0 8px 32px rgba(0,0,0,0.2);
        z-index: 9999;
        transform: translateX(400px);
        transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        max-width: 400px;
        backdrop-filter: blur(10px);
    `;
    
    // Style notification content
    const content = notification.querySelector('.notification-content');
    content.style.cssText = `
        display: flex;
        align-items: center;
        gap: 1rem;
    `;
    
    const icon = notification.querySelector('.notification-icon');
    icon.style.cssText = `
        font-size: 1.2rem;
        font-weight: bold;
    `;
    
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.style.cssText = `
        background: none;
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        padding: 0;
        line-height: 1;
        transition: transform 0.2s ease;
    `;
    
    // Add to DOM
    document.body.appendChild(notification);
    
    // Slide in animation
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Add bounce effect
    setTimeout(() => {
        notification.style.transform = 'translateX(-10px)';
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 150);
    }, 500);
    
    // Auto remove with fade out
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(400px) scale(0.8)';
        setTimeout(() => notification.remove(), 400);
    }, 5000);
    
    // Close button animation
    closeBtn.addEventListener('mouseenter', () => {
        closeBtn.style.transform = 'scale(1.2) rotate(90deg)';
    });
    
    closeBtn.addEventListener('mouseleave', () => {
        closeBtn.style.transform = 'scale(1) rotate(0deg)';
    });
    
    closeBtn.addEventListener('click', () => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(400px) scale(0.8)';
        setTimeout(() => notification.remove(), 400);
    });
}

// Performance optimizations
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

function debounce(func, wait, immediate) {
    let timeout;
    return function() {
        const context = this;
        const args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// Add CSS animations via JavaScript
const style = document.createElement('style');
style.textContent = `
    @keyframes spin {
        to { transform: rotate(360deg); }
    }
    
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-5px); }
        75% { transform: translateX(5px); }
    }
    
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); }
        100% { transform: scale(1); }
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes slideInLeft {
        from {
            opacity: 0;
            transform: translateX(-50px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(50px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    .loading-spinner {
        animation: spin 1s linear infinite;
    }
`;
document.head.appendChild(style);