/**
 * Context Studio Lab - Main JavaScript
 * Interactive features and animations
 */

// ===================================
// Utility Functions
// ===================================

/**
 * Debounce function to limit function calls
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Check if element is in viewport
 */
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// ===================================
// Navigation
// ===================================

class Navigation {
    constructor() {
        this.navbar = document.getElementById('navbar');
        this.navToggle = document.getElementById('navToggle');
        this.navMenu = document.getElementById('navMenu');
        this.navLinks = document.querySelectorAll('.nav-link');
        
        this.init();
    }
    
    init() {
        // Scroll event for navbar styling
        window.addEventListener('scroll', debounce(() => {
            if (window.scrollY > 50) {
                this.navbar.classList.add('scrolled');
            } else {
                this.navbar.classList.remove('scrolled');
            }
        }, 10));
        
        // Mobile menu toggle
        if (this.navToggle) {
            this.navToggle.addEventListener('click', () => {
                this.toggleMobileMenu();
            });
        }
        
        // Smooth scroll for navigation links
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    this.scrollToSection(targetSection);
                    this.closeMobileMenu();
                }
            });
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!this.navbar.contains(e.target) && this.navMenu.classList.contains('active')) {
                this.closeMobileMenu();
            }
        });
    }
    
    toggleMobileMenu() {
        this.navMenu.classList.toggle('active');
        this.navToggle.classList.toggle('active');
    }
    
    closeMobileMenu() {
        this.navMenu.classList.remove('active');
        this.navToggle.classList.remove('active');
    }
    
    scrollToSection(section) {
        const navHeight = this.navbar.offsetHeight;
        const targetPosition = section.offsetTop - navHeight;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
}

// ===================================
// Animations on Scroll
// ===================================

class ScrollAnimations {
    constructor() {
        this.animatedElements = document.querySelectorAll('[data-aos]');
        this.init();
    }
    
    init() {
        // Initial check
        this.checkElements();
        
        // Check on scroll
        window.addEventListener('scroll', debounce(() => {
            this.checkElements();
        }, 50));
        
        // Check on resize
        window.addEventListener('resize', debounce(() => {
            this.checkElements();
        }, 100));
    }
    
    checkElements() {
        this.animatedElements.forEach(element => {
            if (this.isElementInViewport(element)) {
                element.classList.add('aos-animate');
            }
        });
    }
    
    isElementInViewport(element) {
        const rect = element.getBoundingClientRect();
        const windowHeight = window.innerHeight || document.documentElement.clientHeight;
        
        return (
            rect.top <= windowHeight * 0.85 &&
            rect.bottom >= 0
        );
    }
}

// ===================================
// Statistics Counter Animation
// ===================================

class StatsCounter {
    constructor() {
        this.statValues = document.querySelectorAll('.stat-value');
        this.animated = false;
        this.init();
    }
    
    init() {
        window.addEventListener('scroll', debounce(() => {
            if (!this.animated) {
                this.checkAndAnimate();
            }
        }, 100));
    }
    
    checkAndAnimate() {
        const heroSection = document.querySelector('.hero');
        if (heroSection && this.isElementInViewport(heroSection)) {
            this.animateStats();
            this.animated = true;
        }
    }
    
    animateStats() {
        this.statValues.forEach(stat => {
            const text = stat.textContent;
            // Add a subtle fade-in animation
            stat.style.opacity = '0';
            setTimeout(() => {
                stat.style.transition = 'opacity 0.5s ease';
                stat.style.opacity = '1';
            }, 100);
        });
    }
    
    isElementInViewport(element) {
        const rect = element.getBoundingClientRect();
        return rect.top < window.innerHeight && rect.bottom >= 0;
    }
}

// ===================================
// Feature Cards Interaction
// ===================================

class FeatureCards {
    constructor() {
        this.cards = document.querySelectorAll('.feature-card');
        this.init();
    }
    
    init() {
        this.cards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                this.handleCardHover(card);
            });
            
            card.addEventListener('mouseleave', () => {
                this.handleCardLeave(card);
            });
        });
    }
    
    handleCardHover(card) {
        // Add subtle scale effect
        card.style.transition = 'all 0.3s ease';
    }
    
    handleCardLeave(card) {
        // Reset
        card.style.transition = 'all 0.3s ease';
    }
}

// ===================================
// Demo Video Placeholder
// ===================================

class DemoVideo {
    constructor() {
        this.videoPlaceholder = document.querySelector('.video-placeholder');
        this.init();
    }
    
    init() {
        if (this.videoPlaceholder) {
            this.videoPlaceholder.addEventListener('click', () => {
                this.handleVideoClick();
            });
        }
    }
    
    handleVideoClick() {
        // Placeholder for video functionality
        console.log('Demo video clicked - functionality to be implemented');
        
        // Add a visual feedback
        const playButton = this.videoPlaceholder.querySelector('.play-button');
        if (playButton) {
            playButton.style.transform = 'scale(1.2)';
            setTimeout(() => {
                playButton.style.transform = 'scale(1)';
            }, 200);
        }
    }
}

// ===================================
// Scroll Progress Indicator
// ===================================

class ScrollProgress {
    constructor() {
        this.createProgressBar();
        this.init();
    }
    
    createProgressBar() {
        const progressBar = document.createElement('div');
        progressBar.id = 'scroll-progress';
        progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 0%;
            height: 3px;
            background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
            z-index: 9999;
            transition: width 0.1s ease;
        `;
        document.body.appendChild(progressBar);
        this.progressBar = progressBar;
    }
    
    init() {
        window.addEventListener('scroll', debounce(() => {
            this.updateProgress();
        }, 10));
    }
    
    updateProgress() {
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        const scrollPercentage = (scrollTop / (documentHeight - windowHeight)) * 100;
        this.progressBar.style.width = `${scrollPercentage}%`;
    }
}

// ===================================
// Active Section Highlighter
// ===================================

class ActiveSectionHighlighter {
    constructor() {
        this.sections = document.querySelectorAll('section[id]');
        this.navLinks = document.querySelectorAll('.nav-link');
        this.init();
    }
    
    init() {
        window.addEventListener('scroll', debounce(() => {
            this.highlightActiveSection();
        }, 100));
    }
    
    highlightActiveSection() {
        const scrollPosition = window.scrollY + 100;
        
        this.sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                this.navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
}

// ===================================
// Parallax Effect
// ===================================

class ParallaxEffect {
    constructor() {
        this.heroBackground = document.querySelector('.hero-background');
        this.init();
    }
    
    init() {
        if (this.heroBackground) {
            window.addEventListener('scroll', debounce(() => {
                this.applyParallax();
            }, 10));
        }
    }
    
    applyParallax() {
        const scrolled = window.pageYOffset;
        const parallaxSpeed = 0.5;
        this.heroBackground.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
    }
}

// ===================================
// Typing Effect for Hero Title
// ===================================

class TypingEffect {
    constructor() {
        this.element = document.querySelector('.gradient-text');
        this.text = this.element ? this.element.textContent : '';
        this.speed = 100;
        this.init();
    }
    
    init() {
        if (this.element && window.innerWidth > 768) {
            // Only apply on desktop
            this.element.textContent = '';
            this.typeText();
        }
    }
    
    typeText() {
        let index = 0;
        const type = () => {
            if (index < this.text.length) {
                this.element.textContent += this.text.charAt(index);
                index++;
                setTimeout(type, this.speed);
            }
        };
        
        // Start typing after a short delay
        setTimeout(type, 500);
    }
}

// ===================================
// Performance Metrics Display
// ===================================

class PerformanceMetrics {
    constructor() {
        this.init();
    }
    
    init() {
        // Log page load performance
        window.addEventListener('load', () => {
            const perfData = window.performance.timing;
            const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
            console.log(`Page Load Time: ${pageLoadTime}ms`);
        });
    }
}

// ===================================
// Initialize All Components
// ===================================

document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Context Studio Lab - Initializing...');
    
    // Initialize all components
    new Navigation();
    new ScrollAnimations();
    new StatsCounter();
    new FeatureCards();
    new DemoVideo();
    new ScrollProgress();
    new ActiveSectionHighlighter();
    new ParallaxEffect();
    new TypingEffect();
    new PerformanceMetrics();
    
    console.log('✅ Context Studio Lab - Ready!');
});

// ===================================
// Service Worker Registration (Optional)
// ===================================

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Uncomment to enable service worker
        // navigator.serviceWorker.register('/sw.js')
        //     .then(registration => console.log('SW registered:', registration))
        //     .catch(error => console.log('SW registration failed:', error));
    });
}

// ===================================
// Export for potential module usage
// ===================================

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        Navigation,
        ScrollAnimations,
        StatsCounter,
        FeatureCards,
        DemoVideo,
        ScrollProgress,
        ActiveSectionHighlighter,
        ParallaxEffect,
        TypingEffect,
        PerformanceMetrics
    };
}

// Made with Bob
