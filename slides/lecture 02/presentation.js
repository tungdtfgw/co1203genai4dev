// Greenwich Presentation Navigation and Interactive Features
// Author: Generated for Greenwich University Templates

class PresentationController {
    constructor() {
        this.slides = [
            'slide01.html',
            'slide02.html',
            'slide03.html',
            'slide04.html',
            'slide05.html',
            'slide06.html',
            'slide07.html',
            'slide08.html',
            'slide09.html',
            'slide10.html',
            'slide11.html',
            'slide12.html',
            'slide13.html',
            'slide14.html',
            'slide15.html',
            'slide16.html',
            'slide17.html',
            'slide18.html',
            'slide19.html',
            'slide20.html',
            'slide21.html',
            'slide22.html',
            'slide23.html',
            'slide24.html',
            'slide25.html',
            'slide26.html',
            'slide27.html',
            'slide28.html',
            'slide29.html'
        ];
        
        this.currentSlide = 0;
        this.init();
    }
    
    init() {
        this.detectCurrentSlide();
        this.setupKeyboardNavigation();
        this.setupTouchNavigation();
        this.setupAutoResize();
        this.animateElements();
        this.updateNavigationButtons();
    }
    
    detectCurrentSlide() {
        const currentPath = window.location.pathname;
        const currentFile = currentPath.split('/').pop();
        
        this.currentSlide = this.slides.indexOf(currentFile);
        if (this.currentSlide === -1) {
            this.currentSlide = 0;
        }
    }
    
    setupKeyboardNavigation() {
        document.addEventListener('keydown', (e) => {
            switch(e.key) {
                case 'ArrowRight':
                case ' ':
                case 'PageDown':
                    e.preventDefault();
                    this.nextSlide();
                    break;
                case 'ArrowLeft':
                case 'PageUp':
                    e.preventDefault();
                    this.previousSlide();
                    break;
                case 'Home':
                    e.preventDefault();
                    this.goToSlide(0);
                    break;
                case 'End':
                    e.preventDefault();
                    this.goToSlide(this.slides.length - 1);
                    break;
                // Fullscreen is managed by the external slides player
                // case 'Escape':
                //     break;
            }
        });
    }
    
    setupTouchNavigation() {
        let startX = 0;
        let startY = 0;
        
        document.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
        });
        
        document.addEventListener('touchend', (e) => {
            const endX = e.changedTouches[0].clientX;
            const endY = e.changedTouches[0].clientY;
            
            const deltaX = endX - startX;
            const deltaY = endY - startY;
            
            // Only handle horizontal swipes (ignore vertical scrolling)
            if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
                if (deltaX > 0) {
                    this.previousSlide();
                } else {
                    this.nextSlide();
                }
            }
        });
    }
    
    setupAutoResize() {
        const resizeSlide = () => {
            const slide = document.querySelector('.slide');
            if (!slide) return;

            const slideAspect = 16 / 9;
            const fullHeight = window.innerHeight;
            const idealWidth = fullHeight * slideAspect;
            const finalWidth = Math.min(window.innerWidth, idealWidth);

            slide.style.height = `${fullHeight}px`; // Always fill viewport height
            slide.style.width = `${finalWidth}px`;   // Constrain width to viewport
            slide.style.margin = '0 auto';           // Center horizontally when pillarboxed
        };

        window.addEventListener('resize', resizeSlide);
        resizeSlide(); // Initial call
    }
    
    animateElements() {
        // Animate elements when they come into view
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                }
            });
        }, observerOptions);
        
        // Observe all animatable elements
        document.querySelectorAll('.content-list li, .toc-item, .panel').forEach(el => {
            observer.observe(el);
        });
    }
    
    nextSlide() {
        if (this.currentSlide < this.slides.length - 1) {
            this.goToSlide(this.currentSlide + 1);
        }
    }
    
    previousSlide() {
        if (this.currentSlide > 0) {
            this.goToSlide(this.currentSlide - 1);
        }
    }
    
    goToSlide(slideIndex) {
        if (slideIndex >= 0 && slideIndex < this.slides.length) {
            window.location.href = this.slides[slideIndex];
        }
    }
    
    updateNavigationButtons() {
        const prevBtn = document.querySelector('.nav-btn[onclick*="previous"]');
        const nextBtn = document.querySelector('.nav-btn[onclick*="next"]');
        
        if (prevBtn) {
            prevBtn.disabled = this.currentSlide === 0;
        }
        
        if (nextBtn) {
            nextBtn.disabled = this.currentSlide === this.slides.length - 1;
        }
    }
    
    
    // Auto-play functionality (optional)
    startAutoPlay(intervalMs = 10000) {
        this.autoPlayInterval = setInterval(() => {
            if (this.currentSlide < this.slides.length - 1) {
                this.nextSlide();
            } else {
                this.stopAutoPlay();
            }
        }, intervalMs);
    }
    
    stopAutoPlay() {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
            this.autoPlayInterval = null;
        }
    }
}

// Global functions for button onclick events
function nextSlide() {
    if (window.presentationController) {
        window.presentationController.nextSlide();
    }
}

function previousSlide() {
    if (window.presentationController) {
        window.presentationController.previousSlide();
    }
}

// Table of Contents click handlers
function setupTOCNavigation() {
    document.querySelectorAll('.toc-item').forEach((item, index) => {
        item.addEventListener('click', () => {
            // Map TOC items to actual slides (skip cover and TOC itself)
            const slideMap = [
                2, // Introduction to AI -> template1
                3, // What is GenAI -> template2
                4, // GenAI models -> template3
                5, // Can AI replace jobs -> template4
                3, // Legal & Financial -> template2 (example)
                4  // Future Trends -> template3 (example)
            ];
            
            if (slideMap[index] !== undefined) {
                window.presentationController.goToSlide(slideMap[index]);
            }
        });
    });
}

// Smooth scrolling for content lists
function setupSmoothScrolling() {
    document.querySelectorAll('.content-list li').forEach((item, index) => {
        item.style.animationDelay = `${index * 0.2}s`;
    });
}

// Image lazy loading
function setupLazyLoading() {
    const images = document.querySelectorAll('img[src*="placeholder"]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                // Add loading animation
                img.style.opacity = '0.7';
                img.style.filter = 'blur(2px)';
                
                // Simulate loading complete
                setTimeout(() => {
                    img.style.opacity = '1';
                    img.style.filter = 'none';
                    img.style.transition = 'all 0.3s ease';
                }, 500);
                
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}



// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.presentationController = new PresentationController();
    
    // Setup additional features
    setupTOCNavigation();
    setupSmoothScrolling();
    setupLazyLoading();
    
    // Add custom styles for enhanced UX
    const style = document.createElement('style');
    style.textContent = `
        /* Enhanced hover effects */
        .content-list li:hover {
            transform: translateX(10px) scale(1.02);
            box-shadow: 0 8px 25px rgba(255, 107, 53, 0.3);
        }
        
        .toc-item:hover {
            transform: translateY(-8px) scale(1.05);
        }
        
        /* Loading states */
        .loading {
            position: relative;
            overflow: hidden;
        }
        
        .loading::after {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
            animation: shimmer 1.5s infinite;
        }
        
        @keyframes shimmer {
            0% { left: -100%; }
            100% { left: 100%; }
        }
        
        /* Focus styles for accessibility */
        .nav-btn:focus,
        .toc-item:focus {
            outline: 3px solid var(--primary-orange);
            outline-offset: 2px;
        }
        
        /* High contrast mode support */
        @media (prefers-contrast: high) {
            .slide {
                border: 2px solid var(--text-dark);
            }
            
            .content-list li {
                border: 1px solid var(--text-dark);
            }
        }
        
        /* Reduced motion support */
        @media (prefers-reduced-motion: reduce) {
            * {
                animation-duration: 0.01ms !important;
                animation-iteration-count: 1 !important;
                transition-duration: 0.01ms !important;
            }
        }
    `;
    
    document.head.appendChild(style);
    
    console.log('Greenwich Presentation Template loaded successfully!');
});

// Service Worker registration for offline support (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}
