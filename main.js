// ========================================
// HZ Racing Esport Team - Main JavaScript
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    
    // ========== MOBILE MENU TOGGLE ==========
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (menuToggle && navMenu) {
        // Toggle menu on button click
        menuToggle.addEventListener('click', function() {
            menuToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            // Prevent body scroll when menu is open
            if (navMenu.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });
        
        // Close menu when clicking on a link
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                menuToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!menuToggle.contains(event.target) && !navMenu.contains(event.target)) {
                menuToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
    
    
    // ========== SMOOTH SCROLL ==========
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Only prevent default if it's not just '#'
            if (href !== '#') {
                e.preventDefault();
                
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    const offsetTop = targetElement.offsetTop - 80; // Account for fixed nav
                    
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    
    // ========== ACTIVE NAV LINK ON SCROLL ==========
    const sections = document.querySelectorAll('section[id], header[id]');
    
    function updateActiveLink() {
        const scrollPos = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', updateActiveLink);
    
    
    // ========== INTERSECTION OBSERVER FOR ANIMATIONS ==========
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements with fade-in animation
    const fadeElements = document.querySelectorAll('.pilot-card, .discipline-card, .championship-card, .sponsor-card, .stat-card');
    fadeElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });
    
    
    // ========== NAVBAR BACKGROUND ON SCROLL ==========
    const navbar = document.querySelector('.nav-bar');
    
    function updateNavbarBackground() {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(0, 5, 20, 0.98)';
            navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 255, 0.2)';
        } else {
            navbar.style.background = 'rgba(0, 5, 20, 0.95)';
            navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 255, 0.1)';
        }
    }
    
    window.addEventListener('scroll', updateNavbarBackground);
    
    
    // ========== CURSOR GLOW EFFECT (Desktop only) ==========
    if (window.matchMedia('(min-width: 1024px)').matches) {
        let cursorGlow = document.createElement('div');
        cursorGlow.className = 'cursor-glow';
        cursorGlow.style.cssText = `
            position: fixed;
            width: 300px;
            height: 300px;
            background: radial-gradient(circle, rgba(0, 0, 255, 0.18), transparent 70%);
            pointer-events: none;
            z-index: 9999;
            transform: translate(-50%, -50%);
            transition: opacity 0.3s ease;
            opacity: 0;
        `;
        document.body.appendChild(cursorGlow);
        
        document.addEventListener('mousemove', function(e) {
            cursorGlow.style.left = e.clientX + 'px';
            cursorGlow.style.top = e.clientY + 'px';
            cursorGlow.style.opacity = '1';
        });
        
        document.addEventListener('mouseleave', function() {
            cursorGlow.style.opacity = '0';
        });
    }
    
    
    // ========== PRELOAD IMAGES ==========
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.src; // Trigger load
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
    
    
    // ========== PERFORMANCE: REDUCE ANIMATIONS ON LOW-END DEVICES ==========
    if (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4) {
        // Reduce animation complexity on devices with 4 or fewer CPU cores
        document.querySelectorAll('.grid-lines, .diagonal-lines').forEach(el => {
            el.style.animationDuration = '60s';
        });
    }
    
    
    // ========== LOG READY STATE ==========
    console.log('%cHZ Racing Esport Team', 'color: #0000ff; font-size: 24px; font-weight: bold; text-shadow: 0 0 15px #0000ff;');
    console.log('%cWebsite loaded successfully', 'color: #0000ff; font-size: 14px;');
    console.log('%cPasión convertida en velocidad 🏁', 'color: #8090a0; font-size: 12px;');
    
});


// ========== EASTER EGG: KONAMI CODE ==========
let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', function(e) {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-10);
    
    if (konamiCode.join('') === konamiSequence.join('')) {
        // Activate turbo mode
        document.body.style.filter = 'hue-rotate(180deg)';
        console.log('%c🏎️ TURBO MODE ACTIVATED! 🏎️', 'color: #ff00ff; font-size: 20px; font-weight: bold;');
        
        setTimeout(() => {
            document.body.style.filter = '';
        }, 5000);
    }
});
