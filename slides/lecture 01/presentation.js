// Greenwich Presentation Navigation and Interactive Features
// Author: Generated for Greenwich University Templates

class PresentationController {
    constructor() {
        this.slides = [
            'slide01-cover.html',
            'slide02-what-is-genai.html',
            'slide03-genai-development.html',
            'slide04-genai-creativity.html',
            'slide05-foundation-genai.html',
            'slide06-llms.html',
            'slide07-transformer-architecture.html',
            'slide08-generative-architectures.html',
            'slide09-generative-architectures-cont.html',
            'slide10-prompt-engineering.html',
            'slide11-fine-tuning.html',
            'slide12-rlhf.html',
            'slide13-ai-programming-companion.html',
            'slide14-code-generation.html',
            'slide15-code-completion.html',
            'slide16-code-refactoring.html',
            'slide17-debugging-review.html',
            'slide18-test-documentation.html',
            'slide19-evaluation-criteria.html',
            'slide20-github-copilot.html',
            'slide21-github-copilot-features.html',
            'slide22-cursor.html',
            'slide23-cursor-features.html',
            'slide24-replit-ai.html',
            'slide25-v0-vercel.html',
            'slide26-bolt.html',
            'slide27-claude-code.html',
            'slide28-openai-codex.html',
            'slide29-gemini-cli.html',
            'slide30-continue.html',
            'slide31-tool-comparison.html',
            'slide32-future-discussion.html',
            'slide33-qa.html',
            'slide34-summary.html',
            'slide35-references.html'
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
                // Fullscreen handled by the external slides player
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
    
    // Per-slide fullscreen removed to avoid conflicts with the player
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

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.presentationController = new PresentationController();
    
    // Add custom styles for enhanced UX and fix footer visibility
    const style = document.createElement('style');
    style.textContent = `
        /* Ensure proper slide layout */
        .slide {
            display: flex !important;
            flex-direction: column !important;
            min-height: 100vh !important;
        }
        
        .slide-content {
            flex: 1 !important;
            overflow-y: auto !important;
            padding-bottom: 20px !important;
        }
        
        .slide-footer {
            flex-shrink: 0 !important;
            margin-top: auto !important;
        }
        
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
        
        /* Fix for table display */
        .comparison-table table {
            width: 100% !important;
            margin: 20px 0 !important;
            font-size: 0.85rem !important;
        }
        
        /* Fix content overflow */
        .content-list {
            max-height: calc(100vh - 200px) !important;
            overflow-y: auto !important;
        }
    `;
    
    document.head.appendChild(style);
    
    console.log('Greenwich Presentation Template loaded successfully!');
    console.log(`Current slide: ${window.presentationController.currentSlide + 1}/${window.presentationController.slides.length}`);
});
