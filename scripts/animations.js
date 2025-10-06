// Advanced animations and interactive effects
class PortfolioAnimations {
    constructor() {
        this.init();
    }
    
    init() {
        this.createParticles();
        this.initTypewriter();
        this.initHoverEffects();
        this.initScrollAnimations();
        this.initCursorEffects();
        this.initTiltEffects();
    }
    
    // Particle system for hero section
    createParticles() {
        const hero = document.querySelector('.hero');
        if (!hero) return;
        
        const particlesContainer = document.createElement('div');
        particlesContainer.className = 'particles';
        hero.appendChild(particlesContainer);
        
        for (let i = 0; i < 50; i++) {
            this.createParticle(particlesContainer);
        }
    }
    
    createParticle(container) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random starting position
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 6 + 's';
        particle.style.animationDuration = (Math.random() * 3 + 3) + 's';
        
        container.appendChild(particle);
        
        // Remove and recreate particle after animation
        particle.addEventListener('animationend', () => {
            particle.remove();
            this.createParticle(container);
        });
    }
    
    // Typewriter effect for hero title
    initTypewriter() {
        const heroTitle = document.querySelector('.hero-title');
        if (!heroTitle) return;
        
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        heroTitle.classList.add('typewriter');
        
        let i = 0;
        const typeTimer = setInterval(() => {
            if (i < text.length) {
                heroTitle.textContent += text.charAt(i);
                i++;
            } else {
                clearInterval(typeTimer);
                heroTitle.classList.remove('typewriter');
            }
        }, 100);
    }
    
    // Advanced hover effects
    initHoverEffects() {
        // Magnetic buttons
        const buttons = document.querySelectorAll('.btn');
        buttons.forEach(btn => {
            btn.addEventListener('mouseenter', function() {
                this.style.transform = 'scale(1.05)';
            });
            
            btn.addEventListener('mouseleave', function() {
                this.style.transform = 'scale(1)';
            });
        });
        
        // Floating cards on hover
        const cards = document.querySelectorAll('.project-card, .skill-item, .stat-item');
        cards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-10px) scale(1.02)';
                this.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.15)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
                this.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
            });
        });
    }
    
    // Advanced scroll animations
    initScrollAnimations() {
        // Intersection Observer for staggered animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };
        
        const staggerObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.staggerAnimation(entry.target);
                }
            });
        }, observerOptions);
        
        // Observe elements for staggered animation
        const skillItems = document.querySelectorAll('.skill-item');
        const projectCards = document.querySelectorAll('.project-card');
        
        skillItems.forEach((item, index) => {
            item.style.animationDelay = `${index * 0.1}s`;
            staggerObserver.observe(item);
        });
        
        projectCards.forEach((card, index) => {
            card.style.animationDelay = `${index * 0.2}s`;
            staggerObserver.observe(card);
        });
        
        // Parallax scrolling for sections
        window.addEventListener('scroll', this.handleParallax.bind(this));
    }
    
    staggerAnimation(element) {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            element.style.transition = 'all 0.6s ease';
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, 100);
    }
    
    handleParallax() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.parallax');
        
        parallaxElements.forEach(element => {
            const speed = element.dataset.speed || 0.5;
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    }
    
    // Custom cursor effects
    initCursorEffects() {
        if (window.innerWidth < 768) return; // Skip on mobile
        
        const cursor = document.createElement('div');
        const cursorFollower = document.createElement('div');
        
        cursor.className = 'cursor';
        cursorFollower.className = 'cursor-follower';
        
        document.body.appendChild(cursor);
        document.body.appendChild(cursorFollower);
        
        let mouseX = 0, mouseY = 0;
        let followerX = 0, followerY = 0;
        
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            
            cursor.style.left = mouseX + 'px';
            cursor.style.top = mouseY + 'px';
        });
        
        // Smooth follower animation
        const animateFollower = () => {
            const distX = mouseX - followerX;
            const distY = mouseY - followerY;
            
            followerX += distX * 0.1;
            followerY += distY * 0.1;
            
            cursorFollower.style.left = followerX + 'px';
            cursorFollower.style.top = followerY + 'px';
            
            requestAnimationFrame(animateFollower);
        };
        animateFollower();
        
        // Cursor interactions
        const interactiveElements = document.querySelectorAll('a, button, .project-card');
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.style.transform = 'scale(1.5)';
                cursorFollower.style.transform = 'scale(1.5)';
            });
            
            el.addEventListener('mouseleave', () => {
                cursor.style.transform = 'scale(1)';
                cursorFollower.style.transform = 'scale(1)';
            });
        });
    }
    
    // 3D tilt effects
    initTiltEffects() {
        const tiltElements = document.querySelectorAll('.project-card, .skill-item');
        
        tiltElements.forEach(element => {
            element.addEventListener('mousemove', (e) => {
                const rect = element.getBoundingClientRect();
                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;
                
                const mouseX = e.clientX - centerX;
                const mouseY = e.clientY - centerY;
                
                const rotateX = (mouseY / rect.height) * 10;
                const rotateY = (mouseX / rect.width) * -10;
                
                element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
            });
            
            element.addEventListener('mouseleave', () => {
                element.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
            });
        });
    }
}

// Text scramble effect
class TextScramble {
    constructor(el) {
        this.el = el;
        this.chars = '!<>-_\\/[]{}—=+*^?#________';
        this.update = this.update.bind(this);
    }
    
    setText(newText) {
        const oldText = this.el.innerText;
        const length = Math.max(oldText.length, newText.length);
        const promise = new Promise((resolve) => this.resolve = resolve);
        this.queue = [];
        
        for (let i = 0; i < length; i++) {
            const from = oldText[i] || '';
            const to = newText[i] || '';
            const start = Math.floor(Math.random() * 40);
            const end = start + Math.floor(Math.random() * 40);
            this.queue.push({ from, to, start, end });
        }
        
        cancelAnimationFrame(this.frameRequest);
        this.frame = 0;
        this.update();
        return promise;
    }
    
    update() {
        let output = '';
        let complete = 0;
        
        for (let i = 0, n = this.queue.length; i < n; i++) {
            let { from, to, start, end, char } = this.queue[i];
            
            if (this.frame >= end) {
                complete++;
                output += to;
            } else if (this.frame >= start) {
                if (!char || Math.random() < 0.28) {
                    char = this.getRandomChar();
                    this.queue[i].char = char;
                }
                output += char;
            } else {
                output += from;
            }
        }
        
        this.el.innerHTML = output;
        
        if (complete === this.queue.length) {
            this.resolve();
        } else {
            this.frameRequest = requestAnimationFrame(this.update);
            this.frame++;
        }
    }
    
    getRandomChar() {
        return this.chars[Math.floor(Math.random() * this.chars.length)];
    }
}

// Wave animation for buttons
function createWaveEffect(element) {
    element.addEventListener('click', function(e) {
        const wave = document.createElement('span');
        const diameter = Math.max(this.clientWidth, this.clientHeight);
        const radius = diameter / 2;
        
        wave.style.width = wave.style.height = diameter + 'px';
        wave.style.left = (e.clientX - this.offsetLeft) - radius + 'px';
        wave.style.top = (e.clientY - this.offsetTop) - radius + 'px';
        wave.classList.add('wave');
        
        this.appendChild(wave);
        
        setTimeout(() => {
            wave.remove();
        }, 600);
    });
}

// Reveal animations on scroll
function initRevealAnimations() {
    const reveals = document.querySelectorAll('.reveal');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    });
    
    reveals.forEach(reveal => {
        revealObserver.observe(reveal);
    });
}

// Smooth scroll with easing
function smoothScrollTo(target, duration = 1000) {
    const targetElement = document.querySelector(target);
    if (!targetElement) return;
    
    const targetPosition = targetElement.offsetTop - 70;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;
    
    function ease(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }
    
    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const run = ease(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
    }
    
    requestAnimationFrame(animation);
}

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize main animation class
    new PortfolioAnimations();
    
    // Add wave effect to buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(createWaveEffect);
    
    // Initialize reveal animations
    initRevealAnimations();
    
    // Text scramble effect for hero subtitle
    const heroSubtitle = document.querySelector('.hero-subtitle');
    if (heroSubtitle) {
        const scramble = new TextScramble(heroSubtitle);
        setTimeout(() => {
            scramble.setText('Full-Stack Developer & Software Engineer');
        }, 2000);
    }
});

// CSS for wave effect (added dynamically)
const waveStyles = `
    .btn {
        position: relative;
        overflow: hidden;
    }
    
    .wave {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        animation: wave-animation 0.6s ease-out;
        pointer-events: none;
    }
    
    @keyframes wave-animation {
        0% {
            transform: scale(0);
            opacity: 1;
        }
        100% {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .reveal {
        opacity: 0;
        transform: translateY(50px);
        transition: all 0.8s ease;
    }
    
    .reveal.revealed {
        opacity: 1;
        transform: translateY(0);
    }
`;

// Inject styles
const styleSheet = document.createElement('style');
styleSheet.textContent = waveStyles;
document.head.appendChild(styleSheet);

// Export for external use
window.PortfolioAnimations = PortfolioAnimations;
window.TextScramble = TextScramble;
window.smoothScrollTo = smoothScrollTo;
