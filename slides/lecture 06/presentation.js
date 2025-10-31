// Greenwich Presentation Navigation and Interactive Features
// Lecture 06 configuration: numbered slide files

class PresentationController {
    constructor() {
        this.slides = [
            'slide1.html',
            'slide2.html',
            'slide3.html',
            'slide4.html',
            'slide5.html',
            'slide6.html',
            'slide7.html',
            'slide8.html',
            'slide9.html',
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
            'slide29.html',
            'slide30.html',
            'slide31.html',
            'slide32.html',
            'slide33.html',
            'slide34.html',
            'slide35.html',
            'slide36.html',
            'slide37.html'
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
                case 'Escape':
                    this.toggleFullscreen();
                    break;
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

            slide.style.height = `${fullHeight}px`;
            slide.style.width = `${finalWidth}px`;
            slide.style.margin = '0 auto';
        };

        window.addEventListener('resize', resizeSlide);
        resizeSlide();
    }
    
    animateElements() {
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
}

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

function setupTOCNavigation() {
    document.querySelectorAll('.toc-item').forEach((item, index) => {
        item.addEventListener('click', () => {
            const firstNumberedSlideIndex = 2; // cover=0, toc=1
            const target = firstNumberedSlideIndex + index;
            window.presentationController.goToSlide(target);
        });
    });
}

function setupSmoothScrolling() {
    document.querySelectorAll('.content-list li').forEach((item, index) => {
        item.style.animationDelay = `${index * 0.2}s`;
    });
}

function setupLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                const src = img.getAttribute('data-src');
                if (src) {
                    img.src = src;
                    img.removeAttribute('data-src');
                }
                imageObserver.unobserve(img);
            }
        });
    });
    images.forEach(img => imageObserver.observe(img));
}

// --- Simple syntax highlighting to match template5 code styles ---
function applySyntaxHighlighting() {
    const codeBlocks = document.querySelectorAll('pre.code-content');
    codeBlocks.forEach((pre) => {
        if (pre.querySelector('span')) return; // already highlighted

        const originalText = pre.textContent || '';
        const escapeHtml = (text) => text
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');

        let html = escapeHtml(originalText);

        // Strings
        html = html.replace(/(["'])(?:\\.|(?!\1).)*\1/g, (m) => `<span class="string">${m}</span>`);

        // Comments (Python # ...)
        html = html.replace(/(^|\n)\s*(#.*)$/gm, (full, p1, p2) => `${p1}<span class="comment">${p2}</span>`);

        // Numbers
        html = html.replace(/\b\d+(?:\.\d+)?\b/g, (m) => `<span class="number">${m}</span>`);

        // Python keywords
        const pyKeywords = [
            'False','None','True','and','as','assert','async','await','break','class','continue','def','del','elif','else','except','finally','for','from','global','if','import','in','is','lambda','nonlocal','not','or','pass','raise','return','try','while','with','yield'
        ];
        const kwRegex = new RegExp(`\\b(${pyKeywords.join('|')})\\b`, 'g');
        html = html.replace(kwRegex, '<span class="keyword">$1</span>');

        // Function calls
        html = html.replace(/\b([A-Za-z_][A-Za-z0-9_]*)\s*(?=\()/g, '<span class="function">$1</span>');

        pre.innerHTML = html;
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.presentationController = new PresentationController();
    setupTOCNavigation();
    setupSmoothScrolling();
    setupLazyLoading();
    applySyntaxHighlighting();
});
